# ユーティリティ {#utilities}

独立したユーティリティ用のパッケージサブパスからのエクスポートは廃止されています。
現在のユーティリティは、クライアント、または以下に示すパッケージサブパスから利用できます。

## OBS {#obs}

OBS ヘルパーは、認証済みクライアントの `BaseClient` から利用できます。

```ts
const metadata = await client.base.obs.getMessageObsMetadata({
  messageId: "MESSAGE_ID",
});

const file = await client.base.obs.downloadMessageData({
  messageId: "MESSAGE_ID",
});
```

メディアのアップロード用ヘルパーも、同じオブジェクトから利用できます。

```ts
const message = await client.base.obs.uploadMediaByE2EE({
  to: "u...",
  oType: "image",
  data: imageFile,
  filename: "image.png",
});
```

実装の詳細は、[`packages/linejs/base/obs/mod.ts`](https://github.com/nezumi0627/Vylinejs/blob/main/packages/linejs/base/obs/mod.ts)を参照してください。

## ストレージ {#storage}

ストレージのヘルパーは、`@nezumi0627/vylinejs/storage` からエクスポートされています。

```ts
import { FileStorage, MemoryStorage } from "@nezumi0627/vylinejs/storage";

const storage = new FileStorage("./storage.json");
```

ログイン状態、E2EE 鍵、リクエストのシーケンス状態をプロセスの再起動後も保持するには、`FileStorage` を使用してください。
`MemoryStorage` は、短時間だけ動作するクライアントに限って使用してください。

## Base のヘルパー {#base-helpers}

公開されている base パッケージに含まれる低レベルのヘルパーは、`@nezumi0627/vylinejs/base` からエクスポートされています。

```ts
import { BaseClient, continueRequest, InternalError } from "@nezumi0627/vylinejs/base";
```

パッケージのエクスポートは、[`packages/linejs/deno.json`](https://github.com/nezumi0627/Vylinejs/blob/main/packages/linejs/deno.json)で定義されています。
