import { defineLive } from 'next-sanity/live'
import { client } from './client'

// Token is required at runtime for preview/draft mode.
// At build time it may not be available — defineLive handles this gracefully
// (sanityFetch falls back to CDN reads without token).
const token = process.env.SANITY_API_TOKEN || ''

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: '2026-04-01' }),
  serverToken: token,
  browserToken: token,
})
