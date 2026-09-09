// =============================================================================
// Document Location Resolver — Presentation tool locations for documents
// =============================================================================
// Uses Sanity's Presentation Resolver API to show editors where each document
// appears on the frontend. Each location is a clickable link that opens the
// Presentation tool preview for that URL.
//
// Handles two cases:
// 1. Page documents — resolve to their own frontend URL (home → /, others → /slug)
// 2. Referenceable types (service, teamMember, faq, testimonial, insuranceProvider)
//    — resolve to their detail page (if any) + all pages that reference them
//
// Uses listenQuery for real-time updates — locations update as editors change references.
// =============================================================================

import { type DocumentLocationResolver } from 'sanity/presentation'
import { map, of, switchMap, type Observable } from 'rxjs'
import type { OfficeEntry } from './office-registry'

// Types that can be referenced from page builder blocks
const REFERENCEABLE_TYPES = [
  'service',
  'teamMember',
  'faq',
  'testimonial',
  'insuranceProvider',
] as const

// Page types that map to the root URL (no slug in path)
const HOME_PAGE_TYPE = 'home'

/**
 * Resolve the frontend URL for a page document.
 * Home pages → /{officeSlug}/, all others → /{officeSlug}/{slug}
 * Returns null if the page has no resolvable URL.
 */
function pageToHref(
  page: { pageType?: string; slug?: { current?: string } },
  officeSlug: string
): string | null {
  if (page.pageType === HOME_PAGE_TYPE) {
    return `/${officeSlug}`
  }
  if (page.slug?.current) {
    return `/${officeSlug}/${page.slug.current}`
  }
  return null
}

/**
 * Resolve locations for a Page document — just its own URL.
 */
function resolvePageLocations(
  params: { id: string },
  context: { documentStore: { listenQuery: Function } },
  officeSlug: string
) {
  const doc$ = context.documentStore.listenQuery(
    /* groq */ `*[_id == $id][0] { title, pageType, slug }`,
    { id: params.id },
    { perspective: 'previewDrafts' }
  )

  return doc$.pipe(
    map((page: { title?: string; pageType?: string; slug?: { current?: string } } | null) => {
      if (!page) {
        return { message: 'Unable to resolve location', tone: 'critical' as const }
      }

      const href = pageToHref(page, officeSlug)
      if (!href) {
        return { message: 'Page has no URL yet — set a slug or page type', tone: 'caution' as const }
      }

      return {
        locations: [{ title: page.title || 'Untitled page', href }],
      }
    })
  )
}

/**
 * Resolve locations for referenceable types — own detail page + pages referencing them.
 */
function resolveReferenceableLocations(
  params: { id: string; type: string },
  context: { documentStore: { listenQuery: Function } },
  officeId: string,
  officeSlug: string
) {
  const type = params.type

  const doc$ = context.documentStore.listenQuery(
    /* groq */ `{
      "self": *[_id == $id][0] {
        _type,
        "name": coalesce(name, patientName, question, title),
        "slug": slug.current
      },
      "pages": *[
        _type == "page"
        && references($id)
        && office._ref == $officeId
      ] {
        _id,
        title,
        pageType,
        slug
      }
    }`,
    { id: params.id, officeId },
    { perspective: 'previewDrafts' }
  )

  return doc$.pipe(
    map((result) => {
      if (!result) {
        return { message: 'Unable to resolve locations', tone: 'critical' as const }
      }

      const { self, pages } = result as {
        self: { _type: string; name?: string; slug?: string } | null
        pages: Array<{ _id: string; title?: string; pageType?: string; slug?: { current?: string } }>
      }

      const locations: Array<{ title: string; href: string }> = []

      // 1. Document's own detail page (services → /services/:slug, team → /team/:slug)
      if (self?.slug) {
        switch (type) {
          case 'service':
            locations.push({ title: self.name || 'Service detail', href: `/${officeSlug}/services/${self.slug}` })
            break
          case 'teamMember':
            locations.push({ title: self.name || 'Team member profile', href: `/${officeSlug}/team/${self.slug}` })
            break
          // faq, testimonial, insuranceProvider don't have their own detail pages
        }
      }

      // 2. All pages that reference this document
      for (const page of pages) {
        const href = pageToHref(page, officeSlug)
        if (href) {
          locations.push({ title: page.title || 'Untitled page', href })
        }
      }

      if (locations.length === 0) {
        return { message: 'Not used on any pages yet', tone: 'caution' as const }
      }

      return {
        locations,
        ...(self?.slug && (type === 'service' || type === 'teamMember')
          ? { message: `Has detail page + used on ${pages.length} page${pages.length === 1 ? '' : 's'}` }
          : {}),
      }
    })
  )
}

/**
 * Create a DocumentLocationResolver scoped to a specific office.
 *
 * - Page documents: resolve to their own frontend URL
 * - Referenceable types: resolve to detail page + all referencing pages
 * - All other types: return null (no locations banner)
 *
 * All hrefs are prefixed with /{officeSlug} to match the frontend's
 * [office]/... routing structure.
 */
export function createLocationResolver(
  officeId: string,
  officeSlug: string
): DocumentLocationResolver {
  return (params, context) => {
    // Pages get their own URL as a location
    if (params.type === 'page') {
      return resolvePageLocations(params, context as any, officeSlug)
    }

    // Referenceable types get detail page + referencing pages
    if (REFERENCEABLE_TYPES.includes(params.type as any)) {
      return resolveReferenceableLocations(params, context as any, officeId, officeSlug)
    }

    // All other types — no locations banner
    return null
  }
}

/**
 * Create a DocumentLocationResolver for a group workspace.
 *
 * A group workspace hosts content for multiple offices, so we can't hardcode
 * a single (officeId, officeSlug) pair. Instead, this resolver reads the
 * target document's `office._ref` and looks up the corresponding office in
 * the passed-in roster, then delegates to the same helpers used by the
 * single-office resolver.
 *
 * Documents without an office field (or referencing an office outside the
 * group — shouldn't happen but defensive) get no locations banner.
 */
export function createGroupLocationResolver(
  groupOffices: readonly OfficeEntry[]
): DocumentLocationResolver {
  const officesById = new Map(groupOffices.map((o) => [o.id, o]))

  return (params, context) => {
    // Only Pages and referenceable types have resolvable locations.
    if (
      params.type !== 'page' &&
      !REFERENCEABLE_TYPES.includes(params.type as any)
    ) {
      return null
    }

    // First: look up the document's office reference to pick the right slug.
    const ctx = context as any
    const officeLookup$: Observable<OfficeEntry | null> =
      ctx.documentStore.listenQuery(
        /* groq */ `*[_id == $id][0]{ "officeRef": office._ref }`,
        { id: params.id },
        { perspective: 'previewDrafts' }
      ).pipe(
        map((res: { officeRef?: string } | null) =>
          res?.officeRef ? officesById.get(res.officeRef) ?? null : null
        )
      )

    // Second: once we know the office, delegate to the appropriate single-office
    // resolver. switchMap ensures we swap to a new subscription if the office
    // reference on the document changes.
    return officeLookup$.pipe(
      switchMap((office) => {
        if (!office) return of(null)
        if (params.type === 'page') {
          return resolvePageLocations(params as any, ctx, office.slug) as Observable<any>
        }
        return resolveReferenceableLocations(
          params as any,
          ctx,
          office.id,
          office.slug
        ) as Observable<any>
      })
    )
  }
}
