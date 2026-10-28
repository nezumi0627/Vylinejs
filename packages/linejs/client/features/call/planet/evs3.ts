// Adapted from tqmane/vyline-api; MIT attribution and terms: docs/licenses/tqmane-vyline-api-MIT.txt.
// PLANET_RTP normal-video (EVS3_VP8), Windows ampkit 1.0.0.911:
// PD maker 0x9a86c0, VP8 packer 0x248bd0 / depacker 0x241c90.
export const MAX_VIDEO_FRAME_BYTES = 0x3ffff - 3;

export interface EncodedVideoFrame {
	/** A complete raw VP8 frame (not IVF or RFC 7741 payloads). */
	data: Uint8Array;
	key: boolean;
	/** Unsigned 90 kHz RTP timestamp. */
	timestamp: number;
	rotation?: number;
	/** Conference-verified sender; absent for direct calls and local uploads. */
	sourceMid?: string;
}

export function validateVp8(data: Uint8Array, expectedKey?: boolean): void {
	if (data.length < 4 || data.length > MAX_VIDEO_FRAME_BYTES) {
		throw new Error("Invalid VP8 size");
	}
	// RFC 6386 sections 9.1 and 19.1, checked before either native/browser decoder.
	const tag = data[0] | (data[1] << 8) | (data[2] << 16);
	const key = !(tag & 1);
	const headerBytes = key ? 10 : 3;
	const partitionBytes = tag >>> 5;
	if (
		((tag >>> 1) & 7) > 3 || !partitionBytes ||
		partitionBytes >= data.length - headerBytes ||
		(expectedKey !== undefined && key !== expectedKey)
	) throw new Error("Invalid VP8 header");
	if (key) {
		const width = data[6] | ((data[7] & 63) << 8);
		const height = data[8] | ((data[9] & 63) << 8);
		const scale = [1, 5 / 4, 5 / 3, 2];
		const displayWidth = Math.ceil(width * scale[data[7] >>> 6]);
		const displayHeight = Math.ceil(height * scale[data[9] >>> 6]);
		if (
			data[3] !== 0x9d || data[4] !== 1 || data[5] !== 0x2a ||
			!width || !height || displayWidth > 1280 || displayHeight > 1280 ||
			displayWidth * displayHeight > 1280 * 720
		) throw new Error("Unsupported VP8 dimensions");
	}
}

export function packetizeEvs3(
	data: Uint8Array,
	key: boolean,
	pictureId: number,
	fragmentBytes = 1000,
): Uint8Array[] {
	validateVp8(data, key);
	if (
		!Number.isInteger(fragmentBytes) ||
		fragmentBytes < 1 ||
		fragmentBytes > 1000 ||
		Math.ceil(data.length / fragmentBytes) > 2048
	) {
		throw new Error("Invalid video fragment size");
	}
	const packets: Uint8Array[] = [];
	for (let offset = 0; offset < data.length; offset += fragmentBytes) {
		const begin = offset === 0;
		const end = offset + fragmentBytes >= data.length;
		const header = begin
			? key
				? [0xba, pictureId >>> 8, pictureId, 0, 0x20]
				: [0xfa, pictureId >>> 8, pictureId, 0, 3, 1, 0, 0]
			: [0x80, pictureId >>> 8, pictureId];
		if (end) header[0] |= 4;
		if (begin) {
			const length = data.length + 3;
			header.push(length & 3, (length >>> 2) & 255, (length >>> 10) & 255);
		}
		const body = data.subarray(offset, offset + fragmentBytes);
		const packet = new Uint8Array(header.length + body.length);
		packet.set(header);
		packet.set(body, header.length);
		packets.push(packet);
	}
	return packets;
}

export interface ParsedEvs3 {
	pictureId: number;
	begin: boolean;
	end: boolean;
	key: boolean;
	rotation: number;
	offset: number;
	spatialId: number;
	temporalId: number;
}

export function parseEvs3(
	payload: Uint8Array,
	allowLayers: boolean = false,
): ParsedEvs3 {
	let offset = 0;
	const read = () => {
		if (offset >= payload.length) throw new Error("Truncated EVS3 descriptor");
		return payload[offset++];
	};
	const flags = read();
	if (!(flags & 0x80)) throw new Error("EVS3 picture ID missing");
	const pictureId = (read() << 8) | read();
	const begin = Boolean(flags & 8);
	const end = Boolean(flags & 4);
	let spatialId = 0;
	let temporalId = 0;
	if (begin && (flags & 0x2a) !== 0x2a) {
		throw new Error("EVS3 first descriptor incomplete");
	}
	if (flags & 0x20) {
		const layer = read();
		// Direct calls retain the single-layer contract; group SVC validates the
		// profile and selects its spatial stream before normalizing this descriptor.
		if (!allowLayers && layer & 0xee) throw new Error("Unsupported EVS3 layer");
		spatialId = (layer >>> 1) & 7;
		temporalId = layer >>> 5;
		if ((flags & 0x50) === 0x50) {
			let reference = read();
			for (let count = 1; reference & 1; count++) {
				if (count >= 3) throw new Error("Too many EVS3 references");
				reference = read();
			}
		}
	}
	let key = false;
	let rotation = 0;
	if (flags & 2) {
		const props = read();
		key = Boolean(props & 0x20);
		rotation = props >>> 6;
		if (props & 1) {
			for (let count = 0;; count++) {
				if (count >= 8) throw new Error("Too many EVS3 extensions");
				read(); // extension type; unknown types are length-delimited
				const lengthAndLast = read();
				const length = lengthAndLast & 0x7f;
				if (!length || offset + length >= payload.length) {
					throw new Error("Invalid EVS3 extension");
				}
				offset += length;
				if (lengthAndLast & 0x80) break;
			}
		}
	}
	if (offset >= payload.length) throw new Error("Empty EVS3 fragment");
	return {
		pictureId,
		begin,
		end,
		key,
		rotation,
		offset,
		spatialId,
		temporalId,
	};
}

interface Picture {
	id: string;
	timestamp: number;
	start: number;
	end?: number;
	key: boolean;
	rotation: number;
	expectedBytes: number;
	since: number;
	bytes: number;
	fragments: Map<number, Uint8Array>;
}

interface VideoRtpPacket {
	payload: Uint8Array;
	seq: number;
	timestamp: number;
	ssrc: number;
	marker: boolean;
}

export class Evs3Assembler {
	constructor(private readonly onInvalid?: (reason: string) => void) {}
	#picture?: Picture;
	#latest?: { timestamp: number; ssrc: number; seq: number };
	#lastSequence?: number;
	#needsKey = true;
	#early?: {
		id: string;
		since: number;
		bytes: number;
		packets: Map<number, VideoRtpPacket>;
	};

	clear(): void {
		this.#picture = undefined;
		this.#latest = undefined;
		this.#lastSequence = undefined;
		this.#needsKey = true;
		this.#early = undefined;
	}

	push(
		packet: VideoRtpPacket,
		now: number = Date.now(),
	): EncodedVideoFrame | undefined {
		try {
			const pd = parseEvs3(packet.payload);
			const id = `${packet.ssrc}/${packet.timestamp}/${pd.pictureId}`;
			if (this.#early && now - this.#early.since > 1000) {
				this.#early = undefined;
			}
			if (!pd.begin && !this.#picture) {
				if (!this.#isNewer(packet, true)) return;
				if (this.#early?.id !== id) {
					this.#early = { id, since: now, bytes: 0, packets: new Map() };
				}
				const early = this.#early;
				const existing = early.packets.get(packet.seq);
				if (existing) {
					if (
						existing.payload.length !== packet.payload.length ||
						existing.payload.some((b, i) => b !== packet.payload[i])
					) {
						this.#latest = {
							timestamp: packet.timestamp,
							ssrc: packet.ssrc,
							seq: packet.seq,
						};
						throw new Error("Conflicting early EVS3 duplicate");
					}
					return;
				}
				early.bytes += packet.payload.length;
				if (early.bytes > MAX_VIDEO_FRAME_BYTES || early.packets.size >= 2048) {
					throw new Error("Early video too large");
				}
				early.packets.set(packet.seq, {
					...packet,
					payload: packet.payload.slice(),
				});
				return;
			}
			const early = pd.begin ? this.#early : undefined;
			if (pd.begin) this.#early = undefined;
			let frame = this.#push(packet, now);
			if (!frame && this.#picture && early?.id === id) {
				for (
					const part of [...early.packets.values()].sort(
						(a, b) =>
							((a.seq - packet.seq) & 0xffff) - ((b.seq - packet.seq) & 0xffff),
					)
				) {
					frame = this.#push(part, now);
					if (frame) break;
				}
			}
			return frame;
		} catch (error) {
			this.onInvalid?.(
				error instanceof Error ? error.message : "Invalid video packet",
			);
			this.#early = undefined;
			this.#discard();
			return undefined;
		}
	}

	#discard(): void {
		this.#needsKey = true;
		this.#picture = undefined;
	}

	#isNewer(packet: VideoRtpPacket, keyframe = false): boolean {
		if (!this.#latest) return true;
		const advance = (packet.timestamp - this.#latest.timestamp) >>> 0;
		const sequence = (packet.seq - this.#latest.seq) & 0xffff;
		// Encoders can restart their presentation clock while the RTP stream stays
		// alive. A fresh keyframe with forward sequence numbers starts that epoch.
		// Sequence ordering also keeps delayed packets from reviving the old clock.
		return this.#latest.ssrc === packet.ssrc && sequence > 0 &&
			sequence < 0x8000 &&
			(keyframe || (advance > 0 && advance < 0x80000000));
	}

	#push(packet: VideoRtpPacket, now: number): EncodedVideoFrame | undefined {
		const pd = parseEvs3(packet.payload);
		const id = `${packet.ssrc}/${packet.timestamp}/${pd.pictureId}`;
		if (this.#picture && now - this.#picture.since > 1000) this.#discard();
		if (this.#picture?.id !== id) {
			if (!pd.begin) {
				if (
					this.#picture && ((packet.seq - this.#picture.start) & 0xffff) < 2048
				) this.#discard();
				return;
			}
			if (!this.#isNewer(packet, pd.key)) return;
			this.#latest = {
				timestamp: packet.timestamp,
				ssrc: packet.ssrc,
				seq: packet.seq,
			};
			if (
				this.#picture ||
				(this.#lastSequence !== undefined &&
					packet.seq !== ((this.#lastSequence + 1) & 0xffff))
			) {
				this.#discard();
			}
			if (this.#needsKey && !pd.key) return;
			this.#picture = {
				id,
				timestamp: packet.timestamp,
				start: packet.seq,
				key: pd.key,
				rotation: pd.rotation,
				expectedBytes: 0,
				since: now,
				bytes: 0,
				fragments: new Map(),
			};
		}
		const picture = this.#picture;
		const index = (packet.seq - picture.start) & 0xffff;
		if (
			index >= 2048 ||
			(pd.begin && index !== 0) ||
			pd.end !== packet.marker ||
			(picture.end !== undefined && index > picture.end)
		) {
			throw new Error("Invalid EVS3 sequence");
		}
		const existing = picture.fragments.get(index);
		if (existing) {
			if (
				existing.length !== packet.payload.length ||
				existing.some((b, i) => b !== packet.payload[i])
			) {
				throw new Error("Conflicting EVS3 duplicate");
			}
			return;
		}
		if (pd.end) {
			if (
				(picture.end !== undefined && picture.end !== index) ||
				[...picture.fragments.keys()].some((i) => i > index)
			) {
				throw new Error("Contradictory EVS3 end");
			}
			picture.end = index;
		}
		const bodyOffset = pd.offset + (pd.begin ? 3 : 0);
		if (pd.begin) {
			if (bodyOffset >= packet.payload.length) {
				throw new Error("Invalid EVS3 VP8 length prefix");
			}
			// Native type1's upper six bits are independent metadata, not extra bytes.
			picture.expectedBytes = ((packet.payload[pd.offset] & 3) |
				(packet.payload[pd.offset + 1] << 2) |
				(packet.payload[pd.offset + 2] << 10)) - 3;
			if (
				picture.expectedBytes < 4 ||
				picture.expectedBytes > MAX_VIDEO_FRAME_BYTES
			) {
				throw new Error("Invalid EVS3 VP8 frame size");
			}
		}
		picture.bytes += packet.payload.length - bodyOffset;
		if (picture.bytes > MAX_VIDEO_FRAME_BYTES) {
			throw new Error("EVS3 picture too large");
		}
		picture.fragments.set(index, packet.payload.slice());
		if (
			picture.end === undefined || picture.fragments.size !== picture.end + 1
		) return;
		const data = new Uint8Array(picture.bytes);
		let offset = 0;
		for (let i = 0; i <= picture.end; i++) {
			const fragment = picture.fragments.get(i)!;
			const body = fragment.subarray(
				parseEvs3(fragment).offset + (i === 0 ? 3 : 0),
			);
			data.set(body, offset);
			offset += body.length;
		}
		if (data.length !== picture.expectedBytes) {
			throw new Error("EVS3 VP8 length mismatch");
		}
		validateVp8(data, picture.key);
		this.#lastSequence = (picture.start + picture.end) & 0xffff;
		this.#picture = undefined;
		this.#needsKey = false;
		return {
			data,
			key: picture.key,
			timestamp: picture.timestamp,
			...(picture.rotation ? { rotation: picture.rotation } : {}),
		};
	}
}
