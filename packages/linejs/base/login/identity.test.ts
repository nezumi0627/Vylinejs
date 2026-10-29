import { assertEquals } from "@std/assert";
import { resolveLoginIdentity } from "./identity.ts";

Deno.test("Vyline login uses host identity while LINEJS login keeps legacy identity", () => {
	assertEquals(resolveLoginIdentity("vyline", {}, "NEZUMI-PC"), {
		systemName: "NEZUMI-PC",
		modelName: "System Product Name",
	});
	assertEquals(resolveLoginIdentity("linejs", {}, "NEZUMI-PC"), {
		systemName: "linejs-v2",
		modelName: "evex-device",
	});
	assertEquals(
		resolveLoginIdentity("vyline", {
			systemName: "CUSTOM-HOST",
			modelName: "Custom PC",
		}, "NEZUMI-PC"),
		{ systemName: "CUSTOM-HOST", modelName: "Custom PC" },
	);
});
