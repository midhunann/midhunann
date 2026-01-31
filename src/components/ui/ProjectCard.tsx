'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, Code, Globe, ChevronRight } from 'lucide-react';
import { Project } from '@/types';
import { cn } from '@/lib/utils';
import { CardContainer, CardBody, CardItem } from './CardContainer';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const linkIcons = {
    github: Github,
    live: ExternalLink,
    vscode: Code,
    chrome: Globe,
    firefox: Globe,
    edge: Globe,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group w-full h-full"
    >
      <CardContainer className="w-full h-full">
        <CardBody className="relative w-full h-full">
          <Link href={`/projects/${project.slug}`} className="block h-full">
            <div className="glass-card overflow-hidden w-full h-full min-h-[640px] flex flex-col hover:border-ocean/40 transition-all duration-500">
                {/* Thumbnail */}
                <CardItem translateZ="50" className="w-full shrink-0">
                  <div className="relative aspect-video overflow-hidden bg-midnight/30">
                    {project.images.thumbnail ? (
                      <Image
                        src={project.images.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-ocean/40 font-mono text-sm">
                          {project.title}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-noir/80 via-noir/20 to-transparent" />
                    
                    {/* Role Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm',
                        project.role === 'solo'
                          ? 'bg-ocean/20 text-ocean border border-ocean/30'
                          : 'bg-midnight/50 text-pearl/80 border border-midnight/50'
                      )}>
                        {project.role === 'solo' ? 'Solo Project' : 'Team Project'}
                      </span>
                    </div>
                  </div>
                </CardItem>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  {/* Title and Description */}
                  <div className="space-y-3">
                    <CardItem translateZ="60" className="w-full">
                      <h3 className="text-xl font-semibold text-pearl group-hover:text-ocean transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-pearl/60 text-sm mt-2 leading-relaxed">
                        {project.tagline}
                      </p>
                    </CardItem>

                    {/* Tech Stack Preview */}
                    <CardItem translateZ="40" className="w-full">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech.name}
                            className="px-2.5 py-1 text-xs font-mono bg-midnight/40 text-pearl/70 rounded-md border border-midnight/20"
                          >
                            {tech.name}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2.5 py-1 text-xs font-mono text-pearl/40">
                            +{project.techStack.length - 4} more
                          </span>
                        )}
                      </div>
                    </CardItem>
                  </div>

                  {/* Bottom Section */}
                  <div className="space-y-3 mt-4">
                    {/* Metrics */}
                    <CardItem translateZ="30" className="w-full">
                      <div className="flex items-center gap-4 py-3 border-t border-ocean/10">
                        {project.metrics.slice(0, 2).map((metric) => (
                          <div key={metric.label} className="flex flex-col">
                            <span className="text-ocean font-semibold text-sm">{metric.value}</span>
                            <span className="text-pearl/40 text-xs mt-0.5">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    </CardItem>

                    {/* Links and CTA */}
                    <CardItem translateZ="20" className="w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {project.links.slice(0, 2).map((link) => {
                            const Icon = linkIcons[link.type];
                            return (
                              <a
                                key={link.type}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-midnight/30 text-pearl/60 hover:text-ocean hover:bg-midnight/50 transition-all border border-midnight/20 hover:border-ocean/30"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={link.label}
                              >
                                <Icon size={16} />
                              </a>
                            );
                          })}
                        </div>
                        <span className="text-ocean text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Details
                          <ChevronRight size={14} />
                        </span>
                      </div>
                    </CardItem>
                  </div>
                </div>
              </div>
          </Link>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}
