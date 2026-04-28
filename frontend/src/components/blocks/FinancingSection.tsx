import type { FinancingSection } from '@/sanity/types'
import { RichText } from '../ui/PortableText'
import { CTAButton } from '../ui/CTAButton'

export function FinancingSectionBlock({ block }: { block: FinancingSection }) {
  return (
    <section className="bg-accent-50 py-16">
      <div className="mx-auto max-w-4xl px-4">
        {block.heading && (
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            {block.heading}
          </h2>
        )}

        {block.content && (
          <div className="mb-8">
            <RichText value={block.content} />
          </div>
        )}

        {block.showInsuranceList && (
          <div className="mb-8 rounded-xl bg-white p-8 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Accepted Insurance Providers
            </h3>
            <p className="text-sm text-gray-600">
              Insurance providers are pulled from the office profile. This office
              accepts most major dental insurance plans.
            </p>
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
