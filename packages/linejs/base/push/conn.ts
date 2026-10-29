import type { BaseClient } from "../core/mod.ts";
import {
	LegyH2PingFrame,
	LegyH2PingFrameType,
	LegyH2PushFrame,
	LegyH2PushFrameType,
	LegyH2SignOnResponseFrame,
} from "./connData.ts";
import type { ConnManager, ReadableStreamWriter } from "./connManager.ts";
import type { LooseType } from "@evex/loose-types";

const MAX_SIGN_ON_RESPONSE_BYTES = 8 * 1024 * 1024;
const MAX_SIGN_ON_RESPONSE_FRAGMENTS = 4096;
const MAX_BUFFERED_SIGN_ON_RESPONSE_BYTES = 64 * 1024 * 1024;
const MAX_BUFFERED_SIGN_ON_RESPONSE_FRAGMENTS = 8192;

export class Conn {
	manager: ConnManager;

	h2Headers: Array<[string, string]> = [];
	isNotFinished = false;
	cacheData: Uint8Array = new Uint8Array(0);
	private pendingChunks: Uint8Array[] = [];
	private pendingLength = 0;
	notFinPayloads: Record<number, Uint8Array[]> = Object.create(null);
	private notFinPayloadLengths: Record<number, number> = Object.create(null);
	private notFinPayloadFragments = 0;
	private bufferedNotFinPayloadBytes = 0;
	reqStream?: ReadableStreamWriter<Uint8Array> & { abort: AbortController };
	resStream?: ReadableStream<Uint8Array>;
	private _lastSendTime = 0;
	private _closed = false;

	constructor(manager: ConnManager) {
		this.manager = manager;
	}

	get client(): BaseClient {
		return this.manager.client;
	}

	createAsyncReadableStream(): {
		stream: ReadableStream<Uint8Array>;
		enqueue(chunk: string | Uint8Array): Promise<void>;
		close(): void;
		error(err: LooseType): void;
		renew(): void;
	} {
		let controller: ReadableStreamDefaultController<Uint8Array> | null = null;

		const chunks: (Uint8Array | undefined)[] = [];
		let head = 0;
		let blockedWriters = 0;
		let streamFailure: Error | undefined;
		const spaceWaiters: Array<{
			resolve: () => void;
			reject: (error: Error) => void;
		}> = [];
		const maxPendingChunks = 200;
		const pendingCount = () => chunks.length - head;
		const compactQueue = () => {
			if (head > 64 && head * 2 >= chunks.length) {
				chunks.splice(0, head);
				head = 0;
			}
		};
		const createStream = () =>
			new ReadableStream<Uint8Array>({
				start(c) {
					controller = c;
				},
				pull(c) {
					if (pendingCount()) {
						const chunk = chunks[head]!;
						chunks[head++] = undefined;
						if (head === chunks.length) {
							chunks.length = 0;
							head = 0;
						} else compactQueue();
						c.enqueue(chunk);
						spaceWaiters.shift()?.resolve();
					}
				},
				cancel() {
					controller = null;
					streamFailure = new Error("PUSH upload stream was canceled");
					rejectBlockedWriters(streamFailure);
				},
			}, {
				highWaterMark: 200,
				size() {
					return 1;
				},
			});
		function rejectBlockedWriters(error: Error) {
			for (const waiter of spaceWaiters.splice(0)) waiter.reject(error);
		}
		const encoder = new TextEncoder();
		let stream = createStream();

		return {
			get stream() {
				return stream;
			},
			async enqueue(chunk: string | Uint8Array) {
				if (streamFailure) throw streamFailure;
				const data = typeof chunk === "string" ? encoder.encode(chunk) : chunk;
				if (
					controller && (controller.desiredSize ?? 0) > 0 && !pendingCount()
				) {
					controller.enqueue(data);
					return;
				}
				while (pendingCount() >= maxPendingChunks) {
					if (blockedWriters >= maxPendingChunks) {
						throw new Error("PUSH upload queue has too many blocked writers");
					}
					blockedWriters++;
					try {
						await new Promise<void>((resolve, reject) => {
							spaceWaiters.push({ resolve, reject });
						});
					} finally {
						blockedWriters--;
					}
				}
				chunks.push(data);
			},
			close() {
				controller?.close();
				controller = null;
				streamFailure = new Error("PUSH upload stream was closed");
				rejectBlockedWriters(streamFailure);
			},
			error(err: LooseType) {
				controller?.error(err);
				controller = null;
				streamFailure = err instanceof Error ? err : new Error(String(err));
				rejectBlockedWriters(streamFailure);
			},
			renew() {
				streamFailure = undefined;
				stream = createStream();
			},
		};
	}

	async new(
		host: string,
		_port: number,
		path: string,
		headers: Record<string, string> = {},
	) {
		// BaseClient scopes Node's HTTP/2 dispatcher and connect timeout.
		const fetchFn = this.client.fetchPush ?? this.client.fetch;
		const bodystream = this.createAsyncReadableStream();
		const abort = new AbortController();
		await new Promise<void>((resolve) => {
			(async () => {
				const socket = await fetchFn(`https://${host}${path}`, {
					method: "POST",
					headers,
					body: bodystream.stream,
					signal: abort.signal,
					// @ts-expect-error: https://github.com/evex-dev/linejs/issues/109
					duplex: "half",
				});
				if (!socket.body) {
					throw new Error("no body");
				}
				this.resStream = socket.body;
				resolve();
			})().catch((error) => {
				// Nothing awaits this IIFE, so a transport failure here used to
				// surface as an unhandled rejection and take the host process down
				// with it. Report it the way the pusher reports its other errors
				// and resolve: `resStream` stays unset, `read()` throws, and the
				// reconnect loop in packages/linejs/base/polling/mod.ts retries the
				// connection.
				resolve();
				try {
					this.client.log("LegyPusherError", { error });
				} catch {
					// `log` is user-supplied. Letting it throw would reject this
					// handler and put back the unhandled rejection it exists to
					// prevent, so a broken listener is swallowed here; resolve()
					// has already run, so the connect race settles either way.
				}
			});
			setTimeout(resolve, 300);
		});
		this.reqStream = { ...bodystream, abort };
	}

	async writeByte(data: Uint8Array) {
		if (!this.reqStream) {
			await new Promise<void>((resolve) => {
				setTimeout(resolve, 500);
			});
			if (!this.reqStream) {
				throw new Error("no reqStream");
			}
		}
		this.manager.log("writeByte", { bytes: data.length });
		await this.reqStream.enqueue(data);
	}

	async writeRequest(requestType: number, data: Uint8Array) {
		const d = this.manager.buildRequest(requestType, data);
		await this.writeByte(d);
	}

	async read() {
		if (!this.resStream) {
			await new Promise<void>((resolve) => {
				setTimeout(resolve, 500);
			});
			if (!this.resStream) {
				throw new Error("no resStream");
			}
		}
		for await (const chunk of this.resStream) {
			this.manager.log("readByte", { bytes: chunk.length });
			await this.onDataReceived(chunk);
		}
	}

	isAble2Request(): boolean {
		if (this.client.authToken && !this._closed) {
			if (Date.now() / 1000 - this._lastSendTime > 0.5) return true;
		}
		return false;
	}

	readPacketHeader(
		data: Uint8Array,
	): { dt: number; dd: Uint8Array; dl: number } {
		const dl = (data[0] << 8) | data[1];
		const dt = data[2];
		const dd = data.subarray(3); // WHAT:
		return { dt, dd, dl };
	}

	async onDataReceived(data: Uint8Array): Promise<void> {
		if (data.length === 0) return;
		if (this.pendingLength || data.length < 3) {
			this.pendingChunks.push(data);
			this.pendingLength += data.length;
			this.isNotFinished = true;
			if (this.pendingLength < 3) return;
			const header = firstBytes(this.pendingChunks, 2);
			const expectedLength = ((header[0] << 8) | header[1]) + 3;
			if (this.pendingLength < expectedLength) return;
			data = concatChunks(this.pendingChunks, this.pendingLength);
			this.pendingChunks = [];
			this.pendingLength = 0;
			this.cacheData = new Uint8Array(0);
			this.isNotFinished = false;
		}
		this.manager.log(`[H2][PUSH] receives packet. bytes:${data.length}`);
		const { dt, dd, dl } = this.readPacketHeader(data);
		if (dl > dd.length) {
			this.isNotFinished = true;
			this.pendingChunks = [data];
			this.pendingLength = data.length;
			this.cacheData = new Uint8Array(0);
			return;
		} else {
			this.isNotFinished = false;
			if (dd.length > dl) {
				await this.onPacketReceived(dt, dd.subarray(0, dl));
				const rest = dd.subarray(dl);
				this.manager.log(`[PUSH] extra data bytes:${rest.length}`);
				return await this.onDataReceived(rest);
			}
		}
		await this.onPacketReceived(dt, dd);
	}

	async onPacketReceived(dt: number, dd: Uint8Array): Promise<void> {
		const debugOnly = true;
		if (dt === 1) {
			const pingType = dd[0];
			const pingId = (dd[1] << 8) | dd[2];
			const packet = new LegyH2PingFrame(pingType, pingId);
			this.manager.log(
				`[PUSH] receives ping frame. pingId:${packet.pingId}`,
				debugOnly,
			);
			if (packet.pingType === LegyH2PingFrameType.ACK_REQUIRED) {
				await this.writeByte(packet.ackPacket());
				this.manager.log(`[PUSH] send ping ack. pingId:${pingId}`, debugOnly);
				this.manager.onPingCallback(pingId);
			} else {
				throw new Error(`ping type not Implemented: ${pingType}`);
			}
		} else if (dt === 3) {
			const req = (dd[0] << 8) | dd[1];
			const requestId = req & 0x7fff;
			const isFin = (req & 0x8000) !== 0;
			let responsePayload = dd.subarray(2);
			const packet = new LegyH2SignOnResponseFrame(
				requestId,
				isFin,
				responsePayload,
			);
			if (packet.isFin) {
				const chunks = this.notFinPayloads[requestId];
				const previousLength = this.notFinPayloadLengths[requestId] ?? 0;
				const totalLength = previousLength + responsePayload.length;
				const otherBufferedBytes = this.bufferedNotFinPayloadBytes -
					previousLength;
				if (totalLength > MAX_SIGN_ON_RESPONSE_BYTES) {
					this.#clearNotFinPayload(requestId);
					throw new RangeError("PUSH sign-on response exceeds byte limit");
				}
				if (
					otherBufferedBytes + totalLength >
						MAX_BUFFERED_SIGN_ON_RESPONSE_BYTES
				) {
					this.#clearAllNotFinPayloads();
					throw new RangeError("PUSH connection exceeds response buffer limit");
				}
				if (chunks) {
					const assembled = new Uint8Array(totalLength);
					let offset = 0;
					for (const chunk of chunks) {
						assembled.set(chunk, offset);
						offset += chunk.length;
					}
					assembled.set(responsePayload, offset);
					responsePayload = assembled;
					this.#clearNotFinPayload(requestId);
				}
				await this.manager.onSignOnResponse(requestId, isFin, responsePayload);
			} else {
				this.manager.log(
					`[PUSH] receives long data. requestId: ${requestId}, req=${req}`,
					debugOnly,
				);
				const chunks = this.notFinPayloads[requestId] ?? [];
				const previousLength = this.notFinPayloadLengths[requestId] ?? 0;
				const totalLength = previousLength + responsePayload.length;
				if (totalLength > MAX_SIGN_ON_RESPONSE_BYTES) {
					this.#clearNotFinPayload(requestId);
					throw new RangeError("PUSH sign-on response exceeds byte limit");
				}
				if (
					chunks.length >= MAX_SIGN_ON_RESPONSE_FRAGMENTS ||
					this.notFinPayloadFragments >=
						MAX_BUFFERED_SIGN_ON_RESPONSE_FRAGMENTS
				) {
					this.#clearNotFinPayload(requestId);
					throw new RangeError("PUSH sign-on response exceeds fragment limit");
				}
				if (
					this.bufferedNotFinPayloadBytes + responsePayload.length >
						MAX_BUFFERED_SIGN_ON_RESPONSE_BYTES
				) {
					this.#clearAllNotFinPayloads();
					throw new RangeError("PUSH connection exceeds response buffer limit");
				}
				chunks.push(responsePayload.slice());
				this.notFinPayloads[requestId] = chunks;
				this.notFinPayloadLengths[requestId] = totalLength;
				this.notFinPayloadFragments++;
				this.bufferedNotFinPayloadBytes += responsePayload.length;
			}
		} else if (dt === 4) {
			const pushType = dd[0];
			const serviceType = dd[1];
			const pushId = (dd[2] << 24) | (dd[3] << 16) | (dd[4] << 8) | dd[5];
			const pushPayload = dd.subarray(6);
			const packet = new LegyH2PushFrame(
				pushType,
				serviceType,
				pushId,
				pushPayload,
			);
			this.manager.log(
				`[PUSH] receives push frame. service:${packet.serviceType}`,
				debugOnly,
			);
			if (
				[LegyH2PushFrameType.NONE, LegyH2PushFrameType.ACK_REQUIRED].includes(
					packet.pushType!,
				)
			) {
				if (packet.pushType === LegyH2PushFrameType.ACK_REQUIRED) {
					await this.writeByte(packet.ackPacket());
					this.manager.log(
						`[PUSH] send push ack. service:${serviceType}`,
						debugOnly,
					);
				}
				await this.manager.onPushResponse(packet);
			} else {
				throw new Error(`push type not Implemented: ${pushType}`);
			}
		} else {
			throw new Error(
				`PUSH not Implemented: type:${dt}, payloads:${
					bytesToHex(dd).slice(0, 30)
				}, len:${dd.length}`,
			);
		}
	}

	async close() {
		await 0;
		this._closed = true;
		this.#clearAllNotFinPayloads();
		try {
			this.reqStream?.close();
			this.reqStream?.abort.abort();
		} catch (_e) {
			// ignore
		}
	}

	#clearNotFinPayload(requestId: number): void {
		const chunks = this.notFinPayloads[requestId];
		if (!chunks) return;
		this.bufferedNotFinPayloadBytes -= this.notFinPayloadLengths[requestId] ??
			0;
		this.notFinPayloadFragments -= chunks.length;
		delete this.notFinPayloads[requestId];
		delete this.notFinPayloadLengths[requestId];
	}

	#clearAllNotFinPayloads(): void {
		this.notFinPayloads = Object.create(null);
		this.notFinPayloadLengths = Object.create(null);
		this.notFinPayloadFragments = 0;
		this.bufferedNotFinPayloadBytes = 0;
	}
}

/* helpers */
function bytesToHex(b: Uint8Array) {
	return Array.from(b).map((x) => x.toString(16).padStart(2, "0")).join("");
}

function firstBytes(chunks: Uint8Array[], length: number): Uint8Array {
	const result = new Uint8Array(length);
	let offset = 0;
	for (const chunk of chunks) {
		const count = Math.min(length - offset, chunk.length);
		result.set(chunk.subarray(0, count), offset);
		offset += count;
		if (offset === length) break;
	}
	return result;
}

function concatChunks(chunks: Uint8Array[], length: number): Uint8Array {
	const result = new Uint8Array(length);
	let offset = 0;
	for (const chunk of chunks) {
		result.set(chunk, offset);
		offset += chunk.length;
	}
	return result;
}
