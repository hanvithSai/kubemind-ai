import { create } from 'zustand';

export interface WalkthroughStep {
  id: string;
  title: string;
  description: string;
  insight: string;
  metrics?: { label: string; value: string }[];
  targetSelector?: string; 
  route?: string; 
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

interface PresentationState {
  isActive: boolean;
  currentStepIndex: number;
  steps: WalkthroughStep[];
  
  startPresentation: (steps?: WalkthroughStep[]) => void;
  stopPresentation: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setSteps: (steps: WalkthroughStep[]) => void;
}

export const usePresentationStore = create<PresentationState>((set, get) => ({
  isActive: false,
  currentStepIndex: 0,
  steps: [],
  
  startPresentation: (steps) => {
    if (steps) {
      set({ isActive: true, steps, currentStepIndex: 0 });
    } else {
      set({ isActive: true, currentStepIndex: 0 });
    }
  },
  stopPresentation: () => set({ isActive: false, currentStepIndex: 0 }),
  nextStep: () => {
    const state = get();
    if (state.currentStepIndex < state.steps.length - 1) {
      set({ currentStepIndex: state.currentStepIndex + 1 });
    } else {
      set({ isActive: false, currentStepIndex: 0 }); // end presentation
    }
  },
  prevStep: () => set((state) => ({ 
    currentStepIndex: Math.max(state.currentStepIndex - 1, 0) 
  })),
  setSteps: (steps) => set({ steps }),
}));
