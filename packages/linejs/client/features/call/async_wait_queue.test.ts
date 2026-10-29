import { assertEquals } from "@std/assert";
import { AsyncWaitQueue } from "./async_wait_queue.ts";
import { cancellableAsyncGenerator } from "./cancellable_async_generator.ts";

Deno.test("AsyncWaitQueue cancellation removes the pending reader", async () => {
	const queue = new AsyncWaitQueue<number>();
	const read = queue.read();
	assertEquals(queue.pendingCount, 1);

	read.cancel();
	assertEquals(await read.promise, null);
	assertEquals(queue.pendingCount, 0);
});

Deno.test("AsyncWaitQueue resolves readers in order and closes remaining reads", async () => {
	const queue = new AsyncWaitQueue<number>();
	const first = queue.read();
	const second = queue.read();

	assertEquals(queue.push(1), true);
	assertEquals(await first.promise, 1);
	queue.close();
	assertEquals(await second.promise, null);
	assertEquals(await queue.read().promise, null);
});

Deno.test("cancelling a video-style iterator removes its queue waiter", async () => {
	const queue = new AsyncWaitQueue<number>();
	const iterator = cancellableAsyncGenerator(() => queue.read());
	const pendingNext = iterator.next();
	await Promise.resolve();
	assertEquals(queue.pendingCount, 1);

	await iterator.return();
	assertEquals(queue.pendingCount, 0);
	assertEquals(await pendingNext, { value: undefined, done: true });
});
