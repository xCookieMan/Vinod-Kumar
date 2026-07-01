'use client';

export default function HeroScrollIndicator() {
  return (
    <div className="relative grid h-16 w-16 place-items-center rounded-full border border-ink bg-cream text-ink shadow-[4px_4px_0_var(--rust)]">
      <div className="absolute inset-3 animate-pulse rounded-full border border-rust" />
      <div className="absolute h-10 w-px bg-ink" />
      <div className="absolute h-px w-10 bg-ink" />
      <div className="h-3 w-3 rounded-full bg-rust" />
    </div>
  );
}
