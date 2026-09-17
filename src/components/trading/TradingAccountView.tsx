import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Smartphone, 
  Monitor, 
  ArrowRight, 
  DollarSign, 
  CreditCard, 
  Lock,
  Layers,
  Zap
} from 'lucide-react';

export const TradingAccountView: React.FC = () => {
  const { setActiveModal } = useMarket();

  return (
    <div id="trading-account-page" className="py-10 bg-[#080B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 font-mono text-xs font-bold mb-3 tracking-widest">
            <span>REGULATED BROKER ECOSYSTEM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pilihan Akun & Platform Trading
          </h1>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            Kondisi trading kompetitif dengan likuiditas interbank global, segregated account 100% di bank kustodian resmi, dan eksekusi tanpa requote.
          </p>
        </div>

        {/* Account Comparison Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {/* Card 1: Standard Account */}
          <div className="bg-[#10151F] rounded-lg border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white">Akun Standard (All-Inclusive)</h3>
                  <span className="text-xs text-gray-400">Paling fleksibel untuk swing trader & pemula</span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-sm bg-white/5 text-gray-300 border border-white/10">
                  ZERO COMMISSION
                </span>
              </div>

              <div className="my-6">
                <span className="text-3xl font-black font-mono text-white">$100</span>
                <span className="text-xs text-gray-400 ml-1.5 font-mono">Minimal Deposit (~Rp 1,6 Juta)</span>
              </div>

              <div className="space-y-3 font-mono text-xs divide-y divide-white/5">
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Spread Rata-Rata</span>
                  <span className="text-gray-200 font-bold">Mulai 1.1 pips (All-in)</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Komisi Tambahan</span>
                  <span className="text-[#00FF95] font-bold">$0 (Bebas Komisi)</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Leverage Maksimal</span>
                  <span className="text-gray-200 font-bold">Hingga 1 : 400</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Minimum Order</span>
                  <span className="text-gray-200 font-bold">0.01 Lot (Mikro)</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Eksekusi Pasar</span>
                  <span className="text-gray-200 font-bold">STP / No Dealing Desk</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Deposit & WD IDR</span>
                  <span className="text-[#00FF95] font-bold">BCA, Mandiri, BNI, BRI</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => setActiveModal('live-kyc')}
                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-sm border border-white/10 transition cursor-pointer"
              >
                Buka Akun Standard
              </button>
              <button
                onClick={() => setActiveModal('demo-account')}
                className="w-full py-2 text-xs font-semibold text-gray-400 hover:text-white text-center cursor-pointer"
              >
                Coba Demo Standard Gratis ($10K)
              </button>
            </div>
          </div>

          {/* Card 2: Raw Spread (Hero) */}
          <div className="bg-[#10151F] rounded-lg border-2 border-yellow-500/50 p-6 flex flex-col justify-between shadow-xl relative">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-sm bg-yellow-500 text-black font-mono font-black text-[10px] uppercase shadow-sm tracking-wider">
              Pilihan Favorit Pro & Scalper
            </div>

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white">Akun Raw DMA (Tier-1 ECN)</h3>
                  <span className="text-xs text-yellow-500">Spread murni antar-bank untuk scalping presisi</span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-sm bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">
                  RAW 0.0 PIP
                </span>
              </div>

              <div className="my-6">
                <span className="text-3xl font-black font-mono text-yellow-500">$200</span>
                <span className="text-xs text-gray-400 ml-1.5 font-mono">Minimal Deposit (~Rp 3,2 Juta)</span>
              </div>

              <div className="space-y-3 font-mono text-xs divide-y divide-white/5">
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Spread Emas & Forex</span>
                  <span className="text-yellow-500 font-bold">Mulai 0.0 – 0.2 pips</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Komisi Transaksi</span>
                  <span className="text-gray-200 font-bold">$3.5 per side ($7 round turn)</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Kecepatan Eksekusi</span>
                  <span className="text-[#00FF95] font-bold">&lt; 15 ms Fiber Optic</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Leverage Maksimal</span>
                  <span className="text-gray-200 font-bold">Hingga 1 : 200</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Server Lokasi</span>
                  <span className="text-gray-200 font-bold">Equinix LD4 (London) & NY4</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Algorithmic & EA</span>
                  <span className="text-[#00FF95] font-bold">Diizinkan 100%</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => setActiveModal('live-kyc')}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-sm shadow-sm transition cursor-pointer"
              >
                Buka Akun Raw Spread Live
              </button>
              <button
                onClick={() => setActiveModal('demo-account')}
                className="w-full py-2 text-xs font-semibold text-yellow-500 hover:text-yellow-400 text-center cursor-pointer"
              >
                Coba Demo Raw Spread ($10K)
              </button>
            </div>
          </div>
        </div>

        {/* Platform Downloads Section (Section 21) */}
        <div className="bg-[#10151F] rounded-lg border border-white/10 p-8 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-white">Platform Perdagangan Multi-Perangkat</h3>
            <p className="text-xs text-gray-400 mt-1">
              Akses akun live Anda melalui desktop terminal, peramban web tanpa instalasi, atau aplikasi seluler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="p-5 bg-[#080B12] rounded-sm border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-sm bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
                  <Monitor className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">MetaTrader 5 (Windows / Mac)</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Terminal desktop dengan 21 timeframe, 38 indikator bawaan, dan dukungan Expert Advisor (EA).
                </p>
              </div>
              <button
                onClick={() => setActiveModal('live-kyc')}
                className="mt-4 w-full py-2 bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold rounded-sm flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh MT5 Desktop</span>
              </button>
            </div>

            <div className="p-5 bg-[#080B12] rounded-sm border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-sm bg-[#00FF95]/10 border border-[#00FF95]/30 flex items-center justify-center text-[#00FF95] mb-3">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Aplikasi Seluler (Android & iOS)</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Eksekusi order dan notifikasi pergerakan harga instan di genggaman Anda kapan pun dan di mana pun.
                </p>
              </div>
              <button
                onClick={() => setActiveModal('live-kyc')}
                className="mt-4 w-full py-2 bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-semibold rounded-sm flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Google Play & App Store</span>
              </button>
            </div>

            <div className="p-5 bg-[#080B12] rounded-sm border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-sm bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-500 mb-3">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Web Terminal Terintegrasi</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Buka posisi langsung dari browser ini melalui chart interaktif tanpa perlu mengunduh aplikasi lain.
                </p>
              </div>
              <button
                onClick={() => setActiveModal('demo-account')}
                className="mt-4 w-full py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold rounded-sm flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Luncurkan Web Terminal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Banking & Segregated Account Guarantee (Section 22) */}
        <div className="p-6 bg-[#10151F] rounded-lg border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-[#00FF95]/10 border border-[#00FF95]/30 flex items-center justify-center text-[#00FF95] shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Jaminan Keamanan Rekening Terpisah (Segregated Account)</h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Dana nasabah disimpan 100% di bank kustodian Bappebti / Kliring Berjangka Indonesia dan tidak digunakan untuk operasional perusahaan.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs text-gray-300 shrink-0">
            <span className="px-2.5 py-1 rounded-sm bg-[#080B12] border border-white/10">BCA</span>
            <span className="px-2.5 py-1 rounded-sm bg-[#080B12] border border-white/10">Mandiri</span>
            <span className="px-2.5 py-1 rounded-sm bg-[#080B12] border border-white/10">BNI</span>
            <span className="px-2.5 py-1 rounded-sm bg-[#080B12] border border-white/10">BRI</span>
          </div>
        </div>
      </div>
    </div>
  );
};
