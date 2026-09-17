import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { TrendingUp, ShieldCheck, Lock, Mail, ExternalLink, Award, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setActiveModal, addToast } = useMarket();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('warning', 'Format Email Tidak Valid', 'Mohon masukkan alamat email yang benar.');
      return;
    }
    addToast('success', 'Berhasil Berlangganan', 'Market Intelligence Morning Brief harian akan dikirim ke ' + email);
    setEmail('');
  };

  return (
    <footer id="platform-footer" className="bg-[#080B12] border-t border-white/10 text-gray-400 text-xs mt-16 pb-20 xl:pb-10">
      {/* Newsletter Strip */}
      <div className="border-b border-white/10 bg-[#10151F] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-yellow-500 font-mono text-xs font-bold uppercase tracking-widest">
              Market Intelligence Newsletter
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Mulai Hari Trading Anda Dengan Analisis Lebih Terukur
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-1.5">
              Dapatkan Morning Brief XAUUSD, sinyal trading ideas pilihan analis, dan rekap event berdampak tinggi langsung di inbox setiap pukul 07:00 WIB.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto items-center gap-2">
            <div className="relative flex-1 md:w-80">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                placeholder="Masukkan email Anda..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#080B12] border border-white/10 rounded-sm text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-sm transition shrink-0 shadow-sm cursor-pointer"
            >
              Langganan Gratis
            </button>
          </form>
        </div>
      </div>

      {/* Trust & Regulated Infrastructure Bar */}
      <div className="border-b border-white/10 py-6 px-4 sm:px-6 lg:px-8 bg-[#080B12]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3 p-3 rounded-sm bg-[#10151F] border border-white/10">
            <ShieldCheck className="w-6 h-6 text-yellow-500 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Kepatuhan Regulasi</div>
              <div className="text-[11px] text-gray-400">Standar Bappebti & KBI</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-sm bg-[#10151F] border border-white/10">
            <Lock className="w-6 h-6 text-[#00FF95] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Segregated Account</div>
              <div className="text-[11px] text-gray-400">Dana Nasabah Terpisah 100%</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-sm bg-[#10151F] border border-white/10">
            <Award className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Analis Tersertifikasi</div>
              <div className="text-[11px] text-gray-400">WPB, CSA, & CTA Certified</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-sm bg-[#10151F] border border-white/10">
            <CheckCircle className="w-6 h-6 text-purple-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Eksekusi Tanpa Requote</div>
              <div className="text-[11px] text-gray-400">Likuiditas Interbank Tier-1</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Col 1 Brand */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-sm bg-yellow-500 flex items-center justify-center text-black font-black text-sm shadow-sm">
                G
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                GLOBAL<span className="text-yellow-500">MARKET</span> ID
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Platform Intelijen Pasar & Ekosistem Perdagangan Global Pertama di Indonesia yang mengintegrasikan data real-time, riset teknikal mendalam, kalender ekonomi, kalkulator risiko, dan pembukaan akun trading resmi.
            </p>
            <div className="pt-2 text-[11px] text-gray-500 font-mono">
              Positioning: Pantau Market. Analisis Lebih Cepat. Trading Lebih Terukur.
            </div>
          </div>

          {/* Col 2 Markets */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3 font-mono">
              Pasar Global
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('gold')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  XAUUSD (Emas Spot)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('markets')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  EURUSD & Forex Major
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('markets')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  Indeks AS (NAS100, US30)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('markets')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  Minyak Mentah (WTI Crude)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('markets')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  Perak (XAGUSD)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('markets')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  Kripto & Saham Global
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 Analysis & Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3 font-mono">
              Analisis & Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('analysis')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  Analisis Teknikal Harian
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('analysis')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  Trading Ideas Pilihan
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calendar')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  Kalender Ekonomi WIB
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tools')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  Kalkulator Ukuran Posisi (Lot)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tools')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  Kalkulator Pip & Margin
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('academy')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  Masterclass Trading Emas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 Trading Ecosystem */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3 font-mono">
              Akun & Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveModal('demo-account')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  Buka Akun Demo ($10K)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('live-kyc')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  Pendaftaran Akun Live
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('trading')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  Perbandingan Jenis Akun
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('trading')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  Download MetaTrader 4 / 5
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-yellow-500 text-left transition cursor-pointer">
                  Dashboard & Watchlist
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Mandatory Disclaimers */}
        <div className="mt-12 pt-8 border-t border-white/10 space-y-4 text-[11px] text-gray-500 leading-relaxed">
          <div className="p-4 bg-[#10151F] rounded-sm border border-white/10">
            <h5 className="font-bold text-white text-xs mb-1 uppercase tracking-wider">
              Pemberitahuan Risiko Tinggi (High-Risk Investment Warning)
            </h5>
            <p>
              Perdagangan valuta asing (Forex), emas (XAUUSD), komoditas, dan produk derivatif dengan fasilitas leverage (margin trading) mengandung tingkat risiko yang tinggi dan mungkin tidak sesuai untuk semua kalangan investor. Pengungkit (leverage) dapat melipatgandakan potensi keuntungan namun juga dapat mempercepat kerugian modal. Sebelum memutuskan untuk berpartisipasi dalam transaksi pasar finansial, Anda harus secara seksama mempertimbangkan tujuan investasi, tingkat pengalaman, dan batas toleransi risiko Anda. Jangan pernah menginvestasikan dana yang Anda tidak mampu untuk kehilangannya.
            </p>
          </div>

          <p>
            <strong className="text-gray-400">Disclaimer Informasi:</strong> Seluruh materi riset, sinyal trading ideas, ulasan teknikal, kalender ekonomi, dan opini pasar yang dipublikasikan pada platform ini disediakan semata-mata untuk tujuan edukasi dan referensi umum, dan bukan merupakan ajakan, tawaran, maupun rekomendasi finansial atau saran investasi untuk membeli atau menjual instrumen keuangan apapun. Setiap keputusan investasi yang diambil sepenuhnya merupakan tanggung jawab independen masing-masing pengguna.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-white/10 gap-2">
            <div>
              &copy; 2026 Global Market Trading & Intelligence Platform. Hak Cipta Dilindungi Undang-Undang.
            </div>
            <div className="flex items-center space-x-4">
              <span className="hover:text-gray-300 cursor-pointer">Ketentuan Layanan</span>
              <span className="hover:text-gray-300 cursor-pointer">Kebijakan Privasi</span>
              <span className="hover:text-gray-300 cursor-pointer">Keterbukaan Risiko</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
