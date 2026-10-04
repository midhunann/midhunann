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
