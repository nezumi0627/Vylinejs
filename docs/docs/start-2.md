# Keep a session between runs

Use `loginWithStoredAuthToken()` with the same persistent storage adapter on each start. This restores the saved session and refreshes it when needed.

```ts
import { loginWithStoredAuthToken } from "@nezumi0627/vylinejs";
import { FileStorage } from "@nezumi0627/vylinejs/storage";

const client = await loginWithStoredAuthToken({
	device: "IOSIPAD",
	storage: new FileStorage("./private/line-session.json"),
});

console.log((await client.getMyProfile()).displayName);
```

This example assumes the file already contains a valid session. Create or replace that session through password or QR login as shown in [Authentication](./auth.md).

## Start listening and stop cleanly

Pass an `AbortSignal` to `listen()` so the application can close its streams during shutdown.

```ts
const controller = new AbortController();

client.on("message", (message) => {
	console.log(message.text);
});

client.listen({ talk: true, square: false, signal: controller.signal });

// During application shutdown:
controller.abort();
```

Square is an inherited legacy API and is not actively supported by Vylinejs. For current service status, see [Features and support status](./features.md).
