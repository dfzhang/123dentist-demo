import { defineType, defineField } from 'sanity'
import { officeScopedRefOptions } from '../../lib/office-scoped'

export const teamFeatured = defineType({
  name: 'teamFeatured',
  title: 'Featured Team Member',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'member',
      title: 'Team Member',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      options: officeScopedRefOptions('teamMember'),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Photo Left', value: 'photo-left' },
          { title: 'Photo Right', value: 'photo-right' },
          { title: 'Centered', value: 'centered' },
        ],
      },
      initialValue: 'photo-left',
    }),
    defineField({
      name: 'showFullBio',
      title: 'Show Full Bio',
      type: 'boolean',
      initialValue: false,
      description: 'Show full bio instead of short bio',
    }),
  ],
  preview: {
    select: { title: 'heading', memberName: 'member.name' },
    prepare({ title, memberName }) {
      return {
        title: title || 'Featured Team Member',
        subtitle: memberName || 'No member selected',
      }
    },
  },
})
