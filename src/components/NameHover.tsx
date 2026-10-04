'use client';

import { useRef } from 'react';

interface NameHoverProps {
  text: string;
  previewSrc: string;
  previewLabel: string;
}

export default function NameHover({ text, previewSrc, previewLabel }: NameHoverProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== 'mouse') return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
  };

  const onLeave = () => ref.current?.style.removeProperty('--mx');

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-preview-src={previewSrc}
      data-preview-label={previewLabel}
      className="name-hover block text-[clamp(3.75rem,13vw,8.5rem)] leading-[0.95] tracking-tight"
    >
      {text}
    </span>
  );
}
