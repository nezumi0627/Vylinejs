import type { CancellableRead } from "./cancellable_async_generator.ts";

interface Waiter<T> {
	resolve(value: T | null): void;
}

/** FIFO pull waiters that can be removed when an async iterator is cancelled. */
export class AsyncWaitQueue<T> {
	#waiters: Waiter<T>[] = [];
	#closed = false;

	get pendingCount(): number {
		return this.#waiters.length;
	}

	read(): CancellableRead<T> {
		if (this.#closed) {
			return { promise: Promise.resolve(null), cancel() {} };
		}
		let waiter!: Waiter<T>;
		const promise = new Promise<T | null>((resolve) => {
			waiter = { resolve };
			this.#waiters.push(waiter);
		});
		return {
			promise,
			cancel: () => {
				const index = this.#waiters.indexOf(waiter);
				if (index < 0) return;
				this.#waiters.splice(index, 1);
				waiter.resolve(null);
			},
		};
	}

	push(value: T): boolean {
		if (this.#closed) return false;
		const waiter = this.#waiters.shift();
		if (!waiter) return false;
		waiter.resolve(value);
		return true;
	}

	close(): void {
		if (this.#closed) return;
		this.#closed = true;
		for (const waiter of this.#waiters.splice(0)) waiter.resolve(null);
	}
}
