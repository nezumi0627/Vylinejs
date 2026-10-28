import {
	CC_MSG,
	decodeFields,
	decodePlanetMsg,
	packCcInfoReq,
	packPlanetCcMsg,
	packPlanetMsg,
	wrapCcMsg,
} from "../packages/linejs/client/features/call/planet/schema.ts";

const bytes = packPlanetMsg({
	userId: "u0123456789abcdef0123456789abcdef",
	msgId: 731,
	sessId: new Uint8Array(16).fill(1),
	tranId: new Uint8Array(16).fill(2),
	tranSeq: 731,
	locNonce: 123456n,
	rmtNonce: 654321n,
}, {
	kind: "cc",
	data: packPlanetCcMsg(
		{ cid: "call-id", srcChanId: 100n, dstChanId: 200n },
		wrapCcMsg(
			CC_MSG.INFO_REQ,
			packCcInfoReq({ targets: ["u-peer"], tgtUe: [] }),
		),
	),
});

const iterations = 20_000;
const paths = {
	previousDoubleDecode() {
		decodeFields(bytes);
		decodePlanetMsg(bytes);
	},
	singleDecode() {
		decodePlanetMsg(bytes);
	},
};

for (const fn of Object.values(paths)) {
	for (let i = 0; i < 2_000; i++) fn();
}
const results: Record<string, number[]> = {};
for (const [name, fn] of Object.entries(paths)) {
	const samples: number[] = [];
	for (let run = 0; run < 5; run++) {
		const start = performance.now();
		for (let i = 0; i < iterations; i++) fn();
		samples.push(performance.now() - start);
	}
	results[name] = samples.sort((a, b) => a - b);
}
console.log(JSON.stringify({ iterations, results }));
