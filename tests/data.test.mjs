import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { basename, dirname, join } from 'node:path';
import { profile } from '../src/data/profile.ts';
import { experience } from '../src/data/experience.ts';
import { projects } from '../src/data/projects.ts';
import { awards, leadership, education } from '../src/data/recognition.ts';
import { webring } from '../src/data/webring.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const everything = { profile, experience, projects, awards, leadership, education, webring };

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

test('webring: the four links follow amrita.town\'s documented shape', () => {
  assert.equal(webring.name, 'amrita.town');
  assert.equal(webring.home, 'https://amrita.town');
  assert.equal(webring.prev, 'https://amrita.town/prev');
  assert.equal(webring.random, 'https://amrita.town/random');
  assert.equal(webring.next, 'https://amrita.town/next');
});

test('webring: on by default now the site is a member; NEXT_PUBLIC_WEBRING=false switches it off', () => {
  assert.equal(webring.enabled, process.env.NEXT_PUBLIC_WEBRING !== 'false');
});

test('the downloadable resume is the new pdf', () => {
  assert.ok(existsExact(profile.resume), 'resume missing');
  const size = statSync(join(root, 'public', profile.resume)).size;
  assert.ok(size > 100_000 && size < 400_000, `unexpected resume size ${size}`);
});
