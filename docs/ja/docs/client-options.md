# クライアントの初期化オプション {#client-initialization-options}

ログインヘルパーは、ログイン用の引数と `InitOptions` オブジェクトを別々に受け取ります。
どのログイン方式でも `device` の指定が必要です。

```ts
import { loginWithQR } from "@nezumi0627/vylinejs";
import { FileStorage } from "@nezumi0627/vylinejs/storage";

const client = await loginWithQR({
	onReceiveQRUrl(url) {
		console.log(url);
	},
	onPincodeRequest(pin) {
		console.log("Enter this PIN in LINE:", pin);
	},
}, {
	device: "IOSIPAD",
	storage: new FileStorage("./private/line-session.json"),
	// endpoint: "legy.line-apps.com",
	// version: "26.6.2",
	// fetch: (input, init) => fetch(input, init),
	// legy: { encrypted: "auto" },
});
```

## オプション一覧 {#options}

| オプション | 型 | 既定値 | 用途 |
| --- | --- | --- | --- |
| `device` | `Device` | 必須 | `IOSIPAD`、`ANDROID`、`DESKTOPWIN` など、プロトコル上の端末プロファイル。 |
| `version` | `string` | 端末によって異なる | プロトコルの識別フィールドで送信する LINE アプリのバージョン。サーバーが要求するプロファイルを把握している場合にのみ変更してください。 |
| `endpoint` | `string` | `legy.line-apps.com` | クライアントが使用する API エンドポイント。通常は既定値を使用してください。 |
| `storage` | `BaseStorage` | `MemoryStorage` | 認証情報、E2EE 鍵、プロトコルの状態を保存します。長時間稼働するクライアントでは、保護された永続ストレージを使用してください。 |
| `fetch` | `FetchLike` | `globalThis.fetch` | プロキシや独自のトランスポートを必要とする環境向けの通信関数。 |
| `legy.encrypted` | `boolean \| "auto"` | `"auto"` | LEGY リクエストの暗号化を制御します。`auto` は認証情報やトークンの種類に応じて動作を選びます。 |
| `legy.endpoint` | `string` | ライブラリの既定値 | 互換性のある独自サーバーを使用する場合に、LEGY エンドポイントを上書きします。 |

`device` に指定できる文字列は、`DESKTOPWIN`、`DESKTOPMAC`、`ANDROID`、`ANDROIDSECONDARY`、`IOS`、`IOSIPAD`、`WATCHOS`、`WEAROS` です。
端末とバージョンの組み合わせによっては LINE に拒否される場合があります。
これらの値はプロトコル上のプロファイルを模倣するもので、実行環境の OS を示す値ではありません。

`MemoryStorage` の内容はプロセス終了時に失われます。
`FileStorage` は JSON を平文で書き込むため、ファイルへのアクセスを制限してください。
暗号化して永続化するには、ライブラリの外部で管理するエクスポート不可の AES-GCM 鍵と `EncryptedStorage` を使用します。
詳細は[認証とセッションの保存](./auth.md)を参照してください。

公開オプションの正確な型は、メインパッケージから `InitOptions` としてエクスポートされています。
各ログインヘルパーが受け取る個別の引数については、[認証ガイド](./auth.md)を参照してください。
