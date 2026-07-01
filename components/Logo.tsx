import Image from 'next/image';

type LogoVariant = 'ink-on-cream' | 'cream-on-ink';

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 144 }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Vinod Kumar portfolio logo"
      width={size}
      height={size}
      priority={size >= 100}
      style={{ width: `${size}px`, height: 'auto', maxWidth: '100%' }}
      className={`block object-contain ${className}`}
    />
  );
}
