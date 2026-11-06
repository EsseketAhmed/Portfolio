import { defineType, defineField } from 'sanity'
import { RemoveIcon } from '@sanity/icons'

export const dividerBlock = defineType({
  name: 'dividerBlock',
  title: 'Divider',
  type: 'object',
  icon: RemoveIcon,
  fields: [
    defineField({
      name: 'style',
      title: 'Divider Style',
      type: 'string',
      options: {
        list: [
          { title: 'Thin Line',     value: 'line' },
          { title: 'Gradient Line', value: 'gradient' },
          { title: 'Invisible',     value: 'invisible' },
        ],
        layout: 'radio',
      },
      initialValue: 'line',
    }),
  ],
  preview: {
    select: { style: 'style' },
    prepare({ style }) {
      return { title: `Divider — ${style ?? 'line'}` }
    },
  },
})
