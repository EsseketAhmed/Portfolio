import { defineType } from 'sanity'
import { TextIcon } from '@sanity/icons'

export const richTextBlock = defineType({
  name: 'richTextBlock',
  title: 'Rich Text',
  type: 'object',
  icon: TextIcon,
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Lead', value: 'lead' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
  preview: {
    select: { content: 'content' },
    prepare({ content }) {
      const text = content?.[0]?.children?.[0]?.text ?? 'Rich text block'
      return { title: text.slice(0, 60), subtitle: 'Rich Text' }
    },
  },
})
