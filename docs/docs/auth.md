# Authentication and session storage

Vylinejs supports password login, QR login, login with an existing auth token, and restoration from persistent storage. LINE controls the authentication protocol and may require additional device verification.

## Password login

Use password login only when an interactive login is needed. If `pincode` is omitted, Vylinejs generates a random six-digit PIN for the E2EE login handshake. The example uses Deno environment access; grant only the required environment permission.

The login protocol version defaults to the one supported by the selected device. Set `v3: false` on the login options to explicitly use the legacy flow; `e2ee` controls the legacy password flow's E2EE handshake.

Login identity defaults to Vyline: secure QR login sends the current host name and a generic model name. Set `loginMode: "linejs"` to preserve the historical LINEJS QR identity (`linejs-v2` / `evex-device`). `v3` selects the authentication protocol; `loginMode` selects the secure QR identity and does not change that protocol. You can set `systemName` and `modelName` explicitly for QR login, or `modelName` for password login.

```ts
import { loginWithPassword } from "@nezumi0627/vylinejs";

const client = await loginWithPassword({
	email: Deno.env.get("LINE_EMAIL")!,
	password: Deno.env.get("LINE_PASSWORD")!,
	v3: false,
	modelName: "System Product Name",
	onPincodeRequest(pin) {
		console.log("Enter this PIN in LINE:", pin);
	},
}, {
	device: "IOSIPAD",
});
```

Provide credentials from a private secret store or environment configuration. Do not hard-code them in source or print tokens and PINs to shared logs.

## QR login

QR login avoids passing a password to the library. Vylinejs returns a URL through `onReceiveQRUrl`; the host application is responsible for rendering that URL as a QR code.

Set `v3: false` to select the legacy QR protocol. When omitted, Vylinejs chooses based on the device.

```ts
import { loginWithQR } from "@nezumi0627/vylinejs";

const client = await loginWithQR({
	loginMode: "vyline",
	systemName: "MY-DESKTOP",
	modelName: "System Product Name",
	onReceiveQRUrl(url) {
		showQrCode(url);
	},
	onPincodeRequest(pin) {
		showPinForLineConfirmation(pin);
	},
}, {
	device: "ANDROIDSECONDARY",
});
```

`showQrCode` and `showPinForLineConfirmation` are application functions. The library does not provide a UI or QR-image renderer.

## Restore a saved session

`FileStorage` stores access and refresh credentials together with E2EE and protocol state. Reuse the same persistent storage when restoring a session. The restore helper refreshes credentials near their server-provided deadline and throws if no saved session exists or LINE rejects it; it does not silently fall back to password login.

```ts
import {
	loginWithPassword,
	loginWithStoredAuthToken,
} from "@nezumi0627/vylinejs";
import { FileStorage } from "@nezumi0627/vylinejs/storage";

const storage = new FileStorage("./private/line-session.json");
const init = { device: "IOSIPAD" as const, storage };

let client;
if (await storage.get("accessToken") || await storage.get("refreshToken")) {
	client = await loginWithStoredAuthToken(init);
} else {
	client = await loginWithPassword({
		email: Deno.env.get("LINE_EMAIL")!,
		password: Deno.env.get("LINE_PASSWORD")!,
		onPincodeRequest(pin) {
			console.log("Enter this PIN in LINE:", pin);
		},
	}, init);
}
```

The credentials are plaintext when using `FileStorage`. Restrict filesystem permissions, exclude the file from version control and backups that are not encrypted, and never share it. `EncryptedStorage` can encrypt values with AES-GCM, but the application must keep its non-exportable key in an OS keychain or another secret manager. Vylinejs does not save or derive that key.

```ts
import { EncryptedStorage, FileStorage } from "@nezumi0627/vylinejs/storage";

const key = await loadNonExportableAesKeyFromSecretStore();
const storage = new EncryptedStorage(
	new FileStorage("./private/line-session.enc.json"),
	key,
);
```

`loadNonExportableAesKeyFromSecretStore` represents application code; Vylinejs does not provide a platform keychain adapter.

## Existing auth token

`loginWithAuthToken` accepts a token value or its supported structured token input. An auth token alone does not import E2EE private keys. Use the same persistent storage that contains the needed E2EE key material when available; do not clear key history to troubleshoot a decryption error.

```ts
import { loginWithAuthToken } from "@nezumi0627/vylinejs";
import { FileStorage } from "@nezumi0627/vylinejs/storage";

const client = await loginWithAuthToken(Deno.env.get("LINE_AUTH_TOKEN")!, {
	device: "IOSIPAD",
	storage: new FileStorage("./private/line-session.json"),
});
```

If a credential is revoked, complete an interactive login again. For guidance about historical E2EE keys and account-specific limitations, see [Features and support status](./features.md) and the [stability notes](../VYLINEJS_STABILITY.md).
