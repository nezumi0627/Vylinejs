import { assertEquals, assertRejects } from "@std/assert";
import { createVoomClient, getChannelToken, voomRest } from "./voom.ts";
import { Client } from "../client.ts";

const discontinuedMessage =
	"LINE VOOM ended on 2026-09-30 and is no longer available";

function makeFake() {
	let issued = 0;
	let fetched = 0;
	const client = {
		base: {
			channel: {
				issueChannelToken() {
					issued++;
					return Promise.resolve({ token: "token" });
				},
			},
			fetch() {
				fetched++;
				return Promise.resolve(new Response("{}"));
			},
		},
	};
	return {
		client: client as never,
		counts: () => ({ issued, fetched }),
	};
}

Deno.test("VOOM compatibility APIs fail fast without network or token calls", async () => {
	const { client, counts } = makeFake();
	const voom = createVoomClient(client);
	const publicClient = new Client({} as never);
	const calls = [
		() => voom.getToken("TIMELINE"),
		() => voom.call("TIMELINE", { path: "/api/v57/post/list.json" }),
		() => voom.feed(),
		() => voom.timelineStatus(),
		() => getChannelToken(client, "1341209950"),
		() => voomRest(client, { path: "/api/v57/post/list.json" }),
		() => publicClient.voomRest({ path: "/api/v57/post/list.json" }),
		() => publicClient.voom.feed(),
	];

	for (const call of calls) {
		await assertRejects(call, Error, discontinuedMessage);
	}
	assertEquals(counts(), { issued: 0, fetched: 0 });
});
