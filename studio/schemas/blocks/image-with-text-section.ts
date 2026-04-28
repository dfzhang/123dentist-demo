import { defineType, defineField, defineArrayMember } from 'sanity'

export const imageWithTextSection = defineType({
  name: 'imageWithTextSection',
  title: 'Image with Text',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'portableText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
    defineField({
      name: 'ctas',
      title: 'Call to Actions',
      type: 'array',
      of: [defineArrayMember({ type: 'cta' })],
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare({ title, media }) {
      return {
        title: title || 'Image with Text',
        subtitle: 'Image + Text',
        media,
      }
    },
  },
})
