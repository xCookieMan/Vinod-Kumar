'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import BentoCard from './BentoCard';
import type { ExperienceCategory, ExperienceItem } from '@/lib/portfolioContent';

const filters = ['All', 'Academic', 'Production', 'Freelance'] as const;
type Filter = (typeof filters)[number];

const spanPattern = [
  { col: 3, row: 1 },
  { col: 3, row: 1 },
  { col: 2, row: 1 },
  { col: 4, row: 1 },
  { col: 4, row: 1 },
  { col: 2, row: 1 }
];

export default function ExperienceGrid({ experiences }: { experiences: ExperienceItem[] }) {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const counts = useMemo(() => {
    return experiences.reduce<Record<Filter, number>>(
      (acc, item) => {
        acc.All += 1;
        acc[item.category as ExperienceCategory] += 1;
        return acc;
      },
      { All: 0, Academic: 0, Production: 0, Freelance: 0 }
    );
  }, [experiences]);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return experiences;
    return experiences.filter((item) => item.category === activeFilter);
  }, [activeFilter, experiences]);

  return (
    <div className="mt-10 sm:mt-12">
      <div className="flex gap-3 overflow-x-auto border-b border-ink/20 pb-4 sm:flex-wrap sm:gap-x-7 sm:gap-y-4">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`relative shrink-0 border border-ink/15 px-3 py-2 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.16em] transition sm:border-0 sm:px-0 sm:py-0 sm:text-xs sm:tracking-[0.28em] ${
              activeFilter === filter ? 'text-ink' : 'text-warm-grey hover:text-ink'
            }`}
          >
            {filter} <span className="tracking-normal">({counts[filter]})</span>
            {activeFilter === filter && (
              <motion.span layoutId="experience-filter-underline" className="absolute -bottom-[1.1rem] left-0 h-[3px] w-full bg-rust" />
            )}
          </button>
        ))}
      </div>

      <motion.div layout className="bento mt-8 grid auto-rows-fr grid-cols-6 gap-4 sm:mt-10 sm:gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="contents"
            >
              <BentoCard
                span={spanPattern[index % spanPattern.length]}
                variant={index % 3 === 1 ? 'rust' : 'ink'}
                yearOrCategory={`${item.yearRange} / ${item.category}`}
                title={item.title}
                description={`${item.organization}. ${item.description}`}
                href={`/experience/${item.id}`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
