'use client';

import { motion } from 'framer-motion';
import { 
  Network, Cpu, Activity, ShieldAlert, ArrowRight, Zap, Target, 
  EyeOff, GitMerge, LineChart, ServerCrash, Bot, Users, Play
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
    <div className="max-w-6xl mx-auto space-y-24 pb-20">
      
      {/* SECTION 1 - HERO */}
      <section data-tour="overview-hero" className="relative pt-12 pb-20 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(59,130,246,0.15),transparent)] pointer-events-none" 
        />
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-6"
        >
          <SparklesIcon className="w-4 h-4" />
          Mission Overview
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl"
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
          className="text-lg md:text-xl text-slate-400 max-w-3xl mb-12"
        >
          AI-powered operational intelligence platform for real-time telemetry correlation, dependency reasoning, anomaly propagation analysis, and predictive infrastructure observability for Kubernetes edge environments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button 
            onClick={handleStartPresentation}
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Play className="w-5 h-5 fill-white" />
            Start Guided Tour
          </button>
        </motion.div>
      </section>

      {/* SECTION 2 - PROBLEM UNDERSTANDING */}
      <section className="space-y-12 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">The Edge Operational Challenge</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Managing distributed K3s and MicroK8s deployments at the industrial edge introduces extreme complexity. Traditional reactive monitoring fails when failures cascade across isolated microservices.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            { icon: Activity, title: 'Bursty Workloads', desc: 'Unpredictable traffic spikes causing sudden resource contention and node starvation.' },
            { icon: ServerCrash, title: 'PVC-Based Storage Stress', desc: 'Persistent volume write latency silently locking databases and degrading dependent services.' },
            { icon: Network, title: 'Dependency Complexity', desc: 'Intricate multi-service architectures where root causes are obscured by downstream alerts.' },
            { icon: Cpu, title: 'Resource Contention', desc: 'Noisy neighbor problems causing CPU throttling without clear attribution.' },
            { icon: GitMerge, title: 'Cascading Failures', desc: 'A single component failure triggering a blast radius of degraded services.' },
            { icon: EyeOff, title: 'Infrastructure Blind Spots', desc: 'Fragmented visibility across edge clusters preventing unified operational reasoning.' }
          ].map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:bg-slate-800/50 hover:border-slate-700 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 3 - CURRENT LIMITATIONS VS SOLUTION */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Evolution of Observability</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Why isolated metrics are no longer enough for autonomous infrastructure operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px] rounded-full pointer-events-none" />
            <h3 className="text-xl font-bold text-slate-300 mb-6 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-red-400" /> Traditional Systems
            </h3>
            <ul className="space-y-4">
              {[
                'Isolated metrics and fragmented dashboards',
                'Reactive troubleshooting after downtime occurs',
                'Lack of topological dependency reasoning',
                'Missing causality and correlation',
                'No predictive intelligence'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-400">
                  <div className="mt-1 min-w-1.5 h-1.5 rounded-full bg-red-500/50" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-900/10 border border-blue-500/30 rounded-2xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.05)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-400" /> KubeMind AI
            </h3>
            <ul className="space-y-4">
              {[
                'AI-driven telemetry correlation',
                'Live workload dependency intelligence',
                'Autonomous root cause reasoning',
                'Predictive forecasting of memory/PVC exhaustion',
                'Blast radius propagation analysis'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-200">
                  <div className="mt-1 min-w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4 - KEY CAPABILITIES */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Platform Capabilities</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A comprehensive suite of operational intelligence tools for Kubernetes Operators and SRE Teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Network, title: 'Dependency Graph', desc: 'Real-time multi-agent service topology mapping.' },
            { icon: LineChart, title: 'Predictive Forecasting', desc: 'Risk analysis and degradation window prediction.' },
            { icon: Zap, title: 'Autonomous RCA', desc: 'Multi-layered AI confidence scoring for root causes.' },
            { icon: Bot, title: 'NLP Assistant', desc: 'Query infrastructure via natural language operations.' }
          ].map((item, i) => (
            <div key={i} className="bg-[#0a0f1c] border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <item.icon className="w-8 h-8 text-blue-400 mb-4" />
              <h4 className="text-white font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4M3 5h4M19 3v4M17 5h4M19 17v4M17 19h4M5 17v4M3 19h4"/>
    </svg>
  );
}
