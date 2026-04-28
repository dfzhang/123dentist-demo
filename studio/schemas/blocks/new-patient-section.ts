import { defineType, defineField, defineArrayMember } from 'sanity'

export const newPatientSection = defineType({
  name: 'newPatientSection',
  title: 'New Patient Section',
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
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Step Title',
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
              name: 'icon',
              title: 'Icon',
              type: 'imageWithAlt',
            }),
          ],
          preview: {
            select: { title: 'title', media: 'icon' },
          },
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'cta',
    }),
    defineField({
      name: 'showInsurance',
      title: 'Show Insurance Info',
      type: 'boolean',
      initialValue: true,
      description: 'Display accepted insurance providers from the office profile',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'New Patient Section', subtitle: 'New Patients' }
    },
  },
})
