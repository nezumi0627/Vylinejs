export interface CancellableRead<T> {
	promise: Promise<T | null>;
	cancel(): void;
}

/** Builds an async generator whose pending pull can be cancelled by return(). */
export function cancellableAsyncGenerator<T>(
	read: () => CancellableRead<T>,
): AsyncGenerator<T, void, unknown> {
	let finished = false;
	let pending: CancellableRead<T> | undefined;
	let tail: Promise<void> = Promise.resolve();

	const iterator: AsyncGenerator<T, void, unknown> = {
		[Symbol.asyncIterator]() {
			return this;
		},
		next() {
			const result = tail.then(async (): Promise<IteratorResult<T, void>> => {
				if (finished) return { value: undefined, done: true };
				try {
					const current = read();
					pending = current;
					const value = await current.promise;
					if (pending === current) pending = undefined;
					if (finished || value === null) {
						finished = true;
						return { value: undefined, done: true };
					}
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
			finished = true;
			pending?.cancel();
			pending = undefined;
			await tail;
			return { value: undefined, done: true };
		},
		async throw(error?: unknown) {
			finished = true;
			pending?.cancel();
			pending = undefined;
			await tail;
			throw error;
		},
		async [Symbol.asyncDispose]() {
			await this.return();
		},
	};
	return iterator;
}
