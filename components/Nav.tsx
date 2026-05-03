'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      setScrolled(scrollTop > 40);
      setDarkMode(progress > 0.35);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? darkMode
            ? 'bg-black/15 backdrop-blur-sm'
            : 'bg-white/10 backdrop-blur-sm'
          : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        {/* Pigeon logo */}
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image
            src="https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/site-media/Entergalactic/pigeon-widget.png"
            alt="Home"
            width={30}
            height={20}
            className="object-contain"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base tracking-wide transition-colors ${
                darkMode
                  ? 'text-white/60 hover:text-white'
                  : 'text-black/50 hover:text-black'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden flex flex-col gap-[5px] p-2 transition-colors ${
            darkMode ? 'text-white/70' : 'text-black/60'
          }`}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className={`block w-5 h-[1.5px] origin-center ${
              darkMode ? 'bg-white/70' : 'bg-black/60'
            }`}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className={`block w-5 h-[1.5px] ${
              darkMode ? 'bg-white/70' : 'bg-black/60'
            }`}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className={`block w-5 h-[1.5px] origin-center ${
              darkMode ? 'bg-white/70' : 'bg-black/60'
            }`}
          />
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`md:hidden px-6 pb-6 pt-2 ${
              darkMode
                ? 'bg-black/25 backdrop-blur-sm'
                : 'bg-white/15 backdrop-blur-sm'
            }`}
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-lg transition-colors ${
                    darkMode
                      ? 'text-white/70 hover:text-white'
                      : 'text-black/60 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
