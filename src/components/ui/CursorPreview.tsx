'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCursorPosition } from '@/hooks/useCursorPosition';
import { useInteractiveMode } from '@/contexts/InteractiveModeContext';

interface PreviewData {
  type: 'image' | 'icon' | 'text';
  content: string;
  label?: string;
}

export function CursorPreview() {
  const { isActive } = useInteractiveMode();
  const { x, y } = useCursorPosition();
  const [preview, setPreview] = useState<PreviewData | null>(null);

  useEffect(() => {
    if (!isActive) {
      setPreview(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const previewElement = target.closest('[data-cursor-preview]');

      if (previewElement) {
        const type = previewElement.getAttribute('data-preview-type') as 'image' | 'icon' | 'text';
        const content = previewElement.getAttribute('data-preview-content') || '';
        const label = previewElement.getAttribute('data-preview-label') || '';

        setPreview({ type, content, label });
      } else {
        setPreview(null);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isActive]);

  if (!isActive || !preview) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={preview.content}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: x + 20,
          top: y + 20,
        }}
      >
        <div className="relative navbar-glass p-4 border border-ocean/30 rounded-xl shadow-2xl overflow-hidden">
          {preview.type === 'image' && (
            <div className="relative w-64 h-64 rounded-lg overflow-hidden z-10">
              <Image
                src={preview.content}
                alt={preview.label || 'Preview'}
                fill
                className="object-contain"
              />
            </div>
          )}
          {preview.type === 'icon' && (
            <div className="w-32 h-32 flex items-center justify-center text-6xl z-10">
              {preview.content}
            </div>
          )}
          {preview.type === 'text' && (
            <div className="px-6 py-4 text-base text-pearl/90 font-mono whitespace-nowrap z-10 relative">
              {preview.content}
            </div>
          )}
          {preview.label && (
            <div className="text-sm text-pearl/60 text-center mt-2 font-mono z-10 relative">
              {preview.label}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
