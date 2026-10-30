# 通話 {#calls}

目的別の手順については、[1:1 音声通話](./audio-call)、[グループ通話](./group-call)、[ビデオ通話](./video-call)から始めてください。
このページでは、低レベルの PLANET、シグナリング、メディアのリファレンスを扱います。

Vylinejs は、JavaScript 向けに LINE の通話制御 API とメディア用ヘルパーを公開しています。
公開 API は次の2層に分かれています。

- `client.call.*` は、経路の取得やグループ通話 URL の管理など、LINE の通話制御 API をラップします。
- `@nezumi0627/vylinejs/call` は、PLANET シグナリング、SRTP、RTP、Opus、WAV/PCM ヘルパー、およびトランスポートに依存しない `CallSession` ラッパーという、通話メディアの構成要素を提供します。

現在の実装が対応する Android の 1:1 音声通話経路は次のとおりです。

```txt
Talk auth token
  -> /V4 acquireCallRoute
  -> PLANET UDP transport
  -> Cassini call-control messages
  -> peer answer handshake
  -> SRTP-protected RTP packets
  -> 48 kHz Opus audio payloads
```

## はじめに {#start-here}

この例は特定のプロトコルに依存しています。
合成テストに合格しても、個々のアカウント、端末、ネットワークで実際の LINE 通話を完了できる保証はありません。
利用の前に[通話の検証に関する注意事項](../VYLINEJS_STABILITY.md)を確認してください。

発信して音声を再生する例が必要な場合は、コマンドのサンプルから始めてください。

```sh
LINE_AUTH_TOKEN_FILE=/path/to/auth-token.txt \
LINE_DEVICE=ANDROID \
deno run -A example/call/call_on_command.ts ./voice.wav
```

次に、1:1 チャットでそのアカウントに `!call` を送信します。
このサンプルは次の処理を実行します。

1. 受信メッセージから送信者の MID を読み取ります。
2. その送信者への新しい LINE 通話経路を取得します。
3. PLANET 音声通話で送信者を呼び出します。
4. 送信者が応答するまで待機します。
5. WAV を 48 kHz の Opus にエンコードします。
6. SRTP メディアパケットをリアルタイムで送信します。
7. 再生後に通話を閉じます。

音声の発信を安定して行うには、次の既定値が重要です。

| 設定 | 使用する値 |
| --- | --- |
| 端末 | `ANDROID` |
| 通話種別 | `AUDIO` |
| 経路の環境情報 | `fromEnvInfo.devname` |
| トランスポート | `PlanetTransport` |
| メディア鍵モード | `audio-reverse-stage` |
| 入力音声 | 16 ビット PCM WAV |
| サンプルレート | 48 kHz |
| チャンネル | モノラル |
| Opus フレーム長 | 20 ms |
| RTP タイムスタンプの増分 | `960` |
| PLANET 音声ペイロードのプレフィックス | `00` |

以降では、これらの値が必要な理由と、通話フロー内での役割を説明します。

## 通話の基本構造 {#mental-model}

LINE 通話は、ユーザーに音声を直接送信することで開始するものではありません。
まず制御プレーンのセッションを確立し、その後でメディアプレーンのセッションを確立する必要があります。

```txt
Control plane:
  ask LINE for a route
  connect to the PLANET relay
  send setup_req so the peer starts ringing
  wait for conn_req when the peer answers
  send conn_rsp to finish negotiation

Media plane:
  derive SRTP keys from the answer material
  encode audio as Opus
  wrap each Opus frame the way native PLANET audio expects
  send RTP packets protected by SRTP
```

`client.call.acquireRoute()` は制御プレーンに属し、`transport.send()` はメディアプレーンに属します。
シグナリングが成功しても相手に音声が聞こえない場合は、メディアプレーンの鍵モード、ペイロードのプレフィックス、Opus フレーム長、RTP タイムスタンプ、リアルタイムの送信間隔を調べてください。

## 実装状況 {#implementation-status}

| 項目 | 状況 |
| --- | --- |
| 1:1 通話経路の取得 | `client.call.acquireRoute()` |
| Android からの 1:1 音声通話の発信 | `PlanetTransport` |
| PLANET SETUP/INVITE シグナリング | `inviteDetailed()` |
| 相手の応答ハンドシェイク | `waitForAnswerDetailed()` と自動の `conn_rsp` |
| SRTP メディアの送受信 | `AES_CM_128_HMAC_SHA1_80` |
| Opus エンコード／デコードのフック | `opusCodecFactory()` |
| WAV/PCM ヘルパー | `decodeWavSync()`、`resampleLinear()`、`bufferSource()` |
| 着信通知 | `call:incoming`、`call:cancel` |
| 1:1 着信への応答 | 検証済みの音声通話とビデオ通話に対する `answerIncoming` |
| グループ通話の URL／制御 API | `client.call.*` でラップ |
| PLANET グループ通話への参加 | `PlanetTransport.joinGroupDetailed()` |
| グループ通話の音声送信 | ネイティブ形式のグループ Opus パケット化で対応 |

従来の `AndromedaTransport` と SIP/MIKEY ヘルパーも、実験と互換性のために引き続きエクスポートされています。
ただし、現在の Android で動作する 1:1 音声通話フローは PLANET です。

## 公開エントリーポイント {#public-entry-points}

ほとんどのアプリケーションでは、次のエクスポートだけで足ります。

```ts
import { loginWithAuthToken } from "@nezumi0627/vylinejs";
import {
	decodeWavSync,
	opusCodecFactory,
	PlanetTransport,
	resampleLinear,
} from "@nezumi0627/vylinejs/call";
```

主な通話 API は次のとおりです。

| API | 用途 |
| --- | --- |
| `client.call.acquireRoute({ to, callType: "AUDIO" })` | 相手への新しい通話経路を取得します。 |
| `new PlanetTransport({ localMid, ... })` | PLANET のシグナリングとメディアのトランスポートを作成します。 |
| `transport.connect({ route })` | UDP を開き、PLANET トランスポートの暗号処理を準備します。 |
| `transport.inviteDetailed({ to })` | `setup_req` を送信し、`setup_rsp` を待機します。 |
| `transport.waitForAnswerDetailed()` | 相手の `conn_req` を待機し、SRTP 鍵を導出して `conn_rsp` を送信します。 |
| `transport.send(packet, { timestampStep })` | SRTP で保護された RTP メディアパケットを1つ送信します。 |
| `transport.receive()` | SRTP 認証後の受信メディアペイロードを順次返します。 |
| `transport.close()` | 該当する場合は `rel_req` を送信し、ソケットを閉じます。 |

## 音声を発信する最小例 {#minimal-outgoing-audio-call}

これは低レベルの処理を明示したフローです。
各プロトコル手順が見えるよう、意図的に詳しく記述しています。

```ts
import { loginWithAuthToken } from "@nezumi0627/vylinejs";
import {
	decodeWavSync,
	opusCodecFactory,
	PlanetTransport,
	resampleLinear,
} from "@nezumi0627/vylinejs/call";

const client = await loginWithAuthToken(Deno.env.get("LINE_AUTH_TOKEN")!, {
	device: "ANDROID",
});

const to = Deno.env.get("LINE_CALL_TO")!;
const localMid = client.base.profile?.mid;
if (!localMid) throw new Error("profile is not ready");

const route = await client.call.acquireRoute({
	to,
	callType: "AUDIO",
	fromEnvInfo: { devname: "Android" },
});
const transport = new PlanetTransport({
	localMid,
	mediaKeyMode: "audio-reverse-stage",
	timeoutMs: 10_000,
});

try {
	await transport.connect({ route });
	await transport.inviteDetailed({ to });

	const answer = await transport.waitForAnswerDetailed({
		autoConnRsp: true,
		timeoutMs: 60_000,
	});
	if (!answer.mediaReady) {
		throw new Error("peer answered, but media keys were not established");
	}

	const wav = decodeWavSync(await Deno.readFile("./audio.wav"));
	let samples = wav.samples;
	if (wav.sampleRate !== 48_000) {
		samples = resampleLinear(samples, wav.sampleRate, 48_000, wav.channels);
	}
	if (wav.channels !== 1) {
		samples = downmixToMono(samples, wav.channels);
	}

	const codec = await opusCodecFactory();
	const encoder = codec.newEncoder({
		sampleRate: 48_000,
		channels: 1,
		frameDurationMs: 20,
		signal: "music",
	});

	try {
		for (let offset = 0; offset < samples.length; offset += 960) {
			const frame = new Int16Array(960);
			frame.set(samples.subarray(offset, offset + 960));
			const opus = encoder.encode({
				samples: frame,
				sampleRate: 48_000,
				channels: 1,
			});
			if (opus) {
				await transport.send(prepend(opus, new Uint8Array([0x00])), {
					timestampStep: 960,
				});
			}
			await sleep(20);
		}
	} finally {
		encoder.close?.();
	}
} finally {
	await transport.close();
}

function prepend(packet: Uint8Array, prefix: Uint8Array): Uint8Array {
	const out = new Uint8Array(prefix.length + packet.length);
	out.set(prefix, 0);
	out.set(packet, prefix.length);
	return out;
}

function downmixToMono(samples: Int16Array, channels: number): Int16Array {
	if (channels <= 1) return samples;
	const frames = Math.floor(samples.length / channels);
	const out = new Int16Array(frames);
	for (let frame = 0; frame < frames; frame++) {
		let sum = 0;
		for (let channel = 0; channel < channels; channel++) {
			sum += samples[frame * channels + channel] ?? 0;
		}
		out[frame] = Math.max(-32768, Math.min(32767, Math.round(sum / channels)));
	}
	return out;
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
```

再利用できる完全なスクリプトは、`example/call/call_on_command.ts` を参照してください。

## コマンドをトリガーにするサンプル {#command-trigger-example}

`example/call/call_on_command.ts` は、Talk チャット内の `!call` を監視します。
1:1 チャットでは、送信者に発信して同梱の `unity.wav` をストリーミングします。
グループチャットやルームチャットでは、グループ通話を開始または参加して、同じ音声を LINE.js だけでストリーミングします。
経路の取得、PLANET への参加、SRTP の設定、RTP メディアは、すべてライブラリが処理します。

```sh
LINE_AUTH_TOKEN_FILE=/path/to/auth-token.txt \
LINE_DEVICE=ANDROID \
deno run -A example/call/call_on_command.ts
```

同梱の音声は、任意の 16 ビット PCM WAV に置き換えられます。

```sh
LINE_AUTH_TOKEN_FILE=/path/to/auth-token.txt \
LINE_DEVICE=ANDROID \
deno run -A example/call/call_on_command.ts ./voice.wav
```

このサンプルでは、アカウント固有の情報を意図的にリポジトリの外に置きます。

| 変数 | 既定値 | 意味 |
| --- | --- | --- |
| `LINE_AUTH_TOKEN` | | 認証トークン文字列。 |
| `LINE_AUTH_TOKEN_FILE` | | 認証トークンを含むファイル。未設定の場合は QR ログインを使用します。 |
| `LINE_STORAGE_FILE` | | 任意の `FileStorage` パス。未設定の場合はメモリ内ストレージを使用します。 |
| `LINE_DEVICE` | 状況に応じて選択 | ログイン端末の種別。認証トークンがある場合は `ANDROID`、それ以外は `ANDROIDSECONDARY` が既定です。 |
| `LINE_VERSION` | パッケージの既定値 | `x-line-application` で使用する LINE アプリのバージョン。 |
| `LINE_CALL_DEVNAME` | パッケージの既定値 | 経路の取得時に `fromEnvInfo.devname` で送信する端末名。 |
| `LINE_CALL_DEVICE_INFO` | Android の既定値 | PLANET ユーザーエージェントの端末情報。特定のネイティブクライアントを模倣する場合に限り上書きしてください。 |
| `LINE_CALL_FROM_ENV_INFO` | | 経路取得フィールド `fromEnvInfo` 全体を指定する JSON 文字列マップ。 |
| `LINE_CALL_COMMAND` | `!call` | 通話を開始するチャットコマンド。 |
| `LINE_CALL_WAV` | `./unity.wav` | ストリーミングする WAV ファイル。最初の CLI 引数で上書きされます。 |
| `LINE_CALL_FRAME_MS` | `20` | Opus フレーム長。 |
| `LINE_CALL_PAYLOAD_PREFIX_HEX` | `00` | ネイティブ PLANET 音声ペイロードのプレフィックス。 |
| `LINE_CALL_MEDIA_KEY_MODE` | モードごとの既定値 | SRTP 鍵の選択モード。1:1 通話では `audio-reverse-stage`、グループ通話では `audio-secret-sender` が既定です。 |
| `LINE_CALL_GAIN` | `1` | Opus エンコード前の PCM ゲイン。 |
| `LINE_CALL_REPEAT_COUNT` | `1` | 通話を閉じる前に WAV を繰り返し再生する回数。 |
| `LINE_CALL_HOLD_MS` | `1000` | 音声終了後に接続を維持する追加時間。 |
| `LINE_CALL_TIMEOUT_MS` | `10000` | 最初の PLANET 応答のタイムアウト。 |
| `LINE_CALL_ANSWER_TIMEOUT_MS` | `60000` | 相手の応答を待つ間のタイムアウト。 |
| `LINE_CALL_OPUS_BITRATE` | | 任意の Opus ビットレート（bit/s）。 |
| `LINE_CALL_OPUS_BANDWIDTH` | | 任意の Opus 帯域幅。 |
| `LINE_CALL_OPUS_SIGNAL` | `music` | Opus の信号ヒント。音声のみのクリップには `voice` を使用します。 |
| `LINE_CALL_OPUS_VBR` | `false` | Opus VBR を有効にします。 |

## 発信フローの仕組み {#how-the-outgoing-flow-works}

1:1 音声通話の発信には7つの段階があります。

### 1. 通話経路の取得 {#_1-acquire-a-call-route}

`client.call.acquireRoute({ to, callType: "AUDIO" })` は、通話の開始に必要な経路を LINE に要求します。
ネイティブ Android クライアントは、この段階で `devname` エントリを持つ小さな `fromEnvInfo` マップを含めます。
Vylinejs は既定で汎用の端末名を送信します。
プライマリトークンを使用するセッションが正確な端末プロファイルに左右される場合は、これを上書きできます。

```ts
const route = await client.call.acquireRoute({
	to,
	callType: "AUDIO",
	fromEnvInfo: { devname: "Pixel 8" },
});
```

返される `CallRoute` には次の情報が含まれます。

- 相手の MID とルーティングメタデータ。
- IPv4 の PLANET エンドポイント、および場合によっては IPv6 のエンドポイント。
- 通話リレーが使用する UDP ポート。
- `mpkey` などの PLANET ブートストラップパラメーターを含む `commParam`。
- `setup_req` 内で使用する通話トークンとサービスルーティングのフィールド。

経路の有効期間は短いため、管理された診断環境で意図的に経路を再利用する場合を除き、通話を試みるたびに新しい経路を取得してください。

### 2. PLANET トランスポートへの接続 {#_2-connect-the-planet-transport}

`PlanetTransport.connect({ route })` は経路を解析し、IPv4 または IPv6 を選び、UDP ソケットを開いてローカルの暗号状態を準備します。
この段階では相手を呼び出しません。
最初の PLANET パケットを送信できる状態にするだけです。

`connect()` 中に、Vylinejs は次の情報を生成します。

- PLANET トランスポートの暗号化用の一時的な P-256 鍵ペア。
- ブートストラップシードと方向ラベル。
- ランダムなトランザクション ID、チャンネル ID、通話 UUID、フレームシーケンス値。
- PLANET メッセージヘッダーに格納するローカル nonce。

経路の `commParam.mpkey` は、相手リレーの公開鍵としてデコードされます。
Vylinejs はその鍵で ECDH を実行し、ネイティブと同じ2段階の HKDF チェーンで PLANET トランスポート鍵を導出します。

### 3. `setup_req` の送信 {#_3-send-setup-req}

`transport.inviteDetailed({ to })` は、暗号化された PLANET フレーム内で Cassini の `setup_req` を送信します。
このパケットによって相手の呼び出しが始まります。

最初に送信する SETUP パケットには、次の特徴があります。

- ブートストラップ用のフレーム形式を使用します。
- 平文のブートストラッププレフィックスにローカルの一時公開鍵を格納します。
- 固定の Cassini セットアップメッセージ ID を使用します。
- ネイティブと同じ形式の Android ユーザーエージェントを含めます。
- 後で SRTP 鍵の確立に使用する、ネイティブと同じ形式のメディアオファーを含めます。
- 経路と通話 UUID から導出した認証情報を格納します。

`inviteDetailed()` は `setup_rsp` を待機します。
返されるオブジェクトには、生の平文、デコード済みの PLANET/Cassini メッセージ、および結果コードやキープアライブ間隔などのデコード済みセットアップ応答フィールドが含まれます。

### 4. リモート nonce の取得とリレー接続の維持 {#_4-learn-remote-nonce-and-keep-the-relay-open}

最初のサーバー応答には、リレーのローカル nonce が含まれます。
Vylinejs はこれをリモート nonce として保存し、それ以降の PLANET ヘッダーに含めます。
この状態遷移がなければ、その後の制御メッセージは復号できても、サーバーのステートマシンによって拒否されることがあります。

`setup_rsp` の後、Vylinejs はネイティブ形式のピンホールプローブを送信し、サーバーが返した間隔でキープアライブを開始します。
これらのパケットは、相手を呼び出している間、UDP 経路を利用可能な状態に保ちます。

### 5. `conn_req` の待機 {#_5-wait-for-conn-req}

相手が応答すると、リレーは Cassini の `conn_req` を送信します。
次のように待機します。

```ts
const answer = await transport.waitForAnswerDetailed({
	autoConnRsp: true,
	timeoutMs: 60_000,
});
```

応答結果には次のフィールドが含まれます。

| フィールド | 意味 |
| --- | --- |
| `connReq` | デコード済みの接続要求。 |
| `peerAnswerOffer` | 存在する場合、デコード済みの相手のメディア応答。 |
| `peerOffer` | 存在する場合、別形式でデコードされた相手のオファー。 |
| `connRspSent` | Vylinejs が `conn_rsp` を送信したかどうか。 |
| `mediaReady` | SRTP 送受信コンテキストと RTP の送信先が設定されたかどうか。 |

`autoConnRsp: true` の場合、Vylinejs は `conn_rsp` を送信し、相手の状態が落ち着くまで重複する `conn_req` パケットにも応答します。
実際のクライアントは応答のネゴシエーション中に `conn_req` を繰り返すことがあるため、この処理が重要です。

### 6. SRTP/Opus メディアの送信 {#_6-send-srtp-opus-media}

`answer.mediaReady` が `true` になると、`transport.send()` は SRTP で保護された RTP パケットを送信します。
`send()` に渡すパケットは完全な RTP パケットではなく、LINE の音声ペイロードです。
`PlanetTransport` が RTP を構築し、SRTP で暗号化と認証を行って、ネゴシエーション済みのメディアエンドポイントに送信します。

Android 音声で動作する既定値は次のとおりです。

- PCM 入力：48 kHz、モノラル、符号付き 16 ビット。
- Opus フレーム長：20 ms。
- Opus フレームあたりのサンプル数：960。
- RTP タイムスタンプの増分：960。
- Opus 信号：音楽クリップには `music`、音声には `voice`。
- ペイロードのプレフィックス：Opus パケットの前に1バイトの `00`。
- メディア鍵モード：`audio-reverse-stage`。

このプレフィックスは重要です。
ネイティブ PLANET の音声ペイロードでは、Opus フレームの前に1バイトのラッパーが付きます。
相手が SRTP を受信しているのに無音、途切れたノイズ、繰り返す異音が聞こえる場合は、ペイロードのプレフィックスとフレームの送信タイミングが上記の値に一致するか確認してください。

### 7. 通話の終了 {#_7-close-the-call}

`transport.close()` はキープアライブを停止し、SETUP が送信済みなら `rel_req` を送信し、UDP ソケットを閉じて、待機中のメディア受信イテレーターを終了します。

発信者がスクリプトを終了した後、一部のクライアントでは通話の終了コードが表示されます。
スクリプトが音声の送信後に意図的に通話を切断する場合、これは想定どおりです。

## PLANET と Cassini {#planet-and-cassini}

PLANET は、現在の Android 通話経路で使用する UDP トランスポートです。
Cassini は、PLANET フレーム内で運ばれる通話制御メッセージ層です。

大まかな構造は次のとおりです。

```txt
UDP datagram
  PLANET frame header
    encrypted planet_msg
      planet_msg_hdr
      sc_msg, cc_msg, or raw control body
        Cassini call-control body
```

Vylinejs は次の処理を担当します。

- ブートストラップパケットと通常のパケットに対する、ネイティブ互換のフレームヘッダー。
- PLANET 制御パケットの AES-CTR 暗号化と HMAC 認証。
- 最初の受信パケットからのリレー nonce の取得。
- Cassini の `setup_req`、`setup_rsp`、`conn_req`、`conn_rsp`、`info_req`、`info_rsp`、キープアライブ、`rel_req`。
- 生のピンホールプローブパケット。
- `PlanetTransportOpts.debug` によるデバッグフック。

主な通話制御メッセージは次のとおりです。

| メッセージ | 方向 | 用途 |
| --- | --- | --- |
| `setup_req` | 発信者 -> リレー | 通話を開始し、相手を呼び出します。 |
| `setup_rsp` | リレー -> 発信者 | セットアップを確認し、キープアライブのタイミングと呼び出し状態を返します。 |
| ピンホールプローブ | 発信者 -> リレー | 通話メディア用の NAT/UDP 経路を利用可能な状態に保ちます。 |
| キープアライブ | 発信者 -> リレー | PLANET セッションを維持します。 |
| `conn_req` | リレー -> 発信者 | 相手の応答を通知し、メディア応答の素材とメディアエンドポイントのフィールドを運びます。 |
| `conn_rsp` | 発信者 -> リレー | 応答を確認し、メディアのネゴシエーションを完了します。 |
| `info_req` | リレー -> 発信者 | その他の制御要求。Vylinejs は `info_rsp` で応答します。 |
| `rel_req` | 発信者 -> リレー | 通話を解放して終了します。 |

## 鍵のモデル {#keying-model}

暗号処理には、異なる2つの層があります。

### トランスポート鍵 {#transport-keys}

PLANET 制御パケットは、メディアの開始前に暗号化と認証が行われます。
トランスポート鍵の導出には次を使用します。

- 経路の `commParam.mpkey`。
- Vylinejs が生成したローカルの一時的な P-256 鍵ペア。
- ブートストラップシードと方向ラベル。
- ネイティブ互換の2段階 HKDF チェーン。

これらの鍵は PLANET/Cassini シグナリングを保護します。
RTP 音声メディアに使用する鍵とは異なります。

### メディア鍵 {#media-keys}

SRTP メディア鍵は、相手の応答後に導出されます。
ローカルの SETUP オファーには、メディア用の ECDH 素材、ID、nonce、ストリーム素材が含まれます。
相手の応答には、それに対応するメディア素材が含まれます。
ネイティブクライアントでは方向に応じて素材の並び順が変わるため、Vylinejs は鍵素材の向きが異なる複数の候補を導出します。

`PlanetTransportOpts.mediaKeyMode` で、使用する候補を選択します。

| モード | 用途 |
| --- | --- |
| `current` | ストリーム固有ではない基本の鍵素材の向き。 |
| `reverse-stage` | 基本の向きを反転したもの。 |
| `sender-material` | 送信側素材を使用する基本の向き。 |
| `sender-material-reverse-stage` | 送信側素材の向きを反転したもの。 |
| `audio-current` | `current` から導出する AUDIO ストリーム鍵。 |
| `audio-reverse-stage` | `reverse-stage` から導出する AUDIO ストリーム鍵。Android 音声送信で動作する既定値です。 |
| `audio-sender-material` | 送信側素材から導出する AUDIO ストリーム鍵。 |
| `audio-sender-material-reverse-stage` | 反転した送信側素材から導出する AUDIO ストリーム鍵。 |
| `secret-receiver` / `secret-sender` | 秘密素材を直接使用するモード。 |
| `audio-secret-receiver` / `audio-secret-sender` | 秘密素材から直接導出する AUDIO ストリーム鍵。 |
| `auto` | `current` で開始し、認証済みの受信 RTP が別の候補の正しさを示した場合に、受信モードを切り替えられます。 |

別のネイティブ経路をテストする場合を除き、音声の発信サンプルでは `audio-reverse-stage` を優先してください。

## RTP、SRTP、音声ペイロード {#rtp-srtp-and-audio-payloads}

`PlanetTransport.send(payload)` は LINE の音声ペイロードを受け取り、次の処理を行います。

1. ネゴシエーション済みのペイロードタイプと SSRC を使用して RTP パケットを構築します。
2. RTP シーケンス番号とタイムスタンプを増加させます。
3. ネイティブの拡張プロファイル `0x0240` を付加します。
4. `AES_CM_128_HMAC_SHA1_80` で暗号化と認証を行います。
5. 生成した SRTP データグラムをネゴシエーション済みのメディアエンドポイントに送信します。

Opus フレーム長に合わせて `timestampStep` を指定してください。

| フレーム長 | 48 kHz でのサンプル数 | `timestampStep` |
| --- | ---: | ---: |
| 10 ms | 480 | 480 |
| 20 ms | 960 | 960 |
| 40 ms | 1920 | 1920 |
| 60 ms | 2880 | 2880 |

20 ms が最も無難な既定値です。
パケットの送信が速すぎる、遅すぎる、あるいはタイムスタンプの増分が間違っている場合、相手には音切れや同じ断片の繰り返しが聞こえたり、まったく聞こえなかったりすることがあります。

## 音声パイプライン {#audio-pipeline}

LINE の通話メディアは、RTP ストリーム内の Opus フレームを想定しています。
Vylinejs はパイプライン全体を隠蔽せず、小さな構成要素を提供します。

| ヘルパー | 用途 |
| --- | --- |
| `decodeWavSync(bytes)` | 非圧縮の 16 ビット PCM WAV をデコードします。 |
| `resampleLinear(samples, fromRate, toRate, channels)` | 線形補間による PCM リサンプラー。 |
| `bufferSource()` | PCM を時間に合わせたフレームに分割します。 |
| `bufferSink()` | デコード済みの PCM フレームを収集します。 |
| `streamSource()` / `streamSink()` | Web ストリームを通話音声のソース／シンクに適合させます。 |
| `opusCodecFactory()` | `opusscript` を読み込み、Opus エンコーダー／デコーダーを作成します。 |
| `packetizeNativeGroupOpusPairs()` | 2つの 20 ms Opus パケットを、ネイティブの 40 ms グループ通話ペイロード形式に結合します。 |

推奨する送信側のパイプラインは次のとおりです。

```txt
input audio
  -> decode to signed 16-bit PCM
  -> downmix to mono
  -> resample to 48 kHz
  -> optional gain
  -> split into 20 ms frames
  -> Opus encode
  -> prepend 00
  -> transport.send(..., { timestampStep: 960 })
```

`decodeWavSync()` が対応するのは、非圧縮の 16 ビット PCM WAV のみです。
それ以外の形式は、Vylinejs に渡す前に変換してください。

```sh
ffmpeg -i input.mp3 -ac 1 -ar 48000 -sample_fmt s16 output.wav
```

音声には `signal: "voice"` が適しています。
音楽や音声と音楽が混在するクリップには `signal: "music"` を使用してください。
同梱のコマンドサンプルは WAV サンプルをストリーミングするため、既定値は `music` です。

```ts
const encoder = (await opusCodecFactory()).newEncoder({
	sampleRate: 48_000,
	channels: 1,
	frameDurationMs: 20,
	signal: "music",
	bitrate: 32_000,
});
```

## メディアの受信 {#receiving-media}

`transport.receive()` は、`mediaReady` が true になった後、認証済みの相手のメディアペイロードを順次返します。

```ts
for await (const payload of transport.receive()) {
	// payload is the decrypted LINE audio payload.
	// Strip native wrappers before feeding raw Opus to a decoder if needed.
}
```

`mediaKeyMode: "auto"` を使用すると、パケットの認証後に受信側の SRTP が候補の鍵モードへ切り替わることがあります。
送信側のモードは引き続き設定されたモードから選択されるため、発信サンプルでは動作確認済みのモードを明示的に設定してください。

## 着信イベント {#incoming-call-events}

`client.listen({ talk: true })` は、Talk オペレーションからデコードした通話通知を発行します。

```ts
client.on("call:incoming", ({ callMid, from, kind }) => {
	console.log("incoming call", { callMid, from, kind });
});

client.on("call:cancel", ({ callMid, from, reason }) => {
	console.log("call canceled", { callMid, from, reason });
});

client.listen({ talk: true, square: false });
```

検証済みの 1:1 音声通話とビデオ通話の通知には、アプリケーションが使用する固定のインストール ID を指定して明示的に応答します。

```ts
client.on("call:incoming", async (event) => {
	const transport = await client.call.answerIncoming(event, { deviceId });
	if (event.kind === "VIDEO") {
		for await (const frame of transport.receiveVideo()) {
			await videoDecoder.decode(frame.data, { keyFrame: frame.key, timestamp: frame.timestamp });
		}
	}
});
```

未対応または未認証の通話メタデータは、応答のやり取りが始まる前に拒否されます。
通話 UI、メディアの取得、エンコード、後処理は引き続きアプリケーションが担当します。

## `CallSession` {#callsession}

`CallSession` は、トランスポートに依存しないラッパーです。
`CallTransport` を通じて、経路の取得、トランスポート接続、任意の招待、任意の応答待機、音声の送受信を実行できます。

```ts
const session = client.call.startSession({
	to,
	kind: "AUDIO",
	transport: new PlanetTransport({
		localMid,
		mediaKeyMode: "audio-reverse-stage",
	}),
});

await session.start();
await session.sendBuffer({
	samples,
	sampleRate: 48_000,
	channels: 1,
});
await session.end();
```

`CallSession` は、設定したコーデックが返したデータをそのまま送信します。
ネイティブの `00` ペイロードプレフィックスが必要な PLANET 音声では、上記のように `PlanetTransport` を明示的に呼び出すか、コーデック／トランスポートをラップして `send()` の前にプレフィックスを追加してください。

## デバッグ {#debugging}

トランスポートの `debug` を有効にすると、秘密情報をログに記録せずにシグナリングとメディアの状態を調べられます。

```ts
const transport = new PlanetTransport({
	localMid,
	mediaKeyMode: "audio-reverse-stage",
	debug(event) {
		console.log("[planet]", event);
	},
});
```

役立つイベントには次のものがあります。

| イベント | 意味 |
| --- | --- |
| `send` / `recv` | PLANET 制御パケットの送信または受信。 |
| `decrypt_ok` / `decrypt_fail` | 制御パケットの認証／復号の状態。 |
| `plain_shape` | デコード済み protobuf フィールドの構造。 |
| `media_configured` | SRTP 鍵、RTP エンドポイント、ペイロードタイプ、SSRC が選択されました。 |
| `media_send` | SRTP メディアパケットを1つ送信しました。 |
| `media_recv` | SRTP メディアパケットを1つ認証して復号しました。 |
| `media_decrypt_fail` | 現在の候補では受信 RTP を認証できませんでした。 |

公開サンプルや issue 報告では、認証トークン、MID、経路全体、復号済みパケット全体、鍵素材をログに記録しないでください。

## トラブルシューティング {#troubleshooting}

| 症状 | 考えられる原因 | 確認事項 |
| --- | --- | --- |
| 相手の呼び出しが始まらない | `setup_req` がない、経路が古い、相手が違う、または経路の取得に失敗しています。 | 新しい経路を取得し、`inviteDetailed()` を呼び出して、`route.fakeCall` が false であることを確認してください。 |
| `acquireCallRoute(/V4)` が `INVALID_STATE` を返す | シグナリング開始前に、LINE がアカウント、相手、または端末の状態を拒否しました。 | コマンドが通話可能な友だちとの 1:1 チャットから送られたことを確認し、自分自身に発信せず、`LINE_DEVICE` をトークンの端末系列に合わせ、`LINE_CALL_DEVNAME` または `fromEnvInfo.devname` にプライマリ端末の機種名を設定してください。 |
| 呼び出し前に `PLANET reply timeout` になる | UDP 経路またはトランスポート鍵のブートストラップに失敗しました。 | IPv4/IPv6 の選択、ネットワーク、経路のエンドポイント、`commParam.mpkey` を確認してください。 |
| 相手が応答しても `mediaReady` が false | `conn_req` にデコード可能なメディア素材が含まれていませんでした。 | `answer.peerAnswerOffer`、`answer.peerOffer`、デバッグの `plain_shape` を調べてください。 |
| 相手に音声が聞こえない | SRTP は有効でも、ペイロード形式が誤っている可能性があります。 | `mediaKeyMode: "audio-reverse-stage"` を使用し、Opus の前に `00` を付け、20 ms フレームを送信してください。 |
| 相手にノイズや途切れた音声が聞こえる | フレームのタイミングが誤っている、サンプル変換が不適切、またはプレフィックスがありません。 | 48 kHz モノラル PCM、20 ms Opus、`timestampStep: 960`、リアルタイムのスリープを使用してください。 |
| 音声が速すぎる、または遅すぎる | RTP タイムスタンプの増分がフレーム長に一致していません。 | `sampleRate * frameMs / 1000` を使用してください。 |
| 音声が終わると通話が切れる | スクリプトがトランスポートを閉じました。 | 接続の維持時間を増やすか、トランスポートを開いたままにしてください。 |
| 終了後に通話の終了コードが表示される | スクリプトが解放処理を開始しました。 | 短いスクリプトによる通話では想定どおりです。 |
| `decodeWavSync` がファイルを拒否する | ファイルが圧縮されているか、16 ビット PCM WAV ではありません。 | ffmpeg で `-ac 1 -ar 48000 -sample_fmt s16` に変換してください。 |
| Deno の権限エラー | 実行時の権限が不足しています。 | サンプルには `deno run -A` を使用するか、必要に応じて `--allow-net --allow-read --allow-env --allow-run` を付与してください。 |

## E2EE とプライバシーに関する注意事項 {#e2ee-and-privacy-notes}

Talk メッセージの E2EE と通話メディアのセキュリティは、別の仕組みです。
`!call` をトリガーとする Talk メッセージは、ハンドラーが受け取る前に Vylinejs が E2EE 復号する場合がありますが、通話自体は PLANET トランスポート暗号と SRTP メディア暗号を使用します。

Talk メッセージの E2EE 素材から通話メディア鍵を導出しないでください。
次の情報を公開しないでください。

- 認証トークン。
- ストレージファイル。
- 個人の MID。
- 取得した `CallRoute` オブジェクト。
- 実際のアカウントから得た復号済み PLANET 平文。
- SRTP または PLANET の鍵素材。

このリポジトリのサンプルでは、アカウント固有の状態を公開せずにコピーできるよう、環境変数と汎用のパスを使用しています。

## グループ通話 {#group-calls}

グループ通話の制御プレーンのフローは、1:1 通話とは異なります。
1:1 通話では、LINE に相手への経路を要求し、`setup_req` を送信して相手を呼び出します。
グループ通話では、まずチャットの通話状態を確認し、そのチャット用のグループ経路を取得して PLANET に接続し、ルームに参加します。

```ts
const state = await client.call.getGroupCall(chatMid);
const online = (state as { online?: boolean }).online === true;

const route = await client.call.acquireGroupRoute({
	chatMid,
	mediaType: "AUDIO",
	isInitialHost: !online,
	capabilities: ["AUDIO", "VIDEO"],
} as never);

const transport = new PlanetTransport({
	localMid,
	mediaKeyMode: "audio-secret-sender",
});

await transport.connect({ route });
const joined = await transport.joinGroupDetailed({ roomId: chatMid });
if (!joined.mediaReady) {
	throw new Error("joined group call, but media was not established");
}
```

登録処理は、メディアチャンネルが非ゼロで、AUDIO、VIDEO、DATA の有効なソース ID を持つ、成功した最終 PARTICIPATE 応答を待機します。
AUDIO と DATA の RTP SSRC を含め、応答のフィールド 11 の ID を受信ストリームに、フィールド 61 の ID を送信ストリームに使用します。
暫定応答ではストリームを割り当てられません。
`groupDataSessionAfterProvisional` は非推奨で、無視されます。
失敗した応答や不完全な応答では、制御チャンネルへのフォールバックを行わず、例外をスローします。

`mediaReady` の後は、汎用の Opus パケット化処理ではなく、グループ固有の **EAS2** ペイロード用の `packetizeNativeGroupOpusPairs()` を使用してください。
このヘルパーは、形式の一致する2つのモノラル 20 ms code-0 Opus フレームを、1つの 40 ms code-3 ペイロードに結合します。
CELT の場合、EAS2 は TOC／カウントの後、VBR 長やフレームデータの前に、MSB 順のアクティビティビットマップを追加します。
各ビットは発話だけでなく、無声音も含めた**非無音**を意味します。
SILK/hybrid には、この外部ビットマップは不要です。

`CallSession` は、PLANET グループへの参加を実行し、受信した参加者の音声を 48 kHz モノラル PCM にミックスできるようになりました。
取得したグループ経路とチャット MID をセッションの対象として渡してください。

```ts
const session = client.call.startSession({
	to: chatMid,
	group: { route },
	transport: new PlanetTransport({ localMid }),
	codecs: opusCodecFactory(),
});

await session.start();
for await (const frame of session.received()) {
	await audioSink.write(frame);
}
```

グループ受信側は XRTP を多重分離し、EAS2 フレームを展開して、SSRC ごとに独立してデコードし、初期再生バッファーに 60 ms の余裕を設けてアクティブなソースをミックスします。
`session.participants` には最新の参加者一覧が入り、`participants` イベントは初期状態とその後の会議プッシュ通知で発火します。
アクティブな参加者一覧にない音声は、ミキサーから除外されます。
参加者ごとのストリームが必要なアプリケーションは、`CallSession.received()` の代わりに `PlanetTransport.receiveAudio()` を直接使用できます。
グループ会議の通知は、別の DATA SRTP 鍵を使って転送されます。
PLANET notifier パケットは再組み立てと受信確認が行われた後、その参加者一覧の更新が発行されます。

参加者一覧でリモートの映像ソースが通知されると、トランスポートはそれらの SVC ストリームを購読し、VIDEO SRTP を独立して認証し、VP8 SVC プロファイルのラッパーを外して、サイズ制限付きの EVS3 フレームを再組み立てします。
検証済みの送信者 MID が付いた、エンコード済み VP8 フレームを処理します。

```ts
for await (const frame of session.receivedVideo()) {
	await videoDecoder.decode(frame.data, {
		keyFrame: frame.key,
		timestamp: frame.timestamp,
	});
}
```

1:1 またはグループのビデオ通話では、`kind: "VIDEO"` でセッションを開始し、ローカル映像を有効にしてから、エンコーダーの VP8 キーフレームと差分フレームを渡します。
1:1 通話はセットアップオファーで映像を通知します。
グループ通話は参加オファーで映像を通知し、相手がストリームを要求している間だけ送信します。

```ts
await session.setVideoEnabled(true);
await session.sendVideo({ data: vp8Bytes, key: true, timestamp: timestamp90k });
```

カメラ映像の取得、VP8 エンコード、フレームの送信間隔、キーフレーム要求はアプリケーションが担当します。
最初にキーフレームを送信し、その後はエンコーダーの生成間隔に合わせてフレームを渡してください。
`session.setVideoEnabled(false)` を await すると、相手が制御要求を確認した後に送信を停止します。

このヘルパーは、1:1 サンプルと同じプレフィックス付き 20 ms パケットを受け取ります。
CELT を使用する場合は、入力フレームごとにアクティビティを示す真偽値を1つ指定してください。

```ts
import { packetizeNativeGroupOpusPairs } from "@nezumi0627/vylinejs/call";

const groupPackets = packetizeNativeGroupOpusPairs(oneToOneStylePackets, {
	frameActivity, // boolean[] from your encoder or a PCM non-silence meter
});
for (const packet of groupPackets) {
	await transport.send(packet, { timestampStep: 1920 });
	await sleep(40);
}
```

このヘルパーは `inputPrefixBytes`（既定値 `1`、生の Opus では `0` を指定）を除去し、CBR または VBR のフレーム形式を書き込みます。
最初の2つの出力ペイロードにはネイティブプレフィックス `00` を使用し、それ以降は `10` を使用します。
プレフィックスの進行を維持するため、クリップ全体を1回の呼び出しで渡してください。
48 kHz では `timestampStep: 1920` と 40 ms の送信間隔を使用します。

フレーム数が奇数、フレームが空または過大、ステレオ、20 ms 以外のフレーム、code-0 以外の入力、ペア内の TOC の不一致、CELT アクティビティの欠落がある場合は、不正なペイロードを生成したり音声を黙って破棄したりせず、例外をスローするようになりました。
必要に応じて最後の入力ペアをパディングしてください。
コマンドサンプルはこの処理を行い、アクティビティをネイティブエンコーダーの VAD **ではなく**、PCM の非ゼロサンプルを測る単純なメーターから求めます。
グループ再生には `LINE_CALL_FRAME_MS=20` が必要です。

標準の Opus デコーダーで EAS2 出力を処理するには、先にパケット化を解除する必要があります。
ネイティブプレフィックスを除去し、CELT ではアクティビティビットマップも除去してください。
通常のコーデック、`CallSession`、1:1 パケットの意味論は変わりません。

グループ通話 URL とメンバーシップの API も利用できます。

```ts
const created = await client.call.createGroupCallUrl({ /* request */ });
const urls = await client.call.listGroupCallUrls();
const info = await client.call.getGroupCallUrl("ticket");

await client.call.updateGroupCallUrl({ /* request */ });
await client.call.deleteGroupCallUrl({ /* request */ });
await client.call.joinChatByUrl("ticket");
await client.call.invite({ /* request */ });
await client.call.kick({ /* request */ });
```

## テスト範囲 {#test-coverage}

通話の実装には、次の対象に絞ったプロトコルテストがあります。

- PLANET フレームの解析と暗号処理。
- Cassini スキーマのパッキング／デコード。
- SRTP の暗号化／復号。
- RTP/RTCP ヘルパー。
- SDP、SIP、MIKEY、ICE、STUN ヘルパー。
- `CallSession` の状態遷移とストリームの接続処理。
- 任意のコーデック依存関係が利用可能な場合の、Opus エンコード／デコードの統合。

公開サンプルは意図的に小さくしていますが、テスト済みの実装と同じ基本要素を使用しています。

## 問い合わせ {#need-help}

通話関連の問題が発生した場合は、ランタイム、端末プロファイル、ネットワークの詳細、秘密情報を伏せた再現手順を添えて、[Vylinejs の issue](https://github.com/nezumi0627/Vylinejs/issues/new/choose)を作成してください。
認証トークン、通話経路の認証情報、非公開のアカウントデータは添付しないでください。
