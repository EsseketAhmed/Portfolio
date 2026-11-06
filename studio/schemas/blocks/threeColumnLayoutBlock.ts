import { defineType, defineField } from 'sanity'
import { SplitVerticalIcon } from '@sanity/icons'

export const threeColumnLayoutBlock = defineType({
  name: 'threeColumnLayoutBlock',
  title: 'Three Column Layout',
  type: 'object',
  icon: SplitVerticalIcon,
  fields: [
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      description: 'Add exactly 3 columns. Each column can have an image and/or text.',
      of: [
        {
          type: 'object',
          name: 'column',
          fields: [
            {
              name: 'image',
              title: 'Image (optional)',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'text',
              title: 'Text (optional)',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
          preview: {
            select: { media: 'image' },
            prepare({ media }) {
              return { title: 'Column', media }
            },
          },
        },
      ],
      validation: Rule => Rule.min(1).max(3),
    }),
  ],
  preview: {
    select: { columns: 'columns' },
    prepare({ columns }) {
      return {
        title: 'Three Column Layout',
        subtitle: `${columns?.length ?? 0} column${columns?.length !== 1 ? 's' : ''}`,
      }
    },
  },
})
