# グループ通話 {#group-calls}

グループ通話のルートとメディアを扱う API が用意されており、ルームへの参加、参加者の状態、ミックス済み音声の受信、エンコード済み映像の転送に対応しています。
API は完成した会議クライアントよりも低レベルです。
マイクやカメラからの取り込み、参加者の映像表示、参加を許可する相手の選択は行いません。

## サンプル {#example}

このコマンドのサンプルは、`!call` がグループと1対1のどちらのチャットで送信されたかを判別します。
グループの場合はグループ通話を開始するか既存の通話に参加し、同梱の WAV を送信します。

```sh
LINE_AUTH_TOKEN_FILE=/path/to/auth-token.txt \
LINE_DEVICE=ANDROID \
deno run -A example/call/call_on_command.ts
```

ソースコード：[`example/call/call_on_command.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/call_on_command.ts)。
グループ用の分岐と、`GroupCallRoute` および `CallSession` の使用方法は、現在の実装に照らして確認されています。
静的な確認だけでは、すべてのアカウントやクライアントで実際にグループ通話が相互接続できることは確認できません。

## 利用できる構成要素 {#available-building-blocks}

- `client.call.acquireGroupRoute(...)` は、LINE の通話サービスを通じてルートを取得します。
- `CallSession` は、グループ用ルートを受け取ってルームに参加します。
- `session.participants` は、参加者とメディアソースの最新の状態を公開します。
- `session.received()` は、トランスポートがグループ音声の受信に対応している場合、ミックス済みの 48 kHz PCM を返します。
- `session.receivedVideo()` は、映像のネゴシエーションと購読が行われている場合、エンコード済み VP8 フレームを返します。

プロトコルの詳細と現在のサポート上の注意点については、[通話とメディア](./call)および[機能のサポート状況](./features)を参照してください。
