import { defineType, defineField, defineArrayMember } from 'sanity'

const valuePropItem = defineType({
  name: 'valuePropItem',
  title: 'Value Proposition',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'imageWithAlt',
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'icon' },
  },
})

const valueProps = defineType({
  name: 'valueProps',
  title: 'Value Propositions',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Value Props',
      type: 'array',
      of: [defineArrayMember({ type: 'valuePropItem' })],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Horizontal', value: 'horizontal' },
          { title: 'Vertical', value: 'vertical' },
        ],
      },
      initialValue: 'grid',
    }),
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare({ title, items }) {
      const count = items?.length || 0
      return {
        title: title || 'Value Propositions',
        subtitle: `${count} item${count === 1 ? '' : 's'}`,
      }
    },
  },
})

export { valuePropItem, valueProps }
