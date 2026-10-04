import { awards, education, leadership } from '@/data';
import Entry from './Entry';
import Section from './Section';

export default function Recognition() {
  return (
    <Section id="recognition" title="recognition">
      <div className="space-y-16">
        <div>
          <h3 className="text-2xl">awards</h3>
          <ul className="mt-6 divide-y divide-rule border-y border-rule">
            {awards.map((award) => (
              <li key={award.id}>
                <a
                  href={award.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-preview-src={award.preview?.src}
                  data-preview-label={award.preview?.label}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span>
                    <span className="link">{award.title}</span>
                    <span className="block text-sm text-muted">{award.detail}</span>
                  </span>
                  <span className="shrink-0 font-mono text-xs text-muted">{award.year}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl">leadership</h3>
          <ul className="mt-6 space-y-10">
            {leadership.map((item) => (
              <Entry key={item.id} item={item} as="h4" />
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl">education</h3>
          <ul className="mt-6 space-y-8">
            {education.map((item) => (
              <Entry key={item.id} item={item} as="h4" />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
