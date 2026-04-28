import { defineType, defineField, defineArrayMember } from 'sanity'

// navSubItem — NO children field. Structural depth enforcement: max 2 levels.
const navSubItem = defineType({
  name: 'navSubItem',
  title: 'Sub-Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'link.label',
      linkType: 'link.linkType',
    },
    prepare({ title, linkType }) {
      return {
        title: title || 'Untitled',
        subtitle: linkType === 'external' ? 'External' : 'Internal',
      }
    },
  },
})

const navItem = defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'children',
      title: 'Sub-Items',
      type: 'array',
      of: [defineArrayMember({ type: 'navSubItem' })],
      description: 'Dropdown items (max 2 levels — sub-items cannot have children)',
    }),
  ],
  preview: {
    select: {
      title: 'link.label',
      children: 'children',
    },
    prepare({ title, children }) {
      const count = children?.length || 0
      return {
        title: title || 'Untitled',
        subtitle: count > 0 ? `${count} sub-item${count === 1 ? '' : 's'}` : 'No sub-items',
      }
    },
  },
})

export { navSubItem, navItem }
