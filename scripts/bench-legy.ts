import { LegyEncryptedTransport } from "../packages/linejs/base/request/legy.ts";

const iterations = Number(Deno.args[0] ?? 1_000);
const body = new Uint8Array(1_024).fill(0x5a);
const transport = new LegyEncryptedTransport();
const fetcher = (_request: Request) => Promise.resolve(new Response());

async function run(): Promise<void> {
	for (let i = 0; i < iterations; i++) {
		const request = new Request(`https://legy.line-apps.com/S4?seq=${i}`, {
			method: "POST",
			body,
		});
		await transport.fetch(request, fetcher, {
			application: "ANDROID\t26.6.2",
			userAgent: "Line/26.6.2",
		});
	}
}

for (let i = 0; i < 2; i++) await run();
const samples: number[] = [];
for (let i = 0; i < 5; i++) {
	const started = performance.now();
	await run();
	samples.push(performance.now() - started);
}
samples.sort((a, b) => a - b);
console.log(
	JSON.stringify({
		iterations,
		bodyBytes: body.length,
		runsMs: samples,
		medianMs: samples[2],
	}),
);
