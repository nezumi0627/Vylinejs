# Vylinejs stability notes

Vylinejs keeps LINEJS as its protocol and API base. These safeguards bound
long-running queues and external input while keeping Talk/Square event order
and E2EE key history intact.

## Runtime limits

| Area | Limit and overflow behavior |
| --- | --- |
| Talk/Square push events | At most 200 pending events per stream. Producers wait for consumption; queued events survive reader cancellation and stream restart. Shutdown rejects blocked producers so the server can replay events whose revision was not advanced. |
| PLANET control messages | 256 queued messages. Overflow ends the call and reports `control_queue_overflow`. |
| PLANET and Andromeda audio/RTP | 100 queued packets and 1 MiB per transport. Oldest stale packets are dropped; an oversized packet is discarded. Andromeda SIP waiters are removed on timeout and rejected on close. |
| PLANET video receive work | 128 pending packets and 1 MiB per serial queue. Old queued video work is discarded first to keep playback current. |
| Decoded video frames | At most 30 queued frames; the oldest frame is discarded when full. |
| Agent I / LINE AI SSE | At most 1 MiB per event. Early iteration exit cancels the underlying reader. |
| Agent I conversation | At most 40 messages by default; `maxHistoryMessages` can lower or raise this cap. User text and accumulated assistant text are limited to 1 MiB each. |
| LINE AI JSON responses | At most 4 MiB; larger responses are canceled and rejected. |
| TMoreCompact | Varints are limited to 10 bytes/uint64; field bitmaps stop at supported field IDs below 30; declared strings, tables, collections, maps, and headers must fit the remaining input. Parser state resets on reuse. |

E2EE key generations are retained for historical decryption. No automatic key
eviction is performed.

LIFF send-token caching is scoped to account MID, LIFF ID, and recipient, with
a 128-entry LRU bound to cap memory on long-running clients.

LINE VOOM ended on 2026-09-30. Its old `client.voom`, `client.voomRest`, and
`client.base.timeline` APIs remain temporarily for source compatibility, are
marked deprecated, and now fail immediately without issuing tokens or making
network requests. Remove their use from applications; there is no replacement
service announced. See [LINE's official shutdown notice](https://help2.line.me/line/smartphone?contentId=200000301&contentid=50000619&lang=ja).
The compatibility exports are planned for removal in a future major version.
Generated protocol enums and fields remain where needed to decode historical
LINE data.

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

Thrift serializer (Deno 2.7.14 / Windows, 10,000 compact-protocol messages,
1,000 warm-up calls, five measured runs): direct chunk-to-output copying removes
the intermediate concatenated body and second full-body copy. One measured
comparison was 309 ms before and 313 ms after, within run-to-run noise; no
throughput improvement is claimed. This change targets peak buffering and copy
count. Re-run `deno run -A scripts/bench-thrift-encode.ts` to compare.

PLANET decode experiment (same runtime, 20,000 representative INFO_REQ packets,
2,000 warm-up calls, five runs): the former outer-field parse plus message parse
had an 86.44 ms median; the single message parse had a 77.04 ms median (10.9%
less time). Debug-only structural decoding remains available when a debug hook
is configured. Re-run `deno run -A scripts/bench-planet-decode.ts` to compare.

EVS3 reassembly (Deno 2.7.14 / Windows, 64,000-byte VP8 frame, 1,000-byte
fragments, 500 frames per run, five runs): reusing the descriptor already
parsed by `Evs3Assembler.push()` reduced the median from 59.0 ms to 54.8 ms
(about 7%). The previous offset-caching experiment had no robust gain and was
reverted. Reproduce with `deno run -A scripts/bench-evs3.ts`.

SRTP packet processing (Deno 2.7.14 / Windows, 1,000 160-byte RTP packets,
encrypt plus decrypt, five measured runs): static crypto imports and synchronous
internal AES-CM processing reduced a paired-run median from 53.5 ms to 44.0 ms
(about 18%). Results vary by run; reproduce with
`deno run -A scripts/bench-srtp.ts 1000`.

LEGY request encryption (Deno 2.7.14 / Windows, 1 KiB request bodies, 1,000
mocked requests per run, two warm-ups and five measured runs; empty mocked
responses): removing intermediate copies during header/payload assembly and
wrapping the encrypted bytes as a view brought two run medians from
116.1/111.9 ms to 97.3/97.1 ms (about 13–16%). The
benchmark measures the request encryption path without network latency or
response decryption. Reproduce with `deno run -A scripts/bench-legy.ts 1000`.

The SRTP packet path now passes typed-array views directly to Node crypto,
removing per-packet `Buffer.from()` copies for keys, payloads, and HMAC input,
plus the intermediate `Buffer.concat()` and output copy. Against the previous
implementation, two 1,000-packet paired-run medians improved from 37.1/38.9 ms
to 33.3/32.6 ms (about 10–16%). These local microbenchmarks are sensitive to
runtime load; reproduce with `deno run -A scripts/bench-srtp.ts 1000`.

Compact text encoding (Deno 2.7.14 / Windows, 500 encodes per run, five runs)
now measures UTF-8 length before choosing an encoding, then allocates only the
selected representation. For 13,000 ASCII characters, the median fell from
56.8 ms to 22.6 ms; for 7,000 Japanese characters, from 70.4 ms to 25.0 ms;
and for mixed text, from 70.0 ms to 33.6 ms. Reproduce with
`deno run -A scripts/bench-compact-text.ts`.

Group audio mixing now validates decoded PCM in one pass and removes expired
jitter chunks in place. The transport skips receive/RTP debug-record creation
when no debug callback is configured. Andromeda removes timed-out SIP waiters
and cancels them on close. These paths have regression coverage; no separate
throughput claims are made for them.

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
