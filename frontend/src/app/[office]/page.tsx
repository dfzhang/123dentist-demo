import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/live'
import { homePageQuery, officeBySlugQuery } from '@/sanity/queries'
import type { Page } from '@/sanity/types'
import { PageBuilder } from '@/components/blocks/PageBuilder'

interface Props {
  params: Promise<{ office: string }>
}

export async function generateMetadata({ params }: Props) {
  const { office: officeSlug } = await params

  const { data: office } = await sanityFetch({
    query: officeBySlugQuery,
    params: { officeSlug },
    stega: false, // No stega in metadata — breaks <title> tags
  })

  if (!office) return { title: 'Office Not Found' }

  const { data: page } = await sanityFetch({
    query: homePageQuery,
    params: { officeId: (office as any)._id, language: 'en' },
    stega: false,
  })

  return {
    title: (page as any)?.seo?.metaTitle || `${(office as any).name} | 123Dentist`,
    description: (page as any)?.seo?.metaDescription || (office as any).shortDescription,
  }
}

export default async function OfficeHomePage({ params }: Props) {
  const { office: officeSlug } = await params

  const { data: office } = await sanityFetch({
    query: officeBySlugQuery,
    params: { officeSlug },
  })

  if (!office) notFound()

  const { data: page } = await sanityFetch({
    query: homePageQuery,
    params: { officeId: (office as any)._id, language: 'en' },
  })

  if (!page) {
    // No home page configured — show a placeholder
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Welcome to {(office as any).name}
          </h1>
          <p className="text-gray-600">
            This office&apos;s home page hasn&apos;t been configured yet.
          </p>
        </div>
      </div>
    )
  }

  return <PageBuilder sections={(page as Page).sections} />
}
