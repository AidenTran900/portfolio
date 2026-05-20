import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { createPortal } from 'react-dom'

const SPRING = { stiffness: 360, damping: 26, mass: 0.5 }

export function CustomCursor() {
  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)
  const springX = useSpring(mouseX, SPRING)
  const springY = useSpring(mouseY, SPRING)

  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const prev = useRef({ label: null as string | null, hover: false })
  const [label,   setLabel]   = useState<string | null>(null)
  const [isHover, setIsHover] = useState(false)

  // Write spring position directly to DOM — no transformed motion wrapper,
  // so mix-blend-mode sees actual page content (not an isolated stacking context).
  useEffect(() => {
    const apply = () => {
      const t = `translate(${springX.get()}px, ${springY.get()}px) translate(-50%, -50%)`
      if (ringRef.current) ringRef.current.style.transform = t
    }
    const u1 = springX.on('change', apply)
    const u2 = springY.on('change', apply)
    return () => { u1(); u2() }
  }, [springX, springY])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }

      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (!el) return

      const tooltipEl = el.closest('[data-cursor]') as HTMLElement | null
      const nextLabel = tooltipEl?.dataset.cursor ?? null
      const nextHover = !nextLabel && !!el.closest('a, button, [role="button"], input, select, label')

      if (nextLabel !== prev.current.label || nextHover !== prev.current.hover) {
        prev.current = { label: nextLabel, hover: nextHover }
        setLabel(nextLabel)
        setIsHover(nextHover)
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const ring = ringRef.current
    const text = textRef.current
    if (!ring || !text) return

    if (label) {
      // Tooltip state — solid black pill, normal blend so text is readable
      ring.style.width        = `${text.scrollWidth}px`
      ring.style.height       = '36px'
      ring.style.background   = '#0e0d0b'
      ring.style.borderColor  = '#0e0d0b'
      ring.style.mixBlendMode = 'normal'
    } else {
      // Default/hover — inverted ring via difference blend
      const s = isHover ? '52px' : '32px'
      ring.style.width        = s
      ring.style.height       = s
      ring.style.background   = 'transparent'
      ring.style.borderColor  = 'white'
      ring.style.mixBlendMode = 'difference'
    }
  }, [label, isHover])

  if (typeof document === 'undefined') return null

  return createPortal(
    <div aria-hidden className="pointer-events-none select-none">

      {/* Dot — difference blend, always inverted against background */}
      <div
        ref={dotRef}
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           6,
          height:          6,
          borderRadius:    '50%',
          backgroundColor: 'white',
          mixBlendMode:    'difference',
          zIndex:          10001,
        }}
      />

      {/* Ring — morphs to solid black pill on tooltip, difference ring otherwise */}
      <div
        ref={ringRef}
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          width:          32,
          height:         32,
          borderRadius:   9999,
          border:         '1.5px solid white',
          overflow:       'hidden',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          mixBlendMode:   'difference',
          zIndex:         10000,
          transition: [
            'width 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
            'height 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
            'background 0.2s ease',
            'border-color 0.2s ease',
          ].join(', '),
        }}
      >
        <span
          ref={textRef}
          style={{
            display:       'block',
            fontFamily:    'var(--font-display)',
            fontSize:      10,
            fontWeight:    500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color:         'white',
            whiteSpace:    'nowrap',
            padding:       '0 16px',
            opacity:        label ? 1 : 0,
            transition:     label
              ? 'opacity 0.15s ease 0.18s'
              : 'opacity 0.08s ease',
          }}
        >
          {label ?? ''}
        </span>
      </div>

    </div>,
    document.body
  )
}
