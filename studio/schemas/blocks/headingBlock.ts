import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const headingBlock = defineType({
  name: 'headingBlock',
  title: 'Heading',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Heading Text',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Heading Level',
      type: 'string',
      options: {
        list: [
          { title: 'H1 — Very Large', value: 'h1' },
          { title: 'H2 — Large',      value: 'h2' },
          { title: 'H3 — Medium',     value: 'h3' },
          { title: 'H4 — Small',      value: 'h4' },
        ],
        layout: 'radio',
      },
      initialValue: 'h2',
    }),
    defineField({
      name: 'gradient',
      title: 'Apply Gradient Style',
      type: 'boolean',
      description: 'Apply the iridescent gradient to this heading',
      initialValue: false,
    }),
  ],
  preview: {
    select: { text: 'text', level: 'level' },
    prepare({ text, level }) {
      return { title: text, subtitle: `Heading — ${level ?? 'h2'}` }
    },
  },
})
