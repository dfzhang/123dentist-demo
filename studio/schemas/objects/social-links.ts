import { defineType, defineField } from 'sanity'

export const socialLinks = defineType({
  name: 'socialLinks',
  title: 'Social Media Links',
  type: 'object',
  fields: [
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'twitter',
      title: 'X (Twitter) URL',
      type: 'url',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok URL',
      type: 'url',
    }),
    defineField({
      name: 'googleBusiness',
      title: 'Google Business Profile URL',
      type: 'url',
    }),
  ],
})
