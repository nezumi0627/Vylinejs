# Migrate from LINEJS

Vylinejs is a fork of LINEJS, published as one independently maintained package. Most library concepts and subpaths remain familiar, but the package specifiers change.

## Update package names

| LINEJS import | Vylinejs import |
| --- | --- |
| `@evex/linejs` | `@nezumi0627/vylinejs` |
| `@evex/linejs-types` | `@nezumi0627/vylinejs/types` |

Install from JSR with Deno:

```sh
deno add jsr:@nezumi0627/vylinejs
```

For npm or Bun, use JSR's installer and keep the generated `.npmrc`:

```sh
npx jsr add @nezumi0627/vylinejs
bunx jsr add @nezumi0627/vylinejs
```

Update TypeScript imports, including type-only imports:

```diff
- import { loginWithQR } from "@evex/linejs";
- import type { Message } from "@evex/linejs-types";
+ import { loginWithQR } from "@nezumi0627/vylinejs";
+ import type { Message } from "@nezumi0627/vylinejs/types";
```

The optional Agent I client remains repository source and is not published as a
separate package. Vylinejs publishes one package; its protocol types are
available through the `/types` and `/types/thrift` subpaths.

The library subpaths remain `base`, `call`, `storage`, and `thrift`:

```ts
import { FileStorage } from "@nezumi0627/vylinejs/storage";
import { CallSession } from "@nezumi0627/vylinejs/call";
```

## Review changed service status

- Square APIs remain in the package as inherited legacy surface, but Vylinejs does not actively support Square or promise routine Square maintenance.
- VOOM and Timeline APIs are deprecated and fail without a network request because LINE VOOM ended. Remove calls to these APIs.
- Login, E2EE, calls, and other unofficial protocol surfaces can vary by account, device, and LINE server changes. Review [current feature status](./features.md).

## Preserve credentials and keys

The package rename does not require clearing the existing storage file. Back it up before changing dependencies and continue using the same storage adapter where possible. Do not delete E2EE key records or force identity registration to repair a decryption issue; that can remove material needed for historical messages. See [authentication](./auth.md) for restore and encryption guidance.

## Compatibility boundary

Vylinejs aims to keep LINEJS API shapes recognizable, but the new package specifiers are a source migration. A matching export path does not guarantee that every inherited service is still available or actively maintained.
