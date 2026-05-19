'use client';

import { motion } from 'framer-motion';
import { 
  Network, Cpu, Activity, ShieldAlert, ArrowRight, Zap, Target, 
  EyeOff, GitMerge, LineChart, ServerCrash, Bot, Users, Play,
  Compass, Layers, Terminal, AlertTriangle, CheckCircle
} from 'lucide-react';
import { usePresentationStore } from '@/lib/presentation-store';
import { globalPresentationSteps } from '@/lib/walkthrough-config';

export default function OverviewPage() {
  const { startPresentation } = usePresentationStore();

  const handleStartPresentation = () => {
    startPresentation(globalPresentationSteps);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-28 pb-20">
      
      {/* SECTION 1 — HERO & CORE MISSION */}
      <section data-tour="overview-hero" className="relative pt-12 pb-16 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(59,130,246,0.12),transparent)] pointer-events-none" 
        />
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-6"
        >
          <Compass className="w-4 h-4" />
          Mission Overview
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl"
        >
          Beyond Monitoring: <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
            Autonomous Infrastructure Intelligence
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-slate-400 max-w-3xl mb-10"
        >
          An AI-native operational intelligence platform purpose-built for Kubernetes edge deployments. We map resource dependencies and trace anomaly propagation across distributed K3s and MicroK8s clusters in real time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button 
            onClick={handleStartPresentation}
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:shadow-[0_0_50px_rgba(59,130,246,0.45)] transition-all flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Play className="w-5 h-5 fill-white" />
            Start Guided Tour
          </button>
        </motion.div>
      </section>

      {/* SECTION 2 — PROBLEM UNDERSTANDING */}
      <section data-tour="overview-problem" className="space-y-10 relative z-10 scroll-mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">1. Problem Understanding</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Traditional monitoring leaves edge operations blind to cascading failure paths and dynamic pod relationships.
          </p>
        </div>

        <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8 space-y-6 animate-pulse-subtle">
          <p className="text-slate-300 leading-relaxed text-base">
            Modern edge installations—such as ABB manufacturing lines running localized <strong className="text-blue-400">K3s</strong> or <strong className="text-blue-400">MicroK8s</strong> clusters—are highly dynamic, resource-constrained, and sensitive to disk and network bottlenecks. Traditional observability suites provide simple metric dashboards and siloed alerts, but lack <strong className="text-cyan-400">topological system reasoning</strong>. When a database node experiences high IOPS saturation, downstream services suffer, generating cascades of disconnected warning alerts. Operators are left manually parsing files to isolate root causes.
          </p>
          <div className="border-t border-slate-800/80 pt-6">
            <h4 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-400" /> Key Operational Challenges
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-950/40 p-5 rounded-xl border border-slate-850">
                <h5 className="text-white font-medium mb-2 flex items-center gap-2">
                  <ServerCrash className="w-4 h-4 text-red-400" /> Storage Saturation (CSI/PVC)
                </h5>
                <p className="text-sm text-slate-400">Write amplification lockups silently stall data layers, propagating delays to client-facing APIs.</p>
              </div>
              <div className="bg-slate-950/40 p-5 rounded-xl border border-slate-850">
                <h5 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-400" /> Compute Contention
                </h5>
                <p className="text-sm text-slate-400">Noisy-neighbor workloads exhaust CPU shares at the edge, throttling critical orchestration layers.</p>
              </div>
              <div className="bg-slate-950/40 p-5 rounded-xl border border-slate-850">
                <h5 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Network className="w-4 h-4 text-indigo-400" /> Anomaly Propagation
                </h5>
                <p className="text-sm text-slate-400">A failure at node level triggers alerts on all dependent workloads, hiding the real root cause.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PROPOSED SOLUTION & ARCHITECTURE */}
      <section data-tour="overview-solution" className="space-y-12 scroll-mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">2. Proposed Solution</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A real-time, topological observability layer driven by automated anomaly correlation and forecasting models.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tech Stack & Modules */}
          <div className="bg-[#0b101f] border border-slate-800 rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" /> Platform Architecture & Stack
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900/50 rounded border border-slate-800/60">
                <div className="text-xs text-slate-400 uppercase font-semibold">Frontend Interface</div>
                <div className="text-sm font-medium text-slate-200">Next.js 16, React Flow, Tailwind v4</div>
              </div>
              <div className="p-3 bg-slate-900/50 rounded border border-slate-800/60">
                <div className="text-xs text-slate-400 uppercase font-semibold">State Engine</div>
                <div className="text-sm font-medium text-slate-200">Zustand Telemetry Mesh</div>
              </div>
              <div className="p-3 bg-slate-900/50 rounded border border-slate-800/60">
                <div className="text-xs text-slate-400 uppercase font-semibold">Reasoning Core</div>
                <div className="text-sm font-medium text-slate-200">Causality & RCA Engine</div>
              </div>
              <div className="p-3 bg-slate-900/50 rounded border border-slate-800/60">
                <div className="text-xs text-slate-400 uppercase font-semibold">Predictive Model</div>
                <div className="text-sm font-medium text-slate-200">ARIMA Trend Forecasting</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-blue-500" />
                <p className="text-sm text-slate-300">
                  <strong className="text-white">Topology Mapping Module:</strong> Uses React Flow to continuously visualize inter-pod dependency directions and network traffic intensity.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-blue-500" />
                <p className="text-sm text-slate-300">
                  <strong className="text-white">AI Incident Timeline:</strong> Aggregates warning alerts and maps them to a sequential multi-step Root Cause Journey.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-blue-500" />
                <p className="text-sm text-slate-300">
                  <strong className="text-white">Forecasting Engine:</strong> Generates OOM risk zones and PVC write-latency projection curves up to 60 minutes out.
                </p>
              </div>
            </div>
          </div>

          {/* Workflow & UI Features */}
          <div className="bg-[#0b101f] border border-slate-800 rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" /> Interactive Interfaces
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">NLP Copilot Assistant</h4>
                  <p className="text-xs text-slate-400 mt-1">Allows platform operators to query logs, deployment states, and automated mitigations using natural language queries.</p>
                </div>
              </div>

              <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">Synchronized Scenario Controller</h4>
                  <p className="text-xs text-slate-400 mt-1">Simulates real-world incidents (like storage IOPS bottlenecks or cascade events) to test recovery behaviors in real time.</p>
                </div>
              </div>

              <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">Dynamic Path Spotlighting</h4>
                  <p className="text-xs text-slate-400 mt-1">A cinematic, step-by-step walkthrough engine designed to isolate active bottlenecks without blocking underlying operations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — RISK ANALYSIS & MITIGATION */}
      <section data-tour="overview-risks" className="space-y-10 scroll-mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">3. Risk Analysis & Mitigation</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Anticipating edge challenges, hardware constraints, and potential system failure points.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h4 className="text-white font-semibold">Constraint: Resource Scarcity</h4>
            </div>
            <p className="text-sm text-slate-400">
              Edge clusters have tight CPU/Memory budgets; telemetry collection cannot introduce CPU overhead.
            </p>
            <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20 text-xs text-blue-300">
              <strong>Mitigation:</strong> Light-weight, asynchronous client side state queries instead of heavy polling loops.
            </div>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h4 className="text-white font-semibold">Failure Point: Edge Offline</h4>
            </div>
            <p className="text-sm text-slate-400">
              Temporary network degradation can disrupt real-time centralized synchronization.
            </p>
            <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20 text-xs text-blue-300">
              <strong>Mitigation:</strong> Local telemetry caching at the edge node using a synchronized event log buffer.
            </div>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <h4 className="text-white font-semibold">Challenge: Anomaly Noise</h4>
            </div>
            <p className="text-sm text-slate-400">
              High density setups generate false-positive alerts, drowning critical root-cause signals.
            </p>
            <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20 text-xs text-blue-300">
              <strong>Mitigation:</strong> Probability-weighted correlation heuristics to group alerts into a single Root Cause Journey.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — IMPLEMENTATION PLAN & ROADMAP */}
      <section data-tour="overview-roadmap" className="space-y-12 scroll-mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">4. Implementation Roadmap</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            From initial conceptualization to a fully validated operational prototype.
          </p>
        </div>

        <div className="relative border-l border-blue-500/30 ml-4 md:ml-32 space-y-8">
          {[
            { phase: 'Phase 1: Concept & Scaffolding', detail: 'Analyze industrial edge monitoring problems. Scaffold Next.js App, UI theme, and layout.' },
            { phase: 'Phase 2: Topology Integration', detail: 'Develop live dependency graphs and mesh connectors. Integrate Zustand state to handle metric streams.' },
            { phase: 'Phase 3: AI Engine & Scenario Simulation', detail: 'Build multi-step causality logic and forecasting modules. Implement scenario triggers and presentation overlays.' },
            { phase: 'Phase 4: Validation & Hardening', detail: 'Run TypeScript/ESLint optimization, test containerization boundaries, and push to production repositories.' }
          ].map((step, idx) => (
            <div key={idx} className="relative pl-8">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              </div>
              <div className="bg-slate-900/20 border border-slate-850 p-5 rounded-xl hover:border-slate-800 transition-colors">
                <h4 className="text-white font-bold text-base">{step.phase}</h4>
                <p className="text-sm text-slate-400 mt-2">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — EXPECTED OUTCOME */}
      <section data-tour="overview-outcome" className="space-y-10 scroll-mt-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">5. Expected Outcome (Round 2 Prototype)</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            What will be showcased in the next phase of evaluating KubeMind AI.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-900/10 to-indigo-900/10 border border-blue-500/20 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" /> High-Fidelity Prototype Capabilities
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-slate-350 text-sm">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Live Local Cluster Hook:</strong> Active scraping of MicroK8s nodes and dynamic generation of topological relationships on-the-fly.</span>
                </li>
                <li className="flex gap-3 text-slate-350 text-sm">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Automatic Mitigation Triggers:</strong> Closed-loop control scripts (e.g. triggering autoscaling or node drain actions upon high PVC write-latency detection).</span>
                </li>
                <li className="flex gap-3 text-slate-350 text-sm">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Enterprise Copilot Maturity:</strong> Localized vector-store integration for the NLP Assistant to answer context-specific runbook steps.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-950/80 p-6 rounded-xl border border-slate-800 space-y-4">
              <h4 className="text-xs text-slate-400 uppercase tracking-widest font-mono">Telemetry Target Validation</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Anomalous Correlation Rate</span>
                  <span className="text-emerald-400 font-mono">98.4%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[98.4%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Mean Time to Resolution (MTTR)</span>
                  <span className="text-emerald-400 font-mono">&lt; 45 Seconds</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[95%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Prediction Horizon</span>
                  <span className="text-emerald-400 font-mono">60 Minutes</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[85%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
