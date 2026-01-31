'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Code,
  Mail,
  BookOpen,
  FileText,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { 
  Button, 
  Section, 
  ProjectCard,
  AchievementCard,
  BackgroundBeams,
  TextHoverEffect,
  InfiniteMovingCards,
  HoverBorderGradient,
  TextGenerateEffect,
  Spotlight,
} from '@/components/ui';
import { personalInfo, heroCTAs, getFeaturedProjects, achievements } from '@/data';

const iconMap: Record<string, typeof Code> = {
  code: Code,
  mail: Mail,
  'book-open': BookOpen,
  'file-text': FileText,
};

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  // Data for infinite moving cards (stats)
  const statsCards = [
    {
      content: (
        <div className="text-center">
          <p className="text-3xl font-bold text-ocean mb-2">3+</p>
          <p className="text-sm text-pearl/60">Hackathon Wins</p>
        </div>
      ),
    },
    {
      content: (
        <div className="text-center">
          <p className="text-3xl font-bold text-ocean mb-2">2,000+</p>
          <p className="text-sm text-pearl/60">Users Served</p>
        </div>
      ),
    },
    {
      content: (
        <div className="text-center">
          <p className="text-3xl font-bold text-ocean mb-2">10+</p>
          <p className="text-sm text-pearl/60">Projects Shipped</p>
        </div>
      ),
    },
    {
      content: (
        <div className="text-center">
          <p className="text-3xl font-bold text-ocean mb-2">Runner-up</p>
          <p className="text-sm text-pearl/60">Adobe Hackathon</p>
        </div>
      ),
    },
    {
      content: (
        <div className="text-center">
          <p className="text-3xl font-bold text-ocean mb-2">React</p>
          <p className="text-sm text-pearl/60">Expert Level</p>
        </div>
      ),
    },
    {
      content: (
        <div className="text-center">
          <p className="text-3xl font-bold text-ocean mb-2">TypeScript</p>
          <p className="text-sm text-pearl/60">Primary Language</p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Effects - Replace with Background Beams */}
      <BackgroundBeams className="opacity-50" />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="var(--ocean)" />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-pearl/80"
            >
              <Sparkles size={16} className="text-ocean" />
              <span>Available for internships & freelance</span>
            </motion.div>

            {/* Headline with Text Hover Effect */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-pearl leading-tight"
            >
              Hey, I&apos;m{' '}
              <TextHoverEffect 
                text={personalInfo.name.display}
                className="inline-block"
              />
              <br />
              <span className="text-pearl/80 text-3xl md:text-5xl lg:text-6xl font-medium">
                {personalInfo.title}
              </span>
            </motion.h1>

            {/* Tagline with Text Generate Effect */}
            <TextGenerateEffect
              words={`${personalInfo.tagline}. Adobe Hackathon Runner-up. Building tools used by 2,000+ developers and students.`}
              className="text-lg md:text-xl text-pearl/60 max-w-2xl mx-auto"
            />

            {/* CTA Buttons with Hover Border Gradient */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              {heroCTAs.map((cta, idx) => {
                const Icon = iconMap[cta.icon || ''];
                
                if (idx === 0) {
                  // Primary button with HoverBorderGradient
                  return (
                    <HoverBorderGradient
                      key={cta.label}
                      as="div"
                      className="!bg-midnight hover:!bg-midnight/80"
                    >
                      {cta.external ? (
                        <a 
                          href={cta.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          {Icon && <Icon size={18} />}
                          {cta.label}
                        </a>
                      ) : (
                        <Link href={cta.href} className="flex items-center gap-2">
                          {Icon && <Icon size={18} />}
                          {cta.label}
                        </Link>
                      )}
                    </HoverBorderGradient>
                  );
                }
                
                return (
                  <Button
                    key={cta.label}
                    variant={cta.variant}
                    asChild
                  >
                    {cta.external ? (
                      <a href={cta.href} target="_blank" rel="noopener noreferrer">
                        {Icon && <Icon size={18} />}
                        {cta.label}
                      </a>
                    ) : (
                      <Link href={cta.href}>
                        {Icon && <Icon size={18} />}
                        {cta.label}
                      </Link>
                    )}
                  </Button>
                );
              })}
            </motion.div>

            {/* Quick Stats - Replaced with Infinite Moving Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-12"
            >
              <InfiniteMovingCards
                items={statsCards}
                direction="right"
                speed="slow"
                className="py-4"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-ocean/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-ocean rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <Section
        id="featured-projects"
        title="Featured Projects"
        subtitle="A showcase of my recent work and the problems I've solved"
        centered
        className="bg-linear-to-b from-transparent via-midnight/5 to-transparent"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr items-stretch">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full w-full max-w-md mx-auto"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" asChild>
            <Link href="/projects">
              View All Projects
              <ArrowRight size={16} />
            </Link>
          </Button>
        </motion.div>
      </Section>

      {/* Achievements Section */}
      <Section
        id="achievements"
        title="Achievements & Awards"
        subtitle="Recognition and milestones from my journey so far"
        centered
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="text-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pearl mb-4">
            Let&apos;s Build Something Great
          </h2>
          <p className="text-pearl/60 mb-8">
            I&apos;m currently open to internship opportunities and freelance projects.
            If you have an interesting idea or project, let&apos;s talk!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild>
              <Link href="/contact">
                <Mail size={18} />
                Get in Touch
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="/assets/resume/midhunan-resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText size={18} />
                Download Resume
              </a>
            </Button>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
