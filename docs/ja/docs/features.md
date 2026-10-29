# 機能とサポート状況 {#features-and-support-status}

Vylinejs はプロトコルライブラリであり、チャットアプリケーションを同梱していません。
以下の表は、現在のライブラリの機能と保守状況を示すものです。
LINE のサーバーが非公式プロトコルを今後も受け入れることを保証するものではありません。

## 機能の対応状況 {#feature-status}

| 機能 | 状況 | 注記 |
| --- | --- | --- |
| パスワードと QR によるログイン | 対応 | QR コードの描画はホストアプリケーションが行います。LINE がアカウントや端末の確認を求める場合があります。 |
| 保存済みセッションの復元 | 対応 | 保存済みセッションを更新し、更新後の認証情報を指定されたストレージアダプターに保存します。 |
| E2EE メッセージの処理 | アカウント固有の制限付きで対応 | 過去の世代の鍵を保持します。一部の既存アカウントでは、識別情報や鍵データをローカルで検証できない場合があります。 |
| Talk のメッセージとイベント | 対応 | `client.listen()` は `AbortSignal` による停止に対応します。ハンドラー内で Promise の拒否を捕捉してください。 |
| LIFF | LINE のエンドポイントが許可する範囲で対応 | メッセージの共有、同意処理の再試行、ビューの発行を含みます。現在のメソッドは生成されたパッケージドキュメントを参照してください。 |
| アルバム/Moa | 対応 | LEGY 経由で LINE のアルバム REST エンドポイントを使用します。LINE 側の API 変更の影響を受ける可能性があります。 |
| 1対1の通話とメディアのヘルパー | 一部対応 | シグナリングとメディアのヘルパーは実装済みです。実際の動作は端末とネットワークにより異なります。特定の処理に依存する前に[通話検証に関する注記](../VYLINEJS_STABILITY.md)を確認してください。 |
| グループ通話 | 一部対応 | グループ用ルート、音声、参加者一覧、映像の構成要素は実装済みです。実際の相手との互換性は保証されません。[グループ通話](./group-call)を参照してください。 |
| ビデオ通話 | 一部対応 | エンコード済み VP8 フレームを送受信します。カメラからの取り込み、エンコード、表示、実際の相互接続は呼び出し側とランタイムが担います。[ビデオ通話](./video-call)を参照してください。 |
| Square/OpenChat | 旧来の API として保持。積極的なサポートの対象外 | 互換性のため LINEJS から保持しています。Vylinejs は Square の継続的な保守や新機能の開発を約束していません。 |
| LINE VOOM/Timeline | 利用不可 | VOOM は 2026-09-30 に終了しました。互換 API は非推奨で、リクエストの送信前に失敗します。代替エンドポイントは提供しません。 |
| ブラウザーでの実行 | UDP による通話メディアは非対応 | 通話トランスポートは UDP ソケットを使用します。それ以外のブラウザーでの利用も、検証済みランタイムの対象には含まれていません。 |

## ランタイム {#runtimes}

ライブラリの開発とテストには Deno 2.7.14 を使用しています。
トランスポートの互換性確認には Node.js 24 を使用しています。
JSR は Node.js、npm、Bun 向けに npm 互換パッケージを提供していますが、このプロジェクトではすべてのランタイムとバージョンの組み合わせで完全なテストを実施しているわけではありません。
ドキュメントサイトは Node.js と npm を使用します。
ブラウザーでは通話トランスポートに必要な UDP を利用できません。

## 機能別ガイドとサンプルコード {#feature-guides-and-source-examples}

| 機能 | ガイド | サンプルコード |
| --- | --- | --- |
| ログインとセッション | [認証](./auth) | [`example/talk/ping.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/talk/ping.ts) |
| Talk のメッセージとイベント | [メッセージとイベント](./message-event) | [`example/talk/all_methods.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/talk/all_methods.ts) |
| 1対1の音声通話 | [音声通話](./audio-call) | [`example/call/call_on_command.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/call_on_command.ts) |
| グループ通話 | [グループ通話](./group-call) | [`example/call/call_on_command.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/call_on_command.ts) |
| ビデオ通話 | [ビデオ通話](./video-call) | [`example/call/video.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/video.ts) |
| 着信 | [着信への応答](../INCOMING_AUDIO) | [`example/call/incoming.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/call/incoming.ts) |
| E2EE | [E2EE と保存済みの鍵](./e2ee) | [API とソースコードの比較](../VYLINE_PORTING#e2ee-and-login-parity) |
| アルバム / Moa | [アルバムのガイド](./moa) | [`example/moa/list-albums.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/example/moa/list-albums.ts) |

## 性能に関する説明の範囲 {#performance-claims}

Vylinejs は、ファイルストレージ、メッセージのエンコード、パケット処理、バッファーのコピーなど、計測した特定の処理を改善しています。
計測値は、入力条件を明示したローカルのマイクロベンチマークによるものです。
アプリケーション全体の遅延を示すものでも、すべての処理が LINEJS より高速であることを約束するものでもありません。
ベンチマークの環境、結果、再現コマンドは[安定性に関する注記](../VYLINEJS_STABILITY.md)に記載しています。

## サービスの変更とデータの保護 {#service-changes-and-data-safety}

サービスとプロトコルは LINE が管理しています。
サービスは予告なく変更または終了される可能性があります。
認証情報と E2EE 鍵は非公開の保存場所で管理し、ログイン端末を変更する前にバックアップを作成してください。
復号エラーを解消するために過去の E2EE 鍵を消去しないでください。
認証情報の扱いは[認証とセッションの保存](./auth.md)を参照してください。
