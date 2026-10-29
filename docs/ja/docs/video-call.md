# ビデオ通話 {#video-calls}

Vylinejs は、映像のシグナリングとエンコード済み VP8 フレームの転送を提供します。
カメラ API、映像エンコーダー、描画機能、フレームの送出タイミングを決める方針、キーフレームのスケジューラーは提供しません。
アプリケーション側で完全な生の VP8 フレームを用意し、これらの処理を管理する必要があります。

| 通話方式 | 現在のライブラリの機能 | サンプル |
| --- | --- | --- |
| 1対1のビデオ通話 | `kind: "VIDEO"` を指定した `CallSession`、`setVideoEnabled()`、`sendVideo()` | [`example/call/video.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/video.ts) |
| グループのビデオ通話 | ルームへの参加、参加者の購読、エンコード済み VP8 の送受信 | [`example/call/call_on_command.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/call_on_command.ts) がグループ通話の準備を示します。カメラやフレームの入力は呼び出し側が実装します。 |

## エンコード済みの IVF ファイルを送信する {#send-a-pre-encoded-ivf-file}

このサンプルは、IVF ファイルから VP8 フレームを読み込み、公開されている通話セッション API を通じて送信します。
FFmpeg などの VP8 エンコーダーでファイルを準備してください。
最初のフレームはキーフレームである必要があります。
トランスポートに渡すのは、IVF ヘッダーや RTP パケットではなく、生の VP8 フレームのバイト列です。

```sh
ffmpeg -i input.mp4 -an -c:v libvpx -deadline realtime -cpu-used 8 \
  -g 30 -f ivf video.ivf
LINE_AUTH_TOKEN_FILE=/path/to/auth-token.txt \
LINE_CALL_TO=u0123456789abcdef \
deno run -A example/call/video.ts video.ivf
```

このサンプルは、現在の `PlanetTransport`、`CallSession`、`EncodedVideoFrame` のインターフェースに照らして静的に確認されています。
今回のドキュメント作成では、実際の相手との接続検証は行っていません。
互換性はサーバーと相手側とのネゴシエーションに依存します。

## 実行時にアプリケーションが行う処理 {#runtime-responsibilities}

1. `kind: "VIDEO"` と `PlanetTransport` を指定して `CallSession` を作成します。
2. `session.start()` と `session.setVideoEnabled(true)` の完了を待ちます。
3. 単調増加する 90 kHz のタイムスタンプを付けて、完全な VP8 フレームを渡します。
4. フレーム間予測を使うフレームより先にキーフレームを送信し、エンコード時のフレームレートに合わせて送出間隔を調整します。
5. 終了処理で `session.end()` を呼び出します。

音声のみの例は、[1対1の音声通話](./audio-call)を参照してください。
PLANET トランスポートの詳細は、[通話ガイド](./call)で説明しています。
