import { defineType, defineField } from 'sanity'

export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: 'Video Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Custom Thumbnail',
      type: 'imageWithAlt',
      description: 'Override the default video thumbnail',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'heading', url: 'url' },
    prepare({ title, url }) {
      return {
        title: title || 'Video Embed',
        subtitle: url || 'No URL set',
      }
    },
  },
})
