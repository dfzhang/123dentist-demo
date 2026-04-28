import { defineType, defineField } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Override the page title for search engines (50-60 chars ideal)',
      validation: (Rule) => Rule.max(70).warning('Keep under 70 characters for best results'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Summary shown in search results (150-160 chars ideal)',
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'imageWithAlt',
      description: 'Image shown when shared on social media (1200×630 recommended)',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      initialValue: false,
      description: 'Enable to prevent this page from appearing in search results',
    }),
  ],
})
