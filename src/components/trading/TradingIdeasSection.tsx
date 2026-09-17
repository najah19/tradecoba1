import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { TRADING_IDEAS } from '../../data/mockData';
import { TradingIdea } from '../../types';
import { 
  Lightbulb, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  ShieldCheck, 
  Eye, 
  Heart, 
  Share2, 
  X, 
  Zap,
  Target,
  AlertTriangle
} from 'lucide-react';
import { formatPrice } from '../../utils/technicalIndicators';

export const TradingIdeasSection: React.FC = () => {
  const { setSelectedSymbol, setActiveTab, openPosition, addToast } = useMarket();
  const [selectedIdea, setSelectedIdea] = useState<TradingIdea | null>(null);
  const [ideas, setIdeas] = useState<TradingIdea[]>(TRADING_IDEAS);
  const [filterDirection, setFilterDirection] = useState<'ALL' | 'BUY' | 'SELL'>('ALL');

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIdeas((prev) =>
      prev.map((idea) => (idea.id === id ? { ...idea, likes: idea.likes + 1 } : idea))
    );
    addToast('info', 'Ide Disukai', 'Terima kasih atas apresiasi Anda untuk tim analis!');
  };

  const filteredIdeas = ideas.filter((i) => {
    if (filterDirection === 'ALL') return true;
    return i.direction === filterDirection;
  });

  return (
    <section id="trading-ideas-section" className="py-12 bg-[#080B12] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span className="text-yellow-500 font-mono text-xs font-bold uppercase tracking-widest">
                Actionable Setups
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Trading Ideas & Sinyal Terukur
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Setiap ide dilengkapi zona Entry, Stop Loss, Target Profit, serta rasio Risk:Reward minimal 1:2.
            </p>
          </div>

          {/* Direction Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-[#10151F] rounded-lg border border-white/10">
            {(['ALL', 'BUY', 'SELL'] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => setFilterDirection(dir)}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium transition cursor-pointer ${
                  filterDirection === dir
                    ? 'bg-yellow-500 text-black font-bold shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {dir === 'ALL' ? 'Semua Arah' : dir === 'BUY' ? 'Bullish Buy' : 'Bearish Sell'}
              </button>
            ))}
          </div>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredIdeas.map((idea) => {
            const isBuy = idea.direction === 'BUY';
            return (
              <div
                key={idea.id}
                id={`trading-idea-card-${idea.id}`}
                onClick={() => setSelectedIdea(idea)}
                className="cursor-pointer group bg-[#10151F] hover:bg-[#141B28] border border-white/10 hover:border-yellow-500/40 rounded-lg p-4 transition-all duration-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Top: Symbol & Direction Badge */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-base text-white group-hover:text-yellow-500 transition">
                        {idea.symbol}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        TF {idea.timeframe}
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 border ${
                        isBuy 
                          ? 'bg-[#00FF95]/10 text-[#00FF95] border-[#00FF95]/20' 
                          : 'bg-[#FF3131]/10 text-[#FF3131] border-[#FF3131]/20'
                      }`}
                    >
                      {isBuy ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {idea.direction} SETUP
                    </span>
                  </div>

                  {/* Title & Key Parameters */}
                  <h3 className="text-xs font-semibold text-gray-200 mt-3 line-clamp-2 leading-snug">
                    {idea.title}
                  </h3>

                  {/* Pricing Matrix */}
                  <div className="mt-3 p-2.5 bg-[#080B12] rounded-sm border border-white/5 space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Entry Zone</span>
                      <span className="text-white font-bold">
                        {idea.entryMin} – {idea.entryMax}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#FF3131]">Stop Loss</span>
                      <span className="text-[#FF3131] font-bold">{idea.stopLoss}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#00FF95]">Take Profit</span>
                      <span className="text-[#00FF95] font-bold">{idea.takeProfit1}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-white/5 text-[11px]">
                      <span className="text-gray-500">Risk / Reward</span>
                      <span className="text-yellow-500 font-bold">{idea.riskReward}</span>
                    </div>
                  </div>
                </div>

                {/* Author & Timestamp Footer */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                  <div className="flex items-center space-x-1.5">
                    <img
                      src={idea.author.avatar}
                      alt={idea.author.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="truncate max-w-[100px] text-gray-300 font-medium">
                      {idea.author.name.split(',')[0]}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => handleLike(idea.id, e)}
                      className="flex items-center space-x-1 hover:text-[#FF3131] transition cursor-pointer"
                    >
                      <Heart className="w-3 h-3" />
                      <span>{idea.likes}</span>
                    </button>
                    <span>•</span>
                    <span>{idea.publishedAt.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Bar on Ideas */}
        <div className="mt-6 p-3 bg-[#10151F] border border-white/10 rounded-lg flex items-center space-x-2 text-[11px] text-gray-400">
          <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0" />
          <span>
            <strong className="text-gray-300">Disclaimer Sinyal:</strong> Ide trading di atas dipublikasikan semata-mata untuk referensi edukasi dan bukan merupakan nasihat finansial atau perintah eksekusi otomatis. Selalu gunakan stop loss dan batasi risiko per order.
          </span>
        </div>
      </div>

      {/* Idea Detail Modal */}
      {selectedIdea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#10151F] border border-white/15 rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080B12]">
              <div className="flex items-center space-x-3">
                <span className="font-mono font-black text-lg text-yellow-500">
                  {selectedIdea.symbol}
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-sm border ${
                    selectedIdea.direction === 'BUY'
                      ? 'bg-[#00FF95]/10 text-[#00FF95] border-[#00FF95]/20'
                      : 'bg-[#FF3131]/10 text-[#FF3131] border-[#FF3131]/20'
                  }`}
                >
                  {selectedIdea.direction} SETUP (R:R {selectedIdea.riskReward})
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  TF: {selectedIdea.timeframe}
                </span>
              </div>
              <button
                onClick={() => setSelectedIdea(null)}
                className="p-1.5 text-gray-400 hover:text-white rounded-sm hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5">
              <h2 className="text-lg font-bold text-white">
                {selectedIdea.title}
              </h2>

              {/* Pricing Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
                <div className="p-3 bg-[#080B12] rounded-sm border border-white/10">
                  <span className="text-[10px] text-gray-500 block font-sans tracking-wider">ENTRY AREA</span>
                  <span className="text-sm font-bold text-white">
                    {selectedIdea.entryMin} - {selectedIdea.entryMax}
                  </span>
                </div>
                <div className="p-3 bg-[#080B12] rounded-sm border border-white/10">
                  <span className="text-[10px] text-gray-500 block font-sans tracking-wider">STOP LOSS</span>
                  <span className="text-sm font-bold text-[#FF3131]">
                    {selectedIdea.stopLoss}
                  </span>
                </div>
                <div className="p-3 bg-[#080B12] rounded-sm border border-white/10">
                  <span className="text-[10px] text-gray-500 block font-sans tracking-wider">TARGET 1</span>
                  <span className="text-sm font-bold text-[#00FF95]">
                    {selectedIdea.takeProfit1}
                  </span>
                </div>
                <div className="p-3 bg-[#080B12] rounded-sm border border-white/10">
                  <span className="text-[10px] text-gray-500 block font-sans tracking-wider">TARGET 2</span>
                  <span className="text-sm font-bold text-yellow-500">
                    {selectedIdea.takeProfit2 || '—'}
                  </span>
                </div>
              </div>

              {/* Technical Reasoning */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-yellow-500 font-mono">
                  Analisis & Rasionalisasi Setup
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed bg-[#080B12] p-4 rounded-sm border border-white/5 font-sans">
                  {selectedIdea.reasoning}
                </p>
              </div>

              {/* Author Card */}
              <div className="flex items-center justify-between p-3.5 bg-[#080B12] rounded-sm border border-white/10">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedIdea.author.avatar}
                    alt={selectedIdea.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-yellow-500/40"
                  />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-xs text-white">
                        {selectedIdea.author.name}
                      </span>
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <span className="text-[11px] text-gray-400">
                      {selectedIdea.author.role}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-gray-400">
                  Dipublikasi: {selectedIdea.publishedAt}
                </span>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/10 bg-[#080B12]">
              <button
                onClick={() => {
                  setSelectedSymbol(selectedIdea.symbol);
                  setActiveTab(selectedIdea.symbol === 'XAUUSD' ? 'gold' : 'markets');
                  setSelectedIdea(null);
                }}
                className="text-xs font-semibold text-yellow-500 hover:text-yellow-400 flex items-center gap-1 cursor-pointer"
              >
                <span>Buka Chart Lengkap</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    openPosition(
                      selectedIdea.symbol,
                      selectedIdea.direction,
                      0.1,
                      selectedIdea.stopLoss,
                      selectedIdea.takeProfit1
                    );
                    setSelectedIdea(null);
                  }}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-sm shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Salin Setup ke Akun Demo (0.1 Lot)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
