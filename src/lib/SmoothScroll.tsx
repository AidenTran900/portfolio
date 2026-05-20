import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useLocation } from 'react-router-dom'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    })

    lenisRef.current = lenis

    let raf = 0
    const tick = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Smoothly scroll to top on route change. The smooth duration runs in
  // parallel with the shared-element morph (~0.55s), so the page settles
  // into place rather than snapping. Skip when the user is already near
  // the top to avoid a tiny redundant nudge.
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (window.scrollY < 4) return
    lenis.scrollTo(0, {
      duration: 0.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    })
  }, [pathname])

  return <>{children}</>
}
