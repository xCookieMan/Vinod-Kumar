'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface BentoCardProps {
  span: { col: number; row: number };
  variant: 'rust' | 'ink';
  yearOrCategory: string;
  title: string;
  description: string;
  href: string;
}

const variantStyles = {
  ink: 'border-ink-border bg-ink text-cream shadow-[6px_6px_0_var(--rust)]',
  rust: 'border-ink bg-rust text-cream shadow-[6px_6px_0_var(--ink)]'
};

export default function BentoCard({ span, variant, yearOrCategory, title, description, href }: BentoCardProps) {
  return (
    <Link
      href={href as any}
      scroll
      className={`card group relative flex min-h-56 touch-pan-y flex-col justify-between overflow-hidden border p-4 transition duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-rust focus:ring-offset-4 focus:ring-offset-cream sm:min-h-64 sm:p-6 ${variantStyles[variant]}`}
      style={{
        '--card-col': span.col,
        '--card-row': span.row
      } as CSSProperties}
    >
      <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 opacity-20 [background-image:radial-gradient(circle,var(--cream)_1.5px,transparent_1.5px)] [background-size:10px_10px]" />
      <div className="relative flex items-start justify-between gap-4">
        <p className="font-[var(--font-mono)] text-[0.64rem] uppercase leading-5 tracking-[0.16em] text-cream/75 sm:text-[0.68rem] sm:tracking-[0.28em]">
          {yearOrCategory}
        </p>
        <span className="grid h-9 w-9 shrink-0 place-items-center border border-cream/40 bg-cream text-ink transition group-hover:translate-x-1 group-hover:-translate-y-1">
          <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>
      <div className="relative mt-10">
        <h3 className="font-[var(--font-display)] text-[2.4rem] uppercase leading-none tracking-normal sm:text-5xl">
          {title}
        </h3>
        <p className="mt-4 line-clamp-4 font-[var(--font-body)] text-sm leading-6 text-cream/75">
          {description}
        </p>
      </div>
    </Link>
  );
}
