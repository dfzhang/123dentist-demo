// =============================================================================
// Group Registry — Build-time dental group list for workspace generation
// =============================================================================
// Source of truth for which dental groups get workspaces AND which offices
// belong to them.
//
// **Invariant: zero overlap between workspaces.**
//   - An office listed inside a group is owned by that group's workspace
//     and does NOT get its own standalone workspace.
//   - An office in office-registry.ts that is NOT claimed by any group
//     gets its own standalone workspace.
//   - The `standaloneOffices()` helper enforces this by filtering the
//     office-registry against `groupedOfficeIds()`.
//
// In production, this file would be generated from Sanity data at build
// time (via scripts/generate-groups.ts). Studio rebuilds when groups change.
// =============================================================================

import type { OfficeEntry } from './office-registry'
import { offices } from './office-registry'

export interface DentalGroupEntry {
  /** Sanity document _id for this group */
  id: string
  /** Human-readable name (workspace title) */
  name: string
  /** URL-safe slug (workspace name + basePath) */
  slug: string
  /** Corporate description for workspace subtitle */
  description: string
  /**
   * The offices that live inside this group's workspace.
   *
   * Defined inline (not as _ref lookups into office-registry) because
   * grouped offices are exclusive to their group — they do not appear
   * as standalone workspaces and don't need to be in office-registry.
   *
   * The `id` on each entry is the Sanity document _id that will be used
   * for the corresponding `office` document (created by seed-groups.ts).
   */
  offices: OfficeEntry[]
}

// =============================================================================
// Registry
// =============================================================================
// Demo setup:
//   - "Pacific Dental Group" — Vancouver, 2 offices  (multi-office group)
//   - "Northstar Dental Group" — Montréal, 1 office  (single-office group)
//
// None of these office IDs overlap with office-registry.ts.
// =============================================================================

export const dentalGroups: DentalGroupEntry[] = [
  {
    id: 'group-pacific-dental',
    name: 'Pacific Dental Group',
    slug: 'pacific-dental-group',
    description: 'Vancouver — 2 offices',
    offices: [
      {
        id: 'office-pacific-kitsilano',
        name: 'Pacific Dental — Kitsilano',
        slug: 'pacific-kitsilano',
        domain: 'https://pacific-kitsilano.123dentist.com',
        city: 'Vancouver',
      },
      {
        id: 'office-pacific-gastown',
        name: 'Pacific Dental — Gastown',
        slug: 'pacific-gastown',
        domain: 'https://pacific-gastown.123dentist.com',
        city: 'Vancouver',
      },
    ],
  },
  {
    id: 'group-northstar-dental',
    name: 'Northstar Dental Group',
    slug: 'northstar-dental-group',
    description: 'Montréal — 1 office',
    offices: [
      {
        id: 'office-northstar-plateau',
        name: 'Northstar Dental — Plateau',
        slug: 'northstar-plateau',
        domain: 'https://northstar-plateau.123dentist.com',
        city: 'Montréal',
      },
    ],
  },
]

// =============================================================================
// Helpers
// =============================================================================

/** All office IDs claimed by any group. Used to enforce zero-overlap. */
export function groupedOfficeIds(): Set<string> {
  const s = new Set<string>()
  for (const g of dentalGroups) {
    for (const o of g.offices) s.add(o.id)
  }
  return s
}

/**
 * Offices that are NOT part of any group — these get standalone workspaces.
 *
 * Defensive: if someone accidentally lists a grouped office ID in
 * office-registry.ts, this filter drops it so it can't also appear as
 * its own workspace (preserving the zero-overlap invariant).
 */
export function standaloneOffices(): OfficeEntry[] {
  const grouped = groupedOfficeIds()
  return offices.filter((o) => !grouped.has(o.id))
}

/**
 * Resolve the OfficeEntry objects for a group. Now trivial since the
 * offices live inline on the group — kept as a function for API stability
 * with the previous version.
 */
export function officesForGroup(group: DentalGroupEntry): OfficeEntry[] {
  return group.offices
}
