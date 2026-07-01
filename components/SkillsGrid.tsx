'use client';

import { motion } from 'framer-motion';
import BentoCard from './BentoCard';
import type { SkillItem } from '@/lib/portfolioContent';

const spanPattern = [
  { col: 3, row: 1 },
  { col: 3, row: 1 },
  { col: 2, row: 1 },
  { col: 4, row: 1 },
  { col: 4, row: 1 },
  { col: 2, row: 1 },
  { col: 3, row: 1 },
  { col: 3, row: 1 }
];

export default function SkillsGrid({ skills }: { skills: SkillItem[] }) {
  return (
    <motion.div layout className="bento mt-10 grid auto-rows-fr grid-cols-6 gap-4 sm:mt-12 sm:gap-5">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.id}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="contents"
        >
          <BentoCard
            span={spanPattern[index % spanPattern.length]}
            variant={index % 3 === 2 ? 'rust' : 'ink'}
            yearOrCategory={skill.category}
            title={skill.name}
            description={skill.description}
            href={`/skills/${skill.id}`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
