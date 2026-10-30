# アルバム（Moa） {#album-moa}

`MoaService` は、`client.base.moa` 上に LINE アルバム（Moa）の REST API を公開します。
Talk / Square と異なり、Moa は LEGY プロキシを経由した HTTPS 上の JSON で通信します。
そのため、このサービスはアルバム用チャネル（`1375220249`）に対して発行したチャネルトークンを使い、`client.base.fetch` を直接呼び出します。

## アルバムの一覧を取得する {#listing-albums}

```ts
import { loginWithAuthToken } from "@nezumi0627/vylinejs";

const client = await loginWithAuthToken("YOUR_AUTH_TOKEN", {
  device: "IOSIPAD",
});

let cursor = "";
while (true) {
  const resp = await client.base.moa.getAlbums({ cursor });
  const result = resp.result;
  for (const album of result?.albums ?? []) {
    console.log(`[${album.albumId}] ${album.title} (${album.photoCount} photos)`);
  }
  const next = result?.nextCursor ?? result?.cursor ?? "";
  if (!next || next === cursor || !(result?.hasMore ?? true)) break;
  cursor = next;
}
```

## アルバム内の写真の一覧を取得する {#listing-photos-in-an-album}

```ts
let cursor = "";
while (true) {
  const resp = await client.base.moa.getPhotos({
    chatId: "cxxxxxxxxxxxxxxx",
    albumId: "1234567890123456789",
    cursor,
    pageSize: 100,
  });
  for (const photo of resp.result?.photos ?? []) {
    console.log(photo.oid, "shot at", photo.shotTime);
  }
  const next = resp.result?.nextCursor ?? "";
  if (!next || next === cursor) break;
  cursor = next;
}
```

## 写真の元のバイト列をダウンロードする {#downloading-the-original-bytes-of-a-photo}

`downloadPhoto` は `Uint8Array` を返します。
呼び出し側で保存したり、追加の処理を行ったりできます。

```ts
import { writeFileSync } from "node:fs";

const bytes = await client.base.moa.downloadPhoto({
  chatId: "cxxxxxxxxxxxxxxx",
  albumId: "1234567890123456789",
  oid: "someOid",
});
writeFileSync("./out.jpg", bytes);
```

動画の場合は `prefix: "album/v"` を渡してください。
画像か動画かは、`obsResourceId` の `sid` フィールドで判別できます。

```ts
const isVideo = photo.obsResourceId?.sid === "v";
const bytes = await client.base.moa.downloadPhoto({
  chatId,
  albumId,
  oid: photo.obsResourceId!.oid!,
  prefix: isVideo ? "album/v" : "album/a",
});
```

## 注意点 {#notes}

- `1375220249` に対して発行したチャネルトークンは、サービス内部にキャッシュされ、同じセッション内で再利用されます。アクセストークン、MID、エンドポイントを変更すると無効になります。有効期限切れや失効によってトークンが拒否された場合は、明示的に再試行する前に `client.base.moa.clearAlbumChannelToken()` を呼び出してください。リクエストは自動では再試行されません。REST リクエストとダウンロードには `client.base.config.timeout` を使用します。
- Moa は `X-Line-ChannelToken` と、自分の MID を設定した `X-Line-Mid` を使用します。写真の取得では、`X-Line-Album` にアルバム ID を、`X-Line-Mid` に*チャット* ID を設定します。これらはすべて自動で設定されます。
- `accept: application/json` へのヘッダーの上書きが必要です。既定の `client.base.request.getHeader("GET")` は `application/x-thrift` を返すため、LEGY は REST エンドポイントでこれを拒否し、`{"code":102001,"message":"一時的なエラーが発生しました。"}` を返します。
