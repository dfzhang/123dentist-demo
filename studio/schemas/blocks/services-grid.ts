import { defineType, defineField, defineArrayMember } from 'sanity'
import { officeScopedArrayItem } from '../../lib/office-scoped'

export const servicesGrid = defineType({
  name: 'servicesGrid',
  title: 'Services Grid',
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
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [defineArrayMember(officeScopedArrayItem('service'))],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: { list: [2, 3, 4] },
      initialValue: 3,
    }),
  ],
  preview: {
    select: { title: 'heading', services: 'services' },
    prepare({ title, services }) {
      const count = services?.length || 0
      return {
        title: title || 'Services Grid',
        subtitle: `${count} service${count === 1 ? '' : 's'}`,
      }
    },
  },
})
