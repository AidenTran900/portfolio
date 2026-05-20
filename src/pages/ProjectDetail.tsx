import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'

// Same spring used in ProjectCard; both ends of the shared morph must agree.
const sharedSpring = { type: 'spring' as const, stiffness: 230, damping: 30, mass: 0.9 }

export default function ProjectDetail() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()
  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug])
  const [videoReady, setVideoReady] = useState(false)

  if (!project) {
    return (
      <div className="container-prose pt-40 pb-24 text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="font-display text-4xl mb-6">Project not found</h1>
        <Link to="/" className="btn-ghost">Back home</Link>
      </div>
    )
  }

  const indexInList = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(indexInList + 1) % projects.length]
  // Match the card's source-picking logic so the browser cache hits, letting
  // the first frame paint instantly during the shared-element morph.
  const videoSrc =
    typeof window !== 'undefined' && window.location.hostname !== 'localhost'
      ? project.videoCDN || project.videoSrc
      : project.videoSrc || project.videoCDN

  return (
    <article className="pt-32 md:pt-40 pb-24">
      {/* Header — full bleed. No entrance delays: the page must be fully
          drawn behind Home as Home fades out, otherwise the cream bg would
          show through and read as a white tint. */}
      <header className="container-page mb-12 md:mb-16">
        {/* Swiss header rail */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-6 items-center max-w-[42rem] mx-auto"
        >
          <button
            onClick={() => navigate(-1)}
            className="col-span-3 md:col-span-2 eyebrow !text-[var(--color-ink)] inline-flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors cursor-pointer group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            Back
          </button>
          <motion.div
            layoutId="page-header-rail"
            transition={sharedSpring}
            className="morph-opaque col-span-9 md:col-span-10 h-px bg-[var(--color-ink)]"
          />
        </motion.div>

        <div className="mt-8 text-center">
          <p className="eyebrow !text-[var(--color-ink)] mb-4">{project.type}</p>

          {/*
            initial={false} + explicit animate opacity defeats framer's
            default layoutId crossfade. The element stays at opacity 1 for
            the entire morph; only position/size interpolate.

            layout="preserve-aspect" keeps scaleX === scaleY during the
            morph, eliminating the horizontal-squish that happens when the
            source rect (small) and destination rect (large) have different
            aspect ratios.

            position:relative + zIndex 50 lifts the morphing element above
            the fading source page wrapper, so the morph stays fully opaque
            while the page background fades behind it.
          */}
          <motion.h1
            layoutId={`project-title-${project.slug}`}
            layout
            transition={sharedSpring}
            style={{ position: 'relative', zIndex: 50 }}
            className="morph-opaque font-display text-5xl md:text-7xl font-medium tracking-tight leading-[1.0] text-center w-full whitespace-pre-line"
          >
            {project.title}
          </motion.h1>

          <motion.p
            layoutId={`project-problem-${project.slug}`}
            layout="preserve-aspect"
            transition={sharedSpring}
            style={{ position: 'relative', zIndex: 50 }}
            className="morph-opaque mt-6 font-sans text-lg md:text-xl text-[var(--color-muted-strong)] leading-snug mx-auto max-w-prose"
          >
            {project.problem}
          </motion.p>
        </div>

        {/* Meta strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-[var(--color-rule)] max-w-[42rem] mx-auto">
          <div>
            <p className="eyebrow mb-1.5">Year</p>
            <p className="font-medium text-[var(--color-ink)]">{project.year}</p>
          </div>
          <div>
            <p className="eyebrow mb-1.5">Role</p>
            <p className="font-medium text-[var(--color-ink)]">{project.role}</p>
          </div>
          <div>
            <p className="eyebrow mb-1.5">Team</p>
            <p className="font-medium text-[var(--color-ink)]">{project.team}</p>
          </div>
          <div>
            <p className="eyebrow mb-1.5">Stack</p>
            <p className="font-medium text-[var(--color-ink)]">{project.stack.join(' · ')}</p>
          </div>
        </div>

        {project.url && (
          <div className="mt-10 max-w-[42rem] mx-auto">
            <a href={project.url} target="_blank" rel="noreferrer" className="btn-ink">
              <span>View source</span>
              <span className="arrow">↗</span>
            </a>
          </div>
        )}
      </header>

      {/* Hero video — shared element. src is set as an attribute (not via
          useEffect) so the browser starts decoding the moment React commits
          the element. The same URL is already cached from the card on the
          previous page, so the first frame paints almost immediately and
          the morph never reveals the cream container bg. */}
      {videoSrc && (
        <div className="container-page mb-16 md:mb-24">
          <motion.div
            layoutId={`project-media-${project.slug}`}
            transition={sharedSpring}
            style={{ borderRadius: 6, position: 'relative', zIndex: 50 }}
            className="morph-opaque mx-auto max-w-4xl overflow-hidden border border-[var(--color-rule)] bg-[var(--color-cream-soft)] aspect-[16/10] will-change-transform"
          >
            {!videoReady && (
              <div className="absolute inset-0 skeleton-shimmer z-10" aria-hidden="true" />
            )}
            <video
              key={videoSrc}
              src={videoSrc}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              onCanPlay={() => setVideoReady(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
            />
          </motion.div>
        </div>
      )}

      {/* Body prose — Medium-style readable column */}
      <div className="container-prose space-y-12">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-sans text-lg md:text-xl leading-[1.65] text-[var(--color-ink-soft)]">
            {project.summary}
          </p>
        </motion.section>

        {project.highlights && project.highlights.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="border-l-2 border-[var(--color-ink)] pl-6 py-2"
          >
            <p className="eyebrow mb-4">Key contributions</p>
            <ul className="space-y-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="font-sans text-base md:text-lg leading-relaxed text-[var(--color-ink-soft)]">
                  {h}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {project.body?.map((section, i) => (
          <motion.section
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: i * 0.05 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-4">
              {section.heading}
            </h2>
            <div className="space-y-5">
              {section.paragraphs.map((p, j) => (
                <p key={j} className="font-sans text-base md:text-lg leading-[1.7] text-[var(--color-ink-soft)]">
                  {p}
                </p>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {/* Next project — Swiss block CTA */}
      <div className="container-page mt-24">
        <div className="grid grid-cols-12 gap-6 items-center mb-6">
          <p className="eyebrow col-span-3 md:col-span-2 !text-[var(--color-ink)]">Next</p>
          <div className="col-span-9 md:col-span-10 h-px bg-[var(--color-ink)]" />
        </div>

        <Link to={`/work/${next.slug}`} className="btn-swiss-block group">
          <span className="flex flex-col items-start gap-1 text-left">
            <span className="font-mono text-xs tracking-widest opacity-60">
              {String(((indexInList + 1) % projects.length) + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <span className="font-display text-2xl md:text-4xl tracking-tight normal-case">
              {next.title}
            </span>
            <span className="font-sans text-sm font-normal normal-case tracking-normal opacity-70 max-w-md mt-1">
              {next.problem}
            </span>
          </span>
          <span className="arrow shrink-0">→</span>
        </Link>
      </div>
    </article>
  )
}
