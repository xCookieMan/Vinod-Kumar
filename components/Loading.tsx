'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import ReelIcon from './ReelIcon';

const letters = ['V', 'I', 'N', 'O', 'D'];
const letters2 = ['K', 'U', 'M', 'A', 'R'];
const leaderNumbers = ['3', '2', '1'];

export default function Loading() {
  const [show, setShow] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(false), shouldReduceMotion ? 700 : 3200);
    return () => window.clearTimeout(timer);
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.12 : 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-ink text-cream"
          role="status"
          aria-live="polite"
          aria-label="Loading Vinod Kumar portfolio"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { clipPath: 'inset(0 0 0 0)' }}
            exit={shouldReduceMotion ? undefined : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-ink"
          />
          <div className="absolute inset-0 overflow-hidden bg-[repeating-linear-gradient(135deg,transparent,transparent_38px,rgba(236,231,218,0.035)_38px,rgba(236,231,218,0.035)_39px)]" />
          <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(236,231,218,0.18)_1px,transparent_1px)] [background-size:100%_8px]" />
          <motion.div
            initial={shouldReduceMotion ? false : { x: '-120%' }}
            animate={shouldReduceMotion ? undefined : { x: '120%' }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-12deg] bg-cream/5 blur-sm"
          />

          <button
            type="button"
            onClick={() => setShow(false)}
            className="absolute right-4 top-4 z-10 border border-cream/35 bg-ink/80 px-3 py-2 font-[var(--font-mono)] text-[0.65rem] uppercase tracking-[0.24em] text-cream transition hover:border-rust hover:text-rust focus:outline-none focus:ring-2 focus:ring-cream sm:right-6 sm:top-6"
          >
            Skip
          </button>

          <div className="absolute left-4 top-4 z-10 hidden font-[var(--font-mono)] text-[0.65rem] uppercase tracking-[0.28em] text-cream/70 sm:block">
            Production Archive / Est. 1988
          </div>

          <div className="relative flex w-full max-w-4xl flex-col items-center px-5 text-center">
            <div className="relative grid h-[18rem] w-[18rem] place-items-center sm:h-[24rem] sm:w-[24rem]">
              <div className="absolute inset-0 rounded-full border border-cream/20" />
              <div className="absolute inset-8 rounded-full border border-cream/15" />
              <motion.div
                initial={shouldReduceMotion ? false : { rotate: 0 }}
                animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-[14px] border-dashed border-cream/10"
              />
              <motion.div
                initial={shouldReduceMotion ? false : { scale: 0.86, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
                className="relative z-10 grid place-items-center"
              >
                <Logo variant="cream-on-ink" size={shouldReduceMotion ? 138 : 162} className="brightness-0 invert" />
              </motion.div>

              {!shouldReduceMotion && (
                <div className="absolute inset-0 grid place-items-center">
                  {leaderNumbers.map((number, index) => (
                    <motion.span
                      key={number}
                      initial={{ opacity: 0, scale: 1.35 }}
                      animate={{ opacity: [0, 0.85, 0], scale: [1.35, 1, 0.82] }}
                      transition={{ delay: 0.35 + index * 0.54, duration: 0.52, ease: 'easeOut' }}
                      className="absolute font-[var(--font-display)] text-[11rem] uppercase leading-none text-cream/10 sm:text-[15rem]"
                    >
                      {number}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>

            <div className="-mt-6 flex flex-col items-center gap-5 sm:-mt-8">
              <div className="flex items-center gap-3 border border-cream/25 bg-ink-soft px-4 py-3 shadow-[4px_4px_0_var(--rust)]">
                <span className="h-2 w-2 rounded-full bg-rust" />
                <span className="font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.28em] text-cream/80">
                  Loading Career Reel
                </span>
              </div>

              <div className="flex flex-col items-center gap-5 sm:flex-row">
                <div className="text-cream">
                  <ReelIcon size={68} tone="light" />
                </div>
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
                  {letters.map((letter, index) => (
                    <motion.span
                      key={`${letter}-${index}`}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.45 + index * 0.045, duration: 0.25 }}
                      className="font-[var(--font-display)] text-5xl uppercase leading-none tracking-[0.12em] sm:text-7xl"
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <div className="w-3" />
                  {letters2.map((letter, index) => (
                    <motion.span
                      key={`${letter}-${index}`}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.68 + index * 0.045, duration: 0.25 }}
                      className="font-[var(--font-display)] text-5xl uppercase leading-none tracking-[0.12em] text-rust sm:text-7xl"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="relative mt-1 h-8 w-full max-w-md overflow-hidden border border-cream/35 bg-cream/10 p-1">
                <motion.div
                  initial={shouldReduceMotion ? false : { width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: shouldReduceMotion ? 0 : 2.15, ease: 'easeInOut' }}
                  className="h-full bg-rust [background-image:radial-gradient(circle,var(--ink)_3px,transparent_3px)] [background-size:18px_18px]"
                />
              </div>

              <p className="font-[var(--font-mono)] text-[0.65rem] uppercase tracking-[0.24em] text-cream/60">
                Camera / Studio / Education / Archive
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
