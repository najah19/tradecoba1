import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { 
  TrendingUp, 
  ArrowRight, 
  Shield, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  BarChart2, 
  ChevronRight,
  Flame,
  Clock,
  ExternalLink
} from 'lucide-react';
import { formatPrice, formatPercent } from '../../utils/technicalIndicators';

export const HeroSection: React.FC = () => {
  const { setActiveTab, setActiveModal, quotes, setSelectedSymbol } = useMarket();
  const goldQuote = quotes.find((q) => q.symbol === 'XAUUSD') || quotes[0];
  const eurusdQuote = quotes.find((q) => q.symbol === 'EURUSD') || quotes[1];
  const nasQuote = quotes.find((q) => q.symbol === 'NAS100') || quotes[6];

  return (
    <div id="hero-section" className="relative overflow-hidden bg-[#080B12] pt-8 pb-16 border-b border-white/5">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            {/* Live Market Alert Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-sm bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-mono tracking-tighter">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping"></span>
              <span className="font-semibold uppercase tracking-wider text-[11px]">XAUUSD ALL-TIME HIGH ZONE: ${formatPrice(goldQuote.bid, 2)}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.15]">
              Trade Global Markets <br />
              <span className="text-yellow-500">
                With Better Intelligence.
              </span>
            </h1>

            {/* Description / Subtitle */}
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Pantau Market. Analisis Lebih Cepat. Trading Lebih Terukur. Akses data pasar real-time, analisis mendalam XAUUSD & Forex, kalender ekonomi WIB, trading ideas, serta kalkulator risiko profesional dalam satu ekosistem.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-explore-markets-btn"
                onClick={() => setActiveTab('markets')}
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider rounded-sm transition shadow-sm flex items-center space-x-2 group cursor-pointer"
              >
                <span>Explore Markets</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>

              <button
                id="hero-open-account-btn"
                onClick={() => setActiveModal('live-kyc')}
                className="px-6 py-3 bg-[#10151F] hover:bg-white/5 text-white font-semibold text-xs uppercase tracking-wider rounded-sm border border-white/10 transition flex items-center space-x-2 cursor-pointer"
              >
                <span>Buka Akun Live</span>
              </button>

              <button
                id="hero-try-demo-btn"
                onClick={() => setActiveModal('demo-account')}
                className="px-4 py-3 text-yellow-500 hover:text-yellow-400 text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 transition cursor-pointer"
              >
                <span>Coba Demo ($10K)</span>
              </button>
            </div>

            {/* Value Indicators */}
            <div className="pt-4 border-t border-white/5 grid grid-cols-3 gap-4 text-left font-mono">
              <div>
                <div className="text-lg font-bold text-white tracking-tighter">0.0 Pip</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-sans mt-0.5">Raw Spread Terketat</div>
              </div>
              <div>
                <div className="text-lg font-bold text-yellow-500 tracking-tighter">&lt; 15 ms</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-sans mt-0.5">Ultra-Fast Execution</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white tracking-tighter">100%</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-sans mt-0.5">Segregated Accounts</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual — Live Market Terminal Card */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#10151F] border border-white/10 rounded-lg p-5 shadow-2xl backdrop-blur-md">
              {/* Header inside Hero Terminal Visual */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-sm bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 font-bold font-mono">
                    Au
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm font-mono tracking-tighter">XAUUSD</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded-sm bg-yellow-500/10 text-yellow-500 font-semibold border border-yellow-500/20 uppercase tracking-wider">
                        HERO INSTRUMENT
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">Spot Gold / US Dollar</span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-xl font-bold text-yellow-500 tracking-tighter">
                    ${formatPrice(goldQuote.bid, 2)}
                  </div>
                  <div className="text-xs text-[#00FF95] font-medium flex items-center justify-end">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {formatPercent(goldQuote.changePercent)}
                  </div>
                </div>
              </div>

              {/* Interactive Mini Sparkline Candle Preview */}
              <div className="h-32 w-full bg-[#080B12] rounded-md p-3 border border-white/5 flex items-end justify-between gap-1 relative overflow-hidden mb-4">
                <div className="absolute top-2 left-3 text-[10px] font-mono text-gray-500 flex items-center gap-2 uppercase tracking-widest">
                  <span>1H TIMEFRAME</span>
                  <span className="text-[#00FF95]">• BULLISH STRUCTURE</span>
                </div>
                {/* Mini bar candles simulation */}
                {[
                  { o: 40, c: 55, h: 60, l: 35, bull: true },
                  { o: 55, c: 50, h: 58, l: 45, bull: false },
                  { o: 50, c: 65, h: 70, l: 48, bull: true },
                  { o: 65, c: 72, h: 75, l: 60, bull: true },
                  { o: 72, c: 68, h: 76, l: 65, bull: false },
                  { o: 68, c: 80, h: 84, l: 66, bull: true },
                  { o: 80, c: 75, h: 82, l: 70, bull: false },
                  { o: 75, c: 88, h: 92, l: 74, bull: true },
                  { o: 88, c: 85, h: 90, l: 82, bull: false },
                  { o: 85, c: 96, h: 99, l: 84, bull: true },
                ].map((c, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                    <div 
                      className={`w-1 ${c.bull ? 'bg-[#00FF95]' : 'bg-[#FF3131]'}`} 
                      style={{ height: `${c.h - c.l}%` }} 
                    />
                    <div 
                      className={`w-full max-w-[14px] rounded-xs ${c.bull ? 'bg-[#00FF95]' : 'bg-[#FF3131]'}`} 
                      style={{ height: `${Math.max(4, Math.abs(c.c - c.o))}%` }} 
                    />
                  </div>
                ))}
              </div>

              {/* Multi-data Terminal Widgets Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-mono">
                {/* Sentiment Gauge */}
                <div className="p-3 bg-[#080B12] rounded-md border border-white/5">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-sans mb-1.5 flex items-center justify-between">
                    <span>Sentiment</span>
                    <span className="text-[#00FF95] font-mono font-bold">68% Bull</span>
                  </div>
                  <div className="w-full bg-[#10151F] h-1.5 rounded-sm overflow-hidden flex">
                    <div className="bg-[#00FF95] h-full" style={{ width: '68%' }}></div>
                    <div className="bg-[#FF3131] h-full" style={{ width: '32%' }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>Buyers</span>
                    <span>Sellers</span>
                  </div>
                </div>

                {/* Key Driver / Event Alert */}
                <div className="p-3 bg-[#080B12] rounded-md border border-white/5">
                  <div className="text-[10px] text-yellow-500 uppercase tracking-widest font-sans mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Event Mendatang
                  </div>
                  <div className="text-white font-bold text-xs truncate">
                    19:30 WIB: US Non-Farm Payrolls
                  </div>
                  <div className="text-[10px] text-gray-500">
                    High Volatility Impact Expected
                  </div>
                </div>
              </div>

              {/* Hero Action Footer inside Card */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <button
                  onClick={() => {
                    setSelectedSymbol('XAUUSD');
                    setActiveTab('gold');
                  }}
                  className="text-xs font-semibold text-yellow-500 hover:text-yellow-400 flex items-center gap-1 cursor-pointer"
                >
                  <span>XAUUSD Market Center</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedSymbol('XAUUSD');
                      setActiveTab('tools');
                    }}
                    className="px-2.5 py-1 text-[11px] bg-[#080B12] hover:bg-white/5 text-gray-300 rounded-sm font-medium border border-white/10 cursor-pointer"
                  >
                    Risiko Lot
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSymbol('XAUUSD');
                      setActiveModal('demo-account');
                    }}
                    className="px-2.5 py-1 text-[11px] bg-yellow-500 hover:bg-yellow-400 text-black rounded-sm font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Trade Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
