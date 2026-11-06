import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const imageGalleryBlock = defineType({
  name: 'imageGalleryBlock',
  title: 'Image Gallery',
  type: 'object',
  icon: ImagesIcon,
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
      validation: Rule => Rule.min(1).required(),
    }),
    defineField({
      name: 'layout',
      title: 'Gallery Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid',    value: 'grid' },
          { title: 'Masonry', value: 'masonry' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
    }),
  ],
  preview: {
    select: { images: 'images' },
    prepare({ images }) {
      return {
        title: 'Image Gallery',
        subtitle: `${images?.length ?? 0} image${images?.length !== 1 ? 's' : ''}`,
      }
    },
  },
})
