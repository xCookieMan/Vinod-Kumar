import Link from 'next/link';
import { notFound } from 'next/navigation';
import Marquee from '@/components/Marquee';
import MediaViewer from '@/components/MediaViewer';
import ArchiveFlow from '@/components/ArchiveFlow';
import { fallbackExperiences, type ExperienceCategory, type ExperienceItem, type MediaItem } from '@/lib/portfolioContent';

export const dynamic = 'force-dynamic';

function descriptionBullets(description: string) {
  return description
    .split(/\n|(?<=\.)\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

async function getExperience(id: string): Promise<ExperienceItem | null> {
  const fallback = fallbackExperiences.find((item) => item.id === id);
  const mongoUri = process.env.MONGODB_URI ?? '';

  if (fallback || (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://'))) {
    return fallback ?? null;
  }

  try {
    const [{ default: dbConnect }, { default: Experience }, mongoose] = await Promise.all([
      import('@/lib/mongodb'),
      import('@/models/Experience'),
      import('mongoose')
    ]);

    await dbConnect();
    const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { order: Number(id.replace('experience-', '')) };
    const doc = (await Experience.findOne(query).lean()) as
      | {
          _id: { toString: () => string };
          title: string;
          organization: string;
          yearRange: string;
          category: ExperienceCategory;
          description: string;
          order: number;
          media?: MediaItem[];
        }
      | null;

    if (!doc) return fallback ?? null;

    return {
      id: doc._id.toString(),
      title: doc.title,
      organization: doc.organization,
      yearRange: doc.yearRange,
      category: doc.category,
      description: doc.description,
      order: doc.order,
      media: doc.media ?? []
    };
  } catch (error) {
    console.error('Using fallback experience detail:', error);
    return fallback ?? null;
  }
}

export default async function ExperienceDetailPage({ params }: { params: { id: string } }) {
  const experience = await getExperience(params.id);

  if (!experience) notFound();

  return (
    <main className="min-h-screen bg-cream text-ink">
      <div id="hero-sentinel" className="h-1" />
      <Marquee />

      <section className="hero-archive-bg relative overflow-hidden px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12">
        <div className="hero-halftone pointer-events-none absolute right-0 top-32 h-72 w-72 opacity-20 sm:h-[28rem] sm:w-[28rem]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:gap-14">
          <aside>
            <Link href="/experience" className="font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.16em] text-rust hover:text-ink sm:text-xs sm:tracking-[0.28em]">
              ← Back to Career Log
            </Link>
            <div className="mt-7 inline-flex border border-ink bg-rust px-3 py-2 font-[var(--font-mono)] text-[0.64rem] uppercase leading-5 tracking-[0.14em] text-cream shadow-[4px_4px_0_var(--ink)] sm:mt-8 sm:text-[0.68rem] sm:tracking-[0.24em]">
              {experience.yearRange} / {experience.category}
            </div>
            <h1 className="section-title mt-7 font-[var(--font-display)] text-6xl uppercase leading-none tracking-normal sm:text-7xl">
              {experience.title}
            </h1>
            <p className="mt-5 border-l-4 border-rust pl-4 font-[var(--font-body)] text-base font-bold leading-7 text-warm-grey sm:text-lg">
              {experience.organization}
            </p>
            <div className="mt-7 space-y-4 sm:mt-8">
              {descriptionBullets(experience.description).map((line) => (
                <p key={line} className="font-[var(--font-body)] text-sm leading-7 text-ink">
                  <span className="mr-3 font-[var(--font-mono)] text-rust">→</span>
                  {line}
                </p>
              ))}
            </div>
          </aside>

          <MediaViewer media={experience.media} />
        </div>
      </section>

      <ArchiveFlow
        title="Keep Moving Through The Archive"
        links={[
          { label: 'All Experience', href: '/experience', variant: 'secondary' },
          { label: 'Skills', href: '/skills', variant: 'primary' },
          { label: 'Home', href: '/', variant: 'primary' },
          { label: 'Contact', href: '/contact', variant: 'secondary' }
        ]}
      />
    </main>
  );
}
