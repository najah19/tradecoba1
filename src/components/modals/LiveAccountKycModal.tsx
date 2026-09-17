import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  FileText, 
  UserCheck,
  AlertTriangle,
  Building
} from 'lucide-react';

export const LiveAccountKycModal: React.FC = () => {
  const { activeModal, setActiveModal, addToast } = useMarket();
  const [step, setStep] = useState<number>(1);

  // Form State
  const [fullName, setFullName] = useState('');
  const [nik, setNik] = useState('');
  const [phone, setPhone] = useState('');
  const [accountType, setAccountType] = useState('RAW_SPREAD');
  const [experience, setExperience] = useState('1_3_YEARS');
  const [agreedRisk, setAgreedRisk] = useState(false);
  const [agreedSegregated, setAgreedSegregated] = useState(false);
  const [submittedAccountNo, setSubmittedAccountNo] = useState<string | null>(null);

  if (activeModal !== 'live-kyc') return null;

  const handleNext = () => {
    if (step === 1) {
      if (!fullName || !phone) {
        addToast('warning', 'Data Belum Lengkap', 'Mohon isi nama lengkap dan nomor telepon Anda.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!agreedRisk || !agreedSegregated) {
        addToast('warning', 'Persetujuan Diperlukan', 'Harap setujui pernyataan risiko dan rekening terpisah.');
        return;
      }
      const newAcc = `LIVE-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedAccountNo(newAcc);
      setStep(4);
      addToast('success', 'Akun Live Diterbitkan!', 'Verifikasi berkas KYC Anda sedang diproses tim kepatuhan.');
    }
  };

  const handleClose = () => {
    setActiveModal(null);
    setStep(1);
    setSubmittedAccountNo(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl bg-[#10151F] border border-white/15 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080B12]">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-yellow-500" />
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Pendaftaran Akun Trading Live Resmi</h3>
              <span className="text-[10px] text-gray-400 font-mono">Regulasi & Segregated Account Terjamin</span>
            </div>
          </div>
          <button onClick={handleClose} className="p-1 text-gray-400 hover:text-white rounded-sm hover:bg-white/5 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="px-6 py-3 bg-[#080B12] border-b border-white/10 flex items-center justify-between text-xs font-mono">
          <div className={`flex items-center space-x-1.5 ${step >= 1 ? 'text-yellow-500 font-bold' : 'text-gray-500'}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>
            <span className="hidden sm:inline">Data Diri</span>
          </div>
          <span className="text-gray-700">──</span>
          <div className={`flex items-center space-x-1.5 ${step >= 2 ? 'text-yellow-500 font-bold' : 'text-gray-500'}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>
            <span className="hidden sm:inline">Spesifikasi</span>
          </div>
          <span className="text-gray-700">──</span>
          <div className={`flex items-center space-x-1.5 ${step >= 3 ? 'text-yellow-500 font-bold' : 'text-gray-500'}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">3</span>
            <span className="hidden sm:inline">Kepatuhan</span>
          </div>
          <span className="text-gray-700">──</span>
          <div className={`flex items-center space-x-1.5 ${step >= 4 ? 'text-[#00FF95] font-bold' : 'text-gray-500'}`}>
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">4</span>
            <span className="hidden sm:inline">Selesai</span>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Langkah 1: Identitas Nasabah</h4>
              <p className="text-xs text-gray-400">
                Sesuai dengan regulasi pasar berjangka di Indonesia, data identitas resmi diperlukan untuk memastikan keamanan dan kepemilikan dana Anda.
              </p>

              <div>
                <label className="text-xs text-gray-400 block mb-1 font-medium">Nama Lengkap Sesuai KTP</label>
                <input
                  type="text"
                  placeholder="Contoh: Hendra Wijaya"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1 font-medium">Nomor Induk Kependudukan (NIK KTP / Paspor)</label>
                <input
                  type="text"
                  placeholder="16 digit NIK KTP Anda"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1 font-medium">Nomor WhatsApp Aktif</label>
                <input
                  type="text"
                  placeholder="+62 812 3456 7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-xs text-white focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Langkah 2: Pemilihan Tipe Akun & Platform</h4>
              <p className="text-xs text-gray-400">
                Tentukan konfigurasi akun trading yang paling sesuai dengan strategi dan gaya transaksi Anda.
              </p>

              <div className="space-y-2">
                <label className="text-xs text-gray-400 block font-medium">Tipe Akun Trading</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType('RAW_SPREAD')}
                    className={`p-3 rounded-sm border text-left transition cursor-pointer ${
                      accountType === 'RAW_SPREAD'
                        ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500'
                        : 'bg-[#080B12] border-white/10 text-gray-300'
                    }`}
                  >
                    <div className="font-bold text-xs">RAW SPREAD</div>
                    <div className="text-[10px] text-gray-400 mt-1">Spread mulai 0.0 pip, komisi $3.5 per lot side. Ideal untuk scalping & news.</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType('STANDARD')}
                    className={`p-3 rounded-sm border text-left transition cursor-pointer ${
                      accountType === 'STANDARD'
                        ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500'
                        : 'bg-[#080B12] border-white/10 text-gray-300'
                    }`}
                  >
                    <div className="font-bold text-xs">STANDARD (ZERO COMM)</div>
                    <div className="text-[10px] text-gray-400 mt-1">Bebas komisi terpisah, all-inclusive spread. Ideal untuk swing trader.</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1 font-medium">Pengalaman Trading Anda</label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 bg-[#080B12] border border-white/10 rounded-sm text-xs text-white font-mono focus:outline-none focus:border-yellow-500"
                >
                  <option value="LESS_1_YEAR">Kurang dari 1 Tahun (Pemula)</option>
                  <option value="1_3_YEARS">1 - 3 Tahun (Menengah)</option>
                  <option value="OVER_3_YEARS">Lebih dari 3 Tahun (Mahir / Institusi)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1 font-medium">Platform Pilihan</label>
                <div className="p-3 bg-[#080B12] rounded-sm border border-white/10 text-xs text-gray-300 flex items-center justify-between">
                  <span>MetaTrader 5 (MT5) + Web Terminal Multi-Device</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#00FF95]/20 text-[#00FF95] font-mono border border-[#00FF95]/30 font-bold">AKTIF</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white">Langkah 3: Deklarasi Risiko & Rekening Terpisah</h4>

              <div className="p-3.5 bg-[#080B12] rounded-sm border border-white/10 text-xs text-gray-300 space-y-2 leading-relaxed">
                <div className="flex items-center space-x-2 text-yellow-500 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Keterbukaan Risiko (Risk Disclosure)</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Perdagangan berjangka komoditi dan emas mengandung risiko finansial. Dana yang Anda setorkan harus merupakan modal risiko (risk capital).
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedRisk}
                    onChange={(e) => setAgreedRisk(e.target.checked)}
                    className="mt-0.5 rounded-sm text-yellow-500 focus:ring-0 bg-[#080B12] border-white/20 cursor-pointer"
                  />
                  <span className="text-xs text-gray-300">
                    Saya menyatakan telah memahami sepenuhnya bahwa trading derivatif memiliki leverage tinggi dan potensi risiko modal.
                  </span>
                </label>

                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedSegregated}
                    onChange={(e) => setAgreedSegregated(e.target.checked)}
                    className="mt-0.5 rounded-sm text-yellow-500 focus:ring-0 bg-[#080B12] border-white/20 cursor-pointer"
                  />
                  <span className="text-xs text-gray-300">
                    Saya menyetujui penempatan dana nasabah pada <strong className="text-yellow-500">Segregated Account (Rekening Terpisah)</strong> resmi yang diawasi oleh Lembaga Kliring Berjangka Indonesia.
                  </span>
                </label>
              </div>
            </div>
          )}

          {step === 4 && submittedAccountNo && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#00FF95]/20 border border-[#00FF95]/40 mx-auto flex items-center justify-center text-[#00FF95]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-white">Pendaftaran Akun Live Diterima!</h3>
              <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                Nomor Akun Live Anda: <strong className="text-yellow-500 font-mono text-sm">{submittedAccountNo}</strong>. Instruksi deposit via bank terpisah dan kredensial login MT5 telah dikirimkan ke email Anda.
              </p>

              <div className="p-4 bg-[#080B12] rounded-sm border border-white/10 text-left font-mono text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-gray-500">Nama Akun:</span>
                  <span className="text-white font-bold">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tipe Akun:</span>
                  <span className="text-yellow-500">{accountType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status Kepatuhan:</span>
                  <span className="text-[#00FF95] font-bold">VERIFIKASI TIER-1 AKTIF</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#080B12]">
          {step < 4 ? (
            <>
              <button
                type="button"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-40 text-gray-300 text-xs rounded-sm cursor-pointer"
              >
                Kembali
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-sm shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>{step === 3 ? 'Kirim Pendaftaran Akun' : 'Lanjutkan'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-sm cursor-pointer shadow-sm"
            >
              Kembali ke Terminal Trading
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
