import { FileStorage } from "../packages/linejs/base/storage/file.ts";

const keyCount = Number(Deno.args[0] ?? 50_000);
const getIterations = 30;
const setIterations = 5;
if (!Number.isSafeInteger(keyCount) || keyCount < 1) {
	throw new RangeError("keyCount must be a positive integer");
}

const path = await Deno.makeTempFile({ prefix: "vylinejs-storage-bench-" });
try {
	const initial = Object.fromEntries(
		Array.from({ length: keyCount }, (_, i) => [`key${i}`, `value${i}`]),
	);
	await Deno.writeTextFile(path, JSON.stringify(initial));
	const storage = new FileStorage(path);
	let started = performance.now();
	for (let i = 0; i < getIterations; i++) await storage.get(`key${i}`);
	const getAverageMs = (performance.now() - started) / getIterations;
	started = performance.now();
	for (let i = 0; i < setIterations; i++) await storage.set(`bench${i}`, i);
	const setAverageMs = (performance.now() - started) / setIterations;
	started = performance.now();
	await storage.setMany(
		Object.fromEntries(
			Array.from({ length: setIterations }, (_, i) => [`batch${i}`, i]),
		),
	);
	const setManyMs = performance.now() - started;
	console.log(JSON.stringify({
		keyCount,
		getIterations,
		setIterations,
		getAverageMs,
		setAverageMs,
		setManyMs,
	}));
} finally {
	await Deno.remove(path);
}
