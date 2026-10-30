import { assertEquals, assertRejects } from "@std/assert";
import type { BaseClient } from "../../core/mod.ts";
import { LiffService } from "./mod.ts";

Deno.test("sendLiff keeps token caches separate for different LIFF IDs", async () => {
	const service = new LiffService({
		fetch: () => Promise.resolve(new Response("{}")),
	} as never as BaseClient);
	const issued: string[] = [];
	service.getLiffToken = ({ liffId }) => {
		issued.push(liffId);
		return Promise.resolve(`token-${liffId}`);
	};

	await service.sendLiff({
		to: "u-recipient",
		liffId: "app-a",
		messages: [{ type: "text", text: "hello" }],
	});
	await service.sendLiff({
		to: "u-recipient",
		liffId: "app-b",
		messages: [{ type: "text", text: "hello" }],
	});
	await service.sendLiff({
		to: "u-recipient",
		liffId: "app-a",
		messages: [{ type: "text", text: "hello" }],
	});

	assertEquals(issued, ["app-a", "app-b"]);
});

Deno.test("sendLiff forceIssue refreshes only the selected LIFF token", async () => {
	const service = new LiffService({
		fetch: () => Promise.resolve(new Response("{}")),
	} as never as BaseClient);
	const issued: string[] = [];
	service.getLiffToken = ({ liffId }) => {
		issued.push(liffId);
		return Promise.resolve(`token-${issued.length}`);
	};
	const send = (liffId: string, forceIssue = false) =>
		service.sendLiff({
			to: "u-recipient",
			liffId,
			messages: [{ type: "text", text: "hello" }],
			forceIssue,
		});

	await send("app-a");
	await send("app-b");
	await send("app-a", true);

	assertEquals(issued, ["app-a", "app-b", "app-a"]);
});

Deno.test("sendLiff shares an in-flight token issue for the same recipient and LIFF ID", async () => {
	const service = new LiffService({
		fetch: () => Promise.resolve(new Response("{}")),
	} as never as BaseClient);
	let issueCount = 0;
	let releaseIssue!: (token: string) => void;
	service.getLiffToken = () => {
		issueCount++;
		return new Promise((resolve) => releaseIssue = resolve);
	};
	const options = {
		to: "u-recipient",
		liffId: "app",
		messages: [{ type: "text", text: "hello" } as const],
	};
	const first = service.sendLiff(options);
	const second = service.sendLiff(options);
	await Promise.resolve();
	assertEquals(issueCount, 1);
	releaseIssue("shared-token");
	await Promise.all([first, second]);
});

Deno.test("sendLiff invalidates a cached token after an unauthorized response", async () => {
	let fetchCount = 0;
	const service = new LiffService({
		fetch: () =>
			Promise.resolve(
				++fetchCount === 1
					? new Response('{"error":"unauthorized"}', { status: 401 })
					: new Response("{}"),
			),
	} as never as BaseClient);
	let issueCount = 0;
	service.getLiffToken = () => Promise.resolve(`token-${++issueCount}`);
	const options = {
		to: "u-recipient",
		liffId: "app",
		messages: [{ type: "text", text: "hello" } as const],
	};

	await assertRejects(() => service.sendLiff(options), Error);
	await service.sendLiff(options);

	assertEquals(issueCount, 2);
});

Deno.test("sendLiff does not reuse a token after switching LINE accounts", async () => {
	const client = {
		profile: { mid: "u-account-a" },
		fetch: () => Promise.resolve(new Response("{}")),
	};
	const service = new LiffService(client as never as BaseClient);
	const issued: string[] = [];
	service.getLiffToken = () => {
		issued.push(client.profile.mid);
		return Promise.resolve(`token-${client.profile.mid}`);
	};
	const send = () =>
		service.sendLiff({
			to: "u-recipient",
			liffId: "app",
			messages: [{ type: "text", text: "hello" }],
		});

	await send();
	client.profile.mid = "u-account-b";
	await send();

	assertEquals(issued, ["u-account-a", "u-account-b"]);
});

Deno.test("sendLiff validates messages before requesting a LIFF token", async () => {
	const service = new LiffService({
		fetch: () => Promise.reject(new Error("fetch should not run")),
	} as never as BaseClient);
	let tokenRequested = false;
	service.getLiffToken = () => {
		tokenRequested = true;
		return Promise.resolve("token");
	};
	await assertRejects(
		() => service.sendLiff({ to: "u-recipient", messages: [] }),
		TypeError,
		"at least one",
	);
	assertEquals(tokenRequested, false);
});

Deno.test("sendLiff bounds cached tokens for many recipient pairs", async () => {
	const service = new LiffService({
		fetch: () => Promise.resolve(new Response("{}")),
	} as never as BaseClient);
	service.getLiffToken = ({ chatMid }) => Promise.resolve(`token-${chatMid}`);

	for (let i = 0; i < 160; i++) {
		await service.sendLiff({
			to: `u-recipient-${i}`,
			liffId: "app",
			messages: [{ type: "text", text: "hello" }],
		});
	}

	assertEquals(Object.keys(service.liffTokenCache).length, 128);
	assertEquals(
		service.liffTokenCache[JSON.stringify([undefined, "app", "u-recipient-0"])],
		undefined,
	);
	assertEquals(
		service
			.liffTokenCache[JSON.stringify([undefined, "app", "u-recipient-159"])],
		"token-u-recipient-159",
	);
});
