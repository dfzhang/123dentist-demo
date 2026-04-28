import { defineType, defineField } from 'sanity'
import { officeScopedRefOptions } from '../../lib/office-scoped'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
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
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'For cards and listings (max 300 chars)',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      options: officeScopedRefOptions('teamMember'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'portableText',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author.name',
      media: 'featuredImage',
    },
  },
  orderings: [
    {
      title: 'Published Date',
      name: 'publishedAt',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
