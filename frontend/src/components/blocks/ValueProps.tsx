import { stegaClean } from 'next-sanity'
import type { ValueProps } from '@/sanity/types'
import { urlFor } from '@/sanity/image'

export function ValuePropsBlock({ block }: { block: ValueProps }) {
  const cleanLayout = stegaClean(block.layout) || 'grid'

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        {block.heading && (
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">{block.heading}</h2>
            {block.subheading && (
              <p className="mt-3 text-lg text-gray-600">{block.subheading}</p>
            )}
          </div>
        )}

        {cleanLayout === 'centered' ? (
          <div className="grid gap-8 md:grid-cols-3">
            {block.items?.map((item) => (
              <div key={item._key} className="text-center">
                {item.icon?.image && (
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                    <img
                      src={urlFor(item.icon.image).width(48).height(48).url()}
                      alt={item.icon.alt || ''}
                      className="h-8 w-8"
                    />
                  </div>
                )}
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        ) : cleanLayout === 'alternating' ? (
          <div className="space-y-12">
            {block.items?.map((item, i) => (
              <div
                key={item._key}
                className={`flex flex-col items-center gap-8 md:flex-row ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {item.icon?.image && (
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-primary-100">
                    <img
                      src={urlFor(item.icon.image).width(64).height(64).url()}
                      alt={item.icon.alt || ''}
                      className="h-12 w-12"
                    />
                  </div>
                )}
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* grid (default) */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {block.items?.map((item) => (
              <div
                key={item._key}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                {item.icon?.image && (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                    <img
                      src={urlFor(item.icon.image).width(32).height(32).url()}
                      alt={item.icon.alt || ''}
                      className="h-6 w-6"
                    />
                  </div>
                )}
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
