import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

// Type for Sanity image references
export interface SanityImageSource {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface ImageWithAlt {
  image?: SanityImageSource
  alt?: string
}

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
