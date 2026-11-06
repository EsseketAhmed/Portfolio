import { useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { imgSrc } from '../../lib/imageUrl'
import type { SanityImage } from '../../types/sanity'

interface Props {
  images?:      SanityImage[]   // from Sanity CMS (when connected)
  localImages?: string[]         // local /public paths e.g. '/images/gallery/work-1.webp'
  label?:       string
}

export default function MarqueeGallery({ images = [], localImages = [], label }: Props) {
  const shouldReduce = useReducedMotion()
  const trackRef     = useRef<HTMLDivElement>(null)

  // Priority: Sanity images → local image paths → grey placeholders
  const hasSanity = images.length > 0
  const hasLocal  = localImages.length > 0

  type Item =
    | { kind: 'sanity'; img: SanityImage }
    | { kind: 'local';  src: string }
    | { kind: 'placeholder' }

  let baseItems: Item[]

  if (hasSanity) {
    baseItems = images.map(img => ({ kind: 'sanity' as const, img }))
  } else if (hasLocal) {
    baseItems = localImages.map(src => ({ kind: 'local' as const, src }))
  } else {
    baseItems = Array.from({ length: 8 }, () => ({ kind: 'placeholder' as const }))
  }

  // Duplicate for seamless infinite loop
  const items: Item[] = [...baseItems, ...baseItems]

  return (
    <section className="marquee-section" aria-label={label ?? 'Portfolio gallery'}>
      {label && (
        <p className="section-label marquee-section__label">{label}</p>
      )}

      <div className="marquee-wrapper">
        <div
          ref={trackRef}
          className="marquee-track"
          style={shouldReduce ? { animation: 'none' } : undefined}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="marquee-item"
              whileHover={!shouldReduce ? { scale: 1.03 } : undefined}
              transition={{ duration: 0.3 }}
            >
              {item.kind === 'sanity' && (
                <img
                  src={imgSrc(item.img, 700)}
                  alt={`Gallery image ${(i % baseItems.length) + 1}`}
                  loading="lazy"
                  draggable={false}
                />
              )}
              {item.kind === 'local' && (
                <img
                  src={item.src}
                  alt={`Gallery image ${(i % baseItems.length) + 1}`}
                  loading="lazy"
                  draggable={false}
                />
              )}
              {item.kind === 'placeholder' && (
                <div className="marquee-item__placeholder" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
