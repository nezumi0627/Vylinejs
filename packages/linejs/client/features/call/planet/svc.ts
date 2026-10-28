// Adapted from tqmane/vyline-api; MIT attribution and terms: docs/licenses/tqmane-vyline-api-MIT.txt.
// Windows ampkit 1.0.0.911: SVC packetizer 0x246dc0, profile 0x24d710,
// VFD 0xef140; VP8 depacketizer 0x241c90. pmap 7/4 is not normal-video pmap 2.
import { MAX_VIDEO_FRAME_BYTES, packetizeEvs3, parseEvs3 } from "./evs3.ts";

/** Single spatial/temporal VP8 layer, with one VFD record per RTP packet. */
export function packetizeSvcVp8(
	data: Uint8Array,
	key: boolean,
	pictureId: number,
	sequence: number,
	resolution: 0 | 1 | 2 | 3,
	fragmentBytes = 1000,
	codec: 3 | 4 = 3,
): Array<{ payload: Uint8Array; extensionData: Uint8Array }> {
	if (
		!Number.isInteger(sequence) ||
		sequence < 0 ||
		sequence > 65535 ||
		!Number.isInteger(resolution) ||
		resolution < 0 ||
		resolution > 3 ||
		![3, 4].includes(codec)
	) {
		throw new Error("Invalid SVC descriptor");
	}
	const targetBitrateCode = resolution === 3 ? 183 : 54;
	return packetizeEvs3(data, key, pictureId, fragmentBytes).map(
		(fragment, index) => {
			let payload = fragment;
			if (index === 0) {
				const { offset } = parseEvs3(fragment);
				payload = new Uint8Array(fragment.length + (codec === 4 ? 7 : 6));
				payload.set(fragment.subarray(0, offset));
				payload.set([codec, 0x24 | (key ? 16 : 0)], offset);
				const view = new DataView(payload.buffer);
				view.setUint32(offset + 2, data.length + (codec === 4 ? 4 : 3));
				if (codec === 4) {
					view.setUint32(offset + 6, data.length);
					payload.set(fragment.subarray(offset + 3), offset + 10);
				} else payload.set(fragment.subarray(offset), offset + 6);
				const described = new Uint8Array(payload.length + 3);
				described.set(payload.subarray(0, offset));
				described[3] = 0x24; // One spatial stream (SID2), one temporal stream (TID1).
				described[offset - 1] = (payload[offset - 1] & 0xe0) |
					(resolution << 1) | 1;
				described.set([8, 0x81, 0x28], offset); // Base SID2/TID1, native PD extension type8.
				described.set(payload.subarray(offset), offset + 3);
				payload = described;
			}
			const seq = (sequence + index) & 65535;
			return {
				payload,
				extensionData: new Uint8Array([
					2,
					3,
					0xd1, // VFD B/E delimit layer entries, not RTP fragments (Android 26.14.0 0x866cb4).
					(resolution << 4) | 0x0a | (key ? 4 : 0),
					codec,
					targetBitrateCode, // 450 kbps below HD; 1.5 Mbps for the 720p profile (bps >> 13).
					seq >>> 8,
					seq & 255,
				]),
			};
		},
	);
}

/** Validate the SVC profile, then reuse the bounded normal-video assembler. */
export function unwrapSvcVp8(payload: Uint8Array): Uint8Array {
	const pd = parseEvs3(payload, true);
	if (!pd.begin) {
		if (!(payload[0] & 0x20)) return payload;
		const normalized = payload.slice();
		normalized[3] = 0;
		return normalized;
	}
	const offset = pd.offset;
	if (offset + 9 >= payload.length) throw new Error("Truncated SVC profile");
	const profileFlags = (pd.temporalId << 5) | (pd.key ? 16 : 0) |
		(pd.spatialId << 1);
	const codec = payload[offset];
	if (
		pd.spatialId === 7 || (codec !== 3 && codec !== 4) ||
		payload[offset + 1] !== profileFlags
	) {
		throw new Error("Unsupported SVC profile");
	}
	const length = new DataView(
		payload.buffer,
		payload.byteOffset,
		payload.byteLength,
	).getUint32(
		offset + 2,
	);
	if (codec === 4 && offset + 10 >= payload.length) {
		throw new Error("Truncated VP8A length");
	}
	const rawLength = codec === 4
		? new DataView(payload.buffer, payload.byteOffset, payload.byteLength)
			.getUint32(offset + 6)
		: ((payload[offset + 6] & 3) | (payload[offset + 7] << 2) |
			(payload[offset + 8] << 10)) - 3;
	if (
		length !== rawLength + (codec === 4 ? 4 : 3) ||
		rawLength < 4 ||
		rawLength > MAX_VIDEO_FRAME_BYTES
	) {
		throw new Error("Invalid SVC frame length");
	}
	const normalized = new Uint8Array(payload.length - (codec === 4 ? 7 : 6));
	normalized.set(payload.subarray(0, offset));
	if (codec === 4) {
		// Native 0x182266..0x182581 replaces type2's BE raw length with type1's
		// 18-bit length; the compressed VP8 bytes themselves are copied unchanged.
		const n = rawLength + 3;
		normalized.set([n & 3, (n >>> 2) & 255, (n >>> 10) & 255], offset);
		normalized.set(payload.subarray(offset + 10), offset + 3);
	} else normalized.set(payload.subarray(offset + 6), offset);
	normalized[3] = 0; // Spatial selection is performed before the shared VP8 assembler.
	return normalized;
}

/** VFD version 1, exactly one base-layer VP8 packet descriptor. */
export function parseSvcVfd(
	elements: Uint8Array,
	payload: Uint8Array,
	allowMissing = false,
): number | undefined {
	const pd = parseEvs3(payload, true);
	let sequence: number | undefined;
	for (let offset = 0; offset < elements.length;) {
		const id = elements[offset++];
		if (!id) continue;
		if (offset >= elements.length) throw new Error("Truncated SVC extension");
		const length = elements[offset++] * 2;
		const end = offset + length;
		if (end > elements.length || id === 4) {
			throw new Error("Unsupported SVC extension");
		}
		if (id === 2) {
			if (
				sequence !== undefined ||
				length !== 6 ||
				!(elements[offset] & 0x80) ||
				((payload[0] & 0x20) !== 0 &&
					(((elements[offset] >>> 3) & 7) !== pd.spatialId ||
						(elements[offset] & 7) !== pd.temporalId)) ||
				(elements[offset + 1] & 0xc9) !== 8 ||
				(pd.begin && Boolean(elements[offset + 1] & 4) !== pd.key) ||
				(elements[offset + 2] !== 3 && elements[offset + 2] !== 4)
			) {
				throw new Error("Unsupported SVC VFD");
			}
			sequence = (elements[offset + 4] << 8) | elements[offset + 5];
		}
		offset = end;
	}
	if (sequence === undefined && !allowMissing) {
		throw new Error("SVC VFD missing");
	}
	return sequence;
}
