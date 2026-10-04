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
