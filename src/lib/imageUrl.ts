import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { sanityClient } from './sanity'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/** Convenience: get a plain URL string with width + auto format */
export function imgSrc(source: SanityImageSource, width = 800): string {
  return urlFor(source).width(width).auto('format').url()
}

/** Srcset string for responsive images */
export function imgSrcSet(source: SanityImageSource, widths = [400, 800, 1200, 1600]): string {
  return widths
    .map(w => `${urlFor(source).width(w).auto('format').url()} ${w}w`)
    .join(', ')
}

/** Cropped project cover URL at exact 4:5 vertical aspect ratio honoring Sanity hotspot */
export function projectCoverUrl(source: SanityImageSource, width = 800, height = 1000): string {
  try {
    return urlFor(source)
      .width(width)
      .height(height)
      .fit('crop')
      .crop('center')
      .auto('format')
      .quality(85)
      .url()
  } catch {
    return ''
  }
}

/** Cropped project cover at 16:9 landscape ratio */
export function projectCover169(source: SanityImageSource, width = 1600): string {
  const height = Math.round(width * 9 / 16)
  try {
    return urlFor(source)
      .width(width)
      .height(height)
      .fit('crop')
      .crop('center')
      .auto('format')
      .quality(85)
      .url()
  } catch {
    return ''
  }
}
