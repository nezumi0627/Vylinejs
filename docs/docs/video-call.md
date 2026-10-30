# Video calls

Vylinejs exposes video signaling and encoded VP8 frame transport. It does not provide a camera API, video encoder, renderer, frame pacing policy, or keyframe scheduler. The application must supply complete raw VP8 frames and manage those responsibilities.

| Path | Current library surface | Example |
| --- | --- | --- |
| One-to-one video | `CallSession` with `kind: "VIDEO"`, `setVideoEnabled()`, and `sendVideo()` | [`example/call/video.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/video.ts) |
| Group video | Room join, participant subscriptions, and encoded VP8 receive/send | [`example/call/call_on_command.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/call_on_command.ts) covers group-call setup; camera/frame input remains caller-owned |

## Send a pre-encoded IVF file

The example reads VP8 frames from an IVF file and sends them through the public call session API. Prepare the file with a VP8 encoder such as FFmpeg. The first frame must be a key frame. The transport expects raw VP8 frame bytes, not IVF headers or RTP packets.

```sh
ffmpeg -i input.mp4 -an -c:v libvpx -deadline realtime -cpu-used 8 \
  -g 30 -f ivf video.ivf
LINE_AUTH_TOKEN_FILE=/path/to/auth-token.txt \
LINE_CALL_TO=u0123456789abcdef \
deno run -A example/call/video.ts video.ivf
```

This example is statically checked against the current `PlanetTransport`, `CallSession`, and `EncodedVideoFrame` interfaces. It has not been verified against a live peer in this documentation build. Compatibility depends on server and peer negotiation.

## Runtime responsibilities

1. Create a `CallSession` with `kind: "VIDEO"` and a `PlanetTransport`.
2. Await `session.start()` and `session.setVideoEnabled(true)`.
3. Feed complete VP8 frames with monotonically increasing 90 kHz timestamps.
4. Send a key frame before inter frames and pace them for the encoded frame rate.
5. Call `session.end()` in cleanup.

Use [1:1 audio calls](./audio-call) for an audio-only example. The deeper [call guide](./call) documents PLANET transport details.
