import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MobileMenu } from './MobileMenu'

const links = [
  { label: 'Work',    to: '/work'    },
  { label: 'Blog',    to: '/blog'    },
  { label: 'Gallery', to: '/gallery' },
]

// Fire the dynamic import on hover so the chunk is cached before the click.
const prefetchers: Partial<Record<string, () => void>> = {
  '/blog':    () => { void import('@/pages/Blog'); void import('@/pages/BlogPost') },
  '/gallery': () => { void import('@/pages/Gallery') },
}

const EASE_OUT = [0.215, 0.61, 0.355, 1] as [number, number, number, number]

export function Nav() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const toggleMenu = () => setMenuOpen(v => !v)

  return (
    <>
      {/* ── Nav header — z-50 ────────────────────────────────────────────────
          The mobile menu panel sits at z-[52–53] so it slides OVER this bar,
          covering the white scrolled background. The hamburger button is a
          separate fixed element at z-[58] so it stays above the panel.       */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Scroll-triggered white fill — panel slides over this on mobile */}
        <motion.div
          className="absolute inset-0 origin-top shadow-sm"
          style={{ backgroundColor: 'var(--color-ink)' }}
          initial={false}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.15, ease: EASE_OUT }}
        />

        <div className="container-page relative flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="cursor-pointer font-display text-sm font-black tracking-[0.18em] uppercase text-white hover:text-[var(--color-accent)] transition-colors">
            AIDEN
          </Link>

          {/* Desktop nav — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => {
              const isActive = pathname.startsWith(l.to)
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onMouseEnter={() => prefetchers[l.to]?.()}
                  className={`font-display text-xs font-medium tracking-[0.18em] uppercase transition-colors cursor-pointer text-white hover:text-[var(--color-accent)]`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          {/* Placeholder — keeps logo left-aligned on mobile (button is extracted below) */}
          <div className="md:hidden w-[4.5rem]" aria-hidden="true" />
        </div>
      </motion.header>

      {/* ── Hamburger button — z-[58], above the panel (z-[52–53]) ──────────
          Extracted from the header so its z-index escapes the header's
          stacking context. Animates ink→cream as the dark panel slides in.   */}
      <motion.div
        className="fixed top-0 right-0 h-16 flex items-center z-[58] md:hidden"
        style={{ paddingRight: '1.5rem' }}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
      >
        <motion.button
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-panel"
          type="button"
          className="inline-flex items-center gap-2.5 bg-transparent border-0 cursor-pointer font-display text-xs font-medium tracking-[0.18em] uppercase"
          /* Shift from ink to cream as the dark panel covers the page;
             delay the colour change slightly so it happens once the panel
             has started to land, not before. */
          animate={{ color: menuOpen ? 'var(--color-cream)' : 'white' }}
          transition={{
            duration: 0.25,
            delay: menuOpen ? 0.25 : 0,
            ease: EASE_OUT,
          }}
        >
          {/* Label: Menu ↔ Close */}
          <span className="relative h-[1em] overflow-hidden inline-block w-[10em]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={menuOpen ? 'close' : 'menu'}
                className="absolute inset-0 flex items-center justify-end"
                initial={{ y: menuOpen ? '100%' : '-100%' }}
                animate={{ y: '0%' }}
                exit={{ y: menuOpen ? '-100%' : '100%' }}
                transition={{ duration: 0.22, ease: EASE_OUT }}
              >
                {menuOpen ? 'Close' : 'Menu'}
              </motion.span>
            </AnimatePresence>
          </span>

          {/* Two-bar icon: ═ → × */}
          <span className="relative w-[14px] h-[14px] shrink-0 inline-flex items-center justify-center">
            <motion.span
              className="absolute left-0 right-0 h-[1.5px] bg-current rounded-full"
              style={{ top: '35%' }}
              animate={{
                top:        menuOpen ? '50%' : '35%',
                rotate:     menuOpen ? 45 : 0,
                translateY: menuOpen ? '-50%' : '0%',
              }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            />
            <motion.span
              className="absolute left-0 right-0 h-[1.5px] bg-current rounded-full"
              style={{ bottom: '35%' }}
              animate={{
                bottom:     menuOpen ? '50%' : '35%',
                rotate:     menuOpen ? -45 : 0,
                translateY: menuOpen ? '50%' : '0%',
              }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            />
          </span>
        </motion.button>
      </motion.div>

      {/* Mobile overlay */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
