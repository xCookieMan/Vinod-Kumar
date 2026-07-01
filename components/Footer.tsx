import Link from 'next/link';
import { Mail, Phone, Radio } from 'lucide-react';
import Logo from './Logo';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' }
] as const;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-[3px] border-ink bg-cream px-5 pb-6 pt-14 text-ink sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-7 border-b border-ink/20 [background-image:radial-gradient(circle,var(--ink)_4px,transparent_4px)] [background-position:0_50%] [background-size:28px_18px]"
      />
      <div className="pointer-events-none absolute -bottom-14 -right-8 opacity-[0.06]">
        <Logo size={180} />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-9 md:grid-cols-3">
        <div>
          <Logo size={83} variant="cream-on-ink" />
          <p className="mt-5 max-w-sm font-[var(--font-mono)] text-xs uppercase leading-6 tracking-[0.22em] text-warm-grey">
            Cinematographer, studio incharge, and media educator with 35+ years across production and academics.
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-rust">Quick Links</p>
          <div className="mt-5 grid gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-[var(--font-body)] text-sm font-bold uppercase tracking-[0.12em] transition hover:translate-x-1 hover:text-rust"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div>
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-rust">Contact</p>
          <div className="mt-5 space-y-4 text-sm leading-6 text-warm-grey">
            <p>9312612071 / 8826301570</p>
            <p>6/146, Dakshinpuri Extn., New Delhi - 110062</p>
            <p>Assistant Professor, Tecnia Institute of Advanced Studies</p>
          </div>
          <div className="mt-6 flex gap-3">
            {[Phone, Mail, Radio].map((Icon, index) => (
              <span key={index} className="grid h-10 w-10 place-items-center rounded-full border border-ink/25 text-rust">
                <Icon size={17} aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 flex max-w-6xl flex-col gap-3 border-t border-ink/20 pt-5 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.22em] text-warm-grey sm:flex-row sm:items-center sm:justify-between">
        <span>© Archive / VK</span>
        <span>Production Archive - Est. 1988</span>
      </div>
    </footer>
  );
}
