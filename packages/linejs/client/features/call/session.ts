// CallSession — control plane is real, transport is pluggable.
// Group receive orchestration adapted from tqmane/vyline-api; terms: docs/licenses/tqmane-vyline-api-MIT.txt.
import type { Client } from "../../mod.ts";
import type * as LINETypes from "@evex/linejs-types";
import type {
	AudioDecoder,
	AudioEncoder,
	AudioSink,
	AudioSource,
	CallAudioPacket,
	CodecFactory,
	PcmFrame,
} from "./audio.ts";
import { defaultCodecFactory } from "./audio.ts";
import { TypedEventEmitter } from "../../../base/core/typed-event-emitter/index.ts";
import { GroupAudioMixer } from "./groupAudio.ts";
import type { ConferenceMember } from "./planet/conference.ts";
import type { EncodedVideoFrame } from "./planet/evs3.ts";

export type CallSessionState =
	| "idle"
	| "acquiring"
	| "connecting"
	| "ringing"
	| "in-call"
	| "ending"
	| "ended"
	| "failed";

export type CallKind = "AUDIO" | "VIDEO" | "FACEPLAY";

export interface CallSessionOpts {
	to: string;
	group?: { route: LINETypes.GroupCallRoute };
	kind?: CallKind;
	fromEnvInfo?: Record<string, string>;
	codecs?: CodecFactory;
	transport?: CallTransport;
}

export interface CallTransport {
	connect(
		opts: {
			route: LINETypes.CallRoute | LINETypes.GroupCallRoute;
			kind?: CallKind;
		},
	): Promise<void>;
	close(): Promise<void>;
	send(packet: Uint8Array): void | Promise<void>;
	receive(): AsyncIterable<Uint8Array>;
	joinGroup?(opts: { roomId: string }): Promise<unknown>;
	receiveAudio?(): AsyncIterable<CallAudioPacket>;
	receiveVideo?(): AsyncIterable<EncodedVideoFrame>;
	setVideoEnabled?(enabled: boolean): void | Promise<void>;
	sendVideo?(frame: EncodedVideoFrame): Promise<void>;
	onConference?: (members: ConferenceMember[]) => void;
	/** Optional. When present, CallSession.start() drives the full
	 *  signaling dialog after connect() (SIP INVITE → 200 → ACK). */
	invite?(opts: { to: string }): Promise<unknown>;
	/** Optional. PLANET-style transports may enter ringing after INVITE and
	 *  only become media-ready after the peer sends CONN_REQ. */
	waitForAnswer?(opts?: { to: string }): Promise<unknown>;
}

export const stubTransport: CallTransport = {
	connect() {
		throw new Error("CallTransport not configured");
	},
	close() {
		return Promise.resolve();
	},
	send() {
		throw new Error("stubTransport.send");
	},
	async *receive() {/* */},
};

export type CallSessionEvents = {
	state: (newState: CallSessionState, prev: CallSessionState) => void;
	connected: (route: LINETypes.CallRoute | LINETypes.GroupCallRoute) => void;
	ended: (reason: string) => void;
	error: (err: Error) => void;
	participants: (members: ConferenceMember[]) => void;
};

export class CallSession extends TypedEventEmitter<CallSessionEvents> {
	#client: Client;
	#opts: CallSessionOpts;
	#state: CallSessionState = "idle";
	#route?: LINETypes.CallRoute | LINETypes.GroupCallRoute;
	#transport: CallTransport;
	#codecs: CodecFactory;
	#encoder?: AudioEncoder;
	#decoder?: AudioDecoder;
	#sendAbort?: AbortController;
	#receiveSink?: AudioSink;
	#groupMixer?: GroupAudioMixer;
	#participants?: ConferenceMember[];
	#groupAudioSources?: Set<number>;

	constructor(client: Client, opts: CallSessionOpts) {
		super();
		this.#client = client;
		this.#opts = opts;
		this.#transport = opts.transport ?? stubTransport;
		this.#codecs = opts.codecs ?? defaultCodecFactory;
		if (opts.group && "onConference" in this.#transport) {
			const onConference = this.#transport.onConference;
			this.#transport.onConference = (members) => {
				onConference?.(members);
				this.#participants = members;
				this.#groupAudioSources = new Set(
					members.flatMap((member) =>
						member.connected
							? member.sources.filter((source) => source.name === "A").map((
								source,
							) => source.ssrc)
							: []
					),
				);
				this.emit("participants", this.participants!);
			};
		}
	}

	get state(): CallSessionState {
		return this.#state;
	}
	get route(): LINETypes.CallRoute | LINETypes.GroupCallRoute | undefined {
		return this.#route;
	}
	get peer(): string {
		return this.#opts.to;
	}
	get kind(): CallKind {
		return this.#opts.kind ?? "AUDIO";
	}

	get participants(): ConferenceMember[] | undefined {
		return this.#participants?.map((member) => ({
			...member,
			sources: member.sources.map((source) => ({ ...source })),
		}));
	}

	#setState(s: CallSessionState) {
		if (s === this.#state) return;
		const prev = this.#state;
		this.#state = s;
		this.emit("state", s, prev);
	}

	async start(): Promise<LINETypes.CallRoute | LINETypes.GroupCallRoute> {
		if (this.#route) return this.#route;
		this.#setState("acquiring");
		try {
			this.#route = this.#opts.group?.route ??
				await this.#client.call.acquireRoute({
					to: this.#opts.to,
					callType: this.#opts.kind ?? "AUDIO",
					fromEnvInfo: this.#opts.fromEnvInfo,
				});
			this.#setState("connecting");
			await this.#transport.connect({
				route: this.#route,
				kind: this.#opts.kind ?? "AUDIO",
			});
			if (this.#opts.group) {
				if (!this.#transport.joinGroup || !this.#transport.receiveAudio) {
					throw new Error("CallTransport does not support group calls");
				}
				await this.#transport.joinGroup({ roomId: this.#opts.to });
			} else if (this.#transport.invite) {
				await this.#transport.invite({ to: this.#opts.to });
			}
			if (!this.#opts.group && this.#transport.waitForAnswer) {
				this.#setState("ringing");
				await this.#transport.waitForAnswer({ to: this.#opts.to });
			}
			this.#setState("in-call");
			this.emit("connected", this.#route);
			return this.#route;
		} catch (e) {
			this.#setState("failed");
			const err = e instanceof Error ? e : new Error(String(e));
			try {
				await this.#transport.close();
			} catch {
				// Preserve the setup failure; close is best-effort cleanup here.
			}
			this.emit("error", err);
			throw err;
		}
	}

	async sendStream(
		source: AudioSource,
		opts: { signal?: AbortSignal } = {},
	): Promise<void> {
		if (this.#state !== "in-call") {
			throw new Error(`sendStream: session not in-call (state=${this.#state})`);
		}
		this.#sendAbort = new AbortController();
		const sendAbort = this.#sendAbort;
		const merged = opts.signal
			? mergeSignals(opts.signal, sendAbort.signal)
			: undefined;
		const signal = merged?.signal ?? sendAbort.signal;
		const enc = this.#encoder ??= this.#codecs.newEncoder({
			sampleRate: 48000,
			channels: 1,
		});
		try {
			for await (const frame of source.frames({ signal })) {
				if (signal.aborted) break;
				const packet = enc.encode(frame);
				if (packet) await this.#transport.send(packet);
			}
		} finally {
			merged?.dispose();
			if (this.#sendAbort === sendAbort) this.#sendAbort = undefined;
		}
	}

	async sendBuffer(opts: {
		samples: Int16Array;
		sampleRate: number;
		channels?: number;
	}): Promise<void> {
		const { bufferSource } = await import("./audio.ts");
		await this.sendStream(bufferSource(opts));
	}

	async sendFile(opts: {
		bytes: Uint8Array;
		decode: (b: Uint8Array) =>
			| Promise<{
				samples: Int16Array;
				sampleRate: number;
				channels: number;
			}>
			| { samples: Int16Array; sampleRate: number; channels: number };
	}): Promise<void> {
		const decoded = await opts.decode(opts.bytes);
		await this.sendBuffer(decoded);
	}

	async receiveInto(sink: AudioSink): Promise<void> {
		if (this.#state !== "in-call") {
			throw new Error(
				`receiveInto: session not in-call (state=${this.#state})`,
			);
		}
		this.#receiveSink = sink;
		if (this.#opts.group) {
			for await (const frame of this.received()) await sink.write(frame);
			await sink.end?.();
			return;
		}
		const dec = this.#decoder ??= this.#codecs.newDecoder({
			sampleRate: 48000,
			channels: 1,
		});
		for await (const packet of this.#transport.receive()) {
			const frame = dec.decode(packet);
			if (frame) await sink.write(frame);
		}
		await sink.end?.();
	}

	async *received(): AsyncGenerator<PcmFrame> {
		if (this.#state !== "in-call") {
			throw new Error(`received: session not in-call (state=${this.#state})`);
		}
		if (this.#opts.group) {
			yield* this.#receivedGroup();
			return;
		}
		const dec = this.#decoder ??= this.#codecs.newDecoder({
			sampleRate: 48000,
			channels: 1,
		});
		for await (const packet of this.#transport.receive()) {
			const frame = dec.decode(packet);
			if (frame) yield frame;
		}
	}

	async *receivedVideo(): AsyncGenerator<EncodedVideoFrame> {
		if (this.#state !== "in-call") {
			throw new Error(
				`receivedVideo: session not in-call (state=${this.#state})`,
			);
		}
		if (!this.#transport.receiveVideo) {
			throw new Error("CallTransport does not support video receive");
		}
		yield* this.#transport.receiveVideo();
	}

	async setVideoEnabled(enabled: boolean): Promise<void> {
		if (this.#state !== "in-call") {
			throw new Error(
				`setVideoEnabled: session not in-call (state=${this.#state})`,
			);
		}
		if (!this.#transport.setVideoEnabled) {
			throw new Error("CallTransport does not support local video");
		}
		await this.#transport.setVideoEnabled(enabled);
	}

	async sendVideo(frame: EncodedVideoFrame): Promise<void> {
		if (this.#state !== "in-call") {
			throw new Error(`sendVideo: session not in-call (state=${this.#state})`);
		}
		if (!this.#transport.sendVideo) {
			throw new Error("CallTransport does not support local video");
		}
		await this.#transport.sendVideo(frame);
	}

	async *#receivedGroup(): AsyncGenerator<PcmFrame> {
		const mixer = this.#groupMixer = new GroupAudioMixer(this.#codecs);
		let done = false;
		let error: unknown;
		const pump = (async () => {
			for await (const packet of this.#transport.receiveAudio!()) {
				if (this.#state !== "in-call") break;
				if (
					this.#groupAudioSources &&
					!this.#groupAudioSources.has(packet.ssrc)
				) continue;
				mixer.push(packet, performance.now());
			}
		})().catch((e) => {
			error = e;
		}).finally(() => {
			done = true;
		});
		try {
			while (!done && this.#state === "in-call") {
				await new Promise<void>((resolve) =>
					setTimeout(resolve, Math.max(1, 20 - (performance.now() % 20)))
				);
				if (this.#state !== "in-call") break;
				const frame = mixer.read(performance.now());
				if (frame) yield frame;
			}
			if (error) throw error;
		} finally {
			mixer.close();
			this.#groupMixer = undefined;
			if (this.#state === "in-call") await this.end("audio-receive-ended");
			await pump;
		}
	}

	async end(reason = "user-ended"): Promise<void> {
		if (this.#state === "ended" || this.#state === "idle") return;
		this.#setState("ending");
		this.#sendAbort?.abort();
		try {
			await this.#transport.close();
		} catch { /* */ }
		this.#encoder?.close?.();
		this.#decoder?.close?.();
		this.#groupMixer?.close();
		this.#participants = undefined;
		this.#groupAudioSources = undefined;
		await this.#receiveSink?.end?.();
		this.#setState("ended");
		this.emit("ended", reason);
	}
}

function mergeSignals(
	a: AbortSignal,
	b: AbortSignal,
): { signal: AbortSignal; dispose: () => void } {
	if (a.aborted) return { signal: a, dispose() {} };
	if (b.aborted) return { signal: b, dispose() {} };
	const c = new AbortController();
	const onA = () => c.abort(a.reason);
	const onB = () => c.abort(b.reason);
	a.addEventListener("abort", onA, { once: true });
	b.addEventListener("abort", onB, { once: true });
	return {
		signal: c.signal,
		dispose() {
			a.removeEventListener("abort", onA);
			b.removeEventListener("abort", onB);
		},
	};
}
