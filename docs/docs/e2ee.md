# End-to-end encryption

Vylinejs includes LINE E2EE key storage and message decryption. Success depends on the account's registered public keys and the historical private-key material available to the client. Do not clear key history to troubleshoot a decryption failure.

## Stored key reconciliation

`reconcileStoredE2EEIdentity(mid)` checks stored private keys against the server-registered public key using matching key IDs, preserves verified history, and selects the newest matching local key as the active alias. It does not register, rotate, or invent keys. If there is no match, it removes only the alias and keeps the per-ID key material intact.

This method is for reconciling an existing local key store. It is not a replacement for LINE's login or key-registration flow. Preserve a backup before importing or changing account key material.

## Import a key bundle

After logging in to the account that owns the keys, pass a parsed Vyline Desktop or SBC key bundle to `client.base.e2ee.importE2EEKeyBundle()`. The library does not read desktop files itself. It checks the bundle account, derives each public key from its private key, and verifies keys registered on LINE before selecting a key for sending. Valid older keys that are no longer registered can still be kept for historical-message decryption.

```ts
const bundle = JSON.parse(await Deno.readTextFile("./private/e2ee-keys.json"));
const result = await client.base.e2ee.importE2EEKeyBundle(bundle);

console.log({
	imported: result.imported,
	skipped: result.skipped,
	activeKeyId: result.identity.selectedKeyId,
});
```

Treat the source bundle and persistent client storage as secrets: private E2EE keys can expose message history. Keep backups encrypted and never include key data in logs or issue reports. Importing does not register or rotate keys on LINE.

## Related implementation

- Login and account setup: [Authentication](./auth)
- Stored session handling: [Restore a session](./start-2)
- Design and source lineage: [Vyline / Vylinejs / LINEJS comparison](../VYLINE_PORTING#e2ee-and-login-parity)
- Current limitations: [Feature support](./features)
