import { assertEquals } from "@std/assert";
import {
	audio,
	createLiffClient,
	flex,
	image,
	location,
	sticker,
	text,
	video,
} from "./liff.ts";

Deno.test("liff.text — plain", () => {
	assertEquals(text("hi"), { type: "text", text: "hi" });
});

Deno.test("liff.text — with sentBy", () => {
	const m = text("hi", {
		label: "Bot",
		iconUrl: "https://example.test/icon.png",
		linkUrl: "https://example.test",
	});
	assertEquals(m, {
		type: "text",
		text: "hi",
		sentBy: {
			label: "Bot",
			iconUrl: "https://example.test/icon.png",
			linkUrl: "https://example.test",
		},
	});
});

Deno.test("liff.sticker", () => {
	assertEquals(sticker("11537", "52002734"), {
		type: "sticker",
		packageId: "11537",
		stickerId: "52002734",
	});
});

Deno.test("liff.image — preview defaults to original", () => {
	const m = image("https://example.test/a.jpg");
	assertEquals(m, {
		type: "image",
		originalContentUrl: "https://example.test/a.jpg",
		previewImageUrl: "https://example.test/a.jpg",
	});
});

Deno.test("liff.image — explicit preview", () => {
	const m = image(
		"https://example.test/orig.jpg",
		"https://example.test/thumb.jpg",
	);
	assertEquals(m.previewImageUrl, "https://example.test/thumb.jpg");
});

Deno.test("liff.video, liff.audio, and liff.location builders", () => {
	assertEquals(
		video("https://example.test/v.mp4", "https://example.test/p.jpg"),
		{
			type: "video",
			originalContentUrl: "https://example.test/v.mp4",
			previewImageUrl: "https://example.test/p.jpg",
		},
	);
	assertEquals(audio("https://example.test/a.m4a", 1200), {
		type: "audio",
		originalContentUrl: "https://example.test/a.m4a",
		duration: 1200,
	});
	assertEquals(location("Tokyo", "Japan", 35.68, 139.76), {
		type: "location",
		title: "Tokyo",
		address: "Japan",
		latitude: 35.68,
		longitude: 139.76,
	});
});

Deno.test("liff.flex — passes contents through", () => {
	const contents = {
		type: "bubble",
		body: { type: "box", layout: "vertical" },
	};
	const m = flex("alt", contents);
	assertEquals(m.type, "flex");
	assertEquals(m.altText, "alt");
	assertEquals(m.contents, contents);
});

Deno.test("liff.shareMessage forwards the selected LIFF ID", async () => {
	let sentOptions: Record<string, unknown> | undefined;
	const client = createLiffClient({
		base: {
			liff: {
				liffId: "default-id",
				sendLiff(options: Record<string, unknown>) {
					sentOptions = options;
					return Promise.resolve({});
				},
			},
		},
	} as never);

	await client.shareMessage("u123", text("hello"), { liffId: "other-id" });
	assertEquals(sentOptions?.liffId, "other-id");
});

Deno.test("liff.sendLiff exposes direct sending and consent options", async () => {
	let sentOptions: Record<string, unknown> | undefined;
	const client = createLiffClient({
		base: {
			liff: {
				liffId: "default-id",
				sendLiff(options: Record<string, unknown>) {
					sentOptions = options;
					return Promise.resolve({});
				},
			},
		},
	} as never);

	await client.sendLiff({
		to: "u123",
		messages: [text("hello")],
		tryConsent: false,
	});
	assertEquals(sentOptions?.liffId, "default-id");
	assertEquals(sentOptions?.tryConsent, false);
});
