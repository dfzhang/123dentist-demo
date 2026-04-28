import { defineType, defineField, defineArrayMember } from 'sanity'
import { officeScopedArrayItem, officeScopedRefOptions } from '../../lib/office-scoped'

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [defineArrayMember(officeScopedArrayItem('testimonial'))],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'filterByService',
      title: 'Filter by Service',
      type: 'reference',
      to: [{ type: 'service' }],
      options: officeScopedRefOptions('service'),
      description: 'Optional — show only testimonials related to this service',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Carousel', value: 'carousel' },
          { title: 'Grid', value: 'grid' },
          { title: 'Featured', value: 'featured' },
        ],
      },
      initialValue: 'carousel',
    }),
    defineField({
      name: 'showRatings',
      title: 'Show Ratings',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'heading', testimonials: 'testimonials' },
    prepare({ title, testimonials }) {
      const count = testimonials?.length || 0
      return {
        title: title || 'Testimonials Section',
        subtitle: `${count} testimonial${count === 1 ? '' : 's'}`,
      }
    },
  },
})
