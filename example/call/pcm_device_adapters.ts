/**
 * Minimal adapter boundary for platform-specific microphone and speaker APIs.
 * Capture must yield signed 16-bit PCM frames; playback receives decoded PCM.
 */
import type { CallSession } from "../../packages/linejs/client/features/call/session.ts";
import type {
	AudioSink,
	AudioSource,
	PcmFrame,
} from "../../packages/linejs/client/features/call/audio.ts";

export interface PcmCaptureDevice {
	frames(signal?: AbortSignal): AsyncIterable<PcmFrame>;
	close(): Promise<void> | void;
}

export interface PcmPlaybackDevice {
	write(frame: PcmFrame): Promise<void> | void;
	close(): Promise<void> | void;
}

export function audioSourceFromDevice(device: PcmCaptureDevice): AudioSource {
	let closed = false;
	return {
		async *frames({ signal } = {}) {
			for await (const frame of device.frames(signal)) {
				if (frame.sampleRate !== 48000 || frame.channels !== 1) {
					throw new RangeError(
						"PCM capture must provide 48 kHz mono frames; resample before sending",
					);
				}
				yield frame;
			}
		},
		close: async () => {
			if (closed) return;
			closed = true;
			await device.close();
		},
	};
}

export function audioSinkForDevice(device: PcmPlaybackDevice): AudioSink {
	let closed = false;
	return {
		write: (frame) => device.write(frame),
		end: async () => {
			if (closed) return;
			closed = true;
			await device.close();
		},
	};
}

/**
 * Run capture and playback together. The call ends when either media pipeline
 * ends; devices are closed on success, error, or abort.
 */
export async function bridgePcmDevices(
	session: CallSession,
	capture: PcmCaptureDevice,
	playback: PcmPlaybackDevice,
	opts: { signal?: AbortSignal } = {},
): Promise<void> {
	if (session.state !== "in-call") {
		throw new Error(
			`PCM bridge requires an in-call session (state=${session.state})`,
		);
	}
	const source = audioSourceFromDevice(capture);
	const sink = audioSinkForDevice(playback);
	const sending = session.sendStream(source, { signal: opts.signal });
	const receiving = session.receiveInto(sink);
	try {
		await Promise.race([sending, receiving]);
	} finally {
		try {
			await session.end("pcm-bridge-ended");
		} finally {
			await Promise.allSettled([source.close?.(), sink.end?.()]);
			await Promise.allSettled([sending, receiving]);
		}
	}
}
