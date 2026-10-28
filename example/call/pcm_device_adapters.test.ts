import { assertEquals } from "@std/assert";
import type { PcmFrame } from "../../packages/linejs/client/features/call/audio.ts";
import type { CallSession } from "../../packages/linejs/client/features/call/session.ts";
import { bridgePcmDevices } from "./pcm_device_adapters.ts";

Deno.test("PCM device bridge runs both directions and closes resources", async () => {
	const frame: PcmFrame = {
		samples: new Int16Array([1, 2, 3]),
		sampleRate: 48000,
		channels: 1,
	};
	const received: PcmFrame[] = [];
	let captureClosed = 0;
	let playbackClosed = 0;
	let sessionEnded = 0;
	let sessionState = "in-call";
	const session = {
		get state() {
			return sessionState;
		},
		async sendStream(source: { frames(): AsyncIterable<PcmFrame> }) {
			for await (const input of source.frames()) assertEquals(input, frame);
		},
		receiveInto(sink: { write(frame: PcmFrame): void }) {
			sink.write(frame);
			return Promise.resolve();
		},
		end() {
			sessionEnded++;
			sessionState = "ended";
			return Promise.resolve();
		},
	} as unknown as CallSession;

	await bridgePcmDevices(session, {
		async *frames() {
			yield frame;
		},
		close() {
			captureClosed++;
		},
	}, {
		write(output) {
			received.push(output);
		},
		close() {
			playbackClosed++;
		},
	});

	assertEquals(received, [frame]);
	assertEquals(captureClosed, 1);
	assertEquals(playbackClosed, 1);
	assertEquals(sessionEnded, 1);
});
