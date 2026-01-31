'use client';

import { cn } from '@/lib/utils';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useRef, useState } from 'react';

export const TextHoverEffect = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn('relative inline-block', className)}
    >
      {/* Default gradient text - always visible */}
      <motion.span
        className="relative inline-block bg-gradient-to-r from-pearl via-ocean to-pearl bg-clip-text text-transparent"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(20px)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: isHovered ? '100% 0' : '0% 0',
        }}
        transition={{ duration: 0.6 }}
      >
        {text}
      </motion.span>
      {/* Enhanced blue gradient on hover */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-ocean via-[#7BA5CC] to-ocean bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(25px)',
          backgroundSize: '200% 100%',
          backgroundPosition: isHovered ? '100% 0' : '0% 0',
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};
