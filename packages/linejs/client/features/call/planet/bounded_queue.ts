/** Bounded ring queue for call control and real-time media paths. */
export class BoundedQueue<T> {
	#items: (T | undefined)[];
	#head = 0;
	#size = 0;
	#weight = 0;

	constructor(
		readonly capacity: number,
		readonly maxWeight: number,
		private readonly weightOf: (item: T) => number = () => 1,
	) {
		if (!Number.isSafeInteger(capacity) || capacity < 1) {
			throw new RangeError("capacity must be a positive integer");
		}
		if (!Number.isFinite(maxWeight) || maxWeight < 1) {
			throw new RangeError("maxWeight must be positive and finite");
		}
		this.#items = new Array(capacity);
	}

	get size(): number {
		return this.#size;
	}

	get weight(): number {
		return this.#weight;
	}

	/** Returns evictions, or null if reject mode could not accept the item. */
	push(item: T, overflow: "reject" | "drop-oldest" = "reject"): number | null {
		const itemWeight = this.weightOf(item);
		if (
			!Number.isFinite(itemWeight) || itemWeight < 0 ||
			itemWeight > this.maxWeight
		) {
			return null;
		}
		let evicted = 0;
		while (
			this.#size >= this.capacity || this.#weight + itemWeight > this.maxWeight
		) {
			if (overflow === "reject" || this.#size === 0) return null;
			this.shift();
			evicted++;
		}
		const index = (this.#head + this.#size) % this.capacity;
		this.#items[index] = item;
		this.#size++;
		this.#weight += itemWeight;
		return evicted;
	}

	shift(): T | undefined {
		if (this.#size === 0) return undefined;
		const item = this.#items[this.#head]!;
		this.#items[this.#head] = undefined;
		this.#head = (this.#head + 1) % this.capacity;
		this.#size--;
		this.#weight -= this.weightOf(item);
		return item;
	}

	clear(): void {
		this.#items.fill(undefined);
		this.#head = 0;
		this.#size = 0;
		this.#weight = 0;
	}
}
