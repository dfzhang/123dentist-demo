import { defineType, defineField, defineArrayMember } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'office',
      title: 'Office',
      type: 'reference',
      to: [{ type: 'office' }],
      readOnly: true,
      validation: (Rule) => Rule.required(),
      group: 'content',
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
      title: 'Service Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General Dentistry', value: 'general' },
          { title: 'Cosmetic Dentistry', value: 'cosmetic' },
          { title: 'Orthodontics', value: 'orthodontics' },
          { title: 'Oral Surgery', value: 'surgery' },
          { title: 'Pediatric Dentistry', value: 'pediatric' },
          { title: 'Periodontics', value: 'periodontics' },
          { title: 'Endodontics', value: 'endodontics' },
          { title: 'Prosthodontics', value: 'prosthodontics' },
          { title: 'Emergency', value: 'emergency' },
          { title: 'Preventive', value: 'preventive' },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'For cards and listings (max 200 chars)',
      validation: (Rule) => Rule.required().max(200),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'portableText',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'imageWithAlt',
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
  },
})
