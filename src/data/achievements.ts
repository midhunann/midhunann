import { Achievement, Experience, Education } from '@/types';

// ============================================
// ACHIEVEMENTS DATA
// ============================================

export const achievements: Achievement[] = [
  {
    id: 'adobe-hackathon-2025',
    title: 'Runner-up, Grand Finale',
    organization: 'Adobe India Hackathon 2025',
    year: '2025',
    description:
      'Secured 2nd place among approximately 100,000 teams in the Adobe India Hackathon 2025 with Synapse-Docs, a document intelligence platform.',
    link: 'https://www.linkedin.com/posts/midhunan-vijendra-prabhaharan_announcing-the-winners-of-the-adobe-india-activity-7371195492870979585-Odlz',
    image: '/assets/images/achievements/adobe-hackathon-runner-up.png',
    type: 'hackathon',
  },
  {
    id: 'hack-beyond-limits-2024',
    title: '3rd Place Winner',
    organization: 'Hack Beyond Limits 24-Hour Hackathon',
    year: '2024',
    description:
      'Built AgriChain, a blockchain-based solution for agricultural supply chain transparency.',
    link: 'https://github.com/tokenomists/AgriChain',
    type: 'hackathon',
  },
  {
    id: 'value-health-hackathon',
    title: '3rd Place Winner',
    organization: 'Value Health Hackathon',
    year: '2025',
    description:
      'Developed Arogya Desk, a healthcare management solution.',
    link: 'https://www.linkedin.com/posts/midhunan-vijendra-prabhaharan_we-manc-proudly-secured-3rd-place-in-the-activity-7291080294781083648-2O6e',
    type: 'hackathon',
  },
  {
    id: 'acm-student-chapter',
    title: 'Head of Event Management & Web Developer',
    organization: 'ACM Student Chapter',
    year: '2024 - Present',
    description:
      'Leading event management initiatives and developing web solutions for the ACM Student Chapter at Amrita Vishwa Vidyapeetham.',
    type: 'position',
  },
];

// ============================================
// EXPERIENCE DATA
// ============================================

export const experiences: Experience[] = [
  {
    id: 'grabb-internship',
    title: 'Web Developer Intern',
    company: 'GRABB Private Limited',
    companyUrl: 'https://grabbtech.com/',
    location: 'Hybrid',
    type: 'hybrid',
    startDate: 'May 2025',
    endDate: 'June 2025',
    description: [
      'Architected the company website from scratch using Next.js 15 and TypeScript, developing 50+ accessible components and engineering a 45% reduction in initial bundle size.',
      'Developed an interactive choropleth map with React Simple Maps and GeoJSON to visualize company impact via district-level enrollment and program data.',
      'Automated Vercel deployments via CI/CD, achieving a 98/100 SEO score and LCP < 1.2s.',
    ],
    techStack: ['Next.js', 'TypeScript', 'React Simple Maps', 'GeoJSON', 'Vercel', 'CI/CD'],
    links: {
      github: 'https://github.com/midhunann',
      live: 'https://grabbtech.com/',
    },
  },
];

// ============================================
// EDUCATION DATA
// ============================================

export const education: Education[] = [
  {
    id: 'amrita',
    degree: 'Bachelor of Technology in Computer Science Engineering',
    institution: 'Amrita Vishwa Vidyapeetham',
    location: 'Coimbatore, Tamil Nadu',
    startDate: 'Aug 2023',
    endDate: 'Present (Expected 2027)',
    gpa: 'CGPA: 7.95',
    description: 'Focusing on full-stack development, machine learning, and software engineering.',
  },
  {
    id: 'care-international',
    degree: 'High School (Standard 10 & 12)',
    institution: 'CARE International School',
    location: 'Trichy, Tamil Nadu',
    startDate: 'July 2010',
    endDate: 'May 2023',
    gpa: 'Aggregate: 89%',
  },
];

// ============================================
// RELEVANT COURSEWORK
// ============================================

export const coursework: string[] = [
  'Data Structures & Algorithms',
  'Object-Oriented Programming',
  'Database Management Systems',
  'Operating Systems',
  'Computer Networks',
  'Machine Learning',
  'Web Technologies',
  'Software Engineering',
  'Discrete Mathematics',
  'Theory of Computation',
];
