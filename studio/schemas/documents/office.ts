import { defineType, defineField, defineArrayMember } from 'sanity'

export const office = defineType({
  name: 'office',
  title: 'Office',
  type: 'document',
  groups: [
    { name: 'info', title: 'Info', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'hours', title: 'Hours' },
    { name: 'insurance', title: 'Insurance' },
    { name: 'patients', title: 'Patients' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Info group
    defineField({
      name: 'name',
      title: 'Office Name',
      type: 'string',
      group: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'info',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    // i18n field-level: tagline (string → internationalizedArrayString)
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'internationalizedArrayString',
      group: 'info',
      description: 'Short tagline for the office (max 100 chars per language)',
    }),
    // i18n field-level: description (text → internationalizedArrayText)
    defineField({
      name: 'description',
      title: 'Description',
      type: 'internationalizedArrayText',
      group: 'info',
      description: 'About this office — shown on the website',
    }),
    defineField({
      name: 'logo',
      title: 'Office Logo',
      type: 'imageWithAlt',
      group: 'info',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'imageWithAlt',
      group: 'info',
    }),

    // Contact group
    defineField({
      name: 'address',
      title: 'Address',
      type: 'address',
      group: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'contactInfo',
      group: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media',
      type: 'socialLinks',
      group: 'contact',
    }),

    // Hours group
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'businessHours',
      group: 'hours',
    }),

    // Insurance group
    defineField({
      name: 'insuranceProviders',
      title: 'Accepted Insurance Providers',
      type: 'array',
      group: 'insurance',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'insuranceProvider' }],
          // insuranceProvider is corporate-managed — no office scoping needed
        }),
      ],
      description: 'Select from the corporate insurance provider list',
    }),
    // i18n field-level: insuranceNotes (text → internationalizedArrayText)
    defineField({
      name: 'insuranceNotes',
      title: 'Insurance Notes',
      type: 'internationalizedArrayText',
      group: 'insurance',
      description: 'Additional notes about insurance acceptance, payment plans, etc.',
    }),

    // Patients group
    // i18n field-level: newPatientInfo (portableText → internationalizedArrayPortableTextSimple)
    defineField({
      name: 'newPatientInfo',
      title: 'New Patient Information',
      type: 'internationalizedArrayPortableTextSimple',
      group: 'patients',
      description: 'What new patients need to know — forms, first visit, etc.',
    }),
    // i18n field-level: financingInfo (portableText → internationalizedArrayPortableTextSimple)
    defineField({
      name: 'financingInfo',
      title: 'Financing Information',
      type: 'internationalizedArrayPortableTextSimple',
      group: 'patients',
      description: 'Payment plans, financing options, etc.',
    }),

    // Navigation group
    defineField({
      name: 'mainNavigation',
      title: 'Main Navigation',
      type: 'array',
      group: 'navigation',
      of: [defineArrayMember({ type: 'navItem' })],
      description: 'Primary navigation menu for this office website',
    }),
    defineField({
      name: 'footerNavigation',
      title: 'Footer Navigation',
      type: 'array',
      group: 'navigation',
      of: [defineArrayMember({ type: 'navItem' })],
    }),

    // SEO group
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'address.city',
      media: 'logo',
    },
  },
})
