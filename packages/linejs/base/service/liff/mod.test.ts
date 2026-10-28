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
