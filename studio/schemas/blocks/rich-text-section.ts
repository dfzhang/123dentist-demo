import { defineType, defineField } from 'sanity'

export const richTextSection = defineType({
  name: 'richTextSection',
  title: 'Rich Text Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Narrow', value: 'narrow' },
          { title: 'Two Column', value: 'two-column' },
        ],
      },
      initialValue: 'full',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Rich Text Section', subtitle: 'Rich Text' }
    },
  },
})
