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
