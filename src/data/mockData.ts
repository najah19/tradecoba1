import { MarketQuote, TradingIdea, EconomicEvent, NewsArticle, AcademyCourse, CommunityPost } from '../types';

export const INITIAL_QUOTES: MarketQuote[] = [
  {
    symbol: 'XAUUSD',
    name: 'Gold / US Dollar',
    category: 'gold',
    bid: 3450.10,
    ask: 3450.45,
    spread: 0.35,
    open: 3422.30,
    high: 3458.80,
    low: 3418.90,
    previousClose: 3422.15,
    change: 28.05,
    changePercent: 0.82,
    timestamp: 'Live WIB',
    marketStatus: 'OPEN',
    digits: 2,
    sparkline: [3422, 3426, 3420, 3435, 3442, 3438, 3449, 3450.2],
    high52w: 3510.00,
    low52w: 2319.50,
    contractSize: 100,
    leverage: '1:100 - 1:400',
  },
  {
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    category: 'forex',
    bid: 1.08420,
    ask: 1.08432,
    spread: 0.00012,
    open: 1.08220,
    high: 1.08580,
    low: 1.08150,
    previousClose: 1.08225,
    change: 0.00195,
    changePercent: 0.18,
    timestamp: 'Live WIB',
    marketStatus: 'OPEN',
    digits: 5,
    sparkline: [1.0822, 1.0829, 1.0835, 1.0831, 1.0840, 1.0842],
    high52w: 1.1215,
    low52w: 1.0450,
    contractSize: 100000,
    leverage: '1:100 - 1:400',
  },
  {
    symbol: 'GBPUSD',
    name: 'British Pound / US Dollar',
    category: 'forex',
    bid: 1.29150,
    ask: 1.29168,
    spread: 0.00018,
    open: 1.28850,
    high: 1.29340,
    low: 1.28780,
    previousClose: 1.28850,
    change: 0.00300,
    changePercent: 0.23,
    timestamp: 'Live WIB',
    marketStatus: 'OPEN',
    digits: 5,
    sparkline: [1.2885, 1.2890, 1.2905, 1.2912, 1.2915],
    high52w: 1.3430,
    low52w: 1.2300,
    contractSize: 100000,
    leverage: '1:100 - 1:400',
  },
  {
    symbol: 'USDJPY',
    name: 'US Dollar / Japanese Yen',
    category: 'forex',
    bid: 152.120,
    ask: 152.138,
    spread: 0.018,
    open: 152.550,
    high: 152.890,
    low: 151.980,
    previousClose: 152.550,
    change: -0.430,
    changePercent: -0.28,
    timestamp: 'Live WIB',
    marketStatus: 'OPEN',
    digits: 3,
    sparkline: [152.55, 152.68, 152.34, 152.19, 152.12],
    high52w: 161.95,
    low52w: 140.25,
    contractSize: 100000,
    leverage: '1:100 - 1:400',
  },
  {
    symbol: 'AUDUSD',
    name: 'Australian Dollar / US Dollar',
    category: 'forex',
    bid: 0.65820,
    ask: 0.65835,
    spread: 0.00015,
    open: 0.65600,
    high: 0.65980,
    low: 0.65520,
    previousClose: 0.65600,
    change: 0.00220,
    changePercent: 0.34,
    timestamp: 'Live WIB',
    marketStatus: 'OPEN',
    digits: 5,
    sparkline: [0.6560, 0.6565, 0.6575, 0.6580, 0.6582],
    high52w: 0.6940,
    low52w: 0.6350,
    contractSize: 100000,
    leverage: '1:100',
  },
  {
    symbol: 'USDCAD',
    name: 'US Dollar / Canadian Dollar',
    category: 'forex',
    bid: 1.38120,
    ask: 1.38138,
    spread: 0.00018,
    open: 1.38300,
    high: 1.38450,
    low: 1.37980,
    previousClose: 1.38300,
    change: -0.00180,
    changePercent: -0.13,
    timestamp: 'Live WIB',
    marketStatus: 'OPEN',
    digits: 5,
    sparkline: [1.383, 1.3835, 1.3820, 1.3815, 1.3812],
    high52w: 1.4150,
    low52w: 1.3180,
    contractSize: 100000,
    leverage: '1:100',
  },
  {
    symbol: 'NAS100',
    name: 'Nasdaq 100 Tech Index',
    category: 'indices',
    bid: 21245.50,
    ask: 21247.50,
    spread: 2.0,
    open: 21115.00,
    high: 21310.20,
    low: 21080.00,
    previousClose: 21115.00,
    change: 130.50,
    changePercent: 0.62,
    timestamp: 'Live WIB',
    marketStatus: 'OPEN',
    digits: 2,
    sparkline: [21115, 21150, 21190, 21220, 21245],
    high52w: 21550.00,
    low52w: 16800.00,
    contractSize: 1,
    leverage: '1:100',
  },
  {
    symbol: 'US30',
    name: 'Dow Jones Industrial 30',
    category: 'indices',
    bid: 43850.00,
    ask: 43854.00,
    spread: 4.0,
    open: 43745.00,
    high: 43920.00,
    low: 43690.00,
    previousClose: 43745.00,
    change: 105.00,
    changePercent: 0.24,
    timestamp: 'Live WIB',
    marketStatus: 'OPEN',
    digits: 2,
    sparkline: [43745, 43790, 43810, 43835, 43850],
    high52w: 44500.00,
    low52w: 37200.00,
    contractSize: 1,
    leverage: '1:100',
  },
  {
    symbol: 'SPX500',
    name: 'S&P 500 Index',
    category: 'indices',
    bid: 5985.40,
    ask: 5986.00,
    spread: 0.6,
    open: 5962.00,
    high: 5998.50,
    low: 5955.00,
    previousClose: 5962.00,
    change: 23.40,
    changePercent: 0.39,
    timestamp: 'Live WIB',
    marketStatus: 'OPEN',
    digits: 2,
    sparkline: [5962, 5970, 5978, 5982, 5985],
    high52w: 6050.00,
    low52w: 4950.00,
    contractSize: 1,
    leverage: '1:100',
  },
  {
    symbol: 'USOIL',
    name: 'WTI Crude Oil',
    category: 'commodities',
    bid: 71.45,
    ask: 71.49,
    spread: 0.04,
    open: 71.85,
    high: 72.30,
    low: 70.95,
    previousClose: 71.85,
    change: -0.40,
    changePercent: -0.56,
    timestamp: 'Live WIB',
    marketStatus: 'OPEN',
    digits: 2,
    sparkline: [71.85, 71.95, 71.60, 71.40, 71.45],
    high52w: 87.65,
    low52w: 66.80,
    contractSize: 1000,
    leverage: '1:50',
  },
  {
    symbol: 'SILVER',
    name: 'Silver / US Dollar (XAGUSD)',
    category: 'commodities',
    bid: 33.85,
    ask: 33.88,
    spread: 0.03,
    open: 33.65,
    high: 34.12,
    low: 33.50,
    previousClose: 33.65,
    change: 0.20,
    changePercent: 0.59,
    timestamp: 'Live WIB',
    marketStatus: 'OPEN',
    digits: 2,
    sparkline: [33.65, 33.72, 33.80, 33.84, 33.85],
    high52w: 35.40,
    low52w: 22.10,
    contractSize: 5000,
    leverage: '1:50',
  },
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin / US Dollar',
    category: 'crypto',
    bid: 92450.00,
    ask: 92485.00,
    spread: 35.0,
    open: 90800.00,
    high: 93200.00,
    low: 90250.00,
    previousClose: 90800.00,
    change: 1650.00,
    changePercent: 1.82,
    timestamp: 'Live WIB',
    marketStatus: 'OPEN',
    digits: 2,
    sparkline: [90800, 91200, 91900, 92100, 92450],
    high52w: 99800.00,
    low52w: 52000.00,
    contractSize: 1,
    leverage: '1:20',
  },
  {
    symbol: 'ETHUSD',
    name: 'Ethereum / US Dollar',
    category: 'crypto',
    bid: 2840.50,
    ask: 2842.20,
    spread: 1.70,
    open: 2780.00,
    high: 2865.00,
    low: 2760.00,
    previousClose: 2780.00,
    change: 60.50,
    changePercent: 2.18,
    timestamp: 'Live WIB',
    marketStatus: 'OPEN',
    digits: 2,
    sparkline: [2780, 2800, 2825, 2835, 2840.5],
    high52w: 4090.00,
    low52w: 2150.00,
    contractSize: 1,
    leverage: '1:20',
  }
];

export const TRADING_IDEAS: TradingIdea[] = [
  {
    id: 'idea-1',
    symbol: 'XAUUSD',
    title: 'XAUUSD Bullish Continuation Setup di Atas Demand Zone $3,440',
    direction: 'BUY',
    entryMin: 3440.0,
    entryMax: 3448.0,
    stopLoss: 3425.0,
    takeProfit1: 3475.0,
    takeProfit2: 3490.0,
    riskReward: '1 : 2.1',
    timeframe: '1H / 4H',
    publishedAt: '09:32 WIB Hari Ini',
    author: {
      name: 'Rian Pratama, CSA, CTA',
      role: 'Chief Technical Strategist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    reasoning:
      'Gold menunjukkan formasi Higher Low yang solid pada time frame 1H setelah retest area dynamic support EMA 50. Divergensi tersembunyi (Hidden Bullish Divergence) pada indikator RSI (14) mengkonfirmasi tekanan beli institusional menjelang rilis data ketenagakerjaan AS.',
    keyLevels: {
      support: [3440.0, 3425.0, 3410.0],
      resistance: [3465.0, 3475.0, 3495.0],
    },
    likes: 248,
    views: 3120,
    status: 'ACTIVE',
  },
  {
    id: 'idea-2',
    symbol: 'EURUSD',
    title: 'EURUSD Pullback Retest Support Trendline Menuju Target 1.0920',
    direction: 'BUY',
    entryMin: 1.0825,
    entryMax: 1.0838,
    stopLoss: 1.0790,
    takeProfit1: 1.0895,
    takeProfit2: 1.0930,
    riskReward: '1 : 2.3',
    timeframe: '4H',
    publishedAt: '08:15 WIB Hari Ini',
    author: {
      name: 'Dian Kusuma',
      role: 'Senior Forex Analyst',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    reasoning:
      'EURUSD berhasil breakout dari channel bearish harian dan kini melakukan retest pullback terukur pada level Fibo 38.2%. ECB mempertahankan stance suku bunga stabil, memicu inflow modal ke Euro.',
    keyLevels: {
      support: [1.0820, 1.0790],
      resistance: [1.0880, 1.0925],
    },
    likes: 184,
    views: 1980,
    status: 'ACTIVE',
  },
  {
    id: 'idea-3',
    symbol: 'NAS100',
    title: 'NAS100 Range Expansion Breakout Menuju ATH Baru di 21,500',
    direction: 'BUY',
    entryMin: 21180.0,
    entryMax: 21220.0,
    stopLoss: 21040.0,
    takeProfit1: 21450.0,
    takeProfit2: 21600.0,
    riskReward: '1 : 2.5',
    timeframe: '1D',
    publishedAt: 'Kemarin 21:00 WIB',
    author: {
      name: 'Michael Wijaya',
      role: 'Global Equity Strategist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    reasoning:
      'Indeks teknologi AS mencatat penutupan mingguan kuat di atas level psikologis 21,000 didorong oleh laporan laba sektor Semikonduktor & Cloud AI.',
    keyLevels: {
      support: [21050.0, 20900.0],
      resistance: [21380.0, 21550.0],
    },
    likes: 312,
    views: 4200,
    status: 'ACTIVE',
  },
  {
    id: 'idea-4',
    symbol: 'USOIL',
    title: 'USOIL Resistance Rejection — Short-term Reversal Opportunity',
    direction: 'SELL',
    entryMin: 71.80,
    entryMax: 72.20,
    stopLoss: 72.85,
    takeProfit1: 70.40,
    takeProfit2: 69.20,
    riskReward: '1 : 2.0',
    timeframe: '1H',
    publishedAt: '07:45 WIB Hari Ini',
    author: {
      name: 'Rian Pratama, CSA, CTA',
      role: 'Chief Technical Strategist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    reasoning:
      'Gagal menembus zona resistance $72.30 disertai pola Bearish Engulfing pada chart 1H. Kenaikan persediaan minyak mentah mingguan EIA menekan momentum penguatan.',
    keyLevels: {
      support: [70.50, 69.80],
      resistance: [72.30, 73.10],
    },
    likes: 95,
    views: 1420,
    status: 'ACTIVE',
  }
];

export const ECONOMIC_EVENTS: EconomicEvent[] = [
  {
    id: 'eco-1',
    timeWib: '19:30 WIB',
    date: 'Hari Ini',
    country: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    title: 'Non-Farm Payrolls (NFP)',
    impact: 'HIGH',
    previous: '162K',
    forecast: '170K',
    actual: null,
    relatedMarkets: ['USD', 'XAUUSD', 'EURUSD', 'NAS100'],
    description: 'Data perubahan jumlah tenaga kerja non-pertanian AS. Angka aktual yang lebih tinggi dari estimasi cenderung memperkuat US Dollar dan menekan harga Emas secara jangka pendek.',
    historical: [
      { period: 'Bulan Lalu', actual: '162K', forecast: '150K' },
      { period: '2 Bulan Lalu', actual: '185K', forecast: '175K' },
      { period: '3 Bulan Lalu', actual: '142K', forecast: '165K' }
    ]
  },
  {
    id: 'eco-2',
    timeWib: '19:30 WIB',
    date: 'Hari Ini',
    country: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    title: 'Unemployment Rate (Tingkat Pengangguran)',
    impact: 'HIGH',
    previous: '4.1%',
    forecast: '4.1%',
    actual: null,
    relatedMarkets: ['USD', 'XAUUSD', 'SPX500'],
    description: 'Persentase angkatan kerja total yang menganggur dan aktif mencari pekerjaan selama sebulan terakhir.',
    historical: [
      { period: 'Bulan Lalu', actual: '4.1%', forecast: '4.1%' },
      { period: '2 Bulan Lalu', actual: '4.2%', forecast: '4.2%' },
      { period: '3 Bulan Lalu', actual: '4.3%', forecast: '4.3%' }
    ]
  },
  {
    id: 'eco-3',
    timeWib: '15:00 WIB',
    date: 'Hari Ini',
    country: 'Eurozone',
    flag: '🇪🇺',
    currency: 'EUR',
    title: 'ECB President Lagarde Speech',
    impact: 'MEDIUM',
    previous: '—',
    forecast: '—',
    actual: 'Hawkish stance',
    relatedMarkets: ['EURUSD', 'EURGBP'],
    description: 'Pidato Presiden Bank Sentral Eropa Christine Lagarde memberikan petunjuk mengenai arah kebijakan suku bunga kawasan Euro.',
    historical: []
  },
  {
    id: 'eco-4',
    timeWib: '21:00 WIB',
    date: 'Hari Ini',
    country: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    title: 'ISM Services PMI',
    impact: 'HIGH',
    previous: '54.9',
    forecast: '55.2',
    actual: null,
    relatedMarkets: ['USD', 'XAUUSD', 'NAS100'],
    description: 'Indikator utama kesehatan ekonomi sektor jasa AS yang menyumbang lebih dari dua pertiga PDB Amerika Serikat.',
    historical: [
      { period: 'Bulan Lalu', actual: '54.9', forecast: '53.8' },
      { period: '2 Bulan Lalu', actual: '53.5', forecast: '52.0' }
    ]
  },
  {
    id: 'eco-5',
    timeWib: '09:30 WIB',
    date: 'Besok',
    country: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    title: 'RBA Interest Rate Decision',
    impact: 'HIGH',
    previous: '4.35%',
    forecast: '4.35%',
    actual: null,
    relatedMarkets: ['AUDUSD', 'AUDJPY'],
    description: 'Keputusan suku bunga acuan Reserve Bank of Australia.',
    historical: [
      { period: 'Bulan Lalu', actual: '4.35%', forecast: '4.35%' }
    ]
  },
  {
    id: 'eco-6',
    timeWib: '14:00 WIB',
    date: 'Besok',
    country: 'Indonesia',
    flag: '🇮🇩',
    currency: 'IDR',
    title: 'Bank Indonesia Consumer Confidence Index',
    impact: 'LOW',
    previous: '123.5',
    forecast: '124.0',
    actual: null,
    relatedMarkets: ['USDIDR', 'IHSG'],
    description: 'Indeks keyakinan konsumen Indonesia mencerminkan optimisme kondisi ekonomi domestik.',
    historical: []
  }
];

export const BREAKING_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'gold-surges-past-record-high-safe-haven-flows',
    title: 'Harga Emas (XAUUSD) Terus Meroket Menuju $3,500 Dipicu Arus Safe Haven dan Spekulasi Pemangkasan Suku Bunga Fed',
    subtitle: 'Permintaan fisik bank sentral dunia dan ketegangan geopolitik mendorong reli emas ke level tertinggi baru sepanjang masa.',
    category: 'Gold',
    timeAgo: '12 menit lalu',
    author: {
      name: 'Fahmi Hidayat',
      role: 'Senior Market Editor'
    },
    readTime: '3 min baca',
    isBreaking: true,
    keyTakeaways: [
      'XAUUSD menembus $3,450 dengan momentum beli institusional yang stabil.',
      'Bank sentral Asia dan Eropa Timur terus menambah cadangan emas fisik.',
      'Trader bersiap menghadapi rilis data Non-Farm Payrolls (NFP) AS malam ini sebagai penentu volatilitas berikutnya.'
    ],
    content: [
      'Harga emas dunia kembali mencatat kenaikan signifikan pada perdagangan hari ini di bursa spot internasional. Kontrak XAUUSD bergerak di kisaran $3,450.20 per troy ounce, mencerminkan kenaikan lebih dari 0.8% dalam 24 jam terakhir.',
      'Kombinasi ketidakpastian geopolitik global dan proyeksi pelonggaran moneter lanjutan oleh Federal Reserve memberikan angin segar bagi aset tanpa imbal hasil (non-yielding asset) seperti emas.',
      '"Kami melihat pola akumulasi yang rapi di area support $3,420–$3,435. Para trader institusional memanfaatkan pullback kecil untuk masuk kembali," ujar kepala riset pasar komoditas.',
      'Investor disarankan tetap memperhatikan manajemen risiko ketat karena rilis data NFP dan ISM Services AS dapat menciptakan lonjakan volatilitas spread hingga $15-$25 per troy ounce.'
    ],
    relatedSymbols: ['XAUUSD', 'SILVER', 'USDJPY', 'SPX500']
  },
  {
    id: 'news-2',
    slug: 'us-dollar-consolidates-ahead-nfp-jobs-data',
    title: 'Indeks Dolar AS (DXY) Tertahan di 104.20 Menanti Laporan Ketenagakerjaan Paling Krusial Pekan Ini',
    subtitle: 'Pasar menantikan konfirmasi apakah pasar tenaga kerja AS mendingin atau tetap tangguh menghadapi suku bunga.',
    category: 'Economy',
    timeAgo: '35 menit lalu',
    author: {
      name: 'Rian Pratama',
      role: 'Macro Analyst'
    },
    readTime: '4 min baca',
    isBreaking: false,
    keyTakeaways: [
      'Konsensus NFP berada di angka 170.000 dengan tingkat pengangguran diproyeksikan 4.1%.',
      'Pasangan mata uang mayor EURUSD dan GBPUSD bergerak sideways tipis menjelang rilis data.',
      'Imbal hasil obligasi US Treasury 10-tahun stabil di level 4.28%.'
    ],
    content: [
      'Indeks Dolar AS (DXY) terpantau bergerak dalam rentang sempit pada sesi perdagangan Eropa ke Amerika, seiring para pelaku pasar menahan posisi besar menjelang rilis data Non-Farm Payrolls resmi.',
      'Jika data pekerjaan keluar jauh di atas ekspektasi, dolar berpotensi menguat tajam yang dapat memicu koreksi jangka pendek pada pasangan mata uang rival dan komoditas.',
      'Sebaliknya, angka yang lebih rendah dari 150K akan mempertegas ekspektasi pemangkasan suku bunga Fed sebesar 25 hingga 50 basis poin pada pertemuan FOMC mendatang.'
    ],
    relatedSymbols: ['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD']
  },
  {
    id: 'news-3',
    slug: 'tech-rally-pushes-nasdaq-near-new-all-time-high',
    title: 'Laba Sektor AI Mengerek Indeks NASDAQ Naik +0.62%, Saham Semikonduktor Pimpin Reli',
    subtitle: 'Sentimen positif investor terhadap belanja infrastruktur kecerdasan buatan terus menopang bursa saham Wall Street.',
    category: 'Indices',
    timeAgo: '1 jam lalu',
    author: {
      name: 'Michael Wijaya',
      role: 'Global Equity Specialist'
    },
    readTime: '3 min baca',
    isBreaking: false,
    keyTakeaways: [
      'NAS100 melonjak ke 21,245 dipimpin oleh saham-saham megacap tech.',
      'Arus likuiditas global tetap kuat dengan volatilitas VIX di bawah level 15.',
      'Kombinasi hasil earning yang solid dan ekspektasi penurunan biaya pinjaman memberikan dorongan ganda.'
    ],
    content: [
      'Bursa saham AS melanjutkan tren penguatannya di sesi pra-pembukaan dengan indeks Nasdaq 100 naik lebih dari 130 poin. Minat beli terkonsentrasi pada produsen cip semikonduktor dan penyedia platform cloud komputasi.',
      'Analis mencatat bahwa meskipun valuasi berada pada level historis tinggi, pertumbuhan laba riil perusahaan tetap menjadi bantalan fundamental yang solid.'
    ],
    relatedSymbols: ['NAS100', 'US30', 'SPX500']
  },
  {
    id: 'news-4',
    slug: 'crude-oil-wti-dips-amid-inventory-build',
    title: 'Minyak Mentah WTI Melemah ke $71.45/Barel Usai Laporan Persediaan AS Menunjukkan Peningkatan',
    subtitle: 'Kekhawatiran permintaan global mengimbangi ketegangan pasokan rute pelayaran internasional.',
    category: 'Commodities',
    timeAgo: '2 jam lalu',
    author: {
      name: 'Fahmi Hidayat',
      role: 'Commodities Analyst'
    },
    readTime: '2 min baca',
    isBreaking: false,
    keyTakeaways: [
      'Persediaan minyak mentah AS naik 2.1 juta barel menurut data mingguan.',
      'OPEC+ menegaskan komitmen disiplin kuota produksi hingga kuartal mendatang.',
      'Area support krusial berada di kisaran $70.00 - $70.50.'
    ],
    content: [
      'Harga minyak mentah West Texas Intermediate (USOIL) terkoreksi tipis sekitar 0.56% ke level $71.45 per barel. Tekanan jual terjadi menyusul rilis data persediaan bahan bakar minyak yang melampaui estimasi awal pasar.'
    ],
    relatedSymbols: ['USOIL', 'SILVER']
  }
];

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'course-gold-masterclass',
    title: 'Gold (XAUUSD) Trading Masterclass',
    category: 'Beginner',
    level: 'Pemula',
    duration: '6h 20m',
    totalLessons: 18,
    progressPercent: 42,
    instructor: 'Rian Pratama, CSA, CTA',
    rating: 4.9,
    lessons: [
      { id: 'l1', title: '01 — Pengenalan Karakteristik & Sesi Pasar XAUUSD', duration: '18m', isCompleted: true, type: 'video', contentSnippet: 'Memahami bagaimana emas spot diperdagangkan, perbedaan spread London vs New York, dan korelasi emas dengan US Dollar Index (DXY).' },
      { id: 'l2', title: '02 — Market Structure & Higher High / Higher Low pada Emas', duration: '24m', isCompleted: true, type: 'video', contentSnippet: 'Mendeteksi perubahan tren awal menggunakan struktur pasar murni tanpa indikator yang berlebihan.' },
      { id: 'l3', title: '03 — Identifikasi Area Key Support & Resistance Dinamis', duration: '30m', isCompleted: true, type: 'video', contentSnippet: 'Cara memetakan level psikologis angka bulat (round numbers) seperti $3,400 dan $3,450 yang menjadi acuan likuiditas bank institusional.' },
      { id: 'l4', title: '04 — Entry Strategy: Pullback & Breakout Confirmation', duration: '28m', isCompleted: false, type: 'video', contentSnippet: 'Setup presisi dengan konfirmasi candlestick rejection (Pinbar, Engulfing) pada zona golden ratio Fibonacci 61.8%.' },
      { id: 'l5', title: '05 — Risk Management Khusus Volatilitas Emas', duration: '22m', isCompleted: false, type: 'article', contentSnippet: 'Mengapa Anda tidak boleh menggunakan lot yang sama antara EURUSD dan XAUUSD. Menghitung pip value per 0.01 lot emas ($1 per $1 kenaikan harga).' },
      { id: 'l6', title: '06 — Kuis Evaluasi Pemahaman Emas & Sertifikat', duration: '15m', isCompleted: false, type: 'quiz', contentSnippet: 'Uji pengetahuan Anda tentang sesi trading, pengaruh NFP, dan perhitungan margin emas.' }
    ],
    quizQuestions: [
      {
        question: 'Pada kontrak standar 1 lot XAUUSD (100 troy oz), jika harga bergerak naik dari $3,450.00 ke $3,451.00, berapa nilai keuntungan kotornya?',
        options: ['$10 USD', '$50 USD', '$100 USD', '$1,000 USD'],
        correctIndex: 2,
        explanation: 'Pada 1 lot standar (100 oz), pergerakan $1.00 pada harga emas setara dengan 100 x $1 = $100 USD.'
      },
      {
        question: 'Kapan sesi trading yang umumnya memiliki likuiditas dan volatilitas tertinggi untuk instrumen XAUUSD?',
        options: ['Sesi Sydney pagi hari', 'Sesi Tokyo / Asia awal', 'Overlap Sesi London dan Sesi New York (19:00 - 23:00 WIB)', 'Sesi penutupan New York dini hari'],
        correctIndex: 2,
        explanation: 'Overlap sesi London dan New York (19:00 - 23:00 WIB) adalah jendela waktu dengan volume trading terbesar di dunia.'
      },
      {
        question: 'Jika US Dollar Index (DXY) menguat sangat tajam, apa dampak paling umum yang terjadi pada harga XAUUSD?',
        options: ['XAUUSD cenderung tertekan / terkoreksi turun', 'XAUUSD otomatis naik tajam', 'Tidak ada pengaruh sama sekali', 'Spread emas melebar 10x lipat'],
        correctIndex: 0,
        explanation: 'Secara fundamental historis, harga emas berkorelasi negatif dengan Dolar AS karena emas dihargai dalam satuan USD.'
      }
    ]
  },
  {
    id: 'course-forex-101',
    title: 'Forex Trading 101: Dari Dasar Hingga Profit Konsisten',
    category: 'Beginner',
    level: 'Pemula',
    duration: '4h 45m',
    totalLessons: 12,
    progressPercent: 15,
    instructor: 'Dian Kusuma',
    rating: 4.8,
    lessons: [
      { id: 'f1', title: '01 — Apa itu Forex, Pasangan Mata Uang, & Mekanisme Pasar', duration: '20m', isCompleted: true, type: 'video', contentSnippet: 'Memahami Base currency vs Quote currency, spread bid/ask, dan likuiditas pasar 24/5.' },
      { id: 'f2', title: '02 — Memahami Konsep Pip, Lot, Leverage & Margin', duration: '25m', isCompleted: false, type: 'article', contentSnippet: 'Membongkar rahasia leverage 1:100 hingga 1:400 serta cara menghitung margin yang dibutuhkan tanpa terjebak margin call.' },
      { id: 'f3', title: '03 — Cara Membaca Kalender Ekonomi & Dampak Berita', duration: '30m', isCompleted: false, type: 'video', contentSnippet: 'Membedakan event High Impact (NFP, CPI, Suku Bunga) dengan berita rutin.' }
    ]
  },
  {
    id: 'course-tech-analysis',
    title: 'Mastering Technical Analysis: Candlestick, S/R & Indikator',
    category: 'Technical',
    level: 'Menengah',
    duration: '7h 10m',
    totalLessons: 20,
    progressPercent: 0,
    instructor: 'Rian Pratama, CSA, CTA',
    rating: 4.9,
    lessons: [
      { id: 't1', title: '01 — Anatomi Candlestick & Pola Reversal Kuat', duration: '25m', isCompleted: false, type: 'video', contentSnippet: 'Hammer, Shooting Star, Bullish/Bearish Engulfing, dan Morning Star di zona kunci.' },
      { id: 't2', title: '02 — Exponential Moving Average (EMA 20, 50, 200) Golden Cross', duration: '35m', isCompleted: false, type: 'video', contentSnippet: 'Menggunakan EMA sebagai support/resistance dinamis dan penunjuk bias tren besar.' }
    ]
  },
  {
    id: 'course-risk-psychology',
    title: 'Trading Psychology & Risk Management: Menghindari Margin Call',
    category: 'Psychology',
    level: 'Menengah',
    duration: '3h 30m',
    totalLessons: 8,
    progressPercent: 0,
    instructor: 'Budi Santoso, RFC',
    rating: 5.0,
    lessons: [
      { id: 'p1', title: '01 — Mengatasi Rasa Takut Ketinggalan (FOMO) & Revenge Trading', duration: '22m', isCompleted: false, type: 'article', contentSnippet: 'Psikologi trader profesional dalam menghadapi rentetan loss tanpa merusak akun trading.' },
      { id: 'p2', title: '02 — Rule 1-2% Risk Per Trade & Asimetri Risk/Reward', duration: '28m', isCompleted: false, type: 'video', contentSnippet: 'Strategi matematis agar tetap profit meskipun tingkat kemenangan (win rate) hanya 40-50%.' }
    ]
  }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'comm-1',
    author: {
      name: 'Arya Nugraha',
      username: '@aryanugraha_trader',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      badge: 'Pro Trader'
    },
    symbol: 'XAUUSD',
    title: 'Setup Re-entry XAUUSD di Support $3,445 Sebelum Sesi London Tutup',
    content: 'Melihat rejection bersih di timeframe 15m. Terlihat ada formasi double bottom mini dengan konfirmasi volume spike. Pasang SL ketat di $3,438 untuk target $3,465.',
    tags: ['#XAUUSD', '#GoldTrading', '#Scalping', '#PriceAction'],
    timestamp: '25 menit lalu',
    likes: 42,
    commentsCount: 9,
    sentiment: 'BULLISH'
  },
  {
    id: 'comm-2',
    author: {
      name: 'Siti Rahmawati',
      username: '@siti_fx_journal',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      badge: 'Certified Analyst'
    },
    symbol: 'EURUSD',
    title: 'Update Outlook EURUSD: Waspadai False Break di Sekitar 1.0850',
    content: 'Harga sempat menembus 1.0850 tapi wick candle 4H sangat panjang di atas. Lebih baik tunggu konfirmasi penutupan candle harian sebelum menambah posisi buy.',
    tags: ['#EURUSD', '#ForexIndo', '#SwingTrading'],
    timestamp: '1 jam lalu',
    likes: 29,
    commentsCount: 14,
    sentiment: 'NEUTRAL'
  },
  {
    id: 'comm-3',
    author: {
      name: 'Doni Handoko',
      username: '@doni_futures',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    },
    symbol: 'NAS100',
    title: 'Take Profit Pertama Tercapai di 21,240! Sisa Posisi Di-trailing Stop',
    content: 'Terima kasih atas analisa tim analis pagi ini! R:R 1:2.5 sangat manis. Sisa 50% posisi saya pasang stop loss di break-even (BEP). Disiplin trading plan adalah kunci.',
    tags: ['#NAS100', '#IndexFutures', '#TradingPlan', '#Profit'],
    timestamp: '3 jam lalu',
    likes: 88,
    commentsCount: 21,
    sentiment: 'BULLISH'
  }
];

export const BROKER_ACCOUNT_TYPES = [
  {
    id: 'mini',
    name: 'Akun Mini (Mikro)',
    badge: 'Paling Populer untuk Pemula',
    minDeposit: '$50 USD (Rp 800.000,-)',
    spreadFrom: 'Mulai dari 1.2 pips',
    commission: 'Bebas Komisi ($0)',
    minLot: '0.01 Lot',
    maxLeverage: 'Hingga 1:400',
    execution: 'STP Instant Execution',
    platform: 'MetaTrader 4 (MT4) & Web Terminal',
    suitableFor: 'Trader pemula yang ingin memulai dengan risiko terukur dan modal terjangkau.',
    features: [
      'Bebas biaya komisi transaksi',
      'Minimum volume order hanya 0.01 lot',
      'Akses gratis seluruh sinyal & Trading Ideas',
      'Support CS lokal Bahasa Indonesia 24/5',
      'Segregated account terdaftar di Bappebti & KBI'
    ]
  },
  {
    id: 'regular',
    name: 'Akun Regular Standard',
    badge: 'Rekomendasi Trader Aktif',
    minDeposit: '$250 USD (Rp 4.000.000,-)',
    spreadFrom: 'Mulai dari 0.8 pips',
    commission: '$1 per lot',
    minLot: '0.10 Lot',
    maxLeverage: 'Hingga 1:200',
    execution: 'Direct Market Access (DMA/STP)',
    platform: 'MT4, MT5, Mobile Apps & Web Terminal',
    suitableFor: 'Trader aktif harian dan swing trader yang menginginkan spread lebih ketat.',
    features: [
      'Spread tipis mulai 0.8 pips di XAUUSD & EURUSD',
      'Eksekusi ultra-cepat no-requote',
      'Akses riset pasar premium mingguan',
      'Dedicated Account Manager',
      'Fasilitas bebas biaya swap (Islamic / Swap-free)'
    ]
  },
  {
    id: 'pro',
    name: 'Akun Pro ECN / Raw Spread',
    badge: 'Spread Terketat untuk Scalper',
    minDeposit: '$1,000 USD (Rp 16.000.000,-)',
    spreadFrom: 'Mulai dari 0.0 pips (Raw)',
    commission: '$3.5 per lot (Turnaround)',
    minLot: '0.10 Lot',
    maxLeverage: 'Hingga 1:100',
    execution: 'True ECN Interbank Liquidity',
    platform: 'MT4, MT5, FIX API & Institutional Web',
    suitableFor: 'Scalper berfrekuensi tinggi, pengguna Expert Advisor (EA), dan dana institusional.',
    features: [
      'Raw spread 0.0 pip langsung dari penyedia likuiditas bank tier-1',
      'Latency server super rendah (< 12 ms)',
      'Dukungan penuh algo trading & hedging tanpa batasan',
      'Akses prioritas analisis eksklusif & konsultasi analis senior',
      'Penarikan dana prioritas diproses pada hari yang sama'
    ]
  }
];

export const FAQ_ITEMS = [
  {
    q: 'Apakah platform ini merupakan pialang resmi atau portal intelijen pasar?',
    a: 'Platform ini menggabungkan ekosistem intelijen pasar global (analisis teknikal, fundamental, kalender ekonomi, kalkulator risiko, dan edukasi) dengan integrasi pembukaan akun demo dan akun live melalui mitra pialang berjangka resmi yang berizin dan diawasi oleh BAPPEBTI (Badan Pengawas Perdagangan Berjangka Komoditi) serta anggota Kliring Berjangka Indonesia (KBI) dan Bursa Berjangka Jakarta (BBJ/JFX).'
  },
  {
    q: 'Apakah saya bisa berlatih menggunakan akun demo gratis tanpa risiko uang asli?',
    a: 'Ya! Anda dapat langsung membuka Akun Demo Gratis dengan saldo virtual sebesar $10,000 USD. Anda dapat mengeksekusi order buy/sell pada XAUUSD, Forex, Indeks, dan Komoditas dengan harga pasar real-time sebelum menyetor dana riil.'
  },
  {
    q: 'Berapa modal minimum untuk mulai trading live emas (XAUUSD)?',
    a: 'Pada jenis Akun Mini, deposit minimum mulai dari $50 USD (sekitar Rp 800.000,-) dengan ukuran transaksi minimum 0.01 lot. Kami menyarankan selalu memperhitungkan ketahanan margin dan batas risiko maksimal 1-2% per transaksi.'
  },
  {
    q: 'Bagaimana keamanan dana nasabah pada akun live?',
    a: 'Seluruh dana nasabah disimpan dalam Rekening Terpisah (Segregated Account) pada bank-bank BUMN/Swasta terkemuka di Indonesia yang diaudit dan dipantau setiap hari oleh lembaga kliring resmi pemerintah, sehingga dana nasabah terpisah dari dana operasional perusahaan.'
  }
];
