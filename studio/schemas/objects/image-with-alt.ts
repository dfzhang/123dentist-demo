import { defineType, defineField } from 'sanity'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for screen readers and SEO',
      validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
    }),
  ],
  preview: {
    select: {
      media: 'asset',
      title: 'alt',
    },
  },
})
