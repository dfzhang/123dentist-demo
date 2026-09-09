import { defineType, defineField } from 'sanity'

/**
 * DentalGroup — a corporate group that owns one or more offices.
 *
 * Groups sit above Office in the org hierarchy:
 *   dentalGroup (1) ──▶ office (N) ──▶ page/service/teamMember/... (N)
 *
 * A group can contain a single office (essentially a standalone practice) or many.
 * Offices without a group reference remain valid — they show up as standalone
 * office workspaces (the original per-office pattern).
 *
 * Groups get their own Sanity workspace where editors can browse all offices in
 * the group from one login and drill into any office to edit its content.
 * Content docs remain office-scoped — the group is purely an organizational layer.
 */
export const dentalGroup = defineType({
  name: 'dentalGroup',
  title: 'Dental Group',
  type: 'document',
  groups: [
    { name: 'info', title: 'Info', default: true },
    { name: 'branding', title: 'Branding' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Group Name',
      type: 'string',
      group: 'info',
      description: 'e.g. "Pacific Dental Group"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'info',
      description: 'Used for the group workspace URL (basePath)',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'info',
      description: 'Internal description of the group — not shown on any office site',
    }),
    defineField({
      name: 'logo',
      title: 'Group Logo',
      type: 'imageWithAlt',
      group: 'branding',
      description: 'Corporate group logo (optional — offices can still have their own)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled group',
        subtitle: subtitle || 'Dental group',
        media,
      }
    },
  },
})
