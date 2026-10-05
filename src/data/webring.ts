export interface Webring {
  enabled: boolean;
  name: string;
  home: string;
  prev: string;
  random: string;
  next: string;
}

/**
 * amrita.town asks members not to add its links before they are accepted.
 * Off until then. Once accepted, set NEXT_PUBLIC_WEBRING=true (e.g. in Vercel)
 * and redeploy, or change the default below.
 */
export const webring: Webring = {
  enabled: process.env.NEXT_PUBLIC_WEBRING === 'true',
  name: 'amrita.town',
  home: 'https://amrita.town',
  prev: 'https://amrita.town/prev',
  random: 'https://amrita.town/random',
  next: 'https://amrita.town/next',
};
