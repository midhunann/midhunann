import test from 'node:test';
import assert from 'node:assert/strict';
import { copyViaSelection } from '../src/lib/copy-fallback.ts';

function fakeDoc({ execResult = true, execThrows = false, active = 'present' } = {}) {
  const log = [];
  const field = {
    value: '',
    style: {},
    setAttribute: () => {},
    select: () => log.push('select'),
    setSelectionRange: (a, b) => log.push(`range ${a}-${b}`),
  };
  const previous = active === 'present' ? { focus: (opts) => log.push(`restore focus ${JSON.stringify(opts)}`) } : null;
  const doc = {
    activeElement: previous,
    body: {
      appendChild: () => log.push('append'),
      removeChild: () => log.push('remove'),
    },
    createElement: () => field,
    execCommand: () => {
      log.push('exec copy');
      if (execThrows) throw new Error('SecurityError');
      return execResult;
    },
  };
  return { doc, field, log };
}

test('copies the text through a temporary field and reports success', () => {
  const { doc, field, log } = fakeDoc();
  assert.equal(copyViaSelection('a@b.c', doc), true);
  assert.equal(field.value, 'a@b.c');
  assert.deepEqual(log.slice(0, 4), ['append', 'select', 'range 0-5', 'exec copy']);
});

test('reports failure when the browser refuses the copy command', () => {
  assert.equal(copyViaSelection('x', fakeDoc({ execResult: false }).doc), false);
});

test('puts keyboard focus back where it was, without scrolling', () => {
  const { doc, log } = fakeDoc();
  copyViaSelection('x', doc);
  assert.ok(log.includes('restore focus {"preventScroll":true}'), log.join(' | '));
});

test('removes the temporary field and restores focus even if the copy command throws', () => {
  const { doc, log } = fakeDoc({ execThrows: true });
  assert.throws(() => copyViaSelection('x', doc), /SecurityError/);
  assert.ok(log.includes('remove'), 'temporary field was leaked');
  assert.ok(log.some((l) => l.startsWith('restore focus')), 'focus was not restored');
});

test('works when nothing had focus', () => {
  const { doc } = fakeDoc({ active: 'none' });
  assert.equal(copyViaSelection('x', doc), true);
});
