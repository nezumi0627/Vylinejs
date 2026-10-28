import * as fs from "node:fs";
import * as fsp from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import process from "node:process";
import { BaseStorage, type Storage } from "./base.ts";

interface FileState {
	data: Record<Storage["Key"], Storage["Value"]>;
	writeLock: Promise<void>;
	mtimeMs: number;
	size: number;
	instances: number;
}

const states = new Map<string, FileState>();

/**
 * @classdesc File Storage for LINE Client. Values are cached in-process and
 * writes atomically replace the JSON file. External edits are picked up by
 * checking the file's modification time and size before reads and writes.
 */
export class FileStorage extends BaseStorage {
	private readonly path: string;
	private readonly state: FileState;

	constructor(path: string, extendData?: string) {
		super();
		this.path = resolve(path);
		const cached = states.get(this.path);
		if (cached) {
			this.state = cached;
			this.retainState();
			if (extendData) {
				const data = parseData(extendData);
				fs.writeFileSync(this.path, extendData, {
					encoding: "utf-8",
					mode: 0o600,
				});
				this.state.data = data;
				this.updateMetadataSync();
			}
			restrictPermissionsSync(this.path);
			return;
		}

		let initial: string;
		try {
			initial = fs.readFileSync(this.path, "utf-8");
			if (extendData) {
				initial = extendData;
				fs.writeFileSync(this.path, initial, {
					encoding: "utf-8",
					mode: 0o600,
				});
			}
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
			initial = extendData || "{}";
			fs.writeFileSync(this.path, initial, {
				encoding: "utf-8",
				mode: 0o600,
			});
		}
		restrictPermissionsSync(this.path);
		const stat = fs.statSync(this.path);
		this.state = {
			data: parseData(initial || "{}"),
			writeLock: Promise.resolve(),
			mtimeMs: stat.mtimeMs,
			size: stat.size,
			instances: 0,
		};
		states.set(this.path, this.state);
		this.retainState();
	}

	private retainState(): void {
		this.state.instances++;
		stateFinalizer.register(this, { path: this.path, state: this.state }, this);
	}

	private async withLock<T>(fn: () => Promise<T>): Promise<T> {
		let resolveNext!: () => void;
		const next = new Promise<void>((resolve) => resolveNext = resolve);
		const previous = this.state.writeLock;
		this.state.writeLock = next;
		await previous;
		try {
			return await fn();
		} finally {
			resolveNext();
		}
	}

	private async refreshLocked(): Promise<void> {
		const stat = await fsp.stat(this.path);
		if (stat.mtimeMs === this.state.mtimeMs && stat.size === this.state.size) {
			return;
		}
		const content = await fsp.readFile(this.path, "utf-8");
		this.state.data = parseData(content || "{}");
		this.state.mtimeMs = stat.mtimeMs;
		this.state.size = stat.size;
	}

	private updateMetadataSync(): void {
		const stat = fs.statSync(this.path);
		this.state.mtimeMs = stat.mtimeMs;
		this.state.size = stat.size;
	}

	private async persist(
		data: Record<Storage["Key"], Storage["Value"]>,
	): Promise<void> {
		const serialized = JSON.stringify(data);
		const tempPath = `${this.path}.${randomUUID()}.tmp`;
		try {
			await fsp.writeFile(tempPath, serialized, {
				encoding: "utf-8",
				mode: 0o600,
			});
			await fsp.rename(tempPath, this.path);
			const stat = await fsp.stat(this.path);
			this.state.mtimeMs = stat.mtimeMs;
			this.state.size = stat.size;
		} catch (error) {
			try {
				await fsp.unlink(tempPath);
			} catch { /* temp file may already be renamed or absent */ }
			throw error;
		}
	}

	public async set(
		key: Storage["Key"],
		value: Storage["Value"],
	): Promise<void> {
		await this.withLock(async () => {
			await this.refreshLocked();
			const normalized = JSON.parse(JSON.stringify(value)) as Storage["Value"];
			const existed = Object.hasOwn(this.state.data, key);
			const previous = this.state.data[key];
			this.state.data[key] = normalized;
			try {
				await this.persist(this.state.data);
			} catch (error) {
				if (existed) this.state.data[key] = previous;
				else delete this.state.data[key];
				throw error;
			}
		});
	}

	public async get(key: Storage["Key"]): Promise<Storage["Value"] | undefined> {
		await this.withLock(async () => await this.refreshLocked());
		const value = this.state.data[key];
		return value === undefined ? undefined : structuredClone(value);
	}

	public async delete(key: Storage["Key"]): Promise<void> {
		await this.withLock(async () => {
			await this.refreshLocked();
			const existed = Object.hasOwn(this.state.data, key);
			const previous = this.state.data[key];
			delete this.state.data[key];
			try {
				await this.persist(this.state.data);
			} catch (error) {
				if (existed) this.state.data[key] = previous;
				throw error;
			}
		});
	}

	public async clear(): Promise<void> {
		await this.withLock(async () => {
			const previous = this.state.data;
			this.state.data = {};
			try {
				await this.persist(this.state.data);
			} catch (error) {
				this.state.data = previous;
				throw error;
			}
		});
	}

	public async getAll(): Promise<Record<Storage["Key"], Storage["Value"]>> {
		await this.withLock(async () => await this.refreshLocked());
		return structuredClone(this.state.data);
	}

	public async migrate(storage: BaseStorage): Promise<void> {
		const kv = await this.getAll();
		for (const key in kv) {
			if (Object.prototype.hasOwnProperty.call(kv, key)) {
				await storage.set(key, kv[key]);
			}
		}
	}
}

function restrictPermissionsSync(path: string): void {
	if (process.platform !== "win32") fs.chmodSync(path, 0o600);
}

function parseData(content: string): Record<Storage["Key"], Storage["Value"]> {
	const parsed: unknown = JSON.parse(content || "{}");
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
		throw new Error("FileStorage data must be a JSON object");
	}
	return parsed as Record<Storage["Key"], Storage["Value"]>;
}

const stateFinalizer = new FinalizationRegistry<{
	path: string;
	state: FileState;
}>(({ path, state }) => {
	state.instances--;
	if (state.instances === 0 && states.get(path) === state) states.delete(path);
});
