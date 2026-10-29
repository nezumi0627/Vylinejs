import { assert, assertEquals } from "@std/assert";
import { Buffer } from "node:buffer";
import { E2EE } from "./mod.ts";

Deno.test("E2EE operation logs never include keys or message bytes", () => {
	const logs: Array<{ type: string; data: Record<string, unknown> }> = [];
	const e2ee = new E2EE({
		log(type: string, data: Record<string, unknown>) {
			logs.push({ type, data });
		},
	} as never);
	const plaintext = Buffer.from("secret message");
	const key = Buffer.alloc(32, 7);
	const nonce = Buffer.alloc(12, 8);
	const aad = Buffer.from("associated data");

	e2ee.encryptE2EEMessageV2(plaintext, key, nonce, aad);

	assertEquals(logs.length, 1);
	assertEquals(logs[0].type, "e2ee");
	assertEquals(logs[0].data.type, "createCipheriv");
	assert(!("message" in logs[0].data));
	assert(!JSON.stringify(logs).includes(plaintext.toString()));
	assert(!JSON.stringify(logs).includes(key.toString("hex")));
});
