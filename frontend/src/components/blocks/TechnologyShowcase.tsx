import type { TechnologyShowcase } from '@/sanity/types'
import { urlFor } from '@/sanity/image'

export function TechnologyShowcaseBlock({ block }: { block: TechnologyShowcase }) {
  return (
    <section className="bg-primary-900 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4">
        {(block.heading || block.description) && (
          <div className="mb-12 text-center">
            {block.heading && (
              <h2 className="text-3xl font-bold">{block.heading}</h2>
            )}
            {block.description && (
              <p className="mt-3 text-lg text-primary-200">{block.description}</p>
            )}
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {block.technologies?.map((tech) => (
            <div
              key={tech._key}
              className="rounded-xl bg-primary-800/50 p-6 backdrop-blur"
            >
              {tech.image?.image && (
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={urlFor(tech.image.image).width(400).height(250).url()}
                    alt={tech.image.alt || tech.name}
                    className="h-48 w-full object-cover"
                  />
                </div>
              )}
              <h3 className="mb-2 text-lg font-semibold">{tech.name}</h3>
              {tech.description && (
                <p className="text-sm text-primary-200">{tech.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
