import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const links = [
  { label: 'Work', to: '/work' },
  { label: 'Blog', to: '/blog' },
  { label: 'Gallery', to: '/gallery' },
]

// Fire the dynamic import on hover so the chunk is cached before the click.
const prefetchers: Partial<Record<string, () => void>> = {
  '/blog': () => {
    void import('@/pages/Blog')
    void import('@/pages/BlogPost')
  },
  '/gallery': () => { void import('@/pages/Gallery') },
}

export function Nav() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        className="absolute inset-0 origin-top shadow-sm"
        style={{ backgroundColor: 'white' }}
        initial={false}
        animate={{ scaleY: scrolled ? 1 : 0 }}
        transition={{ duration: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
      />
      <div className="container-page relative flex h-16 items-center justify-between">
        <Link to="/" className="cursor-pointer">
          <img src="/images/icons/smiley.png" alt="Aiden Tran" className="h-8 w-8" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive = pathname.startsWith(l.to)
            // Hash links use anchor; route links use Link
            if (l.to.includes('#')) {
              return (
                <a
                  key={l.to}
                  href={l.to}
                  className="font-display text-xs font-medium tracking-[0.18em] uppercase text-[var(--color-muted-strong)] hover:text-[var(--color-ink)] transition-colors cursor-pointer"
                >
                  {l.label}
                </a>
              )
            }
            return (
              <Link
                key={l.to}
                to={l.to}
                onMouseEnter={() => prefetchers[l.to]?.()}
                className={`font-display text-xs font-medium tracking-[0.18em] uppercase transition-colors cursor-pointer ${
                  isActive ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted-strong)] hover:text-[var(--color-ink)]'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
          <a
            href="https://github.com/AidenTran900"
            target="_blank"
            rel="noreferrer"
            className="font-display text-xs font-medium tracking-[0.18em] uppercase text-[var(--color-muted-strong)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
          >
            GitHub ↗
          </a>
        </nav>
      </div>
    </motion.header>
  )
}
