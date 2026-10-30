# メソッド {#methods}

## Talk のメソッド {#talk-methods}

低レベルの TalkService メソッドは、すべて `client.base.talk` から利用できます。

使用例：

```ts
await client.base.talk.sendMessage({
    to: "u...",
    text: "Hello, Vylinejs!",
    e2ee: true,
});
```

この例は、テキストメッセージを e2ee で暗号化してユーザーに送信します。

## LIFF {#liff}

`client.liff.sendLiff()` は、検証済みの LIFF メッセージを最大 5 件まで送信します。
1 件なら `client.liff.shareMessage()`、複数件なら `client.liff.shareMessages()` も使えます。
`liffId` でクライアントの既定値以外の LIFF アプリを選べます。
`forceIssue` はトークンを再発行し、`tryConsent` は同意フローを制御します。

```ts
import { liff } from "@nezumi0627/vylinejs";

await client.liff.sendLiff({
	to: "u-recipient-mid",
	messages: [
		liff.text("こんにちは", {
			label: "Vylinejs",
			iconUrl: "https://example.com/avatar.png",
		}),
	],
	tryConsent: true,
});
```

テキストの `sentBy` は任意の表示用送信者情報です。
認証済みアカウントを変更するものではありません。
LIFF の共有には制限があり、仕様も変わる可能性があります。
API の成功は相手への配信を保証しません。
利用前に[機能状況と LIFF の注意](./features#liff-message-sharing)を確認してください。

## Square のメソッド {#square-methods}

Square/OpenChat のメソッドは LINEJS から引き継いだもので、旧来の API として残されています。
Vylinejs は Square を積極的にサポートしておらず、継続的な保守も約束していません。
以下の例は、既存のメソッドの形式のみを示します。

低レベルの SquareService メソッドは、すべて `client.base.square` から利用できます。

使用例：

```ts
await client.base.square.findSquareByInvitationTicket({
    request: {
        invitationTicket: "INVITATION_TICKET",
    },
});
```

この例は、招待コードから Square を取得します。

# BaseClient {#baseclient}

単純な API アクセスや独自のイベントハンドラーが必要な場合は、`BaseClient` を使用できます。

使用例：

```ts
import { BaseClient } from "@nezumi0627/vylinejs/base";


const client = new BaseClient({ device: "DESKTOPWIN", version: "9.7.0.3556" });
client.on("pincall", (pin) => {
});

client.on("qrcall", (qrUrl) => {
});

client.on("update:authtoken", (authToken) => {
});

await client.loginProcess.login({
	authToken: "...",
});

await client.loginProcess.login({
	email: "...",
	password: "...",
	pincode: "123456",
});

await client.loginProcess.login({
	qr: true,
});
await client.loginProcess.ready();

client.square // = SquareService
client.talk // = TalkService


// event polling
const polling = client.createPolling();

for await (const operation of polling.listenTalkEvents()) {
}

for await (const event of polling.listenSquareEvents()) {
}
```

# LINE の REST エンドポイントを直接呼び出す {#calling-line-rest-endpoints-directly}

アルバム（Moa）などの一部の LINE サブシステムは、Thrift ではなく LEGY プロキシを経由した HTTPS 上の JSON で通信します。
一方、Vylinejs の既定の `getHeader("GET")` ヘルパーは Thrift 向けであり、`accept: application/x-thrift` と `content-type: application/x-thrift` を設定します。
この既定値で JSON REST エンドポイントを呼び出すと、HTTP 200 とともに `{"code":102001,"message":"一時的なエラーが発生しました。"}` が返る場合があります。

REST リクエストを自分で組み立てる場合は、**両方のヘッダーを `application/json` に上書きしてください**。

```ts
const headers = {
  ...client.base.request.getHeader("GET"),
  accept: "application/json",
  "content-type": "application/json; charset=UTF-8",
  "X-Line-ChannelToken": token,
  "X-Line-Mid": client.base.profile!.mid,
};
const res = await client.base.fetch(url, {
  method: "POST",
  headers,
  body: new Uint8Array(),
  signal: AbortSignal.timeout(client.base.config.timeout),
});
if (!res.ok) throw new Error(`REST request failed: HTTP ${res.status}`);
const data = await res.json();
if (data.code !== undefined && data.code !== 0) {
  throw new Error(`REST request failed: code ${data.code}`);
}
```

[アルバムの操作](./moa.md)には `client.base.moa` を使用してください。
必要なヘッダーの設定と、HTTP エラーおよびアプリケーション側のエラーの確認を行います。

LINE VOOM は 2026-09-30 に終了しました。
LINE の案内によると、サービス終了に伴い、アクセス、投稿の閲覧と作成、投稿データの復元も終了しています（[公式のお知らせ](https://help2.line.me/line/smartphone?contentId=200000301&contentid=50000619&lang=ja)）。
Vylinejs はソースコードの互換性のため、旧 VOOM と Timeline のエクスポートを一時的に残していますが、非推奨としています。
これらはトークンの発行やリクエストの送信を行わず、直ちに失敗します。
これらのエンドポイントを代替するものはありません。

LINE 公式アカウントには別の「投稿」機能がありますが、旧 VOOM API とは異なり、このライブラリは代替機能として公開していません（[LINE for Business のお知らせ](https://www.lycbiz.com/jp/news/line-official-account/20260715/)）。
