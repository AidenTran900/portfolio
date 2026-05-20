import { motion } from 'framer-motion'
import { profile } from '@/data/profile'

/* ── Inline SVG social icons ─────────────────────────────────────────────── */
function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

/* ── Scroll-arrow conveyor belt ─────────────────────────────────────── */
const BELT_COUNT    = 4          // arrows in flight at any one time
const BELT_DURATION = 5        // seconds per full cycle
const CONTAINER_H   = 96         // visible height of the belt (px)
const ARROW_W       = 150        // display width of each arrow glyph (px)
const ARROW_H       = Math.round(ARROW_W * 204 / 521) // ≈ 102 px — preserves aspect ratio

function ScrollArrowBelt() {
  return (
    <>
      {/*
        Each arrow travels translateY 0 → CONTAINER_H while scaleY 1 → 0.
        transform-origin: top center anchors the top edge so the glyph
        "melts" downward as it descends.
        Negative animationDelay pre-seeds each arrow at a different phase
        so the belt is already in motion on first paint.
      */}
      <style>{`
        @keyframes scroll-arrow-fall {
          /* eslint-disable */
          0%   { transform: translateY(0px)               scaleY(0); }
          100% { transform: translateY(${CONTAINER_H}px)  scaleY(1); }
          /* eslint-enable */
        }
      `}</style>

      {/* Outer wrapper: centres the belt */}
      <div className="flex justify-center w-full">
        {/* Stacking context: arrows behind, "Scroll" label on top */}
        <div className="relative" style={{ width: ARROW_W, height: CONTAINER_H }}>

          {/* Arrows — faded and masked */}
          <div
            className="absolute inset-0 overflow-hidden text-[var(--color-ink)]"
            aria-hidden="true"
            style={{
              opacity: 0.2,
              maskImage:       'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
            }}
          >
            {Array.from({ length: BELT_COUNT }).map((_, i) => (
              <div
                key={i}
                style={{
                  position:        'absolute',
                  top:             0,
                  left:            0,
                  width:           ARROW_W,
                  height:          ARROW_H,
                  transformOrigin: 'top center',
                  animation:       `scroll-arrow-fall ${BELT_DURATION}s linear infinite`,
                  animationDelay:  `-${((i * BELT_DURATION) / BELT_COUNT).toFixed(3)}s`,
                }}
              >
                {/* Inline SVG — stroke="currentColor" inherits the ink token */}
                <svg
                  viewBox="0 0 521 204"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width={ARROW_W}
                  height={ARROW_H}
                >
                  <path
                    d="M512.684 90.0848L260.342 195.325L8 90.0848V11.9168L260.342 115.16L512.684 11.9168V90.0848Z"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                  />
                </svg>
              </div>
            ))}
          </div>

          {/* "Scroll" label — centred over the arrows at full opacity */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="eyebrow !text-[var(--color-ink)]">Scroll</span>
          </div>

        </div>
      </div>
    </>
  )
}

export function Hero() {
  return (
    <section
      className="relative min-h-[96vh]"
      style={{ isolation: 'isolate' }}
    >
      <div className="relative container-page h-full flex flex-col min-h-[90vh] pt-10 md:pt-14 pb-16 text-[var(--color-ink)]">
        {/* Title — SVG glyph paths generated at runtime from Monument Extended,
            morphs letter shapes between routes. See [[components/MorphingTitle]]. */}
        <div className="relative w-full flex-1 flex flex-col justify-center pt-16 md:pt-24">
          {/* Swiss masthead rail — sits flush above the title */}
          <div className="hidden md:grid grid-cols-12 gap-6 items-center mb-20">
            <p className="eyebrow col-span-6 md:col-span-2 !text-[var(--color-ink)]">00 — Index</p>
            <div className="hidden md:block md:col-span-7 h-px bg-[var(--color-ink)]" />
            <span className="eyebrow col-span-6 md:col-span-3 text-right md:text-right !text-[var(--color-ink)]">
              {profile.location} / 37.87°N
            </span>
          </div>

          <motion.h1
            layoutId="page-title"
            layout="preserve-aspect"
            initial={false}
            transition={{ type: 'spring', stiffness: 230, damping: 30, mass: 0.9 }}
            className="morph-opaque font-display font-normal uppercase text-[clamp(3.5rem,20vw,14rem)] select-none tracking-[-0.01em] text-[var(--color-ink)] block w-fit mx-auto text-left"
            style={{ lineHeight: 0.85, transform: 'translateZ(0)' }}
          >
            Aiden<span className="text-[var(--color-accent)]">.</span>
            <br />
            Tran<span className="text-[var(--color-accent)]">.</span>
          </motion.h1>

          {/* Resume download + social icons */}
          <div className="mt-6 md:mt-8 flex items-center justify-center md:justify-between">
            <a
              href="https://github.com/AidenTran900/resume/releases/latest/download/Aiden_Tran_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--color-ink)] px-5 py-2.5 font-display text-sm font-medium uppercase tracking-widest text-[var(--color-ink)] transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)]"
            >
              <span>↓</span>
              <span>Resume</span>
            </a>

            {/* Social icons — desktop only (mobile has them in the menu) */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[var(--color-muted-strong)] hover:text-[var(--color-ink)] transition-colors"
              >
                <GitHubIcon size={40} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[var(--color-muted-strong)] hover:text-[var(--color-ink)] transition-colors"
              >
                <LinkedInIcon size={40} />
              </a>
            </div>
          </div>

          {/* Hairline rule — shared across routes for a continuous-frame morph */}
          <motion.div
            layoutId="page-header-rail"
            transition={{ type: 'spring', stiffness: 230, damping: 30, mass: 0.9 }}
            className="morph-opaque mt-8 md:mt-10 h-px bg-[var(--color-ink)]"
          />

          {/* Tagline + meta row */}
          <div className="mt-5 md:mt-6 grid grid-cols-12 gap-6 items-end">
            <p className="col-span-12 md:col-span-7 font-display text-sm md:text-2xl lg:text-3xl font-medium tracking-tight text-[var(--color-ink)] text-center md:text-left">
              {profile.tagline}
            </p>
            <div className="col-span-12 md:col-span-5 flex flex-col gap-1 items-center md:items-end">
              <span className="eyebrow !text-[var(--color-ink)]">
                <span className="text-[var(--color-accent)]">→ </span>Currently
              </span>
              <span className="font-display font-medium text-sm md:text-base text-[var(--color-ink)]">
                CS @ UC Berkeley · open to internships
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Belt — absolutely positioned so it overlays the bottom of the hero
          without participating in flex layout or compressing the title area */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <ScrollArrowBelt />
      </div>
    </section>
  )
}
