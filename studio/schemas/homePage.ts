import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  // Prevent accidental duplicates via Studio UI
  __experimental_actions: ['update', 'publish'],
  fields: [
    // ─── Hero ─────────────────────────────────────────
    defineField({
      name: 'heroIntro',
      title: 'Hero — Intro Line',
      type: 'string',
      description: 'Small label above the headline',
      initialValue: 'Graphic Designer & Art Director',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero — Headline',
      type: 'string',
      description: 'The main large hero headline',
      initialValue: 'TURNING IDEAS INTO POWERFUL VISUALS',
      group: 'hero',
    }),
    defineField({
      name: 'heroHighlightedWords',
      title: 'Hero — Highlighted Words',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Words from the headline that will get the gradient treatment',
      initialValue: ['IDEAS', 'POWERFUL'],
      group: 'hero',
    }),
    defineField({
      name: 'heroCta1Label',
      title: 'Hero — CTA 1 Label',
      type: 'string',
      initialValue: 'Explore My Work',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta1Link',
      title: 'Hero — CTA 1 Link',
      type: 'string',
      initialValue: '/projects',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta2Label',
      title: 'Hero — CTA 2 Label',
      type: 'string',
      initialValue: 'About Me',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta2Link',
      title: 'Hero — CTA 2 Link',
      type: 'string',
      initialValue: '#about',
      group: 'hero',
    }),

    // ─── Gallery ──────────────────────────────────────
    defineField({
      name: 'galleryImages',
      title: 'Horizontal Gallery — Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Images for the auto-scrolling gallery strip',
      group: 'sections',
    }),

    // ─── About ────────────────────────────────────────
    defineField({
      name: 'aboutTitle',
      title: 'About — Title',
      type: 'string',
      initialValue: 'BRINGING MEMORABLE MOMENTS TO LIFE',
      group: 'sections',
    }),
    defineField({
      name: 'aboutText',
      title: 'About — Body Text',
      type: 'text',
      rows: 5,
      group: 'sections',
    }),
    defineField({
      name: 'aboutImages',
      title: 'About — Images (up to 3)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.max(3),
      group: 'sections',
    }),

    // ─── Social ───────────────────────────────────────
    defineField({
      name: 'socialTitle',
      title: 'Social — Title',
      type: 'string',
      initialValue: 'ENGAGING CONTENT TO GROW YOUR BRAND',
      group: 'sections',
    }),
    defineField({
      name: 'socialText',
      title: 'Social — Body Text',
      type: 'text',
      rows: 4,
      group: 'sections',
    }),
    defineField({
      name: 'socialImages',
      title: 'Social — Instagram Grid Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.max(6),
      group: 'sections',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Social — Instagram Profile URL',
      type: 'url',
      group: 'sections',
    }),

    // ─── Projects ─────────────────────────────────────
    defineField({
      name: 'projectsSectionTitle',
      title: 'Projects Section — Title',
      type: 'string',
      initialValue: 'MY LATEST PROJECTS',
      group: 'sections',
    }),

    // ─── Contact ──────────────────────────────────────
    defineField({
      name: 'contactTitle',
      title: 'Contact — Title',
      type: 'string',
      initialValue: "LET'S TALK ABOUT YOUR PROJECT",
      group: 'contact',
    }),
    defineField({
      name: 'contactText',
      title: 'Contact — Supporting Text',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      initialValue: 'hello@ahmedesseket.com',
      group: 'contact',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform',       type: 'string' },
            { name: 'url',      title: 'URL',            type: 'url' },
            { name: 'handle',   title: 'Handle (@name)', type: 'string' },
          ],
          preview: {
            select: { platform: 'platform', handle: 'handle' },
            prepare({ platform, handle }) {
              return { title: platform, subtitle: handle }
            },
          },
        },
      ],
      group: 'contact',
    }),

    // ─── Footer ───────────────────────────────────────
    defineField({
      name: 'footerText',
      title: 'Footer — Tagline',
      type: 'string',
      description: 'Optional tagline below the copyright',
      group: 'footer',
    }),
  ],
  groups: [
    { name: 'hero',     title: 'Hero' },
    { name: 'sections', title: 'Sections' },
    { name: 'contact',  title: 'Contact' },
    { name: 'footer',   title: 'Footer' },
  ],
  preview: {
    prepare() {
      return { title: 'Homepage' }
    },
  },
})
