import { Buffer } from "node:buffer";
import { BaseStorage, persistMany, type Storage } from "./base.ts";

const ENVELOPE_PREFIX = "linejs:encrypted:v1:";
const IV_BYTES = 12;

/**
 * AES-GCM wrapper for a BaseStorage. Keep the non-exportable key in an OS
 * credential store or another secret manager; this class stores ciphertext
 * only and deliberately does not persist or derive the encryption key.
 */
export class EncryptedStorage extends BaseStorage {
	constructor(
		private readonly backing: BaseStorage,
		private readonly key: CryptoKey,
	) {
		super();
		if (key.algorithm.name !== "AES-GCM") {
			throw new TypeError("EncryptedStorage requires an AES-GCM key");
		}
		if (key.extractable) {
			throw new TypeError(
				"EncryptedStorage requires a non-exportable AES-GCM key",
			);
		}
		if (!key.usages.includes("encrypt") || !key.usages.includes("decrypt")) {
			throw new TypeError("AES-GCM key must allow encrypt and decrypt");
		}
	}

	public async set(
		key: Storage["Key"],
		value: Storage["Value"],
	): Promise<void> {
		const plaintext = new TextEncoder().encode(JSON.stringify(value));
		const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
		const ciphertext = await crypto.subtle.encrypt(
			{
				name: "AES-GCM",
				iv,
				additionalData: new TextEncoder().encode(key),
			},
			this.key,
			plaintext,
		);
		const packed = Buffer.concat([Buffer.from(iv), Buffer.from(ciphertext)]);
		await this.backing.set(
			key,
			`${ENVELOPE_PREFIX}${packed.toString("base64")}`,
		);
	}

	public override async setMany(
		entries: Record<Storage["Key"], Storage["Value"]>,
	): Promise<void> {
		const encrypted = Object.fromEntries(
			await Promise.all(
				Object.entries(entries).map(async ([key, value]) => {
					const plaintext = new TextEncoder().encode(JSON.stringify(value));
					const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
					const ciphertext = await crypto.subtle.encrypt(
						{
							name: "AES-GCM",
							iv,
							additionalData: new TextEncoder().encode(key),
						},
						this.key,
						plaintext,
					);
					const packed = Buffer.concat([
						Buffer.from(iv),
						Buffer.from(ciphertext),
					]);
					return [
						key,
						`${ENVELOPE_PREFIX}${packed.toString("base64")}`,
					] as const;
				}),
			),
		);
		await persistMany(this.backing, encrypted);
	}

	public async get(
		key: Storage["Key"],
	): Promise<Storage["Value"] | undefined> {
		const stored = await this.backing.get(key);
		if (stored === undefined) return undefined;
		if (typeof stored !== "string" || !stored.startsWith(ENVELOPE_PREFIX)) {
			throw new Error(`EncryptedStorage: invalid encrypted value for ${key}`);
		}
		try {
			const packed = Buffer.from(
				stored.slice(ENVELOPE_PREFIX.length),
				"base64",
			);
			if (packed.byteLength < IV_BYTES + 16) throw new Error("short envelope");
			const iv = packed.subarray(0, IV_BYTES);
			const ciphertext = packed.subarray(IV_BYTES);
			const plaintext = await crypto.subtle.decrypt(
				{
					name: "AES-GCM",
					iv,
					additionalData: new TextEncoder().encode(key),
				},
				this.key,
				ciphertext,
			);
			return JSON.parse(new TextDecoder().decode(plaintext));
		} catch {
			throw new Error(
				`EncryptedStorage: could not decrypt value for ${key}`,
			);
		}
	}

	public delete(key: Storage["Key"]): Promise<void> {
		return this.backing.delete(key);
	}

	public clear(): Promise<void> {
		return this.backing.clear();
	}

	/** Enumerate and decrypt the backing store when it supports getAll(). */
	public async getAll(): Promise<Record<Storage["Key"], Storage["Value"]>> {
		const enumerable = this.backing as BaseStorage & {
			getAll?: () =>
				| Record<Storage["Key"], Storage["Value"]>
				| Promise<Record<Storage["Key"], Storage["Value"]>>;
		};
		if (!enumerable.getAll) {
			throw new Error(
				"EncryptedStorage: backing storage does not support getAll()",
			);
		}
		const stored = await enumerable.getAll();
		const values: Record<Storage["Key"], Storage["Value"]> = {};
		for (const key of Object.keys(stored)) {
			const value = await this.get(key);
			if (value !== undefined) values[key] = value;
		}
		return values;
	}

	public async migrate(storage: BaseStorage): Promise<void> {
		const values = await this.getAll();
		await persistMany(storage, values);
	}
}
