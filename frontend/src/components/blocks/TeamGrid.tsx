import type { TeamGrid } from '@/sanity/types'
import { urlFor } from '@/sanity/image'

export function TeamGridBlock({ block }: { block: TeamGrid }) {
  const cols = block.columns || 3
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[cols]

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
        <div className={`grid gap-8 ${gridCols}`}>
          {block.members?.map((item) => (
            <div key={item._key} className="group text-center">
              <div className="mx-auto mb-4 h-48 w-48 overflow-hidden rounded-full bg-gray-200">
                {item.member?.photo?.image ? (
                  <img
                    src={urlFor(item.member.photo.image)
                      .width(384)
                      .height(384)
                      .url()}
                    alt={item.member.photo.alt || item.member.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl text-gray-400">
                    {item.member?.name?.[0]}
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {item.member?.name}
              </h3>
              <p className="text-sm font-medium text-primary-600">
                {item.member?.role}
              </p>
              {item.member?.shortBio && (
                <p className="mt-2 text-sm text-gray-600">
                  {item.member.shortBio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
