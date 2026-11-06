import { defineType, defineField } from 'sanity'
import { ExpandIcon } from '@sanity/icons'

export const fullWidthImageBlock = defineType({
  name: 'fullWidthImageBlock',
  title: 'Full Width Image',
  type: 'object',
  icon: ExpandIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'alt',     title: 'Alt Text', type: 'string' }),
    defineField({ name: 'caption', title: 'Caption',  type: 'string' }),
  ],
  preview: {
    select: { media: 'image', alt: 'alt' },
    prepare({ media, alt }) {
      return { title: alt ?? 'Full Width Image', media }
    },
  },
})
