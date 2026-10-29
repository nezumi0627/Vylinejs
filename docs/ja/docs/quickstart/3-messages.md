# 手順3：メッセージを受信する {#step-3-receive-messages}

継続的な待ち受けを開始する前に、イベントハンドラーを登録します。
この短いサンプルは、Talk チャットの `!ping` に応答します。

```ts
client.on("message", async (message) => {
	if (message.text === "!ping") {
		await message.reply("pong");
	}
});

client.listen({ talk: true, square: false });
```

QR ログインの手順の後に、`client` を作成したのと同じプログラム内でこのコードを使用してください。
イベントの種類、メッセージの編集、リアクション、終了処理の動作は、[メッセージとイベント](../message-event)を参照してください。

Square は引き継いだ旧来の API であり、積極的なサポートの対象ではありません。
アプリケーションがこの旧来の API を明確に必要とする場合を除き、無効のままにしてください。

<div class="vy-page-actions" id="continue">
  <a class="vy-page-button vy-page-button-primary" href="./4-next-steps">
    <span>次の手順 · 4</span>
    <strong>目的に合うガイドを選ぶ</strong>
  </a>
  <a class="vy-page-button" href="./2-login">
    <span>前の手順 · 2</span>
    <strong>QR コードでログイン</strong>
  </a>
</div>

保守担当者の署名：[nezumi0627](https://github.com/nezumi0627)
