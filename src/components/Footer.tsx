import { webring } from '@/data';

const ringLink = 'tap underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-current';

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-[60rem] flex-col gap-1 px-6 py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} midhunan</p>
        {webring.enabled ? (
          <nav aria-label="amrita.town webring" className="flex flex-wrap items-center gap-x-6">
            <a className={ringLink} href={webring.home}>
              {webring.name}
            </a>
            <a className={ringLink} href={webring.prev}>
              prev
            </a>
            <a className={ringLink} href={webring.random}>
              random
            </a>
            <a className={ringLink} href={webring.next}>
              next
            </a>
          </nav>
        ) : null}
      </div>
    </footer>
  );
}
