// =============================================================================
// i18n Configuration — Shared language definitions
// =============================================================================
// Single source of truth for supported languages.
// Used by both plugins:
//   - @sanity/document-internationalization (document-level)
//   - sanity-plugin-internationalized-array (field-level on office)
// =============================================================================

export const SUPPORTED_LANGUAGES = [
  { id: 'en' as const, title: 'English' },
  { id: 'fr' as const, title: 'French' },
]

export const DEFAULT_LANGUAGE = 'en'

export type LanguageId = (typeof SUPPORTED_LANGUAGES)[number]['id']

// Document types that use document-level i18n
// Each gets a hidden `language` field + translation metadata
export const I18N_DOCUMENT_TYPES = [
  'page',
  'service',
  'teamMember',
  'faq',
  'testimonial',
] as const
