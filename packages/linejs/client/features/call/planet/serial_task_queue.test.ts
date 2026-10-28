import { assertEquals } from "@std/assert";
import { SerialTaskQueue } from "./serial_task_queue.ts";

Deno.test("SerialTaskQueue preserves order and evicts oldest queued media", async () => {
	let release!: () => void;
	const gate = new Promise<void>((resolve) => release = resolve);
	let started!: () => void;
	const running = new Promise<void>((resolve) => started = resolve);
	const seen: number[] = [];
	const queue = new SerialTaskQueue(2, 2);
	queue.enqueue(async () => {
		started();
		await gate;
		seen.push(0);
	}, 1);
	await running;
	queue.enqueue(
		() => {
			seen.push(1);
		},
		1,
		"drop-oldest",
	);
	queue.enqueue(
		() => {
			seen.push(2);
		},
		1,
		"drop-oldest",
	);
	assertEquals(
		queue.enqueue(
			() => {
				seen.push(3);
			},
			1,
			"drop-oldest",
		),
		1,
	);
	release();
	await queue.idle();
	assertEquals(seen, [0, 2, 3]);
});

Deno.test("SerialTaskQueue rejects overflow for ordered control work", async () => {
	let release!: () => void;
	const gate = new Promise<void>((resolve) => release = resolve);
	let started!: () => void;
	const running = new Promise<void>((resolve) => started = resolve);
	const queue = new SerialTaskQueue(1, 1);
	queue.enqueue(async () => {
		started();
		await gate;
	}, 1);
	await running;
	assertEquals(queue.enqueue(() => {}, 1), 0);
	assertEquals(queue.enqueue(() => {}, 1), null);
	release();
	await queue.idle();
});
