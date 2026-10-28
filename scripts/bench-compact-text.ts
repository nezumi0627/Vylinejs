import { encodeCompactText } from "../packages/linejs/base/service/talk/compact.ts";

const iterations = 500;
const cases = {
	ascii: "line message ".repeat(1_000),
	japanese: "こんにちは世界".repeat(1_000),
	mixed: "LINE 👍 あ".repeat(1_000),
};

const results: Record<string, number[]> = {};
for (const [name, text] of Object.entries(cases)) {
	for (let i = 0; i < 50; i++) encodeCompactText(text);
	const samples: number[] = [];
	for (let run = 0; run < 5; run++) {
		const started = performance.now();
		for (let i = 0; i < iterations; i++) encodeCompactText(text);
		samples.push(performance.now() - started);
	}
	results[name] = samples.sort((a, b) => a - b);
}

console.log(JSON.stringify({ iterations, results }));
