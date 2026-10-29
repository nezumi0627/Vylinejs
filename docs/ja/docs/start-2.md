# 実行をまたいでセッションを保持する {#keep-a-session-between-runs}

起動のたびに、同じ永続ストレージアダプターを指定して `loginWithStoredAuthToken()` を使用してください。
保存済みセッションを復元し、必要に応じて更新します。

```ts
import { loginWithStoredAuthToken } from "@nezumi0627/vylinejs";
import { FileStorage } from "@nezumi0627/vylinejs/storage";

const client = await loginWithStoredAuthToken({
	device: "IOSIPAD",
	storage: new FileStorage("./private/line-session.json"),
});

console.log((await client.getMyProfile()).displayName);
```

この例は、ファイルに有効なセッションがすでに保存されていることを前提としています。
セッションの作成や置き換えは、[認証](./auth.md)に示すパスワードまたは QR によるログインで行ってください。

## 待ち受けを開始し、終了時に停止する {#start-listening-and-stop-cleanly}

アプリケーション終了時にストリームを閉じられるよう、`listen()` に `AbortSignal` を渡してください。

```ts
const controller = new AbortController();

client.on("message", (message) => {
	console.log(message.text);
});

client.listen({ talk: true, square: false, signal: controller.signal });

// During application shutdown:
controller.abort();
```

Square は引き継いだ旧来の API であり、Vylinejs は積極的にサポートしていません。
現在のサービス状況は、[機能とサポート状況](./features.md)を参照してください。
