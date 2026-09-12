import type { RouteKey } from '../data/site';

export type Card = { title: string; body: string };
export type Titled = { title: string; body?: string };
/** 周辺スポット（所要時間つき） */
export type Spot = { title: string; body: string; access: string };
export type Row = [label: string, value: string];

/** ページ共通のメタ情報 */
export type PageMeta = {
  /** <title> に使う（サイト名は Base 側で付ける） */
  title: string;
  /** meta description / og:description */
  description: string;
  /** ページ先頭の h1 */
  h1: string;
  /** h1 の上に置く小見出し（英字のラベル） */
  eyebrow?: string;
  /** h1 の下のリード文 */
  lead?: string;
};

export type Dict = {
  /** 共通 UI 文言 */
  ui: {
    skipToContent: string;
    /** ヘッダーのロゴ横に出す短い施設名（言語別） */
    brandSub: string;
    menu: string;
    close: string;
    languageLabel: string;
    breadcrumbHome: string;
    readMore: string;
    externalSite: string;
    opensInNewTab: string;
    /** ヘッダー右肩の主要 CTA */
    ctaBook: string;
    ctaMembers: string;
    telLabel: string;
    telHoursLabel: string;
    addressLabel: string;
    pageTop: string;
    notFoundTitle: string;
    notFoundLead: string;
    notFoundBack: string;
  };

  /** グローバルナビ／パンくずのラベル */
  nav: Record<RouteKey, string>;

  /** フッター */
  footer: {
    hotelHeading: string;
    companyHeading: string;
    linksHeading: string;
    externalNote: string;
    hotelSiteLabel: string;
    membersLabel: string;
    nftLabel: string;
    busTimetableLabel: string;
  };

  /** 予約導線のラベル（複数ページで再利用） */
  booking: {
    generalTitle: string;
    generalBody: string;
    generalCta: string;
    membersTitle: string;
    membersBody: string;
    membersCta: string;
    nftTitle: string;
    nftBody: string;
    nftCta: string;
    /** 予約方法ページへ誘導する二次ボタン */
    routesCta: string;
  };

  pages: {
    home: PageMeta & {
      heroTitle: string;
      heroSub: string;
      heroLocation: string;
      heroCtaPrimary: string;
      heroCtaSecondary: string;
      introHeading: string;
      introBody: string[];
      factsHeading: string;
      facts: Row[];
      highlightsHeading: string;
      highlightsLead: string;
      highlights: Card[];
      conciergeHeading: string;
      conciergeBody: string;
      nasuHeading: string;
      nasuBody: string;
      nasuCta: string;
      membershipHeading: string;
      membershipBody: string;
      membershipCta: string;
      bookingHeading: string;
      bookingLead: string;
      accessHeading: string;
      accessLead: string;
      accessCta: string;
    };

    hotel: PageMeta & {
      introBody: string[];
      facilitiesHeading: string;
      facilitiesLead: string;
      lobbyHeading: string;
      lobbyBody: string[];
      lobbyCards: Card[];
      hospitalityHeading: string;
      hospitalityLead: string;
      hospitalityBody: string[];
      salonTeaserHeading: string;
      salonTeaserBody: string;
      hotelSiteHeading: string;
      hotelSiteBody: string;
    };

    rooms: PageMeta & {
      introBody: string;
      /** チェックイン / チェックアウト */
      checkInOut: string;
      /** 客室タイプ（名称・広さ・定員・説明・設備） */
      types: {
        name: string;
        nameEn: string;
        size: string;
        capacity: string;
        body: string;
        specs: string[];
      }[];
      typeNotes: string[];
      amenityHeading: string;
      amenityRows: Row[];
      note: string;
    };

    spa: PageMeta & {
      introBody: string[];
      daiyokujoHeading: string;
      daiyokujoBody: string[];
      rotenburoHeading: string;
      rotenburoBody: string[];
      changingHeading: string;
      changingBody: string;
      /** ご利用時間 */
      hoursHeading: string;
      hoursRows: Row[];
      /** 源泉名・泉質など */
      onsenHeading: string;
      onsenRows: Row[];
      note: string;
    };

    dining: PageMeta & {
      introBody: string[];
      restaurantHeading: string;
      restaurantName: string;
      restaurantBody: string;
      restaurantRows: Row[];
      dinnerHeading: string;
      courses: Card[];
      breakfastHeading: string;
      breakfastBody: string;
      kidsHeading: string;
      kidsBody: string;
      kidsRows: Row[];
      kidsNote: string;
      anniversaryHeading: string;
      anniversary: { title: string; body: string; price: string; reserve: string }[];
      anniversaryNotes: string[];
      barHeading: string;
      barName: string;
      barBody: string;
      barRows: Row[];
      note: string;
    };

    banquet: PageMeta & {
      introBody: string;
      capacityHeading: string;
      capacityBody: string;
      useHeading: string;
      useBody: string;
      contactHeading: string;
      contactBody: string;
    };

    salon: PageMeta & {
      introBody: string[];
      /** 「太古の甕」とは */
      kameHeading: string;
      kameBody: string[];
      /** 天然鉱石「樹紋石」 */
      stoneHeading: string;
      stoneBody: string[];
      /** ご利用案内（営業時間・定員・ご予約） */
      infoHeading: string;
      infoRows: Row[];
      infoNote: string;
      /** ご入浴の流れ（4ステップ） */
      flowHeading: string;
      flow: Card[];
      /** ご入浴においてのご注意とお願い（安全に関わるため省略しない） */
      cautionHeading: string;
      cautions: string[];
      /** 健康表現に関する注記（docs/05 参照） */
      disclaimer: string;
      /** Esthetic Salon RICHIA */
      estheticHeading: string;
      estheticName: string;
      estheticBody: string[];
      estheticInfoRows: Row[];
      menuHeading: string;
      menuFacialHeading: string;
      menuFacial: Row[];
      menuBodyHeading: string;
      menuBody: Row[];
      menuNote: string;
    };

    nasu: PageMeta & {
      introBody: string[];
      historyHeading: string;
      historyBody: string;
      cultureHeading: string;
      cultureBody: string;
      aroundHeading: string;
      aroundLead: string;
      around: Spot[];
      /** 写真は載せないが近隣にある施設をまとめて触れる一文 */
      aroundMore: string;
      gourmetHeading: string;
      gourmetBody: string;
      note: string;
    };

    booking: PageMeta & {
      chooseHeading: string;
      chooseLead: string;
      manualHeading: string;
      manualBody: string;
      manualCta: string;
      telHeading: string;
      telBody: string;
      notesHeading: string;
      notes: string[];
      /** 那須町公式サイト（宿泊税）への外部リンクのラベル */
      nasuTaxCta: string;
    };

    membership: PageMeta & {
      summaryHeading: string;
      /** 現行サイトの箇条書きを原文のまま保持する */
      terms: string[];
      facilityHeading: string;
      facilityRows: Row[];
      feeHeading: string;
      feeRows: Row[];
      reserveHeading: string;
      reserveBody: string[];
      contactHeading: string;
      contactBody: string;
      /** 内容変更の可能性についての注記 */
      disclaimer: string;
    };

    access: PageMeta & {
      addressHeading: string;
      byCarHeading: string;
      byCarBody: string[];
      byTrainHeading: string;
      byTrainBody: string[];
      byBusHeading: string;
      byBusBody: string[];
      busTimetableCta: string;
      shuttleHeading: string;
      shuttleBody: string[];
      aroundStopHeading: string;
      aroundStopBody: string[];
      parkingHeading: string;
      parkingBody: string;
      mapCta: string;
      officeHeading: string;
      officeBody: string;
    };

    company: PageMeta & {
      profileHeading: string;
      /** 会社概要テーブルの見出し語。値は src/data/site.ts の COMPANY_I18N から入る */
      labels: {
        name: string;
        address: string;
        tel: string;
        email: string;
        capital: string;
        ceo: string;
      };
      businessHeading: string;
      business: string[];
      groupHeading: string;
      groupLead: string;
      group: { title: string; body: string; href: string }[];
    };
  };
};
