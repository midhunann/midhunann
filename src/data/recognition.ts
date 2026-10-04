import type { Award, Role } from '@/types';

export const awards: Award[] = [
  {
    id: 'adobe-hackathon',
    title: 'adobe india hackathon, runner-up',
    detail: 'grand finale, 262,000 registrations. synapse-docs',
    year: '2025',
    href: 'https://www.linkedin.com/posts/midhunan-vijendra-prabhaharan_announcing-the-winners-of-the-adobe-india-activity-7371195492870979585-Odlz',
    preview: {
      src: '/assets/images/achievements/adobe-hackathon-runner-up.jpeg',
      label: 'adobe india hackathon',
    },
  },
  {
    id: 'hp-power-lab',
    title: 'hp power lab 2.0, top 34 teams',
    detail: 'out of 131,868 registrations. routex',
    year: '2025',
    href: 'https://github.com/CosmicEngineers/RouteX',
  },
  {
    id: 'hack-beyond-limits',
    title: 'hack beyond limits, 3rd place',
    detail: '24-hour hackathon. agrichain',
    year: '2024',
    href: 'https://github.com/tokenomists/AgriChain',
    preview: {
      src: '/assets/images/achievements/hack-beyond-limits.jpeg',
      label: 'hack beyond limits',
    },
  },
  {
    id: 'value-health',
    title: 'value health hackathon, 3rd place',
    detail: 'arogya desk',
    year: '2025',
    href: 'https://www.linkedin.com/posts/midhunan-vijendra-prabhaharan_we-manc-proudly-secured-3rd-place-in-the-activity-7291080294781083648-2O6e',
    preview: {
      src: '/assets/images/achievements/value-health-hackathon.jpeg',
      label: 'value health hackathon',
    },
  },
  {
    id: 'unstop-top-80',
    title: 'unstop top 80 unstoppable e-school leaders',
    detail: 'recognized by unstop',
    year: '2026',
    href: 'https://www.linkedin.com/posts/midhunan-vijendra-prabhaharan_honored-to-be-recognized-among-the-top-80-activity-7439696329385279488-RovY',
  },
];

export const leadership: Role[] = [
  {
    id: 'acm',
    role: 'co-head, event management',
    org: 'acm student chapter, amrita coimbatore',
    when: 'aug 2025 – apr 2026',
    summary: [
      'led planning and execution of chapter events across teams and volunteers: timelines, responsibilities, logistics and on-ground operations.',
      "also on the technical team (mar 2025 – apr 2026): helped design and build the chapter's public website.",
    ],
    preview: { src: '/assets/images/achievements/acm-team.JPG', label: 'acm student chapter' },
  },
  {
    id: 'anokha',
    role: 'coordinator',
    org: 'anokha, amrita university techfest',
    when: 'nov 2025 – jan 2026',
    meta: 'on-site, coimbatore',
    summary: [
      'ran acm winter of code 2.0 under anokha 2026 end to end, coordinating teams, communication and event delivery.',
      'led pr and outreach, converting 100+ students into registrations.',
    ],
  },
];

export const education: Role[] = [
  {
    id: 'amrita',
    role: 'b.tech computer science engineering',
    org: 'amrita vishwa vidyapeetham',
    when: '2023 – 2027',
    meta: 'coimbatore',
    summary: [],
  },
  {
    id: 'care',
    role: 'std 10 & 12',
    org: 'care international school',
    when: 'until 2023',
    meta: 'trichy, 89% aggregate',
    summary: [],
  },
];
