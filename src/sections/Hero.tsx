import { motion } from 'framer-motion'
import { profile } from '@/data/profile'

export function Hero() {
  return (
    <section
      className="relative min-h-[96vh]"
      style={{ isolation: 'isolate' }}
    >
      <div className="relative container-page h-full flex flex-col min-h-[96vh] pt-10 md:pt-14 pb-16 text-[var(--color-ink)]">
        {/* Swiss masthead rail — matches the `NN — Section` pattern used in About/Work */}
        <div className="grid grid-cols-12 gap-6 items-center">
          <p className="eyebrow col-span-6 md:col-span-2 !text-[var(--color-ink)]">00 — Index</p>
          <div className="hidden md:block md:col-span-7 h-px bg-[var(--color-ink)]" />
          <span className="eyebrow col-span-6 md:col-span-3 text-right md:text-right !text-[var(--color-ink)]">
            {profile.location} / 37.87°N
          </span>
        </div>

        {/* Title — SVG glyph paths generated at runtime from Monument Extended,
            morphs letter shapes between routes. See [[components/MorphingTitle]]. */}
        <div className="relative w-full flex-1 flex flex-col justify-center">
          <motion.h1
            layoutId="page-title"
            layout="preserve-aspect"
            initial={false}
            transition={{ type: 'spring', stiffness: 230, damping: 30, mass: 0.9 }}
            className="morph-opaque font-display font-normal uppercase text-[clamp(3.5rem,15vw,14rem)] select-none tracking-[-0.01em] text-[var(--color-ink)] block w-fit mx-auto text-left"
            style={{ lineHeight: 0.85, transform: 'translateZ(0)' }}
          >
            Aiden<span className="text-[var(--color-accent)]">.</span>
            <br />
            Tran<span className="text-[var(--color-accent)]">.</span>
          </motion.h1>

          {/* Resume download */}
          <div className="mt-6 md:mt-8">
            <a
              href="https://github.com/AidenTran900/resume/releases/latest/download/Aiden_Tran_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--color-ink)] px-5 py-2.5 font-display text-sm font-medium uppercase tracking-widest text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)]"
            >
              <span>↓</span>
              <span>Resume</span>
            </a>
          </div>

          {/* Hairline rule — shared across routes for a continuous-frame morph */}
          <motion.div
            layoutId="page-header-rail"
            transition={{ type: 'spring', stiffness: 230, damping: 30, mass: 0.9 }}
            className="morph-opaque mt-8 md:mt-10 h-px bg-[var(--color-ink)]"
          />

          {/* Tagline + meta row */}
          <div className="mt-5 md:mt-6 grid grid-cols-12 gap-6 items-end">
            <p className="col-span-12 md:col-span-7 font-display text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-[var(--color-ink)]">
              {profile.tagline}
            </p>
            <div className="col-span-12 md:col-span-5 flex flex-col gap-1 md:items-end">
              <span className="eyebrow !text-[var(--color-ink)]">
                <span className="text-[var(--color-accent)]">→ </span>Currently
              </span>
              <span className="font-display font-medium text-sm md:text-base text-[var(--color-ink)]">
                CS @ UC Berkeley · open to internships
              </span>
            </div>
          </div>
        </div>

        {/* Bottom rail */}
        <div className="border-t border-[var(--color-ink)] pt-3 flex items-center justify-between">
          <span className="eyebrow !text-[var(--color-ink)]">
            <span className="text-[var(--color-accent)]">↓ </span>Scroll
          </span>
          <span className="eyebrow !text-[var(--color-ink)] hidden md:inline">01 / 03</span>
        </div>
      </div>
    </section>
  )
}
