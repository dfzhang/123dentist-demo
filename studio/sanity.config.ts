// =============================================================================
// sanity.config.ts — Multi-Workspace Configuration
// =============================================================================
// Generates three kinds of workspaces:
//   1. Admin — corporate-wide view of everything
//   2. Office — one per office (single-tenant editing surface, original pattern)
//   3. Dental Group — one per group; contains multiple offices, drill in to edit
//
// Office workspaces and Group workspaces coexist. Some offices are standalone
// (only in office-registry.ts). Others belong to a group (listed in both
// office-registry.ts AND group-registry.ts — they appear in both workspaces).
//
// i18n strategy:
//   - Document-level (@sanity/document-internationalization) for content types
//   - Field-level (sanity-plugin-internationalized-array) for 5 office fields
//   - Structure Builder filters to language == "en" (base language)
//   - Translators use the plugin's built-in translation panel for FR
//
// Benchmark-validated: 451 workspaces in <1ms config eval, <2MB memory.
// =============================================================================

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { documentInternationalization } from '@sanity/document-internationalization'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { assist } from '@sanity/assist'
import { schemaTypes } from './schemas'
import { offices, type OfficeEntry } from './lib/office-registry'
import {
  dentalGroups,
  officesForGroup,
  type DentalGroupEntry,
} from './lib/group-registry'
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  I18N_DOCUMENT_TYPES,
} from './lib/i18n'
import { createLocationResolver, createGroupLocationResolver } from './lib/resolve-locations'

// =============================================================================
// Constants
// =============================================================================

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || 'kr0ivyaf'
const DATASET = process.env.SANITY_STUDIO_DATASET || 'production'

// =============================================================================
// Structure Builder — Office-scoped content tree
// =============================================================================
// All translatable document lists filter to language == "en" (base language).
// FR translations are accessed via the plugin's translation panel on each
// document form — not mixed into the document lists.
// translation.metadata docs are hidden from all lists.
// =============================================================================

/**
 * Build the list of content items (Office Info, Pages, Services, ...) for a
 * single office. Extracted so both the standalone office workspace and the
 * group workspace's per-office drill-down can render the same tree.
 */
function officeContentItems(S: any, officeId: string) {
  return [
    S.listItem()
      .title('Office Info')
      .icon(() => '🦷')
      .child(
        S.documentList()
          .title('Office')
          .filter('_type == "office" && _id == $officeId')
          .params({ officeId })
          .defaultLayout('detail')
      ),
    S.divider(),
    S.listItem()
      .title('Pages')
      .icon(() => '📄')
      .child(
        S.documentList()
          .title('Pages')
          .filter(
            '_type == "page" && office._ref == $officeId && language == $lang'
          )
          .params({ officeId, lang: DEFAULT_LANGUAGE })
      ),
    S.listItem()
      .title('Services')
      .icon(() => '⭐')
      .child(
        S.documentList()
          .title('Services')
          .filter(
            '_type == "service" && office._ref == $officeId && language == $lang'
          )
          .params({ officeId, lang: DEFAULT_LANGUAGE })
      ),
    S.listItem()
      .title('Team Members')
      .icon(() => '👤')
      .child(
        S.documentList()
          .title('Team Members')
          .filter(
            '_type == "teamMember" && office._ref == $officeId && language == $lang'
          )
          .params({ officeId, lang: DEFAULT_LANGUAGE })
      ),
    S.listItem()
      .title('Testimonials')
      .icon(() => '💬')
      .child(
        S.documentList()
          .title('Testimonials')
          .filter(
            '_type == "testimonial" && office._ref == $officeId && language == $lang'
          )
          .params({ officeId, lang: DEFAULT_LANGUAGE })
      ),
    S.listItem()
      .title('FAQs')
      .icon(() => '❓')
      .child(
        S.documentList()
          .title('FAQs')
          .filter(
            '_type == "faq" && office._ref == $officeId && language == $lang'
          )
          .params({ officeId, lang: DEFAULT_LANGUAGE })
      ),
    S.listItem()
      .title('Blog Posts')
      .icon(() => '📝')
      .child(
        S.documentList()
          .title('Blog Posts')
          .filter('_type == "blogPost" && office._ref == $officeId')
          .params({ officeId })
        // blogPost has no language field — no i18n (deferred to v2)
      ),
  ]
}

function officeStructure(officeId: string) {
  return structureTool({
    structure: (S) =>
      S.list().title('Content').items(officeContentItems(S, officeId)),
  })
}

// =============================================================================
// Structure Builder — Group workspace (multi-office drill-down)
// =============================================================================
// The group workspace shows a list of offices at the top level. Each office
// expands into the same content tree used by the standalone office workspace
// (Office Info, Pages, Services, Team, ...). Editors pick which office they
// want to edit, then work exactly as they would in that office's own workspace.
// =============================================================================

function groupStructure(group: DentalGroupEntry) {
  const groupOffices = officesForGroup(group)

  return structureTool({
    name: 'group-content',
    title: 'Content',
    structure: (S) =>
      S.list()
        .title(group.name)
        .items([
          // Group info — corporate settings for the group itself
          S.listItem()
            .title('Group Info')
            .icon(() => '🏢')
            .child(
              S.documentList()
                .title('Group')
                .filter('_type == "dentalGroup" && _id == $groupId')
                .params({ groupId: group.id })
                .defaultLayout('detail')
            ),
          S.divider(),
          // One list item per office in the group
          ...groupOffices.map((office) =>
            S.listItem()
              .title(office.name)
              .icon(() => '🦷')
              .child(
                S.list()
                  .title(office.name)
                  .items(officeContentItems(S, office.id))
              )
          ),
        ]),
  })
}

// =============================================================================
// Structure Builder — Admin workspace (corporate view)
// =============================================================================

function adminStructure() {
  return structureTool({
    structure: (S) =>
      S.list()
        .title('Admin')
        .items([
          S.listItem()
            .title('All Groups')
            .icon(() => '🏢')
            .child(
              S.documentList()
                .title('Dental Groups')
                .filter('_type == "dentalGroup"')
            ),
          S.listItem()
            .title('All Offices')
            .icon(() => '🦷')
            .child(
              S.documentList()
                .title('Offices')
                .filter('_type == "office"')
            ),
          S.listItem()
            .title('Insurance Providers')
            .icon(() => '🏥')
            .child(
              S.documentList()
                .title('Insurance Providers')
                .filter('_type == "insuranceProvider"')
            ),
          S.divider(),
          // Translatable types — filter to base language
          S.listItem()
            .title('All Pages')
            .icon(() => '📄')
            .child(
              S.documentList()
                .title('All Pages')
                .filter('_type == "page" && language == $lang')
                .params({ lang: DEFAULT_LANGUAGE })
            ),
          S.listItem()
            .title('All Services')
            .icon(() => '⭐')
            .child(
              S.documentList()
                .title('All Services')
                .filter('_type == "service" && language == $lang')
                .params({ lang: DEFAULT_LANGUAGE })
            ),
          S.listItem()
            .title('All Team Members')
            .icon(() => '👤')
            .child(
              S.documentList()
                .title('All Team Members')
                .filter('_type == "teamMember" && language == $lang')
                .params({ lang: DEFAULT_LANGUAGE })
            ),
          S.listItem()
            .title('All Blog Posts')
            .icon(() => '📝')
            .child(
              S.documentList()
                .title('All Blog Posts')
                .filter('_type == "blogPost"')
                // No language filter — blogPost has no i18n
            ),
          S.listItem()
            .title('All Testimonials')
            .icon(() => '💬')
            .child(
              S.documentList()
                .title('All Testimonials')
                .filter('_type == "testimonial" && language == $lang')
                .params({ lang: DEFAULT_LANGUAGE })
            ),
          S.listItem()
            .title('All FAQs')
            .icon(() => '❓')
            .child(
              S.documentList()
                .title('All FAQs')
                .filter('_type == "faq" && language == $lang')
                .params({ lang: DEFAULT_LANGUAGE })
            ),
        ]),
  })
}

// =============================================================================
// Initial Value Templates — Auto-set office reference + base language
// =============================================================================

function officeTemplates(officeId: string) {
  // Types with office ref + language (document-level i18n)
  const i18nDocTypes = ['page', 'service', 'teamMember', 'faq', 'testimonial']
  // Types with office ref only (no i18n)
  const nonI18nDocTypes = ['blogPost']

  return (prev: any[]) => [
    ...prev.filter(
      (t: any) =>
        !i18nDocTypes.includes(t.schemaType) &&
        !nonI18nDocTypes.includes(t.schemaType)
    ),
    ...i18nDocTypes.map((type) => ({
      id: `${type}-for-${officeId}`,
      title: `New ${type}`,
      schemaType: type,
      value: {
        office: { _type: 'reference', _ref: officeId },
        language: DEFAULT_LANGUAGE,
      },
    })),
    ...nonI18nDocTypes.map((type) => ({
      id: `${type}-for-${officeId}`,
      title: `New ${type}`,
      schemaType: type,
      value: {
        office: { _type: 'reference', _ref: officeId },
      },
    })),
  ]
}

// =============================================================================
// Presentation Tool — Per-workspace preview URLs
// =============================================================================

function officePresentation(office: OfficeEntry) {
  // Preview URL: use SANITY_STUDIO_PREVIEW_BASE if set (for tunneled dev),
  // otherwise fall back to the office's production domain.
  // The frontend uses [office]/... routing, so we prefix routes with the office slug.
  const previewBase = process.env.SANITY_STUDIO_PREVIEW_BASE
    ? `${process.env.SANITY_STUDIO_PREVIEW_BASE}/${office.slug}`
    : office.domain

  return presentationTool({
    previewUrl: {
      initial: previewBase,
      previewMode: {
        enable: '/api/draft-mode/enable',
      },
    },
    resolve: {
      // "Used on X pages" — shows which pages reference the current document
      // with clickable links that open in the Presentation tool preview.
      // Applies to: service, teamMember, faq, testimonial, insuranceProvider
      locations: createLocationResolver(office.id, office.slug),
      mainDocuments: [
        {
          route: `/${office.slug}`,
          filter: `_type == "page" && pageType == "home" && office._ref == "${office.id}" && language == "${DEFAULT_LANGUAGE}"`,
        },
        {
          route: `/${office.slug}/:slug`,
          filter: `_type == "page" && slug.current == $slug && office._ref == "${office.id}" && language == "${DEFAULT_LANGUAGE}"`,
        },
        {
          route: `/${office.slug}/services/:slug`,
          filter: `_type == "service" && slug.current == $slug && office._ref == "${office.id}" && language == "${DEFAULT_LANGUAGE}"`,
        },
        {
          route: `/${office.slug}/team/:slug`,
          filter: `_type == "teamMember" && slug.current == $slug && office._ref == "${office.id}" && language == "${DEFAULT_LANGUAGE}"`,
        },
        {
          // blogPost has no i18n — no language filter
          route: `/${office.slug}/blog/:slug`,
          filter: `_type == "blogPost" && slug.current == $slug && office._ref == "${office.id}"`,
        },
      ],
    },
  })
}

// =============================================================================
// Group Templates — Initial value templates for every office in the group
// =============================================================================
// When creating a new Page/Service/etc. from a group workspace, editors pick
// which office it belongs to. We generate one template per (docType, office)
// pair so the office reference + language are auto-set correctly.
// =============================================================================

function groupTemplates(group: DentalGroupEntry) {
  const groupOffices = officesForGroup(group)
  const i18nDocTypes = ['page', 'service', 'teamMember', 'faq', 'testimonial']
  const nonI18nDocTypes = ['blogPost']

  return (prev: any[]) => [
    // Drop the default templates for these types — we replace them with
    // per-office variants so the office ref is always set.
    ...prev.filter(
      (t: any) =>
        !i18nDocTypes.includes(t.schemaType) &&
        !nonI18nDocTypes.includes(t.schemaType)
    ),
    // For each office in the group, add one template per doc type.
    // Titles include the office name so editors can tell them apart.
    ...groupOffices.flatMap((office) => [
      ...i18nDocTypes.map((type) => ({
        id: `${type}-for-${office.id}`,
        title: `New ${type} (${office.name})`,
        schemaType: type,
        value: {
          office: { _type: 'reference', _ref: office.id },
          language: DEFAULT_LANGUAGE,
        },
      })),
      ...nonI18nDocTypes.map((type) => ({
        id: `${type}-for-${office.id}`,
        title: `New ${type} (${office.name})`,
        schemaType: type,
        value: {
          office: { _type: 'reference', _ref: office.id },
        },
      })),
    ]),
  ]
}

// =============================================================================
// Group Presentation Tool — Multi-office preview routes
// =============================================================================
// One Presentation tool per group workspace. mainDocuments contain routes
// for every office in the group. The location resolver picks the correct
// office context from the document's office._ref, so "Used on X pages" links
// resolve to the right office's frontend URLs.
// =============================================================================

function groupPresentation(group: DentalGroupEntry) {
  const groupOffices = officesForGroup(group)
  const previewBase =
    process.env.SANITY_STUDIO_PREVIEW_BASE ||
    // Fallback: use the first office's domain root as the initial preview URL.
    // Editors will navigate to the right office once they open a document.
    (groupOffices[0]?.domain
      ? new URL(groupOffices[0].domain).origin
      : 'http://localhost:3000')

  return presentationTool({
    previewUrl: {
      initial: previewBase,
      previewMode: {
        enable: '/api/draft-mode/enable',
      },
    },
    resolve: {
      // Location resolver picks office context from document.office._ref at
      // runtime, so a single group-scoped resolver covers all member offices.
      locations: createGroupLocationResolver(group),
      mainDocuments: groupOffices.flatMap((office) => [
        {
          route: `/${office.slug}`,
          filter: `_type == "page" && pageType == "home" && office._ref == "${office.id}" && language == "${DEFAULT_LANGUAGE}"`,
        },
        {
          route: `/${office.slug}/:slug`,
          filter: `_type == "page" && slug.current == $slug && office._ref == "${office.id}" && language == "${DEFAULT_LANGUAGE}"`,
        },
        {
          route: `/${office.slug}/services/:slug`,
          filter: `_type == "service" && slug.current == $slug && office._ref == "${office.id}" && language == "${DEFAULT_LANGUAGE}"`,
        },
        {
          route: `/${office.slug}/team/:slug`,
          filter: `_type == "teamMember" && slug.current == $slug && office._ref == "${office.id}" && language == "${DEFAULT_LANGUAGE}"`,
        },
        {
          route: `/${office.slug}/blog/:slug`,
          filter: `_type == "blogPost" && slug.current == $slug && office._ref == "${office.id}"`,
        },
      ]),
    },
  })
}

// =============================================================================
// i18n Plugins — Document-level + Field-level
// =============================================================================

function i18nPlugins() {
  return [
    // Document-level: duplicates entire documents per language
    // Used by: page, service, teamMember, faq, testimonial
    documentInternationalization({
      supportedLanguages: SUPPORTED_LANGUAGES,
      schemaTypes: [...I18N_DOCUMENT_TYPES],
    }),
    // Field-level: wraps individual fields in language arrays
    // Used by: office (tagline, description, insuranceNotes, newPatientInfo, financingInfo)
    internationalizedArray({
      languages: SUPPORTED_LANGUAGES,
      defaultLanguages: ['en'],
      fieldTypes: [
        'string',
        'text',
        // Named type for Portable Text fields (newPatientInfo, financingInfo)
        // Uses the portableTextSimple type registered in schemas/objects/portable-text-simple.ts
        // The plugin creates internationalizedArrayPortableTextSimple from this name
        'portableTextSimple',
      ],
    }),
    // AI Assist: adds ✨ sparkle icon for AI-powered actions including
    // one-click document translation (English → French)
    assist({
      translate: {
        document: {
          // Matches the hidden `language` field on all i18n document types
          languageField: 'language',
          // Only enable for document-level i18n types
          documentTypes: [...I18N_DOCUMENT_TYPES],
        },
      },
    }),
  ]
}

// =============================================================================
// Workspace Generation
// =============================================================================

function officeWorkspace(office: OfficeEntry) {
  return {
    name: office.slug,
    title: office.name,
    subtitle: office.city,
    basePath: `/${office.slug}`,
    projectId: PROJECT_ID,
    dataset: DATASET,
    schema: {
      types: schemaTypes,
      templates: officeTemplates(office.id),
    },
    plugins: [
      officeStructure(office.id),
      officePresentation(office),
      ...i18nPlugins(),
    ],
  }
}

function adminWorkspace() {
  return {
    name: 'admin',
    title: '123Dentist Admin',
    subtitle: 'Corporate',
    basePath: '/admin',
    projectId: PROJECT_ID,
    dataset: DATASET,
    schema: {
      types: schemaTypes,
    },
    plugins: [
      adminStructure(),
      ...i18nPlugins(),
    ],
  }
}

function groupWorkspace(group: DentalGroupEntry) {
  const groupOffices = officesForGroup(group)
  const subtitle =
    group.description ||
    `Dental group — ${groupOffices.length} office${groupOffices.length === 1 ? '' : 's'}`

  return {
    name: group.slug,
    title: group.name,
    subtitle,
    basePath: `/${group.slug}`,
    projectId: PROJECT_ID,
    dataset: DATASET,
    schema: {
      types: schemaTypes,
      templates: groupTemplates(group),
    },
    plugins: [
      groupStructure(group),
      groupPresentation(group),
      ...i18nPlugins(),
    ],
  }
}

// =============================================================================
// Export — The config array Sanity evaluates at startup
// =============================================================================

export default defineConfig([
  adminWorkspace(),
  ...dentalGroups.map(groupWorkspace),
  ...offices.map(officeWorkspace),
])
