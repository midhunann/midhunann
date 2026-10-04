import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'synapse-docs',
    title: 'Synapse-Docs',
    lines: [
      'team of 3, led by me; runner-up at the adobe india hackathon 2025 (262,000 registrations)',
      'fastapi, react, google gemini, faiss, docker, gcp',
    ],
    story:
      'pdf libraries are static, so the links between documents stay invisible. we built a platform where selecting text instantly surfaces related passages across your whole library, with a sub-500ms semantic search on fastapi and faiss. a visual knowledge graph and a navigable research trail keep people from getting lost.',
    links: [
      { label: 'github', href: 'https://github.com/sooravali/synapse-docs' },
      { label: 'live demo', href: 'https://synapse-docs-833062842245.us-central1.run.app/' },
    ],
    image: {
      src: '/assets/images/projects/synapse-docs/thumbnail.png',
      alt: 'Synapse-Docs workspace showing a PDF with related snippets from other documents',
      width: 2940,
      height: 1596,
    },
  },
  {
    id: 'routex',
    title: 'RouteX',
    lines: [
      'team of 4, led by me; top 34 of 131,868 registrations at hp power lab 2.0',
      'fastapi, or-tools, cp-sat, react',
    ],
    story:
      'hpcl tankers have to be routed under multi-port demand and 720-hour constraints. routex is an optimization platform that generates cost-efficient routes and turns the result into actions on a dashboard.',
    links: [{ label: 'github', href: 'https://github.com/CosmicEngineers/RouteX' }],
    image: {
      src: '/assets/images/projects/routex/thumbnail.png',
      alt: 'RouteX coastal fleet optimizer: a map of tanker routes between Indian ports beside trip and cost panels',
      width: 2400,
      height: 1320,
    },
  },
  {
    id: 'haskell-run',
    title: 'Haskell Run',
    lines: ['solo vs code extension', 'typescript, node.js, vs code api'],
    story:
      'running haskell in vs code meant juggling the editor, a terminal and ghci. this extension runs a whole file or a single function in one click, with a repl and debugging built in. it has 2,300+ installs.',
    links: [
      {
        label: 'vs code marketplace',
        href: 'https://marketplace.visualstudio.com/items?itemName=midhunan.haskellrun',
      },
      { label: 'github', href: 'https://github.com/midhunann/Haskell-Run' },
    ],
    image: {
      src: '/assets/images/projects/haskell-run/thumbnail.png',
      alt: 'Haskell Run listing in the VS Code extensions panel',
      width: 1812,
      height: 1022,
    },
  },
  {
    id: 'attendease',
    title: 'AttendEase',
    lines: ['solo browser extension', 'html, css, javascript'],
    story:
      'the student portal shows raw attendance and never answers "how many classes can i skip?". attendease reads it and shows bunkable and recovery classes against the 75% threshold, in a floating widget. it runs on chrome, edge and firefox and is used by 1,600+ students.',
    links: [
      {
        label: 'chrome web store',
        href: 'https://chromewebstore.google.com/detail/nijdgjjkkoeoakfjcbpikjhhomnnbbnj',
      },
      {
        label: 'edge add-ons',
        href: 'https://microsoftedge.microsoft.com/addons/detail/chpobdolboifooeeoccpdponbjdicfgk',
      },
      { label: 'firefox add-ons', href: 'https://addons.mozilla.org/en-US/firefox/addon/attendease/' },
      { label: 'github', href: 'https://github.com/midhunann/AttendEase' },
    ],
    image: {
      src: '/assets/images/projects/attendease/thumbnail.png',
      alt: 'AttendEase widget over the student portal, showing how many classes can be skipped per course',
      width: 2940,
      height: 1604,
    },
  },
];
