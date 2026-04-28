import { stegaClean } from 'next-sanity'
import type { RichTextSection } from '@/sanity/types'
import { RichText } from '../ui/PortableText'
import { cn } from '@/lib/utils'

const bgStyles: Record<string, string> = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  primary: 'bg-primary-50',
  dark: 'bg-primary-900 text-white',
}

export function RichTextSectionBlock({ block }: { block: RichTextSection }) {
  const cleanBg = stegaClean(block.backgroundColor) || 'white'

  return (
    <section className={cn('py-16', bgStyles[cleanBg])}>
      <div className="mx-auto max-w-3xl px-4">
        {block.heading && (
          <h2 className="mb-8 text-3xl font-bold">{block.heading}</h2>
        )}
        <RichText value={block.content} />
      </div>
    </section>
  )
}
