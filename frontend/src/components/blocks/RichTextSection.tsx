import { stegaClean } from 'next-sanity'
import type { RichTextSection } from '@/sanity/types'
import { RichText } from '../ui/PortableText'

export function RichTextSectionBlock({ block }: { block: RichTextSection }) {
  const cleanLayout = stegaClean(block.layout) || 'full'

  return (
    <section className="py-16">
      <div
        className={`mx-auto px-4 ${
          cleanLayout === 'narrow' ? 'max-w-2xl' : 'max-w-3xl'
        }`}
      >
        {block.heading && (
          <h2 className="mb-8 text-3xl font-bold text-gray-900">{block.heading}</h2>
        )}
        {cleanLayout === 'two-column' ? (
          <div className="columns-2 gap-8">
            <RichText value={block.content} />
          </div>
        ) : (
          <RichText value={block.content} />
        )}
      </div>
    </section>
  )
}
