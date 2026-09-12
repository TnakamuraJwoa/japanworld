// scripts/build-images.mjs が自動生成。直接編集しないこと。
// 代替テキストの編集は scripts/image-manifest.mjs 側で行う。

export type ImageEntry = {
  /** public/images/<name>-<w>.webp */
  name: string;
  /** 日本語の代替テキスト（既定値） */
  alt: string;
  /** 生成済みの横幅 */
  widths: number[];
  /** 最大幅バリアントの実寸（width/height 属性・aspect-ratio 用） */
  width: number;
  height: number;
};

export const IMAGES = {
  "brand/jw-mark": {
    "name": "brand/jw-mark",
    "alt": "Japan World株式会社のロゴマーク",
    "widths": [
      96,
      192,
      384
    ],
    "width": 384,
    "height": 388
  },
  "brand/raki-house-mark": {
    "name": "brand/raki-house-mark",
    "alt": "楽気ハウスのロゴ",
    "widths": [
      120,
      240,
      480
    ],
    "width": 480,
    "height": 490
  },
  "brand/raki-house-wordmark": {
    "name": "brand/raki-house-wordmark",
    "alt": "Resort Hotel 楽気ハウス那須",
    "widths": [
      320,
      640,
      1024
    ],
    "width": 1024,
    "height": 278
  },
  "hero/rotenburo-autumn": {
    "name": "hero/rotenburo-autumn",
    "alt": "紅葉に囲まれた露天風呂と、湯面から立ちのぼる湯けむり",
    "widths": [
      480,
      956
    ],
    "width": 956,
    "height": 637
  },
  "hotel/exterior": {
    "name": "hotel/exterior",
    "alt": "青空の下に建つ Resort Hotel 楽気ハウス那須の外観",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1125
  },
  "hotel/entrance": {
    "name": "hotel/entrance",
    "alt": "楽気ハウス那須の正面エントランス",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 1566,
    "height": 900
  },
  "hotel/reception": {
    "name": "hotel/reception",
    "alt": "明るい館内に設けられた受付カウンター",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1371
  },
  "rooms/superior-autumn": {
    "name": "rooms/superior-autumn",
    "alt": "大きな窓いっぱいに紅葉が広がる客室",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1333
  },
  "rooms/royal-living": {
    "name": "rooms/royal-living",
    "alt": "ベッドとソファ、ダイニングテーブルを備えたロイヤルルームの室内",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "rooms/royal-bath": {
    "name": "rooms/royal-bath",
    "alt": "木張りの壁に囲まれた客室の露天風呂",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1333
  },
  "rooms/royal-bath-night": {
    "name": "rooms/royal-bath-night",
    "alt": "夜、あかりに照らされた客室の露天風呂",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 960
  },
  "rooms/suite-a": {
    "name": "rooms/suite-a",
    "alt": "和モダンな内装のスイートルーム。ソファと円形のダイニングテーブルが並ぶ",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 1080
  },
  "rooms/suite-201": {
    "name": "rooms/suite-201",
    "alt": "ベッドとリビングスペースが続くプレミアムスイートルーム",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "rooms/suite-302a": {
    "name": "rooms/suite-302a",
    "alt": "木の質感を生かした内装のプレミアムスイートルーム",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "rooms/suite-302b": {
    "name": "rooms/suite-302b",
    "alt": "ベッドとダイニングを配したプレミアムスイートルームの室内",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "rooms/suite-401": {
    "name": "rooms/suite-401",
    "alt": "落ち着いた色調でまとめたプレミアムスイートルーム",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "rooms/suite-501": {
    "name": "rooms/suite-501",
    "alt": "あかりが灯るプレミアムスイートルームのベッドとソファ",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "rooms/superior": {
    "name": "rooms/superior",
    "alt": "窓の外に紅葉を望むプレミアムスーペリアルーム",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "rooms/standard": {
    "name": "rooms/standard",
    "alt": "コンパクトにまとめられたスタンダードルーム",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "rooms/living": {
    "name": "rooms/living",
    "alt": "円形のダイニングテーブルとソファを備えた客室のリビング",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1500
  },
  "rooms/lantern": {
    "name": "rooms/lantern",
    "alt": "天井から下がる和紙のあかり",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 960
  },
  "spa/daiyokujo": {
    "name": "spa/daiyokujo",
    "alt": "藍色の壁に囲まれた大浴場の浴槽。窓の外に木々が見える",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1333
  },
  "spa/daiyokujo-entrance": {
    "name": "spa/daiyokujo-entrance",
    "alt": "「大浴場」と記された藍色の暖簾がかかる入口",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 960
  },
  "spa/changing-room": {
    "name": "spa/changing-room",
    "alt": "木の造作でまとめられた脱衣所とパウダーコーナー",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 960
  },
  "spa/rotenburo-night": {
    "name": "spa/rotenburo-night",
    "alt": "夜、庭木をライトアップした露天風呂",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 977,
    "height": 680
  },
  "dining/restaurant": {
    "name": "dining/restaurant",
    "alt": "白いクロスのテーブルとソファ席が並ぶレストランの客席",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1333
  },
  "dining/lounge-bar": {
    "name": "dining/lounge-bar",
    "alt": "レンガ壁と革張りのベンチシートが続くラウンジ",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 960
  },
  "dining/table-setting": {
    "name": "dining/table-setting",
    "alt": "グラスとカトラリーが整えられたディナーのテーブルセッティング",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1080,
    "height": 725
  },
  "dining/setting-detail": {
    "name": "dining/setting-detail",
    "alt": "折りたたまれたナプキンとグラスが置かれたテーブル",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 371
  },
  "dining/private-table": {
    "name": "dining/private-table",
    "alt": "2名掛けのテーブル席",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 1079
  },
  "dining/course": {
    "name": "dining/course",
    "alt": "テーブルに並べられたディナーコースの皿",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 1079
  },
  "dining/dish-grill": {
    "name": "dining/dish-grill",
    "alt": "ディナーコースの焼き物の一皿",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "dining/dish-appetizer": {
    "name": "dining/dish-appetizer",
    "alt": "舟形の器に盛り付けられた前菜",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "dining/dish-meat": {
    "name": "dining/dish-meat",
    "alt": "ソースを添えた肉料理の一皿",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "dining/dish-steak": {
    "name": "dining/dish-steak",
    "alt": "野菜を添えたステーキの一皿",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "dining/dish-soup": {
    "name": "dining/dish-soup",
    "alt": "蓋つきの器で供されるスープ",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "dining/dish-dessert": {
    "name": "dining/dish-dessert",
    "alt": "グラスに盛り付けられたデザート",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "dining/dish-sweets": {
    "name": "dining/dish-sweets",
    "alt": "皿に盛り付けられたデザートの一皿",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "dining/breakfast-western": {
    "name": "dining/breakfast-western",
    "alt": "洋朝食の一例。卵料理とサラダ、小鉢が並ぶ",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "dining/breakfast-japanese": {
    "name": "dining/breakfast-japanese",
    "alt": "和朝食の一例。ご飯と味噌汁、小鉢が並ぶ",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "dining/soba": {
    "name": "dining/soba",
    "alt": "蓋つきの器に盛られた冷たい麺料理",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "lobby/atrium": {
    "name": "lobby/atrium",
    "alt": "吹き抜けの天井に組子細工の照明が下がるロビー",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1333
  },
  "lobby/lounge": {
    "name": "lobby/lounge",
    "alt": "大きな窓に面したロビーラウンジのソファ席",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 997
  },
  "lobby/sofa-window": {
    "name": "lobby/sofa-window",
    "alt": "窓際に革張りのソファを配したラウンジスペース",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 810
  },
  "lobby/sofa": {
    "name": "lobby/sofa",
    "alt": "ロビーに置かれた革張りのソファとローテーブル",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "lobby/front-desk": {
    "name": "lobby/front-desk",
    "alt": "あかりを埋め込んだフロントカウンター",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "lobby/front-flowers": {
    "name": "lobby/front-flowers",
    "alt": "生け花が飾られたフロント前のスペース",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 956,
    "height": 637
  },
  "lobby/sofa-dark": {
    "name": "lobby/sofa-dark",
    "alt": "黒い革張りのソファが並ぶロビー",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1080,
    "height": 725
  },
  "banquet/hall": {
    "name": "banquet/hall",
    "alt": "ライン照明が天井を走るコンベンションホール",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1333
  },
  "banquet/hall-wide": {
    "name": "banquet/hall-wide",
    "alt": "什器を片付けた状態のコンベンションホールの全景",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 960
  },
  "banquet/hall-floor": {
    "name": "banquet/hall-floor",
    "alt": "黒いカーペットが敷かれた広い宴会場",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 960
  },
  "salon/interior": {
    "name": "salon/interior",
    "alt": "布を掛けた甕が並ぶ細胞浴サロンの室内",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1500
  },
  "salon/kame": {
    "name": "salon/kame",
    "alt": "照明を落とした細胞浴サロンの施術スペース",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1080,
    "height": 725
  },
  "salon/relax": {
    "name": "salon/relax",
    "alt": "サロン内の洗面台とくつろぎのスペース",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 960
  },
  "salon/kame-open": {
    "name": "salon/kame-open",
    "alt": "内部の腰掛けが見える甕と、絵付けが施された甕が並ぶ細胞浴サロンの室内",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "salon/jumonseki": {
    "name": "salon/jumonseki",
    "alt": "木目のような模様が層状に表れた天然鉱石「樹紋石」",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "salon/kame-room": {
    "name": "salon/kame-room",
    "alt": "リクライニングチェアと絵付けの甕が置かれた細胞浴サロンの施術スペース",
    "widths": [
      640,
      1024,
      1200
    ],
    "width": 1200,
    "height": 450
  },
  "nasu/mountains-autumn": {
    "name": "nasu/mountains-autumn",
    "alt": "紅葉に彩られた那須の山なみと、山あいの水面",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1303
  },
  "nasu/ropeway-autumn": {
    "name": "nasu/ropeway-autumn",
    "alt": "紅葉期の那須連山を行くロープウェイ",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 961
  },
  "nasu/jizo": {
    "name": "nasu/jizo",
    "alt": "岩場に赤い前掛けの地蔵が立ち並ぶ那須の史跡",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 960
  },
  "nasu/villa": {
    "name": "nasu/villa",
    "alt": "芝生の庭に建つ那須高原の洋館",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 1080
  },
  "nasu/amusement-park": {
    "name": "nasu/amusement-park",
    "alt": "那須高原の遊園地。観覧車やコースターが並ぶ",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 957
  },
  "nasu/alpaca": {
    "name": "nasu/alpaca",
    "alt": "那須高原の牧場でくつろぐアルパカ",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 958
  },
  "nasu/waterfall": {
    "name": "nasu/waterfall",
    "alt": "苔むした岩の間を流れ落ちる渓流の滝",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 961
  },
  "nasu/festival": {
    "name": "nasu/festival",
    "alt": "那須町に伝わる祭りの獅子頭",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 480,
    "height": 360
  },
  "nasu/gourmet-fish": {
    "name": "nasu/gourmet-fish",
    "alt": "笹の葉に載せて供される川魚の塩焼き",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 960
  },
  "nasu/gourmet-bowl": {
    "name": "nasu/gourmet-bowl",
    "alt": "和食の小鉢に盛られた一品",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1440,
    "height": 961
  },
  "hotel/exterior-night": {
    "name": "hotel/exterior-night",
    "alt": "夕暮れの空と雪をいただいた那須連山を背に、客室のあかりが灯る楽気ハウス那須の外観",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1042
  },
  "rooms/window-view": {
    "name": "rooms/window-view",
    "alt": "大きな窓から那須高原の森を望む客室",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 1042
  },
  "spa/daiyokujo-wide": {
    "name": "spa/daiyokujo-wide",
    "alt": "藍色のタイルに囲まれた大浴場。窓の外に木々の緑が広がる",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 917
  },
  "spa/daiyokujo-view": {
    "name": "spa/daiyokujo-view",
    "alt": "洗い場が並ぶ大浴場と、窓いっぱいに広がる緑",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1280,
    "height": 900
  },
  "salon/esthetic-room": {
    "name": "salon/esthetic-room",
    "alt": "窓の外に緑を望む、施術ベッドを2台備えたエステサロンの室内",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 1280,
    "height": 900
  },
  "salon/esthetic-facial": {
    "name": "salon/esthetic-facial",
    "alt": "フェイシャルの施術を受ける様子",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "salon/esthetic-body": {
    "name": "salon/esthetic-body",
    "alt": "ボディの施術を受ける様子",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "rooms/premium-suite-a": {
    "name": "rooms/premium-suite-a",
    "alt": "プレミアム スイートルームA。クイーンサイズベッドとソファ、ダイニングテーブルを備えた広い室内",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 917
  },
  "rooms/premium-suite-b": {
    "name": "rooms/premium-suite-b",
    "alt": "プレミアム スイートルームB。那須の自然を望む窓と温もりのある内装",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 917
  },
  "rooms/premium-superior": {
    "name": "rooms/premium-superior",
    "alt": "プレミアムスーペリアルーム。ダブルベッド2台を備えた室内と窓の外の高原の景色",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 917
  },
  "rooms/standard-room": {
    "name": "rooms/standard-room",
    "alt": "スタンダードルーム。落ち着いた設えのベッドルーム",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 2000,
    "height": 917
  },
  "dining/restaurant-raki": {
    "name": "dining/restaurant-raki",
    "alt": "格子の間仕切りで区切られた、ダイニングレストラン「楽気」の客席",
    "widths": [
      640,
      1024,
      1600,
      2000
    ],
    "width": 1280,
    "height": 900
  },
  "dining/restaurant-table": {
    "name": "dining/restaurant-table",
    "alt": "花とグラスが整えられたレストランのテーブル席",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 750,
    "height": 469
  },
  "dining/course-seseragi": {
    "name": "dining/course-seseragi",
    "alt": "前菜から魚料理、肉料理まで並んだコース料理",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "dining/course-unkai": {
    "name": "dining/course-unkai",
    "alt": "ステーキを中心に彩り豊かな皿が並んだコース料理",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "dining/breakfast-plate": {
    "name": "dining/breakfast-plate",
    "alt": "卵料理や野菜、スープが並んだ朝食",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "dining/kids-plate": {
    "name": "dining/kids-plate",
    "alt": "エビフライやパスタ、スープを盛り合わせたお子様向けのプレート",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 750,
    "height": 469
  },
  "dining/cake": {
    "name": "dining/cake",
    "alt": "いちごを飾り、メッセージプレートを添えたホールケーキ",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 750,
    "height": 469
  },
  "dining/message-plate": {
    "name": "dining/message-plate",
    "alt": "メッセージを描いたデザートプレート",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 750,
    "height": 469
  },
  "dining/bouquet": {
    "name": "dining/bouquet",
    "alt": "バラやガーベラをまとめたブーケ",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 750,
    "height": 469
  },
  "dining/bar": {
    "name": "dining/bar",
    "alt": "石蔵を生かしたバーのカウンター",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1200,
    "height": 450
  },
  "nasu/spot-yahata": {
    "name": "nasu/spot-yahata",
    "alt": "木道の両側を赤いツツジが埋め尽くす八幡ツツジ群落",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "nasu/spot-sesshoseki": {
    "name": "nasu/spot-sesshoseki",
    "alt": "「殺生石」の標柱と、しめ縄が張られた岩場",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "nasu/spot-observatory": {
    "name": "nasu/spot-observatory",
    "alt": "那須高原展望台から望む、緑の森の先に広がる関東平野",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "nasu/spot-flowerworld": {
    "name": "nasu/spot-flowerworld",
    "alt": "那須連山を背にチューリップが咲きそろう那須フラワーワールド",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "nasu/spot-minamigaoka": {
    "name": "nasu/spot-minamigaoka",
    "alt": "南ヶ丘牧場の草地でくつろぐ牛",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "nasu/spot-highlandpark": {
    "name": "nasu/spot-highlandpark",
    "alt": "観覧車やコースターが並ぶ那須ハイランドパークの全景",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "nasu/spot-rindolake": {
    "name": "nasu/spot-rindolake",
    "alt": "りんどう湖の上をジップラインで滑り降りる来園者",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "nasu/spot-animalkingdom": {
    "name": "nasu/spot-animalkingdom",
    "alt": "ジャガーやレッサーパンダなど、那須どうぶつ王国で暮らす動物たち",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "nasu/spot-cheesegarden": {
    "name": "nasu/spot-cheesegarden",
    "alt": "チーズガーデン那須本店の外観と、皿に盛られたチーズケーキ",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "nasu/spot-goodnews": {
    "name": "nasu/spot-goodnews",
    "alt": "木立の中に建つ複合施設 GOOD NEWS の店舗",
    "widths": [
      480,
      960,
      1440
    ],
    "width": 1152,
    "height": 768
  },
  "access/map-ichikenjaya": {
    "name": "access/map-ichikenjaya",
    "alt": "楽気ハウス那須から、バス停「一軒茶屋」とセブンイレブン那須一軒茶屋店までの位置関係を示した地図",
    "widths": [
      531,
      1062
    ],
    "width": 531,
    "height": 214
  },
  "access/map-nasushiobara": {
    "name": "access/map-nasushiobara",
    "alt": "那須塩原駅西口のバス乗り場・タクシー乗り場の位置を示した地図",
    "widths": [
      635,
      1270
    ],
    "width": 1270,
    "height": 799
  }
} as const satisfies Record<string, ImageEntry>;

export type ImageName = keyof typeof IMAGES;
