// Adapted from tqmane/vyline-api; MIT attribution and terms: docs/licenses/tqmane-vyline-api-MIT.txt.
import { inflateSync } from "node:zlib";
import { type DecodedField, decodeFields } from "./schema.ts";

const MAX_MESSAGE_BYTES = 256 * 1024;

function uncompress(message: Uint8Array, compression: number): Uint8Array {
	if (message.length > MAX_MESSAGE_BYTES) {
		throw new Error("Conference message too large");
	}
	if (compression !== 0 && compression !== 1) {
		throw new Error("Unsupported conference compression");
	}
	const result = compression === 1
		? inflateSync(message, { maxOutputLength: MAX_MESSAGE_BYTES })
		: message;
	if (result.length > MAX_MESSAGE_BYTES) {
		throw new Error("Conference message too large");
	}
	return result;
}

export interface ConferenceMember {
	mid: string;
	connected: boolean;
	mediaFlags: number;
	sources: Array<{ name: string; ssrc: number }>;
}

function one(
	fields: DecodedField[],
	tag: number,
): DecodedField["value"] | undefined {
	const values = fields.filter((field) => field.tag === tag);
	if (values.length > 1) throw new Error("Duplicate conference field");
	return values[0]?.value;
}

function uint(fields: DecodedField[], tag: number): number | undefined {
	const value = one(fields, tag);
	if (value === undefined) return;
	if (typeof value !== "bigint" || value < 0n || value > 0xffffffffn) {
		throw new Error("Invalid conference integer");
	}
	return Number(value);
}

function bytes(fields: DecodedField[], tag: number): Uint8Array | undefined {
	const value = one(fields, tag);
	if (value === undefined) return;
	if (!(value instanceof Uint8Array)) {
		throw new Error("Invalid conference bytes");
	}
	return value;
}

function messages(fields: DecodedField[], tag: number): Uint8Array[] {
	return fields
		.filter((field) => field.tag === tag)
		.map((field) => {
			if (!(field.value instanceof Uint8Array)) {
				throw new Error("Invalid conference message");
			}
			return field.value;
		});
}

function sourceList(entries: Uint8Array[]): ConferenceMember["sources"] {
	if (entries.length > 32) throw new Error("Too many conference sources");
	return entries.map((source) => {
		const fields = decodeFields(source);
		const name = new TextDecoder().decode(bytes(fields, 1));
		const ssrc = uint(fields, 2);
		if (!/^[ -~]{1,64}$/.test(name) || ssrc === undefined) {
			throw new Error("Invalid conference source");
		}
		return { name, ssrc };
	});
}

function member(data: Uint8Array): ConferenceMember {
	const fields = decodeFields(data);
	const mid = new TextDecoder().decode(bytes(fields, 1));
	const connected = uint(fields, 3);
	if (
		!/^u[0-9a-f]{32}$/.test(mid) || connected === undefined || connected > 1
	) {
		// Windows 0x5eab73 requires has_connect; absence is not a leave event.
		throw new Error("Invalid conference member");
	}
	return {
		mid,
		connected: connected === 1,
		mediaFlags: uint(fields, 2) ?? 0,
		sources: sourceList(messages(fields, 10)),
	};
}

/** Windows: notifier PLANET/stream1 → conf_msg_container (0x59b8e0),
 * FULL/PARTIAL update (0x5ed7c0), source-list replacement (0x5ee1a4).
 * No names, roster persistence or raw-message logging here.
 */
export class ConferenceState {
	#version: number | undefined;
	#members = new Map<string, ConferenceMember>();
	#channels = new Map<
		number,
		{ version: number; members: Map<string, ConferenceMember["sources"]> }
	>();

	hasChannel(id: number): boolean {
		return this.#channels.has(id);
	}

	get videoSources(): Array<{ mid: string; ssrc: number; channel: number }> {
		// Native 0x5f1f2d / 0x5a8cf0: the unnamed conference resolves its sources
		// from the roster and leaves channel=0. Named channel_info remains explicit.
		if (!this.#channels.size) {
			return this.members.flatMap((member) =>
				member.sources
					.filter((s) => s.name === "V")
					.map((source) => ({ mid: member.mid, ssrc: source.ssrc, channel: 0 }))
			);
		}
		const result: Array<{ mid: string; ssrc: number; channel: number }> = [];
		for (const [channel, state] of this.#channels) {
			for (const [mid, sources] of state.members) {
				const member = this.#members.get(mid);
				for (const source of sources) {
					if (
						source.name === "V" &&
						member?.sources.some((s) =>
							s.name === "V" && s.ssrc === source.ssrc
						)
					) {
						result.push({ mid, ssrc: source.ssrc, channel });
					}
				}
			}
		}
		return result;
	}

	get members(): ConferenceMember[] {
		return [...this.#members.values()].map((member) => ({
			...member,
			sources: member.sources.map((source) => ({ ...source })),
		}));
	}

	accept(container: Uint8Array): boolean {
		if (container.length > MAX_MESSAGE_BYTES) {
			throw new Error("Conference message too large");
		}
		const wrapper = decodeFields(container);
		const compression = uint(wrapper, 1) ?? 0;
		let message = bytes(wrapper, 2);
		if (!message) throw new Error("Conference message missing");
		message = uncompress(message, compression);
		const fields = decodeFields(message);
		const conference = bytes(fields, 1);
		const channel = bytes(fields, 2);
		const update = channel ? this.#readChannel(channel) : undefined;
		const changed = conference ? this.acceptInfo(conference) : false;
		if (update) this.#channels.set(update.id, update.state);
		return changed || update !== undefined;
	}

	#readChannel(data: Uint8Array) {
		const fields = decodeFields(data);
		const id = uint(fields, 2);
		const version = uint(fields, 1);
		if (id === undefined || version === undefined) {
			throw new Error("Channel identity/version missing");
		}
		const previous = this.#channels.get(id);
		if (previous?.version && version !== 0 && version <= previous.version) {
			return;
		}
		if (!previous && this.#channels.size >= 30) {
			throw new Error("Too many conference channels");
		}
		const entries = messages(fields, 11);
		if (entries.length > 512) throw new Error("Too many channel members");
		const members = new Map(previous?.members);
		const seen = new Set<string>();
		for (const entry of entries) {
			const values = decodeFields(entry);
			const mid = new TextDecoder().decode(bytes(values, 1));
			const state = uint(values, 3);
			if (
				!/^u[0-9a-f]{32}$/.test(mid) || state === undefined || state > 2 ||
				seen.has(mid)
			) {
				throw new Error("Invalid channel member");
			}
			seen.add(mid);
			if (state === 0) members.delete(mid);
			else members.set(mid, sourceList(messages(values, 11)));
		}
		if (members.size > 512) throw new Error("Too many channel members");
		return { id, state: { version, members } };
	}

	/** PARTICIPATE_RSP.contents carries raw conference_info, not the PDTP wrapper. */
	acceptInfo(conference: Uint8Array, compression = 0): boolean {
		const fields = decodeFields(uncompress(conference, compression));
		const stateType = uint(fields, 1) ?? 0;
		const version = uint(fields, 2);
		if (stateType > 1 || version === undefined) {
			throw new Error("Invalid conference version/type");
		}
		// Native 0x5ed7f5: zero means unversioned; PARTIAL can be the first update.
		if (this.#version && version !== 0 && version <= this.#version) {
			return false;
		}
		const entries = messages(fields, 50);
		if (entries.length > 512) throw new Error("Too many conference members");
		const next = stateType === 1
			? new Map<string, ConferenceMember>()
			: new Map(this.#members);
		const seen = new Set<string>();
		for (const entry of entries) {
			const update = member(entry);
			if (seen.has(update.mid)) throw new Error("Duplicate conference member");
			seen.add(update.mid);
			if (update.connected) next.set(update.mid, update);
			else next.delete(update.mid);
		}
		if (next.size > 512) throw new Error("Too many conference members");
		const sources = new Set<string>();
		for (const member of next.values()) {
			for (const source of member.sources) {
				const key = `${source.name}:${source.ssrc}`;
				if (sources.has(key)) throw new Error("Ambiguous conference source");
				sources.add(key);
			}
		}
		this.#members = next;
		this.#version = version;
		return true;
	}
}
