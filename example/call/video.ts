import { loginWithAuthToken } from "@nezumi0627/vylinejs";
import { PlanetTransport } from "@nezumi0627/vylinejs/call";
import type { EncodedVideoFrame } from "@nezumi0627/vylinejs/call";

const tokenPath = Deno.env.get("LINE_AUTH_TOKEN_FILE");
const token = Deno.env.get("LINE_AUTH_TOKEN") ??
	(tokenPath ? (await Deno.readTextFile(tokenPath)).trim() : undefined);
const to = Deno.env.get("LINE_CALL_TO");
const ivfPath = Deno.args[0];
if (!token || !to || !ivfPath) {
	throw new Error("Set LINE_AUTH_TOKEN or LINE_AUTH_TOKEN_FILE, LINE_CALL_TO, and pass an IVF file");
}

const client = await loginWithAuthToken(token, { device: "ANDROID" });
const localMid = client.base.profile?.mid;
if (!localMid) throw new Error("profile is not ready");

const session = client.call.startSession({
	to,
	kind: "VIDEO",
	fromEnvInfo: { devname: "Android" },
	transport: new PlanetTransport({ localMid }),
});

try {
	await session.start();
	await session.setVideoEnabled(true);
	let previousTimestamp = -1;
	for (const frame of readIvfVp8(await Deno.readFile(ivfPath))) {
		if (frame.timestamp <= previousTimestamp) continue;
		previousTimestamp = frame.timestamp;
		await session.sendVideo(frame);
		await sleep(33);
	}
} finally {
	await session.end();
}

function* readIvfVp8(bytes: Uint8Array): Generator<EncodedVideoFrame> {
	if (bytes.length < 32 || new TextDecoder().decode(bytes.subarray(0, 4)) !== "DKIF") {
		throw new Error("Expected a valid IVF file");
	}
	const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
	const headerLength = view.getUint16(6, true);
	const fourcc = new TextDecoder().decode(bytes.subarray(8, 12));
	const rate = view.getUint32(16, true);
	const scale = view.getUint32(20, true);
	if (fourcc !== "VP80" || headerLength < 32 || !rate || !scale) {
		throw new Error("IVF must contain VP8 frames and a valid time base");
	}
	let offset = headerLength;
	let previous = -1;
	while (offset < bytes.length) {
		if (offset + 12 > bytes.length) throw new Error("Truncated IVF frame header");
		const size = view.getUint32(offset, true);
		const ivfTimestamp = view.getBigUint64(offset + 4, true);
		offset += 12;
		if (!size || offset + size > bytes.length) throw new Error("Truncated IVF frame data");
		const timestamp = Math.round(Number(ivfTimestamp) * 90_000 * scale / rate) >>> 0;
		if (Number.isFinite(timestamp) && timestamp !== previous) {
			const data = bytes.slice(offset, offset + size);
			yield { data, key: !(data[0] & 1), timestamp };
			previous = timestamp;
		}
		offset += size;
	}
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
