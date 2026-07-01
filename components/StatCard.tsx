'use client';

interface StatCardProps {
  num: string;
  label: string;
  tilt: number;
  variant: 'ink' | 'rust';
}

const variantStyles = {
  ink: 'bg-ink text-cream border-ink-border shadow-[6px_6px_0_var(--rust)]',
  rust: 'bg-rust text-cream border-ink-border shadow-[6px_6px_0_var(--ink)]'
};

export default function StatCard({ num, label, tilt, variant }: StatCardProps) {
  return (
    <div
      className={`relative w-full max-w-[17rem] border p-5 sm:p-6 ${variantStyles[variant]}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="pointer-events-none absolute inset-0 border border-ink-border" />
      <div className="relative">
        <div className="font-[var(--font-display)] text-5xl leading-none tracking-[0.08em] sm:text-6xl">{num}</div>
        <div className="mt-3 font-[var(--font-mono)] text-[0.72rem] uppercase tracking-[0.28em] text-warm-grey-lt">{label}</div>
      </div>
    </div>
  );
}
