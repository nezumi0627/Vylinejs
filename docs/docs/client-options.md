# Client initialization options

Login helpers take a separate login argument and an `InitOptions` object. Every login flow requires a `device` value.

```ts
import { loginWithQR } from "@nezumi0627/vylinejs";
import { FileStorage } from "@nezumi0627/vylinejs/storage";

const client = await loginWithQR({
	onReceiveQRUrl(url) {
		console.log(url);
	},
	onPincodeRequest(pin) {
		console.log("Enter this PIN in LINE:", pin);
	},
}, {
	device: "IOSIPAD",
	storage: new FileStorage("./private/line-session.json"),
	// endpoint: "legy.line-apps.com",
	// version: "26.6.2",
	// fetch: (input, init) => fetch(input, init),
	// legy: { encrypted: "auto" },
});
```

## Options

| Option | Type | Default | Purpose |
| --- | --- | --- | --- |
| `device` | `Device` | Required | Protocol device profile, such as `IOSIPAD`, `ANDROID`, or `DESKTOPWIN`. |
| `version` | `string` | Device-specific | LINE application version sent in protocol identification fields. Override only when you know which profile the server expects. |
| `endpoint` | `string` | `legy.line-apps.com` | API endpoint used by the client. Most users should keep the default. |
| `storage` | `BaseStorage` | `MemoryStorage` | Persists credentials, E2EE material, and protocol state. Use protected persistent storage for a long-running client. |
| `fetch` | `FetchLike` | `globalThis.fetch` | Custom network function for environments that need a proxy or custom transport. |
| `legy.encrypted` | `boolean \| "auto"` | `"auto"` | Controls LEGY request encryption. `auto` selects behavior based on the credential/token type. |
| `legy.endpoint` | `string` | Library default | Overrides the LEGY endpoint when using a custom compatible server. |

Supported `device` strings are `DESKTOPWIN`, `DESKTOPMAC`, `ANDROID`, `ANDROIDSECONDARY`, `IOS`, `IOSIPAD`, `WATCHOS`, and `WEAROS`. LINE may reject a device/version combination; these values imitate protocol profiles and do not identify the host operating system.

`MemoryStorage` is cleared when the process exits. `FileStorage` writes JSON in plaintext, so restrict access to the file. For encrypted persistence, use `EncryptedStorage` with a non-exportable AES-GCM key held outside this library; see [authentication and session storage](./auth.md).

The exact public option type is exported as `InitOptions` from the main package. See the [authentication guide](./auth.md) for the separate arguments accepted by each login helper.
