'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  title?: string;
  subtitle?: string;
  centered?: boolean;
}

export function Section({
  id,
  className,
  children,
  title,
  subtitle,
  centered = false,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-16 md:py-24', className)}>
      <div className="container-custom">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn('mb-12', centered && 'text-center')}
          >
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-pearl mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-pearl/60 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
