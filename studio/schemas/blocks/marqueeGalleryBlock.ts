import { defineType, defineField } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const marqueeGalleryBlock = defineType({
  name: 'marqueeGalleryBlock',
  title: 'Horizontal Scrolling Gallery',
  type: 'object',
  icon: PlayIcon,
  description: 'Images that auto-scroll horizontally in an infinite loop',
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
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
      ],
      validation: Rule => Rule.min(2).required(),
    }),
    defineField({
      name: 'speed',
      title: 'Scroll Speed',
      type: 'string',
      options: {
        list: [
          { title: 'Slow',   value: 'slow' },
          { title: 'Normal', value: 'normal' },
          { title: 'Fast',   value: 'fast' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
  ],
  preview: {
    select: { images: 'images' },
    prepare({ images }) {
      return {
        title: 'Horizontal Scrolling Gallery',
        subtitle: `${images?.length ?? 0} images`,
      }
    },
  },
})
