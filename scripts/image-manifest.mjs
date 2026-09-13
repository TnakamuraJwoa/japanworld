/**
 * 画像マニフェスト
 *
 * `src`  … assets/source/ に保存した Wix 由来の原画像ファイル名
 * `name` … 公開ファイル名（public/images/<name>-<w>.webp）
 * `alt`  … 日本語の代替テキスト。
 *          現行サイトはファイル名（DSC01306.JPG / 名称未設定-1.png / キャプadadチャ.PNG 等）を
 *          そのまま alt にしていたため、全点を目視確認したうえで書き直している。
 *          「写っているもの」を事実として説明するに留め、施設名・料理名・地名の断定は
 *          現行サイト本文で裏が取れる範囲に限定している。
 * `w`    … 生成する横幅（省略時は DEFAULT_WIDTHS）
 * `contain` … ロゴ・地図など。切り抜かずに全体を収める
 */

export const DEFAULT_WIDTHS = [480, 960, 1440];
export const HERO_WIDTHS = [640, 1024, 1600, 2000];

export const IMAGES = [
  // ---------------- ブランド ----------------
  {
    name: 'brand/jw-mark',
    src: '64855c_8870297435214423b5cc341df3e12f9b~mv2.png',
    alt: 'Japan World株式会社のロゴマーク',
    w: [96, 192, 384],
    contain: true,
  },
  {
    name: 'brand/raki-house-mark',
    src: '64855c_b104f42ff5f64ddf9c615d55f2f978a6~mv2.png',
    alt: '楽気ハウスのロゴ',
    w: [120, 240, 480],
    contain: true,
  },
  {
    name: 'brand/raki-house-wordmark',
    src: '64855c_565e653da94f4e4385316a9c6f85586a~mv2.png',
    alt: 'Resort Hotel 楽気ハウス那須',
    w: [320, 640, 1024],
    contain: true,
  },

  // ---------------- 外観・ヒーロー ----------------
  {
    name: 'hero/rotenburo-autumn',
    src: '64855c_48f370aab00e4229a5825a661ce1c7f4~mv2.png',
    alt: '紅葉に囲まれた露天風呂と、湯面から立ちのぼる湯けむり',
    // 原画像が 956px しかないため、ヒーロー用の大きな幅は生成しない
    w: [480, 956],
  },
  {
    name: 'hotel/exterior',
    src: '64855c_253eb86f90934569ae15ba653a3e485c~mv2.jpeg',
    alt: '青空の下に建つ Resort Hotel 楽気ハウス那須の外観',
    w: HERO_WIDTHS,
  },
  {
    name: 'hotel/entrance',
    src: '64855c_996d9982cb1e4f01b229eacda528c007~mv2.png',
    alt: '楽気ハウス那須の正面エントランス',
    w: HERO_WIDTHS,
  },
  {
    name: 'hotel/reception',
    src: '64855c_70affe5b1c1a4c2cba0151299a13c503~mv2.jpg',
    alt: '明るい館内に設けられた受付カウンター',
    w: HERO_WIDTHS,
  },

  // ---------------- 客室 ----------------
  {
    name: 'rooms/superior-autumn',
    src: '64855c_71c79096410e4da8813c5d5cd4321c9f~mv2.jpg',
    alt: '大きな窓いっぱいに紅葉が広がる客室',
    w: HERO_WIDTHS,
  },
  {
    name: 'rooms/royal-living',
    src: '64855c_f9fecf0aa10b40598293f4091cebd3f0~mv2.png',
    alt: 'ベッドとソファ、ダイニングテーブルを備えたロイヤルルームの室内',
  },
  {
    name: 'rooms/royal-bath',
    src: '64855c_831b385ec1754094877de12c385fecdb~mv2.jpg',
    alt: '木張りの壁に囲まれた客室の露天風呂',
    w: HERO_WIDTHS,
  },
  {
    name: 'rooms/royal-bath-night',
    src: '64855c_0cd2c3d047df470991c02c0cd47c71ba~mv2.jpg',
    alt: '夜、あかりに照らされた客室の露天風呂',
  },
  {
    name: 'rooms/suite-a',
    src: '64855c_2d1159b8209846bda357d3e99ac23dca~mv2.png',
    alt: '和モダンな内装のスイートルーム。ソファと円形のダイニングテーブルが並ぶ',
  },
  {
    name: 'rooms/suite-201',
    src: '64855c_35d92ccb95c9445386254aff2140e500~mv2.png',
    alt: 'ベッドとリビングスペースが続くプレミアムスイートルーム',
  },
  {
    name: 'rooms/suite-302a',
    src: '64855c_0b6ac43c80754db3829d9328cf50303f~mv2.png',
    alt: '木の質感を生かした内装のプレミアムスイートルーム',
  },
  {
    name: 'rooms/suite-302b',
    src: '64855c_69c17755ebe64bbe9186190330df48c3~mv2.png',
    alt: 'ベッドとダイニングを配したプレミアムスイートルームの室内',
  },
  {
    name: 'rooms/suite-401',
    src: '64855c_5ea1220234ba413b8d6cfdf855947918~mv2.png',
    alt: '落ち着いた色調でまとめたプレミアムスイートルーム',
  },
  {
    name: 'rooms/suite-501',
    src: '64855c_e8dca86211a5470d891c0911f0ba6669~mv2.png',
    alt: 'あかりが灯るプレミアムスイートルームのベッドとソファ',
  },
  {
    name: 'rooms/superior',
    src: '64855c_195ef80cf5944477a99391058019a3a0~mv2.png',
    alt: '窓の外に紅葉を望むプレミアムスーペリアルーム',
  },
  {
    name: 'rooms/standard',
    src: '64855c_0d4952a5b5a545d7bd837a117365bc87~mv2.png',
    alt: 'コンパクトにまとめられたスタンダードルーム',
  },
  {
    name: 'rooms/living',
    src: '64855c_609ac73c96db47b59f713e98c70913be~mv2.jpg',
    alt: '円形のダイニングテーブルとソファを備えた客室のリビング',
    w: HERO_WIDTHS,
  },
  {
    name: 'rooms/lantern',
    src: '64855c_418590ddaae2486b893334fe86eaecd3~mv2.jpg',
    alt: '天井から下がる和紙のあかり',
  },

  // ---------------- 温泉・SPA ----------------
  {
    name: 'spa/daiyokujo',
    src: '64855c_642819c7df70438fae8f36df36fb62cd~mv2.jpg',
    alt: '藍色の壁に囲まれた大浴場の浴槽。窓の外に木々が見える',
    w: HERO_WIDTHS,
  },
  {
    name: 'spa/daiyokujo-entrance',
    src: '64855c_6fc7a82d73004cd6acf98d346f41d60e~mv2.jpg',
    alt: '「大浴場」と記された藍色の暖簾がかかる入口',
  },
  {
    name: 'spa/changing-room',
    src: '64855c_45cda690d253426e966e6adbc76e5913~mv2.jpg',
    alt: '木の造作でまとめられた脱衣所とパウダーコーナー',
  },
  {
    name: 'spa/rotenburo-night',
    src: '389547_254d03a0140a4da7ac198c200f0c3e7e~mv2.jpg',
    alt: '夜、庭木をライトアップした露天風呂',
  },

  // ---------------- ダイニング ----------------
  {
    name: 'dining/restaurant',
    src: '64855c_ae215a764370421db080e89a4aa7027f~mv2.jpg',
    alt: '白いクロスのテーブルとソファ席が並ぶレストランの客席',
    w: HERO_WIDTHS,
  },
  {
    name: 'dining/lounge-bar',
    src: '64855c_66023fe0cca34c46b04bb3d7382f85ad~mv2.jpg',
    alt: 'レンガ壁と革張りのベンチシートが続くラウンジ',
  },
  {
    name: 'dining/table-setting',
    src: '64855c_fa42e1e3be7945819427b58881ef41c9~mv2.png',
    alt: 'グラスとカトラリーが整えられたディナーのテーブルセッティング',
  },
  {
    name: 'dining/setting-detail',
    src: '64855c_32babb47984644c0846fd069d83c08fc~mv2.jpg',
    alt: '折りたたまれたナプキンとグラスが置かれたテーブル',
  },
  {
    name: 'dining/private-table',
    src: '64855c_05eadee2fdd945f8aa9ad931585dbd7f~mv2.png',
    alt: '2名掛けのテーブル席',
  },
  {
    name: 'dining/course',
    src: '64855c_55733492f4ad4b2b93e557583dbd1aa2~mv2.png',
    alt: 'テーブルに並べられたディナーコースの皿',
  },
  {
    name: 'dining/dish-grill',
    src: '64855c_c28475a110f745088c799b496736be94~mv2.png',
    alt: 'ディナーコースの焼き物の一皿',
  },
  {
    name: 'dining/dish-appetizer',
    src: '64855c_4df8009fef1d43858aad0a9efc4b33e7~mv2.png',
    alt: '舟形の器に盛り付けられた前菜',
  },
  {
    name: 'dining/dish-meat',
    src: '64855c_8fe26e73bcbe40999ab8587449897927~mv2.png',
    alt: 'ソースを添えた肉料理の一皿',
  },
  {
    name: 'dining/dish-steak',
    src: '64855c_cf5b9643f6bb474eb5f06a8f2fae93df~mv2.png',
    alt: '野菜を添えたステーキの一皿',
  },
  {
    name: 'dining/dish-soup',
    src: '64855c_9d59cbfdffc347219c395ee075086297~mv2.png',
    alt: '蓋つきの器で供されるスープ',
  },
  {
    name: 'dining/dish-dessert',
    src: '64855c_1536e01a3b4f4a6da4a71ed1f8d2699a~mv2.png',
    alt: 'グラスに盛り付けられたデザート',
  },
  {
    name: 'dining/dish-sweets',
    src: '64855c_8341750aceb5462296f03dec6ae93ceb~mv2.png',
    alt: '皿に盛り付けられたデザートの一皿',
  },
  {
    name: 'dining/breakfast-western',
    src: '64855c_d637aeeadef54e3f9473420750608b3e~mv2.png',
    alt: '洋朝食の一例。卵料理とサラダ、小鉢が並ぶ',
  },
  {
    name: 'dining/breakfast-japanese',
    src: '64855c_0f19ff74b5674d08950783782e305a0f~mv2.png',
    alt: '和朝食の一例。ご飯と味噌汁、小鉢が並ぶ',
  },
  {
    name: 'dining/soba',
    src: '64855c_96feae5e1a5b4b2bbf81720b492bb253~mv2.png',
    alt: '蓋つきの器に盛られた冷たい麺料理',
  },

  // ---------------- ロビー・館内 ----------------
  {
    name: 'lobby/atrium',
    src: '64855c_5a2620ae85374c87b94a22478a179b21~mv2.jpg',
    alt: '吹き抜けの天井に組子細工の照明が下がるロビー',
    w: HERO_WIDTHS,
  },
  {
    name: 'lobby/lounge',
    src: '64855c_78ec2e60b1004d34bb61fb10b3ad1edd~mv2.jpg',
    alt: '大きな窓に面したロビーラウンジのソファ席',
  },
  {
    name: 'lobby/sofa-window',
    src: '64855c_c5a0a0ef7db54a6e910f8a5cdda59742~mv2.png',
    alt: '窓際に革張りのソファを配したラウンジスペース',
  },
  {
    name: 'lobby/sofa',
    src: '64855c_2be10bec14db45ee8513e16593dec0ee~mv2.png',
    alt: 'ロビーに置かれた革張りのソファとローテーブル',
  },
  {
    name: 'lobby/front-desk',
    src: '64855c_98e21508fb654431bdd4063383cef998~mv2.png',
    alt: 'あかりを埋め込んだフロントカウンター',
  },
  {
    name: 'lobby/front-flowers',
    src: '64855c_0ca4555557c34170b5ab0f9e51c977c5~mv2.png',
    alt: '生け花が飾られたフロント前のスペース',
  },
  {
    name: 'lobby/sofa-dark',
    src: '64855c_d2227e314f1d4519a1b76d871f2b3cff~mv2.png',
    alt: '黒い革張りのソファが並ぶロビー',
  },

  // ---------------- 宴会場 ----------------
  {
    name: 'banquet/hall',
    src: '64855c_ad66f5c9990b4806858f0338d1369d03~mv2.jpg',
    alt: 'ライン照明が天井を走るコンベンションホール',
    w: HERO_WIDTHS,
  },
  {
    name: 'banquet/hall-wide',
    src: '64855c_a99bd59bfb834180a89a857b363b66c0~mv2.jpg',
    alt: '什器を片付けた状態のコンベンションホールの全景',
  },
  {
    name: 'banquet/hall-floor',
    src: '64855c_e0af004fe2f04f1eaede9d3d7e4b9a4e~mv2.jpg',
    alt: '黒いカーペットが敷かれた広い宴会場',
  },

  // ---------------- 細胞浴サロン ----------------
  {
    name: 'salon/interior',
    src: '64855c_156440756e0e424bb863e3d45977672f~mv2.png',
    alt: '布を掛けた甕が並ぶ細胞浴サロンの室内',
    w: HERO_WIDTHS,
  },
  {
    name: 'salon/kame',
    src: '64855c_d58d6550e7f34971b4b0a1f57e463e21~mv2.png',
    alt: '照明を落とした細胞浴サロンの施術スペース',
  },
  {
    name: 'salon/relax',
    src: '64855c_f14a8853f3b945b6874d6c728271b993~mv2.jpg',
    alt: 'サロン内の洗面台とくつろぎのスペース',
  },
  // ↓ 現行の細胞浴サロンの写真。ホテル側の新サイト（spa-salon ページ）から取得。
  {
    name: 'salon/kame-open',
    src: 'salon-kame-open.webp',
    alt: '内部の腰掛けが見える甕と、絵付けが施された甕が並ぶ細胞浴サロンの室内',
  },
  {
    name: 'salon/jumonseki',
    src: 'salon-jumonseki.webp',
    alt: '木目のような模様が層状に表れた天然鉱石「樹紋石」',
  },
  {
    name: 'salon/kame-room',
    src: 'salon-kame-room.webp',
    alt: 'リクライニングチェアと絵付けの甕が置かれた細胞浴サロンの施術スペース',
    // スパ＆サロンページのヒーローに使用。原画像が横 1200px のためそこで打ち止め。
    w: [640, 1024, 1200],
  },

  // ---------------- 那須高原・周辺 ----------------
  {
    name: 'nasu/mountains-autumn',
    src: '64855c_42b765bbe5de4a6ea28f8a10ecc1ea97~mv2.jpg',
    alt: '紅葉に彩られた那須の山なみと、山あいの水面',
    w: HERO_WIDTHS,
  },
  {
    name: 'nasu/ropeway-autumn',
    src: '64855c_b4abb57ccc5346b187bfcf9cccfac47d~mv2.jpg',
    alt: '紅葉期の那須連山を行くロープウェイ',
  },
  {
    name: 'nasu/jizo',
    src: '64855c_46c334ef88a440f78bc213043f2d712a~mv2.jpg',
    alt: '岩場に赤い前掛けの地蔵が立ち並ぶ那須の史跡',
  },
  {
    name: 'nasu/villa',
    src: '64855c_f21be660051946b0843119a6e9ce23ac~mv2.jpg',
    alt: '芝生の庭に建つ那須高原の洋館',
  },
  {
    name: 'nasu/amusement-park',
    src: '64855c_80c41906150c413ba1117228b4092d6a~mv2.jpg',
    alt: '那須高原の遊園地。観覧車やコースターが並ぶ',
  },
  {
    name: 'nasu/alpaca',
    src: '64855c_75cb52dfac7a4906b1bf1c5f5c9cc1a2~mv2.jpg',
    alt: '那須高原の牧場でくつろぐアルパカ',
  },
  {
    name: 'nasu/waterfall',
    src: '64855c_9848d30fb7dc4fe1aa2468c4a000a6c5~mv2.jpg',
    alt: '苔むした岩の間を流れ落ちる渓流の滝',
  },
  {
    name: 'nasu/festival',
    src: '64855c_76432df7cac94f5f9544fb5f0e79174e~mv2.jpeg',
    alt: '那須町に伝わる祭りの獅子頭',
  },
  {
    name: 'nasu/gourmet-fish',
    src: '64855c_76dab6959f654de89c254bc38930648d~mv2.jpg',
    alt: '笹の葉に載せて供される川魚の塩焼き',
  },
  {
    name: 'nasu/gourmet-bowl',
    src: '64855c_6cc23bc30352423ba041639748f9ad53~mv2.jpg',
    alt: '和食の小鉢に盛られた一品',
  },

  // ================================================================
  // 楽気ハウス那須のホテルサイト（新版）から取得した写真。
  // 旧 Wix サイトの写真より新しく、施設の現況を写している。
  // 接頭辞 rk- が原画像のファイル名。
  // ================================================================
  {
    name: 'hotel/exterior-night',
    src: 'rk-exterior-night.webp',
    alt: '夕暮れの空と雪をいただいた那須連山を背に、客室のあかりが灯る楽気ハウス那須の外観',
    w: HERO_WIDTHS,
  },
  {
    name: 'hero/corporate-resort',
    src: 'jw-hero-resort.webp',
    alt: '夕暮れの那須連山を背に、客室のあかりが灯る山あいのリゾートホテル',
    // ⚠ 原画像が 1280×720 しかないため、ヒーロー用の 1600 / 2000 は生成できない。
    //    引き伸ばすと粗くなるだけなので、原寸の 1280 を上限にしている。
    //    1600px 以上の原画像に差し替えたら w: HERO_WIDTHS へ変更し、
    //    npm run images -- --force で再生成すること。
    w: [640, 1024, 1280],
  },
  {
    name: 'rooms/window-view',
    src: 'rk-room-window.webp',
    alt: '大きな窓から那須高原の森を望む客室',
    w: HERO_WIDTHS,
  },

  // ---- 温泉 ----
  {
    name: 'spa/daiyokujo-wide',
    src: 'rk-daiyokujo.webp',
    alt: '藍色のタイルに囲まれた大浴場。窓の外に木々の緑が広がる',
    w: HERO_WIDTHS,
  },
  {
    name: 'spa/daiyokujo-view',
    src: 'rk-daiyokujo-view.webp',
    alt: '洗い場が並ぶ大浴場と、窓いっぱいに広がる緑',
  },

  // ---- エステサロン ----
  {
    name: 'salon/esthetic-room',
    src: 'rk-esthetic-room.webp',
    alt: '窓の外に緑を望む、施術ベッドを2台備えたエステサロンの室内',
    w: HERO_WIDTHS,
  },
  {
    name: 'salon/esthetic-facial',
    src: 'rk-esthetic-facial.webp',
    alt: 'フェイシャルの施術を受ける様子',
  },
  {
    name: 'salon/esthetic-body',
    src: 'rk-esthetic-body.webp',
    alt: 'ボディの施術を受ける様子',
  },

  // ---- 客室 ----
  {
    name: 'rooms/premium-suite-a',
    src: 'rk-suite-a.webp',
    alt: 'プレミアム スイートルームA。クイーンサイズベッドとソファ、ダイニングテーブルを備えた広い室内',
    w: HERO_WIDTHS,
  },
  {
    name: 'rooms/premium-suite-b',
    src: 'rk-suite-b.webp',
    alt: 'プレミアム スイートルームB。那須の自然を望む窓と温もりのある内装',
    w: HERO_WIDTHS,
  },
  {
    name: 'rooms/premium-superior',
    src: 'rk-superior.webp',
    alt: 'プレミアムスーペリアルーム。ダブルベッド2台を備えた室内と窓の外の高原の景色',
    w: HERO_WIDTHS,
  },
  {
    name: 'rooms/standard-room',
    src: 'rk-standard.webp',
    alt: 'スタンダードルーム。落ち着いた設えのベッドルーム',
    w: HERO_WIDTHS,
  },

  // ---- ダイニング ----
  {
    name: 'dining/restaurant-raki',
    src: 'rk-restaurant.webp',
    alt: '格子の間仕切りで区切られた、ダイニングレストラン「楽気」の客席',
    w: HERO_WIDTHS,
  },
  {
    name: 'dining/restaurant-table',
    src: 'rk-restaurant-table.webp',
    alt: '花とグラスが整えられたレストランのテーブル席',
  },
  {
    name: 'dining/course-seseragi',
    src: 'rk-course-seseragi.webp',
    alt: '前菜から魚料理、肉料理まで並んだコース料理',
  },
  {
    name: 'dining/course-unkai',
    src: 'rk-course-unkai.webp',
    alt: 'ステーキを中心に彩り豊かな皿が並んだコース料理',
  },
  {
    name: 'dining/breakfast-plate',
    src: 'rk-breakfast.webp',
    alt: '卵料理や野菜、スープが並んだ朝食',
  },
  {
    name: 'dining/kids-plate',
    src: 'rk-kids.webp',
    alt: 'エビフライやパスタ、スープを盛り合わせたお子様向けのプレート',
  },
  {
    name: 'dining/cake',
    src: 'rk-cake.webp',
    alt: 'いちごを飾り、メッセージプレートを添えたホールケーキ',
  },
  {
    name: 'dining/message-plate',
    src: 'rk-message-plate.webp',
    alt: 'メッセージを描いたデザートプレート',
  },
  {
    name: 'dining/bouquet',
    src: 'rk-bouquet.webp',
    alt: 'バラやガーベラをまとめたブーケ',
  },
  {
    name: 'dining/bar',
    src: 'rk-bar.webp',
    alt: '石蔵を生かしたバーのカウンター',
  },

  // ---- 周辺観光スポット（参考サイト 周辺観光ページの掲載写真） ----
  {
    name: 'nasu/spot-yahata',
    src: 'rk-spot-yahata.webp',
    alt: '木道の両側を赤いツツジが埋め尽くす八幡ツツジ群落',
  },
  {
    name: 'nasu/spot-sesshoseki',
    src: 'rk-spot-sesshoseki.webp',
    alt: '「殺生石」の標柱と、しめ縄が張られた岩場',
  },
  {
    name: 'nasu/spot-observatory',
    src: 'rk-spot-observatory.webp',
    alt: '那須高原展望台から望む、緑の森の先に広がる関東平野',
  },
  {
    name: 'nasu/spot-flowerworld',
    src: 'rk-spot-flowerworld.webp',
    alt: '那須連山を背にチューリップが咲きそろう那須フラワーワールド',
  },
  {
    name: 'nasu/spot-minamigaoka',
    src: 'rk-spot-minamigaoka.webp',
    alt: '南ヶ丘牧場の草地でくつろぐ牛',
  },
  {
    name: 'nasu/spot-highlandpark',
    src: 'rk-spot-highlandpark.webp',
    alt: '観覧車やコースターが並ぶ那須ハイランドパークの全景',
  },
  {
    name: 'nasu/spot-rindolake',
    src: 'rk-spot-rindolake.webp',
    alt: 'りんどう湖の上をジップラインで滑り降りる来園者',
  },
  {
    name: 'nasu/spot-animalkingdom',
    src: 'rk-spot-animalkingdom.webp',
    alt: 'ジャガーやレッサーパンダなど、那須どうぶつ王国で暮らす動物たち',
  },
  {
    name: 'nasu/spot-cheesegarden',
    src: 'rk-spot-cheesegarden.webp',
    alt: 'チーズガーデン那須本店の外観と、皿に盛られたチーズケーキ',
  },
  {
    name: 'nasu/spot-goodnews',
    src: 'rk-spot-goodnews.webp',
    alt: '木立の中に建つ複合施設 GOOD NEWS の店舗',
  },

  // ---------------- アクセス地図 ----------------
  {
    name: 'access/map-ichikenjaya',
    src: '64855c_9b211a11db9241fc9cefc9d692d92e4a~mv2.png',
    alt: '楽気ハウス那須から、バス停「一軒茶屋」とセブンイレブン那須一軒茶屋店までの位置関係を示した地図',
    w: [531, 1062],
    contain: true,
  },
  {
    name: 'access/map-nasushiobara',
    src: '64855c_99f47677e8a843da825629a5186793a0~mv2.png',
    alt: '那須塩原駅西口のバス乗り場・タクシー乗り場の位置を示した地図',
    w: [635, 1270],
    contain: true,
  },
];

/**
 * 現行サイトにあるが、新サイトへは意図的に移していない画像。
 * 理由は docs/04-content-review.md / docs/05-health-content-review.md にも記載。
 */
export const EXCLUDED = [
  {
    src: '11062b_9d96f7c1f9444bfdbd37edb7281e6af7f000.jpg',
    why: 'Wix のストックフォト。スパニッシュモスの垂れる湖の夕景で那須高原とは無関係。現行サイトでは全12ページに読み込まれていた。',
  },
  {
    src: '64855c_703ac04c75464d7697447a96a79cf6db~mv2.png',
    why: 'JWロゴの立体版。フラット版（brand/jw-mark）に統一したため不使用。現行サイトでは全48ページの og:image に使われていた。',
  },
  {
    src: '64855c_3a25fb5284ad4392924a47cf80a061c9~mv2.png',
    why: '細胞浴サロンの販促ポスター画像。効果効能に関わる文言が画像内に焼き込まれており編集できないため不使用（docs/05 参照）。',
  },
  { src: '64855c_9c6a1b814501457abdd41125def58516~mv2.jpg', why: '料理写真。956×371 と低解像度で、同一シーンの高解像度版がある。' },
  { src: '64855c_9021251b69db45b998edfed8f7a00f77~mv2.png', why: '料理写真の重複。' },
  { src: '64855c_ea2a7382a06b4f949fd3dbdd9bd657b2~mv2.png', why: '料理写真の重複。' },
  { src: '64855c_de854f2b914a42bf8ac7eaeae88605f0~mv2.png', why: '洋朝食写真の重複（breakfast-western と同一シーン）。' },
  { src: '64855c_a07f5d63f64047878b02d430bed2e230~mv2.png', why: '和朝食写真の重複（breakfast-japanese と同一シーン）。' },
  { src: '64855c_0f19ff74b5674d08950783782e305a0f~mv2.png', why: '（採用済み：breakfast-japanese）' },
];
