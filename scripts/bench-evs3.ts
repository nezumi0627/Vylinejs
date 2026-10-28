import {
	Evs3Assembler,
	packetizeEvs3,
} from "../packages/linejs/client/features/call/planet/evs3.ts";

const frameBytes = Number(Deno.args[0] ?? 64_000);
const fragmentBytes = 1_000;
const iterations = 500;
const frame = new Uint8Array(frameBytes);
frame[0] = 32; // Key frame, one-byte first partition.
frame[3] = 0x9d;
frame[4] = 1;
frame[5] = 0x2a;
frame[6] = 0x80;
frame[7] = 0x02; // 640 pixels wide.
frame[8] = 0x68;
frame[9] = 0x01; // 360 pixels high.
const packets = packetizeEvs3(frame, true, 1, fragmentBytes).map(
	(payload, seq) => ({
		payload,
		seq,
		timestamp: 1,
		ssrc: 1,
		marker: seq === Math.ceil(frameBytes / fragmentBytes) - 1,
	}),
);

function assemble(): void {
	const assembler = new Evs3Assembler();
	for (const packet of packets) assembler.push(packet);
}

for (let i = 0; i < 100; i++) assemble();
const samples: number[] = [];
for (let run = 0; run < 5; run++) {
	const start = performance.now();
	for (let i = 0; i < iterations; i++) assemble();
	samples.push(performance.now() - start);
}
samples.sort((a, b) => a - b);
console.log(
	JSON.stringify({
		frameBytes,
		fragmentBytes,
		iterations,
		runsMs: samples,
		medianMs: samples[2],
	}),
);
