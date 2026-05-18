'use client';

import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Info, Clock, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function TimelinePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const incidents = useStore(state => state.incidents);

  if (!mounted) return <div className="h-full w-full flex items-center justify-center text-slate-500">Loading Incident Timeline...</div>;

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <div className="mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">AI Incident Timeline</h1>
        <p className="text-sm text-slate-400 mt-1">Chronological event log and operational alert history</p>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-12">
        <div className="relative border-l-2 border-slate-800 ml-6 pl-8 space-y-6">
          <AnimatePresence>
            {incidents.length === 0 ? (
              <div className="text-slate-500 italic mt-8">No infrastructure incidents recorded.</div>
            ) : (
              incidents.map((incident, idx) => {
                const isCascading = incident.severity === 'cascading_failure';
                const isCritical = incident.severity === 'critical';
                const isHigh = incident.severity === 'high';
                const isWarning = incident.severity === 'warning' || incident.severity === 'degraded';
                
                const Icon = isCascading ? Activity : isCritical ? ShieldAlert : isWarning ? AlertTriangle : Info;
                
                return (
                  <motion.div
                    key={incident.id}
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, type: 'spring', bounce: 0.4 }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className={cn(
                      "absolute -left-[41px] top-4 w-5 h-5 rounded-full border-4 border-[#0a0f1c] z-10 flex items-center justify-center",
                      isCascading ? "bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] animate-ping" :
                      isCritical ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" : 
                      isHigh ? "bg-orange-500" :
                      isWarning ? "bg-amber-500" : "bg-blue-500"
                    )} />

                    <div className={cn(
                      "rounded-xl border p-5 backdrop-blur-sm transition-all hover:bg-slate-900/80 shadow-xl",
                      isCascading ? 'bg-purple-950/20 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.15)]' :
                      isCritical ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 
                      isHigh ? 'bg-orange-950/20 border-orange-500/30' :
                      isWarning ? 'bg-amber-950/20 border-amber-500/30' : 
                      'bg-slate-900 border-slate-800'
                    )}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className={cn(
                            "w-5 h-5",
                            isCascading ? "text-purple-400" :
                            isCritical ? "text-red-400" :
                            isHigh ? "text-orange-400" :
                            isWarning ? "text-amber-400" : "text-blue-400"
                          )} />
                          <span className={cn(
                            "text-[10px] font-bold uppercase tracking-widest",
                            isCascading ? "text-purple-400" :
                            isCritical ? "text-red-400" :
                            isHigh ? "text-orange-400" :
                            isWarning ? "text-amber-400" : "text-blue-400"
                          )}>
                            {incident.severity.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500 font-mono">
                          <Clock className="w-3 h-3" />
                          {incident.timestamp.toLocaleTimeString([], {hour12:false})}
                        </div>
                      </div>
                      
                      <h3 className="text-sm font-medium text-slate-200 mb-3 leading-relaxed">{incident.message}</h3>
                      
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800/50 font-mono uppercase">
                          Source: {incident.source}
                        </div>
                        
                        {(isCritical || isCascading) && (
                          <div className={cn(
                            "text-[9px] font-bold tracking-wider px-2 py-1 rounded uppercase border",
                            isCascading ? "text-purple-400 bg-purple-950/30 border-purple-900/50" :
                            "text-red-400 bg-red-950/30 border-red-900/50"
                          )}>
                            Requires Immediate Action
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
