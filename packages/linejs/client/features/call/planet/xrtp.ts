// Adapted from tqmane/vyline-api; MIT attribution and terms: docs/licenses/tqmane-vyline-api-MIT.txt.
import { parseRtp } from "../srtp.ts";

type Rtp = ReturnType<typeof parseRtp>;

/** Native VSD element 1: per-frame signal classification plus packet level. */
export function buildGroupVsd(
	frames: readonly [
		{ level: number; signal: 0 | 1 | 2 },
		{ level: number; signal: 0 | 1 | 2 },
	],
): Uint8Array {
	if (
		frames.some(
			(f) =>
				!Number.isInteger(f.level) ||
				f.level < 0 ||
				f.level > 127 ||
				!Number.isInteger(f.signal) ||
				f.signal < 0 ||
				f.signal > 2,
		)
	) {
		throw new Error("Invalid VSD level/signal");
	}
	return Uint8Array.from([
		1,
		2,
		0xc0,
		0x40 | (frames[0].signal << 4) | (frames[1].signal << 2),
		Math.min(frames[0].level, frames[1].level),
		0,
		0,
		0,
	]);
}

/** Common fields are not numbered elements (Windows 0xee4d0/0x1a070c).
 * 0x0240 has no channel fields, while 0x0261 carries one destination word.
 */
export function readPlanetRtpExtension(rtp: Rtp):
	| {
		channel: number;
		sourceChannel?: number;
		elements: Uint8Array;
	}
	| undefined {
	const profile = rtp.extensionProfile;
	if (profile === undefined || profile >>> 8 !== 2 || !rtp.extensionData) {
		return;
	}
	const data = rtp.extensionData;
	const commonBytes = (profile & 15) * 4;
	const hasSource = (profile & 0x10) !== 0;
	const hasDestination = (profile & 0x20) !== 0;
	if (
		commonBytes > data.length ||
		commonBytes < 4 * (Number(hasSource) + Number(hasDestination))
	) {
		throw new Error("Truncated PLANET RTP common fields");
	}
	const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
	return {
		channel: hasDestination ? view.getUint32(hasSource ? 4 : 0) : 0,
		...(hasSource ? { sourceChannel: view.getUint32(0) } : {}),
		elements: data.subarray(commonBytes),
	};
}

/** Already authenticated outer RTP only; inner packets are plaintext, not SRTP.
 * Windows ampkit 1.0.0.911: demux 0x209ba0, PLD decode 0xefbd0,
 * extension scan 0xecb40. Lengths use QUIC-style big-endian, NOT protobuf.
 */
export function unpackXrtp(outer: Rtp): Rtp[] {
	if (outer.payload.length > 16 * 1600) {
		throw new Error("XRTP payload too large");
	}
	const extension = readPlanetRtpExtension(outer);
	if (!extension) return [outer];
	const extensions = extension.elements;
	let lengths: number[] | undefined;
	for (let offset = 0; offset < extensions.length;) {
		const id = extensions[offset++];
		if (id === 0) continue; // Native padding is one byte.
		if (offset >= extensions.length) {
			throw new Error("Truncated XRTP extension");
		}
		const end = offset + 1 + extensions[offset] * 2;
		offset++;
		if (end > extensions.length) {
			throw new Error("Truncated XRTP extension body");
		}
		if (id !== 3) {
			offset = end;
			continue;
		}
		if (lengths) throw new Error("Duplicate XRTP PLD");
		lengths = [];
		while (offset < end) {
			const first = extensions[offset++];
			if (first === 0) {
				if (offset !== end) throw new Error("Invalid XRTP PLD padding");
				break;
			}
			const size = 1 << (first >>> 6);
			if (offset + size - 1 > end) throw new Error("Truncated XRTP length");
			let length = first & 0x3f;
			for (let i = 1; i < size; i++) {
				length = length * 256 + extensions[offset++];
				if (length > 1600) throw new Error("XRTP inner packet too large");
			}
			if (length < 12 || length > 1600 || lengths.length === 16) {
				throw new Error("Invalid XRTP packet length/count");
			}
			lengths.push(length);
		}
	}
	if (!lengths) return [outer];
	if (
		!lengths.length ||
		lengths.reduce((sum, n) => sum + n, 0) !== outer.payload.length
	) {
		throw new Error("XRTP payload length mismatch");
	}
	let offset = 0;
	// Validate every inner packet before returning any of them.
	return lengths.map((length) => {
		const packet = parseRtp(outer.payload.subarray(offset, offset + length));
		offset += length;
		return packet;
	});
}
