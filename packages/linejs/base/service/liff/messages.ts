export interface LiffTextMessage {
	type: "text";
	text: string;
	sentBy?: { label: string; iconUrl: string; linkUrl?: string };
}

export interface LiffStickerMessage {
	type: "sticker";
	packageId: string;
	stickerId: string;
}

export interface LiffImageMessage {
	type: "image";
	originalContentUrl: string;
	previewImageUrl: string;
}

export interface LiffVideoMessage {
	type: "video";
	originalContentUrl: string;
	previewImageUrl: string;
}

export interface LiffAudioMessage {
	type: "audio";
	originalContentUrl: string;
	duration: number;
}

export interface LiffLocationMessage {
	type: "location";
	title: string;
	address: string;
	latitude: number;
	longitude: number;
}

export interface LiffFlexMessage {
	type: "flex";
	altText: string;
	contents: Record<string, unknown>;
}

export interface LiffTemplateMessage {
	type: "template";
	altText: string;
	template: Record<string, unknown>;
}

export type LiffMessage =
	| LiffTextMessage
	| LiffStickerMessage
	| LiffImageMessage
	| LiffVideoMessage
	| LiffAudioMessage
	| LiffLocationMessage
	| LiffFlexMessage
	| LiffTemplateMessage;

const TEMPLATE_TYPES = new Set([
	"buttons",
	"confirm",
	"carousel",
	"image_carousel",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

function requireString(
	message: Record<string, unknown>,
	field: string,
	index: number,
): string {
	const value = message[field];
	if (typeof value !== "string" || value.trim().length === 0) {
		throw new TypeError(
			`LIFF message ${index}: ${field} must be a non-empty string`,
		);
	}
	return value;
}

function requireHttpsUrl(
	message: Record<string, unknown>,
	field: string,
	index: number,
): void {
	const value = requireString(message, field, index);
	let url: URL;
	try {
		url = new URL(value);
	} catch {
		throw new TypeError(`LIFF message ${index}: ${field} must be an HTTPS URL`);
	}
	if (url.protocol !== "https:") {
		throw new TypeError(`LIFF message ${index}: ${field} must be an HTTPS URL`);
	}
}

function rejectProperties(
	message: Record<string, unknown>,
	properties: string[],
	index: number,
): void {
	for (const property of properties) {
		if (property in message) {
			throw new TypeError(
				`LIFF message ${index}: ${property} is not supported for ${message.type}`,
			);
		}
	}
}

function validateUriActions(value: unknown, index: number, depth = 0): void {
	if (depth > 64) {
		throw new RangeError(`LIFF message ${index}: content nesting is too deep`);
	}
	if (Array.isArray(value)) {
		for (const item of value) validateUriActions(item, index, depth + 1);
		return;
	}
	if (!isRecord(value)) return;
	if (
		isRecord(value.action) && typeof value.action.type === "string" &&
		value.action.type !== "uri"
	) {
		throw new TypeError(
			`LIFF message ${index}: only URI actions are supported in template and Flex messages`,
		);
	}
	for (const nested of Object.values(value)) {
		validateUriActions(nested, index, depth + 1);
	}
}

/** Validate LIFF send/share messages before token issuance or network access. */
export function validateLiffMessages(
	messages: readonly unknown[],
): asserts messages is readonly LiffMessage[] {
	if (messages.length === 0) {
		throw new TypeError("LIFF messages must contain at least one message");
	}
	if (messages.length > 5) {
		throw new RangeError("LIFF messages may contain a maximum of 5 messages");
	}

	for (const [index, value] of messages.entries()) {
		if (!isRecord(value) || typeof value.type !== "string") {
			throw new TypeError(
				`LIFF message ${index}: expected a typed message object`,
			);
		}
		switch (value.type) {
			case "text":
				requireString(value, "text", index);
				rejectProperties(value, ["emojis", "quoteToken"], index);
				break;
			case "sticker":
				requireString(value, "packageId", index);
				requireString(value, "stickerId", index);
				rejectProperties(value, ["quoteToken"], index);
				break;
			case "image":
			case "video":
				requireHttpsUrl(value, "originalContentUrl", index);
				requireHttpsUrl(value, "previewImageUrl", index);
				if (value.type === "video") {
					rejectProperties(value, ["trackingId"], index);
				}
				break;
			case "audio":
				requireHttpsUrl(value, "originalContentUrl", index);
				if (
					typeof value.duration !== "number" ||
					!Number.isFinite(value.duration) || value.duration <= 0
				) {
					throw new RangeError(
						`LIFF message ${index}: duration must be a positive finite number`,
					);
				}
				break;
			case "location":
				requireString(value, "title", index);
				requireString(value, "address", index);
				if (
					typeof value.latitude !== "number" ||
					!Number.isFinite(value.latitude) || value.latitude < -90 ||
					value.latitude > 90
				) throw new RangeError(`LIFF message ${index}: invalid latitude`);
				if (
					typeof value.longitude !== "number" ||
					!Number.isFinite(value.longitude) || value.longitude < -180 ||
					value.longitude > 180
				) throw new RangeError(`LIFF message ${index}: invalid longitude`);
				break;
			case "template":
				requireString(value, "altText", index);
				if (
					!isRecord(value.template) ||
					typeof value.template.type !== "string" ||
					!TEMPLATE_TYPES.has(value.template.type)
				) {
					throw new TypeError(
						`LIFF message ${index}: unsupported template type`,
					);
				}
				validateUriActions(value.template, index);
				break;
			case "flex":
				requireString(value, "altText", index);
				if (
					!isRecord(value.contents) ||
					(value.contents.type !== "bubble" &&
						value.contents.type !== "carousel")
				) {
					throw new TypeError(
						`LIFF message ${index}: contents must be a Flex bubble or carousel`,
					);
				}
				validateUriActions(value.contents, index);
				break;
			default:
				throw new TypeError(
					`LIFF message ${index}: unsupported message type ${value.type}`,
				);
		}
	}
}
