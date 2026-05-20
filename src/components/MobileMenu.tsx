import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'

/* ── Route links — mirror the desktop Nav exactly ───────────────────────── */
const NAV_LINKS = [
  { label: 'Work',    to: '/work' },
  { label: 'Blog',    to: '/blog' },
  { label: 'Gallery', to: '/gallery' },
]

const SOCIAL_LINKS = [
  { label: 'GitHub ↗',   href: profile.github,              external: true  },
  { label: 'LinkedIn ↗', href: profile.linkedin,            external: true  },
  { label: 'Email',      href: `mailto:${profile.email}`,   external: false },
]

/* ── Swiss brand tokens for the staggered underlay reveal ───────────────── */
// Two warm-dark layers build behind the ink panel, evoking the "staggered"
// depth without GSAP — muted-strong (#3a3733) then ink-soft (#1f1d1a).
const UNDERLAY_COLORS = ['var(--color-accent)', 'var(--color-cream)'] as const

/* ── Easing curves ──────────────────────────────────────────────────────── */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as [number, number, number, number]
const EASE_IN  = [0.55, 0.085, 0.68, 0.53] as [number, number, number, number]

/* ── Timing constants (seconds) ─────────────────────────────────────────── */
const LAYER_STAGGER  = 0.07   // delay between each underlay layer
const PANEL_DELAY    = UNDERLAY_COLORS.length * LAYER_STAGGER + 0.01
const ITEM_DELAY_BASE = PANEL_DELAY + 0.15  // items start after panel leads in
const ITEM_STAGGER   = 0.09

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  /* Lock body scroll while the menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Click-away backdrop ──────────────────────────────────────── */}
          {/* z-[51]: above the nav header (z-50) so it covers the white bar  */}
          <motion.div
            className="fixed inset-0 z-[51]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── Staggered underlay panels ────────────────────────────────── */}
          {/* z-[52]: slides in over the white navbar background              */}
          {UNDERLAY_COLORS.map((color, i) => (
            <motion.div
              key={color}
              className="fixed top-0 right-0 h-full w-full z-[52] pointer-events-none"
              style={{ background: color }}
              initial={{ x: '100%' }}
              animate={{
                x: '0%',
                transition: { delay: i * LAYER_STAGGER, duration: 0.5, ease: EASE_OUT },
              }}
              exit={{
                x: '100%',
                transition: { duration: 0.32, ease: EASE_IN },
              }}
            />
          ))}

          {/* ── Main ink panel ───────────────────────────────────────────── */}
          {/* z-[53]: above underlays; hamburger button sits at z-[58]        */}
          <motion.aside
            id="mobile-menu-panel"
            aria-label="Mobile navigation"
            className="fixed top-0 right-0 h-full w-full z-[53] flex flex-col overflow-y-auto"
            style={{
              background: 'var(--color-ink)',
              /* Top padding clears the fixed Nav header (h-16 = 4rem) */
              padding: '5rem 1.75rem 2.5rem',
            }}
            initial={{ x: '100%' }}
            animate={{
              x: '0%',
              transition: { delay: PANEL_DELAY, duration: 0.65, ease: EASE_OUT },
            }}
            exit={{
              x: '100%',
              transition: { duration: 0.32, ease: EASE_IN },
            }}
          >
            {/* Swiss hairline rule beneath the nav clearance */}
            <div
              className="mb-8 h-px"
              style={{ background: 'var(--color-rule)', opacity: 0.18 }}
            />

            {/* ── Navigation items ─────────────────────────────────────── */}
            <nav className="flex-1" aria-label="Primary navigation">
              <ul className="list-none m-0 p-0 flex flex-col gap-0">
                {NAV_LINKS.map((link, idx) => (
                  <li
                    key={link.to}
                    /* overflow-hidden clips the yPercent entrance */
                    className="overflow-hidden leading-none py-2 border-b"
                    style={{ borderColor: 'rgba(217,211,197,0.1)' }}
                  >
                    <motion.div
                      style={{ transformOrigin: '50% 100%' }}
                      initial={{ y: '120%', rotate: 8 }}
                      animate={{
                        y: '0%',
                        rotate: 0,
                        transition: {
                          delay: ITEM_DELAY_BASE + idx * ITEM_STAGGER,
                          duration: 0.9,
                          ease: EASE_OUT,
                        },
                      }}
                    >
                      <Link
                        to={link.to}
                        onClick={onClose}
                        className="group flex items-baseline gap-4 py-3 font-display font-normal uppercase leading-[0.88] tracking-[-0.02em] text-[var(--color-cream)] transition-colors duration-150 hover:text-[var(--color-accent)]"
                        style={{ fontSize: 'clamp(2.4rem, 11vw, 3.75rem)' }}
                        aria-label={`Go to ${link.label}`}
                      >
                        {/* Swiss ordinal — terracotta, small */}
                        <span
                          className="font-display text-xs tracking-[0.2em] transition-colors duration-150 shrink-0"
                          style={{ color: 'var(--color-accent)', opacity: 0.7 }}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Socials footer ───────────────────────────────────────── */}
            <div className="mt-auto pt-8 flex flex-col gap-3">
              <p
                className="font-display text-[0.65rem] font-medium tracking-[0.22em] uppercase"
                style={{ color: 'var(--color-accent)' }}
              >
                Connect
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {SOCIAL_LINKS.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.external ? '_blank' : undefined}
                    rel={s.external ? 'noopener noreferrer' : undefined}
                    className="font-display text-xs uppercase tracking-[0.18em] transition-all duration-200 hover:text-[var(--color-accent)]"
                    style={{ color: 'var(--color-cream)', opacity: 0.55 }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                      opacity: 0.55,
                      y: 0,
                      transition: {
                        delay: ITEM_DELAY_BASE + NAV_LINKS.length * ITEM_STAGGER + i * 0.07,
                        duration: 0.4,
                        ease: EASE_OUT,
                      },
                    }}
                    whileHover={{ opacity: 1 }}
                  >
                    {s.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
