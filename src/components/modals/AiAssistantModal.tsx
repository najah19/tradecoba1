import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ArrowUpRight, 
  HelpCircle,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { formatPrice } from '../../utils/technicalIndicators';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const AiAssistantModal: React.FC = () => {
  const { activeModal, setActiveModal, quotes } = useMarket();
  const gold = quotes.find((q) => q.symbol === 'XAUUSD') || quotes[0];

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Halo! Saya AI Market Intelligence Assistant Anda. Saat ini harga emas XAUUSD diperdagangkan di $${formatPrice(gold.bid, 2)} (${gold.changePercent >= 0 ? '+' : ''}${gold.changePercent}%). Ada yang ingin Anda ketahui seputar setup teknikal, dampak event kalender ekonomi, atau perhitungan manajemen risiko?`,
      time: 'Sekarang',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (activeModal !== 'ai-assistant') return null;

  const quickPrompts = [
    'Rangkuman teknikal XAUUSD hari ini',
    'Dampak rilis data NFP terhadap emas',
    'Hitung lot aman untuk modal $5,000 risiko 1%',
    'Perbedaan akun Raw Spread vs Standard',
  ];

  const handleSend = (queryText?: string) => {
    const query = queryText || inputQuery;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      time: 'Baru saja',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('xauusd') || qLower.includes('emas') || qLower.includes('teknikal')) {
        reply = `Berdasarkan pembacaan indikator multi-timeframe saat ini di level $${formatPrice(gold.bid, 2)}:
1. **Bias Struktur:** Bullish di atas support dinamis EMA 50 ($3,422).
2. **Level Kunci:** Support terdekat di $3,440 (S1) dan $3,425 (S2). Resistance terdekat di $3,465 (R1) dan $3,475 (R2).
3. **Rekomendasi:** Cari konfirmasi rejection di area $3,440-$3,448 dengan target $3,475, Stop Loss ketat di bawah $3,425 untuk menjaga Risk/Reward 1:2.`;
      } else if (qLower.includes('nfp') || qLower.includes('non-farm') || qLower.includes('ekonomi')) {
        reply = `Rilis data US Non-Farm Payrolls (NFP) dijadwalkan pukul 19:30 WIB.
- **Konsensus:** 165K (sebelumnya 142K).
- **Skenario:** Jika data aktual jauh di bawah 150K, Dolar AS melemah dan emas (XAUUSD) berpotensi melonjak menembus $3,475.
- **Manajemen Risiko:** Hindari membuka posisi baru 10 menit sebelum rilis rilis berita untuk menghindari pelebaran spread (slippage).`;
      } else if (qLower.includes('lot') || qLower.includes('modal') || qLower.includes('risiko')) {
        reply = `Untuk modal $5,000 dengan toleransi risiko 1% ($50):
- Jika jarak Stop Loss Anda adalah 25 pips ($2.50 per troy ounce pada XAUUSD):
- **Ukuran Lot Aman = 0.20 Lot**.
- Jangan pernah mengambil risiko lebih dari 2% modal per transaksi agar portofolio bertahan jangka panjang.`;
      } else {
        reply = `Akun Raw Spread menawarkan spread murni antar-bank mulai 0.0 pip dengan komisi tetap $3.50 per lot side (sangat disukai scalper dan EA). Sementara akun Standard bebas komisi terpisah, dengan spread sedikit lebih lebar (mulai 1.0 pip) dan proses kalkulasi yang lebih sederhana untuk pemula.`;
      }

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        time: 'Baru saja',
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl bg-[#10151F] border border-white/15 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-[#080B12]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-sm bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-500">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5 font-mono uppercase tracking-wider">
                <span>AI Market Intelligence Assistant</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-sm bg-yellow-500/20 text-yellow-500 font-mono border border-yellow-500/30">
                  LIVE GEN-AI
                </span>
              </h3>
              <span className="text-[10px] text-gray-400 font-mono">Berdasarkan data pasar real-time & standar risiko</span>
            </div>
          </div>
          <button onClick={() => setActiveModal(null)} className="p-1 text-gray-400 hover:text-white rounded-sm hover:bg-white/5 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#080B12]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-sm flex items-center justify-center shrink-0 text-xs ${
                  m.sender === 'user'
                    ? 'bg-yellow-500 text-black font-bold'
                    : 'bg-[#10151F] text-yellow-500 border border-yellow-500/30'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] p-3.5 rounded-sm text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-yellow-500/15 text-white border border-yellow-500/30 rounded-tr-none'
                    : 'bg-[#10151F] text-gray-200 border border-white/10 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {m.text}
                <div className="text-[9px] text-gray-500 mt-1 font-mono text-right">
                  {m.time}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-gray-400 text-xs font-mono py-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-spin" />
              <span>AI sedang menganalisis data pasar terkini...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="p-2.5 bg-[#080B12] border-t border-white/10 flex items-center overflow-x-auto no-scrollbar gap-2">
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => handleSend(p)}
              className="px-2.5 py-1 rounded-sm bg-white/5 hover:bg-yellow-500 hover:text-black text-[11px] text-gray-300 border border-white/10 whitespace-nowrap transition cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-[#080B12] border-t border-white/10 flex gap-2">
          <input
            type="text"
            placeholder="Tanyakan analisis emas, level support, kalkulasi risiko..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-3 py-2 bg-[#10151F] border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-yellow-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-sm transition flex items-center gap-1 cursor-pointer shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
