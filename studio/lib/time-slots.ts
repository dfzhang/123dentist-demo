// =============================================================================
// Time Slot Generation for Business Hours
// =============================================================================
// Generates 15-minute increment time slots from 5:00 AM to 10:00 PM.
// Internal format: 24h ("08:00", "13:30")
// Display format: 12h ("8:00 AM", "1:30 PM")
// =============================================================================

interface TimeSlot {
  title: string // "8:00 AM"
  value: string // "08:00"
}

export function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = []

  for (let hour = 5; hour <= 22; hour++) {
    for (let min = 0; min < 60; min += 15) {
      // Skip 10:15 PM, 10:30 PM, 10:45 PM — end at 10:00 PM
      if (hour === 22 && min > 0) break

      const value = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`

      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
      const period = hour >= 12 ? 'PM' : 'AM'
      const title = `${displayHour}:${String(min).padStart(2, '0')} ${period}`

      slots.push({ title, value })
    }
  }

  return slots
}

export const TIME_SLOTS = generateTimeSlots()
