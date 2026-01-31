'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { ProjectTestimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: ProjectTestimonial;
  index?: number;
}

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 relative"
    >
      {/* Quote Icon */}
      <Quote
        size={40}
        className="absolute top-4 right-4 text-ocean/10"
      />

      {/* Content */}
      <p className="text-pearl/80 text-sm leading-relaxed pr-10">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-4 pt-4 border-t border-ocean/10 flex items-center justify-between">
        <div>
          <p className="font-medium text-pearl">{testimonial.author}</p>
          <p className="text-sm text-pearl/50">{testimonial.date}</p>
        </div>
        {testimonial.helpful && testimonial.helpful > 0 && (
          <span className="text-sm text-pearl/40">
            {testimonial.helpful} found helpful
          </span>
        )}
      </div>
    </motion.div>
  );
}
