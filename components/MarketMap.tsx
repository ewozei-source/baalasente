
import React, { useMemo } from 'react';
import { TOP_ASSETS } from '../constants';
import { TrendingUp, TrendingDown, Maximize2 } from 'lucide-react';
import { MarketAsset } from '../types';

const MarketMap: React.FC = () => {
  const sectors = useMemo(() => {
    const map: Record<string, MarketAsset[]> = {};
    TOP_ASSETS.forEach(asset => {
      if (!map[asset.sector]) map[asset.sector] = [];
      map[asset.sector].push(asset);
    });
    return map;
  }, []);

  const getIntensityColor = (change: number) => {
    if (change === 0) return 'bg-slate-800';
    if (change > 0) {
      if (change > 5) return 'bg-emerald-600';
      if (change > 2) return 'bg-emerald-700';
      return 'bg-emerald-900';
    } else {
      const abs = Math.abs(change);
      if (abs > 5) return 'bg-rose-600';
      if (abs > 2) return 'bg-rose-700';
      return 'bg-rose-900';
    }
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 h-full flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2 italic uppercase tracking-tighter">
            Market Map <span className="text-indigo-500 font-black">ELITE</span>
          </h3>
          <p className="text-[10px] text-slate-500 font-mono">Real-time Performance Heatmap</p>
        </div>
        <div className="flex gap-2">
           <button className="px-3 py-1 bg-slate-800 text-[10px] font-bold text-slate-400 rounded-md hover:text-white transition-all">Crypto</button>
           <button className="px-3 py-1 bg-slate-800 text-[10px] font-bold text-slate-400 rounded-md hover:text-white transition-all">S&P 500</button>
           <Maximize2 size={16} className="text-slate-500 ml-2 cursor-pointer" />
        </div>
      </div>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {Object.entries(sectors).map(([sector, assets]) => (
          <div key={sector} className="border border-slate-800 rounded-lg p-2 bg-slate-950/50 flex flex-col gap-1">
            <h4 className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">{sector}</h4>
            <div className="flex-grow grid grid-cols-2 gap-1">
              {assets.map(asset => (
                <div 
                  key={asset.symbol}
                  className={`${getIntensityColor(asset.change)} p-3 rounded-md flex flex-col justify-center items-center text-center cursor-pointer hover:brightness-110 transition-all border border-black/20 group relative`}
                >
                  <span className="text-xs font-black text-white">{asset.symbol}</span>
                  <span className="text-[9px] font-mono font-bold text-white/80">{asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%</span>
                  
                  {/* Elite Tooltip */}
                  <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 border border-slate-700 p-2 rounded shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1 mb-1">
                      <span className="text-xs font-bold text-white">{asset.name}</span>
                      <span className="text-[10px] text-slate-500">{asset.symbol}</span>
                    </div>
                    <div className="flex flex-col gap-1 text-[9px] font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Price</span>
                        <span className="text-white">${asset.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Cap</span>
                        <span className="text-white">${(asset.marketCap / 1e9).toFixed(1)}B</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest font-mono">Performance Scale:</span>
          <div className="flex h-2 w-48 rounded overflow-hidden">
            <div className="flex-grow bg-rose-600"></div>
            <div className="flex-grow bg-rose-800"></div>
            <div className="flex-grow bg-slate-800"></div>
            <div className="flex-grow bg-emerald-800"></div>
            <div className="flex-grow bg-emerald-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketMap;
