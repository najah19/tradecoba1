import React, { useRef } from 'react';
import { useMarket } from '../../context/MarketContext';
import { formatPrice, formatPercent } from '../../utils/technicalIndicators';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const MarketTicker: React.FC = () => {
  const { quotes, setSelectedSymbol, setActiveTab } = useMarket();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -260 : 260,
        behavior: 'smooth',
      });
    }
  };

  const handleSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
    if (symbol === 'XAUUSD') {
      setActiveTab('gold');
    } else {
      setActiveTab('markets');
    }
  };

  return (
    <div id="global-market-ticker" className="relative w-full bg-[#10151F] border-b border-white/10 text-xs select-none z-30">
      <div className="flex items-center">
        {/* Market Status Label */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-[#080B12] border-r border-white/10 text-gray-400 font-mono text-[10px] uppercase tracking-widest shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#00FF95] animate-pulse"></span>
          <span className="font-semibold text-gray-300">LIVE FEED</span>
        </div>

        {/* Scroll Left Button */}
        <button
          onClick={() => handleScroll('left')}
          className="hidden sm:flex items-center justify-center w-6 h-full text-gray-400 hover:text-white bg-[#10151F] hover:bg-white/5 shrink-0 z-10 transition border-r border-white/5"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Ticker Scrollable Strip */}
        <div
          ref={scrollRef}
          className="flex items-center overflow-x-auto no-scrollbar scroll-smooth py-1.5 px-3 gap-6 text-[10px] font-mono tracking-tighter"
          style={{ scrollbarWidth: 'none' }}
        >
          {quotes.map((q) => {
            const isPositive = q.change >= 0;
            const isGold = q.symbol === 'XAUUSD';
            return (
              <button
                key={q.symbol}
                id={`ticker-item-${q.symbol}`}
                onClick={() => handleSelect(q.symbol)}
                className="flex items-center space-x-2 px-1.5 py-0.5 rounded-sm hover:bg-white/5 transition shrink-0 group text-left cursor-pointer"
              >
                <span className={`font-bold ${isGold ? 'text-yellow-500' : 'text-gray-400 group-hover:text-white'}`}>
                  {q.symbol}
                </span>

                <span className="text-white font-medium">
                  {formatPrice(q.bid, q.digits)}
                </span>

                <span className={`font-medium ${isPositive ? 'text-[#00FF95]' : 'text-[#FF3131]'}`}>
                  {formatPercent(q.changePercent)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => handleScroll('right')}
          className="hidden sm:flex items-center justify-center w-6 h-full text-gray-400 hover:text-white bg-[#10151F] hover:bg-white/5 shrink-0 z-10 transition border-l border-white/5"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
