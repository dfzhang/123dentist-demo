import { stegaClean } from 'next-sanity'
import type { HeroSection } from '@/sanity/types'
import { urlFor } from '@/sanity/image'
import { CTAButton } from '../ui/CTAButton'

export function HeroSectionBlock({ block }: { block: HeroSection }) {
  const cleanLayout = stegaClean(block.layout) || 'full'
  const bgUrl = block.backgroundImage?.image
    ? urlFor(block.backgroundImage.image).width(1920).height(800).url()
    : null

  const isSplit = cleanLayout === 'split-left' || cleanLayout === 'split-right'

  return (
    <section
      className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-primary-900"
      style={
        bgUrl
          ? { backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : undefined
      }
    >
      {/* Overlay */}
      {bgUrl && (
        <div className="absolute inset-0 bg-primary-900/60" />
      )}

      <div
        className={`relative z-10 mx-auto max-w-7xl px-4 py-24 ${
          cleanLayout === 'centered'
            ? 'text-center'
            : isSplit
              ? 'md:w-1/2 md:text-left'
              : 'text-center'
        }`}
      >
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          {block.heading}
        </h1>
        {block.subheading && (
          <p className="mb-8 text-lg text-primary-100 md:text-xl">
            {block.subheading}
          </p>
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
