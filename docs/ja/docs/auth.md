# 認証とセッションの保存 {#authentication-and-session-storage}

Vylinejs は、パスワード、QR コード、既存の認証トークンによるログインと、永続ストレージからのセッション復元に対応しています。
認証プロトコルは LINE が管理しており、追加の端末認証を求められる場合があります。

## パスワードでログインする {#password-login}

パスワードによるログインは、対話的なログインが必要な場合にのみ使用してください。
`pincode` を省略すると、Vylinejs が E2EE ログインのハンドシェイク用にランダムな6桁の PIN を生成します。
次の例は Deno の環境変数にアクセスするため、必要な環境変数へのアクセス権限だけを付与してください。

```ts
import { loginWithPassword } from "@nezumi0627/vylinejs";

const client = await loginWithPassword({
	email: Deno.env.get("LINE_EMAIL")!,
	password: Deno.env.get("LINE_PASSWORD")!,
	onPincodeRequest(pin) {
		console.log("Enter this PIN in LINE:", pin);
	},
}, {
	device: "IOSIPAD",
});
```

認証情報は、非公開のシークレットストアや環境設定から取得してください。
ソースコードに直接記述したり、トークンや PIN を共有ログに出力したりしないでください。

## QR コードでログインする {#qr-login}

QR ログインでは、ライブラリにパスワードを渡す必要がありません。
Vylinejs は `onReceiveQRUrl` を通じて URL を返します。
その URL を QR コードとして表示する処理は、ホストアプリケーションが実装します。

```ts
import { loginWithQR } from "@nezumi0627/vylinejs";

const client = await loginWithQR({
	onReceiveQRUrl(url) {
		showQrCode(url);
	},
	onPincodeRequest(pin) {
		showPinForLineConfirmation(pin);
	},
}, {
	device: "ANDROIDSECONDARY",
});
```

`showQrCode` と `showPinForLineConfirmation` は、アプリケーション側の関数です。
ライブラリは UI や QR 画像の描画機能を提供しません。

## 保存済みセッションを復元する {#restore-a-saved-session}

`FileStorage` は、アクセス用と更新用の認証情報を、E2EE の状態およびプロトコルの状態とともに保存します。
セッションの復元には、同じ永続ストレージを再利用してください。
復元ヘルパーは、サーバーが指定した有効期限が近づくと認証情報を更新します。
保存済みセッションが存在しない場合や LINE に拒否された場合は例外を送出し、暗黙にパスワードログインへ切り替えることはありません。

```ts
import {
	loginWithPassword,
	loginWithStoredAuthToken,
} from "@nezumi0627/vylinejs";
import { FileStorage } from "@nezumi0627/vylinejs/storage";

const storage = new FileStorage("./private/line-session.json");
const init = { device: "IOSIPAD" as const, storage };

let client;
if (await storage.get("accessToken") || await storage.get("refreshToken")) {
	client = await loginWithStoredAuthToken(init);
} else {
	client = await loginWithPassword({
		email: Deno.env.get("LINE_EMAIL")!,
		password: Deno.env.get("LINE_PASSWORD")!,
		onPincodeRequest(pin) {
			console.log("Enter this PIN in LINE:", pin);
		},
	}, init);
}
```

`FileStorage` を使用する場合、認証情報は平文で保存されます。
ファイルのアクセス権限を制限し、バージョン管理や暗号化されていないバックアップの対象から除外して、他者と共有しないでください。
`EncryptedStorage` は AES-GCM で値を暗号化できますが、アプリケーション側でエクスポート不可の鍵を OS のキーチェーンや別のシークレット管理サービスに保管する必要があります。
Vylinejs は、その鍵の保存や導出を行いません。

```ts
import { EncryptedStorage, FileStorage } from "@nezumi0627/vylinejs/storage";

const key = await loadNonExportableAesKeyFromSecretStore();
const storage = new EncryptedStorage(
	new FileStorage("./private/line-session.enc.json"),
	key,
);
```

`loadNonExportableAesKeyFromSecretStore` はアプリケーション側の処理を表す関数です。
Vylinejs は、プラットフォーム固有のキーチェーンアダプターを提供しません。

## 既存の認証トークンでログインする {#existing-auth-token}

`loginWithAuthToken` は、トークンの値、または対応する構造化されたトークン入力を受け取ります。
認証トークンだけでは E2EE の秘密鍵は取り込まれません。
必要な E2EE 鍵を含む永続ストレージがある場合は、それを再利用してください。
復号エラーの調査のために鍵の履歴を消去しないでください。

```ts
import { loginWithAuthToken } from "@nezumi0627/vylinejs";
import { FileStorage } from "@nezumi0627/vylinejs/storage";

const client = await loginWithAuthToken(Deno.env.get("LINE_AUTH_TOKEN")!, {
	device: "IOSIPAD",
	storage: new FileStorage("./private/line-session.json"),
});
```

認証情報が失効した場合は、対話的なログインをやり直してください。
過去の E2EE 鍵やアカウント固有の制限については、[機能とサポート状況](./features.md)および[安定性に関する注記](../VYLINEJS_STABILITY.md)を参照してください。
