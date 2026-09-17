import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CandleData, MarketQuote } from '../../types';
import { generateCandles, calculateEMA, calculateRSI, formatPrice } from '../../utils/technicalIndicators';
import { 
  TrendingUp, 
  BarChart2, 
  Activity, 
  Layers, 
  Maximize2, 
  Minimize2, 
  Crosshair,
  Minus,
  Sliders,
  DollarSign,
  Info
} from 'lucide-react';
import { useMarket } from '../../context/MarketContext';

interface TradingChartProps {
  quote: MarketQuote;
  height?: number;
  showOrderPanel?: boolean;
}

export const TradingChart: React.FC<TradingChartProps> = ({ 
  quote, 
  height = 480,
  showOrderPanel = true 
}) => {
  const { openPosition } = useMarket();
  const [timeframe, setTimeframe] = useState<string>('1H');
  const [chartType, setChartType] = useState<'candle' | 'line' | 'area'>('candle');
  const [showEMA20, setShowEMA20] = useState<boolean>(true);
  const [showEMA50, setShowEMA50] = useState<boolean>(true);
  const [showBollinger, setShowBollinger] = useState<boolean>(false);
  const [showRSI, setShowRSI] = useState<boolean>(true);
  const [activeDrawingTool, setActiveDrawingTool] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hoveredCandle, setHoveredCandle] = useState<{ candle: CandleData; index: number } | null>(null);
  const [quickLot, setQuickLot] = useState<number>(0.1);
  const [chartWidth, setChartWidth] = useState<number>(800);

  const containerRef = useRef<HTMLDivElement>(null);

  // ResizeObserver for responsive canvas/SVG
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setChartWidth(Math.floor(entry.contentRect.width));
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Generate historical candles based on current quote price & timeframe
  const candles = useMemo(() => {
    return generateCandles(quote.bid, timeframe, 55);
  }, [quote.symbol, timeframe]);

  // Derived calculations
  const ema20 = useMemo(() => calculateEMA(candles, 20), [candles]);
  const ema50 = useMemo(() => calculateEMA(candles, 50), [candles]);
  const rsiValues = useMemo(() => calculateRSI(candles, 14), [candles]);

  // Bounds
  const { minPrice, maxPrice, maxVolume } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    let vol = 0;
    candles.forEach((c) => {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
      if (c.volume > vol) vol = c.volume;
    });
    const padding = (max - min) * 0.08;
    return {
      minPrice: min - padding,
      maxPrice: max + padding,
      maxVolume: vol || 1000,
    };
  }, [candles]);

  // Dimensions
  const rsiHeight = showRSI ? 80 : 0;
  const mainHeight = height - rsiHeight - 50;
  const paddingRight = 75; // for price axis
  const paddingBottom = 25; // for time axis
  const usableWidth = Math.max(300, chartWidth - paddingRight - 10);
  const candleSpacing = usableWidth / candles.length;
  const candleBodyWidth = Math.max(2, Math.min(12, candleSpacing * 0.7));

  // Coordinate mappers
  const getY = (price: number) => {
    if (maxPrice === minPrice) return mainHeight / 2;
    return mainHeight - ((price - minPrice) / (maxPrice - minPrice)) * mainHeight;
  };

  const getX = (index: number) => {
    return index * candleSpacing + candleSpacing / 2;
  };

  const getRsiY = (rsiVal: number) => {
    // 0 to 100 mapped to rsiHeight
    return mainHeight + 40 + (1 - rsiVal / 100) * (rsiHeight - 20);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const index = Math.floor(x / candleSpacing);
    if (index >= 0 && index < candles.length) {
      setHoveredCandle({ candle: candles[index], index });
    }
  };

  const activeCandle = hoveredCandle ? hoveredCandle.candle : candles[candles.length - 1];

  return (
    <div 
      ref={containerRef}
      id="trading-chart-container"
      className={`relative flex flex-col bg-[#10151F] border border-white/10 rounded-lg overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen' : 'w-full'
      }`}
    >
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#080B12] border-b border-white/10 gap-2">
        {/* Timeframes */}
        <div className="flex items-center space-x-1">
          {['1m', '5m', '15m', '30m', '1H', '4H', '1D', '1W'].map((tf) => (
            <button
              key={tf}
              id={`tf-btn-${tf}`}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded-sm transition-colors cursor-pointer ${
                timeframe === tf
                  ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart Types */}
        <div className="flex items-center space-x-1 border-x border-white/10 px-2">
          <button
            id="chart-candle-btn"
            onClick={() => setChartType('candle')}
            className={`p-1.5 rounded-sm text-xs transition-colors cursor-pointer ${chartType === 'candle' ? 'bg-white/10 text-yellow-500' : 'text-gray-400 hover:text-white'}`}
            title="Candlestick"
          >
            <BarChart2 className="w-4 h-4" />
          </button>
          <button
            id="chart-line-btn"
            onClick={() => setChartType('line')}
            className={`p-1.5 rounded-sm text-xs transition-colors cursor-pointer ${chartType === 'line' ? 'bg-white/10 text-yellow-500' : 'text-gray-400 hover:text-white'}`}
            title="Line Chart"
          >
            <TrendingUp className="w-4 h-4" />
          </button>
          <button
            id="chart-area-btn"
            onClick={() => setChartType('area')}
            className={`p-1.5 rounded-sm text-xs transition-colors cursor-pointer ${chartType === 'area' ? 'bg-white/10 text-yellow-500' : 'text-gray-400 hover:text-white'}`}
            title="Area Chart"
          >
            <Activity className="w-4 h-4" />
          </button>
        </div>

        {/* Indicators Toggles */}
        <div className="flex items-center space-x-2">
          <button
            id="indicator-ema20"
            onClick={() => setShowEMA20(!showEMA20)}
            className={`flex items-center space-x-1 px-2 py-1 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
              showEMA20 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
            <span>EMA 20</span>
          </button>
          <button
            id="indicator-ema50"
            onClick={() => setShowEMA50(!showEMA50)}
            className={`flex items-center space-x-1 px-2 py-1 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
              showEMA50 ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block"></span>
            <span>EMA 50</span>
          </button>
          <button
            id="indicator-rsi"
            onClick={() => setShowRSI(!showRSI)}
            className={`flex items-center space-x-1 px-2 py-1 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
              showRSI ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 inline-block"></span>
            <span>RSI(14)</span>
          </button>
        </div>

        {/* Drawing Tools & Fullscreen */}
        <div className="flex items-center space-x-1">
          <button
            id="tool-trendline"
            onClick={() => setActiveDrawingTool(activeDrawingTool === 'trend' ? null : 'trend')}
            className={`p-1.5 rounded-sm text-xs transition-colors cursor-pointer ${activeDrawingTool === 'trend' ? 'bg-yellow-500 text-black font-bold' : 'text-gray-400 hover:bg-white/5'}`}
            title="Trendline Drawing"
          >
            <Minus className="w-4 h-4 rotate-45" />
          </button>
          <button
            id="tool-horiz"
            onClick={() => setActiveDrawingTool(activeDrawingTool === 'horiz' ? null : 'horiz')}
            className={`p-1.5 rounded-sm text-xs transition-colors cursor-pointer ${activeDrawingTool === 'horiz' ? 'bg-yellow-500 text-black font-bold' : 'text-gray-400 hover:bg-white/5'}`}
            title="Horizontal Support / Resistance"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            id="tool-fibo"
            onClick={() => setActiveDrawingTool(activeDrawingTool === 'fibo' ? null : 'fibo')}
            className={`p-1.5 rounded-sm text-xs transition-colors cursor-pointer ${activeDrawingTool === 'fibo' ? 'bg-yellow-500 text-black font-bold' : 'text-gray-400 hover:bg-white/5'}`}
            title="Fibonacci Retracement"
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            id="tool-fullscreen"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-sm text-gray-400 hover:bg-white/5 hover:text-white cursor-pointer"
            title={isFullscreen ? 'Keluar Fullscreen' : 'Layar Penuh'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* OHLC Bar Display */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-1.5 bg-[#080B12] text-xs font-mono text-gray-400 border-b border-white/5">
        <span className="text-white font-bold">{quote.symbol}</span>
        <span>TF: <strong className="text-yellow-500">{timeframe}</strong></span>
        <span>O: <strong className="text-white">{formatPrice(activeCandle.open, quote.digits)}</strong></span>
        <span>H: <strong className="text-[#00FF95]">{formatPrice(activeCandle.high, quote.digits)}</strong></span>
        <span>L: <strong className="text-[#FF3131]">{formatPrice(activeCandle.low, quote.digits)}</strong></span>
        <span>C: <strong className={activeCandle.close >= activeCandle.open ? 'text-[#00FF95]' : 'text-[#FF3131]'}>{formatPrice(activeCandle.close, quote.digits)}</strong></span>
        <span>Vol: <strong className="text-gray-300">{activeCandle.volume.toLocaleString()}</strong></span>
        {activeDrawingTool && (
          <span className="ml-auto text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-sm border border-yellow-500/20 flex items-center gap-1 text-[11px]">
            <Sliders className="w-3 h-3" /> Tool Aktif: {activeDrawingTool.toUpperCase()}
          </span>
        )}
      </div>

      {/* Main SVG Chart Canvas */}
      <div className="relative flex-1 bg-[#080B12] select-none">
        <svg
          width={chartWidth}
          height={height}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredCandle(null)}
          className="cursor-crosshair w-full h-full block"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EAB308" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EAB308" stopOpacity="0.0" />
            </linearGradient>
            <pattern id="gridPattern" width="60" height="40" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 40" fill="none" stroke="#121826" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width={usableWidth} height={mainHeight} fill="url(#gridPattern)" />

          {/* Horizontal Price Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const priceVal = minPrice + (maxPrice - minPrice) * ratio;
            const y = getY(priceVal);
            return (
              <g key={ratio}>
                <line x1={0} y1={y} x2={usableWidth} y2={y} stroke="#1b2438" strokeWidth="0.8" strokeDasharray="3 3" />
                <text x={usableWidth + 8} y={y + 4} fill="#6b7280" fontSize="10" fontFamily="JetBrains Mono, monospace">
                  {formatPrice(priceVal, quote.digits)}
                </text>
              </g>
            );
          })}

          {/* Active Drawing Tool Overlays */}
          {activeDrawingTool === 'horiz' && (
            <g>
              <line x1={0} y1={getY(quote.bid)} x2={usableWidth} y2={getY(quote.bid)} stroke="#EAB308" strokeWidth="1.5" strokeDasharray="4 2" />
              <rect x={usableWidth + 4} y={getY(quote.bid) - 9} width="66" height="18" fill="#EAB308" rx="2" />
              <text x={usableWidth + 8} y={getY(quote.bid) + 4} fill="#000000" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
                S/R {formatPrice(quote.bid, quote.digits)}
              </text>
            </g>
          )}

          {activeDrawingTool === 'fibo' && (
            <g>
              {[0, 0.236, 0.382, 0.5, 0.618, 1].map((lvl) => {
                const fiboPrice = minPrice + (maxPrice - minPrice) * lvl;
                const fy = getY(fiboPrice);
                return (
                  <g key={lvl}>
                    <line x1={0} y1={fy} x2={usableWidth} y2={fy} stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
                    <text x={10} y={fy - 3} fill="#06b6d4" fontSize="9" fontFamily="JetBrains Mono">
                      Fibo {(lvl * 100).toFixed(1)}% ({formatPrice(fiboPrice, quote.digits)})
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* Volume Bars at Bottom of Main Chart */}
          {candles.map((c, i) => {
            const x = getX(i);
            const volHeight = (c.volume / maxVolume) * 45;
            const y = mainHeight - volHeight;
            const isBullish = c.close >= c.open;
            return (
              <rect
                key={`vol-${i}`}
                x={x - candleBodyWidth / 2}
                y={y}
                width={candleBodyWidth}
                height={volHeight}
                fill={isBullish ? '#00FF95' : '#FF3131'}
                opacity="0.3"
              />
            );
          })}

          {/* Render Area or Line if chosen */}
          {chartType === 'area' && (
            <path
              d={
                `M ${getX(0)} ${mainHeight} ` +
                candles.map((c, i) => `L ${getX(i)} ${getY(c.close)}`).join(' ') +
                ` L ${getX(candles.length - 1)} ${mainHeight} Z`
              }
              fill="url(#areaGradient)"
            />
          )}

          {(chartType === 'line' || chartType === 'area') && (
            <path
              d={candles.map((c, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(c.close)}`).join(' ')}
              fill="none"
              stroke="#EAB308"
              strokeWidth="2"
            />
          )}

          {/* Render Candlesticks */}
          {chartType === 'candle' &&
            candles.map((c, i) => {
              const x = getX(i);
              const isBullish = c.close >= c.open;
              const color = isBullish ? '#00FF95' : '#FF3131';
              const highY = getY(c.high);
              const lowY = getY(c.low);
              const openY = getY(c.open);
              const closeY = getY(c.close);
              const bodyTop = Math.min(openY, closeY);
              const bodyHeight = Math.max(1.5, Math.abs(closeY - openY));

              return (
                <g key={`candle-${i}`}>
                  {/* High/Low Wick */}
                  <line x1={x} y1={highY} x2={x} y2={lowY} stroke={color} strokeWidth="1.2" />
                  {/* Candle Body */}
                  <rect
                    x={x - candleBodyWidth / 2}
                    y={bodyTop}
                    width={candleBodyWidth}
                    height={bodyHeight}
                    fill={color}
                    rx="0.5"
                  />
                </g>
              );
            })}

          {/* EMA 20 Path */}
          {showEMA20 && (
            <path
              d={ema20
                .map((val, i) => (val !== null ? `${i === 19 ? 'M' : 'L'} ${getX(i)} ${getY(val)}` : ''))
                .filter(Boolean)
                .join(' ')}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              opacity="0.85"
            />
          )}

          {/* EMA 50 Path */}
          {showEMA50 && (
            <path
              d={ema50
                .map((val, i) => (val !== null ? `${i === 49 ? 'M' : 'L'} ${getX(i)} ${getY(val)}` : ''))
                .filter(Boolean)
                .join(' ')}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.5"
              opacity="0.85"
            />
          )}

          {/* Current Live Price Horizontal Marker */}
          <line
            x1={0}
            y1={getY(quote.bid)}
            x2={usableWidth}
            y2={getY(quote.bid)}
            stroke="#10b981"
            strokeWidth="1.2"
            strokeDasharray="4 2"
          />
          <g transform={`translate(${usableWidth}, ${getY(quote.bid) - 9})`}>
            <rect width="72" height="18" fill="#10b981" rx="2" />
            <text x="5" y="13" fill="#080b12" fontSize="10.5" fontWeight="bold" fontFamily="JetBrains Mono">
              {formatPrice(quote.bid, quote.digits)}
            </text>
          </g>

          {/* Crosshair when hovering */}
          {hoveredCandle && (
            <g>
              <line
                x1={getX(hoveredCandle.index)}
                y1={0}
                x2={getX(hoveredCandle.index)}
                y2={height}
                stroke="#94a3b8"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
              <line
                x1={0}
                y1={getY(hoveredCandle.candle.close)}
                x2={usableWidth}
                y2={getY(hoveredCandle.candle.close)}
                stroke="#94a3b8"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
              {/* Floating Price Tag on Axis */}
              <g transform={`translate(${usableWidth}, ${getY(hoveredCandle.candle.close) - 8})`}>
                <rect width="70" height="16" fill="#334155" rx="2" />
                <text x="4" y="12" fill="#f8fafc" fontSize="10" fontFamily="JetBrains Mono">
                  {formatPrice(hoveredCandle.candle.close, quote.digits)}
                </text>
              </g>
              {/* Floating Time Tag on Bottom */}
              <g transform={`translate(${getX(hoveredCandle.index) - 25}, ${mainHeight + 5})`}>
                <rect width="50" height="16" fill="#334155" rx="2" />
                <text x="25" y="12" textAnchor="middle" fill="#f8fafc" fontSize="9" fontFamily="JetBrains Mono">
                  {hoveredCandle.candle.time}
                </text>
              </g>
            </g>
          )}

          {/* RSI Sub-Panel */}
          {showRSI && (
            <g transform={`translate(0, 0)`}>
              {/* Divider */}
              <line x1={0} y1={mainHeight + 25} x2={usableWidth} y2={mainHeight + 25} stroke="#1e293b" strokeWidth="1" />
              {/* Label */}
              <text x="10" y={mainHeight + 38} fill="#a855f7" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">
                RSI (14): {rsiValues[candles.length - 1] ?? '58.2'}
              </text>
              {/* Level 70 Overbought */}
              <line x1={0} y1={getRsiY(70)} x2={usableWidth} y2={getRsiY(70)} stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.6" />
              <text x={usableWidth + 6} y={getRsiY(70) + 3} fill="#ef4444" fontSize="9" fontFamily="JetBrains Mono">70</text>
              {/* Level 30 Oversold */}
              <line x1={0} y1={getRsiY(30)} x2={usableWidth} y2={getRsiY(30)} stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.6" />
              <text x={usableWidth + 6} y={getRsiY(30) + 3} fill="#10b981" fontSize="9" fontFamily="JetBrains Mono">30</text>

              {/* RSI Curve */}
              <path
                d={rsiValues
                  .map((val, i) => (val !== null ? `${i === 14 ? 'M' : 'L'} ${getX(i)} ${getRsiY(val)}` : ''))
                  .filter(Boolean)
                  .join(' ')}
                fill="none"
                stroke="#c084fc"
                strokeWidth="1.5"
              />
            </g>
          )}
        </svg>

        {/* Floating Quick Order Action Panel */}
        {showOrderPanel && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#10151F]/95 backdrop-blur-md p-2 rounded-sm border border-white/10 shadow-2xl">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono">Quick Trade</span>
              <div className="flex items-center gap-1 mt-0.5">
                {[0.01, 0.05, 0.1, 0.5, 1.0].map((l) => (
                  <button
                    key={l}
                    onClick={() => setQuickLot(l)}
                    className={`px-1.5 py-0.5 text-[10px] font-mono rounded-sm cursor-pointer ${
                      quickLot === l ? 'bg-yellow-500 text-black font-bold' : 'text-gray-400 bg-white/5 hover:text-white border border-white/5'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-7 w-px bg-white/10 mx-1"></div>

            {/* Instant Sell Button */}
            <button
              id="chart-quick-sell-btn"
              onClick={() => openPosition(quote.symbol, 'SELL', quickLot)}
              className="px-3 py-1.5 bg-[#FF3131] hover:bg-[#e62929] text-white rounded-sm font-mono font-bold text-xs flex flex-col items-center transition shadow-sm cursor-pointer"
            >
              <span>SELL</span>
              <span className="text-[10px] font-normal tracking-tighter">{formatPrice(quote.bid, quote.digits)}</span>
            </button>

            {/* Instant Buy Button */}
            <button
              id="chart-quick-buy-btn"
              onClick={() => openPosition(quote.symbol, 'BUY', quickLot)}
              className="px-3 py-1.5 bg-[#00FF95] hover:bg-[#00e685] text-black rounded-sm font-mono font-bold text-xs flex flex-col items-center transition shadow-sm cursor-pointer"
            >
              <span>BUY</span>
              <span className="text-[10px] font-normal tracking-tighter">{formatPrice(quote.ask, quote.digits)}</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#080B12] border-t border-white/5 text-xs text-gray-400 font-mono">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF95] animate-pulse"></span>
            <span className="font-medium text-[#00FF95]">Feed Aktif: Realtime Simulation</span>
          </span>
          <span className="text-gray-700">•</span>
          <span>Spread: <strong className="text-yellow-500 font-mono">{quote.spread}</strong></span>
          <span className="text-gray-700">•</span>
          <span>Day Range: <strong className="text-white font-mono">{formatPrice(quote.low, quote.digits)} - {formatPrice(quote.high, quote.digits)}</strong></span>
        </div>
        <div className="text-[10px] text-gray-500 hidden sm:block">
          Tekan dan geser kursor untuk inspeksi detail candlestick & indikator
        </div>
      </div>
    </div>
  );
};
