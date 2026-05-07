// Euro trip — May 7 to May 15, 2026
// Budapest → Munich → Salzburg → Amsterdam

export const TRIP = {
  startDate: '2026-05-07',
  endDate: '2026-05-15',
};

export const CITIES = [
  {
    id: 'budapest',
    name: 'Budapest',
    country: 'Hungary',
    code: 'BUD',
    flag: '🇭🇺',
    dates: 'May 7 – May 10',
    shortDates: '7–10 May',
    nights: 3,
    motif: 'thermal',          // bath ripples / Danube
    accentHex: '#c9a14a',       // gold
    accentSoft: 'rgba(201,161,74,0.18)',
    chip: 'bg-[rgba(201,161,74,0.14)] text-cream-100 border-gold-500/40',
    tagline: 'Thermal baths, ruin bars, riverside house.',
  },
  {
    id: 'munich',
    name: 'Munich',
    country: 'Germany',
    code: 'MUC',
    flag: '🇩🇪',
    dates: 'May 10 – May 11',
    shortDates: '10–11 May',
    nights: 1,
    motif: 'stein',            // beer mug / Bavarian
    accentHex: '#d6b366',
    accentSoft: 'rgba(214,179,102,0.18)',
    chip: 'bg-[rgba(214,179,102,0.16)] text-cream-100 border-gold-400/40',
    tagline: 'Beer hall night before Salzburg.',
  },
  {
    id: 'salzburg',
    name: 'Salzburg',
    country: 'Austria',
    code: 'SZG',
    flag: '🇦🇹',
    dates: 'May 11 – May 12',
    shortDates: '11–12 May',
    nights: 1,
    motif: 'alpine',           // mountains
    accentHex: '#7da38e',
    accentSoft: 'rgba(125,163,142,0.18)',
    chip: 'bg-[rgba(125,163,142,0.16)] text-cream-100 border-sage-400/40',
    tagline: 'Fortress, alpine pit stop, monastery beer.',
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    code: 'AMS',
    flag: '🇳🇱',
    dates: 'May 12 – May 15',
    shortDates: '12–15 May',
    nights: 3,
    motif: 'canal',            // canal / bike
    accentHex: '#a8525a',
    accentSoft: 'rgba(168,82,90,0.18)',
    chip: 'bg-[rgba(168,82,90,0.16)] text-cream-100 border-burgundy-400/40',
    tagline: 'Canals, bikes, the long stay before the trip continues.',
  },
];

export const CATEGORIES = [
  { id: 'all',       label: 'All',        emoji: '✨' },
  { id: 'food',      label: 'Food',       emoji: '🍽' },
  { id: 'beer',      label: 'Beer',       emoji: '🍺' },
  { id: 'daytime',   label: 'Daytime',    emoji: '🏛' },
  { id: 'nightlife', label: 'Nightlife',  emoji: '🎧' },
  { id: 'travel',    label: 'Travel',     emoji: '🚆' },
  { id: 'recovery',  label: 'Recovery',   emoji: '🛌' },
  { id: 'bookings',  label: 'Bookings',   emoji: '✅' },
  { id: 'warnings',  label: 'Warnings',   emoji: '⚠️' },
];

// Budapest home base — every Budapest itinerary item gets a distance from here.
export const BUDAPEST_HOME_BASE = {
  name: "Wombat's City Hostel Budapest",
  shortName: "Wombat's Hostel",
  address: 'Király u. 20, 1061 Budapest, Hungary',
  lat: 47.5005,
  lng: 19.0593,
};

export const FOOD_RULES = [
  'No pork, ham, bacon.',
  'No sausage unless clearly beef or chicken.',
  'No shrimp, no shellfish.',
  'Not strict kosher — relaxed avoidance, not certification.',
];

export const MUSIC_TASTE = {
  yes: ['funky house', 'disco house', 'groovy house', 'soulful house', 'nu-disco', 'danceable house'],
  no:  ['hard techno', 'industrial techno', 'dark warehouse techno'],
};

const mapsLink = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const searchLink = (q) =>
  `https://www.google.com/search?q=${encodeURIComponent(q)}`;

// Card schema:
// { id, city, date, dayLabel, time, title, category, location, price,
//   reserve, description, foodWarning, safeOrder, avoidOrder, musicFit,
//   mapQuery, mapUrl, bookingHint, bookingUrl, priority }

export const ITINERARY = [
  // ───────────────────────────── BUDAPEST ─────────────────────────────
  // Thu May 7 — Arrival Night
  {
    id: 'bud-0507-1830',
    city: 'budapest',
    date: '2026-05-07',
    dayLabel: 'Thu May 7 · Arrival Night',
    time: '18:30',
    title: 'Check in · Wombat\'s Hostel',
    category: 'recovery',
    location: 'Király u. 20, Pest',
    price: 'Lodging',
    reserve: 'Done',
    description: 'Drop bags at Wombat\'s, freshen up, head out for dinner.',
    lat: 47.5005,
    lng: 19.0593,
    transitNote: 'home base',
    mapQuery: 'Wombats City Hostel Budapest',
  },
  {
    id: 'bud-0507-2030',
    city: 'budapest',
    date: '2026-05-07',
    dayLabel: 'Thu May 7 · Arrival Night',
    time: '20:30',
    title: 'Dinner · Gettó Gulyás',
    category: 'food',
    location: 'Wesselényi u. 18, Jewish Quarter',
    price: '€15–25 pp',
    reserve: 'Yes if possible',
    description: 'Modern Hungarian. Order chicken paprikash or beef goulash.',
    safeOrder: ['Chicken paprikash', 'Beef goulash', 'Túrós csusza (cheese pasta)', 'Salads'],
    avoidOrder: ['Pork stew', 'Sausage plates', 'Anything with bacon'],
    foodWarning: true,
    lat: 47.4969,
    lng: 19.0590,
    transitNote: 'very short walk',
    mapQuery: 'Gettó Gulyás Budapest',
    bookingHint: 'Call or use their site to reserve a 4-top',
    bookingUrl: searchLink('Getto Gulyas Budapest reservation'),
    priority: true,
  },
  {
    id: 'bud-0507-2230',
    city: 'budapest',
    date: '2026-05-07',
    dayLabel: 'Thu May 7 · Arrival Night',
    time: '22:30',
    title: 'Beer · Élesztőház',
    category: 'beer',
    location: 'Tűzoltó u. 22',
    price: '€5–8 / beer',
    reserve: 'No',
    description: 'Massive Hungarian craft beer hall. Easy first round.',
    lat: 47.4837,
    lng: 19.0673,
    transitNote: 'Bolt recommended',
    mapQuery: 'Élesztőház Budapest',
  },
  {
    id: 'bud-0508-0000',
    city: 'budapest',
    date: '2026-05-07',
    dayLabel: 'Thu May 7 · Arrival Night',
    time: '00:00',
    sortOrder: 2400,
    title: 'Szimpla Kert · Light ruin-bar night',
    category: 'nightlife',
    location: 'Kazinczy u. 14',
    price: 'Free entry / cheap drinks',
    reserve: 'No',
    description: 'The OG ruin bar. Tourist-heavy but a must-do once.',
    musicFit: 'Mixed bar music — fine for a late drink, not a curated dance night.',
    lat: 47.4972,
    lng: 19.0617,
    transitNote: 'very short walk',
    mapQuery: 'Szimpla Kert Budapest',
  },

  // Fri May 8 — Baths + First Real Night
  {
    id: 'bud-0508-1130',
    city: 'budapest',
    date: '2026-05-08',
    dayLabel: 'Fri May 8 · Baths + First Real Night',
    time: '11:30',
    title: 'Brunch · Jewish Quarter cafés',
    category: 'food',
    location: 'Kazinczy / Dob street area',
    price: '€10–20',
    reserve: 'No',
    description: 'Walk in. Plenty of options around Mazel Tov, Stika, Karaván street food.',
    safeOrder: ['Shakshuka', 'Eggs', 'Avocado toast', 'Chicken sandwich'],
    avoidOrder: ['Bacon plates', 'Ham & cheese', 'Chorizo'],
    foodWarning: true,
    mapQuery: 'Jewish Quarter Budapest brunch',
  },
  {
    id: 'bud-0508-1300',
    city: 'budapest',
    date: '2026-05-08',
    dayLabel: 'Fri May 8 · Baths + First Real Night',
    time: '13:00',
    title: 'Parliament · Danube · Chain Bridge',
    category: 'daytime',
    location: 'Kossuth Lajos tér → Chain Bridge',
    price: 'Free',
    reserve: 'No',
    description: 'Walk the Pest waterfront, cross over Chain Bridge for the photo.',
    mapQuery: 'Hungarian Parliament Budapest',
  },
  {
    id: 'bud-0508-1500',
    city: 'budapest',
    date: '2026-05-08',
    dayLabel: 'Fri May 8 · Baths + First Real Night',
    time: '15:00',
    title: 'Széchenyi Thermal Bath',
    category: 'daytime',
    location: 'Állatkerti krt. 9–11',
    price: '~14,800 HUF locker · ~16,800 HUF online fast-track',
    reserve: 'Yes',
    description: 'Iconic outdoor thermal pools. Book online to skip the queue.',
    lat: 47.5187,
    lng: 19.0817,
    transitNote: 'M1 metro to Széchenyi fürdő (or Bolt ~9 min)',
    mapQuery: 'Széchenyi Thermal Bath Budapest',
    bookingHint: 'Book the fast-track locker ticket on the official site',
    bookingUrl: searchLink('Szechenyi Bath online ticket fast track'),
    priority: true,
  },
  {
    id: 'bud-0508-1930',
    city: 'budapest',
    date: '2026-05-08',
    dayLabel: 'Fri May 8 · Baths + First Real Night',
    time: '19:30',
    title: 'Dinner · Menza',
    category: 'food',
    location: 'Liszt Ferenc tér 2',
    price: '€20–30 pp',
    reserve: 'Yes',
    description: 'Retro-canteen vibe, modern Hungarian. Solid before a long night.',
    safeOrder: ['Beef goulash', 'Chicken paprikash', 'Grilled chicken', 'Catfish paprikash'],
    avoidOrder: ['Pork knuckle', 'Anything with bacon or kolbász (pork sausage)'],
    foodWarning: true,
    lat: 47.5045,
    lng: 19.0658,
    transitNote: 'easy walk',
    mapQuery: 'Menza restaurant Budapest',
    bookingHint: 'Reserve via their site or phone',
    bookingUrl: searchLink('Menza Budapest reservation'),
    priority: true,
  },
  {
    id: 'bud-0508-2230',
    city: 'budapest',
    date: '2026-05-08',
    dayLabel: 'Fri May 8 · Baths + First Real Night',
    time: '22:30',
    title: 'FIRST Craft Beer & BBQ',
    category: 'beer',
    location: 'Holló u. 12–14',
    price: '€5–8 / beer',
    reserve: 'No',
    description: 'Treat as a beer stop. The rotating taps are excellent.',
    foodWarning: true,
    safeOrder: ['Stick to beer', 'Beef brisket if available'],
    avoidOrder: ['Pulled pork', 'Pork ribs', 'Bacon-loaded sides'],
    lat: 47.4977,
    lng: 19.0588,
    transitNote: 'very short walk',
    mapQuery: 'FIRST Craft Beer and BBQ Budapest',
  },
  {
    id: 'bud-0508-2300',
    city: 'budapest',
    date: '2026-05-08',
    dayLabel: 'Fri May 8 · Baths + First Real Night',
    time: '23:00',
    title: 'SOAKIN’ at Aether Club',
    category: 'nightlife',
    location: 'Aether · Pest',
    price: 'Ticketed (~€10–20)',
    reserve: 'Yes',
    description: 'Possible fit. Aether swings between house and harder stuff — verify the night before pulling the trigger.',
    musicFit: 'Best fit: vocal UKG, 2-step, disco house, French touch, nu-disco, funky/vocal house, and bright danceable club music. Aether nights vary — sometimes that lane, sometimes harder.',
    genreTags: ['Funky House', 'Vocal House'],
    lineupCheck: 'Check lineup first — avoid hard techno, industrial techno, dark 140, grime, dubstep, heavy UK bass, or experimental bass.',
    lat: 47.5004,
    lng: 19.0613,
    transitNote: 'around the corner',
    mapQuery: 'Aether Club Budapest',
    bookingHint: 'Buy tix via Aether socials / Resident Advisor',
    bookingUrl: searchLink('Aether Club Budapest SOAKIN tickets'),
    priority: true,
  },

  // Sat May 9 — Best Music Day
  {
    id: 'bud-0509-1230',
    city: 'budapest',
    date: '2026-05-09',
    dayLabel: 'Sat May 9 · Best Music Day',
    time: '12:30',
    title: 'Lunch · Mazel Tov / Macesz Bistro',
    category: 'food',
    location: 'Akácfa u. 47 / Dob u. 26',
    price: '€20–35 pp',
    reserve: 'Yes',
    description: 'Modern Israeli at Mazel Tov; old-school Jewish bistro at Macesz. Both work great with what we eat.',
    safeOrder: ['Hummus & pita', 'Grilled chicken skewers', 'Shakshuka', 'Lamb dishes', 'Falafel'],
    avoidOrder: ['Shrimp', 'Anything with shellfish'],
    foodWarning: true,
    lat: 47.4983,
    lng: 19.0644,
    transitNote: 'short walk',
    mapQuery: 'Mazel Tov Budapest',
    bookingHint: 'Mazel Tov takes reservations online',
    bookingUrl: searchLink('Mazel Tov Budapest reservation'),
    priority: true,
  },
  {
    id: 'bud-0509-1430',
    city: 'budapest',
    date: '2026-05-09',
    dayLabel: 'Sat May 9 · Best Music Day',
    time: '14:30',
    title: 'Buda Castle + Fisherman’s Bastion',
    category: 'daytime',
    location: 'Castle Hill, Buda side',
    price: 'Mostly free',
    reserve: 'No',
    description: 'Cross over and walk the Castle district. Best skyline in town.',
    lat: 47.5020,
    lng: 19.0345,
    transitNote: 'Tram 2 + walk uphill (or Bolt). Side-trip across the Danube.',
    mapQuery: 'Fisherman\'s Bastion Budapest',
  },
  {
    id: 'bud-0509-1730',
    city: 'budapest',
    date: '2026-05-09',
    dayLabel: 'Sat May 9 · Best Music Day',
    time: '17:30',
    title: 'Nap / recharge',
    category: 'recovery',
    location: 'Hotel',
    price: 'Free',
    reserve: 'No',
    description: 'Mandatory. Tonight is long.',
  },
  {
    id: 'bud-0509-1800',
    city: 'budapest',
    date: '2026-05-09',
    dayLabel: 'Sat May 9 · Best Music Day',
    time: '18:00',
    title: 'City Park Sunset Grooves · Pavilon Kert',
    category: 'nightlife',
    location: 'Városliget · Pavilon Kert',
    price: 'Free',
    reserve: 'No',
    description: 'Outdoor day-into-night party in City Park. Warm, bright, vocal — the safest curated daytime fit on the trip. 6–9 PM.',
    musicFit: 'Strong fit. Best fit: vocal UKG, 2-step, disco house, French touch, nu-disco, funky/vocal house, and bright danceable club music. Pavilon usually leans warm house/disco — exactly the lane.',
    genreTags: ['Funky House', 'Disco House', 'Nu-Disco', 'Vocal House'],
    lat: 47.5145,
    lng: 19.0795,
    transitNote: 'M1 metro to Hősök tere (or Bolt ~8 min)',
    mapQuery: 'Pavilon Kert Budapest',
    priority: true,
  },
  {
    id: 'bud-0509-2130',
    city: 'budapest',
    date: '2026-05-09',
    dayLabel: 'Sat May 9 · Best Music Day',
    time: '21:30',
    title: 'Dinner · Quick bite near Pontoon',
    category: 'food',
    location: 'Belváros · riverside',
    price: '€15–25',
    reserve: 'Maybe',
    description: 'Refuel before the long Pontoon set.',
    safeOrder: ['Grilled chicken', 'Burgers (beef)', 'Pasta', 'Pizza'],
    avoidOrder: ['Pork ribs', 'Bacon burgers', 'Shrimp pasta'],
    foodWarning: true,
    mapQuery: 'restaurants near Pontoon Budapest',
  },
  {
    id: 'bud-0509-2200',
    city: 'budapest',
    date: '2026-05-09',
    dayLabel: 'Sat May 9 · Best Music Day',
    time: '22:00',
    title: 'Lick the Click @ Pontoon',
    category: 'nightlife',
    location: 'Pontoon · Danube riverside',
    price: 'Free',
    reserve: 'No',
    description: 'Riverside floating bar. Social, groovy, bright. Good fit for the night.',
    musicFit: 'Strong fit. Best fit: vocal UKG, 2-step, disco house, French touch, nu-disco, funky/vocal house, and bright danceable club music. Pontoon Saturday tends to land in disco/funky house territory.',
    genreTags: ['Funky House', 'Disco House', 'Nu-Disco', 'Indie Dance'],
    lat: 47.4953,
    lng: 19.0473,
    transitNote: 'Easy walk to the Danube — or Bolt ~5 min',
    mapQuery: 'Pontoon Budapest',
    priority: true,
  },

  // Sun May 10 — Travel to Munich (transition only, no detailed transport)
  {
    id: 'bud-0510-1100',
    city: 'budapest',
    date: '2026-05-10',
    dayLabel: 'Sun May 10 · Travel to Munich',
    time: '11:00',
    title: 'Travel to Munich',
    category: 'travel',
    location: 'Budapest → Munich',
    price: '—',
    reserve: 'No',
    description: 'Pack up, check out of Wombat\'s, head to Munich.',
  },
  // ───────────────────────────── MUNICH (May 10–11) ─────────────────────────────
  {
    id: 'mun-0513-1930',
    city: 'munich',
    date: '2026-05-10',
    dayLabel: 'Sun May 10 · Munich beer hall',
    time: '19:30',
    title: 'Dinner · Augustiner-Keller',
    category: 'food',
    location: 'Arnulfstraße 52',
    price: '€25–40 pp',
    reserve: 'Yes',
    description: 'Big traditional beer garden. Roast chicken (Hendl) is the play.',
    safeOrder: ['Half Hendl (roast chicken)', 'Pretzels', 'Potato salad', 'Cheese plate', 'Beef goulash'],
    avoidOrder: ['Weißwurst', 'Schweinshaxe (pork knuckle)', 'Leberkäse', 'Bratwurst'],
    foodWarning: true,
    mapQuery: 'Augustiner-Keller Munich',
    bookingHint: 'Reserve via the Augustiner-Keller site',
    bookingUrl: searchLink('Augustiner-Keller Munich reservation'),
    priority: true,
  },
  {
    id: 'mun-0510-2230',
    city: 'munich',
    date: '2026-05-10',
    dayLabel: 'Sun May 10 · Munich beer hall',
    time: '22:30',
    title: 'Easy night',
    category: 'recovery',
    location: 'Hotel',
    price: 'Free',
    reserve: 'No',
    description: 'No clubbing here — early to bed, fortress in Salzburg tomorrow.',
  },
  {
    id: 'mun-0511-1000',
    city: 'munich',
    date: '2026-05-11',
    dayLabel: 'Mon May 11 · Travel to Salzburg',
    time: '10:00',
    title: 'Travel to Salzburg',
    category: 'travel',
    location: 'Munich → Salzburg',
    price: '—',
    reserve: 'No',
    description: 'Short hop south. Aim to arrive Salzburg by early afternoon.',
  },

  // ───────────────────────────── SALZBURG (May 11–12) ─────────────────────────────
  {
    id: 'sal-0512-1100',
    city: 'salzburg',
    date: '2026-05-11',
    dayLabel: 'Mon May 11 · Salzburg',
    time: '14:00',
    title: 'Hohensalzburg Fortress',
    category: 'daytime',
    location: 'Mönchsberg 34',
    price: '~€19.20 all-in (incl. funicular)',
    reserve: 'Optional online',
    description: 'Funicular up, panoramic views, audio tour, museum.',
    mapQuery: 'Hohensalzburg Fortress',
    bookingUrl: searchLink('Hohensalzburg Fortress ticket online'),
  },
  {
    id: 'sal-0512-1330',
    city: 'salzburg',
    date: '2026-05-11',
    dayLabel: 'Mon May 11 · Salzburg',
    time: '16:30',
    title: 'Old Town wander · Getreidegasse',
    category: 'daytime',
    location: 'Getreidegasse / Old Town',
    price: 'Free',
    reserve: 'No',
    description: 'Walk the Mozart-postcard streets, grab a snack.',
    safeOrder: ['Veal Wiener Schnitzel', 'Beef goulash', 'Chicken', 'Fish', 'Pretzels'],
    avoidOrder: ['Pork schnitzel', 'Bratwurst', 'Speck (cured pork)', 'Ham platters'],
    foodWarning: true,
    mapQuery: 'Getreidegasse Salzburg',
  },
  {
    id: 'sal-0512-1530',
    city: 'salzburg',
    date: '2026-05-11',
    dayLabel: 'Mon May 11 · Salzburg',
    time: '17:30',
    title: 'Stiegl-Brauwelt brewery tour (if timing works)',
    category: 'beer',
    location: 'Bräuhausstraße 9',
    price: '€21.90',
    reserve: 'Recommended',
    description: 'Guided tour, tastings + soft drinks, gift. ~2 hours. Skip if timing tight.',
    mapQuery: 'Stiegl-Brauwelt Salzburg',
    bookingHint: 'Lock the slot online ahead of arrival',
    bookingUrl: searchLink('Stiegl Brauwelt tour booking'),
  },
  {
    id: 'sal-0511-1930',
    city: 'salzburg',
    date: '2026-05-11',
    dayLabel: 'Mon May 11 · Salzburg',
    time: '19:30',
    title: 'Augustiner Bräustübl Mülln',
    category: 'beer',
    location: 'Lindhofstraße 7, Salzburg',
    price: '€5 / 1L · food €5–12',
    reserve: 'No',
    description: 'Massive monastery beer hall. Self-serve mugs, picnic-table chaos. Iconic.',
    safeOrder: ['Pretzels', 'Roast chicken (Hendl)', 'Cheese', 'Potato salad', 'Beef brisket if listed'],
    avoidOrder: ['Leberkäse', 'Anything pork-based at the deli stalls'],
    foodWarning: true,
    mapQuery: 'Augustiner Bräustübl Mülln Salzburg',
    priority: true,
  },
  {
    id: 'sal-0511-2230',
    city: 'salzburg',
    date: '2026-05-11',
    dayLabel: 'Mon May 11 · Salzburg',
    time: '22:30',
    title: 'Easy night',
    category: 'recovery',
    location: 'Hotel',
    price: 'Free',
    reserve: 'No',
    description: 'Salzburg is a chill stop. Sleep early, Amsterdam tomorrow.',
  },
  {
    id: 'sal-0512-1000',
    city: 'salzburg',
    date: '2026-05-12',
    dayLabel: 'Tue May 12 · Travel to Amsterdam',
    time: '10:00',
    title: 'Travel to Amsterdam',
    category: 'travel',
    location: 'Salzburg → Amsterdam',
    price: '—',
    reserve: 'No',
    description: 'Pack up, head to Amsterdam. Aim to land late afternoon.',
  },
  // ───────────────────────────── AMSTERDAM (May 12–15) ─────────────────────────────

  // Tue May 12 — Arrival evening
  {
    id: 'ams-0514-1630',
    city: 'amsterdam',
    date: '2026-05-12',
    dayLabel: 'Tue May 12 · Amsterdam arrival',
    time: '17:00',
    title: 'Check in · drop bags',
    category: 'recovery',
    location: 'Hotel · Centrum / De Pijp',
    price: 'Lodging',
    reserve: 'No',
    description: 'Settle in, freshen up, ease into Amsterdam.',
    mapQuery: 'Amsterdam Centraal',
  },
  {
    id: 'ams-0512-1930',
    city: 'amsterdam',
    date: '2026-05-12',
    dayLabel: 'Tue May 12 · Amsterdam arrival',
    time: '19:30',
    title: 'Dinner · easy local spot',
    category: 'food',
    location: 'Centrum / De Pijp',
    price: '€15–30',
    reserve: 'No',
    description: 'Nothing fancy on arrival night. Walk-in somewhere local. Save Sampurna for tomorrow.',
    safeOrder: ['Burger (beef)', 'Chicken', 'Pasta', 'Salads'],
    foodWarning: true,
    mapQuery: 'good dinner Amsterdam Centrum',
  },
  {
    id: 'ams-0512-2230',
    city: 'amsterdam',
    date: '2026-05-12',
    dayLabel: 'Tue May 12 · Amsterdam arrival',
    time: '22:30',
    title: 'Optional drinks · canal stroll',
    category: 'beer',
    location: 'Centrum',
    price: '€5–8 / beer',
    reserve: 'No',
    description: 'Bar-hop, walk the canals, easy first night. Big day tomorrow.',
    mapQuery: 'Centrum Amsterdam bars',
  },

  // Wed May 13 — Full Amsterdam day
  {
    id: 'ams-0515-1130',
    city: 'amsterdam',
    date: '2026-05-13',
    dayLabel: 'Wed May 13 · Amsterdam',
    time: '11:30',
    title: 'Brunch · PANCAKES Amsterdam',
    category: 'food',
    location: 'Berenstraat 38',
    price: '€12–20',
    reserve: 'Usually no',
    description: 'Big plates, savory + sweet. Tell them no bacon/ham.',
    safeOrder: ['Cheese pancake', 'Mushroom pancake', 'Apple cinnamon', 'Banana / nutella'],
    avoidOrder: ['Bacon stack', 'Ham & cheese pancake'],
    foodWarning: true,
    mapQuery: 'PANCAKES Amsterdam Berenstraat',
  },
  {
    id: 'ams-0515-1330',
    city: 'amsterdam',
    date: '2026-05-13',
    dayLabel: 'Wed May 13 · Amsterdam',
    time: '13:30',
    title: 'Jordaan · Nine Streets · canals',
    category: 'daytime',
    location: 'Jordaan / 9 Streets',
    price: 'Free',
    reserve: 'No',
    description: 'The pretty postcard walk. Stop into shops, grab a stroopwafel.',
    mapQuery: 'Nine Streets Amsterdam',
  },
  {
    id: 'ams-0515-1530',
    city: 'amsterdam',
    date: '2026-05-13',
    dayLabel: 'Wed May 13 · Amsterdam',
    time: '15:30',
    title: 'Brouwerij ’t IJ · windmill brewery',
    category: 'beer',
    location: 'Funenkade 7',
    price: 'Beers €5–7 · €2.50 tour',
    reserve: 'Tour limited',
    description: 'Tasting room next to a windmill. The tour is great but small.',
    mapQuery: 'Brouwerij \'t IJ Amsterdam',
    bookingUrl: searchLink('Brouwerij t IJ tour booking'),
  },
  {
    id: 'ams-0514-1930',
    city: 'amsterdam',
    date: '2026-05-13',
    dayLabel: 'Wed May 13 · Amsterdam',
    time: '19:30',
    title: 'Dinner · Sampurna Indonesian',
    category: 'food',
    location: 'Singel 498',
    price: '€25–45 pp',
    reserve: 'Yes',
    description: 'Old-school rijsttafel done right. Tell them: no pork, no shellfish.',
    safeOrder: ['Chicken satay', 'Beef rendang', 'Sayur lodeh (veg)', 'Nasi / rice', 'Gado-gado'],
    avoidOrder: ['Babi (pork)', 'Udang (shrimp)', 'Mixed sambal seafood platters'],
    foodWarning: true,
    mapQuery: 'Sampurna restaurant Amsterdam',
    bookingHint: 'Reserve via TheFork or their site',
    bookingUrl: searchLink('Sampurna Amsterdam reservation'),
    priority: true,
  },
  {
    id: 'ams-0513-2230',
    city: 'amsterdam',
    date: '2026-05-13',
    dayLabel: 'Wed May 13 · Amsterdam',
    time: '22:30',
    title: 'Drinks · De Pijp / Leidseplein',
    category: 'beer',
    location: 'De Pijp area',
    price: '€5–8 / beer',
    reserve: 'No',
    description: 'Bar-hop. De Pijp is more local; Leidseplein is louder/touristy.',
    mapQuery: 'De Pijp Amsterdam bars',
  },

  // Thu May 14 — Full Amsterdam day/night
  {
    id: 'ams-0514-1130',
    city: 'amsterdam',
    date: '2026-05-14',
    dayLabel: 'Thu May 14 · Amsterdam',
    time: '11:30',
    title: 'Brunch / coffee',
    category: 'food',
    location: 'Centrum / De Pijp',
    price: '€10–20',
    reserve: 'No',
    description: 'Lighter brunch — long night ahead.',
    safeOrder: ['Eggs', 'Toasties (cheese)', 'Avocado toast', 'Coffee'],
    foodWarning: true,
    mapQuery: 'best brunch Amsterdam Centrum',
  },
  {
    id: 'ams-0514-1330',
    city: 'amsterdam',
    date: '2026-05-14',
    dayLabel: 'Thu May 14 · Amsterdam',
    time: '13:30',
    title: 'Vondelpark · Rijksmuseum · canals',
    category: 'daytime',
    location: 'Vondelpark / Museumplein',
    price: 'Park free · museum ~€22',
    reserve: 'No',
    description: 'Walk Vondelpark, optional Rijksmuseum or Van Gogh, stroll the museum quarter.',
    mapQuery: 'Vondelpark Amsterdam',
  },
  {
    id: 'ams-0514-1700',
    city: 'amsterdam',
    date: '2026-05-14',
    dayLabel: 'Thu May 14 · Amsterdam',
    time: '17:00',
    title: 'Chill / nap',
    category: 'recovery',
    location: 'Hotel',
    price: 'Free',
    reserve: 'No',
    description: 'Reset before the long night.',
  },
  {
    id: 'ams-0514-1900',
    city: 'amsterdam',
    date: '2026-05-14',
    dayLabel: 'Thu May 14 · Amsterdam',
    time: '19:00',
    title: 'Early dinner before Rollerskate',
    category: 'food',
    location: 'Centrum / Foodhallen',
    price: '€15–25',
    reserve: 'No',
    description: 'Eat earlier so you can make Rollerskate at 8 PM. Foodhallen is fast and flexible.',
    safeOrder: ['Burger (beef)', 'Roast chicken', 'Pasta', 'Salads'],
    foodWarning: true,
    mapQuery: 'Foodhallen Amsterdam',
  },
  {
    id: 'ams-0514-2000',
    city: 'amsterdam',
    date: '2026-05-14',
    dayLabel: 'Thu May 14 · Amsterdam',
    time: '20:00',
    title: 'A’DAM Rollerskate Disco · optional',
    category: 'nightlife',
    location: 'A\'DAM Toren · Overhoeksplein 5',
    price: 'Door / skate rental',
    reserve: 'Recommended',
    description: 'Fun non-club option — rollerskates, disco music, sunset views. 8–11 PM if listed/available.',
    musicFit: 'Bright disco / dance-pop edits / nu-disco. Light, fun, vocal-leaning.',
    genreTags: ['Disco House', 'Nu-Disco', 'Funky House'],
    mapQuery: 'A\'DAM Toren Amsterdam rollerskate disco',
    bookingHint: 'Search "A\'DAM rollerskate disco" for dates / tickets',
    bookingUrl: searchLink('ADAM Toren rollerskate disco Amsterdam'),
  },
  {
    id: 'ams-0514-2330',
    city: 'amsterdam',
    date: '2026-05-14',
    dayLabel: 'Thu May 14 · Amsterdam',
    time: '23:30',
    title: 'Easy bars / Disco Dolly · optional',
    category: 'nightlife',
    location: 'Centrum',
    price: 'Door / cheap',
    reserve: 'No',
    description: 'Last night out. Disco Dolly walk-in or bar-hop in the Centrum.',
    musicFit: 'Bright, vocal, danceable. Best fit: vocal UKG, 2-step, disco house, French touch, nu-disco, funky/vocal house.',
    genreTags: ['Disco House', 'Nu-Disco', 'Funky House'],
    mapQuery: 'Disco Dolly Amsterdam',
  },

  // Fri May 15 — Trip continues
  {
    id: 'ams-0516-1030',
    city: 'amsterdam',
    date: '2026-05-15',
    dayLabel: 'Fri May 15 · Trip continues',
    time: '10:30',
    title: 'Brunch / coffee',
    category: 'food',
    location: 'Centrum',
    price: '€10–20',
    reserve: 'No',
    description: 'Last meal in Amsterdam. Take it slow.',
    safeOrder: ['Eggs', 'Pancakes', 'Toasties (cheese)', 'Coffee'],
    foodWarning: true,
    mapQuery: 'best brunch Amsterdam Centrum',
  },
  {
    id: 'ams-0516-1200',
    city: 'amsterdam',
    date: '2026-05-15',
    dayLabel: 'Fri May 15 · Trip continues',
    time: '12:00',
    title: 'Trip continues after Amsterdam',
    category: 'travel',
    location: 'Check out',
    price: '—',
    reserve: 'No',
    description: 'Pack up, settle the bill, head out. The app ends here.',
  },
];

// ─────────── Post-process: mapUrl + sortOrder + structured price ───────────

// Manual price overrides for cards whose price text doesn't auto-parse
// to euros (e.g. HUF, "Already booked", "Pay food/drinks").
const PRICE_OVERRIDES = {
  'bud-0508-1500': { priceMinEUR: 37, priceMaxEUR: 42, isFree: false }, // ~14.8k–16.8k HUF
  'bud-0507-1600': { priceMinEUR: 0, priceMaxEUR: 0, isFree: true },     // Already booked
};

// Haversine great-circle distance in km
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// Bucket each Budapest place into a walk-from-hostel tier so the city hub
// can offer a Near / Walkable / Requires ride filter.
function deriveHomeBaseDistance(c) {
  if (c.city !== 'budapest' || typeof c.lat !== 'number' || typeof c.lng !== 'number') return;
  const km = haversineKm(BUDAPEST_HOME_BASE.lat, BUDAPEST_HOME_BASE.lng, c.lat, c.lng);
  // Walking pace ≈ 5 km/h ⇒ 12 min/km. Round up to nearest minute.
  const walkMin = Math.max(1, Math.round(km * 12));
  let tier;
  if (walkMin <= 8) tier = 'near';
  else if (walkMin <= 25) tier = 'walkable';
  else tier = 'ride';
  c.distanceFromHostelKm = Math.round(km * 10) / 10;
  c.walkMinutesFromHostel = walkMin;
  c.homeBaseTier = tier;
}

function deriveSortOrder(c) {
  if (typeof c.sortOrder === 'number') return c.sortOrder;
  const m = (c.time || '00:00').match(/^(\d{1,2}):(\d{2})/);
  if (!m) return 0;
  return parseInt(m[1], 10) * 100 + parseInt(m[2], 10);
}

function derivePrice(c) {
  if (PRICE_OVERRIDES[c.id]) return PRICE_OVERRIDES[c.id];
  const text = c.price || '';
  const t = text.toLowerCase().trim();
  if (!t) return { priceMinEUR: null, priceMaxEUR: null, isFree: false };
  if (/^(free|mostly free|already booked)/.test(t)) {
    return { priceMinEUR: 0, priceMaxEUR: 0, isFree: true };
  }
  if (/huf/i.test(text)) {
    return { priceMinEUR: null, priceMaxEUR: null, isFree: false };
  }
  // Pull every euro number from the string. Ranges like "€20–30 pp" or
  // "€5–8 / beer" only have € on the first number; we still want both ends.
  // We only do this if there's a € symbol *somewhere* — otherwise we treat
  // it as unstructured (e.g. "Door / cheap", "Pay food/drinks") and skip.
  if (!/€/.test(text)) {
    return { priceMinEUR: null, priceMaxEUR: null, isFree: false };
  }
  const nums = [...text.matchAll(/(\d+(?:\.\d+)?)/g)].map((m) => parseFloat(m[1]));
  if (!nums.length) {
    return { priceMinEUR: null, priceMaxEUR: null, isFree: false };
  }
  return {
    priceMinEUR: Math.min(...nums),
    priceMaxEUR: Math.max(...nums),
    isFree: false,
  };
}

ITINERARY.forEach((c) => {
  c.mapUrl = mapsLink(c.mapQuery || `${c.title} ${c.city}`);
  c.sortOrder = deriveSortOrder(c);
  Object.assign(c, derivePrice(c));
  deriveHomeBaseDistance(c);
});

// Cross-field convenience: timestamp for sorting across days
ITINERARY.forEach((c) => {
  c.startKey = `${c.date} ${String(c.sortOrder).padStart(4, '0')}`;
});

// ───────────────────────── Best-of lists ─────────────────────────
export const BEST_OF = {
  budapest: {
    food: ['Gettó Gulyás', 'Menza', 'Mazel Tov', 'Macesz Bistro'],
    beer: ['Élesztőház', 'FIRST Craft Beer & BBQ'],
    nightlife: [
      '1. Sat May 9 · City Park Sunset Grooves @ Pavilon Kert',
      '2. Sat May 9 · Pontoon — Lick the Click (after sunset)',
    ],
    nightlifeNote: 'Best fit: Vocal UKG · 2-Step · French Touch · Nu-Disco · Funky / Vocal House. The Sat sunset → Pontoon flow is the safest match. Aether SOAKIN\' Fri may swing harder — verify the lineup before going.',
    daytime: ['Széchenyi Bath', 'Buda Castle + Fisherman\'s Bastion', 'Margit Island'],
    avoid: ['Hard techno / industrial techno warehouses', 'Dark 140, grime, dubstep, heavy UK bass, experimental bass', 'Tourist-trap goulash on the Danube promenade'],
  },
  salzburg: {
    food: ['Augustiner Bräustübl Mülln (food stalls — pick carefully)', 'Old Town veal schnitzel spots'],
    beer: ['Augustiner Bräustübl Mülln', 'Stiegl-Brauwelt'],
    nightlife: ['Salzburg is sleepy. Save the energy for Munich/Amsterdam.'],
    daytime: ['Hohensalzburg Fortress', 'Mirabell Gardens', 'Old Town wander'],
    avoid: ['Pork-heavy menus — order veal/chicken/fish'],
  },
  munich: {
    food: ['Augustiner-Keller (Hendl + pretzels)', 'English Garden Chinese Tower (chicken)'],
    beer: ['Augustiner-Keller', 'Hofbräuhaus', 'Park Café beer garden'],
    nightlife: ['No clubbing in Munich — beer halls only on this trip.'],
    nightlifeNote: 'Munich is one day / one night here. Save the dancing for Budapest and Amsterdam.',
    daytime: ['BMW Museum', 'Olympic Park', 'Eisbach surfers', 'Marienplatz'],
    avoid: ['Weißwurst, Schweinshaxe, bratwurst — all pork.', 'Munich clubs (no time, not the trip vibe)'],
  },
  amsterdam: {
    food: ['Sampurna (Indonesian)', 'PANCAKES Amsterdam', 'Foodhallen (mixed)'],
    beer: ['Brouwerij \'t IJ', 'Café Gollem', 'Proeflokaal Arendsnest'],
    nightlife: [
      '1. Disco Dolly · simple bright fallback (Wed late or Thu late)',
      '2. A’DAM Rollerskate Disco · fun non-club option if listed (Thu 8–11 PM)',
      'Note: Brighter Days @ The Loft only runs once a month — usually doesn\'t line up with our window.',
    ],
    nightlifeNote: 'Amsterdam would be the best city on this route for disco / nu-disco / garage-adjacent nights, but our window is short (Wed late + Thu). Keep it light — bright, vocal, danceable.',
    daytime: ['Jordaan + Nine Streets', 'Vondelpark', 'Canal walks', 'Rijksmuseum'],
    avoid: ['Bacon-stack pancakes', 'Random shrimp-heavy rijsttafel options', 'Hard / industrial techno rooms', 'Dark 140, grime, dubstep, heavy UK bass'],
  },
};

// ───────────────────────── Book These Now ─────────────────────────
// tier: 'must' | 'recommended' | 'optional'
// No flight or bus prices in this list — just things that need to be reserved.
export const BOOK_NOW = [
  { id: 'book-bud-lodging', tier: 'must',        label: 'Budapest · Wombat\'s City Hostel — confirm booking',          when: 'Thu May 7',   url: searchLink('Wombats City Hostel Budapest booking') },
  { id: 'book-1',           tier: 'recommended', label: 'Budapest · Széchenyi Bath fast-track ticket',                  when: 'Fri May 8',   url: searchLink('Szechenyi Bath online ticket fast track') },
  { id: 'book-2',           tier: 'recommended', label: 'Budapest · Gettó Gulyás dinner reservation',                   when: 'Thu May 7',   url: searchLink('Getto Gulyas Budapest reservation') },
  { id: 'book-3',           tier: 'recommended', label: 'Budapest · Menza dinner reservation',                          when: 'Fri May 8',   url: searchLink('Menza Budapest reservation') },
  { id: 'book-4',           tier: 'recommended', label: 'Budapest · Mazel Tov lunch reservation',                       when: 'Sat May 9',   url: searchLink('Mazel Tov Budapest reservation') },
  { id: 'book-9',           tier: 'recommended', label: 'Munich beer hall dinner · Augustiner-Keller',                  when: 'Sun May 10',  url: searchLink('Augustiner-Keller Munich reservation') },
  { id: 'book-7',           tier: 'optional',    label: 'Stiegl-Brauwelt brewery tour (if timing works)',               when: 'Mon May 11',  url: searchLink('Stiegl Brauwelt tour booking') },
  { id: 'book-ams-lodging', tier: 'must',        label: 'Amsterdam · lodging — confirm booking',                        when: 'Tue May 12',  url: searchLink('Amsterdam hotel booking') },
  { id: 'book-11',          tier: 'recommended', label: 'Amsterdam · Sampurna dinner',                                  when: 'Wed May 13',  url: searchLink('Sampurna Amsterdam reservation') },
  { id: 'book-rollerskate', tier: 'optional',    label: 'Amsterdam · A\'DAM Rollerskate Disco — check schedule',        when: 'Thu May 14',  url: searchLink('ADAM Toren rollerskate disco Amsterdam') },
];

// ───────────────────────── Emergency fallbacks ─────────────────────────
export const FALLBACKS = {
  budapest: {
    food: ['Hummus Bar (chain)', 'Bors GasztroBár', 'Padron tapas (lunch)'],
    beer: ['Léhűtő', 'Krak\'n Town Saloon Brewery'],
    nightlife: ['Instant-Fogas (multi-floor ruin bar) — pick the house room', 'Akvárium Klub if a house DJ is on'],
  },
  salzburg: {
    food: ['Bärenwirt (order veal/fish)', 'Café Tomaselli (snack)'],
    beer: ['Die Weisse', 'Müllner Bräu'],
    nightlife: ['Soda Club only if a house night', 'Half-Moon Bar for cocktails'],
  },
  munich: {
    food: ['Park Café beer garden (roast chicken)', 'Wirtshaus in der Au (order beef/chicken)'],
    beer: ['Park Café', 'Chinese Tower beer garden in English Garden'],
    nightlife: ['Harry Klein for house', 'Pacha for funk/disco nights'],
  },
  amsterdam: {
    food: ['Foodhallen', 'Bazar (Mediterranean — easy halal-friendly)', 'The Pancake Bakery'],
    beer: ['Café Gollem', 'Proeflokaal Arendsnest'],
    nightlife: ['Disco Dolly', 'Chicago Social Club (mixed house)', 'Paradiso if the lineup fits'],
  },
};
