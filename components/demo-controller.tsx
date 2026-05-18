'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, AlertTriangle, Zap, ServerCrash, Network, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DemoController() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerScenario = useStore(state => state.triggerScenario);
  const activeScenario = useStore(state => state.activeScenario);

  const scenarios = [
    { id: 'cpu-spike', name: 'CPU Spike', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'memory-leak', name: 'Memory Leak', icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { id: 'pvc-latency', name: 'PVC Latency', icon: ServerCrash, color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 'cascading-failure', name: 'Cascading Failure', icon: Network, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 'network-congestion', name: 'Network Congestion', icon: Network, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ] as const;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] w-72 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-200">Scenario Engine</h3>
              <span className="text-[9px] uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded font-bold">Demo Mode</span>
            </div>
            
            <div className="flex flex-col gap-2">
              {scenarios.map(s => (
                <button
                  key={s.id}
                  onClick={() => triggerScenario(s.id as any)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all text-left",
                    activeScenario === s.id 
                      ? "bg-slate-800 border border-slate-600 text-slate-100 shadow-inner" 
                      : "bg-slate-950/50 border border-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
                  <div className={cn("p-1.5 rounded-md", s.bg)}>
                    <s.icon className={cn("w-4 h-4", s.color)} />
                  </div>
                  {s.name}
                  {activeScenario === s.id && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  )}
                </button>
              ))}
              
              <div className="h-px bg-slate-800 my-2" />
              
              <button
                onClick={() => triggerScenario('reset')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm bg-slate-950/50 border border-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all text-left group"
              >
                <div className="p-1.5 rounded-md bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                  <RotateCcw className="w-4 h-4 text-emerald-500" />
                </div>
                Reset Baseline
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center w-14 h-14 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 border border-slate-700/50",
          isOpen ? "bg-slate-800 text-slate-300 rotate-90" : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        )}
      >
        <Settings2 className="w-6 h-6" />
      </button>
    </div>
  );
}
