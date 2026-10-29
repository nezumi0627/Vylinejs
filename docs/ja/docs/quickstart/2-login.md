# 手順2：QR コードでログインする {#step-2-log-in-with-qr}

アプリケーションに LINE のパスワードを持たせずに済むよう、QR ログインを使用します。
ライブラリはログイン用 URL と PIN を返します。
URL を QR コードとして表示する方法は、ホストアプリケーションが決めます。

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
