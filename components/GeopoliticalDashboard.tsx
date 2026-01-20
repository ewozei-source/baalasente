
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import { MOCK_CORRELATION } from '../constants';
import { Globe, ShieldAlert, BookOpen, ExternalLink, Loader2, BarChart2, TrendingUp, Zap } from 'lucide-react';
import { getGeopoliticalRiskInsights } from '../services/geminiService';

const GeopoliticalDashboard: React.FC = () => {
  const [analysis, setAnalysis] = useState<{ text: string; sources: any[] }>({ text: '', sources: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      const res = await getGeopoliticalRiskInsights();
      setAnalysis(res);
      setLoading(false);
    };
    fetchAnalysis();
  }, []);

  const spreads = [
    { region: 'US - DE (Spread)', value: '1.84%', trend: 'widening', risk: 'Medium' },
    { region: 'US - JP (Spread)', value: '3.12%', trend: 'narrowing', risk: 'High' },
    { region: 'Div Yield vs 10Y (Gap)', value: '-2.45%', trend: 'widening', risk: 'High' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      <div className="lg:col-span-3 flex flex-col gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col">
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="text-indigo-400" size={20} />
                Global Liquidity & Yield Arbitrage
              </h3>
              <p className="text-sm text-slate-400">Risk Correlation: BTC vs 10Y Yields vs Massive Tech Dividend Spreads</p>
            </div>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded text-[9px] font-black text-indigo-400 uppercase tracking-widest">Macro Sync Active</span>
            </div>
          </div>
          
          <div className="flex-grow min-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CORRELATION}>
                <defs>
                  <linearGradient id="colorBtc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSpread" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="timestamp" stroke="#64748b" fontSize={11} hide />
                <YAxis 
                  yAxisId="left" 
                  stroke="#10b981" 
                  fontSize={11} 
                  tickFormatter={(v) => `$${v/1000}k`} 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  stroke="#6366f1" 
                  fontSize={11} 
                  tickFormatter={(v) => `${v}%`} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                />
                <Area 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="btcPrice" 
                  name="BTC/USD" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorBtc)"
                  strokeWidth={3}
                />
                <Area 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="dividendSpread" 
                  name="Tech Yield Spread" 
                  stroke="#f43f5e" 
                  fillOpacity={1} 
                  fill="url(#colorSpread)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="yield10Y" 
                  name="10Y Yield" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  dot={false}
                />
                <Legend iconType="rect" verticalAlign="top" height={36} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex items-center gap-4">
             <Zap className="text-indigo-400" size={24} />
             <p className="text-[11px] text-slate-400 leading-relaxed uppercase font-black italic">
               Cross-referencing "Massive API" tech dividends against 10Y FRED yields. Negative spread indicates capital flight from tech to safe-haven debt, often a leading indicator for BTC volatility.
             </p>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
            <BarChart2 size={14} /> Global Risk Matrix
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {spreads.map((s, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-800/60 p-4 rounded-xl">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-mono">{s.region}</p>
                <div className="flex justify-between items-end">
                  <span className="text-xl font-bold text-white font-mono">{s.value}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-tighter ${s.trend === 'widening' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {s.trend} {s.trend === 'widening' ? '▲' : '▼'}
                  </span>
                </div>
                <div className="mt-2 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full ${s.risk === 'High' ? 'bg-rose-500 w-3/4' : s.risk === 'Medium' ? 'bg-amber-500 w-1/2' : 'bg-emerald-500 w-1/4'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col overflow-hidden">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="text-amber-400" size={20} />
            Global Tensions
          </h3>
          {loading && <Loader2 className="animate-spin text-slate-500" size={16} />}
        </div>
        
        <div className="flex-grow overflow-y-auto pr-2 space-y-4 text-slate-300 text-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-700 font-medium">
          {loading ? (
            <div className="space-y-4">
              <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-slate-800 rounded w-full animate-pulse"></div>
              <div className="h-20 bg-slate-800 rounded w-full animate-pulse"></div>
            </div>
          ) : (
            <>
              <div className="prose prose-invert prose-sm max-w-none font-medium text-slate-400 leading-relaxed">
                {analysis.text.split('\n').map((line, i) => (
                  <p key={i} className="mb-3 last:mb-0">{line}</p>
                ))}
              </div>
              
              {analysis.sources.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 font-mono">
                    <BookOpen size={12} /> Macro Sources
                  </div>
                  <div className="space-y-2">
                    {analysis.sources.slice(0, 3).map((chunk: any, idx: number) => (
                      chunk.web && (
                        <a 
                          key={idx}
                          href={chunk.web.uri} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-3 bg-slate-800/30 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs transition-all group"
                        >
                          <span className="truncate max-w-[150px] text-slate-400 group-hover:text-indigo-400 font-medium">
                            {chunk.web.title || chunk.web.uri}
                          </span>
                          <ExternalLink size={12} className="text-slate-600 group-hover:text-indigo-400 shrink-0" />
                        </a>
                      )
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeopoliticalDashboard;
