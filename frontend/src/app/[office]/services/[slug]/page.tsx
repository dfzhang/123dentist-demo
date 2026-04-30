import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/live'
import { serviceBySlugQuery, officeBySlugQuery } from '@/sanity/queries'
import type { Service } from '@/sanity/types'
import { urlFor } from '@/sanity/image'
import { RichText } from '@/components/ui/PortableText'
import { buildMetadata } from '@/lib/metadata'

interface Props {
  params: Promise<{ office: string; slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { office: officeSlug, slug } = await params

  const { data: office } = await sanityFetch({
    query: officeBySlugQuery,
    params: { officeSlug },
    stega: false,
  })
  if (!office) return { title: 'Not Found' }

  const { data: service } = await sanityFetch({
    query: serviceBySlugQuery,
    params: { slug, officeId: (office as any)._id, language: 'en' },
    stega: false,
  })

  return buildMetadata({
    seo: (service as any)?.seo,
    fallbackTitle: (service as any)?.name || 'Service',
    fallbackDescription: (service as any)?.shortDescription,
    officeName: (office as any).name,
    path: `/${officeSlug}/services/${slug}`,
  })
}

export default async function ServicePage({ params }: Props) {
  const { office: officeSlug, slug } = await params

  const { data: office } = await sanityFetch({
    query: officeBySlugQuery,
    params: { officeSlug },
  })
  if (!office) notFound()

  const { data } = await sanityFetch({
    query: serviceBySlugQuery,
    params: { slug, officeId: (office as any)._id, language: 'en' },
  })

  const service = data as Service | null
  if (!service) notFound()

  return (
    <article>
      {/* Hero */}
      <div className="bg-primary-800 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4">
          {service.category && (
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary-300">
              {service.category}
            </p>
          )}
          <h1 className="text-4xl font-bold">{service.name}</h1>
          {service.shortDescription && (
            <p className="mt-4 text-lg text-primary-200">
              {service.shortDescription}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            {service.description && <RichText value={service.description} />}
          </div>
          <aside className="space-y-6">
            {service.image?.image && (
              <img
                src={urlFor(service.image.image).width(400).height(300).url()}
                alt={service.image.alt || service.name}
                className="rounded-xl"
              />
            )}
          </aside>
        </div>
      </div>
    </article>
  )
}
