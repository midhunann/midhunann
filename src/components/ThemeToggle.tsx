'use client';

import { useEffect } from 'react';
import { MoonIcon, SunIcon } from './Icons';

function storedTheme(): string | null {
  try {
    return window.localStorage.getItem('theme');
  } catch {
    return null;
  }
}

export default function ThemeToggle() {
  // Follow the system setting live until the visitor makes an explicit choice.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      const stored = storedTheme();
      if (stored === 'light' || stored === 'dark') return;
      document.documentElement.setAttribute('data-theme', event.matches ? 'dark' : 'light');
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      window.localStorage.setItem('theme', next);
    } catch {
      // storage unavailable: the choice lasts for this visit only
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="switch between light and dark theme"
      className="tap -mr-2 justify-center px-2 text-muted hover:text-ink"
    >
      <MoonIcon className="theme-moon" />
      <SunIcon className="theme-sun" />
    </button>
  );
}
