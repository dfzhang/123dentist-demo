import { defineType, defineField, defineArrayMember } from 'sanity'

const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'object',
  fields: [
    defineField({
      name: 'beforeImage',
      title: 'Before Image',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'afterImage',
      title: 'After Image',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'procedure',
      title: 'Procedure',
      type: 'string',
      description: 'e.g., "Invisalign", "Veneers"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'consentObtained',
      title: 'Patient Consent Obtained',
      type: 'boolean',
      description: 'HIPAA: Confirm patient has consented to sharing these images',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (value !== true) return 'Patient consent is required to display gallery images'
          return true
        }),
    }),
  ],
  preview: {
    select: {
      procedure: 'procedure',
      consent: 'consentObtained',
      media: 'afterImage',
    },
    prepare({ procedure, consent, media }) {
      return {
        title: procedure || 'Gallery Item',
        subtitle: consent ? '✅ Consent on file' : '⚠️ No consent',
        media,
      }
    },
  },
})

const smileGallery = defineType({
  name: 'smileGallery',
  title: 'Smile Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'items',
      title: 'Gallery Items',
      type: 'array',
      of: [defineArrayMember({ type: 'galleryItem' })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare({ title, items }) {
      const count = items?.length || 0
      return {
        title: title || 'Smile Gallery',
        subtitle: `${count} item${count === 1 ? '' : 's'}`,
      }
    },
  },
})

export { galleryItem, smileGallery }
