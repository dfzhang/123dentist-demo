import { defineType, defineField } from 'sanity'

export const address = defineType({
  name: 'address',
  title: 'Address',
  type: 'object',
  fields: [
    defineField({
      name: 'street',
      title: 'Street Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'suite',
      title: 'Suite / Unit',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'province',
      title: 'Province',
      type: 'string',
      options: {
        list: [
          { title: 'Alberta', value: 'AB' },
          { title: 'British Columbia', value: 'BC' },
          { title: 'Manitoba', value: 'MB' },
          { title: 'New Brunswick', value: 'NB' },
          { title: 'Newfoundland and Labrador', value: 'NL' },
          { title: 'Nova Scotia', value: 'NS' },
          { title: 'Ontario', value: 'ON' },
          { title: 'Prince Edward Island', value: 'PE' },
          { title: 'Quebec', value: 'QC' },
          { title: 'Saskatchewan', value: 'SK' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'postalCode',
      title: 'Postal Code',
      type: 'string',
      validation: (Rule) =>
        Rule.required().regex(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, {
          name: 'postal code',
        }).error('Must be a valid Canadian postal code (e.g., V6B 1A1)'),
    }),
    defineField({
      name: 'coordinates',
      title: 'Map Coordinates',
      type: 'geopoint',
      description: 'For Google Maps embed',
    }),
  ],
})
