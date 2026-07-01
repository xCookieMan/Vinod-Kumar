import Marquee from '@/components/Marquee';
import SkillsGrid from '@/components/SkillsGrid';
import ArchiveFlow from '@/components/ArchiveFlow';
import { fallbackSkills, type SkillItem } from '@/lib/portfolioContent';

export const dynamic = 'force-dynamic';

async function getSkills(): Promise<SkillItem[]> {
  const mongoUri = process.env.MONGODB_URI ?? '';
  if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
    return fallbackSkills;
  }

  try {
    const [{ default: dbConnect }, { default: Skill }] = await Promise.all([
      import('@/lib/mongodb'),
      import('@/models/Skill')
    ]);

    await dbConnect();
    const docs = await Skill.find({}).lean();

    if (!docs.length) return fallbackSkills;

    return docs.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name,
      category: doc.category,
      icon: doc.icon,
      description: doc.description,
      media: doc.media ?? []
    }));
  } catch (error) {
    console.error('Using fallback skill data:', error);
    return fallbackSkills;
  }
}

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <main className="min-h-screen bg-cream text-ink">
      <div id="hero-sentinel" className="h-1" />
      <Marquee />

      <section className="hero-archive-bg relative overflow-hidden px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12">
        <div className="hero-halftone pointer-events-none absolute right-0 top-32 h-72 w-72 opacity-20 sm:h-[28rem] sm:w-[28rem]" />
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.18em] text-rust sm:text-xs sm:tracking-[0.32em]">
            <span className="h-2 w-2 rounded-full bg-rust" />
            Production Toolkit
          </div>
          <h1 className="section-title mt-6 font-[var(--font-display)] text-6xl uppercase leading-none tracking-normal sm:text-7xl lg:text-8xl">
            Skills
          </h1>
          <p className="mt-5 max-w-3xl border-l-4 border-rust pl-4 font-[var(--font-mono)] text-xs uppercase leading-6 tracking-[0.12em] text-warm-grey sm:text-sm sm:leading-7 sm:tracking-[0.22em]">
            8 verified professional skills spanning camera, darkroom, editing, repair, and studio craft.
          </p>

          <SkillsGrid skills={skills} />
        </div>
      </section>

      <ArchiveFlow
        title="Archive Loop Complete"
        links={[
          { label: 'Home', href: '/', variant: 'primary' },
          { label: 'About', href: '/about', variant: 'primary' },
          { label: 'Experience', href: '/experience', variant: 'secondary' },
          { label: 'Contact', href: '/contact', variant: 'primary' }
        ]}
      />
    </main>
  );
}
