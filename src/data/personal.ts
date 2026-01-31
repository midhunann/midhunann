import { PersonalInfo, Skill, NavigationItem, CTAButton } from '@/types';

// ============================================
// PERSONAL INFORMATION
// ============================================

export const personalInfo: PersonalInfo = {
  name: {
    full: 'Midhunan Vijendra Prabhaharan',
    display: 'Midhunan',
    logo: 'midhunan', // lowercase for navbar
  },
  title: 'Full-Stack Developer & CSE Student',
  tagline: 'Building tools that solve real problems for real people',
  description:
    'A product-focused Computer Science student skilled at transforming complex user problems into intuitive digital solutions. Proven ability to lead projects from concept to deployment, winning Runner-up at the Adobe India Hackathon 2025.',
  location: {
    city: 'Chennai',
    country: 'India',
  },
  education: {
    degree: 'B.Tech in Computer Science Engineering',
    institution: 'Amrita Vishwa Vidyapeetham',
    year: '2023 - 2027 (3rd Year)',
    cgpa: '7.95',
    location: 'Coimbatore, Tamil Nadu',
  },
  socials: [
    {
      platform: 'github',
      url: 'https://github.com/midhunann',
      label: 'GitHub',
    },
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/midhunan-vijendra-prabhaharan/',
      label: 'LinkedIn',
    },
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/midhunannn',
      label: 'Instagram',
    },
    {
      platform: 'email',
      url: 'mailto:midhunmidhunan@gmail.com',
      label: 'Email',
    },
  ],
  email: 'midhunmidhunan@gmail.com',
  phone: '+91 7530043022',
  availability: {
    internship: true,
    freelance: true,
    fullTime: false,
  },
};

// ============================================
// NAVIGATION
// ============================================

export const navigation: NavigationItem[] = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'Projects', href: '/projects', icon: '💼' },
  { label: 'About', href: '/about', icon: '👤' },
  { label: 'Blog', href: '/blog', icon: '📝' },
  { label: 'Contact', href: '/contact', icon: '📧' },
];

// ============================================
// HERO CTA BUTTONS
// ============================================

export const heroCTAs: CTAButton[] = [
  {
    label: 'View Projects',
    href: '/projects',
    variant: 'primary',
    icon: 'code',
  },
  {
    label: 'Contact',
    href: '/contact',
    variant: 'secondary',
    icon: 'mail',
  },
  {
    label: 'My Blog',
    href: '/blog',
    variant: 'outline',
    icon: 'book-open',
  },
  {
    label: 'Resume',
    href: '/assets/resume/midhunan-resume.pdf',
    variant: 'ghost',
    icon: 'file-text',
    external: true,
  },
];

// ============================================
// SKILLS
// ============================================

export const skills: Skill[] = [
  {
    category: 'Languages',
    items: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Haskell', 'SQL'],
  },
  {
    category: 'Frontend Development',
    items: ['React.js', 'Next.js', 'Vite', 'HTML/CSS', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend Development',
    items: ['Node.js', 'Express', 'FastAPI', 'Prisma'],
  },
  {
    category: 'Databases & Search',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Faiss'],
  },
  {
    category: 'AI & Machine Learning',
    items: ['Google Gemini', 'Sentence Transformers', 'LangChain', 'Vector Databases'],
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'GitHub', 'Docker', 'GCP', 'Vercel', 'Linux', 'VS Code API'],
  },
];

// ============================================
// SOFT SKILLS
// ============================================

export const softSkills: string[] = [
  'Leadership',
  'Event Management',
  'Team Collaboration',
  'Problem Solving',
  'Communication',
  'UI/UX Design',
  'Project Management',
  'Technical Writing',
];

// ============================================
// ABOUT BIO
// ============================================

export const aboutBio = {
  headline: "Hey, I'm Midhunan 👋",
  paragraphs: [
    "I'm a third-year Computer Science student at Amrita Vishwa Vidyapeetham with a passion for building products that make a real difference. Whether it's a VS Code extension used by 1,400+ developers or a browser extension helping 450+ students track their attendance, I love creating tools that solve genuine problems.",
    "My journey in tech has taken me from hackathon stages to internship desks. As the Runner-up at Adobe India Hackathon 2025 (among ~100,000 teams), I've learned that the best solutions come from deeply understanding user pain points and iterating relentlessly until the experience feels effortless.",
    "When I'm not coding, you'll find me leading event management at ACM Student Chapter, exploring new frameworks, or thinking about how to make complex systems more accessible. I believe in shipping fast, learning faster, and building things that people actually want to use.",
    "Currently open to internships and freelance opportunities where I can contribute to meaningful projects and learn from experienced teams.",
  ],
};
