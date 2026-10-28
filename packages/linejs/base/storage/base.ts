import type { LooseType } from "@evex/loose-types";

export interface Storage {
	Key: string;
	Value: string | number | boolean | null | Record<string | number, LooseType>;
}

/**
 * @classdesc Base Storage for LINE Client
 */
export abstract class BaseStorage {
	/**
	 * @description Set a value.
	 *
	 * @param {Storage["Key"]} key
	 * @param {Storage["Value"]} value
	 */
	public abstract set(
		key: Storage["Key"],
		value: Storage["Value"],
	): Promise<void>;

	/**
	 * Persist multiple values. Backends may override this to commit the batch
	 * atomically; the default preserves compatibility by writing each entry.
	 */
	public async setMany(
		entries: Record<Storage["Key"], Storage["Value"]>,
	): Promise<void> {
		for (const [key, value] of Object.entries(entries)) {
			await this.set(key, value as Storage["Value"]);
		}
	}

	/**
	 * @description Get a value.
	 *
	 * @param {Storage["Key"]} key
	 *
	 * @returns {Promise<Storage["Value"] | undefined>} value
	 */
	public abstract get(
		key: Storage["Key"],
	): Promise<Storage["Value"] | undefined>;

	/**
	 * @description Delete a value.
	 *
	 * @param {Storage["Key"]} key
	 */
	public abstract delete(key: Storage["Key"]): Promise<void>;

	/**
	 * @description Clear all data.
	 */
	public abstract clear(): Promise<void>;

	/**
	 * @description Migrate all data to another storage.
	 */
	public abstract migrate(storage: BaseStorage): Promise<void>;
}
