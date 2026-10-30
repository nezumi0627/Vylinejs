import { hostname } from "node:os";

export type LoginMode = "vyline" | "linejs";

export interface LoginIdentity {
	systemName: string;
	modelName: string;
}

export type LoginIdentityOverrides = Partial<LoginIdentity>;

export function resolveLoginIdentity(
	mode: LoginMode = "vyline",
	overrides: LoginIdentityOverrides = {},
	hostName = getHostName(),
): LoginIdentity {
	if (mode === "linejs") {
		return {
			systemName: overrides.systemName ?? "linejs-v2",
			modelName: overrides.modelName ?? "evex-device",
		};
	}
	return {
		systemName: overrides.systemName ?? hostName,
		modelName: overrides.modelName ?? "System Product Name",
	};
}

function getHostName(): string {
	try {
		return hostname().split(".")[0] || "DESKTOP";
	} catch {
		return "DESKTOP";
	}
}
