import { assertEquals, assertRejects } from "@std/assert";
import { Buffer } from "node:buffer";
import { E2EE } from "./mod.ts";

Deno.test("historical peer key is fetched by the message key id", async () => {
	const store = new Map<string, string>();
	const calls: Array<Record<string, number | string>> = [];
	const keyData = Buffer.alloc(32, 7);
	const fakeBase = {
		storage: {
			get: (key: string) => Promise.resolve(store.get(key) ?? null),
			set: (key: string, value: string) => {
				store.set(key, value);
				return Promise.resolve();
			},
		},
		talk: {
			getE2EEPublicKey: (args: Record<string, number | string>) => {
				calls.push(args);
				return Promise.resolve({ keyId: 17, keyData });
			},
		},
		getToType: () => 0,
		log() {},
	};
	const e2ee = new E2EE(fakeBase as never);

	const key = await e2ee.getE2EELocalPublicKey("u-peer", 17);

	assertEquals(calls, [{ mid: "u-peer", keyVersion: 1, keyId: 17 }]);
	assertEquals(key, keyData);
	assertEquals(
		store.get("e2eePublicKeys:u-peer:17"),
		keyData.toString("base64"),
	);
});

Deno.test("historical peer key response must match the requested key id", async () => {
	const store = new Map<string, string>();
	const fakeBase = {
		storage: {
			get: (key: string) => Promise.resolve(store.get(key) ?? null),
			set: (key: string, value: string) => {
				store.set(key, value);
				return Promise.resolve();
			},
		},
		talk: {
			getE2EEPublicKey: () =>
				Promise.resolve({
					keyId: 18,
					keyData: Buffer.alloc(32, 8),
				}),
		},
		getToType: () => 0,
		log() {},
	};
	const e2ee = new E2EE(fakeBase as never);

	await assertRejects(() => e2ee.getE2EELocalPublicKey("u-peer", 17));
	assertEquals(store.has("e2eePublicKeys:u-peer:17"), false);
});
