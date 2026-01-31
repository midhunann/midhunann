'use client';

import { motion } from 'framer-motion';
import { useCursorPosition } from '@/hooks/useCursorPosition';
import { useInteractiveMode } from '@/contexts/InteractiveModeContext';

export function CursorGlow() {
  const { isActive } = useInteractiveMode();
  const { x, y } = useCursorPosition();

  if (!isActive) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-40"
      style={{
        left: x,
        top: y,
        width: '300px',
        height: '300px',
        marginLeft: '-150px',
        marginTop: '-150px',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="w-full h-full rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(91, 136, 178, 0.3) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}
