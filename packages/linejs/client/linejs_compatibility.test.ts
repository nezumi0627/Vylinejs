import { assertEquals } from "@std/assert";
import {
	Client,
	loginWithAuthToken,
	loginWithPassword,
	loginWithQR,
} from "./mod.ts";
import type { BaseClient } from "../base/mod.ts";

Deno.test("LINEJS-style client construction, login helpers, and message events remain available", () => {
	const client = new Client({} as BaseClient);
	client.on("message", (message) => {
		const text: string | null = message.text;
		void text;
		void message.send("reply using the existing call shape");
	});

	assertEquals(typeof loginWithQR, "function");
	assertEquals(typeof loginWithAuthToken, "function");
	assertEquals(typeof loginWithPassword, "function");
});
