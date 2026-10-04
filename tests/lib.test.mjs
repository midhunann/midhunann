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

test('normalizeSiteUrl: a bare host (typed without a scheme in the Vercel UI) gets https://', () => {
  assert.equal(normalizeSiteUrl('midhunan.vercel.app'), 'https://midhunan.vercel.app');
  assert.equal(normalizeSiteUrl('  midhunan.dev/  '), 'https://midhunan.dev');
});

test('normalizeSiteUrl: keeps http for local development', () => {
  assert.equal(normalizeSiteUrl('http://localhost:3000/'), 'http://localhost:3000');
});

test('normalizeSiteUrl: an unparseable value falls back to the default instead of throwing', () => {
  assert.equal(normalizeSiteUrl('not a url'), 'https://midhunan.vercel.app');
  assert.equal(normalizeSiteUrl('   '), 'https://midhunan.vercel.app');
});
