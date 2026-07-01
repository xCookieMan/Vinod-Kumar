'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const timelineEntries = [
  {
    period: '1988 - 1991',
    role: 'Quality Control Inspector',
    organization: 'KONARK TV, Noida'
  },
  {
    period: '1991',
    role: 'In-Charge, Audio Visual Section',
    organization: 'PRIA (Participatory Research in Asia)'
  },
  {
    period: '1993',
    role: 'Technical Incharge',
    organization: 'Angel Audio Visual Studio (TV Production Company)'
  },
  {
    period: '2004',
    role: 'Camera Person',
    organization: 'TEZ Television (Haryana-based TV News Network), Delhi'
  },
  {
    period: '2004',
    role: 'Production Assistant',
    organization: 'RYAN TV, Ryan International School, Rohini'
  },
  {
    period: '2005 - 2006',
    role: 'Studio Assistant & Camera Person',
    organization: 'AV Production Centre, I.P. College for Women, DU'
  },
  {
    period: '2006 - 2013',
    role: 'Studio Incharge',
    organization: 'Jagan Institute of Management & Sciences (JIMS), Rohini'
  },
  {
    period: '2013',
    role: 'Production Manager',
    organization: 'Hindi feature film "Chooda Ek Paratha"'
  },
  {
    period: '2014',
    role: 'Studio Incharge',
    organization: "Lingaya's Lalita Devi Institute (IP University)"
  },
  {
    period: '2014 - March 2020',
    role: 'Assistant Professor',
    organization: 'Madhu Bala Institute of Comm. & Electronic Media (IP University)'
  },
  {
    period: '30 Jan 2022 - April 2022',
    role: 'Assistant Lecturer',
    organization: 'Subharti University, Meerut'
  },
  {
    period: '6 June 2022 - Till Date',
    role: 'Assistant Professor',
    organization: 'Tecnia Institute of Advanced Studies (GGSIP University)'
  }
];

function Connector({ side }: { side: 'left' | 'right' }) {
  const path = side === 'left' ? 'M3 42 C54 42 58 8 112 8' : 'M112 42 C61 42 57 8 3 8';

  return (
    <svg
      viewBox="0 0 115 50"
      className={`absolute top-10 hidden h-12 w-28 text-rust lg:block ${side === 'left' ? 'right-[-7.5rem]' : 'left-[-7.5rem]'}`}
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d={path}
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="6 6"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
    </svg>
  );
}

export default function TimelineTree() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 72%', 'end 72%']
  });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={timelineRef} className="relative mx-auto mt-12 max-w-6xl pb-16 sm:mt-16 sm:pb-20">
      <div className="absolute left-4 top-0 h-full w-3 -translate-x-1/2 overflow-hidden lg:left-1/2">
        <div className="absolute inset-0 [background-image:radial-gradient(circle,var(--ink)_2px,transparent_2px)] [background-size:12px_18px]" />
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-rust"
          style={{ height: '100%', scaleY: spineScale }}
        />
      </div>

        <div className="space-y-8 lg:space-y-2">
        {timelineEntries.map((entry, index) => {
          const side = index % 2 === 0 ? 'left' : 'right';

          return (
            <motion.article
              key={`${entry.period}-${entry.role}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.58 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className={`relative grid min-h-32 grid-cols-[2rem_minmax(0,1fr)] gap-3 sm:min-h-40 sm:gap-4 lg:grid-cols-[1fr_5rem_1fr] lg:gap-8 ${
                side === 'left' ? '' : ''
              }`}
            >
              <div className="relative col-start-1 flex justify-center lg:col-start-2">
                <span className="mt-10 h-5 w-5 rounded-full border-4 border-cream bg-rust shadow-[0_0_0_2px_var(--ink)]" />
              </div>

              <div className={`col-start-2 lg:row-start-1 ${side === 'left' ? 'lg:col-start-1' : 'lg:col-start-3'}`}>
                <div className="relative border border-ink-border bg-ink p-4 text-cream shadow-[5px_5px_0_var(--rust)] sm:p-5 sm:shadow-[6px_6px_0_var(--rust)]">
                  <Connector side={side} />
                  <p className="font-[var(--font-mono)] text-[0.64rem] uppercase leading-5 tracking-[0.16em] text-rust sm:text-[0.68rem] sm:tracking-[0.28em]">
                    {entry.period}
                  </p>
                  <h3 className="mt-3 font-[var(--font-body)] text-lg font-black leading-tight text-cream sm:mt-4 sm:text-xl">
                    {entry.role}
                  </h3>
                  <p className="mt-3 font-[var(--font-body)] text-sm leading-6 text-warm-grey-lt">
                    {entry.organization}
                  </p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative ml-10 mt-12 flex items-center gap-4 sm:ml-11 sm:mt-14 sm:gap-5 lg:ml-0 lg:justify-center"
      >
        <div className="relative grid h-20 w-20 place-items-center rounded-full border-2 border-ink bg-cream shadow-[6px_6px_0_var(--rust)]">
          <div className="absolute inset-4 rounded-full border border-rust" />
          <div className="absolute h-14 w-px bg-ink" />
          <div className="absolute h-px w-14 bg-ink" />
          <div className="h-5 w-5 rounded-full bg-rust" />
        </div>
        <div className="min-w-0">
          <p className="font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.18em] text-rust sm:text-xs sm:tracking-[0.3em]">Present</p>
          <p className="mt-1 font-[var(--font-body)] text-xs font-bold uppercase leading-5 tracking-[0.1em] text-ink sm:text-sm sm:tracking-[0.18em]">
            Tecnia Institute of Advanced Studies
          </p>
        </div>
      </motion.div>
    </div>
  );
}
