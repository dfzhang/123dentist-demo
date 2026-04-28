import { defineType, defineField, defineArrayMember } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'ctas',
      title: 'Call to Actions',
      type: 'array',
      of: [defineArrayMember({ type: 'cta' })],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Split (Image Right)', value: 'split-right' },
          { title: 'Split (Image Left)', value: 'split-left' },
          { title: 'Centered', value: 'centered' },
        ],
      },
      initialValue: 'full',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Hero Section', subtitle: 'Hero' }
    },
  },
})
