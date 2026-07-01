'use client';

interface MarqueeProps {
  items?: string[];
}

const defaultItems = [
  '35+ YEARS BEHIND THE LENS',
  'CAMERA',
  'EDIT',
  'STUDIO',
  'BROADCAST'
];

export default function Marquee({ items = defaultItems }: MarqueeProps) {
  return (
    <div className="relative overflow-hidden border-t-2 border-b-2 border-rust bg-ink text-cream">
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-ink to-transparent" />
      <div className="relative whitespace-nowrap py-2.5 font-[var(--font-mono)] text-[0.65rem] uppercase tracking-[0.22em] sm:py-3 sm:text-[0.75rem] sm:tracking-[0.35em]">
        <div className="animate-marquee inline-flex items-center gap-8 sm:gap-12">
          {items.map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rust" />
              {item}
            </span>
          ))}
          {items.map((item) => (
            <span key={`${item}-copy`} className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rust" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
