// For Auth (login, refresh, etc)

import {
	LINEStruct,
	type ParsedThrift,
	type ProtocolKey,
	Protocols,
} from "../../thrift/mod.ts";
import { Buffer } from "node:buffer";
import type * as LINETypes from "@evex/linejs-types";
import { type BaseClient, InternalError } from "../../core/mod.ts";
import type { BaseService } from "../types.ts";
import type { AuthTokenCredential } from "../../request/auth_token.ts";

export class AuthService implements BaseService {
	client: BaseClient;
	private refreshInflight: Promise<void> | null = null;
	private refreshGeneration = 0;
	private credentialGeneration = 0;
	private credentialWriteLock: Promise<void> = Promise.resolve();
	private refreshTimer?: ReturnType<typeof setTimeout>;
	private refreshScheduleGeneration = 0;
	private static readonly REFRESH_LEAD_SECONDS = 60;
	private static readonly REFRESH_RETRY_MS = 5 * 60 * 1000;
	private static readonly MAX_TIMER_DELAY_MS = 24 * 60 * 60 * 1000;
	protocolType: ProtocolKey = 4;
	requestPath = "/AS4";
	errorName = "AuthServiceError";
	constructor(client: BaseClient) {
		this.client = client;
		this.client.on?.("end", () => this.cancelScheduledRefresh());
	}

	/**
	 * @description Try to refresh token.
	 */
	public async tryRefreshToken(): Promise<void> {
		const generation = this.refreshGeneration;
		if (this.refreshInflight) {
			await this.refreshInflight;
			if (generation !== this.refreshGeneration) return;
		}
		return this.runRefresh(async () => {
			const refreshToken = await this.client.storage.get("refreshToken");
			if (typeof refreshToken !== "string" || !refreshToken) {
				throw new InternalError("RefreshError", "refreshToken not found");
			}
			await this.refreshWithToken(refreshToken);
		});
	}

	/** Refresh a saved credential shortly before its server supplied deadline. */
	public refreshIfNeeded(): Promise<void> {
		return this.runRefresh(async () => {
			const [refreshToken, rawExpire] = await Promise.all([
				this.client.storage.get("refreshToken"),
				this.client.storage.get("expire"),
			]);
			if (typeof refreshToken !== "string" || !refreshToken) return;
			const expire = typeof rawExpire === "number" && Number.isFinite(rawExpire)
				? rawExpire
				: Number.NaN;
			if (
				Number.isFinite(expire) &&
				expire <= Math.floor(Date.now() / 1000) +
						AuthService.REFRESH_LEAD_SECONDS
			) {
				await this.refreshWithToken(refreshToken);
			}
		});
	}

	private runRefresh(operation: () => Promise<void>): Promise<void> {
		if (this.refreshInflight) return this.refreshInflight;
		const inflight = Promise.resolve().then(operation).finally(() => {
			if (this.refreshInflight === inflight) this.refreshInflight = null;
		});
		this.refreshInflight = inflight;
		return inflight;
	}

	private async refreshWithToken(refreshToken: string): Promise<void> {
		const credentialGeneration = this.credentialGeneration;
		const result = await this.refresh({ request: { refreshToken } });
		if (!result.accessToken) {
			throw new InternalError(
				"RefreshError",
				"refresh response has no access token",
			);
		}
		const expire = Number(result.tokenIssueTimeEpochSec) +
			Number(result.durationUntilRefreshInSec);
		await this.withCredentialWriteLock(async () => {
			this.assertCredentialGeneration(credentialGeneration);
			if (result.refreshToken) {
				await this.client.storage.set("refreshToken", result.refreshToken);
				this.assertCredentialGeneration(credentialGeneration);
			}
			if (Number.isFinite(expire)) {
				await this.client.storage.set("expire", expire);
			} else await this.client.storage.delete("expire");
			this.assertCredentialGeneration(credentialGeneration);
			await this.client.storage.set("accessToken", result.accessToken);
			this.assertCredentialGeneration(credentialGeneration);
			this.client.authToken = result.accessToken;
			this.scheduleRefresh();
			this.client.emit("update:authtoken", result.accessToken);
			this.refreshGeneration++;
		});
	}

	public async setAccessToken(accessToken: string): Promise<void> {
		if (!accessToken) {
			throw new InternalError("InvalidToken", "access token is empty");
		}
		this.invalidateRefreshWork();
		await this.withCredentialWriteLock(() =>
			this.writeAccessToken(accessToken)
		);
	}

	private async writeAccessToken(accessToken: string): Promise<void> {
		await this.client.storage.set("accessToken", accessToken);
		this.client.authToken = accessToken;
		this.scheduleRefresh();
		this.client.emit("update:authtoken", accessToken);
	}

	public async saveAuthTokenCredential(
		credential: AuthTokenCredential,
	): Promise<void> {
		if (!credential.accessToken) {
			throw new InternalError("InvalidToken", "access token is empty");
		}
		this.invalidateRefreshWork();
		await this.withCredentialWriteLock(async () => {
			if (credential.refreshToken) {
				await this.client.storage.set("refreshToken", credential.refreshToken);
			} else {
				await this.client.storage.delete("refreshToken");
			}
			if (
				credential.expire !== undefined && Number.isFinite(credential.expire)
			) {
				await this.client.storage.set("expire", credential.expire);
			} else {
				await this.client.storage.delete("expire");
			}
			await this.writeAccessToken(credential.accessToken);
		});
	}

	/** Persist a new login's refresh credentials and invalidate older refresh work. */
	public async saveRefreshCredential(
		refreshToken: string,
		expire?: number,
	): Promise<void> {
		if (!refreshToken) {
			throw new InternalError("InvalidToken", "refresh token is empty");
		}
		this.invalidateRefreshWork();
		await this.withCredentialWriteLock(async () => {
			await this.client.storage.set("refreshToken", refreshToken);
			if (expire !== undefined && Number.isFinite(expire)) {
				await this.client.storage.set("expire", expire);
			} else {
				await this.client.storage.delete("expire");
			}
		});
		this.scheduleRefresh();
	}

	public async clearRefreshState(): Promise<void> {
		this.invalidateRefreshWork();
		await this.withCredentialWriteLock(async () => {
			await this.client.storage.delete("refreshToken");
			await this.client.storage.delete("expire");
		});
	}

	/** Remove the complete persisted session after the server invalidates it. */
	public async clearStoredSession(): Promise<void> {
		this.invalidateRefreshWork();
		delete this.client.authToken;
		await this.withCredentialWriteLock(async () => {
			await this.client.storage.delete("accessToken");
			await this.client.storage.delete("refreshToken");
			await this.client.storage.delete("expire");
		});
	}

	private async withCredentialWriteLock<T>(
		operation: () => Promise<T>,
	): Promise<T> {
		let release!: () => void;
		const previous = this.credentialWriteLock;
		this.credentialWriteLock = new Promise<void>((resolve) =>
			release = resolve
		);
		await previous;
		try {
			return await operation();
		} finally {
			release();
		}
	}

	private assertCredentialGeneration(generation: number): void {
		if (generation !== this.credentialGeneration) {
			throw new InternalError(
				"SessionChanged",
				"credentials changed while refreshing",
			);
		}
	}

	/** Restore saved credentials and refresh before expiry when possible. */
	public async restoreStoredSession(): Promise<boolean> {
		const [accessToken, refreshToken] = await Promise.all([
			this.client.storage.get("accessToken"),
			this.client.storage.get("refreshToken"),
		]);
		if (typeof accessToken === "string" && accessToken) {
			this.client.authToken = accessToken;
		}
		if (typeof refreshToken === "string" && refreshToken) {
			if (!this.client.authToken) await this.tryRefreshToken();
			else await this.refreshIfNeeded();
		}
		this.scheduleRefresh();
		return Boolean(this.client.authToken);
	}

	private cancelScheduledRefresh(): void {
		this.refreshScheduleGeneration++;
		if (this.refreshTimer !== undefined) clearTimeout(this.refreshTimer);
		this.refreshTimer = undefined;
	}

	private invalidateRefreshWork(): void {
		this.credentialGeneration++;
		this.refreshInflight = null;
		this.cancelScheduledRefresh();
	}

	private scheduleRefresh(retryDelayMs = 0): void {
		this.cancelScheduledRefresh();
		if (this.client.disabled || !this.client.authToken) return;
		const generation = this.refreshScheduleGeneration;
		const credentialGeneration = this.credentialGeneration;
		void Promise.all([
			this.client.storage.get("refreshToken"),
			this.client.storage.get("expire"),
		]).then(([refreshToken, rawExpire]) => {
			if (
				generation !== this.refreshScheduleGeneration ||
				credentialGeneration !== this.credentialGeneration ||
				this.client.disabled || !this.client.authToken ||
				typeof refreshToken !== "string" || !refreshToken ||
				typeof rawExpire !== "number" || !Number.isFinite(rawExpire)
			) return;
			const secondsUntilRefresh = rawExpire - Math.floor(Date.now() / 1000) -
				AuthService.REFRESH_LEAD_SECONDS;
			const untilDeadlineMs = Math.max(0, secondsUntilRefresh * 1000);
			const delay = retryDelayMs > 0
				? retryDelayMs
				: Math.min(untilDeadlineMs, AuthService.MAX_TIMER_DELAY_MS);
			const timer = setTimeout(() => {
				this.refreshTimer = undefined;
				if (credentialGeneration !== this.credentialGeneration) return;
				void this.refreshIfNeeded().then(
					() => this.scheduleRefresh(),
					() => {
						if (credentialGeneration !== this.credentialGeneration) return;
						try {
							this.client.log("AuthRefreshRetry", {
								retryInMs: AuthService.REFRESH_RETRY_MS,
							});
						} catch { /* logging must not stop refresh retry */ }
						this.scheduleRefresh(AuthService.REFRESH_RETRY_MS);
					},
				);
			}, delay);
			this.refreshTimer = timer;
			const deno = (globalThis as typeof globalThis & {
				Deno?: { unrefTimer?: (id: number) => void };
			}).Deno;
			if (deno?.unrefTimer) deno.unrefTimer(timer as unknown as number);
			else (timer as unknown as { unref?: () => void }).unref?.();
		}).catch((error) => {
			try {
				this.client.log("AuthRefreshScheduleError", {
					name: error instanceof Error ? error.name : "UnknownError",
				});
			} catch { /* logging must not escape the auth service */ }
			if (
				generation === this.refreshScheduleGeneration &&
				credentialGeneration === this.credentialGeneration
			) {
				this.refreshTimer = setTimeout(() => {
					this.refreshTimer = undefined;
					if (credentialGeneration === this.credentialGeneration) {
						this.scheduleRefresh();
					}
				}, AuthService.REFRESH_RETRY_MS);
			}
		});
	}

	async refresh(
		...param: Parameters<typeof LINEStruct.refresh_args>
	): Promise<LINETypes.refresh_result["success"]> {
		return await this.client.request.request(
			LINEStruct.refresh_args(...param),
			"refresh",
			this.protocolType,
			true,
			"/EXT/auth/tokenrefresh/v1",
		);
	}

	async reportRefreshedAccessToken(
		...param: Parameters<typeof LINEStruct.reportRefreshedAccessToken_args>
	): Promise<LINETypes.reportRefreshedAccessToken_result["success"]> {
		return await this.client.request.request(
			LINEStruct.reportRefreshedAccessToken_args(...param),
			"reportRefreshedAccessToken",
			this.protocolType,
			true,
			this.requestPath,
		);
	}
	//
	async connectEapAccount(
		...param: Parameters<typeof LINEStruct.connectEapAccount_args>
	): Promise<LINETypes.connectEapAccount_result["success"]> {
		return await this.client.request.request(
			LINEStruct.connectEapAccount_args(...param),
			"connectEapAccount",
			this.protocolType,
			true,
			this.requestPath,
		);
	}

	async disconnectEapAccount(
		...param: Parameters<typeof LINEStruct.disconnectEapAccount_args>
	): Promise<LINETypes.disconnectEapAccount_result["success"]> {
		return await this.client.request.request(
			LINEStruct.disconnectEapAccount_args(...param),
			"disconnectEapAccount",
			this.protocolType,
			true,
			this.requestPath,
		);
	}

	async openSession(
		...param: Parameters<typeof LINEStruct.openSession_args>
	): Promise<LINETypes.openSession_result["success"]> {
		return await this.client.request.request(
			LINEStruct.openSession_args(...param),
			"openSession",
			this.protocolType,
			true,
			this.requestPath,
		);
	}

	async verifyEapLogin(
		...param: Parameters<typeof LINEStruct.verifyEapLogin_args>
	): Promise<LINETypes.verifyEapLogin_result["success"]> {
		return await this.client.request.request(
			LINEStruct.verifyEapLogin_args(...param),
			"verifyEapLogin",
			this.protocolType,
			true,
			this.requestPath,
		);
	}
	//
	async updatePassword(
		...param: Parameters<typeof LINEStruct.updatePassword_args>
	): Promise<LINETypes.updatePassword_result["success"]> {
		return await this.client.request.request(
			LINEStruct.updatePassword_args(...param),
			"updatePassword",
			this.protocolType,
			true,
			this.requestPath,
		);
	}

	async establishE2EESession(
		...param: Parameters<typeof LINEStruct.establishE2EESession_args>
	): Promise<LINETypes.establishE2EESession_result["success"]> {
		return await this.client.request.request(
			LINEStruct.establishE2EESession_args(...param),
			"establishE2EESession",
			this.protocolType,
			true,
			this.requestPath,
		);
	}

	async issueTokenForAccountMigrationSettings(
		...param: Parameters<
			typeof LINEStruct.issueTokenForAccountMigrationSettings_args
		>
	): Promise<
		LINETypes.issueTokenForAccountMigrationSettings_result["success"]
	> {
		return await this.client.request.request(
			LINEStruct.issueTokenForAccountMigrationSettings_args(...param),
			"issueTokenForAccountMigrationSettings",
			this.protocolType,
			true,
			this.requestPath,
		);
	}

	async openAuthSession(
		...param: Parameters<typeof LINEStruct.openAuthSession_args>
	): Promise<LINETypes.openAuthSession_result["success"]> {
		return await this.client.request.request(
			LINEStruct.openAuthSession_args(...param),
			"openAuthSession",
			this.protocolType,
			true,
			this.requestPath,
		);
	}

	async getAuthRSAKey(
		...param: Parameters<typeof LINEStruct.getAuthRSAKey_args>
	): Promise<LINETypes.getAuthRSAKey_result["success"]> {
		return await this.client.request.request(
			LINEStruct.getAuthRSAKey_args(...param),
			"getAuthRSAKey",
			this.protocolType,
			true,
			this.requestPath,
		);
	}

	async setIdentifier(
		...param: Parameters<typeof LINEStruct.setIdentifier_args>
	): Promise<LINETypes.setIdentifier_result["success"]> {
		return await this.client.request.request(
			LINEStruct.setIdentifier_args(...param),
			"setIdentifier",
			this.protocolType,
			true,
			this.requestPath,
		);
	}

	async updateIdentifier(
		...param: Parameters<typeof LINEStruct.updateIdentifier_args>
	): Promise<LINETypes.updateIdentifier_result["success"]> {
		return await this.client.request.request(
			LINEStruct.updateIdentifier_args(...param),
			"updateIdentifier",
			this.protocolType,
			true,
			this.requestPath,
		);
	}

	async resendIdentifierConfirmation(
		...param: Parameters<
			typeof LINEStruct.resendIdentifierConfirmation_args
		>
	): Promise<LINETypes.resendIdentifierConfirmation_result["success"]> {
		return await this.client.request.request(
			LINEStruct.resendIdentifierConfirmation_args(...param),
			"resendIdentifierConfirmation",
			this.protocolType,
			true,
			this.requestPath,
		);
	}

	async confirmIdentifier(
		...param: Parameters<typeof LINEStruct.confirmIdentifier_args>
	): Promise<LINETypes.confirmIdentifier_result["success"]> {
		return await this.client.request.request(
			LINEStruct.confirmIdentifier_args(...param),
			"confirmIdentifier",
			this.protocolType,
			true,
			this.requestPath,
		);
	}

	async removeIdentifier(
		...param: Parameters<typeof LINEStruct.removeIdentifier_args>
	): Promise<LINETypes.removeIdentifier_result["success"]> {
		return await this.client.request.request(
			LINEStruct.removeIdentifier_args(...param),
			"removeIdentifier",
			this.protocolType,
			true,
			this.requestPath,
		);
	}

	async issueV3TokenForPrimary(
		...param: Parameters<typeof LINEStruct.issueV3TokenForPrimary_args>
	): Promise<LINETypes.issueV3TokenForPrimary_result["success"]> {
		return await this.client.request.request(
			LINEStruct.issueV3TokenForPrimary_args(...param),
			"issueV3TokenForPrimary",
			this.protocolType,
			true,
			this.requestPath,
		);
	}

	async logoutZ(..._param: unknown[]): Promise<unknown> {
		const payload = Buffer.from([
			0x82,
			0x21,
			0x00,
			0x07,
			0x6C,
			0x6F,
			0x67,
			0x6F,
			0x75,
			0x74,
			0x5A,
			0x00,
		]);
		const reqClient = this.client.request;
		const path = "/RS4";
		let result: unknown = true;
		for (let attempt = 0; attempt < 2; attempt++) {
			const response = await this.client.fetch(
				`https://${reqClient.endpoint}${path}`,
				{
					method: "POST",
					headers: reqClient.getHeader("POST"),
					body: payload,
				},
			);
			const nextToken = response.headers.get("x-line-next-access");
			if (nextToken) await this.setAccessToken(nextToken);
			const parsedBody = new Uint8Array(await response.arrayBuffer());
			let res: ParsedThrift;
			try {
				res = this.client.thrift.readThrift(
					parsedBody,
					Protocols[this.protocolType],
				);
			} catch {
				throw new InternalError(
					"RequestError",
					`Invalid response buffer for logoutZ: status=${response.status} responseBytes=${parsedBody.byteLength}`,
				);
			}
			this.client.thrift.rename_data(res, false);
			if (res.data.e?.code === "MUST_REFRESH_V3_TOKEN" && attempt === 0) {
				const refreshToken = await this.client.storage.get("refreshToken");
				if (typeof refreshToken === "string" && refreshToken) {
					await this.tryRefreshToken();
					continue;
				}
			}
			if (res.data.e) {
				throw new InternalError(
					"RequestError",
					`logoutZ(${path}) -> ` + JSON.stringify(res.data.e),
					res.data.e,
				);
			}
			result = typeof res.data.success !== "undefined"
				? res.data.success
				: true;
			break;
		}
		await this.client.storage.delete("accessToken");
		await this.clearRefreshState();
		const base = this.client;
		if (base) {
			base.disabled = true;
			try {
				base.push?.opStream?.close?.();
			} catch { /* best-effort push shutdown */ }
			try {
				base.push?.sqStream?.close?.();
			} catch { /* best-effort push shutdown */ }
			try {
				if (Array.isArray(base.push?.conns)) {
					for (const c of base.push.conns) {
						try {
							c?.close?.();
						} catch { /* best-effort connection shutdown */ }
					}
				}
			} catch { /* best-effort connection shutdown */ }
			try {
				if (base.profile) base.emit?.("end", base.profile);
			} catch { /* logout is already complete */ }
			try {
				delete base.authToken;
			} catch { /* logout is already complete */ }
		}
		try {
			this.client = undefined as unknown as BaseClient;
		} catch { /* allow garbage collection after logout */ }
		return result;
	}
}
