# メッセージイベント {#message-events}

`client.listen()` を開始する前にリスナーを登録してください。
Talk のメッセージは、ライブラリによる解析と E2EE 復号の試行後に `message` イベントで届きます。

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

イベントエミッターは、非同期ハンドラーが返す Promise の完了を待ちません。
送信失敗が未処理の Promise 拒否にならないように、各 `async` リスナー内で拒否を捕捉してください。

## 編集されたメッセージ {#edited-messages}

編集は、新しい `message` ではなく `message:edit` として通知されます。
イベントには元のメッセージ ID が保持されるため、その ID のキャッシュ済みメッセージを更新してください。
イベントに編集メタデータが含まれる場合は、`isEdited` と `updatedTime` から取得できます。

```ts
client.on("message:edit", (message) => {
	console.log(message.raw.id, "edited:", message.text);
});
```

Vylinejs は編集イベントの受信に対応しています。
このイベントは、メッセージを編集する書き込みメソッドを提供するものではありません。

## その他のイベント {#other-events}

- `event`：未加工の Talk オペレーション。
- `call:incoming` と `call:cancel`：解析済みの着信通知。リスナーを登録しても通話には応答しません。
- `square:event` と `square:message`：上流から引き継いだ旧来の Square イベント。Vylinejs は Square を積極的にサポートしていません。

アプリケーション終了時に待ち受けを停止するには、`client.listen()` に `AbortSignal` を渡してください。
リスナーが動作している間に、2つ目のリスナーを開始しないでください。

E2EE の状態の永続化は[認証](./auth.md)を、旧来のサービスの制限は[機能のサポート状況](./features.md)を参照してください。
