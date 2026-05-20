import { lazy, Suspense } from 'react'
import { resolveImageUrl } from '@/utils/imageUrl'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion, useScroll, useTransform } from 'framer-motion'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { CustomCursor } from '@/components/CustomCursor'
import { SmoothScroll } from '@/lib/SmoothScroll'
import Home from '@/pages/Home'

function PersistentHeroBg() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { scrollY } = useScroll()
  // Move bg at ~0.2× scroll speed — matches the original hero parallax factor
  const bgY = useTransform(scrollY, [0, 960], [0, 200], { clamp: false })

  // Two-layer mask: linear handles the overall top→bottom fade; the radial
  // (centred just below the element) makes the centre transparent before the
  // sides, producing the hill/arch gradient. intersect = opaque only where
  // both layers agree.
  const mask = [
    'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
    'radial-gradient(ellipse 130% 70% at 50% 120%, transparent 40%, black 90%)',
  ].join(', ')

  return (
    <motion.div
      aria-hidden
      animate={{ height: isHome ? '96vh' : 280, filter: isHome ? 'blur(0px)' : 'blur(6px)' }}
      transition={{ type: 'spring', stiffness: 120, damping: 28 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0,
        y: bgY,
        backgroundImage: `url(${resolveImageUrl('/hero/bg.webp')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        WebkitMaskImage: mask,
        WebkitMaskComposite: 'source-in',
        maskImage: mask,
        maskComposite: 'intersect',
      }}
    />
  )
}
// Eager-loaded so the shared-element morph never has to wait for a chunk
// fetch — Suspense fallback would otherwise flash an empty page.
import ProjectDetail from '@/pages/ProjectDetail'
import Work from '@/pages/Work'

const Blog = lazy(() => import('@/pages/Blog'))
const BlogPost = lazy(() => import('@/pages/BlogPost'))
const Gallery = lazy(() => import('@/pages/Gallery'))

// Outgoing page fades smoothly so non-shared content (other cards, headings,
// etc.) doesn't disappear abruptly. The shared layoutId elements are kept
// above this fading layer via a high z-index on the destination motion
// components, so the morph itself stays fully opaque.
const pageVariants = {
  initial: { opacity: 1 },
  enter: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.22, ease: [0.55, 0.085, 0.68, 0.53] as [number, number, number, number] } },
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <LayoutGroup>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/work"
              element={
                <Suspense fallback={<div className="container-page pt-40 text-center text-[var(--color-muted)]">Loading…</div>}>
                  <Work />
                </Suspense>
              }
            />
            <Route
              path="/work/:slug"
              element={
                <Suspense fallback={<div className="container-prose pt-40 text-center text-[var(--color-muted)]">Loading…</div>}>
                  <ProjectDetail />
                </Suspense>
              }
            />
            <Route
              path="/blog"
              element={
                <Suspense fallback={<div className="container-page pt-40 text-center text-[var(--color-muted)]">Loading…</div>}>
                  <Blog />
                </Suspense>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <Suspense fallback={<div className="container-prose pt-40 text-center text-[var(--color-muted)]">Loading…</div>}>
                  <BlogPost />
                </Suspense>
              }
            />
            <Route
              path="/gallery"
              element={
                <Suspense fallback={<div className="container-page pt-40 text-center text-[var(--color-muted)]">Loading…</div>}>
                  <Gallery />
                </Suspense>
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  )
}

function App() {
  return (
    <SmoothScroll>
      <div className="relative">
        <PersistentHeroBg />
        <CustomCursor />
        <Nav />
        <main className="relative z-[1] min-h-screen">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App
