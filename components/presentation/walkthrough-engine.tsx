'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, Sparkles, Target, Activity } from 'lucide-react';
import { usePresentationStore } from '@/lib/presentation-store';
import { cn } from '@/lib/utils';

export function WalkthroughEngine() {
  const { isActive, currentStepIndex, steps, stopPresentation, nextStep, prevStep } = usePresentationStore();
  const router = useRouter();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const step = steps[currentStepIndex];

  useEffect(() => {
    if (isActive && step?.route) {
      router.push(step.route);
    }
  }, [isActive, step, router]);

  useEffect(() => {
    if (!isActive || !step?.targetSelector) {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      const el = document.querySelector(step.targetSelector!);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
      } else {
        setTargetRect(null);
      }
    };

    // Delay slightly to allow DOM updates or page transitions
    const timer = setTimeout(updateRect, 500);
    window.addEventListener('resize', updateRect);
    
    // Set up an interval to keep tracking if it animates
    const interval = setInterval(updateRect, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener('resize', updateRect);
    };
  }, [isActive, step]);

  if (!isActive || !step) return null;



  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          {/* Dimmed Background */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#030712]/60 pointer-events-none"
          />
          
          {/* Spotlight hole */}
          {targetRect && (
            <motion.div
              className="absolute bg-transparent pointer-events-none border-2 border-blue-500 shadow-[0_0_0_9999px_rgba(3,7,18,0.8),0_0_30px_rgba(59,130,246,0.5)] rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                top: targetRect.top - 10,
                left: targetRect.left - 10,
                width: targetRect.width + 20,
                height: targetRect.height + 20,
              }}
              exit={{ opacity: 0, scale: 0.9 }}
            />
          )}

          {/* Walkthrough Card */}
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', damping: 25, stiffness: 300, delay: 0.1 }}
            drag
            dragMomentum={false}
            className="absolute pointer-events-auto w-[420px] cursor-move top-6 right-6 z-[110]"
          >
            <div className="bg-slate-900/90 border border-blue-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              {/* Glowing accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none" />

              <button 
                onClick={stopPresentation}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest text-blue-400 uppercase">
                    Step {currentStepIndex + 1} of {steps.length}
                  </div>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {step.description}
                </p>
                
                <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/60 flex gap-3 items-start">
                  <Target className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <span className="text-emerald-400 font-semibold">AI Insight:</span> {step.insight}
                  </p>
                </div>

                {step.metrics && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {step.metrics.map((m, i) => (
                      <div key={i} className="bg-slate-800/40 rounded border border-slate-700/50 p-2 flex items-center gap-2">
                        <Activity className="w-3 h-3 text-cyan-400" />
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase">{m.label}</div>
                          <div className="text-xs font-mono text-slate-200">{m.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end mt-6 pt-4 border-t border-slate-800/60">
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all flex items-center gap-2"
                >
                  {currentStepIndex === steps.length - 1 ? 'Exit Presentation Mode' : 'Next Feature'}
                  {currentStepIndex !== steps.length - 1 && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
