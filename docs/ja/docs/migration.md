# LINEJS からの移行 {#migrate-from-linejs}

Vylinejs は LINEJS のフォークであり、独立して保守する単一のパッケージとして公開しています。
ライブラリの考え方やサブパスの多くは引き継いでいますが、パッケージ指定子は変更する必要があります。

## パッケージ名を更新する {#update-package-names}

| LINEJS のインポート | Vylinejs のインポート |
| --- | --- |
| `@evex/linejs` | `@nezumi0627/vylinejs` |
| `@evex/linejs-types` | `@nezumi0627/vylinejs/types` |

Deno では JSR からインストールします。

```sh
deno add jsr:@nezumi0627/vylinejs
```

npm または Bun では JSR のインストーラーを使用し、生成される `.npmrc` を保持してください。

```sh
npx jsr add @nezumi0627/vylinejs
bunx jsr add @nezumi0627/vylinejs
```

型のみのインポートも含め、TypeScript のインポートを更新します。

```diff
- import { loginWithQR } from "@evex/linejs";
- import type { Message } from "@evex/linejs-types";
+ import { loginWithQR } from "@nezumi0627/vylinejs";
+ import type { Message } from "@nezumi0627/vylinejs/types";
```

任意で利用できる Agent I クライアントはリポジトリ内のソースコードとして残しており、別パッケージとしては公開していません。
Vylinejs が公開するパッケージは1つで、プロトコルの型は `/types` と `/types/thrift` サブパスから利用できます。

ライブラリのサブパスは、引き続き `base`、`call`、`storage`、`thrift` です。

```ts
import { FileStorage } from "@nezumi0627/vylinejs/storage";
import { CallSession } from "@nezumi0627/vylinejs/call";
```

## サービスの状況の違いを確認する {#review-changed-service-status}

- Square API は、引き継いだ旧来の API としてパッケージに残っています。ただし、Vylinejs は Square を積極的にサポートしておらず、継続的な保守も約束していません。
- VOOM と Timeline の API は、LINE VOOM の終了に伴い非推奨となり、通信せずに失敗します。これらの API の呼び出しを削除してください。
- ログイン、E2EE、通話などの非公式プロトコルの動作は、アカウント、端末、LINE サーバーの変更によって異なる場合があります。[現在の機能のサポート状況](./features.md)を確認してください。

## 認証情報と鍵を保持する {#preserve-credentials-and-keys}

パッケージ名の変更に伴って、既存のストレージファイルを消去する必要はありません。
依存関係を変更する前にバックアップを作成し、可能な限り同じストレージアダプターを使い続けてください。
復号の問題を解消するために E2EE 鍵の記録を削除したり、識別情報の登録を強制したりしないでください。
過去のメッセージに必要な鍵データを失う可能性があります。
復元と暗号化の手順は[認証](./auth.md)を参照してください。

## 互換性の範囲 {#compatibility-boundary}

Vylinejs は、LINEJS の API の形をできるだけ維持することを目指していますが、新しいパッケージ指定子への切り替えにはソースコードの移行が必要です。
エクスポートのパスが一致していても、引き継いだサービスがすべて現在も利用可能であることや、積極的に保守されていることは保証されません。
