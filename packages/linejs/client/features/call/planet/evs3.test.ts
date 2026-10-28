import { assertEquals } from "@std/assert";
import { Evs3Assembler, packetizeEvs3 } from "./evs3.ts";

Deno.test("Evs3Assembler reconstructs a fragmented VP8 keyframe", () => {
	const frame = new Uint8Array(4_000);
	frame[0] = 32;
	frame[3] = 0x9d;
	frame[4] = 1;
	frame[5] = 0x2a;
	frame[6] = 0x80;
	frame[7] = 0x02;
	frame[8] = 0x68;
	frame[9] = 0x01;
	const packets = packetizeEvs3(frame, true, 1, 1_000);
	const assembler = new Evs3Assembler();
	let decoded: Uint8Array | undefined;

	for (let seq = 0; seq < packets.length; seq++) {
		const result = assembler.push({
			payload: packets[seq],
			seq,
			timestamp: 1,
			ssrc: 1,
			marker: seq === packets.length - 1,
		});
		if (result) decoded = result.data;
	}

	assertEquals(decoded, frame);
});

Deno.test("Evs3Assembler reconstructs a frame when later fragments arrive first", () => {
	const frame = new Uint8Array(4_000);
	frame[0] = 32;
	frame[3] = 0x9d;
	frame[4] = 1;
	frame[5] = 0x2a;
	frame[6] = 0x80;
	frame[7] = 0x02;
	frame[8] = 0x68;
	frame[9] = 0x01;
	const packets = packetizeEvs3(frame, true, 1, 1_000);
	const assembler = new Evs3Assembler();
	for (let seq = 1; seq < packets.length; seq++) {
		assembler.push({
			payload: packets[seq],
			seq,
			timestamp: 2,
			ssrc: 1,
			marker: seq === packets.length - 1,
		});
	}
	const decoded = assembler.push({
		payload: packets[0],
		seq: 0,
		timestamp: 2,
		ssrc: 1,
		marker: false,
	});
	assertEquals(decoded?.data, frame);
});
