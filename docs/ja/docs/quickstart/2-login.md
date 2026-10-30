# 手順2：QR コードでログインする {#step-2-log-in-with-qr}

この手順は、Vylinejs のインストール後に行います。
QR ログインを使うと、LINE のパスワードをライブラリに渡さずにログインできます。

1. `loginWithQR()` がログインを開始します。
2. `onReceiveQRUrl` で受け取った URL を、アプリ内で QR コードとして表示します。Vylinejs は URL を返しますが、QR 画像の生成や表示は行いません。
3. `onPincodeRequest` で PIN を利用者に表示し、LINE での確認を促します。確認が終わると、関数からログイン済みのクライアントが返ります。

```ts
import { loginWithQR } from "@nezumi0627/vylinejs";

const client = await loginWithQR({
	onReceiveQRUrl(url) {
		console.log("Render this URL as a QR code:", url);
	},
	onPincodeRequest(pin) {
		console.log("Enter this PIN in LINE:", pin);
	},
}, {
	device: "IOSIPAD",
});

console.log((await client.getMyProfile()).displayName);
```

コールバック内の `console.log` は、アプリ側の画面表示に置き換える箇所です。
最後の行はログイン完了後にプロフィールを取得し、認証済みクライアントが使えることを確認します。

ログイン用 URL、PIN、認証トークン、保存済みセッションは公開しないでください。
繰り返し実行できるローカルの例と、セッション復元の選択肢については、[認証ガイド](../auth)を参照してください。

<div class="vy-page-actions" id="continue">
  <a class="vy-page-button vy-page-button-primary" href="./3-messages">
    <span>次の手順 · 3</span>
    <strong>メッセージを受信</strong>
  </a>
  <a class="vy-page-button" href="./1-install">
    <span>前の手順 · 1</span>
    <strong>Vylinejs をインストール</strong>
  </a>
</div>

保守担当者の署名：[nezumi0627](https://github.com/nezumi0627)
