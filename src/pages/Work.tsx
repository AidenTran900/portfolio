import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ProjectCard'
import { FilterSidebar } from '@/components/FilterSidebar'

const workTags = [...new Set(
  projects.flatMap((p) => p.type.split(' · ').map((t) => t.trim()))
)].sort()

export default function Work() {
  const [activeTag, setActiveTag] = useState('All')

  const filtered = activeTag === 'All'
    ? projects
    : projects.filter((p) => p.type.split(' · ').map((t) => t.trim()).includes(activeTag))

  return (
    <section className="pt-32 md:pt-40 pb-24">
      <div className="container-page">
        {/* Swiss section rail */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="grid grid-cols-12 gap-6 items-center mb-10 md:mb-14"
        >
          <p className="eyebrow col-span-6 md:col-span-2 !text-[var(--color-ink)]">
            Index — {String(filtered.length).padStart(2, '0')}
          </p>
          <motion.div
            layoutId="page-header-rail"
            transition={{ type: 'spring', stiffness: 230, damping: 30, mass: 0.9 }}
            className="morph-opaque col-span-6 md:col-span-10 h-px bg-[var(--color-ink)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
          className="grid grid-cols-12 gap-6 mb-14 md:mb-20"
        >
          <motion.h1
            layoutId="page-title"
            layout="preserve-aspect"
            transition={{ type: 'spring', stiffness: 230, damping: 30, mass: 0.9 }}
            className="morph-opaque col-span-12 md:col-span-8 font-display font-normal uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(3.5rem,7vw,5rem)] text-[var(--color-ink)]"
          >
            Built,
            <br />
            <span className="text-[var(--color-accent)]">end·to·end.</span>
          </motion.h1>
          <p className="col-span-12 md:col-span-4 md:self-end text-[15px] md:text-[16px] text-[var(--color-muted-strong)] leading-[1.55] max-w-prose">
            Systems projects, games, libraries, and more. It&rsquo;s all here.
          </p>
        </motion.div>

        <div className="border-t border-[var(--color-ink)] pt-14 md:pt-20">
          <FilterSidebar tags={workTags} activeTag={activeTag} onTagChange={setActiveTag} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
            {filtered.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
