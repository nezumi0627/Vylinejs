# エンドツーエンド暗号化 {#end-to-end-encryption}

Vylinejs は、LINE の E2EE 鍵の保存とメッセージの復号に対応しています。
復号できるかどうかは、アカウントに登録された公開鍵と、クライアントが保持している過去の秘密鍵に依存します。
復号エラーを解消するために鍵の履歴を消去しないでください。

## 保存済みの鍵と登録済みの公開鍵を照合する {#stored-key-reconciliation}

`reconcileStoredE2EEIdentity(mid)` は、鍵 ID が一致する保存済み秘密鍵とサーバーに登録された公開鍵を照合します。
検証できた履歴を保持し、一致したローカル鍵のうち最新のものを有効なエイリアスとして選択します。
鍵の登録、ローテーション、新規生成は行いません。
一致する鍵がない場合は、エイリアスのみを削除し、ID ごとの鍵データはそのまま保持します。

このメソッドは、既存のローカル鍵ストアを整合させるためのものです。
LINE のログインや鍵登録のフローを代替するものではありません。
アカウントの鍵データを取り込んだり変更したりする前に、バックアップを保存してください。

## 鍵バンドルを取り込む {#import-a-key-bundle}

鍵を所有するアカウントでログインした後、Vyline Desktop または SBC の鍵バンドルを解析して `client.base.e2ee.importE2EEKeyBundle()` に渡します。
ライブラリ自身がデスクトップ上のファイルを読み込むことはありません。
バンドルのアカウントを確認し、秘密鍵から公開鍵を導出して、LINE に登録済みの鍵と一致することを検証してから送信用の鍵を選びます。
現在は登録されていない古い鍵も、過去のメッセージを復号するために保持できます。

```ts
const bundle = JSON.parse(await Deno.readTextFile("./private/e2ee-keys.json"));
const result = await client.base.e2ee.importE2EEKeyBundle(bundle);

console.log({
	imported: result.imported,
	skipped: result.skipped,
	activeKeyId: result.identity.selectedKeyId,
});
```

元のバンドルとクライアントの永続ストレージは秘密情報として扱ってください。
E2EE の秘密鍵からメッセージ履歴が漏れるおそれがあります。
バックアップは暗号化し、鍵データをログや Issue に含めないでください。
この取り込み処理が LINE 上で鍵を登録・ローテーションすることはありません。

## 関連する実装とガイド {#related-implementation}

- ログインとアカウント設定：[認証](./auth)
- 保存済みセッションの扱い：[セッションの復元](./start-2)
- 設計とソースコードの系譜：[Vyline / Vylinejs / LINEJS の比較](../VYLINE_PORTING#e2ee-and-login-parity)
- 現在の制限：[機能のサポート状況](./features)
