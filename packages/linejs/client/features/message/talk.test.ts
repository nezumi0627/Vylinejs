import { assertEquals } from "@std/assert";
import { Buffer } from "node:buffer";
import type { Message } from "vylinejs-types";
import type { Client } from "../../client.ts";
import { TalkMessage } from "./talk.ts";

function message(raw: Partial<Message>): TalkMessage {
	return new TalkMessage({ client: {} as Client, raw: raw as Message });
}

Deno.test("TalkMessage.isEdited — never edited", () => {
	assertEquals(message({ text: "hi" }).isEdited, false);
	assertEquals(message({ text: "hi", updatedTime: 0 }).isEdited, false);
	assertEquals(message({ text: "hi", updatedTime: 0n }).isEdited, false);
	assertEquals(
		message({ text: "hi", contentMetadata: { e2eeVersion: "2" } }).isEdited,
		false,
	);
});

Deno.test("TalkMessage.isEdited — edit operation metadata", () => {
	const m = message({
		id: "1234567890123456789",
		contentMetadata: {
			e2eeVersion: "2",
			EDITED: "true",
			UPDATED_TIME: "1787927539000",
		},
	});
	assertEquals(m.isEdited, true);
	assertEquals(m.updatedTime, 1787927539000);
});

Deno.test("TalkMessage.isEdited — updatedTime field", () => {
	assertEquals(
		message({ text: "hi", updatedTime: 1700000000000 }).isEdited,
		true,
	);
	assertEquals(
		message({ text: "hi", updatedTime: 1700000000000n }).isEdited,
		true,
	);
});

// Messages fetched from the message box (getRecentMessagesV2 and friends) carry
// only UPDATED_TIME — no EDITED flag and no `updatedTime` field. Shape taken
// from a live getRecentMessagesV2 response.
Deno.test("TalkMessage.isEdited — message box metadata (UPDATED_TIME only)", () => {
	const m = message({
		id: "1234567890123456789",
		contentMetadata: { UPDATED_TIME: "1788432321630" },
	});
	assertEquals(m.isEdited, true);
	assertEquals(m.updatedTime, 1788432321630);
});

Deno.test("TalkMessage.updatedTime", () => {
	assertEquals(message({ text: "hi" }).updatedTime, null);
	assertEquals(message({ text: "hi", updatedTime: 0 }).updatedTime, null);
	assertEquals(
		message({ text: "hi", updatedTime: 1700000000000 }).updatedTime,
		1700000000000,
	);
	assertEquals(
		message({
			updatedTime: 1700000000000,
			contentMetadata: { UPDATED_TIME: "1787927539000" },
		}).updatedTime,
		1787927539000,
	);
});

function makeClient() {
	const chatCheckedCalls: unknown[] = [];
	const sendCalls: unknown[] = [];
	const client = {
		base: {
			profile: { mid: "u-self" },
			getReqseq: () => Promise.resolve(1),
			talk: {
				sendMessage(opts: unknown) {
					sendCalls.push(opts);
					return Promise.resolve({});
				},
				sendChatChecked(opts: unknown) {
					chatCheckedCalls.push(opts);
					return Promise.resolve({});
				},
			},
		},
	} as never as Client;
	return { client, chatCheckedCalls, sendCalls };
}

function makeRaw(
	opts: { to: string; from: string; toType: string; id?: string },
) {
	return {
		id: opts.id ?? "msg-1",
		to: opts.to,
		from: opts.from,
		toType: opts.toType,
		contentType: "NONE",
		contentMetadata: {},
		text: "hi",
	} as never;
}

Deno.test("read marks the group chat itself as read for received group messages", async () => {
	const { client, chatCheckedCalls } = makeClient();
	const msg = new TalkMessage({
		client,
		raw: makeRaw({ to: "g-group", from: "u-them", toType: "GROUP" }),
	});
	await msg.read();
	assertEquals(chatCheckedCalls[0], {
		chatMid: "g-group",
		lastMessageId: "msg-1",
		seq: 1,
	});
});

Deno.test("read keeps 1:1 behavior (counterpart mid) for received DMs", async () => {
	const { client, chatCheckedCalls } = makeClient();
	const msg = new TalkMessage({
		client,
		raw: makeRaw({ to: "u-self", from: "u-them", toType: "USER" }),
	});
	await msg.read();
	assertEquals(chatCheckedCalls[0], {
		chatMid: "u-them",
		lastMessageId: "msg-1",
		seq: 1,
	});
});

Deno.test("send(string) preserves the existing reply call shape", async () => {
	const { client, sendCalls } = makeClient();
	const msg = new TalkMessage({
		client,
		raw: makeRaw({ to: "g-group", from: "u-them", toType: "GROUP" }),
	});

	await msg.send("hello from LINEJS-style usage");

	assertEquals(sendCalls, [{
		relatedMessageId: "msg-1",
		text: "hello from LINEJS-style usage",
		to: "g-group",
		e2ee: false,
		contentMetadata: undefined,
	}]);
});

Deno.test("send(object) forwards the LINEJS message fields to the same chat", async () => {
	const { client, sendCalls } = makeClient();
	const msg = new TalkMessage({
		client,
		raw: makeRaw({ to: "g-group", from: "u-them", toType: "GROUP" }),
	});
	const location = { title: "Here", address: "Somewhere" } as never;

	await msg.send({
		text: "hello",
		contentType: "NONE",
		contentMetadata: { sample: "value" },
		relatedMessageId: "reply-to",
		location,
	});

	assertEquals(sendCalls, [{
		to: "g-group",
		e2ee: false,
		text: "hello",
		contentType: "NONE",
		contentMetadata: { sample: "value" },
		relatedMessageId: "reply-to",
		location,
	}]);
});

Deno.test("send(object) accepts caller-prepared E2EE chunks", async () => {
	const { client, sendCalls } = makeClient();
	const msg = new TalkMessage({
		client,
		raw: makeRaw({ to: "g-group", from: "u-them", toType: "GROUP" }),
	});
	const chunks = [Buffer.from([1, 2, 3])];

	await msg.send({
		contentType: "IMAGE",
		contentMetadata: { e2eeVersion: "2" },
		chunks,
		e2ee: true,
	});

	assertEquals(sendCalls, [{
		to: "g-group",
		e2ee: true,
		contentType: "IMAGE",
		contentMetadata: { e2eeVersion: "2" },
		chunks,
	}]);
});
