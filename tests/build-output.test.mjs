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

test('the page declares the "m" favicon: svg icon, ico fallback and apple touch icon', { skip }, () => {
  assert.match(html, /<link rel="icon" href="\/icon\.svg[^"]*"[^>]*type="image\/svg\+xml"/);
  assert.match(html, /<link rel="icon" href="\/favicon\.ico[^"]*"/);
  assert.match(html, /<link rel="apple-touch-icon" href="\/apple-icon\.png[^"]*"/);
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
