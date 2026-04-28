import type { NewPatientSection } from '@/sanity/types'
import { urlFor } from '@/sanity/image'
import { CTAButton } from '../ui/CTAButton'

export function NewPatientSectionBlock({ block }: { block: NewPatientSection }) {
  return (
    <section className="bg-primary-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        {block.heading && (
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">{block.heading}</h2>
            {block.subheading && (
              <p className="mt-3 text-lg text-gray-600">{block.subheading}</p>
            )}
          </div>
        )}

        {/* Steps */}
        {block.steps && block.steps.length > 0 && (
          <div className="mb-12 grid gap-8 md:grid-cols-3">
            {block.steps.map((step, i) => (
              <div key={step._key} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-white">
                  {step.icon?.image ? (
                    <img
                      src={urlFor(step.icon.image).width(32).height(32).url()}
                      alt={step.icon.alt || ''}
                      className="h-8 w-8"
                    />
                  ) : (
                    <span className="text-2xl font-bold">{i + 1}</span>
                  )}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Insurance note */}
        {block.showInsurance && (
          <div className="mb-8 rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-600">
              We accept most major dental insurance plans. Contact us to verify
              your coverage.
            </p>
          </div>
        )}

        {/* CTA */}
        {block.cta && (
          <div className="text-center">
            <CTAButton cta={block.cta} />
          </div>
        )}
      </div>
    </section>
  )
}
