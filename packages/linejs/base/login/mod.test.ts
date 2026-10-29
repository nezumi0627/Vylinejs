import { assertEquals } from "@std/assert";
import { Login, registrationAuthEndpoint } from "./mod.ts";

Deno.test("registration auth endpoint uses v4 for Android devices", () => {
	assertEquals(registrationAuthEndpoint("ANDROID"), "/api/v4p/rs");
	assertEquals(registrationAuthEndpoint("ANDROIDSECONDARY"), "/api/v4p/rs");
});

Deno.test("registration auth endpoint keeps v3 for existing desktop and iOS logins", () => {
	assertEquals(registrationAuthEndpoint("DESKTOPWIN"), "/api/v3p/rs");
	assertEquals(registrationAuthEndpoint("DESKTOPMAC"), "/api/v3p/rs");
	assertEquals(registrationAuthEndpoint("IOS"), "/api/v3p/rs");
	assertEquals(registrationAuthEndpoint("IOSIPAD"), "/api/v3p/rs");
});

Deno.test("QR login forwards Vyline or historical LINEJS identity selection", async () => {
	const requested: unknown[] = [];
	const login = new Login({
		device: "ANDROID",
		auth: {
			clearRefreshState: () => Promise.resolve(),
			setAccessToken: () => Promise.resolve(),
		},
		e2ee: { verifyLoginKey: () => Promise.resolve() },
	} as never);
	(login as unknown as { requestSQR2(identity: unknown): Promise<string> })
		.requestSQR2 = (identity) => {
			requested.push(identity);
			return Promise.resolve("token");
		};

	await login.withQrCode({ v3: true, loginMode: "linejs" });
	await login.withQrCode({
		v3: true,
		loginMode: "vyline",
		systemName: "NEZUMI-PC",
		modelName: "Custom PC",
	});

	assertEquals(requested, [
		{ systemName: "linejs-v2", modelName: "evex-device" },
		{ systemName: "NEZUMI-PC", modelName: "Custom PC" },
	]);
});

Deno.test("V3 login persists Thrift-decoded numeric-key token objects", async () => {
	let saved: [string, number] | undefined;
	const login = new Login({
		auth: {
			saveRefreshCredential(refresh: string, expires: number) {
				saved = [refresh, expires];
				return Promise.resolve();
			},
		},
	} as never);
	const persist = login as unknown as {
		persistV3TokenInfo(info: unknown): Promise<string>;
	};

	const access = await persist.persistV3TokenInfo({
		1: "access-token",
		2: "refresh-token",
		3: 1_000,
		6: 3_600,
	});
	assertEquals(access, "access-token");
	assertEquals(saved, ["refresh-token", 4_600]);
});
