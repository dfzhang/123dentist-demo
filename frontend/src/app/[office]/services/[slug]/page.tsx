import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/live'
import { serviceBySlugQuery, officeBySlugQuery } from '@/sanity/queries'
import type { Service } from '@/sanity/types'
import { urlFor } from '@/sanity/image'
import { RichText } from '@/components/ui/PortableText'

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

  return {
    title: (service as any)?.seo?.metaTitle || (service as any)?.name || 'Service',
    description: (service as any)?.seo?.metaDescription || (service as any)?.shortDescription,
  }
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
            {service.heroImage?.image && (
              <img
                src={urlFor(service.heroImage.image).width(400).height(300).url()}
                alt={service.heroImage.alt || service.name}
                className="rounded-xl"
              />
            )}
            {service.benefits && service.benefits.length > 0 && (
              <div className="rounded-xl bg-primary-50 p-6">
                <h3 className="mb-3 font-semibold text-gray-900">Benefits</h3>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  )
}
