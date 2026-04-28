import { defineType, defineField, defineArrayMember } from 'sanity'

export const financingSection = defineType({
  name: 'financingSection',
  title: 'Financing Section',
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
      type: 'portableText',
    }),
    defineField({
      name: 'financingOptions',
      title: 'Financing Options',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Option Name',
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
              name: 'logo',
              title: 'Logo',
              type: 'imageWithAlt',
            }),
            defineField({
              name: 'url',
              title: 'Application URL',
              type: 'url',
            }),
          ],
          preview: {
            select: { title: 'name', media: 'logo' },
          },
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'cta',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Financing Section', subtitle: 'Financing' }
    },
  },
})
