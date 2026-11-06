'use client'

import { useRef, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

interface Props {
  intro?:      string
  headline?:   string
  highlights?: string[]
  cta1Label?:  string
  cta1Link?:   string
  cta2Label?:  string
  cta2Link?:   string
  chrome1Src?: string
  chrome2Src?: string
  chrome3Src?: string
}

const SPRING = { stiffness: 45, damping: 22, mass: 1 }

export default function Hero({
  intro      = 'GRAPHIC DESIGNER & ART DIRECTOR',
  headline   = 'TURNING IDEAS INTO POWERFUL VISUALS',
  highlights = ['IDEAS', 'POWERFUL'],
  cta1Label  = 'Explore My Work',
  cta1Link   = '/projects',
  cta2Label  = 'About Me',
  cta2Link   = '#about',
  chrome1Src,
  chrome2Src,
  chrome3Src,
}: Props) {
  const containerRef = useRef<HTMLElement>(null)

  // Shared cursor motion values (normalised −1 → 1)
  const curX = useMotionValue(0)
  const curY = useMotionValue(0)

  // Per-object spring values — different stiffness = different lag = depth
  const x1 = useSpring(useMotionValue(0), SPRING)
  const y1 = useSpring(useMotionValue(0), SPRING)
  const x2 = useSpring(useMotionValue(0), { stiffness: 30, damping: 18 })
  const y2 = useSpring(useMotionValue(0), { stiffness: 30, damping: 18 })
  const x3 = useSpring(useMotionValue(0), { stiffness: 60, damping: 26 })
  const y3 = useSpring(useMotionValue(0), { stiffness: 60, damping: 26 })

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const isTouchDevice =
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: coarse)').matches
      : false

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (prefersReducedMotion || isTouchDevice) return
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
    const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2

    // object 1 — strong movement, normal direction
    x1.set(nx * 38)
    y1.set(ny * 28)
    // object 2 — gentle, inverted X
    x2.set(-nx * 22)
    y2.set(ny * 18)
    // object 3 — fast, inverted Y
    x3.set(nx * 30)
    y3.set(-ny * 24)
  }, [prefersReducedMotion, isTouchDevice, x1, y1, x2, y2, x3, y3])

  useEffect(() => {
    const el = containerRef.current
    if (!el || prefersReducedMotion) return
    el.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove, prefersReducedMotion])

  // Highlight important words in the headline
  function renderHeadline(text: string) {
    return text.split(' ').map((word, i) => {
      const isHighlight = highlights.some(h => word.toUpperCase().includes(h.toUpperCase()))
      return (
        <span key={i}>
          <motion.span
            className={isHighlight ? 'gradient-text' : undefined}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.72,
              delay: prefersReducedMotion ? 0 : 0.4 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
          {' '}
        </span>
      )
    })
  }

  // Float animation for mobile / no-cursor devices
  const floatAnim = isTouchDevice && !prefersReducedMotion

  return (
    <section
      ref={containerRef}
      className="hero"
      aria-label="Hero section"
    >
      {/* Chrome object 1 — top left */}
      {chrome1Src && (
        <motion.div
          className="chrome chrome--1"
          style={floatAnim ? {} : { x: x1, y: y1 }}
          animate={floatAnim ? { y: [0, -16, -8, 0] } : undefined}
          transition={floatAnim ? { duration: 7, repeat: Infinity, ease: 'easeInOut' } : undefined}
          aria-hidden="true"
        >
          <img src={chrome1Src} alt="" draggable={false} />
        </motion.div>
      )}

      {/* Chrome object 2 — top right */}
      {chrome2Src && (
        <motion.div
          className="chrome chrome--2"
          style={floatAnim ? {} : { x: x2, y: y2 }}
          animate={floatAnim ? { y: [0, -20, -10, 0], rotate: [0, 2, -1, 0] } : undefined}
          transition={floatAnim ? { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 } : undefined}
          aria-hidden="true"
        >
          <img src={chrome2Src} alt="" draggable={false} />
        </motion.div>
      )}

      {/* Chrome object 3 — bottom center-right */}
      {chrome3Src && (
        <motion.div
          className="chrome chrome--3"
          style={floatAnim ? {} : { x: x3, y: y3 }}
          animate={floatAnim ? { y: [0, -10, -18, 0], rotate: [0, -2, 1, 0] } : undefined}
          transition={floatAnim ? { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 } : undefined}
          aria-hidden="true"
        >
          <img src={chrome3Src} alt="" draggable={false} />
        </motion.div>
      )}

      {/* Main content */}
      <motion.div
        className="hero__content"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="hero__intro"
          initial={{ opacity: 0, letterSpacing: '0.3em' }}
          animate={{ opacity: 1, letterSpacing: '0.18em' }}
          transition={{ duration: 1, delay: 0.15 }}
        >
          {intro}
        </motion.p>

        <motion.h1
          className="hero__headline"
        >
          {renderHeadline(headline)}
        </motion.h1>

        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <a href={cta1Link} className="btn-primary">
            {cta1Label}
          </a>
          <a href={cta2Link} className="btn-secondary">
            {cta2Label}
          </a>
        </motion.div>
      </motion.div>

      {/* Subtle bottom gradient fade */}
      <div className="hero__fade" aria-hidden="true" />
    </section>
  )
}
