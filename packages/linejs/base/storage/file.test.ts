import { assertEquals, assertRejects } from "@std/assert";
import { FileStorage } from "./file.ts";
import { MemoryStorage } from "./memory.ts";

Deno.test("FileStorage shares updates between instances without exposing mutable state", async () => {
	const path = await Deno.makeTempFile();
	try {
		const first = new FileStorage(path);
		const second = new FileStorage(path);
		await first.set("key", { value: 1 });
		assertEquals(await second.get("key"), { value: 1 });
		const snapshot = await second.getAll();
		(snapshot.key as { value: number }).value = 2;
		assertEquals(await first.get("key"), { value: 1 });
	} finally {
		await Deno.remove(path);
	}
});

Deno.test("FileStorage serializes concurrent writes and reloads persisted state", async () => {
	const path = await Deno.makeTempFile();
	try {
		const storage = new FileStorage(path);
		await Promise.all(
			Array.from({ length: 20 }, (_, i) => storage.set(`key${i}`, i)),
		);
		const reloaded = new FileStorage(path);
		assertEquals(Object.keys(await reloaded.getAll()).length, 20);
		assertEquals(await reloaded.get("key19"), 19);
	} finally {
		await Deno.remove(path);
	}
});

Deno.test("FileStorage setMany persists a batch and reloads all entries", async () => {
	const path = await Deno.makeTempFile();
	try {
		const storage = new FileStorage(path);
		await storage.setMany({
			accessToken: "access",
			refreshToken: "refresh",
			expire: 1234,
		});

		const reloaded = new FileStorage(path);
		assertEquals(await reloaded.getAll(), {
			accessToken: "access",
			refreshToken: "refresh",
			expire: 1234,
		});
	} finally {
		await Deno.remove(path);
	}
});

Deno.test("FileStorage setMany applies values over existing data", async () => {
	const path = await Deno.makeTempFile();
	try {
		const storage = new FileStorage(path);
		await storage.set("keep", "existing");
		await storage.setMany({ first: 1, second: 2 });
		assertEquals(await storage.getAll(), {
			keep: "existing",
			first: 1,
			second: 2,
		});
	} finally {
		await Deno.remove(path);
	}
});

Deno.test("FileStorage setMany leaves memory unchanged when normalization fails", async () => {
	const path = await Deno.makeTempFile();
	try {
		const storage = new FileStorage(path);
		await storage.set("first", "old");
		const cyclic: Record<string, unknown> = {};
		cyclic.self = cyclic;

		await assertRejects(
			() => storage.setMany({ first: "new", cyclic: cyclic as never }),
			TypeError,
		);
		assertEquals(await storage.getAll(), { first: "old" });
	} finally {
		await Deno.remove(path);
	}
});

Deno.test("FileStorage detects external file edits", async () => {
	const path = await Deno.makeTempFile();
	try {
		const storage = new FileStorage(path);
		await Deno.writeTextFile(
			path,
			JSON.stringify({ external: "changed-size" }),
		);
		assertEquals(await storage.get("external"), "changed-size");
	} finally {
		await Deno.remove(path);
	}
});

Deno.test("MemoryStorage migration writes a file destination as one batch", async () => {
	const path = await Deno.makeTempFile();
	try {
		const source = new MemoryStorage({ first: "one", second: "two" });
		const destination = new FileStorage(path);
		await source.migrate(destination);
		assertEquals(await destination.getAll(), {
			first: "one",
			second: "two",
		});
	} finally {
		await Deno.remove(path);
	}
});

Deno.test("FileStorage migration writes a file destination as one batch", async () => {
	const sourcePath = await Deno.makeTempFile();
	const destinationPath = await Deno.makeTempFile();
	try {
		const source = new FileStorage(sourcePath);
		const destination = new FileStorage(destinationPath);
		await source.setMany({ first: "one", second: "two" });
		await source.migrate(destination);
		assertEquals(await destination.getAll(), {
			first: "one",
			second: "two",
		});
	} finally {
		await Deno.remove(sourcePath);
		await Deno.remove(destinationPath);
	}
});

Deno.test("FileStorage tightens permissive credential-file permissions", async () => {
	if (Deno.build.os === "windows") return;
	const path = await Deno.makeTempFile();
	try {
		await Deno.chmod(path, 0o644);
		const storage = new FileStorage(path);
		assertEquals((await Deno.stat(path)).mode! & 0o777, 0o600);
		await Deno.chmod(path, 0o644);
		await storage.set("accessToken", "secret");
		const info = await Deno.stat(path);
		assertEquals(info.mode! & 0o777, 0o600);
	} finally {
		await Deno.remove(path);
	}
});
