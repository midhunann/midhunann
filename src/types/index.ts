// ============================================
// PORTFOLIO TYPE DEFINITIONS
// ============================================

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'instagram' | 'twitter' | 'email' | 'phone';
  url: string;
  label: string;
  icon?: string;
}

export interface PersonalInfo {
  name: {
    full: string;
    display: string;
    logo: string; // lowercase for navbar
  };
  title: string;
  tagline: string;
  description: string;
  location: {
    city: string;
    country: string;
  };
  education: {
    degree: string;
    institution: string;
    year: string;
    cgpa: string;
    location: string;
  };
  socials: SocialLink[];
  email: string;
  phone: string;
  availability: {
    internship: boolean;
    freelance: boolean;
    fullTime: boolean;
  };
}

export interface TechStack {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'languages' | 'ai-ml';
  icon?: string;
}

export interface ProjectLink {
  type: 'github' | 'live' | 'vscode' | 'chrome' | 'firefox' | 'edge';
  url: string;
  label: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface ProjectTestimonial {
  author: string;
  date: string;
  content: string;
  helpful?: number;
  avatar?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  role: 'solo' | 'team';
  roleDescription?: string;
  techStack: TechStack[];
  links: ProjectLink[];
  images: {
    thumbnail: string;
    screenshots: string[];
    achievement?: string;
  };
  metrics: ProjectMetric[];
  testimonials?: ProjectTestimonial[];
  featured: boolean;
  order: number;
  status: 'active' | 'completed' | 'in-progress';
  startDate?: string;
  endDate?: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  link?: string;
  image?: string;
  type: 'hackathon' | 'award' | 'position' | 'certification';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: 'remote' | 'onsite' | 'hybrid';
  startDate: string;
  endDate: string | 'present';
  description: string[];
  techStack: string[];
  links?: {
    github?: string;
    live?: string;
  };
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  coverImage?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: string;
  external?: boolean;
}
