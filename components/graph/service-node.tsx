import { Handle, Position } from '@xyflow/react';
import { Database, Server, Cloud, HardDrive, Globe, Box, Shield, Zap, Activity, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ServiceNode({ data }: { data: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const { name, type, status, cpu, memory, namespace, clusterId, site, deploymentVersion, replicaCount, owner, stressScore } = data;

  const Icon = type === 'database' ? Database : 
               type === 'gateway' ? Globe :
               type === 'cache' ? Cloud :
               type === 'storage' ? HardDrive : Server;

  const isCritical = status === 'critical';
  const isWarning = status === 'warning' || status === 'degraded';
  const isHealthy = status === 'healthy';

  // Heatmap intensity based on stressScore (0-100)
  const stressOpacity = Math.max(0, Math.min(1, stressScore / 100));

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "relative min-w-[240px] rounded-xl border bg-slate-950/80 backdrop-blur-xl shadow-2xl transition-all duration-500",
        isCritical ? "border-red-500/80 shadow-[0_0_40px_-10px_rgba(239,68,68,0.5)]" :
        isWarning ? "border-amber-500/80 shadow-[0_0_40px_-10px_rgba(245,158,11,0.4)]" :
        "border-slate-700 shadow-[0_0_20px_-5px_rgba(0,0,0,0.8)] hover:border-blue-500/50"
      )}>
        <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-slate-600 border-none" />
        
        {/* Background Layers with hidden overflow to contain gradients */}
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          {/* Heatmap Layer */}
          <div 
            className={cn(
              "absolute inset-0 transition-opacity duration-700 mix-blend-screen pointer-events-none",
              isCritical ? "bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.4),transparent_70%)]" :
              isWarning ? "bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.3),transparent_70%)]" :
              "bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]"
            )}
            style={{ opacity: isHealthy ? 1 : stressOpacity }}
          />
          
          {isCritical && (
            <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none" />
          )}
        </div>
      
      <div className="p-4 relative z-10">
        <div className="flex items-start justify-between mb-3 border-b border-slate-800/60 pb-3">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg border",
              isCritical ? "bg-red-500/20 text-red-400 border-red-500/30" :
              isWarning ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
              "bg-blue-500/10 text-blue-400 border-blue-500/20"
            )}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 tracking-tight">{name}</h3>
              <p className="text-[9px] uppercase tracking-wider text-slate-400 font-mono mt-0.5">{namespace}</p>
            </div>
          </div>
          <div className={cn(
            "w-2.5 h-2.5 rounded-full shadow-sm",
            isCritical ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-ping" :
            isWarning ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse" :
            "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
          )} />
        </div>
        
        {/* Advanced Metadata */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Box className="w-3 h-3 text-slate-500" />
            <div className="text-[10px] text-slate-300 font-mono truncate">{site}</div>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-slate-500" />
            <div className="text-[10px] text-slate-300 font-mono truncate">{owner}</div>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <Zap className="w-3 h-3 text-slate-500" />
            <div className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span>{deploymentVersion}</span>
              <span className="w-1 h-1 bg-slate-700 rounded-full" />
              <span>{replicaCount} REPLICAS</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/60">
          <div className="bg-slate-900/50 rounded p-1.5 border border-slate-800">
            <div className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">CPU</div>
            <div className={cn(
              "text-xs font-mono font-semibold mt-0.5",
              cpu > 90 ? "text-red-400" : cpu > 70 ? "text-amber-400" : "text-slate-300"
            )}>{cpu.toFixed(0)}%</div>
          </div>
          <div className="bg-slate-900/50 rounded p-1.5 border border-slate-800">
            <div className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">MEM</div>
            <div className={cn(
              "text-xs font-mono font-semibold mt-0.5",
              memory > 90 ? "text-red-400" : memory > 70 ? "text-amber-400" : "text-slate-300"
            )}>{memory.toFixed(0)}%</div>
          </div>
          <div className="bg-slate-900/50 rounded p-1.5 border border-slate-800">
            <div className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">STRESS</div>
            <div className={cn(
              "text-xs font-mono font-semibold mt-0.5",
              stressScore > 80 ? "text-red-400" : stressScore > 50 ? "text-amber-400" : "text-emerald-400"
            )}>{stressScore.toFixed(0)}</div>
          </div>
        </div>
      </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-slate-600 border-none" />

      {/* Hover Intelligence Card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-4 z-50 pointer-events-none"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-t border-l border-slate-700 rotate-45" />
            <div className="relative z-10 space-y-3">
              <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 border-b border-slate-800 pb-2 mb-2 flex items-center justify-between">
                <span>Intelligence Report</span>
                <span className="flex items-center gap-1 text-emerald-400"><Activity className="w-3 h-3" /> LIVE</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Network I/O</span>
                <span className="text-xs font-mono font-bold text-slate-200">{(cpu * 4.2 + 10).toFixed(1)} MB/s</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Error Rate</span>
                <span className={cn(
                  "text-xs font-mono font-bold",
                  isCritical ? "text-red-400" : isWarning ? "text-amber-400" : "text-emerald-400"
                )}>
                  {isCritical ? "4.8%" : isWarning ? "1.2%" : "0.01%"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">GC Pause Time</span>
                <span className="text-xs font-mono font-bold text-slate-200">{(memory * 0.15).toFixed(1)} ms</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Uptime</span>
                <span className="text-xs font-mono font-bold text-slate-200">99.99{Math.floor(Math.random() * 9)}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
