'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface InteractiveModeContextType {
  isActive: boolean;
  toggle: () => void;
}

const InteractiveModeContext = createContext<InteractiveModeContextType | undefined>(undefined);

export function InteractiveModeProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(true); // Always active

  const toggle = () => {
    // Do nothing - always active
  };

  return (
    <InteractiveModeContext.Provider value={{ isActive, toggle }}>
      {children}
    </InteractiveModeContext.Provider>
  );
}

export function useInteractiveMode() {
  const context = useContext(InteractiveModeContext);
  if (context === undefined) {
    throw new Error('useInteractiveMode must be used within InteractiveModeProvider');
  }
  return context;
}
