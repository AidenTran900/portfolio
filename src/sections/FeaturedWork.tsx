import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { featuredProjects, projects } from '@/data/projects'
import { ProjectCard } from '@/components/ProjectCard'

export function FeaturedWork() {
  // Use featured projects, but fall back to first 4 if none flagged
  const items = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 4)

  return (
    <section id="work" className="relative py-16 md:py-24">
      <div className="container-page">
        {/* Swiss section rail */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="grid grid-cols-12 gap-6 items-center mb-10 md:mb-14"
        >
          <p className="eyebrow col-span-3 md:col-span-2 !text-[var(--color-ink)]">02 — Work</p>
          <div className="col-span-9 md:col-span-10 h-px bg-[var(--color-ink)]" />
        </motion.div>

        {/* Headline + cross-link */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="grid grid-cols-12 gap-6 items-end mb-12 md:mb-16"
        >
          <h2 className="col-span-12 md:col-span-9 font-display font-normal uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(2.2rem,6vw,4.75rem)] text-[var(--color-ink)]">
            Built,
            <br />
            <span className="text-[var(--color-accent)]">end·to·end.</span>
          </h2>
          <Link
            to="/work"
            className="col-span-12 md:col-span-3 md:justify-self-end eyebrow !text-[var(--color-ink)] inline-flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors cursor-pointer group"
          >
            <span>Index — {String(projects.length).padStart(2, '0')}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
          {items.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        {/* Block CTA — Swiss invitation to continue */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-20"
        >
          <Link to="/work" className="btn-swiss-block group">
            <span className="flex items-baseline gap-4">
              <span className="font-mono text-xs tracking-widest opacity-60">→</span>
              <span className="text-lg md:text-2xl">View all projects</span>
            </span>
            <span className="flex items-baseline gap-4">
              <span className="font-mono text-xs tracking-widest opacity-60">
                {String(projects.length).padStart(2, '0')}
              </span>
              <span className="arrow">↗</span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
