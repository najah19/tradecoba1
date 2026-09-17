import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { ECONOMIC_EVENTS } from '../../data/mockData';
import { EconomicEvent, EventImpact } from '../../types';
import { 
  Calendar, 
  Filter, 
  Clock, 
  Globe, 
  AlertCircle, 
  ArrowUpRight, 
  X, 
  BarChart2, 
  TrendingUp,
  Info
} from 'lucide-react';

export const EconomicCalendarView: React.FC = () => {
  const { setSelectedSymbol, setActiveTab } = useMarket();
  const [selectedEvent, setSelectedEvent] = useState<EconomicEvent | null>(null);
  const [dateFilter, setDateFilter] = useState<'Semua' | 'Hari Ini' | 'Besok'>('Semua');
  const [impactFilter, setImpactFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [currencyFilter, setCurrencyFilter] = useState<string>('ALL');

  const currencies = ['ALL', 'USD', 'EUR', 'GBP', 'AUD', 'IDR'];

  const filteredEvents = ECONOMIC_EVENTS.filter((evt) => {
    if (dateFilter !== 'Semua' && evt.date !== dateFilter) return false;
    if (impactFilter !== 'ALL' && evt.impact !== impactFilter) return false;
    if (currencyFilter !== 'ALL' && evt.currency !== currencyFilter) return false;
    return true;
  });

  return (
    <div id="economic-calendar-page" className="py-10 bg-[#080B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-500 font-mono text-xs font-bold uppercase tracking-widest">
                Waktu Indonesia Barat (WIB)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Kalender Ekonomi Global
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Jadwal rilis indikator makroekonomi, pidato bank sentral, dan peristiwa berdampak tinggi bagi XAUUSD & Forex.
            </p>
          </div>

          <div className="text-right font-mono text-xs text-gray-400 bg-[#10151F] px-4 py-2 rounded-sm border border-white/10">
            <span className="text-gray-500 block text-[10px]">WAKTU SISTEM</span>
            <span className="text-[#00FF95] font-bold">LIVE SYNC WIB (GMT+7)</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#10151F] rounded-lg border border-white/10 mb-6">
          {/* Date tabs */}
          <div className="flex items-center space-x-1">
            {(['Semua', 'Hari Ini', 'Besok'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDateFilter(d)}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium transition cursor-pointer ${
                  dateFilter === d
                    ? 'bg-yellow-500 text-black font-bold shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Impact Filter */}
            <div className="flex items-center space-x-1 border-r border-white/10 pr-2">
              <span className="text-[11px] text-gray-500 mr-1 hidden sm:inline">Dampak:</span>
              {(['ALL', 'HIGH', 'MEDIUM'] as const).map((imp) => (
                <button
                  key={imp}
                  onClick={() => setImpactFilter(imp)}
                  className={`px-2 py-1 text-xs rounded-sm font-medium cursor-pointer ${
                    impactFilter === imp
                      ? imp === 'HIGH'
                        ? 'bg-[#FF3131]/10 text-[#FF3131] border border-[#FF3131]/30 font-bold'
                        : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {imp === 'ALL' ? 'Semua' : imp === 'HIGH' ? 'High Impact' : 'Medium'}
                </button>
              ))}
            </div>

            {/* Currency Filter */}
            <div className="flex items-center space-x-1">
              <span className="text-[11px] text-gray-500 mr-1 hidden sm:inline">Mata Uang:</span>
              {currencies.map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrencyFilter(curr)}
                  className={`px-2 py-1 text-xs rounded-sm font-mono cursor-pointer ${
                    currencyFilter === curr
                      ? 'bg-white/10 text-white font-bold border border-white/20'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Event List Table */}
        <div className="bg-[#10151F] rounded-lg border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-[#080B12] border-b border-white/10 text-gray-400 font-medium">
                  <th className="py-3 px-4">Waktu (WIB)</th>
                  <th className="py-3 px-3">Negara</th>
                  <th className="py-3 px-4">Peristiwa Ekonomi</th>
                  <th className="py-3 px-3">Dampak</th>
                  <th className="py-3 px-3 text-right">Sebelumnya</th>
                  <th className="py-3 px-3 text-right">Konsensus</th>
                  <th className="py-3 px-4 text-right">Aktual</th>
                  <th className="py-3 px-3 text-center">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEvents.map((evt) => {
                  return (
                    <tr
                      key={evt.id}
                      onClick={() => setSelectedEvent(evt)}
                      className="hover:bg-[#141B28] cursor-pointer transition"
                    >
                      {/* Time */}
                      <td className="py-3.5 px-4 text-white font-bold whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-500" />
                          <span>{evt.timeWib}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 block font-sans">{evt.date}</span>
                      </td>

                      {/* Flag & Currency */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-base">{evt.flag}</span>
                          <span className="font-bold text-gray-200">{evt.currency}</span>
                        </div>
                      </td>

                      {/* Event Title */}
                      <td className="py-3.5 px-4 font-sans font-medium text-white max-w-xs sm:max-w-md">
                        <div className="font-semibold text-white">{evt.title}</div>
                        <div className="text-[11px] text-gray-400 flex items-center space-x-1 mt-0.5">
                          <span className="text-gray-500">Pasar Terkait:</span>
                          {evt.relatedMarkets.map((m) => (
                            <span key={m} className="text-yellow-500 font-mono text-[10px] bg-yellow-500/10 px-1 rounded-sm border border-yellow-500/20">
                              {m}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Impact */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase border ${
                            evt.impact === 'HIGH'
                              ? 'bg-[#FF3131]/10 text-[#FF3131] border-[#FF3131]/30'
                              : evt.impact === 'MEDIUM'
                              ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                              : 'bg-white/5 text-gray-400 border-white/5'
                          }`}
                        >
                          {evt.impact}
                        </span>
                      </td>

                      {/* Previous */}
                      <td className="py-3.5 px-3 text-right text-gray-400">
                        {evt.previous}
                      </td>

                      {/* Forecast */}
                      <td className="py-3.5 px-3 text-right text-gray-200 font-bold">
                        {evt.forecast}
                      </td>

                      {/* Actual */}
                      <td className="py-3.5 px-4 text-right">
                        {evt.actual ? (
                          <span className="text-[#00FF95] font-bold">{evt.actual}</span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(evt);
                          }}
                          className="p-1 text-gray-400 hover:text-yellow-500 hover:bg-white/5 rounded-sm cursor-pointer"
                          title="Lihat dampak pasar"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-[#10151F] border border-white/15 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080B12]">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{selectedEvent.flag}</span>
                <span className="font-mono font-bold text-yellow-500">{selectedEvent.currency}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border ${
                    selectedEvent.impact === 'HIGH'
                      ? 'bg-[#FF3131]/10 text-[#FF3131] border-[#FF3131]/30'
                      : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                  }`}
                >
                  {selectedEvent.impact} IMPACT
                </span>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 text-gray-400 hover:text-white rounded-sm hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {selectedEvent.title}
                </h3>
                <div className="text-xs text-gray-400 font-mono mt-1">
                  Jadwal: {selectedEvent.timeWib} • {selectedEvent.date}
                </div>
              </div>

              {/* Numbers Overview */}
              <div className="grid grid-cols-3 gap-3 font-mono text-center">
                <div className="p-3 bg-[#080B12] rounded-sm border border-white/10">
                  <span className="text-[10px] text-gray-500 block font-sans tracking-wider">SEBELUMNYA</span>
                  <span className="text-sm font-bold text-gray-300">{selectedEvent.previous}</span>
                </div>
                <div className="p-3 bg-[#080B12] rounded-sm border border-white/10">
                  <span className="text-[10px] text-gray-500 block font-sans tracking-wider">KONSENSUS</span>
                  <span className="text-sm font-bold text-yellow-500">{selectedEvent.forecast}</span>
                </div>
                <div className="p-3 bg-[#080B12] rounded-sm border border-white/10">
                  <span className="text-[10px] text-gray-500 block font-sans tracking-wider">AKTUAL</span>
                  <span className="text-sm font-bold text-[#00FF95]">
                    {selectedEvent.actual || 'Menunggu Rilis'}
                  </span>
                </div>
              </div>

              {/* Description & Market Impact */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 font-mono">
                  Deskripsi & Logika Pasar
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed bg-[#080B12] p-3.5 rounded-sm border border-white/5 font-sans">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Impact on Assets */}
              <div className="p-3.5 bg-[#080B12] rounded-sm border border-white/10 space-y-2">
                <h4 className="text-xs font-bold text-yellow-500 uppercase font-mono tracking-wider">
                  Dampak Terhadap Instrumen Terkait
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-[#10151F] rounded-sm border border-white/5">
                    <span className="text-yellow-500 font-bold font-mono">XAUUSD (Emas)</span>
                    <p className="text-[11px] text-gray-400 mt-0.5 font-sans">
                      Jika data aktual &gt; konsensus: Dolar menguat, Emas berpotensi terkoreksi turun sesaat.
                    </p>
                  </div>
                  <div className="p-2 bg-[#10151F] rounded-sm border border-white/5">
                    <span className="text-blue-400 font-bold font-mono">EURUSD / Forex</span>
                    <p className="text-[11px] text-gray-400 mt-0.5 font-sans">
                      Volatilitas tinggi diperkirakan 15-30 menit pasca rilis data. Waspadai pelebaran spread.
                    </p>
                  </div>
                </div>
              </div>

              {/* Historical Track Record */}
              {selectedEvent.historical && selectedEvent.historical.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-300 uppercase font-mono tracking-wider">
                    Catatan Historis Periode Lalu
                  </h4>
                  <div className="divide-y divide-white/5 font-mono text-xs">
                    {selectedEvent.historical.map((h, i) => (
                      <div key={i} className="flex justify-between py-1.5">
                        <span className="text-gray-400">{h.period}</span>
                        <span className="text-white">
                          Aktual: <strong>{h.actual}</strong> (Forecast: {h.forecast})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/10 bg-[#080B12]">
              <span className="text-[11px] text-gray-500">
                Peringatan: Selalu kelola lot saat rilis event High Impact
              </span>
              <button
                onClick={() => {
                  setSelectedSymbol('XAUUSD');
                  setActiveTab('gold');
                  setSelectedEvent(null);
                }}
                className="px-3.5 py-1.5 text-xs font-bold text-black bg-yellow-500 hover:bg-yellow-400 rounded-sm cursor-pointer shadow-sm"
              >
                Buka Chart XAUUSD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
