import type { Role } from '@/types';

export const experience: Role[] = [
  {
    id: 'adobe',
    role: 'student insider',
    org: 'adobe',
    when: 'sep 2026 – present',
    meta: 'part-time, hybrid, noida',
    summary: ['selected as 1 of 100 students from nearly 19,000 applicants across india.'],
  },
  {
    id: 'hpcl',
    role: 'software engineer intern',
    org: 'hindustan petroleum corporation limited',
    when: 'apr – jun 2026',
    meta: 'on-site, mumbai',
    summary: [
      'built the pipeline operations monitoring system (next.js 15, firestore, sheetjs). it extracts, aggregates and visualizes 4 daily excel workbooks and replaces about 2 hours of daily work, roughly 60 man-hours a month. it is used across the organization.',
      'received a letter of excellence & recommendation.',
    ],
  },
  {
    id: 'grabb',
    role: 'web developer intern',
    org: 'grabb private limited',
    orgUrl: 'https://www.grabbtech.com/',
    when: 'may – jun 2025',
    meta: 'hybrid, tiruchirappalli',
    summary: [
      'built the company website from scratch with next.js 15 and typescript: 50+ accessible components and a 45% smaller initial bundle. added an interactive choropleth map of district-level enrollment and program data, automated vercel deployments with ci/cd, and reached a 98/100 seo score with lcp under 1.2s.',
    ],
  },
];
