'use client';

import { Play, Sparkles } from 'lucide-react';
import { usePresentationStore } from '@/lib/presentation-store';
import { globalPresentationSteps } from '@/lib/walkthrough-config';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PresentationController() {
  const { startPresentation, isActive } = usePresentationStore();
  const pathname = usePathname();

  const handleStart = () => {
    const pageSteps = globalPresentationSteps.filter(step => step.route === pathname);
    startPresentation(pageSteps.length > 0 ? pageSteps : globalPresentationSteps);
  };

  if (isActive) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleStart}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-400/30 backdrop-blur-md overflow-hidden group"
    >
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
      <Sparkles className="w-4 h-4 text-blue-200" />
      <span className="text-sm font-bold tracking-wide">Presentation Mode</span>
      <Play className="w-4 h-4 fill-current ml-1" />
    </motion.button>
  );
}
