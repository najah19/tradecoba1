import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { BREAKING_NEWS } from '../../data/mockData';
import { NewsArticle } from '../../types';
import { 
  Newspaper, 
  Clock, 
  Flame, 
  ArrowUpRight, 
  X, 
  Share2, 
  CheckCircle2, 
  Bookmark,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export const BreakingNewsSection: React.FC = () => {
  const { setSelectedSymbol, setActiveTab, addToast } = useMarket();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Breaking', 'Gold', 'Forex', 'Economy', 'Indices', 'Commodities'];

  const filteredNews = BREAKING_NEWS.filter((art) => {
    if (activeCategory === 'Semua') return true;
    if (activeCategory === 'Breaking') return art.isBreaking;
    return art.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const handleShare = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    addToast('success', 'Tautan Disalin', `Tautan artikel "${title}" berhasil disalin ke clipboard.`);
  };

  return (
    <section id="breaking-news-section" className="py-12 bg-[#080B12] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-[#FF3131] animate-pulse" />
              <span className="text-[#FF3131] font-mono text-xs font-bold uppercase tracking-widest">
                Real-Time Wire
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Breaking Market News & Riset
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Informasi terkini yang menggerakkan volatilitas pasar komoditas, forex, dan bursa saham global.
            </p>
          </div>

          {/* Categories */}
          <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 p-1 bg-[#10151F] rounded-lg border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-yellow-500 text-black font-bold shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredNews.map((article) => {
            return (
              <div
                key={article.id}
                id={`news-card-${article.id}`}
                onClick={() => setSelectedArticle(article)}
                className="cursor-pointer group bg-[#10151F] hover:bg-[#141B28] border border-white/10 hover:border-yellow-500/40 rounded-lg p-4 transition-all duration-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Category & Time */}
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span
                      className={`px-2 py-0.5 rounded-sm font-mono font-bold text-[10px] uppercase border ${
                        article.isBreaking
                          ? 'bg-[#FF3131]/10 text-[#FF3131] border-[#FF3131]/30'
                          : 'bg-white/5 text-gray-300 border-white/10'
                      }`}
                    >
                      {article.isBreaking ? 'BREAKING' : article.category}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-500 text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>{article.timeAgo}</span>
                    </div>
                  </div>

                  {/* Headline */}
                  <h3 className="text-sm font-bold text-white group-hover:text-yellow-500 transition leading-snug line-clamp-3">
                    {article.title}
                  </h3>

                  {/* Subtitle / Excerpt */}
                  <p className="text-xs text-gray-400 line-clamp-2 mt-2 leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>

                {/* Footer Tag & Author */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                  <div className="flex items-center space-x-1.5">
                    {article.relatedSymbols.slice(0, 2).map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded-sm bg-white/5 font-mono text-[10px] text-yellow-500 border border-white/5">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 font-mono">{article.readTime}</span>
                    <button
                      onClick={(e) => handleShare(article.title, e)}
                      className="text-gray-500 hover:text-white p-1 cursor-pointer"
                      title="Bagikan artikel"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Article Detail Reader Modal (Section 19) */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#10151F] border border-white/15 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-[#080B12]">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-sm bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 font-mono font-bold text-xs uppercase">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {selectedArticle.timeAgo} • {selectedArticle.readTime}
                </span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 text-gray-400 hover:text-white rounded-sm hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  {selectedArticle.title}
                </h1>
                <p className="text-sm text-gray-300 font-medium mt-2 leading-relaxed">
                  {selectedArticle.subtitle}
                </p>
                <div className="text-xs text-gray-400 mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span>Ditulis oleh: <strong className="text-white">{selectedArticle.author.name}</strong> ({selectedArticle.author.role})</span>
                  <button
                    onClick={(e) => handleShare(selectedArticle.title, e)}
                    className="flex items-center space-x-1 text-yellow-500 hover:text-yellow-400 font-semibold cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Bagikan Berita</span>
                  </button>
                </div>
              </div>

              {/* Key Takeaways Box */}
              <div className="p-4 bg-[#080B12] rounded-sm border border-yellow-500/30 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-yellow-500 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                  Key Takeaways untuk Trader
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {selectedArticle.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-yellow-500 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Paragraphs */}
              <div className="space-y-3.5 text-xs sm:text-sm text-gray-300 leading-relaxed">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Related Instruments Chips */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs text-gray-400 block mb-2 font-mono">
                  Instrumen Pasar Terpengaruh:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.relatedSymbols.map((sym) => (
                    <button
                      key={sym}
                      onClick={() => {
                        setSelectedSymbol(sym);
                        setActiveTab(sym === 'XAUUSD' ? 'gold' : 'markets');
                        setSelectedArticle(null);
                      }}
                      className="px-3 py-1 bg-white/5 hover:bg-yellow-500 hover:text-black text-gray-200 rounded-sm text-xs font-mono font-bold border border-white/10 transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>{sym}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-white/10 bg-[#080B12] text-xs">
              <span className="text-gray-500">
                Sumber: Global Intelligence Wire & Institutional Research
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-sm font-medium cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
