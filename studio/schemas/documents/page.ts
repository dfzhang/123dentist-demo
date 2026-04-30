import { defineType, defineField, defineArrayMember } from 'sanity'
import { officeScopedIsUnique } from '../../lib/office-scoped'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'office',
      title: 'Office',
      type: 'reference',
      to: [{ type: 'office' }],
      readOnly: true,
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', isUnique: officeScopedIsUnique },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'About', value: 'about' },
          { title: 'Services', value: 'services' },
          { title: 'Service Detail', value: 'service-detail' },
          { title: 'Team', value: 'team' },
          { title: 'Contact', value: 'contact' },
          { title: 'New Patients', value: 'new-patients' },
          { title: 'Blog', value: 'blog' },
          { title: 'Testimonials', value: 'testimonials' },
          { title: 'Gallery', value: 'gallery' },
          { title: 'Landing Page', value: 'landing' },
          { title: 'Generic', value: 'generic' },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({ type: 'heroSection' }),
        defineArrayMember({ type: 'richTextSection' }),
        defineArrayMember({ type: 'servicesGrid' }),
        defineArrayMember({ type: 'servicesList' }),
        defineArrayMember({ type: 'teamGrid' }),
        defineArrayMember({ type: 'teamFeatured' }),
        defineArrayMember({ type: 'faqSection' }),
        defineArrayMember({ type: 'smileGallery' }),
        defineArrayMember({ type: 'valueProps' }),
        defineArrayMember({ type: 'technologyShowcase' }),
        defineArrayMember({ type: 'imageWithTextSection' }),
        defineArrayMember({ type: 'videoEmbed' }),
        defineArrayMember({ type: 'ctaBlock' }),
        defineArrayMember({ type: 'contactBlock' }),
        defineArrayMember({ type: 'financingSection' }),
        defineArrayMember({ type: 'testimonialsSection' }),
        defineArrayMember({ type: 'newPatientSection' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      officeName: 'office.name',
      pageType: 'pageType',
    },
    prepare({ title, officeName, pageType }) {
      const type = pageType ? pageType.charAt(0).toUpperCase() + pageType.slice(1) : ''
      const parts = [officeName, type].filter(Boolean)
      return {
        title: title || 'Untitled Page',
        subtitle: parts.join(' · '),
      }
    },
  },
})
