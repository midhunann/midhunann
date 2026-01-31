import Link from 'next/link';
import { Github, Linkedin, Instagram, Mail, Heart } from 'lucide-react';
import { personalInfo, navigation } from '@/data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
    email: Mail,
  };

  return (
    <footer className="border-t border-ocean/10 bg-noir/50">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="font-mono text-xl font-medium text-pearl hover:text-ocean transition-colors"
            >
              {personalInfo.name.logo}
            </Link>
            <p className="text-pearl/60 text-sm max-w-xs">
              {personalInfo.description.slice(0, 120)}...
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-pearl uppercase tracking-wider">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-pearl/60 hover:text-ocean transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-pearl uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex items-center gap-4">
              {personalInfo.socials.map((social) => {
                const Icon = socialIcons[social.platform as keyof typeof socialIcons];
                return Icon ? (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-midnight/30 text-pearl/60 hover:text-ocean hover:bg-midnight/50 transition-all"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                ) : null;
              })}
            </div>
            <p className="text-pearl/60 text-sm">
              {personalInfo.email}
            </p>
            <p className="text-pearl/60 text-sm">
              {personalInfo.location.city}, {personalInfo.location.country}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-ocean/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-pearl/40 text-sm">
            © {currentYear} {personalInfo.name.display}. All rights reserved.
          </p>
          <p className="text-pearl/40 text-sm flex items-center gap-1">
            Built with <Heart size={14} className="text-ocean" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
