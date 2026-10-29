# AI integration guide

This is the canonical, stepwise setup path for coding assistants and other
automated tools integrating `@nezumi0627/vylinejs`. Follow the steps in order,
use only APIs shown in the linked Vylinejs docs or repository examples, and do
not invent LINE protocol behavior.

## 1. Identify the runtime

Vylinejs is a TypeScript library published on JSR. Supported installation
workflows include Deno, npm-compatible Node.js, and Bun. The docs website's
own toolchain is Node.js/npm; that does not change the library runtime.

## 2. Install the package

```sh
# Deno
deno add jsr:@nezumi0627/vylinejs

# npm / Node.js
npx jsr add @nezumi0627/vylinejs

# Bun
bunx jsr add @nezumi0627/vylinejs
```

For npm, retain the `.npmrc` created by the JSR CLI. Use the package import
`@nezumi0627/vylinejs`; new projects should not import `@evex/linejs`.

## 3. Choose authentication

Prefer QR login when an interactive LINE device is available. The application
must show the URL returned in `onReceiveQRUrl` as a QR code and present the PIN
from `onPincodeRequest` to the user.

```ts
import { loginWithQR } from "@nezumi0627/vylinejs";

const client = await loginWithQR({
	onReceiveQRUrl(url) { showQr(url); },
	onPincodeRequest(pin) { showPin(pin); },
}, { device: "IOSIPAD" });
```

`showQr` and `showPin` above are application functions, not library exports.
Never log or commit login URLs, PINs, auth tokens, session files, or E2EE key
material. Read [Authentication](../docs/auth) before persisting credentials.

## 4. Add a Talk event handler

```ts
client.on("message", async (message) => {
	if (message.text === "!ping") await message.reply("pong");
});

client.listen({ talk: true, square: false });
```

Register handlers before calling `listen()`. Keep Square disabled unless the
application intentionally uses that legacy, unsupported service. Catch errors
inside asynchronous event handlers.

## 5. Use persistent sessions only when needed

See [Restore a session](../docs/start-2) for `loginWithStoredAuthToken()` and
`FileStorage`. The storage adapter writes sensitive session data; use a private
path, restrict filesystem permissions, and provide the same persistent storage
adapter on each run.

## 6. Select a feature guide

- [Messages and events](../docs/message-event)
- [Audio calls](../docs/audio-call)
- [Group calls](../docs/group-call)
- [Video calls](../docs/video-call)
- [E2EE](../docs/e2ee)
- [API methods](../docs/methods)
- [Feature status and runtime limits](../docs/features)

Call support is partial and network/device dependent. Video APIs operate on
encoded frames; capture and encoding belong to the host application. Browser
UDP call transport is unsupported. Check the feature status before promising
interoperability.

## 7. Verify against source

Before writing integration code, inspect the exact method signature in
`packages/linejs/client` or a current `example/` file. Do not infer a method
from LINEJS documentation when its name or behavior may have changed in
Vylinejs. Use `deno check <example.ts>` for Deno examples and the repository's
documented commands for the selected runtime.

## Project identity

Vylinejs is a LINEJS-based library maintained independently by nezumi0627.
Vyline is a separate application and a source of portable implementation
experience; it is not a runtime dependency of this package. For the code map,
see [DeepWiki and repository architecture](./deepwiki).

Maintainer signature: [nezumi0627](https://github.com/nezumi0627)
