import { assertEquals } from "@std/assert";
import { AuthService } from "./mod.ts";

function makeStubClient(rotated: boolean) {
	let onEnd = () => {};
	const store = new Map<string, string>([
		["refreshToken", "rt-old"],
	]);
	return {
		store,
		end() {
			onEnd();
		},
		client: {
			authToken: "authtoken",
			on(_event: string, callback: () => void) {
				onEnd = callback;
			},
			emit() {},
			storage: {
				get(k: string) {
					return Promise.resolve(store.get(k) ?? null);
				},
				set(k: string, v: string) {
					store.set(k, v);
					return Promise.resolve();
				},
			},
			request: {
				request() {
					return Promise.resolve({
						accessToken: "at-new",
						tokenIssueTimeEpochSec: 1000,
						durationUntilRefreshInSec: 3600,
						...(rotated ? { refreshToken: "rt-new" } : {}),
					});
				},
			},
		},
	};
}

// RefreshAccessTokenResponse carries a `refreshToken` field because the
// server may rotate it. Dropping it meant the next refresh reused the stale
// token and failed.
Deno.test("tryRefreshToken persists a rotated refreshToken", async () => {
	const stub = makeStubClient(true);
	const auth = new AuthService(stub.client as never);

	await auth.tryRefreshToken();

	assertEquals(stub.store.get("refreshToken"), "rt-new");
	assertEquals(String(stub.store.get("expire")), "4600");
	stub.end();
});

Deno.test("tryRefreshToken keeps the stored refreshToken when not rotated", async () => {
	const stub = makeStubClient(false);
	const auth = new AuthService(stub.client as never);

	await auth.tryRefreshToken();

	assertEquals(stub.store.get("refreshToken"), "rt-old");
	stub.end();
});

Deno.test("login persists complete credentials through one storage batch", async () => {
	const store = new Map<string, string | number>();
	let setManyCalls = 0;
	let setCalls = 0;
	let onEnd = () => {};
	const auth = new AuthService({
		authToken: "old",
		disabled: false,
		on(_event: string, callback: () => void) {
			onEnd = callback;
		},
		emit() {},
		storage: {
			get(key: string) {
				return Promise.resolve(store.get(key));
			},
			set(key: string, value: string | number) {
				setCalls++;
				store.set(key, value);
				return Promise.resolve();
			},
			setMany(entries: Record<string, string | number>) {
				setManyCalls++;
				for (const [key, value] of Object.entries(entries)) {
					store.set(key, value);
				}
				return Promise.resolve();
			},
			delete(key: string) {
				store.delete(key);
				return Promise.resolve();
			},
		},
	} as never);

	await auth.saveAuthTokenCredential({
		accessToken: "access",
		refreshToken: "refresh",
		expire: 1234,
	});

	assertEquals(setManyCalls, 1);
	assertEquals(setCalls, 0);
	assertEquals(Object.fromEntries(store), {
		accessToken: "access",
		refreshToken: "refresh",
		expire: 1234,
	});
	onEnd();
});

Deno.test("a late refresh cannot overwrite credentials from a newer login", async () => {
	const store = new Map<string, string | number>([["refreshToken", "rt-old"]]);
	let releaseRefreshWrite!: () => void;
	let refreshWriteStarted!: () => void;
	const refreshWrite = new Promise<void>((resolve) =>
		releaseRefreshWrite = resolve
	);
	const started = new Promise<void>((resolve) => refreshWriteStarted = resolve);
	let onEnd = () => {};
	const client = {
		authToken: "access-old",
		disabled: false,
		on(_event: string, callback: () => void) {
			onEnd = callback;
		},
		emit() {},
		storage: {
			get(k: string) {
				return Promise.resolve(store.get(k) ?? null);
			},
			async set(k: string, v: string | number) {
				if (k === "refreshToken" && v === "rt-rotated") {
					refreshWriteStarted();
					await refreshWrite;
				}
				store.set(k, v);
			},
			delete(k: string) {
				store.delete(k);
				return Promise.resolve();
			},
		},
		request: {
			request() {
				return Promise.resolve({
					accessToken: "access-stale",
					refreshToken: "rt-rotated",
					tokenIssueTimeEpochSec: 1000,
					durationUntilRefreshInSec: 3600,
				});
			},
		},
	};
	const auth = new AuthService(client as never);
	const refresh = auth.tryRefreshToken();
	await started;
	const save = auth.saveAuthTokenCredential({
		accessToken: "access-new",
		refreshToken: "rt-new",
		expire: 9000,
	});
	releaseRefreshWrite();
	const [refreshResult, saveResult] = await Promise.allSettled([refresh, save]);
	assertEquals(refreshResult.status, "rejected");
	assertEquals(saveResult.status, "fulfilled");
	assertEquals(store.get("accessToken"), "access-new");
	assertEquals(store.get("refreshToken"), "rt-new");
	assertEquals(store.get("expire"), 9000);
	assertEquals(client.authToken, "access-new");
	onEnd();
});

Deno.test("refresh scheduling backs off when credential storage keeps failing", async () => {
	let reads = 0;
	let onEnd = () => {};
	const auth = new AuthService({
		authToken: "access",
		disabled: false,
		on(_event: string, callback: () => void) {
			onEnd = callback;
		},
		emit() {},
		storage: {
			get() {
				reads++;
				return Promise.reject(new Error("storage unavailable"));
			},
			set() {
				return Promise.resolve();
			},
			delete() {
				return Promise.resolve();
			},
		},
	} as never);

	await auth.saveAuthTokenCredential({ accessToken: "access" });
	await new Promise((resolve) => setTimeout(resolve, 0));
	assertEquals(reads, 2);
	onEnd();
});
