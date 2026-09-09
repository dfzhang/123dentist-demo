// =============================================================================
// backfill-groups.ts — Create dentalGroup docs + link offices to groups
// =============================================================================
// Populates the dentalGroup documents defined in lib/group-registry.ts and
// backfills the `group` reference on each office listed under a group.
//
// Idempotent: uses createOrReplace for groups and patches offices only if
// their group field is missing or points to the wrong group.
//
// Usage:
//   1. Set SANITY_STUDIO_PROJECT_ID and a token with write access:
//        export SANITY_AUTH_TOKEN=sk...
//        export SANITY_STUDIO_PROJECT_ID=kr0ivyaf
//   2. npx tsx scripts/backfill-groups.ts
//
// After running, load Studio and you'll see the new group workspaces
// (e.g. /pacific-dental-group, /alpha-dental-group) with their offices.
// =============================================================================

import { createClient } from '@sanity/client'
import { dentalGroups, officesForGroup } from '../lib/group-registry'

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || 'kr0ivyaf'
const DATASET = process.env.SANITY_STUDIO_DATASET || 'production'
const TOKEN = process.env.SANITY_AUTH_TOKEN

if (!TOKEN) {
  console.error(
    'Missing SANITY_AUTH_TOKEN. Create a token with Editor rights at ' +
      `https://sanity.io/manage/project/${PROJECT_ID}/api and export it.`
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

async function upsertGroups() {
  console.log(`\n▶ Upserting ${dentalGroups.length} dental group doc(s)...`)
  for (const g of dentalGroups) {
    const doc = {
      _id: g.id,
      _type: 'dentalGroup' as const,
      name: g.name,
      slug: { _type: 'slug' as const, current: g.slug },
      description: g.description,
    }
    await client.createOrReplace(doc)
    console.log(`  ✓ ${g.id}  ${g.name}`)
  }
}

async function linkOffices() {
  console.log('\n▶ Linking offices to their groups...')
  let linked = 0
  let alreadyLinked = 0
  let missing = 0

  for (const group of dentalGroups) {
    const groupOffices = officesForGroup(group)
    for (const office of groupOffices) {
      const existing = await client.fetch<{ _id: string; groupRef?: string } | null>(
        `*[_id == $id][0]{ _id, "groupRef": group._ref }`,
        { id: office.id }
      )

      if (!existing) {
        console.warn(
          `  ⚠  office ${office.id} (${office.name}) not found in dataset — skipping`
        )
        missing++
        continue
      }

      if (existing.groupRef === group.id) {
        alreadyLinked++
        continue
      }

      await client
        .patch(office.id)
        .set({ group: { _type: 'reference', _ref: group.id } })
        .commit()

      console.log(`  ✓ ${office.id} → ${group.id}`)
      linked++
    }
  }

  console.log(
    `\n  Linked: ${linked}   Already linked: ${alreadyLinked}   Missing: ${missing}`
  )
}

async function main() {
  console.log(`Sanity project: ${PROJECT_ID}  dataset: ${DATASET}`)
  await upsertGroups()
  await linkOffices()
  console.log('\n✓ Done. Reload Studio to see the new group workspaces.\n')
}

main().catch((err) => {
  console.error('\n✗ Backfill failed:', err.message || err)
  process.exit(1)
})
