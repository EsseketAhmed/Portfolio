import { defineType, defineField } from 'sanity'
import { ProjectsIcon } from '@sanity/icons'
import { contentBlockTypes } from './blocks'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    // ─── Required fields ──────────────────────────────
    defineField({
      name: 'title',
      title: 'Project Name',
      type: 'string',
      description: 'The name of the project',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      description: 'The client or brand for this project',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'Year the project was completed',
      validation: Rule => Rule.required().min(2000).max(2099),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Main thumbnail shown in project grids',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),

    // ─── Optional fields ──────────────────────────────
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Auto-generated from the project name. Used in the page URL.',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required().error('Slug is required. Click "Generate" to create it from the title.'),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'A brief summary shown on project cards',
    }),
    defineField({
      name: 'pdf',
      title: 'Project PDF',
      type: 'file',
      description: 'Optional PDF shown on the project page with preview and download actions.',
      options: { accept: 'application/pdf' },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Sports Graphics',      value: 'Sports Graphics' },
          { title: 'Football Campaign',    value: 'Football Campaign' },
          { title: 'Sports & Football',    value: 'Sports & Football' },
          { title: 'Basketball & Culture', value: 'Basketball & Culture' },
          { title: 'Visual Identity',      value: 'Visual Identity' },
          { title: 'Advertising',          value: 'Advertising' },
          { title: 'Creative Direction',   value: 'Creative Direction' },
          { title: 'Social Media Design',  value: 'Social Media Design' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Add tags for filtering (e.g. sports, football, basketball, campaign, etc.)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project in featured sections',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown first. Leave blank to use creation date.',
    }),

    // ─── Page Builder ─────────────────────────────────
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      description: 'Build this project page by adding and reordering blocks freely.',
      of: contentBlockTypes.map(block => ({ type: block.name })),
    }),

    // ─── SEO ──────────────────────────────────────────
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Custom browser tab title. Leave blank to use project name.',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Meta description for search engines (150–160 characters ideal).',
      group: 'seo',
    }),
  ],
  groups: [
    { name: 'seo', title: 'SEO' },
  ],
  preview: {
    select: {
      title:    'title',
      client:   'client',
      year:     'year',
      media:    'coverImage',
      featured: 'featured',
    },
    prepare({ title, client, year, media, featured }) {
      return {
        title:    `${title}${featured ? ' ⭐' : ''}`,
        subtitle: `${client} — ${year}`,
        media,
      }
    },
  },
})
