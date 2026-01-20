
import { MinerData, OptionFlowData, ETFData, BondCorrelationData, FuturesData, MarketAsset, DividendData } from './types';

export const TOP_ASSETS: MarketAsset[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 71420, change: 2.45, marketCap: 1400000000000, sector: 'L1' },
  { symbol: 'ETH', name: 'Ethereum', price: 3840, change: 1.20, marketCap: 450000000000, sector: 'L1' },
  { symbol: 'SOL', name: 'Solana', price: 145, change: 5.60, marketCap: 65000000000, sector: 'L1' },
  { symbol: 'TAO', name: 'Bittensor', price: 420, change: 8.40, marketCap: 2800000000, sector: 'AI' },
  { symbol: 'NEAR', name: 'Near Protocol', price: 6.5, change: 4.10, marketCap: 7000000000, sector: 'AI' },
  { symbol: 'RNDR', name: 'Render', price: 9.2, change: -1.50, marketCap: 3500000000, sector: 'AI' },
  { symbol: 'ARB', name: 'Arbitrum', price: 1.1, change: -2.30, marketCap: 3000000000, sector: 'L2' },
  { symbol: 'OP', name: 'Optimism', price: 2.4, change: -0.80, marketCap: 2500000000, sector: 'L2' },
  { symbol: 'LINK', name: 'Chainlink', price: 18.5, change: 3.20, marketCap: 11000000000, sector: 'DePIN' },
  { symbol: 'FIL', name: 'Filecoin', price: 5.8, change: 0.40, marketCap: 3200000000, sector: 'Storage' },
  { symbol: 'AAVE', name: 'Aave', price: 95, change: 1.15, marketCap: 1400000000, sector: 'DeFi' },
  { symbol: 'UNI', name: 'Uniswap', price: 7.8, change: -4.20, marketCap: 4600000000, sector: 'DeFi' },
];

export const MOCK_DIVIDENDS: Record<string, DividendData> = {
  'NVDA': { symbol: 'NVDA', exDate: '2026-03-05', paymentDate: '2026-03-27', amount: 0.04, yield: 0.02, declarationDate: '2026-02-21' },
  'TSLA': { symbol: 'TSLA', exDate: '2026-04-12', paymentDate: '2026-05-01', amount: 0.00, yield: 0.00, declarationDate: '2026-04-01' },
  'SPY': { symbol: 'SPY', exDate: '2026-03-15', paymentDate: '2026-04-30', amount: 1.58, yield: 1.34, declarationDate: '2026-03-01' },
};

export const MOCK_MINERS: MinerData[] = [
  { ticker: 'CORZ', name: 'Core Scientific', hashrate: '23.2 EH/s', gpuInventory: 18000, aiRevenuePct: 45, computeCapacity: '270 MW', energyCost: 0.032, h100Count: 4200, sentiment: 'Bullish' },
  { ticker: 'MARA', name: 'MARA Holdings', hashrate: '34.7 EH/s', gpuInventory: 2000, aiRevenuePct: 5, computeCapacity: '1.1 GW', energyCost: 0.041, h100Count: 200, sentiment: 'Neutral' },
  { ticker: 'WULF', name: 'TeraWulf', hashrate: '8.0 EH/s', gpuInventory: 12000, aiRevenuePct: 35, computeCapacity: '160 MW', energyCost: 0.035, h100Count: 1500, sentiment: 'Bullish' },
  { ticker: 'RIOT', name: 'Riot Platforms', hashrate: '12.4 EH/s', gpuInventory: 500, aiRevenuePct: 2, computeCapacity: '700 MW', energyCost: 0.038, h100Count: 50, sentiment: 'Neutral' },
  { ticker: 'IREN', name: 'Iris Energy', hashrate: '9.4 EH/s', gpuInventory: 8192, aiRevenuePct: 52, computeCapacity: '1.2 GW', energyCost: 0.034, h100Count: 2400, sentiment: 'Bullish' },
];

export const MOCK_OPTIONS_FLOW: OptionFlowData[] = [
  { strike: 70000, expiry: '2024-03-29', volume: 2500, openInterest: 8900, sentiment: 'Call' },
  { strike: 75000, expiry: '2024-03-29', volume: 1800, openInterest: 12400, sentiment: 'Call' },
  { strike: 80000, expiry: '2024-03-29', volume: 3200, openInterest: 15000, sentiment: 'Call' },
  { strike: 90000, expiry: '2024-06-28', volume: 5000, openInterest: 22000, sentiment: 'Call' },
  { strike: 100000, expiry: '2024-12-27', volume: 4500, openInterest: 31000, sentiment: 'Call' },
];

export const MOCK_FUTURES: FuturesData[] = [
  { asset: 'BTC-PERP', price: 71420.50, oi: 12500000000, fundingRate: 0.0001, liquidations24h: 45000000 },
  { asset: 'ETH-PERP', price: 3840.20, oi: 8200000000, fundingRate: -0.0002, liquidations24h: 12000000 },
  { asset: 'SOL-PERP', price: 145.50, oi: 2100000000, fundingRate: 0.0005, liquidations24h: 8000000 },
];

export const MOCK_ETF_FLOWS: ETFData[] = [
  { date: '2024-05-10', price: 71000, inflow: 1100 },
  { date: '2024-05-14', price: 72100, inflow: 450 },
  { date: '2024-05-16', price: 73500, inflow: 920 },
  { date: '2024-05-30', price: 72800, inflow: 840 },
];

export const MOCK_CORRELATION: BondCorrelationData[] = Array.from({ length: 20 }, (_, i) => ({
  timestamp: `Day ${i + 1}`,
  btcPrice: 65000 + (Math.random() * 8000),
  yield10Y: 4.2 + (Math.random() * 0.3),
  dividendSpread: 1.2 + (Math.random() * 0.4),
}));

export const ALPHA_NEWS_STREAM = [
  "FRED: US Core Inflation trending below 2.8% targets.",
  "GLASSNODE: Dormant whale supply (7y+) hits 24-month high.",
  "POLYGON: Institutional liquidity in Lithium futures up 14% WoW.",
  "ALPHA VANTAGE: EUR/USD RSI showing bearish divergence on H4.",
  "NEXUS: Zero-Gamma level for BTC options shifts to $72k."
];
