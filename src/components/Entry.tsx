import type { Role } from '@/types';

interface EntryProps {
  item: Role;
  as?: 'h3' | 'h4';
}

export default function Entry({ item, as: Heading = 'h3' }: EntryProps) {
  return (
    <li data-preview-src={item.preview?.src} data-preview-label={item.preview?.label}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <Heading className="text-2xl leading-snug">
          {item.role},{' '}
          {item.orgUrl ? (
            <a className="link" href={item.orgUrl} target="_blank" rel="noopener noreferrer">
              {item.org}
            </a>
          ) : (
            item.org
          )}
        </Heading>
        <p className="shrink-0 font-mono text-xs text-muted">{item.when}</p>
      </div>
      {item.meta ? <p className="mt-1 text-sm text-muted">{item.meta}</p> : null}
      {item.summary.map((paragraph) => (
        <p key={paragraph} className="mt-3 max-w-[38rem]">
          {paragraph}
        </p>
      ))}
    </li>
  );
}
