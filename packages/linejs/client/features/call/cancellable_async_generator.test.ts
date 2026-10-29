import { assertEquals } from "@std/assert";
import { AsyncWaitQueue } from "./async_wait_queue.ts";
import { cancellableAsyncGenerator } from "./cancellable_async_generator.ts";

Deno.test("return cancels a pending async-generator read", async () => {
	let cancelled = false;
	let resolveRead!: (value: Uint8Array | null) => void;
	const iterator = cancellableAsyncGenerator(() => ({
		promise: new Promise<Uint8Array | null>((resolve) => resolveRead = resolve),
		cancel() {
			cancelled = true;
			resolveRead(null);
		},
	}));

	const pendingNext = iterator.next();
	await Promise.resolve();
	assertEquals(await iterator.return(), { value: undefined, done: true });
	assertEquals(cancelled, true);
	assertEquals(await pendingNext, { value: undefined, done: true });
	assertEquals(await iterator.next(), { value: undefined, done: true });
});

Deno.test("concurrent next calls remain serialized in request order", async () => {
	const queue = new AsyncWaitQueue<number>();
	const iterator = cancellableAsyncGenerator(() => queue.read());
	const first = iterator.next();
	const second = iterator.next();
	await Promise.resolve();
	assertEquals(queue.pendingCount, 1);

	assertEquals(queue.push(1), true);
	assertEquals(await first, { value: 1, done: false });
	await Promise.resolve();
	assertEquals(queue.pendingCount, 1);
	assertEquals(queue.push(2), true);
	assertEquals(await second, { value: 2, done: false });
	await iterator.return();
});
