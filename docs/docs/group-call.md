# Group calls

Group-call route and media APIs are present, including joining a room, participant state, mixed audio receive, and encoded video transport. The API is lower level than a complete meeting client: it does not capture microphones or cameras, render participant tiles, or choose who may join.

## Example

The command example detects whether `!call` was sent in a group or 1:1 chat. In a group it starts or joins the group call and streams the bundled WAV.

```sh
LINE_AUTH_TOKEN_FILE=/path/to/auth-token.txt \
LINE_DEVICE=ANDROID \
deno run -A example/call/call_on_command.ts
```

Source: [`example/call/call_on_command.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/call_on_command.ts). Its group branch, `GroupCallRoute`, and `CallSession` usage were checked against the current implementation. A static check does not confirm live group-call interoperability for every account or client.

## Available building blocks

- `client.call.acquireGroupRoute(...)` acquires the route through the LINE call service.
- `CallSession` accepts a group route and joins the room.
- `session.participants` exposes the latest participant and media-source state.
- `session.received()` yields mixed 48 kHz PCM when the transport supports group audio receive.
- `session.receivedVideo()` yields encoded VP8 frames when video is negotiated and subscribed.

For protocol details and current support caveats, see [Calls and media](./call) and [feature status](./features).
