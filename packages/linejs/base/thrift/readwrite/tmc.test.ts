import { assertEquals } from "@std/assert";
import { assertThrows } from "@std/assert";
import { Buffer } from "node:buffer";
import { TMoreCompactProtocol } from "./tmc.ts";

Deno.test("decodeZigZag matches standard thrift zigzag for positive values", () => {
	const tmc = new TMoreCompactProtocol();
	assertEquals(tmc.decodeZigZag(0), 0);
	assertEquals(tmc.decodeZigZag(2), 1);
	assertEquals(tmc.decodeZigZag(4), 2);
	assertEquals(tmc.decodeZigZag(100), 50);
	assertEquals(tmc.decodeZigZag(200), 100);
});

Deno.test("decodeZigZag matches standard thrift zigzag for negative values", () => {
	const tmc = new TMoreCompactProtocol();
	assertEquals(tmc.decodeZigZag(1), -1);
	assertEquals(tmc.decodeZigZag(3), -2);
	assertEquals(tmc.decodeZigZag(5), -3);
	assertEquals(tmc.decodeZigZag(7), -4);
	assertEquals(tmc.decodeZigZag(199), -100);
});

Deno.test("decodeZigZag round-trips with standard zigzag encode", () => {
	const tmc = new TMoreCompactProtocol();
	function zigzagEncode(n: number): number {
		return (n << 1) ^ (n >> 31);
	}
	for (const v of [-1000, -100, -3, -2, -1, 0, 1, 2, 3, 100, 1000]) {
		assertEquals(tmc.decodeZigZag(zigzagEncode(v)), v);
	}
});

Deno.test("TMoreCompactProtocol rejects a truncated header before reading it", () => {
	assertThrows(
		() => new TMoreCompactProtocol(Buffer.from([0, 0, 0, 10, 0])),
		Error,
	);
});

Deno.test("TMoreCompactProtocol rejects field bitmaps that would wrap shifts", () => {
	const protocol = new TMoreCompactProtocol();
	assertThrows(() => protocol.decodeFieldBitmap(2 ** 30), Error);
	assertThrows(() => protocol.decodeFieldBitmap(2 ** 32), Error);
});

Deno.test("TMoreCompactProtocol resets per-message state when reused", () => {
	const emptyMessage = Buffer.from([0, 0, 0, 0, 0, 0]);
	const protocol = new TMoreCompactProtocol();
	protocol.lastFieldId = 4;
	protocol.lastStringId = 99n;
	protocol.stringTable = ["stale"];
	protocol.setDataAndParse(emptyMessage);

	assertEquals(protocol.lastFieldId, 0);
	assertEquals(protocol.lastStringId, 0n);
	assertEquals(protocol.stringTable, []);
	assertEquals(protocol.res, {});
});

Deno.test("TMoreCompactProtocol copies binary fields away from its input buffer", () => {
	const input = Buffer.from([0, 0, 0, 1, 0xa0, 0, 1, 3, 0xff, 0xfe, 0xfd]);
	const protocol = new TMoreCompactProtocol(input);
	const binary = protocol.res[0] as Buffer;

	input[8] = 0;
	assertEquals([...binary], [0xff, 0xfe, 0xfd]);
});
