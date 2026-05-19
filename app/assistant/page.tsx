'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Send, BrainCircuit, Terminal, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

const generateAIResponse = (input: string, scenario: string | null): string => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('status') || lowerInput.includes('health')) {
    if (!scenario || scenario === 'reset') return "All core industrial clusters are operating within nominal baseline parameters. Aggregated telemetry indicates 0% packet drop and healthy GC reclamation across edge nodes.";
    if (scenario === 'cpu-spike') return "WARNING: recommendation-engine compute saturation detected. CPU utilization exceeds 85% threshold. This telemetry signature closely matches a prior HPA scaling failure observed 14 days ago on cluster edge-ap-south-1.";
    if (scenario === 'cascading-failure') return "CRITICAL: Widespread distributed degradation detected. Root cause isolated to inventory-db storage detachment. Blast radius has expanded to payment-service causing connection pool exhaustion via retry amplification.";
  }
  
  if (lowerInput.includes('recommend') || lowerInput.includes('fix') || lowerInput.includes('remediate')) {
    if (scenario === 'memory-leak') return "RECOMMENDATION: Initiate graceful pod eviction for payment-service. Analysis indicates monotonic heap growth. Immediate GC tuning and memory limit recalibration required to prevent imminent OOMKilled events.";
    if (scenario === 'pvc-latency') return "RECOMMENDATION: Scale persistent volume IOPS limits dynamically via CSI driver. Current write latency (>850ms) violates the 50ms SLA. Historical correlation confidence for this remediation is 94.2%.";
    return "Insufficient anomalous telemetry to formulate a remediation plan. Infrastructure state is currently stable.";
  }

  if (lowerInput.includes('history') || lowerInput.includes('past')) {
    return "Historical Memory Query: Similar anomaly patterns were detected 3 times in the previous 14 days. The most recent incident involved a synchronized PVC saturation cascade on edge-ap-south-1 resulting in a 4.2 minute degradation window.";
  }

  return `I am actively monitoring 284 pods across 18 namespaces in the ABB-SmartFactory-04 edge environment. No specific correlation found for your query. Please provide infrastructure identifiers (pod name, node ID, or namespace) for targeted telemetry analysis.`;
};

export default function AssistantPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'KubeMind Operations NLP Copilot initialized. Active context: edge-cluster-ap-south-1. How can I assist with telemetry analysis or infrastructure troubleshooting today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const activeScenario = useStore(state => state.activeScenario);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI reasoning delay
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(userMsg.content, activeScenario),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  if (!mounted) return <div className="h-full w-full flex items-center justify-center text-slate-500">Initializing NLP Copilot...</div>;

  return (
    <div data-tour="nlp-assistant" className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">NLP Operations Assistant</h1>
          <p className="text-sm text-slate-400 mt-1">Natural language querying for distributed telemetry</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <Terminal className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-mono text-slate-300">Context: ABB-SmartFactory-04</span>
        </div>
      </div>

      <div className="flex-1 bg-[#0a0f1c] border border-slate-800 rounded-xl shadow-xl flex flex-col overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar relative z-10">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                msg.role === 'assistant' 
                  ? "bg-blue-500/20 border-blue-500/50 text-blue-400" 
                  : "bg-slate-800 border-slate-700 text-slate-300"
              )}>
                {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed",
                msg.role === 'assistant' 
                  ? "bg-slate-900/80 border border-slate-800 text-slate-300" 
                  : "bg-blue-600 text-white"
              )}>
                {msg.content}
                <div className={cn(
                  "text-[10px] mt-2 font-mono opacity-60",
                  msg.role === 'user' ? "text-blue-200 text-right" : "text-slate-500"
                )}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 max-w-[80%]"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center shrink-0 text-blue-400">
                <BrainCircuit className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Form */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 relative z-10">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query distributed telemetry (e.g., 'Analyze active anomalies' or 'Show historical correlation')..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-14 py-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
            <Command className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
