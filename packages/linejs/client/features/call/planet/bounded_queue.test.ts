import { assertEquals } from "@std/assert";
import { BoundedQueue } from "./bounded_queue.ts";

Deno.test("BoundedQueue rejects durable items without dropping earlier items", () => {
	const queue = new BoundedQueue<string>(2, 2);
	assertEquals(queue.push("first"), 0);
	assertEquals(queue.push("second"), 0);
	assertEquals(queue.push("third"), null);
	assertEquals([queue.shift(), queue.shift()], ["first", "second"]);
});

Deno.test("BoundedQueue drops oldest media and respects byte and item caps", () => {
	const queue = new BoundedQueue<Uint8Array>(3, 5, (packet) => packet.length);
	assertEquals(queue.push(new Uint8Array(2), "drop-oldest"), 0);
	assertEquals(queue.push(new Uint8Array(2), "drop-oldest"), 0);
	assertEquals(queue.push(new Uint8Array(3), "drop-oldest"), 1);
	assertEquals(queue.size, 2);
	assertEquals(queue.weight, 5);
	assertEquals(queue.shift()?.length, 2);
	assertEquals(queue.weight, 3);
	assertEquals(queue.push(new Uint8Array(6), "drop-oldest"), null);
});
