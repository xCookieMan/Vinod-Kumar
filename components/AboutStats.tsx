'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stats = [
  { value: 35, suffix: '+', label: 'Years in production / education', tilt: -1.5 },
  { value: 12, suffix: '', label: 'Career roles / production engagements', tilt: 1 },
  { value: 4, suffix: '', label: 'Academic institutions taught at', tilt: -1 },
  { value: 20, suffix: '+', label: 'Freelance & NGO projects delivered', tilt: 1.5 }
];

export default function AboutStats() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      numberRefs.current.forEach((node, index) => {
        if (!node) return;

        const stat = stats[index];
        const counter = { value: 0 };

        gsap.to(counter, {
          value: stat.value,
          duration: 1.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true
          },
          onUpdate: () => {
            node.textContent = `${Math.round(counter.value)}${stat.suffix}`;
          },
          onComplete: () => {
            node.textContent = `${stat.value}${stat.suffix}`;
          }
        });
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-ink px-4 py-16 text-cream sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-3 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.18em] text-rust sm:mb-10 sm:text-xs sm:tracking-[0.32em]">
          <span className="h-2 w-2 rounded-full bg-rust" />
          Verified Career Stats
        </div>
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative border border-ink-border bg-cream p-5 text-ink shadow-[5px_5px_0_var(--rust)] sm:p-6 sm:shadow-[6px_6px_0_var(--rust)]"
              style={{ transform: `rotate(${stat.tilt}deg)` }}
            >
              <div
                ref={(node) => {
                  numberRefs.current[index] = node;
                }}
                className="font-[var(--font-display)] text-5xl leading-none tracking-normal sm:text-6xl sm:tracking-[0.08em]"
              >
                0{stat.suffix}
              </div>
              <p className="mt-4 font-[var(--font-mono)] text-[0.65rem] uppercase leading-5 tracking-[0.14em] text-warm-grey sm:text-[0.68rem] sm:tracking-[0.24em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
