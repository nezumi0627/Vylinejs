// High-level LIFF adapter on top of base/service/liff/mod.ts.
import type { Client } from "../mod.ts";
import type {
	LiffAudioMessage,
	LiffFlexMessage,
	LiffImageMessage,
	LiffLocationMessage,
	LiffMessage,
	LiffStickerMessage,
	LiffTextMessage,
	LiffVideoMessage,
} from "../../base/service/liff/messages.ts";
export type {
	LiffAudioMessage,
	LiffFlexMessage,
	LiffImageMessage,
	LiffLocationMessage,
	LiffMessage,
	LiffStickerMessage,
	LiffTemplateMessage,
	LiffTextMessage,
	LiffVideoMessage,
} from "../../base/service/liff/messages.ts";

export function text(
	body: string,
	sentBy?: LiffTextMessage["sentBy"],
): LiffTextMessage {
	return sentBy
		? { type: "text", text: body, sentBy }
		: { type: "text", text: body };
}

export function sticker(
	packageId: string,
	stickerId: string,
): LiffStickerMessage {
	return { type: "sticker", packageId, stickerId };
}

export function image(
	originalContentUrl: string,
	previewImageUrl: string = originalContentUrl,
): LiffImageMessage {
	return { type: "image", originalContentUrl, previewImageUrl };
}

export function video(
	originalContentUrl: string,
	previewImageUrl: string,
): LiffVideoMessage {
	return { type: "video", originalContentUrl, previewImageUrl };
}

export function audio(
	originalContentUrl: string,
	duration: number,
): LiffAudioMessage {
	return { type: "audio", originalContentUrl, duration };
}

export function location(
	title: string,
	address: string,
	latitude: number,
	longitude: number,
): LiffLocationMessage {
	return { type: "location", title, address, latitude, longitude };
}

export function flex(
	altText: string,
	contents: Record<string, unknown>,
): LiffFlexMessage {
	return { type: "flex", altText, contents };
}

export interface LiffClient {
	readonly defaultLiffId: string;
	setDefaultLiffId(liffId: string): void;
	getToken(
		opts: { chatMid?: string; liffId?: string; lang?: string },
	): Promise<string>;
	issueView(opts: {
		chatMid?: string;
		liffId?: string;
		lang?: string;
	}): Promise<import("vylinejs-types").LiffViewResponse>;
	issueSubView(
		...args: Parameters<
			import("../../base/service/liff/mod.ts").LiffService["issueSubLiffView"]
		>
	): ReturnType<
		import("../../base/service/liff/mod.ts").LiffService["issueSubLiffView"]
	>;
	shareMessages(
		to: string,
		messages: LiffMessage[],
		opts?: LiffSendOptions,
	): Promise<unknown>;
	shareMessage(
		to: string,
		message: LiffMessage,
		opts?: LiffSendOptions,
	): Promise<unknown>;
	sendLiff(
		options: { to: string; messages: LiffMessage[] } & LiffSendOptions,
	): Promise<unknown>;
	readonly service: import("../../base/service/liff/mod.ts").LiffService;
}

export interface LiffSendOptions {
	liffId?: string;
	forceIssue?: boolean;
	tryConsent?: boolean;
}

class ClientLiff implements LiffClient {
	#client: Client;
	#liffId: string;
	constructor(client: Client) {
		this.#client = client;
		this.#liffId = client.base.liff.liffId;
	}
	get defaultLiffId(): string {
		return this.#liffId;
	}
	setDefaultLiffId(liffId: string): void {
		this.#liffId = liffId;
		this.#client.base.liff.liffId = liffId;
	}
	get service() {
		return this.#client.base.liff;
	}
	async getToken(opts: { chatMid?: string; liffId?: string; lang?: string }) {
		return await this.#client.base.liff.getLiffToken({
			chatMid: opts.chatMid,
			liffId: opts.liffId ?? this.#liffId,
			lang: opts.lang,
		});
	}
	issueView(opts: { chatMid?: string; liffId?: string; lang?: string }) {
		return this.#client.base.liff.issueLiffView({
			chatMid: opts.chatMid,
			liffId: opts.liffId ?? this.#liffId,
			lang: opts.lang,
		});
	}
	issueSubView(
		...args: Parameters<typeof this.service.issueSubLiffView>
	): ReturnType<typeof this.service.issueSubLiffView> {
		return this.service.issueSubLiffView(...args);
	}
	async shareMessages(
		to: string,
		messages: LiffMessage[],
		opts: LiffSendOptions = {},
	) {
		return await this.sendLiff({ to, messages, ...opts });
	}
	sendLiff(
		options: { to: string; messages: LiffMessage[] } & LiffSendOptions,
	) {
		return this.#client.base.liff.sendLiff({
			...options,
			liffId: options.liffId ?? this.#liffId,
		});
	}
	shareMessage(
		to: string,
		message: LiffMessage,
		opts?: LiffSendOptions,
	) {
		return this.shareMessages(to, [message], opts);
	}
}

export function createLiffClient(client: Client): LiffClient {
	return new ClientLiff(client);
}
