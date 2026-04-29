import type { ServicesGrid } from '@/sanity/types'
import { urlFor } from '@/sanity/image'

export function ServicesGridBlock({ block }: { block: ServicesGrid }) {
  const cols = block.columns || 3
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[cols]

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        {(block.heading || block.description) && (
          <div className="mb-12 text-center">
            {block.heading && (
              <h2 className="text-3xl font-bold text-gray-900">{block.heading}</h2>
            )}
            {block.description && (
              <p className="mt-3 text-lg text-gray-600">{block.description}</p>
            )}
          </div>
        )}
        <div className={`grid gap-8 ${gridCols}`}>
          {block.services?.map((service) => (
            <div
              key={service._id}
              className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              {service.image?.image && (
                <img
                  src={urlFor(service.image.image).width(80).height(80).url()}
                  alt={service.image.alt || ''}
                  className="mb-4 h-16 w-16"
                />
              )}
              <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-primary-600">
                {service.name}
              </h3>
              <p className="text-sm text-gray-600">
                {service.shortDescription}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
