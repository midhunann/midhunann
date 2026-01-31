'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function BackgroundBeams({ className }: { className?: string }) {
  const beamData = useMemo(() => {
    return [
      ...Array(8).fill(null).map(() => ({
        randomDelay: Math.random() * 2,
        randomDuration: 3 + Math.random() * 2,
        randomY: 20 + Math.random() * 60,
        randomHeight: 40 + Math.random() * 20,
      })),
    ];
  }, []);

  const verticalBeamData = useMemo(() => {
    return [
      ...Array(6).fill(null).map((_, index) => ({
        randomDelay: Math.random() * 3,
        randomDuration: 4 + Math.random() * 2,
        randomX: 10 + index * 18,
      })),
    ];
  }, []);

  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center overflow-hidden',
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--ocean)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="var(--ocean)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--midnight)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Animated beams */}
        {beamData.map((data, index) => (
          <motion.path
            key={index}
            d={`M ${index * 150} ${data.randomY} Q ${index * 150 + 75} ${data.randomY + data.randomHeight}, ${index * 150 + 150} ${data.randomY}`}
            stroke="url(#beam-gradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: data.randomDuration,
              repeat: Infinity,
              delay: data.randomDelay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Additional vertical beams */}
        {verticalBeamData.map((data, index) => (
          <motion.line
            key={`v-${index}`}
            x1={`${data.randomX}%`}
            y1="0%"
            x2={`${data.randomX}%`}
            y2="100%"
            stroke="url(#beam-gradient)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: data.randomDuration,
              repeat: Infinity,
              delay: data.randomDelay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ocean/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-midnight/10 rounded-full blur-3xl animate-pulse-glow" />
    </div>
  );
}

