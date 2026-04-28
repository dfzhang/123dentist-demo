import { stegaClean } from 'next-sanity'
import type { CtaBlock } from '@/sanity/types'
import { CTAButton } from '../ui/CTAButton'
import { cn } from '@/lib/utils'

const bgStyles: Record<string, string> = {
  primary: 'bg-primary-600 text-white',
  dark: 'bg-primary-900 text-white',
  gradient: 'bg-gradient-to-r from-primary-600 to-accent-500 text-white',
}

export function CtaBlockBlock({ block }: { block: CtaBlock }) {
  const cleanBg = stegaClean(block.backgroundColor) || 'primary'

  return (
    <section className={cn('py-20', bgStyles[cleanBg])}>
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{block.heading}</h2>
        {block.subheading && (
          <p className="mb-8 text-lg opacity-90">{block.subheading}</p>
        )}
        {block.ctas && block.ctas.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {block.ctas.map((cta, i) => (
              <CTAButton key={i} cta={cta} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
