/**
 * linejs client.
 * @module
 */

import type { FetchLike } from "../base/mod.ts";
import type { Device } from "../base/mod.ts";
import { BaseClient, InternalError } from "../base/mod.ts";
import type { BaseStorage } from "../base/storage/mod.ts";
import {
	type AuthTokenInput,
	parseAuthTokenInput,
} from "../base/request/auth_token.ts";
import { Client } from "./client.ts";

export interface InitOptions {
	/**
	 * version which LINE App to emulating
	 */
	version?: string;

	/**
	 * API Endpoint
	 * @default "legy.line-apps.com"
	 */
	endpoint?: string;

	/**
	 * Device
	 */
	device: Device;

	/**
	 * Storage
	 * @default MemoryStorage
	 */
	storage?: BaseStorage;

	/**
	 * Custom function to connect network.
	 * @default `globalThis.fetch`
	 */
	fetch?: FetchLike;

	/**
	 * LEGY encrypted gateway options.
	 */
	legy?: {
		encrypted?: boolean | "auto";
		endpoint?: string;
	};
}

const createBaseClient = (init: InitOptions) =>
	new BaseClient({
		fetch: init.fetch,
		device: init.device,
		version: init.version,
		endpoint: init.endpoint,
		storage: init.storage,
		legy: init.legy,
	});

export interface WithQROptions {
	onReceiveQRUrl(url: string): Promise<void> | void;
	onPincodeRequest(pin: string): void | Promise<void>;
}
export const loginWithQR = async (
	opts: WithQROptions,
	init: InitOptions,
): Promise<Client> => {
	const base = createBaseClient(init);
	base.on("qrcall", opts.onReceiveQRUrl);
	base.on("pincall", opts.onPincodeRequest);
	await base.loginProcess.withQrCode({});
	await base.loginProcess.ready();
	return new Client(base);
};

export interface WithPasswordOptions {
	email: string;
	password: string;
	/** Random six-digit PIN by default. */
	pincode?: string;

	onPincodeRequest(pin: string): void | Promise<void>;
}
export const loginWithPassword = async (
	opts: WithPasswordOptions,
	init: InitOptions,
): Promise<Client> => {
	const base = createBaseClient(init);
	base.on("pincall", opts.onPincodeRequest);
	await base.loginProcess.withPassword({
		email: opts.email,
		password: opts.password,
		pincode: opts.pincode,
	});
	await base.loginProcess.ready();
	return new Client(base);
};

export const loginWithAuthToken = async (
	authToken: AuthTokenInput,
	init: InitOptions,
): Promise<Client> => {
	const base = createBaseClient(init);
	const credential = parseAuthTokenInput(authToken);
	await base.auth.saveAuthTokenCredential(credential);
	await base.loginProcess.ready();
	return new Client(base);
};

/** Restore a session saved in the supplied storage, refreshing it when near expiry. */
export const loginWithStoredAuthToken = async (
	init: InitOptions,
): Promise<Client> => {
	const base = createBaseClient(init);
	if (!await base.auth.restoreStoredSession()) {
		throw new InternalError(
			"NoStoredAuthToken",
			"No saved LINE session found in storage",
		);
	}
	await base.loginProcess.ready();
	return new Client(base);
};
