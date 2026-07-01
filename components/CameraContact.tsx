'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Aperture, Mail, MapPin, Phone, Radio, Send, User } from 'lucide-react';

const subjects = [
  'Professional Inquiry',
  'Academic Collaboration',
  'Media Project',
  'Student Query',
  'Other'
];

type Status = 'READY' | 'FOCUSING...' | 'CAPTURED OK' | 'CHECK FIELDS';

export default function CameraContact() {
  const [focused, setFocused] = useState(false);
  const [status, setStatus] = useState<Status>('READY');
  const [subjectIndex, setSubjectIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setFocused(true), 550);
    return () => window.clearTimeout(timer);
  }, []);

  const subject = subjects[subjectIndex];
  const messageLength = form.message.length;
  const dialRotation = useMemo(() => subjectIndex * 34, [subjectIndex]);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    if (status === 'CHECK FIELDS') setStatus('READY');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('FOCUSING...');
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subject })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrors(data.errors ?? { form: 'Please check the fields.' });
        setStatus('CHECK FIELDS');
        return;
      }

      setStatus('CAPTURED OK');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setErrors({ form: 'Unable to send right now.' });
      setStatus('CHECK FIELDS');
    }
  }

  return (
    <div className="relative mx-auto max-w-6xl">
      <form onSubmit={handleSubmit} className="relative overflow-hidden border-[3px] border-ink bg-cream p-4 shadow-[5px_5px_0_var(--rust)] sm:p-8 sm:shadow-[8px_8px_0_var(--rust)] lg:p-10">
        <div className="absolute left-0 top-0 h-8 w-full border-b-[3px] border-ink bg-ink" />
        <div className="relative flex flex-col gap-6 pt-8 sm:gap-8 lg:grid lg:grid-cols-[17rem_minmax(0,1fr)_19rem]">
          <div className="space-y-6">
            <div className="border border-ink bg-ink p-4 text-cream">
              <div className="flex items-center justify-between gap-4">
                <span className="font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.18em] text-rust sm:text-xs sm:tracking-[0.32em]">Viewfinder</span>
                <span className="h-2 w-2 rounded-full bg-rust" />
              </div>
              <p className="mt-4 font-[var(--font-display)] text-[2.35rem] uppercase leading-none sm:text-4xl">{status}</p>
            </div>

            <button
              type="button"
              onClick={() => setFocused((current) => !current)}
              className="group relative mx-auto grid h-40 w-40 place-items-center rounded-full border-[3px] border-ink bg-cream shadow-[5px_5px_0_var(--rust)] focus:outline-none focus:ring-2 focus:ring-rust focus:ring-offset-4 focus:ring-offset-cream sm:h-52 sm:w-52 sm:shadow-[6px_6px_0_var(--rust)]"
              aria-label="Focus lens"
            >
              <motion.div
                animate={{ rotate: focused ? 35 : 0, scale: focused ? 0.88 : 1 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="absolute inset-4 rounded-full border-[13px] border-ink sm:inset-5 sm:border-[18px]"
              />
              <motion.div
                animate={{ rotate: focused ? -45 : 0, scale: focused ? 1.08 : 0.82 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="absolute inset-11 rounded-full border-[8px] border-rust sm:inset-14 sm:border-[10px]"
              />
              <Aperture className="relative h-12 w-12 text-ink transition group-hover:text-rust sm:h-[62px] sm:w-[62px]" aria-hidden="true" />
            </button>

            <div className="border border-ink bg-cream p-4">
              <div className="flex items-center justify-between">
                <p className="font-[var(--font-mono)] text-[0.65rem] uppercase tracking-[0.16em] text-warm-grey sm:text-[0.68rem] sm:tracking-[0.24em]">Mode Dial</p>
                <motion.div animate={{ rotate: dialRotation }} transition={{ duration: 0.25 }} className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-rust text-cream">
                  <Radio size={20} aria-hidden="true" />
                </motion.div>
              </div>
              <div className="mt-4 grid gap-2">
                {subjects.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSubjectIndex(index);
                      setErrors((current) => ({ ...current, subject: '' }));
                    }}
                    aria-pressed={subjectIndex === index}
                    className={`border px-3 py-2 text-left font-[var(--font-mono)] text-[0.62rem] uppercase leading-5 tracking-[0.14em] transition sm:text-[0.65rem] sm:tracking-[0.2em] ${
                      subjectIndex === index ? 'border-rust bg-rust text-cream' : 'border-ink/25 text-ink hover:border-ink'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {focused && (
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 22 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-5"
              >
                <label className="block">
                  <span className="flex items-center gap-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-ink">
                    <User className="shrink-0" size={16} aria-hidden="true" />
                    Full Name
                  </span>
                  <input
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="mt-2 w-full border-2 border-ink bg-cream px-3 py-3 font-[var(--font-body)] text-base outline-none focus:border-rust sm:px-4"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && <p className="mt-2 text-sm font-bold text-rust">{errors.name}</p>}
                </label>

                <label className="block">
                  <span className="flex items-center gap-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-ink">
                    <Mail className="shrink-0" size={16} aria-hidden="true" />
                    Email
                  </span>
                  <input
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className="mt-2 w-full border-2 border-ink bg-cream px-3 py-3 font-[var(--font-body)] text-base outline-none focus:border-rust sm:px-4"
                    autoComplete="email"
                    inputMode="email"
                    type="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <p className="mt-2 text-sm font-bold text-rust">{errors.email}</p>}
                </label>

                <div className="border-2 border-ink bg-ink p-4 text-cream">
                  <p className="font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.16em] text-rust sm:text-xs sm:tracking-[0.24em]">Subject</p>
                  <p className="mt-2 font-[var(--font-display)] text-[2.25rem] uppercase leading-none sm:text-4xl">{subject}</p>
                  {errors.subject && <p className="mt-2 text-sm font-bold text-rust">{errors.subject}</p>}
                </div>

                <label className="block">
                  <span className="font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.16em] text-ink sm:text-xs sm:tracking-[0.24em]">Message</span>
                  <textarea
                    value={form.message}
                    onChange={(event) => updateField('message', event.target.value)}
                    className="mt-2 min-h-36 w-full resize-y border-2 border-ink bg-cream px-3 py-3 font-[var(--font-body)] text-base leading-7 outline-none focus:border-rust sm:min-h-44 sm:px-4"
                    required
                    minLength={20}
                    aria-invalid={Boolean(errors.message)}
                  />
                  <div className="mt-2 flex items-center justify-between gap-4 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.2em] text-warm-grey">
                    <span>{messageLength} chars</span>
                    <span>Min 20</span>
                  </div>
                  {errors.message && <p className="mt-2 text-sm font-bold text-rust">{errors.message}</p>}
                </label>
                {errors.form && <p className="border border-rust bg-rust/10 p-3 text-sm font-bold text-rust">{errors.form}</p>}
                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center border border-ink-border bg-ink px-4 py-3 font-[var(--font-mono)] text-[0.7rem] uppercase tracking-[0.16em] text-cream shadow-[4px_4px_0_var(--rust)] transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-rust focus:ring-offset-4 focus:ring-offset-cream sm:w-auto sm:px-5 sm:text-xs sm:tracking-[0.24em]"
                >
                  Send Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <aside className="relative border border-ink bg-ink p-4 pb-24 text-cream sm:p-5 sm:pb-24 lg:min-h-[38rem]">
            <button
              type="submit"
              className="absolute right-4 top-4 grid h-14 w-14 place-items-center rounded-full border-2 border-cream bg-rust text-cream shadow-[4px_4px_0_var(--cream)] transition active:scale-90 sm:right-5 sm:top-5 sm:h-16 sm:w-16"
              aria-label="Submit contact form"
            >
              <Send size={24} aria-hidden="true" />
            </button>

            <div className="pr-20">
              <p className="font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.18em] text-rust sm:text-xs sm:tracking-[0.3em]">Grip Panel</p>
              <h2 className="mt-4 font-[var(--font-display)] text-[2.75rem] uppercase leading-none sm:text-5xl">Contact</h2>
            </div>

            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <Phone className="mt-1 shrink-0 text-rust" size={20} aria-hidden="true" />
                <p className="font-[var(--font-body)] text-sm leading-6 text-warm-grey-lt">9312612071 / 8826301570</p>
              </div>
              <div className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-rust" size={20} aria-hidden="true" />
                <p className="font-[var(--font-body)] text-sm leading-6 text-warm-grey-lt">6/146, Dakshinpuri Extn., New Delhi - 110062</p>
              </div>
              <div className="flex gap-4">
                <Aperture className="mt-1 shrink-0 text-rust" size={20} aria-hidden="true" />
                <p className="font-[var(--font-body)] text-sm leading-6 text-warm-grey-lt">Assistant Professor, Tecnia Institute of Advanced Studies</p>
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex justify-center gap-4 border-t border-cream/20 pt-5">
              {[Phone, Mail, Radio].map((Icon, index) => (
                <span key={index} className="grid h-10 w-10 place-items-center rounded-full border border-cream/30 text-rust">
                  <Icon size={18} aria-hidden="true" />
                </span>
              ))}
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
