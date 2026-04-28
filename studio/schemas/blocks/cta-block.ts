import { defineType, defineField, defineArrayMember } from 'sanity'

export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'CTA Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'ctas',
      title: 'Call to Actions',
      type: 'array',
      of: [defineArrayMember({ type: 'cta' })],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Banner', value: 'banner' },
          { title: 'Card', value: 'card' },
          { title: 'Inline', value: 'inline' },
        ],
      },
      initialValue: 'banner',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'CTA Block', subtitle: 'Call to Action' }
    },
  },
})
