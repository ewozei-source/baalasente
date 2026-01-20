
import React from 'react';
import { MOCK_MINERS } from '../constants';
import { Cpu, Zap, Database, TrendingUp, Cpu as Chip, Battery, Box } from 'lucide-react';

const MinerScreener: React.FC = () => {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 overflow-hidden">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="text-blue-400" size={20} />
            AI-Infrastructure Pivot Screener
          </h3>
          <p className="text-sm text-slate-400">Tracking crypto miners expanding into HPC & Enterprise AI clusters</p>
        </div>
        <div className="flex gap-4">
          <div className="px-3 py-1 bg-blue-500/10 rounded border border-blue-500/20 text-[10px] text-blue-400 font-mono flex items-center gap-2">
            <Box size={12} /> H100 CLUSTER SYNC: ACTIVE
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-500 border-b border-slate-800 font-mono text-[9px] uppercase tracking-[0.2em]">
            <tr>
              <th className="px-4 py-4">Enterprise Ticker</th>
              <th className="px-4 py-4 text-center">AI Rev %</th>
              <th className="px-4 py-4">GPU Cluster (H100)</th>
              <th className="px-4 py-4 text-right">Cluster Efficiency</th>
              <th className="px-4 py-4 text-right">Energy Cost</th>
              <th className="px-4 py-4">Total Power</th>
              <th className="px-4 py-4">Sentiment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {MOCK_MINERS.map((miner) => (
              <tr key={miner.ticker} className="hover:bg-indigo-600/5 transition-colors group">
                <td className="px-4 py-5">
                  <div className="font-bold text-white group-hover:text-indigo-400 transition-colors">{miner.ticker}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-tight">{miner.name}</div>
                </td>
                <td className="px-4 py-5">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: `${miner.aiRevenuePct}%` }}></div>
                    </div>
                    <span className="font-mono text-[10px] text-blue-400">{miner.aiRevenuePct}%</span>
                  </div>
                </td>
                <td className="px-4 py-5 font-mono text-slate-300 text-xs">
                  <div className="flex items-center gap-2">
                    <Chip size={14} className="text-indigo-500" />
                    {miner.h100Count.toLocaleString()} units
                  </div>
                </td>
                <td className="px-4 py-5 text-right font-mono text-xs text-white">
                  {(85 + Math.random() * 10).toFixed(1)}%
                </td>
                <td className="px-4 py-5 text-right font-mono text-xs">
                  <span className={miner.energyCost < 0.035 ? 'text-emerald-400' : 'text-amber-400'}>
                    ${miner.energyCost.toFixed(3)}/kWh
                  </span>
                </td>
                <td className="px-4 py-5 text-slate-300 text-xs">
                  <span className="flex items-center gap-1"><Zap size={14} className="text-yellow-500" /> {miner.computeCapacity}</span>
                </td>
                <td className="px-4 py-5">
                  <span className={`px-2 py-1 rounded text-[9px] uppercase font-black tracking-widest border ${
                    miner.sentiment === 'Bullish' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                    miner.sentiment === 'Neutral' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : 
                    'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    {miner.sentiment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800/60">
          <div className="text-slate-500 text-[10px] uppercase tracking-widest flex items-center gap-1 mb-2 font-mono"><Chip size={14} /> Aggregate Clusters</div>
          <div className="text-2xl font-bold text-white font-mono">12.4 <span className="text-xs text-slate-600 font-normal">TFLOPS Avg</span></div>
        </div>
        <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800/60">
          <div className="text-slate-500 text-[10px] uppercase tracking-widest flex items-center gap-1 mb-2 font-mono"><Battery size={14} /> Avg OpEx Efficiency</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">92.4%</div>
        </div>
        <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800/60">
          <div className="text-slate-500 text-[10px] uppercase tracking-widest flex items-center gap-1 mb-2 font-mono"><TrendingUp size={14} /> Pivot Momentum</div>
          <div className="text-2xl font-bold text-indigo-400 font-mono">+12.4% <span className="text-[10px] text-slate-600 font-normal">QoQ</span></div>
        </div>
        <div className="p-4 bg-indigo-600/10 rounded-xl border border-indigo-500/20 flex flex-col justify-center">
          <p className="text-[10px] font-black uppercase text-indigo-400 mb-1">Nexus AI Signal</p>
          <p className="text-[11px] text-slate-300 leading-tight">Miners with energy costs &lt; $0.035 are capturing 80% of AI HPC market share.</p>
        </div>
      </div>
    </div>
  );
};

export default MinerScreener;
