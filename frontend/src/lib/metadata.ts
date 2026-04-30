import type { Metadata } from 'next'
import { urlFor } from '@/sanity/image'

// =============================================================================
// Shared metadata builder — generates full Next.js Metadata from Sanity SEO
// =============================================================================
// Used by all page routes to produce consistent <head> tags:
//   - <title>, <meta name="description">
//   - Open Graph (og:title, og:description, og:image)
//   - Twitter Card (summary_large_image)
//   - robots noindex (when seo.noIndex is true)
//   - Canonical URL
// =============================================================================

interface SEO {
  metaTitle?: string
  metaDescription?: string
  ogImage?: {
    image?: { _type: string; asset: { _ref: string; _type: string } }
    alt?: string
  }
  noIndex?: boolean
}

interface BuildMetadataOptions {
  /** SEO object from Sanity document */
  seo?: SEO | null
  /** Fallback title if seo.metaTitle is empty */
  fallbackTitle: string
  /** Fallback description if seo.metaDescription is empty */
  fallbackDescription?: string
  /** Office name — appended to title as suffix */
  officeName?: string
  /** Canonical path, e.g. "/atlantis-yaletown/services" */
  path?: string
}

/** Base URL for canonical/OG URLs — uses NEXT_PUBLIC_SITE_URL or falls back */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://123dentist.com'

export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  officeName,
  path,
}: BuildMetadataOptions): Metadata {
  // --- Title ---
  const rawTitle = seo?.metaTitle || fallbackTitle
  const title = officeName
    ? `${rawTitle} | ${officeName} | 123Dentist`
    : `${rawTitle} | 123Dentist`

  // --- Description ---
  const description = seo?.metaDescription || fallbackDescription || undefined

  // --- OG Image ---
  let ogImage: { url: string; width: number; height: number; alt: string } | undefined
  if (seo?.ogImage?.image?.asset) {
    ogImage = {
      url: urlFor(seo.ogImage.image as any).width(1200).height(630).url(),
      width: 1200,
      height: 630,
      alt: seo.ogImage.alt || rawTitle,
    }
  }

  // --- Canonical URL ---
  const canonical = path ? `${SITE_URL}${path}` : undefined

  // --- Robots ---
  const robots = seo?.noIndex
    ? { index: false as const, follow: true as const }
    : undefined

  return {
    title,
    description,
    ...(canonical && { alternates: { canonical } }),
    ...(robots && { robots }),
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: '123Dentist',
      ...(canonical && { url: canonical }),
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(ogImage && { images: [ogImage.url] }),
    },
  }
}
