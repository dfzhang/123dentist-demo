'use client'

import { useState } from 'react'
import type { SmileGallery, GalleryItem } from '@/sanity/types'
import { urlFor } from '@/sanity/image'

export function SmileGalleryBlock({ block }: { block: SmileGallery }) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Only show items with consent (HIPAA compliance enforced at schema level,
  // but double-check here)
  const items = block.items?.filter((item) => item.consentObtained) || []

  if (items.length === 0) return null

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        {block.heading && (
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">{block.heading}</h2>
            {block.subheading && (
              <p className="mt-3 text-lg text-gray-600">{block.subheading}</p>
            )}
          </div>
        )}

        {/* Featured comparison */}
        <div className="mb-8">
          <BeforeAfter item={items[activeIndex]} />
        </div>

        {/* Thumbnails */}
        {items.length > 1 && (
          <div className="flex justify-center gap-3">
            {items.map((item, i) => (
              <button
                key={item._key}
                onClick={() => setActiveIndex(i)}
                className={`h-16 w-24 overflow-hidden rounded-lg border-2 transition-all ${
                  i === activeIndex
                    ? 'border-primary-500 shadow-md'
                    : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
              >
                {item.afterImage?.image && (
                  <img
                    src={urlFor(item.afterImage.image).width(96).height(64).url()}
                    alt={item.caption || `Result ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function BeforeAfter({ item }: { item: GalleryItem }) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wider text-gray-500">
            Before
          </p>
          <div className="overflow-hidden rounded-xl bg-gray-200">
            {item.beforeImage?.image && (
              <img
                src={urlFor(item.beforeImage.image).width(600).height(400).url()}
                alt={item.beforeImage.alt || 'Before'}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
        <div>
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wider text-gray-500">
            After
          </p>
          <div className="overflow-hidden rounded-xl bg-gray-200">
            {item.afterImage?.image && (
              <img
                src={urlFor(item.afterImage.image).width(600).height(400).url()}
                alt={item.afterImage.alt || 'After'}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
      {item.caption && (
        <p className="mt-4 text-center text-sm text-gray-600">{item.caption}</p>
      )}
    </div>
  )
}
