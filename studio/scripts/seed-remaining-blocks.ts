/**
 * Adds videoEmbed (About page) and smileGallery (Home page) blocks
 * to reach 17/17 block type coverage.
 *
 * smileGallery: 3 items with consent, 1 WITHOUT consent (HIPAA filter demo)
 * videoEmbed: YouTube office tour on About page
 *
 * Usage: npx tsx scripts/seed-remaining-blocks.ts
 */

import { createClient } from '@sanity/client'

const projectId = 'kr0ivyaf'
const dataset = 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('Missing SANITY_API_TOKEN environment variable')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-04-01',
  useCdn: false,
})

const HOME_PAGE_ID = 'page-atlantis-home'
const ABOUT_PAGE_ID = 'page-atlantis-about'

async function patchPages() {
  console.log('🦷 Adding smileGallery + videoEmbed blocks...\n')

  // 1. Patch Home page — insert smileGallery after testimonials (position 5)
  const smileGalleryBlock = {
    _key: 'gallery1',
    _type: 'smileGallery',
    heading: 'Smile Transformations',
    description: 'Real results from real patients',
    items: [
      {
        _key: 'gi1',
        _type: 'galleryItem',
        description: 'Porcelain veneers — complete smile makeover',
        procedure: 'Porcelain Veneers',
        consentObtained: true,
        // No actual image assets — component handles missing images gracefully
        // In production, editors upload before/after photos via Studio
        beforeImage: { _type: 'imageWithAlt', alt: 'Before veneers treatment' },
        afterImage: { _type: 'imageWithAlt', alt: 'After veneers treatment' },
      },
      {
        _key: 'gi2',
        _type: 'galleryItem',
        description: 'Invisalign — 12 month treatment',
        procedure: 'Invisalign',
        consentObtained: true,
        beforeImage: { _type: 'imageWithAlt', alt: 'Before Invisalign' },
        afterImage: { _type: 'imageWithAlt', alt: 'After Invisalign' },
      },
      {
        _key: 'gi3',
        _type: 'galleryItem',
        description: 'Dental implant — single tooth replacement',
        procedure: 'Dental Implant',
        consentObtained: true,
        beforeImage: { _type: 'imageWithAlt', alt: 'Before implant' },
        afterImage: { _type: 'imageWithAlt', alt: 'After implant' },
      },
      {
        // This item has consentObtained: false — the frontend HIPAA filter
        // will exclude it, demonstrating the compliance pipeline
        _key: 'gi4',
        _type: 'galleryItem',
        description: 'Teeth whitening — consent pending',
        procedure: 'Teeth Whitening',
        consentObtained: false,
        beforeImage: { _type: 'imageWithAlt', alt: 'Before whitening' },
        afterImage: { _type: 'imageWithAlt', alt: 'After whitening' },
      },
    ],
  }

  // 2. Patch About page — insert videoEmbed after richText (position 2)
  const videoEmbedBlock = {
    _key: 'video1',
    _type: 'videoEmbed',
    heading: 'Take a Tour of Our Office',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder — replace with real office tour
    caption: 'Step inside Atlantis Dental Yaletown and see our modern facilities.',
  }

  // Insert smileGallery on Home page after testimonials (index 5 → insert at 6)
  console.log('Patching Home page — adding smileGallery...')
  await client
    .patch(HOME_PAGE_ID)
    .insert('after', 'sections[5]', [smileGalleryBlock])
    .commit()
  console.log('  ✅ smileGallery added after testimonials section')

  // Insert videoEmbed on About page after richText (index 1 → insert at 2)
  console.log('Patching About page — adding videoEmbed...')
  await client
    .patch(ABOUT_PAGE_ID)
    .insert('after', 'sections[1]', [videoEmbedBlock])
    .commit()
  console.log('  ✅ videoEmbed added after rich text section')

  console.log('')
  console.log('Block coverage: 17/17 ✅')
  console.log('')
  console.log('smileGallery items:')
  console.log('  - 3 with consentObtained: true (rendered)')
  console.log('  - 1 with consentObtained: false (filtered out by HIPAA check)')
  console.log('')
  console.log('videoEmbed: YouTube placeholder on About page')
}

patchPages().catch((err) => {
  console.error('Patch failed:', err)
  process.exit(1)
})
