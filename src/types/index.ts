export type AssetCategory = 'forex' | 'gold' | 'indices' | 'commodities' | 'crypto' | 'stocks';

export interface MarketQuote {
  symbol: string;
  name: string;
  category: AssetCategory;
  bid: number;
  ask: number;
  spread: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  change: number;
  changePercent: number;
  timestamp: string;
  marketStatus: 'OPEN' | 'CLOSED' | 'PRE-MARKET';
  digits: number;
  sparkline: number[];
  high52w?: number;
  low52w?: number;
  contractSize?: number;
  leverage?: string;
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type IdeaDirection = 'BUY' | 'SELL';

export interface TradingIdea {
  id: string;
  symbol: string;
  title: string;
  direction: IdeaDirection;
  entryMin: number;
  entryMax: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2?: number;
  riskReward: string;
  timeframe: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    verified: boolean;
  };
  reasoning: string;
  keyLevels: {
    support: number[];
    resistance: number[];
  };
  chartSnapshotUrl?: string;
  likes: number;
  views: number;
  status: 'ACTIVE' | 'TARGET_REACHED' | 'STOPPED_OUT';
}

export type EventImpact = 'HIGH' | 'MEDIUM' | 'LOW';

export interface EconomicEvent {
  id: string;
  timeWib: string;
  date: string;
  country: string;
  flag: string;
  currency: string;
  title: string;
  impact: EventImpact;
  previous: string;
  forecast: string;
  actual: string | null;
  relatedMarkets: string[];
  description: string;
  historical: { period: string; actual: string; forecast: string }[];
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Breaking' | 'Forex' | 'Gold' | 'Commodities' | 'Indices' | 'Economy' | 'Central Bank' | 'Geopolitics';
  timeAgo: string;
  author: {
    name: string;
    role: string;
  };
  readTime: string;
  content: string[];
  keyTakeaways: string[];
  relatedSymbols: string[];
  isBreaking?: boolean;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  type: 'video' | 'article' | 'quiz';
  contentSnippet: string;
}

export interface AcademyCourse {
  id: string;
  title: string;
  category: 'Beginner' | 'Technical' | 'Fundamental' | 'Risk Management' | 'Psychology';
  level: 'Pemula' | 'Menengah' | 'Lanjutan';
  duration: string;
  totalLessons: number;
  progressPercent: number;
  instructor: string;
  rating: number;
  lessons: CourseLesson[];
  quizQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    badge?: string;
    role?: string;
  };
  symbol: string;
  title: string;
  content: string;
  tags: string[];
  timestamp: string;
  likes: number;
  commentsCount: number;
  userLiked?: boolean;
  chartImage?: string;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  createdAt?: string;
  comments?: {
    id: string;
    author: string;
    text: string;
    timeAgo: string;
  }[];
}

export interface PriceAlert {
  id: string;
  symbol: string;
  condition: 'ABOVE' | 'BELOW' | 'PERCENT_CHANGE';
  targetValue: number;
  currentPrice: number;
  createdAt: string;
  status: 'ACTIVE' | 'TRIGGERED';
  note?: string;
}

export interface TradingPosition {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  lots: number;
  openPrice: number;
  currentPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  profit: number;
  openTime: string;
}
