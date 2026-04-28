import { defineType, defineField, defineArrayMember } from 'sanity'
import { officeScopedArrayItem } from '../../lib/office-scoped'

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [defineArrayMember(officeScopedArrayItem('faq'))],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Accordion', value: 'accordion' },
          { title: 'Two Column', value: 'two-column' },
          { title: 'Simple List', value: 'list' },
        ],
      },
      initialValue: 'accordion',
    }),
  ],
  preview: {
    select: { title: 'heading', faqs: 'faqs' },
    prepare({ title, faqs }) {
      const count = faqs?.length || 0
      return {
        title: title || 'FAQ Section',
        subtitle: `${count} FAQ${count === 1 ? '' : 's'}`,
      }
    },
  },
})
