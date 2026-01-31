'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/types';
import { ProjectCard } from './ProjectCard';
import { cn } from '@/lib/utils';

interface ProjectCarouselProps {
  projects: Project[];
  autoPlay?: boolean;
  interval?: number;
}

export function ProjectCarousel({
  projects,
  autoPlay = true,
  interval = 5000,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, goToNext]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="max-w-2xl mx-auto"
          >
            <ProjectCard project={projects[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-3 rounded-full glass text-pearl/60 hover:text-pearl hover:bg-midnight/50 transition-all z-10"
        aria-label="Previous project"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 rounded-full glass text-pearl/60 hover:text-pearl hover:bg-midnight/50 transition-all z-10"
        aria-label="Next project"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              index === currentIndex
                ? 'w-8 bg-ocean'
                : 'bg-pearl/20 hover:bg-pearl/40'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
