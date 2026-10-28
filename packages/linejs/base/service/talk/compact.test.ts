import { assertEquals, assertInstanceOf, assertThrows } from "@std/assert";
import {
	CompactMessageProtocolError,
	decodeCompactMessageResponse,
	encodeCompactText,
	packCompactE2EEMessage,
	packCompactPlainMessage,
	writeCompactI32,
	writeCompactI64,
} from "./compact.ts";

function hex(data: Uint8Array): string {
	return Array.from(data).map((v) => v.toString(16).padStart(2, "0")).join("");
}

Deno.test("encodeCompactText chooses UTF-8 with BOM for ASCII", () => {
	assertEquals(hex(encodeCompactText("hello")), "efbbbf68656c6c6f");
});

Deno.test("encodeCompactText chooses UTF-16LE with BOM when shorter", () => {
	assertEquals(hex(encodeCompactText("あ")), "fffe4230");
});

Deno.test("packCompactPlainMessage writes type, MID type, seq, MID bytes, text, and suffix", () => {
	const mid = "u" + "00".repeat(16);
	const packed = packCompactPlainMessage(0, mid, "hi");
	assertEquals(
		hex(packed),
		"02" + "00" + "00" + "00".repeat(16) + "05" + "efbbbf6869" + "00",
	);
});

Deno.test("packCompactE2EEMessage writes E2EE version, binary chunks, and compact key ids", () => {
	const mid = "c" + "11".repeat(16);
	const salt = Uint8Array.from(Array.from({ length: 16 }, (_, i) => i));
	const message = Uint8Array.from([0xaa, 0xbb, 0xcc]);
	const nonce = Uint8Array.from(Array.from({ length: 12 }, () => 0x22));
	const senderKeyId = Uint8Array.from([0x00, 0x00, 0x00, 0x96]);
	const receiverKeyId = Uint8Array.from([0xff, 0xff, 0xff, 0xff]);
	const packed = packCompactE2EEMessage(1, mid, [
		salt,
		message,
		nonce,
		senderKeyId,
		receiverKeyId,
	]);
	assertEquals(
		hex(packed),
		"05" +
			"02" +
			"02" +
			"11".repeat(16) +
			"02" +
			"10" + hex(salt) +
			"03aabbcc" +
			"0c" + "22".repeat(12) +
			"ac02" +
			"01",
	);
});

Deno.test("decodeCompactMessageResponse reads success body", () => {
	const body: number[] = [1];
	writeCompactI32(body, 7);
	writeCompactI64(body, 1234567890123n);
	writeCompactI64(body, 1710000000000n);
	const decoded = decodeCompactMessageResponse(Uint8Array.from(body));
	assertEquals(decoded, {
		sequenceId: 7,
		messageId: 1234567890123n,
		createdTime: 1710000000,
	});
});

Deno.test("decodeCompactMessageResponse throws compact error code", () => {
	const body: number[] = [2];
	writeCompactI32(body, 82);
	const error = assertThrows(
		() => decodeCompactMessageResponse(Uint8Array.from(body)),
	);
	assertInstanceOf(error, CompactMessageProtocolError);
	assertEquals(error.code, 82);
});

Deno.test("packCompactE2EEMessage handles large binary chunks without argument expansion", () => {
	const payload = new Uint8Array(300_000).fill(0x5a);
	const packed = packCompactE2EEMessage(1, "u" + "00".repeat(16), [
		new Uint8Array(0),
		payload,
		new Uint8Array(0),
		new Uint8Array(4),
		new Uint8Array(4),
	]);
	assertEquals(packed.length, 20 + 1 + 3 + payload.length + 1 + 1 + 1);
	assertEquals(packed[19], 0x02);
	assertEquals(Array.from(packed.slice(21, 24)), [0xe0, 0xa7, 0x12]);
	assertEquals(packed[24], 0x5a);
});
