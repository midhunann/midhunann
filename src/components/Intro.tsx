import Image from 'next/image';
import { profile } from '@/data';
import CopyEmail from './CopyEmail';
import NameHover from './NameHover';

const step = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function Intro() {
  return (
    <section id="top" aria-label="introduction" className="mx-auto max-w-[60rem] px-6 pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_19rem] md:gap-6">
        <div className="md:order-first">
          <h1 className="intro-in" style={step(1)}>
            <NameHover
              text={profile.name.first}
              previewSrc={profile.stage.src}
              previewLabel={profile.stage.label}
            />
            <span className="mt-3 block text-[clamp(1.5rem,3.5vw,2.25rem)] text-muted">{profile.name.rest}</span>
          </h1>
          <p className="intro-in mt-8 max-w-[36rem] text-lg" style={step(2)}>
            {profile.lead}
          </p>
          <p className="intro-in mt-4 max-w-[36rem]" style={step(3)}>
            {profile.proof}
          </p>
          <div className="intro-in mt-8 flex flex-wrap items-center gap-x-3 gap-y-1" style={step(4)}>
            <a className="btn-primary" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              connect on linkedin
            </a>
            <CopyEmail email={profile.email} />
            <a className="link tap" href={profile.resume} target="_blank" rel="noopener noreferrer">
              resume
            </a>
            <a className="link tap" href={profile.links.github} target="_blank" rel="noopener noreferrer">
              github
            </a>
            <a className="link tap" href={profile.links.instagram} target="_blank" rel="noopener noreferrer">
              instagram
            </a>
            <a className="link tap" href={profile.links.x} target="_blank" rel="noopener noreferrer">
              x
            </a>
          </div>
        </div>
        <div className="intro-in order-first md:order-none" style={step(0)}>
          <div className="relative mx-auto aspect-[4/5] w-48 overflow-hidden rounded-[15%/15%] bg-surface md:w-[19rem]">
            <Image
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              width={profile.portrait.width}
              height={profile.portrait.height}
              priority
              sizes="(min-width: 768px) 460px, 290px"
              className="cutout-shadow absolute left-1/2 -top-[9%] h-auto w-[150%] max-w-none -translate-x-1/2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
