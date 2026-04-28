import { defineType, defineField, defineArrayMember } from 'sanity'

export const technologyShowcase = defineType({
  name: 'technologyShowcase',
  title: 'Technology Showcase',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [defineArrayMember({ type: 'technologyItem' })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'List', value: 'list' },
        ],
      },
      initialValue: 'grid',
    }),
  ],
  preview: {
    select: { title: 'heading', technologies: 'technologies' },
    prepare({ title, technologies }) {
      const count = technologies?.length || 0
      return {
        title: title || 'Technology Showcase',
        subtitle: `${count} technolog${count === 1 ? 'y' : 'ies'}`,
      }
    },
  },
})
