import { assertEquals } from "@std/assert";
import { SquareChat } from "./mod.ts";

function makeChat(fetchSquareChatEvents: () => Promise<unknown>) {
	const client = {
		base: {
			authToken: "token",
			square: { fetchSquareChatEvents },
		},
	};
	return new SquareChat({
		client: client as never,
		raw: { squareChatMid: "chat" } as never,
	});
}

Deno.test("SquareChat.listen aborts during initial sync and can restart", async () => {
	const controller = new AbortController();
	let calls = 0;
	const chat = makeChat(() => {
		calls++;
		if (calls === 1) {
			controller.abort();
			return Promise.resolve({ syncToken: "next", events: [{}] });
		}
		return Promise.resolve({ syncToken: "done", events: [] });
	});

	await chat.listen({ signal: controller.signal });
	assertEquals(calls, 1);

	await chat.listen({ syncToken: "ready", signal: AbortSignal.abort() });
	assertEquals(calls, 1);
});

Deno.test("SquareChat.listen cancels its polling delay on abort", async () => {
	const controller = new AbortController();
	const chat = makeChat(() =>
		Promise.resolve({ syncToken: "next", events: [] })
	);
	chat.on("update:syncToken", () => controller.abort());
	const startedAt = Date.now();

	await chat.listen({ syncToken: "ready", signal: controller.signal });

	assertEquals(Date.now() - startedAt < 500, true);
});
