
import React, { useState } from 'react';
import { Code, Terminal, Play, Save, ShieldAlert, Cpu, Database, Zap, FileCode } from 'lucide-react';

const PYTHON_LOGIC = `import ccxt
import pandas as pd
import json

class NexusAgenticCore:
    def __init__(self, api_key, model="gemini-3-pro"):
        self.weights = {"tech": 0.60, "sentiment": 0.30, "correlation": 0.10}
        self.support_level = 89200
        self.risk_override_threshold = 0.001 # 0.1% spike

    def weighted_signal(self, tech_score, sent_score, corr_score):
        """Logic: 60% Tech, 30% Sentiment, 10% Correlation"""
        final = (tech_score * self.weights["tech"]) + \\
                (sent_score * self.weights["sentiment"]) + \\
                (corr_score * self.weights["correlation"])
        return final

    def check_risk_override(self, yield_change):
        if yield_change > self.risk_override_threshold:
            return "CANCEL_LONG_ENTRIES"
        return "PROCEED"

    def auto_hedge(self, price):
        if price < self.support_level:
            return "BUY_PUTS_HEDGE"
        return "STAY_NATIVE"

    def generate_signal(self, data):
        # 1. Quant Scan (Gamma Squeeze)
        # 2. Sentiment Parser (Institutional weighting)
        # 3. Correlation Check (AI-Miner Lead-Lag)
        # 4. JSON Output
        return json.dumps({
            "Confidence": 0.89,
            "Action": "BUY",
            "Reasoning": "AI-Miner basket breakout detected while gamma flip holds above 89k."
        })`;

const StrategyLab: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] Kernel v2.8 initialized", "[AUTH] Elite credentials verified"]);

  const simulateRun = () => {
    setIsRunning(true);
    setLogs(prev => [...prev, "[RUN] NexusAgenticCore initializing...", "[RUN] Syncing Bollinger Band width...", "[RUN] Scraping Davo headlines..."]);
    
    setTimeout(() => {
      setLogs(prev => [...prev, "[RUN] Gamma Pivot detected at $92,400", "[RUN] AI-Miner Correlation: 0.82 (Lead)", "[SUCCESS] Signal Generated: BUY @ 91,240"]);
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full font-mono">
      {/* Code Editor Area */}
      <div className="lg:col-span-8 bg-[#0b0f1a] border border-slate-800 rounded-2xl flex flex-col shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-indigo-500/10 rounded">
              <FileCode size={16} className="text-indigo-400" />
            </div>
            <span className="text-xs font-black text-slate-300 uppercase tracking-widest">nexus_agent_core.py</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
              <Save size={16} />
            </button>
            <button 
              onClick={simulateRun}
              disabled={isRunning}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isRunning ? 'bg-indigo-600/20 text-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
              }`}
            >
              {isRunning ? <RefreshCcw size={14} className="animate-spin" /> : <Play size={14} />}
              {isRunning ? 'EXECUTING...' : 'RUN CORE'}
            </button>
          </div>
        </div>

        <div className="flex-grow p-6 overflow-y-auto text-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-800">
          <pre className="text-indigo-100 selection:bg-indigo-500/30">
            {PYTHON_LOGIC.split('\n').map((line, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-slate-700 w-6 select-none">{i + 1}</span>
                <span className={line.trim().startsWith('def') || line.trim().startsWith('class') ? 'text-indigo-400 font-bold' : line.trim().startsWith('#') ? 'text-slate-600 italic' : line.includes('"') ? 'text-emerald-400' : ''}>
                  {line}
                </span>
              </div>
            ))}
          </pre>
        </div>

        {/* Console */}
        <div className="h-48 border-t border-slate-800 bg-[#020617] p-4 flex flex-col">
          <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-black tracking-widest mb-3">
            <Terminal size={12} /> Execution Console
          </div>
          <div className="flex-grow overflow-y-auto space-y-1 text-[11px] font-mono">
            {logs.map((log, i) => (
              <div key={i} className="text-slate-400">
                <span className="text-indigo-500/50 mr-2">➜</span> {log}
              </div>
            ))}
            {isRunning && <div className="text-indigo-400 animate-pulse ml-6">... PROCESSING_VECTOR_REASONING</div>}
          </div>
        </div>
      </div>

      {/* Logic Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2 mb-6">
            <Zap size={16} className="text-yellow-400" /> Multi-Agent Weights
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-[10px] mb-2 uppercase font-black tracking-widest">
                <span className="text-slate-400">Quantitative Scan</span>
                <span className="text-indigo-400">60%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div className="h-full bg-indigo-500 shadow-[0_0_10px_#6366f1]" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-2 uppercase font-black tracking-widest">
                <span className="text-slate-400">Sentiment Parser</span>
                <span className="text-emerald-400">30%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-2 uppercase font-black tracking-widest">
                <span className="text-slate-400">Lead-Lag Correlation</span>
                <span className="text-yellow-400">10%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div className="h-full bg-yellow-500 shadow-[0_0_10px_#eab308]" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-rose-600/5 border border-rose-500/20 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xs font-black text-rose-400 uppercase tracking-widest flex items-center gap-2 mb-4">
            <ShieldAlert size={16} /> Auto-Hedge Shield
          </h3>
          <div className="space-y-4">
             <div className="flex justify-between items-center text-[10px] border-b border-rose-500/10 pb-2">
               <span className="text-slate-500">SUPPORT PIVOT</span>
               <span className="text-white font-mono">$89,200</span>
             </div>
             <div className="flex justify-between items-center text-[10px] border-b border-rose-500/10 pb-2">
               <span className="text-slate-500">YIELD OVERRIDE</span>
               <span className="text-white font-mono">> 0.1% / 2H</span>
             </div>
             <div className="flex items-center gap-3 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
               <Cpu size={24} className="text-rose-500 shrink-0" />
               <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-black italic">
                 Hedge triggers are hard-coded into the Agentic Core to bypass emotional volatility.
               </p>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
            <Database size={14} /> Knowledge Graph
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-slate-800/40 rounded border border-slate-800 text-[10px] text-slate-500 text-center uppercase">FRED_API</div>
            <div className="p-2 bg-slate-800/40 rounded border border-slate-800 text-[10px] text-slate-500 text-center uppercase">COINGLASS</div>
            <div className="p-2 bg-slate-800/40 rounded border border-slate-800 text-[10px] text-slate-500 text-center uppercase">GLASSNODE</div>
            <div className="p-2 bg-slate-800/40 rounded border border-slate-800 text-[10px] text-slate-500 text-center uppercase">DAVOS_RSS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyLab;

// Re-importing RefreshCcw since it was used but not imported
import { RefreshCcw } from 'lucide-react';
