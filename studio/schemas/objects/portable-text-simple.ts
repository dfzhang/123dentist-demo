import { defineType, defineField, defineArrayMember } from 'sanity'

// =============================================================================
// Portable Text Simple — Named type for internationalizedArray plugin
// =============================================================================
// The internationalizedArray plugin can't use anonymous objects in fieldTypes.
// This named type is registered so we can wrap Portable Text fields in
// internationalizedArrayPortableTextSimple on the office singleton.
//
// Intentionally simpler than the full portableText type — office info fields
// (newPatientInfo, financingInfo) don't need internal links or image embeds.
// Just formatted text with external links.
// =============================================================================

export const portableTextSimple = defineType({
  name: 'portableTextSimple',
  title: 'Simple Rich Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
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
        ],
      },
    }),
  ],
})
