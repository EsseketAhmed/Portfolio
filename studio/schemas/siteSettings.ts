import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Ahmed Esseket',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default SEO Description',
      type: 'text',
      rows: 3,
      description: 'Used on pages without a specific description',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'hello@ahmedesseket.com',
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
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Tagline',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
