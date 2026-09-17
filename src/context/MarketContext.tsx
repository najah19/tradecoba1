import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MarketQuote, PriceAlert, TradingPosition, TradingIdea, EconomicEvent, NewsArticle } from '../types';
import { INITIAL_QUOTES, TRADING_IDEAS, ECONOMIC_EVENTS, BREAKING_NEWS } from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'alert';
  title: string;
  message: string;
}

interface MarketContextType {
  quotes: MarketQuote[];
  selectedSymbol: string;
  setSelectedSymbol: (symbol: string) => void;
  currentQuote: MarketQuote;
  watchlist: string[];
  toggleWatchlist: (symbol: string) => void;
  isInWatchlist: (symbol: string) => boolean;
  alerts: PriceAlert[];
  addAlert: (symbol: string, condition: 'ABOVE' | 'BELOW', targetValue: number, note?: string) => void;
  removeAlert: (id: string) => void;
  // Demo Trading Engine
  accountBalance: number;
  equity: number;
  activePositions: TradingPosition[];
  openPosition: (symbol: string, type: 'BUY' | 'SELL', lots: number, sl?: number, tp?: number) => void;
  closePosition: (id: string) => void;
  resetDemoAccount: () => void;
  // Navigation & Modals
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  selectedIdea: TradingIdea | null;
  setSelectedIdea: (idea: TradingIdea | null) => void;
  selectedEvent: EconomicEvent | null;
  setSelectedEvent: (event: EconomicEvent | null) => void;
  selectedArticle: NewsArticle | null;
  setSelectedArticle: (article: NewsArticle | null) => void;
  // Toasts
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'info' | 'warning' | 'alert', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quotes, setQuotes] = useState<MarketQuote[]>(INITIAL_QUOTES);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('XAUUSD');
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('agro_watchlist');
      return saved ? JSON.parse(saved) : ['XAUUSD', 'EURUSD', 'NAS100', 'BTCUSD'];
    } catch {
      return ['XAUUSD', 'EURUSD', 'NAS100', 'BTCUSD'];
    }
  });

  const [alerts, setAlerts] = useState<PriceAlert[]>(() => {
    try {
      const saved = localStorage.getItem('agro_alerts');
      return saved ? JSON.parse(saved) : [
        {
          id: 'alert-default-1',
          symbol: 'XAUUSD',
          condition: 'ABOVE',
          targetValue: 3500.0,
          currentPrice: 3450.2,
          createdAt: 'Hari ini',
          status: 'ACTIVE',
          note: 'Breakout All Time High'
        }
      ];
    } catch {
      return [];
    }
  });

  const [accountBalance, setAccountBalance] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('agro_demo_balance');
      return saved ? parseFloat(saved) : 10000.0;
    } catch {
      return 10000.0;
    }
  });

  const [activePositions, setActivePositions] = useState<TradingPosition[]>(() => {
    try {
      const saved = localStorage.getItem('agro_positions');
      return saved ? JSON.parse(saved) : [
        {
          id: 'pos-init-1',
          symbol: 'XAUUSD',
          type: 'BUY',
          lots: 0.5,
          openPrice: 3442.50,
          currentPrice: 3450.20,
          stopLoss: 3425.0,
          takeProfit: 3475.0,
          profit: 385.00,
          openTime: '08:45 WIB'
        }
      ];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<TradingIdea | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EconomicEvent | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'warning' | 'alert', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Live ticking simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setQuotes((prevQuotes) =>
        prevQuotes.map((quote) => {
          // 40% chance of price update per interval
          if (Math.random() > 0.4) {
            const pipFactor = quote.digits === 5 ? 0.0001 : quote.digits === 3 ? 0.01 : 0.1;
            const direction = Math.random() > 0.48 ? 1 : -1;
            const deltaTicks = (Math.floor(Math.random() * 4) + 1) * pipFactor * direction;
            const newBid = Math.max(quote.open * 0.9, Number((quote.bid + deltaTicks).toFixed(quote.digits)));
            const newAsk = Number((newBid + quote.spread).toFixed(quote.digits));
            const newChange = Number((newBid - quote.open).toFixed(quote.digits));
            const newChangePercent = Number(((newChange / quote.open) * 100).toFixed(2));
            const newHigh = Math.max(quote.high, newBid);
            const newLow = Math.min(quote.low, newBid);

            return {
              ...quote,
              bid: newBid,
              ask: newAsk,
              high: newHigh,
              low: newLow,
              change: newChange,
              changePercent: newChangePercent,
              timestamp: 'Live WIB',
            };
          }
          return quote;
        })
      );
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  // Update open positions PnL when quote changes
  useEffect(() => {
    setActivePositions((prev) =>
      prev.map((pos) => {
        const quote = quotes.find((q) => q.symbol === pos.symbol);
        if (!quote) return pos;

        const currentPrice = pos.type === 'BUY' ? quote.bid : quote.ask;
        let pnl = 0;
        if (pos.symbol === 'XAUUSD') {
          // 1 lot = 100 oz -> $1 movement = $100 per lot
          const pointDiff = pos.type === 'BUY' ? currentPrice - pos.openPrice : pos.openPrice - currentPrice;
          pnl = pointDiff * 100 * pos.lots;
        } else if (pos.symbol.includes('USD') && quote.digits === 5) {
          // Standard forex 1 lot = 100,000 units
          const diff = pos.type === 'BUY' ? currentPrice - pos.openPrice : pos.openPrice - currentPrice;
          pnl = diff * 100000 * pos.lots;
        } else {
          const diff = pos.type === 'BUY' ? currentPrice - pos.openPrice : pos.openPrice - currentPrice;
          pnl = diff * (quote.contractSize || 1) * pos.lots;
        }

        return {
          ...pos,
          currentPrice,
          profit: Number(pnl.toFixed(2)),
        };
      })
    );
  }, [quotes]);

  // Check price alerts
  useEffect(() => {
    alerts.forEach((alert) => {
      if (alert.status !== 'ACTIVE') return;
      const quote = quotes.find((q) => q.symbol === alert.symbol);
      if (!quote) return;

      const triggered =
        (alert.condition === 'ABOVE' && quote.bid >= alert.targetValue) ||
        (alert.condition === 'BELOW' && quote.bid <= alert.targetValue);

      if (triggered) {
        addToast(
          'alert',
          `Target Harga Tercapai: ${alert.symbol}!`,
          `${alert.symbol} kini menyentuh ${quote.bid} (Kondisi: ${alert.condition} ${alert.targetValue})`
        );

        setAlerts((prev) =>
          prev.map((a) => (a.id === alert.id ? { ...a, status: 'TRIGGERED' } : a))
        );
      }
    });
  }, [quotes, alerts]);

  // Persist items
  useEffect(() => {
    try {
      localStorage.setItem('agro_watchlist', JSON.stringify(watchlist));
    } catch {}
  }, [watchlist]);

  useEffect(() => {
    try {
      localStorage.setItem('agro_alerts', JSON.stringify(alerts));
    } catch {}
  }, [alerts]);

  useEffect(() => {
    try {
      localStorage.setItem('agro_positions', JSON.stringify(activePositions));
      localStorage.setItem('agro_demo_balance', accountBalance.toString());
    } catch {}
  }, [activePositions, accountBalance]);

  const toggleWatchlist = (symbol: string) => {
    setWatchlist((prev) => {
      const exists = prev.includes(symbol);
      if (exists) {
        addToast('info', 'Dihapus dari Watchlist', `${symbol} telah dikeluarkan dari daftar pantau.`);
        return prev.filter((s) => s !== symbol);
      } else {
        addToast('success', 'Ditambahkan ke Watchlist', `${symbol} berhasil disimpan ke daftar pantau Anda.`);
        return [...prev, symbol];
      }
    });
  };

  const isInWatchlist = (symbol: string) => watchlist.includes(symbol);

  const addAlert = (symbol: string, condition: 'ABOVE' | 'BELOW', targetValue: number, note?: string) => {
    const quote = quotes.find((q) => q.symbol === symbol);
    const newAlert: PriceAlert = {
      id: 'alert-' + Date.now(),
      symbol,
      condition,
      targetValue,
      currentPrice: quote ? quote.bid : targetValue,
      createdAt: 'Baru saja',
      status: 'ACTIVE',
      note: note || `Pantau level ${targetValue}`,
    };
    setAlerts((prev) => [newAlert, ...prev]);
    addToast('success', 'Alert Terpasang', `Pengingat harga ${symbol} (${condition} ${targetValue}) aktif.`);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    addToast('info', 'Alert Dihapus', 'Pengingat harga telah dinonaktifkan.');
  };

  const openPosition = (symbol: string, type: 'BUY' | 'SELL', lots: number, sl?: number, tp?: number) => {
    const quote = quotes.find((q) => q.symbol === symbol) || quotes[0];
    const execPrice = type === 'BUY' ? quote.ask : quote.bid;
    const newPos: TradingPosition = {
      id: 'order-' + Date.now(),
      symbol,
      type,
      lots,
      openPrice: execPrice,
      currentPrice: execPrice,
      stopLoss: sl,
      takeProfit: tp,
      profit: 0.0,
      openTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' WIB',
    };
    setActivePositions((prev) => [newPos, ...prev]);
    addToast('success', `Order ${type} Eksekusi`, `Berhasil membuka ${lots} Lot ${symbol} di harga ${execPrice}.`);
  };

  const closePosition = (id: string) => {
    const pos = activePositions.find((p) => p.id === id);
    if (!pos) return;
    setAccountBalance((prev) => Number((prev + pos.profit).toFixed(2)));
    setActivePositions((prev) => prev.filter((p) => p.id !== id));
    const isProfit = pos.profit >= 0;
    addToast(
      isProfit ? 'success' : 'warning',
      `Posisi Ditutup (${pos.symbol})`,
      `Hasil: ${isProfit ? '+' : ''}$${pos.profit.toFixed(2)} USD ditambahkan ke saldo akun demo.`
    );
  };

  const resetDemoAccount = () => {
    setAccountBalance(10000.0);
    setActivePositions([]);
    addToast('info', 'Demo Di-Reset', 'Saldo akun demo telah dikembalikan ke $10,000 USD virtual funds.');
  };

  const unrealizedPnl = activePositions.reduce((sum, p) => sum + p.profit, 0);
  const equity = Number((accountBalance + unrealizedPnl).toFixed(2));
  const currentQuote = quotes.find((q) => q.symbol === selectedSymbol) || quotes[0];

  return (
    <MarketContext.Provider
      value={{
        quotes,
        selectedSymbol,
        setSelectedSymbol,
        currentQuote,
        watchlist,
        toggleWatchlist,
        isInWatchlist,
        alerts,
        addAlert,
        removeAlert,
        accountBalance,
        equity,
        activePositions,
        openPosition,
        closePosition,
        resetDemoAccount,
        activeTab,
        setActiveTab,
        activeModal,
        setActiveModal,
        selectedIdea,
        setSelectedIdea,
        selectedEvent,
        setSelectedEvent,
        selectedArticle,
        setSelectedArticle,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};
