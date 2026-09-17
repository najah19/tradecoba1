import { CandleData } from '../types';

export function formatPrice(value: number, digits: number = 2): string {
  if (isNaN(value)) return '0.00';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatCurrencyIdr(usdValue: number, exchangeRate: number = 16250): string {
  const idr = usdValue * exchangeRate;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(idr);
}

// Generate realistic candlestick data for charts
export function generateCandles(
  basePrice: number,
  timeframe: string,
  count: number = 60
): CandleData[] {
  const candles: CandleData[] = [];
  let currentClose = basePrice;
  const now = new Date();

  // interval minutes
  let intervalMinutes = 60;
  if (timeframe === '1m') intervalMinutes = 1;
  else if (timeframe === '5m') intervalMinutes = 5;
  else if (timeframe === '15m') intervalMinutes = 15;
  else if (timeframe === '30m') intervalMinutes = 30;
  else if (timeframe === '1H') intervalMinutes = 60;
  else if (timeframe === '4H') intervalMinutes = 240;
  else if (timeframe === '1D') intervalMinutes = 1440;
  else if (timeframe === '1W') intervalMinutes = 10080;

  // Volatility scale
  const volatility = basePrice > 1000 ? basePrice * 0.0025 : basePrice * 0.0015;

  const startTime = new Date(now.getTime() - count * intervalMinutes * 60 * 1000);

  for (let i = 0; i < count; i++) {
    const candleTime = new Date(startTime.getTime() + i * intervalMinutes * 60 * 1000);
    // Slight upward trend bias with oscillations
    const wave = Math.sin(i / 5) * volatility * 0.8;
    const noise = (Math.random() - 0.48) * volatility;
    const delta = wave + noise;

    const open = currentClose;
    const close = Math.max(open * 0.9, open + delta);
    const high = Math.max(open, close) + Math.random() * volatility * 0.6;
    const low = Math.min(open, close) - Math.random() * volatility * 0.6;
    const volume = Math.floor(150 + Math.random() * 850 + Math.abs(close - open) * 200);

    candles.push({
      time: candleTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      open,
      high,
      low,
      close,
      volume,
    });

    currentClose = close;
  }

  return candles;
}

// EMA Calculation
export function calculateEMA(candles: CandleData[], period: number): (number | null)[] {
  const result: (number | null)[] = [];
  const k = 2 / (period + 1);

  let ema: number | null = null;
  for (let i = 0; i < candles.length; i++) {
    if (i < period - 1) {
      result.push(null);
      continue;
    }
    if (ema === null) {
      // SMA for initial EMA
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += candles[i - j].close;
      }
      ema = sum / period;
    } else {
      ema = candles[i].close * k + ema * (1 - k);
    }
    result.push(ema);
  }
  return result;
}

// RSI Calculation
export function calculateRSI(candles: CandleData[], period: number = 14): (number | null)[] {
  const rsiValues: (number | null)[] = [];
  if (candles.length <= period) return candles.map(() => null);

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const diff = candles[i].close - candles[i - 1].close;
    if (diff >= 0) gains += diff;
    else losses += Math.abs(diff);
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  for (let i = 0; i < candles.length; i++) {
    if (i < period) {
      rsiValues.push(null);
      continue;
    }

    if (i > period) {
      const diff = candles[i].close - candles[i - 1].close;
      const currentGain = diff > 0 ? diff : 0;
      const currentLoss = diff < 0 ? Math.abs(diff) : 0;

      avgGain = (avgGain * (period - 1) + currentGain) / period;
      avgLoss = (avgLoss * (period - 1) + currentLoss) / period;
    }

    if (avgLoss === 0) {
      rsiValues.push(100);
    } else {
      const rs = avgGain / avgLoss;
      const rsi = 100 - 100 / (1 + rs);
      rsiValues.push(parseFloat(rsi.toFixed(1)));
    }
  }

  return rsiValues;
}

export function calculatePositionSize(
  balance: number,
  riskPercent: number,
  entryPrice: number,
  stopLossPrice: number,
  symbol: string
): {
  lotSize: number;
  riskAmount: number;
  stopLossPips: number;
} {
  const riskAmount = (balance * riskPercent) / 100;
  const priceDiff = Math.abs(entryPrice - stopLossPrice);

  let pips = 0;
  let pipValuePerLot = 10; // default for 1 standard lot (e.g. EURUSD)

  if (symbol.includes('XAU') || symbol.includes('GOLD')) {
    // 1 pip = 0.10, 1 point = 0.01, 100 oz contract
    pips = priceDiff * 10;
    pipValuePerLot = 10; // $1 move on 100 oz = $100 per lot => 0.10 move = $10
  } else if (symbol.includes('JPY')) {
    pips = priceDiff * 100;
    pipValuePerLot = 7.5;
  } else if (symbol.includes('NAS') || symbol.includes('US30') || symbol.includes('SPX')) {
    pips = priceDiff;
    pipValuePerLot = 1;
  } else {
    // Standard FX
    pips = priceDiff * 10000;
    pipValuePerLot = 10;
  }

  const effectivePips = Math.max(1, pips);
  const lotSize = parseFloat((riskAmount / (effectivePips * pipValuePerLot)).toFixed(2));

  return {
    lotSize: Math.max(0.01, lotSize),
    riskAmount,
    stopLossPips: effectivePips,
  };
}

export function calculatePipValue(symbol: string, lotSize: number): number {
  if (symbol.includes('XAU') || symbol.includes('GOLD')) {
    return lotSize * 10; // 0.10 price move on 1.0 lot ($100 per $1 move)
  }
  if (symbol.includes('JPY')) {
    return lotSize * 7.5;
  }
  if (symbol.includes('NAS') || symbol.includes('US30')) {
    return lotSize * 1.0;
  }
  return lotSize * 10.0;
}

export function calculateMarginRequired(
  symbol: string,
  lotSize: number,
  price: number,
  leverage: number
): number {
  const lev = Math.max(1, leverage);
  let notional = 0;

  if (symbol.includes('XAU') || symbol.includes('GOLD')) {
    // 100 oz * price
    notional = lotSize * 100 * price;
  } else if (symbol.includes('NAS') || symbol.includes('US30') || symbol.includes('SPX')) {
    notional = lotSize * price;
  } else {
    // Standard 100,000 base currency
    notional = lotSize * 100000;
  }

  return notional / lev;
}

export function calculateFibonacci(
  high: number,
  low: number,
  trend: 'UPTREND' | 'DOWNTREND'
): Record<string, number> {
  const diff = high - low;

  if (trend === 'UPTREND') {
    return {
      '0.0% (Swing High)': high,
      '23.6% Retracement': high - diff * 0.236,
      '38.2% Retracement': high - diff * 0.382,
      '50.0% Equilibrium': high - diff * 0.5,
      '61.8% Golden Pocket': high - diff * 0.618,
      '78.6% Deep Pullback': high - diff * 0.786,
      '100.0% (Swing Low)': low,
      '161.8% Extension': high + diff * 0.618,
    };
  } else {
    return {
      '0.0% (Swing Low)': low,
      '23.6% Retracement': low + diff * 0.236,
      '38.2% Retracement': low + diff * 0.382,
      '50.0% Equilibrium': low + diff * 0.5,
      '61.8% Golden Pocket': low + diff * 0.618,
      '78.6% Deep Pullback': low + diff * 0.786,
      '100.0% (Swing High)': high,
      '161.8% Extension': low - diff * 0.618,
    };
  }
}

