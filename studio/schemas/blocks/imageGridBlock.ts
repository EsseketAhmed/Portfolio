import { defineType, defineField } from 'sanity'
import { ThLargeIcon } from '@sanity/icons'

export const imageGridBlock = defineType({
  name: 'imageGridBlock',
  title: 'Image Grid',
  type: 'object',
  icon: ThLargeIcon,
  description: 'Add 2, 3, 4 or 5 images in a row',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt',     type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
      validation: Rule => Rule.min(2).max(5).required(),
    }),
    defineField({
      name: 'columns',
      title: 'Number of Columns',
      type: 'number',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
          { title: '5 Columns', value: 5 },
        ],
        layout: 'radio',
      },
      initialValue: 3,
    }),
  ],
  preview: {
    select: { images: 'images', columns: 'columns' },
    prepare({ images, columns }) {
      return {
        title: `Image Grid — ${columns ?? 3} columns`,
        subtitle: `${images?.length ?? 0} image${images?.length !== 1 ? 's' : ''}`,
      }
    },
  },
})
