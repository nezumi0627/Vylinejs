# Get started

Vylinejs is an unofficial LINE client library based on LINEJS. It keeps the library workflow familiar while adding independently maintained fixes and features. See [Features and support status](./features.md) before depending on an unofficial or legacy LINE service.

For a guided first setup, follow the four-page [installation walkthrough](./quickstart/1-install).

## Install

`@nezumi0627/vylinejs` is published on JSR. Deno can install it directly; npm, Bun, and other compatible package managers can use JSR's npm compatibility layer.

```sh
# Deno
deno add jsr:@nezumi0627/vylinejs

# npm
npx jsr add @nezumi0627/vylinejs
# Or install directly through JSR's npm compatibility registry:
npm install @jsr/nezumi0627__vylinejs

# Bun
bunx jsr add @nezumi0627/vylinejs
```

For a project using npm-compatible packages, follow the JSR CLI instructions and keep the generated `.npmrc` file. Do not use `npm publish`; Vylinejs publishes through JSR.

## First login

Choose QR login to avoid storing a LINE password. The login flow returns a URL and a PIN; display the URL as a QR code in your application and enter the PIN in LINE when prompted.

```ts
import { loginWithQR } from "@nezumi0627/vylinejs";

const client = await loginWithQR({
	onReceiveQRUrl(url) {
		console.log("Open or render this login URL:", url);
	},
	onPincodeRequest(pin) {
		console.log("Enter this PIN in LINE:", pin);
	},
}, {
	device: "IOSIPAD",
});

console.log((await client.getMyProfile()).displayName);
```

The library supplies the login URL; the example leaves QR rendering to the application. Keep login callbacks private and do not print session tokens or E2EE key material.

## Receive messages

Register event listeners before starting the long-running listener. Call `listen()` once for the streams the application needs.

```ts
client.on("message", async (message) => {
	console.log(message.from.id, message.text);
	if (message.text === "!ping") await message.reply("pong");
});

client.listen({ talk: true, square: false });
```

Talk events are enabled above. Square events are an inherited legacy API and are not actively supported by Vylinejs; see the [support table](./features.md#feature-status).

## Next steps

- Learn [password, QR, and stored-session authentication](./auth.md).
- Review [feature support and limitations](./features.md).
- Read about [message and edit events](./message-event.md) and [client options](./client-options.md).
- Compare [LINEJS, Vyline, and Vylinejs](../VYLINE_PORTING.md).

Vylinejs is not affiliated with or endorsed by LINE Corporation. Its APIs depend on unofficial LINE protocol behavior and can stop working when LINE changes its services.
