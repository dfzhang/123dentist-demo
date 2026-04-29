import type { FinancingSection } from '@/sanity/types'
import { RichText } from '../ui/PortableText'
import { CTAButton } from '../ui/CTAButton'
import { urlFor } from '@/sanity/image'

export function FinancingSectionBlock({ block }: { block: FinancingSection }) {
  return (
    <section className="bg-accent-50 py-16">
      <div className="mx-auto max-w-4xl px-4">
        {block.heading && (
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            {block.heading}
          </h2>
        )}

        {block.description && (
          <div className="mb-8">
            <RichText value={block.description} />
          </div>
        )}

        {block.financingOptions && block.financingOptions.length > 0 && (
          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            {block.financingOptions.map((option) => (
              <div
                key={option._key}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                {option.logo?.image && (
                  <img
                    src={urlFor(option.logo.image).width(120).height(60).url()}
                    alt={option.logo.alt || option.name}
                    className="mb-4 h-10 object-contain"
                  />
                )}
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {option.name}
                </h3>
                {option.description && (
                  <p className="mb-3 text-sm text-gray-600">
                    {option.description}
                  </p>
                )}
                {option.url && (
                  <a
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    Apply Now →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {block.cta && (
          <div className="text-center">
            <CTAButton cta={block.cta} />
          </div>
        )}
      </div>
    </section>
  )
}
