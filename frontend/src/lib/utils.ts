import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get localized value from internationalized array field
// Falls back to English if requested language not found
export function getLocalizedValue<T extends { _key: string; value: unknown }>(
  field: T[] | undefined,
  language: string = 'en'
): T['value'] | undefined {
  if (!field || field.length === 0) return undefined
  const match = field.find((item) => item._key === language)
  if (match) return match.value
  // Fallback to English
  const fallback = field.find((item) => item._key === 'en')
  return fallback?.value
}

// Format phone number for display
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `(${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  return phone
}

// Format time from 24h to 12h display
export function formatTime(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}
