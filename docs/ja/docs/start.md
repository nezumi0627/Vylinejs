# はじめに {#get-started}

Vylinejs は、LINEJS を基にした非公式の LINE クライアントライブラリです。
従来のライブラリの利用手順を維持しつつ、独立して保守する修正と機能を追加しています。
非公式または旧来の LINE サービスに依存する前に、[機能とサポート状況](./features.md)を確認してください。

初回設定を順に進める場合は、全4ページの[インストール手順](./quickstart/1-install)から始めてください。

## インストール {#install}

`@nezumi0627/vylinejs` は JSR で公開しています。
Deno では直接インストールできます。
npm、Bun、および互換性のあるパッケージマネージャーでは、JSR の npm 互換レイヤーを利用できます。

```sh
# Deno
deno add jsr:@nezumi0627/vylinejs

# npm
npx jsr add @nezumi0627/vylinejs
# Or install directly through JSR's npm compatibility registry:
npm install @jsr/nezumi0627__vylinejs

# Bun
bunx jsr add @nezumi0627/vylinejs
```

npm 互換パッケージを使用するプロジェクトでは、JSR CLI の案内に従い、生成される `.npmrc` ファイルを保持してください。
Vylinejs の公開には JSR を使用するため、`npm publish` は使用しないでください。

## 初回ログイン {#first-login}

LINE のパスワードを保存せずに済むよう、QR ログインを選択してください。
ログイン処理は URL と PIN を返します。
アプリケーションで URL を QR コードとして表示し、LINE から入力を求められたら PIN を入力してください。

```ts
import { loginWithQR } from "@nezumi0627/vylinejs";

const client = await loginWithQR({
	onReceiveQRUrl(url) {
		console.log("Open or render this login URL:", url);
	},
	onPincodeRequest(pin) {
		console.log("Enter this PIN in LINE:", pin);
	},
}, {
	device: "IOSIPAD",
});

console.log((await client.getMyProfile()).displayName);
```

ライブラリはログイン用の URL を提供しますが、この例では QR コードの描画をアプリケーション側に任せています。
ログインコールバックで扱う情報は非公開にし、セッショントークンや E2EE 鍵データを出力しないでください。

## メッセージを受信する {#receive-messages}

継続的な待ち受けを開始する前に、イベントリスナーを登録してください。
アプリケーションに必要なストリームを指定し、`listen()` を1回呼び出します。

```ts
client.on("message", async (message) => {
	console.log(message.from.id, message.text);
	if (message.text === "!ping") await message.reply("pong");
});

client.listen({ talk: true, square: false });
```

上の例では Talk イベントを有効にしています。
Square イベントは引き継いだ旧来の API であり、Vylinejs は積極的にサポートしていません。
[サポート状況の表](./features.md#feature-status)を参照してください。

## 次に読むガイド {#next-steps}

- [パスワード、QR、保存済みセッションによる認証](./auth.md)を学ぶ。
- [機能のサポート状況と制限](./features.md)を確認する。
- [メッセージと編集イベント](./message-event.md)、[クライアントのオプション](./client-options.md)を確認する。
- [LINEJS、Vyline、Vylinejs の比較](../VYLINE_PORTING.md)を読む。

Vylinejs は LINE 株式会社と提携しておらず、同社の承認も受けていません。
API は非公式の LINE プロトコルの動作に依存しており、LINE がサービスを変更すると動作しなくなる可能性があります。
