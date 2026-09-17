import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { 
  TrendingUp, 
  Search, 
  User, 
  Bell, 
  Globe, 
  Menu, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Wallet, 
  ArrowUpRight,
  ShieldCheck,
  BarChart3
} from 'lucide-react';
import { formatCurrencyIdr } from '../../utils/technicalIndicators';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setActiveModal, 
    accountBalance, 
    equity,
    alerts,
    quotes,
    setSelectedSymbol 
  } = useMarket();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'markets', label: 'Markets' },
    { id: 'gold', label: 'XAUUSD Gold', highlight: true },
    { id: 'trading', label: 'Trading' },
    { id: 'analysis', label: 'Analysis' },
    { id: 'news', label: 'News' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'tools', label: 'Tools' },
    { id: 'academy', label: 'Academy' },
    { id: 'community', label: 'Community' },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  const filteredQuotes = quotes.filter(
    (q) =>
      q.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeAlertsCount = alerts.filter((a) => a.status === 'ACTIVE').length;

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#080B12]/95 backdrop-blur-md border-b border-white/5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Platform Name */}
            <div className="flex items-center space-x-3">
              <button
                id="brand-logo-btn"
                onClick={() => setActiveTab('home')}
                className="flex items-center space-x-2.5 focus:outline-none group text-left cursor-pointer"
              >
                <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-black font-black text-base shadow-sm">
                  G
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-lg tracking-tight text-white">
                      GLOBAL<span className="text-yellow-500">MARKET</span>
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-sm bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-mono">
                      ID
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono tracking-wider hidden sm:block">
                    Market Intelligence Platform
                  </span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-sm text-xs font-medium transition-colors cursor-pointer ${
                    activeTab === item.id
                      ? 'text-white border-b-2 border-yellow-500 font-semibold'
                      : item.highlight
                      ? 'text-yellow-500 hover:text-yellow-400 font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {item.highlight && <span className="ml-1 w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block"></span>}
                </button>
              ))}
            </nav>

            {/* Right Action Icons & Accounts */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Trigger */}
              <button
                id="header-search-btn"
                onClick={() => setSearchOpen(true)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-white bg-[#10151F] hover:bg-white/5 rounded-sm border border-white/10 transition cursor-pointer"
                title="Cari instrumen atau berita"
              >
                <Search className="w-3.5 h-3.5 text-gray-400" />
                <span className="hidden md:inline font-mono text-[11px]">Symbol Search</span>
              </button>

              {/* AI Assistant Button */}
              <button
                id="header-ai-assistant-btn"
                onClick={() => setActiveModal('ai-assistant')}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-medium text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 rounded-sm transition cursor-pointer"
                title="Tanya AI Market Assistant"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
                <span className="hidden sm:inline">AI Assistant</span>
              </button>

              {/* Demo Account Balance Pill */}
              <button
                id="header-balance-pill"
                onClick={() => setActiveTab('dashboard')}
                className="hidden lg:flex flex-col items-end px-3 py-1 bg-[#10151F] border border-white/10 rounded-sm hover:border-white/20 transition cursor-pointer"
              >
                <div className="flex items-center space-x-1">
                  <span className="text-[10px] text-yellow-500 font-mono font-bold uppercase">Demo USD</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF95]"></span>
                </div>
                <span className="text-xs font-mono font-bold text-white tracking-tight">
                  ${accountBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </button>

              {/* Live Account CTA */}
              <button
                id="header-open-live-btn"
                onClick={() => setActiveModal('live-kyc')}
                className="bg-yellow-500 text-black px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors shadow-sm cursor-pointer"
              >
                OPEN ACCOUNT
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-gray-400 hover:text-white rounded-sm hover:bg-white/5 transition"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#10151F] border-b border-white/10 px-4 py-4 space-y-2 animate-in slide-in-from-top-4">
            {/* Balance Card in Mobile */}
            <div className="p-3 bg-[#080B12] rounded-sm border border-white/10 flex items-center justify-between mb-3">
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Saldo Akun Demo Simulasi</div>
                <div className="text-base font-mono font-bold text-yellow-500">
                  ${accountBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[10px] text-gray-500 font-mono">
                  ~ {formatCurrencyIdr(accountBalance)}
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveModal('demo-account');
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-1.5 text-xs bg-[#10151F] hover:bg-white/10 text-gray-200 rounded-sm font-medium border border-white/10"
              >
                Kelola Akun
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-sm text-xs font-medium transition ${
                    activeTab === item.id
                      ? 'bg-yellow-500/10 text-yellow-500 font-bold border-l-2 border-yellow-500'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveModal('demo-account');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-xs font-semibold text-gray-300 bg-[#080B12] hover:bg-white/5 border border-white/10 rounded-sm text-center"
              >
                Coba Demo
              </button>
              <button
                onClick={() => {
                  setActiveModal('live-kyc');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-xs font-bold text-black bg-yellow-500 hover:bg-yellow-400 uppercase tracking-wider rounded-sm text-center"
              >
                Open Live
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#10151F] border border-white/10 rounded-sm shadow-2xl overflow-hidden">
            <div className="flex items-center px-4 py-3 border-b border-white/10 bg-[#080B12]">
              <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Cari instrumen (contoh: XAUUSD, EURUSD, NAS100, Minyak)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none font-sans"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-gray-400 hover:text-white rounded-sm cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              <div className="px-3 py-1 text-[10px] font-semibold text-gray-500 uppercase tracking-widest font-mono">
                Instrumen Pasar Global
              </div>
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((q) => (
                  <button
                    key={q.symbol}
                    onClick={() => {
                      setSelectedSymbol(q.symbol);
                      if (q.symbol === 'XAUUSD') setActiveTab('gold');
                      else setActiveTab('markets');
                      setSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-sm hover:bg-white/5 text-left transition group cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-white group-hover:text-yellow-500">
                          {q.symbol}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-sm bg-white/5 text-gray-400 uppercase font-mono border border-white/5">
                          {q.category}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">{q.name}</div>
                    </div>
                    <div className="text-right font-mono tracking-tighter">
                      <div className="text-xs text-white font-semibold">{q.bid}</div>
                      <div className={`text-[11px] font-medium ${q.change >= 0 ? 'text-[#00FF95]' : 'text-[#FF3131]'}`}>
                        {q.change >= 0 ? '+' : ''}{q.changePercent}%
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-xs text-gray-500 font-mono">
                  Tidak ditemukan instrumen untuk &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>

            <div className="px-4 py-2.5 bg-[#080B12] border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-mono">
              <span>Pilih untuk membuka grafik interaktif</span>
              <span>ESC untuk menutup</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
