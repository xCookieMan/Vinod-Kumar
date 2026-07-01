import Link from 'next/link';
import { notFound } from 'next/navigation';
import Marquee from '@/components/Marquee';
import MediaViewer from '@/components/MediaViewer';
import ArchiveFlow from '@/components/ArchiveFlow';
import { fallbackSkills, type MediaItem, type SkillItem } from '@/lib/portfolioContent';

export const dynamic = 'force-dynamic';

function descriptionBullets(description: string) {
  return description
    .split(/\n|(?<=\.)\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

async function getSkill(id: string): Promise<SkillItem | null> {
  const fallback = fallbackSkills.find((item) => item.id === id);
  const mongoUri = process.env.MONGODB_URI ?? '';

  if (fallback || (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://'))) {
    return fallback ?? null;
  }

  try {
    const [{ default: dbConnect }, { default: Skill }, mongoose] = await Promise.all([
      import('@/lib/mongodb'),
      import('@/models/Skill'),
      import('mongoose')
    ]);

    await dbConnect();
    const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : null;
    const doc = query
      ? ((await Skill.findOne(query).lean()) as
          | {
              _id: { toString: () => string };
              name: string;
              category: string;
              icon: string;
              description: string;
              media?: MediaItem[];
            }
          | null)
      : null;

    if (!doc) return fallback ?? null;

    return {
      id: doc._id.toString(),
      name: doc.name,
      category: doc.category,
      icon: doc.icon,
      description: doc.description,
      media: doc.media ?? []
    };
  } catch (error) {
    console.error('Using fallback skill detail:', error);
    return fallback ?? null;
  }
}

export default async function SkillDetailPage({ params }: { params: { id: string } }) {
  const skill = await getSkill(params.id);

  if (!skill) notFound();

  return (
    <main className="min-h-screen bg-cream text-ink">
      <div id="hero-sentinel" className="h-1" />
      <Marquee />

      <section className="hero-archive-bg relative overflow-hidden px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12">
        <div className="hero-halftone pointer-events-none absolute right-0 top-32 h-72 w-72 opacity-20 sm:h-[28rem] sm:w-[28rem]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:gap-14">
          <aside>
            <Link href="/skills" className="font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.16em] text-rust hover:text-ink sm:text-xs sm:tracking-[0.28em]">
              ← Back to Skills
            </Link>
            <div className="mt-7 inline-flex border border-ink bg-rust px-3 py-2 font-[var(--font-mono)] text-[0.64rem] uppercase leading-5 tracking-[0.14em] text-cream shadow-[4px_4px_0_var(--ink)] sm:mt-8 sm:text-[0.68rem] sm:tracking-[0.24em]">
              {skill.category}
            </div>
            <h1 className="section-title mt-7 font-[var(--font-display)] text-5xl uppercase leading-none tracking-normal sm:text-6xl">
              {skill.name}
            </h1>
            <p className="mt-5 border-l-4 border-rust pl-4 font-[var(--font-body)] text-base font-bold leading-7 text-warm-grey sm:text-lg">
              Production toolkit / {skill.icon}
            </p>
            <div className="mt-7 space-y-4 sm:mt-8">
              {descriptionBullets(skill.description).map((line) => (
                <p key={line} className="font-[var(--font-body)] text-sm leading-7 text-ink">
                  <span className="mr-3 font-[var(--font-mono)] text-rust">→</span>
                  {line}
                </p>
              ))}
            </div>
          </aside>

          <MediaViewer media={skill.media} />
        </div>
      </section>

      <ArchiveFlow
        title="Keep Moving Through The Archive"
        links={[
          { label: 'All Skills', href: '/skills', variant: 'secondary' },
          { label: 'Experience', href: '/experience', variant: 'primary' },
          { label: 'Home', href: '/', variant: 'primary' },
          { label: 'Contact', href: '/contact', variant: 'secondary' }
        ]}
      />
    </main>
  );
}
