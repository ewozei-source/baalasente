
import React, { useMemo, useState } from 'react';
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
import { Filter, Calendar, TrendingUp, Activity, BarChart2, Zap, Info } from 'lucide-react';

const OptionsHeatmap: React.FC = () => {
  const [expiryFilter, setExpiryFilter] = useState<string>('All');
  const [sentimentFilter, setSentimentFilter] = useState<'All' | 'Call' | 'Put'>('All');
  const [activeMode, setActiveMode] = useState<'options' | 'futures' | 'gamma'>('options');

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

  // Simulate Gamma Exposure Data
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
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 h-full flex flex-col">
      <div className="mb-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-indigo-400" size={20} />
              Institutional Flow & Skew
            </h3>
            <p className="text-sm text-slate-400">Greeks and positioning analysis</p>
          </div>
          <div className="bg-slate-800/50 p-1 rounded-lg flex border border-slate-700">
            <button 
              onClick={() => setActiveMode('options')}
              className={`px-3 py-1 rounded-md text-[10px] uppercase font-bold transition-all ${activeMode === 'options' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Heatmap
            </button>
            <button 
              onClick={() => setActiveMode('futures')}
              className={`px-3 py-1 rounded-md text-[10px] uppercase font-bold transition-all ${activeMode === 'futures' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Futures
            </button>
            <button 
              onClick={() => setActiveMode('gamma')}
              className={`px-3 py-1 rounded-md text-[10px] uppercase font-bold transition-all ${activeMode === 'gamma' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Gamma (GEX)
            </button>
          </div>
        </div>

        {activeMode === 'options' && (
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5">
              <Calendar size={14} className="text-slate-500" />
              <select 
                value={expiryFilter}
                onChange={(e) => setExpiryFilter(e.target.value)}
                className="bg-transparent text-xs text-slate-300 border-none focus:ring-0 cursor-pointer outline-none font-mono"
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
                  className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
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
              <XAxis 
                type="category" 
                dataKey="expiry" 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                type="number" 
                dataKey="strike" 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                domain={['auto', 'auto']}
                tickFormatter={(v) => `$${v/1000}k`}
              />
              <ZAxis type="number" dataKey="openInterest" range={[200, 4000]} name="OI" />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={filteredData}>
                {filteredData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.sentiment === 'Call' ? '#10b981' : '#f43f5e'} 
                    fillOpacity={0.6}
                    stroke={entry.sentiment === 'Call' ? '#059669' : '#e11d48'}
                    strokeWidth={2}
                  />
                ))}
                <LabelList dataKey="strike" position="top" fill="#94a3b8" fontSize={10} offset={12} />
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        ) : activeMode === 'gamma' ? (
          <div className="h-full flex flex-col">
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gammaData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="strike" stroke="#64748b" fontSize={12} tickFormatter={v => `$${v/1000}k`} />
                  <YAxis stroke="#64748b" fontSize={12} label={{ value: 'Net GEX ($M)', angle: -90, position: 'insideLeft', fill: '#64748b' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="gex" radius={[4, 4, 0, 0]}>
                    {gammaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.gex >= 0 ? '#10b981' : '#f43f5e'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex items-center gap-4">
              <Zap className="text-yellow-400 shrink-0" size={24} />
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-indigo-400">Institutional Gamma Threshold</p>
                <p className="text-sm text-slate-300">The $70,000 strike is currently the <span className="text-white font-bold">Zero-Gamma</span> pivot. Above this level, market makers are long gamma, suppressing volatility. Below, they are short gamma, accelerating sell-offs.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            {MOCK_FUTURES.map((f, i) => (
              <div key={i} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors">{f.asset}</h4>
                    <p className="text-2xl font-mono text-emerald-400">${f.price.toLocaleString()}</p>
                  </div>
                  <Activity size={20} className="text-slate-600 group-hover:text-indigo-500" />
                </div>
                
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 uppercase tracking-widest font-mono">Open Interest</span>
                    <span className="text-white font-mono">${(f.oi / 1e9).toFixed(2)}B</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 uppercase tracking-widest font-mono">Funding Rate</span>
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

      {/* Institutional Data Source Footer */}
      <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-between items-center text-[9px] font-mono text-slate-500 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <Info size={10} />
          <span>L3 Market Connectivity: Active</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="opacity-50 italic">Data powered by</span>
          <span className="text-indigo-400 font-black">Mock API</span>
        </div>
      </div>
    </div>
  );
};

export default OptionsHeatmap;
