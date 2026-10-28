import {
	buildRtp,
	deriveSrtpContext,
	SRTP_KEYING_LEN,
	srtpDecrypt,
	srtpEncrypt,
} from "../packages/linejs/client/features/call/srtp.ts";

const iterations = Number(Deno.args[0] ?? 1_000);
const keying = Uint8Array.from({ length: SRTP_KEYING_LEN }, (_, i) => i);
const packets = Array.from({ length: iterations }, (_, seq) =>
	buildRtp({
		payloadType: 96,
		seq,
		timestamp: seq * 960,
		ssrc: 0x12345678,
		payload: new Uint8Array(160).fill(seq & 0xff),
	}));
const sender = await deriveSrtpContext(keying);
const receiver = await deriveSrtpContext(keying);

async function run(): Promise<void> {
	for (const packet of packets) {
		const encrypted = await srtpEncrypt(sender, packet);
		await srtpDecrypt(receiver, encrypted);
	}
}

for (let i = 0; i < 2; i++) await run();
const samples: number[] = [];
for (let runIndex = 0; runIndex < 5; runIndex++) {
	const started = performance.now();
	await run();
	samples.push(performance.now() - started);
}
samples.sort((a, b) => a - b);
console.log(
	JSON.stringify({ iterations, runsMs: samples, medianMs: samples[2] }),
);
