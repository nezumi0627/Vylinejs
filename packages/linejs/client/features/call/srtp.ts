// SRTP AES_CM_128_HMAC_SHA1_80 (RFC 3711).
// Key derivation: AES-CM PRF per §4.3.

import { createCipheriv, createHmac } from "node:crypto";

const HMAC_TAG_LEN = 10; // SHA1_80 = 80 bits = 10 bytes
const SRTP_KEY_LEN = 16; // AES-CM-128
const SRTP_SALT_LEN = 14; // 112-bit salt
export const SRTP_KEYING_LEN = SRTP_KEY_LEN + SRTP_SALT_LEN; // 30 bytes

export interface SrtpCryptoContext {
	cipherKey: Uint8Array;
	cipherSalt: Uint8Array;
	authKey: Uint8Array;
	rocs: Map<number, number>;
}

const LABEL_RTP_ENCR = 0x00;
const LABEL_RTP_AUTH = 0x01;
const LABEL_RTP_SALT = 0x02;

/** Derive SRTP session keys from the 30-byte SDES master keying material. */
// deno-lint-ignore require-await -- Keep the public Promise API stable.
export async function deriveSrtpContext(
	masterKeying: Uint8Array,
): Promise<SrtpCryptoContext> {
	if (masterKeying.length !== SRTP_KEYING_LEN) {
		throw new Error(
			`SRTP master keying must be ${SRTP_KEYING_LEN} bytes, got ${masterKeying.length}`,
		);
	}
	const masterKey = masterKeying.subarray(0, SRTP_KEY_LEN);
	const masterSalt = masterKeying.subarray(SRTP_KEY_LEN);
	const cipherKey = deriveKey(masterKey, masterSalt, LABEL_RTP_ENCR, 16);
	const authKey = deriveKey(masterKey, masterSalt, LABEL_RTP_AUTH, 20);
	const cipherSalt = deriveKey(masterKey, masterSalt, LABEL_RTP_SALT, 14);
	return { cipherKey, cipherSalt, authKey, rocs: new Map() };
}

/** AES-CM PRF: encrypt the IV with the master key to produce L bytes. */
function deriveKey(
	masterKey: Uint8Array,
	masterSalt: Uint8Array,
	label: number,
	len: number,
): Uint8Array {
	// IV = master_salt XOR (label || 0...0), padded right with two zero bytes
	const iv = new Uint8Array(16);
	iv.set(masterSalt.subarray(0, 14), 0);
	iv[7] ^= label;
	// CM counter mode: encrypt successive 16-byte blocks of (iv || ctr=0,1,…)
	const ctrIv = new Uint8Array(16);
	ctrIv.set(iv);
	const cipher = createCipheriv("aes-128-ctr", masterKey, ctrIv);
	const encrypted = cipher.update(new Uint8Array(len));
	const final = cipher.final();
	let out: Uint8Array = encrypted;
	if (final.length > 0) {
		out = new Uint8Array(encrypted.length + final.length);
		out.set(encrypted);
		out.set(final, encrypted.length);
	}
	return new Uint8Array(out.subarray(0, len));
}

/** Encrypt an RTP packet in place + append the 80-bit auth tag. */
// deno-lint-ignore require-await -- Keep the public Promise API stable.
export async function srtpEncrypt(
	ctx: SrtpCryptoContext,
	rtpPacket: Uint8Array,
): Promise<Uint8Array> {
	if (rtpPacket.length < 12) throw new Error("RTP packet too short");
	const headerLen = rtpHeaderLength(rtpPacket);
	const header = rtpPacket.subarray(0, headerLen);
	const payload = rtpPacket.subarray(headerLen);
	const ssrc = readU32(rtpPacket, 8);
	const seq = readU16(rtpPacket, 2);
	const rocKey = ssrc;
	const roc = ctx.rocs.get(rocKey) ?? 0;
	const enc = aesCmEncrypt(
		ctx.cipherKey,
		ctx.cipherSalt,
		ssrc,
		roc,
		seq,
		payload,
	);

	const out = new Uint8Array(rtpPacket.length + HMAC_TAG_LEN);
	out.set(header, 0);
	out.set(enc, headerLen);

	// auth = HMAC-SHA1(authKey, packet || ROC) [0..10]
	const h = createHmac("sha1", ctx.authKey);
	h.update(out.subarray(0, rtpPacket.length));
	const rocBuf = new Uint8Array(4);
	writeU32(rocBuf, 0, roc);
	h.update(rocBuf);
	const tag = new Uint8Array(h.digest()).subarray(0, HMAC_TAG_LEN);
	out.set(tag, rtpPacket.length);

	// Increment ROC on seq wrap.
	if (seq === 0xffff) ctx.rocs.set(rocKey, (roc + 1) & 0xffffffff);
	else ctx.rocs.set(rocKey, roc);
	return out;
}

/** Verify the auth tag + decrypt an SRTP packet. */
// deno-lint-ignore require-await -- Keep the public Promise API stable.
export async function srtpDecrypt(
	ctx: SrtpCryptoContext,
	srtpPacket: Uint8Array,
): Promise<Uint8Array> {
	if (srtpPacket.length < 12 + HMAC_TAG_LEN) {
		throw new Error("SRTP packet too short");
	}
	const taggedLen = srtpPacket.length - HMAC_TAG_LEN;
	const tag = srtpPacket.subarray(taggedLen);
	const inner = srtpPacket.subarray(0, taggedLen);

	const ssrc = readU32(srtpPacket, 8);
	const seq = readU16(srtpPacket, 2);
	const roc = ctx.rocs.get(ssrc) ?? 0;

	const h = createHmac("sha1", ctx.authKey);
	h.update(inner);
	const rocBuf = new Uint8Array(4);
	writeU32(rocBuf, 0, roc);
	h.update(rocBuf);
	const expected = new Uint8Array(h.digest()).subarray(0, HMAC_TAG_LEN);
	if (!constantTimeEqual(tag, expected)) {
		throw new Error("SRTP auth tag mismatch");
	}
	const headerLen = rtpHeaderLength(inner);
	const payload = inner.subarray(headerLen);
	const dec = aesCmEncrypt(
		ctx.cipherKey,
		ctx.cipherSalt,
		ssrc,
		roc,
		seq,
		payload,
	);
	const out = new Uint8Array(headerLen + dec.length);
	out.set(inner.subarray(0, headerLen), 0);
	out.set(dec, headerLen);
	return out;
}

function aesCmEncrypt(
	key: Uint8Array,
	salt: Uint8Array,
	ssrc: number,
	roc: number,
	seq: number,
	payload: Uint8Array,
): Uint8Array {
	// IV = (salt || 0_16) XOR (ssrc<<64 | roc<<32 | seq<<16) per RFC 3711 §4.1.1
	const iv = new Uint8Array(16);
	iv.set(salt, 0); // first 14 bytes
	// XOR SSRC into bytes 4..7
	iv[4] ^= (ssrc >>> 24) & 0xff;
	iv[5] ^= (ssrc >>> 16) & 0xff;
	iv[6] ^= (ssrc >>> 8) & 0xff;
	iv[7] ^= ssrc & 0xff;
	// XOR ROC into bytes 8..11
	iv[8] ^= (roc >>> 24) & 0xff;
	iv[9] ^= (roc >>> 16) & 0xff;
	iv[10] ^= (roc >>> 8) & 0xff;
	iv[11] ^= roc & 0xff;
	// XOR SEQ into bytes 12..13
	iv[12] ^= (seq >>> 8) & 0xff;
	iv[13] ^= seq & 0xff;
	// Final two bytes (14..15) start as counter 0 — Node aes-128-ctr increments them
	const cipher = createCipheriv("aes-128-ctr", key, iv);
	const encrypted = cipher.update(payload);
	const final = cipher.final();
	if (final.length === 0) return encrypted;
	const out = new Uint8Array(encrypted.length + final.length);
	out.set(encrypted);
	out.set(final, encrypted.length);
	return out.subarray(0, payload.length);
}

function readU16(b: Uint8Array, o: number): number {
	return (b[o] << 8) | b[o + 1];
}
function readU32(b: Uint8Array, o: number): number {
	return ((b[o] << 24) | (b[o + 1] << 16) | (b[o + 2] << 8) | b[o + 3]) >>> 0;
}
function writeU32(b: Uint8Array, o: number, v: number) {
	b[o] = (v >>> 24) & 0xff;
	b[o + 1] = (v >>> 16) & 0xff;
	b[o + 2] = (v >>> 8) & 0xff;
	b[o + 3] = v & 0xff;
}
function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
	if (a.length !== b.length) return false;
	let r = 0;
	for (let i = 0; i < a.length; i++) r |= a[i] ^ b[i];
	return r === 0;
}

/** Build a minimal RTP packet (v=2, no extensions, no padding). */
export function buildRtp(opts: {
	payloadType: number;
	seq: number;
	timestamp: number;
	ssrc: number;
	payload: Uint8Array;
	marker?: boolean;
	extensionProfile?: number;
	extensionData?: Uint8Array;
}): Uint8Array {
	const hasExtension = opts.extensionProfile !== undefined;
	const extensionData = opts.extensionData ?? new Uint8Array(0);
	if (extensionData.length % 4 !== 0) {
		throw new Error("RTP extension data length must be a multiple of 4 bytes");
	}
	const extensionLen = hasExtension ? 4 + extensionData.length : 0;
	const out = new Uint8Array(12 + extensionLen + opts.payload.length);
	out[0] = hasExtension ? 0x90 : 0x80; // V=2, optional X bit, CC=0
	out[1] = ((opts.marker ? 0x80 : 0) | (opts.payloadType & 0x7f)) & 0xff;
	out[2] = (opts.seq >>> 8) & 0xff;
	out[3] = opts.seq & 0xff;
	writeU32(out, 4, opts.timestamp >>> 0);
	writeU32(out, 8, opts.ssrc >>> 0);
	if (hasExtension) {
		out[12] = (opts.extensionProfile! >>> 8) & 0xff;
		out[13] = opts.extensionProfile! & 0xff;
		const extensionWords = extensionData.length / 4;
		out[14] = (extensionWords >>> 8) & 0xff;
		out[15] = extensionWords & 0xff;
		out.set(extensionData, 16);
	}
	out.set(opts.payload, 12 + extensionLen);
	return out;
}

export function parseRtp(pkt: Uint8Array): {
	payloadType: number;
	seq: number;
	timestamp: number;
	ssrc: number;
	marker: boolean;
	extensionProfile?: number;
	extensionData?: Uint8Array;
	payload: Uint8Array;
} {
	if (pkt.length < 12) throw new Error("RTP too short");
	const headerLength = rtpHeaderLength(pkt);
	let extensionProfile: number | undefined;
	let extensionData: Uint8Array | undefined;
	if ((pkt[0] & 0x10) !== 0) {
		const extensionOffset = 12 + (pkt[0] & 0x0f) * 4;
		extensionProfile = readU16(pkt, extensionOffset);
		extensionData = pkt.subarray(extensionOffset + 4, headerLength);
	}
	return {
		payloadType: pkt[1] & 0x7f,
		marker: (pkt[1] & 0x80) !== 0,
		seq: readU16(pkt, 2),
		timestamp: readU32(pkt, 4),
		ssrc: readU32(pkt, 8),
		...(extensionProfile === undefined
			? {}
			: { extensionProfile, extensionData }),
		payload: pkt.subarray(headerLength),
	};
}

function rtpHeaderLength(pkt: Uint8Array): number {
	if (pkt.length < 12) throw new Error("RTP too short");
	const csrcCount = pkt[0] & 0x0f;
	let offset = 12 + csrcCount * 4;
	if (pkt.length < offset) throw new Error("RTP CSRC header truncated");
	if ((pkt[0] & 0x10) !== 0) {
		if (pkt.length < offset + 4) {
			throw new Error("RTP extension header truncated");
		}
		const extensionWords = readU16(pkt, offset + 2);
		offset += 4 + extensionWords * 4;
		if (pkt.length < offset) throw new Error("RTP extension data truncated");
	}
	return offset;
}
