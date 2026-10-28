import { BoundedQueue } from "./bounded_queue.ts";

interface QueuedTask {
	run: () => Promise<void> | void;
	bytes: number;
}

/** Serial async work queue with a packet and byte limit. */
export class SerialTaskQueue {
	#tasks: BoundedQueue<QueuedTask>;
	#running = false;
	#idleWaiters: (() => void)[] = [];

	constructor(
		capacity: number,
		maxBytes: number,
		private readonly onError: (error: unknown) => void = () => {},
	) {
		this.#tasks = new BoundedQueue(capacity, maxBytes, (task) => task.bytes);
	}

	enqueue(
		run: () => Promise<void> | void,
		bytes: number,
		overflow: "reject" | "drop-oldest" = "reject",
	): number | null {
		const accepted = this.#tasks.push({ run, bytes }, overflow);
		if (accepted === null) return null;
		if (!this.#running) this.#drain();
		return accepted;
	}

	clear(): void {
		this.#tasks.clear();
	}

	async idle(): Promise<void> {
		while (this.#running || this.#tasks.size) {
			await new Promise<void>((resolve) => this.#idleWaiters.push(resolve));
		}
	}

	#drain(): void {
		if (this.#running) return;
		this.#running = true;
		void (async () => {
			try {
				let task: QueuedTask | undefined;
				while ((task = this.#tasks.shift())) {
					try {
						await task.run();
					} catch (error) {
						try {
							this.onError(error);
						} catch { /* error hooks must not stop queue draining */ }
					}
				}
			} finally {
				this.#running = false;
				for (const resolve of this.#idleWaiters.splice(0)) resolve();
				if (this.#tasks.size) this.#drain();
			}
		})();
	}
}
