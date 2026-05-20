import { motion } from 'framer-motion'

type FilterSidebarProps = {
  tags: string[]
  activeTag: string
  onTagChange: (tag: string) => void
}

export function FilterSidebar({ tags, activeTag, onTagChange }: FilterSidebarProps) {
  const allTags = ['All', ...tags]

  return (
    <>
      <div className="hidden [@media(min-width:1440px)]:block fixed inset-0 z-40 pointer-events-none">
        <div className="container-page h-full relative">
          <motion.nav
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
            className="pointer-events-auto absolute left-[-1.5rem] top-1/2 -translate-y-1/2 -translate-x-full flex flex-col gap-0.5"
          >
            {allTags.map((tag, i) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.04, ease: 'easeOut' }}
                onClick={() => onTagChange(tag)}
                className={`text-left font-display text-[0.66rem] tracking-[0.16em] uppercase py-1.5 transition-colors duration-200 cursor-pointer flex items-center gap-2 ${
                  activeTag === tag
                    ? 'text-[var(--color-ink)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-muted-strong)]'
                }`}
              >
                <span
                  className="block w-3 h-px flex-shrink-0 transition-all duration-200"
                  style={{ background: activeTag === tag ? 'var(--color-accent)' : 'transparent' }}
                />
                {tag}
              </motion.button>
            ))}
          </motion.nav>
        </div>
      </div>

      {/* Mobile / narrow desktop: horizontal scroll strip inside the container */}
      <div className="[@media(min-width:1440px)]:hidden flex gap-2 overflow-x-auto pb-3 mb-8" style={{ scrollbarWidth: 'none' }}>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagChange(tag)}
            className={`flex-shrink-0 font-display text-[0.65rem] tracking-[0.16em] uppercase py-1 px-3 border transition-colors duration-200 cursor-pointer ${
              activeTag === tag
                ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-cream)]'
                : 'border-[var(--color-rule)] text-[var(--color-muted)] hover:border-[var(--color-muted-strong)] hover:text-[var(--color-muted-strong)]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </>
  )
}
