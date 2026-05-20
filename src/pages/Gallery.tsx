import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { artworks, type Artwork } from '@/data/gallery'
import { resolveImageUrl } from '@/utils/imageUrl'
import { FilterSidebar } from '@/components/FilterSidebar'

const galleryTags = [...new Set(artworks.map((a) => a.medium))].sort()

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ArtworkCard({ artwork, index, onClick }: { artwork: Artwork; index: number; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      className="break-inside-avoid block w-full group cursor-pointer text-left mb-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
      aria-label={`View ${artwork.title}`}
    >
      <div
        className="relative overflow-hidden"
        style={!loaded ? { paddingBottom: '75%' } : undefined}
      >
        {!loaded && (
          <div className="absolute inset-0 skeleton-shimmer" aria-hidden="true" />
        )}
        <img
          src={resolveImageUrl(artwork.image)}
          alt={artwork.title}
          className={`transition-opacity duration-500 ${
            loaded
              ? 'w-full block opacity-100'
              : 'absolute inset-0 w-full h-full object-cover opacity-0'
          }`}
          loading="lazy"
          fetchPriority={index < 3 ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
        />
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: 'rgba(14,13,11,0.72)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="font-display text-xs font-medium tracking-[0.18em] uppercase text-[var(--color-muted)]">
            {artwork.medium} · {artwork.year}
          </span>
          <span className="font-display text-sm uppercase tracking-widest text-[var(--color-cream)]">
            {artwork.title}
          </span>
        </div>
      </div>
    </motion.button>
  )
}

function Lightbox({ artwork, onClose }: { artwork: Artwork; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
      style={{ background: 'rgba(14,13,11,0.92)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 28 }}
        transition={{ duration: 0.32, ease: [0.215, 0.61, 0.355, 1] }}
        className="flex flex-col md:flex-row gap-8 max-w-5xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 min-w-0 flex items-center justify-center overflow-hidden">
          <img
            src={resolveImageUrl(artwork.image)}
            alt={artwork.title}
            className="max-h-[70vh] max-w-full object-contain"
          />
        </div>

        <div className="md:w-60 flex flex-col justify-end flex-shrink-0">
          <span className="font-display text-xs font-medium tracking-[0.18em] uppercase text-[var(--color-muted)] mb-3">
            {artwork.medium}
          </span>
          <h2 className="font-display text-2xl md:text-3xl uppercase leading-tight text-[var(--color-cream)] mb-2">
            {artwork.title}
          </h2>
          <p className="text-sm text-[var(--color-muted)] mb-1">
            {artwork.year}
            {artwork.dimensions ? <> · {artwork.dimensions}</> : null}
          </p>

          <div className="h-px bg-[var(--color-muted-strong)] my-5" />

          <p className="text-sm leading-relaxed" style={{ color: 'rgba(245,241,234,0.72)' }}>
            {artwork.description}
          </p>

          <button
            onClick={onClose}
            className="mt-10 flex items-center gap-3 font-display text-xs tracking-widest uppercase cursor-pointer transition-colors duration-200 text-[var(--color-muted)] hover:text-[var(--color-cream)]"
            aria-label="Close lightbox"
          >
            <CloseIcon />
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const [selected, setSelected] = useState<Artwork | null>(null)
  const [activeTag, setActiveTag] = useState('All')
  const close = useCallback(() => setSelected(null), [])

  const filtered = activeTag === 'All'
    ? artworks
    : artworks.filter((a) => a.medium === activeTag)

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
            Gallery — {String(filtered.length).padStart(2, '0')}
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
            className="morph-opaque col-span-12 md:col-span-8 font-display font-normal uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(2.2rem,6vw,5rem)] text-[var(--color-ink)]"
          >
            For the
            <br />
            <span className="text-[var(--color-accent)]">soul.</span>
          </motion.h1>
          <p className="col-span-12 md:col-span-4 md:self-end text-[15px] md:text-[16px] text-[var(--color-muted-strong)] leading-[1.55] max-w-prose">
            Personal illustrations, projects, and other experiments.
          </p>
        </motion.div>

        <div className="border-t border-[var(--color-ink)] pt-14 md:pt-20">
          {artworks.length === 0 ? (
            <div className="border border-[var(--color-rule)] py-24 text-center">
              <p className="eyebrow">No pieces yet</p>
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                Add entries to <code className="font-mono text-xs">src/data/gallery.ts</code> and drop images in{' '}
                <code className="font-mono text-xs">public/images/gallery/</code>.
              </p>
            </div>
          ) : (
            <>
              <FilterSidebar tags={galleryTags} activeTag={activeTag} onTagChange={setActiveTag} />
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                {filtered.map((artwork, i) => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                    index={i}
                    onClick={() => setSelected(artwork)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selected && <Lightbox artwork={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  )
}
