import React, { useMemo, useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  Cell, 
  LabelList,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';
import { MOCK_OPTIONS_FLOW, MOCK_FUTURES } from '../constants';
import { Calendar, TrendingUp, Activity, Zap, Info, Shield, ArrowRight } from 'lucide-react';

const OptionsHeatmap: React.FC = () => {
  const [expiryFilter, setExpiryFilter] = useState<string>('All');
  const [sentimentFilter, setSentimentFilter] = useState<'All' | 'Call' | 'Put'>('All');
  const [activeMode, setActiveMode] = useState<'options' | 'futures' | 'gamma'>('options');
  const [blockTrades, setBlockTrades] = useState<{id: number, size: string, strike: string, type: string, time: string}[]>([]);

  useEffect(() => {
    const mockBlocks = [
      { id: 1, size: "$24.5M", strike: "85,000", type: "CALL", time: "14:02:11" },
      { id: 2, size: "$12.1M", strike: "72,000", type: "PUT", time: "14:01:45" },
      { id: 3, size: "$45.0M", strike: "100,000", type: "CALL", time: "13:58:22" },
      { id: 4, size: "$8.4M", strike: "75,000", type: "CALL", time: "13:55:10" },
    ];
    setBlockTrades(mockBlocks);

    const interval = setInterval(() => {
      setBlockTrades(prev => [
        { 
          id: Date.now(), 
          size: `$${(Math.random() * 50 + 5).toFixed(1)}M`, 
          strike: `${Math.floor(Math.random() * 30 + 70)},000`, 
          type: Math.random() > 0.5 ? 'CALL' : 'PUT', 
          time: new Date().toLocaleTimeString().split(' ')[0] 
        },
        ...prev.slice(0, 4)
      ]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const uniqueExpiries = useMemo(() => {
    const expiries = Array.from(new Set(MOCK_OPTIONS_FLOW.map(d => d.expiry)));
    return ['All', ...expiries.sort()];
  }, []);

  const filteredData = useMemo(() => {
    return MOCK_OPTIONS_FLOW.filter(item => {
      const matchExpiry = expiryFilter === 'All' || item.expiry === expiryFilter;
      const matchSentiment = sentimentFilter === 'All' || item.sentiment === sentimentFilter;
      return matchExpiry && matchSentiment;
    });
  }, [expiryFilter, sentimentFilter]);

  const gammaData = useMemo(() => {
    return [55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000].map(strike => ({
      strike,
      gex: (Math.random() - 0.3) * 500 * (strike > 70000 ? 1.5 : 1),
      oi: Math.floor(Math.random() * 5000)
    }));
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs">
          <p className="text-slate-400">Strike: <span className="text-white font-mono">${d.strike.toLocaleString()}</span></p>
          {activeMode === 'options' ? (
            <>
              <p className="text-slate-400">Expiry: <span className="text-white font-mono">{d.expiry}</span></p>
              <p className="text-slate-400">Type: <span className={d.sentiment === 'Call' ? 'text-emerald-400' : 'text-rose-400'}>{d.sentiment}</span></p>
              <p className="text-slate-400">Volume: <span className="text-white font-mono">{d.volume}</span></p>
            </>
          ) : (
            <p className="text-slate-400">Gamma Impact: <span className={d.gex >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{d.gex.toFixed(2)}M</span></p>
          )}
          <p className="text-slate-400">Open Interest: <span className="text-white font-mono">{d.openInterest || d.oi}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
      <div className="xl:col-span-3 bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col">
        <div className="mb-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tighter">
                <TrendingUp className="text-indigo-400" size={20} />
                Derivatives & Skew
              </h3>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Greeks and institutional positioning</p>
            </div>
            <div className="bg-slate-800/50 p-1 rounded-lg flex border border-slate-700">
              {(['options', 'futures', 'gamma'] as const).map(mode => (
                <button 
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`px-3 py-1 rounded-md text-[9px] uppercase font-black transition-all ${activeMode === mode ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {activeMode === 'options' && (
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5">
                <Calendar size={14} className="text-slate-500" />
                <select 
                  value={expiryFilter}
                  onChange={(e) => setExpiryFilter(e.target.value)}
                  className="bg-transparent text-[10px] text-slate-300 border-none focus:ring-0 cursor-pointer outline-none font-black uppercase"
                >
                  {uniqueExpiries.map(exp => (
                    <option key={exp} value={exp} className="bg-slate-900 text-slate-300">{exp === 'All' ? 'All Expiries' : exp}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1 bg-slate-800/50 border border-slate-700 rounded-lg p-1">
                {(['All', 'Call', 'Put'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSentimentFilter(s)}
                    className={`px-3 py-1 rounded text-[9px] font-black uppercase transition-all ${
                      sentimentFilter === s 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-grow min-h-[450px]">
          {activeMode === 'options' ? (
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis type="category" dataKey="expiry" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis type="number" dataKey="strike" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} domain={['auto', 'auto']} tickFormatter={(v) => `$${v/1000}k`} />
                <ZAxis type="number" dataKey="openInterest" range={[100, 3000]} name="OI" />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={filteredData}>
                  {filteredData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.sentiment === 'Call' ? '#10b981' : '#f43f5e'} 
                      fillOpacity={0.5}
                      stroke={entry.sentiment === 'Call' ? '#10b981' : '#f43f5e'}
                      strokeWidth={1}
                    />
                  ))}
                  <LabelList dataKey="strike" position="top" fill="#64748b" fontSize={9} offset={12} />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          ) : activeMode === 'gamma' ? (
            <div className="h-full flex flex-col">
              <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gammaData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="strike" stroke="#475569" fontSize={10} tickFormatter={v => `$${v/1000}k`} />
                    <YAxis stroke="#475569" fontSize={10} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="gex" radius={[2, 2, 0, 0]}>
                      {gammaData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.gex >= 0 ? '#10b981' : '#f43f5e'} fillOpacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex items-center gap-4">
                <Zap className="text-indigo-400 shrink-0 animate-pulse" size={24} />
                <p className="text-[11px] text-slate-400 font-mono uppercase tracking-tight">
                  <span className="text-white font-bold">Zero-Gamma</span> pivot currently at $70k. Market makers are in "Negative Gamma" below this level, accelerating downside volatility.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
              {MOCK_FUTURES.map((f, i) => (
                <div key={i} className="bg-slate-800/20 border border-slate-800/50 rounded-xl p-6 flex flex-col justify-between hover:border-indigo-500/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors uppercase italic">{f.asset}</h4>
                      <p className="text-2xl font-mono font-bold text-emerald-400 tabular-nums">${f.price.toLocaleString()}</p>
                    </div>
                    <Activity size={20} className="text-slate-600 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <div className="space-y-3 pt-4 border-t border-slate-800/50">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-500">Open Interest</span>
                      <span className="text-white font-mono">${(f.oi / 1e9).toFixed(2)}B</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-500">Funding Rate</span>
                      <span className={f.fundingRate >= 0 ? 'text-emerald-400 font-mono' : 'text-rose-400 font-mono'}>
                        {(f.fundingRate * 100).toFixed(4)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Block Trade Sidebar */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 flex flex-col h-full shadow-2xl">
        <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-2 mb-8">
          <Shield size={16} className="text-indigo-500" /> Block Flow
        </h3>
        <div className="flex-grow space-y-4 overflow-y-auto pr-1">
          {blockTrades.map(trade => (
            <div key={trade.id} className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl group hover:border-indigo-500/30 transition-all cursor-default">
               <div className="flex justify-between items-center mb-2">
                 <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${trade.type === 'CALL' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                   {trade.type}
                 </span>
                 <span className="text-[10px] text-slate-600 font-mono">{trade.time}</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-lg font-mono font-bold text-white italic">{trade.size}</span>
                 <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                    ${trade.strike} <ArrowRight size={10} /> {trade.type === 'CALL' ? 'BULL' : 'BEAR'}
                 </div>
               </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-indigo-600/5 border border-indigo-500/10 rounded-xl">
           <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest leading-relaxed">
             Tracking institutional "Whale" trades >$5M. Large PUT sweeps below current price indicate active downside hedging.
           </p>
        </div>
      </div>
    </div>
  );
};

export default OptionsHeatmap;