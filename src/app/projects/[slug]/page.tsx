import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code,
  Globe,
  Users,
  Zap,
  Trophy,
  Download,
  Star,
} from 'lucide-react';
import { Button, Section, TestimonialCard } from '@/components/ui';
import { getAllProjectSlugs, getProjectBySlug } from '@/data';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: [project.images.thumbnail],
    },
  };
}

const linkIcons = {
  github: Github,
  live: ExternalLink,
  vscode: Code,
  chrome: Globe,
  firefox: Globe,
  edge: Globe,
};

const metricIcons: Record<string, typeof Users> = {
  users: Users,
  zap: Zap,
  trophy: Trophy,
  download: Download,
  star: Star,
  code: Code,
  globe: Globe,
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Hero */}
      <section className="relative pt-8 pb-16">
        <div className="container-custom">
          {/* Back Button */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-pearl/60 hover:text-pearl transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Content */}
            <div className="space-y-6">
              {/* Role Badge */}
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
                  project.role === 'solo'
                    ? 'bg-ocean/20 text-ocean border border-ocean/30'
                    : 'bg-midnight/50 text-pearl/80 border border-midnight/50'
                }`}
              >
                {project.role === 'solo' ? 'Solo Project' : 'Team Project'}
              </span>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-pearl">
                {project.title}
              </h1>

              {/* Tagline */}
              <p className="text-xl text-pearl/70">{project.tagline}</p>

              {/* Description */}
              <p className="text-pearl/60">{project.description}</p>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-4">
                {project.links.map((link) => {
                  const Icon = linkIcons[link.type];
                  return (
                    <Button
                      key={link.type}
                      variant={link.type === 'github' ? 'outline' : 'primary'}
                      asChild
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon size={18} />
                        {link.label}
                      </a>
                    </Button>
                  );
                })}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
                {project.metrics.map((metric) => {
                  const Icon = metricIcons[metric.icon || 'users'];
                  return (
                    <div
                      key={metric.label}
                      className="glass-card p-4 text-center"
                    >
                      <Icon size={24} className="mx-auto text-ocean mb-2" />
                      <p className="text-xl font-bold text-pearl">{metric.value}</p>
                      <p className="text-sm text-pearl/50">{metric.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative h-80 lg:h-auto rounded-2xl overflow-hidden glass-card">
              {project.images.thumbnail ? (
                <Image
                  src={project.images.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-midnight/30">
                  <span className="text-ocean/40 font-mono">{project.title}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <Section title="Tech Stack" className="bg-midnight/5">
        <div className="flex flex-wrap gap-3 justify-center">
          {project.techStack.map((tech) => (
            <span
              key={tech.name}
              className="px-4 py-2 rounded-lg glass font-mono text-sm text-pearl"
            >
              {tech.name}
            </span>
          ))}
        </div>
      </Section>

      {/* Full Description */}
      <Section title="About This Project">
        <div className="prose prose-invert prose-lg max-w-none">
          <div
            className="text-pearl/80 space-y-4"
            dangerouslySetInnerHTML={{
              __html: project.fullDescription
                .replace(/##\s(.+)/g, '<h2 class="text-2xl font-bold text-pearl mt-8 mb-4">$1</h2>')
                .replace(/\*\*(.+?)\*\*/g, '<strong class="text-pearl">$1</strong>')
                .replace(/- (.+)/g, '<li class="text-pearl/70">$1</li>')
                .replace(/\n\n/g, '</p><p class="text-pearl/70">')
            }}
          />
        </div>
      </Section>

      {/* Screenshots */}
      {project.images.screenshots.length > 0 && (
        <Section title="Screenshots" className="bg-midnight/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-xl overflow-hidden glass-card"
              >
                <Image
                  src={screenshot}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Achievement Image */}
      {project.images.achievement && (
        <Section title="Achievement">
          <div className="max-w-2xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden glass-card">
              <Image
                src={project.images.achievement}
                alt={`${project.title} achievement`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </Section>
      )}

      {/* Testimonials */}
      {project.testimonials && project.testimonials.length > 0 && (
        <Section
          title="What Users Say"
          subtitle="Real feedback from people using this project"
          centered
          className="bg-midnight/5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section className="text-center py-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-pearl">Interested in this project?</h2>
          <p className="text-pearl/60">Check out the source code or try the live demo</p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            {project.links.slice(0, 2).map((link) => {
              const Icon = linkIcons[link.type];
              return (
                <Button
                  key={link.type}
                  variant={link.type === 'github' ? 'outline' : 'primary'}
                  asChild
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <Icon size={18} />
                    {link.label}
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}
