import { defineType, defineField } from 'sanity'
import { officeScopedRefOptions } from '../../lib/office-scoped'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
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
      name: 'patientName',
      title: 'Patient Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
      },
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'service',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }],
      options: officeScopedRefOptions('service'),
      description: 'e.g., "Invisalign" — shows relevant testimonials on service pages',
    }),
    defineField({
      name: 'photo',
      title: 'Patient Photo',
      type: 'imageWithAlt',
      description: 'Optional — many patients won\'t have one',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Google', value: 'google' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Yelp', value: 'yelp' },
          { title: 'RateMDs', value: 'ratemds' },
          { title: 'Direct', value: 'direct' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'patientName',
      subtitle: 'quote',
      media: 'photo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Anonymous',
        subtitle: subtitle ? subtitle.slice(0, 80) + '...' : '',
        media,
      }
    },
  },
})
