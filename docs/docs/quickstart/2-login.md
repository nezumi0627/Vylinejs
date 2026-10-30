# Step 2: Log in with QR

This step assumes Vylinejs is installed. QR login lets the application sign in
without passing a LINE password to the library.

1. `loginWithQR()` starts the login flow.
2. In `onReceiveQRUrl`, show the URL as a QR code in your app. Vylinejs returns
   the URL but does not create or display the QR image.
3. In `onPincodeRequest`, show the PIN to the user so they can confirm it in
   LINE. After confirmation, the function returns an authenticated client.

```ts
import { loginWithQR } from "@nezumi0627/vylinejs";

const client = await loginWithQR({
	onReceiveQRUrl(url) {
		console.log("Render this URL as a QR code:", url);
	},
	onPincodeRequest(pin) {
		console.log("Enter this PIN in LINE:", pin);
	},
}, {
	device: "IOSIPAD",
});

console.log((await client.getMyProfile()).displayName);
```

The callback messages above are placeholders for your application's UI. The
last line is a small check that login completed and the client can make an
authenticated request.

Do not publish the login URL, PIN, auth token, or stored session. For a
repeatable local example and session restore options, continue to the
[authentication guide](../auth).

<div class="vy-page-actions" id="continue">
  <a class="vy-page-button vy-page-button-primary" href="./3-messages">
    <span>Next step · 3</span>
    <strong>Receive messages</strong>
  </a>
  <a class="vy-page-button" href="./1-install">
    <span>Previous step · 1</span>
    <strong>Install Vylinejs</strong>
  </a>
</div>

Maintainer signature: [nezumi0627](https://github.com/nezumi0627)
