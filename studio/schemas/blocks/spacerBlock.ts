import { defineType, defineField } from 'sanity'
import { RemoveIcon } from '@sanity/icons'

export const spacerBlock = defineType({
  name: 'spacerBlock',
  title: 'Spacer',
  type: 'object',
  icon: RemoveIcon,
  fields: [
    defineField({
      name: 'size',
      title: 'Spacing Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small  (2rem)',   value: 'sm' },
          { title: 'Medium (4rem)',   value: 'md' },
          { title: 'Large  (6rem)',   value: 'lg' },
          { title: 'XL     (10rem)',  value: 'xl' },
        ],
        layout: 'radio',
      },
      initialValue: 'md',
    }),
  ],
  preview: {
    select: { size: 'size' },
    prepare({ size }) {
      return { title: `Spacer — ${size ?? 'md'}` }
    },
  },
})
