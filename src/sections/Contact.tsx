import { motion } from 'framer-motion'
import { profile } from '@/data/profile'

export function Contact() {
  return (
    <section id="contact" className="relative py-16 md:py-24 border-t border-[var(--color-rule)]">
      <div className="container-page">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-6"
        >
          Get in touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight max-w-4xl leading-[0.95]"
        >
          Open to internships,<br />interesting problems,<br />and the occasional&nbsp;
          <span className="text-[var(--color-accent)]">deep&nbsp;rabbit&nbsp;hole.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a href={`mailto:${profile.email}`} className="btn-ink">
            Email me ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
