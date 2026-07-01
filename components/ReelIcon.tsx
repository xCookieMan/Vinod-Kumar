'use client';

export default function ReelIcon({ size = 72, tone = 'dark' }: { size?: number; tone?: 'dark' | 'light' }) {
  const isLight = tone === 'light';

  return (
    <div
      className={`relative inline-flex animate-spin-slow items-center justify-center rounded-full border ${
        isLight ? 'border-cream/35 bg-ink-soft text-cream shadow-[6px_6px_0_var(--rust)]' : 'border-ink-border bg-cream text-ink shadow-rust'
      }`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className={`absolute inset-0 rounded-full border-2 border-dashed ${isLight ? 'border-cream' : 'border-ink'}`} />
      <div className={`absolute inset-[22%] rounded-full border ${isLight ? 'border-cream/30 bg-ink' : 'border-ink-soft bg-ink'}`} />
      <div className={`absolute inset-[42%] rounded-full border ${isLight ? 'border-rust bg-cream' : 'border-cream bg-cream'}`} />
      <div className={`absolute left-1/2 top-[15%] h-[12%] w-[12%] -translate-x-1/2 rounded-full ${isLight ? 'bg-rust' : 'bg-cream'}`} />
      <div className={`absolute bottom-[15%] left-1/2 h-[12%] w-[12%] -translate-x-1/2 rounded-full ${isLight ? 'bg-rust' : 'bg-cream'}`} />
      <div className={`absolute left-[15%] top-1/2 h-[12%] w-[12%] -translate-y-1/2 rounded-full ${isLight ? 'bg-rust' : 'bg-cream'}`} />
      <div className={`absolute right-[15%] top-1/2 h-[12%] w-[12%] -translate-y-1/2 rounded-full ${isLight ? 'bg-rust' : 'bg-cream'}`} />
    </div>
  );
}
