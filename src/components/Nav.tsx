'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const links = ['experience', 'projects', 'recognition', 'contact'] as const;

export default function Nav() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const targets = ['top', ...links]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === 'top' ? '' : entry.target.id);
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg">
      <div className="mx-auto flex max-w-[60rem] flex-wrap items-center justify-between gap-x-6 px-6 py-1">
        <a href="#top" className="tap font-serif text-2xl">
          midhunan
        </a>
        <nav aria-label="sections" className="order-3 flex w-full justify-between gap-2 pb-1 text-sm sm:order-none sm:w-auto sm:justify-start sm:gap-8 sm:pb-0">
          {links.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className="tap text-muted hover:text-ink aria-[current=true]:text-ink aria-[current=true]:underline aria-[current=true]:underline-offset-8"
            >
              {id}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
