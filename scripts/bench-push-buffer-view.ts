import { Buffer } from "node:buffer";

const payloadSizes = [256, 4_096, 16_384];
const iterations = 10_000;
const runs = 5;
let observed = 0;

for (const size of payloadSizes) {
	const backing = new Uint8Array(size + 16);
	backing.fill(0x5a);
	const payload = backing.subarray(8, 8 + size);
	const paths = {
		copy: () => Buffer.from(payload),
		view: () =>
			Buffer.from(
				payload.buffer as ArrayBuffer,
				payload.byteOffset,
				payload.byteLength,
			),
	};
	const results: Record<string, number[]> = {};
	for (const [name, makeBuffer] of Object.entries(paths)) {
		for (let i = 0; i < 2_000; i++) observed += makeBuffer()[0];
		const samples: number[] = [];
		for (let run = 0; run < runs; run++) {
			const start = performance.now();
			for (let i = 0; i < iterations; i++) {
				const buffer = makeBuffer();
				observed += buffer[buffer.length - 1];
			}
			samples.push(performance.now() - start);
		}
		results[name] = samples.sort((a, b) => a - b);
	}
	console.log(JSON.stringify({ size, iterations, runs, results }));
}
if (observed === 0) throw new Error("unreachable");
