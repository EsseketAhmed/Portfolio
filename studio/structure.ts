import type { StructureResolver } from 'sanity/structure'
import { HomeIcon, ProjectsIcon, HelpCircleIcon, CogIcon } from '@sanity/icons'

export const structure: StructureResolver = S => S.list()
  .title('Ahmed Esseket CMS')
  .items([
    // ─── Homepage (singleton) ──────────────────────────────────────
    S.listItem()
      .title('Homepage')
      .icon(HomeIcon)
      .child(
        S.document()
          .schemaType('homePage')
          .documentId('homePage')
          .title('Homepage Content')
      ),

    S.divider(),

    // ─── Projects ─────────────────────────────────────────────────
    S.listItem()
      .title('Projects')
      .icon(ProjectsIcon)
      .child(
        S.documentTypeList('project')
          .title('All Projects')
      ),

    S.divider(),

    // ─── FAQs ─────────────────────────────────────────────────────
    S.listItem()
      .title('FAQs')
      .icon(HelpCircleIcon)
      .child(
        S.documentTypeList('faq')
          .title('Frequently Asked Questions')
      ),

    S.divider(),

    // ─── Site Settings (singleton) ────────────────────────────────
    S.listItem()
      .title('Site Settings')
      .icon(CogIcon)
      .child(
        S.document()
          .schemaType('siteSettings')
          .documentId('siteSettings')
          .title('Site Settings')
      ),
  ])
