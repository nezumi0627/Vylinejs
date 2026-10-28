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
