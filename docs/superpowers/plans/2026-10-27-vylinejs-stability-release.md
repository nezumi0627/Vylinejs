# Vylinejs Stability and Release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stabilize the LINEJS-based Vylinejs tree, address locally actionable upstream findings, and publish a reviewed GitHub release.

**Architecture:** Keep the existing monorepo and public compatibility surface. Fix lifecycle and buffering at each owning subsystem, with bounded queues that preserve durable events, bounded real-time media queues, parser/input limits, and explicit cancellation cleanup. Preserve E2EE key history and avoid speculative storage redesign without measurements.

**Tech Stack:** Deno 2, TypeScript, Deno test/lint/fmt, GitHub Releases.

**Spec:** `docs/superpowers/specs/2026-10-27-vylinejs-stability-release-design.md`

## Global Constraints

- Keep Vylinejs as one LINEJS-based package tree; do not split operations into another package.
- Do not silently drop Talk/Square events, call control messages, or E2EE historical keys.
- Bound real-time media queues and discard stale media only with explicit documented behavior.
- Do not claim live call/account validation based on synthetic tests.
- Publish a GitHub Release for `nezumi0627/Vylinejs`; do not publish npm/JSR packages.
- Preserve user changes already present in the worktree.

## Review Focus

- Slow push consumers: prove overflow triggers visible recovery/failure and never silent event loss.
- Abort during startup, sleep, and streaming: prove listeners/readers/polling state are cleaned up and restart works.
- Malformed/truncated/oversized TMC and SSE input: prove early bounded rejection and no excessive allocation.
- Sustained media/control congestion: prove stale media is bounded while control order remains intact.
- Long AgentI conversation and large storage: prove retention policy and measured CPU/memory behavior.

---

### Task 1: Push stream lifecycle and bounded queues

**Files:**
- Modify: `packages/linejs/base/push/connManager.ts`
- Modify: `packages/linejs/base/push/conn.ts`
- Test: adjacent push tests (create focused tests if none exist)

**Interfaces:** Keep exported stream APIs stable. Internal queue overflow must surface a terminal error or verified reconnect signal.

- [ ] Test producer behavior with a consumer paused beyond the queue limit; assert visible failure/recovery and no silent delivery loss.
- [ ] Test cancel/renew lifecycle and queue clearing; assert no retained chunks after teardown.
- [ ] Implement a bounded O(1) queue and an explicit overflow path compatible with existing recovery semantics.
- [ ] Run focused push tests and formatter on touched files.

### Task 2: Client and SquareChat cancellation lifecycle

**Files:**
- Modify: `packages/linejs/client/client.ts`
- Modify: `packages/linejs/client/features/square/mod.ts`
- Test: adjacent client/Square tests

**Interfaces:** Preserve current `listen` and `SquareChat.listen` signatures unless tests establish an existing options extension.

- [ ] Test abort during Square initial sync and retry delay; assert prompt termination and reset polling state.
- [ ] Test repeated listen/abort cycles; assert abort listeners are removed and a later listen can run.
- [ ] Implement cancellable delay and `try/finally` cleanup; remove only listeners owned by the invocation.
- [ ] Run focused lifecycle tests and touched-file formatting.

### Task 3: Call media and control queue pressure

**Files:**
- Modify: `packages/linejs/client/features/call/planet/transport.ts`
- Modify: `packages/linejs/client/features/call/session.ts`
- Test: `packages/linejs/client/features/call/planet/transport.test.ts` and session tests

**Interfaces:** Keep call public APIs stable. Bound RTP by packets/bytes; control queue overflow must fail the call explicitly while preserving order.

- [ ] Test RTP cap behavior: oldest stale media is discarded, queue remains within cap, newest packet remains available.
- [ ] Test control congestion does not silently discard/reorder and produces a visible call failure.
- [ ] Test repeated `sendStream` aborts release merged-signal listeners.
- [ ] Implement queue bounds and disposal in `finally`; document chosen limits and failure behavior.
- [ ] Run focused call tests, including existing transaction-correlation coverage for #198.

### Task 4: TMoreCompact parser hardening

**Files:**
- Modify: `packages/linejs/base/thrift/readwrite/tmc.ts`
- Test: adjacent TMC parser tests

**Interfaces:** Preserve valid wire format and public parser API; invalid, truncated, or over-limit input throws a bounded parse error.

- [ ] Add tests for oversized varints/counts, truncated payloads, and reuse of one parser instance across two inputs.
- [ ] Implement remaining-input checks before allocations/loops and reset all per-parse state.
- [ ] Run parser-focused tests and formatter.

### Task 5: Agent SSE and conversation memory bounds

**Files:**
- Modify: `packages/agent/client.ts`
- Modify: `packages/agent/line_ai.ts`
- Test: adjacent Agent tests

**Interfaces:** Keep streaming API stable; document a finite event limit and configurable history retention if configuration patterns support it.

- [ ] Test oversized unterminated SSE event rejection and reader cancellation when iteration ends early.
- [ ] Test long histories against the documented retention policy and verify request serialization remains bounded.
- [ ] Implement SSE byte cap, reader cancellation, and bounded AgentI history using the repository's existing configuration conventions.
- [ ] Run Agent-focused tests and touched-file formatting.

### Task 6: FileStorage measurement and targeted optimization

**Files:**
- Inspect/modify: `packages/linejs/base/storage/file.ts`
- Test: adjacent FileStorage tests; add a reproducible benchmark script only if current tooling supports it

**Interfaces:** Preserve `Storage` behavior, serialization format, ordering, and crash-safety guarantees.

- [ ] Measure repeated set/delete latency and memory against representative store sizes; record baseline methodology and results.
- [ ] If measurement confirms a material bottleneck, implement the smallest compatible optimization and regression tests; otherwise document why code changes are not justified.
- [ ] Verify persistence/reload and concurrent operation ordering.

### Task 7: Upstream issue reconciliation and repository-wide review

**Files:**
- Modify as justified: issue-related call/E2EE code and docs
- Review: all current tracked and untracked Vylinejs changes, package entry points, attribution and licenses

**Interfaces:** No upstream issue may be marked resolved without evidence; local release notes distinguish code fixes from unavailable live confirmation.

- [ ] Reconcile #198 reply transaction correlation with code and regression coverage; record whether live 1:1 verification is available.
- [ ] Reconcile #211 key-generation selection with current code and tests; preserve key history and report original-account verification status.
- [ ] Run independent subagent reviews of each changed subsystem and a separate final whole-diff review; resolve every release-blocking finding.
- [ ] Check attribution, license files, package metadata, docs links, and clean release notes for the LINEJS-base/Vyline provenance.

### Task 8: Verification and GitHub release

**Files:**
- Modify: root/package README and release notes as needed
- Create: fork-specific annotated tag and GitHub Release after gates pass

**Interfaces:** Release version and tag must be unique in `nezumi0627/Vylinejs`; package remains source-compatible unless existing metadata requires a documented compatibility-safe change.

- [ ] Run `deno test -A`, package entry-point `deno check`, touched-code lint/fmt, docs build, and `git diff --check`; compare lint against the recorded inherited baseline.
- [ ] Review final git status and release contents; exclude generated build output and secrets.
- [ ] Publish the GitHub Release with provenance, verification results, and explicit live-test limitations.
- [ ] Verify the published tag and release page from GitHub; only then report completion.
