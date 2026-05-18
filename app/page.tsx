'use client';

import { useStore } from '@/lib/store';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Cpu, Server, Network, ShieldAlert, CheckCircle2, AlertTriangle, AlertOctagon, Database, HardDrive, Binary } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { LiveLogs } from '@/components/live-logs';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { clusterCpu, clusterMemory, activePods, telemetry, incidents, nodes, totalMetrics, pvcThroughput, activeLogs, stabilityScore } = useStore();
  const criticalIncidents = incidents.filter(i => i.severity === 'critical' || i.severity === 'cascading_failure');
  
  const activeNamespaces = new Set(nodes.map(n => n.namespace)).size;
  const criticalNodes = nodes.filter(n => n.status === 'critical').length;
  const warningNodes = nodes.filter(n => n.status === 'warning' || n.status === 'degraded').length;
  
  const statusColor = criticalNodes > 0 ? 'text-red-500' : warningNodes > 0 ? 'text-amber-500' : 'text-emerald-500';
  const StatusIcon = criticalNodes > 0 ? AlertOctagon : warningNodes > 0 ? AlertTriangle : CheckCircle2;

  const StatCard = ({ title, value, icon: Icon, subtext, colorClass, dataKey }: any) => {
    const sparklineData = telemetry.slice(-20);
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0a0f1c] border border-slate-800 rounded-xl p-5 shadow-xl relative overflow-hidden flex flex-col justify-between"
      >
        <div className={cn("absolute top-0 right-0 w-32 h-32 bg-current opacity-[0.02] -mr-10 -mt-10 rounded-full", colorClass)} />
        <div className="flex items-center justify-between mb-4 relative z-10">
          <h3 className="text-slate-400 font-semibold text-xs tracking-wider uppercase">{title}</h3>
          <Icon className={cn("w-4 h-4", colorClass)} />
        </div>
        
        {dataKey && sparklineData.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 pointer-events-none">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <Area type="monotone" dataKey={dataKey} stroke="currentColor" fill="currentColor" strokeWidth={2} className={colorClass} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="relative z-10 mt-auto">
          <div className="text-2xl font-bold text-slate-100 font-mono tracking-tight">{mounted ? value : '-'}</div>
          <div className="text-[10px] text-slate-500 mt-1.5 uppercase font-medium">{subtext}</div>
        </div>
      </motion.div>
    );
  };

  if (!mounted) return <div className="h-full w-full flex items-center justify-center text-slate-500">Initializing Core Intelligence...</div>;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Global Command Center</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time distributed systems telemetry and infrastructure health</p>
        </div>
        <div className="flex items-center gap-3 bg-[#0a0f1c] border border-slate-800 px-4 py-2 rounded-lg shadow-inner">
          <StatusIcon className={cn("w-5 h-5", statusColor, criticalNodes > 0 && "animate-pulse")} />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Infrastructure State</div>
            <div className={cn("text-sm font-bold tracking-tight", statusColor)}>
              {criticalNodes > 0 ? 'CRITICAL DEGRADATION' : warningNodes > 0 ? 'ELEVATED RISK' : 'OPERATIONAL'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Active Pods" value={activePods} icon={Server} subtext="Across 18 Namespaces" colorClass="text-blue-500" dataKey="cpu" />
        <StatCard title="Total Metrics" value={`${(totalMetrics / 1000000).toFixed(2)}M`} icon={Activity} subtext="Processed per day" colorClass="text-emerald-500" dataKey="memory" />
        <StatCard title="PVC Throughput" value={`${pvcThroughput.toFixed(1)} GB/s`} icon={HardDrive} subtext="Edge & Core Clusters" colorClass="text-purple-500" dataKey="cpu" />
        <StatCard title="Active Logs" value={`${(activeLogs / 1000000).toFixed(2)}M`} icon={Binary} subtext="Indexed Events/day" colorClass="text-amber-500" dataKey="memory" />
        <StatCard title="Stability Score" value={`${stabilityScore}/100`} icon={ShieldAlert} subtext="AI Confidence Index" colorClass={stabilityScore > 80 ? "text-emerald-500" : stabilityScore > 50 ? "text-amber-500" : "text-red-500"} dataKey="cpu" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Charts - takes 2/3 */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CPU Chart */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0a0f1c] border border-slate-800 rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-500" />
                  <h3 className="font-semibold text-slate-200 text-sm tracking-wide">Compute Saturation</h3>
                </div>
                <div className={cn("text-xl font-bold font-mono", clusterCpu > 80 ? "text-red-400" : "text-blue-400")}>{clusterCpu.toFixed(1)}%</div>
              </div>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={telemetry} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={clusterCpu > 80 ? "#ef4444" : "#3b82f6"} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={clusterCpu > 80 ? "#ef4444" : "#3b82f6"} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickMargin={10} minTickGap={30} />
                    <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9', fontSize: '12px', fontFamily: 'monospace' }}
                      itemStyle={{ color: clusterCpu > 80 ? '#ef4444' : '#3b82f6' }}
                    />
                    <Area type="monotone" dataKey="cpu" stroke={clusterCpu > 80 ? "#ef4444" : "#3b82f6"} strokeWidth={2} fillOpacity={1} fill="url(#colorCpu)" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Memory Chart */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0a0f1c] border border-slate-800 rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-purple-500" />
                  <h3 className="font-semibold text-slate-200 text-sm tracking-wide">Memory Utilization</h3>
                </div>
                <div className={cn("text-xl font-bold font-mono", clusterMemory > 80 ? "text-amber-400" : "text-purple-400")}>{clusterMemory.toFixed(1)}%</div>
              </div>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={telemetry} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={clusterMemory > 80 ? "#f59e0b" : "#a855f7"} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={clusterMemory > 80 ? "#f59e0b" : "#a855f7"} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickMargin={10} minTickGap={30} />
                    <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9', fontSize: '12px', fontFamily: 'monospace' }}
                      itemStyle={{ color: clusterMemory > 80 ? '#f59e0b' : '#a855f7' }}
                    />
                    <Area type="monotone" dataKey="memory" stroke={clusterMemory > 80 ? "#f59e0b" : "#a855f7"} strokeWidth={2} fillOpacity={1} fill="url(#colorMem)" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
          
          {/* Live Logs Component */}
          <LiveLogs />
        </div>

        {/* Side Panel - takes 1/3 */}
        <div className="col-span-1 flex flex-col h-full bg-[#0a0f1c] border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="flex items-center justify-between mb-6 relative z-10 border-b border-slate-800/60 pb-4">
            <h3 className="font-semibold text-slate-200 text-sm tracking-wide">Infrastructure Anomalies</h3>
            <div className="text-[9px] font-bold text-slate-400 px-2 py-1 bg-slate-900 rounded border border-slate-800 uppercase tracking-widest">
              Live Feed
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar relative z-10">
            <AnimatePresence>
              {incidents.slice(0, 5).map((incident, i) => (
                <motion.div 
                  key={incident.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 rounded-lg bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        incident.severity === 'cascading_failure' ? "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-ping" : 
                        incident.severity === 'critical' ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" : 
                        incident.severity === 'high' ? "bg-orange-500" :
                        incident.severity === 'warning' || incident.severity === 'degraded' ? "bg-amber-500" : "bg-blue-500"
                      )} />
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider",
                        incident.severity === 'cascading_failure' ? "text-purple-400" : 
                        incident.severity === 'critical' ? "text-red-400" : "text-slate-400"
                      )}>
                        {incident.severity.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{incident.timestamp.toLocaleTimeString([], {hour12:false})}</span>
                  </div>
                  
                  <p className="text-xs font-medium text-slate-300 leading-relaxed mb-3">{incident.message}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-[9px] text-slate-500 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {incident.source}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {incidents.length === 0 && (
              <div className="text-center py-12 flex flex-col items-center">
                <CheckCircle2 className="w-8 h-8 text-slate-700 mb-3" />
                <div className="text-slate-500 text-xs font-medium uppercase tracking-wider">No Anomalies Detected</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
