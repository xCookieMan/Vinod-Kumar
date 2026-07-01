'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Camera, Film, Images, Music, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { MediaItem } from '@/lib/portfolioContent';

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

function mediaIcon(type: MediaItem['type']) {
  if (type === 'image') return <Images size={18} aria-hidden="true" />;
  if (type === 'video') return <Film size={18} aria-hidden="true" />;
  return <Music size={18} aria-hidden="true" />;
}

function MediaPreview({ item, saveData }: { item: MediaItem; saveData: boolean }) {
  if (item.type === 'image') {
    return <Image src={item.url} alt={item.label} fill sizes="(min-width: 1024px) 62vw, 100vw" className="object-cover" />;
  }

  if (item.type === 'video') {
    return (
      <video
        src={item.url}
        controls
        preload={saveData ? 'none' : 'metadata'}
        poster={item.posterUrl}
        className="h-full w-full bg-ink object-contain"
        aria-label={item.label}
      />
    );
  }

  return (
    <div className="grid h-full w-full place-items-center bg-ink p-4 text-cream sm:p-8">
      <div className="w-full max-w-lg border border-cream/25 bg-ink-soft p-4 shadow-[5px_5px_0_var(--rust)] sm:p-6 sm:shadow-[6px_6px_0_var(--rust)]">
        <div className="flex items-center gap-3 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.16em] text-rust sm:text-xs sm:tracking-[0.28em]">
          <Music size={20} aria-hidden="true" />
          Audio Archive
        </div>
        <p className="mt-5 font-[var(--font-body)] text-lg font-bold">{item.label}</p>
        <audio src={item.url} controls className="mt-6 w-full" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="relative grid min-h-[20rem] place-items-center overflow-hidden border border-ink-border bg-ink text-cream shadow-[5px_5px_0_var(--rust)] sm:min-h-[28rem] sm:shadow-[6px_6px_0_var(--rust)]">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_30px,rgba(236,231,218,0.04)_30px,rgba(236,231,218,0.04)_31px)]" />
      <div className="absolute bottom-0 right-0 h-56 w-56 opacity-25 [background-image:radial-gradient(circle,var(--rust)_1.5px,transparent_1.5px)] [background-size:10px_10px]" />
      <div className="relative text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border-2 border-cream bg-ink-soft shadow-[6px_6px_0_var(--rust)]">
          <Camera size={42} aria-hidden="true" />
        </div>
        <p className="mt-7 font-[var(--font-display)] text-[2.7rem] uppercase leading-none sm:text-5xl">Media Archive</p>
        <p className="mt-3 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.16em] text-warm-grey-lt sm:text-xs sm:tracking-[0.28em]">
          Coming Soon
        </p>
      </div>
    </div>
  );
}

export default function MediaViewer({ media }: { media: MediaItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const visibleThumbs = useMemo(() => media.slice(0, 6), [media]);
  const activeMedia = media[activeIndex];
  const hiddenCount = Math.max(media.length - 6, 0);

  useEffect(() => {
    setSaveData(Boolean((navigator as NavigatorWithConnection).connection?.saveData));
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModalOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [modalOpen]);

  if (media.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className="relative min-h-[20rem] overflow-hidden border border-ink-border bg-ink shadow-[5px_5px_0_var(--rust)] sm:min-h-[28rem] sm:shadow-[6px_6px_0_var(--rust)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeMedia.url}-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <MediaPreview item={activeMedia} saveData={saveData} />
          </motion.div>
        </AnimatePresence>
        <div className="absolute left-3 right-3 top-3 bg-cream px-3 py-2 font-[var(--font-mono)] text-[0.62rem] uppercase leading-5 tracking-[0.14em] text-ink sm:left-4 sm:right-auto sm:top-4 sm:text-[0.65rem] sm:tracking-[0.22em]">
          {activeMedia.label}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4">
        {visibleThumbs.map((item, index) => {
          const isMoreBox = index === 5 && hiddenCount > 0;

          return (
            <button
              key={`${item.url}-${index}`}
              type="button"
              onClick={() => (isMoreBox ? setModalOpen(true) : setActiveIndex(index))}
              aria-label={isMoreBox ? `Open complete gallery, ${hiddenCount} more items` : `Show media: ${item.label}`}
              aria-pressed={!isMoreBox && activeIndex === index}
              className={`relative min-h-24 overflow-hidden border p-4 text-left transition sm:min-h-28 ${
                activeIndex === index ? 'border-rust bg-rust text-cream' : 'border-ink-border bg-cream text-ink hover:bg-ink hover:text-cream'
              }`}
            >
              <div className="flex items-center gap-2 font-[var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] sm:text-[0.65rem] sm:tracking-[0.2em]">
                {mediaIcon(item.type)}
                {item.type}
              </div>
              <p className="mt-5 line-clamp-2 font-[var(--font-body)] text-sm font-bold">{item.label}</p>
              {isMoreBox && (
                <div className="absolute inset-0 grid place-items-center bg-ink/85 font-[var(--font-display)] text-5xl uppercase text-cream">
                  +{hiddenCount}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/90 p-4 text-cream sm:p-5" role="dialog" aria-modal="true" aria-labelledby="media-gallery-title">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between gap-4 border-b border-cream/20 pb-5">
              <p id="media-gallery-title" className="font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.16em] text-rust sm:text-xs sm:tracking-[0.3em]">Complete Gallery</p>
              <button type="button" onClick={() => setModalOpen(false)} className="grid h-11 w-11 place-items-center border border-cream/30 focus:outline-none focus:ring-2 focus:ring-cream">
                <X size={20} aria-hidden="true" />
                <span className="sr-only">Close gallery</span>
              </button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {media.map((item, index) => (
                <button
                  key={`${item.url}-modal-${index}`}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    setModalOpen(false);
                  }}
                  aria-label={`Show media: ${item.label}`}
                  className="border border-cream/20 bg-ink-soft p-4 text-left hover:border-rust focus:outline-none focus:ring-2 focus:ring-cream"
                >
                  <div className="flex items-center gap-2 font-[var(--font-mono)] text-[0.65rem] uppercase tracking-[0.2em] text-rust">
                    {mediaIcon(item.type)}
                    {item.type}
                  </div>
                  <p className="mt-4 font-[var(--font-body)] text-sm font-bold">{item.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
