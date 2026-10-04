import { profile } from '@/data';
import CopyEmail from './CopyEmail';
import Section from './Section';

export default function Contact() {
  return (
    <Section id="contact" title="contact">
      <p className="max-w-[22ch] font-serif text-4xl leading-tight md:text-5xl">
        the best way to reach me is linkedin.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-1">
        <a className="btn-primary mr-2" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
          connect on linkedin
        </a>
        <a className="link tap" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <CopyEmail email={profile.email} />
      </div>
      <p className="mt-6 text-sm text-muted">
        also on{' '}
        <a className="link" href={profile.links.github} target="_blank" rel="noopener noreferrer">
          github
        </a>
        ,{' '}
        <a className="link" href={profile.links.instagram} target="_blank" rel="noopener noreferrer">
          instagram
        </a>
        , and the{' '}
        <a className="link" href={profile.resume} target="_blank" rel="noopener noreferrer">
          resume
        </a>
        .
      </p>
    </Section>
  );
}
