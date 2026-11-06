import { defineType, defineField } from 'sanity'
import { SplitHorizontalIcon } from '@sanity/icons'

const columnContent = (side: 'left' | 'right') => [
  defineField({
    name: `${side}Type`,
    title: `${side === 'left' ? 'Left' : 'Right'} Column Content`,
    type: 'string',
    options: {
      list: [
        { title: 'Image', value: 'image' },
        { title: 'Text',  value: 'text' },
      ],
      layout: 'radio',
    },
    initialValue: side === 'left' ? 'image' : 'text',
  }),
  defineField({
    name: `${side}Image`,
    title: `${side === 'left' ? 'Left' : 'Right'} Image`,
    type: 'image',
    options: { hotspot: true },
    hidden: ({ parent }: { parent: Record<string, string> }) =>
      parent?.[`${side}Type`] !== 'image',
  }),
  defineField({
    name: `${side}Text`,
    title: `${side === 'left' ? 'Left' : 'Right'} Text`,
    type: 'array',
    of: [{ type: 'block' }],
    hidden: ({ parent }: { parent: Record<string, string> }) =>
      parent?.[`${side}Type`] !== 'text',
  }),
]

export const twoColumnSplitBlock = defineType({
  name: 'twoColumnSplitBlock',
  title: 'Two Column Split',
  type: 'object',
  icon: SplitHorizontalIcon,
  fields: [
    ...columnContent('left'),
    ...columnContent('right'),
  ],
  preview: {
    select: { leftType: 'leftType', rightType: 'rightType' },
    prepare({ leftType, rightType }) {
      return {
        title: 'Two Column Split',
        subtitle: `${leftType ?? 'image'} | ${rightType ?? 'text'}`,
      }
    },
  },
})
