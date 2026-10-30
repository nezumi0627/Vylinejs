# 手順1：Vylinejs をインストールする {#step-1-install-vylinejs}

公開パッケージを既存のプロジェクトに追加する手順です。
ドキュメントサイトは Node.js と npm を使用していますが、ライブラリ自体は Deno と Bun にも対応しています。

## ランタイムを選ぶ {#choose-a-runtime}

### Deno {#deno}

```sh
deno add jsr:@nezumi0627/vylinejs
```

### Node.js と npm {#node-js-with-npm}

```sh
npx jsr add @nezumi0627/vylinejs
```

npm がパッケージを解決できるよう、JSR CLI が作成する `.npmrc` ファイルを保持してください。

### Bun {#bun}

```sh
bunx jsr add @nezumi0627/vylinejs
```

## パッケージ名を確認する {#confirm-the-package-name}

ライブラリは `@nezumi0627/vylinejs` からインポートしてください。
新しく書くコードで、旧パッケージ名の `@evex/linejs` に置き換えないでください。
JSR のパッケージページは [jsr.io/@nezumi0627/vylinejs](https://jsr.io/@nezumi0627/vylinejs) です。

このライブラリはブラウザー用のチャットアプリケーションではありません。
UDP ベースの通話トランスポートには、対応するサーバー向けランタイムが必要です。
ブラウザーでは必要な UDP ソケットを開けません。

<div class="vy-page-actions" id="continue">
  <a class="vy-page-button vy-page-button-primary" href="./2-login">
    <span>次の手順 · 2</span>
    <strong>QR コードでログイン</strong>
  </a>
</div>

保守担当者の署名：[nezumi0627](https://github.com/nezumi0627)
