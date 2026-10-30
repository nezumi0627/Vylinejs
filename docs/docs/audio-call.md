# 1:1 audio calls

## What this covers

Vylinejs can acquire a call route, negotiate a one-to-one PLANET session, and send or receive SRTP audio. Audio input must be encoded as Opus; the library provides codec hooks and WAV/PCM helpers, but it does not capture a microphone or play sound itself.

| Capability | Status | Evidence |
| --- | --- | --- |
| Outgoing 1:1 audio | Implemented; live result depends on LINE account and network | [`example/call/call_on_command.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/call_on_command.ts) |
| Incoming 1:1 audio | Explicit opt-in answer helper | [`example/call/incoming.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/incoming.ts) |
| Browser audio transport | Unsupported | PLANET media requires UDP sockets |

## Try the outgoing example

The script listens for `!call` and calls the sender in a 1:1 Talk chat. It streams `example/call/unity.wav` unless a different WAV is passed.

```sh
LINE_AUTH_TOKEN_FILE=/path/to/auth-token.txt \
LINE_DEVICE=ANDROID \
deno run -A example/call/call_on_command.ts ./voice.wav
```

The example's audio path was checked against the current client API and call helpers. This is a static source check, not a claim that a live call was made during documentation review. See the [call notes](./call) for signaling, media keys, and troubleshooting detail.

## Incoming audio

Use [`answerIncoming`](../INCOMING_AUDIO) only after applying your own admission policy. The library does not auto-answer. The provided helper requires a caller approval callback, closes the transport in `finally`, and supports cancellation with `AbortSignal`.

## Limits

Account state, device identity, peer client, codec, and network affect live-call success. Review the [latest call verification notes](../VYLINEJS_STABILITY) before depending on a specific device path. Keep the call transport open only for the call lifetime and always close it during cleanup.
