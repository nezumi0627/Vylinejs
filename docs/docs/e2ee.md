# End-to-end encryption

Vylinejs includes LINE E2EE key storage and message decryption. Success depends on the account's registered public keys and the historical private-key material available to the client. Do not clear key history to troubleshoot a decryption failure.

## Stored key reconciliation

`reconcileStoredE2EEIdentity(mid)` checks stored private keys against the server-registered public key using matching key IDs, preserves verified history, and selects the newest matching local key as the active alias. It does not register, rotate, or invent keys. If there is no match, it removes only the alias and keeps the per-ID key material intact.

This method is for reconciling an existing local key store. It is not a replacement for LINE's login or key-registration flow. Preserve a backup before importing or changing account key material.

## Related implementation

- Login and account setup: [Authentication](./auth)
- Stored session handling: [Restore a session](./start-2)
- Design and source lineage: [Vyline / Vylinejs / LINEJS comparison](../VYLINE_PORTING#e2ee-and-login-parity)
- Current limitations: [Feature support](./features)
