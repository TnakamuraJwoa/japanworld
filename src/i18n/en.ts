import type { Dict } from './types';

/**
 * English content.
 *
 * Base text comes from the existing /en/* pages of www.japanworld.co.jp.
 * Two kinds of change were made, both listed in docs/04-content-review.md:
 *
 *  (a) Mechanical translation errors were corrected against the Japanese
 *      source, which is unambiguous and internally consistent on these points:
 *        - Mt. Chausu "11915m" → 1,915m
 *        - "guest rooms: 33"   → 26 rooms
 *        - banquet hall "more than 300 people" → 200 people
 *        - "a teahouse intersection" → Ichikenjaya (a place name, 一軒茶屋)
 *        - "cheese animal husbandry" → dairy farming (酪農)
 *        - "Shuming 2 (630 AD)" → Jomei 2 / "Bagou mountains" → Yamizo
 *        - "Honmachi" → the town itself (本町 = "this town")
 *
 *  (b) Health claims present only in the translations
 *      ("curing the tired body and sick heart", "make guests healthier,
 *      beautiful and longevity") were brought back in line with the
 *      Japanese source. See docs/05-health-content-review.md.
 *
 * Membership fees and reservation rules are kept VERBATIM from the existing
 * English page. They differ from the Japanese page; that conflict is reported
 * in docs/04 and must be resolved by Japan World, not by the build.
 */
const en: Dict = {
  ui: {
    skipToContent: 'Skip to content',
    brandSub: 'Raki House Nasu',
    menu: 'Menu',
    close: 'Close',
    languageLabel: 'Language',
    breadcrumbHome: 'Home',
    readMore: 'Read more',
    externalSite: 'External site',
    opensInNewTab: 'Opens in a new tab',
    ctaBook: 'Reservations',
    ctaMembers: 'Members',
    telLabel: 'Tel',
    telHoursLabel: 'Hours',
    addressLabel: 'Address',
    pageTop: 'Back to top',
    notFoundTitle: 'Page not found',
    notFoundLead:
      'The page you are looking for may have been moved or removed. Please try one of the links below.',
    notFoundBack: 'Back to home',
  },

  nav: {
    home: 'Home',
    hotel: 'Raki House Nasu',
    rooms: 'Rooms',
    spa: 'Hot spring & SPA',
    dining: 'Dining',
    banquet: 'Convention hall',
    salon: 'Spa & Salon',
    nasu: 'Nasu Highland',
    booking: 'Reservations',
    membership: 'Membership',
    access: 'Access',
    company: 'Company',
  },

  footer: {
    hotelHeading: 'Resort Hotel Raki House Nasu',
    companyHeading: 'Japan World Co., Ltd.',
    linksHeading: 'Related sites',
    externalNote: 'This is the website of Japan World Co., Ltd. The links below lead to other websites.',
    hotelSiteLabel: 'Raki House Nasu official site',
    membersLabel: 'JWCCS members-only reservations',
    nftLabel: 'JW NFT Platform',
    busTimetableLabel: 'Bus timetable (Kanto Bus)',
  },

  booking: {
    generalTitle: 'General guests',
    generalBody:
      'Raki House Nasu operates as a membership hotel and also welcomes guests who are not members. Room availability, plans, rates and bookings are handled on the Raki House Nasu booking site.',
    generalCta: 'Go to the booking site',
    membersTitle: 'Raki House members',
    membersBody:
      'Please book through JWCCS (Japan World Concierge Club Service), the members-only reservation system. JWCCS registration and login are required.',
    membersCta: 'Log in to JWCCS',
    nftTitle: 'NFT accommodation voucher holders',
    nftBody:
      'Reservations using an NFT accommodation voucher are accepted by fax. Please call the hotel to confirm the procedure.',
    nftCta: 'JW NFT Platform',
    routesCta: 'See reservation options',
  },

  pages: {
    home: {
      title: 'Resort Hotel Raki House Nasu, Nasu Highland',
      description:
        'A 26-room membership resort hotel in Nasu Highland, Tochigi, operated by Japan World Co., Ltd. Hot spring and open-air baths, a convention hall and a cell bath salon. Non-members welcome.',
      h1: 'A second home in Nasu Highland.',
      eyebrow: 'Resort Hotel RAKI HOUSE NASU',
      heroTitle: 'A second home in Nasu Highland.',
      heroSub:
        'The great nature of Nasu Highland through all four seasons, and a refined, comfortable space to come home to.',
      heroLocation: 'Yumoto, Nasu-machi, Tochigi ｜ A 26-room membership resort hotel',
      heroCtaPrimary: 'How to book',
      heroCtaSecondary: 'See the hotel',

      introHeading: 'About Raki House Nasu',
      introBody: [
        'Raki House Nasu is a resort hotel operated by Japan World Co., Ltd. in Nasu Highland. It runs as a membership hotel while also welcoming guests who are not members.',
        'All 26 rooms are spacious, and the entire building is given over to guests, providing a high degree of privacy. The hotel has hot spring baths and open-air baths, a restaurant and bar, a convention hall for up to 200 people, and the cell bath salon Taiko-no-Kame.',
      ],

      factsHeading: 'At a glance',
      facts: [
        ['Address', '213-2721 Yumoto, Nasu-machi, Nasu-gun, Tochigi'],
        ['Rooms', '26 rooms'],
        ['Hot spring', 'Large public baths and open-air baths (men / women)'],
        ['Banquet', 'Large, medium and small banquet halls (up to 200 people)'],
        ['Salon', 'Cell bath salon Taiko-no-Kame'],
        ['Parking', '50 cars'],
      ],

      highlightsHeading: 'Inside the hotel',
      highlightsLead:
        'From the rooms to the baths, the table and the banquet hall — everything here supports the time you spend in the nature of Nasu.',
      highlights: [
        {
          title: 'Rooms',
          body: 'Classic rooms where stylish interiors meet Japanese design. Built around the comfort of feeling the forest.',
        },
        {
          title: 'Hot spring & SPA',
          body: 'Walls finished in indigo dye create a large bath as relaxing as a Japanese room. Open-air baths are also available.',
        },
        {
          title: 'Dining',
          body: 'The chef’s signature dishes, made generously with carefully selected ingredients, served in a calm setting.',
        },
        {
          title: 'Convention hall',
          body: 'A large banquet hall able to host events of up to 200 people. Smaller meetings are welcome too.',
        },
        {
          title: 'Cell bath salon',
          body: 'The Taiko-no-Kame salon is a permanent facility inside the hotel, available alongside your stay.',
        },
        {
          title: 'Lobby & concierge',
          body: 'From check-in to check-out, our concierge is here to support your stay.',
        },
      ],

      conciergeHeading: 'Careful support throughout your stay',
      conciergeBody:
        'From check-in to check-out, our concierge is here with the best possible service. Please ask us about sightseeing, restaurant reservations or transport at any time.',

      nasuHeading: 'About Nasu Highland',
      nasuBody:
        'Nasu Highland (Nasu Town) lies about 180 km from Tokyo, roughly halfway between Tokyo and Sendai, and lives on tourism, agriculture and forestry. Historic hot spring villages, theme parks and wide dairy pastures. Nearby there are also places to meet animals and an amusement park — plenty for everyone to enjoy together.',
      nasuCta: 'Nasu Highland and around',

      membershipHeading: 'Raki House membership',
      membershipBody:
        'A timeshare membership that guarantees a number of nights each year. Membership can also be transferred between Raki House facilities of the same rank.',
      membershipCta: 'About membership',

      bookingHeading: 'How to book',
      bookingLead: 'The reservation route depends on how you are staying with us.',

      accessHeading: 'Access',
      accessLead:
        'About 20 minutes by car from Nasu IC on the Tohoku Expressway. From Nasushiobara Station on the Tohoku Shinkansen, a local bus and a hotel shuttle are available.',
      accessCta: 'Access details',
    },

    hotel: {
      title: 'Raki House Nasu',
      description:
        'Resort Hotel Raki House Nasu in Nasu Highland, Tochigi. 26 rooms given over to guests, with hot spring baths, a restaurant and bar, a convention hall and a cell bath salon.',
      h1: 'Raki House Nasu',
      eyebrow: 'RAKI HOUSE NASU',
      lead: 'Happiness spent with nature and with friends.',
      introBody: [
        'All 26 rooms are spacious, and the entire building is given over to guests, providing a high degree of privacy.',
        'Nasu Highland is a place families, companions and friends can all enjoy. Take in the vast nature and refined atmosphere of Nasu and the scenery of the four seasons, and make the most of everything the area has to offer — from animals to amusement parks.',
      ],

      facilitiesHeading: 'Facilities',
      facilitiesLead: 'Each facility is described in more detail on its own page.',

      lobbyHeading: 'Lobby',
      lobbyBody: [
        'The scent of coffee, and time lost in a book. This is where a free and precious resort moment begins.',
        'The lobby is designed as a warm space to take your time in. Read, drink coffee, and spend a lovely while however you like. Check-in and check-out are handled here, and the front desk is always happy to help with anything you need during your stay.',
      ],
      lobbyCards: [
        {
          title: 'Check-in / check-out',
          body: 'Our front desk staff are here to assist you, with staff available 24 hours a day.',
        },
        {
          title: 'Guest relations',
          body: 'We do our best to answer every request — from sightseeing spots to directions — for guests staying with us.',
        },
        {
          title: 'Lounge',
          body: 'Enjoy a drink in a relaxed atmosphere. Free Wi-Fi and internet access are available.',
        },
        {
          title: 'Concierge',
          body: 'Please feel free to ask about sightseeing information, restaurant reservations or transport.',
        },
      ],

      hospitalityHeading: 'How we work at Raki House',
      hospitalityLead: 'A second home where happiness is part of the air.',
      hospitalityBody: [
        'At Raki House we keep an environment full of happiness for every guest who visits, value the feeling of the place in the service we give, hold on to a spirit of hospitality, and follow up regularly with our staff so we can offer more than our guests expect.',
        'Thinking one step ahead of a guest’s wishes and questions, and speaking up when it helps, so that every guest can spend a truly blissful time — that is what hospitality means at Raki House.',
        'Rather than being bound by a service manual, we put the guest in front of us first, and aim to provide service in which our guests feel a comfortable space.',
      ],

      salonTeaserHeading: 'A relaxation salon on site',
      salonTeaserBody:
        'Inside Raki House there is a permanent Taiko-no-Kame salon where you can experience a cell bath.',

      hotelSiteHeading: 'Plans and availability',
      hotelSiteBody:
        'Plans, rates, availability and bookings are handled on the Raki House Nasu booking site. Seasonal features and the Nasu Town accommodation tax notice are published on the official site.',
    },

    rooms: {
      title: 'Rooms',
      description:
        'Guest rooms at Raki House Nasu. All 26 rooms are 32 m² or larger: Premium Suite Room A and B, Premium Superior Room and Standard Room.',
      h1: 'Rooms',
      eyebrow: 'ROOM',
      lead: 'Refined, comfortable rooms that frame the scenery of Nasu.',
      introBody:
        'Beyond the wide windows lies the magnificent scenery of Nasu Highland. Quiet hours spent watching the colours of nature shift moment by moment, as though looking at a painting. All 26 rooms are 32 m² or larger — take your time and settle in.',

      checkInOut: 'Check-in 15:00 / Check-out 11:00',

      types: [
        {
          name: 'Premium Suite Room A',
          nameEn: 'PREMIUM SUITE ROOM A',
          size: '91 m²',
          capacity: '1–3 guests',
          body:
            'A refined Premium Suite Room A with a generous 91 m². A bathroom wrapped in the scent of hinoki cypress makes for a restful moment. A room suited to a trip with someone important, or a special anniversary.',
          specs: [
            'Two queen-size beds',
            'Sofa bed',
            'Dining table',
            'LCD televisions (42" and 49")',
            'Bathroom',
            'Washlet toilet',
            'Wi-Fi',
            'Non-smoking',
          ],
        },
        {
          name: 'Premium Suite Room B',
          nameEn: 'PREMIUM SUITE ROOM B',
          size: '57 m²',
          capacity: '1–3 guests',
          body:
            'Premium Suite Room B, whose appeal is the view over the rich nature of Nasu. A special room where a generous space and warm interiors come together.',
          specs: [
            'Two queen-size beds',
            'Sofa bed',
            'Table',
            'Two LCD televisions (42")',
            'Bathroom',
            'Washlet toilet',
            'Wi-Fi',
            'Non-smoking',
          ],
        },
        {
          name: 'Premium Superior Room',
          nameEn: 'PREMIUM SUPERIOR ROOM',
          size: '46 m²',
          capacity: '1–3 guests',
          body:
            'Premium Superior Room, where the scenery of Nasu Highland fills the window. A generous space with two double beds, plus a separate bath and toilet.',
          specs: [
            'Two double beds',
            'Sofa bed',
            'Table',
            'Bathroom',
            'Washlet toilet',
            'Wi-Fi',
            'Non-smoking',
          ],
        },
        {
          name: 'Standard Room',
          nameEn: 'STANDARD ROOM',
          size: '32–38 m²',
          capacity: '1–3 guests',
          body:
            'A Standard Room whose simple, calm furnishing is easy to be in. A relaxed space for an unhurried stay.',
          specs: [
            'Two double beds',
            'Sofa bed',
            'Table',
            'Shower room',
            'Washlet toilet',
            'Wi-Fi',
            'Non-smoking',
          ],
        },
      ],

      typeNotes: [
        'Standard Rooms have a shower room only.',
        'We are unable to accept requests for a specific room size.',
      ],

      amenityHeading: 'Facilities and amenities',
      amenityRows: [
        [
          'In the room',
          'Air conditioning / Refrigerator / Hair dryer / Yukata for adults / Yukata for children / Indoor slippers',
        ],
        [
          'Amenities',
          'Bath towel / Towel / Body soap / Shampoo / Conditioner / Shower cap / Comb / Cotton buds / Toothbrush set / Razor',
        ],
      ],

      note: 'Rates and availability by room type are published on the Raki House Nasu booking site.',
    },
    spa: {
      title: 'Hot spring, public bath and open-air bath',
      description:
        'The hot spring at Raki House Nasu: the indigo-walled public bath “Rindo-no-yu” and the open-air bath “Goyo-no-yu”, with opening hours and spring quality.',
      h1: 'Hot spring & SPA',
      eyebrow: 'SPA',
      lead: 'Ai-iro, kon-iro, asagi-iro — Japan speaks of forty-eight shades of indigo, a colour of many faces.',
      introBody: [
        'The walls of the public bath are finished in carefully chosen indigo dye, giving the room a calm Japanese character. Wrapped in that deep indigo and the warmth of the water, spend a quiet, restful while.',
      ],

      daiyokujoHeading: 'Public bath “Rindo-no-yu”',
      daiyokujoBody: [
        'Japan speaks of forty-eight shades of indigo, a colour of many faces. The walls of the public bath are finished in carefully chosen indigo dye, giving the room a calm Japanese character.',
        'Wrapped in that deep indigo and the warmth of the water, spend a quiet, restful while.',
      ],

      rotenburoHeading: 'Open-air bath “Goyo-no-yu”',
      rotenburoBody: [
        'An open-air bath where you give yourself to the water with the turning seasons close at hand.',
        'Budding trees in spring, cool green in summer, vivid colour in autumn, quiet falling snow in winter. Enjoy the bath while watching scenery that changes its face with every season.',
      ],

      changingHeading: 'Changing room',
      changingBody:
        'Down to the last detail, a calm and unhurried space built around a Japanese image, wrapped in warmth.',

      hoursHeading: 'Opening hours',
      hoursRows: [
        ['Evening', '15:00–24:00'],
        ['Early morning', '5:30–9:00 the next day'],
      ],

      onsenHeading: 'About the hot spring',
      onsenRows: [
        ['Source', 'Shiobara Shiki-no-sato Onsen'],
        ['Spring quality', 'Alkaline simple spring'],
        [
          'Indications',
          'Neuralgia / Muscle ache / Joint pain / Frozen shoulder / Motor paralysis / Joint stiffness / Bruises / Sprains / Chronic digestive complaints / Haemorrhoids / Sensitivity to cold / Convalescence / Recovery from fatigue / General health',
        ],
      ],

      note: 'A bathing tax of 150 yen is charged for guests aged 12 and over.',
    },
    dining: {
      title: 'Dining — Dining Restaurant “RAKI”',
      description:
        'Dining at Raki House Nasu. Course menus built on Nasunogahara beef and seasonal local produce, a daily changing breakfast, and the stone-warehouse bar “Shunkashuto”.',
      h1: 'Dining',
      eyebrow: 'DINING',
      lead: 'The bounty of Nasu, put into every plate.',
      introBody: [
        'Using the branded Nasunogahara beef and seasonal local produce, our kitchen builds course menus that weave the delicacy of Japanese cooking together with the flourish of the West.',
        'Enjoy a satisfying while of fine food at Dining Restaurant “RAKI”.',
      ],

      restaurantHeading: 'Restaurant',
      restaurantName: 'Dining Restaurant “RAKI”',
      restaurantBody:
        'A chic restaurant wrapped in calm lighting and refined furnishing. Taste the food, talk with someone important to you, and let the time pass unhurried.',
      restaurantRows: [
        ['Dinner', 'First seating 18:00–19:30 / Second seating 19:00–20:30'],
        ['Breakfast', 'First seating 7:00–8:00 / Second seating 8:00–9:00'],
        ['Dress code', 'Please refrain from wearing in-house loungewear in the restaurant.'],
      ],

      dinnerHeading: 'Dinner',
      courses: [
        {
          title: 'Seseragi (standard)',
          body:
            'A light, well-balanced course combining seasonal appetisers with a fish dish and a local meat dish.',
        },
        {
          title: 'Unkai (upgrade)',
          body:
            'An upgraded plan with Nasunogahara beef steak as the main. Each plate is composed to bring out the character of its ingredients.',
        },
      ],

      breakfastHeading: 'Breakfast',
      breakfastBody:
        'A breakfast built on local produce including Nasu Goyo eggs, fresh vegetables and milk. A daily changing Japanese or Western breakfast, fitting for a morning in Nasu.',

      kidsHeading: 'For children',
      kidsBody:
        'A menu for children is also available, so the whole family can enjoy the time together.',
      kidsRows: [
        ['Dinner', '3,300 yen (tax included)'],
        ['Breakfast', '2,200 yen (tax included)'],
      ],
      kidsNote: 'Advance reservation is required. Please let us know when you book.',

      anniversaryHeading: 'Anniversaries and celebrations',
      anniversary: [
        {
          title: 'Message plate',
          body: 'A plate with the message of your choice, served at dinner.',
          price: '1,500 yen (tax included)',
          reserve: 'Up to 5 days before your stay (reservation required)',
        },
        {
          title: 'Whole cake',
          body: 'A decorated cake (about 12 cm) with a message.',
          price: '3,500 yen (tax included)',
          reserve: 'Up to 5 days before your stay (reservation required)',
        },
        {
          title: 'Bouquet',
          body: 'A bouquet to bring colour to a special day.',
          price: '4,000 yen (tax included)',
          reserve: 'Up to 5 days before your stay (reservation required)',
        },
      ],
      anniversaryNotes: [
        'Images are for illustration.',
        'Please contact us in advance if you would like any of these.',
        'Please tell us in advance about any allergies.',
      ],

      barHeading: 'Bar',
      barName: 'Stone-warehouse BAR “Shunkashuto”',
      barBody:
        'Craft ginger ale and craft cola with our own blend of spices, and special drinks made with seasonal fruit — things you can only taste here. Spend a comfortable while with someone important, glass in hand.',
      barRows: [
        ['Opening hours', '18:00–22:00 (last order 22:00)'],
        ['Use', 'Reservation required'],
      ],

      note: 'Ingredients and menus may change depending on what is available.',
    },
    banquet: {
      title: 'Convention hall',
      description:
        'The convention hall at Raki House Nasu, able to host events of up to 200 people, along with medium and small banquet halls.',
      h1: 'Convention hall',
      eyebrow: 'BANQUET',
      lead: 'A large-scale space able to accommodate a wide range of productions for up to 200 people.',
      introBody:
        'From small meetings to parties and events, the hall can be used for many purposes. A large banquet hall that is both functional and beautiful.',

      capacityHeading: 'Capacity',
      capacityBody:
        'Large, medium and small banquet halls are available. The large hall can host events of up to 200 people.',

      useHeading: 'Occasions',
      useBody:
        'Corporate training and meetings, commemorative ceremonies, parties and events of all kinds — the hall can be arranged to suit your purpose.',

      contactHeading: 'Enquiries',
      contactBody: 'For use of the banquet halls, please call Raki House Nasu.',
    },

    // Rewritten to follow the SPA & SALON page of the Raki House Nasu website.
    // Wording around effects, the safety notes and the disclaimer follow the source
    // (see docs/05-health-content-review.md).
    salon: {
      title: 'Spa & Salon',
      description:
        'The salons at Raki House Nasu: the Taiko-no-Kame cell bath using the natural mineral jumon-seki, and Esthetic Salon RICHIA. Opening hours, booking and menu prices.',
      h1: 'Spa & Salon',
      eyebrow: 'SPA & SALON',
      lead: 'A while of beauty and rest, wrapped in Japanese quiet. Both salons require a reservation.',
      introBody: [
        'Bama, a village in China known as one of the world’s great longevity villages. This salon takes its concept, “Bauma Healing”, from the life nurtured there by rich nature and the bounty of the earth.',
        'Wrapped in that ancient bounty of the earth, the body is warmed slowly, calling out the beauty you already have from within.',
        'This is the only hotel in Japan where you can experience a cell bath in an urn made with jumon-seki.',
      ],

      kameHeading: 'What Taiko-no-Kame is',
      kameBody: [
        'Taiko-no-Kame is a cell bath that uses an urn large enough for a person to sit inside. The inside of the urn is lined with medicinal stones, chief among them jumon-seki.',
        'Making use of the natural properties of those stones, the urn warms the whole body as though gently wrapping it.',
      ],

      stoneHeading: 'Jumon-seki, a natural mineral',
      stoneBody: [
        'Jumon-seki is said to have existed for some 240 million years, and is a natural mineral found in Inner Mongolia in China and elsewhere. It is characterised by a wood-grain pattern and is known as a natural material derived from ancient strata.',
        'Jumon-seki is said to contain germanium, and attention has also been paid to its property of emitting far-infrared rays and negative ions.',
      ],

      infoHeading: 'Using the salon',
      infoRows: [
        ['Opening hours', '16:00–21:00 (last reception 20:00)'],
        ['Capacity', 'A limited number of guests per day'],
        ['Reservations', 'We recommend booking two to three days before your visit.'],
      ],
      infoNote:
        'Same-day reservations are also accepted, but we may be unable to take them depending on availability and staffing.',

      flowHeading: 'The flow of a session',
      flow: [
        {
          title: 'Counselling and guidance',
          body: 'Before your session we check how you are feeling and explain what to be aware of during the cell bath.',
        },
        {
          title: 'Changing into the provided wear',
          body: 'You change into the wear we provide and get ready for the warm bath.',
        },
        {
          title: 'The warm bath inside the urn',
          body: 'Wrapped in warm steam inside Taiko-no-Kame, you take a warm bath of about 15 to 25 minutes.',
        },
        {
          title: 'Cooling down and changing',
          body: 'After sweating, you take time to settle, change back, and the session ends.',
        },
      ],

      cautionHeading: 'Please read before your session',
      cautions: [
        'Never take a cell bath after drinking alcohol or while intoxicated.',
        'Please avoid a session immediately before or after eating and drinking, particularly immediately after.',
        'Please refrain from a session if you have a fever or any inflammation.',
        'If you have a heart condition, high or low blood pressure, or diabetes, we recommend drinking a cup of warm water with honey before the cell bath.',
        'Please note that Taiko-no-Kame is not a medical device and is not intended to treat illness.',
        'You will gradually become very comfortable, so please do not fall asleep during the session.',
        'The optimal length of a cell bath is 15 to 25 minutes. This varies from person to person, so please go by how you feel.',
        'A cell bath makes the metabolism very active, so please drink as much water as you can beforehand to prevent dehydration.',
        'You may feel sluggish or dizzy afterwards, so please rest quietly for a short while.',
      ],

      disclaimer:
        'Note: Taiko-no-Kame is not a medical device and is not intended to treat illness. How it feels varies from person to person.',

      estheticHeading: 'Esthetic salon',
      estheticName: 'Esthetic Salon RICHIA',
      estheticBody: [
        'Esthetic Salon RICHIA, which built a strong following in Ueno, Tokyo, has relocated and opened at Raki House Nasu.',
        'Experienced estheticians who have worked with the skin of more than ten thousand guests offer a while of beauty that fills the heart too, in a resort setting wrapped in nature and quiet.',
        'We stay close to the skin concerns that change as the years pass, with one-to-one treatment matched to each guest. In a salon for grown women, spend a special time drawing out the beauty your skin already has.',
      ],
      estheticInfoRows: [
        ['Opening hours', '16:00–21:00 (last reception 20:00)'],
        ['Capacity', 'A limited number of guests per day'],
        ['Reservations', 'We recommend booking two to three days before your visit.'],
      ],

      menuHeading: 'Menu and prices',
      menuFacialHeading: 'FACIAL',
      menuFacial: [
        ['Choco esthe (30 min)', '3,980 yen'],
        ['Facial (60 min)', '8,000 yen'],
        ['Facial (90 min)', '12,000 yen'],
      ],
      menuBodyHeading: 'BODY',
      menuBody: [
        ['Foot or shoulder (30 min)', '3,980 yen'],
        ['Oil massage (60 min)', '8,000 yen'],
        ['Oil massage (90 min)', '12,000 yen'],
      ],
      menuNote: 'All prices include tax.',
    },
    nasu: {
      title: 'Nasu Highland and around',
      description:
        'Nasu Highland, where Raki House Nasu stands: historic hot spring villages, theme parks, farms and more.',
      h1: 'Nasu Highland',
      eyebrow: 'NASU HIGHLAND',
      lead: 'About 180 km from Tokyo, roughly halfway between Tokyo and Sendai — a town of tourism, agriculture and forestry.',
      introBody: [
        'Nasu Highland (Nasu Town) lies about 180 km from Tokyo, roughly halfway between Tokyo and Sendai, and lives on tourism, agriculture and forestry.',
        'To the north-west rises Mt. Chausu (1,915 m), the main peak of the majestic Nasu range. At its foot are the historic Nasu hot spring villages, opened in the second year of Jomei (630 AD), historic sites such as Sessho-seki, theme parks, and the imperial villa where members of the Imperial Family have rested — which is why the area is known as the "Royal Resort Nasu".',
        'Wide dairy pastures spread across the lower slopes, and to the south-east lies the rural landscape of satoyama held by the Yamizo mountains, together with historic sites associated with Matsuo Basho and the legend of Yoshitsune.',
      ],

      historyHeading: 'A history handed down',
      historyBody:
        'The Ashino and Ion districts, where history from the Jomon and Yayoi periods through to the present day lives on unbroken, hold many historic sites and cultural properties. They are a precious local resource, and this historic and cultural landscape is being passed on to the next generation.',

      cultureHeading: 'Traditional events and festivals',
      cultureBody:
        'The traditional events and festivals that symbolise the history and culture of the town are one element of its rural landscape, and are passed on to the next generation through training successors and through first-hand experience. Fireworks in summer, taiko drums and flutes at the autumn festival — things that stay with you.',

      aroundHeading: 'Around the hotel',
      aroundLead:
        'The vast nature and refined atmosphere of Nasu, and scenery that changes with the seasons. Animals, amusement parks and much else — make the most of everything Nasu Highland has to offer.',
      around: [
        {
          title: 'Yahata Azalea Colony',
          access: 'About 10 min',
          body: 'About 200,000 azaleas colour this famous spot on Nasu Highland at around 1,100 m. Chosen for the Ministry of the Environment’s “100 Fragrant Landscapes”.',
        },
        {
          title: 'Sessho-seki',
          access: 'About 6 min',
          body: 'A historic site handed down in Nasu-Yumoto Onsen. Bare rock and the scenery particular to a hot spring area let you feel both the nature and the history of Nasu.',
        },
        {
          title: 'Nasu Highland Observatory',
          access: 'About 10 min',
          body: 'A viewpoint at around 1,048 m. On a clear day you can see as far as the Kanto Plain, and at dusk the view turns magical.',
        },
        {
          title: 'Nasu Flower World',
          access: 'About 20 min',
          body: 'A flower garden that brings vivid colour to the highland. In spring, tulips, poppies and other seasonal flowers come into full bloom.',
        },
        {
          title: 'Minamigaoka Farm',
          access: 'About 2 min',
          body: 'A working farm open to visitors, surrounded by the nature of Nasu Highland. Meeting animals, farm food and hands-on making — popular with the whole family.',
        },
        {
          title: 'Nasu Highland Park',
          access: 'About 8 min',
          body: 'An amusement park with plenty of attractions, from thrilling coasters to rides for small children.',
        },
        {
          title: 'Rindo-ko Family Farm',
          access: 'About 15 min',
          body: 'A leisure spot where a lake and a farm come together. Activities and meeting animals make it enjoyable for family and group trips alike.',
        },
        {
          title: 'Nasu Animal Kingdom',
          access: 'About 20 min',
          body: 'A hands-on zoo where you can meet more than 150 species, living in settings close to their natural environment, with lively performances.',
        },
      ],

      aroundMore:
        'Also a short drive away: Nasu Safari Park (about 7 min), Nasu Buggy Park (about 2 min), the Shika-no-yu hot spring (about 6 min), Nasu Stained Glass Museum (about 7 min), Nasu Trick Art Pia (about 20 min) and Nasu Yoko Golf Club (about 30 min).',

      gourmetHeading: 'Food in Nasu',
      gourmetBody:
        'The bakery and café “Penny Lane Nasu” (about 5 min from the hotel), “Cheese Garden Nasu Honten” (about 15 min), known for its Goyotei cheesecake, and “GOOD NEWS” (about 20 min), a complex of shops and cafés — Nasu has plenty of places to eat and shop.',

      note:
        'Times are a guide for driving from the hotel. Please check the official information of each facility for opening times and prices.',
    },

    booking: {
      title: 'How to book',
      description:
        'How to book a stay at Raki House Nasu: the reservation route for general guests, the route for Raki House members, and how to contact the hotel by phone.',
      h1: 'How to book',
      eyebrow: 'RESERVATION',
      lead: 'Raki House Nasu operates as a membership hotel and also welcomes guests who are not members. The reservation route differs depending on how you are staying.',

      chooseHeading: 'Reservation routes',
      chooseLead: 'Please choose the one that applies to you.',

      manualHeading: 'Raki House reservation manual',
      manualBody:
        'A document setting out the reservation procedure for members (PDF). It is carried over unchanged from the existing website.',
      manualCta: 'Download the reservation manual (PDF, in Japanese)',

      telHeading: 'Enquiries by phone',
      telBody: 'If anything about the reservation process is unclear, please contact Raki House Nasu.',

      notesHeading: 'Before you book',
      notes: [
        'At Raki House Nasu, both members and general guests are subject to the hotel’s accommodation terms and conditions once they have checked in.',
        'Rates, plans and availability are published on the Raki House Nasu booking site.',
        'A bathing tax of 150 yen is charged for guests aged 12 and over.',
        'Nasu Town will introduce an accommodation tax from 1 October 2026. Please see the Raki House Nasu official site or the Nasu Town official site for details.',
      ],
      nasuTaxCta: 'Nasu Town official site (accommodation tax)',
    },

    membership: {
      title: 'Raki House membership',
      description:
        'An overview of Raki House membership: timeshare nights per year, annual fee, registration management fee and how to reserve.',
      h1: 'Membership benefits of Raki House Resort Hotel',
      eyebrow: 'MEMBERSHIP',
      lead: 'A timeshare membership that guarantees a number of nights each year.',

      summaryHeading: 'Summary',
      // Kept verbatim from the existing /en/about-5 page, except that the
      // room count has been corrected from "33" to 26 to match the Japanese
      // source (see docs/04-content-review.md).
      terms: [
        'As for the contract of membership of Raki House Resort Hotel, please sign a membership contract, facility use contract, etc. with Japan World Co., Ltd.',
        'Raki House Resort Hotel will guarantee a 12-night stay for a year to full members in the form of a timeshare, or provide a 3-night stay reservation voucher.',
        'The membership of Raki House Resort Hotel can be transferred between the facilities of Raki House Resort Hotel of the same level.',
        'The room number and room type cannot be specified, and it depends on the reservation status in the same facility on the day.',
        'Pay directly to Japan World Co., Ltd. for necessary expenses attached to the membership of Raki House Resort Hotel.',
        'The following fees will be paid directly to the bank account designated by Japan World Co., Ltd.',
        'Shared services in the facility (parking lot, bathing area, changing room) can be used free of charge.',
        'Other services will be charged a certain fee depending on the facility.',
      ],

      facilityHeading: 'Facility available',
      facilityRows: [
        ['Name', 'Resort Hotel Raki House'],
        ['Address', '213-2721 Yumoto, Nasu-machi, Nasu-gun, Tochigi'],
        [
          'Facilities',
          'Large hot spring baths (men / women), open-air baths (men / women), 26 guest rooms, large banquet hall, medium banquet hall, small banquet hall',
        ],
      ],

      feeHeading: 'Fees',
      feeRows: [
        [
          'Annual membership fee',
          '110,000 yen (tax included) or 55,000 yen (tax included) for one year from the date of signing the membership of Raki House Resort Hotel',
        ],
        ['Registration management fee', '110,000 yen (tax included) or 55,000 yen (tax included)'],
        [
          'Member accommodation fee',
          'Please check JWCCS and your contract documents for the latest rates.',
        ],
      ],

      reserveHeading: 'How to reserve',
      reserveBody: [
        'Reservations are made through JWCCS, the members-only reservation system.',
        'Please check JWCCS and your contract documents for the latest rates, reservation periods and conditions of use.',
        'Select the date you want to stay in from the timeshare calendar. In principle, the date you choose is the day you want to use.',
        'The unused accommodation reservation ticket can be changed to the check-in date before the expiration date, and the ticket can be resold to another person.',
      ],

      contactHeading: 'Membership enquiries',
      contactBody:
        'For the content of the membership and how to apply, please contact Japan World Co., Ltd.',

      disclaimer:
        'Note: the details and amounts above are subject to change. Before entering into a contract, please always check the membership contract, the facility use contract and the JWCCS terms of use. Where this page differs from the Japanese page, please confirm with Japan World Co., Ltd.',
    },

    access: {
      title: 'Access',
      description:
        'Getting to Raki House Nasu: about 20 minutes by car from Nasu IC, with local bus and hotel shuttle from Nasushiobara Station.',
      h1: 'Access',
      eyebrow: 'ACCESS',
      lead: '213-2721 Yumoto, Nasu-machi, Nasu-gun, Tochigi 325-0301',

      addressHeading: 'Address and contact',

      byCarHeading: 'By car',
      byCarBody: [
        'From Nasu Interchange on the Tohoku Expressway, take Prefectural Route 17 — about 12 km, around 20 minutes.',
        'Head towards Nasu-Yumoto, turn left at the Ichikenjaya intersection and continue 3 km; the hotel is on your right.',
      ],

      byTrainHeading: 'By train',
      byTrainBody: [
        'The nearest station is the west exit of Nasushiobara Station on the Tohoku Shinkansen.',
        'Buses are also available from the west exit of Kuroiso Station on the Tohoku Main Line.',
      ],

      byBusHeading: 'By local bus',
      byBusBody: [
        'From the west exit of Nasushiobara Station, take the Kanto Bus service bound for Nasu Ropeway (Nasushiobara Sta. West – Kuroiso Sta. West – Nasu Ropeway).',
        'Get off at the Ichikenjaya stop; the hotel is about a 20-minute walk.',
        'From the west exit of Kuroiso Station it is about 35 minutes to Ichikenjaya.',
      ],
      busTimetableCta: 'See the bus timetable from Nasushiobara Station',

      shuttleHeading: 'Hotel shuttle bus (reservation required)',
      shuttleBody: [
        'Pick-up: 14:30, west exit rotary of Nasushiobara Station',
        'Drop-off: 11:00, hotel entrance',
        'A reservation is required in advance. Please call to arrange it.',
      ],

      aroundStopHeading: 'Distances to the bus stop and convenience store',
      aroundStopBody: [
        'From 7-Eleven Nasu Ichikenjaya to the Ichikenjaya bus stop: about 1 minute on foot (100 m)',
        'From the hotel to 7-Eleven Nasu Ichikenjaya: about 3 minutes by car',
      ],

      parkingHeading: 'Parking',
      parkingBody: 'Parking for 50 cars. Free for staying guests.',

      mapCta: 'Open in Google Maps',

      officeHeading: 'Head office (Japan World Co., Ltd.)',
      officeBody: 'Please direct membership enquiries to the head office.',
    },

    company: {
      title: 'Company profile',
      description:
        'Company profile of Japan World Co., Ltd., which operates resort hotel facilities, sells memberships and runs a travel business.',
      h1: 'Company profile',
      eyebrow: 'COMPANY',
      lead: 'Japan World Co., Ltd.',

      profileHeading: 'Company profile',
      labels: {
        name: 'Company name',
        address: 'Head office',
        tel: 'Telephone',
        email: 'E-mail',
        capital: 'Capital',
        ceo: 'Representative Director',
      },

      businessHeading: 'Business activities',
      business: [
        'Resort hotel facility operation and membership sales',
        'Planning, production and sales relating to advertising and promotion',
        'Travel business and travel agency business under the Travel Agency Act',
        'Business alliance support and consulting for companies expanding overseas',
        'Purchase, sale, leasing, management and brokerage of real estate',
        'Purchase, sale, holding and management of memberships',
        'Planning, production, operation and management of events of all kinds',
        'Operation of relaxation salons',
        'Operation and management of cross-border e-commerce sites',
        'Planning, research and operation of educational businesses',
      ],

      groupHeading: 'Related sites',
      groupLead: 'Websites for the services we operate.',
      group: [
        {
          title: 'Raki House Nasu official site',
          body: 'Facility information, seasonal features and the Nasu Town accommodation tax notice. The latest news from the hotel.',
          href: 'hotelSite',
        },
        {
          title: 'JWCCS members-only reservations',
          body: 'The reservation system for Raki House members. JWCCS registration and login are required.',
          href: 'members',
        },
        {
          title: 'JW NFT Platform',
          body: 'The platform for Raki House NFT accommodation vouchers.',
          href: 'nft',
        },
      ],
    },
  },
};

export default en;
