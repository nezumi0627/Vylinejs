// Adapted from tqmane/vyline-api; MIT attribution and terms: docs/licenses/tqmane-vyline-api-MIT.txt.
import type {
	AudioDecoder,
	CallAudioPacket,
	CodecFactory,
	PcmFrame,
} from "./audio.ts";

interface Source {
	decoder: AudioDecoder;
	timestamp: number;
	at: number;
	seenAt: number;
	chunks: Array<{ at: number; samples: Int16Array }>;
}

function pruneChunks(source: Source, after: number): void {
	let retained = 0;
	for (const chunk of source.chunks) {
		if (chunk.at + chunk.samples.length > after) {
			source.chunks[retained++] = chunk;
		}
	}
	source.chunks.length = retained;
}

/** Bounded 48kHz mono playout, 60ms initial jitter cushion, 30 sources max.
 * ponytail: late/reordered encoded packets are dropped, not re-decoded;
 * add an encoded jitter buffer/PLC if measured network loss warrants it.
 */
export class GroupAudioMixer {
	#sources = new Map<number, Source>();
	#lastTick = -1;
	#closed = false;
	constructor(private readonly codecs: CodecFactory) {}

	push(packet: CallAudioPacket, now: number): void {
		if (
			this.#closed ||
			!Number.isFinite(now) ||
			now < 0 ||
			!Number.isInteger(packet.ssrc) ||
			packet.ssrc < 0 ||
			packet.ssrc > 0xffffffff ||
			!Number.isInteger(packet.timestamp) ||
			packet.timestamp < 0 ||
			packet.timestamp > 0xffffffff ||
			packet.frames.length < 1 ||
			packet.frames.length > 48 ||
			packet.frames.some((frame) => frame.length < 1 || frame.length > 1276)
		) {
			return;
		}
		let source = this.#sources.get(packet.ssrc);
		const nowSample = Math.floor(now / 20) * 960;
		if (source && ((packet.timestamp - source.timestamp) | 0) <= 0) return;
		if (!source) {
			if (this.#sources.size >= 30) return;
			source = {
				decoder: this.codecs.newDecoder({ sampleRate: 48000, channels: 1 }),
				timestamp: packet.timestamp,
				at: nowSample + 2880,
				seenAt: now,
				chunks: [],
			};
			this.#sources.set(packet.ssrc, source);
		}
		let at = source.at + ((packet.timestamp - source.timestamp) | 0);
		if (at < nowSample - 960 || at > nowSample + 9600) {
			at = nowSample + 2880;
			source.chunks = [];
		}
		try {
			const frames: PcmFrame[] = [];
			let length = 0;
			for (const data of packet.frames) {
				const frame = source.decoder.decode(data);
				if (
					!frame || frame.sampleRate !== 48000 || frame.channels !== 1
				) {
					throw new Error("Unsupported group PCM");
				}
				length += frame.samples.length;
				if (length > 5760) throw new Error("Group PCM duration exceeds 120ms");
				frames.push(frame);
			}
			if (length < 1) {
				throw new Error("Group PCM duration exceeds 120ms");
			}
			const samples = new Int16Array(length);
			let offset = 0;
			for (const frame of frames) {
				samples.set(frame!.samples, offset);
				offset += frame!.samples.length;
			}
			source.timestamp = packet.timestamp;
			source.at = at;
			source.seenAt = now;
			pruneChunks(source, nowSample);
			if (source.chunks.length >= 10) source.chunks.shift();
			source.chunks.push({ at, samples });
		} catch {
			this.remove(packet.ssrc); // Never keep a codec whose state may be corrupted.
		}
	}

	read(now: number): PcmFrame | undefined {
		if (this.#closed || !Number.isFinite(now) || now < 0) return;
		const tick = Math.floor(now / 20);
		if (tick <= this.#lastTick) return;
		this.#lastTick = tick;
		const at = tick * 960;
		const end = at + 960;
		const mixed = new Int32Array(960);
		let hasAudio = false;
		for (const [ssrc, source] of this.#sources) {
			if (now - source.seenAt > 30_000) {
				this.remove(ssrc);
				continue;
			}
			for (const chunk of source.chunks) {
				const from = Math.max(at, chunk.at);
				const to = Math.min(end, chunk.at + chunk.samples.length);
				if (from < to) hasAudio = true;
				for (let i = from; i < to; i++) {
					mixed[i - at] += chunk.samples[i - chunk.at];
				}
			}
			pruneChunks(source, end);
		}
		if (!hasAudio) return;
		return {
			samples: Int16Array.from(
				mixed,
				(sample) => Math.max(-32768, Math.min(32767, sample)),
			),
			sampleRate: 48000,
			channels: 1,
		};
	}

	remove(ssrc: number): void {
		this.#sources.get(ssrc)?.decoder.close?.();
		this.#sources.delete(ssrc);
	}

	close(): void {
		this.#closed = true;
		for (const ssrc of this.#sources.keys()) this.remove(ssrc);
	}
}
