import { FileStorage } from "../packages/linejs/base/storage/file.ts";
import { MemoryStorage } from "../packages/linejs/base/storage/memory.ts";

const keyCount = Number(Deno.args[0] ?? 1_000);
if (!Number.isSafeInteger(keyCount) || keyCount < 1) {
	throw new RangeError("keyCount must be a positive integer");
}

const source = new MemoryStorage(
	Object.fromEntries(
		Array.from({ length: keyCount }, (_, i) => [`key${i}`, `value${i}`]),
	),
);
const path = await Deno.makeTempFile({ prefix: "vylinejs-migrate-bench-" });
try {
	const destination = new FileStorage(path);
	const started = performance.now();
	await source.migrate(destination);
	console.log(
		JSON.stringify({ keyCount, migrateMs: performance.now() - started }),
	);
} finally {
	await Deno.remove(path);
}
