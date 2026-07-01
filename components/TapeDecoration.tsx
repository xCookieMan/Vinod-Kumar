interface TapeDecorationProps {
  className?: string;
  rotation?: number;
  position?: 'left' | 'right';
}

export default function TapeDecoration({ className = '', rotation = -4, position = 'left' }: TapeDecorationProps) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute top-4 h-7 w-24 border border-ink/15 bg-cream/75 shadow-[2px_2px_0_rgba(26,24,20,0.12)] ${position === 'left' ? 'left-4' : 'right-4'} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  );
}
