// =============================================================================
// seed-groups.ts — Seed dental group workspaces (exclusive-ownership model)
// =============================================================================
// Creates:
//   - dentalGroup documents from lib/group-registry.ts
//   - Fresh office documents that live INSIDE each group (with minimal
//     required fields — address, contact, hours) so the group workspace
//     has something real to render
//   - One home page per new office, so Presentation preview has a target
//
// Also runs cleanup for previous seeding runs:
//   - Deletes any legacy group docs that are no longer in the registry
//     (e.g. group-alpha-dental was renamed to group-northstar-dental)
//   - Un-links any existing offices in office-registry.ts that were
//     previously assigned to a group by the earlier backfill-groups.ts
//     script (so they show up as standalone workspaces again)
//
// Idempotent — safe to re-run. Uses createOrReplace so re-running restores
// the seed content to its defined state.
//
// Usage:
//   export SANITY_AUTH_TOKEN=sk...
//   export SANITY_STUDIO_PROJECT_ID=kr0ivyaf   # optional, defaults to kr0ivyaf
//   npx tsx scripts/seed-groups.ts
// =============================================================================

import { createClient } from '@sanity/client'
import { dentalGroups } from '../lib/group-registry'
import { offices as registeredOffices } from '../lib/office-registry'

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || 'kr0ivyaf'
const DATASET = process.env.SANITY_STUDIO_DATASET || 'production'
const TOKEN = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error(
    'Missing SANITY_AUTH_TOKEN (or SANITY_API_TOKEN). Create a token with ' +
      `Editor rights at https://sanity.io/manage/project/${PROJECT_ID}/api and export it.`
  )
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// =============================================================================
// Minimal per-office seed data
// =============================================================================
// Just enough to make the office document look real in the Studio and give
// the Presentation tool a home page to preview. Address city + neighbourhood
// come from the OfficeEntry.name / .city / .slug.
// =============================================================================

interface SeedAddress {
  street: string
  suite?: string
  postalCode: string
  province: string
}

interface OfficeSeed {
  address: SeedAddress
  phone: string
  email: string
}

const officeSeeds: Record<string, OfficeSeed> = {
  'office-pacific-kitsilano': {
    address: {
      street: '2145 West 4th Avenue',
      suite: 'Suite 210',
      postalCode: 'V6K 1N6',
      province: 'BC',
    },
    phone: '6047340101',
    email: 'kitsilano@pacificdental.ca',
  },
  'office-pacific-gastown': {
    address: {
      street: '55 Water Street',
      suite: 'Suite 320',
      postalCode: 'V6B 1A1',
      province: 'BC',
    },
    phone: '6046810202',
    email: 'gastown@pacificdental.ca',
  },
  'office-northstar-plateau': {
    address: {
      street: '4200 Rue Saint-Denis',
      postalCode: 'H2J 2K9',
      province: 'QC',
    },
    phone: '5148451303',
    email: 'plateau@northstardental.ca',
  },
}

// Standard weekly hours — same for every new office to keep the seed minimal.
const standardHours = {
  _type: 'businessHours' as const,
  hours: [
    { _key: 'mon', _type: 'dayHours', day: 'monday', openTime: '09:00', closeTime: '18:00', isClosed: false },
    { _key: 'tue', _type: 'dayHours', day: 'tuesday', openTime: '09:00', closeTime: '18:00', isClosed: false },
    { _key: 'wed', _type: 'dayHours', day: 'wednesday', openTime: '09:00', closeTime: '18:00', isClosed: false },
    { _key: 'thu', _type: 'dayHours', day: 'thursday', openTime: '09:00', closeTime: '20:00', isClosed: false },
    { _key: 'fri', _type: 'dayHours', day: 'friday', openTime: '09:00', closeTime: '17:00', isClosed: false },
    { _key: 'sat', _type: 'dayHours', day: 'saturday', openTime: '09:00', closeTime: '15:00', isClosed: false },
    { _key: 'sun', _type: 'dayHours', day: 'sunday', isClosed: true },
  ],
  holidayNote: 'Closed on statutory holidays.',
}

// =============================================================================
// Document builders
// =============================================================================

function buildGroupDoc(g: (typeof dentalGroups)[number]) {
  return {
    _id: g.id,
    _type: 'dentalGroup' as const,
    name: g.name,
    slug: { _type: 'slug' as const, current: g.slug },
    description: g.description,
  }
}

function buildOfficeDoc(
  officeId: string,
  officeName: string,
  officeSlug: string,
  city: string,
  groupId: string
) {
  const seed = officeSeeds[officeId]
  if (!seed) {
    throw new Error(
      `Missing officeSeeds entry for ${officeId} — add one to seed-groups.ts`
    )
  }
  return {
    _id: officeId,
    _type: 'office' as const,
    name: officeName,
    slug: { _type: 'slug' as const, current: officeSlug },
    group: { _type: 'reference' as const, _ref: groupId },
    address: {
      _type: 'address' as const,
      street: seed.address.street,
      ...(seed.address.suite ? { suite: seed.address.suite } : {}),
      city,
      province: seed.address.province,
      postalCode: seed.address.postalCode,
    },
    contactInfo: {
      _type: 'contactInfo' as const,
      phone: seed.phone,
      email: seed.email,
    },
    businessHours: standardHours,
  }
}

function buildHomePageDoc(officeId: string, officeName: string) {
  const pageId = `page-${officeId.replace(/^office-/, '')}-home`
  return {
    _id: pageId,
    _type: 'page' as const,
    title: 'Home',
    slug: { _type: 'slug' as const, current: 'home' },
    pageType: 'home',
    language: 'en',
    office: { _type: 'reference' as const, _ref: officeId },
    content: [
      {
        _key: 'hero',
        _type: 'heroSection',
        variant: 'centered',
        headline: `Welcome to ${officeName}`,
        subheadline: 'Modern dental care for the whole family.',
      },
      {
        _key: 'contact',
        _type: 'contactBlock',
        variant: 'stacked',
        heading: 'Visit us',
      },
    ],
  }
}

// =============================================================================
// Legacy cleanup
// =============================================================================
// Previous script (backfill-groups.ts) created:
//   - group-alpha-dental  — now renamed to group-northstar-dental
//   - office.group refs on the existing standalone offices
//     (office-atlantis-yaletown, office-broadway-smiles, office-alpha-dental)
// Both of those violate the new exclusive-ownership model.
// =============================================================================

async function cleanupLegacy() {
  console.log('\n▶ Cleaning up legacy state from previous seed runs...')

  // 1. Unset `group` on any office in office-registry.ts that has one.
  //    Must run BEFORE deleting stale group docs — Sanity refuses to delete
  //    a document that still has incoming references.
  const registeredIds = registeredOffices.map((o) => o.id)
  const linked = await client.fetch<Array<{ _id: string; groupRef?: string }>>(
    `*[_type == "office" && _id in $ids && defined(group)]{ _id, "groupRef": group._ref }`,
    { ids: registeredIds }
  )

  if (linked.length > 0) {
    console.log(
      `  Unlinking ${linked.length} standalone office(s) previously assigned to a group:`
    )
    for (const o of linked) {
      await client.patch(o._id).unset(['group']).commit()
      console.log(`    ← ${o._id} (was → ${o.groupRef})`)
    }
  } else {
    console.log('  No standalone offices to unlink.')
  }

  // 2. Delete any dentalGroup documents whose id is not in the current registry
  const currentGroupIds = new Set(dentalGroups.map((g) => g.id))
  const existingGroupIds: string[] = await client.fetch(
    `*[_type == "dentalGroup"]._id`
  )
  const staleGroupIds = existingGroupIds.filter((id) => !currentGroupIds.has(id))

  if (staleGroupIds.length > 0) {
    console.log(`  Removing ${staleGroupIds.length} stale group doc(s):`)
    for (const id of staleGroupIds) {
      // Delete both published and draft variants
      await client.delete(id)
      await client.delete(`drafts.${id}`).catch(() => {}) // ok if no draft
      console.log(`    ✗ ${id}`)
    }
  } else {
    console.log('  No stale group docs to remove.')
  }
}

// =============================================================================
// Main
// =============================================================================

async function upsertGroups() {
  console.log(`\n▶ Upserting ${dentalGroups.length} dental group doc(s)...`)
  for (const g of dentalGroups) {
    await client.createOrReplace(buildGroupDoc(g))
    console.log(`  ✓ ${g.id}  ${g.name}  (${g.offices.length} office${g.offices.length === 1 ? '' : 's'})`)
  }
}

async function upsertGroupOffices() {
  console.log('\n▶ Upserting group-owned office docs + home pages...')
  for (const group of dentalGroups) {
    for (const o of group.offices) {
      const officeDoc = buildOfficeDoc(o.id, o.name, o.slug, o.city, group.id)
      await client.createOrReplace(officeDoc)
      console.log(`  ✓ ${o.id}  ${o.name}`)

      const pageDoc = buildHomePageDoc(o.id, o.name)
      await client.createOrReplace(pageDoc)
      console.log(`    ↳ ${pageDoc._id}  (home page)`)
    }
  }
}

async function main() {
  console.log(`Sanity project: ${PROJECT_ID}  dataset: ${DATASET}`)
  await cleanupLegacy()
  await upsertGroups()
  await upsertGroupOffices()
  console.log('\n✓ Done. Reload Studio to see the updated workspace list.\n')
}

main().catch((err) => {
  console.error('\n✗ Seed failed:', err.message || err)
  process.exit(1)
})
