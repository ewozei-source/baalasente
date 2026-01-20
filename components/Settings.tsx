
import React from 'react';
import { Shield, Key, Network, Server, Wifi, Database, Lock, Globe, Terminal } from 'lucide-react';

const Settings: React.FC = () => {
  const providers = [
    { name: 'Massive Dividends', status: 'CONNECTED', latency: 12, lastPing: '2s ago', type: 'REST/V3' },
    { name: 'Binance L3 Stream', status: 'CONNECTED', latency: 4, lastPing: '0.1s ago', type: 'WSS' },
    { name: 'FRED Macro Data', status: 'CONNECTED', latency: 45, lastPing: '5m ago', type: 'REST' },
    { name: 'Gemini Neural Hub', status: 'CONNECTED', latency: 120, lastPing: 'Instant', type: 'GRPC' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full font-sans">
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Server className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Terminal Instance: <span className="text-indigo-400">strange_sutherland</span></h2>
              <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mt-1">Status: Active Node | Region: AWS-US-EAST-1</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6 border-b border-slate-800 pb-3">
                <Lock size={14} className="text-indigo-400" /> Security Credentials
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-1">Massive API Key</span>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-indigo-300 truncate">
                    RXI2RzkZyJNzT4IkTYtiOq1EFqABs3h7
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-1">Session Token</span>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-500 truncate">
                    **********_AUTH_ACTIVE
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6 border-b border-slate-800 pb-3">
                <Network size={14} className="text-indigo-400" /> Advanced Logic
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-500">HFT PRIORITY</span>
                  <span className="text-emerald-400 font-bold uppercase">ULTRA_LOW_LATENCY</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-500">GAMMA_PIVOT_OVERRIDE</span>
                  <span className="text-white font-bold uppercase">ENABLED</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-500">YIELD_KILLSWITCH</span>
                  <span className="text-white font-bold uppercase">ARMED @ 0.1%</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-slate-500">NODE_ISOLATION</span>
                  <span className="text-rose-400 font-bold uppercase">DISABLED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8 shadow-xl">
          <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2 mb-8">
            <Globe size={16} className="text-indigo-400" /> External Connectivity Fabric
          </h3>
          <div className="space-y-4">
            {providers.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800 rounded-xl group hover:border-indigo-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                    <Wifi size={18} className={p.status === 'CONNECTED' ? 'text-emerald-400' : 'text-rose-400'} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-tight">{p.name}</h4>
                    <p className="text-[10px] text-slate-500 font-mono uppercase">{p.type} • {p.lastPing}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">{p.status}</div>
                  <div className="text-xs font-mono text-slate-400">{p.latency}ms</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <div className="bg-indigo-600/5 border border-indigo-500/20 rounded-2xl p-6 shadow-xl">
           <div className="flex items-center gap-3 mb-6">
             <Shield className="text-indigo-400" size={24} />
             <h3 className="text-xs font-black text-white uppercase tracking-widest">strange_sutherland Node Info</h3>
           </div>
           <p className="text-xs text-slate-400 leading-relaxed italic mb-8">
             This node is part of the global Nexus institutional fabric. All data is end-to-end encrypted and routed through secure proprietary relayers.
           </p>
           <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1 block">Public Node ID</span>
                <span className="text-xs font-mono text-indigo-300">strange_sutherland_NODE_42</span>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1 block">Security Protocol</span>
                <span className="text-xs font-mono text-white uppercase">AES-256-GCM / QUAD-KEY</span>
              </div>
           </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">
            <Terminal size={14} /> Audit Trail
          </div>
          <div className="space-y-2 text-[10px] font-mono text-slate-500">
             <div className="flex gap-2"><span className="text-slate-700">14:02:11</span> Syncing Massive API Hub...</div>
             <div className="flex gap-2"><span className="text-slate-700">14:02:12</span> Credential RXI2 verified.</div>
             <div className="flex gap-2"><span className="text-slate-700">14:02:15</span> Lead-Lag weights recalculated.</div>
             <div className="flex gap-2"><span className="text-slate-700">14:02:18</span> Node strange_sutherland heartbeat OK.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
