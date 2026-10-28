# Vylinejs stability notes

Vylinejs keeps LINEJS as its protocol and API base. These safeguards bound
long-running queues and external input while keeping Talk/Square event order
and E2EE key history intact.

## Runtime limits

| Area | Limit and overflow behavior |
| --- | --- |
| Talk/Square push events | At most 200 pending events per stream. Producers wait for consumption; queued events survive reader cancellation and stream restart. Shutdown rejects blocked producers so the server can replay events whose revision was not advanced. |
| PLANET control messages | 256 queued messages. Overflow ends the call and reports `control_queue_overflow`. |
| PLANET and Andromeda audio/RTP | 100 queued packets and 1 MiB per transport. Oldest stale packets are dropped; an oversized packet is discarded. Andromeda receive waiters are released on close. |
| PLANET video receive work | 128 pending packets and 1 MiB per serial queue. Old queued video work is discarded first to keep playback current. |
| Decoded video frames | At most 30 queued frames; the oldest frame is discarded when full. |
| Agent I / LINE AI SSE | At most 1 MiB per event. Early iteration exit cancels the underlying reader. |
| Agent I conversation | At most 40 messages by default; `maxHistoryMessages` can lower or raise this cap. User text and accumulated assistant text are limited to 1 MiB each. |
| LINE AI JSON responses | At most 4 MiB; larger responses are canceled and rejected. |
| TMoreCompact | Varints are limited to 10 bytes/uint64; field bitmaps stop at supported field IDs below 30; declared strings, tables, collections, maps, and headers must fit the remaining input. Parser state resets on reuse. |

E2EE key generations are retained for historical decryption. No automatic key
eviction is performed.

## FileStorage measurement

Run `deno run -A scripts/bench-file-storage.ts` to measure 30 reads and 5
writes against a temporary JSON file containing 50,000 keys. On Deno 2.7.14 /
Windows, the original implementation was measured once; the optimized version
uses the median of three runs:

| Operation | Before cache | After cache |
| --- | ---: | ---: |
| `get` average | 39.56 ms | 0.20 ms |
| `set` average | 73.98 ms | 20.75 ms |

These are single-machine microbenchmarks, not production workload guarantees.
Reads use an in-process snapshot and check file metadata for external edits;
writes preserve the JSON format and atomically replace the file. On POSIX,
construction and every write restrict the credential file to owner read/write
(mode `0600`), including files that were previously more permissive.
For five updates in a 50,000-key file, five individual writes averaged 16.0 ms
each (about 80 ms total); `FileStorage.setMany()` committed the same five
updates in 15.9–16.5 ms across two runs. At 1,000 keys, five writes averaged
1.41 ms each and the batch took 2.00 ms. The batch preserves the JSON file and
uses one atomic replacement; encrypted storage batches encryption before
delegating to its backing store. Complete login credential writes and paired
E2EE group-key records use the batch API when available; older duck-typed
storage adapters retain their sequential-write fallback.

Storage migration previously called `set()` once per key. Migrating a
MemoryStorage snapshot into FileStorage took 330.56 ms for 250 keys and
1,194.11 ms for 1,000 keys. After routing the three built-in migration methods
through `setMany()`, it took 3.11 ms and 5.38–7.71 ms, respectively. A
10,000-key batch completed in 21.22 ms. Reproduce with
`deno run -A scripts/bench-storage-migrate.ts [keyCount]`.

## Performance experiments

Thrift serializer experiment (Deno 2.7.14 / Windows, 10,000 compact-protocol
messages, 1,000 warm-up calls, five measured runs): writing chunks directly to
the final output buffer took a median 297.06 ms versus 279.47 ms with the
existing `Buffer.concat` path. The runs overlapped and the candidate was slower,
so the change was reverted. Re-run `deno run -A scripts/bench-thrift-encode.ts`
before repeating this experiment.

PLANET decode experiment (same runtime, 20,000 representative INFO_REQ packets,
2,000 warm-up calls, five runs): the former outer-field parse plus message parse
had an 86.44 ms median; the single message parse had a 77.04 ms median (10.9%
less time). Debug-only structural decoding remains available when a debug hook
is configured. Re-run `deno run -A scripts/bench-planet-decode.ts` to compare.

EVS3 reassembly experiment (Deno 2.7.14 / Windows, 64,000-byte VP8 frame,
1,000-byte fragments, 500 frames per run, five runs): the current assembler
had a 54.98 ms median. Caching parsed fragment offsets reduced repeated parsing
in the code, but repeated candidate medians ranged from 53.11 to 54.20 ms and
an earlier run measured 72.80 ms. This was within run-to-run noise, so the
candidate was reverted. The reproducible workload is
`deno run -A scripts/bench-evs3.ts`; the assembler round-trip regression test is
`packages/linejs/client/features/call/planet/evs3.test.ts`.

## Upstream issue status

- [LINEJS #198](https://github.com/evex-dev/linejs/issues/198): the reply
  transaction and remote-release changes are in upstream
  [PR #241](https://github.com/evex-dev/linejs/pull/241), merged 2026-10-10,
  and included in this fork's base. Synthetic UDP/SRTP regressions pass. The
  reported 60-second live result used an experimental JavaScript vendor; a
  separate live phone call using the upstream TypeScript implementation has
  not been confirmed, so the issue remains open.
- [LINEJS #211](https://github.com/evex-dev/linejs/issues/211): upstream
  [PR #236](https://github.com/evex-dev/linejs/pull/236), merged 2026-09-06,
  includes generation-aware group-key lookup and the multi-entry E2EE login
  keychain repair. The regression cases pass locally, but the original
  reporter's account remains unverified. Preserve historical key material;
  do not force key registration or clear storage.
- These are the only open LINEJS issues in the 2026-10-29 check. Open upstream
  pull requests: none. The unresolved account/device confirmations require
  access to the affected account or a real phone pair; synthetic tests cannot
  establish those results.
