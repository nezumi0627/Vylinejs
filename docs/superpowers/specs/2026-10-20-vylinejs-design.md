# Vylinejs — upstream-derived LINEJS with Vyline protocol improvements

**Status:** Implementation in progress
**Date:** 2026-10-20
**Workspace:** `E:\projects\Vylinejs`

## Intent

Create `nezumi0627/Vylinejs` as a GitHub fork of `evex-dev/linejs`. Keep LINEJS history and upstream identity visible. Use Vyline as a source of independently developed, tested improvements—especially E2EE key continuity and login integration—and adapt those changes to LINEJS's public API and upstream architecture. Send portable fixes back to `evex-dev/linejs` as focused pull requests.

The history must distinguish three states: (1) inherited from LINEJS, (2) adapted from Vyline and not yet proposed upstream, and (3) submitted or accepted upstream. Do not rewrite the history to claim Vyline itself descended from LINEJS; Vylinejs is the new fork that connects both projects.

## Evidence and current baseline

As of 2026-10-20, the public LINEJS `main` already contains ForSecure QR methods (`createQrCodeForSecure`, `qrCodeLoginV2ForSecure`), the QR login flow, E2EE key registration, E2EE message decryption, and E2EE login-request handling ([login source](https://github.com/evex-dev/linejs/blob/main/packages/linejs/base/login/mod.ts), [E2EE source](https://github.com/evex-dev/linejs/blob/main/packages/linejs/base/e2ee/mod.ts)). Therefore, the first work should compare exact behavior and port missing guarantees, not recreate features that already exist.

Vyline's protocol-side additions visible in `nezumi0627/vyline` include ([identity reconciliation](https://github.com/nezumi0627/vyline/blob/main/Vyline/packages/protocol/src/login/ensureE2EE.ts), [group key handling](https://github.com/nezumi0627/vyline/blob/main/Vyline/packages/protocol/src/login/groupE2EE.ts), [login wrapper](https://github.com/nezumi0627/vyline/blob/main/Vyline/packages/protocol/src/client/VylineClient.ts)):

- `ensureValidE2EEIdentity`: imports a LINE Desktop key dump, compares local private keys to server-registered public keys by key ID, preserves historical keys, selects a verified sending key, and avoids registering a replacement key by default.
- `groupE2EE`: stores group shared keys by `(chatMid, groupKeyId)`, so history decryption can retrieve the generation matching each message.
- Login finalization that runs E2EE identity reconciliation after authentication.
- Desktop-specific profile / transport patches and account coexistence behavior. These are Vyline client policy and are not automatically appropriate for the general LINEJS library.

## Goals

1. Preserve the complete upstream Git history and make synchronization with `evex-dev/linejs` straightforward.
2. Port generic, reusable login/E2EE behavior from Vyline into LINEJS in small reviewable changes.
3. Make key identity and key selection explicit, keyed by server key IDs, and regression-tested.
4. Keep risky key registration or key rotation behind an explicit caller action; default login must not silently replace a user's Letter Sealing identity.
5. Contribute portable fixes to upstream through focused PRs, then sync accepted changes back into Vylinejs.
6. Record provenance and upstream status for every Vyline-derived patch.

## Non-goals for the first milestone

- Reimplement ForSecure QR login from scratch; upstream already has it.
- Copy the entire `@vyline/protocol` stack into Vylinejs or replace LINEJS's existing service architecture.
- Import Vyline UI, Hono backend, desktop profile system, or its device-emulation patches into the library core.
- Publish a competing package or claim upstream acceptance before maintainers merge a PR.
- Change LINEJS's existing package names, author attribution, or license history.

## Initial milestone

Create the GitHub fork and establish remotes:

- `origin` → `nezumi0627/Vylinejs`
- `upstream` → `evex-dev/linejs`

Then make an evidence-based login/E2EE parity matrix. The first implementation candidate is a generic E2EE identity reconciliation layer that can import key material through an explicit adapter, verify private/public key correspondence against server keys by key ID, preserve all usable historical keys, choose a valid sending key, and refuse implicit replacement-key registration. Keep Desktop dump parsing in an adapter with explicit caller-provided input; do not make Vyline Desktop paths or Windows assumptions part of LINEJS core.

The initial change should include deterministic tests with generated/synthetic keys for matching, mismatch, missing latest key, multiple historical keys, corrupt storage, and explicit opt-in registration. It must not require real LINE credentials, real key dumps, or live account access.

## Resolved implementation questions

- The target `nezumi0627/Vylinejs` did not exist when checked on 2026-10-20. If it exists at bootstrap time, inspect its fork parent and history; never replace or delete it. Continue only if it is already the intended fork, otherwise stop before overwriting anything.
- If parity review finds no demonstrated gap in the proposed area, do not manufacture a port. Record the comparison and stop before code changes; select another concrete Vyline improvement only after review.
- A valid key is a local private key whose derived public key matches a server-registered public key with the same key ID. Prefer the highest server key ID that has a matching local private key. If the server's newest key is unavailable locally, preserve all verified older keys, select the highest verified one as Vyline currently does, report degraded identity status, and never register/rotate a key implicitly.

## Ongoing porting and contribution flow

1. Read current LINEJS `main` before each port; upstream may already have acquired the capability.
2. Keep a per-change note: Vyline source path / commit, behavior being ported, adaptation made, tests, and upstream PR URL/status.
3. Use a short-lived branch in Vylinejs for each portable behavior.
4. Separate generic library behavior from Vyline app-specific adapters and UX.
5. Open an upstream PR when the change is compatible with LINEJS conventions. Keep it open for maintainer review; do not assume acceptance.
6. Once merged, sync from upstream and remove duplicate downstream patches where practical.

## Constraints and safety

- Retain the upstream MIT license and copyright notices for copied or adapted material; preserve Vyline attribution for its original code where applicable.
- Never commit real session tokens, private keys, Desktop key dumps, or account data. Tests use generated fixtures only.
- Never silently register a new E2EE identity as a repair fallback. Registration/rotation must be an explicit option and its impact documented.
- Do not modify the existing `E:\projects\linejs` or `E:\projects\Vyline` worktrees while bootstrapping the fork. The local LINEJS clone has extensive whitespace-only working-tree changes; the Vyline clone has dirty submodule states. Start from the canonical upstream GitHub branch and preserve both local worktrees.
- The current `E:\projects\Vylinejs` folder contains the prior research document and is not a Git repository. Preserve that document when creating the fork.

## Success criteria

- `nezumi0627/Vylinejs` is visibly a fork of `evex-dev/linejs`, with upstream history intact.
- A concise contribution guide explains the two-way flow: Vyline → Vylinejs adaptation → LINEJS PR → upstream sync.
- The first E2EE/login port addresses a demonstrated gap rather than duplicating current upstream behavior.
- Focused tests prove key selection and repair safety without real account secrets.
- Each portable improvement has a traceable source and explicit upstream PR status.

## Builder decisions

The implementer may choose branch names, file locations, exact type names, and test-framework conventions based on the current LINEJS repository. Package publishing, new runtime support, and UI work are out of scope until separately requested.

## Bootstrap progress (2026-10-20)

- `nezumi0627/Vylinejs` was confirmed to be a fork of `evex-dev/linejs`; `origin` and `upstream` are configured accordingly.
- `main` was fast-forwarded from `4b02bb6` to `upstream/main` at `4fc512a` and pushed to the fork. Work continues on `feat/e2ee-keychain-history`.
- The synced upstream already includes login keychain history and key-ID verification (`c47abfa`) and group-key history retrieval (`ffd88cb`), so those are not port candidates.
- The first Vyline-derived addition is `E2EE.reconcileStoredE2EEIdentity(mid)`, adapted from Vyline's `ensureValidE2EEIdentity`. It checks stored private keys against server keys, chooses the newest verified key, keeps older key material, and never registers a new key.
- Desktop dump parsing and Desktop transport/fingerprint patches remain outside LINEJS core.
- `deno check packages/linejs/base/e2ee/mod.ts` passed. Tests were not run in this slice.
