import { defineType, defineField } from 'sanity'

export const technologyItem = defineType({
  name: 'technologyItem',
  title: 'Technology Item',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Technology Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'imageWithAlt',
      description: 'Small icon for list views',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
