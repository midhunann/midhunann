import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { InteractiveModeProvider } from "@/contexts/InteractiveModeContext";
import { CursorPreview, InteractiveModeToggle, CursorGlow } from "@/components/ui";
import { personalInfo } from "@/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://midhunan.dev'),
  title: {
    default: `${personalInfo.name.display} | ${personalInfo.title}`,
    template: `%s | ${personalInfo.name.display}`,
  },
  description: personalInfo.description,
  keywords: [
    "Midhunan",
    "Portfolio",
    "Full Stack Developer",
    "CSE Student",
    "Web Developer",
    "React",
    "Next.js",
    "Adobe Hackathon",
    "VS Code Extension",
  ],
  authors: [{ name: personalInfo.name.full }],
  creator: personalInfo.name.display,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://midhunan.dev",
    siteName: personalInfo.name.display,
    title: `${personalInfo.name.display} | ${personalInfo.title}`,
    description: personalInfo.description,
    images: [
      {
        url: "/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: personalInfo.name.display,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name.display} | ${personalInfo.title}`,
    description: personalInfo.description,
    images: ["/assets/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <InteractiveModeProvider>
          <Navbar />
          <main className="grow relative">
            {children}
          </main>
          <Footer />
          <CursorPreview />
          <CursorGlow />
        </InteractiveModeProvider>
      </body>
    </html>
  );
}
