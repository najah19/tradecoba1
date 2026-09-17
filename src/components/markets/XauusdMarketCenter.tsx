import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { TradingChart } from '../chart/TradingChart';
import { formatPrice, formatPercent } from '../../utils/technicalIndicators';
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  Compass, 
  Globe, 
  BarChart, 
  Clock, 
  CheckCircle, 
  HelpCircle,
  Zap,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const XauusdMarketCenter: React.FC = () => {
  const { quotes, setActiveTab, setActiveModal, openPosition } = useMarket();
  const [analysisTab, setAnalysisTab] = useState<'technical' | 'fundamental' | 'sentiment' | 'snapshot'>('technical');
  const [orderLots, setOrderLots] = useState<number>(0.1);

  const goldQuote = quotes.find((q) => q.symbol === 'XAUUSD') || quotes[0];
  const isBullish = goldQuote.change >= 0;

  return (
    <section id="xauusd-market-center" className="py-12 bg-[#080B12] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-white/5 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-sm bg-yellow-500 flex items-center justify-center font-mono font-black text-black text-lg shadow-sm">
              Au
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tighter">
                  XAUUSD
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-sm bg-yellow-500/10 text-yellow-500 font-bold border border-yellow-500/20 uppercase tracking-wider">
                  HERO INSTRUMENT
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-sm bg-white/5 text-[#00FF95] font-mono font-medium flex items-center gap-1.5 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF95] animate-pulse"></span>
                  MARKET OPEN
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Spot Gold / US Dollar • 100 Troy Ounce Standard Contract • BAPPEBTI / ICDX Specification
              </p>
            </div>
          </div>

          {/* Large Live Pricing Block */}
          <div className="flex items-center space-x-6">
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">LIVE BID / ASK</div>
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl sm:text-4xl font-bold font-mono text-yellow-500 tracking-tighter">
                  ${formatPrice(goldQuote.bid, 2)}
                </span>
                <span className={`text-xs font-mono font-medium flex items-center ${isBullish ? 'text-[#00FF95]' : 'text-[#FF3131]'}`}>
                  {isBullish ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
                  {formatPercent(goldQuote.changePercent)} (+${goldQuote.change.toFixed(2)})
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center space-x-2">
              <button
                id="xauusd-buy-action"
                onClick={() => openPosition('XAUUSD', 'BUY', 0.1)}
                className="px-4 py-2 bg-[#00FF95] hover:bg-[#00e685] text-black font-bold text-xs uppercase tracking-wider rounded-sm transition cursor-pointer"
              >
                Instant Buy
              </button>
              <button
                id="xauusd-sell-action"
                onClick={() => openPosition('XAUUSD', 'SELL', 0.1)}
                className="px-4 py-2 bg-[#FF3131] hover:bg-[#e62929] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition cursor-pointer"
              >
                Instant Sell
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Chart Section */}
        <div className="mb-8">
          <TradingChart quote={goldQuote} height={500} showOrderPanel={true} />
        </div>

        {/* Snapshot Statistics Grid (Section 13) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-8 text-xs font-mono">
          <div className="p-3 bg-[#10151F] rounded-sm border border-white/10">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans">Spread</span>
            <span className="text-base font-bold text-yellow-500 tracking-tighter">{goldQuote.spread} pips</span>
            <span className="text-[10px] text-gray-600 block">Raw DMA</span>
          </div>

          <div className="p-3 bg-[#10151F] rounded-sm border border-white/10">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans">Daily Low</span>
            <span className="text-base font-bold text-[#FF3131] tracking-tighter">${formatPrice(goldQuote.low, 2)}</span>
            <span className="text-[10px] text-gray-600 block">Terendah Hari Ini</span>
          </div>

          <div className="p-3 bg-[#10151F] rounded-sm border border-white/10">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans">Daily High</span>
            <span className="text-base font-bold text-[#00FF95] tracking-tighter">${formatPrice(goldQuote.high, 2)}</span>
            <span className="text-[10px] text-gray-600 block">Tertinggi Hari Ini</span>
          </div>

          <div className="p-3 bg-[#10151F] rounded-sm border border-white/10">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans">Prev Close</span>
            <span className="text-base font-bold text-white tracking-tighter">${formatPrice(goldQuote.previousClose, 2)}</span>
            <span className="text-[10px] text-gray-600 block">Penutupan Kemarin</span>
          </div>

          <div className="p-3 bg-[#10151F] rounded-sm border border-white/10">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans">52-Wk Range</span>
            <span className="text-sm font-bold text-white tracking-tighter">${goldQuote.low52w} - ${goldQuote.high52w}</span>
            <span className="text-[10px] text-gray-600 block">Rentang 1 Tahun</span>
          </div>

          <div className="p-3 bg-[#10151F] rounded-sm border border-white/10">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans">Leverage</span>
            <span className="text-sm font-bold text-yellow-500 tracking-tighter">1:100 - 1:400</span>
            <span className="text-[10px] text-gray-600 block">Margin ~$860 / lot</span>
          </div>
        </div>

        {/* Multi-Tab Analysis Center (Section 14) */}
        <div className="bg-[#10151F] rounded-lg border border-white/10 overflow-hidden shadow-2xl">
          {/* Analysis Tabs Header */}
          <div className="flex border-b border-white/10 bg-[#080B12] px-4 overflow-x-auto">
            <button
              onClick={() => setAnalysisTab('technical')}
              className={`px-4 py-3 text-xs uppercase tracking-wider font-semibold transition border-b-2 whitespace-nowrap cursor-pointer ${
                analysisTab === 'technical'
                  ? 'border-yellow-500 text-yellow-500 font-bold'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Analisis Teknikal (S&R)
            </button>
            <button
              onClick={() => setAnalysisTab('fundamental')}
              className={`px-4 py-3 text-xs uppercase tracking-wider font-semibold transition border-b-2 whitespace-nowrap cursor-pointer ${
                analysisTab === 'fundamental'
                  ? 'border-yellow-500 text-yellow-500 font-bold'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Faktor Fundamental & Makro
            </button>
            <button
              onClick={() => setAnalysisTab('sentiment')}
              className={`px-4 py-3 text-xs uppercase tracking-wider font-semibold transition border-b-2 whitespace-nowrap cursor-pointer ${
                analysisTab === 'sentiment'
                  ? 'border-yellow-500 text-yellow-500 font-bold'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Sentimen Komunitas
            </button>
          </div>

          <div className="p-6">
            {analysisTab === 'technical' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Technical Bias Gauge */}
                  <div className="p-4 bg-[#080B12] rounded-sm border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-sans mb-1">Overall Technical Bias</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold font-mono text-[#00FF95]">STRONG BUY</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-sm bg-white/5 text-[#00FF95] font-mono border border-white/5 uppercase">
                        9/11 Indikator
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      Harga emas bergerak konsisten di atas EMA 20 ($3,438) dan EMA 50 ($3,422). Candlestick harian membentuk formasi pola Ascending Triangle dengan target ekspansi $3,475.
                    </p>
                  </div>

                  {/* Dynamic Support Levels */}
                  <div className="p-4 bg-[#080B12] rounded-sm border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-sans mb-2">Key Support Levels</div>
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-[#00FF95] font-bold">Support 1 (S1)</span>
                        <span className="text-white">$3,440.00 (Fibo 23.6%)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-[#00FF95] font-bold">Support 2 (S2)</span>
                        <span className="text-white">$3,425.00 (Demand Base)</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-[#00FF95] font-bold">Support 3 (S3)</span>
                        <span className="text-white">$3,410.00 (Psychological)</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Resistance Levels */}
                  <div className="p-4 bg-[#080B12] rounded-sm border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-sans mb-2">Key Resistance Levels</div>
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-[#FF3131] font-bold">Resistance 1 (R1)</span>
                        <span className="text-white">$3,465.00 (Daily Peak)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-[#FF3131] font-bold">Resistance 2 (R2)</span>
                        <span className="text-white">$3,475.00 (Expansion TP1)</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-[#FF3131] font-bold">Resistance 3 (R3)</span>
                        <span className="text-white">$3,500.00 (Milestone ATH)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Oscillators Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-500 text-[10px] uppercase tracking-wider">
                        <th className="py-2 px-3">Indikator</th>
                        <th className="py-2 px-3">Nilai</th>
                        <th className="py-2 px-3">Sinyal</th>
                        <th className="py-2 px-3">Interpretasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-white">RSI (14)</td>
                        <td className="py-2.5 px-3 text-gray-300">58.4</td>
                        <td className="py-2.5 px-3 text-[#00FF95] font-bold">BULLISH</td>
                        <td className="py-2.5 px-3 text-gray-400 font-sans">Zona momentum positif, belum jenuh beli (overbought)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-white">MACD (12, 26, 9)</td>
                        <td className="py-2.5 px-3 text-gray-300">+4.25</td>
                        <td className="py-2.5 px-3 text-[#00FF95] font-bold">BUY</td>
                        <td className="py-2.5 px-3 text-gray-400 font-sans">Histogram hijau melebar di atas garis sinyal nol</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-white">ATR (14)</td>
                        <td className="py-2.5 px-3 text-gray-300">$24.50</td>
                        <td className="py-2.5 px-3 text-yellow-500 font-bold">HIGH VOLATILITY</td>
                        <td className="py-2.5 px-3 text-gray-400 font-sans">Ekspektasi pergerakan harga harian sekitar 245 pips</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-white">EMA 200</td>
                        <td className="py-2.5 px-3 text-gray-300">$3,280.00</td>
                        <td className="py-2.5 px-3 text-[#00FF95] font-bold">LONG-TERM UPTREND</td>
                        <td className="py-2.5 px-3 text-gray-400 font-sans">Struktur tren makro bullish kuat tanpa ancaman reversal</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {analysisTab === 'fundamental' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
                <div className="space-y-4">
                  <div className="p-4 bg-[#080B12] rounded-sm border border-white/5">
                    <h4 className="font-bold text-yellow-500 text-sm mb-1">
                      1. Ekspektasi Kebijakan Suku Bunga The Fed
                    </h4>
                    <p className="text-gray-300">
                      Federal Reserve AS telah memasuki siklus pelonggaran moneter. Peluang pemangkasan suku bunga sebesar 25 bps pada FOMC mendatang diperkirakan mencapai 82% menurut CME FedWatch Tool. Suku bunga yang lebih rendah secara historis menurunkan opportunity cost memegang emas fisik.
                    </p>
                  </div>

                  <div className="p-4 bg-[#080B12] rounded-sm border border-white/5">
                    <h4 className="font-bold text-yellow-500 text-sm mb-1">
                      2. Permintaan Cadangan Bank Sentral Global
                    </h4>
                    <p className="text-gray-300">
                      Laporan World Gold Council (WGC) mencatat pembelian bersih emas oleh bank sentral Asia, Eropa Timur, dan Timur Tengah terus memecahkan rekor sebagai diversifikasi dari ketergantungan cadangan devisa Dolar AS.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-[#080B12] rounded-sm border border-white/5">
                    <h4 className="font-bold text-yellow-500 text-sm mb-1">
                      3. Korelasi Imbal Hasil Obligasi AS (Treasury 10Y)
                    </h4>
                    <p className="text-gray-300">
                      Imbal hasil Treasury 10-tahun bertahan di level 4.28%. Penurunan yield obligasi di bawah 4.20% berpeluang memicu reli lanjutan pada harga emas menuju level psikologis $3,500.
                    </p>
                  </div>

                  <div className="p-4 bg-[#080B12] rounded-sm border border-white/5">
                    <h4 className="font-bold text-yellow-500 text-sm mb-1">
                      4. Safe Haven & Ketegangan Geopolitik
                    </h4>
                    <p className="text-gray-300">
                      Ketidakpastian geopolitik di rute perdagangan internasional dan tensi Timur Tengah mempertahankan premi risiko safe-haven tetap tinggi pada kontrak emas spot.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {analysisTab === 'sentiment' && (
              <div className="max-w-xl mx-auto py-4 space-y-6">
                <div className="text-center">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Sentimen Posisi Trader Ritel & Institusi</div>
                  <div className="text-3xl font-extrabold font-mono text-[#00FF95] mt-1 tracking-tighter">68% NET BUYERS</div>
                  <p className="text-xs text-gray-400 mt-1">
                    Mayoritas pelaku pasar mempertahankan bias beli (Long) di atas level support $3,440.
                  </p>
                </div>

                {/* Visual Bar */}
                <div className="space-y-2">
                  <div className="w-full h-4 bg-[#080B12] rounded-sm overflow-hidden flex border border-white/5">
                    <div className="bg-[#00FF95] h-full flex items-center justify-center text-[10px] font-mono font-bold text-black" style={{ width: '68%' }}>
                      68% BUY
                    </div>
                    <div className="bg-[#FF3131] h-full flex items-center justify-center text-[10px] font-mono font-bold text-white" style={{ width: '32%' }}>
                      32% SELL
                    </div>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-gray-400">
                    <span className="text-[#00FF95] font-bold">14,280 Akun Terbuka (Long)</span>
                    <span className="text-[#FF3131] font-bold">6,720 Akun Terbuka (Short)</span>
                  </div>
                </div>

                <div className="p-4 bg-[#080B12] border border-yellow-500/20 rounded-sm text-xs text-yellow-500/90 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-yellow-500" />
                  <span>
                    <strong>Tips Analisis Kontrarian:</strong> Ketika posisi beli ritel melampaui 80%, waspadai potensi terjadinya long squeeze atau aksi ambil untung (profit taking) mendadak sebelum tren kembali berlanjut.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
