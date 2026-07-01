import CTAButton from './CTAButton';

interface ArchiveFlowProps {
  eyebrow?: string;
  title: string;
  links: Array<{
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
  }>;
}

export default function ArchiveFlow({ eyebrow = 'Archive Navigation', title, links }: ArchiveFlowProps) {
  return (
    <section className="border-t-[3px] border-ink bg-cream px-4 py-10 text-ink sm:px-8 sm:py-12 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.18em] text-rust sm:text-xs sm:tracking-[0.32em]">
            <span className="h-2 w-2 rounded-full bg-rust" />
            {eyebrow}
          </div>
          <h2 className="section-title mt-4 font-[var(--font-display)] text-4xl uppercase leading-none sm:text-5xl">
            {title}
          </h2>
        </div>
        <div className="grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
          {links.map((link) => (
            <CTAButton key={`${link.href}-${link.label}`} label={link.label} href={link.href} variant={link.variant ?? 'primary'} />
          ))}
        </div>
      </div>
    </section>
  );
}
