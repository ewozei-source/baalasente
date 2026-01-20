
import React, { useState, useEffect, useCallback } from 'react';
import { DashboardTab, CurrencyCode, DemoPortfolio, DemoPosition } from './types';
import { 
  BarChartHorizontal, 
  Cpu, 
  Globe, 
  Search, 
  Bell, 
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Bot,
  Activity,
  Target,
  Wallet,
  Coins,
  LayoutGrid,
  TrendingUp,
  ShieldCheck,
  Zap,
  Wifi,
  Database,
  Lock,
  FileCode
} from 'lucide-react';
import OptionsHeatmap from './components/OptionsHeatmap';
import MinerScreener from './components/MinerScreener';
import ETFTracker from './components/ETFTracker';
import GeopoliticalDashboard from './components/GeopoliticalDashboard';
import TerminalChat from './components/TerminalChat';
import TacticalAdvisory from './components/TacticalAdvisory';
import MarketMap from './components/MarketMap';
import StrategyLab from './components/StrategyLab';
import { ALPHA_NEWS_STREAM, TOP_ASSETS } from './constants';

const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [bootLog, setBootLog] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.MARKET_MAPS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [newsIndex, setNewsIndex] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>('USD');
  
  const [portfolio, setPortfolio] = useState<DemoPortfolio>({
    balance: { USD: 100000, EUR: 92000, GBP: 79000, JPY: 15000000, AUD: 152000 },
    positions: []
  });

  const [btcPrice, setBtcPrice] = useState(0);
  const [ethPrice, setEthPrice] = useState(0);
  const [priceDirection, setPriceDirection] = useState<'up' | 'down'>('up');

  // Boot Sequence Logic
  useEffect(() => {
    const logs = [
      "INITIALIZING NEXUS CORE...",
      "AUTHENTICATING ELITE L3 CREDENTIALS...",
      "CONNECTING TO BINANCE LIQUIDITY POOL...",
      "SYNCING GLOBAL MACRO (FRED) PIPELINE...",
      "WAKING GEMINI-3 PRO NEURAL WEIGHTS...",
      "LOADING MULTI-AGENT HFT STRATEGY...",
      "DATA INTEGRITY VERIFIED. SYSTEM GREEN."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setBootLog(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBooting(false), 800);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","ETHUSDT"]');
        const data = await response.json();
        const btc = parseFloat(data.find((i: any) => i.symbol === 'BTCUSDT')?.price || '0');
        const eth = parseFloat(data.find((i: any) => i.symbol === 'ETHUSDT')?.price || '0');
        setBtcPrice(prev => {
          if (btc > prev) setPriceDirection('up');
          if (btc < prev) setPriceDirection('down');
          return btc;
        });
        setEthPrice(eth);
      } catch (e) {
        console.error("Live Price Fetch Failed", e);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newsInterval = setInterval(() => {
      setNewsIndex(prev => (prev + 1) % ALPHA_NEWS_STREAM.length);
    }, 8000);
    return () => clearInterval(newsInterval);
  }, []);

  const executeSimulatedTrade = useCallback((asset: string, type: 'BUY' | 'SELL', price: number, size: number) => {
    const cost = price * size;
    if (portfolio.balance[baseCurrency] < cost && type === 'BUY') {
      alert("Insufficient Simulated Funds.");
      return;
    }

    const newPosition: DemoPosition = {
      id: Math.random().toString(36).substr(2, 9),
      asset,
      type,
      entryPrice: price,
      currentPrice: price,
      size,
      currency: baseCurrency,
      timestamp: Date.now()
    };

    setPortfolio(prev => ({
      ...prev,
      balance: {
        ...prev.balance,
        [baseCurrency]: prev.balance[baseCurrency] - (type === 'BUY' ? cost : 0)
      },
      positions: [...prev.positions, newPosition]
    }));
  }, [portfolio.balance, baseCurrency]);

  const navigation = [
    { name: 'Market Maps', tab: DashboardTab.MARKET_MAPS, icon: LayoutGrid },
    { name: 'Tactical Advisory', tab: DashboardTab.TACTICAL_ADVISORY, icon: Target },
    { name: 'Strategy Lab', tab: DashboardTab.STRATEGY_LAB, icon: FileCode },
    { name: 'Derivatives & Flow', tab: DashboardTab.DERIVATIVES, icon: BarChartHorizontal },
    { name: 'AI Infrastructure', tab: DashboardTab.MINER_SCREENER, icon: Cpu },
    { name: 'ETF Dominance', tab: DashboardTab.ETF_TRACKER, icon: Activity },
    { name: 'Geopolitical Risk', tab: DashboardTab.GEOPOLITICAL_RISK, icon: Globe },
  ];

  const currencySymbols: Record<CurrencyCode, string> = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$' };
  const currentContext = navigation.find(n => n.tab === activeTab)?.name || "General Dashboard";

  const renderContent = () => {
    switch (activeTab) {
      case DashboardTab.MARKET_MAPS: return <MarketMap />;
      case DashboardTab.TACTICAL_ADVISORY: 
        return <TacticalAdvisory baseCurrency={baseCurrency} onExecute={executeSimulatedTrade} portfolio={portfolio} />;
      case DashboardTab.STRATEGY_LAB: return <StrategyLab />;
      case DashboardTab.DERIVATIVES: return <OptionsHeatmap />;
      case DashboardTab.MINER_SCREENER: return <MinerScreener />;
      case DashboardTab.ETF_TRACKER: return <ETFTracker />;
      case DashboardTab.GEOPOLITICAL_RISK: return <GeopoliticalDashboard />;
      default: return <MarketMap />;
    }
  };

  if (isBooting) {
    return (
      <div className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center z-[100] font-mono">
        <div className="w-full max-w-lg p-8 border border-slate-800 rounded-2xl bg-slate-900/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-scan"></div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)]">
              <Sparkles className="text-white animate-pulse" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">Nexus <span className="text-indigo-500">Elite</span></h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">v2.8.4 Agentic Terminal</p>
            </div>
          </div>
          <div className="space-y-2 mb-8 h-40 overflow-hidden">
            {bootLog.map((log, i) => (
              <div key={i} className="text-[10px] text-indigo-400 flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
                <span className="font-bold">{log}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 animate-progress"></div>
          </div>
          <div className="mt-4 flex justify-between text-[8px] text-slate-600 uppercase tracking-widest font-black">
            <span>Kernel Loaded</span>
            <span>Securing Multi-Agent Handshake...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex overflow-hidden relative">
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay z-50"></div>
      
      {/* Sidebar - Pro Density */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0f1e] border-r border-slate-800/60 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="text-white" size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">Nexus<span className="text-indigo-500">.io</span></span>
          </div>

          <nav className="flex-grow space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.tab);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative overflow-hidden ${
                  activeTab === item.tab 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
                }`}
              >
                <item.icon size={18} className={activeTab === item.tab ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'} />
                {item.name}
                {activeTab === item.tab && <ChevronRight size={14} className="ml-auto" />}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-3 pt-6 border-t border-slate-800/50">
             <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/50 shadow-inner group cursor-pointer hover:border-indigo-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-widest">
                    <Wallet size={12} /> Elite Portfolio
                  </div>
                  <Lock size={10} className="text-slate-600" />
                </div>
                <div className="text-lg font-mono font-bold text-white tabular-nums group-hover:text-indigo-400 transition-colors">
                  {currencySymbols[baseCurrency]}{portfolio.balance[baseCurrency].toLocaleString()}
                </div>
                <div className="text-[9px] text-slate-500 mt-1 uppercase tracking-tighter">Settlement: {baseCurrency}</div>
             </div>
            <button 
              onClick={() => setChatOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition-all shadow-sm"
            >
              <Bot size={18} /> Strategy Intel
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col h-screen relative overflow-hidden bg-[#020617]">
        <div className="h-8 bg-slate-950 border-b border-slate-800 flex items-center overflow-hidden shrink-0">
          <div className="flex animate-marquee whitespace-nowrap gap-8 text-[10px] font-mono font-bold uppercase py-1">
            {TOP_ASSETS.map(asset => (
              <span key={asset.symbol} className="flex gap-2">
                <span className="text-slate-400">{asset.symbol}</span>
                <span className="text-white">${asset.price.toLocaleString()}</span>
                <span className={asset.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{asset.change >= 0 ? '▲' : '▼'}{Math.abs(asset.change)}%</span>
              </span>
            ))}
            {TOP_ASSETS.map(asset => (
              <span key={`${asset.symbol}-dup`} className="flex gap-2">
                <span className="text-slate-400">{asset.symbol}</span>
                <span className="text-white">${asset.price.toLocaleString()}</span>
                <span className={asset.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{asset.change >= 0 ? '▲' : '▼'}{Math.abs(asset.change)}%</span>
              </span>
            ))}
          </div>
        </div>

        <header className="h-16 border-b border-slate-800/60 flex items-center justify-between px-6 bg-[#020617]/50 backdrop-blur-2xl shrink-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-slate-800 rounded-lg">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center bg-slate-950 border border-slate-800/60 rounded-full px-4 py-1.5 gap-4 ml-4 shadow-inner">
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-slate-500" />
                <select 
                  value={baseCurrency}
                  onChange={(e) => setBaseCurrency(e.target.value as CurrencyCode)}
                  className="bg-transparent border-none text-[10px] font-black uppercase text-slate-300 focus:ring-0 outline-none cursor-pointer tracking-widest"
                >
                  {Object.keys(portfolio.balance).map(c => <option key={c} value={c} className="bg-slate-900">{c} Terminal</option>)}
                </select>
              </div>
              <div className="h-4 w-[1px] bg-slate-800"></div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10b981]"></div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Binance</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_5px_#6366f1]"></div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">FRED</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden xl:flex gap-8 text-xs font-mono">
              <div className="flex flex-col">
                <span className="text-slate-500 uppercase text-[9px] tracking-widest font-black">BTC / {baseCurrency}</span>
                <span className={`font-bold tabular-nums transition-all duration-300 ${priceDirection === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {btcPrice > 0 ? `${currencySymbols[baseCurrency]}${(btcPrice * (baseCurrency === 'USD' ? 1 : 0.92)).toLocaleString()}` : 'SYNCING...'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end mr-2">
                 <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Elite Status</span>
                 <span className="text-[10px] text-white font-mono uppercase">L3-Ultra</span>
              </div>
              <button onClick={() => setChatOpen(true)} className="hidden md:flex p-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 rounded-lg items-center gap-2 text-xs font-bold px-4 transition-all border border-indigo-600/20 shadow-lg">
                <Bot size={16} /> <span className="tracking-tight uppercase">AI TERMINAL</span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-800/60">
          <div className="max-w-[1800px] mx-auto w-full">
            <div className="animate-in fade-in zoom-in-95 duration-400 ease-out h-full">
              {renderContent()}
            </div>
          </div>
        </div>

        <footer className="h-10 border-t border-slate-800/60 bg-[#020617] flex items-center justify-between px-6 text-[9px] font-mono shrink-0 relative overflow-hidden">
          <div className="flex gap-10 overflow-hidden">
             <div className="flex gap-10 animate-in fade-in slide-in-from-right duration-1000">
               <span className="text-indigo-400 font-bold uppercase tracking-widest">LATEST INTEL:</span>
               <span className="text-slate-300 font-medium whitespace-nowrap italic">{ALPHA_NEWS_STREAM[newsIndex]}</span>
             </div>
          </div>
          <div className="flex items-center gap-6 z-10 bg-[#020617] pl-6 text-slate-600 uppercase tracking-widest">
            <span className="tabular-nums">NY CLOSE: 14:02:11</span>
            <span className="text-indigo-500/80 font-bold tracking-[0.2em]">ELITE SUBSCRIPTION ACTIVE</span>
          </div>
        </footer>

        <TerminalChat 
          isOpen={chatOpen} 
          onClose={() => setChatOpen(false)} 
          currentContext={currentContext}
        />
      </main>
    </div>
  );
};

export default App;
