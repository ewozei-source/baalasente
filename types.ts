
export enum DashboardTab {
  MARKET_MAPS = 'MARKET_MAPS',
  DERIVATIVES = 'DERIVATIVES',
  MINER_SCREENER = 'MINER_SCREENER',
  ETF_TRACKER = 'ETF_TRACKER',
  GEOPOLITICAL_RISK = 'GEOPOLITICAL_RISK',
  TACTICAL_ADVISORY = 'TACTICAL_ADVISORY',
  STRATEGY_LAB = 'STRATEGY_LAB',
  SETTINGS = 'SETTINGS'
}

export interface ConnectivityStatus {
  provider: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'DEGRADED';
  latency: number;
  lastPing: string;
}

export interface DividendData {
  symbol: string;
  exDate: string;
  paymentDate: string;
  amount: number;
  yield: number;
  declarationDate: string;
}

export interface MarketAsset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  marketCap: number;
  sector: 'AI' | 'DePIN' | 'L1' | 'L2' | 'DeFi' | 'Meme' | 'Storage';
}

export interface MinerData {
  ticker: string;
  name: string;
  hashrate: string;
  gpuInventory: number;
  aiRevenuePct: number;
  computeCapacity: string;
  energyCost: number; // USD per kWh
  h100Count: number;
  sentiment: 'Bullish' | 'Neutral' | 'Bearish';
}

export interface OptionFlowData {
  strike: number;
  expiry: string;
  volume: number;
  openInterest: number;
  sentiment: 'Call' | 'Put';
}

export interface FuturesData {
  asset: string;
  price: number;
  oi: number;
  fundingRate: number;
  liquidations24h: number;
}

export interface ETFData {
  date: string;
  price: number;
  inflow: number;
}

export interface BondCorrelationData {
  timestamp: string;
  btcPrice: number;
  yield10Y: number;
  dividendSpread?: number;
}

export interface TradeSignal {
  asset: string;
  type: 'BUY' | 'SELL' | 'HOLD';
  entry: number;
  tp1: number;
  tp2: number;
  sl: number;
  lotSize: number;
  rsi: number;
  timeframe: string;
  rationale: string;
  // Institutional Strategy Metrics
  fundingRate?: number;
  openInterestStatus?: string;
  gammaPivot?: string;
  deltaSkew?: number;
  etfNetFlow?: string;
  exchangeReserveStatus?: 'Accumulation' | 'Distribution';
  dxyCorrelation?: string;
  nexusVerdict?: string;
  confidence?: number;
  hedgeActive?: boolean;
  dividendData?: DividendData;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD';

export interface DemoPosition {
  id: string;
  asset: string;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  currentPrice: number;
  size: number;
  currency: CurrencyCode;
  timestamp: number;
}

export interface DemoPortfolio {
  balance: Record<CurrencyCode, number>;
  positions: DemoPosition[];
}
