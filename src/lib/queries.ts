// ─── Homepage ─────────────────────────────────────────────────────────
export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  heroIntro,
  heroHeadline,
  heroHighlightedWords,
  heroCta1Label,
  heroCta1Link,
  heroCta2Label,
  heroCta2Link,
  galleryImages[]{ ..., asset-> },
  aboutTitle,
  aboutText,
  aboutImages[]{ ..., asset-> },
  socialTitle,
  socialText,
  socialImages[]{ ..., asset-> },
  projectsSectionTitle,
  contactTitle,
  contactText,
  email,
  socialLinks,
  footerText
}`

// ─── Projects ─────────────────────────────────────────────────────────
export const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(displayOrder asc, _createdAt desc){
  _id,
  _createdAt,
  title,
  client,
  year,
  coverImage{ ..., asset-> },
  slug,
  shortDescription,
  category,
  tags,
  featured,
  displayOrder
}`

// Sports page: only projects with a sport/football category
export const SPORTS_PROJECTS_QUERY = `*[_type == "project" && category in [
  "Sports Graphics",
  "Football Campaign",
  "Sports & Football",
  "Basketball & Culture"
]] | order(displayOrder asc, _createdAt desc){
  _id,
  _createdAt,
  title,
  client,
  year,
  coverImage{ ..., asset-> },
  slug,
  shortDescription,
  category,
  tags,
  featured,
  displayOrder
}`

// Portfolio page: everything that is NOT a sport/football category
export const NON_SPORTS_PROJECTS_QUERY = `*[_type == "project" && !(category in [
  "Sports Graphics",
  "Football Campaign",
  "Sports & Football",
  "Basketball & Culture"
])] | order(displayOrder asc, _createdAt desc){
  _id,
  _createdAt,
  title,
  client,
  year,
  coverImage{ ..., asset-> },
  slug,
  shortDescription,
  category,
  tags,
  featured,
  displayOrder
}`

export const LATEST_PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt desc)[0...3]{
  _id,
  title,
  client,
  year,
  coverImage{ ..., asset-> },
  slug,
  category
}`

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && (
  slug.current == $slug ||
  _id == $slug ||
  lower(title) == lower($slug)
)][0]{
  _id,
  title,
  client,
  year,
  coverImage{ ..., asset-> },
  pdf{ ..., asset->{ url, originalFilename, mimeType } },
  slug,
  shortDescription,
  category,
  content[]{
    ...,
    _type == "singleImageBlock" => { ..., image{ ..., asset-> } },
    _type == "fullWidthImageBlock" => { ..., image{ ..., asset-> } },
    _type == "imageGridBlock" => { ..., images[]{ ..., asset-> } },
    _type == "imageGalleryBlock" => { ..., images[]{ ..., asset-> } },
    _type == "marqueeGalleryBlock" => { ..., images[]{ ..., asset-> } },
    _type == "twoColumnSplitBlock" => {
      ...,
      leftImage{ ..., asset-> },
      rightImage{ ..., asset-> }
    },
    _type == "threeColumnLayoutBlock" => {
      ...,
      columns[]{ ..., image{ ..., asset-> } }
    }
  },
  seoTitle,
  seoDescription
}`

export const PROJECT_SLUGS_QUERY = `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`

// ─── FAQ ──────────────────────────────────────────────────────────────
export const FAQ_QUERY = `*[_type == "faq"] | order(displayOrder asc, _createdAt asc){
  _id,
  question,
  answer,
  displayOrder
}`

// ─── Site Settings ────────────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  seoDescription,
  email,
  socialLinks,
  footerText
}`
