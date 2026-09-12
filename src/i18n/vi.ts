import type { Dict } from './types';

/**
 * Tiếng Việt.
 *
 * 底本は現行 /vi/* のページ。以下の修正のみ行い、docs/04-content-review.md に記載:
 *  (a) 日本語原文が明確な機械翻訳エラーの修正
 *      - 茶臼岳「11915m」→ 1.915 m
 *      - 客室「33」→ 26
 *      - 宴会場「hơn 300 người」→ 200 người
 *      - 「một quán trà」→ Ichikenjaya（一軒茶屋・地名）
 *      - 「chăn nuôi phô mai」→ chăn nuôi bò sữa（酪農）
 *      - 「Jule Resort Hotel」→ Raki Resort Hotel（誤記）
 *      - 「Shuming 2」→ Jomei 2 / 「Bagou」→ Yamizo / 「Honmachi」→ thị trấn
 *  (b) 日本語版には無い健康表現（"khỏe, đẹp và trường thọ"）を原文に合わせた
 *      → docs/05-health-content-review.md
 *  (c) 未翻訳のまま残っていた日本語（「穏やかに包み込まれ 優美なときを」など）を翻訳
 *
 * 会員権の金額・予約条件は現行 /vi/about-5 の記載を原文のまま保持している（docs/04 参照）。
 */
const vi: Dict = {
  ui: {
    skipToContent: 'Chuyển tới nội dung',
    brandSub: 'Raki House Nasu',
    menu: 'Menu',
    close: 'Đóng',
    languageLabel: 'Ngôn ngữ',
    breadcrumbHome: 'Trang chủ',
    readMore: 'Xem chi tiết',
    externalSite: 'Trang ngoài',
    opensInNewTab: 'Mở trong tab mới',
    ctaBook: 'Đặt phòng',
    ctaMembers: 'Thành viên',
    telLabel: 'Điện thoại',
    telHoursLabel: 'Giờ tiếp nhận',
    addressLabel: 'Địa chỉ',
    pageTop: 'Lên đầu trang',
    notFoundTitle: 'Không tìm thấy trang',
    notFoundLead:
      'Trang bạn tìm có thể đã được chuyển hoặc xoá. Vui lòng thử các liên kết dưới đây.',
    notFoundBack: 'Về trang chủ',
  },

  nav: {
    home: 'Trang chủ',
    hotel: 'Raki House Nasu',
    rooms: 'Phòng nghỉ',
    spa: 'Suối nước nóng & SPA',
    dining: 'Ẩm thực',
    banquet: 'Phòng tiệc',
    salon: 'Spa & Salon',
    nasu: 'Cao nguyên Nasu',
    booking: 'Đặt phòng',
    membership: 'Quyền thành viên',
    access: 'Đường đi',
    company: 'Về công ty',
  },

  footer: {
    hotelHeading: 'Resort Hotel Raki House Nasu',
    companyHeading: 'Công ty Japan World',
    linksHeading: 'Các trang liên quan',
    externalNote: 'Đây là website của Công ty Japan World. Các liên kết dưới đây dẫn sang trang khác.',
    hotelSiteLabel: 'Trang chính thức Raki House Nasu',
    membersLabel: 'JWCCS – đặt phòng dành cho thành viên',
    nftLabel: 'JW NFT Platform',
    busTimetableLabel: 'Lịch xe buýt (Kanto Bus)',
  },

  booking: {
    generalTitle: 'Khách lẻ',
    generalBody:
      'Raki House Nasu hoạt động theo mô hình khách sạn thành viên, đồng thời vẫn đón tiếp khách không phải thành viên. Tình trạng phòng, các gói lưu trú, giá và việc đặt phòng được xử lý trên trang đặt phòng Raki House Nasu.',
    generalCta: 'Tới trang đặt phòng',
    membersTitle: 'Thành viên Raki House',
    membersBody:
      'Vui lòng đặt phòng qua JWCCS (Japan World Concierge Club Service), hệ thống đặt phòng dành riêng cho thành viên. Cần đăng ký JWCCS và đăng nhập.',
    membersCta: 'Đăng nhập JWCCS',
    nftTitle: 'Khách có voucher lưu trú NFT',
    nftBody:
      'Việc đặt phòng bằng voucher lưu trú NFT hiện được tiếp nhận qua fax. Vui lòng gọi điện để xác nhận thủ tục.',
    nftCta: 'JW NFT Platform',
    routesCta: 'Xem cách đặt phòng',
  },

  pages: {
    home: {
      title: 'Resort Hotel Raki House Nasu – Cao nguyên Nasu',
      description:
        'Khách sạn nghỉ dưỡng thành viên tại cao nguyên Nasu, Tochigi, do Công ty Japan World vận hành. 26 phòng, suối nước nóng, sảnh tiệc và tiệm tắm tế bào. Khách lẻ cũng được chào đón.',
      h1: 'Một mái nhà thứ hai giữa cao nguyên Nasu.',
      eyebrow: 'Resort Hotel RAKI HOUSE NASU',
      heroTitle: 'Một mái nhà thứ hai giữa cao nguyên Nasu.',
      heroSub:
        'Thiên nhiên bốn mùa rực rỡ của cao nguyên Nasu, cùng một không gian tinh tế và dễ chịu đang chờ đón bạn.',
      heroLocation: 'Yumoto, Nasu-machi, Tochigi ｜ Khách sạn nghỉ dưỡng thành viên 26 phòng',
      heroCtaPrimary: 'Hướng dẫn đặt phòng',
      heroCtaSecondary: 'Tìm hiểu khách sạn',

      introHeading: 'Về Raki House Nasu',
      introBody: [
        'Raki House Nasu là khách sạn nghỉ dưỡng do Công ty Japan World vận hành tại cao nguyên Nasu. Khách sạn hoạt động theo mô hình thành viên, đồng thời vẫn đón tiếp khách lẻ.',
        'Khách sạn có 26 gian phòng nghỉ rộng rãi, lối kiến trúc dành trọn toà nhà cho du khách nhằm bảo đảm sự riêng tư cao. Trong khuôn viên có phòng tắm suối nước nóng và bồn tắm lộ thiên, nhà hàng & quầy bar, sảnh tiệc quy mô 200 người và tiệm tắm tế bào Taiko-no-Kame.',
      ],

      factsHeading: 'Thông tin khái quát',
      facts: [
        ['Địa chỉ', '213-2721 Yumoto, Nasu-machi, Nasu-gun, Tochigi'],
        ['Số phòng', '26 phòng'],
        ['Suối nước nóng', 'Phòng tắm lớn và bồn tắm lộ thiên (nam / nữ)'],
        ['Phòng tiệc', 'Sảnh tiệc lớn, vừa và nhỏ (tối đa 200 người)'],
        ['Tiệm trong khuôn viên', 'Tiệm tắm tế bào Taiko-no-Kame'],
        ['Bãi đậu xe', '50 xe'],
      ],

      highlightsHeading: 'Bên trong khách sạn',
      highlightsLead:
        'Từ phòng nghỉ đến suối nước nóng, bữa ăn và phòng tiệc — mọi thứ ở đây đều dành cho quãng thời gian bạn sống giữa thiên nhiên Nasu.',
      highlights: [
        {
          title: 'Phòng nghỉ',
          body: 'Những căn phòng cổ điển nơi nội thất hiện đại hoà cùng nét Nhật Bản, chú trọng cảm giác dễ chịu như đang ở giữa rừng.',
        },
        {
          title: 'Suối nước nóng & SPA',
          body: 'Các bức tường nhuộm chàm tạo nên phòng tắm lớn thư thái như một căn phòng kiểu Nhật. Ngoài ra còn có bồn tắm lộ thiên.',
        },
        {
          title: 'Ẩm thực',
          body: 'Những món ăn tâm đắc của bếp trưởng với nguyên liệu chọn lọc, phục vụ trong không gian trầm lắng.',
        },
        {
          title: 'Phòng tiệc',
          body: 'Sảnh tiệc lớn có thể tổ chức sự kiện quy mô 200 người. Cũng phù hợp với các cuộc họp nhỏ.',
        },
        {
          title: 'Tiệm tắm tế bào',
          body: 'Tiệm Taiko-no-Kame nằm cố định trong khuôn viên khách sạn, có thể trải nghiệm cùng kỳ lưu trú.',
        },
        {
          title: 'Sảnh & lễ tân',
          body: 'Từ khi nhận phòng đến khi trả phòng, đội ngũ concierge luôn đồng hành cùng bạn.',
        },
      ],

      conciergeHeading: 'Đồng hành chu đáo suốt kỳ nghỉ',
      conciergeBody:
        'Từ khi nhận phòng đến khi trả phòng, đội ngũ concierge sẽ phục vụ bạn tận tình. Xin cứ thoải mái hỏi về thông tin du lịch, đặt bàn nhà hàng hay phương tiện di chuyển.',

      nasuHeading: 'Cao nguyên Nasu',
      nasuBody:
        'Cao nguyên Nasu (thị trấn Nasu) cách Tokyo khoảng 180 km, nằm giữa Tokyo và Sendai, là thị trấn sống bằng du lịch và nông lâm nghiệp. Nơi đây có khu suối nước nóng lâu đời, công viên chủ đề và vùng chăn nuôi bò sữa rộng lớn. Xung quanh còn có nơi tiếp xúc với động vật và công viên giải trí — đủ để cả nhà cùng vui.',
      nasuCta: 'Cao nguyên Nasu và vùng lân cận',

      membershipHeading: 'Quyền thành viên Raki House',
      membershipBody:
        'Quyền thành viên theo hình thức chia sẻ kỳ nghỉ, bảo đảm số đêm lưu trú mỗi năm. Quyền này cũng có thể chuyển đổi giữa các cơ sở Raki House cùng cấp.',
      membershipCta: 'Về quyền thành viên',

      bookingHeading: 'Cách đặt phòng',
      bookingLead: 'Kênh đặt phòng tuỳ theo cách bạn lưu trú cùng chúng tôi.',

      accessHeading: 'Đường đi',
      accessLead:
        'Khoảng 20 phút lái xe từ nút giao Nasu trên đường cao tốc Tohoku. Từ ga Nasushiobara (Tohoku Shinkansen) có xe buýt tuyến và xe đưa đón của khách sạn.',
      accessCta: 'Chi tiết đường đi',
    },

    hotel: {
      title: 'Raki House Nasu – Khách sạn nghỉ dưỡng',
      description:
        'Resort Hotel Raki House Nasu tại cao nguyên Nasu, Tochigi. 26 phòng dành trọn cho du khách, cùng suối nước nóng, nhà hàng & quầy bar, sảnh tiệc và tiệm tắm tế bào.',
      h1: 'Raki House Nasu',
      eyebrow: 'RAKI HOUSE NASU',
      lead: 'Tắm mình trong thiên nhiên, cùng bạn bè người thân trải nghiệm những điều tuyệt vời nhất.',
      introBody: [
        'Khách sạn có 26 gian phòng nghỉ rộng rãi, lối kiến trúc dành trọn toà nhà cho du khách nhằm bảo đảm sự riêng tư cao.',
        'Cao nguyên Nasu là nơi cả gia đình, đồng nghiệp và bạn bè đều có thể tận hưởng. Hãy đắm mình trong thiên nhiên bao la và bầu không khí tinh tế của Nasu, ngắm cảnh sắc bốn mùa, và khám phá trọn vẹn sức hút của vùng đất này với các điểm đến từ nông trại tới công viên giải trí.',
      ],

      facilitiesHeading: 'Cơ sở vật chất',
      facilitiesLead: 'Chi tiết từng khu vực được giới thiệu ở trang riêng.',

      lobbyHeading: 'Sảnh khách sạn',
      lobbyBody: [
        'Hương cà phê dịu nhẹ và những trang sách. Khoảnh khắc nghỉ dưỡng tự do và đáng quý bắt đầu từ đây.',
        'Tạo ra một môi trường ấm áp, thoải mái và thư giãn cho khách hàng. Bạn có thể đọc sách, uống cà phê, trò chuyện và tận hưởng thời gian thư giãn tại đây. Quầy lễ tân giúp bạn làm các thủ tục nhận phòng và trả phòng; mọi yêu cầu trong kỳ lưu trú xin cứ thoải mái trao đổi với lễ tân.',
      ],
      lobbyCards: [
        {
          title: 'Nhận phòng / trả phòng',
          body: 'Nhân viên lễ tân sẽ hỗ trợ bạn. Luôn có nhân viên trực 24 giờ.',
        },
        {
          title: 'Quan hệ khách hàng',
          body: 'Chúng tôi nỗ lực đáp ứng mọi yêu cầu của khách lưu trú, từ điểm tham quan lân cận đến chỉ đường.',
        },
        {
          title: 'Khu lounge',
          body: 'Thưởng thức đồ uống trong không gian thư giãn. Có Wi-Fi và internet miễn phí.',
        },
        {
          title: 'Concierge',
          body: 'Xin cứ thoải mái hỏi về thông tin du lịch, đặt bàn nhà hàng hay phương tiện di chuyển.',
        },
      ],

      hospitalityHeading: 'Cơ cấu của Raki House',
      hospitalityLead: 'Một "ngôi nhà thứ hai" nơi hạnh phúc hiện diện trong từng hơi thở.',
      hospitalityBody: [
        'Tại Raki House, chúng tôi luôn giữ cho mỗi vị khách một môi trường tràn đầy hạnh phúc, coi trọng bầu không khí trong từng dịch vụ, giữ tinh thần hiếu khách, và thường xuyên đào tạo nhân viên để có thể mang đến nhiều hơn những gì khách mong đợi.',
        'Nghĩ trước một bước về mong muốn và thắc mắc của khách, chủ động lên tiếng khi cần, để mỗi vị khách đều có quãng thời gian thực sự trọn vẹn — đó chính là tinh thần hiếu khách của Raki House.',
        'Chúng tôi không để mình bị bó buộc bởi những dịch vụ rập khuôn, mà đặt vị khách đang ở trước mặt lên hàng đầu, hướng tới việc mang lại một không gian thực sự dễ chịu.',
      ],

      salonTeaserHeading: 'Có cả tiệm thư giãn trong khuôn viên',
      salonTeaserBody:
        'Trong Raki House có tiệm Taiko-no-Kame cố định, nơi bạn có thể trải nghiệm tắm tế bào.',

      hotelSiteHeading: 'Về các gói lưu trú và tình trạng phòng',
      hotelSiteBody:
        'Các gói lưu trú, giá, tình trạng phòng và việc đặt phòng được xử lý trên trang đặt phòng Raki House Nasu. Chuyên đề theo mùa và thông báo thuế lưu trú của thị trấn Nasu được đăng trên trang chính thức.',
    },

    rooms: {
      title: 'Phòng nghỉ',
      description:
        'Các hạng phòng tại Raki House Nasu. Toàn bộ 26 phòng đều từ 32 m² trở lên: Premium Suite A và B, Premium Superior và Standard.',
      h1: 'Phòng nghỉ',
      eyebrow: 'ROOM',
      lead: 'Những căn phòng tinh tế, dễ chịu, phản chiếu phong cảnh Nasu.',
      introBody:
        'Bên kia ô cửa rộng là khung cảnh hùng vĩ của cao nguyên Nasu. Những giờ phút yên bình ngắm sắc màu thiên nhiên đổi thay từng khoảnh khắc, như đang ngắm một bức tranh. Toàn bộ 26 phòng đều rộng từ 32 m² trở lên — xin hãy thư thái nghỉ ngơi.',

      checkInOut: 'Nhận phòng 15:00 / Trả phòng 11:00',

      types: [
        {
          name: 'Premium Suite A',
          nameEn: 'PREMIUM SUITE ROOM A',
          size: '91 m²',
          capacity: '1–3 khách',
          body:
            'Premium Suite A tinh tế với diện tích rộng rãi 91 m². Phòng tắm thoảng hương gỗ bách hinoki mang lại khoảnh khắc thư giãn. Căn phòng phù hợp cho chuyến đi cùng người quan trọng hoặc dịp kỷ niệm đặc biệt.',
          specs: ['2 giường Queen', 'Giường sofa', 'Bàn ăn', 'TV LCD (42" và 49")', 'Phòng tắm', 'Bồn cầu điện tử', 'Wi-Fi', 'Phòng không hút thuốc'],
        },
        {
          name: 'Premium Suite B',
          nameEn: 'PREMIUM SUITE ROOM B',
          size: '57 m²',
          capacity: '1–3 khách',
          body: 'Premium Suite B với điểm nhấn là tầm nhìn ra thiên nhiên trù phú của Nasu. Căn phòng đặc biệt nơi không gian rộng rãi hoà cùng nội thất ấm áp.',
          specs: ['2 giường Queen', 'Giường sofa', 'Bàn', '2 TV LCD (42")', 'Phòng tắm', 'Bồn cầu điện tử', 'Wi-Fi', 'Phòng không hút thuốc'],
        },
        {
          name: 'Premium Superior',
          nameEn: 'PREMIUM SUPERIOR ROOM',
          size: '46 m²',
          capacity: '1–3 khách',
          body: 'Premium Superior với khung cảnh cao nguyên Nasu tràn ngập ô cửa. Không gian rộng rãi với 2 giường đôi, phòng tắm và nhà vệ sinh tách biệt.',
          specs: ['2 giường đôi', 'Giường sofa', 'Bàn', 'Phòng tắm', 'Bồn cầu điện tử', 'Wi-Fi', 'Phòng không hút thuốc'],
        },
        {
          name: 'Standard',
          nameEn: 'STANDARD ROOM',
          size: '32–38 m²',
          capacity: '1–3 khách',
          body: 'Phòng Standard với lối bài trí giản dị, trầm lắng và dễ chịu. Một không gian thư thái cho kỳ nghỉ nhẹ nhàng.',
          specs: ['2 giường đôi', 'Giường sofa', 'Bàn', 'Phòng tắm vòi sen', 'Bồn cầu điện tử', 'Wi-Fi', 'Phòng không hút thuốc'],
        },
      ],

      typeNotes: [
        'Phòng Standard chỉ có phòng tắm vòi sen.',
        'Chúng tôi không nhận yêu cầu chỉ định diện tích phòng.',
      ],

      amenityHeading: 'Tiện nghi và đồ dùng',
      amenityRows: [
        ['Trong phòng', 'Điều hoà / Tủ lạnh / Máy sấy tóc / Yukata người lớn / Yukata trẻ em / Dép đi trong nhà'],
        ['Đồ dùng', 'Khăn tắm / Khăn mặt / Sữa tắm / Dầu gội / Dầu xả / Mũ tắm / Lược / Tăm bông / Bộ bàn chải / Dao cạo'],
      ],

      note: 'Giá và tình trạng phòng theo từng hạng được đăng trên trang đặt phòng Raki House Nasu.',
    },
    spa: {
      title: 'Suối nước nóng & bồn tắm lộ thiên',
      description:
        'Suối nước nóng tại Raki House Nasu: phòng tắm lớn “Rindo-no-yu” với tường nhuộm chàm và bồn tắm lộ thiên “Goyo-no-yu”, cùng giờ mở cửa và chất nước.',
      h1: 'Suối nước nóng & SPA',
      eyebrow: 'SPA',
      lead: 'Xanh lam, xanh navy, xanh nhạt… Ở Nhật có cách nói "bốn mươi tám sắc chàm" — một màu với vô vàn sắc thái.',
      introBody: [
        'Các bức tường của phòng tắm lớn được nhuộm chàm cẩn thận, tạo nên nét Nhật Bản trầm lắng. Được bao bọc trong sắc chàm sâu thẳm và hơi ấm của nước, xin hãy tận hưởng khoảng lặng thư thái.',
      ],

      daiyokujoHeading: 'Phòng tắm lớn “Rindo-no-yu”',
      daiyokujoBody: [
        'Ở Nhật có cách nói "bốn mươi tám sắc chàm". Các bức tường của phòng tắm lớn được nhuộm chàm cẩn thận, tạo nên nét Nhật Bản trầm lắng.',
        'Được bao bọc trong sắc chàm sâu thẳm và hơi ấm của nước, xin hãy tận hưởng khoảng lặng thư thái.',
      ],

      rotenburoHeading: 'Bồn tắm lộ thiên “Goyo-no-yu”',
      rotenburoBody: [
        'Bồn tắm lộ thiên nơi bạn thả mình vào dòng nước, cảm nhận bốn mùa ngay bên cạnh.',
        'Mùa xuân là chồi non, mùa hè là sắc xanh mát lành, mùa thu là lá đỏ rực rỡ, mùa đông là tuyết rơi lặng lẽ. Hãy tắm mình trong nước nóng và ngắm khung cảnh đổi thay theo từng mùa.',
      ],

      changingHeading: 'Phòng thay đồ',
      changingBody:
        'Chăm chút đến từng chi tiết, trầm lắng và thư thái, được dựng theo hình ảnh "Nhật Bản" ấm áp.',

      hoursHeading: 'Giờ sử dụng',
      hoursRows: [
        ['Buổi tối', '15:00–24:00'],
        ['Sáng sớm', '5:30–9:00 hôm sau'],
      ],

      onsenHeading: 'Về suối nước nóng',
      onsenRows: [
        ['Tên nguồn', 'Shiobara Shiki-no-sato Onsen'],
        ['Chất nước', 'Suối đơn thuần tính kiềm'],
        [
          'Chỉ định',
          'Đau dây thần kinh / Đau cơ / Đau khớp / Viêm quanh khớp vai / Liệt vận động / Cứng khớp / Bầm tím / Bong gân / Bệnh tiêu hoá mạn tính / Trĩ / Chứng sợ lạnh / Giai đoạn hồi phục sau bệnh / Phục hồi mệt mỏi / Tăng cường sức khoẻ',
        ],
      ],

      note: 'Thuế tắm suối nước nóng 150 yên áp dụng từ 12 tuổi trở lên.',
    },
    dining: {
      title: 'Ẩm thực — Dining Restaurant “RAKI”',
      description:
        'Ẩm thực tại Raki House Nasu. Thực đơn set từ bò Nasunogahara và nguyên liệu địa phương theo mùa, bữa sáng thay đổi mỗi ngày, và quầy bar nhà kho đá “Shunkashuto”.',
      h1: 'Ẩm thực',
      eyebrow: 'DINING',
      lead: 'Gửi trọn ân huệ của Nasu vào từng món ăn.',
      introBody: [
        'Sử dụng bò thương hiệu Nasunogahara và nguyên liệu địa phương theo mùa, bếp của chúng tôi dệt nên những thực đơn set kết hợp sự tinh tế của ẩm thực Nhật với nét rực rỡ của phương Tây.',
        'Mời bạn tận hưởng khoảnh khắc mỹ thực trọn vẹn tại Dining Restaurant “RAKI”.',
      ],

      restaurantHeading: 'Nhà hàng',
      restaurantName: 'Dining Restaurant “RAKI”',
      restaurantBody:
        'Nhà hàng mang phong cách trang nhã, bao bọc trong ánh sáng dịu và lối bài trí tinh tế. Thưởng thức món ăn, trò chuyện cùng người quan trọng — xin hãy để thời gian trôi thật chậm.',
      restaurantRows: [
        ['Bữa tối', 'Ca 1: 18:00–19:30 / Ca 2: 19:00–20:30'],
        ['Bữa sáng', 'Ca 1: 7:00–8:00 / Ca 2: 8:00–9:00'],
        ['Trang phục', 'Vui lòng không mặc đồ mặc trong phòng khi tới nhà hàng.'],
      ],

      dinnerHeading: 'Bữa tối',
      courses: [
        {
          title: 'Seseragi (tiêu chuẩn)',
          body: 'Thực đơn nhẹ nhàng, cân bằng, kết hợp khai vị theo mùa với món cá và món thịt địa phương.',
        },
        {
          title: 'Unkai (nâng cấp)',
          body: 'Gói nâng cấp với món chính là bít tết bò Nasunogahara. Mỗi món đều được dựng để tôn lên chất riêng của nguyên liệu.',
        },
      ],

      breakfastHeading: 'Bữa sáng',
      breakfastBody:
        'Bữa sáng từ nguyên liệu địa phương như trứng Nasu Goyo, rau tươi và sữa. Thực đơn Nhật hoặc Âu thay đổi mỗi ngày, hợp với một buổi sáng ở Nasu.',

      kidsHeading: 'Phần ăn cho trẻ em',
      kidsBody: 'Chúng tôi cũng có thực đơn dành cho trẻ em, để cả gia đình cùng vui.',
      kidsRows: [
        ['Bữa tối', '3.300 yên (đã gồm thuế)'],
        ['Bữa sáng', '2.200 yên (đã gồm thuế)'],
      ],
      kidsNote: 'Cần đặt trước. Vui lòng cho chúng tôi biết khi đặt phòng.',

      anniversaryHeading: 'Kỷ niệm và chúc mừng',
      anniversary: [
        {
          title: 'Đĩa thông điệp',
          body: 'Đĩa kèm thông điệp bạn chọn, phục vụ trong bữa tối.',
          price: '1.500 yên (đã gồm thuế)',
          reserve: 'Chậm nhất 5 ngày trước ngày sử dụng (cần đặt trước)',
        },
        {
          title: 'Bánh nguyên chiếc',
          body: 'Bánh trang trí cỡ khoảng 12 cm kèm thông điệp.',
          price: '3.500 yên (đã gồm thuế)',
          reserve: 'Chậm nhất 5 ngày trước ngày sử dụng (cần đặt trước)',
        },
        {
          title: 'Bó hoa',
          body: 'Bó hoa tô điểm cho ngày đặc biệt.',
          price: '4.000 yên (đã gồm thuế)',
          reserve: 'Chậm nhất 5 ngày trước ngày sử dụng (cần đặt trước)',
        },
      ],
      anniversaryNotes: [
        'Hình ảnh chỉ mang tính minh hoạ.',
        'Nếu bạn có nhu cầu, vui lòng liên hệ trước.',
        'Nếu có dị ứng, xin vui lòng báo trước.',
      ],

      barHeading: 'Quầy bar',
      barName: 'BAR nhà kho đá “Shunkashuto”',
      barBody:
        'Từ craft ginger ale và craft cola với gia vị pha chế riêng, đến các loại đồ uống đặc biệt làm từ trái cây theo mùa — những hương vị chỉ có ở đây. Hãy cùng người quan trọng tận hưởng khoảng thời gian dễ chịu bên ly đồ uống.',
      barRows: [
        ['Giờ mở cửa', '18:00–22:00 (gọi món cuối 22:00)'],
        ['Sử dụng', 'Cần đặt trước'],
      ],

      note: 'Nguyên liệu và thực đơn có thể thay đổi tuỳ theo tình hình nhập hàng.',
    },
    banquet: {
      title: 'Sảnh tiệc',
      description:
        'Sảnh tiệc tại Raki House Nasu, có thể tổ chức sự kiện quy mô 200 người, cùng các sảnh tiệc vừa và nhỏ.',
      h1: 'Convention hall',
      eyebrow: 'BANQUET',
      lead: 'Không gian quy mô lớn, đáp ứng nhiều hình thức tổ chức cho tới 200 người.',
      introBody:
        'Từ các cuộc họp nhỏ đến tiệc và sự kiện, sảnh có thể phục vụ nhiều mục đích. Đây là sảnh tiệc lớn vừa tiện dụng vừa đẹp mắt.',

      capacityHeading: 'Quy mô',
      capacityBody:
        'Có sảnh tiệc lớn, vừa và nhỏ. Sảnh lớn có thể tổ chức sự kiện quy mô 200 người.',

      useHeading: 'Các dịp sử dụng',
      useBody:
        'Đào tạo và họp doanh nghiệp, lễ kỷ niệm, tiệc và các sự kiện khác nhau — sảnh có thể được sắp xếp theo mục đích của bạn.',

      contactHeading: 'Liên hệ',
      contactBody: 'Về việc sử dụng sảnh tiệc, vui lòng gọi điện tới Raki House Nasu.',
    },

    // Được làm lại theo trang "SPA & SALON" của website Raki House Nasu.
    // Cách diễn đạt về tác dụng, các lưu ý an toàn và phần miễn trừ đều theo nguyên bản
    // (xem docs/05-health-content-review.md).
    salon: {
      title: 'Spa & Salon',
      description:
        'Các tiệm trong khuôn viên Raki House Nasu: tắm tế bào Taiko-no-Kame dùng khoáng thạch jumon-seki, và Esthetic Salon RICHIA. Giờ mở cửa, cách đặt chỗ và bảng giá.',
      h1: 'Spa & Salon',
      eyebrow: 'SPA & SALON',
      lead: 'Khoảnh khắc của cái đẹp và sự thư thái, trong nét tĩnh tại kiểu Nhật. Cả hai đều cần đặt trước.',
      introBody: [
        'Bama — ngôi làng ở Trung Quốc được biết đến là một trong những làng trường thọ của thế giới. Tiệm lấy ý niệm "Bauma Healing" từ nếp sống được nuôi dưỡng bởi thiên nhiên trù phú và ân huệ của đất nơi ấy.',
        'Như được bao bọc trong ân huệ của đất từ thuở xa xưa, cơ thể được làm ấm từ từ, đánh thức vẻ đẹp vốn có từ bên trong.',
        'Đây là khách sạn duy nhất tại Nhật Bản nơi bạn có thể trải nghiệm tắm tế bào trong chiếc vò làm từ jumon-seki.',
      ],

      kameHeading: 'Taiko-no-Kame là gì',
      kameBody: [
        'Taiko-no-Kame là hình thức tắm tế bào sử dụng chiếc vò lớn đủ để một người ngồi lọt vào bên trong. Mặt trong của vò được lót đầy các loại đá dược liệu, đứng đầu là jumon-seki.',
        'Tận dụng đặc tính tự nhiên đó, chiếc vò làm ấm toàn thân như thể nhẹ nhàng bao bọc lấy bạn.',
      ],

      stoneHeading: 'Khoáng thạch tự nhiên "jumon-seki"',
      stoneBody: [
        'Jumon-seki được cho là đã tồn tại từ khoảng 240 triệu năm trước, là một loại khoáng thạch tự nhiên được khai thác ở Nội Mông (Trung Quốc) và một số nơi khác. Đặc trưng bởi hoa văn tựa vân gỗ, nó được biết đến như vật liệu tự nhiên có nguồn gốc từ các tầng địa chất cổ xưa.',
        'Jumon-seki được cho là có chứa germani, và đặc tính phát ra tia hồng ngoại xa cùng ion âm của nó cũng được chú ý.',
      ],

      infoHeading: 'Thông tin sử dụng',
      infoRows: [
        ['Giờ mở cửa', '16:00–21:00 (tiếp nhận cuối 20:00)'],
        ['Số lượng mỗi ngày', 'Giới hạn một số lượt mỗi ngày'],
        ['Đặt chỗ', 'Chúng tôi khuyến nghị đặt trước 2–3 ngày so với ngày sử dụng.'],
      ],
      infoNote:
        'Chúng tôi cũng nhận đặt trong ngày, nhưng có thể không tiếp nhận được tuỳ theo tình trạng chỗ trống và nhân sự.',

      flowHeading: 'Quy trình',
      flow: [
        {
          title: 'Tư vấn và hướng dẫn lưu ý',
          body: 'Trước khi bắt đầu, chúng tôi kiểm tra tình trạng sức khoẻ và giải thích những điều cần lưu ý khi tắm tế bào.',
        },
        {
          title: 'Thay trang phục chuyên dụng',
          body: 'Bạn thay sang trang phục do tiệm chuẩn bị và sẵn sàng cho buổi tắm ấm.',
        },
        {
          title: 'Tắm ấm bên trong vò',
          body: 'Được bao bọc trong hơi nước ấm bên trong Taiko-no-Kame, bạn tắm ấm khoảng 15–25 phút.',
        },
        {
          title: 'Hạ nhiệt và thay đồ',
          body: 'Sau khi ra mồ hôi, bạn từ từ ổn định lại cơ thể, thay đồ và kết thúc.',
        },
      ],

      cautionHeading: 'Những điều cần lưu ý trước khi sử dụng',
      cautions: [
        'Tuyệt đối không tắm tế bào sau khi uống rượu bia hoặc khi đang say.',
        'Vui lòng tránh sử dụng ngay trước và ngay sau khi ăn uống, đặc biệt là ngay sau khi ăn.',
        'Người đang sốt hoặc có viêm nhiễm vui lòng không sử dụng.',
        'Người có bệnh tim, huyết áp cao hoặc thấp, tiểu đường: chúng tôi khuyến nghị uống một cốc nước ấm pha mật ong trước khi tắm tế bào.',
        'Xin lưu ý Taiko-no-Kame không phải là thiết bị y tế và không nhằm mục đích điều trị bệnh.',
        'Vì bạn sẽ dần thấy rất dễ chịu, xin đừng ngủ trong lúc sử dụng.',
        'Thời gian tắm tế bào phù hợp nhất là 15–25 phút. Điều này khác nhau tuỳ từng người, xin hãy theo tình trạng của mình.',
        'Tắm tế bào khiến quá trình trao đổi chất diễn ra mạnh, vì vậy hãy uống nước đầy đủ trước khi bắt đầu để phòng mất nước.',
        'Sau khi sử dụng, bạn có thể thấy uể oải hoặc chóng mặt, xin hãy nghỉ ngơi yên tĩnh một lát.',
      ],

      disclaimer:
        'Lưu ý: Taiko-no-Kame không phải là thiết bị y tế và không nhằm mục đích điều trị bệnh. Cảm nhận khác nhau tuỳ từng người.',

      estheticHeading: 'Thẩm mỹ viện',
      estheticName: 'Esthetic Salon RICHIA',
      estheticBody: [
        'Esthetic Salon RICHIA, nơi đã có nhiều khách hàng thân thiết tại Ueno (Tokyo), đã chuyển về và khai trương tại "Raki House Nasu".',
        'Những chuyên viên thẩm mỹ dày dạn đã chăm sóc làn da của hơn mười nghìn khách hàng mang đến khoảnh khắc của cái đẹp làm đầy cả tâm hồn, trong không gian nghỉ dưỡng được bao bọc bởi thiên nhiên và sự tĩnh lặng.',
        'Chúng tôi đồng hành cùng những băn khoăn về làn da thay đổi theo năm tháng, với liệu trình một kèm một phù hợp từng người. Tại thẩm mỹ viện dành cho phụ nữ trưởng thành, xin hãy tận hưởng khoảng thời gian đặc biệt để đánh thức vẻ đẹp vốn có của làn da.',
      ],
      estheticInfoRows: [
        ['Giờ mở cửa', '16:00–21:00 (tiếp nhận cuối 20:00)'],
        ['Số lượng mỗi ngày', 'Giới hạn một số lượt mỗi ngày'],
        ['Đặt chỗ', 'Chúng tôi khuyến nghị đặt trước 2–3 ngày so với ngày sử dụng.'],
      ],

      menuHeading: 'Bảng giá',
      menuFacialHeading: 'FACIAL — Chăm sóc da mặt',
      menuFacial: [
        ['Choco esthe (30 phút)', '3.980 yên'],
        ['Facial (60 phút)', '8.000 yên'],
        ['Facial (90 phút)', '12.000 yên'],
      ],
      menuBodyHeading: 'BODY — Cơ thể',
      menuBody: [
        ['Chân hoặc vai (30 phút)', '3.980 yên'],
        ['Massage dầu (60 phút)', '8.000 yên'],
        ['Massage dầu (90 phút)', '12.000 yên'],
      ],
      menuNote: 'Toàn bộ giá đã bao gồm thuế.',
    },
    nasu: {
      title: 'Cao nguyên Nasu và vùng lân cận',
      description:
        'Cao nguyên Nasu, nơi Raki House Nasu toạ lạc: khu suối nước nóng lâu đời, công viên chủ đề, nông trại và nhiều điểm đến khác.',
      h1: 'Cao nguyên Nasu',
      eyebrow: 'NASU HIGHLAND',
      lead: 'Cách Tokyo khoảng 180 km, nằm giữa Tokyo và Sendai — một thị trấn của du lịch và nông lâm nghiệp.',
      introBody: [
        'Cao nguyên Nasu (thị trấn Nasu) cách Tokyo khoảng 180 km, là thị trấn du lịch và nông lâm nghiệp nằm giữa Tokyo và Sendai.',
        'Phía tây bắc là đỉnh chính hùng vĩ của dãy Nasu — núi Chausu (1.915 m). Dưới chân núi có khu suối nước nóng Nasu lâu đời, khai mở vào năm Jomei thứ 2 (năm 630), các di tích như Sessho-seki, công viên chủ đề, cùng biệt cung nơi hoàng gia nghỉ ngơi — vì vậy nơi đây được gọi là "Royal Resort Nasu".',
        'Ngoài ra, vùng chân núi là dải đất chăn nuôi bò sữa rộng lớn, còn phía đông nam là khung cảnh nông thôn satoyama được dãy núi Yamizo ôm trọn, trải dài cùng nhiều di tích tiêu biểu gắn với Matsuo Basho và truyền thuyết về Yoshitsune.',
      ],

      historyHeading: 'Lịch sử được tiếp nối',
      historyBody:
        'Khu vực Ashino và Ion, nơi dòng lịch sử từ thời Jomon và Yayoi cho tới ngày nay vẫn tiếp nối không đứt đoạn, có rất nhiều di tích và tài sản văn hoá quý giá. Cảnh quan lịch sử và văn hoá ấy đang được trao lại cho thế hệ sau.',

      cultureHeading: 'Lễ hội và nghi lễ truyền thống',
      cultureBody:
        'Các nghi lễ và lễ hội truyền thống tượng trưng cho lịch sử và văn hoá của thị trấn là một phần của cảnh quan nông thôn, và được truyền lại cho thế hệ sau qua việc đào tạo người kế thừa và trải nghiệm thực tế. Pháo hoa mùa hè, trống taiko và sáo trong lễ hội mùa thu — những điều khắc sâu trong ký ức.',

      aroundHeading: 'Điểm đến quanh khách sạn',
      aroundLead:
        'Thiên nhiên bao la và bầu không khí tinh tế của Nasu, cảnh sắc đổi thay theo mùa. Động vật, công viên giải trí và nhiều hơn thế — hãy tận hưởng trọn vẹn sức hút của cao nguyên Nasu.',
      around: [
        {
          title: 'Quần thể đỗ quyên Yahata',
          access: 'Khoảng 10 phút',
          body: 'Khoảng 200.000 cây đỗ quyên tô điểm danh thắng trên cao nguyên Nasu ở độ cao chừng 1.100 m. Được chọn vào "100 cảnh quan hương thơm" của Bộ Môi trường.',
        },
        {
          title: 'Sessho-seki',
          access: 'Khoảng 6 phút',
          body: 'Danh thắng lâu đời gắn với suối nước nóng Nasu-Yumoto. Vách đá hoang sơ và khung cảnh đặc trưng của vùng suối nước nóng cho bạn cảm nhận cả thiên nhiên lẫn lịch sử của Nasu.',
        },
        {
          title: 'Đài quan sát cao nguyên Nasu',
          access: 'Khoảng 10 phút',
          body: 'Điểm ngắm cảnh ở độ cao chừng 1.048 m. Ngày trời quang có thể nhìn xa tới đồng bằng Kanto, và hoàng hôn ở đây rất huyền ảo.',
        },
        {
          title: 'Nasu Flower World',
          access: 'Khoảng 20 phút',
          body: 'Vườn hoa nổi tiếng tô điểm sắc màu rực rỡ cho cao nguyên. Mùa xuân, hoa tulip, anh túc và nhiều loài hoa theo mùa nở rộ.',
        },
        {
          title: 'Nông trại Minamigaoka',
          access: 'Khoảng 2 phút',
          body: 'Nông trại mở cửa cho khách tham quan giữa thiên nhiên trù phú của cao nguyên Nasu. Tiếp xúc động vật, ẩm thực nông trại và trải nghiệm thủ công — điểm đến được cả gia đình yêu thích.',
        },
        {
          title: 'Nasu Highland Park',
          access: 'Khoảng 8 phút',
          body: 'Công viên giải trí với nhiều trò chơi, từ tàu lượn mạo hiểm đến những trò dành cho trẻ nhỏ.',
        },
        {
          title: 'Nông trại gia đình hồ Rindo',
          access: 'Khoảng 15 phút',
          body: 'Điểm vui chơi kết hợp giữa hồ nước và nông trại. Các hoạt động trải nghiệm và tiếp xúc động vật phù hợp cho cả chuyến đi gia đình lẫn nhóm bạn.',
        },
        {
          title: 'Nasu Animal Kingdom',
          access: 'Khoảng 20 phút',
          body: 'Vườn thú trải nghiệm với hơn 150 loài, sống trong môi trường gần với tự nhiên, cùng các màn trình diễn hấp dẫn.',
        },
      ],

      aroundMore:
        'Ngoài ra, chỉ mất ít phút lái xe là tới Nasu Safari Park (khoảng 7 phút), Nasu Buggy Park (khoảng 2 phút), suối nước nóng Shika-no-yu (khoảng 6 phút), Bảo tàng kính màu Nasu (khoảng 7 phút), Nasu Trick Art Pia (khoảng 20 phút) và Nasu Yoko Golf Club (khoảng 30 phút).',

      gourmetHeading: 'Ẩm thực Nasu',
      gourmetBody:
        'Tiệm bánh kiêm quán cà phê “Penny Lane Nasu” (cách khách sạn khoảng 5 phút), “Cheese Garden Nasu Honten” (khoảng 15 phút) nổi tiếng với bánh phô mai Goyotei, và “GOOD NEWS” (khoảng 20 phút) — khu phức hợp gồm cửa hàng và quán cà phê. Nasu có rất nhiều nơi để thưởng thức ẩm thực và mua sắm.',

      note:
        'Thời gian là ước tính khi lái xe từ khách sạn. Vui lòng kiểm tra thông tin chính thức của từng cơ sở về giờ mở cửa và giá vé.',
    },

    booking: {
      title: 'Hướng dẫn đặt phòng',
      description:
        'Cách đặt phòng tại Raki House Nasu: kênh dành cho khách lẻ, kênh dành cho thành viên Raki House và thông tin liên hệ qua điện thoại.',
      h1: 'Hướng dẫn đặt phòng',
      eyebrow: 'RESERVATION',
      lead: 'Raki House Nasu hoạt động theo mô hình khách sạn thành viên, đồng thời vẫn đón tiếp khách lẻ. Kênh đặt phòng khác nhau tuỳ theo cách bạn lưu trú.',

      chooseHeading: 'Các kênh đặt phòng',
      chooseLead: 'Vui lòng chọn mục phù hợp với bạn.',

      manualHeading: 'Sổ tay đặt phòng Raki House',
      manualBody:
        'Tài liệu tổng hợp quy trình đặt phòng dành cho thành viên (PDF). Được giữ nguyên từ trang web hiện tại.',
      manualCta: 'Tải sổ tay đặt phòng (PDF, tiếng Nhật)',

      telHeading: 'Liên hệ qua điện thoại',
      telBody: 'Nếu còn điều gì chưa rõ về cách đặt phòng, vui lòng liên hệ Raki House Nasu.',

      notesHeading: 'Trước khi đặt phòng',
      notes: [
        'Tại Raki House Nasu, cả thành viên và khách lẻ đều chịu sự điều chỉnh của điều khoản lưu trú của khách sạn sau khi nhận phòng.',
        'Giá, gói lưu trú và tình trạng phòng được đăng trên trang đặt phòng Raki House Nasu.',
        'Thuế tắm suối nước nóng 150 yên áp dụng từ 12 tuổi trở lên.',
        'Thị trấn Nasu áp dụng thuế lưu trú từ ngày 1 tháng 10 năm 2026. Chi tiết xin xem trang chính thức Raki House Nasu hoặc trang chính thức thị trấn Nasu.',
      ],
      nasuTaxCta: 'Trang chính thức thị trấn Nasu (thuế lưu trú)',
    },

    membership: {
      title: 'Quyền thành viên Raki Resort Hotel',
      description:
        'Tổng quan về quyền thành viên Raki Resort Hotel: số đêm lưu trú mỗi năm, phí thành viên hàng năm, phí quản lý đăng ký và cách đặt chỗ.',
      h1: 'Giới thiệu về tư cách thành viên của Raki Resort Hotel',
      eyebrow: 'MEMBERSHIP',
      lead: 'Quyền thành viên theo hình thức chia sẻ kỳ nghỉ, bảo đảm số đêm lưu trú mỗi năm.',

      summaryHeading: 'Bản tóm tắt',
      // Giữ nguyên văn từ trang /vi/about-5 hiện tại, chỉ sửa số phòng
      // từ "33" thành 26 cho khớp với bản tiếng Nhật (xem docs/04).
      terms: [
        'Đối với hợp đồng thành viên của Raki Resort Hotel, vui lòng ký hợp đồng thành viên, hợp đồng sử dụng cơ sở vật chất riêng với Công ty Japan World.',
        'Raki Resort Hotel sẽ đảm bảo lưu trú 12 đêm trong một năm cho các thành viên hoặc cung cấp voucher đặt phòng lưu trú 3 đêm.',
        'Quyền hạn thành viên của Raki Resort Hotel có thể được chuyển đổi giữa các cơ sở của Raki Resort Hotel cùng cấp.',
        'Không thể xác định số phòng và loại phòng, điều này phụ thuộc vào tình trạng đặt phòng trong cùng một cơ sở vào ngày lưu trú.',
        'Các chi phí cần thiết liên quan đến quyền hạn thành viên của Raki Resort Hotel sẽ thanh toán trực tiếp cho Công ty Japan World.',
        'Các khoản phí sau sẽ được thanh toán trực tiếp vào tài khoản ngân hàng do Công ty Japan World chỉ định.',
        'Có thể sử dụng miễn phí các dịch vụ chung trong cơ sở (bãi đậu xe, khu vực tắm, phòng thay đồ).',
        'Các dịch vụ khác sẽ được tính phí nhất định tuỳ theo cơ sở.',
      ],

      facilityHeading: 'Cơ sở có thể sử dụng',
      facilityRows: [
        ['Tên', 'Resort Hotel Raki House'],
        ['Địa chỉ', '213-2721 Yumoto, Nasu-machi, Nasu-gun, Tochigi'],
        [
          'Cơ sở vật chất',
          'Phòng tắm suối nước nóng lớn (nam nữ), bồn tắm lộ thiên (nam nữ), 26 phòng khách, sảnh tiệc lớn, sảnh tiệc vừa, sảnh tiệc nhỏ',
        ],
      ],

      feeHeading: 'Chi phí',
      feeRows: [
        [
          'Phí thành viên hàng năm',
          '110.000 yên (đã bao gồm thuế) hoặc 55.000 yên (đã bao gồm thuế) cho một năm kể từ ngày ký thành viên của Raki Resort Hotel',
        ],
        ['Phí quản lý đăng ký', '110.000 yên (đã bao gồm thuế) hoặc 55.000 yên (đã bao gồm thuế)'],
        [
          'Phí lưu trú cho thành viên',
          'Vui lòng kiểm tra JWCCS và hợp đồng để biết mức giá mới nhất.',
        ],
      ],

      reserveHeading: 'Phương thức đặt chỗ',
      reserveBody: [
        'Việc đặt chỗ được thực hiện qua JWCCS, hệ thống đặt phòng dành riêng cho thành viên.',
        'Vui lòng kiểm tra JWCCS và hợp đồng để biết mức giá, thời hạn đặt chỗ và điều kiện sử dụng mới nhất.',
        'Chọn ngày bạn muốn lưu trú trong lịch kỳ nghỉ. Ngày bạn chọn sẽ là ngày ưu tiên sử dụng khi lưu trú.',
        'Vé đặt chỗ lưu trú chưa sử dụng có thể đổi sang ngày nhận phòng khác trước ngày hết hạn và có thể bán lại vé cho người khác.',
      ],

      contactHeading: 'Liên hệ về quyền thành viên',
      contactBody:
        'Về nội dung và cách đăng ký quyền thành viên, vui lòng liên hệ Công ty Japan World.',

      disclaimer:
        'Lưu ý: nội dung và số tiền nêu trên có thể thay đổi. Khi ký kết, vui lòng luôn kiểm tra hợp đồng thành viên, hợp đồng sử dụng cơ sở vật chất và điều khoản sử dụng JWCCS. Nếu trang này khác với trang tiếng Nhật, xin vui lòng xác nhận với Công ty Japan World.',
    },

    access: {
      title: 'Đường đi',
      description:
        'Cách đến Raki House Nasu: khoảng 20 phút lái xe từ nút giao Nasu, có xe buýt tuyến và xe đưa đón từ ga Nasushiobara.',
      h1: 'Đường đi',
      eyebrow: 'ACCESS',
      lead: '213-2721 Yumoto, Nasu-machi, Nasu-gun, Tochigi 325-0301',

      addressHeading: 'Địa chỉ và liên hệ',

      byCarHeading: 'Đi bằng ô tô',
      byCarBody: [
        'Từ nút giao Nasu trên đường cao tốc Tohoku, đi theo tỉnh lộ 17 — khoảng 12 km, chừng 20 phút.',
        'Đi về hướng Nasu-Yumoto, rẽ trái tại ngã tư Ichikenjaya rồi đi tiếp 3 km; khách sạn nằm bên phải.',
      ],

      byTrainHeading: 'Đi bằng tàu',
      byTrainBody: [
        'Ga gần nhất là cửa tây ga Nasushiobara trên tuyến Tohoku Shinkansen.',
        'Cũng có xe buýt từ cửa tây ga Kuroiso trên tuyến Tohoku Main Line.',
      ],

      byBusHeading: 'Đi bằng xe buýt tuyến',
      byBusBody: [
        'Từ cửa tây ga Nasushiobara, đi xe buýt Kanto hướng Nasu Ropeway (Nasushiobara cửa tây – Kuroiso cửa tây – Nasu Ropeway).',
        'Xuống tại trạm "Ichikenjaya", đi bộ khoảng 20 phút.',
        'Từ cửa tây ga Kuroiso mất khoảng 35 phút để tới Ichikenjaya.',
      ],
      busTimetableCta: 'Xem lịch xe buýt từ ga Nasushiobara',

      shuttleHeading: 'Xe đưa đón của khách sạn (cần đặt trước)',
      shuttleBody: [
        'Đón: 14:30, bùng binh cửa tây ga Nasushiobara',
        'Trả: 11:00, sảnh khách sạn',
        'Cần đặt trước. Vui lòng gọi điện để đăng ký.',
      ],

      aroundStopHeading: 'Khoảng cách tới trạm xe buýt và cửa hàng tiện lợi',
      aroundStopBody: [
        'Từ 7-Eleven Nasu Ichikenjaya tới trạm xe buýt "Ichikenjaya": đi bộ khoảng 1 phút (100 m)',
        'Từ khách sạn tới 7-Eleven Nasu Ichikenjaya: khoảng 3 phút bằng ô tô',
      ],

      parkingHeading: 'Bãi đậu xe',
      parkingBody: 'Có 50 chỗ đậu xe. Miễn phí cho khách lưu trú.',

      mapCta: 'Mở trong Google Maps',

      officeHeading: 'Trụ sở chính (Công ty Japan World)',
      officeBody: 'Mọi thắc mắc về quyền thành viên xin gửi tới trụ sở chính.',
    },

    company: {
      title: 'Đôi nét về công ty',
      description:
        'Giới thiệu Công ty Japan World: vận hành cơ sở nghỉ dưỡng, cung cấp quyền thành viên và kinh doanh du lịch.',
      h1: 'Đôi nét về công ty',
      eyebrow: 'COMPANY',
      lead: 'Công ty Japan World',

      profileHeading: 'Đôi nét về công ty',
      labels: {
        name: 'Tên công ty',
        address: 'Trụ sở chính',
        tel: 'Điện thoại',
        email: 'E-mail',
        capital: 'Vốn đăng ký',
        ceo: 'Chủ tịch',
      },

      businessHeading: 'Nội dung kinh doanh',
      business: [
        'Vận hành cơ sở nghỉ dưỡng, cung cấp quyền hạn hội viên',
        'Lập kế hoạch quảng cáo và tuyên truyền, sản xuất và bán hàng',
        'Kinh doanh du lịch và đại lý du lịch theo Luật Kinh doanh Du lịch',
        'Hỗ trợ hợp tác kinh doanh và tư vấn cho các công ty tiến ra nước ngoài',
        'Mua, bán, cho thuê, quản lý bất động sản và hoạt động môi giới',
        'Mua, bán, nắm giữ và vận hành quyền thành viên',
        'Lập kế hoạch, sản xuất, vận hành và quản lý các sự kiện khác nhau',
        'Điều hành tiệm thư giãn',
        'Vận hành và quản lý trang web thương mại điện tử xuyên biên giới',
        'Lập kế hoạch, nghiên cứu và vận hành kinh doanh giáo dục',
      ],

      groupHeading: 'Các trang liên quan',
      groupLead: 'Website của các dịch vụ do công ty chúng tôi vận hành.',
      group: [
        {
          title: 'Trang chính thức Raki House Nasu',
          body: 'Thông tin cơ sở vật chất, chuyên đề theo mùa và thông báo thuế lưu trú của thị trấn Nasu.',
          href: 'hotelSite',
        },
        {
          title: 'JWCCS – đặt phòng dành cho thành viên',
          body: 'Hệ thống đặt phòng dành cho thành viên Raki House. Cần đăng ký JWCCS và đăng nhập.',
          href: 'members',
        },
        {
          title: 'JW NFT Platform',
          body: 'Nền tảng cho voucher lưu trú NFT của Raki House.',
          href: 'nft',
        },
      ],
    },
  },
};

export default vi;
