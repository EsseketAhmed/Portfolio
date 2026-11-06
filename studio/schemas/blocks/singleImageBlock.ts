import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const singleImageBlock = defineType({
  name: 'singleImageBlock',
  title: 'Single Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'alt',     title: 'Alt Text',  type: 'string' }),
    defineField({ name: 'caption', title: 'Caption',   type: 'string' }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Contained (centered)', value: 'contained' },
          { title: 'Full Width',           value: 'full' },
        ],
        layout: 'radio',
      },
      initialValue: 'contained',
    }),
  ],
  preview: {
    select: { media: 'image', caption: 'alt' },
    prepare({ media, caption }) {
      return { title: caption ?? 'Single Image', media }
    },
  },
})
