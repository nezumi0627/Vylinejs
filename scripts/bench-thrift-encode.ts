import { writeThrift } from "../packages/linejs/base/thrift/readwrite/write.ts";
import {
	type NestedArray,
	Protocols,
} from "../packages/linejs/base/thrift/readwrite/declares.ts";

const args: NestedArray = [
	[11, 1, "u0123456789abcdef0123456789abcdef"],
	[10, 2, 618946633287860670n],
	[15, 3, [11, Array.from({ length: 8 }, (_, i) => `message-${i}`)]],
];
const iterations = 10_000;

for (let i = 0; i < 1_000; i++) writeThrift(args, "sync", Protocols[4]);
const samples: number[] = [];
for (let run = 0; run < 5; run++) {
	const start = performance.now();
	for (let i = 0; i < iterations; i++) writeThrift(args, "sync", Protocols[4]);
	samples.push(performance.now() - start);
}
samples.sort((a, b) => a - b);
console.log(
	JSON.stringify({ iterations, runsMs: samples, medianMs: samples[2] }),
);
