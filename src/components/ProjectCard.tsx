import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { Project } from '@/data/projects'

const ioOptions: IntersectionObserverInit = { threshold: 0.25, rootMargin: '120px' }

const sharedSpring = { type: 'spring' as const, stiffness: 230, damping: 30, mass: 0.9 }

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [inView, setInView] = useState(false)

  const videoSrc =
    typeof window !== 'undefined' && window.location.hostname !== 'localhost'
      ? project.videoCDN || project.videoSrc
      : project.videoSrc || project.videoCDN

  useEffect(() => {
    if (!cardRef.current) return
    const obs = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    }, ioOptions)
    obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v || !videoSrc) return
    if (inView) {
      if (!v.src) v.src = videoSrc
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [inView, videoSrc])

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <Link
        ref={cardRef}
        to={`/work/${project.slug}`}
        data-cursor="View case →"
        className="group block"
      >
        {/* Media — shared element */}
        <motion.div
          layoutId={`project-media-${project.slug}`}
          transition={sharedSpring}
          style={{ borderRadius: 6 }}
          className="morph-opaque relative overflow-hidden bg-[var(--color-cream-soft)] aspect-[16/10] border border-[var(--color-rule)] transition-colors duration-300 group-hover:border-[var(--color-ink)] will-change-transform"
        >
          {videoSrc ? (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-6xl md:text-8xl font-semibold text-[var(--color-rule)] tracking-tight">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-transparent group-hover:bg-[rgba(14,13,11,0.04)] transition-colors duration-500" />
        </motion.div>

        {/* Meta — Swiss index rail above title */}
        <div className="mt-5 flex items-baseline justify-between border-t border-[var(--color-ink)] pt-3">
          <span className="font-mono text-xs tracking-widest text-[var(--color-ink)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-display text-xs font-medium tracking-[0.18em] uppercase text-[var(--color-muted)]">
            {project.year}
          </span>
        </div>

        <div className="mt-3 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <motion.h3
              layoutId={`project-title-${project.slug}`}
              layout="preserve-aspect"
              transition={sharedSpring}
              className="morph-opaque font-display text-2xl md:text-3xl font-medium tracking-tight transition-colors duration-300 group-hover:text-[var(--color-accent)]"
            >
              {project.title}
            </motion.h3>
            <motion.p
              layoutId={`project-problem-${project.slug}`}
              layout="preserve-aspect"
              transition={sharedSpring}
              className="morph-opaque mt-2 text-[var(--color-muted-strong)] text-base leading-relaxed max-w-md"
            >
              {project.problem}
            </motion.p>
          </div>
        </div>

        {/* Stack tags + view affordance */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {project.stack.map((s) => (
              <span
                key={s}
                className="font-display text-xs font-medium tracking-[0.12em] uppercase text-[var(--color-muted)]"
              >
                {s}
              </span>
            ))}
          </div>
          <span className="font-display text-xs font-semibold tracking-[0.18em] uppercase text-[var(--color-muted)] shrink-0 inline-flex items-center gap-2 transition-colors group-hover:text-[var(--color-ink)]">
            View case
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
