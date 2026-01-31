'use client';

import { motion } from 'framer-motion';
// Image import - uncomment when profile photo is added
// import Image from 'next/image';
import Link from 'next/link';
import { FileText, Mail, MapPin, GraduationCap, Briefcase, Code } from 'lucide-react';
import { 
  Button, 
  Section, 
  AchievementCard,
  CardContainer,
  CardBody,
  CardItem,
  HoverBorderGradient,
  TextHoverEffect,
  InfiniteMovingCards,
  BackgroundBeams,
} from '@/components/ui';
import {
  personalInfo,
  aboutBio,
  skills,
  softSkills,
  experiences,
  education,
  coursework,
  achievements,
} from '@/data';

export default function AboutPage() {
  // Soft skills for infinite moving cards
  const softSkillsCards = softSkills.map((skill) => ({
    content: skill,
  }));

  return (
    <div className="relative">
      {/* Background */}
      <BackgroundBeams className="opacity-30" />

      {/* Hero */}
      <section className="relative pt-8 pb-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Profile Image with 3D Card Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <CardContainer>
                <CardBody>
                  <CardItem translateZ="50" className="w-full">
                    <div className="relative aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden glass-card">
                      <div className="absolute inset-0 flex items-center justify-center bg-midnight/30">
                        <span className="text-6xl">👨‍💻</span>
                      </div>
                      {/* Replace with actual image when available */}
                      {/* <Image
                        src="/assets/images/profile/profile-photo.png"
                        alt={personalInfo.name.display}
                        fill
                        className="object-cover"
                      /> */}
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>

              {/* Quick Info Cards */}
              <div className="mt-6 space-y-3">
                <div className="glass-card p-4 flex items-center gap-3">
                  <MapPin size={20} className="text-ocean" />
                  <span className="text-pearl/80">
                    {personalInfo.location.city}, {personalInfo.location.country}
                  </span>
                </div>
                <div className="glass-card p-4 flex items-center gap-3">
                  <GraduationCap size={20} className="text-ocean" />
                  <span className="text-pearl/80">
                    {personalInfo.education.year}
                  </span>
                </div>
                <div className="glass-card p-4 flex items-center gap-3">
                  <Briefcase size={20} className="text-ocean" />
                  <span className="text-pearl/80">
                    Open to Internships & Freelance
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <HoverBorderGradient as="div" containerClassName="w-full">
                  <Link href="/contact" className="flex items-center gap-2 justify-center w-full">
                    <Mail size={18} />
                    Get in Touch
                  </Link>
                </HoverBorderGradient>
                <Button variant="outline" asChild className="w-full">
                  <a
                    href="/assets/resume/midhunan-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText size={18} />
                    Download Resume
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-pearl">
                <TextHoverEffect text={aboutBio.headline} />
              </h1>

              <div className="space-y-4">
                {aboutBio.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-pearl/70 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <Section
        title="Technical Skills"
        subtitle="Technologies and tools I work with"
        centered
        className="bg-midnight/5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="glass-card p-6 hover:border-ocean/40 transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <Code size={20} className="text-ocean" />
                  <h3 className="font-semibold text-pearl">{skillGroup.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm font-mono bg-midnight/30 text-pearl/80 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills - Replaced with Infinite Moving Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-semibold text-pearl mb-4">Soft Skills</h3>
          <InfiniteMovingCards
            items={softSkillsCards}
            direction="left"
            speed="slow"
            className="mt-4"
          />
        </motion.div>
      </Section>

      {/* Experience */}
      <Section
        title="Experience"
        subtitle="Professional experience and internships"
        centered
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-pearl">{exp.title}</h3>
                  <p className="text-ocean">{exp.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-pearl/60">
                    {exp.startDate} – {exp.endDate}
                  </p>
                  <p className="text-pearl/40 text-sm">{exp.location}</p>
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                {exp.description.map((point, i) => (
                  <li key={i} className="text-pearl/70 text-sm flex gap-2">
                    <span className="text-ocean shrink-0">•</span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-mono bg-ocean/10 text-ocean rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section
        title="Education"
        subtitle="Academic background and relevant coursework"
        centered
        className="bg-midnight/5"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-pearl">{edu.degree}</h3>
                  <p className="text-ocean">{edu.institution}</p>
                </div>
                <div className="text-right">
                  <p className="text-pearl/60">
                    {edu.startDate} – {edu.endDate}
                  </p>
                  <p className="text-pearl/40 text-sm">{edu.location}</p>
                </div>
              </div>
              {edu.gpa && (
                <p className="text-pearl/80 font-medium">{edu.gpa}</p>
              )}
            </motion.div>
          ))}

          {/* Coursework */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-8"
          >
            <h3 className="text-xl font-semibold text-pearl mb-4 text-center">
              Relevant Coursework
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {coursework.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1.5 rounded-lg glass text-pearl/70 text-sm"
                >
                  {course}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Achievements */}
      <Section
        title="Achievements & Awards"
        subtitle="Recognition and milestones from my journey"
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
    </div>
  );
}
