
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ComposedChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Area,
  Cell,
  ReferenceLine
} from 'recharts';
import { MOCK_ETF_FLOWS } from '../constants';
import { BarChart3, TrendingDown, TrendingUp, Sparkles, Loader2, Calendar, Table as TableIcon, History, Info } from 'lucide-react';
import { getMacroAnalysis } from '../services/geminiService';

const ETFTracker: React.FC = () => {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string>('2024-03-20');
  const [endDate, setEndDate] = useState<string>('2024-05-30');
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      const res = await getMacroAnalysis(`Analyze Bitcoin Spot ETF flows from ${startDate} to ${endDate}. Highlight significant accumulation/distribution events.`);
      setInsight(res);
      setLoading(false);
    };
    fetchInsight();
  }, [startDate, endDate]);

  const filteredFlows = useMemo(() => {
    return MOCK_ETF_FLOWS.filter(flow => flow.date >= startDate && flow.date <= endDate);
  }, [startDate, endDate]);

  const totalInflow = useMemo(() => 
    filteredFlows.reduce((acc, curr) => acc + curr.inflow, 0), 
  [filteredFlows]);

  const uniqueDates = useMemo(() => MOCK_ETF_FLOWS.map(f => f.date).sort(), []);

  const handlePreset = (type: 'all' | 'latest' | 'mid') => {
    if (type === 'all') {
      setStartDate(uniqueDates[0]);
      setEndDate(uniqueDates[uniqueDates.length - 1]);
    } else if (type === 'latest') {
      setStartDate(uniqueDates[uniqueDates.length - 7]);
      setEndDate(uniqueDates[uniqueDates.length - 1]);
    } else if (type === 'mid') {
      setStartDate('2024-04-15');
      setEndDate('2024-05-15');
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isInflow = data.inflow >= 0;
      
      return (
        <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-2xl backdrop-blur-md min-w-[200px]">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">{label}</span>
            <div className={`w-2 h-2 rounded-full ${isInflow ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-0.5 font-mono">Reference Price</p>
              <p className="text-lg font-bold text-white font-mono">${data.price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-0.5 font-mono">Net Flow</p>
              <p className={`text-lg font-bold font-mono ${isInflow ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isInflow ? '+' : ''}{data.inflow}M
              </p>
            </div>
            <div className="pt-2">
              <span className={`px-2 py-1 rounded text-[9px] uppercase font-black tracking-widest border ${
                data.inflow > 500 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                data.inflow < -200 ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                'bg-slate-500/10 text-slate-400 border-slate-500/20'
              }`}>
                {data.inflow > 500 ? 'Strong Buy' : data.inflow < -200 ? 'Major Sell' : 'Neutral Range'}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
      <div className="xl:col-span-3 flex flex-col gap-6">
        {/* Main Controls & Summary */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="text-emerald-400" size={20} />
                ETF Dominance & Cycle Tracker
              </h3>
              <p className="text-sm text-slate-400">Institutional capital flows vs market price action</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 bg-slate-800/40 p-1 rounded-lg border border-slate-700/50">
                <button onClick={() => handlePreset('all')} className="px-2 py-1 text-[10px] uppercase font-bold text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-all">Max</button>
                <button onClick={() => handlePreset('mid')} className="px-2 py-1 text-[10px] uppercase font-bold text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-all">Mid</button>
                <button onClick={() => handlePreset('latest')} className="px-2 py-1 text-[10px] uppercase font-bold text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-all">7D</button>
              </div>

              <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5">
                <Calendar size={14} className="text-slate-500" />
                <div className="flex items-center gap-2 text-xs font-mono">
                  <select 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-transparent text-slate-300 outline-none border-none focus:ring-0 cursor-pointer"
                  >
                    {uniqueDates.map(d => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
                  </select>
                  <span className="text-slate-600">→</span>
                  <select 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-transparent text-slate-300 outline-none border-none focus:ring-0 cursor-pointer"
                  >
                    {uniqueDates.map(d => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-slate-800/50 border border-slate-700 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('chart')}
                  className={`p-1.5 rounded transition-all ${viewMode === 'chart' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <BarChart3 size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded transition-all ${viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <TableIcon size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800/50">
               <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Period Net Flow</div>
               <div className={`text-xl font-bold font-mono ${totalInflow >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                 ${totalInflow.toLocaleString()}M
               </div>
             </div>
             <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800/50">
               <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Avg Volatility</div>
               <div className="text-xl font-bold font-mono text-white">
                 {filteredFlows.length > 0 ? (totalInflow / filteredFlows.length / 10).toFixed(2) : 0}%
               </div>
             </div>
             <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800/50">
               <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Price Delta</div>
               <div className="text-xl font-bold font-mono text-indigo-400">
                 {filteredFlows.length > 1 ? 
                   (((filteredFlows[filteredFlows.length-1].price - filteredFlows[0].price) / filteredFlows[0].price) * 100).toFixed(2)
                   : 0}%
               </div>
             </div>
             <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800/50">
               <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Institutional Signal</div>
               <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] font-mono mt-2">
                 {totalInflow > 1000 ? 'ACCUMULATING' : totalInflow < -500 ? 'DISTRIBUTING' : 'NEUTRAL'}
               </div>
             </div>
          </div>
        </div>

        {/* Content View (Chart or Table) */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex-grow min-h-[500px] flex flex-col overflow-hidden">
          {viewMode === 'chart' ? (
            <div className="flex-grow pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={filteredFlows} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(str) => str.split('-').slice(1).join('/')}
                    dy={10}
                  />
                  <YAxis 
                    yAxisId="left"
                    orientation="left" 
                    stroke="#64748b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(v) => `$${v/1000}k`}
                    domain={['dataMin - 3000', 'dataMax + 3000']}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right" 
                    stroke="#64748b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(v) => `${v}M`}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '4 4' }}
                    isAnimationActive={false} // Faster cursor performance
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={40} 
                    iconType="circle"
                    formatter={(value) => <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-1">{value}</span>}
                  />
                  
                  <ReferenceLine yAxisId="right" y={0} stroke="#475569" strokeDasharray="3 3" />

                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="price" 
                    name="Reference Price" 
                    stroke="#10b981" 
                    fillOpacity={0.15}
                    fill="url(#colorBtc)" 
                    strokeWidth={4}
                    animationDuration={600}
                    animationEasing="ease-in-out"
                  />
                  <Bar 
                    yAxisId="right"
                    dataKey="inflow" 
                    name="Net Flow" 
                    radius={[4, 4, 0, 0]}
                    barSize={24}
                    animationDuration={800}
                  >
                    {filteredFlows.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.inflow >= 0 ? '#3b82f6' : '#f43f5e'} fillOpacity={0.8} />
                    ))}
                  </Bar>
                  
                  <defs>
                    <linearGradient id="colorBtc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex-grow overflow-auto scrollbar-thin scrollbar-thumb-slate-700 mt-2">
              <table className="w-full text-left text-sm">
                <thead className="text-slate-500 border-b border-slate-800 font-mono text-[9px] uppercase tracking-[0.2em] sticky top-0 bg-[#020617] z-10 py-4">
                  <tr>
                    <th className="px-6 py-4">Execution Date</th>
                    <th className="px-6 py-4 text-right">Avg Price</th>
                    <th className="px-6 py-4 text-right">Net Flow ($M)</th>
                    <th className="px-6 py-4">Signal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {filteredFlows.map((flow, idx) => (
                    <tr key={idx} className="hover:bg-indigo-600/5 transition-all group">
                      <td className="px-6 py-4 font-mono text-slate-300 text-xs">
                        <div className="flex items-center gap-3">
                          <History size={14} className="text-slate-600 group-hover:text-indigo-400" />
                          {flow.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-white text-xs">
                        ${flow.price.toLocaleString()}
                      </td>
                      <td className={`px-6 py-4 text-right font-mono font-bold text-xs ${flow.inflow >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {flow.inflow > 0 ? '+' : ''}{flow.inflow}M
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${flow.inflow > 400 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : flow.inflow < -200 ? 'bg-rose-500' : 'bg-slate-600'}`}></div>
                          <span className={`text-[9px] uppercase font-black tracking-wider ${
                            flow.inflow > 400 ? 'text-emerald-400' : 
                            flow.inflow < -200 ? 'text-rose-400' : 
                            'text-slate-500'
                          }`}>
                            {flow.inflow > 400 ? 'Accumulation' : 
                             flow.inflow < -200 ? 'Distribution' : 
                             'Neutral'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* AI Context Sidebar */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col h-full overflow-hidden">
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-400" />
            Nexus Briefing
          </h4>
          <div className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded text-[9px] text-indigo-400 font-mono">
            L3 SYNC
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto text-sm text-slate-300 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 pr-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full opacity-50 space-y-4">
              <Loader2 className="animate-spin text-indigo-500" size={28} />
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Analyzing Flow Data</p>
                <p className="text-[9px] text-slate-500 mt-2 font-mono">Comparing to historical cycles...</p>
              </div>
            </div>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none font-medium leading-relaxed">
              {insight.split('\n').map((line, i) => (
                <p key={i} className="mb-3 last:mb-0 text-slate-400">{line}</p>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-800">
          <div className="space-y-4">
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30 group hover:border-indigo-500/30 transition-all cursor-help">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest flex items-center gap-1">
                  Cycle Alpha <Info size={10} />
                </span>
                <span className="text-[10px] text-indigo-400 font-mono">v2.5</span>
              </div>
              <div className="text-xl font-bold text-white font-mono flex items-baseline gap-1">
                {filteredFlows.length > 0 ? (totalInflow / 1000).toFixed(2) : 0} 
                <span className="text-xs text-slate-500 font-normal">BN</span>
              </div>
              <div className="mt-2 w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full w-2/3 animate-pulse"></div>
              </div>
            </div>
            
            <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 group">
               <History size={14} className="group-hover:rotate-[-45deg] transition-transform" /> Export Audit Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETFTracker;
