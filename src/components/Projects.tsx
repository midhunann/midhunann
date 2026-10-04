import Image from 'next/image';
import { projects } from '@/data';
import Section from './Section';

export default function Projects() {
  return (
    <Section id="projects" title="projects">
      <ul className="space-y-16">
        {projects.map((project) => (
          <li key={project.id} className="md:grid md:grid-cols-[1fr_16rem] md:gap-x-10">
            <div>
              <h3 className="text-3xl">{project.title}</h3>
              {project.lines.map((line) => (
                <p key={line} className="mt-1 text-sm text-muted">
                  {line}
                </p>
              ))}
              <p className="mt-4 max-w-[36rem]">{project.story}</p>
              <ul className="mt-3 flex flex-wrap gap-x-5">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a className="link tap" href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 md:mt-2">
              {project.image ? (
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  sizes="(min-width: 768px) 256px, calc(100vw - 48px)"
                  className="aspect-[16/10] w-full rounded-sm border border-rule object-cover object-top"
                />
              ) : (
                <div className="flex aspect-[16/10] w-full items-center justify-center rounded-sm border border-rule bg-surface font-serif text-xl text-muted">
                  {project.title}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
