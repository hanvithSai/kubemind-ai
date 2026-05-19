'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Network, Clock, Cpu, LineChart, MessageSquare, TerminalSquare, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';

const navItems = [
  { name: 'Mission Overview', href: '/overview', icon: Globe },
  { name: 'Command Center', href: '/', icon: LayoutDashboard },
  { name: 'Dependency Graph', href: '/graph', icon: Network },
  { name: 'Incident Timeline', href: '/timeline', icon: Clock },
  { name: 'Insight Engine', href: '/insights', icon: Cpu },
  { name: 'Forecasting', href: '/forecasting', icon: LineChart },
  { name: 'NLP Assistant', href: '/assistant', icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();
  const activeIncidents = useStore((state) => state.incidents.filter(i => i.severity === 'critical').length);

  return (
    <div className="w-64 h-screen border-r border-slate-800 bg-[#0a0f1c] flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800/60">
        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          <TerminalSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-slate-100 tracking-tight leading-tight">KubeMind AI</h1>
          <p className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold">Autonomous Core</p>
        </div>
      </div>
      
      <div className="flex-1 py-6 px-3 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_-3px_rgba(59,130,246,0.15)]" 
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-blue-400" : "text-slate-500")} />
              {item.name}
              {item.name === 'Incident Timeline' && activeIncidents > 0 && (
                <span className="ml-auto bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/30 animate-pulse">
                  {activeIncidents}
                </span>
              )}
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-slate-800/60">
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-medium text-slate-300">AI Core: Online</span>
          </div>
          <div className="text-[10px] text-slate-500 leading-tight">
            Model: KM-Nexus-v4<br/>
            Inference: 14ms
          </div>
        </div>
      </div>
    </div>
  );
}
