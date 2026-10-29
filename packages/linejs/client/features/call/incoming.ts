import type * as LINETypes from "vylinejs-types";
import { decodeMpKey, sha256 } from "./planet/crypto.ts";

/** The route supplied by an authenticated incoming operation, not acquireRoute. */
export type IncomingCallRoute = Pick<
	LINETypes.CallRoute,
	| "voipAddress"
	| "voipAddress6"
	| "voipUdpPort"
	| "commParam"
	| "fromToken"
	| "fromZone"
	| "toZone"
	| "toMid"
>;

/** Authenticated one-to-one audio call metadata. */
export interface IncomingAudioCall {
	callId: string;
	notificationId: string;
	callerMid: string;
	localMid: string;
	createdAt: number;
	route: IncomingCallRoute;
	credential: Uint8Array;
}

/** Authenticated one-to-one audio or video call metadata. */
export interface IncomingPlanetCall extends IncomingAudioCall {
	kind: "AUDIO" | "VIDEO";
}

function object(value: unknown): Record<string, unknown> | undefined {
	return value !== null && typeof value === "object" && !Array.isArray(value)
		? value as Record<string, unknown>
		: undefined;
}
function jsonObject(value: unknown): Record<string, unknown> | undefined {
	if (typeof value !== "string" || value.length > 32768) return;
	try {
		return object(JSON.parse(value));
	} catch {
		return;
	}
}
function token(value: unknown): value is string {
	return typeof value === "string" && /^[A-Za-z0-9_-]{1,128}$/.test(value);
}
function hosts(value: unknown): value is string {
	return typeof value === "string" && value.length <= 1024 &&
		value.split(",").every((h) => /^[A-Za-z0-9:.\-]{1,253}$/.test(h));
}
function absent(value: unknown): boolean {
	return value === undefined || value === "";
}
function hasForbiddenOperationChar(value: string): boolean {
	for (const char of value) {
		const code = char.charCodeAt(0);
		if (code <= 0x20 || code === 0x7f) return true;
	}
	return false;
}

/**
 * Parse only operations from the authenticated client's event stream. This is
 * shape validation, not authentication of arbitrary JSON received over HTTP.
 * The local MID must come from that client's logged-in profile.
 */
export function parseIncomingPlanetCall(
	value: unknown,
	localMid: string,
): IncomingPlanetCall | undefined {
	const op = object(value);
	const userMid = /^u[0-9a-f]{32}$/;
	if (
		!op || (op.type !== "NOTIFIED_RECEIVED_CALL" && op.type !== 50) ||
		typeof op.param1 !== "string" || !op.param1 || op.param1.length > 128 ||
		hasForbiddenOperationChar(op.param1) || typeof op.param2 !== "string" ||
		!userMid.test(localMid)
	) return;
	const p = jsonObject(op.param3);
	if (
		!p || (p.k !== "CA" && p.k !== "CV") || !absent(p.g) ||
		!absent(p.sei) || !token(p.n) ||
		!token(p.vs) || !token(p.vfz) || !token(p.vtz) || !hosts(p.h) ||
		(!absent(p.hv6) && !hosts(p.hv6))
	) return;
	const callerMid = userMid.test(op.param1)
		? (p.n === op.param2 ? op.param1 : undefined)
		: userMid.test(op.param2)
		? op.param2
		: undefined;
	if (!callerMid || callerMid === localMid) return;
	if (
		typeof p.p !== "number" &&
		(typeof p.p !== "string" || !/^\d{1,5}$/.test(p.p))
	) return;
	const port = Number(p.p);
	if (!Number.isInteger(port) || port < 1 || port > 65535) return;
	const comm = jsonObject(p.vc);
	if (!comm || typeof comm.mpkey !== "string") return;
	try {
		decodeMpKey(comm.mpkey);
	} catch {
		return;
	}
	if (
		typeof op.createdTime !== "number" && typeof op.createdTime !== "bigint"
	) return;
	const createdAt = Number(op.createdTime);
	if (!Number.isSafeInteger(createdAt) || createdAt <= 0) return;
	return {
		kind: p.k === "CV" ? "VIDEO" : "AUDIO",
		callId: p.vs,
		notificationId: userMid.test(op.param1) ? p.vs : op.param1,
		callerMid,
		localMid,
		createdAt,
		route: {
			voipAddress: p.h,
			voipAddress6: typeof p.hv6 === "string" ? p.hv6 : "",
			voipUdpPort: port,
			commParam: p.vc as string,
			fromToken: p.n,
			fromZone: p.vfz,
			toZone: p.vtz,
			toMid: callerMid,
		},
		credential: sha256(
			new TextEncoder().encode(
				[callerMid, localMid, p.n, p.vs].join("::"),
			),
		),
	};
}

/** Parse only audio notifications for callers that intentionally reject video. */
export function parseIncomingAudioCall(
	value: unknown,
	localMid: string,
): IncomingAudioCall | undefined {
	const call = parseIncomingPlanetCall(value, localMid);
	if (!call || call.kind !== "AUDIO") return undefined;
	const { kind: _kind, ...audio } = call;
	return audio;
}
