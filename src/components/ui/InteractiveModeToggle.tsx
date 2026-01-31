'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useInteractiveMode } from '@/contexts/InteractiveModeContext';

export function InteractiveModeToggle() {
  const { isActive, toggle } = useInteractiveMode();

  return (
    <motion.button
      onClick={toggle}
      className="fixed top-24 right-6 z-50 flex items-center gap-2 px-4 py-2 glass-card border border-ocean/20 rounded-full hover:border-ocean/40 transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Sparkles
        size={16}
        className={`transition-colors ${
          isActive ? 'text-ocean' : 'text-pearl/40'
        }`}
      />
      <span className="text-sm font-medium text-pearl/80">
        Interactive
      </span>
      <div
        className={`w-10 h-5 rounded-full transition-colors relative ${
          isActive ? 'bg-ocean/30' : 'bg-midnight/50'
        }`}
      >
        <motion.div
          className={`absolute top-0.5 w-4 h-4 rounded-full ${
            isActive ? 'bg-ocean' : 'bg-pearl/40'
          }`}
          animate={{ left: isActive ? '20px' : '2px' }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.button>
  );
}
