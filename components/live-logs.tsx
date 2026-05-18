'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const logTemplates = [
  '[kubelet] SyncLoop (SYNC): "production-edge/payment-service-7f9d8d4b6f-hx92q"',
  '[network-policy-controller] Successfully reconciled NetworkPolicy: default/allow-all',
  '[csi-provisioner] Volume provisioned for claim default/pvc-storage',
  '[fluentd] Flushing buffer to aggregation tier, bytes=1024',
  '[ai-correlator] Analyzing telemetry signature for node worker-node-03',
  '[ingress-nginx] Reloading configuration due to routing map changes',
  '[kube-proxy] Updating iptables rules for service data-persistence/inventory-db',
  '[istio-pilot] Pushing EDS updates to 284 endpoints',
  '[prometheus-operator] Scrape interval met for target: app-production',
];

const errorTemplates = [
  '[csi-node] ERROR: Volume attachment degraded, retrying (1/3)',
  '[service-mesh-proxy] WARN: Connection pool exhaustion detected on upstream',
  '[kubelet] WARN: Container memory working set expanding, GC pressure high',
];

export function LiveLogs() {
  const [logs, setLogs] = useState<{ id: number; text: string; isError: boolean; time: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const logCounter = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const isError = Math.random() > 0.9;
      const templates = isError ? errorTemplates : logTemplates;
      const text = templates[Math.floor(Math.random() * templates.length)];
      const now = new Date();
      
      const newLog = {
        id: logCounter.current++,
        text,
        isError,
        time: now.toISOString().split('T')[1].slice(0, 8) + '.' + now.getMilliseconds().toString().padStart(3, '0')
      };

      setLogs(prev => {
        const next = [...prev, newLog];
        if (next.length > 50) return next.slice(next.length - 50);
        return next;
      });
      
    }, 800 + Math.random() * 1500); // Random stream interval

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-[#0a0f1c] border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col h-[280px]">
      <div className="flex items-center gap-2 mb-3 px-2 border-b border-slate-800/60 pb-3">
        <Terminal className="w-4 h-4 text-slate-500" />
        <h3 className="font-semibold text-slate-300 text-xs uppercase tracking-wider">Live Event Stream (Cluster: edge-cluster-ap-south-1)</h3>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-slate-500 font-bold uppercase">Streaming</span>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto font-mono text-[10px] sm:text-xs leading-relaxed space-y-1.5 px-2 no-scrollbar scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-3"
            >
              <span className="text-slate-600 shrink-0 select-none">[{log.time}]</span>
              <span className={log.isError ? "text-amber-400 font-semibold" : "text-slate-400"}>
                {log.isError && <ShieldAlert className="inline w-3 h-3 mr-1 -mt-0.5" />}
                {log.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
