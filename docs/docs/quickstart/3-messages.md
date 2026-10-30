# Step 3: Receive messages

Register event handlers before starting the long-running listener. This small
example responds to `!ping` in Talk chats.

```ts
client.on("message", async (message) => {
	if (message.text === "!ping") {
		await message.reply("pong");
	}
});

client.listen({ talk: true, square: false });
```

Use this after the QR login step, in the same program where `client` was
created. For the event types, message edits, reactions, and cleanup behavior,
see [Messages and events](../message-event).

Square is an inherited legacy API and is not actively supported. Keep it
disabled unless an application specifically needs that legacy surface.

<div class="vy-page-actions" id="continue">
  <a class="vy-page-button vy-page-button-primary" href="./4-next-steps">
    <span>Next step · 4</span>
    <strong>Choose your next step</strong>
  </a>
  <a class="vy-page-button" href="./2-login">
    <span>Previous step · 2</span>
    <strong>Log in with QR</strong>
  </a>
</div>

Maintainer signature: [nezumi0627](https://github.com/nezumi0627)
