export interface Preview {
  src: string;
  label: string;
}

export interface Profile {
  name: { first: string; rest: string; full: string };
  title: string;
  description: string;
  lead: string;
  proof: string;
  email: string;
  resume: string;
  links: { linkedin: string; github: string; instagram: string; x: string };
  portrait: { src: string; alt: string; width: number; height: number };
  stage: Preview;
}

/** A dated entry: a job, a leadership role or a school. */
export interface Role {
  id: string;
  role: string;
  org: string;
  orgUrl?: string;
  when: string;
  meta?: string;
  summary: string[];
  preview?: Preview;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  title: string;
  /** Exactly two plain descriptor lines: what it was, and what it is built with. */
  lines: [string, string];
  story: string;
  links: ProjectLink[];
  /** Omit until the image exists; the page renders a quiet placeholder. */
  image?: ProjectImage;
}

export interface Award {
  id: string;
  title: string;
  detail: string;
  year: string;
  href: string;
  preview?: Preview;
}
