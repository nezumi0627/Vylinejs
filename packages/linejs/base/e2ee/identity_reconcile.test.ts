import { assertEquals } from "@std/assert";
import { Buffer } from "node:buffer";
import nacl from "tweetnacl";
import { E2EE } from "./mod.ts";

Deno.test("identity reconciliation preserves the current key when no server key matches", async () => {
	const pair = nacl.box.keyPair();
	const current = JSON.stringify({
		keyId: 7,
		privKey: Buffer.from(pair.secretKey).toString("base64"),
		pubKey: Buffer.from(pair.publicKey).toString("base64"),
	});
	const store = new Map([["e2eeKeys:u-self", current]]);
	const e2ee = new E2EE({
		storage: {
			get(key: string) {
				return Promise.resolve(store.get(key) ?? null);
			},
			set(key: string, value: string) {
				store.set(key, value);
				return Promise.resolve();
			},
			delete(key: string) {
				store.delete(key);
				return Promise.resolve();
			},
		},
		talk: {
			getE2EEPublicKeys() {
				return Promise.resolve([]);
			},
		},
	} as never);

	const status = await e2ee.reconcileStoredE2EEIdentity("u-self");

	assertEquals(status.ok, false);
	assertEquals(store.get("e2eeKeys:u-self"), current);
});
