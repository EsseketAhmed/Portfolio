import { project }      from './project'
import { homePage }     from './homePage'
import { faq }          from './faq'
import { siteSettings } from './siteSettings'
import { contentBlockTypes } from './blocks'

export const schemaTypes = [
  // Documents
  project,
  homePage,
  faq,
  siteSettings,
  // Content block object types
  ...contentBlockTypes,
]
