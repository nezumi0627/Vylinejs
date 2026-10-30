# Message events

Register listeners before starting `client.listen()`. Talk messages arrive through the `message` event after the library has parsed and attempted E2EE decryption.

```ts
client.on("message", async (message) => {
	console.log({
		from: message.from.id,
		chat: message.to.id,
		text: message.text,
		isMyMessage: message.isMyMessage,
	});

	if (message.text === "!ping") {
		try {
			await message.reply("pong");
		} catch (error) {
			console.error("Reply failed:", error);
		}
	}
});

client.listen({ talk: true, square: false });
```

The emitter does not wait for promises returned by asynchronous handlers. Catch rejected promises inside each `async` listener so a failed send does not become an unhandled rejection.

## Edited messages

Edits are emitted as `message:edit`, not as a new `message`. The event retains the original message ID; update the cached message with that ID. `isEdited` and `updatedTime` expose edit metadata when it is present in the event.

```ts
client.on("message:edit", (message) => {
	console.log(message.raw.id, "edited:", message.text);
});
```

Vylinejs supports receiving edit events. This event does not provide an edit-message write method.

## Other events

- `event`: raw Talk operation.
- `call:incoming` and `call:cancel`: parsed incoming-call notifications. Listening does not answer a call.
- `square:event` and `square:message`: inherited legacy Square events. Square is not actively supported by Vylinejs.

Pass an `AbortSignal` to `client.listen()` to stop listening when the application shuts down. Do not start a second listener while one is active.

See [authentication](./auth.md) for persistent E2EE state and [feature status](./features.md) for legacy service limits.
