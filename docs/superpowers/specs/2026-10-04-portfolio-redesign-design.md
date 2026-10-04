# Portfolio redesign: design spec

Date: 2026-10-04 · Status: draft for review · Owner: Midhunan

## 1. Goal

Rebuild midhunan.vercel.app as one short, calm, editorial page that gets an engineer, a program reviewer or a recruiter from "who is this" to "connect on LinkedIn" in under a minute. Content is brought up to date from the 1709.pdf resume plus LinkedIn. Everything that does not serve that is removed.

**Success criteria**
- A visitor can answer "what has he built, where has he worked, what did he win" without leaving the page or hovering anything.
- LinkedIn is the single primary action; email copy, resume and GitHub are secondary.
- Every number on the page is traceable to the resume or LinkedIn (see §9 for the ones that need his confirmation).
- Light and dark themes both look designed, not inverted. Both pass WCAG AA for text.
- `tsc`, `eslint` and `next build` pass; no console errors; no horizontal scroll at 360 px.

## 2. Decisions (from the brainstorm)

| Topic | Decision |
|---|---|
| Audience | Engineers/peers, hackathon & program reviewers, recruiters |
| Primary action | Connect on LinkedIn (`linkedin.com/in/midhunanv`) |
| Structure | Single page, short scroll. No /about, /contact, /blog, /projects/* |
| Order | Intro → Experience → Projects → Recognition → Contact |
| Project depth | Short story each: problem → what he chose to build → outcome |
| Look | Editorial minimal, built from the existing palette |
| Theme | Light + dark, follows system, small toggle remembers choice |
| Type | Serif display, Inter body, Monaspace Neon for dates only |
| Motion | One orchestrated page-load sequence in the intro; no per-section scroll reveals; hover/focus transitions only; honours `prefers-reduced-motion` |
| Voice | Casual lowercase, like his LinkedIn About |
| Photo | `profile-photo.png` (supplied, 1145×1373 transparent PNG, navy shirt) cropped tight on the face in a 192 px (mobile) / 304 px (desktop) rounded square (30% radius, vertically centered against the intro text), with a hard, unblurred brand-blue drop-shadow of the cut-out itself, offset up and to the right (the one shadow on the page, added at the owner's request on 2026-10-04); stage photo kept for the name-hover preview |
| Effects kept | Cursor image preview (awards, a bonus on top of proof links), animated name hover |
| Extras | Sticky minimal nav, copy-email button, generated Open Graph image, resume PDF download |
| Not included | Blog, contact form, phone number, location, CGPA, skills list, coursework, user reviews, stats strip, availability line |
| Domain | `midhunan.vercel.app`, via `NEXT_PUBLIC_SITE_URL` env var |
| README.md | Untouched (it is the GitHub profile README: remote is `midhunann/midhunann`) |
| Stack | Stay: Next.js 16, React 19, Tailwind 4, static output, content in typed data files |

## 3. Design tokens

Brand colours come from the live site: noir `#000`, midnight `#122c4f`, ocean `#5b88b2`, pearl `#fbf9e4`.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#fbf9e4` | `#000000` |
| `--ink` | `#122c4f` | `#fbf9e4` |
| `--ink-muted` | midnight at 70% | pearl at 65% |
| `--rule` (hairlines) | midnight at 15% | pearl at 15% |
| `--accent` (lines, dots, hover fills) | `#5b88b2` | `#5b88b2` |
| `--accent-text` (links on text) | `#2f5f8a` (≥4.5:1 on cream, to be verified) | `#7ba5cc` (already on the live site) |

`#5b88b2` on cream is about 3:1, so it is never used for body-size text in light mode. The values marked "to be verified" are checked with a contrast tool during implementation and adjusted if they miss AA.

**Typography**
- Display (name, section titles, project titles): a serif, self-hosted via `next/font` (Newsreader or Instrument Serif; pick one at implementation by looking at both rendered).
- Body: Inter, actually applied this time (today it is loaded but unused).
- Dates only: Monaspace Neon, already in `public/fonts`. Roles, stacks and section titles are plain sentence-case text in the body/serif faces; no all-caps labels, no numbering, no `A · B · C` meta strings, no "→" suffixes. Monaspace Krypton is dropped.
- Scale: fluid clamp for the name; body 17-18 px, line-height 1.6, measure ≤ 68ch.

**Layout**
- One column, max-width 960 px, 24 px gutters on mobile.
- From 768 px: two columns per section, 160 px label column (mono, muted) + content column. Below 768 px: stacked.
- Sections separated by a 1 px `--rule` line and generous vertical space. No cards, no shadows, no gradients, no blur.

## 4. Page content

All copy is lowercase except proper nouns and acronyms. Items tagged **[verify]** are inferred or ambiguous and need his confirmation (see §9).

### Nav (sticky)
Left: `midhunan`. Right (desktop): `experience · projects · recognition · contact` + theme toggle. Mobile: name + toggle + a compact "menu" disclosure with the same four links. Anchors smooth-scroll, and the nav highlights the section in view.

### Intro
- Portrait (≈ 96-120 px, rounded, `profile-photo.png`) beside the name.
- `midhunan vijendra prabhaharan` (animated hover effect on the name; plain on touch).
- Lead (≈ 2 sentences): *"i'm a final-year computer science student who likes the part of a problem where the solution isn't obvious and i have to figure out what should actually be built."* **[verify wording; adapted from his LinkedIn About]**
- Proof line: *"shipped: a vs code extension with 2,300+ installs, a browser extension used by 1,600+ students, and a document-intelligence platform that was runner-up at the adobe india hackathon."*
- Actions: **connect on linkedin** (primary button) · copy email (`midhunmidhunan@gmail.com`) · resume (PDF) · github · instagram.

### Experience
| Role | When | Copy |
|---|---|---|
| Student Insider, Adobe (part-time, hybrid, Noida) | Sep 2026 - present | selected as 1 of 100 students from nearly 19,000 applicants across india. |
| Software Engineer Intern, Hindustan Petroleum Corporation Limited (on-site, Mumbai) | Apr - Jun 2026 | built the pipeline operations monitoring system (next.js 15, firestore, sheetjs). it replaces about 2 hours of daily work by extracting, aggregating and visualizing 4 daily excel workbooks, saving ~60 man-hours a month, and is used across the organization. received a letter of excellence & recommendation. |
| Web Developer Intern, GRABB Private Limited (hybrid, Tiruchirappalli) | May - Jun 2025 | built the company website from scratch (next.js 15, typescript): 50+ accessible components, 45% smaller initial bundle, a district-level choropleth map of enrollment and program data, 98/100 seo and lcp under 1.2s. |

Company names link out where a public site exists (grabbtech.com).

### Projects
Each: title (serif), then two plain lines (what it was / what it's built with), a three-sentence story, links, and an inline thumbnail (16:10, hairline border).

1. **Synapse-Docs**. Line 1: team of 3, led by him; runner-up at the adobe india hackathon 2025 (262,000 registrations). Line 2: fastapi, react, google gemini, faiss, docker, gcp.
   Story: *pdf libraries are static, so the links between documents stay invisible. we built a platform where selecting text instantly surfaces related passages across your whole library, with a sub-500ms semantic search (fastapi + faiss). a visual knowledge graph and a navigable research trail keep people from getting lost.* Links: github, live demo.
2. **RouteX**. Line 1: team of 4, led by him; top 34 of 131,868 registrations at hp power lab 2.0. Line 2: fastapi, or-tools, cp-sat, react.
   Story: *hpcl tankers have to be routed under multi-port demand and 720-hour constraints. routex is an optimization platform that generates cost-efficient routes, with a dashboard that turns the result into actions.* Links: github. Needs an image (none in repo).
3. **Haskell Run**. Line 1: solo vs code extension. Line 2: typescript, node.js, vs code api.
   Story: *running haskell in vs code meant juggling the editor, a terminal and ghci. this extension runs a file or a single function in one click, with a repl and debugging built in. 2,300+ installs.* Links: marketplace, github.
4. **AttendEase**. Line 1: solo browser extension. Line 2: html, css, javascript.
   Story: *the student portal shows raw attendance and never answers "how many can i skip?". attendease reads it and shows bunkable and recovery classes against the 75% threshold, in a floating widget. it runs on chrome, edge and firefox and is used by 1,600+ students.* Links: chrome web store, edge add-ons, firefox add-ons, github.

The HPCL monitoring system lives in Experience only (no duplicate card).

### Recognition
Three groups, plain lists with hairline separators.

**Awards.** Every row links to its proof, so nothing important is hover-only. On desktop, hover or keyboard focus on a row additionally shows a floating image via the cursor preview (a bonus; touch users simply tap the link).
- adobe india hackathon 2025: runner-up, grand finale (262,000 registrations). Proof: his LinkedIn winners post. Image `adobe-hackathon-runner-up.jpeg`.
- hp power lab 2.0, 2025: top 34 teams of 131,868 registrations. Proof: RouteX repo.
- hack beyond limits 24-hour hackathon, 2024: 3rd place, agrichain. Proof: AgriChain repo. Image `hack-beyond-limits.jpeg`.
- value health hackathon, 2025: 3rd place, arogya desk. Proof: his LinkedIn post. Image `value-health-hackathon.jpeg`.
- top 80 unstoppable e-school leaders, 2026: recognized by unstop. Proof: his LinkedIn post.

**Leadership**
- acm student chapter, amrita coimbatore - co-head, event management (aug 2025 - apr 2026): led planning and execution of chapter events across teams and volunteers. Also technical team member (mar 2025 - apr 2026): helped design and build the chapter's public website. Image `acm-team.JPG` on hover.
- anokha (amrita techfest) - coordinator (nov 2025 - jan 2026): ran acm winter of code 2.0 end to end; led PR and outreach that converted 100+ students into registrations.

**Education**
- amrita vishwa vidyapeetham, coimbatore - b.tech computer science engineering, 2023 - 2027.
- care international school, trichy - std 10 & 12, 89% aggregate, until 2023 **[verify]**.

### Contact + footer
Headline: *"the best way to reach me is linkedin."* Primary button to LinkedIn; below it the email as copyable text, GitHub, Instagram, resume. Footer: `© 2026 midhunan` and nothing else. No form, no phone, no location.

## 5. Behaviour

- **Theme:** an inline script in `<head>` reads `localStorage.theme` (try/catch) or `prefers-color-scheme` and sets `data-theme` on `<html>` before first paint, preventing a flash. The toggle flips and persists. System changes are followed until the visitor picks one.
- **Motion:** a single page-load sequence in the intro (portrait, name, lead and actions settle in over ~600 ms using CSS only). Everything below the intro is static: no scroll-triggered reveals. Under `prefers-reduced-motion` the intro renders in its final state. Content is fully visible with JS off.
- **Cursor preview:** keeps `data-cursor-preview` attributes; active only for `(hover: hover) and (pointer: fine)`; also opens on keyboard focus of the item; image max 280 px. Remove the always-true `InteractiveModeContext`.
- **Name hover:** reuses `TextHoverEffect`, restyled to the palette. Disabled for reduced motion and touch. Plain `<h1>` text remains for screen readers and SEO.
- **Copy email:** copies to clipboard, shows "copied" for 2 s (`aria-live="polite"`); falls back to selecting the text if the Clipboard API is unavailable.
- **Redirects:** `/about`, `/contact`, `/blog`, `/blog/*`, `/projects`, `/projects/*` → `/` (308) so existing links do not 404.
- **External links:** `rel="noopener noreferrer"`, visible focus ring (2 px accent outline).

## 6. Architecture and files

```
src/app/layout.tsx          fonts, theme script, metadata (metadataBase from env), skip link
src/app/page.tsx            composes the sections; server component
src/app/globals.css         tokens, base type, utilities (~120 lines, down from 456)
src/app/opengraph-image.tsx generated 1200x630 card (name, one line, palette); no file asset
src/app/sitemap.ts, robots.ts   single URL, env-driven base
src/app/not-found.tsx       minimal, on-brand
src/components/
  Nav.tsx, ThemeToggle.tsx, Section.tsx, CopyEmail.tsx,
  Intro.tsx, Experience.tsx, Projects.tsx, Recognition.tsx, Contact.tsx,
  CursorPreview.tsx, NameHover.tsx
src/data/                   profile.ts, experience.ts, projects.ts, recognition.ts, index.ts
src/types/index.ts          trimmed to the shapes above
```

Each section component takes its data as props from `src/data`, so editing copy never touches layout. Client components are limited to Nav (active section), ThemeToggle, CopyEmail, CursorPreview and NameHover.

**Removed:** `src/app/{about,blog,contact,projects}/**`, `src/data/blog.ts`, `src/contexts/InteractiveModeContext.tsx`, `src/hooks/useCursorPosition.ts` (folded into CursorPreview), and these `src/components/ui/*` files: AchievementCard, AnimatedTooltip, BackgroundBeams, BackgroundRippleEffect, BlogCard, Button, CardContainer, CursorGlow, HoverBorderGradient, InfiniteMovingCards, InteractiveModeToggle, ProjectCard, ProjectCarousel, Spotlight, TestimonialCard, TextGenerateEffect, `layout/Footer`. Dependencies no longer used (`@radix-ui/react-slot`, `class-variance-authority`, `tailwind-merge`, and `framer-motion` if the name effect can be done without it) are uninstalled.

**Assets**
- `public/assets/images/profile/profile-photo.png`: **received**, a 1145×1373 transparent PNG (head and shoulders, navy shirt). Cropped to a circle focused on the face, placed on a soft midnight/cream tint so it reads in both themes; served through `next/image`.
- `speaking.png` (the stage photo) is kept for the name-hover preview; it is currently a 1280×1920 JPEG named `.png` and gets a correct extension.
- Pending images, with agreed filenames: `public/assets/images/projects/routex/thumbnail.png` and a replacement `public/assets/images/projects/haskell-run/thumbnail.png`. Until they arrive the build uses a quiet text placeholder for RouteX and keeps the current Haskell Run image.
- `public/assets/resume/midhunan-resume.pdf`: replaced with `1709.pdf` as-is (contains his phone number; accepted).
- Project thumbnails: Synapse-Docs and AttendEase kept (AttendEase screenshot shows faculty names, to be reviewed); Haskell Run's is a Marketplace page with a tooltip over it and is to be re-shot; RouteX needs one.
- All broken references (screenshot-1..3, blog covers, `og-image.png`, the `.png`/`.jpeg` mismatch) disappear with the deleted code.
- Unused boilerplate SVGs (`file`, `globe`, `next`, `vercel`, `window`) and `ASSETS_README.md` removed.

## 7. Skills and process used in implementation

Installed in `.agents/skills` (symlinked into `.claude/skills`, both gitignored): `design-taste-frontend`, `minimalist-ui`, `redesign-existing-projects`, `frontend-design`, `ui-ux-pro-max`.
- `frontend-design`: before any code, write the short design plan it asks for (tokens, ASCII wireframes for desktop and mobile), then review it against this spec and revise anything that reads as a default. Used again as a critique pass on the built page.
- `design-taste-frontend` and `minimalist-ui`: guide the visual pass and the anti-slop pre-flight check.
- `ui-ux-pro-max`: used as a checker, not a generator. Its `--design-system` output ignores the brand palette, so it does not set direction. We run its accessibility, touch-target, performance and layout rules and its pre-delivery checklist against the finished page.
- Work happens on a branch; nothing is committed or pushed unless the user asks.

## 8. Verification

No test suite exists and a static page does not warrant one. Instead:
1. `npx tsc --noEmit`, `npm run lint`, `npm run build` all clean.
2. Run the production build; check at 360, 768 and 1280 px in both themes: no horizontal scroll, no overlap, nav works, keyboard-only walk-through reaches every link with a visible focus ring.
3. Verify the theme script causes no flash (hard reload in each theme) and `prefers-reduced-motion` disables the intro sequence and name effect.
4. Contrast-check every text/background pair in both themes (≥ 4.5:1, ≥ 3:1 for large text).
5. Lighthouse (mobile): Performance, Accessibility, Best Practices, SEO all ≥ 95.
6. Click through every external link and the three redirects.

## 9. Open items before implementation

Resolved on 2026-10-04: HPCL wording ("replaces about 2 hours of daily work"), GRABB "lcp under 1.2s", Hack Beyond Limits 2024. Still marked **[verify]** above and to be eyeballed when he reviews the built page: the intro wording and the CARE end year / aggregate wording.

Assets still to provide: RouteX and Haskell Run images at the paths in §6 (the user will add them later).

Risks: award images appear only on desktop hover/focus, but every award links to its proof, so no fact depends on hover. The light-mode accent text colour needs a contrast check. Haskell Run's 2,300+ figure is higher than the 1,392 in the repo screenshot; the copy says "installs", per his confirmation.

## 10. Out of scope

Blog, contact form or any backend, analytics, CMS, i18n, skills list, per-project pages, animations beyond §5.
