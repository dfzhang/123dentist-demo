import { defineType, defineField } from 'sanity'

export const contactBlock = defineType({
  name: 'contactBlock',
  title: 'Contact Block',
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
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'showMap',
      title: 'Show Map',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showHours',
      title: 'Show Business Hours',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showContactForm',
      title: 'Show Contact Form',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Side by Side', value: 'side-by-side' },
          { title: 'Stacked', value: 'stacked' },
          { title: 'Map Focus', value: 'map-focus' },
        ],
      },
      initialValue: 'side-by-side',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Contact Block', subtitle: 'Contact' }
    },
  },
})
