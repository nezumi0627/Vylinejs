# Vylinejs Stabilization and First Release

**Status:** Proposal for implementation
**Date:** 2026-10-27
**Workspace:** `E:\projects\Vylinejs`

## Intent

Prepare Vylinejs as a releaseable LINEJS-based library that incorporates portable
protocol work from Vyline and tqmane's Vyline API. Keep the repository as one
cohesive package tree with LINEJS as the protocol/API foundation. Improve
long-running stability and throughput, resolve code-addressable findings from
LINEJS's open issues, review the whole current tree, and publish a GitHub
release after tests and independent review.

## Current evidence

- `evex-dev/linejs` currently has two open issues (#198 1:1 call T103 timeout;
  #211 account-specific E2EE group decryption) and zero open pull requests.
- Local code already echoes request transaction IDs for PLANET replies and
  contains the keychain-history fixes associated with #211. The original
  reporter's live account confirmation for #211 is still unavailable.
- Initial `deno test -A`: 386 passed, 0 failed.
- Initial `deno lint`: 1001 findings across 272 files, including inherited and
  generated code. Fix issues in changed/release-critical code and record the
  remaining baseline; do not mass-reformat generated or unrelated upstream code.
- Read-only reviews found unbounded push-event and RTP queues, incomplete abort
  cleanup, an unbounded SquareChat initial sync, TMoreCompact input-size gaps,
  unbounded AgentI SSE/history growth, and FileStorage's full-file read/parse/
  rewrite path. These are hypotheses to verify against tests and lifecycle
  behavior before changing implementation.

## Goals

1. Bound memory used by push, call media/control, SSE, and conversation history
   without silently dropping durable chat events or key history.
2. Ensure abort, close, cancellation, and error paths release listeners, timers,
   readers, sockets, and polling state, and allow documented restart behavior.
3. Reject malformed or oversized TMoreCompact inputs before allocation or long
   loops; make parser reuse deterministic.
4. Measure storage and serialization hot paths before optimizing them, and keep
   persistence behavior, ordering, and crash safety intact.
5. Resolve local code defects related to #198/#211; report upstream live-account
   or device verification separately and do not close upstream issues without
   evidence or maintainer authorization.
6. Review all repository packages and current local changes with independent
   subagents; add focused regression tests and meaningful performance checks.
7. Present Vylinejs as a LINEJS-based integration with clear source/license
   attribution and coherent release documentation.

## Design decisions for implementation

- Push event overflow must fail visibly or reconnect through a verified recovery
  path; Talk/Square operations must not be silently discarded. Use O(1) queue
  operations where a bounded queue is appropriate.
- Real-time media may discard stale packets under a documented cap so playback
  stays current. Control-plane messages must preserve ordering or fail the call
  visibly rather than being silently dropped.
- Keep E2EE private/public key generations needed for historical decryption.
  Persistent key-history growth is not fixed by unsafe eviction; only remove
  entries when protocol evidence proves they are no longer needed.
- Apply finite limits to untrusted protocol/SSE input. Limits must be based on
  existing wire constraints or exposed as documented options; test boundary and
  over-limit behavior.
- Preserve public API compatibility where practical. Breaking package/module
  renames are not part of the first GitHub release unless required by the
  existing repository identity and explicitly documented.
- Release target is the `nezumi0627/Vylinejs` GitHub repository. Do not publish
  to npm or JSR in this release; registry ownership and package-name migration
  are not specified.
- Do not claim a real LINE call, account-specific E2EE recovery, or universal
  compatibility from synthetic tests.

## Non-goals

- Splitting operation/maintenance features into another package.
- Silently changing or rotating user E2EE identities, deleting historical key
  material, or weakening message delivery guarantees to hide queue overflow.
- Rewriting generated Thrift output or fixing every inherited lint finding.
- Publishing to npm/JSR or changing package names without a separate migration
  decision.

## Acceptance criteria

- All open LINEJS issues and PRs are inventoried; every code-addressable issue
  has a fix or a written reason it cannot be verified locally.
- Queues and stream parsers have explicit, tested bounds and overflow behavior.
- Abort/close paths have regression coverage for repeated start/stop cycles.
- Full Deno test suite, package entry-point type checks, focused lint/format,
  docs build, and `git diff --check` pass.
- Independent whole-change review has no unresolved release-blocking findings.
- Release notes distinguish verified behavior from live-test limitations, list
  upstream/Vyline/tqmane provenance, and give a fork-specific version.
- GitHub release/tag is created only after the final review and verification.
