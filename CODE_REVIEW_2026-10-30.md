# Vylinejs コードレビュー

**実施日:** 2026-10-30  
**対象:** `packages/linejs` の認証・E2EE・通話音声・メッセージ・Push 処理、依存関係、Docs 開発依存、可読性と保守性  
**方式:** 読み取り専用。複数のサブエージェントによる独立レビューと、該当コード・依存監査結果の照合。

## 修正時の最優先条件: LINEJS互換

修正はLINEJSからの移行負担を増やさないことを最優先とします。LINEJSで動いていたクライアント生成、ログイン、イベント購読、メッセージ送信などのコードは、原則そのままVylinejsでも動くべきです。CHRLINEなどで馴染みのあるクライアント生成の流れも尊重し、既存の公開API・型・引数の意味を不用意に変えません。

不具合修正は既存APIの内部実装で直し、変更が避けられない場合は互換ラッパーや段階的な非推奨化を先に検討します。特にR3のTalk送信修正では、LINEJSの呼び出し形を維持したまま、受け取った本文とオプションが実際の要求へ届くようにするのが基準です。レビューに含めた修正候補は、既存のLINEJS利用例・移行経路・型定義と照らしてから実装する必要があります。

## 要約

現時点で優先して対処すべきなのは、E2EE秘密情報が通常のログイベントへ出る問題、音声入力値によって処理が停止しない問題、Talk送信時に本文などが捨てられる問題、Push応答の未制限バッファと蓄積する要求記録、そしてThriftの既知脆弱性です。Docsの開発依存にも既知アドバイザリがあります。

この文書の初回レビュー時点ではコード変更を行っていませんでした。後続の対応状況は末尾の「対応結果」を参照してください。重要度はコード上の影響と成立条件から付けており、実際の攻撃可能性が未確認のものはその旨を記載しています。

## 優先度の高い指摘

### R1 — E2EE鍵・平文を通常の `log` イベントに出力する

**重要度: 高** · **確度: 高**

`e2eeLog()` は `client.log("e2ee", ...)` を通して通常のログイベントを発行します。その呼び出し元で暗号鍵、秘密鍵、復号済み本文などをログデータに含めています。たとえば暗号化処理の `gcmKey`、V1復号の `privK`、派生AES鍵、復号メッセージ、V2復号済み本文が対象です。

アプリが `log` イベントを保存・転送している場合、ログ基盤やログファイルからE2EEの機密性が損なわれる可能性があります。通常のイベント購読で取得できるため、デバッグ専用のロガーに閉じている状態ではありません。

**根拠:** [e2ee/mod.ts:942](/E:/projects/Vylinejs/packages/linejs/base/e2ee/mod.ts:942)、[e2ee/mod.ts:1214](/E:/projects/Vylinejs/packages/linejs/base/e2ee/mod.ts:1214)、[e2ee/mod.ts:1227](/E:/projects/Vylinejs/packages/linejs/base/e2ee/mod.ts:1227)、[e2ee/mod.ts:1349](/E:/projects/Vylinejs/packages/linejs/base/e2ee/mod.ts:1349)、[e2ee/mod.ts:1353](/E:/projects/Vylinejs/packages/linejs/base/e2ee/mod.ts:1353)

**修正方針:** 鍵・平文・生メッセージをログ引数から除き、イベント名、処理結果、必要最小限の非機密メタデータだけを残す。

### R2 — 不正な音声フレーム設定で無限ループする

**重要度: 高** · **確度: 高**

`bufferSource` は `frameSamples` を `sampleRate`、`frameMs`、`channels` から計算し、その値をループの増分にしています。値の検証がないため、`frameSamples` が0ならインデックスが進まず、負数なら入力によって終了しないループになり得ます。`CallSession.sendBuffer()` などから設定値を指定できます。

**成立条件:** 呼び出し側が0・負数・有限でない値など不正な音声設定を渡すこと。リモート攻撃者が直接この値を指定できることは確認していません。

**根拠:** [audio.ts:107](/E:/projects/Vylinejs/packages/linejs/client/features/call/audio.ts:107)、[audio.ts:111](/E:/projects/Vylinejs/packages/linejs/client/features/call/audio.ts:111)

**修正方針:** `sampleRate`、チャンネル数、フレーム長、計算後のサンプル数が有限かつ正であることを、ループ開始前に検証する。

### R3 — `TalkMessage.send()` が本文とオプションを送信要求から落とす

**重要度: 高** · **確度: 高**

Talkの `send(input)` はオブジェクト入力から宛先を求めたあと、`sendMessage({to, e2ee})` だけを呼んでいます。型で受け付けている `text`、`contentType`、`contentMetadata`、`relatedMessageId`、`location` が要求に引き継がれません。呼び出し側には送信成功に見えても、本文なしまたは意図しない内容になる可能性があります。文字列入力も一般送信ではなく `reply()` に渡されるため、APIの意味が入力形式で変わります。

**根拠:** [talk.ts:70](/E:/projects/Vylinejs/packages/linejs/client/features/message/talk.ts:70)、Talk側の送信処理と型定義。同じ機能のSquare送信は入力フィールドを転送する実装です。

**修正方針:** Talkの公開入力フィールドをサービス層へ正しく転送し、文字列入力の意味をAPI契約として統一する。

### R4 — Pushの分割応答を上限なく連結し、毎回全体をコピーする

**重要度: 高** · **確度: 高**

`notFinPayloads` はFINで完了するまで受信断片を保持します。断片ごとに過去の全バイト列を新しい配列へコピーしているため、FINなしの長い応答ではメモリ使用量が増え続け、総コピー量も急増します。相手側が悪意を持つ場合だけでなく、壊れた・異常に大きい応答でもCPUとメモリを圧迫します。

**根拠:** [conn.ts:20](/E:/projects/Vylinejs/packages/linejs/base/push/conn.ts:20)、[conn.ts:314](/E:/projects/Vylinejs/packages/linejs/base/push/conn.ts:314)、[conn.ts:321](/E:/projects/Vylinejs/packages/linejs/base/push/conn.ts:321)

**修正方針:** 要求単位と接続全体のサイズ・断片数に上限を設け、超過時に状態を破棄して接続を適切に終了する。連結方式も蓄積済み全体の再コピーを避ける。

### R5 — Push要求記録を消さず、長時間接続で蓄積する

**重要度: 中〜高** · **確度: 高**

`signOnRequests` は送信時に追加されますが、応答処理後に削除される経路が見当たりません。接続の初期化時にしか全体をリセットしないため、長時間の接続で記録が残り続けます。また要求IDを現在のMap相当オブジェクトの要素数から作るため、蓄積に伴ってIDが増え続け、プロトコルIDの再利用・範囲との整合性も確認が必要です。

**根拠:** [connManager.ts:46](/E:/projects/Vylinejs/packages/linejs/base/push/connManager.ts:46)、[connManager.ts:233](/E:/projects/Vylinejs/packages/linejs/base/push/connManager.ts:233)、[connManager.ts:265](/E:/projects/Vylinejs/packages/linejs/base/push/connManager.ts:265)、[connManager.ts:280](/E:/projects/Vylinejs/packages/linejs/base/push/connManager.ts:280)

**修正方針:** 応答完了・タイムアウト・切断の各経路で記録を確実に削除し、空きIDを範囲内で再利用する。

### R6 — すでにabort済みの音声ストリームが待ち続ける

**重要度: 中** · **確度: 高**

`streamSource` はabortイベントを登録してからreaderを読みますが、登録前に `signal` がabort済みかを確認していません。すでに発火したイベントは後から登録したlistenerへ再通知されないので、`reader.read()` が解決しない入力では処理が永久に待つ可能性があります。

**根拠:** `packages/linejs/client/features/call/audio.ts` の `streamSource`。既存テストは読み取り中のabortを扱いますが、開始前にabort済みのケースは確認できませんでした。

**修正方針:** listener登録前後にabort状態を確認し、readerのcancelとlistener解除をすべての終了経路で行う。

## 依存ライブラリの既知アドバイザリ

### ライブラリ本体

`deno audit --frozen` は `thrift@0.20.0` にHighのアドバイザリを2件報告しました。

- [GHSA-r67j-r569-jrwp](https://github.com/advisories/GHSA-r67j-r569-jrwp) / CVE-2026-41636
- [GHSA-526f-jxpj-jmg2](https://github.com/advisories/GHSA-526f-jxpj-jmg2) / CVE-2026-43870

どちらも修正版はThrift 0.23.0以降です。VylinejsはPush応答やサービス応答のThrift解析にこのパッケージを使っています。悪意ある入力が実際にLINE側の通信経路から到達するかは、このレビューでは実証していません。まず互換性を検証しながら更新候補にする価値があります。

### Docs開発環境

`npm audit --prefix docs` は脆弱性のある依存パッケージ項目を6件報告しました（Critical 0、High 1、Moderate 3、Low 2）。主なものは以下です。

- `vite@5.4.21`: Highを含む複数アドバイザリ。開発サーバーやエディタ起動経路に関するものが中心で、静的生成済みPagesの実行時影響とは区別が必要です。[GHSA-4w7w-66w2-5vf9](https://github.com/vitejs/vite/security/advisories/GHSA-4w7w-66w2-5vf9)
- `esbuild@0.21.5`: 開発サーバーのCORSに関するModerate。[GHSA-67mh-4wv8-2f99](https://github.com/evanw/esbuild/security/advisories/GHSA-67mh-4wv8-2f99)
- `katex@0.16.47`（Mermaid経由を含む）: Lowのprototype pollution gadgetアドバイザリ。[GHSA-238p-pmpm-9mq7](https://github.com/KaTeX/KaTeX/security/advisories/GHSA-238p-pmpm-9mq7)

監査上のパッケージ件数は重複する依存経路を含むため、件数を個別脆弱性数として解釈しないでください。開発サーバーを信頼できないネットワークへ公開しているか、公開ビルドに影響するかを分けて更新計画を立てる必要があります。

## パフォーマンス・保守性・コメント

### メッセージ装飾処理の重複と再シリアライズ

TalkとSquareに、ほぼ同じ `getTextDecorations()` 実装があります。Mentionなどを複数処理する際、装飾メタデータをループ中に繰り返しJSON解析・シリアライズする箇所があり、件数に応じて不要な割当てと処理が増えます。構造化データをメモリ上で編集し、最後に一度だけシリアライズする方が効率的で、両実装の挙動差も減らせます。

**根拠:** [talk.ts:236](/E:/projects/Vylinejs/packages/linejs/client/features/message/talk.ts:236)、[square.ts:238](/E:/projects/Vylinejs/packages/linejs/client/features/message/square.ts:238)。両方に `TODO: refeactering is needed` がそのまま残っています。

### Pushに長いコメントアウト済み処理が残る

`connManager.ts` に `fetchOps` の長いコメントアウト済み処理が残っています。現行実装と過去案の境界が分かりにくく、保守時に誤読を招きます。必要な履歴ならIssueや設計資料へ移し、不要なら削除候補です。

**根拠:** [connManager.ts:432](/E:/projects/Vylinejs/packages/linejs/base/push/connManager.ts:432)

### lintの未解消項目

`deno lint packages/linejs` は64件（38 `verbatim-module-syntax`、17 `no-unused-vars`、5 `no-explicit-any`、3 `require-await`、1 `prefer-const`）を報告しました。リポジトリ全体では331件、270ファイルです。これら全てが不具合を意味するわけではありませんが、未使用値や型の曖昧さを残し、実際の問題を埋もれさせます。CIでlintを実行していないため、規約違反が蓄積しています。

### エラー抑制コメントの説明不足

複数箇所の `@ts-expect-error` コメントに「TypeScriptのバージョン変更で直す」「TODO」などの説明があり、抑制対象の型不整合や削除条件が明確でありません。対象の型・ランタイム挙動・解除条件をコメントに残すか、不要になった抑制を除去する候補です。

## 追加確認事項（脆弱性と断定しない）

`FileStorage` は認証情報やE2EE関連データをJSONとして保存します。一方、実装にはUnix系の `0o600` と権限制限処理があります。したがって、現時点で「ファイル権限がない」とは判断できません。保存先・バックアップ・同期・端末共有などの運用境界で平文ファイルが露出しないかを利用者が考慮する必要がある、という設計上の確認事項です。

## 確認範囲と限界

- `deno check` は対象の主要モジュールで成功しました。
- `deno lint` は上記の既存指摘で失敗しました。
- `deno audit --frozen` とDocsの `npm audit` を実行しました。
- ネットワーク越しの攻撃再現、実アカウントを使った通話・E2EE試験、依存更新後の互換性試験は行っていません。
- `deno audit --no-lock` はlockfileを監査しないため、依存脆弱性確認には採用していません。
- 作業ツリーにはレビュー前から未追跡の `NUL` がありました。内容に触れず、そのまま維持しています。

## 外部レビュー手法

既存のコードレビュー・セキュリティ・TypeScript品質スキルに加えて、OpenAI公式の [security-best-practices skill](https://github.com/openai/skills/blob/main/skills/.curated/security-best-practices/SKILL.md) を検索・導入して参照しました。X検索では、今回のDeno/TypeScriptレビューにそのまま使える信頼性の高いレビュー用skillは特定できませんでした。導入したskillはレビュー観点の補助に使い、実際の指摘はリポジトリと監査出力を照合しています。

## 対応結果（2026-10-30）

- **LINEJS互換性:** 公開barrelから既存の `Client`・QR/パスワード/AuthTokenログイン・`message`イベント・文字列送信の呼び出し形を確認する回帰テストを追加しました。`TalkMessage.send(string)` の返信挙動は維持し、オブジェクト入力の本文、ContentType、metadata、related ID、locationを送信サービスへ転送します。
- **E2EEログ:** ログカテゴリと操作名は維持し、鍵・暗号文・復号済み本文を含む詳細payloadを公開logイベントから除きました。
- **音声:** サンプルレート、チャンネル数、フレーム長を検証し、不正値でフレーム生成が停止しないようにしました。開始前にabort済みのReadableStreamもキャンセルします。
- **Push:** 応答断片を配列で保持してFIN時に一度だけ結合します。応答あたり8 MiB、接続全体64 MiB、応答あたり4096断片、接続全体8192断片を上限とし、切断時に蓄積を解放します。要求記録はFIN応答または書き込み失敗時に削除し、IDは1〜32767を循環して空きを割り当てます。
- **依存関係:** Thriftを0.25.0へ更新しました。Node.js CommonJS/ESM読み込みとDenoテストで確認しています。DocsはVitePress 2.0.0-alpha.21と対応するVite 8.3.5へ移行し、非公式Mermaidプラグインを外してローカルの描画コンポーネントに置き換えました。esbuild 0.25系とKaTeX 0.18系を使用します。

**対応後の確認:** `deno test -A` は460件成功、主要モジュールの `deno check` と変更対象の `deno lint` は成功しました。`deno audit --frozen` と、ロックファイルから隔離環境へ再インストールしたDocsの `npm audit --audit-level=low` は既知脆弱性0件です。Docs buildも成功しました。実アカウント通信によるLINEプロトコル確認は行っていません。DocsのVitePress 2はalpha版のため、安定版への復帰時はVitePressが依存するViteの修正版公開状況を再確認してください。
