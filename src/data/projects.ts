import { Project } from '@/types';

// ============================================
// PROJECTS DATA
// ============================================

export const projects: Project[] = [
  {
    id: 'synapse-docs',
    slug: 'synapse-docs',
    title: 'Synapse-Docs',
    tagline:
      'An intelligent document platform that transforms static PDFs into interactive knowledge bases with real-time semantic connections and AI-powered insights',
    description:
      'A full-stack document intelligence system built for Adobe India Hackathon 2025 Grand Finale. Upload PDFs, discover cross-document connections instantly, and leverage AI for insights, knowledge graphs, and even audio podcasts.',
    fullDescription: `
## Overview

Synapse-Docs is a full-stack web application built for the Adobe India Hackathon 2025 Grand Finale. It implements a sophisticated document intelligence system that enables users to upload PDF documents, view them with high fidelity, select text passages, and instantly discover related content across their entire document library.

## The Challenge

**Adobe Hackathon 2025: "From Brains to Experience"**

Users (researchers, students, professionals) deal with large volumes of documents daily — research papers, business reports, study material, etc. Over time, it becomes impossible to remember all details or connect insights across these documents.

## Our Solution

Synapse-Docs helps users by:
- **Quickly surfacing related, overlapping, contradicting, or insightful information** from their personal document library
- **Using AI/LLM-powered capabilities** to enhance understanding and engagement — grounded on the documents they've read
- **Visualizing knowledge graphs** that show relationships between concepts across documents
- **Generating audio podcasts** from document content for on-the-go learning

## Technical Highlights

- **Sub-500ms semantic search** using FastAPI and Faiss vector database
- **High-fidelity PDF rendering** with Adobe PDF Embed API
- **Interactive knowledge graph visualization** using React Force Graph 2D
- **AI-powered insights generation** with Google Gemini 2.5 Flash
- **Audio podcast generation** via Azure Cognitive Services

Built on previous hackathon rounds, this application refactors and integrates the complete Challenge 1A (PDF understanding engine) and Challenge 1B (persona-driven document intelligence) code into a production-ready backend service.
    `,
    role: 'team',
    roleDescription:
      'Led a 3-member team, architecting the full-stack solution and implementing the semantic search and knowledge graph features',
    techStack: [
      { name: 'React', category: 'frontend' },
      { name: 'Vite', category: 'frontend' },
      { name: 'FastAPI', category: 'backend' },
      { name: 'Python', category: 'languages' },
      { name: 'SQLite', category: 'database' },
      { name: 'Faiss', category: 'ai-ml' },
      { name: 'Google Gemini', category: 'ai-ml' },
      { name: 'Azure Cognitive Services', category: 'ai-ml' },
      { name: 'Docker', category: 'tools' },
      { name: 'Google Cloud Run', category: 'tools' },
      { name: 'Adobe PDF Embed API', category: 'tools' },
    ],
    links: [
      {
        type: 'github',
        url: 'https://github.com/sooravali/synapse-docs',
        label: 'View Source',
      },
      {
        type: 'live',
        url: 'https://synapse-docs-833062842245.us-central1.run.app/',
        label: 'Live Demo',
      },
    ],
    images: {
      logo: '/assets/images/projects/synapse-docs/synapse-docs-logo.png',
      thumbnail: '/assets/images/projects/synapse-docs/thumbnail.png',
      screenshots: [
        '/assets/images/projects/synapse-docs/screenshot-1.png',
        '/assets/images/projects/synapse-docs/screenshot-2.png',
        '/assets/images/projects/synapse-docs/screenshot-3.png',
      ],
      achievement: '/assets/images/achievements/adobe-hackathon-runner-up.png',
    },
    metrics: [
      { label: 'Hackathon Rank', value: '🥈 Runner-up', icon: 'trophy' },
      { label: 'Teams Competed', value: '~100,000', icon: 'users' },
      { label: 'Search Latency', value: '<500ms', icon: 'zap' },
      { label: 'Team Size', value: '3 members', icon: 'users' },
    ],
    featured: true,
    order: 1,
    status: 'completed',
    startDate: '2025-01',
    endDate: '2025-04',
  },
  {
    id: 'haskell-run',
    slug: 'haskell-run',
    title: 'Haskell Run',
    tagline:
      'A VS Code extension for simple, one-click Haskell code execution, providing a unified development experience with an integrated REPL, debugger, snippets, and more.',
    description:
      'Transforms VS Code into a powerful, interactive Haskell development environment. Execute entire files, run individual functions, and test code snippets with a single click — just like Python\'s code runner, but designed specifically for Haskell.',
    fullDescription: `
## Overview

**Haskell Run** transforms VS Code into a powerful, interactive Haskell development environment. Execute entire files, run individual functions, and test code snippets with a single click — just like Python's code runner, but designed specifically for Haskell.

## The Problem

Haskell developers using VS Code often struggle with a fragmented development experience. Running Haskell code requires switching between the editor and terminal, manually loading files into GHCi, and remembering complex commands. This breaks the flow of development and makes Haskell less accessible to beginners.

## The Solution

Haskell Run provides:
- **One-click execution** of entire Haskell files
- **Function-level execution** for testing individual functions
- **Integrated REPL** directly within VS Code
- **Intelligent code snippets** for common Haskell patterns
- **Debugging capabilities** for step-by-step code analysis

## Impact

With 1,400+ active users on the VS Code Marketplace, Haskell Run has become an essential tool for Haskell developers and students learning functional programming. The extension continues to evolve based on community feedback.
    `,
    role: 'solo',
    roleDescription: 'Designed and developed the entire extension independently',
    techStack: [
      { name: 'TypeScript', category: 'languages' },
      { name: 'JavaScript', category: 'languages' },
      { name: 'VS Code API', category: 'tools' },
      { name: 'Node.js', category: 'backend' },
    ],
    links: [
      {
        type: 'github',
        url: 'https://github.com/midhunann/Haskell-Run',
        label: 'View Source',
      },
      {
        type: 'vscode',
        url: 'https://marketplace.visualstudio.com/items?itemName=midhunan.haskellrun',
        label: 'VS Code Marketplace',
      },
    ],
    images: {
      logo: '/assets/images/projects/haskell-run/haskell-run-logo.png',
      thumbnail: '/assets/images/projects/haskell-run/thumbnail.png',
      screenshots: [
        '/assets/images/projects/haskell-run/screenshot-1.png',
        '/assets/images/projects/haskell-run/screenshot-2.png',
      ],
    },
    metrics: [
      { label: 'Active Users', value: '1,400+', icon: 'users' },
      { label: 'Platform', value: 'VS Code', icon: 'code' },
      { label: 'Downloads', value: '1,400+', icon: 'download' },
    ],
    featured: true,
    order: 2,
    status: 'active',
    startDate: '2024-06',
  },
  {
    id: 'attendease',
    slug: 'attendease',
    title: 'AttendEase',
    tagline:
      'A browser extension that scrapes My Amrita Portal attendance data and calculates safe bunks to maintain a 75% threshold.',
    description:
      'A browser extension designed for Amrita University students. Automatically scrapes attendance data from the official student portal and provides bunkable classes calculation and recovery insights.',
    fullDescription: `
## Overview

**AttendEase** is a browser extension designed for Amrita University students. It automatically scrapes attendance data from the official student portal and provides instant insights about attendance management.

## Features

- **Bunkable Classes**: Maximum lectures you can skip while maintaining at least 75% attendance
- **Recovery Classes**: Minimum lectures you need to attend if you're below the threshold
- **Real-time Stats**: Access through a floating widget or extension popup
- **Zero Manual Entry**: Data is automatically scraped from the portal

## Cross-Platform Availability

Available on all major browsers:
- Chrome Web Store
- Microsoft Edge Add-ons
- Firefox Add-ons
- Works on mobile Firefox too!

## Impact

With 450+ active users and glowing reviews, AttendEase has become an essential tool for Amrita students. Users praise its accuracy, ease of use, and the peace of mind it provides during the semester.
    `,
    role: 'solo',
    roleDescription: 'Designed, developed, and published the extension across all major browsers',
    techStack: [
      { name: 'HTML', category: 'frontend' },
      { name: 'CSS', category: 'frontend' },
      { name: 'JavaScript', category: 'languages' },
    ],
    links: [
      {
        type: 'github',
        url: 'https://github.com/midhunann/AttendEase',
        label: 'View Source',
      },
      {
        type: 'chrome',
        url: 'https://chromewebstore.google.com/detail/nijdgjjkkoeoakfjcbpikjhhomnnbbnj',
        label: 'Chrome Web Store',
      },
      {
        type: 'edge',
        url: 'https://microsoftedge.microsoft.com/addons/detail/chpobdolboifooeeoccpdponbjdicfgk',
        label: 'Edge Add-ons',
      },
      {
        type: 'firefox',
        url: 'https://addons.mozilla.org/en-US/firefox/addon/attendease/',
        label: 'Firefox Add-ons',
      },
    ],
    images: {
      logo: '/assets/images/projects/attendease/attend-ease-128.png',
      thumbnail: '/assets/images/projects/attendease/thumbnail.png',
      screenshots: [
        '/assets/images/projects/attendease/screenshot-1.png',
        '/assets/images/projects/attendease/screenshot-2.png',
      ],
    },
    metrics: [
      { label: 'Active Users', value: '450+', icon: 'users' },
      { label: 'Platforms', value: '4 browsers', icon: 'globe' },
      { label: 'Reviews', value: '⭐ Great', icon: 'star' },
    ],
    testimonials: [
      {
        author: 'Anush Rithvic',
        date: 'Jul 8, 2025',
        content:
          "An Absolute Game-Changer for Students! AttendEase is hands down one of the most useful Chrome extensions I've come across. It automatically tracks my class attendance and gives real-time insights into how many classes I can safely miss without falling below the required percentage. The interface is clean, intuitive, and perfect for students who want to stay on top of their attendance. No more manual calculations or second-guessing!",
        helpful: 1,
      },
      {
        author: 'Varun Hirthik.V',
        date: 'Jul 16, 2025',
        content:
          'This is actually a big work of art, wowww very useful amrita boys wooo wooo!! namma dha',
      },
      {
        author: 'Mahesh Reddy K',
        date: 'Jan 4, 2026',
        content:
          'This is very useful. Could you add an option to sync with the academic calendar and timetable? Additionally, please specify by which date we will achieve the required number of classes.',
      },
      {
        author: 'Nishanth S Gowda',
        date: 'Sep 22, 2025',
        content: 'Crazyyy',
        helpful: 1,
      },
      {
        author: 'Aadesh N',
        date: 'Jul 16, 2025',
        content:
          'Nice work Midhunan keep going to great heights, this is a helpful insight',
      },
      {
        author: 'deepan selvaraj',
        date: 'Dec 16, 2025',
        content: 'nice work',
      },
    ],
    featured: true,
    order: 3,
    status: 'active',
    startDate: '2025-05',
  },
];

// Helper function to get featured projects
export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
};

// Helper function to get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};

// Helper function to get all project slugs (for static generation)
export const getAllProjectSlugs = (): string[] => {
  return projects.map((p) => p.slug);
};
