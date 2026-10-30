import { assertEquals, assertRejects } from "@std/assert";
import { loginWithAuthToken, loginWithPassword, loginWithQR } from "./login.ts";
import { MemoryStorage } from "../base/storage/mod.ts";
import { Login } from "../base/login/mod.ts";

Deno.test("public login helpers pass through protocol version choices", async () => {
	const prototype = Login.prototype as unknown as Record<string, unknown>;
	const originalPassword = prototype.withPassword;
	const originalQr = prototype.withQrCode;
	const originalReady = prototype.ready;
	let passwordOptions: unknown;
	let qrOptions: unknown;
	prototype.withPassword = function (options: unknown) {
		passwordOptions = options;
		return Promise.resolve();
	};
	prototype.withQrCode = function (options: unknown) {
		qrOptions = options;
		return Promise.resolve();
	};
	prototype.ready = () => Promise.resolve();
	try {
		await loginWithPassword({
			email: "user@example.com",
			password: "password",
			v3: false,
			e2ee: false,
			modelName: "Old PC",
			onPincodeRequest() {},
		}, { device: "ANDROID" });
		await loginWithQR({
			v3: false,
			loginMode: "linejs",
			systemName: "linejs-v2",
			modelName: "evex-device",
			onReceiveQRUrl() {},
			onPincodeRequest() {},
		}, { device: "ANDROID" });
	} finally {
		prototype.withPassword = originalPassword;
		prototype.withQrCode = originalQr;
		prototype.ready = originalReady;
	}
	assertEquals(passwordOptions, {
		email: "user@example.com",
		password: "password",
		pincode: undefined,
		v3: false,
		e2ee: false,
		modelName: "Old PC",
	});
	assertEquals(qrOptions, {
		v3: false,
		loginMode: "linejs",
		systemName: "linejs-v2",
		modelName: "evex-device",
	});
});

Deno.test("loginWithAuthToken passes version and endpoint to BaseClient", async () => {
	let seen: Request | undefined;
	await assertRejects(
		() =>
			loginWithAuthToken("token", {
				device: "ANDROID",
				version: "26.6.2",
				endpoint: "example.invalid",
				fetch: (request) => {
					seen = request;
					throw new Error("stop before network");
				},
			}),
		Error,
		"stop before network",
	);
	assertEquals(seen?.url, "https://example.invalid/S4");
	assertEquals(
		seen?.headers.get("x-line-application"),
		"ANDROID\t26.6.2\tAndroid OS\t16",
	);
});

Deno.test("loginWithAuthToken accepts V3 credentials and uses encrypted LEGY", async () => {
	let seen: Request | undefined;
	const storage = new MemoryStorage();
	const accessToken = jwt({ ver: "3.1", scp: "LINE_AUTH" });
	const refreshToken = jwt({ ver: "3.1", scp: "LINE_AUTH_REFRESH" });

	await assertRejects(
		() =>
			loginWithAuthToken(JSON.stringify({ accessToken, refreshToken }), {
				device: "ANDROID",
				version: "26.6.2",
				storage,
				fetch: (request) => {
					seen = request;
					throw new Error("stop before network");
				},
			}),
		Error,
		"stop before network",
	);

	assertEquals(seen?.url, "https://gf.line.naver.jp/enc");
	assertEquals(seen?.headers.get("x-line-access"), null);
	assertEquals(seen?.headers.get("x-le"), "7");
	assertEquals(seen?.headers.get("x-lap"), "5");
	assertEquals(seen?.headers.get("x-lcs")?.startsWith("0008"), true);
	assertEquals(await storage.get("refreshToken"), refreshToken);
});

function jwt(payload: Record<string, unknown>): string {
	return [
		base64Url(JSON.stringify({ alg: "none", typ: "JWT" })),
		base64Url(JSON.stringify(payload)),
		"sig",
	].join(".");
}

function base64Url(value: string): string {
	return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(
		/=+$/g,
		"",
	);
}
