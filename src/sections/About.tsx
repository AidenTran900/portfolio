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

export function About() {
  return (
    <section
      id="about"
      className="relative pt-16 md:pt-24 pb-6 md:pb-10"
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

        {/* Swiss grid: 7-col left block, 5-col photo plate */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">

          {/* Left: headline → body → ruled divider → stack — one continuous column */}
          <div className="col-span-12 md:col-span-7 flex flex-col">
            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="font-display font-normal uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(2.2rem,6vw,4.75rem)] mb-8 md:mb-10 text-[var(--color-ink)]"
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
              className="max-w-[52ch] space-y-4 text-[17px] md:text-[18px] leading-[1.6] text-[var(--color-ink-soft)]"
            >
              <p>{profile.about[0]}</p>
              {profile.about[1] && <p>{profile.about[1]}</p>}
            </motion.div>

            {/* Ruled divider — Swiss register line */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-8 md:mt-10 border-t border-[var(--color-ink)]"
            />

            {/* Stack: Languages + Tools — tight inline band */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6"
            >
              <div>
                <p className="eyebrow mb-3">Languages</p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-sans font-semibold text-sm md:text-[15px] tracking-tight text-[var(--color-ink)]">
                  {profile.languages.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-3">Tools</p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-sans font-semibold text-sm md:text-[15px] tracking-tight text-[var(--color-ink)]">
                  {profile.technologies.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right: contained sky plate — Swiss photo block locked to 5 grid cols */}
          <motion.figure
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="hidden md:block col-span-12 md:col-span-5 self-start"
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
      </div>
    </section>
  )
}
