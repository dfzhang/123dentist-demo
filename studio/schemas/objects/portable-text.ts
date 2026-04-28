import { defineType, defineField, defineArrayMember } from 'sanity'

// NOTE: internalLink annotation intentionally skips officeScopedRefOptions.
// Same reason as link.ts — used in office.mainNavigation where root doc IS the office.
// Workspace-level filtering handles scoping.

export const portableTextOf = [
  defineArrayMember({
    type: 'block',
    styles: [
      { title: 'Normal', value: 'normal' },
      { title: 'H2', value: 'h2' },
      { title: 'H3', value: 'h3' },
      { title: 'H4', value: 'h4' },
      { title: 'Quote', value: 'blockquote' },
    ],
    lists: [
      { title: 'Bullet', value: 'bullet' },
      { title: 'Numbered', value: 'number' },
    ],
    marks: {
      decorators: [
        { title: 'Bold', value: 'strong' },
        { title: 'Italic', value: 'em' },
        { title: 'Underline', value: 'underline' },
      ],
      annotations: [
        {
          name: 'externalLink',
          title: 'External Link',
          type: 'object',
          fields: [
            defineField({
              name: 'href',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              initialValue: true,
            }),
          ],
        },
        {
          name: 'internalLink',
          title: 'Internal Link',
          type: 'object',
          fields: [
            defineField({
              name: 'reference',
              title: 'Page',
              type: 'reference',
              to: [
                { type: 'page' },
                { type: 'service' },
                { type: 'teamMember' },
                { type: 'blogPost' },
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    },
  }),
  defineArrayMember({
    type: 'imageWithAlt',
  }),
]

export const portableText = defineType({
  name: 'portableText',
  title: 'Rich Text',
  type: 'array',
  of: portableTextOf,
})
