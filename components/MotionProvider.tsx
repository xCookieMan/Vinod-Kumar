'use client';

import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';

function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    setEnabled(!prefersReduced && canHover);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    const brackets = bracketsRef.current;
    if (!ring || !brackets) return;

    let active = false;
    let visible = false;

    const moveCursor = (event: PointerEvent) => {
      visible = true;
      const target = event.target instanceof Element ? event.target : null;
      active = Boolean(target?.closest('a, button, input, textarea, select, [role="button"]'));

      const x = event.clientX;
      const y = event.clientY;
      const ringScale = active ? 0.62 : 1;
      const bracketScale = active ? 0.78 : 1.12;

      gsap.to(ring, {
        x,
        y,
        scale: ringScale,
        opacity: 1,
        duration: 0.22,
        ease: 'power3.out'
      });
      gsap.to(brackets, {
        x,
        y,
        scale: bracketScale,
        opacity: active ? 1 : 0.62,
        rotate: active ? 0 : -6,
        duration: 0.28,
        ease: 'power3.out'
      });
    };

    const hideCursor = () => {
      if (!visible) return;
      visible = false;
      gsap.to([ring, brackets], { opacity: 0, duration: 0.18, ease: 'power2.out' });
    };

    window.addEventListener('pointermove', moveCursor);
    document.addEventListener('pointerleave', hideCursor);

    return () => {
      window.removeEventListener('pointermove', moveCursor);
      document.removeEventListener('pointerleave', hideCursor);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-rust opacity-0 mix-blend-multiply"
        aria-hidden="true"
      />
      <div
        ref={bracketsRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 -translate-x-1/2 -translate-y-1/2 opacity-0"
        aria-hidden="true"
      >
        <span className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-ink" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-ink" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-ink" />
        <span className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-ink" />
      </div>
    </>
  );
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [blinkKey, setBlinkKey] = useState(0);
  const previousPath = useRef(pathname);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.globalTimeline.pause();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    window.requestAnimationFrame(() => {
      if (hash) {
        document.querySelector(hash)?.scrollIntoView({ block: 'start' });
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
  }, [pathname]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.section-title').forEach((title) => {
        gsap.from(title, {
          scrollTrigger: { trigger: title, start: 'top 80%', once: true },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

    });

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [pathname]);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      setBlinkKey((key) => key + 1);
    }
  }, [pathname]);

  return (
    <>
      {children}
      <CustomCursor />
      <AnimatePresence>
        {blinkKey > 0 && (
          <motion.div
            key={blinkKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, times: [0, 0.5, 1], ease: 'easeOut' }}
            className="pointer-events-none fixed inset-0 z-[60] bg-cream"
          />
        )}
      </AnimatePresence>
    </>
  );
}
