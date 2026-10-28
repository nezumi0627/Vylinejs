// Stream-control protobuf decoders adapted from tqmane/vyline-api; license: docs/licenses/tqmane-vyline-api-MIT.txt.
import {
	type DecodedField,
	decodeFields,
	packMcDataSessionPayload,
} from "./schema.ts";

export interface McStreamControl {
	operation: 1 | 2 | 3 | 4;
	mediaKind: number;
	code: number;
	ssrcs: number[];
}

export function packMcStreamControl(control: McStreamControl): Uint8Array {
	if (
		control.ssrcs.length > 16 ||
		![1, 2, 3, 4].includes(control.operation) ||
		[control.mediaKind, control.code, ...control.ssrcs].some((value) =>
			!Number.isInteger(value) || value < 0 || value > 0xffffffff
		)
	) throw new Error("Invalid MCMMD stream control");
	const body = new Uint8Array(12 + control.ssrcs.length * 4);
	const view = new DataView(body.buffer);
	view.setUint16(0, control.operation);
	view.setUint16(2, control.ssrcs.length);
	view.setUint32(4, control.mediaKind);
	view.setUint32(8, control.code);
	control.ssrcs.forEach((ssrc, index) => view.setUint32(12 + index * 4, ssrc));
	return packMcDataSessionPayload(body);
}

export function decodeMcStreamControl(
	data: Uint8Array,
): McStreamControl | undefined {
	if (data.length < 8) throw new Error("Truncated MCMMD header");
	const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
	const length = view.getUint16(4);
	if (data.length !== 8 + Math.ceil(length / 4) * 4) {
		throw new Error("Invalid MCMMD length");
	}
	if (view.getUint16(0) !== 1) return undefined;
	if (length < 12) throw new Error("Truncated stream control");
	const operation = view.getUint16(8);
	const count = view.getUint16(10);
	if (
		![1, 2, 3, 4].includes(operation) || count > 16 ||
		length < 12 + count * 4
	) throw new Error("Invalid stream control");
	return {
		operation: operation as McStreamControl["operation"],
		mediaKind: view.getUint32(12),
		code: view.getUint32(16),
		ssrcs: Array.from(
			{ length: count },
			(_, index) => view.getUint32(20 + index * 4),
		),
	};
}

export interface McVideoStreamRequest {
	type: number;
	ssrc: number;
	mid?: string;
	startOperation: number;
	encoding: number;
	channel?: number;
	layers: Array<{ layer: number; codec: number }>;
}

function unique(
	fields: DecodedField[],
	tag: number,
): bigint | Uint8Array | undefined {
	const matches = fields.filter((field) => field.tag === tag);
	if (matches.length > 1) throw new Error("Duplicate stream control field");
	return matches[0]?.value;
}

function uint(
	fields: DecodedField[],
	tag: number,
	required = false,
): number | undefined {
	const value = unique(fields, tag);
	if (value === undefined && !required) return undefined;
	if (typeof value !== "bigint" || value < 0n || value > 0xffffffffn) {
		throw new Error("Invalid stream-control integer");
	}
	return Number(value);
}

function userId(fields: DecodedField[], tag: number): string | undefined {
	const value = unique(fields, tag);
	if (value === undefined) return undefined;
	if (!(value instanceof Uint8Array)) throw new Error("Invalid stream user id");
	const mid = new TextDecoder().decode(value);
	if (!/^u[0-9a-f]{32}$/.test(mid)) throw new Error("Invalid stream user id");
	return mid;
}

export function decodeMcStrmReq(bytes: Uint8Array): {
	sequence?: number;
	requests: McVideoStreamRequest[];
} {
	if (bytes.length > 65536) throw new Error("Stream request too large");
	const fields = decodeFields(bytes);
	const records = fields.filter((field) => field.tag === 1);
	if (!records.length || records.length > 60) {
		throw new Error("Invalid stream request count");
	}
	const requests = records.map((record): McVideoStreamRequest => {
		if (!(record.value instanceof Uint8Array)) {
			throw new Error("Invalid stream request record");
		}
		const values = decodeFields(record.value);
		const type = uint(values, 1, true)!;
		const ssrc = uint(values, 3, true)!;
		const mid = userId(values, 2);
		const startOperation = uint(values, 5) ?? 0;
		const encoding = uint(values, 6) ?? 0;
		if (type > 1 || startOperation > 1 || encoding > 2) {
			throw new Error("Invalid stream request");
		}
		const layerRecords = values.filter((field) => field.tag === 8);
		if (layerRecords.length > 16) {
			throw new Error("Too many requested video layers");
		}
		const layers = layerRecords.map((layerRecord) => {
			if (!(layerRecord.value instanceof Uint8Array)) {
				throw new Error("Invalid video layer");
			}
			const layerFields = decodeFields(layerRecord.value);
			const layer = uint(layerFields, 1, true)!;
			const codec = uint(layerFields, 2, true)!;
			if (layer > 15 || codec > 3) {
				throw new Error("Invalid requested video layer");
			}
			return { layer, codec };
		});
		return {
			type,
			ssrc,
			mid,
			startOperation,
			encoding,
			channel: uint(values, 7),
			layers,
		};
	});
	return { sequence: uint(fields, 2), requests };
}

export function decodeMcNotifyStrmReq(bytes: Uint8Array): Array<{
	state: 0 | 1 | 2;
	ssrc: number;
	channel: number;
	mid?: string;
}> {
	if (bytes.length > 65536) throw new Error("Stream notification too large");
	const records = decodeFields(bytes).filter((field) => field.tag === 1);
	if (records.length > 512) throw new Error("Too many stream notifications");
	return records.map((record) => {
		if (!(record.value instanceof Uint8Array)) {
			throw new Error("Invalid stream notification");
		}
		const fields = decodeFields(record.value);
		const state = uint(fields, 1, true)!;
		const mid = userId(fields, 2);
		const ssrc = uint(fields, 3, true)!;
		const channel = uint(fields, 5, true)!;
		if (state > 2) throw new Error("Invalid stream state");
		return { state: state as 0 | 1 | 2, ssrc, channel, mid };
	});
}
