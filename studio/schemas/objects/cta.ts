import { defineType, defineField } from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Outline', value: 'outline' },
          { title: 'Text Link', value: 'text' },
        ],
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: {
      label: 'link.label',
      variant: 'variant',
    },
    prepare({ label, variant }) {
      return {
        title: label || 'Untitled CTA',
        subtitle: variant ? variant.charAt(0).toUpperCase() + variant.slice(1) : 'Primary',
      }
    },
  },
})
