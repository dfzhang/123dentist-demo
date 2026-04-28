import { defineType, defineField } from 'sanity'

// Corporate-managed document — NO office reference.
// Offices reference from this canonical list.
export const insuranceProvider = defineType({
  name: 'insuranceProvider',
  title: 'Insurance Provider',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Provider Name',
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
      name: 'logo',
      title: 'Logo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})
