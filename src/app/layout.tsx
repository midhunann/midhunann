import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import CursorPreview from '@/components/CursorPreview';
import Nav from '@/components/Nav';
import { profile } from '@/data';
import { siteUrl } from '@/lib/site';
import { themeScript } from '@/lib/theme-script';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });
const instrumentSerif = Instrument_Serif({
  variable: '--font-serif-display',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});
const monaspaceNeon = localFont({
  src: './fonts/MonaspaceNeonDates.woff2',
  variable: '--font-mono-label',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: profile.title,
  description: profile.description,
  authors: [{ name: profile.name.full }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: profile.name.full,
    title: profile.title,
    description: profile.description,
  },
  twitter: { card: 'summary_large_image', title: profile.title, description: profile.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf9e4' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} ${monaspaceNeon.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <CursorPreview />
      </body>
    </html>
  );
}
