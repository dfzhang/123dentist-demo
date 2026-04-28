import { defineType, defineField, defineArrayMember } from 'sanity'
import { officeScopedArrayItem } from '../../lib/office-scoped'

export const teamGrid = defineType({
  name: 'teamGrid',
  title: 'Team Grid',
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
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [defineArrayMember(officeScopedArrayItem('teamMember'))],
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
    select: { title: 'heading', members: 'members' },
    prepare({ title, members }) {
      const count = members?.length || 0
      return {
        title: title || 'Team Grid',
        subtitle: `${count} member${count === 1 ? '' : 's'}`,
      }
    },
  },
})
