import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Bell, 
  RotateCcw, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Plus, 
  DollarSign, 
  Sliders
} from 'lucide-react';
import { formatPrice, formatPercent, formatCurrencyIdr } from '../../utils/technicalIndicators';

export const UserDashboardView: React.FC = () => {
  const { 
    accountBalance, 
    equity, 
    positions, 
    closePosition, 
    watchlist, 
    quotes, 
    toggleWatchlist, 
    setSelectedSymbol, 
    setActiveTab, 
    setActiveModal, 
    resetDemoBalance,
    alerts,
    addPriceAlert,
    removePriceAlert,
    addToast
  } = useMarket();

  const [dashboardTab, setDashboardTab] = useState<'positions' | 'watchlist' | 'alerts' | 'account'>('positions');

  // New alert form
  const [alertSymbol, setAlertSymbol] = useState<string>('XAUUSD');
  const [alertTargetPrice, setAlertTargetPrice] = useState<number>(3465);
  const [alertCondition, setAlertCondition] = useState<'ABOVE' | 'BELOW'>('ABOVE');

  const openPositionsCount = positions.filter((p) => p.status === 'OPEN').length;
  const totalFloatingPnl = positions
    .filter((p) => p.status === 'OPEN')
    .reduce((acc, p) => acc + p.pnl, 0);

  const marginUsed = positions
    .filter((p) => p.status === 'OPEN')
    .reduce((acc, p) => acc + p.margin, 0);

  const freeMargin = equity - marginUsed;
  const marginLevel = marginUsed > 0 ? ((equity / marginUsed) * 100).toFixed(0) : 'N/A';

  const watchlistQuotes = quotes.filter((q) => watchlist.includes(q.symbol));

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTargetPrice || alertTargetPrice <= 0) return;

    addPriceAlert(alertSymbol, alertTargetPrice, alertCondition);
    addToast('success', 'Alert Dibuat', `Peringatan harga ${alertSymbol} di level $${alertTargetPrice} telah aktif.`);
  };

  return (
    <div id="user-dashboard-page" className="py-10 bg-[#080B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF95] animate-pulse"></span>
              <span className="text-[#00FF95] font-mono text-xs font-bold uppercase tracking-widest">
                Simulated Trading Engine Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Terminal Akun & Portofolio
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Pantau margin akun real-time, eksekusi posisi demo, watchlist favorit, dan peringatan harga.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={resetDemoBalance}
              className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-xs rounded-sm border border-white/10 flex items-center space-x-1.5 transition cursor-pointer"
              title="Reset saldo demo ke $10,000.00"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Saldo $10K</span>
            </button>
            <button
              onClick={() => setActiveModal('live-kyc')}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-sm shadow-sm transition cursor-pointer"
            >
              Tingkatkan ke Akun Live
            </button>
          </div>
        </div>

        {/* Account Financial Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8 text-xs font-mono">
          <div className="p-4 bg-[#10151F] rounded-lg border border-white/10">
            <span className="text-[11px] text-gray-400 block font-sans">Saldo Akun (Balance)</span>
            <span className="text-xl font-bold text-white">${accountBalance.toFixed(2)}</span>
            <span className="text-[10px] text-gray-500 block">~ {formatCurrencyIdr(accountBalance)}</span>
          </div>

          <div className="p-4 bg-[#10151F] rounded-lg border border-yellow-500/40">
            <span className="text-[11px] text-yellow-500 block font-sans">Ekuitas (Equity)</span>
            <span className="text-xl font-bold text-yellow-500">${equity.toFixed(2)}</span>
            <span className="text-[10px] text-gray-500 block">Balance + Floating PnL</span>
          </div>

          <div className="p-4 bg-[#10151F] rounded-lg border border-white/10">
            <span className="text-[11px] text-gray-400 block font-sans">Floating PnL</span>
            <span className={`text-xl font-bold ${totalFloatingPnl >= 0 ? 'text-[#00FF95]' : 'text-[#FF3131]'}`}>
              {totalFloatingPnl >= 0 ? '+' : ''}${totalFloatingPnl.toFixed(2)}
            </span>
            <span className="text-[10px] text-gray-500 block">{openPositionsCount} Posisi Aktif</span>
          </div>

          <div className="p-4 bg-[#10151F] rounded-lg border border-white/10">
            <span className="text-[11px] text-gray-400 block font-sans">Margin Digunakan</span>
            <span className="text-xl font-bold text-gray-200">${marginUsed.toFixed(2)}</span>
            <span className="text-[10px] text-gray-500 block">Jaminan Terkunci</span>
          </div>

          <div className="p-4 bg-[#10151F] rounded-lg border border-white/10">
            <span className="text-[11px] text-gray-400 block font-sans">Margin Bebas</span>
            <span className="text-xl font-bold text-gray-200">${freeMargin.toFixed(2)}</span>
            <span className="text-[10px] text-gray-500 block">Tersedia Posisi Baru</span>
          </div>

          <div className="p-4 bg-[#10151F] rounded-lg border border-white/10">
            <span className="text-[11px] text-gray-400 block font-sans">Margin Level</span>
            <span className="text-xl font-bold text-[#00FF95]">{marginLevel}%</span>
            <span className="text-[10px] text-gray-500 block">Stop-Out Level: 30%</span>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center space-x-2 border-b border-white/10 mb-6 font-mono text-xs">
          <button
            onClick={() => setDashboardTab('positions')}
            className={`pb-3 px-2 font-bold transition border-b-2 cursor-pointer ${
              dashboardTab === 'positions'
                ? 'border-yellow-500 text-yellow-500'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Posisi Terbuka & Riwayat ({positions.length})
          </button>
          <button
            onClick={() => setDashboardTab('watchlist')}
            className={`pb-3 px-2 font-bold transition border-b-2 cursor-pointer ${
              dashboardTab === 'watchlist'
                ? 'border-yellow-500 text-yellow-500'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Watchlist Saya ({watchlist.length})
          </button>
          <button
            onClick={() => setDashboardTab('alerts')}
            className={`pb-3 px-2 font-bold transition border-b-2 cursor-pointer ${
              dashboardTab === 'alerts'
                ? 'border-yellow-500 text-yellow-500'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Peringatan Harga ({alerts.length})
          </button>
        </div>

        {/* Tab 1: Positions */}
        {dashboardTab === 'positions' && (
          <div className="space-y-4">
            <div className="bg-[#10151F] rounded-lg border border-white/10 overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-[#080B12] border-b border-white/10 text-gray-400">
                      <th className="py-3 px-4">Ticket ID</th>
                      <th className="py-3 px-4">Instrumen</th>
                      <th className="py-3 px-3">Tipe</th>
                      <th className="py-3 px-3">Volume (Lot)</th>
                      <th className="py-3 px-4 text-right">Harga Buka</th>
                      <th className="py-3 px-4 text-right">Harga Sekarang</th>
                      <th className="py-3 px-4 text-right">Profit / Loss</th>
                      <th className="py-3 px-4 text-center">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {positions.filter((p) => p.status === 'OPEN').length > 0 ? (
                      positions
                        .filter((p) => p.status === 'OPEN')
                        .map((pos) => {
                          const isProfit = pos.pnl >= 0;
                          return (
                            <tr key={pos.id} className="hover:bg-white/5 transition">
                              <td className="py-3.5 px-4 text-gray-400">{pos.id}</td>
                              <td className="py-3.5 px-4 font-bold text-white flex items-center space-x-2">
                                <span className={pos.symbol === 'XAUUSD' ? 'text-yellow-500' : ''}>
                                  {pos.symbol}
                                </span>
                              </td>
                              <td className="py-3.5 px-3">
                                <span
                                  className={`px-2 py-0.5 rounded-sm font-bold text-[10px] ${
                                    pos.type === 'BUY'
                                      ? 'bg-[#00FF95]/15 text-[#00FF95] border border-[#00FF95]/30'
                                      : 'bg-[#FF3131]/15 text-[#FF3131] border border-[#FF3131]/30'
                                  }`}
                                >
                                  {pos.type}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-gray-200">{pos.lotSize.toFixed(2)}</td>
                              <td className="py-3.5 px-4 text-right text-gray-300 font-mono">
                                ${pos.entryPrice.toFixed(2)}
                              </td>
                              <td className="py-3.5 px-4 text-right text-white font-mono font-bold">
                                ${pos.currentPrice.toFixed(2)}
                              </td>
                              <td className={`py-3.5 px-4 text-right font-bold text-sm ${isProfit ? 'text-[#00FF95]' : 'text-[#FF3131]'}`}>
                                {isProfit ? '+' : ''}${pos.pnl.toFixed(2)}
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <button
                                  onClick={() => closePosition(pos.id)}
                                  className="px-3 py-1 bg-[#FF3131]/15 hover:bg-[#FF3131] hover:text-black text-[#FF3131] border border-[#FF3131]/40 rounded-sm text-xs font-semibold transition cursor-pointer"
                                >
                                  Tutup Posisi
                                </button>
                              </td>
                            </tr>
                          );
                        })
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-gray-500">
                          Tidak ada posisi terbuka saat ini. Buka grafik atau kalkulator untuk memulai order demo simulasi!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Watchlist */}
        {dashboardTab === 'watchlist' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {watchlistQuotes.map((q) => (
              <div
                key={q.symbol}
                onClick={() => {
                  setSelectedSymbol(q.symbol);
                  setActiveTab(q.symbol === 'XAUUSD' ? 'gold' : 'markets');
                }}
                className="cursor-pointer bg-[#10151F] hover:bg-[#151c2a] border border-white/10 hover:border-yellow-500/40 rounded-lg p-4 transition shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-base text-white">
                      {q.symbol}
                    </span>
                    <div className="text-xs text-gray-400">{q.name}</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(q.symbol);
                    }}
                    className="p-1 text-yellow-500 hover:text-gray-400 cursor-pointer"
                    title="Hapus dari watchlist"
                  >
                    <Star className="w-4 h-4 fill-yellow-500" />
                  </button>
                </div>

                <div className="mt-4 flex items-baseline justify-between font-mono">
                  <span className="text-lg font-bold text-white">${q.bid}</span>
                  <span className={`text-xs font-bold ${q.change >= 0 ? 'text-[#00FF95]' : 'text-[#FF3131]'}`}>
                    {q.change >= 0 ? '+' : ''}{q.changePercent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Price Alerts */}
        {dashboardTab === 'alerts' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-[#10151F] rounded-lg border border-white/10 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-yellow-500" />
                Pasang Peringatan Harga Baru
              </h3>

              <form onSubmit={handleCreateAlert} className="space-y-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Instrumen</label>
                  <select
                    value={alertSymbol}
                    onChange={(e) => setAlertSymbol(e.target.value)}
                    className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-xs text-white font-mono focus:border-yellow-500 focus:outline-none"
                  >
                    {quotes.map((q) => (
                      <option key={q.symbol} value={q.symbol}>{q.symbol}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">Kondisi Pemicu</label>
                  <select
                    value={alertCondition}
                    onChange={(e) => setAlertCondition(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-xs text-white font-mono focus:border-yellow-500 focus:outline-none"
                  >
                    <option value="ABOVE">Harga Melampaui / Tembus Ke Atas (&gt;=)</option>
                    <option value="BELOW">Harga Turun Menembus Ke Bawah (&lt;=)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">Level Harga Target (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={alertTargetPrice}
                    onChange={(e) => setAlertTargetPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-xs text-white font-mono focus:outline-none focus:border-yellow-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-sm transition mt-2 shadow-sm cursor-pointer"
                >
                  Aktifkan Peringatan
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-[#10151F] rounded-lg border border-white/10 p-6">
              <h3 className="text-sm font-bold text-white mb-4 font-mono uppercase">
                Daftar Peringatan Aktif ({alerts.length})
              </h3>
              <div className="space-y-3">
                {alerts.map((al) => (
                  <div
                    key={al.id}
                    className="p-3.5 bg-[#080B12] rounded-sm border border-white/10 flex items-center justify-between font-mono text-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-sm bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-500">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white">
                          {al.symbol} {al.condition === 'ABOVE' ? '≥' : '≤'} ${al.targetPrice.toFixed(2)}
                        </div>
                        <span className="text-[10px] text-gray-400 font-sans">
                          Status: <strong className="text-[#00FF95]">{al.status}</strong>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removePriceAlert(al.id)}
                      className="p-1.5 text-gray-500 hover:text-[#FF3131] transition cursor-pointer"
                      title="Hapus alert"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
