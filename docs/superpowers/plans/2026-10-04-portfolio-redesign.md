# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the multi-page glassmorphism site with one short, editorial, light/dark page that gets a visitor to connect on LinkedIn, using up-to-date content from the 1709.pdf resume and LinkedIn.

**Architecture:** One static Next.js route (`/`) composed of small server components fed by typed data files in `src/data`. Six tiny client components handle only interaction (active nav link, theme toggle, copy email, name hover, cursor preview). Design tokens are CSS variables; Tailwind maps to them. Pure logic (theme script, clipboard, preview placement, site URL) lives in dependency-free `src/lib/*.ts` files so it is unit-tested with `node:test`.

**Tech Stack:** Next.js 16.1.6, React 19.2.3, Tailwind CSS 4, TypeScript 5, `next/font` (Inter, Instrument Serif, Monaspace Neon). Tests: Node 22 built-in `node:test` with `--experimental-strip-types` (no new dependencies). Removed: framer-motion, lucide-react, @radix-ui/react-slot, class-variance-authority, clsx, tailwind-merge.

**Spec:** `docs/superpowers/specs/2026-10-04-portfolio-redesign-design.md` (read it first; copy, decisions and rationale live there).

## Global Constraints

Copied from the spec. Every task implicitly includes these.

- Versions stay: `next@16.1.6`, `react@19.2.3`, `react-dom@19.2.3`, Tailwind 4, TypeScript 5. No new runtime dependencies.
- One route only: `/`. Old URLs `/about`, `/contact`, `/blog/*`, `/projects/*` redirect with 308.
- Palette (brand colours from the live site). Light: bg `#fbf9e4`, ink `#122c4f`, accent `#5b88b2`, accent-text `#2f5f8a`. Dark: bg `#000000`, ink `#fbf9e4`, accent `#5b88b2`, accent-text `#7ba5cc`. All text pairs ≥ 4.5:1, accent vs bg ≥ 3:1.
- Fonts: Instrument Serif (headings), Inter (body, actually applied), Monaspace Neon **for dates only**. Monaspace Krypton is deleted.
- Layout: one column, max width 960 px (`60rem`), 24 px gutters; two columns (160 px rail + content) from 768 px (`md`).
- Copy voice: casual lowercase. **No** all-caps labels, numbering, `·` separators, `→` arrows, emoji, cards, shadows, gradients (except the name-hover accent band), blur, or per-section scroll reveals.
- Motion: one CSS-only intro sequence; everything below the intro is static; `prefers-reduced-motion: reduce` disables the intro sequence and the name effect.
- Not on the site: phone number, location, CGPA, skills list, coursework, user reviews, stats strip, availability line, blog, contact form.
- LinkedIn (primary action): `https://www.linkedin.com/in/midhunanv`. Email: `midhunmidhunan@gmail.com`. Canonical origin: `NEXT_PUBLIC_SITE_URL`, default `https://midhunan.vercel.app`.
- Do **not** edit `README.md` (it is the GitHub profile README: remote is `midhunann/midhunann`).
- Do **not** commit or push unless the user has said so. Each task ends with a "Checkpoint" step; run its `git commit` only if commits were approved, otherwise skip that one command and continue.
- The agent skills in `.agents/` and `.claude/skills/` are gitignored; never stage them.
- Shell cwd is `/Users/midhunan/git-repos/midhunan-portfolio`. Always use absolute paths or `cd` there first.

## Review Focus

Failure modes the spec implies but a happy-path build would not exercise, most likely first. Each has a test in the task named.

1. **`localStorage` throws or holds junk** (private window, blocked storage, a stale value): the theme must still resolve from the system setting, never crash the inline script. → Task 4 (`tests/theme-script.test.mjs`).
2. **Clipboard denied or missing** (insecure context, permission refused, old browser): "copy email" must fall back, and must never say "copied" when it was not. → Task 4 (`tests/lib.test.mjs`), Task 6 (`CopyEmail` shows the address on failure).
3. **A referenced image does not exist** (RouteX image is not delivered yet; Linux deploys are case-sensitive, macOS is not): no broken `<img>`, no 404 in the browser. → Task 3 (case-exact asset check), Task 10 (every optimized image URL in the built HTML resolves to a real file).
4. **Old bookmarks and links** (`/about`, `/blog/some-old-post`, `/projects/synapse-docs`): redirect, never 404. → Task 9 (`tests/config.test.mjs`).
5. **Cursor preview near a viewport edge or on touch**: the box must stay on screen, and must never mount on touch devices or hide content that only the preview carries. → Task 4 (`placePreview` tests), Task 6 (pointer-fine guard), Task 11 (browser check).

---

## Design plan (frontend-design pass)

The `frontend-design` skill asks for a plan reviewed against the brief before code. This is that plan and its review; implement it, do not redesign it.

**Tokens:** see Global Constraints and Task 5 for values. Surface tint (portrait disc, image placeholder): light `#f1eed2`, dark `#0b1626`. Muted text: light `#4a5d78`, dark `#b3b6ae`. Hairlines: light `#d9d6b8`, dark `#26303c`.

**Type:** Instrument Serif 400 for the name, section titles, project titles and the contact line. Inter 400/500 for everything else at 17 px / 1.65. Monaspace Neon 12 px for dates only. Left-aligned everywhere.

**Desktop wireframe (≥ 768 px):**

```
┌──────────────────────────────────────────────────────────────────────────┐
│ midhunan                  experience  projects  recognition  contact   ◐ │  sticky, 1px rule
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  midhunan                                        ╭────────────╮          │
│  (serif ~136px, accent band follows the cursor)  │  portrait  │ 240px    │
│  vijendra prabhaharan (serif 36px, muted)        │   disc     │          │
│                                                  ╰────────────╯          │
│  i'm a final-year computer science student. i like the part of a         │
│  problem where the solution isn't obvious and i have to figure out ...   │
│  so far that has become a vs code extension with 2,300+ installs, ...    │
│                                                                          │
│  [ connect on linkedin ]   copy email   resume   github   instagram      │
├──────────────────────────────────────────────────────────────────────────┤
│ experience │ student insider, adobe                    sep 2026 – present│
│ (serif 32) │ part-time, hybrid, noida                                    │
│            │ selected as 1 of 100 students from nearly 19,000 ...        │
│            │                                                             │
│            │ software engineer intern, hindustan petroleum ...           │
├──────────────────────────────────────────────────────────────────────────┤
│ projects   │ Synapse-Docs                              ┌───────────────┐ │
│            │ team of 3, led by me; runner-up ...       │   thumbnail   │ │
│            │ fastapi, react, google gemini, ...        │   16:10       │ │
│            │ story (2-3 sentences)                     └───────────────┘ │
│            │ github   live demo                                          │
├──────────────────────────────────────────────────────────────────────────┤
│ recognition│ awards                                                      │
│            │ ───────────────────────────────────────────────────────     │
│            │ adobe india hackathon, runner-up                       2025 │
│            │ grand finale, 262,000 registrations. synapse-docs           │
│            │ ───────────────────────────────────────────────────────     │
│            │ leadership ...   education ...                              │
├──────────────────────────────────────────────────────────────────────────┤
│ contact    │ the best way to reach me is linkedin.   (serif 48px)        │
│            │ [ connect on linkedin ]  midhunmidhunan@gmail.com  copy     │
└──────────────────────────────────────────────────────────────────────────┘
```

**Mobile wireframe (360 px):** one column. Nav is two rows (name + theme toggle on row one, four text links on row two). Portrait disc (160 px) sits above the name. Section title stacks above its content. Project thumbnail sits below its story. No horizontal scroll.

**Review against the brief.** *Pinned by the brief (kept as-is):* the cream/navy/blue palette, editorial minimal, serif display, hairline rules. *Defaults it would be easy to slide into, and what the plan does instead:* tracked all-caps eyebrows → none, section titles are plain serif; numbered sections → none; mono data labels everywhere → mono for dates only; `A · B · C` meta → plain lines; fade-up on every section → one intro sequence; card grid → none, hairline-separated lists; centered headings → left-aligned throughout; terracotta accent → the existing blue. *One memorable thing:* the oversized serif name with the cursor-following accent band beside the navy-shirt portrait disc. Everything else is deliberately quiet. *Open to revision at critique time (Task 11):* Instrument Serif vs Newsreader if the serif looks thin at 24 px.

---

## File Structure

```
package.json                 scripts + dependencies trimmed
eslint.config.mjs            ignore tests/ and docs/
next.config.ts               legacy-URL redirects
tests/
  data.test.mjs              content/asset/house-style checks on src/data
  lib.test.mjs               copyText, placePreview, normalizeSiteUrl
  theme-script.test.mjs      inline theme script in a vm sandbox
  tokens.test.mjs            WCAG contrast + reduced-motion rules in globals.css
  config.test.mjs            redirect table
  build-output.test.mjs      checks the built HTML (skipped if no build)
src/types/index.ts           shared interfaces (types only)
src/data/
  profile.ts experience.ts projects.ts recognition.ts index.ts
src/lib/
  site.ts theme-script.ts copy.ts preview-position.ts   (no imports; testable in Node)
src/app/
  layout.tsx page.tsx globals.css opengraph-image.tsx sitemap.ts robots.ts not-found.tsx
  fonts/MonaspaceNeonVar.woff2
src/components/
  Icons.tsx ThemeToggle.tsx CopyEmail.tsx NameHover.tsx CursorPreview.tsx
  Section.tsx Entry.tsx Nav.tsx Intro.tsx Experience.tsx Projects.tsx
  Recognition.tsx Contact.tsx Footer.tsx
public/assets/...            see Task 3 and Task 9
```

Deleted in Task 2: everything under `src/app/{about,blog,contact,projects}`, `src/components`, `src/contexts`, `src/hooks`, `src/data`, `src/types`, `src/lib/utils.ts`, old `layout.tsx`/`page.tsx`/`not-found.tsx`/`sitemap.ts`/`robots.ts`.

---

### Task 1: Branch, install, test harness

**Files:**
- Modify: `package.json` (scripts)
- Modify: `eslint.config.mjs` (ignores)

**Interfaces:**
- Produces: `npm test` (node:test over `tests/**/*.test.mjs`), `npm run typecheck`.

- [ ] **Step 1: Create the work branch (uncommitted changes carry over)**

```bash
cd /Users/midhunan/git-repos/midhunan-portfolio
git switch -c redesign/editorial
git status --short
```
Expected: `Switched to a new branch 'redesign/editorial'`; status lists `M .gitignore`, `M public/assets/images/profile/profile-photo.png`, `?? 1709.pdf`, `?? docs/`.

- [ ] **Step 2: Clean-install dependencies (node_modules is stale: it still has Next 15)**

```bash
npm ci
node -p "require('next/package.json').version"
```
Expected: prints `16.1.6`.

- [ ] **Step 3: Add scripts to `package.json`**

Replace the `"scripts"` block with:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "typecheck": "tsc --noEmit",
    "test": "node --experimental-strip-types --disable-warning=ExperimentalWarning --test \"tests/**/*.test.mjs\""
  },
```

- [ ] **Step 4: Keep tests and docs out of ESLint**

In `eslint.config.mjs`, extend the `globalIgnores` array:

```js
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Project-specific:
    "tests/**",
    "docs/**",
  ]),
```

- [ ] **Step 5: Checkpoint**

```bash
git add package.json eslint.config.mjs
git commit -m "chore: add test and typecheck scripts"   # only if commits are approved
```

---

### Task 2: Teardown to a green stub

Remove the old site and its dependencies, leaving a minimal page that builds, so every later task can run `typecheck`, `lint` and `build`.

**Files:**
- Delete: see commands
- Modify: `src/app/layout.tsx`, `src/app/page.tsx` (temporary stubs; replaced in Task 8)
- Modify: `package.json`, `package-lock.json` (uninstall deps)

**Interfaces:**
- Produces: a building app with `src/app/{layout,page}.tsx`, `src/app/globals.css` (old, replaced in Task 5), `src/app/favicon.ico`.

- [ ] **Step 1: Delete the old code**

```bash
cd /Users/midhunan/git-repos/midhunan-portfolio
git rm -r -q src/app/about src/app/blog src/app/contact src/app/projects \
  src/components src/contexts src/hooks src/data src/types src/lib/utils.ts \
  src/app/not-found.tsx src/app/sitemap.ts src/app/robots.ts
git status --short | head -5
```
Expected: lines starting with `D ` for the removed files; `src/app/` still has `favicon.ico`, `globals.css`, `layout.tsx`, `page.tsx`.

- [ ] **Step 2: Uninstall the dependencies the new design does not use**

```bash
npm uninstall framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge
node -p "Object.keys(require('./package.json').dependencies)"
```
Expected: `[ 'next', 'react', 'react-dom' ]`.

- [ ] **Step 3: Write the temporary stubs**

`src/app/layout.tsx`:

```tsx
import './globals.css';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`src/app/page.tsx`:

```tsx
export default function Page() {
  return <main>rebuilding</main>;
}
```

- [ ] **Step 4: Verify it is green**

```bash
npm run typecheck && npm run lint && npm run build
```
Expected: all three exit 0; build output lists `○ /` (static).

- [ ] **Step 5: Checkpoint**

```bash
git add -A src package.json package-lock.json
git commit -m "chore: remove old site and unused dependencies"   # only if commits are approved
```

---

### Task 3: Types and data layer (content lives here)

**Files:**
- Create: `tests/data.test.mjs`
- Create: `src/types/index.ts`
- Create: `src/data/profile.ts`, `src/data/experience.ts`, `src/data/projects.ts`, `src/data/recognition.ts`, `src/data/index.ts`
- Move: `public/assets/images/profile/speaking.png` → `speaking.jpg`; `1709.pdf` → `public/assets/resume/midhunan-resume.pdf`

**Interfaces:**
- Produces (types, from `@/types`):
  - `Profile`, `Role`, `Project`, `ProjectImage`, `ProjectLink`, `Award`, `Preview`
- Produces (data, from `@/data`):
  - `profile: Profile`; `experience: Role[]`; `projects: Project[]`; `awards: Award[]`; `leadership: Role[]`; `education: Role[]`
- Data files must use **`import type`** only and no sibling runtime imports, so Node can load them directly in tests.

- [ ] **Step 1: Write the failing test**

`tests/data.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join } from 'node:path';
import { profile } from '../src/data/profile.ts';
import { experience } from '../src/data/experience.ts';
import { projects } from '../src/data/projects.ts';
import { awards, leadership, education } from '../src/data/recognition.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const everything = { profile, experience, projects, awards, leadership, education };

function collect(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collect(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => collect(v, out));
  return out;
}
const strings = collect(everything);
const text = strings.join('\n');

// Case-exact: macOS is case-insensitive, Linux (Vercel) is not.
function existsExact(publicPath) {
  const full = join(root, 'public', publicPath);
  try {
    return readdirSync(dirname(full)).includes(basename(full));
  } catch {
    return false;
  }
}

test('every local asset referenced by the data exists, with exact case', () => {
  const local = strings.filter((s) => s.startsWith('/assets/'));
  assert.ok(local.length >= 9, `expected at least 9 local assets, got ${local.length}`);
  for (const path of local) assert.ok(existsExact(path), `missing asset: ${path}`);
});

test('every external link is a well-formed https URL', () => {
  const urls = strings.filter((s) => /^https?:/.test(s));
  assert.ok(urls.length >= 15, `expected at least 15 links, got ${urls.length}`);
  for (const url of urls) assert.equal(new URL(url).protocol, 'https:', url);
});

test('linkedin is the confirmed profile url', () => {
  assert.equal(profile.links.linkedin, 'https://www.linkedin.com/in/midhunanv');
  assert.equal(profile.email, 'midhunmidhunan@gmail.com');
});

test('details he chose to keep off the site are absent', () => {
  assert.ok(!text.replace(/\D/g, '').includes('7530043022'), 'phone number found');
  const lower = text.toLowerCase();
  for (const banned of ['7.95', 'cgpa', 'coming soon', 'open to internships', 'available for']) {
    assert.ok(!lower.includes(banned), `found: ${banned}`);
  }
});

test('house style: no middle dots, arrows, emoji or all-caps words in copy', () => {
  const prose = strings.filter((s) => !s.startsWith('http') && !s.startsWith('/') && !s.includes('@'));
  for (const s of prose) {
    assert.ok(!s.includes('·'), `middle dot in: ${s}`);
    assert.ok(!s.includes('→'), `arrow in: ${s}`);
    assert.ok(!/\p{Extended_Pictographic}/u.test(s), `emoji in: ${s}`);
    assert.ok(!/\b[A-Z]{4,}\b/.test(s), `all-caps word in: ${s}`);
  }
});

test('the facts the copy depends on are all present', () => {
  const facts = [
    '2,300+', '1,600+', '262,000', '131,868', '60 man-hours', '1 of 100', '19,000',
    '98/100', '45%', '50+', '100+', 'under 1.2s', '720-hour', '75%',
  ];
  for (const fact of facts) assert.ok(text.includes(fact), `missing fact: ${fact}`);
});

test('structure: four projects, three roles, five awards, two leadership, two education', () => {
  assert.deepEqual(projects.map((p) => p.id), ['synapse-docs', 'routex', 'haskell-run', 'attendease']);
  assert.deepEqual(experience.map((e) => e.id), ['adobe', 'hpcl', 'grabb']);
  assert.equal(awards.length, 5);
  assert.equal(leadership.length, 2);
  assert.equal(education.length, 2);
  for (const p of projects) {
    assert.equal(p.lines.length, 2, `${p.id} needs exactly two descriptor lines`);
    assert.ok(p.story.length > 80 && p.story.length < 480, `${p.id} story length`);
    assert.ok(p.links.length >= 1, `${p.id} needs a link`);
    if (p.image) {
      assert.ok(p.image.alt.length > 10 && p.image.width > 0 && p.image.height > 0, `${p.id} image fields`);
    }
  }
});

test('every award links to its proof', () => {
  for (const a of awards) assert.match(a.href, /^https:\/\//, a.id);
});

test('the downloadable resume is the new pdf', () => {
  assert.ok(existsExact(profile.resume), 'resume missing');
  const size = statSync(join(root, 'public', profile.resume)).size;
  assert.ok(size > 100_000 && size < 400_000, `unexpected resume size ${size}`);
});
```

- [ ] **Step 2: Run it to see it fail**

```bash
npm test
```
Expected: FAIL, `ERR_MODULE_NOT_FOUND` for `../src/data/profile.ts`.

- [ ] **Step 3: Fix the assets the data points at**

```bash
cd /Users/midhunan/git-repos/midhunan-portfolio
git mv public/assets/images/profile/speaking.png public/assets/images/profile/speaking.jpg
mv 1709.pdf public/assets/resume/midhunan-resume.pdf
file public/assets/images/profile/speaking.jpg public/assets/resume/midhunan-resume.pdf
```
Expected: `speaking.jpg: JPEG image data...`; `midhunan-resume.pdf: PDF document...`. (The old file was a JPEG with a `.png` name.)

- [ ] **Step 4: Write `src/types/index.ts`**

```ts
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
  links: { linkedin: string; github: string; instagram: string };
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
```

- [ ] **Step 5: Write `src/data/profile.ts`**

```ts
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
```

- [ ] **Step 6: Write `src/data/experience.ts`**

```ts
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
```

- [ ] **Step 7: Write `src/data/projects.ts`**

```ts
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
    // image: add { src: '/assets/images/projects/routex/thumbnail.png', alt, width, height }
    // once the file exists (see Task 9, Step 5).
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
```

- [ ] **Step 8: Write `src/data/recognition.ts`**

```ts
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
```

- [ ] **Step 9: Write `src/data/index.ts`**

```ts
export { profile } from './profile';
export { experience } from './experience';
export { projects } from './projects';
export { awards, leadership, education } from './recognition';
```

- [ ] **Step 10: Run the tests**

```bash
npm test && npm run typecheck && npm run lint
```
Expected: `# pass 9`, `# fail 0`; typecheck and lint exit 0.

- [ ] **Step 11: Checkpoint**

```bash
git add tests src/types src/data public/assets
git commit -m "feat: add typed content data for the new single-page site"   # only if commits are approved
```

---

### Task 4: Pure logic (`src/lib`) with tests

**Files:**
- Create: `tests/lib.test.mjs`, `tests/theme-script.test.mjs`
- Create: `src/lib/site.ts`, `src/lib/copy.ts`, `src/lib/preview-position.ts`, `src/lib/theme-script.ts`

**Interfaces:**
- Produces:
  - `normalizeSiteUrl(value: string | undefined): string`, `siteUrl: string` (from `@/lib/site`)
  - `copyText(text: string, deps: CopyDeps): Promise<boolean>` with `CopyDeps { clipboard?: { writeText(t: string): Promise<void> } | null; fallback?: (t: string) => boolean }` (from `@/lib/copy`)
  - `placePreview(cursor: Point, box: Size, viewport: Size, offset?: number, margin?: number): Point` (from `@/lib/preview-position`)
  - `themeScript: string` (from `@/lib/theme-script`)
- These files must not import anything (Node loads them directly).

- [ ] **Step 1: Write the failing tests**

`tests/lib.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { copyText } from '../src/lib/copy.ts';
import { placePreview } from '../src/lib/preview-position.ts';
import { normalizeSiteUrl } from '../src/lib/site.ts';

const okClipboard = () => {
  const calls = [];
  return { calls, writeText: async (t) => void calls.push(t) };
};
const denied = { writeText: async () => { throw new Error('NotAllowedError'); } };

test('copyText: uses the clipboard when it works', async () => {
  const clipboard = okClipboard();
  assert.equal(await copyText('a@b.c', { clipboard }), true);
  assert.deepEqual(clipboard.calls, ['a@b.c']);
});

test('copyText: falls back when the clipboard is denied', async () => {
  let used = null;
  const ok = await copyText('a@b.c', { clipboard: denied, fallback: (t) => ((used = t), true) });
  assert.equal(ok, true);
  assert.equal(used, 'a@b.c');
});

test('copyText: reports failure (never a false "copied") when nothing works', async () => {
  assert.equal(await copyText('x', { clipboard: denied }), false);
  assert.equal(await copyText('x', { clipboard: null }), false);
  assert.equal(await copyText('x', { clipboard: denied, fallback: () => false }), false);
  assert.equal(await copyText('x', { clipboard: null, fallback: () => { throw new Error('boom'); } }), false);
});

test('copyText: uses the fallback when there is no clipboard API', async () => {
  assert.equal(await copyText('x', { clipboard: undefined, fallback: () => true }), true);
});

const viewport = { w: 1280, h: 800 };
const box = { w: 280, h: 300 };

test('placePreview: sits below and right of the cursor by default', () => {
  assert.deepEqual(placePreview({ x: 100, y: 100 }, box, viewport), { x: 120, y: 120 });
});

test('placePreview: flips to the left of the cursor at the right edge', () => {
  const p = placePreview({ x: 1200, y: 100 }, box, viewport);
  assert.equal(p.x, 1200 - 20 - 280);
  assert.ok(p.x + box.w <= viewport.w - 8);
});

test('placePreview: clamps at the bottom edge', () => {
  const p = placePreview({ x: 100, y: 780 }, box, viewport);
  assert.equal(p.y, 800 - 8 - 300);
});

test('placePreview: never leaves the top-left margin, even in a tiny viewport', () => {
  const p = placePreview({ x: 5, y: 5 }, { w: 400, h: 500 }, { w: 300, h: 300 });
  assert.ok(p.x >= 8 && p.y >= 8);
});

test('normalizeSiteUrl: defaults, trims trailing slashes, ignores empty values', () => {
  assert.equal(normalizeSiteUrl(undefined), 'https://midhunan.vercel.app');
  assert.equal(normalizeSiteUrl(''), 'https://midhunan.vercel.app');
  assert.equal(normalizeSiteUrl('https://midhunan.dev/'), 'https://midhunan.dev');
  assert.equal(normalizeSiteUrl('https://midhunan.dev///'), 'https://midhunan.dev');
});
```

`tests/theme-script.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { themeScript } from '../src/lib/theme-script.ts';

function run({ stored, systemDark, storageThrows = false, noMatchMedia = false }) {
  const attrs = {};
  const window = {
    localStorage: {
      getItem() {
        if (storageThrows) throw new Error('SecurityError');
        return stored ?? null;
      },
    },
  };
  if (!noMatchMedia) window.matchMedia = () => ({ matches: Boolean(systemDark) });
  const document = { documentElement: { setAttribute: (k, v) => (attrs[k] = v) } };
  vm.runInNewContext(themeScript, { window, document });
  return attrs['data-theme'];
}

test('a stored choice wins over the system setting', () => {
  assert.equal(run({ stored: 'light', systemDark: true }), 'light');
  assert.equal(run({ stored: 'dark', systemDark: false }), 'dark');
});

test('with nothing stored it follows the system setting', () => {
  assert.equal(run({ systemDark: true }), 'dark');
  assert.equal(run({ systemDark: false }), 'light');
});

test('storage that throws (private window, blocked cookies) falls back to the system setting', () => {
  assert.equal(run({ storageThrows: true, systemDark: true }), 'dark');
  assert.equal(run({ storageThrows: true, systemDark: false }), 'light');
});

test('a junk stored value is ignored', () => {
  assert.equal(run({ stored: 'sepia', systemDark: true }), 'dark');
});

test('no matchMedia at all still yields a valid theme', () => {
  assert.equal(run({ noMatchMedia: true }), 'light');
});
```

- [ ] **Step 2: Run to see them fail**

```bash
npm test
```
Expected: FAIL, `ERR_MODULE_NOT_FOUND` for `../src/lib/copy.ts`.

- [ ] **Step 3: Write `src/lib/site.ts`**

```ts
const DEFAULT_SITE_URL = 'https://midhunan.vercel.app';

export function normalizeSiteUrl(value: string | undefined): string {
  const trimmed = (value ?? '').trim();
  return (trimmed || DEFAULT_SITE_URL).replace(/\/+$/, '');
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
```

- [ ] **Step 4: Write `src/lib/copy.ts`**

```ts
export interface CopyDeps {
  clipboard?: { writeText(text: string): Promise<void> } | null;
  fallback?: (text: string) => boolean;
}

/** Resolves true only if the text really was copied. Never throws. */
export async function copyText(text: string, deps: CopyDeps): Promise<boolean> {
  try {
    if (deps.clipboard) {
      await deps.clipboard.writeText(text);
      return true;
    }
  } catch {
    // permission denied or insecure context: try the fallback
  }
  try {
    return deps.fallback ? deps.fallback(text) : false;
  } catch {
    return false;
  }
}
```

- [ ] **Step 5: Write `src/lib/preview-position.ts`**

```ts
export interface Point {
  x: number;
  y: number;
}
export interface Size {
  w: number;
  h: number;
}

/** Top-left position for a floating preview that must stay fully on screen. */
export function placePreview(
  cursor: Point,
  box: Size,
  viewport: Size,
  offset = 20,
  margin = 8,
): Point {
  let x = cursor.x + offset;
  let y = cursor.y + offset;
  if (x + box.w > viewport.w - margin) x = cursor.x - offset - box.w;
  if (y + box.h > viewport.h - margin) y = viewport.h - margin - box.h;
  return { x: Math.max(margin, x), y: Math.max(margin, y) };
}
```

- [ ] **Step 6: Write `src/lib/theme-script.ts`**

```ts
/**
 * Runs inline in <head> before first paint so the page never flashes the wrong
 * theme. Must stay dependency-free ES5 and must never throw.
 */
export const themeScript = `(function () {
  var theme = null;
  try { theme = window.localStorage.getItem('theme'); } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') {
    var dark = false;
    try { dark = window.matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) {}
    theme = dark ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);
})();`;
```

- [ ] **Step 7: Run the tests**

```bash
npm test && npm run typecheck && npm run lint
```
Expected: all pass (`# fail 0`).

- [ ] **Step 8: Checkpoint**

```bash
git add tests src/lib
git commit -m "feat: add tested theme, clipboard, preview and site-url helpers"   # only if commits are approved
```

---

### Task 5: Design tokens, fonts and global CSS

**Files:**
- Create: `tests/tokens.test.mjs`
- Move: `public/fonts/Monaspace Neon Var.woff2` → `src/app/fonts/MonaspaceNeonVar.woff2`
- Delete: `public/fonts/Monaspace Krypton Var.woff2`
- Replace: `src/app/globals.css`

**Interfaces:**
- Produces CSS custom properties `--bg --surface --ink --muted --rule --accent --accent-text`, Tailwind colours `bg-bg surface ink muted rule accent link` (usable as `bg-bg`, `text-ink`, `text-muted`, `border-rule`, `bg-surface`, `text-link`, `outline-accent`), fonts `font-sans font-serif font-mono`, and component classes `.link`, `.btn-primary`, `.tap`, `.skip-link`, `.intro-in`, `.name-hover`, `.theme-sun`, `.theme-moon`.
- Consumes font CSS variables `--font-inter`, `--font-serif-display`, `--font-mono-label` (set by `layout.tsx` in Task 8).

- [ ] **Step 1: Write the failing test**

`tests/tokens.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const css = readFileSync(fileURLToPath(new URL('../src/app/globals.css', import.meta.url)), 'utf8');

function region(name) {
  const m = css.match(new RegExp(`/\\* tokens:${name} \\*/([\\s\\S]*?)(?=/\\* (?:tokens:|end-tokens))`));
  assert.ok(m, `missing /* tokens:${name} */ region in globals.css`);
  return m[1];
}
function vars(name) {
  const out = {};
  for (const m of region(name).matchAll(/--([a-z-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) out[m[1]] = m[2].toLowerCase();
  return out;
}
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const light = vars('light');
const dark = vars('dark');
const names = ['bg', 'surface', 'ink', 'muted', 'rule', 'accent', 'accent-text'];

test('light and dark define exactly the same tokens', () => {
  assert.deepEqual(Object.keys(light).sort(), [...names].sort());
  assert.deepEqual(Object.keys(dark).sort(), [...names].sort());
});

test('the brand colours from the live site are used', () => {
  assert.equal(light.bg, '#fbf9e4');
  assert.equal(light.ink, '#122c4f');
  assert.equal(light.accent, '#5b88b2');
  assert.equal(dark.bg, '#000000');
  assert.equal(dark.ink, '#fbf9e4');
  assert.equal(dark.accent, '#5b88b2');
});

test('the system-dark media block matches the explicit dark theme (JS-off visitors)', () => {
  assert.deepEqual(vars('dark-media'), dark);
});

for (const [theme, t] of [['light', light], ['dark', dark]]) {
  test(`${theme}: ink, muted and link text meet WCAG AA (4.5:1) on bg and surface`, () => {
    for (const fg of ['ink', 'muted', 'accent-text']) {
      for (const bg of ['bg', 'surface']) {
        const r = ratio(t[fg], t[bg]);
        assert.ok(r >= 4.5, `${theme}: ${fg} on ${bg} is ${r.toFixed(2)}:1`);
      }
    }
  });
  test(`${theme}: the accent (focus ring, lines) meets 3:1 on the page background`, () => {
    assert.ok(ratio(t.accent, t.bg) >= 3, `${theme}: accent on bg is ${ratio(t.accent, t.bg).toFixed(2)}:1`);
  });
}

test('reduced motion switches off the intro sequence and the name effect', () => {
  const m = css.match(/@media \(prefers-reduced-motion: reduce\) \{([\s\S]*?)\n\}/);
  assert.ok(m, 'missing prefers-reduced-motion block');
  assert.match(m[1], /\.intro-in\s*\{[^}]*animation:\s*none/);
  assert.match(m[1], /\.name-hover\s*\{[^}]*background-image:\s*none/);
});

test('nothing is hidden before JS runs: only the intro keyframes start at opacity 0', () => {
  const withoutKeyframes = css.replace(/@keyframes[\s\S]*?\n\}/g, '');
  assert.ok(!/opacity:\s*0\s*;/.test(withoutKeyframes), 'opacity: 0 found outside @keyframes');
});
```

- [ ] **Step 2: Run to see it fail**

```bash
npm test
```
Expected: FAIL in `tokens.test.mjs`: `missing /* tokens:light */ region in globals.css` (the old CSS has no markers).

- [ ] **Step 3: Move and delete fonts**

```bash
cd /Users/midhunan/git-repos/midhunan-portfolio
mkdir -p src/app/fonts
git mv "public/fonts/Monaspace Neon Var.woff2" src/app/fonts/MonaspaceNeonVar.woff2
git rm -q "public/fonts/Monaspace Krypton Var.woff2"
ls public/fonts 2>/dev/null || echo "public/fonts is gone"
```
Expected: `public/fonts is gone`.

- [ ] **Step 4: Replace `src/app/globals.css`**

```css
@import 'tailwindcss';

@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-ink: var(--ink);
  --color-muted: var(--muted);
  --color-rule: var(--rule);
  --color-accent: var(--accent);
  --color-link: var(--accent-text);

  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-serif: var(--font-serif-display), Georgia, serif;
  --font-mono: var(--font-mono-label), ui-monospace, monospace;
}

/* tokens:light */
:root {
  color-scheme: light;
  --bg: #fbf9e4;
  --surface: #f1eed2;
  --ink: #122c4f;
  --muted: #4a5d78;
  --rule: #d9d6b8;
  --accent: #5b88b2;
  --accent-text: #2f5f8a;
}

/* tokens:dark-media */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    color-scheme: dark;
    --bg: #000000;
    --surface: #0b1626;
    --ink: #fbf9e4;
    --muted: #b3b6ae;
    --rule: #26303c;
    --accent: #5b88b2;
    --accent-text: #7ba5cc;
  }
}

/* tokens:dark */
:root[data-theme='dark'] {
  color-scheme: dark;
  --bg: #000000;
  --surface: #0b1626;
  --ink: #fbf9e4;
  --muted: #b3b6ae;
  --rule: #26303c;
  --accent: #5b88b2;
  --accent-text: #7ba5cc;
}
/* end-tokens */

@property --mx {
  syntax: '<percentage>';
  inherits: false;
  initial-value: -100%;
}

@layer base {
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 7rem;
  }

  body {
    background: var(--bg);
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: 1.0625rem;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: var(--font-serif);
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: -0.01em;
  }

  ::selection {
    background: var(--ink);
    color: var(--bg);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
    border-radius: 2px;
  }
}

@layer components {
  .link {
    color: var(--accent-text);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.22em;
    transition: text-decoration-thickness 150ms ease;
  }
  .link:hover {
    text-decoration-thickness: 2px;
  }

  .tap {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    padding: 0 1.25rem;
    border-radius: 6px;
    background: var(--ink);
    color: var(--bg);
    font-weight: 500;
    transition: background-color 150ms ease;
  }
  .btn-primary:hover {
    background: var(--accent-text);
  }

  .skip-link {
    position: absolute;
    left: -9999px;
    top: 0;
  }
  .skip-link:focus {
    left: 1rem;
    top: 1rem;
    z-index: 60;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background: var(--ink);
    color: var(--bg);
  }

  .intro-in {
    animation: rise 600ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
    animation-delay: calc(var(--i, 0) * 70ms);
  }

  .name-hover {
    background-image: linear-gradient(
      90deg,
      var(--ink) 0%,
      var(--ink) calc(var(--mx) - 18%),
      var(--accent-text) var(--mx),
      var(--ink) calc(var(--mx) + 18%),
      var(--ink) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transition: --mx 200ms ease-out;
  }

  .theme-sun {
    display: none;
  }
  :root[data-theme='dark'] .theme-sun {
    display: inline;
  }
  :root[data-theme='dark'] .theme-moon {
    display: none;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (hover: none) {
  .name-hover {
    background-image: none;
    color: var(--ink);
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .intro-in {
    animation: none;
  }
  .name-hover {
    background-image: none;
    color: var(--ink);
  }
  * {
    transition-duration: 0.01ms !important;
  }
}
```

Note: the test regex for the reduced-motion block ends at the first `\n}` (a closing brace at column 0), so keep inner rules indented exactly as above.

- [ ] **Step 5: Run the tests**

```bash
npm test && npm run build
```
Expected: `# fail 0`; build succeeds (the stub page now uses the new CSS).

- [ ] **Step 6: Checkpoint**

```bash
git add tests src/app public
git commit -m "style: add light/dark design tokens, base styles and fonts"   # only if commits are approved
```

---

### Task 6: Interactive primitives and shared building blocks

**Files:**
- Create: `src/components/Icons.tsx`, `ThemeToggle.tsx`, `CopyEmail.tsx`, `NameHover.tsx`, `CursorPreview.tsx`, `Section.tsx`, `Entry.tsx`

**Interfaces:**
- Consumes: `copyText` (`@/lib/copy`), `placePreview` (`@/lib/preview-position`), `Role` (`@/types`), classes from Task 5.
- Produces:
  - `SunIcon`, `MoonIcon`, `CopyIcon`, `CheckIcon`: `({ className }: { className?: string }) => JSX.Element`
  - `ThemeToggle(): JSX.Element` (client)
  - `CopyEmail({ email }: { email: string })` (client)
  - `NameHover({ text, previewSrc, previewLabel }: { text: string; previewSrc: string; previewLabel: string })` (client)
  - `CursorPreview()` (client; renders `[data-preview-box]` only while previewing)
  - `Section({ id, title, children })` (server)
  - `Entry({ item, as })` where `item: Role`, `as?: 'h3' | 'h4'` (server; renders an `<li>`)

- [ ] **Step 1: `src/components/Icons.tsx`**

```tsx
interface IconProps {
  className?: string;
}

const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function SunIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function CopyIcon({ className }: IconProps) {
  return (
    <svg {...base} width={16} height={16} className={className}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base} width={16} height={16} className={className}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}
```

- [ ] **Step 2: `src/components/ThemeToggle.tsx`**

```tsx
'use client';

import { useEffect } from 'react';
import { MoonIcon, SunIcon } from './Icons';

function storedTheme(): string | null {
  try {
    return window.localStorage.getItem('theme');
  } catch {
    return null;
  }
}

export default function ThemeToggle() {
  // Follow the system setting live until the visitor makes an explicit choice.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      const stored = storedTheme();
      if (stored === 'light' || stored === 'dark') return;
      document.documentElement.setAttribute('data-theme', event.matches ? 'dark' : 'light');
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      window.localStorage.setItem('theme', next);
    } catch {
      // storage unavailable: the choice lasts for this visit only
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="switch between light and dark theme"
      className="tap -mr-2 justify-center px-2 text-muted hover:text-ink"
    >
      <MoonIcon className="theme-moon" />
      <SunIcon className="theme-sun" />
    </button>
  );
}
```

- [ ] **Step 3: `src/components/CopyEmail.tsx`**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { copyText } from '@/lib/copy';
import { CheckIcon, CopyIcon } from './Icons';

type Status = 'idle' | 'copied' | 'failed';

function selectionFallback(text: string): boolean {
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(field);
  return ok;
}

export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = async () => {
    const ok = await copyText(email, {
      clipboard: typeof navigator === 'undefined' ? null : (navigator.clipboard ?? null),
      fallback: selectionFallback,
    });
    setStatus(ok ? 'copied' : 'failed');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus('idle'), ok ? 2000 : 6000);
  };

  return (
    <>
      <button type="button" onClick={onClick} className="link tap gap-2">
        {status === 'copied' ? <CheckIcon /> : <CopyIcon />}
        {status === 'copied' ? 'copied' : status === 'failed' ? email : 'copy email'}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === 'copied' ? 'email address copied' : status === 'failed' ? `copy failed, the address is ${email}` : ''}
      </span>
    </>
  );
}
```

- [ ] **Step 4: `src/components/NameHover.tsx`**

```tsx
'use client';

import { useRef } from 'react';

interface NameHoverProps {
  text: string;
  previewSrc: string;
  previewLabel: string;
}

export default function NameHover({ text, previewSrc, previewLabel }: NameHoverProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== 'mouse') return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
  };

  const onLeave = () => ref.current?.style.removeProperty('--mx');

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-preview-src={previewSrc}
      data-preview-label={previewLabel}
      className="name-hover block text-[clamp(3.75rem,13vw,8.5rem)] leading-[0.95] tracking-tight"
    >
      {text}
    </span>
  );
}
```

- [ ] **Step 5: `src/components/CursorPreview.tsx`**

```tsx
'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { placePreview } from '@/lib/preview-position';

interface Preview {
  src: string;
  label: string;
}
interface Point {
  x: number;
  y: number;
}

function position(el: HTMLElement, cursor: Point) {
  const { x, y } = placePreview(
    cursor,
    { w: el.offsetWidth, h: el.offsetHeight },
    { w: window.innerWidth, h: window.innerHeight },
  );
  el.style.transform = `translate(${x}px, ${y}px)`;
}

/**
 * A floating image for any element with data-preview-src. A desktop bonus only:
 * every previewed item also carries its facts as text or a proof link.
 */
export default function CursorPreview() {
  const [preview, setPreview] = useState<Preview | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const cursor = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const find = (node: EventTarget | null) =>
      node instanceof Element ? node.closest<HTMLElement>('[data-preview-src]') : null;

    const show = (el: HTMLElement) => {
      const next = { src: el.dataset.previewSrc ?? '', label: el.dataset.previewLabel ?? '' };
      setPreview((current) =>
        current && current.src === next.src && current.label === next.label ? current : next,
      );
    };

    const onMove = (event: PointerEvent) => {
      cursor.current = { x: event.clientX, y: event.clientY };
      const el = find(event.target);
      if (!el) return setPreview(null);
      show(el);
      if (box.current) position(box.current, cursor.current);
    };
    const onFocusIn = (event: FocusEvent) => {
      const el = find(event.target);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      cursor.current = { x: rect.left + 32, y: rect.bottom - 16 };
      show(el);
    };
    const hide = () => setPreview(null);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreview(null);
    };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', hide);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', hide);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (preview && box.current) position(box.current, cursor.current);
  }, [preview]);

  if (!preview) return null;

  return (
    <div
      ref={box}
      data-preview-box
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50"
      style={{ width: 280 }}
    >
      <div className="rounded-md border border-rule bg-surface p-2">
        <Image
          key={preview.src}
          src={preview.src}
          alt=""
          width={560}
          height={560}
          sizes="280px"
          className="h-auto max-h-72 w-full object-contain"
          onLoad={() => box.current && position(box.current, cursor.current)}
        />
        {preview.label ? <p className="mt-2 text-center text-sm text-muted">{preview.label}</p> : null}
      </div>
    </div>
  );
}
```

- [ ] **Step 6: `src/components/Section.tsx`**

```tsx
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule">
      <div className="mx-auto max-w-[60rem] px-6 py-16 md:grid md:grid-cols-[10rem_1fr] md:gap-x-10 md:py-24">
        <h2 id={`${id}-title`} className="text-3xl md:text-[2rem]">
          {title}
        </h2>
        <div className="mt-8 md:mt-0">{children}</div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: `src/components/Entry.tsx`**

```tsx
import type { Role } from '@/types';

interface EntryProps {
  item: Role;
  as?: 'h3' | 'h4';
}

export default function Entry({ item, as: Heading = 'h3' }: EntryProps) {
  return (
    <li data-preview-src={item.preview?.src} data-preview-label={item.preview?.label}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <Heading className="text-2xl leading-snug">
          {item.role},{' '}
          {item.orgUrl ? (
            <a className="link" href={item.orgUrl} target="_blank" rel="noopener noreferrer">
              {item.org}
            </a>
          ) : (
            item.org
          )}
        </Heading>
        <p className="shrink-0 font-mono text-xs text-muted">{item.when}</p>
      </div>
      {item.meta ? <p className="mt-1 text-sm text-muted">{item.meta}</p> : null}
      {item.summary.map((paragraph) => (
        <p key={paragraph} className="mt-3 max-w-[38rem]">
          {paragraph}
        </p>
      ))}
    </li>
  );
}
```

- [ ] **Step 8: Verify**

```bash
npm run typecheck && npm run lint && npm test
```
Expected: all pass.

- [ ] **Step 9: Checkpoint**

```bash
git add src/components
git commit -m "feat: add theme toggle, copy-email, name hover, cursor preview and shared blocks"   # only if commits are approved
```

---

### Task 7: Page sections

**Files:**
- Create: `src/components/Nav.tsx`, `Intro.tsx`, `Experience.tsx`, `Projects.tsx`, `Recognition.tsx`, `Contact.tsx`, `Footer.tsx`

**Interfaces:**
- Consumes: everything from Tasks 3, 5, 6. Section ids used by Nav: `top` (Intro), `experience`, `projects`, `recognition`, `contact`.
- Produces: default-exported components with no props: `Nav`, `Intro`, `Experience`, `Projects`, `Recognition`, `Contact`, `Footer`.

- [ ] **Step 1: `src/components/Nav.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const links = ['experience', 'projects', 'recognition', 'contact'] as const;

export default function Nav() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const targets = ['top', ...links]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === 'top' ? '' : entry.target.id);
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg">
      <div className="mx-auto flex max-w-[60rem] flex-wrap items-center justify-between gap-x-6 px-6 py-1">
        <a href="#top" className="tap font-serif text-2xl">
          midhunan
        </a>
        <nav aria-label="sections" className="order-3 flex w-full gap-6 pb-1 text-sm sm:order-none sm:w-auto sm:gap-8 sm:pb-0">
          {links.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className="tap text-muted hover:text-ink aria-[current=true]:text-ink aria-[current=true]:underline aria-[current=true]:underline-offset-8"
            >
              {id}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
```

- [ ] **Step 2: `src/components/Intro.tsx`**

```tsx
import Image from 'next/image';
import { profile } from '@/data';
import CopyEmail from './CopyEmail';
import NameHover from './NameHover';

const step = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function Intro() {
  return (
    <section id="top" aria-label="introduction" className="mx-auto max-w-[60rem] px-6 pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="grid items-end gap-10 md:grid-cols-[1fr_15rem]">
        <div className="md:order-first">
          <h1 className="intro-in" style={step(1)}>
            <NameHover
              text={profile.name.first}
              previewSrc={profile.stage.src}
              previewLabel={profile.stage.label}
            />
            <span className="mt-3 block text-[clamp(1.5rem,3.5vw,2.25rem)] text-muted">{profile.name.rest}</span>
          </h1>
          <p className="intro-in mt-8 max-w-[36rem] text-lg" style={step(2)}>
            {profile.lead}
          </p>
          <p className="intro-in mt-4 max-w-[36rem]" style={step(3)}>
            {profile.proof}
          </p>
          <div className="intro-in mt-8 flex flex-wrap items-center gap-x-6 gap-y-1" style={step(4)}>
            <a className="btn-primary mr-2" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              connect on linkedin
            </a>
            <CopyEmail email={profile.email} />
            <a className="link tap" href={profile.resume} target="_blank" rel="noopener noreferrer">
              resume
            </a>
            <a className="link tap" href={profile.links.github} target="_blank" rel="noopener noreferrer">
              github
            </a>
            <a className="link tap" href={profile.links.instagram} target="_blank" rel="noopener noreferrer">
              instagram
            </a>
          </div>
        </div>
        <div className="intro-in order-first md:order-none" style={step(0)}>
          <div className="relative mx-auto size-40 overflow-hidden rounded-full bg-surface md:size-60">
            <Image
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              width={profile.portrait.width}
              height={profile.portrait.height}
              priority
              sizes="(min-width: 768px) 264px, 176px"
              className="absolute left-1/2 top-0 h-auto w-[110%] max-w-none -translate-x-1/2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: `src/components/Experience.tsx`**

```tsx
import { experience } from '@/data';
import Entry from './Entry';
import Section from './Section';

export default function Experience() {
  return (
    <Section id="experience" title="experience">
      <ul className="space-y-12">
        {experience.map((item) => (
          <Entry key={item.id} item={item} />
        ))}
      </ul>
    </Section>
  );
}
```

- [ ] **Step 4: `src/components/Projects.tsx`**

```tsx
import Image from 'next/image';
import { projects } from '@/data';
import Section from './Section';

export default function Projects() {
  return (
    <Section id="projects" title="projects">
      <ul className="space-y-16">
        {projects.map((project) => (
          <li key={project.id} className="md:grid md:grid-cols-[1fr_16rem] md:gap-x-10">
            <div>
              <h3 className="text-3xl">{project.title}</h3>
              {project.lines.map((line) => (
                <p key={line} className="mt-1 text-sm text-muted">
                  {line}
                </p>
              ))}
              <p className="mt-4 max-w-[36rem]">{project.story}</p>
              <ul className="mt-3 flex flex-wrap gap-x-5">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a className="link tap" href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 md:mt-2">
              {project.image ? (
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  sizes="(min-width: 768px) 256px, calc(100vw - 48px)"
                  className="aspect-[16/10] w-full rounded-sm border border-rule object-cover object-top"
                />
              ) : (
                <div className="flex aspect-[16/10] w-full items-center justify-center rounded-sm border border-rule bg-surface font-serif text-xl text-muted">
                  {project.title}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
```

- [ ] **Step 5: `src/components/Recognition.tsx`**

```tsx
import { awards, education, leadership } from '@/data';
import Entry from './Entry';
import Section from './Section';

export default function Recognition() {
  return (
    <Section id="recognition" title="recognition">
      <div className="space-y-16">
        <div>
          <h3 className="text-2xl">awards</h3>
          <ul className="mt-6 divide-y divide-rule border-y border-rule">
            {awards.map((award) => (
              <li key={award.id}>
                <a
                  href={award.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-preview-src={award.preview?.src}
                  data-preview-label={award.preview?.label}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span>
                    <span className="link">{award.title}</span>
                    <span className="block text-sm text-muted">{award.detail}</span>
                  </span>
                  <span className="shrink-0 font-mono text-xs text-muted">{award.year}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl">leadership</h3>
          <ul className="mt-6 space-y-10">
            {leadership.map((item) => (
              <Entry key={item.id} item={item} as="h4" />
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl">education</h3>
          <ul className="mt-6 space-y-8">
            {education.map((item) => (
              <Entry key={item.id} item={item} as="h4" />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 6: `src/components/Contact.tsx`**

```tsx
import { profile } from '@/data';
import CopyEmail from './CopyEmail';
import Section from './Section';

export default function Contact() {
  return (
    <Section id="contact" title="contact">
      <p className="max-w-[22ch] font-serif text-4xl leading-tight md:text-5xl">
        the best way to reach me is linkedin.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-1">
        <a className="btn-primary mr-2" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
          connect on linkedin
        </a>
        <a className="link tap" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <CopyEmail email={profile.email} />
      </div>
      <p className="mt-6 text-sm text-muted">
        also on{' '}
        <a className="link" href={profile.links.github} target="_blank" rel="noopener noreferrer">
          github
        </a>
        ,{' '}
        <a className="link" href={profile.links.instagram} target="_blank" rel="noopener noreferrer">
          instagram
        </a>
        , and the{' '}
        <a className="link" href={profile.resume} target="_blank" rel="noopener noreferrer">
          resume
        </a>
        .
      </p>
    </Section>
  );
}
```

- [ ] **Step 7: `src/components/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[60rem] px-6 py-8 text-sm text-muted">© {new Date().getFullYear()} midhunan</div>
    </footer>
  );
}
```

- [ ] **Step 8: Verify**

```bash
npm run typecheck && npm run lint
```
Expected: both exit 0.

- [ ] **Step 9: Checkpoint**

```bash
git add src/components
git commit -m "feat: add nav, intro, experience, projects, recognition, contact and footer"   # only if commits are approved
```

---

### Task 8: Layout and page assembly

**Files:**
- Replace: `src/app/layout.tsx`, `src/app/page.tsx`

**Interfaces:**
- Consumes: all components, `profile`, `siteUrl`, `themeScript`, font files from Task 5.
- Produces: the finished single page at `/`.

- [ ] **Step 1: Replace `src/app/layout.tsx`**

```tsx
import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import CursorPreview from '@/components/CursorPreview';
import Nav from '@/components/Nav';
import { profile } from '@/data';
import { siteUrl } from '@/lib/site';
import { themeScript } from '@/lib/theme-script';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });
const instrumentSerif = Instrument_Serif({
  variable: '--font-serif-display',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});
const monaspaceNeon = localFont({
  src: './fonts/MonaspaceNeonVar.woff2',
  variable: '--font-mono-label',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: profile.title,
  description: profile.description,
  authors: [{ name: profile.name.full }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: profile.name.full,
    title: profile.title,
    description: profile.description,
  },
  twitter: { card: 'summary_large_image', title: profile.title, description: profile.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf9e4' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} ${monaspaceNeon.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <CursorPreview />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Replace `src/app/page.tsx`**

```tsx
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Intro from '@/components/Intro';
import Projects from '@/components/Projects';
import Recognition from '@/components/Recognition';

export default function Page() {
  return (
    <>
      <Intro />
      <Experience />
      <Projects />
      <Recognition />
      <Contact />
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Build and test (needs network once, for Google Fonts)**

```bash
npm run typecheck && npm run lint && npm run build && npm test
```
Expected: all exit 0; build prints `○ /` and no warnings about missing images or fonts.

- [ ] **Step 4: Smoke check in a browser engine**

```bash
(npm run start -- -p 3100 > /tmp/portfolio-start.log 2>&1 &) ; sleep 4
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3100/
curl -s http://localhost:3100/ | grep -o 'connect on linkedin' | head -1
```
Expected: `200` then `connect on linkedin`. Leave the server running for Task 11.

- [ ] **Step 5: Checkpoint**

```bash
git add src/app
git commit -m "feat: assemble the single-page layout with theme script and metadata"   # only if commits are approved
```

---

### Task 9: Redirects, SEO files, 404 and asset cleanup

**Files:**
- Create: `tests/config.test.mjs`
- Modify: `next.config.ts`
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`, `src/app/not-found.tsx`
- Delete: unused public assets

**Interfaces:**
- Consumes: `siteUrl`, `profile`.
- Produces: 308 redirects for legacy routes; `/sitemap.xml`, `/robots.txt`, `/opengraph-image`.

- [ ] **Step 1: Write the failing test**

`tests/config.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import nextConfig from '../next.config.ts';

const rules = await nextConfig.redirects();

// Minimal matcher for the two source shapes we use: "/x" and "/x/:path*".
function find(pathname) {
  return rules.find((r) => {
    if (r.source.endsWith('/:path*')) {
      const base = r.source.slice(0, -'/:path*'.length);
      return pathname === base || pathname.startsWith(`${base}/`);
    }
    return r.source === pathname;
  });
}

test('every legacy route redirects permanently instead of 404ing', () => {
  const expectations = {
    '/about': '/',
    '/contact': '/#contact',
    '/blog': '/',
    '/blog/building-synapse-docs-adobe-hackathon': '/',
    '/projects': '/#projects',
    '/projects/synapse-docs': '/#projects',
    '/projects/attendease': '/#projects',
  };
  for (const [from, to] of Object.entries(expectations)) {
    const rule = find(from);
    assert.ok(rule, `no redirect for ${from}`);
    assert.equal(rule.destination, to, from);
    assert.equal(rule.permanent, true, from);
  }
});

test('the home page and unrelated paths are not redirected', () => {
  assert.equal(find('/'), undefined);
  assert.equal(find('/opengraph-image'), undefined);
  assert.equal(find('/robots.txt'), undefined);
});
```

- [ ] **Step 2: Run to see it fail**

```bash
npm test
```
Expected: FAIL: `nextConfig.redirects is not a function`.

- [ ] **Step 3: Replace `next.config.ts`**

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/about', destination: '/', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      { source: '/blog/:path*', destination: '/', permanent: true },
      { source: '/projects/:path*', destination: '/#projects', permanent: true },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 4: Write the SEO and error files**

`src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, lastModified: new Date() }];
}
```

`src/app/robots.ts`:

```ts
import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

`src/app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from 'next/og';
import { profile } from '@/data';
import { siteUrl } from '@/lib/site';

export const alt = 'Midhunan Vijendra Prabhaharan';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          background: '#fbf9e4',
          color: '#122c4f',
          padding: 80,
          borderLeft: '16px solid #5b88b2',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#4a5d78' }}>{new URL(siteUrl).host}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 136, lineHeight: 1 }}>{profile.name.first}</div>
          <div style={{ display: 'flex', fontSize: 48, color: '#4a5d78', marginTop: 12 }}>{profile.name.rest}</div>
        </div>
        <div style={{ display: 'flex', fontSize: 34 }}>computer science student. i build things people use.</div>
      </div>
    ),
    size,
  );
}
```

`src/app/not-found.tsx`:

```tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[60rem] px-6 py-32">
      <h1 className="text-6xl">404</h1>
      <p className="mt-4 text-muted">that page does not exist.</p>
      <Link href="/" className="link tap mt-6">
        back to the start
      </Link>
    </div>
  );
}
```

- [ ] **Step 5: Remove assets nothing references any more**

```bash
cd /Users/midhunan/git-repos/midhunan-portfolio
git rm -q public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg \
  public/assets/ASSETS_README.md \
  public/assets/images/projects/synapse-docs/synapse-docs-logo.png \
  public/assets/images/projects/haskell-run/haskell-run-logo.png \
  public/assets/images/projects/attendease/attend-ease-128.png
mkdir -p public/assets/images/projects/routex
find public -type f | sort
```
Expected: remaining files are the profile photos, three achievement JPEGs plus `acm-team.JPG`, the three project `thumbnail.png`, and `resume/midhunan-resume.pdf`. (`public/assets/images/projects/routex/` is the empty folder where `thumbnail.png` goes later; git ignores empty folders.)

- [ ] **Step 6: Run the tests and rebuild**

```bash
npm test && npm run typecheck && npm run lint && npm run build
```
Expected: all pass. Build lists `○ /`, `○ /robots.txt`, `○ /sitemap.xml`, `○ /opengraph-image` (static).

- [ ] **Step 7: Checkpoint**

```bash
git add -A tests next.config.ts src/app public
git commit -m "feat: add legacy redirects, sitemap, robots, og image and 404; drop unused assets"   # only if commits are approved
```

---

### Task 10: Test the built output

**Files:**
- Create: `tests/build-output.test.mjs`

**Interfaces:**
- Consumes: `.next/server/app/index.html` from `npm run build`.
- Produces: `npm test` now also checks the real HTML when a build exists (skipped otherwise).

- [ ] **Step 1: Write the test**

`tests/build-output.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const htmlPath = join(root, '.next/server/app/index.html');
const built = existsSync(htmlPath);
const skip = built ? false : 'run `npm run build` first';
const html = built ? readFileSync(htmlPath, 'utf8') : '';

function existsExact(publicPath) {
  const full = join(root, 'public', publicPath);
  try {
    return readdirSync(dirname(full)).includes(basename(full));
  } catch {
    return false;
  }
}

test('the page has one h1, a title, a description and an og image', { skip }, () => {
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, 'exactly one <h1>');
  assert.match(html, /<title>Midhunan Vijendra Prabhaharan \|/);
  assert.match(html, /<meta name="description" content="Computer science student/);
  assert.match(html, /property="og:image"/);
});

test('the primary action and the key content are in the static HTML (no JS needed)', { skip }, () => {
  assert.ok(html.includes('connect on linkedin'));
  assert.ok(html.includes('https://www.linkedin.com/in/midhunanv'));
  for (const id of ['top', 'experience', 'projects', 'recognition', 'contact']) {
    assert.ok(html.includes(`id="${id}"`), `missing section #${id}`);
  }
  for (const text of ['student insider', 'Synapse-Docs', 'RouteX', 'Haskell Run', 'AttendEase']) {
    assert.ok(html.includes(text), `missing: ${text}`);
  }
});

test('private or dropped details are not in the built page', { skip }, () => {
  const lower = html.toLowerCase();
  assert.ok(!html.replace(/\D/g, '').includes('7530043022'), 'phone number in HTML');
  for (const banned of ['cgpa', 'coming soon', 'open to internships', '7.95']) {
    assert.ok(!lower.includes(banned), `found: ${banned}`);
  }
});

test('the theme script is inline in <head> and runs before the body', { skip }, () => {
  const head = html.slice(0, html.indexOf('</head>'));
  assert.ok(head.includes('prefers-color-scheme'), 'theme script missing from <head>');
  assert.ok(head.includes("setAttribute('data-theme'"));
});

test('every image the page requests resolves to a real file (no broken images)', { skip }, () => {
  const sources = new Set();
  for (const m of html.matchAll(/url=(%2Fassets[^&"\s]+)/g)) sources.add(decodeURIComponent(m[1]));
  assert.ok(sources.size >= 3, `expected at least 3 local images, found ${sources.size}`);
  for (const src of sources) assert.ok(existsExact(src), `built page references a missing file: ${src}`);
});

test('legacy routes are not built as pages', { skip }, () => {
  for (const name of ['about', 'contact', 'blog', 'projects']) {
    assert.ok(!existsSync(join(root, `.next/server/app/${name}.html`)), `${name}.html still exists`);
  }
});
```

- [ ] **Step 2: Build, then run all tests**

```bash
npm run build && npm test
```
Expected: `# pass` includes the six new tests; `# fail 0`; `# skipped 0`. (If the HTML is not at `.next/server/app/index.html`, find it with `find .next/server/app -name '*.html'` and fix `htmlPath`.)

- [ ] **Step 3: Prove the missing-image guard works**

```bash
mv public/assets/images/projects/haskell-run/thumbnail.png /tmp/hr-thumb.png
npm run build >/dev/null 2>&1; npm test 2>&1 | grep -E "missing|fail" | head -5
mv /tmp/hr-thumb.png public/assets/images/projects/haskell-run/thumbnail.png
```
Expected: the data test reports `missing asset: /assets/images/projects/haskell-run/thumbnail.png`. Then the file is restored.

- [ ] **Step 4: Rebuild clean**

```bash
npm run build && npm test
```
Expected: all pass.

- [ ] **Step 5: Checkpoint**

```bash
git add tests
git commit -m "test: verify the built html, images and legacy routes"   # only if commits are approved
```

---

### Task 11: Browser verification, accessibility pass and critique

Automated checks cannot judge how the page looks or feels. This task runs the real page in Chromium, then applies the two review skills. Fix anything found, then re-run Tasks 10's tests.

**Files:**
- Create (outside the repo, in the scratchpad): `verify/check.mjs`
- Modify: whatever the findings require

**Interfaces:**
- Consumes: the running production server on port 3100 (start it with `npm run start -- -p 3100` after any rebuild).

- [ ] **Step 1: Install a headless browser outside the repo**

```bash
S=/private/tmp/claude-501/-Users-midhunan-git-repos-midhunan-portfolio/2a1fe2d3-d9a8-4f9e-af48-fe1e0ad7e66a/scratchpad
mkdir -p $S/verify && cd $S/verify && npm init -y >/dev/null && npm i playwright >/dev/null 2>&1 && npx playwright install chromium 2>&1 | tail -2
```
Expected: Chromium downloads without error.

- [ ] **Step 2: Write `$S/verify/check.mjs`**

```js
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = process.env.BASE ?? 'http://localhost:3100';
const out = process.env.OUT ?? './shots';
mkdirSync(out, { recursive: true });
const failures = [];
const fail = (m) => failures.push(m);

const browser = await chromium.launch();

async function settle(page) {
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(900);
}

// 1. Every width x theme: theme applied, no overflow, no broken images, no console errors, screenshot.
for (const colorScheme of ['light', 'dark']) {
  for (const width of [320, 360, 768, 1280]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(String(e)));
    await settle(page);
    const tag = `${colorScheme}@${width}`;
    const theme = await page.evaluate(() => document.documentElement.dataset.theme);
    if (theme !== colorScheme) fail(`${tag}: data-theme is ${theme}`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) fail(`${tag}: horizontal overflow ${overflow}px`);
    const broken = await page.evaluate(() =>
      [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
    );
    if (broken.length) fail(`${tag}: broken images ${broken.join(', ')}`);
    const small = await page.evaluate(() =>
      [...document.querySelectorAll('a, button')]
        .filter((el) => el.offsetParent !== null && !el.classList.contains('skip-link') && !el.closest('p, h1, h2, h3, h4'))
        .map((el) => ({ t: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30), h: el.getBoundingClientRect().height }))
        .filter((x) => x.h < 40),
    );
    if (width <= 768 && small.length) fail(`${tag}: touch targets under 40px high: ${JSON.stringify(small)}`);
    if (errors.length) fail(`${tag}: console errors ${errors.join(' | ')}`);
    await page.screenshot({ path: `${out}/${colorScheme}-${width}.png`, fullPage: true });
    await ctx.close();
  }
}

// 2. Theme toggle flips and persists across reload.
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: 'light' });
  const page = await ctx.newPage();
  await settle(page);
  await page.click('button[aria-label^="switch"]');
  if ((await page.evaluate(() => document.documentElement.dataset.theme)) !== 'dark') fail('toggle did not switch to dark');
  await page.reload({ waitUntil: 'networkidle' });
  if ((await page.evaluate(() => document.documentElement.dataset.theme)) !== 'dark') fail('theme did not persist after reload');
  await ctx.close();
}

// 3. Keyboard: every focusable element shows a visible focus indicator.
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await settle(page);
  const seen = new Set();
  for (let i = 0; i < 60; i++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      return { label: (el.textContent || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 28), outline: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0 };
    });
    if (info && !seen.has(info.label)) {
      seen.add(info.label);
      if (!info.outline) fail(`no visible focus ring on: ${info.label}`);
    }
  }
  if (seen.size < 15) fail(`keyboard reached only ${seen.size} elements`);
  await ctx.close();
}

// 4. Reduced motion: intro animation is off.
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await settle(page);
  const name = await page.evaluate(() => getComputedStyle(document.querySelector('.intro-in')).animationName);
  if (name !== 'none') fail(`reduced motion: intro animation is "${name}"`);
  await ctx.close();
}

// 5. Cursor preview: appears on hover, Escape dismisses, stays on screen, absent on touch.
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await settle(page);
  const row = page.locator('#recognition a[data-preview-src]').first();
  await row.scrollIntoViewIfNeeded();
  await row.hover();
  await page.waitForTimeout(500);
  if ((await page.locator('[data-preview-box]').count()) !== 1) fail('cursor preview did not appear on hover');
  const rect = await page.locator('[data-preview-box]').evaluate((el) => el.getBoundingClientRect().toJSON());
  if (rect.right > 1280 || rect.bottom > 800 || rect.left < 0 || rect.top < 0) fail(`preview off screen: ${JSON.stringify(rect)}`);
  await page.keyboard.press('Escape');
  if ((await page.locator('[data-preview-box]').count()) !== 0) fail('Escape did not dismiss the preview');
  await ctx.close();

  const touch = await browser.newContext({ viewport: { width: 390, height: 800 }, hasTouch: true, isMobile: true });
  const tpage = await touch.newPage();
  await settle(tpage);
  await tpage.locator('#recognition a[data-preview-src]').first().tap();
  if ((await tpage.locator('[data-preview-box]').count()) !== 0) fail('preview appeared on a touch device');
  await touch.close();
}

// 6. Copy email: clipboard gets the address and the button says "copied".
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await ctx.newPage();
  await settle(page);
  await page.getByRole('button', { name: 'copy email' }).first().click();
  await page.waitForTimeout(200);
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  if (clip !== 'midhunmidhunan@gmail.com') fail(`clipboard held "${clip}"`);
  if ((await page.getByRole('button', { name: 'copied' }).count()) < 1) fail('button did not say "copied"');
  await ctx.close();
}

// 7. Legacy routes redirect, unknown routes 404.
{
  const ctx = await browser.newContext();
  for (const [from, to] of [['/about', '/'], ['/contact', '/#contact'], ['/blog/x', '/'], ['/projects/synapse-docs', '/#projects']]) {
    const res = await ctx.request.get(base + from, { maxRedirects: 0 });
    if (res.status() !== 308 || !(res.headers()['location'] ?? '').endsWith(to)) fail(`${from}: ${res.status()} -> ${res.headers()['location']}`);
  }
  if ((await ctx.request.get(base + '/definitely-not-a-page')).status() !== 404) fail('unknown route is not a 404');
  await ctx.close();
}

await browser.close();
console.log(failures.length ? `FAILURES (${failures.length}):\n- ${failures.join('\n- ')}` : 'ALL BROWSER CHECKS PASSED');
process.exit(failures.length ? 1 : 0);
```

- [ ] **Step 3: Run it**

```bash
S=/private/tmp/claude-501/-Users-midhunan-git-repos-midhunan-portfolio/2a1fe2d3-d9a8-4f9e-af48-fe1e0ad7e66a/scratchpad
cd $S/verify && BASE=http://localhost:3100 OUT=$S/verify/shots node check.mjs
```
Expected: `ALL BROWSER CHECKS PASSED`. For any failure: fix the code in the repo, `npm run build`, restart the server (`pkill -f "next start"; (cd /Users/midhunan/git-repos/midhunan-portfolio && npm run start -- -p 3100 >/tmp/portfolio-start.log 2>&1 &)`), re-run.

- [ ] **Step 4: Look at the screenshots (Read each image)**

Read `$S/verify/shots/light-1280.png`, `dark-1280.png`, `light-360.png`, `dark-360.png`. Check against the Design plan wireframes: portrait crop (face visible in the disc in both themes), name size and accent band, section rail alignment, project thumbnails (the Haskell Run image has a tooltip over it: note it), award rows, nothing clipped at 320 px.

- [ ] **Step 5: Lighthouse (mobile) against the production server**

```bash
S=/private/tmp/claude-501/-Users-midhunan-git-repos-midhunan-portfolio/2a1fe2d3-d9a8-4f9e-af48-fe1e0ad7e66a/scratchpad
CHROME=$(cd $S/verify && node -e "import('playwright').then(m=>console.log(m.chromium.executablePath()))")
CHROME_PATH="$CHROME" npx -y lighthouse http://localhost:3100 --quiet \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless=new --no-sandbox" --output=json --output-path=$S/verify/lh.json
node -e "const r=require('$S/verify/lh.json');for(const [k,v] of Object.entries(r.categories))console.log(k,Math.round(v.score*100))"
```
Expected: all four ≥ 95. If performance is low, the usual causes are the 2940 px thumbnails (check `sizes`), the priority portrait, or font loading; fix and re-run.

- [ ] **Step 6: External link check**

```bash
cd /Users/midhunan/git-repos/midhunan-portfolio
grep -rhoE "https://[^'\"\` )]+" src/data | sort -u | grep -vE "linkedin.com|instagram.com" | while read -r u; do
  printf "%s  %s\n" "$(curl -s -o /dev/null -L -m 15 -w '%{http_code}' "$u")" "$u"; done
```
Expected: every line starts with `2` (or `3` for odd redirects). Anything `4xx/5xx` (other than bot-blocking such as a Chrome Web Store 403): confirm the link in a browser and fix it in `src/data`. LinkedIn and Instagram URLs are excluded because they block scripts; open the 5 LinkedIn post URLs and the profile once by hand.

- [ ] **Step 7: `ui-ux-pro-max` as a checker**

Invoke the `ui-ux-pro-max` skill. Run its UX search for the concerns this page has, and read its pre-delivery checklist:

```bash
cd /Users/midhunan/git-repos/midhunan-portfolio
P=.agents/skills/ui-ux-pro-max
python3 $P/scripts/search.py "touch target hover only focus visible" --domain ux -n 5
python3 $P/scripts/search.py "reduced motion intro animation" --domain ux -n 5
python3 $P/scripts/search.py "image aspect ratio layout shift lazy" --domain ux -n 5
sed -n 1,80p $P/references/pro-rules.md
```
Write a short findings list (pass / fail per rule that applies to a static content page; ignore mobile-app-only rules). Fix every fail.

- [ ] **Step 8: `frontend-design` critique pass**

Invoke the `frontend-design` skill and apply its "restraint and self-critique" section to the screenshots: *remove one accessory*; confirm the page still reads as one memorable element on a quiet page; check the "AI tells" list (all-caps eyebrows, numbering, `·` strings, `→`, per-section reveals, card chrome). Also decide the open serif question: if Instrument Serif looks thin at 24 px in project/role headings, switch to Newsreader in `layout.tsx` only (`Newsreader({ variable: '--font-serif-display', subsets: ['latin'], display: 'swap' })`). Record what changed and why in the scratchpad notes; fix, rebuild, and re-run Steps 3-5.

- [ ] **Step 9: Final full run**

```bash
cd /Users/midhunan/git-repos/midhunan-portfolio
npm run typecheck && npm run lint && npm run build && npm test
```
Expected: all pass, `# fail 0`.

- [ ] **Step 10: Checkpoint**

```bash
git add -A src tests public next.config.ts
git commit -m "fix: address findings from browser, accessibility and design review"   # only if commits are approved, and only if Step 3-8 changed files
```

---

### Task 12: Hand-off

**Files:** none changed.

- [ ] **Step 1: Stop the server and confirm the tree**

```bash
pkill -f "next start" || true
cd /Users/midhunan/git-repos/midhunan-portfolio
git status --short
git diff --stat | tail -1
```
Expected: no `.agents/`, `.claude/`, or `skills-lock.json` in the output (ignored); README.md unmodified.

- [ ] **Step 2: Report to the user**

Summarise, with evidence: test counts from `npm test`, the Lighthouse scores, the screenshots' paths, the list of fixes from Task 11, the two copy lines still worth an eyeball (**intro wording** and **CARE school line**), and the pending images (`public/assets/images/projects/routex/thumbnail.png` plus the Haskell Run replacement; for RouteX also add the `image` field in `src/data/projects.ts`, as the comment there says). State that nothing is committed or pushed unless they asked, and offer `superpowers:finishing-a-development-branch` for merge/PR options. Do not claim the site is deployed: deploying is theirs to do.
