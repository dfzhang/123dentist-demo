import { defineType, defineField, defineArrayMember } from 'sanity'
import { TIME_SLOTS } from '../../lib/time-slots'

const dayHours = defineType({
  name: 'dayHours',
  title: 'Day Hours',
  type: 'object',
  fields: [
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      options: {
        list: [
          { title: 'Monday', value: 'monday' },
          { title: 'Tuesday', value: 'tuesday' },
          { title: 'Wednesday', value: 'wednesday' },
          { title: 'Thursday', value: 'thursday' },
          { title: 'Friday', value: 'friday' },
          { title: 'Saturday', value: 'saturday' },
          { title: 'Sunday', value: 'sunday' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isClosed',
      title: 'Closed',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'openTime',
      title: 'Open',
      type: 'string',
      options: {
        list: TIME_SLOTS,
      },
      hidden: ({ parent }) => parent?.isClosed === true,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { isClosed?: boolean }
          if (parent?.isClosed) return true
          if (!value) return 'Open time is required when not closed'
          return true
        }),
    }),
    defineField({
      name: 'closeTime',
      title: 'Close',
      type: 'string',
      options: {
        list: TIME_SLOTS,
      },
      hidden: ({ parent }) => parent?.isClosed === true,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { isClosed?: boolean; openTime?: string }
          if (parent?.isClosed) return true
          if (!value) return 'Close time is required when not closed'
          if (parent?.openTime && value <= parent.openTime) {
            return 'Close time must be after open time'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      day: 'day',
      isClosed: 'isClosed',
      openTime: 'openTime',
      closeTime: 'closeTime',
    },
    prepare({ day, isClosed, openTime, closeTime }) {
      const dayTitle = day ? day.charAt(0).toUpperCase() + day.slice(1) : 'Unknown'
      if (isClosed) return { title: dayTitle, subtitle: 'Closed' }
      const open = TIME_SLOTS.find((s) => s.value === openTime)?.title || openTime
      const close = TIME_SLOTS.find((s) => s.value === closeTime)?.title || closeTime
      return { title: dayTitle, subtitle: `${open} – ${close}` }
    },
  },
})

const businessHours = defineType({
  name: 'businessHours',
  title: 'Business Hours',
  type: 'object',
  fields: [
    defineField({
      name: 'hours',
      title: 'Weekly Hours',
      type: 'array',
      of: [defineArrayMember({ type: 'dayHours' })],
      validation: (Rule) => Rule.max(7),
    }),
    defineField({
      name: 'holidayNote',
      title: 'Holiday Note',
      type: 'string',
      description: 'e.g., "Closed on statutory holidays"',
      validation: (Rule) => Rule.max(200),
    }),
  ],
})

export { dayHours, businessHours }
