import { stegaClean } from 'next-sanity'
import type { ImageWithTextSection } from '@/sanity/types'
import { urlFor } from '@/sanity/image'
import { RichText } from '../ui/PortableText'
import { cn } from '@/lib/utils'

const bgStyles: Record<string, string> = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  primary: 'bg-primary-50',
}

export function ImageWithTextSectionBlock({
  block,
}: {
  block: ImageWithTextSection
}) {
  const cleanLayout = stegaClean(block.layout)
  const cleanBg = stegaClean(block.backgroundColor) || 'white'
  const isImageLeft = cleanLayout === 'imageLeft'

  return (
    <section className={cn('py-16', bgStyles[cleanBg])}>
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex flex-col items-center gap-12 md:flex-row ${
            isImageLeft ? '' : 'md:flex-row-reverse'
          }`}
        >
          {/* Image */}
          <div className="w-full md:w-1/2">
            {block.image?.image && (
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={urlFor(block.image.image).width(800).height(600).url()}
                  alt={block.image.alt || ''}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2">
            {block.heading && (
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                {block.heading}
              </h2>
            )}
            <RichText value={block.content} />
          </div>
        </div>
      </div>
    </section>
  )
}
