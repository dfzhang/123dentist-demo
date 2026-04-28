import { stegaClean } from 'next-sanity'
import type { ServicesList } from '@/sanity/types'
import { urlFor } from '@/sanity/image'

export function ServicesListBlock({ block }: { block: ServicesList }) {
  const cleanLayout = stegaClean(block.layout)

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        {block.heading && (
          <h2 className="mb-8 text-3xl font-bold text-gray-900">{block.heading}</h2>
        )}
        <div className="space-y-4">
          {block.services?.map((service) => (
            <div
              key={service._id}
              className={`flex items-center gap-4 rounded-lg border border-gray-200 bg-white transition-colors hover:border-primary-300 ${
                cleanLayout === 'detailed' ? 'p-6' : 'p-4'
              }`}
            >
              {service.icon?.image && (
                <img
                  src={urlFor(service.icon.image).width(48).height(48).url()}
                  alt={service.icon.alt || ''}
                  className="h-10 w-10 shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900">
                  {service.name}
                </h3>
                {cleanLayout === 'detailed' && service.shortDescription && (
                  <p className="mt-1 text-sm text-gray-600">
                    {service.shortDescription}
                  </p>
                )}
              </div>
              <svg className="h-5 w-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
