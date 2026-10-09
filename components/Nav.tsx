'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#approach', label: 'Approach' },
  { href: '/about', label: 'About' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    const desktop = window.matchMedia('(min-width: 768px)');
    function onResize() { if (desktop.matches) setMenuOpen(false); }
    window.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onResize);
    };
  }, [menuOpen]);

  return (
    <nav className="poh-nav" aria-label="Main navigation">
      <div className="poh-nav-inner">
        <Link href="/" className="poh-wordmark" aria-label="POH Media home" onClick={() => setMenuOpen(false)}>
          <Image
            src="https://pub-8bc2042bd6374fa0bb22837d7930ad11.r2.dev/site-media/Entergalactic/pigeon-widget.png"
            alt=""
            width={42}
            height={28}
            className="poh-pigeon"
          />
          <span>POH <span className="poh-wordmark-light">Media</span></span>
        </Link>
        <div className="poh-desktop-links">
          {NAV_LINKS.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </div>
        <div className="poh-nav-actions">
          <a className="poh-talk-link" href="mailto:seyvikmagon@pohmedia.co">Let&apos;s talk <span aria-hidden="true">↗</span></a>
          <button
            ref={menuButton}
            type="button"
            className="poh-menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="poh-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
            <span aria-hidden="true">{menuOpen ? '−' : '+'}</span>
          </button>
        </div>
      </div>
      <div id="poh-mobile-menu" className="poh-mobile-menu" hidden={!menuOpen}>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}<span aria-hidden="true">↗</span></Link>
        ))}
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact<span aria-hidden="true">↗</span></Link>
      </div>
    </nav>
  );
}
