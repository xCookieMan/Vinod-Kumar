import Marquee from '@/components/Marquee';
import ExperienceGrid from '@/components/ExperienceGrid';
import ArchiveFlow from '@/components/ArchiveFlow';
import { fallbackExperiences, type ExperienceItem } from '@/lib/portfolioContent';

export const dynamic = 'force-dynamic';

async function getExperiences(): Promise<ExperienceItem[]> {
  const mongoUri = process.env.MONGODB_URI ?? '';
  if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
    return fallbackExperiences;
  }

  try {
    const [{ default: dbConnect }, { default: Experience }] = await Promise.all([
      import('@/lib/mongodb'),
      import('@/models/Experience')
    ]);

    await dbConnect();
    const docs = await Experience.find({}).sort({ order: 1 }).lean();

    if (!docs.length) return fallbackExperiences;

    return docs.map((doc: any) => ({
      id: doc._id.toString(),
      title: doc.title,
      organization: doc.organization,
      yearRange: doc.yearRange,
      category: doc.category,
      description: doc.description,
      order: doc.order,
      media: doc.media ?? []
    }));
  } catch (error) {
    console.error('Using fallback experience data:', error);
    return fallbackExperiences;
  }
}

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <main className="min-h-screen bg-cream text-ink">
      <div id="hero-sentinel" className="h-1" />
      <Marquee />

      <section className="hero-archive-bg relative overflow-hidden px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12">
        <div className="hero-halftone pointer-events-none absolute right-0 top-32 h-72 w-72 opacity-20 sm:h-[28rem] sm:w-[28rem]" />
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.18em] text-rust sm:text-xs sm:tracking-[0.32em]">
            <span className="h-2 w-2 rounded-full bg-rust" />
            Career Log
          </div>
          <h1 className="section-title mt-6 font-[var(--font-display)] text-6xl uppercase leading-none tracking-normal sm:text-7xl lg:text-8xl">
            Experience
          </h1>
          <p className="mt-5 max-w-3xl border-l-4 border-rust pl-4 font-[var(--font-mono)] text-xs uppercase leading-6 tracking-[0.12em] text-warm-grey sm:text-sm sm:leading-7 sm:tracking-[0.22em]">
            12 verified roles across production, academic studios, television, and media education.
          </p>

          <ExperienceGrid experiences={experiences} />
        </div>
      </section>

      <ArchiveFlow
        title="Next: Inspect The Toolkit"
        links={[
          { label: 'Home', href: '/', variant: 'primary' },
          { label: 'About', href: '/about', variant: 'primary' },
          { label: 'Skills', href: '/skills', variant: 'secondary' },
          { label: 'Contact', href: '/contact', variant: 'primary' }
        ]}
      />
    </main>
  );
}
