'use client';

import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, AlertTriangle, CheckCircle2, ChevronRight, Loader2, Activity, Network, Server, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

// Pre-defined reasoning stages based on scenario
const REASONING_STAGES: Record<string, string[]> = {
  'cpu-spike': [
    "Analyzing anomalous compute patterns across industrial-production namespace...",
    "Correlating localized CPU saturation on recommendation-engine...",
    "Tracing downstream latency propagation to frontend-service edge gateway...",
    "Calculating request failure probability across impact radius...",
    "Generating vertical scaling remediation plan."
  ],
  'memory-leak': [
    "Detecting monotonic heap growth anomaly in payment-service...",
    "Analyzing garbage collection reclamation rates (currently below safe threshold)...",
    "Projecting Out-Of-Memory (OOM) kill timeline...",
    "Isolating impacted transaction routes in finance-ops...",
    "Recommending immediate pod restart and GC tuning."
  ],
  'pvc-latency': [
    "Detecting elevated CSI driver latency on edge-cluster-ap-south-1...",
    "Correlating storage IOPS exhaustion with inventory-db thread starvation...",
    "Mapping retry amplification across payment-service dependencies...",
    "Calculating data inconsistency risk...",
    "Formulating storage tier expansion recommendation."
  ],
  'cascading-failure': [
    "CRITICAL: Detecting catastrophic storage detachment on inventory-db...",
    "Mapping rapidly expanding blast radius across payment-service and analytics-engine...",
    "Analyzing connection pool exhaustion due to distributed retry amplification...",
    "Tracing end-user latency degradation to ingress API gateway...",
    "Synthesizing emergency circuit breaker deployment plan."
  ],
  'network-congestion': [
    "Monitoring elevated packet drop rates at ingress API gateway...",
    "Correlating synchronized latency spikes across e1, e2, and e9 network edges...",
    "Analyzing service-mesh proxy routing efficiency...",
    "Calculating industrial control plane degradation risk...",
    "Recommending aggressive traffic shaping and rate limiting."
  ]
};

export default function InsightsPage() {
  const [mounted, setMounted] = useState(false);
  const activeScenario = useStore(state => state.activeScenario);
  const nodes = useStore(state => state.nodes);
  const stabilityScore = useStore(state => state.stabilityScore);
  
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [confidence, setConfidence] = useState(42.5);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (activeScenario && activeScenario !== 'reset') {
      setCurrentStageIndex(0);
      setConfidence(42.5);
      
      const stages = REASONING_STAGES[activeScenario]?.length || 3;
      
      const interval = setInterval(() => {
        setCurrentStageIndex(prev => {
          if (prev < stages - 1) {
            setConfidence(c => Math.min(99.9, c + (Math.random() * 15 + 5)));
            return prev + 1;
          }
          clearInterval(interval);
          setConfidence(c => Math.min(99.9, c + (Math.random() * 5)));
          return prev;
        });
      }, 2500);
      
      return () => clearInterval(interval);
    }
  }, [activeScenario]);

  if (!mounted) return <div className="h-full w-full flex items-center justify-center text-slate-500">Initializing AI Correlation Engine...</div>;

  const isActive = activeScenario && activeScenario !== 'reset';
  const stages = isActive ? REASONING_STAGES[activeScenario] : [];
  const isComplete = currentStageIndex === stages?.length - 1;

  const impactedNodes = nodes.filter(n => n.status !== 'healthy');
  const riskLevel = impactedNodes.some(n => n.status === 'critical') ? 'CRITICAL' : impactedNodes.length > 0 ? 'HIGH' : 'NOMINAL';

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">AI Correlation Engine</h1>
          <p className="text-sm text-slate-400 mt-1">Autonomous Root Cause Analysis & Blast Radius Modeling</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg">
          <BrainCircuit className={cn("w-5 h-5", isActive && !isComplete ? "text-purple-500 animate-pulse" : "text-slate-500")} />
          <div className="text-sm font-medium text-slate-300 uppercase tracking-widest">
            {isActive && !isComplete ? "Analyzing Telemetry..." : "Engine Standby"}
          </div>
        </div>
      </div>

      {!isActive ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
          <BrainCircuit className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-lg">No active anomalous telemetry detected.</p>
          <p className="text-sm mt-2 opacity-70">Trigger a scenario via the Demo Controller to initiate causality mapping.</p>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Reasoning Journey */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0a0f1c] border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-lg font-bold text-slate-100">Root Cause Journey</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Correlation Confidence</span>
                  <span className={cn(
                    "font-mono text-xl font-bold",
                    confidence > 90 ? "text-emerald-400" : confidence > 70 ? "text-amber-400" : "text-slate-400"
                  )}>
                    {confidence.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                {stages.map((stage, idx) => {
                  const isCurrent = idx === currentStageIndex;
                  const isPast = idx < currentStageIndex;
                  const isFuture = idx > currentStageIndex;
                  
                  if (isFuture) return null;

                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex flex-col items-center mt-1">
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center border",
                          isPast ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" :
                          isCurrent ? "bg-purple-500/20 border-purple-500 text-purple-400" : ""
                        )}>
                          {isPast ? <CheckCircle2 className="w-4 h-4" /> : <Loader2 className="w-4 h-4 animate-spin" />}
                        </div>
                        {idx !== stages.length - 1 && !isFuture && (
                          <div className={cn(
                            "w-0.5 h-10 mt-2",
                            isPast ? "bg-emerald-500/50" : "bg-slate-800"
                          )} />
                        )}
                      </div>
                      
                      <div className={cn(
                        "flex-1 p-4 rounded-lg border",
                        isPast ? "bg-slate-900 border-slate-800 text-slate-300" :
                        "bg-purple-950/20 border-purple-500/30 text-purple-200"
                      )}>
                        <div className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-1">Step {idx + 1}</div>
                        <div className="text-sm font-medium leading-relaxed">{stage}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {/* Remediation Plan (Only shows when complete) */}
            <AnimatePresence>
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-6 shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">Recommended Remediation</h3>
                  <div className="flex items-start gap-3 bg-slate-950/50 p-4 rounded-lg border border-slate-800/80">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300 leading-relaxed">
                      AI systems are ready to execute automated remediation protocols. This will resolve the detected resource contention and stabilize the distributed environment within an estimated 45 seconds.
                    </p>
                  </div>
                  <button className="mt-4 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg transition-all">
                    Execute Automated Remediation
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Blast Radius Analysis */}
          <div className="col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0a0f1c] border border-slate-800 rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
                <Network className="w-5 h-5 text-red-400" />
                <h3 className="font-bold text-slate-100">Blast Radius Analysis</h3>
              </div>
              
              <div className="space-y-5">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Operational Risk Level</div>
                  <div className={cn(
                    "text-xl font-bold font-mono tracking-tight",
                    riskLevel === 'CRITICAL' ? "text-red-500" : riskLevel === 'HIGH' ? "text-amber-500" : "text-emerald-500"
                  )}>
                    {riskLevel}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Estimated Request Impact</div>
                  <div className="text-xl font-bold font-mono text-slate-200">
                    {(impactedNodes.length * 4.3 + Math.random() * 2).toFixed(1)}%
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">Impacted Infrastructure</div>
                  <div className="space-y-2">
                    {impactedNodes.map(n => (
                      <div key={n.id} className="flex flex-col p-2 bg-slate-900 rounded border border-slate-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-slate-300">{n.name}</span>
                          <span className={cn(
                            "text-[9px] px-1.5 py-0.5 rounded font-bold uppercase",
                            n.status === 'critical' ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"
                          )}>
                            {n.status}
                          </span>
                        </div>
                        <span className="text-[9px] text-slate-500 font-mono">NS: {n.namespace}</span>
                      </div>
                    ))}
                    {impactedNodes.length === 0 && (
                      <div className="text-xs text-slate-500">No compromised infrastructure detected.</div>
                    )}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">Infrastructure Stress Score</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full transition-all duration-1000",
                          stabilityScore < 50 ? "bg-red-500" : stabilityScore < 80 ? "bg-amber-500" : "bg-emerald-500"
                        )}
                        style={{ width: `${100 - stabilityScore}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono font-bold text-slate-300">{100 - stabilityScore}/100</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
