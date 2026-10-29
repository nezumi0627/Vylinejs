# AI 連携ガイド {#ai-integration-guide}

これは、`@nezumi0627/vylinejs` を組み込むコーディングアシスタントやその他の自動化ツール向けの、正式な段階的セットアップ手順です。
順番に従い、リンク先の Vylinejs ドキュメントまたはリポジトリのサンプルに示された API だけを使ってください。LINE プロトコルの動作を推測で作り出してはいけません。

## 1. 実行環境を確認する {#_1-identify-the-runtime}

Vylinejs は JSR で公開されている TypeScript ライブラリです。
対応するインストール方法には Deno、npm 互換の Node.js、Bun があります。
ドキュメントサイト自体のツールチェーンは Node.js/npm ですが、ライブラリの実行環境が変わるわけではありません。

## 2. パッケージをインストールする {#_2-install-the-package}

```sh
# Deno
deno add jsr:@nezumi0627/vylinejs

# npm / Node.js
npx jsr add @nezumi0627/vylinejs

# Bun
bunx jsr add @nezumi0627/vylinejs
```

npm では、JSR CLI が作成した `.npmrc` を保持してください。
パッケージのインポートには `@nezumi0627/vylinejs` を使います。新規プロジェクトでは `@evex/linejs` をインポートしないでください。

## 3. 認証方法を選ぶ {#_3-choose-authentication}

操作可能な LINE 端末がある場合は、QR ログインを優先してください。
アプリケーションは、`onReceiveQRUrl` が返す URL を QR コードとして表示し、`onPincodeRequest` の PIN を利用者に提示する必要があります。

```ts
import { loginWithQR } from "@nezumi0627/vylinejs";

const client = await loginWithQR({
	onReceiveQRUrl(url) { showQr(url); },
	onPincodeRequest(pin) { showPin(pin); },
}, { device: "IOSIPAD" });
```

上の `showQr` と `showPin` はアプリケーション側の関数であり、ライブラリがエクスポートするものではありません。
ログイン URL、PIN、認証トークン、セッションファイル、E2EE の鍵データをログに記録したりコミットしたりしてはいけません。
認証情報を永続化する前に[認証](../docs/auth)を読んでください。

## 4. Talk イベントハンドラーを追加する {#_4-add-a-talk-event-handler}

```ts
client.on("message", async (message) => {
	if (message.text === "!ping") await message.reply("pong");
});

client.listen({ talk: true, square: false });
```

`listen()` を呼ぶ前にハンドラーを登録してください。
アプリケーションがこの旧式でサポート対象外のサービスを意図して利用する場合を除き、Square は無効のままにします。
非同期イベントハンドラーの内部でエラーを捕捉してください。

## 5. 必要な場合だけセッションを永続化する {#_5-use-persistent-sessions-only-when-needed}

`loginWithStoredAuthToken()` と `FileStorage` については、[セッションの復元](../docs/start-2)を参照してください。
ストレージアダプターは機密性の高いセッションデータを書き込みます。非公開のパスを使い、ファイルシステムの権限を制限し、実行のたびに同じ永続ストレージアダプターを渡してください。

## 6. 機能ガイドを選ぶ {#_6-select-a-feature-guide}

- [メッセージとイベント](../docs/message-event)
- [音声通話](../docs/audio-call)
- [グループ通話](../docs/group-call)
- [ビデオ通話](../docs/video-call)
- [E2EE](../docs/e2ee)
- [API メソッド](../docs/methods)
- [機能の対応状況と実行時の制限](../docs/features)

通話対応は部分的で、ネットワークと端末に依存します。
動画 API はエンコード済みフレームを扱います。キャプチャーとエンコードはホストアプリケーションが担当します。
ブラウザーでの UDP 通話トランスポートはサポートしていません。
相互運用性を約束する前に、機能の対応状況を確認してください。

## 7. ソースで検証する {#_7-verify-against-source}

連携コードを書く前に、`packages/linejs/client` または現在の `example/` ファイルで、正確なメソッドシグネチャーを確認してください。
Vylinejs で名前や動作が変わっている可能性がある場合、LINEJS のドキュメントからメソッドを推測してはいけません。
Deno のサンプルには `deno check <example.ts>` を使い、選択した実行環境についてはリポジトリに記載されたコマンドを使ってください。

## プロジェクトの位置付け {#project-identity}

Vylinejs は、nezumi0627 が独立して保守する LINEJS ベースのライブラリです。
Vyline は別のアプリケーションで、移植可能な実装の知見を提供します。このパッケージの実行時依存関係ではありません。
コードの構成は、[DeepWiki とリポジトリのアーキテクチャ](./deepwiki)を参照してください。

メンテナー署名：[nezumi0627](https://github.com/nezumi0627)
