import { defineType, defineField } from 'sanity'

export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'object',
  fields: [
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email' }).error(
          'Must be a valid email address'
        ),
    }),
    defineField({
      name: 'fax',
      title: 'Fax Number',
      type: 'string',
    }),
    defineField({
      name: 'emergencyPhone',
      title: 'Emergency Phone',
      type: 'string',
      description: 'After-hours emergency contact number',
    }),
  ],
})
