import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from './env'

const studioBaseUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333'

/**
 * Resolve the Studio URL for a given document, including the workspace path.
 *
 * Multi-workspace Studio: each office has its own workspace at /{office-slug}.
 * The stega overlay needs to link to the correct workspace so clicking a field
 * opens the right document in the right workspace — not the workspace picker.
 *
 * The source map document only has _id and _type (not full document fields).
 * For office documents: _id is "office-{slug}" → derive workspace from _id.
 * For other documents: we can't determine the workspace from the source map alone,
 * so we fall back to the base URL. The Presentation tool handles workspace routing
 * via its own config — this mainly affects click-to-edit overlays.
 */
function resolveStudioUrl(doc: { _id: string; _type: string }): string {
  // Office documents: _id is "office-{slug}" or "drafts.office-{slug}"
  if (doc._type === 'office') {
    const slug = doc._id.replace(/^drafts\./, '').replace(/^office-/, '')
    if (slug) {
      return `${studioBaseUrl}/${slug}`
    }
  }

  // For all other types, fall back to base URL.
  // The Presentation tool's own workspace context handles routing correctly
  // when the user is already inside a workspace.
  return studioBaseUrl
}

// Base Sanity client — used by defineLive and direct queries
// stega.studioUrl as a function resolves to the correct workspace per document
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl: resolveStudioUrl,
  },
})
