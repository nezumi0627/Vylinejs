# Features and support status

Vylinejs is a protocol library, not a bundled chat application. The table describes the current library surface and its maintenance status, not a guarantee that LINE's servers will continue to accept an unofficial protocol.

## Feature status

| Feature | Status | Notes |
| --- | --- | --- |
| Password and QR login | Supported | QR rendering belongs to the host application. LINE may impose account/device checks. |
| Stored-session restore | Supported | Refreshes saved sessions and persists rotated credentials through the supplied storage adapter. |
| E2EE message handling | Supported with account-specific limits | Historical key generations are retained. Certain existing accounts may still have identity/key material that cannot be verified locally. |
| Talk messages and events | Supported | `client.listen()` supports abort through `AbortSignal`; handlers should catch their own rejected promises. |
| LIFF | Supported where LINE endpoints allow | Includes message sharing, consent retry behavior, and view issuance. See the current methods in the generated package docs. |
| Album/Moa | Supported | Uses LINE's Album REST endpoints through LEGY. API changes on LINE's side may affect it. |
| 1:1 call/media helpers | Partial | Signaling and media helpers are implemented; live support varies by device and network. Check [call verification notes](../VYLINEJS_STABILITY.md) before relying on a specific path. |
| Group calls | Partial | Group route, audio, roster, and video building blocks are implemented; live peer compatibility is not guaranteed. See [group calls](./group-call). |
| Video calls | Partial | The library sends and receives encoded VP8 frames. Camera capture, encoding, display, and live interoperability remain caller/runtime responsibilities. See [video calls](./video-call). |
| Square/OpenChat | Legacy, not actively supported | Retained from LINEJS for compatibility. Vylinejs is not committing to routine Square maintenance or new Square feature work. |
| LINE VOOM/Timeline | Unavailable | VOOM ended on 2026-09-30. Compatibility APIs are deprecated and fail before making a request. No replacement endpoint is provided. |
| Browser runtime | Unsupported for UDP call media | The call transport uses UDP sockets. Other browser use is not part of the verified runtime matrix. |

## Runtimes

The library is developed and tested with Deno 2.7.14. Node.js 24 is used for the transport compatibility check. JSR provides an npm-compatible package for Node.js, npm, and Bun workflows, but the project does not run a full test matrix on every runtime and version. The documentation site uses Node.js and npm. Browser UDP is not available for call transport.

## Feature guides and source examples

| Feature | Guide | Source example |
| --- | --- | --- |
| Login and sessions | [Authentication](./auth) | [`example/talk/ping.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/talk/ping.ts) |
| Talk messages and events | [Messages and events](./message-event) | [`example/talk/all_methods.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/talk/all_methods.ts) |
| 1:1 audio calls | [Audio calls](./audio-call) | [`example/call/call_on_command.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/call_on_command.ts) |
| Group calls | [Group calls](./group-call) | [`example/call/call_on_command.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/call_on_command.ts) |
| Video calls | [Video calls](./video-call) | [`example/call/video.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/video.ts) |
| Incoming calls | [Incoming calls](../INCOMING_AUDIO) | [`example/call/incoming.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/incoming.ts) |
| E2EE | [E2EE and stored keys](./e2ee) | [API and source comparison](../VYLINE_PORTING#e2ee-and-login-parity) |
| Album / Moa | [Album guide](./moa) | [`example/moa/list-albums.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/moa/list-albums.ts) |

## Performance claims

Vylinejs improves specific measured paths such as file storage, message encoding, packet processing, and buffer copies. Measurements are local microbenchmarks with stated inputs, not whole-application latency or a promise that every workload is faster than LINEJS. The [stability notes](../VYLINEJS_STABILITY.md) list the benchmark environment, results, and reproduction commands.

## Service changes and data safety

LINE controls the services and protocol. A service can be changed or retired without notice. Keep credentials and E2EE keys in a private storage location, make backups before changing login devices, and do not clear historical E2EE keys to troubleshoot a decryption failure. See [authentication and session storage](./auth.md) for credential handling.
