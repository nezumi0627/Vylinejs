# DeepWiki とリポジトリのアーキテクチャ {#deepwiki-and-repository-architecture}

公開 GitHub リポジトリについて、AI が生成した別の解説を読むには、[Vylinejs DeepWiki](https://deepwiki.com/nezumi0627/Vylinejs) を開いてください。
DeepWiki は、保守されているこのドキュメントとは独立してリポジトリをインデックス化します。詳細に依存する前に、その引用をソースと照合してください。

この保守対象のコードマップは、ローカルで利用できる代替資料であり、ソースを読み進めるための入口です。

## リポジトリの構成 {#repository-map}

| 分野 | 場所 | 役割 |
| --- | --- | --- |
| 公開ライブラリ | `packages/linejs/` | メインの TypeScript パッケージと公開クライアント API |
| クライアント機能 | `packages/linejs/client/features/` | ログイン、Talk、通話、メディア、LIFF、Moa、サービス操作 |
| 共通の基本機能 | `packages/linejs/base/` | ストレージ、E2EE、トランスポート、イベントエミッター、プロトコルヘルパー |
| Thrift 定義 | `packages/types/` | ソーススキーマと生成されたプロトコル型 |
| サンプル | `example/` | 機能別と実行環境別の実行可能な使用例 |
| 保守対象のドキュメント | `docs/docs/` | インストール手順、ガイド、対応状況、API リファレンス |
| 生成ドキュメントサイト | `docs/.vitepress/` | VitePress のテーマ、ナビゲーション、検索、Mermaid の描画 |

## 読み進め方 {#reading-paths}

1. インストールと初回ログイン：[段階的なクイックスタート](../docs/quickstart/1-install)。
2. 認証の内部動作とセッションのリスク：[認証ガイド](../docs/auth)。
3. 機能の利用可否と実行時の制約：[対応状況の表](../docs/features)。
4. 通話プロトコルの詳細：[通話ガイド](../docs/call)。
5. ソースの比較とプロジェクトの派生関係：[プロジェクトの歴史](../VYLINE_PORTING)。
6. ベンチマークと安定性の根拠：[安定性ノート](../VYLINEJS_STABILITY)。

## パッケージの境界 {#package-boundaries}

`packages/linejs` は公開ライブラリの API を提供します。
`packages/types` は共通の Thrift データを供給します。
サンプルはライブラリを利用する別個のプログラムであり、実行時パッケージの一部ではありません。
ドキュメントサイトは Node.js/npm のプロジェクトで、Deno を第一に扱うライブラリのワークスペースとは別にビルドします。

シンボルを調べる場合は、`packages/linejs/` で正確な識別子を検索し、そのインポートを `base/` または `types/` へたどってください。
動作を調べる場合は、機能ガイドと、そこからリンクされたサンプルを優先してください。
生成された Thrift ファイルは、サービスの動作を推測するための正規の情報源ではありません。

メンテナー署名：[nezumi0627](https://github.com/nezumi0627)
