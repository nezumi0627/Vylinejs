# Compatibility and Security Hardening Implementation Plan

> **For agentic workers:** Execute task by task with test-driven development. Keep the public LINEJS usage patterns and signatures stable.

**Goal:** Preserve familiar LINEJS client usage while fixing the reviewed E2EE, audio, message-send, Push, and dependency risks.

**Architecture:** Add regression tests at existing public/module boundaries, then make narrow internal changes. Bound Push protocol state, preserve the public client shape, and upgrade dependencies only after runtime and lockfile verification.

**Tech Stack:** TypeScript, Deno tests/check/lint, Deno lockfile, npm audit for Docs.

## Global constraints

- Keep existing client constructors, login helpers, event names, and method call shapes compatible.
- Do not expose E2EE keys or plaintext in `log` events.
- Never allow audio framing loops to advance by zero or a negative amount.
- Bound untrusted Push response buffering and release request state on completion/failure.
- Upgrade `thrift` to a patched release that works in Deno and Node ESM/CommonJS consumers.
- Include no credentials or live account data in tests.

## Review focus

1. Existing LINEJS-style QR/auth-token login and message event/send call shapes still type-check.
2. E2EE log payloads cannot contain private keys, derived keys, or plaintext.
3. Invalid audio formats reject before iteration; a pre-aborted stream does not hang.
4. Fragmented Push responses are bounded and request IDs are released after final responses.
5. The selected Thrift release has no reported advisory and loads through supported project runtimes.

---

### Task 1: Preserve LINEJS API usage

**Files:** `packages/linejs/client/features/message/talk.test.ts`, `packages/linejs/client/features/message/talk.ts`, plus a compile-only compatibility fixture if current examples do not cover the public entry points.

- [x] Add tests using the existing `TalkMessage.send(string)` and object call forms, asserting the same chat recipient and expected reply behavior.
- [x] Verify the documented login helpers and Client exports through current public imports without adding new API requirements.
- [x] Fix only missing forwarding behavior; do not rename or remove public methods.

### Task 2: Remove sensitive E2EE log data

**Files:** `packages/linejs/base/e2ee/mod.ts` and a focused test.

- [x] Assert the public log event does not contain secret key material or decrypted message bytes/text.
- [x] Keep the event category and operation type; redact sensitive details at the shared E2EE logging boundary.

### Task 3: Validate audio source configuration and cancellation

**Files:** `packages/linejs/client/features/call/audio.ts`, `audio.test.ts`.

- [x] Add failing tests for zero/negative/non-finite frame parameters and an already-aborted stream signal.
- [x] Validate frame geometry and handle abort before and after reader acquisition.

### Task 4: Bound Push response state

**Files:** `packages/linejs/base/push/conn.ts`, `connManager.ts`, corresponding tests.

- [x] Add tests for fragmented payload limit, final response cleanup, write failure cleanup, and wrap-safe request ID reuse.
- [x] Accumulate fragments in chunks and concatenate once at FIN, with per-response and connection-level caps.
- [x] Release request entries on final response and failed writes.

### Task 5: Upgrade vulnerable dependencies and verify

**Files:** root `deno.json`/`deno.lock`, `packages/linejs/deno.json`, Docs lockfile/manifest only if a compatible patched update is available.

- [x] Select a patched Thrift release with verified ESM/CommonJS behavior.
- [x] Update manifests and lockfiles deterministically.
- [x] Run focused regression tests, package type checks, dependency audits, and supported-runtime smoke checks.
- [x] Report any advisory that cannot be safely cleared without a breaking upgrade.
