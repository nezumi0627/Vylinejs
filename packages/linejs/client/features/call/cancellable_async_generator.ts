export interface CancellableRead<T> {
	promise: Promise<T | null>;
	cancel(): boolean;
}

export interface CancellableAsyncGenerator<T>
	extends AsyncGenerator<T, void, unknown> {
	cancelPending(): boolean;
}

export function cancellableRead<T>(
	read: (isClosing: () => boolean) => Promise<T | null>,
	cancelSource: () => boolean,
): CancellableRead<T> {
	let closing = false;
	return {
		promise: read(() => closing),
		cancel() {
			closing = true;
			return cancelSource();
		},
	};
}

/** Builds an async generator whose pending pull can be cancelled by return(). */
export function cancellableAsyncGenerator<T>(
	read: () => CancellableRead<T>,
): CancellableAsyncGenerator<T> {
	let finished = false;
	let closing = false;
	let pending: CancellableRead<T> | undefined;
	let queuedNexts = 0;
	let tail: Promise<void> = Promise.resolve();

	const cancelPending = (): boolean => {
		closing = true;
		if (pending) {
			const cancelled = pending.cancel();
			if (cancelled) {
				pending = undefined;
				finished = true;
			}
			return cancelled;
		}
		if (queuedNexts > 0) {
			finished = true;
			return true;
		}
		return false;
	};

	const iterator: CancellableAsyncGenerator<T> = {
		[Symbol.asyncIterator]() {
			return this;
		},
		cancelPending,
		next() {
			queuedNexts++;
			const result = tail.then(async (): Promise<IteratorResult<T, void>> => {
				queuedNexts--;
				if (finished) return { value: undefined, done: true };
				if (closing) {
					finished = true;
					return { value: undefined, done: true };
				}
				try {
					const current = read();
					pending = current;
					const value = await current.promise;
					if (pending === current) pending = undefined;
					if (finished || value === null) {
						finished = true;
						return { value: undefined, done: true };
					}
					if (closing) finished = true;
					return { value, done: false };
				} catch (error) {
					finished = true;
					pending?.cancel();
					pending = undefined;
					throw error;
				}
			});
			tail = result.then(() => {}, () => {});
			return result;
		},
		async return() {
			cancelPending();
			await tail;
			finished = true;
			return { value: undefined, done: true };
		},
		async throw(error?: unknown) {
			cancelPending();
			await tail;
			finished = true;
			throw error;
		},
		async [Symbol.asyncDispose]() {
			await this.return();
		},
	};
	return iterator;
}
