import { assert, assertEquals, assertRejects } from "@std/assert";
import { EncryptedStorage } from "./encrypted.ts";
import { MemoryStorage } from "./memory.ts";

async function makeKey(): Promise<CryptoKey> {
	return await crypto.subtle.generateKey(
		{ name: "AES-GCM", length: 256 },
		false,
		["encrypt", "decrypt"],
	);
}

Deno.test("EncryptedStorage encrypts values and round-trips them", async () => {
	const backing = new MemoryStorage();
	const storage = new EncryptedStorage(backing, await makeKey());
	await storage.set("accessToken", "secret-token");

	const stored = await backing.get("accessToken");
	assert(typeof stored === "string");
	assert(stored.startsWith("linejs:encrypted:v1:"));
	assert(!stored.includes("secret-token"));
	assertEquals(await storage.get("accessToken"), "secret-token");
});

Deno.test("EncryptedStorage detects tampering and wrong keys", async () => {
	const backing = new MemoryStorage();
	const first = new EncryptedStorage(backing, await makeKey());
	await first.set("refreshToken", "refresh-secret");
	const second = new EncryptedStorage(backing, await makeKey());
	await assertRejects(() => second.get("refreshToken"), Error);

	const value = String(await backing.get("refreshToken"));
	await backing.set("refreshToken", `${value.slice(0, -2)}AA`);
	await assertRejects(() => first.get("refreshToken"), Error);
});

Deno.test("EncryptedStorage binds ciphertext to its storage key", async () => {
	const backing = new MemoryStorage();
	const storage = new EncryptedStorage(backing, await makeKey());
	await storage.set("accessToken", "secret-token");
	const encrypted = await backing.get("accessToken");
	assert(typeof encrypted === "string");
	await backing.set("refreshToken", encrypted);
	await assertRejects(() => storage.get("refreshToken"), Error);
});

Deno.test("File-compatible storage migration encrypts legacy values", async () => {
	const plaintext = new MemoryStorage({ accessToken: "old-token" });
	const backing = new MemoryStorage();
	const encrypted = new EncryptedStorage(backing, await makeKey());
	await plaintext.migrate(encrypted);

	assertEquals(await encrypted.get("accessToken"), "old-token");
	assertEquals(typeof await backing.get("accessToken"), "string");
	assertEquals(await encrypted.getAll(), { accessToken: "old-token" });
});
