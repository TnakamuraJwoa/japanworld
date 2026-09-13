/**
 * お知らせデータ。
 *
 * ■ microCMS への移行を前提にした形にしてあります
 *   型（NewsItem / NewsCategory）と取得関数（getNews / getNewsItem）の戻り値を
 *   microCMS のリスト形式レスポンス `{ contents, totalCount, offset, limit }` に合わせています。
 *   将来 microCMS へ接続するときは、このファイルの中身を fetch に差し替えるだけで、
 *   ページ側（src/pages/news/*）は 1 行も変更せずに済みます。
 *
 *     const res = await fetch(`${BASE}/news?limit=${limit}&offset=${offset}`, {
 *       headers: { 'X-MICROCMS-API-KEY': import.meta.env.MICROCMS_API_KEY },
 *     });
 *     return await res.json();   // ← 下の getNews と同じ形
 *
 *   ⚠ 本番の microCMS へは接続していません（ご指示どおり）。
 *
 * ■ 掲載内容について
 *   ⚠ 推測で作ったお知らせは 1 件もありません。
 *     現時点で出典が確認できたものだけを登録しています。
 *     記事を追加するときは、下の NEWS 配列の先頭に追記してください
 *     （publishedAt の降順で並べる必要はありません。取得時に自動で並べ替えます）。
 */

export type NewsCategory = {
  id: string;
  name: string;
};

export type NewsItem = {
  /** URL に使う識別子。/news/<id>/ になる */
  id: string;
  /** 公開日（YYYY-MM-DD） */
  publishedAt: string;
  title: string;
  category: NewsCategory;
  /** 一覧とメタディスクリプションに使う要約 */
  summary: string;
  /** 本文。段落の配列（microCMS のリッチエディタへ移行する際は HTML 文字列にする） */
  body: string[];
  /** 外部の詳細ページがある場合のリンク */
  link?: { href: string; label: string; external?: boolean };
};

/** microCMS のリスト形式レスポンスと同じ形 */
export type NewsListResponse = {
  contents: NewsItem[];
  totalCount: number;
  offset: number;
  limit: number;
};

export const CATEGORIES = {
  info: { id: 'info', name: 'お知らせ' },
  hotel: { id: 'hotel', name: 'ホテル' },
  salon: { id: 'salon', name: 'サロン' },
} as const satisfies Record<string, NewsCategory>;

/** 一覧ページ 1 ページあたりの件数 */
export const NEWS_PER_PAGE = 10;

/** トップページに出す件数 */
export const NEWS_ON_HOME = 4;

/**
 * お知らせ本体。
 *
 * 出典:
 *   - 那須町宿泊税 … www.rakinasu.com の告知、および那須町公式サイト
 *     https://www.town.nasu.lg.jp/0040/info-0000004012-1.html
 */
const NEWS: NewsItem[] = [
  {
    id: 'nasu-accommodation-tax-2026',
    /**
     * ★ 要確認（docs/08-seo-audit.md）
     *   これは宿泊税の **施行日** であって、告知を出した日ではありません。
     *   2026-09-13 時点では未来日のため、JSON-LD の datePublished と
     *   sitemap の lastmod が未来日になります（sitemap 側は当日までに丸めています）。
     *   実際にこのお知らせを掲載した日が分かり次第、その日付に置き換えてください。
     */
    publishedAt: '2026-10-01',
    title: '那須町宿泊税の導入について',
    category: CATEGORIES.hotel,
    summary:
      '2026年10月1日より、栃木県那須郡那須町において宿泊税が導入されます。これに伴い、Resort Hotel 楽気ハウス那須にご宿泊のお客様にも宿泊税をご負担いただきます。税額および免除の条件は那須町の定めによります。',
    body: [
      '2026年10月1日より、栃木県那須郡那須町において宿泊税が導入されます。これに伴い、Resort Hotel 楽気ハウス那須にご宿泊のお客様にも、宿泊税をご負担いただくこととなります。',
      '税額および免除の条件は那須町の定めによります。詳細は那須町公式サイトをご確認ください。',
      'ご不明な点は、Resort Hotel 楽気ハウス那須（TEL 0287-74-6740／受付 9:00〜18:00）までお問い合わせください。',
    ],
    link: {
      href: 'https://www.town.nasu.lg.jp/0040/info-0000004012-1.html',
      label: '那須町公式サイトで宿泊税の詳細を見る',
      external: true,
    },
  },
];

/* ------------------------------------------------------------------ *
 *  取得関数（microCMS の SDK と同じ使い勝手にしてある）
 * ------------------------------------------------------------------ */

/** 公開日の新しい順に並べた全件 */
function sorted(): NewsItem[] {
  return [...NEWS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

/**
 * 一覧を取得する。microCMS の `client.getList()` と同じ戻り値。
 * @param limit  取得件数（既定 NEWS_PER_PAGE）
 * @param offset 先頭から読み飛ばす件数
 */
export function getNews({ limit = NEWS_PER_PAGE, offset = 0 } = {}): NewsListResponse {
  const all = sorted();
  return {
    contents: all.slice(offset, offset + limit),
    totalCount: all.length,
    offset,
    limit,
  };
}

/** 1 件取得する。microCMS の `client.getListDetail()` 相当 */
export function getNewsItem(id: string): NewsItem | undefined {
  return NEWS.find((n) => n.id === id);
}

/** 静的生成用に全件の id を返す */
export function getAllNewsIds(): string[] {
  return NEWS.map((n) => n.id);
}

/** 総ページ数 */
export function getTotalPages(perPage = NEWS_PER_PAGE): number {
  return Math.max(1, Math.ceil(NEWS.length / perPage));
}

/** 2026-10-01 → 2026.10.01 */
export function formatDate(iso: string): string {
  return iso.replaceAll('-', '.');
}
