import { stegaClean } from 'next-sanity'
import type { CtaBlock } from '@/sanity/types'
import { CTAButton } from '../ui/CTAButton'
import { urlFor } from '@/sanity/image'

export function CtaBlockBlock({ block }: { block: CtaBlock }) {
  const cleanLayout = stegaClean(block.layout) || 'banner'
  const bgUrl = block.backgroundImage?.image
    ? urlFor(block.backgroundImage.image).width(1920).height(600).url()
    : null

  if (cleanLayout === 'card') {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-2xl bg-primary-600 p-10 text-center text-white shadow-lg">
            <h2 className="mb-4 text-3xl font-bold">{block.heading}</h2>
            {block.description && (
              <p className="mb-8 text-lg opacity-90">{block.description}</p>
            )}
            {block.ctas && block.ctas.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4">
                {block.ctas.map((cta, i) => (
                  <CTAButton key={i} cta={cta} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  if (cleanLayout === 'inline') {
    return (
      <section className="border-y border-gray-200 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{block.heading}</h2>
            {block.description && (
              <p className="text-gray-600">{block.description}</p>
            )}
          </div>
          {block.ctas && block.ctas.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {block.ctas.map((cta, i) => (
                <CTAButton key={i} cta={cta} />
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  // banner (default)
  return (
    <section
      className="relative py-20 text-white"
      style={
        bgUrl
          ? { backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : undefined
      }
    >
      {bgUrl && <div className="absolute inset-0 bg-primary-900/70" />}
      {!bgUrl && <div className="absolute inset-0 bg-primary-600" />}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{block.heading}</h2>
        {block.description && (
          <p className="mb-8 text-lg opacity-90">{block.description}</p>
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
