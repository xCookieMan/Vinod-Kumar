'use client';

interface CTAButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  download?: boolean | string;
}

const variantStyles = {
  primary: 'bg-ink text-cream border border-ink-border shadow-[4px_4px_0_var(--rust)] hover:-translate-y-0.5',
  secondary: 'bg-rust text-cream border border-rust/90 shadow-[4px_4px_0_var(--ink)] hover:-translate-y-0.5'
};

export default function CTAButton({ label, variant = 'primary', href, onClick, download }: CTAButtonProps) {
  if (href) {
    return (
      <a href={href} download={download} className={`inline-flex min-h-12 w-full items-center justify-center px-4 py-3 text-center font-[var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] transition sm:w-auto sm:px-6 sm:text-xs sm:tracking-[0.24em] ${variantStyles[variant]}`}>
        {label}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`inline-flex min-h-12 w-full items-center justify-center px-4 py-3 text-center font-[var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] transition sm:w-auto sm:px-6 sm:text-xs sm:tracking-[0.24em] ${variantStyles[variant]}`}>
      {label}
    </button>
  );
}
