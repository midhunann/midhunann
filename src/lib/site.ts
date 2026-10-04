const DEFAULT_SITE_URL = 'https://midhunan.vercel.app';

/**
 * Accepts what people actually type into an env var: a bare host, a trailing
 * slash, stray spaces. Anything unparseable falls back to the default instead
 * of throwing at build time.
 */
export function normalizeSiteUrl(value: string | undefined): string {
  const trimmed = (value ?? '').trim();
  if (!trimmed) return DEFAULT_SITE_URL;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    return new URL(withScheme).href.replace(/\/+$/, '');
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
