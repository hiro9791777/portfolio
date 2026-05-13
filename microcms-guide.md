# microCMS導入メモ

このメモは、このポートフォリオでmicroCMSから制作実績データを取得して表示するまでの流れをまとめたものです。

## 全体の流れ

```txt
microCMS
  ↓
lib/client.ts
  ↓
lib/works.ts
  ↓
app/works/page.tsx
  ↓
app/works/WorksClient.tsx

詳細ページの場合:
microCMS
  ↓
lib/works.ts
  ↓
app/works/[slug]/page.tsx
```

microCMSから直接 `page.tsx` で取得することもできますが、取得処理を `lib/works.ts` にまとめると、一覧ページと詳細ページで同じ処理を使い回せます。

## 1. .env.local

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=xxxxxxxx
```

ここにはmicroCMSに接続するための情報を書きます。

`MICROCMS_SERVICE_DOMAIN` はサービスIDです。

```txt
https://your-service-domain.microcms.io
```

の `your-service-domain` 部分です。

`MICROCMS_API_KEY` はmicroCMS管理画面のAPIキーです。これは外に見せたくない情報なので、`.env.local` に置きます。

## 2. lib/client.ts

```ts
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});
```

ここでは、microCMSに接続するためのクライアントを作っています。

`client` は「microCMSと通信するための道具」です。

```ts
process.env.MICROCMS_SERVICE_DOMAIN
process.env.MICROCMS_API_KEY
```

で `.env.local` の値を読み込んでいます。

## 3. app/types/works.ts

```ts
export type Work = {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  tags: string[];
};
```

これは、microCMSから返ってくる1件分のデータの形をTypeScriptに教えるための型です。

例えば1件の作品データはこういうイメージです。

```ts
{
  id: "abc123",
  slug: "corporate-site",
  category: "企業サイト",
  title: "コーポレートサイト制作",
  description: "企業のブランド価値を伝える...",
  image: {
    url: "https://images.microcms-assets.io/...",
    width: 1200,
    height: 800
  },
  tags: ["HTML/CSS", "JavaScript", "WordPress"]
}
```

特に注意するのは `image` です。

ローカル画像のときは文字列でしたが、microCMSの画像はオブジェクトで返るので、表示するときは `work.image.url` を使います。

## 4. lib/works.ts

```ts
import { client } from "./client";
import type { Work } from "../app/types/works";

export const getWorks = async () => {
  const works = await client.getList<Work>({
    endpoint: "works",
  });

  return works;
};

export const getWork = async (slug: string) => {
  const data = await client.getList<Work>({
    endpoint: "works",
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
  });

  return data.contents[0];
};
```

ここが「作品データを取得する処理」です。

### getWorks

`getWorks` は一覧取得です。

```ts
client.getList<Work>({
  endpoint: "works",
});
```

これはmicroCMSの `works` APIから一覧を取得します。

返ってくる形はこうです。

```ts
{
  contents: Work[],
  totalCount: number,
  offset: number,
  limit: number
}
```

なので、実際の作品配列は `works.contents` に入っています。

### getWork

`getWork` は詳細ページ用です。

```ts
filters: `slug[equals]${slug}`,
```

これは、

```txt
slugフィールドが、URLのslugと一致するデータだけ取得する
```

という意味です。

例えばURLが、

```txt
/works/corporate-site
```

なら、`slug` には `"corporate-site"` が入ります。

そのため、実際のfilterはこうなります。

```ts
"slug[equals]corporate-site"
```

つまりmicroCMSに、

```txt
slug が corporate-site の作品を1件取ってきて
```

とお願いしています。

`limit: 1` は、1件だけ取る指定です。

## 5. app/works/page.tsx

```tsx
import { getWorks } from "@/lib/works";
import WorksClient from "./WorksClient";

export default async function WorksPage() {
  const works = await getWorks();

  return <WorksClient works={works.contents} />;
}
```

ここは一覧ページです。

このファイルでは、microCMSからデータを取得して、`WorksClient` に渡します。

重要なのは、ここに `"use client"` を書かないことです。

Next.jsのApp Routerでは、`page.tsx` は基本的にServer Componentです。
Server ComponentではAPIキーを使ったデータ取得ができます。

```ts
const works = await getWorks();
```

でmicroCMSから取得して、

```tsx
<WorksClient works={works.contents} />
```

でクライアント側のコンポーネントに渡しています。

## 6. app/works/WorksClient.tsx

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import type { Work } from "@/app/types/works";
import styles from "./page.module.css";

type Props = {
  works: Work[];
};

export default function WorksClient({ works }: Props) {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredWorks =
    activeFilter === "ALL"
      ? works
      : works.filter((work) => {
          return (
            work.category === activeFilter || work.tags.includes(activeFilter)
          );
        });

  return (
    // 表示処理
  );
}
```

ここはブラウザ側で動くコンポーネントです。

`useState` やクリックイベントを使うので、先頭にこれが必要です。

```ts
"use client";
```

このファイルの役割は次の通りです。

- 受け取った `works` を画面に表示する
- フィルターボタンを押したら表示内容を切り替える
- 詳細ページへのリンクを作る

詳細ページへのリンクはここです。

```tsx
<Link href={`/works/${work.slug}`} className={styles.link}>
```

例えば `work.slug` が `"corporate-site"` なら、リンク先はこうなります。

```txt
/works/corporate-site
```

## 7. app/works/[slug]/page.tsx

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getWork, getWorks } from "@/lib/works";
import styles from "./page.module.css";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const works = await getWorks();

  return works.contents.map((work) => ({
    slug: work.slug,
  }));
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = await getWork(slug);

  if (!work) {
    notFound();
  }

  return (
    <main className={styles.detail}>
      {/* 詳細表示 */}
    </main>
  );
}
```

ここは詳細ページです。

`[slug]` は動的ルートです。

```txt
app/works/[slug]/page.tsx
```

というファイルは、以下のようなURLに対応します。

```txt
/works/corporate-site
/works/recruit-lp
/works/event-site
```

URLの `corporate-site` の部分が `params.slug` に入ります。

```ts
const { slug } = await params;
```

そのslugを使って、microCMSから1件取得します。

```ts
const work = await getWork(slug);
```

存在しなければ404にします。

```ts
if (!work) {
  notFound();
}
```

## generateStaticParamsについて

```ts
export async function generateStaticParams() {
  const works = await getWorks();

  return works.contents.map((work) => ({
    slug: work.slug,
  }));
}
```

これは自分で呼び出す関数ではありません。
Next.jsが自動で呼ぶ特別な関数です。

役割は、

```txt
どんな詳細ページURLが存在するかをNext.jsに教える
```

ことです。

例えばmicroCMSに3件あれば、

```ts
[
  { slug: "corporate-site" },
  { slug: "recruit-lp" },
  { slug: "event-site" }
]
```

を返します。

するとNext.jsは、

```txt
/works/corporate-site
/works/recruit-lp
/works/event-site
```

を事前に生成できます。

ポートフォリオのように作品数が少なく、更新頻度が高くないサイトなら、残しておくのが自然です。

## `@/lib/works` の `@` について

```ts
import { getWorks } from "@/lib/works";
```

この `@` はプロジェクトルートを表すショートカットです。

つまりこれは、

```ts
import { getWorks } from "@/lib/works";
```

実際にはこれと同じような意味です。

```ts
import { getWorks } from "../../lib/works";
```

ただ、`../../` が増えると読みづらくなるので、`@/` を使っています。

設定は `tsconfig.json` にあります。

```json
"paths": {
  "@/*": ["./*"]
}
```

## 大事な考え方

Server Componentでやること:

```txt
microCMSからデータを取得する
APIキーを使う
ページ初期表示に必要なデータを用意する
```

Client Componentでやること:

```txt
useStateを使う
クリックイベントを扱う
フィルターやタブなど、ブラウザ上の操作を扱う
```

今回の分担は次のようになります。

```txt
page.tsx              データ取得
WorksClient.tsx       表示とフィルター操作
lib/works.ts          microCMS取得処理
lib/client.ts         microCMS接続設定
types/works.ts        データの型
```

この流れが分かると、ブログ一覧・お知らせ一覧・商品一覧などもほぼ同じ考え方で作れます。
