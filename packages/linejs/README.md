# Vylinejs (LINEJS-based)

Vylinejs is the `nezumi0627` fork of
[LINEJS](https://github.com/evex-dev/linejs), maintained at
[github.com/nezumi0627/Vylinejs](https://github.com/nezumi0627/Vylinejs). It
keeps the `@evex/linejs` import namespace for source compatibility. This
repository publishes GitHub source releases only; the upstream JSR badges and
installation instructions below describe the upstream package, not Vylinejs
releases.

[![JSR](https://jsr.io/badges/@evex/linejs?from=github)](https://jsr.io/@evex/linejs)
[![JSR Score](https://jsr.io/badges/@evex/linejs/score?from=github)](https://jsr.io/@evex/linejs)
[![JSR Scope](https://jsr.io/badges/@evex?from=github)](https://jsr.io/@evex)
[![](https://dcbadge.limes.pink/api/server/evex)](https://discord.gg/evex)
[![技術者倫理 遵守済み](https://img.shields.io/badge/%E6%8A%80%E8%A1%93%E8%80%85%E5%80%AB%E7%90%86-%E9%81%B5%E5%AE%88%E6%B8%88%E3%81%BF-0a0a0a?style=for-the-badge&labelColor=ffffff)](https://技術者倫理.com)

<center>
  <img src="https://raw.githubusercontent.com/nezumi0627/Vylinejs/main/.github/assets/icon.png" width="150" height="150" alt="Vylinejs" />
</center>

<center> <b>Vylinejs</b> is a LINEJS-based JavaScript library for creating a LINE SelfBot. </center>

## Why Vylinejs

Vylinejs keeps LINEJS's familiar API and protocol foundation while being
maintained as an independent fork. That gives it room to respond quickly to
new LINE protocol changes and user requests, evolve features with frequent
maintenance, and make fork-specific choices without waiting for upstream
changes. Performance work targets measured CPU and memory bottlenecks; see the
[stability notes](../../docs/VYLINEJS_STABILITY.md) for benchmarks and limits.
Portable improvements are also sent back to LINEJS as focused pull requests.

---

##### <center>❓ Question: Join our [Discord community](https://discord.gg/evex)</center>

##### <center>📚 Documentation: [Check out the full documentation](https://nezumi0627.github.io/Vylinejs/)</center>

##### <center>🤖 AI Generated Documentation: [DeepWiki - LINEJS](https://deepwiki.com/evex-dev/linejs)

---

## Installation

Supports all runtimes (Node.js, Deno, and Bun) and Typescript.

```llvm
npx jsr add @evex/linejs
bunx --bun jsr add @evex/linejs
deno add @evex/linejs
```

### For AI coding agents

Install LINEJS as a skill so Codex, Claude Code, and other coding agents know
how to work with the library:

```sh
npx skills add evex-dev/linejs --skill linejs
```

You can use `git clone` to download the latest development version and use it in
Deno.

```llvm
git clone https://github.com/evex-dev/linejs.git
cd linejs
touch main.js
deno run main.js
```

##### Documentation is [https://linejs.evex.land](https://linejs.evex.land/)

## Migrating from v1

The v1 → v2 surface change is large enough that a step-by-step manual diff isn't
worth maintaining. Install the agent skill (see [Installation](#installation))
and ask your coding agent to migrate the affected files — it will read the
skill's roadmap, pull the current API shapes, and rewrite call sites against the
live source.

## Browser Support

For now, please use "https://esm.sh/jsr/@evex/linejs".

Example is [here](./example/browser).

## LINEJS Types

Please see [@evex/linejs-types](https://jsr.io/@evex/linejs-types).\
In short, TypeScript types and enums (such as ReactionType (0, 1, 2, 3),
MessageType, etc.) are provided.

## Provided Packages

- client - (@evex/linejs)
  - Client - LINE SelfBot Client
- base - (@evex/linejs/base)
  - BaseClient - LINE SelfBot API Client
- call - (@evex/linejs/call)
  - Call control-plane and media helpers
  - [Explicit incoming 1:1 audio/video answering](../../docs/INCOMING_AUDIO.md)
- thrift - (@evex/linejs/thrift)
  - Thrift - Thrift read/write
- storage - (@evex/linejs/storage)
  - BaseStorage - LINE Client Storage Type
  - MemoryStorage - LINE Client Memory Storage
  - FileStorage - LINE Client File Storage
- types - (@evex/linejs-types)
  - All Types for LINE

## Session storage encryption

`EncryptedStorage` encrypts storage values with AES-GCM. Supply a key imported
from a secret manager that persists it securely; Vylinejs stores only the
ciphertext and does not save or derive the key for you.

```ts
import { EncryptedStorage, FileStorage } from "@evex/linejs/storage";

// Implement this with an OS keychain or another secret manager.
const keyBytes = await loadOrCreateKeyFromSecretStore("vylinejs-storage");
const key = await crypto.subtle.importKey(
	"raw",
	keyBytes,
	{ name: "AES-GCM" },
	false,
	["encrypt", "decrypt"],
);
const storage = new EncryptedStorage(
	new FileStorage("./session.enc.json"),
	key,
);
```

To migrate an existing `FileStorage`, call
`oldStorage.migrate(encryptedStorage)` once before using the encrypted store.

## Authors

- Owner & Developer: [Piloking](https://github.com/piloking)
- Developer: [EdamAme-x](https://github.com/EdamAme-x)
- Developer: [MocA-Love](https://github.com/MocA-Love)
- Developer: [Hafusun](https://github.com/hafusun)

## References

- [DeachSword/CHRLINE](https://github.com/DeachSword/CHRLINE)

- [DeachSword/CHRLINE-Thrift](https://github.com/DeachSword/CHRLINE-Thrift/)

- [WEDeach/CHRLINE-Patch](https://github.com/WEDeach/CHRLINE-Patch)

- [discordjs/collection](https://www.npmjs.com/package/@discordjs/collection)
