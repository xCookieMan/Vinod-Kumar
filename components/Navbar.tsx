'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' }
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById('hero-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { rootMargin: '-100px 0px 0px 0px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled || menuOpen ? 'bg-cream/95 backdrop-blur-xl shadow-[0_12px_30px_rgba(26,24,20,0.08)]' : 'bg-transparent'}`}>
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Logo size={54} variant="cream-on-ink" />

        <nav className="hidden items-center justify-center gap-8 md:flex" aria-label="Primary navigation">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href as any} className={`text-sm uppercase tracking-[0.3em] transition ${pathname === item.href ? 'text-rust' : 'text-ink/75 hover:text-ink'}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="col-start-3 inline-flex h-11 w-11 justify-self-end items-center justify-center rounded-full border border-ink-border bg-ink-soft text-cream transition hover:bg-ink md:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="hidden h-11 w-11 md:block" aria-hidden="true" />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full z-40 max-h-[calc(100svh-76px)] overflow-y-auto border-t border-cream/15 bg-ink px-4 py-5 text-cream shadow-[0_18px_40px_rgba(26,24,20,0.25)] sm:px-6 sm:py-6 md:hidden"
          >
            <nav className="flex min-h-[calc(100svh-120px)] flex-col justify-between gap-8" aria-label="Mobile navigation">
              <div className="flex flex-col gap-3">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href as any}
                    className={`flex min-h-14 items-center border border-cream/15 px-4 font-[var(--font-display)] text-[2.15rem] uppercase leading-none tracking-normal transition hover:border-rust hover:text-rust sm:text-[2.6rem] ${
                      pathname === item.href ? 'border-rust text-rust' : 'text-cream'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="border-t border-cream/15 pt-5 font-[var(--font-mono)] text-[0.68rem] uppercase leading-6 tracking-[0.16em] text-cream/60 sm:text-xs sm:tracking-[0.28em]">
                Production Archive / Vinod Kumar
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
