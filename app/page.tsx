import Marquee from '@/components/Marquee';
import StatCard from '@/components/StatCard';
import CTAButton from '@/components/CTAButton';
import ReelIcon from '@/components/ReelIcon';
import HeroScrollIndicator from '@/components/HeroScrollIndicator';
import TimelineTree from '@/components/TimelineTree';
import AboutStats from '@/components/AboutStats';
import ExperienceGrid from '@/components/ExperienceGrid';
import SkillsGrid from '@/components/SkillsGrid';
import CameraContact from '@/components/CameraContact';
import { fallbackExperiences, fallbackSkills, type ExperienceItem, type SkillItem } from '@/lib/portfolioContent';

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

export default async function HomePage() {
  const [experiences, skills] = await Promise.all([getExperiences(), getSkills()]);

  return (
    <main className="min-h-screen overflow-hidden bg-cream text-ink">
      <div id="hero-sentinel" className="h-1" />
      <Marquee />

      <section className="hero-archive-bg relative min-h-[calc(100svh-42px)] px-4 pb-20 pt-8 sm:px-8 sm:pb-28 lg:px-12">
        <div className="hero-halftone pointer-events-none absolute bottom-0 right-0 h-72 w-72 opacity-25 sm:h-[28rem] sm:w-[28rem]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-ink/20" />
        <div className="mx-auto flex min-h-[calc(100svh-170px)] max-w-7xl flex-col">
          <div className="flex items-start justify-between gap-6">
            <div className="flex min-w-0 items-center gap-3 font-[var(--font-mono)] text-[0.62rem] uppercase leading-5 tracking-[0.16em] text-ink sm:text-xs sm:tracking-[0.32em]">
              <span className="h-2 w-2 shrink-0 rounded-full bg-rust" />
              <span>Production Archive - Est. 1988</span>
            </div>
            <div className="hidden sm:block">
              <ReelIcon size={92} />
            </div>
          </div>

          <div className="grid flex-1 items-end gap-8 pt-12 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-12 lg:pt-10">
            <div className="min-w-0">
              <h1 className="font-[var(--font-display)] text-[clamp(4.3rem,22vw,10.5rem)] uppercase leading-[0.86] tracking-normal">
                VINOD
                <br />
                <span className="text-rust">KUMAR</span>
              </h1>

              <div className="mt-6 max-w-2xl border-l-4 border-rust pl-4 font-[var(--font-mono)] text-[0.7rem] uppercase leading-6 tracking-[0.1em] text-warm-grey sm:mt-8 sm:text-sm sm:leading-7 sm:tracking-[0.24em]">
                <p>Cinematographer - Studio Incharge - Educator</p>
                <p className="mt-2">35+ years on set, behind the camera, and inside the edit suite.</p>
              </div>
            </div>

            <div className="grid max-w-[36rem] grid-cols-1 gap-5 justify-self-start sm:grid-cols-2 lg:max-w-none lg:grid-cols-1 lg:justify-self-end">
              <StatCard num="35+" label="Years in production" tilt={-1.5} variant="ink" />
              <StatCard num="12" label="Career Roles" tilt={1} variant="rust" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <HeroScrollIndicator />
        </div>
      </section>

      <section id="about" className="hero-archive-bg relative overflow-hidden border-t-[3px] border-ink px-4 pb-14 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12">
        <div className="hero-halftone pointer-events-none absolute right-0 top-32 h-72 w-72 opacity-20 sm:h-[28rem] sm:w-[28rem]" />
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.18em] text-rust sm:text-xs sm:tracking-[0.32em]">
            <span className="h-2 w-2 rounded-full bg-rust" />
            Production Archive
          </div>
          <h2 className="section-title mt-6 font-[var(--font-display)] text-6xl uppercase leading-none tracking-normal sm:text-7xl lg:text-8xl">
            The Journey
          </h2>
          <p className="mt-5 max-w-3xl border-l-4 border-rust pl-4 font-[var(--font-mono)] text-xs uppercase leading-6 tracking-[0.12em] text-warm-grey sm:text-sm sm:leading-7 sm:tracking-[0.22em]">
            35+ Years Behind the Lens & Behind the Podium
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton label="Download CV" href="/vinod-kumar-cv.pdf" variant="secondary" download="vinod-kumar-cv.pdf" />
          </div>
        </div>

        <TimelineTree />
      </section>

      <AboutStats />

      <section id="experience" className="hero-archive-bg relative overflow-hidden border-t-[3px] border-ink px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12">
        <div className="hero-halftone pointer-events-none absolute right-0 top-32 h-72 w-72 opacity-20 sm:h-[28rem] sm:w-[28rem]" />
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.18em] text-rust sm:text-xs sm:tracking-[0.32em]">
            <span className="h-2 w-2 rounded-full bg-rust" />
            Career Log
          </div>
          <h2 className="section-title mt-6 font-[var(--font-display)] text-6xl uppercase leading-none tracking-normal sm:text-7xl lg:text-8xl">
            Experience
          </h2>
          <p className="mt-5 max-w-3xl border-l-4 border-rust pl-4 font-[var(--font-mono)] text-xs uppercase leading-6 tracking-[0.12em] text-warm-grey sm:text-sm sm:leading-7 sm:tracking-[0.22em]">
            12 verified roles across production, academic studios, television, and media education.
          </p>

          <ExperienceGrid experiences={experiences} />
        </div>
      </section>

      <section id="skills" className="hero-archive-bg relative overflow-hidden border-t-[3px] border-ink px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12">
        <div className="hero-halftone pointer-events-none absolute right-0 top-32 h-72 w-72 opacity-20 sm:h-[28rem] sm:w-[28rem]" />
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.18em] text-rust sm:text-xs sm:tracking-[0.32em]">
            <span className="h-2 w-2 rounded-full bg-rust" />
            Production Toolkit
          </div>
          <h2 className="section-title mt-6 font-[var(--font-display)] text-6xl uppercase leading-none tracking-normal sm:text-7xl lg:text-8xl">
            Skills
          </h2>
          <p className="mt-5 max-w-3xl border-l-4 border-rust pl-4 font-[var(--font-mono)] text-xs uppercase leading-6 tracking-[0.12em] text-warm-grey sm:text-sm sm:leading-7 sm:tracking-[0.22em]">
            8 verified professional skills spanning camera, darkroom, editing, repair, and studio craft.
          </p>

          <SkillsGrid skills={skills} />
        </div>
      </section>

      <section id="contact" className="hero-archive-bg relative overflow-hidden border-t-[3px] border-ink px-4 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12">
        <div className="hero-halftone pointer-events-none absolute right-0 top-32 h-72 w-72 opacity-20 sm:h-[28rem] sm:w-[28rem]" />
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.18em] text-rust sm:text-xs sm:tracking-[0.32em]">
            <span className="h-2 w-2 rounded-full bg-rust" />
            Camera Contact
          </div>
          <h2 className="section-title mt-6 font-[var(--font-display)] text-6xl uppercase leading-none tracking-normal sm:text-7xl lg:text-8xl">
            Contact
          </h2>
          <p className="mt-5 max-w-3xl border-l-4 border-rust pl-4 font-[var(--font-mono)] text-xs uppercase leading-6 tracking-[0.12em] text-warm-grey sm:text-sm sm:leading-7 sm:tracking-[0.22em]">
            Professional inquiries, academic collaborations, media projects, and student queries.
          </p>
        </div>

        <div className="mt-12">
          <CameraContact />
        </div>
      </section>
    </main>
  );
}
