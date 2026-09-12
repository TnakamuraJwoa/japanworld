# 06. DNS 調査結果と移行手順

**調査日: 2026-09-11。DNS レコードの変更は一切行っていません。**

このドメインは **メール（heteml）と、稼働中のサブドメイン2つ（jwcc / nft）** を抱えています。
www を Cloudflare へ向けるだけの作業でも、手順を誤ると **メールが止まり、会員予約システムが落ちます。**

---

## 1. 現状（実測値）

### 1.1 レジストラ・ネームサーバー

```
whois.jprs.jp / japanworld.co.jp
  [Organization]   Japan World Co.,Ltd.
  [Name Server]    01.dnsv.jp
  [Name Server]    02.dnsv.jp
  [Name Server]    03.dnsv.jp
  [Name Server]    04.dnsv.jp
  [State]          Connected (2027/07/31)
  [Last Update]    2026/08/01 01:08:17 (JST)
```

`*.dnsv.jp` は GMOインターネットグループ系（お名前.com など）の DNS サービスで使われるネームサーバーです。
**実際にどの管理画面から操作するかは、貴社の契約状況をご確認ください。**

### 1.2 現在の DNS レコード（DoH で実測）

| ホスト | 種別 | 値 | 用途 |
|---|---|---|---|
| `japanworld.co.jp` | A | `23.236.62.147` | Wix の apex 転送用 IP |
| `japanworld.co.jp` | AAAA | なし | |
| `japanworld.co.jp` | **MX** | **`10 mx.hetemail.jp`** | ⚠ **メール（heteml）。絶対に維持** |
| `japanworld.co.jp` | TXT | **なし** | SPF 未設定 |
| `japanworld.co.jp` | CAA | なし | |
| `_dmarc.japanworld.co.jp` | TXT | **なし** | DMARC 未設定 |
| `www.japanworld.co.jp` | CNAME | `www218.wixdns.net` | Wix のサイト |
| `jwcc.japanworld.co.jp` | A | `52.194.18.214` | ⚠ **JWCCS 会員予約システム（AWS 東京）** |
| `nft.japanworld.co.jp` | A | `8.209.241.197` | ⚠ **JW NFT Platform（Alibaba Cloud）** |

その他のサブドメイン（mail / smtp / pop / imap / ftp / webmail / blog / shop / api / m / cdn /
ns1 / ns2 / test / dev / staging / admin / app / portal / member / members / reserve /
booking / nasu / raki / jw / jwccs / old / new / vpn / owa）は**すべて未登録**でした。

DKIM の一般的なセレクタ（`default` / `google` / `selector1` / `selector2`）も**未登録**です。
heteml の DKIM を使用している場合は、**heteml の管理画面で実際のセレクタ名をご確認ください**
（外部からは総当たりでしか調べられないため、当方では確認していません）。

### 1.3 TLS 証明書

| ホスト | 発行者 | 有効期限 | 状態 |
|---|---|---|---|
| `www.japanworld.co.jp` | Google Trust Services (WR1) | 2026-11-02 | 正常（Wix が自動更新） |
| `jwcc.japanworld.co.jp` | Let's Encrypt (YR2) | 2026-11-01 | 正常 |
| **`nft.japanworld.co.jp`** | DigiCert / RapidSSL（`*.japanworld.co.jp`） | **2026-08-31** | ⚠ **失効済み** |

**nft.japanworld.co.jp は証明書が切れており、ブラウザで警告が出ます。**
DNS 移行とは独立した問題ですが、全ページからリンクしているため早急な対応をおすすめします。

---

## 2. 移行の考え方

**推奨: ネームサーバーは dnsv.jp のまま、`www` の CNAME だけを差し替える**

Cloudflare Workers のカスタムドメインは、原則としてゾーンを Cloudflare に移す必要がありますが、
**まずは Workers の `*.workers.dev` URL で本番同等の確認を行い、
そのうえで移行方式を決める**ことをおすすめします。

理由:

- ゾーン全体を Cloudflare へ移すと、**MX / jwcc / nft を含む全レコードを手作業で再入力**することになります
- 1レコードでも漏れると、メール停止・会員予約システム停止が起きます
- www だけの差し替えなら、失敗しても元の CNAME に戻すだけで復旧します

### 方式 A（低リスク・推奨しない場合もあり）

ネームサーバーは変えず、`www` を Cloudflare Workers のカスタムドメインへ CNAME する。

→ ただし **Cloudflare Workers のカスタムドメインは、そのゾーンが Cloudflare で管理されていることを要求します。**
ゾーンを移さない場合は、Cloudflare Pages / Workers のルート設定が使えず、
`*.workers.dev` へ CNAME する形になりますが、これは Cloudflare 側が推奨していません。

### 方式 B（Cloudflare へゾーン移管・確実だが要注意）

ネームサーバーを Cloudflare のものに変更し、ゾーン全体を Cloudflare で管理する。

→ **この方式を採る場合、下記 3 章のレコードを「ネームサーバー変更前に」すべて登録してください。**

---

## 3. Cloudflare へゾーンを移す場合、移行前に必ず登録するレコード

Cloudflare にゾーンを追加すると既存レコードが自動インポートされますが、
**自動インポートは完全ではありません。必ず以下を目視で照合してください。**

### 3.1 メール（最優先 — 漏れるとメールが止まります）

| 種別 | 名前 | 値 | 優先度 | Proxy |
|---|---|---|---|---|
| MX | `japanworld.co.jp`（@） | `mx.hetemail.jp` | 10 | — |

- **Proxy は必ず OFF（DNS only / グレーの雲）**
- heteml で SMTP/POP/IMAP のホスト名として `*.heteml.jp` を直接指定している場合、
  追加のレコードは不要ですが、**heteml の管理画面で「独自ドメインでのメール設定」を確認**してください
- heteml で DKIM を有効にしている場合は、**そのセレクタの TXT または CNAME を必ず追加**してください

### 3.2 稼働中のサブドメイン（漏れるとサービスが落ちます）

| 種別 | 名前 | 値 | Proxy |
|---|---|---|---|
| A | `jwcc` | `52.194.18.214` | **OFF 推奨** |
| A | `nft` | `8.209.241.197` | **OFF 推奨** |

- jwcc は Let's Encrypt、nft は DigiCert のワイルドカード証明書を、**サーバー側で自前管理**しています。
  Proxy を ON にすると Cloudflare が証明書を終端するため、
  **まずは OFF（DNS only）で移行し、動作確認後に必要なら ON を検討**してください
- `nft` のワイルドカード証明書 `*.japanworld.co.jp` は失効済みです。
  **DNS 移行とは別に、証明書の更新を先に済ませることを強くおすすめします**

### 3.3 サイト本体

| 種別 | 名前 | 値 | Proxy |
|---|---|---|---|
| （Workers のカスタムドメイン） | `www` | japanworld-site Worker | ON（自動） |
| （Workers のカスタムドメイン） | `japanworld.co.jp`（@） | japanworld-site Worker | ON（自動） |

`wrangler.jsonc` の `routes` のコメントを外して `wrangler deploy` すると、
**Cloudflare が該当ゾーンに DNS レコードを自動作成します。**
だからこそ、**3.1 と 3.2 を先に登録しておく必要があります。**

```jsonc
  "routes": [
    { "pattern": "www.japanworld.co.jp", "custom_domain": true },
    { "pattern": "japanworld.co.jp", "custom_domain": true }
  ],
```

apex（japanworld.co.jp）も Worker に向けることで、
Worker 側の 301 で `www` へパス・クエリを保持したまま転送されます。

### 3.4 あわせて追加を検討したいレコード（現在は未設定）

現在 **SPF も DMARC も設定されていません。** 独自ドメインからメールを送っている場合、
Gmail・Outlook などで迷惑メール判定されやすい状態です。

| 種別 | 名前 | 値（例） | 備考 |
|---|---|---|---|
| TXT | `@` | `v=spf1 include:_spf.heteml.jp ~all` | ⚠ **include の値は heteml の公式ドキュメントで必ず確認してください。当方では未確認です** |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:info@japanworld.co.jp` | まず `p=none` で監視から始めるのが安全です |
| CAA | `@` | `0 issue "pki.goog"` / `0 issue "letsencrypt.org"` / `0 issue "digicert.com"` | 現在使っている 3 つの CA をすべて許可する必要があります |

**SPF を誤った値で設定すると、正規のメールが届かなくなります。**
DNS 移行とは切り離し、別作業として慎重に実施することをおすすめします。

---

## 4. 移行手順（推奨の順序）

```
□  1. 事前確認
     □ heteml の管理画面で、メール設定（MX / DKIM / SPF）の正しい値を確認
     □ jwcc / nft のサーバー管理者に、DNS 移行の予定を共有
     □ nft.japanworld.co.jp の TLS 証明書を更新（失効済み）

□  2. Worker を workers.dev で公開して検証
     □ npx wrangler deploy        ← routes はコメントアウトのまま
     □ https://japanworld-site.<account>.workers.dev で全48ページを確認
     □ 旧URLのリダイレクトを確認（scripts/check-redirects.mjs を URL 指定で実行）

□  3. 現行 DNS の完全なバックアップ
     □ dnsv.jp の管理画面から全レコードをエクスポート／スクリーンショット
     □ 特に MX・jwcc・nft・TXT を記録

□  4. Cloudflare にゾーンを追加（まだネームサーバーは変更しない）
     □ 自動インポートされたレコードを、3 でとったバックアップと 1 件ずつ照合
     □ MX（mx.hetemail.jp / 優先度10）が入っているか   ← 最重要
     □ jwcc の A レコード（52.194.18.214）が入っているか
     □ nft の A レコード（8.209.241.197）が入っているか
     □ 不足分を手で追加。jwcc / nft の Proxy は OFF

□  5. TTL を下げる（切り戻しを速くするため）
     □ Cloudflare 側のレコードの TTL を 300 秒に

□  6. ネームサーバーを Cloudflare へ変更
     □ レジストラの管理画面でネームサーバーを差し替え
     □ 反映まで最大 24 時間

□  7. 反映確認（この時点ではまだ www は Wix のまま）
     □ nslookup -type=MX japanworld.co.jp        → mx.hetemail.jp
     □ nslookup jwcc.japanworld.co.jp            → 52.194.18.214
     □ nslookup nft.japanworld.co.jp             → 8.209.241.197
     □ https://jwcc.japanworld.co.jp/ にログインできる
     □ info@japanworld.co.jp で 送信・受信の両方をテスト   ← 最重要
     □ 携帯キャリアメール・Gmail の両方から受信テスト

□  8. www を Worker へ切り替え
     □ wrangler.jsonc の routes のコメントを外す
     □ npx wrangler deploy
     □ https://www.japanworld.co.jp/ が新サイトになることを確認
     □ https://japanworld.co.jp/rakihouse → https://www.japanworld.co.jp/raki-house/ を確認

□  9. 切り替え後の確認
     □ scripts/check-redirects.mjs を本番URLに対して実行
     □ Google Search Console で新しい sitemap.xml を送信
     □ 主要な旧URLが 301 を返すことを Search Console の URL 検査で確認
     □ メール送受信を再度テスト

□ 10. しばらく様子を見る（最低 2 週間）
     □ Search Console のカバレッジ・エラーを確認
     □ 問題がなければ TTL を通常値（3600 秒など）に戻す
     □ Wix の契約は、この期間が終わるまで解約しない
```

---

## 5. 切り戻し手順

| 症状 | 対応 |
|---|---|
| メールが届かない | Cloudflare DNS で MX を確認（`mx.hetemail.jp` / 優先度10 / Proxy OFF）。それでも直らなければネームサーバーを dnsv.jp に戻す |
| 会員が JWCCS にログインできない | `jwcc` の A レコード（52.194.18.214）と Proxy OFF を確認 |
| NFT サイトが開けない | まず証明書の期限を確認（2026-08-31 に失効済み）。DNS は `nft` A = 8.209.241.197 |
| 新サイトに問題がある | `wrangler.jsonc` の routes をコメントアウトして再デプロイ → www が旧レコードに戻る。あるいは Cloudflare DNS で `www` を `www218.wixdns.net` へ CNAME |

---

## 6. Wix の扱い

**新サイト公開後も、Wix は削除・解約しないでください。**

- DNS の反映は最大 24 時間かかり、その間 Wix 側へ到達するユーザーがいます
- 切り戻しが必要になったとき、Wix サイトが生きていれば `www` の CNAME を戻すだけで復旧できます
- 解約は、**メール確認・全ページ確認・Search Console の状況確認がすべて終わってから**判断してください

---

## 7. 調査に使ったコマンド（再現用）

```bash
# ネームサーバー・登録者
（whois.jprs.jp:43 へ "japanworld.co.jp/e" を送信）

# 各レコード（Google DoH）
curl -H 'accept: application/dns-json' \
  'https://dns.google/resolve?name=japanworld.co.jp&type=MX'
curl -H 'accept: application/dns-json' \
  'https://dns.google/resolve?name=japanworld.co.jp&type=TXT'
curl -H 'accept: application/dns-json' \
  'https://dns.google/resolve?name=www.japanworld.co.jp&type=CNAME'
curl -H 'accept: application/dns-json' \
  'https://dns.google/resolve?name=jwcc.japanworld.co.jp&type=A'
curl -H 'accept: application/dns-json' \
  'https://dns.google/resolve?name=nft.japanworld.co.jp&type=A'

# TLS 証明書
echo | openssl s_client -connect nft.japanworld.co.jp:443 \
  -servername nft.japanworld.co.jp 2>/dev/null | openssl x509 -noout -dates
```
