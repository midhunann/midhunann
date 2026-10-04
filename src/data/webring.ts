export interface Webring {
  enabled: boolean;
  name: string;
  home: string;
  prev: string;
  random: string;
  next: string;
}

/**
 * The site is a member of the amrita.town webring, so the footer links are on.
 * Set NEXT_PUBLIC_WEBRING=false (and redeploy) to hide them.
 */
export const webring: Webring = {
  enabled: process.env.NEXT_PUBLIC_WEBRING !== 'false',
  name: 'amrita.town',
  home: 'https://amrita.town',
  prev: 'https://amrita.town/prev',
  random: 'https://amrita.town/random',
  next: 'https://amrita.town/next',
};
