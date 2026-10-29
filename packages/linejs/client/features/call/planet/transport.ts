/**
 * PLANET transport — full state-machine implementation.
 * Group PDTP and video receive adaptations: docs/licenses/tqmane-vyline-api-MIT.txt.
 *
 * Flow:
 *   1. acquireRoute (caller already did)
 *   2. connect(route): generate ephemeral keypair, derive session keys
 *      via 2-stage HKDF, open UDP socket to cscf
 *   3. invite(to): send SETUP_REQ (planet_msg with cc_msg.setup_req,
 *      rmt_nonce=0 since we don't yet know cscf's loc_nonce)
 *   4. First reply: decrypt, parse planet_msg_hdr,
 *      extract cscf's loc_nonce → use as session.rmtNonce going forward
 *      (libandromeda 0xcaa524: `str x8, [x19, #0xa0]`)
 *   5. Subsequent sends: include the captured rmt_nonce
 *   6. close(): send REL_REQ
 */

import { Buffer } from "node:buffer";
import type { Socket as DgramSocket } from "node:dgram";
import type * as LINETypes from "@evex/linejs-types";
import type { CallTransport } from "../session.ts";
import type { CallAudioPacket } from "../audio.ts";
import type { IncomingCallRoute, IncomingPlanetCall } from "../incoming.ts";
import { AsyncWaitQueue } from "../async_wait_queue.ts";
import {
	type CancellableAsyncGenerator,
	cancellableAsyncGenerator,
	type CancellableRead,
	cancellableRead,
} from "../cancellable_async_generator.ts";
import { makeChunkHdr, parseFrameHeader } from "./framing.ts";
import { depacketizeEas2 } from "./eas2.ts";
import { unpackXrtp } from "./xrtp.ts";
import { type ConferenceMember, ConferenceState } from "./conference.ts";
import { BoundedQueue } from "./bounded_queue.ts";
import { SerialTaskQueue } from "./serial_task_queue.ts";
import { buildPdtp, parsePdtp, type PdtpPacket, PdtpReceiver } from "./pdtp.ts";
import { readPlanetRtpExtension } from "./xrtp.ts";
import {
	type EncodedVideoFrame,
	Evs3Assembler,
	packetizeEvs3,
	parseEvs3,
	validateVp8,
} from "./evs3.ts";
import { packetizeSvcVp8, parseSvcVfd, unwrapSvcVp8 } from "./svc.ts";
import {
	decodeMcNotifyStrmReq,
	decodeMcStreamControl,
	decodeMcStrmReq,
	packMcStreamControl,
} from "./stream_control.ts";
import {
	aesCtrDecrypt,
	aesCtrEncrypt,
	buildDirectionLabel,
	buildPlanetCtrIv,
	decodeMpKey,
	derivePlanetMediaKeyingVariants,
	derivePlanetMediaStreamKeying,
	ecdh,
	type EphemeralKeypair,
	generateEphemeralKeypair,
	hmacTag,
	newSessionId,
	planetHkdfStage1,
	planetHkdfStage2,
	type PlanetMediaKeyVariantName,
	sha256,
	tagEquals,
	type TransportKeys,
} from "./crypto.ts";
import {
	CC_MSG,
	type CcConnReq,
	type CcConnRsp,
	type CcParticipateReq,
	type CcSetupReq,
	decodeCcConnReq,
	decodeCcConnRsp,
	decodeCcInfoReq,
	decodeCcParticipateRsp,
	decodeCcPushReq,
	decodeCcRelReq,
	decodeCcSetupRsp,
	decodeCcVerifyRsp,
	type DecodedField,
	type DecodedPlanetMsgHdr,
	decodeFields,
	decodeMcDataReq,
	decodeMcDataRsp,
	decodeNativeSetupOffer,
	decodePlanetAddr,
	decodePlanetMsg,
	encodeVarint,
	MC_MSG,
	type NativeSetupOffer,
	packBepiChannelOpen,
	packCcConnReq,
	packCcConnRsp,
	packCcInfoReq,
	packCcInfoRsp,
	packCcParticipateReq,
	packCcRelReq,
	packCcSetupReq,
	packCcVerifyReq,
	packKeepaliveReq,
	packMcChangeRsp,
	packMcCheckRpt,
	packMcDataReq,
	packMcDataRsp,
	packMcDataSessionPayload,
	packMcJoinRsp,
	packMcStrmReq,
	packNativeAnswer,
	packNativeGroupParticipateOffer,
	packNativeSetupOffer,
	packPlanetCcMsg,
	packPlanetFeatureRegister,
	packPlanetMcMsg,
	packPlanetMsg,
	packPlanetScMsgKaReq,
	packPlanetUeInfo,
	packPlanetUserAgent,
	packStrmSpec,
	type PlanetAddr,
	type PlanetMsgHdr,
	type PlanetSetupOfferMaterial,
	type PlanetUserAgent,
	WireType,
	wrapCcMsg,
	wrapMcMsg,
} from "./schema.ts";
import {
	buildRtp,
	deriveSrtpContext,
	parseRtp,
	type SrtpCryptoContext,
	srtpDecrypt,
	srtpEncrypt,
} from "../srtp.ts";

const MAX_BUFFERED_VIDEO_FRAMES = 30;

export type PlanetEndReason =
	| { by: "local" }
	| { by: "remote"; relCode?: number; releaser?: string };

function callEndedError(reason: PlanetEndReason): Error {
	return Object.assign(
		new Error(
			reason.by === "remote"
				? `PLANET call released by remote (relCode ${reason.relCode ?? "?"})`
				: "PlanetTransport closed",
		),
		{
			code: reason.by === "remote" ? "PLANET_REMOTE_RELEASE" : "PLANET_CLOSED",
			reason,
		},
	);
}

export interface PlanetTransportOpts {
	localMid: string;
	deviceInfo?: string;
	userAgent?: PlanetUserAgent;
	deviceId?: string;
	transportKeypair?: EphemeralKeypair;
	setupOffer?: Uint8Array;
	credential?: Uint8Array;
	serviceKey?: string;
	capabilities?: number[];
	features?: Uint8Array[];
	timeoutMs?: number;
	keepaliveIntervalMs?: number;
	mediaKeyMode?: PlanetMediaKeyMode;
	rtpTimestampStep?: number;
	preferIpv6?: boolean;
	/** @deprecated Ignored: registration requires the final relay answer. */
	groupDataSessionAfterProvisional?: boolean;
	wireSend?: (
		packet: Uint8Array,
		endpoint: {
			host: string;
			port: number;
			bootstrap: boolean;
			seq: number;
			plainLen: number;
			bodyLen: number;
			plaintext: Uint8Array;
		},
	) => Promise<Uint8Array | void> | Uint8Array | void;
	debug?: (event: Record<string, unknown>) => void;
}

export type PlanetMediaKeyMode =
	| "current"
	| "reverse-stage"
	| "sender-material"
	| "sender-material-reverse-stage"
	| "audio-current"
	| "audio-reverse-stage"
	| "audio-sender-material"
	| "audio-sender-material-reverse-stage"
	| "secret-receiver"
	| "secret-sender"
	| "audio-secret-receiver"
	| "audio-secret-sender"
	| "auto";

type MediaKdfMode = Extract<
	PlanetMediaKeyMode,
	| "current"
	| "reverse-stage"
	| "sender-material"
	| "sender-material-reverse-stage"
>;

export interface PlanetInviteResult {
	plaintext: Uint8Array;
	message: ReturnType<typeof decodePlanetMsg>;
	setupRsp?: ReturnType<typeof decodeCcSetupRsp>;
}

export interface PlanetIncomingMessage {
	plaintext: Uint8Array;
	source?: { host: string; port: number };
	message?: ReturnType<typeof decodePlanetMsg>;
}

export interface PlanetAnswerResult {
	plaintext: Uint8Array;
	message: ReturnType<typeof decodePlanetMsg>;
	connReq: CcConnReq;
	peerAnswerOffer?: NativeSetupOffer;
	peerOffer?: NativeSetupOffer;
	connRspSent: boolean;
	mediaReady: boolean;
}

export interface PlanetGroupJoinResult {
	plaintext: Uint8Array;
	message: ReturnType<typeof decodePlanetMsg>;
	participateRsp?: ReturnType<typeof decodeCcParticipateRsp>;
	peerAnswerOffer?: NativeSetupOffer;
	mediaReady: boolean;
}

export interface PlanetLocalMediaOffer {
	keypair: EphemeralKeypair;
	material: PlanetSetupOfferMaterial;
	offer: Uint8Array;
}

/** Application-owned installation identity; persist deviceId outside the library. */
export interface PlanetIncomingIdentity {
	deviceId: string;
	userAgent: PlanetUserAgent;
}

export const AUDIO_SERVICE_KEY = "freecall.audio";

interface IncomingState {
	phase: "verifying" | "verified" | "answering" | "answered";
	expected?: PlanetMsgHdr;
	peer?: NativeSetupOffer;
	sessionEndpoint?: { host: string; port: number };
	ua: Uint8Array;
	signal?: AbortSignal;
}

interface CallRouteParsed {
	cscfHost: string;
	cscfPort: number;
	cscfHost6?: string;
	peerPub: Uint8Array;
	toMid: string;
	fromToken: string;
	iZone?: string;
	rZone?: string;
	stid?: string;
	stnpk?: string;
	groupToken?: string;
	orionIp?: string;
	mixIp?: string;
	mixPort?: number;
	mediaHost?: string;
	mediaPort?: number;
}

interface MediaKeySelection {
	mode: MediaKdfMode;
	send: PlanetMediaKeyVariantName;
	recv: PlanetMediaKeyVariantName;
}

interface MediaKeyCandidate {
	mode: Exclude<PlanetMediaKeyMode, "auto">;
	send: string;
	recv: string;
	sendContext: SrtpCryptoContext;
	recvContext: SrtpCryptoContext;
	videoSendContext: SrtpCryptoContext;
	videoRecvContext: SrtpCryptoContext;
}

const MEDIA_KEY_SELECTIONS: Record<
	MediaKdfMode,
	MediaKeySelection
> = {
	current: {
		mode: "current",
		send: "local-peer/peer",
		recv: "peer-local/local",
	},
	"reverse-stage": {
		mode: "reverse-stage",
		send: "peer-local/local",
		recv: "local-peer/peer",
	},
	"sender-material": {
		mode: "sender-material",
		send: "local-peer/local",
		recv: "peer-local/peer",
	},
	"sender-material-reverse-stage": {
		mode: "sender-material-reverse-stage",
		send: "peer-local/peer",
		recv: "local-peer/local",
	},
};

function audioMediaKeyMode(mode: MediaKdfMode): Exclude<
	PlanetMediaKeyMode,
	"auto"
> {
	return `audio-${mode}` as Exclude<PlanetMediaKeyMode, "auto">;
}

function parseRoute(
	r: IncomingCallRoute & { stid?: string; stnpk?: string },
): CallRouteParsed {
	const commParam = JSON.parse(r.commParam || "{}");
	const mpkeyB64 = commParam.mpkey;
	if (!mpkeyB64) throw new Error("CallRoute.commParam.mpkey missing");
	return {
		cscfHost: r.voipAddress.split(",")[0],
		cscfPort: r.voipUdpPort,
		cscfHost6: r.voipAddress6?.split(",")[0],
		peerPub: decodeMpKey(mpkeyB64),
		toMid: r.toMid,
		fromToken: r.fromToken,
		iZone: r.fromZone,
		rZone: r.toZone,
		stid: r.stid,
		stnpk: r.stnpk,
	};
}

function parseGroupRoute(r: LINETypes.GroupCallRoute): CallRouteParsed {
	const commParam = JSON.parse(r.commParam || "{}");
	const mpkeyB64 = commParam.mpkey;
	if (!mpkeyB64) throw new Error("GroupCallRoute.commParam.mpkey missing");
	return {
		cscfHost: r.voipAddress.split(",")[0],
		cscfPort: r.voipUdpPort,
		cscfHost6: r.voipAddress6?.split(",")[0],
		peerPub: decodeMpKey(mpkeyB64),
		toMid: r.hostMid ?? "",
		fromToken: r.token,
		iZone: r.fromZone,
		rZone: r.polarisZone,
		stnpk: r.stnpk,
		groupToken: r.token,
		orionIp: r.orionAddress,
		mixIp: r.polarisAddress,
		mixPort: r.polarisUdpPort,
		mediaHost: r.voipAddress.split(",")[0],
		mediaPort: r.voipUdpPort,
	};
}

function isGroupRoute(
	r: IncomingCallRoute | LINETypes.CallRoute | LINETypes.GroupCallRoute,
): r is LINETypes.GroupCallRoute {
	return "token" in r && !("toMid" in r);
}

const HEADER_LEN = 6;
const BOOTSTRAP_PREFIX_LEN = 51;
const BOOTSTRAP_SEC_HEADER_LEN = 5;
const BOOTSTRAP_CIPHER_OFFSET = HEADER_LEN + BOOTSTRAP_PREFIX_LEN +
	BOOTSTRAP_SEC_HEADER_LEN;
const CASSINI_MSG_ID_CC_BASE = 0x2140;
const CASSINI_MSG_ID_SETUP_REQ = 0x2141;
const CASSINI_MSG_ID_REL_REQ = 0x2145;
const CASSINI_MSG_ID_GROUP_PARTICIPATE_REQ = 0x214e;
const CASSINI_MSG_ID_MC_JOIN_RSP = 0x3285;
const CASSINI_MSG_ID_MC_CHANGE_RSP = 0x3286;
const CASSINI_MSG_ID_MC_CHECK_RPT = 0x3287;
const CASSINI_MSG_ID_MC_DATA_REQ = 0x3189;
const CASSINI_MSG_ID_MC_DATA_RSP = 0x3289;
const CASSINI_MSG_ID_KEEPALIVE_REQ = 0x1101;
const CASSINI_MSG_ID_BEPI_OPEN = 0x1102;
const REGULAR_TAIL_CONTROL_BASE = 0x18;
const REGULAR_TAIL_RAW_BASE = 0x48;
const PINHOLE_PROBE_COUNT = 16;
const PINHOLE_KIND = 16;
const PINHOLE_MTU = 300;
const PINHOLE_REPORT_MTU = 500;
const PINHOLE_PAYLOAD_BYTES = 500;
const GROUP_AUDIO_RTP_EXTENSION = new Uint8Array([
	0x01,
	0x02,
	0xc0,
	0x40,
	0x40,
	0x00,
	0x00,
	0x00,
]);
const GROUP_AUDIO_RTP_EXTENSIONS = [
	new Uint8Array([0x01, 0x02, 0xc0, 0x40, 0x7f, 0x00, 0x00, 0x00]),
	new Uint8Array([0x01, 0x02, 0xc0, 0x40, 0x53, 0x00, 0x00, 0x00]),
	new Uint8Array([0x01, 0x02, 0xc0, 0x54, 0x39, 0x00, 0x00, 0x00]),
	new Uint8Array([0x01, 0x02, 0xc0, 0x54, 0x47, 0x00, 0x00, 0x00]),
	new Uint8Array([0x01, 0x02, 0xc0, 0x50, 0x49, 0x00, 0x00, 0x00]),
	new Uint8Array([0x01, 0x02, 0xc0, 0x40, 0x50, 0x00, 0x00, 0x00]),
	new Uint8Array([0x01, 0x02, 0xc0, 0x40, 0x4f, 0x00, 0x00, 0x00]),
	new Uint8Array([0x01, 0x02, 0xc0, 0x40, 0x50, 0x00, 0x00, 0x00]),
	new Uint8Array([0x01, 0x02, 0xc0, 0x40, 0x52, 0x00, 0x00, 0x00]),
];
const GROUP_DATA_RTP_PAYLOADS = [
	new Uint8Array([
		0x80,
		0x00,
		0x00,
		0x40,
		0x00,
		0x05,
		0x02,
		0x05,
		0x00,
		0x00,
		0x00,
	]),
	new Uint8Array([
		0x80,
		0x00,
		0x00,
		0x40,
		0x00,
		0x05,
		0x02,
		0x05,
		0x00,
		0x00,
		0x00,
	]),
	new Uint8Array([
		0x80,
		0x00,
		0x00,
		0x40,
		0x00,
		0x04,
		0x02,
		0x03,
		0x1b,
		0x00,
	]),
	new Uint8Array([
		0x80,
		0x00,
		0x00,
		0x40,
		0x00,
		0x04,
		0x02,
		0x03,
		0x1b,
		0x00,
	]),
	new Uint8Array([
		0x80,
		0x00,
		0x00,
		0x40,
		0x00,
		0x04,
		0x02,
		0x03,
		0x39,
		0x00,
	]),
	new Uint8Array([
		0x80,
		0x00,
		0x00,
		0x40,
		0x00,
		0x04,
		0x02,
		0x03,
		0x39,
		0x00,
	]),
	new Uint8Array([
		0x80,
		0x00,
		0x00,
		0x40,
		0x00,
		0x05,
		0x02,
		0x03,
		0x40,
		0x57,
		0x00,
	]),
	new Uint8Array([
		0x80,
		0x00,
		0x00,
		0x40,
		0x00,
		0x05,
		0x02,
		0x03,
		0x40,
		0x57,
		0x00,
	]),
	new Uint8Array([
		0x80,
		0x00,
		0x00,
		0x40,
		0x00,
		0x05,
		0x02,
		0x03,
		0x40,
		0x75,
		0x00,
	]),
	new Uint8Array([
		0x80,
		0x00,
		0x00,
		0x03,
		0x00,
		0x02,
		0x40,
		0xc8,
		0x01,
		0x01,
	]),
];
const GROUP_DATA_RTP_TIMESTAMP_STEPS = [0, 8, 20, 10, 20, 10, 20, 10, 20, 10];
const GROUP_RTCP_SENDER_SSRC = 0x1a92;
const PINHOLE_ID_HIGH_BIT = 1n << 47n;
const PINHOLE_ID_MASK = (1n << 48n) - 1n;
let lastPinholeProbeId = 0n;

function readObservedSequence(wire: Uint8Array): number {
	if (wire.length < HEADER_LEN) throw new Error("PLANET wire too short");
	return ((wire[2] << 8) | wire[3]) & 0xffff;
}

function readCipherSequence(wire: Uint8Array, cipherOffset: number): number {
	// Native PLANET stores the CTR sequence in clear header bytes 2..3 for
	// bootstrap and regular packets alike. The remaining two fixed-header bytes
	// encode the payload length/class.
	if (cipherOffset !== BOOTSTRAP_CIPHER_OFFSET && cipherOffset !== HEADER_LEN) {
		throw new Error("readCipherSequence: unknown cipher offset");
	}
	return readObservedSequence(wire);
}

function looksBootstrapFrame(wire: Uint8Array): boolean {
	return wire.length >= BOOTSTRAP_CIPHER_OFFSET + 16 &&
		wire[4] === 0x06 && wire[5] === 0x02;
}

function concatBytes(parts: Uint8Array[]): Uint8Array {
	const len = parts.reduce((n, p) => n + p.length, 0);
	const out = new Uint8Array(len);
	let off = 0;
	for (const p of parts) {
		out.set(p, off);
		off += p.length;
	}
	return out;
}

function packVarintField(tag: number, value: bigint | number): Uint8Array {
	return concatBytes([
		encodeVarint((tag << 3) | WireType.Varint),
		encodeVarint(value),
	]);
}

function packBytesField(tag: number, value: Uint8Array): Uint8Array {
	return concatBytes([
		encodeVarint((tag << 3) | WireType.LengthDelim),
		encodeVarint(value.length),
		value,
	]);
}

function randomBytes(byteLength: number): Uint8Array {
	const out = new Uint8Array(byteLength);
	crypto.getRandomValues(out);
	return out;
}

function bytesToHex(bytes: Uint8Array, maxBytes: number): string {
	const view = bytes.subarray(0, Math.min(bytes.length, maxBytes));
	return Array.from(view, (b) => b.toString(16).padStart(2, "0")).join("");
}

function nextPinholeProbeId(): bigint {
	const nowNs = BigInt(
		Math.floor((performance.timeOrigin + performance.now()) * 1_000_000),
	);
	let value = (nowNs & PINHOLE_ID_MASK) | PINHOLE_ID_HIGH_BIT;
	if (value <= lastPinholeProbeId) {
		value = ((lastPinholeProbeId + 1n) & PINHOLE_ID_MASK) |
			PINHOLE_ID_HIGH_BIT;
	}
	lastPinholeProbeId = value;
	return value;
}

function packPinholeProbe(): Uint8Array {
	const inner = concatBytes([
		packVarintField(1, PINHOLE_KIND),
		packVarintField(2, nextPinholeProbeId()),
		packVarintField(3, PINHOLE_MTU),
		packBytesField(4, randomBytes(PINHOLE_PAYLOAD_BYTES)),
	]);
	return packBytesField(3, inner);
}

function packPinholeProbeReport(): Uint8Array {
	return packBytesField(
		1,
		concatBytes([
			packVarintField(1, PINHOLE_REPORT_MTU),
			packVarintField(2, PINHOLE_KIND),
			packVarintField(3, PINHOLE_MTU),
		]),
	);
}

function ccMsgId(bodyTag: number): number {
	if (bodyTag === CC_MSG.CONN_RSP) return 0x2244;
	if (bodyTag === CC_MSG.REL_REQ) return CASSINI_MSG_ID_REL_REQ;
	if (bodyTag === CC_MSG.REL_RSP) return 0x2245;
	if (bodyTag === CC_MSG.INFO_REQ) return 0x2147;
	if (bodyTag === CC_MSG.INFO_RSP) return 0x2247;
	return CASSINI_MSG_ID_CC_BASE + bodyTag;
}

function buildObservedFrameHeader(
	chunkLogical: number,
	sequence: number,
	tail16: number,
): Uint8Array {
	const chunk = makeChunkHdr(chunkLogical);
	return new Uint8Array([
		chunk & 0xff,
		(chunk >>> 8) & 0xff,
		(sequence >>> 8) & 0xff,
		sequence & 0xff,
		(tail16 >>> 8) & 0xff,
		tail16 & 0xff,
	]);
}

function buildBootstrapSecHeader(plaintextLen: number): Uint8Array {
	// Native first SETUP packet inserts this 5-byte cleartext record
	// between the bootstrap prefix and AES output. Captures with 873/874 byte
	// plaintexts produced 00 00 00 2b 69/6a respectively.
	return new Uint8Array([
		0,
		0,
		0,
		0x28 | ((plaintextLen >>> 8) & 0x07),
		plaintextLen & 0xff,
	]);
}

function regularTail16(plaintextLen: number, raw: boolean): number {
	const base = raw ? REGULAR_TAIL_RAW_BASE : REGULAR_TAIL_CONTROL_BASE;
	return (((base | ((plaintextLen >>> 8) & 0x07)) << 8) |
		(plaintextLen & 0xff)) & 0xffff;
}

function randomBase64(byteLength: number): string {
	const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
	return btoa(String.fromCharCode(...bytes));
}

function defaultAndroidUserAgent(deviceInfo?: string): PlanetUserAgent {
	return {
		osName: "Android",
		osVersion: "36",
		deviceName: "Pixel 6a",
		appVersion: "12.1.13-63078245f",
		engineVersion: "8.2.0-694e2367",
		appReleaseInfo: deviceInfo ?? "ANDROID\t26.6.2\tAndroid OS\t16",
		manufacturer: "google",
	};
}

function defaultOneToOneStrmSpec(): Uint8Array {
	const state = { paused: false, code: 0 };
	return packStrmSpec({
		strms: [
			{
				ssrc: 102,
				bitrate: { target: 32 },
				state,
				ptime: 40,
				retx: { periOn: true, periIntvMs: 40, periLossThre: [0, 0, 20] },
				fecLossThre: [],
			},
			{
				ssrc: 112,
				bitrate: { min: 100, max: 1200, target: 800 },
				state,
				retx: { periOn: false },
				fecLossThre: [0, 1, 10],
			},
			{
				ssrc: 122,
				bitrate: { max: 2000 },
				state,
				retx: { periOn: false },
				fecLossThre: [],
			},
		],
		fbIntv: 200,
		tp: 1,
		fbOn: true,
		txStrms: [
			{
				ssrc: 202,
				state,
				retx: { reqdOn: true, reqdRttThre: 300 },
			},
			{
				ssrc: 212,
				state,
				retx: { reqdOn: false },
			},
		],
		link: {
			bwInitKbps: 886,
			bwMaxKbps: 3000,
			probeRate: 0.2,
			probeBrMaxKbps: 200,
		},
	});
}

function defaultOneToOneDataSessionPayload(): Uint8Array {
	return packMcDataSessionPayload(defaultOneToOneStrmSpec());
}

function defaultSetupFeatures(): Uint8Array[] {
	return [
		packPlanetFeatureRegister(16, true, 0),
		packPlanetFeatureRegister(17, false, 0),
		packPlanetFeatureRegister(0, false, 0),
	];
}

function defaultGroupParticipateFeatures(): Uint8Array[] {
	return [
		packPlanetFeatureRegister(16, true, 0),
		packPlanetFeatureRegister(17, false, 0),
	];
}

function randomU32(): number {
	return crypto.getRandomValues(new Uint32Array(1))[0];
}

function randomIntInclusive(min: number, max: number): number {
	return min + (randomU32() % (max - min + 1));
}

function randomBitLength(minBits: number, maxBits: number): number {
	const bits = randomIntInclusive(minBits, maxBits);
	const base = 1 << (bits - 1);
	return (base | (randomU32() & (base - 1))) >>> 0;
}

function randomVarint2(): number {
	return (0x2000 | (randomU32() & 0x1fff)) >>> 0;
}

function randomNativeTranSeq(): number {
	return randomBitLength(26, 30);
}

function randomNativeLargeId(): number {
	return randomBitLength(29, 30);
}

function randomNativeGroupCcChanId(): number {
	return randomBitLength(28, 28);
}

function randomNativeGroupMediaChanId(): number {
	return randomBitLength(31, 31);
}

function randomInitialFrameSeq(): number {
	return randomIntInclusive(1, 1023);
}

function addU32(value: number, delta: number): number {
	return (value + delta) >>> 0;
}

function putU16(out: Uint8Array, off: number, value: number): void {
	out[off] = (value >>> 8) & 0xff;
	out[off + 1] = value & 0xff;
}

function putU32(out: Uint8Array, off: number, value: number): void {
	out[off] = (value >>> 24) & 0xff;
	out[off + 1] = (value >>> 16) & 0xff;
	out[off + 2] = (value >>> 8) & 0xff;
	out[off + 3] = value & 0xff;
}

function buildGroupRtcpFeedback(opts: {
	senderSsrc: number;
	rxAudioSsrc: number;
	rxDataSsrc: number;
}): Uint8Array {
	const out = new Uint8Array(48);
	out[0] = 0x8b; // RTCP RTPFB, FMT=11
	out[1] = 0xcd; // PT=205, logged as RTP-like payload type 77
	putU16(out, 2, 11);
	putU32(out, 4, opts.senderSsrc);
	putU32(out, 8, opts.senderSsrc);
	out.set([0x00, 0x00, 0x01, 0x66, 0x00, 0x01, 0x00, 0xc8], 12);
	putU32(out, 20, opts.rxDataSsrc);
	out.set([0x00, 0x01, 0x00, 0x02, 0x02, 0x73, 0x00, 0x00], 24);
	putU32(out, 32, opts.rxAudioSsrc);
	putU32(out, 36, 0);
	putU32(out, 40, opts.rxAudioSsrc);
	putU32(out, 44, 0);
	return out;
}

function copyBytes(bytes: Uint8Array): Uint8Array {
	return new Uint8Array(bytes);
}

function cloneMediaOfferMaterial(
	material: PlanetSetupOfferMaterial,
): PlanetSetupOfferMaterial {
	return {
		mediaPubKey: copyBytes(material.mediaPubKey),
		mediaKeyId: material.mediaKeyId,
		mediaNonce: copyBytes(material.mediaNonce),
		mediaSecret: copyBytes(material.mediaSecret),
	};
}

function tryDecodeNativeSetupOffer(
	bytes: Uint8Array | undefined,
): NativeSetupOffer | undefined {
	if (!bytes) return undefined;
	try {
		return decodeNativeSetupOffer(bytes);
	} catch {
		return undefined;
	}
}

function fieldShape(fields: DecodedField[]): Array<{
	tag: number;
	wt: number;
	len?: number;
	scalar?: number | string;
}> {
	return fields.map((f) => ({
		tag: f.tag,
		wt: f.wireType,
		len: f.value instanceof Uint8Array ? f.value.length : undefined,
		scalar: typeof f.value === "bigint"
			? f.value <= BigInt(Number.MAX_SAFE_INTEGER)
				? Number(f.value)
				: f.value.toString()
			: undefined,
	}));
}

function fieldNumber(fields: DecodedField[], tag: number): number | undefined {
	const v = fields.find((f) => f.tag === tag)?.value;
	return typeof v === "bigint" ? Number(v) : undefined;
}

function fieldText(fields: DecodedField[], tag: number): string | undefined {
	const v = fields.find((f) => f.tag === tag)?.value;
	if (!(v instanceof Uint8Array)) return undefined;
	const s = new TextDecoder().decode(v);
	return /^[\x20-\x7e]{0,80}$/.test(s) ? s : undefined;
}

function defaultLocalMediaOffer(initialVideo = false): PlanetLocalMediaOffer {
	const media = generateEphemeralKeypair();
	const material: PlanetSetupOfferMaterial = {
		mediaPubKey: media.publicKey,
		mediaKeyId: randomNativeLargeId(),
		mediaNonce: crypto.getRandomValues(new Uint8Array(16)),
		mediaSecret: crypto.getRandomValues(new Uint8Array(30)),
	};
	return {
		keypair: {
			publicKey: copyBytes(media.publicKey),
			privateKey: copyBytes(media.privateKey),
		},
		material: cloneMediaOfferMaterial(material),
		offer: packNativeSetupOffer(material, initialVideo),
	};
}

function defaultSetupCredential(
	route: CallRouteParsed,
	initiator: string,
	responder: string,
	cid: string,
): Uint8Array {
	return sha256(
		concatBytes([
			new TextEncoder().encode(initiator),
			new TextEncoder().encode("::"),
			new TextEncoder().encode(responder),
			new TextEncoder().encode("::"),
			new TextEncoder().encode(route.fromToken),
			new TextEncoder().encode("::"),
			new TextEncoder().encode(cid),
		]),
	);
}

function defaultGroupParticipateCredential(
	route: CallRouteParsed,
	participant: string,
	roomId: string,
	cid: string,
): Uint8Array {
	if (!route.groupToken) throw new Error("GroupCallRoute.token missing");
	return sha256(
		concatBytes([
			new TextEncoder().encode(participant),
			new TextEncoder().encode("::"),
			new TextEncoder().encode(roomId),
			new TextEncoder().encode("::"),
			new TextEncoder().encode(route.groupToken),
			new TextEncoder().encode("::"),
			new TextEncoder().encode(cid),
		]),
	);
}

function isRtpLike(wire: Uint8Array): boolean {
	return wire.length >= 12 && (wire[0] & 0xc0) === 0x80;
}

function firstPort(ports: string | undefined): number | undefined {
	if (!ports) return undefined;
	const hit = ports.match(/\d+/);
	if (!hit) return undefined;
	const port = Number(hit[0]);
	return Number.isInteger(port) && port > 0 && port <= 65535 ? port : undefined;
}

function addrEndpoint(
	addr: PlanetAddr | undefined,
): { host: string; port: number } | undefined {
	if (!addr?.ip) return undefined;
	if (
		addr.trpt !== undefined && addr.trpt !== 0 && addr.trpt !== 1
	) return undefined;
	const port = typeof addr.port === "number"
		? addr.port
		: firstPort(addr.ports);
	if (
		typeof port !== "number" || !Number.isInteger(port) || port <= 0 ||
		port > 65535
	) return undefined;
	return { host: addr.ip, port };
}

function bridgeInfoAddr(bytes: Uint8Array | undefined): PlanetAddr | undefined {
	if (!bytes) return undefined;
	try {
		const addr = decodeFields(bytes).find((f) =>
			f.tag === 1 && f.value instanceof Uint8Array
		)?.value as Uint8Array | undefined;
		return addr ? decodePlanetAddr(addr) : undefined;
	} catch {
		return undefined;
	}
}

export class PlanetTransport implements CallTransport {
	onConference?: (members: ConferenceMember[]) => void;
	#conference = new ConferenceState();
	#pdtp = new PdtpReceiver();
	#opts: PlanetTransportOpts;
	#sock?: DgramSocket;
	#route?: CallRouteParsed;
	#local?: EphemeralKeypair;
	#sendKeys?: TransportKeys;
	#recvKeys?: TransportKeys;
	#sessId?: Uint8Array;
	#bootstrapSeed?: Uint8Array;
	#sendLabel = 0;
	#callUuid?: string;
	#callUuid16?: Uint8Array;
	#localMediaOffer?: PlanetLocalMediaOffer;
	#localMediaChanId = 1n;
	#srtpSend?: SrtpCryptoContext;
	#srtpRecv?: SrtpCryptoContext;
	#videoSend?: SrtpCryptoContext;
	#videoRecv?: SrtpCryptoContext;
	#videoAssembler = new Evs3Assembler();
	#videoRtp?: {
		payloadType: number;
		ssrc: number;
		recvSsrc: number;
		seq: number;
		pictureId: number;
	};
	#groupDataSrtpSend?: SrtpCryptoContext;
	#dataSrtpRecv?: SrtpCryptoContext;
	#groupDataPayloadType?: number;
	#groupDataReceiveQueue: SerialTaskQueue;
	#groupVideoReceiveQueue: SerialTaskQueue;
	#videoReceiveQueue: SerialTaskQueue;
	#groupVideoSrtpRecv?: SrtpCryptoContext;
	#groupVideoSrtpSend?: SrtpCryptoContext;
	#groupVideoSendSsrc?: number;
	#groupVideoSendSeq = 0;
	#groupVideoPictureId = 0;
	#groupVideoResolution?: 0 | 1 | 2 | 3;
	#groupVideoRequested = false;
	#groupVideoCodec: 3 | 4 | undefined = 3;
	#localVideoEnabled = false;
	#localVideoStarted = false;
	#remoteVideoEnabled = false;
	#initialVideo = false;
	#groupVideoPayloadType?: number;
	#groupVideoSources = new Map<number, string>();
	#pausedGroupVideo = new Set<number>();
	#groupVideoSubscriptions = new Map<
		number,
		{ mid: string; channel: number }
	>();
	#groupVideoSubscriptionSequence = 0;
	#groupVideoSubscriptionTask?: Promise<void>;
	#groupVideoAssemblers = new Map<number, {
		assembler: Evs3Assembler;
		spatialId?: number;
		receivingSpatialId?: number;
	}>();
	#videoQueue: EncodedVideoFrame[] = [];
	#videoWaiters = new AsyncWaitQueue<EncodedVideoFrame>();
	#videoControl?: {
		tranId: Uint8Array;
		resolve: (data: Uint8Array | undefined) => void;
		reject: (error: Error) => void;
	};
	#mediaKeyMode?: PlanetMediaKeyMode;
	#mediaKeyCandidates: MediaKeyCandidate[] = [];
	#rtp?: {
		host: string;
		port: number;
		payloadType: number;
		ssrc: number;
		seq: number;
		timestamp: number;
	};
	#groupDataRtp?: {
		ssrc: number;
		seq: number;
		timestamp: number;
		index: number;
		number: bigint;
	};
	#rtpQueue = new BoundedQueue<Uint8Array>(
		100,
		1_048_576,
		(packet) => packet.byteLength,
	);
	#rtpWaiters = new AsyncWaitQueue<Uint8Array>();
	#keepaliveTimer?: ReturnType<typeof setTimeout>;
	#srcChanId = 1n;
	#setupSent = false;
	#groupJoined = false;
	#groupDataSessionSent = false;
	#groupAudioSsrc?: number;
	#groupAudioExtensionIndex = 0;
	#groupRxAudioSsrc?: number;
	#groupDataSsrc?: number;
	#groupRxDataSsrc?: number;
	#groupRtcpSsrc?: number;
	#groupRtcpSent = false;
	#remoteCcChanId = 0n;
	#remoteMediaChanId = 0n;
	#targetMid?: string;
	#closed = true;
	#autoConnRspDuplicates = false;
	#connRspDuplicateInFlight = false;

	// Per-msg sequence + protocol state
	#nextSeq = 0x01d0;
	#tranSeq = 1;
	#msgIdCounter = 1;

	// loc_nonce we generate, rmt_nonce we learn from cscf's first reply
	#locNonce = 0n;
	#rmtNonce = 0n;
	#nonceLearned = false;

	#pending: Array<(env: PlanetIncomingMessage | Error) => void> = [];
	#queued = new BoundedQueue<PlanetIncomingMessage>(256, 256);

	#endReason?: PlanetEndReason;
	#resolveEnded!: (reason: PlanetEndReason) => void;
	#ended: Promise<PlanetEndReason>;
	#closePromise?: Promise<void>;
	#relRspInFlight = new Set<Promise<void>>();
	#incoming?: IncomingState;
	#incomingAbort?: () => void;

	constructor(opts: PlanetTransportOpts) {
		this.#opts = opts;
		const onReceiveError = (type: string) => (error: unknown) => {
			this.#debug({
				type,
				reason: error instanceof Error ? error.message : String(error),
			});
		};
		this.#groupDataReceiveQueue = new SerialTaskQueue(
			128,
			1_048_576,
			onReceiveError("group_data_recv_fail"),
		);
		this.#groupVideoReceiveQueue = new SerialTaskQueue(
			128,
			1_048_576,
			onReceiveError("group_video_recv_fail"),
		);
		this.#videoReceiveQueue = new SerialTaskQueue(
			128,
			1_048_576,
			onReceiveError("video_recv_fail"),
		);
		this.#ended = new Promise((resolve) => {
			this.#resolveEnded = resolve;
		});
	}

	get conferenceMembers(): ConferenceMember[] {
		return this.#conference.members;
	}

	get videoAvailable(): boolean {
		return Boolean(
			!this.#closed &&
				(this.#groupJoined
					? this.#groupVideoSrtpRecv &&
						this.#groupVideoPayloadType !== undefined
					: this.#videoRecv && this.#videoRtp),
		);
	}

	#emitConference(): void {
		const sources = new Map(
			this.#conference.videoSources
				.filter((source) => source.mid !== this.#opts.localMid)
				.map((source) => [source.ssrc, source.mid] as const),
		);
		for (const [ssrc, mid] of this.#groupVideoSources) {
			if (sources.get(ssrc) !== mid) {
				this.#groupVideoAssemblers.get(ssrc)?.assembler.clear();
				this.#groupVideoAssemblers.delete(ssrc);
				this.#pausedGroupVideo.delete(ssrc);
			}
		}
		this.#groupVideoSources = sources;
		this.onConference?.(this.#conference.members);
		this.#syncGroupVideoSubscriptions();
	}

	#syncGroupVideoSubscriptions(): void {
		if (
			this.#groupVideoSubscriptionTask || !this.#groupJoined ||
			!this.#groupDataSessionSent || this.#closed || !this.#remoteMediaChanId
		) return;
		const desired = new Map<number, { mid: string; channel: number }>();
		for (const source of this.#conference.videoSources) {
			if (source.mid !== this.#opts.localMid && desired.size < 30) {
				desired.set(source.ssrc, { mid: source.mid, channel: source.channel });
			}
		}
		const requests: Array<{ ssrc: number; channel: number; start: boolean }> =
			[];
		for (const [ssrc, old] of this.#groupVideoSubscriptions) {
			const next = desired.get(ssrc);
			if (!next || next.mid !== old.mid || next.channel !== old.channel) {
				requests.push({ ssrc, channel: old.channel, start: false });
			}
		}
		for (const [ssrc, next] of desired) {
			const old = this.#groupVideoSubscriptions.get(ssrc);
			if (!old || old.mid !== next.mid || old.channel !== next.channel) {
				requests.push({ ssrc, channel: next.channel, start: true });
			}
		}
		if (!requests.length) return;
		let succeeded = false;
		const task = (async () => {
			const mc = packPlanetMcMsg(
				{
					cid: this.#callUuid!,
					srcChanId: this.#localMediaChanId,
					dstChanId: this.#remoteMediaChanId,
				},
				wrapMcMsg(
					MC_MSG.STRM_REQ,
					packMcStrmReq(this.#groupVideoSubscriptionSequence++ >>> 0, requests),
				),
			);
			await this.#sendEnvelope({ kind: "mc", data: mc }, { msgId: 0x318d });
			this.#groupVideoSubscriptions = desired;
			succeeded = true;
		})().catch((error) => {
			this.#debug({
				type: "group_video_subscription_failed",
				reason: error instanceof Error ? error.message : String(error),
			});
		}).finally(() => {
			if (this.#groupVideoSubscriptionTask === task) {
				this.#groupVideoSubscriptionTask = undefined;
				if (succeeded) this.#syncGroupVideoSubscriptions();
			}
		});
		this.#groupVideoSubscriptionTask = task;
	}

	/** Resolves on local close or remote release; receive finishes and send rejects. */
	get ended(): Promise<PlanetEndReason> {
		return this.#ended;
	}
	get endReason(): PlanetEndReason | undefined {
		return this.#endReason;
	}

	#end(reason: PlanetEndReason): void {
		if (this.#endReason) return;
		this.#endReason = reason;
		this.#closed = true;
		this.#clearKeepalive();
		this.#rtpQueue.clear();
		this.#queued.clear();
		this.#groupDataReceiveQueue.clear();
		this.#groupVideoReceiveQueue.clear();
		this.#videoReceiveQueue.clear();
		for (const waiter of this.#pending.splice(0)) {
			waiter(callEndedError(reason));
		}
		this.#rtpWaiters.close();
		this.#resolveEnded(reason);
		this.#videoQueue = [];
		this.#videoControl?.reject(callEndedError(reason));
		this.#videoControl = undefined;
		this.#videoWaiters.close();
	}

	#debug(event: Record<string, unknown>) {
		try {
			this.#opts.debug?.(event);
		} catch { /* debug hooks must never affect transport */ }
	}

	get localMediaOffer(): PlanetLocalMediaOffer | undefined {
		const local = this.#localMediaOffer;
		if (!local) return undefined;
		return {
			keypair: {
				publicKey: copyBytes(local.keypair.publicKey),
				privateKey: copyBytes(local.keypair.privateKey),
			},
			material: cloneMediaOfferMaterial(local.material),
			offer: copyBytes(local.offer),
		};
	}

	async connect(
		opts: {
			route: IncomingCallRoute | LINETypes.CallRoute | LINETypes.GroupCallRoute;
			kind?: "AUDIO" | "VIDEO" | "FACEPLAY";
		},
	): Promise<void> {
		this.#initialVideo = opts.kind === "VIDEO";
		this.#incoming = undefined;
		this.#rmtNonce = 0n;
		this.#nonceLearned = false;
		this.#route = isGroupRoute(opts.route)
			? parseGroupRoute(opts.route)
			: parseRoute(opts.route);
		this.#local = this.#opts.transportKeypair
			? {
				privateKey: copyBytes(this.#opts.transportKeypair.privateKey),
				publicKey: copyBytes(this.#opts.transportKeypair.publicKey),
			}
			: generateEphemeralKeypair();
		this.#sessId = new Uint8Array(0);
		this.#bootstrapSeed = newSessionId();
		this.#sendLabel = crypto.getRandomValues(new Uint16Array(1))[0];
		this.#callUuid16 = crypto.getRandomValues(new Uint8Array(16));
		this.#callUuid = crypto.randomUUID();
		this.#msgIdCounter = randomVarint2();
		this.#tranSeq = randomNativeTranSeq();
		if (this.#route.groupToken) {
			this.#srcChanId = BigInt(randomNativeGroupCcChanId());
			this.#localMediaChanId = BigInt(randomNativeGroupMediaChanId());
		} else {
			this.#srcChanId = BigInt(randomNativeLargeId());
			this.#localMediaChanId = this.#srcChanId;
		}
		this.#nextSeq = randomInitialFrameSeq();
		this.#setupSent = false;
		this.#groupJoined = false;
		this.#conference = new ConferenceState();
		this.#pdtp = new PdtpReceiver();
		this.#groupDataReceiveQueue.clear();
		this.#groupVideoReceiveQueue.clear();
		this.#videoReceiveQueue.clear();
		this.#groupVideoSrtpRecv = undefined;
		this.#groupVideoSrtpSend = undefined;
		this.#groupVideoSendSsrc = undefined;
		this.#groupVideoRequested = false;
		this.#groupVideoCodec = 3;
		this.#localVideoEnabled = false;
		this.#localVideoStarted = false;
		this.#groupVideoResolution = undefined;
		this.#groupVideoPayloadType = undefined;
		this.#groupVideoSources.clear();
		this.#pausedGroupVideo.clear();
		this.#groupVideoSubscriptions.clear();
		this.#groupVideoSubscriptionSequence = 0;
		this.#groupVideoSubscriptionTask = undefined;
		this.#groupVideoAssemblers.clear();
		this.#videoQueue = [];
		this.#groupDataSessionSent = false;
		this.#groupAudioSsrc = undefined;
		this.#groupAudioExtensionIndex = 0;
		this.#groupRxAudioSsrc = undefined;
		this.#groupDataSsrc = undefined;
		this.#groupRxDataSsrc = undefined;
		this.#groupRtcpSsrc = undefined;
		this.#groupRtcpSent = false;
		this.#remoteCcChanId = 0n;
		this.#remoteMediaChanId = 0n;
		this.#targetMid = undefined;
		this.#autoConnRspDuplicates = false;
		this.#connRspDuplicateInFlight = false;
		this.#localMediaOffer = undefined;
		this.#srtpSend = undefined;
		this.#srtpRecv = undefined;
		this.#groupDataSrtpSend = undefined;
		this.#dataSrtpRecv = undefined;
		this.#groupDataPayloadType = undefined;
		this.#mediaKeyMode = undefined;
		this.#mediaKeyCandidates = [];
		this.#rtp = undefined;
		this.#groupDataRtp = undefined;
		this.#rtpQueue.clear();
		this.#queued.clear();
		this.#clearKeepalive();
		this.#endReason = undefined;
		this.#closePromise = undefined;
		this.#ended = new Promise((resolve) => {
			this.#resolveEnded = resolve;
		});
		this.#closed = false;

		// Native bootstrap uses a local seed/label for the first outbound SETUP.
		// The first inbound packet carries its own seed/label, so receive keys
		// are derived lazily from that packet before HMAC verification.
		this.#sendKeys = this.#deriveSendKeys(
			this.#bootstrapSeed,
			this.#sendLabel,
		);
		this.#recvKeys = undefined;

		this.#locNonce = BigInt(randomNativeLargeId());

		if (!this.#opts.wireSend) {
			const dgram = await import("node:dgram");
			const isIPv6 = !!this.#opts.preferIpv6 && !!this.#route.cscfHost6;
			const sock = dgram.createSocket(isIPv6 ? "udp6" : "udp4");
			this.#sock = sock;
			await new Promise<void>((resolve, reject) => {
				const fail = (error: Error) => {
					clearTimeout(timer);
					try {
						sock.close();
					} catch (closeError) {
						if (
							(closeError as NodeJS.ErrnoException).code !==
								"ERR_SOCKET_DGRAM_NOT_RUNNING"
						) {
							reject(closeError);
							return;
						}
					}
					if (this.#sock === sock) this.#sock = undefined;
					reject(error);
				};
				const timer = setTimeout(
					() => fail(new Error("PLANET socket bind timeout")),
					this.#opts.timeoutMs ?? 10000,
				);
				sock.once("error", fail);
				sock.bind({ address: isIPv6 ? "::" : "0.0.0.0", port: 0 }, () => {
					clearTimeout(timer);
					sock.removeListener("error", fail);
					sock.on("error", () => this.#end({ by: "local" }));
					resolve();
				});
			});
			sock.on("message", (buf, rinfo) =>
				this.#onWire(new Uint8Array(buf), {
					host: rinfo.address,
					port: rinfo.port,
				}));
		}
	}

	#onWire(wire: Uint8Array, source?: { host: string; port: number }) {
		try {
			if (this.#opts.debug) {
				this.#debug({
					type: "recv",
					bytes: wire.length,
					rtpLike: isRtpLike(wire),
					sourceFamily: source?.host.includes(":")
						? "ipv6"
						: source
						? "ipv4"
						: "",
					sourcePort: source?.port,
				});
			}
			if (this.#endReason && isRtpLike(wire)) return;
			if (this.#srtpRecv && isRtpLike(wire)) {
				if (
					this.#groupJoined && this.#dataSrtpRecv &&
					this.#groupDataPayloadType === (wire[1] & 0x7f)
				) {
					if (
						this.#groupDataReceiveQueue.enqueue(
							() => this.#handleGroupData(wire, source),
							wire.byteLength,
						) === null
					) {
						this.#debug({ type: "group_data_queue_overflow" });
						this.#end({ by: "local" });
					}
					return;
				}
				if (
					this.#groupJoined && this.#groupVideoSrtpRecv &&
					this.#groupVideoPayloadType === (wire[1] & 0x7f)
				) {
					const evicted = this.#groupVideoReceiveQueue.enqueue(
						() => this.#handleGroupVideo(wire, source),
						wire.byteLength,
						"drop-oldest",
					);
					if (evicted === null || evicted > 0) {
						this.#debug({
							type: "group_video_queue_evicted",
							dropped: evicted ?? 1,
						});
					}
					return;
				}
				if (
					!this.#groupJoined && this.#videoRecv && this.#videoRtp &&
					this.#videoRtp.payloadType === (wire[1] & 0x7f)
				) {
					const evicted = this.#videoReceiveQueue.enqueue(
						() => this.#handleOneToOneVideo(wire, source),
						wire.byteLength,
						"drop-oldest",
					);
					if (evicted === null || evicted > 0) {
						this.#debug({
							type: "video_queue_evicted",
							dropped: evicted ?? 1,
						});
					}
					return;
				}
				if (this.#opts.debug) {
					this.#debug({
						type: "rtp_recv",
						bytes: wire.length,
						payloadType: wire[1] & 0x7f,
						marker: (wire[1] & 0x80) !== 0,
						seq: wire.length >= 4 ? ((wire[2] << 8) | wire[3]) : undefined,
						ssrc: wire.length >= 12
							? (((wire[8] << 24) | (wire[9] << 16) | (wire[10] << 8) |
								wire[11]) >>> 0)
							: undefined,
					});
				}
				this.#updateRtpEndpointFromSource(source);
				this.#enqueueRtp(wire);
				return;
			}
			if (wire.length < HEADER_LEN + 16) {
				this.#debug({ type: "recv_ignored", reason: "short" });
				return;
			}
			parseFrameHeader(wire);
			const previousRecvKeys = this.#recvKeys;
			const pt = this.#decryptWire(wire);
			if (!pt) {
				this.#debug({ type: "decrypt_fail" });
				return;
			}
			this.#debug({ type: "decrypt_ok", plainBytes: pt.length });
			const incoming: PlanetIncomingMessage = { plaintext: pt, source };
			let handled = false;
			let decodedMessage: ReturnType<typeof decodePlanetMsg> | undefined;
			// Authenticate and correlate before mutating session state or auto-replying.
			if (this.#incoming) {
				let correlated = false;
				try {
					decodedMessage = decodePlanetMsg(pt);
					correlated = this.#matchesIncoming(decodedMessage);
				} catch { /* malformed */ }
				if (!correlated) {
					this.#recvKeys = previousRecvKeys;
					return;
				}
			}
			try {
				let msg: ReturnType<typeof decodePlanetMsg>;
				try {
					msg = decodedMessage ?? decodePlanetMsg(pt);
				} catch (error) {
					try {
						decodeFields(pt);
					} catch {
						this.#debug({
							type: "raw_plain",
							plainBytes: pt.length,
							head: this.#opts.debug ? bytesToHex(pt, 48) : undefined,
							decodeError: error instanceof Error
								? error.message
								: String(error),
						});
						const waiter = this.#pending.shift();
						if (waiter) waiter(incoming);
						else this.#queueControl(incoming);
					}
					return;
				}
				incoming.message = msg;
				if (msg.hdr?.locNonce !== undefined && !this.#nonceLearned) {
					this.#rmtNonce = msg.hdr.locNonce;
					this.#nonceLearned = true;
				}
				if (this.#opts.debug) {
					const outer = decodeFields(pt);
					this.#debug({ type: "plain_shape", outer: fieldShape(outer) });
					if (
						outer.length === 1 &&
						outer[0]?.value instanceof Uint8Array &&
						outer[0].tag !== 1 && outer[0].tag !== 3
					) {
						this.#debug({
							type: "raw_plain",
							plainBytes: pt.length,
							tag: outer[0].tag,
							bodyLen: outer[0].value.length,
							head: bytesToHex(pt, 48),
						});
					}
					const ccBytes = outer.find((f) =>
						f.tag === 3 && f.value instanceof Uint8Array
					)?.value as Uint8Array | undefined;
					if (ccBytes) {
						const ccFields = decodeFields(ccBytes);
						const bodyBytes = ccFields.find((f) =>
							f.tag === 2 && f.value instanceof Uint8Array
						)?.value as Uint8Array | undefined;
						this.#debug({
							type: "cc_shape",
							cc: fieldShape(ccFields),
							body: bodyBytes ? fieldShape(decodeFields(bodyBytes)) : [],
						});
					}
					if (msg.mc?.bodyBytes) {
						const mcFields = decodeFields(msg.mc.bodyBytes);
						this.#debug({
							type: "mc_shape",
							mc: msg.mc.bodyName ?? "",
							mcTag: msg.mc.bodyTag ?? 0,
							body: fieldShape(mcFields),
						});
						if (msg.mc.bodyTag === MC_MSG.DATA_RSP) {
							this.#debug({
								type: "mc_data_rsp",
								result: fieldNumber(mcFields, 1),
								relCode: fieldNumber(mcFields, 2),
								relPhrase: fieldText(mcFields, 3),
								relPhraseLen: (mcFields.find((f) => f.tag === 3)?.value as
									| Uint8Array
									| undefined)?.length,
							});
						}
					}
				}
				if (this.#endReason && msg.cc?.bodyTag !== CC_MSG.REL_REQ) return;
				if (msg.mc?.bodyBytes) {
					if (msg.mc.bodyTag === MC_MSG.DATA_RSP) {
						handled = true;
						const pending = this.#videoControl;
						if (
							pending && msg.hdr?.tranId &&
							tagEquals(pending.tranId, msg.hdr.tranId)
						) {
							const response = decodeMcDataRsp(msg.mc.bodyBytes);
							if (response.result || response.relCode) {
								pending.reject(new Error("Video control rejected"));
							} else pending.resolve(response.data);
							this.#videoControl = undefined;
						}
					}
					if (msg.mc.bodyTag === MC_MSG.DATA_REQ) {
						handled = true;
						void this.#sendMcDataRsp(
							incoming as PlanetIncomingMessage & {
								message: ReturnType<typeof decodePlanetMsg>;
							},
						).catch(() => {});
					}
					if (msg.mc.bodyTag === MC_MSG.JOIN_REQ) {
						void this.#sendMcJoinRsp(
							incoming as PlanetIncomingMessage & {
								message: ReturnType<typeof decodePlanetMsg>;
							},
						).catch(() => {});
					}
					if (msg.mc.bodyTag === MC_MSG.CHANGE_REQ) {
						void this.#sendMcChangeRsp(
							incoming as PlanetIncomingMessage & {
								message: ReturnType<typeof decodePlanetMsg>;
							},
						).catch(() => {});
					}
					const mcHdr = msg.mc.hdr;
					const streamControlHdrValid = Boolean(
						mcHdr?.cid && mcHdr.cid === this.#callUuid &&
							mcHdr.srcChanId === this.#remoteMediaChanId &&
							mcHdr.dstChanId === this.#localMediaChanId,
					);
					if (
						this.#groupJoined && streamControlHdrValid &&
						msg.mc.bodyTag === MC_MSG.STRM_REQ
					) {
						const request = decodeMcStrmReq(msg.mc.bodyBytes);
						const validRequest = this.#groupVideoSendSsrc !== undefined &&
							!request.requests.some((entry) =>
								entry.ssrc !== this.#groupVideoSendSsrc ||
								(entry.mid !== undefined && entry.mid !== this.#opts.localMid)
							);
						if (validRequest) {
							const wasRequested = this.#groupVideoRequested;
							const previousCodec = this.#groupVideoCodec;
							this.#groupVideoRequested = request.requests.some((entry) =>
								entry.type === 1
							);
							const activeRequest = request.requests.find((entry) =>
								entry.type === 1
							);
							if (activeRequest) {
								const preferredCodec = activeRequest.layers.find((layer) =>
									layer.codec === 0 || layer.codec === 1
								)?.codec;
								this.#groupVideoCodec =
									activeRequest.encoding === 2 || preferredCodec === undefined
										? undefined
										: preferredCodec === 1
										? 4
										: 3;
							}
							if (
								!this.#groupVideoRequested ||
								this.#groupVideoCodec !== previousCodec || !wasRequested ||
								activeRequest?.startOperation === 1
							) {
								this.#groupVideoResolution = undefined;
							}
							const strmRsp = packPlanetMcMsg(
								{
									cid: msg.mc.hdr?.cid ?? this.#callUuid ?? "strm-rsp",
									srcChanId: this.#localMediaChanId,
									dstChanId: msg.mc.hdr?.srcChanId ?? this.#remoteMediaChanId,
								},
								wrapMcMsg(
									MC_MSG.STRM_RSP,
									packMcDataRsp({ result: 0, relCode: 0 }),
								),
							);
							void this.#sendEnvelope(
								{ kind: "mc", data: strmRsp },
								{ msgId: 0x328d, replyTo: msg.hdr },
							).catch((error) =>
								this.#debug({
									type: "group_video_strm_rsp_error",
									error: String(error),
								})
							);
						}
					}
					if (
						this.#groupJoined && streamControlHdrValid &&
						msg.mc.bodyTag === MC_MSG.NOTIFY_STRM_REQ
					) {
						for (const update of decodeMcNotifyStrmReq(msg.mc.bodyBytes)) {
							const mid = this.#groupVideoSources.get(update.ssrc);
							if (!mid || (update.mid !== undefined && update.mid !== mid)) {
								continue;
							}
							const channel = this.#conference.videoSources.find((source) =>
								source.ssrc === update.ssrc && source.mid === mid
							)?.channel ??
								this.#groupVideoSubscriptions.get(update.ssrc)?.channel;
							if (channel !== undefined && channel !== update.channel) {
								continue;
							}
							if (update.state === 2) {
								this.#pausedGroupVideo.delete(update.ssrc);
							} else this.#pausedGroupVideo.add(update.ssrc);
						}
						const notifyRsp = packPlanetMcMsg(
							{
								cid: mcHdr!.cid!,
								srcChanId: this.#localMediaChanId,
								dstChanId: mcHdr!.srcChanId!,
							},
							wrapMcMsg(
								MC_MSG.NOTIFY_STRM_RSP,
								packMcDataRsp({ result: 0, relCode: 0 }),
							),
						);
						void this.#sendEnvelope(
							{ kind: "mc", data: notifyRsp },
							{ msgId: 0x328f, replyTo: msg.hdr },
						).catch((error) =>
							this.#debug({
								type: "group_video_notify_rsp_error",
								error: String(error),
							})
						);
					}
				}
				this.#debug({
					type: "planet_msg",
					cc: msg.cc?.bodyName ?? "",
					ccTag: msg.cc?.bodyTag ?? 0,
					mc: msg.mc?.bodyName ?? "",
					mcTag: msg.mc?.bodyTag ?? 0,
				});
				if (msg.hdr?.sessId?.length) this.#sessId = msg.hdr.sessId;
				if (msg.hdr?.locNonce !== undefined && !this.#nonceLearned) {
					this.#rmtNonce = msg.hdr.locNonce;
					this.#nonceLearned = true;
				}
				if (msg.cc?.bodyTag === CC_MSG.INFO_REQ && msg.cc.bodyBytes) {
					handled = true;
					void this.#sendInfoRsp(
						incoming as PlanetIncomingMessage & {
							message: ReturnType<typeof decodePlanetMsg>;
						},
					).catch(() => {});
				}
				if (msg.cc?.bodyTag === CC_MSG.PUSH_REQ && msg.cc.bodyBytes) {
					try {
						const push = decodeCcPushReq(msg.cc.bodyBytes);
						if (
							this.#groupJoined && push.contentsType === 1 &&
							push.contents?.length &&
							this.#conference.acceptInfo(
								push.contents,
								push.compContentsType ?? 0,
							)
						) this.#emitConference();
					} catch (e) {
						this.#debug({
							type: "conference_update_rejected",
							reason: e instanceof Error ? e.message : String(e),
						});
					}
					void this.#sendSimpleCcRsp(
						incoming as PlanetIncomingMessage & {
							message: ReturnType<typeof decodePlanetMsg>;
						},
						CC_MSG.PUSH_RSP,
					).catch(() => {});
					return;
				}
				if (msg.cc?.bodyTag === CC_MSG.REL_REQ && msg.cc.bodyBytes) {
					let relReq: ReturnType<typeof decodeCcRelReq> | undefined;
					try {
						relReq = decodeCcRelReq(msg.cc.bodyBytes);
						this.#debug({
							type: "rel_req",
							relCode: relReq.relCode,
							relPhrase: relReq.relPhrase,
							relPhraseLen: relReq.relPhrase?.length,
							releaser: relReq.releaser,
							releaserLen: relReq.releaser?.length,
							commMediaFlags: relReq.commMediaFlags,
							userRelCode: relReq.userRelCode,
							userRelCodeLen: relReq.userRelCode?.length,
							roomDestroy: relReq.roomDestroy,
						});
					} catch {
						// Keep processing even if a newer REL shape appears.
					}
					const reply = this.#sendRelRsp(msg).catch((e) => {
						this.#debug({ type: "rel_rsp_send_fail", reason: String(e) });
					}).finally(() => this.#relRspInFlight.delete(reply));
					this.#relRspInFlight.add(reply);
					this.#end({
						by: "remote",
						relCode: relReq?.relCode,
						releaser: relReq?.releaser,
					});
					return;
				}
				if (this.#endReason) return;
				if (msg.cc?.bodyTag === CC_MSG.CONN_REQ && msg.cc.bodyBytes) {
					void this.#sendDuplicateConnRsp(
						incoming as PlanetIncomingMessage & {
							message: ReturnType<typeof decodePlanetMsg>;
						},
					).catch(() => {});
				}
			} catch {
				// Keep the raw reply flowing even if a newer message type is unknown.
			}

			const w = handled ? undefined : this.#pending.shift();
			if (w) w(incoming);
			else if (!handled) this.#queueControl(incoming);
		} catch (_e) {
			this.#debug({ type: "recv_error" });
			// Probably SRTP media or malformed — ignore
		}
	}

	#enqueueRtp(packet: Uint8Array) {
		if (this.#endReason) return;
		if (!this.#rtpWaiters.push(packet)) {
			const evicted = this.#rtpQueue.push(packet, "drop-oldest");
			if (evicted === null) {
				this.#debug({
					type: "media_packet_dropped",
					reason: "packet_over_limit",
				});
			} else if (evicted > 0) {
				this.#debug({
					type: "media_queue_evicted",
					packets: evicted,
					queuedPackets: this.#rtpQueue.size,
					queuedBytes: this.#rtpQueue.weight,
				});
			}
		}
	}

	#queueControl(incoming: PlanetIncomingMessage): void {
		if (this.#queued.push(incoming) !== null) return;
		this.#debug({
			type: "control_queue_overflow",
			limit: this.#queued.capacity,
		});
		this.#end({ by: "local" });
		void this.close().catch((error) => {
			this.#debug({
				type: "control_queue_close_failed",
				reason: String(error),
			});
		});
	}

	#updateRtpEndpointFromSource(
		source: { host: string; port: number } | undefined,
	) {
		if (!source || !this.#rtp) return;
		if (this.#rtp.host === source.host && this.#rtp.port === source.port) {
			return;
		}
		if (this.#groupJoined || this.#incoming) {
			this.#debug({
				type: "media_endpoint_learn_skipped",
				reason: "group_fixed_route",
				family: source.host.includes(":") ? "ipv6" : "ipv4",
				sourcePort: source.port,
				currentPort: this.#rtp.port,
			});
			return;
		}
		this.#rtp.host = source.host;
		this.#rtp.port = source.port;
		this.#debug({
			type: "media_endpoint_learned",
			family: source.host.includes(":") ? "ipv6" : "ipv4",
			port: source.port,
		});
	}

	#takeRtp(): CancellableRead<Uint8Array> {
		if (this.#endReason) {
			return { promise: Promise.resolve(null), cancel: () => false };
		}
		const queued = this.#rtpQueue.shift();
		if (queued) {
			return {
				promise: Promise.resolve(queued),
				cancel: () => false,
			};
		}
		return this.#rtpWaiters.read();
	}

	async #decryptMediaRtp(
		wire: Uint8Array,
	): Promise<{ rtp: Uint8Array; mode: string; switched: boolean }> {
		if (!this.#srtpRecv) {
			throw new Error("PlanetTransport.receive: media not established");
		}
		try {
			return {
				rtp: await srtpDecrypt(this.#srtpRecv, wire),
				mode: String(this.#mediaKeyMode ?? "current"),
				switched: false,
			};
		} catch (e) {
			if (this.#mediaKeyMode !== "auto") throw e;
		}
		for (const candidate of this.#mediaKeyCandidates) {
			if (candidate.recvContext === this.#srtpRecv) continue;
			try {
				const rtp = await srtpDecrypt(candidate.recvContext, wire);
				this.#srtpSend = candidate.sendContext;
				this.#srtpRecv = candidate.recvContext;
				this.#videoSend = candidate.videoSendContext;
				this.#videoRecv = candidate.videoRecvContext;
				this.#debug({
					type: "media_key_selected",
					mode: candidate.mode,
					send: candidate.send,
					recv: candidate.recv,
				});
				return { rtp, mode: candidate.mode, switched: true };
			} catch { /* try next candidate */ }
		}
		throw new Error("SRTP auth tag mismatch");
	}

	#decryptWire(wire: Uint8Array): Uint8Array | null {
		if (wire.length < HEADER_LEN + 16) return null;
		if (looksBootstrapFrame(wire)) {
			const bootstrap = this.#decryptBootstrapWire(wire);
			if (bootstrap) return bootstrap;
			return this.#recvKeys
				? this.#decryptWithKeys(wire, this.#recvKeys, HEADER_LEN)
				: null;
		}
		const regular = this.#recvKeys
			? this.#decryptWithKeys(wire, this.#recvKeys, HEADER_LEN)
			: null;
		if (regular) return regular;
		return this.#decryptBootstrapWire(wire);
	}

	#deriveSendKeys(seed: Uint8Array, label: number): TransportKeys {
		if (!this.#local || !this.#route) throw new Error("connect first");
		const secret = ecdh(this.#local.privateKey, this.#route.peerPub);
		const stage1 = planetHkdfStage1(
			secret,
			this.#route.peerPub,
			this.#local.publicKey,
		);
		return planetHkdfStage2(stage1, seed, buildDirectionLabel(label));
	}

	#deriveRecvKeys(seed: Uint8Array, label: number): TransportKeys {
		if (!this.#local || !this.#route) throw new Error("connect first");
		const secret = ecdh(this.#local.privateKey, this.#route.peerPub);
		const stage1 = planetHkdfStage1(
			secret,
			this.#local.publicKey,
			this.#route.peerPub,
		);
		return planetHkdfStage2(stage1, seed, buildDirectionLabel(label));
	}

	#decryptBootstrapWire(wire: Uint8Array): Uint8Array | null {
		if (wire.length < BOOTSTRAP_CIPHER_OFFSET + 16) return null;
		const label = ((wire[HEADER_LEN] << 8) | wire[HEADER_LEN + 1]) & 0xffff;
		const seed = copyBytes(
			wire.subarray(HEADER_LEN + 2, HEADER_LEN + 18),
		);
		const keys = this.#deriveRecvKeys(seed, label);
		const plaintext = this.#decryptWithKeys(
			wire,
			keys,
			BOOTSTRAP_CIPHER_OFFSET,
		);
		if (!plaintext) return null;
		this.#recvKeys = keys;
		return plaintext;
	}

	#decryptWithKeys(
		wire: Uint8Array,
		keys: TransportKeys,
		cipherOffset: number,
	): Uint8Array | null {
		if (wire.length < cipherOffset + 16) return null;
		const seq = readCipherSequence(wire, cipherOffset);
		const tag = wire.subarray(wire.length - 16);
		const macInput = wire.subarray(0, wire.length - 16);
		const ct = wire.subarray(cipherOffset, wire.length - 16);
		const expected = hmacTag(keys.macKey, macInput);
		if (!tagEquals(tag, expected)) return null;
		return aesCtrDecrypt(
			keys.encKey,
			buildPlanetCtrIv(keys.ctrBase, seq),
			ct,
		);
	}

	#encrypt(plaintext: Uint8Array, seq: number): Uint8Array {
		if (!this.#sendKeys) throw new Error("not connected");
		return aesCtrEncrypt(
			this.#sendKeys.encKey,
			buildPlanetCtrIv(this.#sendKeys.ctrBase, seq),
			plaintext,
		);
	}

	#bootstrapPrefix(): Uint8Array {
		if (!this.#local || !this.#bootstrapSeed) throw new Error("connect first");
		const label = buildDirectionLabel(this.#sendLabel);
		const out = new Uint8Array(
			label.length + this.#bootstrapSeed.length + this.#local.publicKey.length,
		);
		out.set(label, 0);
		out.set(this.#bootstrapSeed, label.length);
		out.set(this.#local.publicKey, label.length + this.#bootstrapSeed.length);
		return out;
	}

	#planetHdr(
		msgId = this.#msgIdCounter++,
		tranId?: Uint8Array,
	): PlanetMsgHdr {
		if (!this.#sessId) throw new Error("connect first");
		if (!tranId) {
			tranId = new Uint8Array(16);
			crypto.getRandomValues(tranId);
		}
		return {
			userId: this.#opts.localMid,
			msgId,
			sessId: this.#sessId,
			tranId,
			tranSeq: this.#tranSeq++,
			locNonce: this.#locNonce,
			rmtNonce: this.#rmtNonce,
		};
	}

	// Genuine responses echo their own request, without consuming a local sequence.
	#planetReplyHdr(
		msgId: number,
		request: DecodedPlanetMsgHdr | undefined,
	): PlanetMsgHdr {
		if (!this.#sessId) throw new Error("connect first");
		if (!request?.tranId?.length || request.tranSeq === undefined) {
			throw new Error("PLANET reply requires the request transaction header");
		}
		return {
			userId: this.#opts.localMid,
			msgId,
			sessId: request.sessId?.length ? request.sessId : this.#sessId,
			tranId: request.tranId,
			tranSeq: request.tranSeq,
			locNonce: this.#locNonce,
			rmtNonce: this.#rmtNonce,
		};
	}

	async #sendEnvelope(
		body: { kind: "sc" | "cc" | "mc"; data: Uint8Array },
		opts: {
			bootstrap?: boolean;
			msgId?: number;
			replyTo?: DecodedPlanetMsgHdr;
			tranId?: Uint8Array;
		} = {},
	): Promise<void> {
		if (
			this.#endReason && opts.msgId !== CASSINI_MSG_ID_REL_REQ &&
			opts.msgId !== ccMsgId(CC_MSG.REL_RSP)
		) {
			throw callEndedError(this.#endReason);
		}
		const hdr = "replyTo" in opts
			? this.#planetReplyHdr(opts.msgId ?? this.#msgIdCounter++, opts.replyTo)
			: this.#planetHdr(opts.msgId, opts.tranId);
		if (this.#incoming && (opts.msgId === 0x2142 || opts.msgId === 0x2144)) {
			this.#incoming.expected = hdr;
		}
		const planetMsg = packPlanetMsg(hdr, body);
		this.#debug({
			type: "send_planet_msg",
			kind: body.kind,
			msgId: hdr.msgId,
			sessIdBytes: hdr.sessId.length,
			tranIdBytes: hdr.tranId.length,
			tranSeqBits: hdr.tranSeq.toString(2).length,
			locNonceBits: hdr.locNonce.toString(2).length,
			rmtNoncePresent: hdr.rmtNonce !== 0n,
		});
		await this.#sendTransportPlaintext(planetMsg, {
			bootstrap: opts.bootstrap,
			raw: false,
		});
	}

	async #sendTransportPlaintext(
		plaintext: Uint8Array,
		opts: { bootstrap?: boolean; raw?: boolean } = {},
	): Promise<void> {
		if ((!this.#sock && !this.#opts.wireSend) || !this.#route) {
			throw new Error("not connected");
		}
		const seq = this.#nextSeq++;
		const prefix = opts.bootstrap ? this.#bootstrapPrefix() : new Uint8Array(0);
		const sec = opts.bootstrap
			? buildBootstrapSecHeader(plaintext.length)
			: new Uint8Array(0);
		const ct = this.#encrypt(plaintext, seq & 0xffff);
		const tagLen = 16;
		const bodyLen = prefix.length + sec.length + ct.length + tagLen;
		const totalLen = HEADER_LEN + bodyLen;
		const chunkLogical = (((totalLen - 4) << 5) |
			(opts.bootstrap ? 0x1d : 0x0d)) & 0xffff;
		const hdr = opts.bootstrap
			? buildObservedFrameHeader(chunkLogical, seq & 0xffff, 0x0602)
			: buildObservedFrameHeader(
				chunkLogical,
				seq & 0xffff,
				regularTail16(plaintext.length, !!opts.raw),
			);
		const macInput = concatBytes([hdr, prefix, sec, ct]);
		const tag = hmacTag(this.#sendKeys!.macKey, macInput);
		const datagram = concatBytes([macInput, tag]);
		const host = this.#opts.preferIpv6 && this.#route.cscfHost6
			? this.#route.cscfHost6
			: this.#route.cscfHost;
		this.#debug({
			type: "send",
			bootstrap: !!opts.bootstrap,
			raw: !!opts.raw,
			seq,
			bytes: datagram.length,
			plainBytes: plaintext.length,
			bodyBytes: bodyLen,
			family: host.includes(":") ? "ipv6" : "ipv4",
		});
		if (this.#opts.wireSend) {
			const reply = await this.#opts.wireSend(datagram, {
				host,
				port: this.#route.cscfPort,
				bootstrap: !!opts.bootstrap,
				seq,
				plainLen: plaintext.length,
				bodyLen,
				plaintext,
			});
			if (reply?.length) this.#onWire(reply);
			return;
		}
		await new Promise<void>((res, rj) =>
			this.#sock!.send(
				Buffer.from(datagram),
				this.#route!.cscfPort,
				host,
				(e) => (e ? rj(e) : res()),
			)
		);
	}

	async #sendPinholeProbes(): Promise<void> {
		for (let i = 0; i < PINHOLE_PROBE_COUNT; i++) {
			if (this.#endReason) throw callEndedError(this.#endReason);
			await this.#sendTransportPlaintext(packPinholeProbe(), { raw: true });
		}
		await this.#sendTransportPlaintext(packPinholeProbeReport(), { raw: true });
	}

	#waitForIncoming(timeoutMs: number): Promise<PlanetIncomingMessage> {
		if (this.#endReason) return Promise.reject(callEndedError(this.#endReason));
		const queued = this.#queued.shift();
		if (queued) return Promise.resolve(queued);
		return new Promise((res, rj) => {
			const waiter = (env: PlanetIncomingMessage | Error) => {
				clearTimeout(t);
				if (env instanceof Error) rj(env);
				else res(env);
			};
			const t = setTimeout(() => {
				const index = this.#pending.indexOf(waiter);
				if (index !== -1) this.#pending.splice(index, 1);
				rj(new Error("PLANET reply timeout"));
			}, timeoutMs);
			this.#pending.push(waiter);
		});
	}

	async #waitForCc(
		bodyTag: number,
		timeoutMs: number,
	): Promise<
		PlanetIncomingMessage & {
			message: ReturnType<typeof decodePlanetMsg>;
		}
	> {
		const deadline = Date.now() + timeoutMs;
		while (true) {
			const remaining = Math.max(1, deadline - Date.now());
			const incoming = await this.#waitForIncoming(remaining);
			if (
				incoming.message?.cc?.bodyTag === bodyTag &&
				incoming.message.cc.bodyBytes
			) {
				return incoming as PlanetIncomingMessage & {
					message: ReturnType<typeof decodePlanetMsg>;
				};
			}
			if (Date.now() >= deadline) throw new Error("PLANET reply timeout");
		}
	}

	async #sendSetup(opts: { to: string }): Promise<void> {
		if (!this.#route || !this.#local) throw new Error("connect first");
		if (this.#incoming) throw new Error("callee cannot send SETUP");
		this.#targetMid = opts.to;
		const cid = this.#callUuid!;
		const localMediaOffer = this.#opts.setupOffer
			? undefined
			: defaultLocalMediaOffer(this.#initialVideo);
		if (localMediaOffer) this.#localMediaOffer = localMediaOffer;
		const setup: CcSetupReq = {
			initiator: this.#opts.localMid,
			responder: opts.to,
			iZone: this.#route.iZone,
			rZone: this.#route.rZone,
			ua: packPlanetUserAgent(
				this.#opts.userAgent ?? defaultAndroidUserAgent(this.#opts.deviceInfo),
			),
			devId: this.#opts.deviceId ?? randomBase64(32),
			commTypeFlags: this.#initialVideo ? 3 : 1,
			capas: this.#opts.capabilities ?? [1, 2, 3, 6, 7],
			// Native LINE sends a 311-byte structured media/security offer here.
			offer: this.#opts.setupOffer ?? localMediaOffer!.offer,
			// Native credential is SHA-256(initiator::responder::fromToken::cid).
			credential: this.#opts.credential ??
				defaultSetupCredential(
					this.#route,
					this.#opts.localMid,
					opts.to,
					cid,
				),
			fakeCall: false,
			svcKey: this.#opts.serviceKey ??
				(this.#initialVideo ? "freecall.video" : AUDIO_SERVICE_KEY),
			netType: 1,
			stid: this.#route.stid,
			features: this.#opts.features ?? defaultSetupFeatures(),
			reqRec: false,
			pathCheck: false,
		};
		const setupBytes = packCcSetupReq(setup);
		const ccBody = wrapCcMsg(CC_MSG.SETUP_REQ, setupBytes);
		const ccMsg = packPlanetCcMsg(
			{ cid, srcChanId: this.#srcChanId, dstChanId: 0n },
			ccBody,
		);
		await this.#sendEnvelope(
			{ kind: "cc", data: ccMsg },
			{ bootstrap: true, msgId: CASSINI_MSG_ID_SETUP_REQ },
		);
		this.#setupSent = true;
	}

	#assertIncomingActive(): void {
		this.#incoming?.signal?.throwIfAborted();
		if (this.#endReason || this.#closed) {
			throw callEndedError(this.#endReason ?? { by: "local" });
		}
	}

	#matchesIncoming(msg: ReturnType<typeof decodePlanetMsg>): boolean {
		const state = this.#incoming!;
		const h = msg.hdr, channel = msg.cc?.hdr ?? msg.mc?.hdr;
		const same = (a?: Uint8Array, b?: Uint8Array) =>
			!!a && !!b &&
			a.length === b.length && a.every((v, i) => v === b[i]);
		if (
			!h || !channel || channel.cid !== this.#callUuid ||
			h.rmtNonce !== this.#locNonce
		) return false;
		if (msg.cc && channel.dstChanId !== this.#srcChanId) return false;
		if (
			msg.mc &&
			(!this.#remoteMediaChanId ||
				channel.dstChanId !== this.#localMediaChanId ||
				channel.srcChanId !== this.#remoteMediaChanId)
		) return false;
		if (
			state.phase !== "verifying" &&
			(!same(h.sessId, this.#sessId) || h.locNonce !== this.#rmtNonce ||
				(msg.cc && channel.srcChanId !== this.#remoteCcChanId))
		) return false;
		if (
			msg.cc?.bodyTag === CC_MSG.VERIFY_RSP ||
			msg.cc?.bodyTag === CC_MSG.CONN_RSP
		) {
			const expected = state.expected;
			if (
				!expected || !same(h.tranId, expected.tranId) ||
				h.tranSeq !== expected.tranSeq
			) return false;
			if (state.phase === "verifying") {
				return msg.cc.bodyTag === CC_MSG.VERIFY_RSP && h.msgId === 0x2242 &&
					h.sessId?.length === 16 && (channel.srcChanId ?? 0n) > 0n &&
					(h.locNonce ?? 0n) > 0n;
			}
			return state.phase === "answering" &&
				msg.cc.bodyTag === CC_MSG.CONN_RSP &&
				(h.msgId === 0x2344 || h.msgId === 0x2244);
		}
		return state.phase !== "verifying" && h.tranId?.length === 16;
	}

	/** Verify an explicitly admitted incoming one-to-one call without answering it. */
	async verifyIncomingDetailed(
		call: IncomingPlanetCall,
		identity: PlanetIncomingIdentity,
		signal?: AbortSignal,
	): Promise<void> {
		if (this.#incoming || this.#setupSent) {
			throw new Error("incoming state already started");
		}
		this.#assertIncomingActive();
		signal?.throwIfAborted();
		if (
			!this.#route || call.localMid !== this.#opts.localMid ||
			call.callerMid !== this.#route.toMid ||
			call.route.fromToken !== this.#route.fromToken ||
			call.route.fromZone !== this.#route.iZone ||
			call.route.toZone !== this.#route.rZone ||
			!call.callId || call.credential.length !== 32 ||
			!tagEquals(
				call.credential,
				defaultSetupCredential(
					this.#route,
					call.callerMid,
					call.localMid,
					call.callId,
				),
			)
		) throw new Error("invalid incoming binding");
		if (
			!/^[A-Za-z0-9+/]{43}=$/.test(identity.deviceId) ||
			Buffer.from(identity.deviceId, "base64").toString("base64") !==
				identity.deviceId ||
			![
				identity.userAgent?.osName,
				identity.userAgent?.osVersion,
				identity.userAgent?.deviceName,
			].every((v) =>
				typeof v === "string" && v.length > 0 && v.length <= 256 &&
				[...v].every((char) => {
					const code = char.charCodeAt(0);
					return code > 0x1f && code !== 0x7f;
				})
			)
		) throw new Error("incoming identity required");
		this.#callUuid = call.callId;
		this.#targetMid = call.callerMid;
		this.#localMediaChanId = BigInt(randomNativeLargeId());
		if (this.#localMediaChanId === this.#srcChanId) this.#localMediaChanId++;
		this.#incoming = {
			phase: "verifying",
			signal,
			ua: packPlanetUserAgent(identity.userAgent),
		};
		this.#incomingAbort = () => {
			void this.close().catch(() => {});
		};
		signal?.addEventListener("abort", this.#incomingAbort, { once: true });
		try {
			const body = packCcVerifyReq({
				initiator: call.callerMid,
				responder: call.localMid,
				iZone: call.route.fromZone,
				rZone: call.route.toZone,
				credential: call.credential,
				devId: identity.deviceId,
				svcKey: this.#initialVideo ? "freecall.video" : AUDIO_SERVICE_KEY,
				ua: this.#incoming.ua,
			});
			await this.#sendEnvelope({
				kind: "cc",
				data: packPlanetCcMsg({
					cid: call.callId,
					srcChanId: this.#srcChanId,
					dstChanId: 0n,
				}, wrapCcMsg(CC_MSG.VERIFY_REQ, body)),
			}, { bootstrap: true, msgId: 0x2142 });
			const reply = await this.#waitForCc(
				CC_MSG.VERIFY_RSP,
				this.#opts.timeoutMs ?? 10000,
			);
			this.#assertIncomingActive();
			const verified = decodeCcVerifyRsp(reply.message.cc!.bodyBytes!);
			if (verified.result !== 0 || verified.relCode) {
				throw new Error("incoming VERIFY rejected");
			}
			const peer = tryDecodeNativeSetupOffer(verified.offer);
			if (
				peer?.mediaPubKey?.length !== 33 || peer.mediaNonce?.length !== 16 ||
				peer.mediaKeyId === undefined ||
				!peer.media.some((m) =>
					m.name === "A" && m.enabled === 1 && m.rtpId === 96
				) ||
				(call.kind === "VIDEO") !==
					peer.media.some((m) =>
						m.name === "V" && m.enabled !== 0 &&
						(m.kinds ?? [m.kind]).includes(2)
					)
			) throw new Error("unsupported incoming media offer");
			this.#remoteCcChanId = reply.message.cc!.hdr!.srcChanId!;
			this.#incoming.sessionEndpoint = reply.source;
			this.#incoming.peer = peer;
			this.#incoming.phase = "verified";
			this.#incoming.expected = undefined;
			this.#setupSent = true;
		} catch (error) {
			await this.close();
			throw error;
		}
	}

	/** Send a fresh E2EE audio answer; only a final correlated CONN enables media. */
	async acceptIncomingDetailed(): Promise<{ mediaReady: true }> {
		this.#assertIncomingActive();
		if (this.#incoming?.phase !== "verified") {
			throw new Error("incoming answer state invalid");
		}
		this.#incoming.phase = "answering";
		this.#localMediaOffer = defaultLocalMediaOffer();
		this.#localMediaOffer.offer = packNativeAnswer(
			this.#localMediaOffer.material,
			this.#initialVideo,
		);
		try {
			const body = packCcConnReq({
				answer: this.#localMediaOffer.offer,
				mChanId: this.#localMediaChanId,
				netType: 1,
				unavailToSec: 120,
				oCapas: [],
				features: defaultSetupFeatures(),
				ua: this.#incoming.ua,
				reqRec: false,
			});
			await this.#sendEnvelope({
				kind: "cc",
				data: packPlanetCcMsg({
					cid: this.#callUuid!,
					srcChanId: this.#srcChanId,
					dstChanId: this.#remoteCcChanId,
				}, wrapCcMsg(CC_MSG.CONN_REQ, body)),
			}, { msgId: 0x2144 });
			const deadline = Date.now() + (this.#opts.timeoutMs ?? 10000);
			let response: CcConnRsp | undefined;
			while (Date.now() < deadline) {
				const reply = await this.#waitForCc(
					CC_MSG.CONN_RSP,
					Math.max(1, deadline - Date.now()),
				);
				this.#assertIncomingActive();
				response = decodeCcConnRsp(reply.message.cc!.bodyBytes!);
				if (
					reply.message.hdr?.msgId === 0x2244 && response.result !== undefined
				) break;
				response = undefined;
			}
			if (!response) throw new Error("PLANET reply timeout");
			if (response.result !== 0 || response.relCode || !response.mChanId) {
				throw new Error("incoming CONN rejected");
			}
			this.#remoteMediaChanId = response.mChanId;
			this.#incoming.expected = undefined;
			this.#incoming.phase = "answered";
			// No mAddr: retain the authenticated VERIFY UDP peer. Never use our NAT
			// address, a route guess, or a later unauthenticated RTP sender.
			const endpoint = response.mAddr
				? addrEndpoint(response.mAddr)
				: this.#incoming.sessionEndpoint;
			if (!endpoint) throw new Error("incoming media endpoint unresolved");
			const mediaReady = await this.#configureMedia(
				this.#incoming.peer,
				response,
				{ ...endpoint, source: response.mAddr ? "mAddr" : "session" },
			);
			this.#assertIncomingActive();
			if (!mediaReady) throw new Error("incoming media unavailable");
			this.#startKeepalive(undefined);
			return { mediaReady: true };
		} catch (error) {
			await this.close();
			throw error;
		}
	}

	async inviteDetailed(opts: { to: string }): Promise<PlanetInviteResult> {
		await this.#sendSetup(opts);
		const reply = await this.#waitForCc(
			CC_MSG.SETUP_RSP,
			this.#opts.timeoutMs ?? 10000,
		);
		const setupBytes = reply.message.cc?.bodyBytes;
		if (!setupBytes) throw new Error("PLANET setup_rsp missing body");
		const setupRsp = decodeCcSetupRsp(setupBytes);
		await this.#sendPinholeProbes();
		await this.#sendKeepalive();
		this.#startKeepalive(setupRsp.aliveRptInterval);
		return {
			plaintext: reply.plaintext,
			message: reply.message,
			setupRsp,
		};
	}

	async invite(opts: { to: string }): Promise<Uint8Array> {
		return (await this.inviteDetailed(opts)).plaintext;
	}

	async #sendParticipate(opts: { roomId: string }): Promise<void> {
		if (!this.#route || !this.#local) throw new Error("connect first");
		const route = this.#route;
		const cid = this.#callUuid!;
		const localMediaOffer = defaultLocalMediaOffer();
		this.#localMediaOffer = localMediaOffer;
		const offer = this.#opts.setupOffer ??
			packNativeGroupParticipateOffer(
				{ mediaSecret: localMediaOffer.material.mediaSecret },
				this.#initialVideo,
			);
		const participate: CcParticipateReq = {
			participant: this.#opts.localMid,
			roomId: opts.roomId,
			pZone: route.iZone,
			xZone: route.rZone,
			orionIp: route.orionIp,
			mixIp: route.mixIp,
			ua: packPlanetUserAgent(
				this.#opts.userAgent ?? defaultAndroidUserAgent(this.#opts.deviceInfo),
			),
			devId: this.#opts.deviceId ?? randomBase64(32),
			commTypeFlags: this.#initialVideo ? 3 : 1,
			capas: this.#opts.capabilities ?? [1, 2, 3, 6, 4, 5],
			offer,
			credential: this.#opts.credential ??
				defaultGroupParticipateCredential(
					route,
					this.#opts.localMid,
					opts.roomId,
					cid,
				),
			svcKey: this.#opts.serviceKey ??
				(this.#initialVideo ? "groupcall.video" : "groupcall.audio"),
			netType: 1,
			mChanId: this.#localMediaChanId,
			mixPort: route.mixPort,
			features: this.#opts.features ?? defaultGroupParticipateFeatures(),
			roomAttrs: [1],
			recvRtp: 2,
			maxChanCnt: 30,
			unavailToSec: 0,
			pdtpOndemandStreams: [
				concatBytes([packVarintField(1, 4), packVarintField(2, 2)]),
			],
			ueExtraInfo: packVarintField(1, 1),
			pathCheck: false,
		};
		const participateBytes = packCcParticipateReq(participate);
		this.#debug({
			type: "participate_req",
			bodyBytes: participateBytes.length,
			fields: fieldShape(decodeFields(participateBytes)),
			svcKeyBytes: participate.svcKey?.length,
			offerBytes: participate.offer?.length,
			credentialBytes: participate.credential?.length,
			srcChanIdBits: this.#srcChanId.toString(2).length,
			mChanIdBits: this.#localMediaChanId.toString(2).length,
		});
		const ccBody = wrapCcMsg(
			CC_MSG.PARTICIPATE_REQ,
			participateBytes,
		);
		const ccMsg = packPlanetCcMsg(
			{ cid, srcChanId: this.#srcChanId, dstChanId: 0n },
			ccBody,
		);
		await this.#sendEnvelope(
			{ kind: "cc", data: ccMsg },
			{ bootstrap: true, msgId: CASSINI_MSG_ID_GROUP_PARTICIPATE_REQ },
		);
		this.#setupSent = true;
		this.#groupJoined = true;
	}

	async #sendGroupDataSessionOpen(
		dstChanId: bigint,
		answer: NativeSetupOffer | undefined,
	): Promise<void> {
		if (!this.#route) throw new Error("connect first");
		if (this.#groupDataSessionSent) return;
		const cid = this.#callUuid!;
		// The final group answer allocates receive (field 11) and transmit
		// (field 61) source IDs. Do not invent IDs or use the 1:1 orientation.
		const [audio, video, dataStream] = ["A", "V", "D"].map((name) => {
			const stream = answer?.media.find((m) => m.name === name);
			const rx = stream?.rtpPort;
			const tx = stream?.rtcpId;
			if (
				rx === undefined || tx === undefined ||
				!Number.isInteger(rx) || rx <= 0 || rx > 0xffffffff ||
				!Number.isInteger(tx) || tx <= 0 || tx > 0xffffffff
			) {
				throw new Error("group answer stream IDs missing or invalid");
			}
			return { rx, tx };
		});
		const { rx: rxAudioSsrc, tx: txAudioSsrc } = audio;
		const { rx: rxVideoSsrc, tx: txVideoSsrc } = video;
		const { rx: rxDataSsrc, tx: txDataSsrc } = dataStream;
		this.#groupAudioSsrc = txAudioSsrc;
		this.#groupVideoSendSsrc = txVideoSsrc;
		this.#groupRxAudioSsrc = rxAudioSsrc;
		this.#groupDataSsrc = txDataSsrc;
		this.#groupRxDataSsrc = rxDataSsrc;
		const state = { paused: false, code: 0 };
		const strmSpec = packStrmSpec({
			strms: [
				{
					ssrc: rxAudioSsrc,
					bitrate: { target: 32 },
					state,
					ptime: 40,
					retx: { periOn: true, periIntvMs: 40, periLossThre: [0, 0, 20] },
					fecLossThre: [],
				},
				{
					ssrc: rxVideoSsrc,
					bitrate: { min: 100, max: 1200, target: 800 },
					state,
					retx: { periOn: false },
					fecLossThre: [0, 1, 10],
				},
				{
					ssrc: rxDataSsrc,
					bitrate: { max: 2000 },
					state,
					retx: { periOn: false },
					fecLossThre: [],
				},
			],
			fbIntv: 200,
			tp: 1,
			fbOn: true,
			txStrms: [
				{
					ssrc: txAudioSsrc,
					state,
					retx: { reqdOn: true, reqdRttThre: 300 },
				},
				{
					ssrc: txVideoSsrc,
					state,
					retx: { reqdOn: false },
				},
			],
			link: {
				bwInitKbps: 1200,
				bwMaxKbps: 3000,
				probeRate: 0.2,
				probeBrMaxKbps: 200,
			},
		});
		const data = packMcDataSessionPayload(strmSpec);
		const dataReq = packMcDataReq({
			srcType: 0,
			dstType: 0,
			dispatchId: 2,
			data,
		});
		const mcBody = wrapMcMsg(MC_MSG.DATA_REQ, dataReq);
		const mcMsg = packPlanetMcMsg(
			{ cid, srcChanId: this.#localMediaChanId, dstChanId },
			mcBody,
		);
		this.#debug({
			type: "group_data_session_req",
			bodyBytes: dataReq.length,
			dataBytes: data.length,
			strmSpecBytes: strmSpec.length,
			audioSsrc: txAudioSsrc,
			dataSsrc: txDataSsrc,
			dstChanIdBits: dstChanId.toString(2).length,
		});
		await this.#sendEnvelope(
			{ kind: "mc", data: mcMsg },
			{ msgId: CASSINI_MSG_ID_MC_DATA_REQ },
		);
		this.#groupDataSessionSent = true;
	}

	async joinGroupDetailed(
		opts: { roomId: string },
	): Promise<PlanetGroupJoinResult> {
		await this.#sendParticipate(opts);
		const deadline = Date.now() + (this.#opts.timeoutMs ?? 10000);
		let reply:
			| (PlanetIncomingMessage & {
				message: ReturnType<typeof decodePlanetMsg>;
			})
			| undefined;
		let participateRsp: ReturnType<typeof decodeCcParticipateRsp> | undefined;
		while (true) {
			const remaining = Math.max(1, deadline - Date.now());
			reply = await this.#waitForCc(CC_MSG.PARTICIPATE_RSP, remaining);
			const bodyBytes = reply.message.cc?.bodyBytes;
			if (!bodyBytes) throw new Error("PLANET participate_rsp missing body");
			participateRsp = decodeCcParticipateRsp(bodyBytes);
			this.#debug({
				type: "participate_rsp",
				bodyBytes: bodyBytes.length,
				fields: fieldShape(decodeFields(bodyBytes)),
				result: participateRsp.result,
				relCode: participateRsp.relCode,
				answerBytes: participateRsp.answer?.length,
				contentsBytes: participateRsp.contents?.length,
			});
			if (
				participateRsp.result !== undefined ||
				participateRsp.relCode !== undefined ||
				participateRsp.answer ||
				participateRsp.contents
			) {
				break;
			}
			if (Date.now() >= deadline) throw new Error("PLANET reply timeout");
		}
		if (
			participateRsp.result !== 0 || participateRsp.relCode ||
			!participateRsp.mChanId
		) {
			throw new Error("group participation rejected or incomplete");
		}
		if (
			participateRsp.contentsType === 1 && participateRsp.contents?.length &&
			this.#conference.acceptInfo(
				participateRsp.contents,
				participateRsp.compContentsType ?? 0,
			)
		) this.#emitConference();
		const peerAnswerOffer = tryDecodeNativeSetupOffer(participateRsp.answer);
		this.#callUuid = reply.message.cc?.hdr?.cid ?? this.#callUuid;
		this.#remoteCcChanId = reply.message.cc?.hdr?.srcChanId ?? 0n;
		this.#remoteMediaChanId = participateRsp.mChanId;
		await this.#sendGroupDataSessionOpen(
			this.#remoteMediaChanId,
			peerAnswerOffer,
		);
		const bridgeAddr = bridgeInfoAddr(participateRsp.bridgeInfo);
		if (bridgeAddr) {
			this.#debug({
				type: "group_bridge_addr",
				host: bridgeAddr.ip,
				port: bridgeAddr.port ?? bridgeAddr.ports,
				trpt: bridgeAddr.trpt,
			});
		}
		const mediaReady = await this.#configureMedia(peerAnswerOffer, {
			answer: participateRsp.answer,
			mChanId: participateRsp.mChanId,
			netType: 1,
			unavailToSec: 120,
			oCapas: [],
			features: [],
		});
		if (mediaReady) this.#syncGroupVideoSubscriptions();
		await this.#sendPinholeProbes();
		await this.#sendKeepalive();
		this.#startKeepalive(participateRsp.aliveRptInterval);
		return {
			plaintext: reply.plaintext,
			message: reply.message,
			participateRsp,
			peerAnswerOffer,
			mediaReady,
		};
	}

	async joinGroup(opts: { roomId: string }): Promise<Uint8Array> {
		return (await this.joinGroupDetailed(opts)).plaintext;
	}

	async waitForAnswerDetailed(opts: {
		timeoutMs?: number;
		autoConnRsp?: boolean;
	} = {}): Promise<PlanetAnswerResult> {
		const reply = await this.#waitForCc(
			CC_MSG.CONN_REQ,
			opts.timeoutMs ?? 60000,
		);
		const connReqBytes = reply.message.cc?.bodyBytes;
		if (!connReqBytes) throw new Error("PLANET conn_req missing body");
		const connReq = decodeCcConnReq(connReqBytes);
		const peerAnswerOffer = tryDecodeNativeSetupOffer(connReq.answer);
		const peerOffer = tryDecodeNativeSetupOffer(connReq.offer);
		const mediaReady = await this.#configureMedia(
			peerAnswerOffer ?? peerOffer,
			connReq,
		);
		this.#remoteCcChanId = reply.message.cc?.hdr?.srcChanId ??
			this.#remoteCcChanId;
		this.#remoteMediaChanId = connReq.mChanId ?? this.#remoteMediaChanId;
		let connRspSent = false;
		if (opts.autoConnRsp ?? true) {
			await this.#sendConnRsp(reply, connReq);
			await this.#sendExchangeAppStrDataInfoReq(reply, connReq);
			this.#autoConnRspDuplicates = true;
			connRspSent = true;
		}
		return {
			plaintext: reply.plaintext,
			message: reply.message,
			connReq,
			peerAnswerOffer,
			peerOffer,
			connRspSent,
			mediaReady,
		};
	}

	waitForAnswer(_opts?: { to: string }): Promise<PlanetAnswerResult> {
		return this.waitForAnswerDetailed();
	}

	async #configureMedia(
		peerOffer: NativeSetupOffer | undefined,
		connReq: CcConnReq | CcConnRsp,
		incomingEndpoint?: { host: string; port: number; source: string },
	): Promise<boolean> {
		if (!peerOffer) return false;
		const local = this.#localMediaOffer;
		const route = this.#route;
		if (!local || !route) return false;
		this.#mediaKeyCandidates = [];
		if (
			peerOffer.mediaPubKey && peerOffer.mediaKeyId !== undefined &&
			peerOffer.mediaNonce
		) {
			const keyInput = {
				local: {
					privateKey: local.keypair.privateKey,
					publicKey: local.material.mediaPubKey,
					mediaKeyId: local.material.mediaKeyId,
					mediaNonce: local.material.mediaNonce,
				},
				peer: {
					publicKey: peerOffer.mediaPubKey,
					mediaKeyId: peerOffer.mediaKeyId,
					mediaNonce: peerOffer.mediaNonce,
				},
			};
			const variants = derivePlanetMediaKeyingVariants(keyInput);
			for (const selection of Object.values(MEDIA_KEY_SELECTIONS)) {
				const sendKeying = variants.variants[selection.send];
				const recvKeying = variants.variants[selection.recv];
				const videoSendContext = await deriveSrtpContext(
					derivePlanetMediaStreamKeying(sendKeying, "VIDEO"),
				);
				const videoRecvContext = await deriveSrtpContext(
					derivePlanetMediaStreamKeying(recvKeying, "VIDEO"),
				);
				this.#mediaKeyCandidates.push({
					...selection,
					sendContext: await deriveSrtpContext(sendKeying),
					recvContext: await deriveSrtpContext(recvKeying),
					videoSendContext,
					videoRecvContext,
				}, {
					mode: audioMediaKeyMode(selection.mode),
					send: `AUDIO/${selection.send}`,
					recv: `AUDIO/${selection.recv}`,
					sendContext: await deriveSrtpContext(
						derivePlanetMediaStreamKeying(sendKeying, "AUDIO"),
					),
					recvContext: await deriveSrtpContext(
						derivePlanetMediaStreamKeying(recvKeying, "AUDIO"),
					),
					videoSendContext,
					videoRecvContext,
				});
			}
		}
		if (
			local.material.mediaSecret.length === 30 &&
			peerOffer.mediaSecret?.length === 30
		) {
			this.#mediaKeyCandidates.push(
				{
					mode: "secret-receiver",
					send: "peer-secret",
					recv: "local-secret",
					sendContext: await deriveSrtpContext(peerOffer.mediaSecret),
					recvContext: await deriveSrtpContext(local.material.mediaSecret),
					videoSendContext: await deriveSrtpContext(
						derivePlanetMediaStreamKeying(peerOffer.mediaSecret, "VIDEO"),
					),
					videoRecvContext: await deriveSrtpContext(
						derivePlanetMediaStreamKeying(local.material.mediaSecret, "VIDEO"),
					),
				},
				{
					mode: "secret-sender",
					send: "local-secret",
					recv: "peer-secret",
					sendContext: await deriveSrtpContext(local.material.mediaSecret),
					recvContext: await deriveSrtpContext(peerOffer.mediaSecret),
					videoSendContext: await deriveSrtpContext(
						derivePlanetMediaStreamKeying(local.material.mediaSecret, "VIDEO"),
					),
					videoRecvContext: await deriveSrtpContext(
						derivePlanetMediaStreamKeying(peerOffer.mediaSecret, "VIDEO"),
					),
				},
				{
					mode: "audio-secret-receiver",
					send: "AUDIO/peer-secret",
					recv: "AUDIO/local-secret",
					sendContext: await deriveSrtpContext(
						derivePlanetMediaStreamKeying(peerOffer.mediaSecret, "AUDIO"),
					),
					recvContext: await deriveSrtpContext(
						derivePlanetMediaStreamKeying(local.material.mediaSecret, "AUDIO"),
					),
					videoSendContext: await deriveSrtpContext(
						derivePlanetMediaStreamKeying(peerOffer.mediaSecret, "VIDEO"),
					),
					videoRecvContext: await deriveSrtpContext(
						derivePlanetMediaStreamKeying(local.material.mediaSecret, "VIDEO"),
					),
				},
				{
					mode: "audio-secret-sender",
					send: "AUDIO/local-secret",
					recv: "AUDIO/peer-secret",
					sendContext: await deriveSrtpContext(
						derivePlanetMediaStreamKeying(local.material.mediaSecret, "AUDIO"),
					),
					recvContext: await deriveSrtpContext(
						derivePlanetMediaStreamKeying(peerOffer.mediaSecret, "AUDIO"),
					),
					videoSendContext: await deriveSrtpContext(
						derivePlanetMediaStreamKeying(local.material.mediaSecret, "VIDEO"),
					),
					videoRecvContext: await deriveSrtpContext(
						derivePlanetMediaStreamKeying(peerOffer.mediaSecret, "VIDEO"),
					),
				},
			);
		}
		if (this.#mediaKeyCandidates.length === 0) return false;
		const requestedMode = this.#incoming
			? "audio-reverse-stage"
			: this.#opts.mediaKeyMode ??
				(this.#groupJoined ? "audio-secret-sender" : "current");
		const initialMode = requestedMode === "auto" ? "current" : requestedMode;
		const initial = this.#mediaKeyCandidates.find((c) =>
			c.mode === initialMode
		);
		if (!initial) return false;
		this.#srtpSend = initial.sendContext;
		this.#srtpRecv = initial.recvContext;
		this.#videoSend = initial.videoSendContext;
		this.#videoRecv = initial.videoRecvContext;
		this.#videoRtp = undefined;
		this.#groupDataSrtpSend = undefined;
		this.#groupDataRtp = undefined;
		this.#dataSrtpRecv = undefined;
		this.#groupVideoSrtpRecv = undefined;
		this.#groupVideoSrtpSend = undefined;
		this.#groupVideoPayloadType = undefined;
		this.#groupVideoSources.clear();
		for (const stream of this.#groupVideoAssemblers.values()) {
			stream.assembler.clear();
		}
		this.#groupVideoAssemblers.clear();
		if (this.#groupJoined && local.material.mediaSecret.length === 30) {
			this.#groupDataSrtpSend = await deriveSrtpContext(
				derivePlanetMediaStreamKeying(local.material.mediaSecret, "DATA"),
			);
		}
		if (
			local.material.mediaSecret.length === 30 &&
			peerOffer.mediaSecret?.length === 30
		) {
			this.#dataSrtpRecv = await deriveSrtpContext(
				derivePlanetMediaStreamKeying(peerOffer.mediaSecret, "DATA"),
			);
		}
		if (this.#groupJoined && peerOffer.mediaSecret?.length === 30) {
			this.#groupVideoSrtpRecv = await deriveSrtpContext(
				derivePlanetMediaStreamKeying(peerOffer.mediaSecret, "VIDEO"),
			);
		}
		if (this.#groupJoined && local.material.mediaSecret.length === 30) {
			this.#groupVideoSrtpSend = await deriveSrtpContext(
				derivePlanetMediaStreamKeying(local.material.mediaSecret, "VIDEO"),
			);
		}
		this.#mediaKeyMode = requestedMode;
		const fallbackHost = route.mediaHost ??
			(this.#opts.preferIpv6 && route.cscfHost6
				? route.cscfHost6
				: route.cscfHost);
		const fallbackPort = route.mediaPort ?? route.cscfPort;
		const mAddrEndpoint = addrEndpoint(connReq.mAddr);
		const publicEndpoint = addrEndpoint(connReq.uePublicAddr);
		const endpoint = incomingEndpoint ?? mAddrEndpoint ?? publicEndpoint ??
			{ host: fallbackHost, port: fallbackPort };
		const endpointSource = incomingEndpoint?.source ??
			(mAddrEndpoint ? "mAddr" : publicEndpoint ? "uePublicAddr" : "route");
		const audio =
			peerOffer.media.find((m) =>
				m.name === "A" && m.enabled !== 0 && m.rtpId !== undefined
			) ?? peerOffer.media.find((m) =>
				m.kind === 1 && m.enabled !== 0 && m.rtpId !== undefined
			);
		const groupData = this.#groupJoined
			? peerOffer.media.find((m) => m.name === "D" && m.enabled !== 0)
			: undefined;
		this.#groupDataPayloadType = groupData?.rtpId ?? 101;
		const groupVideo = this.#groupJoined
			? peerOffer.media.find((m) => m.name === "V" && m.rtpId !== undefined)
			: undefined;
		this.#groupVideoPayloadType = groupVideo?.rtpId;
		if (this.#groupJoined) {
			this.#groupRtcpSsrc = GROUP_RTCP_SENDER_SSRC;
		}
		// Field 11 is the local answer's send stream, not the peer's field 61.
		const incomingSsrc = this.#incoming
			? tryDecodeNativeSetupOffer(local.offer)?.media.find((m) =>
				m.name === "A"
			)?.rtpPort
			: undefined;
		if (this.#incoming && !incomingSsrc) return false;
		this.#rtp = {
			host: endpoint.host,
			port: endpoint.port,
			payloadType: audio?.rtpId ?? 96,
			ssrc: incomingSsrc ??
				(this.#groupJoined ? this.#groupAudioSsrc : undefined) ??
				audio?.rtcpId ?? audio?.rtpPort ?? randomU32(),
			seq: randomIntInclusive(0, 0xffff),
			timestamp: 0,
		};
		const videoKinds = this.#groupJoined ? [7, 4] : [2];
		const video = peerOffer.media.find((media) =>
			media.name === "V" &&
			videoKinds.some((kind) => (media.kinds ?? [media.kind]).includes(kind))
		);
		const localVideo = tryDecodeNativeSetupOffer(local.offer)?.media.find((
			media,
		) => media.name === "V");
		if (
			video && localVideo &&
			videoKinds.some((kind) => localVideo.kinds?.includes(kind)) &&
			(!this.#groupJoined ||
				video.features?.some((feature) =>
					feature.id === 2 && feature.version === 1
				)) &&
			video.rtpId !== undefined && video.rtpId > 0 && video.rtpId < 128 &&
			video.rtpId !== this.#rtp.payloadType && video.rtpPort !== undefined &&
			video.rtcpId !== undefined
		) {
			this.#videoRtp = {
				payloadType: video.rtpId,
				ssrc: this.#incoming ? localVideo.rtpPort! : video.rtcpId,
				recvSsrc: this.#incoming ? localVideo.rtcpId! : video.rtpPort,
				seq: randomIntInclusive(0, 0xffff),
				pictureId: 0,
			};
		}
		if (this.#initialVideo && !this.#videoRtp) {
			throw new Error("Peer does not support VP8 video");
		}
		if (this.#groupDataSrtpSend) {
			this.#groupDataRtp = {
				ssrc: this.#groupDataSsrc ?? addU32(this.#rtp.ssrc, 0x30),
				seq: 2,
				timestamp: randomIntInclusive(0x7000, 0x8000),
				index: 0,
				number: 0n,
			};
		}
		this.#debug({
			type: "media_configured",
			endpoint: endpointSource,
			family: endpoint.host.includes(":") ? "ipv6" : "ipv4",
			port: endpoint.port,
			payloadType: this.#rtp.payloadType,
			ssrc: this.#rtp.ssrc,
			rtcpSsrc: this.#groupRtcpSsrc,
			rtcpId: audio?.rtcpId,
			rtpPort: audio?.rtpPort,
			groupDataSsrc: this.#groupDataRtp?.ssrc,
			mediaKeyMode: requestedMode,
			activeMediaKeyMode: initial.mode,
		});
		return true;
	}

	async #sendConnRsp(
		request: PlanetIncomingMessage & {
			message: ReturnType<typeof decodePlanetMsg>;
		},
		connReq: CcConnReq,
	): Promise<void> {
		const ccBody = wrapCcMsg(
			CC_MSG.CONN_RSP,
			packCcConnRsp({
				result: 0,
				mChanId: this.#localMediaChanId,
				netType: connReq.netType ?? 1,
				unavailToSec: connReq.unavailToSec ?? 120,
				ua: packPlanetUserAgent(
					this.#opts.userAgent ??
						defaultAndroidUserAgent(this.#opts.deviceInfo),
				),
				svcId: connReq.svcId,
				tgtSvcId: connReq.tgtSvcId,
				interDomain: connReq.interDomain,
			}),
		);
		const ccMsg = packPlanetCcMsg(
			{
				cid: request.message.cc?.hdr?.cid ?? this.#callUuid ?? "conn-rsp",
				srcChanId: this.#srcChanId,
				dstChanId: request.message.cc?.hdr?.srcChanId ?? 0n,
			},
			ccBody,
		);
		await this.#sendEnvelope(
			{ kind: "cc", data: ccMsg },
			{ msgId: ccMsgId(CC_MSG.CONN_RSP), replyTo: request.message.hdr },
		);
	}

	async #sendExchangeAppStrDataInfoReq(
		request: PlanetIncomingMessage & {
			message: ReturnType<typeof decodePlanetMsg>;
		},
		connReq: CcConnReq,
	): Promise<void> {
		const targetMid = this.#targetMid;
		if (!targetMid) {
			this.#debug({ type: "info_req_skipped", reason: "missing_target" });
			return;
		}
		const body = new TextEncoder().encode('{"csv":1}\0');
		const ccBody = wrapCcMsg(
			CC_MSG.INFO_REQ,
			packCcInfoReq({
				bodyType: "exchange_app_str_data",
				body,
				targets: [],
				source: this.#opts.localMid,
				tgtUe: [packPlanetUeInfo({ userId: targetMid })],
				svcId: connReq.svcId,
				tgtSvcId: connReq.tgtSvcId,
				interDomain: connReq.interDomain,
			}),
		);
		const ccMsg = packPlanetCcMsg(
			{
				cid: request.message.cc?.hdr?.cid ?? this.#callUuid ?? "info-req",
				srcChanId: this.#srcChanId,
				dstChanId: request.message.cc?.hdr?.srcChanId ??
					this.#remoteCcChanId,
			},
			ccBody,
		);
		await this.#sendEnvelope(
			{ kind: "cc", data: ccMsg },
			{ msgId: ccMsgId(CC_MSG.INFO_REQ) },
		);
		this.#debug({ type: "info_req_exchange_app_str_data" });
	}

	async #sendMcDataRsp(
		request: PlanetIncomingMessage & {
			message: ReturnType<typeof decodePlanetMsg>;
		},
	): Promise<void> {
		const bodyBytes = request.message.mc?.bodyBytes;
		if (!bodyBytes) return;
		const dataReq = decodeMcDataReq(bodyBytes);
		let responseData = defaultOneToOneDataSessionPayload();
		if (dataReq.dispatchId === 2 && dataReq.data.length >= 8) {
			const control = decodeMcStreamControl(dataReq.data);
			if (control) {
				const video = this.#videoRtp;
				const supported = control.mediaKind === 2 && video !== undefined;
				const known = supported
					? control.ssrcs.filter((ssrc) =>
						ssrc === video.ssrc || ssrc === video.recvSsrc
					)
					: [];
				responseData = packMcStreamControl({
					...control,
					code: supported ? 0 : 203,
					ssrcs: control.operation === 1 ? known : control.ssrcs,
				});
				if (supported && known.includes(video.recvSsrc)) {
					this.#remoteVideoEnabled = control.operation === 1 ||
						control.operation === 4;
					if (!this.#remoteVideoEnabled) this.#videoAssembler.clear();
					this.#debug({
						type: "video_remote_state",
						enabled: this.#remoteVideoEnabled,
						operation: control.operation,
					});
				}
			}
		}
		const dataRsp = packMcDataRsp({
			result: 0,
			relCode: 0,
			dispatchId: dataReq.dispatchId,
			data: responseData,
		});
		const mcBody = wrapMcMsg(MC_MSG.DATA_RSP, dataRsp);
		const mcMsg = packPlanetMcMsg(
			{
				cid: request.message.mc?.hdr?.cid ?? this.#callUuid ?? "mc-data-rsp",
				srcChanId: this.#localMediaChanId,
				dstChanId: request.message.mc?.hdr?.srcChanId ??
					this.#remoteMediaChanId,
			},
			mcBody,
		);
		this.#debug({
			type: "mc_data_rsp_sent",
			bodyBytes: dataRsp.length,
			dispatchId: dataReq.dispatchId,
			dstChanIdBits:
				(request.message.mc?.hdr?.srcChanId ?? this.#remoteMediaChanId)
					.toString(2).length,
		});
		await this.#sendEnvelope(
			{ kind: "mc", data: mcMsg },
			{ msgId: CASSINI_MSG_ID_MC_DATA_RSP, replyTo: request.message.hdr },
		);
	}

	async #sendMcJoinRsp(
		request: PlanetIncomingMessage & {
			message: ReturnType<typeof decodePlanetMsg>;
		},
	): Promise<void> {
		const rsp = packMcJoinRsp({
			result: 0,
			data: defaultOneToOneStrmSpec(),
		});
		const mcBody = wrapMcMsg(MC_MSG.JOIN_RSP, rsp);
		const mcMsg = packPlanetMcMsg(
			{
				cid: request.message.mc?.hdr?.cid ?? this.#callUuid ?? "mc-join-rsp",
				srcChanId: this.#localMediaChanId,
				dstChanId: request.message.mc?.hdr?.srcChanId ??
					this.#remoteMediaChanId,
			},
			mcBody,
		);
		this.#debug({ type: "mc_join_rsp_sent" });
		await this.#sendEnvelope(
			{ kind: "mc", data: mcMsg },
			{ msgId: CASSINI_MSG_ID_MC_JOIN_RSP, replyTo: request.message.hdr },
		);
		void this.#sendBepiChannelOpen().catch(() => {});
		void this.#sendMcCheckRpt(request).catch(() => {});
	}

	async #sendMcChangeRsp(
		request: PlanetIncomingMessage & {
			message: ReturnType<typeof decodePlanetMsg>;
		},
	): Promise<void> {
		const rsp = packMcChangeRsp({
			result: 0,
			data: defaultOneToOneStrmSpec(),
		});
		const mcBody = wrapMcMsg(MC_MSG.CHANGE_RSP, rsp);
		const mcMsg = packPlanetMcMsg(
			{
				cid: request.message.mc?.hdr?.cid ?? this.#callUuid ?? "mc-change-rsp",
				srcChanId: this.#localMediaChanId,
				dstChanId: request.message.mc?.hdr?.srcChanId ??
					this.#remoteMediaChanId,
			},
			mcBody,
		);
		this.#debug({ type: "mc_change_rsp_sent" });
		await this.#sendEnvelope(
			{ kind: "mc", data: mcMsg },
			{ msgId: CASSINI_MSG_ID_MC_CHANGE_RSP, replyTo: request.message.hdr },
		);
	}

	async #sendMcCheckRpt(
		request: PlanetIncomingMessage & {
			message: ReturnType<typeof decodePlanetMsg>;
		},
	): Promise<void> {
		const rpt = packMcCheckRpt(defaultOneToOneStrmSpec());
		const mcBody = wrapMcMsg(MC_MSG.CHECK_RPT, rpt);
		const mcMsg = packPlanetMcMsg(
			{
				cid: request.message.mc?.hdr?.cid ?? this.#callUuid ?? "mc-check-rpt",
				srcChanId: this.#localMediaChanId,
				dstChanId: request.message.mc?.hdr?.srcChanId ??
					this.#remoteMediaChanId,
			},
			mcBody,
		);
		this.#debug({ type: "mc_check_rpt_sent" });
		await this.#sendEnvelope(
			{ kind: "mc", data: mcMsg },
			{ msgId: CASSINI_MSG_ID_MC_CHECK_RPT },
		);
	}

	async #sendBepiChannelOpen(): Promise<void> {
		const token = BigInt(
			"0x" +
				Array.from(crypto.getRandomValues(new Uint8Array(8)))
					.map((b) => b.toString(16).padStart(2, "0"))
					.join(""),
		);
		const data = packBepiChannelOpen(token);
		this.#debug({ type: "bepi_channel_open_sent" });
		await this.#sendEnvelope(
			{ kind: "sc", data },
			{ msgId: CASSINI_MSG_ID_BEPI_OPEN },
		);
	}

	async #sendDuplicateConnRsp(
		request: PlanetIncomingMessage & {
			message: ReturnType<typeof decodePlanetMsg>;
		},
	): Promise<void> {
		if (!this.#autoConnRspDuplicates || this.#connRspDuplicateInFlight) {
			return;
		}
		const bodyBytes = request.message.cc?.bodyBytes;
		if (!bodyBytes) return;
		this.#connRspDuplicateInFlight = true;
		try {
			const connReq = decodeCcConnReq(bodyBytes);
			if (!this.#srtpSend || !this.#rtp) {
				const peerAnswerOffer = tryDecodeNativeSetupOffer(connReq.answer);
				const peerOffer = tryDecodeNativeSetupOffer(connReq.offer);
				await this.#configureMedia(peerAnswerOffer ?? peerOffer, connReq);
			}
			await this.#sendConnRsp(request, connReq);
			this.#debug({ type: "conn_rsp_duplicate" });
		} finally {
			this.#connRspDuplicateInFlight = false;
		}
	}

	async #sendInfoRsp(
		request: PlanetIncomingMessage & {
			message: ReturnType<typeof decodePlanetMsg>;
		},
	): Promise<void> {
		const bodyBytes = request.message.cc?.bodyBytes;
		if (!bodyBytes) return;
		let infoReq: ReturnType<typeof decodeCcInfoReq>;
		try {
			infoReq = decodeCcInfoReq(bodyBytes);
		} catch {
			return;
		}
		const ccBody = wrapCcMsg(
			CC_MSG.INFO_RSP,
			packCcInfoRsp({
				result: 0,
				bodyType: infoReq.bodyType,
				body: infoReq.body,
				svcId: infoReq.svcId,
				tgtSvcId: infoReq.tgtSvcId,
				interDomain: infoReq.interDomain,
			}),
		);
		const ccMsg = packPlanetCcMsg(
			{
				cid: request.message.cc?.hdr?.cid ?? this.#callUuid ?? "info-rsp",
				srcChanId: this.#srcChanId,
				dstChanId: request.message.cc?.hdr?.srcChanId ?? 0n,
			},
			ccBody,
		);
		await this.#sendEnvelope(
			{ kind: "cc", data: ccMsg },
			{ msgId: ccMsgId(CC_MSG.INFO_RSP), replyTo: request.message.hdr },
		);
	}

	async #sendSimpleCcRsp(
		request: PlanetIncomingMessage & {
			message: ReturnType<typeof decodePlanetMsg>;
		},
		bodyTag: number,
	): Promise<void> {
		const ccMsg = packPlanetCcMsg(
			{
				cid: request.message.cc?.hdr?.cid ?? this.#callUuid ?? "cc-rsp",
				srcChanId: this.#srcChanId,
				dstChanId: request.message.cc?.hdr?.srcChanId ?? 0n,
			},
			wrapCcMsg(bodyTag, new Uint8Array([0x08, 0x00])),
		);
		await this.#sendEnvelope(
			{ kind: "cc", data: ccMsg },
			{
				msgId: ccMsgId(bodyTag),
				replyTo: request.message.hdr,
			},
		);
	}

	#clearKeepalive() {
		if (this.#keepaliveTimer !== undefined) {
			clearTimeout(this.#keepaliveTimer);
			this.#keepaliveTimer = undefined;
		}
	}

	async #sendRelRsp(
		message: ReturnType<typeof decodePlanetMsg>,
	): Promise<void> {
		const ccMsg = packPlanetCcMsg({
			cid: message.cc?.hdr?.cid ?? this.#callUuid ?? "rel-rsp",
			srcChanId: message.cc?.hdr?.dstChanId ?? this.#srcChanId,
			dstChanId: message.cc?.hdr?.srcChanId ?? this.#remoteCcChanId,
		}, wrapCcMsg(CC_MSG.REL_RSP, packVarintField(1, 0)));
		await this.#sendEnvelope({ kind: "cc", data: ccMsg }, {
			msgId: ccMsgId(CC_MSG.REL_RSP),
			replyTo: message.hdr,
		});
	}

	#startKeepalive(aliveRptIntervalSec: number | undefined) {
		this.#clearKeepalive();
		const configured = this.#opts.keepaliveIntervalMs;
		const intervalMs = configured ??
			(aliveRptIntervalSec && aliveRptIntervalSec > 0
				? aliveRptIntervalSec * 1000
				: undefined);
		if (this.#closed || !intervalMs || intervalMs <= 0) return;
		const delayMs = Math.max(10, Math.floor(intervalMs));
		const tick = () => {
			if (this.#closed) return;
			void this.#sendKeepalive().catch(() => {}).finally(() => {
				if (!this.#closed) this.#keepaliveTimer = setTimeout(tick, delayMs);
			});
		};
		this.#keepaliveTimer = setTimeout(tick, delayMs);
	}

	async #sendKeepalive(): Promise<void> {
		if (this.#closed) return;
		const inner = packKeepaliveReq(BigInt(Date.now()), false);
		await this.#sendEnvelope(
			{
				kind: "sc",
				data: packPlanetScMsgKaReq(inner),
			},
			{ msgId: CASSINI_MSG_ID_KEEPALIVE_REQ },
		);
	}

	/** Idempotent teardown; remote release is answered rather than re-initiated. */
	close(): Promise<void> {
		return this.#closePromise ??= this.#closeOnce();
	}

	async #closeOnce(): Promise<void> {
		const remoteReleased = this.#endReason?.by === "remote";
		if (this.#incomingAbort) {
			this.#incoming?.signal?.removeEventListener("abort", this.#incomingAbort);
			this.#incomingAbort = undefined;
		}
		this.#end({ by: "local" });
		try {
			if (
				!remoteReleased && this.#setupSent && this.#route &&
				(this.#sock || this.#opts.wireSend)
			) {
				const relBody = this.#groupJoined
					? packCcRelReq({
						relCode: 1,
						releaser: "participant",
						commMediaFlags: 1,
						dataSvcs: [0],
						roomDestroy: false,
					})
					: packCcRelReq({
						relCode: this.#incoming ? 1 : 2,
						releaser: this.#incoming ? "responder" : "initiator",
						commMediaFlags: 1,
					});
				const ccBody = wrapCcMsg(CC_MSG.REL_REQ, relBody);
				const ccMsg = packPlanetCcMsg(
					{
						cid: this.#callUuid ?? "rel",
						srcChanId: this.#srcChanId,
						dstChanId: this.#remoteCcChanId,
					},
					ccBody,
				);
				await this.#sendEnvelope(
					{ kind: "cc", data: ccMsg },
					{ msgId: CASSINI_MSG_ID_REL_REQ },
				);
			}
		} catch (e) {
			this.#debug({ type: "rel_req_send_fail", reason: String(e) });
		}
		await Promise.all(this.#relRspInFlight);
		if (this.#sock) {
			const sock = this.#sock;
			this.#sock = undefined;
			await new Promise<void>((res) => sock.close(() => res()));
		}
	}

	async send(
		opusPacket: Uint8Array,
		opts: { timestampStep?: number } = {},
	): Promise<void> {
		if (this.#endReason) throw callEndedError(this.#endReason);
		if (!this.#srtpSend || !this.#rtp) {
			throw new Error("PlanetTransport.send: media not established");
		}
		const timestampStep = opts.timestampStep ??
			this.#opts.rtpTimestampStep ?? 960;
		const extensionData = this.#nextAudioRtpExtension();
		const timestamp = this.#nextAudioRtpTimestamp(timestampStep);
		const seq = this.#rtp.seq++ & 0xffff;
		const rtp = buildRtp({
			payloadType: this.#rtp.payloadType,
			marker: this.#groupJoined && this.#groupAudioExtensionIndex === 3,
			seq,
			timestamp,
			ssrc: this.#rtp.ssrc,
			payload: opusPacket,
			extensionProfile: 0x0240,
			extensionData,
		});
		const wire = await srtpEncrypt(this.#srtpSend, rtp);
		if (this.#endReason) throw callEndedError(this.#endReason);
		this.#debug({
			type: "media_send",
			bytes: wire.length,
			payloadBytes: opusPacket.length,
			payloadType: this.#rtp.payloadType,
			marker: (rtp[1] & 0x80) !== 0,
			ssrc: this.#rtp.ssrc,
			seq,
			rtpFirstByte: rtp[0],
			rtpExtensionBytes: extensionData?.length ?? 0,
			rtpExtensionIndex: this.#groupAudioExtensionIndex,
			timestamp,
			timestampStep,
			family: this.#rtp.host.includes(":") ? "ipv6" : "ipv4",
			port: this.#rtp.port,
		});
		if (this.#opts.wireSend) {
			await this.#opts.wireSend(wire, {
				host: this.#rtp.host,
				port: this.#rtp.port,
				bootstrap: false,
				seq: this.#rtp.seq,
				plainLen: opusPacket.length,
				bodyLen: wire.length,
				plaintext: opusPacket,
			});
			await this.#sendGroupDataRtpControl();
			await this.#sendGroupRtcpFeedback();
			return;
		}
		if (!this.#sock) throw new Error("PlanetTransport.send: socket closed");
		await new Promise<void>((res, rj) =>
			this.#sock!.send(
				Buffer.from(wire),
				this.#rtp!.port,
				this.#rtp!.host,
				(e) => (e ? rj(e) : res()),
			)
		);
		await this.#sendGroupDataRtpControl();
		await this.#sendGroupRtcpFeedback();
	}

	#nextAudioRtpTimestamp(timestampStep: number): number {
		if (
			this.#groupJoined && this.#rtp?.timestamp === 0 && timestampStep === 1920
		) {
			this.#rtp.timestamp = 960;
			return 960;
		}
		return (this.#rtp!.timestamp += timestampStep) >>> 0;
	}

	#nextAudioRtpExtension(): Uint8Array | undefined {
		if (!this.#groupJoined) return undefined;
		const extension = GROUP_AUDIO_RTP_EXTENSIONS[
			Math.min(
				this.#groupAudioExtensionIndex,
				GROUP_AUDIO_RTP_EXTENSIONS.length - 1,
			)
		] ?? GROUP_AUDIO_RTP_EXTENSION;
		this.#groupAudioExtensionIndex++;
		return extension;
	}

	async #sendGroupDataRtpControl(): Promise<void> {
		if (!this.#groupDataSrtpSend || !this.#groupDataRtp || !this.#rtp) {
			return;
		}
		if (this.#groupAudioExtensionIndex < 6) return;
		if (this.#groupDataRtp.index >= GROUP_DATA_RTP_PAYLOADS.length) return;
		const payload = GROUP_DATA_RTP_PAYLOADS[this.#groupDataRtp.index];
		const timestampStep =
			GROUP_DATA_RTP_TIMESTAMP_STEPS[this.#groupDataRtp.index] ?? 10;
		this.#groupDataRtp.index++;
		const rtp = buildRtp({
			payloadType: 101,
			marker: true,
			seq: this.#groupDataRtp.seq++ & 0xffff,
			timestamp: (this.#groupDataRtp.timestamp += timestampStep) >>> 0,
			ssrc: this.#groupDataRtp.ssrc,
			payload,
			extensionProfile: 0x0240,
		});
		const wire = await srtpEncrypt(this.#groupDataSrtpSend, rtp);
		this.#debug({
			type: "group_data_rtp_send",
			bytes: wire.length,
			payloadBytes: payload.length,
			payloadType: 101,
			ssrc: this.#groupDataRtp.ssrc,
			seq: (this.#groupDataRtp.seq - 1) & 0xffff,
			rtpFirstByte: rtp[0],
			rtpExtensionBytes: 0,
			timestampStep,
			port: this.#rtp.port,
		});
		if (this.#opts.wireSend) {
			await this.#opts.wireSend(wire, {
				host: this.#rtp.host,
				port: this.#rtp.port,
				bootstrap: false,
				seq: this.#groupDataRtp.seq,
				plainLen: payload.length,
				bodyLen: wire.length,
				plaintext: payload,
			});
			return;
		}
		if (!this.#sock) throw new Error("PlanetTransport.send: socket closed");
		await new Promise<void>((res, rj) =>
			this.#sock!.send(
				Buffer.from(wire),
				this.#rtp!.port,
				this.#rtp!.host,
				(e) => (e ? rj(e) : res()),
			)
		);
	}

	async #handleGroupData(
		wire: Uint8Array,
		source?: { host: string; port: number },
	): Promise<void> {
		if (!this.#dataSrtpRecv) return;
		const rtp = parseRtp(await srtpDecrypt(this.#dataSrtpRecv, wire));
		const extension = readPlanetRtpExtension(rtp);
		const channel = extension?.channel ?? 0;
		const packet = parsePdtp(rtp.payload, rtp.seq);
		const result = this.#pdtp.accept(packet, channel);
		this.#updateRtpEndpointFromSource(source);
		for (const reply of result.replies) {
			await this.#sendGroupPdtp(reply, extension?.sourceChannel ?? channel);
		}
		for (const message of result.messages) {
			if (this.#conference.accept(message)) this.#emitConference();
		}
		this.#debug({
			type: "group_pdtp_handled",
			service: packet.service,
			sections: packet.sections.length,
			replies: result.replies.length,
			messages: result.messages.length,
		});
	}

	async #sendGroupPdtp(
		reply: Omit<PdtpPacket, "number">,
		channel: number,
	): Promise<void> {
		if (!this.#groupDataSrtpSend || !this.#groupDataRtp || !this.#rtp) return;
		const number = this.#groupDataRtp.number++;
		const payload = buildPdtp({ ...reply, number });
		const extensionData = channel ? new Uint8Array(4) : undefined;
		if (extensionData) new DataView(extensionData.buffer).setUint32(0, channel);
		const rtp = buildRtp({
			payloadType: this.#groupDataPayloadType ?? 101,
			ssrc: this.#groupDataRtp.ssrc,
			seq: Number(number & 0xffffn),
			timestamp: Date.now() >>> 0,
			payload,
			extensionProfile: channel ? 0x0261 : 0x0240,
			extensionData,
		});
		const wire = await srtpEncrypt(this.#groupDataSrtpSend, rtp);
		if (this.#opts.wireSend) {
			await this.#opts.wireSend(wire, {
				host: this.#rtp.host,
				port: this.#rtp.port,
				bootstrap: false,
				seq: Number(number & 0xffffn),
				plainLen: payload.length,
				bodyLen: wire.length,
				plaintext: payload,
			});
			return;
		}
		if (!this.#sock) return;
		await new Promise<void>((resolve, reject) =>
			this.#sock!.send(
				wire,
				this.#rtp!.port,
				this.#rtp!.host,
				(error) => error ? reject(error) : resolve(),
			)
		);
	}

	async #sendGroupRtcpFeedback(): Promise<void> {
		if (
			this.#groupRtcpSent || !this.#groupJoined || !this.#rtp ||
			!this.#groupRtcpSsrc || !this.#groupRxAudioSsrc ||
			!this.#groupRxDataSsrc
		) {
			return;
		}
		if (this.#groupAudioExtensionIndex < 8) return;
		this.#groupRtcpSent = true;
		const wire = buildGroupRtcpFeedback({
			senderSsrc: this.#groupRtcpSsrc,
			rxAudioSsrc: this.#groupRxAudioSsrc,
			rxDataSsrc: this.#groupRxDataSsrc,
		});
		this.#debug({
			type: "group_rtcp_feedback_send",
			bytes: wire.length,
			payloadType: wire[1] & 0x7f,
			senderSsrc: this.#groupRtcpSsrc,
			rxAudioSsrc: this.#groupRxAudioSsrc,
			rxDataSsrc: this.#groupRxDataSsrc,
			port: this.#rtp.port,
		});
		if (this.#opts.wireSend) {
			await this.#opts.wireSend(wire, {
				host: this.#rtp.host,
				port: this.#rtp.port,
				bootstrap: false,
				seq: 0,
				plainLen: wire.length,
				bodyLen: wire.length,
				plaintext: wire,
			});
			return;
		}
		if (!this.#sock) throw new Error("PlanetTransport.send: socket closed");
		await new Promise<void>((res, rj) =>
			this.#sock!.send(
				Buffer.from(wire),
				this.#rtp!.port,
				this.#rtp!.host,
				(e) => (e ? rj(e) : res()),
			)
		);
	}

	receive(): AsyncGenerator<Uint8Array, void, unknown> {
		let initialized = false;
		let grouped = false;
		let groupPackets:
			| CancellableAsyncGenerator<CallAudioPacket>
			| undefined;
		let groupFrames: Uint8Array[] = [];
		const buffered: Uint8Array[] = [];
		return cancellableAsyncGenerator(() => {
			if (!initialized) {
				if (!this.#srtpRecv) {
					throw new Error("PlanetTransport.receive: media not established");
				}
				grouped = this.#groupJoined;
				if (grouped) groupPackets = this.receiveAudio();
				initialized = true;
			}
			if (grouped) {
				const frame = groupFrames.shift();
				if (frame) {
					return { promise: Promise.resolve(frame), cancel: () => false };
				}
				const packets = groupPackets!;
				return cancellableRead(async () => {
					const result = await packets.next();
					if (result.done) return null;
					groupFrames = result.value.frames.slice(1);
					return result.value.frames[0] ?? null;
				}, () => packets.cancelPending());
			}
			return this.#readDecoded(async (wire) => {
				const decrypted = await this.#decryptMediaRtp(wire);
				if (this.#endReason) return [];
				const parsed = parseRtp(decrypted.rtp);
				if (this.#opts.debug) {
					this.#debug({
						type: "media_recv",
						bytes: wire.length,
						payloadBytes: parsed.payload.length,
						payloadType: parsed.payloadType,
						ssrc: parsed.ssrc,
						mediaKeyMode: decrypted.mode,
						mediaKeySwitched: decrypted.switched,
					});
				}
				return [parsed.payload];
			}, buffered);
		});
	}

	receiveAudio(): CancellableAsyncGenerator<CallAudioPacket> {
		return this.#receiveDecoded(
			async (wire) => {
				const decrypted = await this.#decryptMediaRtp(wire);
				if (this.#endReason) return [];
				const outer = parseRtp(decrypted.rtp);
				const packets: CallAudioPacket[] = [];
				for (const audio of this.#groupJoined ? unpackXrtp(outer) : [outer]) {
					if (this.#rtp && audio.payloadType !== this.#rtp.payloadType) {
						continue;
					}
					const frames = this.#groupJoined
						? depacketizeEas2(audio.payload)
						: [audio.payload];
					if (frames.length === 0) continue;
					if (this.#opts.debug) {
						this.#debug({
							type: "media_recv",
							bytes: wire.length,
							payloadBytes: audio.payload.length,
							payloadType: audio.payloadType,
							ssrc: audio.ssrc,
							mediaKeyMode: decrypted.mode,
							mediaKeySwitched: decrypted.switched,
							audioFrames: frames.length,
						});
					}
					packets.push({
						ssrc: audio.ssrc,
						timestamp: audio.timestamp,
						frames,
					});
				}
				return packets;
			},
			() => {
				if (!this.#srtpRecv) {
					throw new Error("PlanetTransport.receive: media not established");
				}
			},
		);
	}

	#receiveDecoded<T>(
		decode: (wire: Uint8Array) => Promise<T[]>,
		validate: () => void,
	): CancellableAsyncGenerator<T> {
		const buffered: T[] = [];
		let initialized = false;
		return cancellableAsyncGenerator(() => {
			if (!initialized) {
				validate();
				initialized = true;
			}
			return this.#readDecoded(decode, buffered);
		});
	}

	#readDecoded<T>(
		decode: (wire: Uint8Array) => Promise<T[]>,
		buffered: T[],
	): CancellableRead<T> {
		const available = buffered.shift();
		if (available !== undefined) {
			return { promise: Promise.resolve(available), cancel: () => false };
		}
		let current = this.#takeRtp();
		return cancellableRead(async (isClosing) => {
			while (true) {
				const wire = await current.promise;
				if (!wire) return null;
				try {
					const decoded = await decode(wire);
					if (this.#endReason) return null;
					if (decoded.length > 0) {
						for (let i = 1; i < decoded.length; i++) buffered.push(decoded[i]);
						return decoded[0];
					}
				} catch (error) {
					this.#debug({
						type: "media_decrypt_fail",
						bytes: wire.length,
						rtpPayloadType: wire.length > 1 ? wire[1] & 0x7f : undefined,
						rtpSecondByte: wire.length > 1 ? wire[1] : undefined,
						reason: error instanceof Error ? error.message : String(error),
					});
				}
				if (isClosing()) return null;
				current = this.#takeRtp();
			}
		}, () => current.cancel());
	}

	#takeVideoFrame() {
		const frame = this.#videoQueue.shift();
		return frame
			? { promise: Promise.resolve(frame), cancel: () => false }
			: this.#videoWaiters.read();
	}

	receiveVideo(): AsyncGenerator<EncodedVideoFrame, void, unknown> {
		return cancellableAsyncGenerator(() =>
			this.videoAvailable
				? this.#takeVideoFrame()
				: { promise: Promise.resolve(null), cancel: () => false }
		);
	}

	async setVideoEnabled(enabled: boolean): Promise<void> {
		if (enabled && !this.#initialVideo) {
			throw new Error(
				'start the session with kind: "VIDEO" to send local video',
			);
		}
		const videoSsrc = this.#groupJoined
			? this.#groupVideoSendSsrc
			: this.#videoRtp?.ssrc;
		if (
			enabled && (
				videoSsrc === undefined ||
				(this.#groupJoined ? !this.#groupVideoSrtpSend : !this.#videoSend)
			)
		) throw new Error("video media is not negotiated");
		if (this.#localVideoEnabled === enabled) return;
		if (this.#videoControl) throw new Error("video control is pending");
		const video = this.#videoRtp;
		const ssrc = videoSsrc ?? video?.ssrc;
		if (ssrc === undefined) throw new Error("video stream is unavailable");
		const firstStart = enabled && !this.#localVideoStarted;
		const operation = firstStart ? 1 : enabled ? 4 : 3;
		const data = packMcStreamControl({
			operation,
			mediaKind: 2,
			code: 0,
			ssrcs: firstStart && !this.#groupJoined && video
				? [video.ssrc, video.recvSsrc]
				: [ssrc],
		});
		const request = wrapMcMsg(
			MC_MSG.DATA_REQ,
			packMcDataReq({ srcType: 0, dstType: 0, dispatchId: 2, data }),
		);
		const mc = packPlanetMcMsg(
			{
				cid: this.#callUuid!,
				srcChanId: this.#localMediaChanId,
				dstChanId: this.#remoteMediaChanId,
			},
			request,
		);
		const tranId = new Uint8Array(16);
		crypto.getRandomValues(tranId);
		let resolveControl!: (data: Uint8Array | undefined) => void;
		let rejectControl!: (error: Error) => void;
		const acknowledgement = new Promise<Uint8Array | undefined>(
			(resolve, reject) => {
				resolveControl = resolve;
				rejectControl = reject;
			},
		);
		const pending = {
			tranId,
			resolve: resolveControl,
			reject: rejectControl,
		};
		this.#videoControl = pending;
		const timeout = setTimeout(
			() => pending.reject(new Error("Video control timed out")),
			5000,
		);
		try {
			const [, reply] = await Promise.all([
				this.#sendEnvelope(
					{ kind: "mc", data: mc },
					{ msgId: CASSINI_MSG_ID_MC_DATA_REQ, tranId },
				),
				acknowledgement,
			]);
			const response = reply ? decodeMcStreamControl(reply) : undefined;
			if (
				!response || response.code !== 0 || response.mediaKind !== 2 ||
				response.operation !== operation || !response.ssrcs.includes(ssrc)
			) throw new Error("Peer rejected video control");
		} finally {
			clearTimeout(timeout);
			if (this.#videoControl === pending) this.#videoControl = undefined;
		}
		this.#localVideoEnabled = enabled;
		if (enabled) this.#localVideoStarted = true;
		if (!enabled) {
			this.#groupVideoResolution = undefined;
			this.#videoAssembler.clear();
		}
	}

	async sendVideo(frame: EncodedVideoFrame): Promise<void> {
		if (!this.#localVideoEnabled) throw new Error("local video is not enabled");
		if (this.#groupJoined && !this.#groupVideoRequested) return;
		if (!this.#groupJoined && !this.#remoteVideoEnabled) return;
		if (this.#groupJoined && this.#groupVideoCodec === undefined) {
			throw new Error("the requested group video encoding is unsupported");
		}
		const context = this.#groupJoined
			? this.#groupVideoSrtpSend
			: this.#videoSend;
		const media = this.#rtp;
		const video = this.#videoRtp;
		const ssrc = this.#groupJoined ? this.#groupVideoSendSsrc : video?.ssrc;
		const payloadType = this.#groupJoined
			? this.#groupVideoPayloadType
			: video?.payloadType;
		if (!context || !media || ssrc === undefined || payloadType === undefined) {
			throw new Error("video media is not established");
		}
		if (
			!Number.isInteger(frame.timestamp) || frame.timestamp < 0 ||
			frame.timestamp > 0xffffffff
		) {
			throw new Error("invalid video timestamp");
		}
		validateVp8(frame.data, frame.key);
		let packets: Array<{ payload: Uint8Array; extensionData?: Uint8Array }>;
		if (this.#groupJoined && frame.key) {
			const width = frame.data[6] | ((frame.data[7] & 63) << 8);
			const height = frame.data[8] | ((frame.data[9] & 63) << 8);
			const area = width * height;
			this.#groupVideoResolution = area <= 19200
				? 0
				: area <= 172800
				? 1
				: area <= 691200
				? 2
				: 3;
		}
		if (this.#groupJoined) {
			if (this.#groupVideoResolution === undefined) {
				throw new Error("group video requires a key frame first");
			}
			packets = packetizeSvcVp8(
				frame.data,
				frame.key,
				this.#groupVideoPictureId++ & 0xffff,
				this.#groupVideoSendSeq & 0xffff,
				this.#groupVideoResolution,
				1000,
				this.#groupVideoCodec!,
			);
		} else {
			packets = packetizeEvs3(
				frame.data,
				frame.key,
				video!.pictureId++ & 0xffff,
			).map((payload) => ({ payload }));
		}
		for (let index = 0; index < packets.length; index++) {
			if (
				this.#closed || !this.#localVideoEnabled ||
				(this.#groupJoined && !this.#groupVideoRequested) ||
				(!this.#groupJoined && !this.#remoteVideoEnabled)
			) return;
			const seq = this.#groupJoined
				? this.#groupVideoSendSeq++ & 0xffff
				: video!.seq++ & 0xffff;
			const rtp = buildRtp({
				payloadType,
				ssrc,
				seq,
				timestamp: frame.timestamp,
				marker: index === packets.length - 1,
				payload: packets[index].payload,
				...(this.#groupJoined
					? {
						extensionProfile: 0x0200,
						extensionData: packets[index].extensionData,
					}
					: {}),
			});
			const wire = await srtpEncrypt(context, rtp);
			if (this.#opts.wireSend) {
				await this.#opts.wireSend(wire, {
					host: media.host,
					port: media.port,
					bootstrap: false,
					seq: seq + 1,
					plainLen: packets[index].payload.length,
					bodyLen: wire.length,
					plaintext: packets[index].payload,
				});
			} else {
				if (!this.#sock || this.#closed) {
					throw new Error("PlanetTransport.sendVideo: socket closed");
				}
				await new Promise<void>((resolve, reject) =>
					this.#sock!.send(
						wire,
						media.port,
						media.host,
						(error) => error ? reject(error) : resolve(),
					)
				);
			}
		}
		this.#debug({
			type: "video_send",
			bytes: frame.data.length,
			packets: packets.length,
			key: frame.key,
		});
	}

	async #handleGroupVideo(
		wire: Uint8Array,
		source?: { host: string; port: number },
	): Promise<void> {
		if (!this.#groupVideoSrtpRecv) return;
		const rtp = parseRtp(await srtpDecrypt(this.#groupVideoSrtpRecv, wire));
		if (rtp.payloadType !== this.#groupVideoPayloadType) return;
		const mid = this.#groupVideoSources.get(rtp.ssrc);
		if (!mid) return;
		if (this.#pausedGroupVideo.has(rtp.ssrc)) return;
		const extension = readPlanetRtpExtension(rtp);
		if (!extension) return;
		const descriptor = parseEvs3(rtp.payload, true);
		const payload = unwrapSvcVp8(rtp.payload);
		let stream = this.#groupVideoAssemblers.get(rtp.ssrc);
		if (!stream) {
			if (this.#groupVideoAssemblers.size >= 30) return;
			stream = { assembler: new Evs3Assembler() };
			this.#groupVideoAssemblers.set(rtp.ssrc, stream);
		}
		if (descriptor.begin) {
			stream.receivingSpatialId = descriptor.spatialId;
			if (descriptor.key && stream.spatialId === undefined) {
				stream.spatialId = descriptor.spatialId;
			}
		}
		if (
			stream.spatialId === undefined ||
			stream.receivingSpatialId !== stream.spatialId
		) {
			stream.assembler.clear();
			return;
		}
		const seq = parseSvcVfd(extension.elements, rtp.payload, true) ?? rtp.seq;
		const frame = stream.assembler.push({ ...rtp, seq, payload });
		this.#updateRtpEndpointFromSource(source);
		if (frame) {
			const videoFrame = { ...frame, sourceMid: mid };
			const delivered = this.#videoWaiters.push(videoFrame);
			if (!delivered) {
				if (this.#videoQueue.length >= MAX_BUFFERED_VIDEO_FRAMES) {
					this.#videoQueue.shift();
				}
				this.#videoQueue.push(videoFrame);
			}
		}
	}

	async #handleOneToOneVideo(
		wire: Uint8Array,
		source?: { host: string; port: number },
	): Promise<void> {
		const context = this.#videoRecv;
		const video = this.#videoRtp;
		if (!context || !video) return;
		const packet = parseRtp(await srtpDecrypt(context, wire));
		if (
			packet.payloadType !== video.payloadType || packet.ssrc !== video.recvSsrc
		) {
			return;
		}
		this.#updateRtpEndpointFromSource(source);
		const frame = this.#videoAssembler.push(packet);
		if (!frame) return;
		if (this.#opts.debug) {
			this.#debug({
				type: "video_recv",
				bytes: frame.data.length,
				key: frame.key,
			});
		}
		if (!this.#videoWaiters.push(frame)) {
			if (this.#videoQueue.length >= MAX_BUFFERED_VIDEO_FRAMES) {
				this.#videoQueue.shift();
			}
			this.#videoQueue.push(frame);
		}
	}
}
