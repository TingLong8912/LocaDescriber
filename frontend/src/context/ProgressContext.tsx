'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface StepState {
  label: string;
  status: 'completed' | 'active' | 'pending';
  details?: string;
}

interface ProgressContextType {
  steps: StepState[];
  setSteps: React.Dispatch<React.SetStateAction<StepState[]>>;
  progressStatus: 'idle' | 'running' | 'completed';
  setProgressStatus: React.Dispatch<React.SetStateAction<'idle' | 'running' | 'completed'>>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState<StepState[]>([]);
  const [progressStatus, setProgressStatus] = useState<'idle' | 'running' | 'completed'>('idle');

  return (
    <ProgressContext.Provider value={{ steps, setSteps, progressStatus, setProgressStatus }}>
      {children}
    </ProgressContext.Provider>
  );
};