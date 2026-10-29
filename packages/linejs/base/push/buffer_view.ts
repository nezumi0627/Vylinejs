import { Buffer } from "node:buffer";

/**
 * Wraps an ArrayBuffer-backed payload without copying it. SharedArrayBuffer
 * inputs retain Buffer.from(Uint8Array)'s copy semantics.
 */
export function toBufferView(data: Uint8Array): Buffer {
	if (data.buffer instanceof ArrayBuffer) {
		return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
	}
	return Buffer.from(data);
}
