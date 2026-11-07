// ─── Sanity Image ────────────────────────────────────────────────────
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  alt?: string
  caption?: string
}

export interface SanityFile {
  asset?: {
    url?: string
    originalFilename?: string
    mimeType?: string
  }
}

// ─── Sanity Slug ─────────────────────────────────────────────────────
export interface SanitySlug {
  _type: 'slug'
  current: string
}

// ─── Content Blocks ───────────────────────────────────────────────────
export interface RichTextBlock {
  _type: 'richTextBlock'
  _key: string
  content: PortableTextBlock[]
}

export interface HeadingBlock {
  _type: 'headingBlock'
  _key: string
  text: string
  level: 'h1' | 'h2' | 'h3' | 'h4'
  gradient?: boolean
}

export interface SingleImageBlock {
  _type: 'singleImageBlock'
  _key: string
  image: SanityImage
  alt?: string
  caption?: string
  layout?: 'contained' | 'full'
}

export interface ImageGridBlock {
  _type: 'imageGridBlock'
  _key: string
  images: SanityImage[]
  columns: 2 | 3 | 4 | 5
}

export interface ImageGalleryBlock {
  _type: 'imageGalleryBlock'
  _key: string
  images: SanityImage[]
  layout?: 'grid' | 'masonry'
}

export interface FullWidthImageBlock {
  _type: 'fullWidthImageBlock'
  _key: string
  image: SanityImage
  alt?: string
  caption?: string
}

export interface MarqueeGalleryBlock {
  _type: 'marqueeGalleryBlock'
  _key: string
  images: SanityImage[]
  speed?: 'slow' | 'normal' | 'fast'
}

export interface TwoColumnSplitBlock {
  _type: 'twoColumnSplitBlock'
  _key: string
  leftType: 'text' | 'image'
  leftText?: PortableTextBlock[]
  leftImage?: SanityImage
  rightType: 'text' | 'image'
  rightText?: PortableTextBlock[]
  rightImage?: SanityImage
}

export interface ThreeColumnLayoutBlock {
  _type: 'threeColumnLayoutBlock'
  _key: string
  columns: Array<{
    _key: string
    image?: SanityImage
    text?: PortableTextBlock[]
  }>
}

export interface SpacerBlock {
  _type: 'spacerBlock'
  _key: string
  size: 'sm' | 'md' | 'lg' | 'xl'
}

export interface DividerBlock {
  _type: 'dividerBlock'
  _key: string
  style?: 'line' | 'gradient' | 'invisible'
}

export type ContentBlock =
  | RichTextBlock
  | HeadingBlock
  | SingleImageBlock
  | ImageGridBlock
  | ImageGalleryBlock
  | FullWidthImageBlock
  | MarqueeGalleryBlock
  | TwoColumnSplitBlock
  | ThreeColumnLayoutBlock
  | SpacerBlock
  | DividerBlock

// ─── Portable Text ────────────────────────────────────────────────────
export interface PortableTextBlock {
  _type: string
  _key: string
  style?: string
  children?: Array<{
    _key: string
    _type: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _key: string
    _type: string
    href?: string
  }>
}

// ─── Project ──────────────────────────────────────────────────────────
export interface Project {
  _id: string
  _createdAt: string
  title: string
  client: string
  year: number
  coverImage: SanityImage
  pdf?: SanityFile
  slug?: SanitySlug
  shortDescription?: string
  category?: string
  tags?: string[]
  featured?: boolean
  displayOrder?: number
  content?: ContentBlock[]
  seoTitle?: string
  seoDescription?: string
}

// ─── FAQ ──────────────────────────────────────────────────────────────
export interface Faq {
  _id: string
  question: string
  answer: string
  displayOrder?: number
}

// ─── Social Link ──────────────────────────────────────────────────────
export interface SocialLink {
  _key: string
  platform: string
  url: string
  handle?: string
}

// ─── Homepage ─────────────────────────────────────────────────────────
export interface HomePage {
  _id: string
  heroIntro?: string
  heroHeadline?: string
  heroHighlightedWords?: string[]
  heroCta1Label?: string
  heroCta1Link?: string
  heroCta2Label?: string
  heroCta2Link?: string
  galleryImages?: SanityImage[]
  aboutTitle?: string
  aboutText?: string
  aboutImages?: SanityImage[]
  socialTitle?: string
  socialText?: string
  socialImages?: SanityImage[]
  projectsSectionTitle?: string
  contactTitle?: string
  contactText?: string
  email?: string
  socialLinks?: SocialLink[]
  footerText?: string
}

// ─── Site Settings ────────────────────────────────────────────────────
export interface SiteSettings {
  _id: string
  siteName?: string
  seoDescription?: string
  email?: string
  socialLinks?: SocialLink[]
  footerText?: string
}
