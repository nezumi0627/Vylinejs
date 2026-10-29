import { assertEquals, assertStrictEquals } from "@std/assert";
import { toBufferView } from "./buffer_view.ts";

Deno.test("toBufferView shares the exact Uint8Array range without copying", () => {
	const backing = new Uint8Array([9, 8, 1, 2, 3, 4, 7]);
	const input = backing.subarray(2, 6);
	const output = toBufferView(input);

	assertStrictEquals(output.buffer, input.buffer);
	assertEquals(output.byteOffset, input.byteOffset);
	assertEquals(output.byteLength, input.byteLength);
	input[0] = 42;
	assertEquals(output[0], 42);
});
