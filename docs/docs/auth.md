# Authentication

You can authenticate with password login, QR login, or an existing auth token.

## Login

Login helpers return a high-level `Client`. Each helper also needs client init
options, including the device to emulate.

### `loginWithPassword`

Here is an example:
```ts
import { loginWithPassword } from "@evex/linejs";

const client = await loginWithPassword({
  email: 'you@example.com', // e-mail address
  password: 'password', // Password
  onPincodeRequest(pincode) {
    console.log('Enter this pincode to your LINE app:', pincode)
  }
}, {
  device: "IOSIPAD",
})
```

email and password are required. If you omit `pincode`, LINEJS generates a random
six-digit PIN for the E2EE login handshake. On first login, enter that PIN in
the LINE app to enable E2EE.
`onPincodeRequest` can receive a pincode and you can output it with that method to tell users pincode.

### `loginWithQR`

In this way, email and password is not needed.

```ts
import { loginWithQR } from "@evex/linejs";

const client = await loginWithQR({
  onReceiveQRUrl(url) {
    console.log("Access this URL:", url);
  },
  onPincodeRequest(pincode) {
    console.log("Enter this pincode to your LINE app:", pincode);
  },
}, {
  device: "ANDROIDSECONDARY",
})
```

The function gives an url to read on mobile. You have to create QR with yourself if you want to show QR code, this is because of LINEJS doesn't support creating QR code.

## With authToken

There is a possibility to banned your account if you tried login many times, so you should use authToken to get authenticated.

```ts
import { loginWithAuthToken } from "@evex/linejs";

const client = await loginWithAuthToken("YOUR_AUTH_TOKEN", {
  device: "IOSIPAD",
});
```

### Save and restore a session

The supplied storage persists `accessToken`, `refreshToken`, and `expire`.
Refresh tokens are rotated and saved when LINE returns a new one. Each
authenticated API request checks the server supplied deadline and refreshes
when it is within 60 seconds; `loginWithStoredAuthToken` does this before
loading the profile. Requests also retry once when LINE reports that a token
must refresh. A background timer also refreshes before expiry while the client
is idle; failures are retried after five minutes.

```ts
import { loginWithPassword, loginWithStoredAuthToken } from "@evex/linejs";
import { FileStorage } from "@evex/linejs/storage";

const storage = new FileStorage("./session.json");
const init = { device: "IOSIPAD" as const, storage };

const client = await (async () => {
  if (await storage.get("accessToken") || await storage.get("refreshToken")) {
    return await loginWithStoredAuthToken(init);
  }
  return await loginWithPassword({
    email: "you@example.com",
    password: "password",
    onPincodeRequest(pin) {
      console.log("Enter this pincode in LINE:", pin);
    },
  }, init);
})();
// Use client here.
```

If LINE rejects a revoked credential, sign in interactively again. Password
login does not run automatically after a restore failure. A fresh password
login can replace the stored credentials even when the previous refresh token
is expired or revoked.

`session.json` contains plaintext access and refresh tokens plus E2EE key
material. Exclude it from version control, restrict file access to your user,
and do not log or share its contents. Load your password from private
configuration or an environment variable rather than committing it.
