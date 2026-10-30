import { assertEquals, assertRejects } from "@std/assert";
import { Buffer } from "node:buffer";
import nacl from "tweetnacl";
import { E2EE } from "./mod.ts";

Deno.test("E2EE imports valid key-bundle entries and selects a server-matched key", async () => {
	const key2 = nacl.box.keyPair();
	const key5 = nacl.box.keyPair();
	const key7 = nacl.box.keyPair();
	const wrongServerKey = nacl.box.keyPair();
	const storage = new Map<string, string>();
	const fakeBase = {
		profile: { mid: "u-self" },
		storage: {
			get: (key: string) => Promise.resolve(storage.get(key) ?? null),
			set: (key: string, value: string) => {
				storage.set(key, value);
				return Promise.resolve();
			},
		},
		talk: {
			getE2EEPublicKeys: () =>
				Promise.resolve([
					{
						keyId: 2,
						keyData: Buffer.from(key2.publicKey).toString("base64"),
					},
					{ keyId: 5, keyData: Buffer.from(wrongServerKey.publicKey) },
				]),
		},
		log() {},
	};
	const e2ee = new E2EE(fakeBase as never);

	const result = await e2ee.importE2EEKeyBundle({
		mid: "u-self",
		keys: [
			{
				keyId: 2,
				privKey: Buffer.from(key2.secretKey).toString("base64"),
				pubKey: Buffer.from(key2.publicKey).toString("base64"),
			},
			{
				keyID: 5,
				e2eeKey: {
					encoded_private_key: Buffer.from(key5.secretKey).toString("base64"),
					encoded_public_key: Buffer.from(key5.publicKey).toString("base64"),
				},
			},
			{
				keyId: 7,
				privKey: Buffer.from(key7.secretKey).toString("base64"),
			},
		],
	});

	assertEquals(result.imported, 2);
	assertEquals(result.skipped, 1);
	assertEquals(result.keyIds, [2, 7]);
	assertEquals(result.identity.ok, true);
	assertEquals(result.identity.selectedKeyId, 2);
	assertEquals(storage.has("e2eeKeys:2"), true);
	assertEquals(storage.has("e2eeKeys:5"), false);
	assertEquals(storage.has("e2eeKeys:7"), true);
	assertEquals(
		(JSON.parse(storage.get("e2eeKeys:u-self")!) as { keyId: number }).keyId,
		2,
	);
});

Deno.test("E2EE refuses a key bundle tagged for another account", async () => {
	const storage = new Map<string, string>();
	const fakeBase = {
		profile: { mid: "u-self" },
		storage: {
			get: (key: string) => Promise.resolve(storage.get(key) ?? null),
			set: (key: string, value: string) => {
				storage.set(key, value);
				return Promise.resolve();
			},
		},
		log() {},
	};
	const e2ee = new E2EE(fakeBase as never);

	await assertRejects(() =>
		e2ee.importE2EEKeyBundle({ mid: "u-other", keys: [] })
	);
	assertEquals(storage.size, 0);
});
