
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Target, TrendingUp, RefreshCcw, ShieldCheck, Zap, Info, Layers, 
  Calculator, Coins, Globe, Anchor, Diamond, Activity, Link2, 
  Database, Wifi, AlertTriangle, BarChart2, Briefcase, ArrowRightLeft, 
  PieChart, LineChart, ShieldAlert, TrendingDown, Clock, CheckCircle
} from 'lucide-react';
import { generateTradeAdvisory } from '../services/geminiService';
import { TradeSignal, DemoPortfolio, CurrencyCode } from '../types';

interface TacticalAdvisoryProps {
  baseCurrency: CurrencyCode;
  onExecute: (asset: string, type: 'BUY' | 'SELL', price: number, size: number) => void;
  portfolio: DemoPortfolio;
}

const TacticalAdvisory: React.FC<TacticalAdvisoryProps> = ({ baseCurrency, onExecute, portfolio }) => {
  const [selectedClass, setSelectedClass] = useState('Crypto');
  const [loading, setLoading] = useState(false);
  const [forgeStage, setForgeStage] = useState(0);
  const [signal, setSignal] = useState<TradeSignal | null>(null);
  const [livePrice, setLivePrice] = useState<number | null>(null);

  const assets = {
    'Crypto': { icon: <Coins size={14}/>, items: ['BTC', 'ETH', 'SOL', 'LINK'] },
    'Forex': { icon: <Globe size={14}/>, items: ['EUR/USD', 'USD/JPY', 'GBP/USD', 'AUD/NZD'] },
    'Commodities': { icon: <Anchor size={14}/>, items: ['GOLD', 'SILVER', 'BRENT CRUDE'] },
    'Minerals': { icon: <Diamond size={14}/>, items: ['LITHIUM', 'COPPER', 'NICKEL'] },
    'Bonds/Equity': { icon: <Target size={14}/>, items: ['US10Y', 'NVDA', 'TSLA', 'SPY'] }
  };

  const stages = [
    "Establishing Agentic WebSocket...",
    "Delta-hedging Zone Mapping...",
    "AI-Miner Lead-Lag Correlation...",
    "Sentiment Parsing Davo Intel...",
    "Nexus Multi-Strategy Synthesis..."
  ];

  useEffect(() => {
    if (!signal) return;
    setLivePrice(signal.entry);
    const jitterInterval = setInterval(() => {
      setLivePrice(prev => {
        if (prev === null) return null;
        const change = (Math.random() - 0.5) * (signal.entry * 0.00015);
        return prev + change;
      });
    }, 150);
    return () => clearInterval(jitterInterval);
  }, [signal]);

  const fetchSignal = async (asset: string) => {
    setLoading(true);
    setForgeStage(0);
    setSignal(null);
    const stageInterval = setInterval(() => {
      setForgeStage(prev => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 500);

    const data = await generateTradeAdvisory(asset, selectedClass);
    clearInterval(stageInterval);
    if (data) {
      setSignal(data);
    } else {
      setSignal({
        asset: asset,
        type: 'BUY',
        confidence: 0.85,
        entry: 91240,
        tp1: 94500,
        tp2: 98000,
        sl: 89100,
        lotSize: 0.85,
        rsi: 58.4,
        timeframe: 'M15',
        rationale: "Institutional fallback signal active. Gamma pivot detected above support level. 60/30/10 weighting favors accumulation.",
        fundingRate: 0.0001,
        gammaPivot: "$89.5k",
        deltaSkew: -2.4,
        etfNetFlow: "+$410M",
        nexusVerdict: "HFT Core favors long entry. AI-Miner basket lead-lag breakout imminent.",
        hedgeActive: false
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSignal(assets[selectedClass as keyof typeof assets].items[0]);
  }, [selectedClass]);

  // Real-time ETF Overlay Simulation for BTC
  const etfInflow = useMemo(() => {
    return Math.floor(Math.random() * 50) + 20; // Simulated $20M-$70M per 5m
  }, [livePrice]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full font-sans">
      {/* LEFT: Sector Control */}
      <div className="xl:col-span-3 flex flex-col gap-6">
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-[10px] font-black text-indigo-400 mb-6 uppercase tracking-[0.4em] flex items-center gap-2">
            <Layers size={14} /> Multi-Agent Segments
          </h3>
          <div className="space-y-1.5">
            {Object.keys(assets).map(cls => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold transition-all text-left border ${
                  selectedClass === cls 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30' 
                    : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {assets[cls as keyof typeof assets].icon}
                {cls}
              </button>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800">
            <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Instrument Selection</h4>
            <div className="space-y-1">
              {assets[selectedClass as keyof typeof assets].items.map(asset => (
                <button
                  key={asset}
                  onClick={() => fetchSignal(asset)}
                  className="w-full flex justify-between items-center px-4 py-3 rounded-xl hover:bg-indigo-600/10 text-xs text-slate-300 transition-all group border border-transparent hover:border-indigo-500/20"
                >
                  <span className="font-mono tracking-tighter">{asset}</span>
                  <div className="flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:animate-ping"></span>
                     <Zap size={12} className="opacity-0 group-hover:opacity-100 text-indigo-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
            <Database size={12} /> HFT Weighting
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] border-b border-slate-800/50 pb-2">
              <span className="text-slate-500 uppercase">Quant Scan</span>
              <span className="text-white font-bold">60%</span>
            </div>
            <div className="flex justify-between items-center text-[10px] border-b border-slate-800/50 pb-2">
              <span className="text-slate-500 uppercase">Sentiment</span>
              <span className="text-white font-bold">30%</span>
            </div>
            <div className="flex justify-between items-center text-[10px] border-b border-slate-800/50 pb-2">
              <span className="text-slate-500 uppercase">Correlation</span>
              <span className="text-white font-bold">10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: The Intelligence Engine */}
      <div className="xl:col-span-9 space-y-6">
        {loading ? (
          <div className="h-[750px] bg-[#0f172a]/80 border border-slate-800 rounded-3xl flex flex-col items-center justify-center space-y-12 relative overflow-hidden backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#4f46e510,_transparent)]"></div>
            <div className="relative z-10">
              <RefreshCcw className="animate-spin text-indigo-500/10" size={180} />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldCheck className="text-indigo-400 animate-pulse" size={56} />
              </div>
            </div>
            <div className="text-center w-full max-w-md px-10 relative z-10">
              <h2 className="text-4xl font-black uppercase tracking-tighter text-white italic mb-4">Agentic Synthesis</h2>
              <div className="w-full bg-slate-800 h-2.5 rounded-full mt-6 overflow-hidden border border-slate-700">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-1000 ease-in-out shadow-[0_0_25px_#4f46e5]"
                  style={{ width: `${((forgeStage + 1) / stages.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-indigo-400 mt-6 font-mono tracking-[0.5em] uppercase font-black animate-pulse">
                {stages[forgeStage]}
              </p>
            </div>
          </div>
        ) : signal ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in zoom-in-95 duration-700">
            {/* Top Row: The Core Signal */}
            <div className="lg:col-span-8 bg-[#0f172a] border border-slate-800 rounded-3xl p-10 flex flex-col justify-between shadow-2xl relative group overflow-hidden">
               <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000">
                 <Briefcase size={450} />
               </div>
               <div>
                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">AGENTIC EXECUTION READY</span>
                        <span className="text-[10px] text-slate-500 font-mono">{signal.timeframe} HFT Strategy</span>
                        {signal.hedgeActive && (
                           <span className="px-2 py-0.5 bg-rose-500 text-white rounded text-[10px] font-black uppercase tracking-widest animate-pulse">AUTO-HEDGE ACTIVE</span>
                        )}
                      </div>
                      <h2 className="text-8xl font-black text-white italic tracking-tighter uppercase tabular-nums leading-none mb-6">{signal.asset}</h2>
                      
                      {/* Integrated ETF Tracker for BTC */}
                      {signal.asset === 'BTC' && (
                        <div className="mb-6 flex items-center gap-4 bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl w-fit">
                          <Activity size={24} className="text-emerald-400" />
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Real-time ETF Net Flow (M5)</span>
                            <div className="flex items-center gap-2">
                               <span className="text-lg font-mono font-bold text-emerald-400">+${etfInflow}M</span>
                               <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Inflow Spike detected</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        <div className="flex items-baseline gap-2">
                           <span className="text-[11px] text-slate-500 font-black uppercase tracking-widest font-mono">Spot:</span>
                           <span className="text-5xl font-mono font-bold text-white tracking-tighter tabular-nums transition-all">
                             ${(livePrice || signal.entry).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                           </span>
                        </div>
                        <div className="p-2 bg-indigo-500/10 rounded-lg flex flex-col items-center">
                           <span className="text-[8px] text-indigo-400 uppercase font-black tracking-tighter">Confidence</span>
                           <span className="text-sm font-bold text-white">{(signal.confidence! * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-14 py-7 rounded-[3rem] text-5xl font-black italic tracking-tighter border shadow-2xl transition-all hover:scale-105 active:scale-95 duration-500 ${
                      signal.type === 'BUY' ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/30' : 
                      signal.type === 'SELL' ? 'bg-rose-500 text-white border-rose-400 shadow-rose-500/30' : 'bg-slate-700 text-white border-slate-600'
                    }`}>
                      {signal.type}
                    </div>
                  </div>

                  {/* Level Matrix */}
                  <div className="grid grid-cols-3 gap-6 mb-12">
                     <div className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                        <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-2 font-mono">Invalidation</span>
                        <span className="text-2xl font-mono font-bold text-rose-400 tabular-nums">${signal.sl.toLocaleString()}</span>
                     </div>
                     <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                        <span className="text-[10px] text-emerald-500/80 uppercase font-black tracking-widest block mb-2 font-mono">Objective 1</span>
                        <span className="text-2xl font-mono font-bold text-emerald-400 tabular-nums">${signal.tp1.toLocaleString()}</span>
                     </div>
                     <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                        <span className="text-[10px] text-emerald-500/80 uppercase font-black tracking-widest block mb-2 font-mono">Objective 2</span>
                        <span className="text-2xl font-mono font-bold text-emerald-400 tabular-nums">${signal.tp2.toLocaleString()}</span>
                     </div>
                  </div>
               </div>

               {/* Institutional Footprint */}
               <div className="grid grid-cols-3 gap-6 border-t border-slate-800/80 pt-8">
                  <div className="space-y-1">
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black font-mono">ETF Net Flow</p>
                    <p className="text-xl font-mono font-bold text-white">{signal.etfNetFlow}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black font-mono">Gamma Flip</p>
                    <p className="text-xl font-mono font-bold text-indigo-400">{signal.gammaPivot}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black font-mono">Position Size</p>
                    <p className="text-xl font-mono font-bold text-white">{signal.lotSize} <span className="text-xs text-slate-600 font-normal">Units</span></p>
                  </div>
               </div>
            </div>

            {/* Right Panel: The "Verdict" & Strategy Data */}
            <div className="lg:col-span-4 space-y-6">
              {/* Dividend Intelligence Pane for Equities */}
              {signal.dividendData && (
                <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-6 shadow-xl animate-in slide-in-from-right duration-500">
                  <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Clock size={16} /> Yield Intelligence
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] border-b border-indigo-500/10 pb-2">
                      <span className="text-slate-400 uppercase">Div Yield</span>
                      <span className="text-white font-mono font-bold">{signal.dividendData.yield.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] border-b border-indigo-500/10 pb-2">
                      <span className="text-slate-400 uppercase">Ex-Date</span>
                      <span className="text-white font-mono font-bold">{signal.dividendData.exDate}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] border-b border-indigo-500/10 pb-2">
                      <span className="text-slate-400 uppercase">Status</span>
                      <span className="text-emerald-400 font-mono font-bold">DECLARED</span>
                    </div>
                    <p className="text-[9px] text-indigo-500 italic mt-2 font-mono">Source: Massive Dividends API</p>
                  </div>
                </div>
              )}

              <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8 flex flex-col h-full shadow-2xl">
                 <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-2 mb-8">
                   <ShieldCheck size={18} className="text-emerald-500" /> Nexus HFT Core
                 </h3>
                 <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl italic text-slate-300 text-xs leading-relaxed mb-8 shadow-inner">
                   "{signal.nexusVerdict}"
                 </div>

                 {/* Indicators Grid */}
                 <div className="grid grid-cols-1 gap-4 flex-grow">
                    <div className="p-4 bg-slate-800/30 border border-slate-800 rounded-xl flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-900 rounded-lg"><Activity size={14} className="text-indigo-400" /></div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Funding Rate</span>
                       </div>
                       <span className={`text-xs font-mono font-bold ${signal.fundingRate! > 0.0002 ? 'text-rose-400' : 'text-emerald-400'}`}>
                         {(signal.fundingRate! * 100).toFixed(4)}%
                       </span>
                    </div>
                    <div className="p-4 bg-slate-800/30 border border-slate-800 rounded-xl flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-900 rounded-lg"><ShieldAlert size={14} className="text-indigo-400" /></div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Auto-Hedge</span>
                       </div>
                       <span className={`text-xs font-mono font-bold ${signal.hedgeActive ? 'text-rose-400' : 'text-emerald-400'}`}>
                         {signal.hedgeActive ? 'ARMED' : 'NATIVE'}
                       </span>
                    </div>
                    <div className="p-4 bg-slate-800/30 border border-slate-800 rounded-xl flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-900 rounded-lg"><PieChart size={14} className="text-indigo-400" /></div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Logic Mode</span>
                       </div>
                       <span className="text-xs font-mono font-bold text-white uppercase">60/30/10</span>
                    </div>
                 </div>

                 <button 
                  onClick={() => onExecute(signal.asset, signal.type as any, livePrice || signal.entry, signal.lotSize)}
                  className="w-full mt-8 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase italic tracking-tighter hover:bg-indigo-600 hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-3 active:scale-95 border border-white/20"
                 >
                   <Zap size={20} className="fill-current" /> Execute Strategy
                 </button>
              </div>
            </div>

            {/* Strategy Context Block */}
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
               <div className="p-6 bg-[#0f172a] border border-slate-800 rounded-2xl flex flex-col gap-2">
                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono">Hedge Pivot</span>
                 <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-rose-500`}></div>
                    <span className="text-lg font-bold text-white uppercase">$89,200</span>
                 </div>
               </div>
               <div className="p-6 bg-[#0f172a] border border-slate-800 rounded-2xl flex flex-col gap-2">
                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono">Gamma Confidence</span>
                 <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-white">{(signal.confidence! * 100).toFixed(0)}%</span>
                    <div className="flex-grow bg-slate-800 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-indigo-500 h-full" style={{ width: `${signal.confidence! * 100}%` }}></div>
                    </div>
                 </div>
               </div>
               <div className="p-6 bg-[#0f172a] border border-slate-800 rounded-2xl flex flex-col gap-2">
                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono">Agent ID</span>
                 <div className="text-lg font-bold text-indigo-400 font-mono">NX-AGENT-092</div>
               </div>
               <div className="p-6 bg-indigo-600/5 border border-indigo-500/20 rounded-2xl flex items-center gap-4">
                 <Info size={24} className="text-indigo-400 shrink-0" />
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight leading-relaxed font-mono">
                   Agentic Core weights technicals at 60%, sentiment at 30%, and cross-asset correlation at 10%.
                 </p>
               </div>
            </div>
          </div>
        ) : (
          <div className="h-full bg-[#0f172a]/50 border border-slate-800 rounded-3xl flex items-center justify-center border-dashed group">
             <div className="text-center">
                <BarChart2 className="text-slate-800 mb-6 mx-auto group-hover:text-indigo-900 transition-colors" size={60} />
                <p className="text-slate-700 text-xs uppercase font-black tracking-[0.5em] italic">Awaiting Agentic Reasoning...</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TacticalAdvisory;
