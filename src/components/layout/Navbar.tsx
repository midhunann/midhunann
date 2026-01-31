'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { navigation, personalInfo } from '@/data';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
    email: Mail,
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isScrolled ? 'py-2' : 'py-4'
        )}
      >
        {/* Navbar container with glassmorphism */}
        <div
          className={cn(
            'mx-auto transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]',
            isScrolled
              ? 'max-w-4xl px-2 sm:px-4'
              : 'max-w-7xl px-4 sm:px-6 lg:px-8'
          )}
        >
          <nav
            className={cn(
              'relative flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] border border-transparent',
              isScrolled
                ? 'navbar-glass navbar-glass-scrolled rounded-full px-5 sm:px-8 py-3'
                : 'px-0 py-1'
            )}
          >


            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 font-mono text-lg font-medium text-pearl hover:text-ocean transition-colors duration-300"
            >
              <motion.span
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {personalInfo.name.logo}
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 relative z-10">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative py-1.5 group"
                >
                  <span
                    className={cn(
                      'text-sm font-medium transition-colors duration-300',
                      pathname === item.href
                        ? 'text-pearl'
                        : 'text-pearl/50 group-hover:text-pearl/80'
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Social Icons - Desktop */}
            <div className="hidden md:flex items-center gap-3 relative z-10">
              {personalInfo.socials.slice(0, 3).map((social) => {
                const Icon = socialIcons[social.platform as keyof typeof socialIcons];
                return Icon ? (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-pearl/40 hover:text-ocean transition-colors duration-300"
                    aria-label={social.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </motion.a>
                ) : null;
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative z-10 p-2.5 text-pearl/70 hover:text-pearl rounded-full hover:bg-pearl/5 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} strokeWidth={1.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} strokeWidth={1.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-noir/60 backdrop-blur-sm md:hidden"
              onClick={closeMobileMenu}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-20 left-4 right-4 z-50 md:hidden"
            >
              <nav className="mobile-menu-glass rounded-2xl p-5 flex flex-col gap-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        'block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300',
                        pathname === item.href
                          ? 'bg-ocean/10 text-pearl'
                          : 'text-pearl/60 hover:text-pearl hover:bg-pearl/5'
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Social Icons in Mobile Menu */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center gap-2 pt-4 mt-2 border-t border-ocean/10"
                >
                  {personalInfo.socials.slice(0, 4).map((social) => {
                    const Icon = socialIcons[social.platform as keyof typeof socialIcons];
                    return Icon ? (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-pearl/50 hover:text-ocean transition-colors duration-300 rounded-full hover:bg-ocean/10"
                        aria-label={social.label}
                      >
                        <Icon size={18} strokeWidth={1.5} />
                      </a>
                    ) : null;
                  })}
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
