import { Metadata } from 'next';
import { ProjectCard, Section } from '@/components/ui';
import { projects } from '@/data';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my portfolio of projects including Synapse-Docs (Adobe Hackathon Runner-up), Haskell Run (1,400+ users), and AttendEase (450+ users).',
};

export default function ProjectsPage() {
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  return (
    <div className="relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      <Section
        title="All Projects"
        subtitle="A complete showcase of my work — from hackathon winners to developer tools used by thousands"
        centered
        className="pt-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </Section>
    </div>
  );
}
