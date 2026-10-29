import type { Client } from "../mod.ts";

const DISCONTINUED_MESSAGE =
	"LINE VOOM ended on 2026-09-30 and is no longer available. The Vylinejs VOOM APIs are deprecated and will be removed in a future major version.";

function discontinuedError(): Error {
	return new Error(DISCONTINUED_MESSAGE);
}

/** @deprecated LINE VOOM ended on 2026-09-30. Retained temporarily for source compatibility. */
export const VoomChannelId = {
	TIMELINE: "1341209950",
	HOME: "1341209850",
	HOME26: "2007835442",
	NOTE: "1655599932",
	SQUARE_NOTE: "1657618623",
	ALBUM: "1375220249",
} as const;

/** @deprecated LINE VOOM ended on 2026-09-30. */
export const VoomRoutingPrefix = {
	MYHOME: "/mh",
	MYHOME_RENEWAL: "/hm",
	TIMELINE: "/tl",
	TIMELINE_GATEWAY: "/ext/timeline/tlgw",
	NOTE: "/ext/note/nt",
	HOMEAPI: "/ma",
	SQUARE_NOTE: "/sn",
	ALBUM: "/ext/album",
	STORY: "/st",
	SOCIAL_NOTIFICATION: "/eg",
	TRANSLATION: "/ds",
} as const;

/** @deprecated LINE VOOM ended on 2026-09-30. */
export type VoomRouting = keyof typeof VoomRoutingPrefix;

/** @deprecated LINE VOOM ended on 2026-09-30. */
export interface VoomRestOptions {
	path: string;
	routing?: VoomRouting;
	method?: "GET" | "POST" | "PUT" | "DELETE";
	body?: unknown;
	channelToken?: string;
	extraHeaders?: Record<string, string>;
	host?: string;
}

/** @deprecated LINE VOOM ended on 2026-09-30. */
export interface VoomRestResponse<T = unknown> {
	code: number;
	message?: string;
	result: T | null;
}

/**
 * @deprecated LINE VOOM ended on 2026-09-30. This compatibility function now
 * fails immediately and does not make a network request.
 */
export function voomRest<T = unknown>(
	_client: Client,
	_opts: VoomRestOptions,
): Promise<VoomRestResponse<T>> {
	return Promise.reject(discontinuedError());
}

/**
 * @deprecated LINE VOOM ended on 2026-09-30. This compatibility function now
 * fails immediately and does not issue a channel token.
 */
export function getChannelToken(
	_client: Client,
	_channelId: string,
): Promise<string> {
	return Promise.reject(discontinuedError());
}

/** @deprecated LINE VOOM ended on 2026-09-30. */
export const VoomEndpoints = {
	feed: "/api/v57/post/list.json",
	createPost: "/api/v57/post/create.json",
	updatePost: "/api/v57/post/update.json",
	deletePost: "/api/v57/post/delete.json",
	getPost: "/api/v57/post/get.json",
	sharePost: "/api/v57/post/share.json",
	sendPostToTalk: "/api/v57/post/sendPostToTalk.json",
	getShareLink: "/api/v57/post/getShareLink.json",
	reportPost: "/api/v57/post/report.json",
	createComment: "/api/v57/comment/create.json",
	deleteComment: "/api/v57/comment/delete.json",
	getComment: "/api/v57/comment/get.json",
	listComments: "/api/v57/comment/getList.json",
	reportComment: "/api/v57/comment/report.json",
	createLike: "/api/v57/like/create.json",
	cancelLike: "/api/v57/like/cancel.json",
	getLike: "/api/v57/like/get.json",
	listLikes: "/api/v57/like/getList.json",
	hashtagPosts: "/api/v57/hashtag/posts.json",
	hashtagSearch: "/api/v57/hashtag/search.json",
	hashtagSuggestPopular: "/api/v57/hashtag/suggest/popular.json",
	groupHomeInit: "/api/v57/grouphome/init.json",
	timelineStatus: "/api/v57/timeline/tab/status.json",
	timelineContents: "/api/v57/timeline/tab/contents.json",
	homeProfile: "/api/v1/home/profile.json",
	homeCover: "/api/v1/home/cover.json",
} as const;

/** @deprecated LINE VOOM ended on 2026-09-30. */
export interface VoomClient {
	getToken(channel: keyof typeof VoomChannelId): Promise<string>;
	call<T = unknown>(
		channel: keyof typeof VoomChannelId,
		opts: Omit<VoomRestOptions, "channelToken">,
	): Promise<VoomRestResponse<T>>;
	feed(opts?: {
		postLimit?: number;
		followingMaxPage?: number;
	}): Promise<VoomRestResponse>;
	timelineStatus(): Promise<VoomRestResponse>;
}

class ClientVoom implements VoomClient {
	constructor(_client: Client) {}

	getToken(_channel: keyof typeof VoomChannelId): Promise<string> {
		return Promise.reject(discontinuedError());
	}

	call<T = unknown>(
		_channel: keyof typeof VoomChannelId,
		_opts: Omit<VoomRestOptions, "channelToken">,
	): Promise<VoomRestResponse<T>> {
		return Promise.reject(discontinuedError());
	}

	feed(_opts?: {
		postLimit?: number;
		followingMaxPage?: number;
	}): Promise<VoomRestResponse> {
		return Promise.reject(discontinuedError());
	}

	timelineStatus(): Promise<VoomRestResponse> {
		return Promise.reject(discontinuedError());
	}
}

/** @deprecated LINE VOOM ended on 2026-09-30. */
export function createVoomClient(client: Client): VoomClient {
	return new ClientVoom(client);
}
