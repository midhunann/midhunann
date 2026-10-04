import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule">
      <div className="mx-auto max-w-[60rem] px-6 py-16 md:grid md:grid-cols-[10rem_1fr] md:gap-x-10 md:py-24">
        <h2 id={`${id}-title`} className="text-3xl md:text-[2rem]">
          {title}
        </h2>
        <div className="mt-8 md:mt-0">{children}</div>
      </div>
    </section>
  );
}
