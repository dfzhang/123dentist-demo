// =============================================================================
// Office-Scoped Reference Helpers
// =============================================================================
// Two helpers for filtering references to the current office's content:
//
// 1. officeScopedRefOptions('service')  — for single reference fields
//    Returns { filter: fn } for the `options` prop of defineField({ type: 'reference' })
//
// 2. officeScopedArrayItem('service')   — for array-of-references fields
//    Returns a full { type: 'reference', to: [...], options: { filter: fn } } entry
//
// Both share officeScopedFilterFn which reads document.office._ref from the
// ROOT document (Sanity always passes the root, even in nested arrays).
//
// Defensive fallback: if office._ref is missing, returns a filter that matches
// nothing ('_id == "___nonexistent___"'). Show nothing, not everything.
// =============================================================================

import type { ReferenceFilterResolverContext } from 'sanity'

function officeScopedFilterFn({ document }: ReferenceFilterResolverContext) {
  const officeRef = (document?.office as { _ref?: string })?._ref
  if (!officeRef) {
    return { filter: '_id == "___nonexistent___"' }
  }
  return {
    filter: 'office._ref == $officeId',
    params: { officeId: officeRef },
  }
}

export function officeScopedRefOptions(
  // Param unused but documents the expected reference type at callsites:
  // officeScopedRefOptions('teamMember') reads better than officeScopedRefOptions()
  _refType: string
) {
  return {
    filter: officeScopedFilterFn,
  }
}

export function officeScopedArrayItem(refType: string) {
  return {
    type: 'reference' as const,
    to: [{ type: refType }],
    options: {
      filter: officeScopedFilterFn,
    },
  }
}
