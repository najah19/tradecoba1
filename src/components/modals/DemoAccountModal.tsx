import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { X, CheckCircle2, Shield, ArrowRight, RefreshCw } from 'lucide-react';
import { formatCurrencyIdr } from '../../utils/technicalIndicators';

export const DemoAccountModal: React.FC = () => {
  const { activeModal, setActiveModal, accountBalance, resetDemoBalance, addToast } = useMarket();
  const [name, setName] = useState('Budi Pratama');
  const [email, setEmail] = useState('budi.trader@gmail.com');
  const [leverage, setLeverage] = useState('200');

  if (activeModal !== 'demo-account') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetDemoBalance();
    addToast('success', 'Akun Demo Siap!', 'Saldo simulasi $10,000 USD telah dikreditkan ke terminal Anda.');
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-[#10151F] border border-white/15 rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080B12]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00FF95]"></span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Akun Demo Simulasi Pasar</h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1 text-gray-400 hover:text-white rounded-sm hover:bg-white/5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3.5 bg-[#080B12] border border-[#00FF95]/30 rounded-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#00FF95] block font-mono font-bold">SALDO VIRTUAL GRATIS</span>
              <span className="text-xl font-mono font-black text-white">$10,000.00 USD</span>
              <span className="text-[10px] text-gray-400 block font-mono">~ {formatCurrencyIdr(10000)}</span>
            </div>
            <button
              type="button"
              onClick={resetDemoBalance}
              className="p-2 bg-white/10 hover:bg-white/20 text-gray-200 rounded-sm text-xs flex items-center gap-1 font-medium cursor-pointer"
              title="Reset saldo"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Alamat Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Pilihan Leverage Akun</label>
            <select
              value={leverage}
              onChange={(e) => setLeverage(e.target.value)}
              className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-xs text-white font-mono focus:outline-none focus:border-yellow-500"
            >
              <option value="100">1 : 100</option>
              <option value="200">1 : 200 (Standar Industri)</option>
              <option value="400">1 : 400</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-sm shadow-sm transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Mulai Trading di Akun Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
