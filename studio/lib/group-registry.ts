// =============================================================================
// Group Registry — Build-time dental group list for workspace generation
// =============================================================================
// This is the source of truth for which dental groups get workspaces.
// In production, this is generated from Sanity data at build time
// (via scripts/generate-groups.ts). Studio rebuilds when groups change.
//
// Each entry maps to one Sanity workspace with:
//   - Multi-office Structure Builder (drill in to any office to edit content)
//   - Per-office initial value templates (office select → auto-set office._ref)
//   - Per-office Presentation tool routes
//
// This coexists with office-registry.ts:
//   - offices without a group → standalone office workspaces (original pattern)
//   - offices with a group    → available inside their group's workspace
//     (the standalone workspace still exists as long as the office is listed
//     in office-registry.ts — remove from that registry if you want group-only)
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
  /** Sanity document _ids of the offices belonging to this group */
  officeIds: string[]
}

// =============================================================================
// Placeholder registry — replace with generated data in production
// =============================================================================
// Demo setup:
//   - "Pacific Dental Group" contains 2 offices (multi-office demo)
//   - "Alpha Dental Group"   contains 1 office  (single-office group demo)
//
// The offices are also listed in office-registry.ts, so each also gets its
// own standalone workspace — that lets you show both patterns side by side.
// =============================================================================

export const dentalGroups: DentalGroupEntry[] = [
  {
    id: 'group-pacific-dental',
    name: 'Pacific Dental Group',
    slug: 'pacific-dental-group',
    description: 'Vancouver — 2 offices',
    officeIds: ['office-atlantis-yaletown', 'office-broadway-smiles'],
  },
  {
    id: 'group-alpha-dental',
    name: 'Alpha Dental Group',
    slug: 'alpha-dental-group',
    description: 'Montréal — 1 office',
    officeIds: ['office-alpha-dental'],
  },
]

// =============================================================================
// Helpers
// =============================================================================

/**
 * Resolve the OfficeEntry objects for a group from the office registry.
 * Silently skips office IDs that don't exist in the registry so a stale
 * reference doesn't crash the Studio at startup.
 */
export function officesForGroup(group: DentalGroupEntry): OfficeEntry[] {
  const byId = new Map(offices.map((o) => [o.id, o]))
  return group.officeIds
    .map((id) => byId.get(id))
    .filter((o): o is OfficeEntry => Boolean(o))
}
