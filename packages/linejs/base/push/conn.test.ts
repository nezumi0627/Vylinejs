import { assert, assertEquals, assertInstanceOf } from "@std/assert";
import { Conn } from "./conn.ts";

// `Conn.new` races the connect against a 300 ms fallback timer that stays
// armed even once the connect has settled. Waiting it out keeps the default
// op sanitizer from reporting it as a leak.
const CONNECT_FALLBACK_MS = 350;

function stubManager(
	fetch: () => Promise<Response>,
	onLog?: () => void,
) {
	const logs: { type: string; data: Record<string, unknown> }[] = [];
	const manager = {
		client: {
			fetch,
			log(type: string, data: Record<string, unknown>) {
				logs.push({ type, data });
				onLog?.();
			},
		},
		log() {},
	};
	return { manager, logs };
}

function settleFallbackTimer(): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, CONNECT_FALLBACK_MS));
}

// A transport failure used to reject the floating IIFE inside `new`, which
// nobody awaited: Deno tore the whole process down with "Uncaught (in
// promise) TypeError: fetch failed". Deno.test's default sanitizers turn
// that same unhandled rejection into a test failure.
Deno.test("Conn.new reports a transport failure instead of crashing", async () => {
	const { manager, logs } = stubManager(() =>
		Promise.reject(new TypeError("fetch failed"))
	);
	const conn = new Conn(manager as never);

	await conn.new("example.invalid", 443, "/PUSH/1/subs?m=1");

	assertEquals(conn.resStream, undefined);
	assertEquals(logs.map((entry) => entry.type), ["LegyPusherError"]);
	assertInstanceOf(logs[0].data.error, TypeError);
	// `reqStream` is still handed back so the caller can shut the conn down.
	assert(conn.reqStream);
	await conn.close();
	await settleFallbackTimer();
});

// `log` is a user-supplied listener, so it can throw. Reporting the error
// before resolving, and outside any guard, would let that throw reject the
// very handler that exists to stop an unhandled rejection.
Deno.test("Conn.new survives a log listener that throws", async () => {
	const { manager, logs } = stubManager(
		() => Promise.reject(new TypeError("fetch failed")),
		() => {
			throw new Error("log listener failed");
		},
	);
	const conn = new Conn(manager as never);

	await conn.new("example.invalid", 443, "/PUSH/1/subs?m=1");

	assertEquals(conn.resStream, undefined);
	// The listener was still called; only its own failure was swallowed.
	assertEquals(logs.map((entry) => entry.type), ["LegyPusherError"]);
	assertInstanceOf(logs[0].data.error, TypeError);
	assert(conn.reqStream);
	await conn.close();
	await settleFallbackTimer();
});

Deno.test("Conn.new reports a response without a body", async () => {
	const { manager, logs } = stubManager(() =>
		Promise.resolve(new Response(null, { status: 204 }))
	);
	const conn = new Conn(manager as never);

	await conn.new("example.invalid", 443, "/PUSH/1/subs?m=1");

	assertEquals(conn.resStream, undefined);
	assertEquals(logs.map((entry) => entry.type), ["LegyPusherError"]);
	assertInstanceOf(logs[0].data.error, Error);
	assertEquals((logs[0].data.error as Error).message, "no body");
	await conn.close();
	await settleFallbackTimer();
});

Deno.test("Conn.new keeps the response stream on success", async () => {
	const { manager, logs } = stubManager(() =>
		Promise.resolve(new Response(new Uint8Array([1, 2, 3])))
	);
	const conn = new Conn(manager as never);

	await conn.new("example.invalid", 443, "/PUSH/1/subs?m=1");

	assert(conn.resStream);
	assertEquals(logs, []);
	await conn.resStream.cancel();
	await conn.close();
	await settleFallbackTimer();
});

Deno.test("Conn upload stream backpressures writes at its bounded queue limit", async () => {
	const { manager } = stubManager(() => Promise.resolve(new Response(null)));
	const conn = new Conn(manager as never);
	const writer = conn.createAsyncReadableStream();
	for (let i = 0; i < 400; i++) {
		await writer.enqueue(new Uint8Array([i & 0xff]));
	}
	let completed = false;
	const blocked = writer.enqueue(new Uint8Array([0])).then(() =>
		completed = true
	);
	await Promise.resolve();
	assertEquals(completed, false);
	const reader = writer.stream.getReader();
	assertEquals((await reader.read()).value?.[0], 0);
	await blocked;
	assertEquals(completed, true);
	reader.releaseLock();
});

Deno.test("Conn upload stream rejects blocked writes on close", async () => {
	const { manager } = stubManager(() => Promise.resolve(new Response(null)));
	const conn = new Conn(manager as never);
	const writer = conn.createAsyncReadableStream();
	for (let i = 0; i < 400; i++) {
		await writer.enqueue(new Uint8Array([i & 0xff]));
	}
	let settled = false;
	const blocked = writer.enqueue(new Uint8Array([0])).then(
		() => settled = true,
		() => settled = true,
	);
	writer.close();
	await new Promise((resolve) => setTimeout(resolve, 0));
	assertEquals(settled, true);
	await blocked;
});

Deno.test("Conn reassembles byte-fragmented PUSH frames with one final copy", async () => {
	const { manager } = stubManager(() => Promise.resolve(new Response(null)));
	const conn = new Conn(manager as never);
	const received: Array<{ type: number; payload: number[] }> = [];
	conn.onPacketReceived = (type, payload) => {
		received.push({ type, payload: Array.from(payload) });
		return Promise.resolve();
	};
	for (const byte of [0, 4, 5, 9, 8, 7, 6]) {
		await conn.onDataReceived(new Uint8Array([byte]));
	}
	assertEquals(received, [{ type: 5, payload: [9, 8, 7, 6] }]);
});
