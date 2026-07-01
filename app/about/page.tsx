import Marquee from '@/components/Marquee';
import TimelineTree from '@/components/TimelineTree';
import AboutStats from '@/components/AboutStats';
import CTAButton from '@/components/CTAButton';
import ArchiveFlow from '@/components/ArchiveFlow';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <div id="hero-sentinel" className="h-1" />
      <Marquee />

      <section className="hero-archive-bg relative overflow-hidden px-4 pb-14 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12">
        <div className="hero-halftone pointer-events-none absolute right-0 top-32 h-72 w-72 opacity-20 sm:h-[28rem] sm:w-[28rem]" />
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.18em] text-rust sm:text-xs sm:tracking-[0.32em]">
            <span className="h-2 w-2 rounded-full bg-rust" />
            Production Archive
          </div>
          <h1 className="section-title mt-6 font-[var(--font-display)] text-6xl uppercase leading-none tracking-normal sm:text-7xl lg:text-8xl">
            The Journey
          </h1>
          <p className="mt-5 max-w-3xl border-l-4 border-rust pl-4 font-[var(--font-mono)] text-xs uppercase leading-6 tracking-[0.12em] text-warm-grey sm:text-sm sm:leading-7 sm:tracking-[0.22em]">
            35+ Years Behind the Lens & Behind the Podium
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
            <CTAButton label="Back Home" href="/" variant="primary" />
            <CTAButton label="View Career Log" href="/experience" variant="secondary" />
          </div>
        </div>

        <TimelineTree />
      </section>

      <AboutStats />

      <ArchiveFlow
        title="Next: Open The Career Log"
        links={[
          { label: 'Home', href: '/', variant: 'primary' },
          { label: 'Experience', href: '/experience', variant: 'secondary' },
          { label: 'Skills', href: '/skills', variant: 'primary' },
          { label: 'Contact', href: '/contact', variant: 'secondary' }
        ]}
      />
    </main>
  );
}
