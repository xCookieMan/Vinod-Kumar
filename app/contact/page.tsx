import Marquee from '@/components/Marquee';
import CameraContact from '@/components/CameraContact';
import ArchiveFlow from '@/components/ArchiveFlow';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <div id="hero-sentinel" className="h-1" />
      <Marquee />

      <section className="hero-archive-bg relative overflow-hidden px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12">
        <div className="hero-halftone pointer-events-none absolute right-0 top-32 h-72 w-72 opacity-20 sm:h-[28rem] sm:w-[28rem]" />
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.18em] text-rust sm:text-xs sm:tracking-[0.32em]">
            <span className="h-2 w-2 rounded-full bg-rust" />
            Camera Contact
          </div>
          <h1 className="section-title mt-6 font-[var(--font-display)] text-6xl uppercase leading-none tracking-normal sm:text-7xl lg:text-8xl">
            Contact
          </h1>
          <p className="mt-5 max-w-3xl border-l-4 border-rust pl-4 font-[var(--font-mono)] text-xs uppercase leading-6 tracking-[0.12em] text-warm-grey sm:text-sm sm:leading-7 sm:tracking-[0.22em]">
            Professional inquiries, academic collaborations, media projects, and student queries.
          </p>
        </div>

        <div className="mt-12">
          <CameraContact />
        </div>
      </section>

      <ArchiveFlow
        title="Return To The Archive"
        links={[
          { label: 'Home', href: '/', variant: 'primary' },
          { label: 'Experience', href: '/experience', variant: 'secondary' },
          { label: 'Skills', href: '/skills', variant: 'primary' }
        ]}
      />
    </main>
  );
}
