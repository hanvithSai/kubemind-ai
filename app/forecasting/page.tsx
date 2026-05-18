'use client';

import { useStore } from '@/lib/store';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { LineChart, Zap, AlertTriangle } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

const generateForecastData = (activeScenario: string | null) => {
  const data = [];
  const now = new Date();
  
  // Historical data
  for (let i = 60; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 60000);
    data.push({
      time: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actualMemory: 45 + Math.sin(i / 5) * 5 + Math.random() * 2,
      predictedMemory: null,
      upperBound: null,
      lowerBound: null,
    });
  }

  // Future Prediction
  const lastMemory = data[data.length - 1].actualMemory;
  let currentPrediction = lastMemory;
  
  // If memory leak is active, project aggressive growth
  const growthRate = activeScenario === 'memory-leak' ? 1.5 : 0.2;

  for (let i = 1; i <= 60; i++) {
    const t = new Date(now.getTime() + i * 60000);
    currentPrediction += growthRate + (Math.random() * 0.5 - 0.2);
    
    data.push({
      time: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actualMemory: null,
      predictedMemory: currentPrediction,
      upperBound: currentPrediction + (i * 0.5), // Confidence interval widens over time
      lowerBound: currentPrediction - (i * 0.5),
    });
  }
  
  return data;
};

export default function ForecastingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const activeScenario = useStore(state => state.activeScenario);
  const data = useMemo(() => generateForecastData(activeScenario), [activeScenario]);
  
  const thresholdHitIndex = data.findIndex(d => d.predictedMemory && d.predictedMemory > 85);
  const timeToThreshold = thresholdHitIndex !== -1 ? thresholdHitIndex - 60 : null;

  if (!mounted) return <div className="h-full w-full flex items-center justify-center text-slate-500">Initializing Forecasting Engine...</div>;

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto">
      <div className="mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Predictive Forecasting</h1>
        <p className="text-sm text-slate-400 mt-1">AI-driven capacity planning and resource exhaustion modeling</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0a0f1c] border border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg">
            <LineChart className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Forecast Accuracy</div>
            <div className="text-2xl font-bold font-mono text-slate-100">94.2%</div>
          </div>
        </div>
        
        <div className="bg-[#0a0f1c] border border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Predictive Horizon</div>
            <div className="text-2xl font-bold font-mono text-slate-100">+60 Mins</div>
          </div>
        </div>

        <div className="bg-[#0a0f1c] border border-slate-800 rounded-xl p-5 flex items-center gap-4 relative overflow-hidden">
          {timeToThreshold && timeToThreshold < 30 && (
            <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none" />
          )}
          <div className="p-3 bg-red-500/20 text-red-400 rounded-lg relative z-10">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Time to Exhaustion</div>
            <div className="text-2xl font-bold font-mono text-slate-100">
              {timeToThreshold ? `${timeToThreshold} Mins` : 'Safe'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#0a0f1c] border border-slate-800 rounded-xl p-6 shadow-xl relative">
        <div className="absolute top-4 right-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Historical</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-500 rounded-full" /> AI Predicted</div>
          <div className="flex items-center gap-2"><div className="w-3 h-1 bg-purple-500/20" /> 95% Confidence Interval</div>
        </div>
        <h3 className="font-semibold text-slate-200 mb-6">Cluster Memory Saturation Projection</h3>
        
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" fontSize={10} minTickGap={50} />
            <YAxis stroke="#64748b" fontSize={10} domain={[0, 120]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9', fontSize: '12px' }}
            />
            
            <ReferenceLine y={85} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'CRITICAL THRESHOLD (85%)', fill: '#ef4444', fontSize: 10 }} />
            
            <Area type="monotone" dataKey="actualMemory" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
            
            {/* Confidence Interval */}
            <Area type="monotone" dataKey="upperBound" stroke="none" fill="#a855f7" fillOpacity={0.1} />
            <Area type="monotone" dataKey="lowerBound" stroke="none" fill="#0f172a" fillOpacity={1} />
            
            <Area type="monotone" dataKey="predictedMemory" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
