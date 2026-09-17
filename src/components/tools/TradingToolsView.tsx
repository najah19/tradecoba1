import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { 
  Calculator, 
  ShieldCheck, 
  Percent, 
  DollarSign, 
  Scale, 
  PieChart, 
  RefreshCw, 
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';
import { 
  calculatePositionSize, 
  calculatePipValue, 
  calculateMarginRequired, 
  calculateFibonacci,
  formatCurrencyIdr 
} from '../../utils/technicalIndicators';

export const TradingToolsView: React.FC = () => {
  const { quotes, accountBalance, selectedSymbol, setSelectedSymbol, setActiveTab, openPosition } = useMarket();

  const [activeToolTab, setActiveToolTab] = useState<'lot' | 'pip' | 'margin' | 'fibonacci'>('lot');

  // Lot Calculator State
  const [balanceInput, setBalanceInput] = useState<number>(accountBalance);
  const [riskPercent, setRiskPercent] = useState<number>(1.5);
  const [toolSymbol, setToolSymbol] = useState<string>(selectedSymbol || 'XAUUSD');
  const [entryPrice, setEntryPrice] = useState<number>(3452.80);
  const [stopLossPrice, setStopLossPrice] = useState<number>(3438.00);

  // Pip Calculator State
  const [pipLots, setPipLots] = useState<number>(1.0);

  // Margin Calculator State
  const [marginLeverage, setMarginLeverage] = useState<number>(200);
  const [marginLots, setMarginLots] = useState<number>(1.0);

  // Fibonacci State
  const [fibHigh, setFibHigh] = useState<number>(3465.00);
  const [fibLow, setFibLow] = useState<number>(3420.00);
  const [fibTrend, setFibTrend] = useState<'UPTREND' | 'DOWNTREND'>('UPTREND');

  // Calculate outputs
  const currentQuote = quotes.find((q) => q.symbol === toolSymbol) || quotes[0];
  const lotResult = calculatePositionSize(balanceInput, riskPercent, entryPrice, stopLossPrice, toolSymbol);
  const pipValueResult = calculatePipValue(toolSymbol, pipLots);
  const marginResult = calculateMarginRequired(toolSymbol, marginLots, currentQuote.bid, marginLeverage);
  const fibResult = calculateFibonacci(fibHigh, fibLow, fibTrend);

  return (
    <div id="trading-tools-page" className="py-10 bg-[#080B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-500 font-mono text-xs font-bold uppercase tracking-widest">
                Risk Management Suite
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Trading Tools & Kalkulator Risiko
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Hindari overtrading dan kelola modal Anda dengan kalkulator presisi standar institusional.
            </p>
          </div>

          {/* Tool Switcher Tabs */}
          <div className="flex items-center overflow-x-auto no-scrollbar gap-1 p-1 bg-[#10151F] rounded-lg border border-white/10">
            {[
              { id: 'lot', label: '1. Position Size (Lot)' },
              { id: 'pip', label: '2. Nilai Pip (USD/IDR)' },
              { id: 'margin', label: '3. Margin & Leverage' },
              { id: 'fibonacci', label: '4. Fibonacci Retracement' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveToolTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                  activeToolTab === tab.id
                    ? 'bg-yellow-500 text-black font-bold shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Position Size / Risk Calculator */}
        {activeToolTab === 'lot' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-7 bg-[#10151F] rounded-lg border border-white/10 p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-yellow-500" />
                  Parameter Risiko & Posisi
                </h3>
                <span className="text-xs font-mono text-gray-400">Model: Fixed Fractional Risk</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Account Balance */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1 font-medium">Saldo Akun (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono">$</span>
                    <input
                      type="number"
                      value={balanceInput}
                      onChange={(e) => setBalanceInput(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                  <div className="flex gap-1.5 mt-1.5">
                    {[1000, 5000, 10000, 25000].map((b) => (
                      <button
                        key={b}
                        onClick={() => setBalanceInput(b)}
                        className="text-[10px] px-2 py-0.5 rounded-sm bg-white/5 hover:bg-white/10 text-gray-300 font-mono border border-white/5 cursor-pointer"
                      >
                        ${b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Risk Percentage */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1 font-medium">Toleransi Risiko (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={riskPercent}
                      onChange={(e) => setRiskPercent(Number(e.target.value))}
                      className="w-full pl-3 pr-8 py-2 bg-[#080B12] border border-white/10 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-yellow-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono">%</span>
                  </div>
                  <div className="flex gap-1.5 mt-1.5">
                    {[0.5, 1.0, 1.5, 2.0].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRiskPercent(r)}
                        className="text-[10px] px-2 py-0.5 rounded-sm bg-white/5 hover:bg-white/10 text-gray-300 font-mono border border-white/5 cursor-pointer"
                      >
                        {r}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Symbol Select */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1 font-medium">Pilih Instrumen</label>
                  <select
                    value={toolSymbol}
                    onChange={(e) => {
                      setToolSymbol(e.target.value);
                      const q = quotes.find((x) => x.symbol === e.target.value);
                      if (q) {
                        setEntryPrice(q.bid);
                        setStopLossPrice(q.bid * 0.995);
                      }
                    }}
                    className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-yellow-500"
                  >
                    {quotes.map((q) => (
                      <option key={q.symbol} value={q.symbol}>
                        {q.symbol} ({q.name})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Entry Price */}
                <div>
                  <label className="text-xs text-gray-400 block mb-1 font-medium">Harga Entry Direncanakan</label>
                  <input
                    type="number"
                    step="0.01"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-yellow-500"
                  />
                </div>

                {/* Stop Loss Price */}
                <div className="sm:col-span-2">
                  <label className="text-xs text-gray-400 block mb-1 font-medium">Level Stop Loss</label>
                  <input
                    type="number"
                    step="0.01"
                    value={stopLossPrice}
                    onChange={(e) => setStopLossPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-yellow-500"
                  />
                  <span className="text-[11px] text-gray-500 mt-1 block font-mono">
                    Jarak Stop Loss: {Math.abs(entryPrice - stopLossPrice).toFixed(2)} poin ({lotResult.stopLossPips.toFixed(1)} pips)
                  </span>
                </div>
              </div>
            </div>

            {/* Output Calculation Card */}
            <div className="lg:col-span-5 bg-[#10151F] rounded-lg border border-yellow-500/40 p-6 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-wider">
                    Hasil Rekomendasi Ukuran Posisi
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-sm bg-yellow-500/10 text-yellow-500 font-mono border border-yellow-500/30">
                    SAFE RISK LIMIT
                  </span>
                </div>

                {/* Big Lot Display */}
                <div className="my-6 text-center">
                  <div className="text-4xl sm:text-5xl font-black font-mono text-yellow-500">
                    {lotResult.lotSize.toFixed(2)}{' '}
                    <span className="text-xl font-normal text-gray-300">LOT</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 font-mono">
                    Ukuran volume maksimal untuk menjaga risiko tepat di {riskPercent}%
                  </div>
                </div>

                {/* Breakdown Stats */}
                <div className="p-4 bg-[#080B12] rounded-sm border border-white/10 space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Maksimal Risiko Uang (USD)</span>
                    <span className="text-[#FF3131] font-bold">${lotResult.riskAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimasi Risiko Rupiah</span>
                    <span className="text-white">{formatCurrencyIdr(lotResult.riskAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Jarak Stop Loss</span>
                    <span className="text-white">{lotResult.stopLossPips.toFixed(1)} Pips</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimasi Margin Dibutuhkan (1:200)</span>
                    <span className="text-white">~ ${(lotResult.lotSize * 860).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                <button
                  onClick={() => {
                    openPosition(toolSymbol, entryPrice > stopLossPrice ? 'BUY' : 'SELL', lotResult.lotSize, stopLossPrice);
                  }}
                  className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-sm shadow-sm transition text-center cursor-pointer"
                >
                  Terapkan & Pasang di Akun Demo ({lotResult.lotSize.toFixed(2)} Lot)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Pip Value Calculator */}
        {activeToolTab === 'pip' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#10151F] rounded-lg border border-white/10 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white">Kalkulator Nilai 1 Pip</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Ketahui secara pasti berapa nilai uang dari pergerakan setiap 1 pip pada ukuran lot yang Anda gunakan.
              </p>

              <div>
                <label className="text-xs text-gray-400 block mb-1 font-medium">Instrumen</label>
                <select
                  value={toolSymbol}
                  onChange={(e) => setToolSymbol(e.target.value)}
                  className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-yellow-500"
                >
                  {quotes.map((q) => (
                    <option key={q.symbol} value={q.symbol}>{q.symbol}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1 font-medium">Ukuran Lot</label>
                <input
                  type="number"
                  step="0.01"
                  value={pipLots}
                  onChange={(e) => setPipLots(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="bg-[#10151F] rounded-lg border border-white/10 p-6 flex flex-col justify-center text-center">
              <span className="text-xs text-gray-400 uppercase font-mono">Nilai 1 Pip Untuk {pipLots} Lot {toolSymbol}</span>
              <div className="text-4xl font-black font-mono text-[#00FF95] mt-2">
                ${pipValueResult.toFixed(2)} USD
              </div>
              <div className="text-sm font-mono text-gray-300 mt-1">
                ~ {formatCurrencyIdr(pipValueResult)}
              </div>
              <p className="text-xs text-gray-500 mt-4 max-w-sm mx-auto">
                Jika harga bergerak 25 pip sesuai arah Anda, Anda menghasilkan +${(pipValueResult * 25).toFixed(2)} USD.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Margin & Leverage */}
        {activeToolTab === 'margin' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#10151F] rounded-lg border border-white/10 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white">Kalkulator Margin Dibutuhkan</h3>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Instrumen</label>
                <select
                  value={toolSymbol}
                  onChange={(e) => setToolSymbol(e.target.value)}
                  className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-yellow-500"
                >
                  {quotes.map((q) => (
                    <option key={q.symbol} value={q.symbol}>{q.symbol}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Leverage Akun</label>
                <select
                  value={marginLeverage}
                  onChange={(e) => setMarginLeverage(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-yellow-500"
                >
                  <option value={100}>1 : 100</option>
                  <option value={200}>1 : 200 (Direkomendasikan)</option>
                  <option value={400}>1 : 400</option>
                  <option value={50}>1 : 50</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Volume (Lot)</label>
                <input
                  type="number"
                  step="0.01"
                  value={marginLots}
                  onChange={(e) => setMarginLots(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="bg-[#10151F] rounded-lg border border-white/10 p-6 flex flex-col justify-center text-center">
              <span className="text-xs text-gray-400 uppercase font-mono">Margin Jaminan Yang Ditahan</span>
              <div className="text-4xl font-black font-mono text-yellow-500 mt-2">
                ${marginResult.toFixed(2)} USD
              </div>
              <div className="text-sm font-mono text-gray-300 mt-1">
                ~ {formatCurrencyIdr(marginResult)}
              </div>
              <p className="text-xs text-gray-500 mt-4 max-w-sm mx-auto">
                Dana ini akan dikunci sebagai agunan sementara selama posisi terbuka dan dilepaskan penuh saat posisi ditutup.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Fibonacci Retracement */}
        {activeToolTab === 'fibonacci' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#10151F] rounded-lg border border-white/10 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white">Kalkulator Fibonacci Retracement & Extension</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setFibTrend('UPTREND')}
                  className={`flex-1 py-2 text-xs font-bold rounded-sm border transition cursor-pointer ${
                    fibTrend === 'UPTREND'
                      ? 'bg-[#00FF95]/20 text-[#00FF95] border-[#00FF95]/40'
                      : 'border-white/10 text-gray-400'
                  }`}
                >
                  Uptrend (Swing Low ke High)
                </button>
                <button
                  onClick={() => setFibTrend('DOWNTREND')}
                  className={`flex-1 py-2 text-xs font-bold rounded-sm border transition cursor-pointer ${
                    fibTrend === 'DOWNTREND'
                      ? 'bg-[#FF3131]/20 text-[#FF3131] border-[#FF3131]/40'
                      : 'border-white/10 text-gray-400'
                  }`}
                >
                  Downtrend (Swing High ke Low)
                </button>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Swing High</label>
                <input
                  type="number"
                  step="0.01"
                  value={fibHigh}
                  onChange={(e) => setFibHigh(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Swing Low</label>
                <input
                  type="number"
                  step="0.01"
                  value={fibLow}
                  onChange={(e) => setFibLow(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="bg-[#10151F] rounded-lg border border-white/10 p-6">
              <h4 className="text-xs font-bold uppercase text-yellow-500 font-mono mb-3 tracking-wider">
                Level Fibonacci Utama
              </h4>
              <div className="divide-y divide-white/10 font-mono text-xs">
                {Object.entries(fibResult).map(([level, price]) => (
                  <div key={level} className="flex justify-between py-2">
                    <span className="text-gray-400 font-bold">{level}</span>
                    <span className="text-white font-semibold">${Number(price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
