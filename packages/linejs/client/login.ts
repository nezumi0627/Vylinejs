/**
 * linejs client.
 * @module
 */

import type { FetchLike } from "../base/mod.ts";
import type { Device } from "../base/mod.ts";
import type { LoginMode } from "../base/login/identity.ts";
import { BaseClient, InternalError } from "../base/mod.ts";
import type { BaseStorage } from "../base/storage/mod.ts";
import {
	type AuthTokenInput,
	parseAuthTokenInput,
} from "../base/request/auth_token.ts";
import { Client } from "./client.ts";

export type { LoginMode } from "../base/login/identity.ts";

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
	/** Select the QR login protocol version; defaults to the device-supported version. */
	v3?: boolean;
	/** `vyline` uses the host identity; `linejs` keeps the historical QR identity. */
	loginMode?: LoginMode;
	systemName?: string;
	modelName?: string;
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
	await base.loginProcess.withQrCode({
		v3: opts.v3,
		loginMode: opts.loginMode,
		systemName: opts.systemName,
		modelName: opts.modelName,
	});
	await base.loginProcess.ready();
	return new Client(base);
};

export interface WithPasswordOptions {
	email: string;
	password: string;
	/** Random six-digit PIN by default. */
	pincode?: string;
	/** Select the password login protocol version; defaults to the device-supported version. */
	v3?: boolean;
	/** Use the legacy E2EE password handshake when v3 login is disabled. */
	e2ee?: boolean;
	/** Optional model name sent during password login. */
	modelName?: string;

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
		v3: opts.v3,
		e2ee: opts.e2ee,
		modelName: opts.modelName,
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
