// Adapted from tqmane/vyline-api; MIT attribution and terms: docs/licenses/tqmane-vyline-api-MIT.txt.
/** Native PDTP v62/section framing (Windows ampkit 0x1a04a0/0x1a2b50).
 * Only authenticated RTP payloads enter here; no raw packet logging.
 */
export class PdtpReader {
	offset = 0;
	constructor(readonly data: Uint8Array) {}
	get remaining(): number {
		return this.data.length - this.offset;
	}
	bytes(length: number): Uint8Array {
		if (
			!Number.isSafeInteger(length) || length < 0 || length > this.remaining
		) {
			throw new Error(
				`Truncated PDTP data at ${this.offset}: need ${length}, remaining ${this.remaining}`,
			);
		}
		const result = this.data.subarray(this.offset, this.offset + length);
		this.offset += length;
		return result;
	}
	byte(): number {
		return this.bytes(1)[0];
	}
	uint(): bigint {
		const first = this.byte();
		let value = BigInt(first & 63);
		for (const b of this.bytes((1 << (first >>> 6)) - 1)) {
			value = (value << 8n) | BigInt(b);
		}
		return value;
	}
	size(max = 327680): number {
		const value = this.uint();
		if (value > BigInt(max)) throw new Error("PDTP limit exceeded");
		return Number(value);
	}
	string(max = 64): string {
		const start = this.offset;
		while (this.byte() !== 0) {
			if (this.offset - start > max) throw new Error("PDTP string too long");
		}
		const value = this.data.subarray(start, this.offset - 1);
		if (value.some((b) => b < 32 || b > 126)) {
			throw new Error("Invalid PDTP string");
		}
		return new TextDecoder().decode(value);
	}
	end(): void {
		if (this.remaining) throw new Error("Trailing PDTP data");
	}
}

export function pdtpUint(value: bigint): Uint8Array {
	if (value < 0n || value >= 1n << 62n) throw new Error("Invalid PDTP integer");
	const width = value < 64n
		? 1
		: value < 16384n
		? 2
		: value < 1n << 30n
		? 4
		: 8;
	const result = new Uint8Array(width);
	let remaining = value;
	for (let i = width - 1; i >= 0; i--) {
		result[i] = Number(remaining & 255n);
		remaining >>= 8n;
	}
	result[0] |= Math.log2(width) << 6;
	return result;
}

export interface PdtpPacket {
	number: bigint;
	service: string;
	sections: Array<{ type: number; body: Uint8Array }>;
}

export function parsePdtp(payload: Uint8Array, sequence: number): PdtpPacket {
	if (
		payload.length > 327680 || !Number.isInteger(sequence) || sequence < 0 ||
		sequence > 65535
	) {
		throw new Error("Invalid PDTP packet size/sequence");
	}
	const reader = new PdtpReader(payload);
	const first = reader.byte();
	const width = 1 << (first >>> 6);
	if (width < 4) throw new Error("Invalid PDTP packet number width");
	let number = BigInt(first & 63);
	for (const b of reader.bytes(width - 3)) number = (number << 8n) | BigInt(b);
	number = (number << 16n) | BigInt(sequence);
	const service = reader.string();
	const bitmap = (reader.byte() << 8) | reader.byte();
	if (bitmap & 0x8000) throw new Error("Reserved PDTP section");
	const sections: PdtpPacket["sections"] = [];
	for (let type = 15; type > 0; type--) {
		if (!(bitmap & (1 << (type - 1)))) continue;
		const length = reader.size();
		if ([1, 2, 4, 5, 12, 13].includes(type)) {
			const start = reader.offset;
			const count = reader.size(64);
			const entriesStart = reader.offset;
			for (let i = 0; i < count; i++) {
				reader.uint(); // stream ID
				if (type === 1) readDataEntry(reader);
				else if (type === 4) {
					reader.uint();
					reader.uint();
				} else if (type === 13) reader.uint();
				else if (type === 2 || type === 5) {
					reader.byte();
					if (type === 5) reader.uint();
					reader.string(256);
				}
			}
			const n = reader.offset - entriesStart;
			const actual = reader.offset - start;
			// Native 0x1a2e5e adds width(N), but writes count rather than N.
			// Accept that precise sizing convention, not arbitrary discrepancies.
			if (length !== actual && length !== n + pdtpUint(BigInt(n)).length) {
				throw new Error("Invalid PDTP counted section length");
			}
			sections.push({ type, body: reader.data.subarray(start, reader.offset) });
		} else sections.push({ type, body: reader.bytes(length) });
	}
	reader.end();
	return { number, service, sections };
}

function readDataEntry(
	reader: PdtpReader,
): { flags: number; offset: bigint; data: Uint8Array } {
	const flags: number[] = [];
	do {
		if (flags.length === 8) throw new Error("PDTP flags too long");
		flags.push(reader.byte());
	} while (flags[flags.length - 1] & 128);
	for (const byte of flags) {
		for (let bit = 64; bit; bit >>= 1) {
			if (byte & bit) reader.bytes(reader.size());
		}
	}
	const offset = reader.uint();
	return { flags: flags[0], offset, data: reader.bytes(reader.size(262144)) };
}

type PdtpReply = Omit<PdtpPacket, "number">;
const WINDOW = 327680n;

function concat(parts: Uint8Array[]): Uint8Array {
	const result = new Uint8Array(parts.reduce((n, part) => n + part.length, 0));
	let offset = 0;
	for (const part of parts) {
		result.set(part, offset);
		offset += part.length;
	}
	return result;
}
function uints(...values: bigint[]): Uint8Array {
	return concat(values.map(pdtpUint));
}

export function buildPdtp(packet: PdtpPacket): Uint8Array {
	if (
		packet.number < 0n || packet.number >= 1n << 62n ||
		!/^[ -~]{0,64}$/.test(packet.service)
	) {
		throw new Error("Invalid outgoing PDTP header");
	}
	// PN always has width 4 or 8, including the low 16 bits carried by RTP seq.
	const pn = new Uint8Array(packet.number < 1n << 30n ? 4 : 8);
	let n = packet.number;
	for (let i = pn.length - 1; i >= 0; i--) {
		pn[i] = Number(n & 255n);
		n >>= 8n;
	}
	pn[0] |= pn.length === 4 ? 0x80 : 0xc0;
	const sections = [...packet.sections].sort((a, b) => b.type - a.type);
	let bitmap = 0;
	for (const s of sections) {
		if (
			!Number.isInteger(s.type) || s.type < 1 || s.type > 15 ||
			bitmap & (1 << (s.type - 1))
		) {
			throw new Error("Invalid outgoing PDTP section");
		}
		bitmap |= 1 << (s.type - 1);
	}
	return concat([
		pn.subarray(0, -2),
		new TextEncoder().encode(packet.service),
		Uint8Array.from([0, bitmap >>> 8, bitmap & 255]),
		...sections.flatMap((s) => [pdtpUint(BigInt(s.body.length)), s.body]),
	]);
}

/** Receive-side reliable notifier; ACKs refer to actual packets, never captures. */
export class PdtpReceiver {
	#streams = new Map<string, PdtpStream>();

	accept(
		packet: PdtpPacket,
		channel: number,
	): { replies: PdtpReply[]; messages: Uint8Array[] } {
		if (!Number.isInteger(channel) || channel < 0 || channel > 0xffffffff) {
			throw new Error("Invalid PDTP channel");
		}
		// Copy-on-write: malformed later sections must not consume valid earlier data.
		const streams = new Map(this.#streams);
		const updates = new Map<string, PdtpStream>();
		const messages: Uint8Array[] = [];
		const get = (id: bigint, start = 0n): PdtpStream => {
			const key = `${channel}:${packet.service}:${id}`;
			const touched = updates.get(key);
			if (touched) return touched;
			const old = streams.get(key);
			const stream: PdtpStream = old
				? {
					...old,
					pending: new Map(old.pending),
					parts: old.parts?.slice() ?? null,
				}
				: {
					service: packet.service,
					stream: id,
					next: start,
					pending: new Map(),
					parts: null,
					size: 0,
				};
			streams.set(key, stream);
			updates.set(key, stream);
			if (streams.size > 16) throw new Error("Too many PDTP streams");
			return stream;
		};
		let original: bigint | undefined;
		for (const section of packet.sections) {
			const reader = new PdtpReader(section.body);
			if (section.type === 9) {
				original = reader.uint();
				reader.end();
			}
			if (![1, 2, 4, 5, 12].includes(section.type)) continue;
			const count = reader.size(64);
			for (let i = 0; i < count; i++) {
				const id = reader.uint();
				if (section.type === 2 || section.type === 5) {
					reader.byte();
					if (section.type === 5) reader.uint();
					reader.string(256);
					const key = `${channel}:${packet.service}:${id}`;
					streams.delete(key);
					updates.delete(key);
				} else if (section.type === 4) {
					reader.uint(); // OPEN flags, not a DATA metadata bitmap.
					get(id, reader.uint());
				} else if (section.type === 12) get(id);
				else {
					const { flags, offset, data } = readDataEntry(reader);
					// Only the negotiated reliable-message notifier feeds ConferenceState.
					if (packet.service !== "PLANET" || id !== 1n) continue;
					if ((flags & 0x12) !== 0x12) {
						throw new Error("Unsupported notifier stream mode");
					}
					const stream = get(id);
					const end = offset + BigInt(data.length);
					if (end <= stream.next) continue; // Previously delivered retransmission.
					if (
						offset < stream.next || end > stream.next + WINDOW ||
						data.length === 0
					) {
						throw new Error("PDTP data outside receive window");
					}
					for (const [at, pending] of stream.pending) {
						if (offset < at + BigInt(pending.data.length) && at < end) {
							if (
								at !== offset ||
								pending.flags !== flags ||
								data.length !== pending.data.length ||
								data.some((b, n) => b !== pending.data[n])
							) {
								throw new Error("Overlapping PDTP data");
							}
						}
					}
					stream.pending.set(offset, { flags, data: data.slice() });
					if (stream.pending.size > 256) {
						throw new Error("Too many PDTP fragments");
					}
					while (stream.pending.has(stream.next)) {
						const fragment = stream.pending.get(stream.next)!;
						stream.pending.delete(stream.next);
						if (fragment.flags & 8) {
							if (stream.parts) {
								throw new Error("PDTP message restarted before end");
							}
							stream.parts = [];
							stream.size = 0;
						}
						if (!stream.parts) throw new Error("PDTP message start missing");
						stream.parts.push(fragment.data);
						stream.size += fragment.data.length;
						if (stream.size > 262144) throw new Error("PDTP message too large");
						stream.next += BigInt(fragment.data.length);
						if (fragment.flags & 4) {
							messages.push(concat(stream.parts));
							stream.parts = null;
							stream.size = 0;
						}
					}
				}
			}
			reader.end();
		}
		let buffered = 0;
		for (const s of streams.values()) {
			buffered += s.size;
			for (const f of s.pending.values()) buffered += f.data.length;
		}
		if (buffered > 1048576) throw new Error("PDTP buffer limit exceeded");
		this.#streams = streams;
		const replies: PdtpReply[] = [];
		if (packet.sections.some((s) => s.type !== 15)) {
			const body = uints(
				packet.number,
				original === undefined ? 3n : 5n,
				...(original === undefined ? [] : [0n]),
				0n,
				0n,
			);
			replies.push({ service: "", sections: [{ type: 15, body }] });
		}
		for (const update of updates.values()) {
			replies.push({
				service: update.service,
				sections: [{
					type: 13,
					body: uints(1n, update.stream, update.next + WINDOW),
				}],
			});
		}
		return { replies, messages };
	}
}

interface PdtpStream {
	service: string;
	stream: bigint;
	next: bigint;
	pending: Map<bigint, { flags: number; data: Uint8Array }>;
	parts: Uint8Array[] | null;
	size: number;
}
