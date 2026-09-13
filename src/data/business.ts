/**
 * 事業の一覧データ。
 *
 * トップページの事業カード、/business/ の一覧、各事業ページのヘッダーで共有する。
 * 詳細な本文（メニュー料金・注意事項など）は各ページ側に置く。
 *
 * ⚠ 掲載しているのは、現行サイト・rakinasu.com・saibouyoku.com・参考サイトで
 *   実在が確認できた事業だけです。推測で追加した事業はありません。
 *
 * ⚠ システム・IT事業（JWCCS / JW NFT Platform）は、登記上の事業内容に該当項目がなく
 *   事業としての掲載可否が未確定のため、今回は掲載していません。
 *   掲載する場合は、ここに 1 件追加し、src/pages/business/ にページを足してください。
 */
import { OPERATORS, type OperatorKey, type RouteKey } from './site';
import type { ImageName } from './images.generated';

export type Business = {
  /** ROUTES のキー。リンク先の生成に使う */
  key: Extract<RouteKey, 'wellness' | 'beauty' | 'hospitality'>;
  /** 英字のラベル（見出しの上に小さく置く） */
  eyebrow: string;
  /** 和文の事業名 */
  title: string;
  /** 事業の対象を一言で表す。カードの見出し下に置く */
  lead: string;
  /** カードとページ冒頭で使う 2〜3 行の説明 */
  summary: string;
  /** カードの画像 */
  image: ImageName;
  /** ページ内で使う主画像（横長） */
  hero: ImageName;
  /** 提供しているものの要点。カードの下に並べる */
  points: string[];
  /**
   * 運営会社。**全事業で必ず指定する**（省略可にしない）。
   *
   * 細胞浴とエステは JWORLD CO.,LTD の事業であり、
   * Japan World株式会社の直接事業ではないため、
   * どの事業も運営会社を明示して並べる方式にしている。
   */
  operator: OperatorKey;
};

/** 事業から運営会社の表示名を取り出す */
export function operatorName(b: Business): string {
  return OPERATORS[b.operator].name;
}

export const BUSINESSES: readonly Business[] = [
  {
    key: 'wellness',
    eyebrow: 'WELLNESS',
    title: '細胞浴SALON 太古の甕',
    lead: '天然鉱石「樹紋石」を用いた温浴',
    summary:
      '人がすっぽりと入れるほどの大きな甕（かめ）に天然鉱石「樹紋石」を敷き詰めた温浴サロンです。温かなスチームに包まれながら、身体をゆっくりと温めていただきます。Resort Hotel 楽気ハウス那須の館内にあります。',
    // kame-open は甕の内部が分かる代わりに配線や備品が写り込むため、
    // 一覧では kame-room を使い、kame-open は本文の説明図に回している。
    image: 'salon/kame-room',
    hero: 'salon/kame-room',
    points: ['樹紋石を用いた甕による温浴', 'カウンセリングから、ひと組ずつ', '1日数組限定・要事前予約'],
    operator: 'jworld',
  },
  {
    key: 'beauty',
    eyebrow: 'BEAUTY',
    title: 'Esthetic Salon RICHIA',
    lead: '大人の女性のためのエステサロン',
    summary:
      '東京・上野で多くの支持を集めたエステサロン「RICHIA（リチア）」。熟練のエステティシャンが、一人ひとりの肌の状態に合わせたマンツーマン施術を行います。Resort Hotel 楽気ハウス那須の館内にあります。',
    image: 'salon/esthetic-room',
    hero: 'salon/esthetic-room',
    points: ['フェイシャル／ボディの2系統', 'マンツーマンでの施術', '1日数組限定・要事前予約'],
    operator: 'jworld',
  },
  {
    key: 'hospitality',
    eyebrow: 'HOSPITALITY',
    title: 'Resort Hotel 楽気ハウス那須',
    lead: '那須高原のリゾートホテル運営',
    summary:
      '栃木県・那須高原のリゾートホテルです。全26室、温泉の大浴場と露天風呂、レストラン＆バー、200人規模のコンベンションホールを備えています。',
    // hotel/exterior は写真ではなく CG パースのため、一覧の主画像には使っていない。
    image: 'rooms/window-view',
    hero: 'lobby/lounge',
    points: ['全26室・全館をゲストの占有空間に', '温泉大浴場と露天風呂', '会員制ホテル／一般のお客様も宿泊可'],
    operator: 'japanworld',
  },
] as const;

/** キーから 1 件取り出す */
export function getBusiness(key: Business['key']): Business {
  const found = BUSINESSES.find((b) => b.key === key);
  if (!found) throw new Error(`Unknown business: ${key}`);
  return found;
}

/**
 * Japan World株式会社自身の事業。
 * トップページと /business/ の主役はここだけ。
 */
export const OWN_BUSINESSES: readonly Business[] = BUSINESSES.filter(
  (b) => b.operator === 'japanworld',
);

/**
 * 館内施設として紹介するサロン（Japan World株式会社の事業ではない）。
 *
 * ⚠ 当社の主要事業としては見せない。
 *   トップページと /business/ では「楽気ハウス那須の館内施設」として
 *   控えめに触れるだけにとどめること。
 */
export const INHOUSE_SALONS: readonly Business[] = BUSINESSES.filter(
  (b) => b.operator !== 'japanworld',
);
