import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { AssetCategory, MarketQuote } from '../../types';
import { formatPrice, formatPercent } from '../../utils/technicalIndicators';
import { Star, TrendingUp, TrendingDown, ArrowUpRight, Filter, ChevronRight } from 'lucide-react';

export const MarketOverview: React.FC = () => {
  const { quotes, setSelectedSymbol, setActiveTab, toggleWatchlist, isInWatchlist } = useMarket();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Pasar' },
    { id: 'gold', label: 'Gold & Metals' },
    { id: 'forex', label: 'Forex Major' },
    { id: 'indices', label: 'Indices AS & Global' },
    { id: 'commodities', label: 'Commodities / Oil' },
    { id: 'crypto', label: 'Crypto & Assets' },
  ];

  const filteredQuotes = quotes.filter((q) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'gold') return q.category === 'gold' || q.symbol === 'SILVER';
    return q.category === selectedCategory;
  });

  const handleCardClick = (quote: MarketQuote) => {
    setSelectedSymbol(quote.symbol);
    if (quote.symbol === 'XAUUSD') {
      setActiveTab('gold');
    } else {
      setActiveTab('markets');
    }
  };

  return (
    <section id="market-overview-section" className="py-12 bg-[#080B12] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span className="text-yellow-500 font-mono text-xs font-bold uppercase tracking-widest">
                Live Pricing Terminal
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Market Overview
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Pantau harga bid/ask, rentang harian, dan tren pergerakan aset global secara terintegrasi.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 p-1 bg-[#10151F] rounded-lg border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-yellow-500 text-black font-bold shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Market Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredQuotes.map((q) => {
            const isBullish = q.change >= 0;
            const inWatchlist = isInWatchlist(q.symbol);

            return (
              <div
                key={q.symbol}
                id={`market-card-${q.symbol}`}
                className="group relative bg-[#10151F] hover:bg-[#141B28] border border-white/10 hover:border-yellow-500/40 rounded-lg p-4 transition-all duration-200 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Symbol, Category & Watchlist Star */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-mono font-bold text-base ${q.symbol === 'XAUUSD' ? 'text-yellow-500' : 'text-white'}`}>
                          {q.symbol}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-white/5 text-gray-400 font-mono uppercase border border-white/5">
                          {q.category}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 truncate max-w-[170px] mt-0.5">
                        {q.name}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchlist(q.symbol);
                      }}
                      className={`p-1.5 rounded-sm hover:bg-white/5 transition cursor-pointer ${
                        inWatchlist ? 'text-yellow-500' : 'text-gray-600 hover:text-gray-400'
                      }`}
                      title={inWatchlist ? 'Hapus dari watchlist' : 'Tambahkan ke watchlist'}
                    >
                      <Star className={`w-4 h-4 ${inWatchlist ? 'fill-yellow-500' : ''}`} />
                    </button>
                  </div>

                  {/* Main Price & % Change */}
                  <div className="mt-4 flex items-baseline justify-between">
                    <div className="text-xl font-bold font-mono text-white">
                      {formatPrice(q.bid, q.digits)}
                    </div>
                    <div
                      className={`flex items-center text-xs font-mono font-bold px-2 py-0.5 rounded-sm border ${
                        isBullish ? 'bg-[#00FF95]/10 text-[#00FF95] border-[#00FF95]/30' : 'bg-[#FF3131]/10 text-[#FF3131] border-[#FF3131]/30'
                      }`}
                    >
                      {isBullish ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {formatPercent(q.changePercent)}
                    </div>
                  </div>

                  {/* High, Low & Spread Details */}
                  <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 text-[11px] font-mono text-gray-400">
                    <div>
                      <span className="text-[10px] text-gray-500 block">Spread</span>
                      <span className="text-gray-200">{q.spread}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Low</span>
                      <span className="text-[#FF3131] font-medium">{formatPrice(q.low, q.digits)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">High</span>
                      <span className="text-[#00FF95] font-medium">{formatPrice(q.high, q.digits)}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <div className="mt-4 pt-2">
                  <button
                    id={`view-market-${q.symbol}`}
                    onClick={() => handleCardClick(q)}
                    className="w-full py-1.5 px-3 bg-white/5 hover:bg-yellow-500 hover:text-black text-gray-300 font-semibold text-xs rounded-sm transition-all flex items-center justify-center space-x-1.5 border border-white/10 hover:border-transparent cursor-pointer shadow-sm"
                  >
                    <span>Analisis & Buka Chart</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
