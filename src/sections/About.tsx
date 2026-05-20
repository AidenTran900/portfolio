import { motion, type Variants } from 'framer-motion'
import { profile } from '@/data/profile'
import { resolveImageUrl } from '@/utils/imageUrl'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.04 + i * 0.06,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  }),
}


const nowFocus = [
  'Custom ML kernels in C++ / CUDA',
  'Rollback netcode & deterministic sim',
  'Real-time graphics + shaders',
  'Berkeley coursework — CS 61C, CS 70',
]

export function About() {
  return (
    <section
      id="about"
      className="relative py-16 md:py-24"
    >
      <div className="container-page relative">
        {/* Index rail — Swiss numbering + hairline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-12 gap-6 items-center mb-10 md:mb-14"
        >
          <p className="eyebrow col-span-3 md:col-span-2 !text-[var(--color-ink)]">01 — About</p>
          <div className="col-span-9 md:col-span-10 h-px bg-[var(--color-ink)]" />
        </motion.div>

        {/* Swiss grid: 7-col headline+body, 5-col contained sky plate */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Left: headline + body */}
          <div className="col-span-12 md:col-span-7">
            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="font-display font-normal uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(2.2rem,6vw,4.75rem)] mb-8 md:mb-12 text-[var(--color-ink)]"
            >
              Systems-Minded.
              <br />
              <span className="text-[var(--color-accent)]">Craft-Obsessed.</span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="max-w-[52ch] space-y-4 text-[15px] md:text-[16px] leading-[1.55] text-[var(--color-ink-soft)]"
            >
              <p>{profile.about[0]}</p>
              <p>{profile.about[1]}</p>
            </motion.div>
          </div>

          {/* Right: contained sky plate — a Swiss photo block locked to 5 grid cols */}
          <motion.figure
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="col-span-12 md:col-span-5 self-start"
          >
            <div
              data-cursor="Self Reflection · 2025"
              className="w-full aspect-[4/5] bg-cover bg-center"
              style={{ backgroundImage: `url('${resolveImageUrl('/images/gallery/SelfReflection.v1.webp')}')` }}
              aria-hidden
            />
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-[var(--color-ink)] pt-2">
              <span className="eyebrow !text-[var(--color-ink)]">"Self Reflection"</span>
              <span className="font-mono text-[11px] tracking-wider uppercase text-[var(--color-muted-strong)]">
                Aiden Tran · 2025
              </span>
            </figcaption>
          </motion.figure>

        </div>

        {/* Principles — numbered grid, heavy type */}
        {/* <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 md:mt-20"
        >
          <div className="grid grid-cols-12 gap-6 items-baseline mb-6">
            <p className="eyebrow col-span-3 md:col-span-2">Principles</p>
            <div className="col-span-9 md:col-span-10 h-px bg-[var(--color-rule)]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {principles.map((p) => (
              <div key={p.n} className="border-t border-[var(--color-ink)] pt-4">
                <p className="font-mono text-xs text-[var(--color-muted)] mb-3">{p.n}</p>
                <h3 className="font-display font-normal uppercase tracking-[-0.005em] text-sm md:text-[15px] leading-[1.15] mb-2 text-[var(--color-ink)]">
                  {p.t}
                </h3>
                <p className="text-sm leading-[1.5] text-[var(--color-muted-strong)]">{p.d}</p>
              </div>
            ))}
          </div>
        </motion.div> */}

        {/* Bottom dense band: Now / Stack / Looking for */}
        <motion.div
          variants={fadeUp}
          custom={5}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 md:mt-20 grid grid-cols-12 gap-x-6 gap-y-6 border-t border-[var(--color-ink)] pt-6 md:pt-8"
        >
          {/* Now */}
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow mb-3">Now</p>
            <ul className="space-y-2">
              {nowFocus.map((f) => (
                <li
                  key={f}
                  className="font-sans font-semibold text-[15px] md:text-base tracking-tight text-[var(--color-ink)] flex gap-3"
                >
                  <span className="text-[var(--color-accent)] font-mono text-xs mt-1.5 shrink-0">→</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div className="col-span-12 md:col-span-4 grid grid-cols-2 gap-6">
            <div>
              <p className="eyebrow mb-3">Languages</p>
              <ul className="space-y-1.5 font-sans font-semibold text-sm md:text-[15px] tracking-tight text-[var(--color-ink)]">
                {profile.languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3">Tools</p>
              <ul className="space-y-1.5 font-sans font-semibold text-sm md:text-[15px] tracking-tight text-[var(--color-ink)]">
                {profile.technologies.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Looking for */}
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow mb-3">Looking for</p>
            <p className="font-display font-normal uppercase tracking-[-0.005em] text-base md:text-lg leading-[1.25] text-[var(--color-ink)]">
              {profile.lookingFor}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-mono text-[var(--color-muted-strong)]">
              <span>{profile.location}</span>
              <span aria-hidden>·</span>
              <span>{profile.school}</span>
              <span aria-hidden>·</span>
              <span>{profile.age} yrs</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
