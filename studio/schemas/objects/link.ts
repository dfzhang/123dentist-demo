import { defineType, defineField } from 'sanity'

// NOTE: This object is used in BOTH page builder blocks AND office.mainNavigation.
// When used in office.mainNavigation, the root document IS the office — there's no
// document.office._ref to filter by. officeScopedRefOptions would return the
// ___nonexistent___ fallback, blocking all internal links in nav editing.
// Workspace-level filtering handles scoping here instead.

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal Page', value: 'internal' },
          { title: 'External URL', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'internalRef',
      title: 'Internal Page',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'service' }, { type: 'teamMember' }, { type: 'blogPost' }],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string }
          if (parent?.linkType === 'internal' && !value) {
            return 'Select an internal page'
          }
          return true
        }),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string }
          if (parent?.linkType === 'external' && !value) {
            return 'Enter an external URL'
          }
          return true
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      linkType: 'linkType',
      externalUrl: 'externalUrl',
    },
    prepare({ label, linkType, externalUrl }) {
      return {
        title: label || 'Untitled Link',
        subtitle: linkType === 'external' ? externalUrl : 'Internal link',
      }
    },
  },
})
