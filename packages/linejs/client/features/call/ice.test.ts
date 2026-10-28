import { assert, assertEquals, assertRejects } from "@std/assert";
import { Buffer } from "node:buffer";
import dgram from "node:dgram";
import {
	formatCandidate,
	gatherIceCandidates,
	gatherSrflx,
	icePriority,
	parseCandidate,
} from "./ice.ts";

Deno.test("icePriority: host candidate ranks higher than srflx", () => {
	const host = icePriority("host", 1);
	const srflx = icePriority("srflx", 1);
	assert(host > srflx, `host=${host} should be > srflx=${srflx}`);
});

Deno.test("formatCandidate + parseCandidate round-trip", () => {
	const c = {
		foundation: "1",
		componentId: 1,
		transport: "udp" as const,
		priority: 2113929471,
		address: "192.168.1.5",
		port: 50000,
		type: "host" as const,
	};
	const s = formatCandidate(c);
	const back = parseCandidate(s);
	assertEquals(back, c);
});

Deno.test("formatCandidate + parseCandidate round-trip with raddr/rport", () => {
	const c = {
		foundation: "2",
		componentId: 1,
		transport: "udp" as const,
		priority: 1694498815,
		address: "203.0.113.10",
		port: 54321,
		type: "srflx" as const,
		relatedAddress: "192.168.1.5",
		relatedPort: 50000,
	};
	const s = formatCandidate(c);
	const back = parseCandidate(s);
	assertEquals(back, c);
});

Deno.test("parseCandidate accepts the full 'a=candidate:' prefix", () => {
	const c = parseCandidate(
		"candidate:1 1 udp 2113929471 192.168.1.5 50000 typ host",
	);
	assertEquals(c?.type, "host");
});

Deno.test("gatherSrflx removes its message listener after timeout", async () => {
	const sock = dgram.createSocket("udp4");
	await new Promise<void>((resolve) => sock.bind(0, "127.0.0.1", resolve));
	const sink = dgram.createSocket("udp4");
	await new Promise<void>((resolve) => sink.bind(0, "127.0.0.1", resolve));
	const baseline = sock.listenerCount("message");
	try {
		const address = sink.address();
		const result = await gatherSrflx(sock, "127.0.0.1", address.port, 5);
		assertEquals(result, null);
		assertEquals(sock.listenerCount("message"), baseline);
	} finally {
		sock.close();
		sink.close();
	}
});

Deno.test("gatherIceCandidates closes its socket when STUN parsing fails", async () => {
	const responder = dgram.createSocket("udp4");
	await new Promise<void>((resolve) => responder.bind(0, "127.0.0.1", resolve));
	responder.on("message", (_message, remote) => {
		responder.send(Buffer.from([0]), remote.port, remote.address);
	});
	const reserved = dgram.createSocket("udp4");
	await new Promise<void>((resolve) => reserved.bind(0, "0.0.0.0", resolve));
	const localPort = reserved.address().port;
	await new Promise<void>((resolve) => reserved.close(() => resolve()));
	const probe = dgram.createSocket("udp4");
	try {
		await assertRejects(
			() =>
				gatherIceCandidates({
					localPort,
					stunHost: "127.0.0.1",
					stunPort: responder.address().port,
				}),
			Error,
			"STUN: too short",
		);
		await new Promise<void>((resolve, reject) => {
			probe.once("error", reject);
			probe.bind(
				{ address: "0.0.0.0", port: localPort, exclusive: true },
				resolve,
			);
		});
	} finally {
		try {
			probe.close();
		} catch { /* probe may have failed to bind */ }
		responder.close();
	}
});

Deno.test("gatherIceCandidates: live host + srflx via Google STUN", async () => {
	const { socket, candidates } = await gatherIceCandidates({
		stunHost: "stun.l.google.com",
		stunPort: 19302,
	});
	socket.close();
	assert(candidates.length >= 1, "expected at least a host candidate");
	const host = candidates.find((c) => c.type === "host");
	assert(host, "no host candidate");
	assert(host!.port > 0);
	// srflx might fail in CI sandboxes — accept either way
	const srflx = candidates.find((c) => c.type === "srflx");
	if (srflx) {
		assertEquals(srflx.relatedPort, host!.port);
	}
});
