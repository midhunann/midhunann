import type { Profile } from '@/types';

export const profile: Profile = {
  name: {
    first: 'midhunan',
    rest: 'vijendra prabhaharan',
    full: 'Midhunan Vijendra Prabhaharan',
  },
  title: 'Midhunan Vijendra Prabhaharan | Computer Science Student & Software Engineer',
  description:
    'Computer science student building things people use: Haskell Run (2,300+ installs), AttendEase (1,600+ students), Synapse-Docs (Adobe India Hackathon runner-up).',
  lead: "i'm a final-year computer science student. i like the part of a problem where the solution isn't obvious and i have to figure out what should actually be built.",
  proof:
    'so far that has become a vs code extension with 2,300+ installs, a browser extension used by 1,600+ students, and a document-intelligence platform that was runner-up at the adobe india hackathon.',
  email: 'midhunmidhunan@gmail.com',
  resume: '/assets/resume/midhunan-resume.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/midhunanv',
    github: 'https://github.com/midhunann',
    instagram: 'https://www.instagram.com/midhunannn',
  },
  portrait: {
    src: '/assets/images/profile/profile-photo.png',
    alt: 'Midhunan, smiling, wearing glasses and a navy t-shirt',
    width: 1145,
    height: 1373,
  },
  stage: { src: '/assets/images/profile/speaking.jpg', label: 'speaking' },
};
