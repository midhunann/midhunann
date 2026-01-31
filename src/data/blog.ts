import { BlogPost } from '@/types';

// ============================================
// BLOG POSTS DATA
// ============================================

export const blogPosts: BlogPost[] = [
  {
    id: 'building-synapse-docs',
    slug: 'building-synapse-docs-adobe-hackathon',
    title: 'Building Synapse-Docs: Our Journey to Adobe Hackathon Runner-Up',
    excerpt:
      'A deep dive into how we built an AI-powered document intelligence platform that earned us the Runner-up position among 100,000 teams at Adobe India Hackathon 2025.',
    content: `
# Building Synapse-Docs: Our Journey to Adobe Hackathon Runner-Up

*Coming soon...*

This post will cover:
- The problem statement and our interpretation
- Technical architecture decisions
- Challenges we faced and how we overcame them
- Key learnings from the hackathon experience
- What's next for Synapse-Docs
    `,
    publishedAt: '2025-04-15',
    tags: ['hackathon', 'ai', 'fastapi', 'react', 'case-study'],
    readTime: '10 min read',
    featured: true,
    coverImage: '/assets/images/blog/synapse-docs-journey.png',
  },
  {
    id: 'vscode-extension-guide',
    slug: 'building-vscode-extensions-complete-guide',
    title: 'Building VS Code Extensions: A Complete Guide for Beginners',
    excerpt:
      'Everything I learned while building Haskell Run — from project setup to publishing on the marketplace with 1,400+ users.',
    content: `
# Building VS Code Extensions: A Complete Guide for Beginners

*Coming soon...*

This guide will cover:
- Setting up your extension project
- Understanding the VS Code API
- Creating commands and keybindings
- Working with the terminal API
- Publishing to the VS Code Marketplace
- Growing your user base
    `,
    publishedAt: '2025-03-01',
    tags: ['vscode', 'typescript', 'tutorial', 'developer-tools'],
    readTime: '15 min read',
    featured: true,
    coverImage: '/assets/images/blog/vscode-extension-guide.png',
  },
  {
    id: 'browser-extension-scraping',
    slug: 'web-scraping-browser-extensions',
    title: 'Web Scraping with Browser Extensions: Building AttendEase',
    excerpt:
      'How I built a browser extension that helps 450+ students automatically track their attendance and calculate safe bunks.',
    content: `
# Web Scraping with Browser Extensions: Building AttendEase

*Coming soon...*

This post will cover:
- Understanding content scripts and manifest.json
- DOM manipulation and data extraction
- Cross-browser compatibility (Chrome, Firefox, Edge)
- Publishing across multiple extension stores
- Handling user feedback and feature requests
    `,
    publishedAt: '2025-02-15',
    tags: ['browser-extension', 'javascript', 'web-scraping', 'tutorial'],
    readTime: '12 min read',
    featured: false,
    coverImage: '/assets/images/blog/browser-extension-scraping.png',
  },
  {
    id: 'hackathon-tips',
    slug: 'winning-hackathons-practical-tips',
    title: '5 Practical Tips for Winning Hackathons (From Someone Who Actually Won)',
    excerpt:
      'Lessons from multiple hackathon wins — what actually matters and what most teams get wrong.',
    content: `
# 5 Practical Tips for Winning Hackathons

*Coming soon...*

Topics:
- Choosing the right problem (hint: not the flashiest one)
- Team composition and role clarity
- The demo is everything
- Time management that actually works
- What judges really look for
    `,
    publishedAt: '2025-01-20',
    tags: ['hackathon', 'career', 'tips'],
    readTime: '8 min read',
    featured: false,
    coverImage: '/assets/images/blog/hackathon-tips.png',
  },
];

// Helper function to get featured posts
export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter((p) => p.featured);
};

// Helper function to get post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((p) => p.slug === slug);
};

// Helper function to get all post slugs (for static generation)
export const getAllPostSlugs = (): string[] => {
  return blogPosts.map((p) => p.slug);
};

// Helper function to get posts by tag
export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter((p) => p.tags.includes(tag));
};
