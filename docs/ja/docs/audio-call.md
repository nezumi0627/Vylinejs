# 1対1の音声通話 {#_1-1-audio-calls}

## 対応する処理 {#what-this-covers}

Vylinejs は、通話ルートの取得、1対1の PLANET セッションのネゴシエーション、SRTP 音声の送受信に対応しています。
音声入力は Opus でエンコードする必要があります。
ライブラリはコーデックを接続するためのフックと WAV/PCM ヘルパーを提供しますが、マイクからの録音や音声の再生は行いません。

| 機能 | 状況 | 参照先 |
| --- | --- | --- |
| 1対1の音声通話の発信 | 実装済み。実際の動作は LINE アカウントとネットワークに依存 | [`example/call/call_on_command.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/call_on_command.ts) |
| 1対1の音声通話の着信 | 明示的な許可を必要とする応答ヘルパーを提供 | [`example/call/incoming.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/incoming.ts) |
| ブラウザーでの音声トランスポート | 非対応 | PLANET のメディア通信には UDP ソケットが必要 |

## 発信のサンプルを試す {#try-the-outgoing-example}

このスクリプトは `!call` を待ち受け、1対1の Talk チャットでコマンドの送信者に発信します。
別の WAV ファイルを指定しない場合は、`example/call/unity.wav` を送信します。

```sh
LINE_AUTH_TOKEN_FILE=/path/to/auth-token.txt \
LINE_DEVICE=ANDROID \
deno run -A example/call/call_on_command.ts ./voice.wav
```

このサンプルの音声処理は、現在のクライアント API と通話ヘルパーに照らして確認されています。
これはソースコードの静的な確認であり、ドキュメントのレビュー時に実際の通話を行ったことを示すものではありません。
シグナリング、メディア鍵、トラブルシューティングの詳細は、[通話の解説](./call)を参照してください。

## 音声通話の着信に応答する {#incoming-audio}

[`answerIncoming`](../INCOMING_AUDIO) を使用する前に、アプリケーション独自の着信許可ポリシーを適用してください。
ライブラリが自動で応答することはありません。
このヘルパーは発信者を承認するコールバックを必須とし、`finally` でトランスポートを閉じ、`AbortSignal` によるキャンセルに対応します。

## 制限 {#limits}

実際の通話が成功するかどうかは、アカウントの状態、端末の識別情報、相手側のクライアント、コーデック、ネットワークに左右されます。
特定の端末での動作に依存する前に、[最新の通話検証に関する注記](../VYLINEJS_STABILITY)を確認してください。
トランスポートは通話中にのみ開き、終了処理で必ず閉じてください。
