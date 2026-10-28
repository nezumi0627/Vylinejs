import { assertEquals, assertThrows } from "@std/assert";
import { type LiffMessage, validateLiffMessages } from "./messages.ts";

Deno.test("LIFF accepts supported message types", () => {
	const messages: LiffMessage[] = [
		{ type: "text", text: "hello" },
		{ type: "sticker", packageId: "1", stickerId: "2" },
		{
			type: "image",
			originalContentUrl: "https://example.test/a.jpg",
			previewImageUrl: "https://example.test/b.jpg",
		},
		{
			type: "video",
			originalContentUrl: "https://example.test/a.mp4",
			previewImageUrl: "https://example.test/a.jpg",
		},
		{
			type: "audio",
			originalContentUrl: "https://example.test/a.m4a",
			duration: 1000,
		},
		{
			type: "location",
			title: "Tokyo",
			address: "Chiyoda, Tokyo",
			latitude: 35.68,
			longitude: 139.76,
		},
		{
			type: "template",
			altText: "menu",
			template: { type: "buttons", text: "menu" },
		},
		{
			type: "flex",
			altText: "card",
			contents: { type: "bubble" },
		},
	];
	validateLiffMessages(messages.slice(0, 5));
	validateLiffMessages(messages.slice(5));
	assertEquals(messages.length, 8);
});

Deno.test("LIFF rejects empty, excessive, and unsupported message lists", () => {
	assertThrows(() => validateLiffMessages([]), TypeError, "at least one");
	assertThrows(
		() =>
			validateLiffMessages(
				Array.from({ length: 6 }, () => ({ type: "text", text: "x" })),
			),
		RangeError,
		"maximum of 5",
	);
	assertThrows(
		() => validateLiffMessages([{ type: "file", fileName: "x" } as never]),
		TypeError,
		"unsupported",
	);
});

Deno.test("LIFF validates message fields and HTTPS media URLs", () => {
	assertThrows(
		() => validateLiffMessages([{ type: "text", text: "" }]),
		TypeError,
	);
	assertThrows(
		() =>
			validateLiffMessages([{
				type: "image",
				originalContentUrl: "http://example.test/a.jpg",
				previewImageUrl: "https://example.test/a.jpg",
			}]),
		TypeError,
		"HTTPS",
	);
	assertThrows(
		() =>
			validateLiffMessages([{
				type: "location",
				title: "Tokyo",
				address: "Tokyo",
				latitude: 91,
				longitude: 139,
			}]),
		RangeError,
		"latitude",
	);
});

Deno.test("LIFF template and Flex messages only allow URI actions", () => {
	assertThrows(
		() =>
			validateLiffMessages([{
				type: "flex",
				altText: "card",
				contents: {
					type: "bubble",
					body: {
						type: "box",
						layout: "vertical",
						action: { type: "message", text: "send" },
					},
				},
			}]),
		TypeError,
		"only URI actions",
	);
});
