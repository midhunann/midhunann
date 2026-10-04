'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { placePreview } from '@/lib/preview-position';

interface Preview {
  src: string;
  label: string;
}
interface Point {
  x: number;
  y: number;
}

function position(el: HTMLElement, cursor: Point) {
  const { x, y } = placePreview(
    cursor,
    { w: el.offsetWidth, h: el.offsetHeight },
    { w: window.innerWidth, h: window.innerHeight },
  );
  el.style.transform = `translate(${x}px, ${y}px)`;
}

/**
 * A floating image for any element with data-preview-src. A desktop bonus only:
 * every previewed item also carries its facts as text or a proof link.
 */
export default function CursorPreview() {
  const [preview, setPreview] = useState<Preview | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const cursor = useRef<Point>({ x: 0, y: 0 });
  // The item currently previewed, and the item the visitor dismissed with Escape.
  // A dismissed item stays quiet until the pointer has left it.
  const current = useRef<HTMLElement | null>(null);
  const dismissed = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const find = (node: EventTarget | null) =>
      node instanceof Element ? node.closest<HTMLElement>('[data-preview-src]') : null;

    const show = (el: HTMLElement) => {
      current.current = el;
      const next = { src: el.dataset.previewSrc ?? '', label: el.dataset.previewLabel ?? '' };
      setPreview((existing) =>
        existing && existing.src === next.src && existing.label === next.label ? existing : next,
      );
    };

    const hide = () => {
      current.current = null;
      setPreview(null);
    };

    const onMove = (event: PointerEvent) => {
      cursor.current = { x: event.clientX, y: event.clientY };
      const el = find(event.target);
      if (!el) {
        dismissed.current = null;
        return hide();
      }
      if (el === dismissed.current) return;
      show(el);
      if (box.current) position(box.current, cursor.current);
    };
    const onFocusIn = (event: FocusEvent) => {
      const el = find(event.target);
      if (!el || el === dismissed.current) return;
      const rect = el.getBoundingClientRect();
      cursor.current = { x: rect.left + 32, y: rect.bottom - 16 };
      show(el);
    };
    const onFocusOut = () => hide();
    // The pointer left the browser window while over an item.
    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) {
        dismissed.current = null;
        hide();
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      dismissed.current = current.current;
      hide();
    };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerout', onPointerOut);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    document.addEventListener('keydown', onKey);
    window.addEventListener('blur', hide);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onPointerOut);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('blur', hide);
    };
  }, []);

  useEffect(() => {
    if (preview && box.current) position(box.current, cursor.current);
  }, [preview]);

  if (!preview) return null;

  return (
    <div
      ref={box}
      data-preview-box
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50"
      style={{ width: 280 }}
    >
      <div className="rounded-md border border-rule bg-surface p-2">
        <Image
          key={preview.src}
          src={preview.src}
          alt=""
          width={560}
          height={560}
          sizes="280px"
          className="h-auto max-h-72 w-full object-contain"
          onLoad={() => box.current && position(box.current, cursor.current)}
        />
        {preview.label ? <p className="mt-2 text-center text-sm text-muted">{preview.label}</p> : null}
      </div>
    </div>
  );
}
