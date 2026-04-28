import { defineType, defineField, defineArrayMember } from 'sanity'
import { officeScopedArrayItem } from '../../lib/office-scoped'

export const servicesList = defineType({
  name: 'servicesList',
  title: 'Services List',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [defineArrayMember(officeScopedArrayItem('service'))],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'showDescriptions',
      title: 'Show Descriptions',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'heading', services: 'services' },
    prepare({ title, services }) {
      const count = services?.length || 0
      return {
        title: title || 'Services List',
        subtitle: `${count} service${count === 1 ? '' : 's'}`,
      }
    },
  },
})
