import { assertEquals } from "@std/assert";
import type { CodecFactory, PcmFrame } from "./audio.ts";
import { GroupAudioMixer } from "./groupAudio.ts";

Deno.test("GroupAudioMixer mixes decoded PCM and closes stale sources", () => {
	let closed = 0;
	const codecs = {
		newEncoder() {
			throw new Error("encoder should not be created");
		},
		newDecoder() {
			return {
				decode(): PcmFrame {
					return {
						samples: new Int16Array(960).fill(1200),
						sampleRate: 48000,
						channels: 1,
					};
				},
				close() {
					closed++;
				},
			};
		},
	} as CodecFactory;
	const mixer = new GroupAudioMixer(codecs);
	mixer.push({ ssrc: 1, timestamp: 0, frames: [Uint8Array.of(1)] }, 0);

	const frame = mixer.read(60);
	assertEquals(frame?.samples.length, 960);
	assertEquals(frame?.samples[0], 1200);
	assertEquals(mixer.read(30_001), undefined);
	assertEquals(closed, 1);
	mixer.close();
});
