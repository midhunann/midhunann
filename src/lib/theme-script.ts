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
