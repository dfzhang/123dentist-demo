import { defineType, defineField } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'office',
      title: 'Office',
      type: 'reference',
      to: [{ type: 'office' }],
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roleCategory',
      title: 'Role Category',
      type: 'string',
      options: {
        list: [
          { title: 'Dentist', value: 'dentist' },
          { title: 'Hygienist', value: 'hygienist' },
          { title: 'Dental Assistant', value: 'assistant' },
          { title: 'Office Manager', value: 'manager' },
          { title: 'Receptionist', value: 'receptionist' },
          { title: 'Specialist', value: 'specialist' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: 'For cards and listings (max 200 chars)',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'bio',
      title: 'Full Bio',
      type: 'portableText',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., "DDS", "University of British Columbia"',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
