import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/live'
import { pageBySlugQuery, officeBySlugQuery } from '@/sanity/queries'
import type { Page } from '@/sanity/types'
import { PageBuilder } from '@/components/blocks/PageBuilder'
import { buildMetadata } from '@/lib/metadata'

interface Props {
  params: Promise<{ office: string; slug: string[] }>
}

export async function generateMetadata({ params }: Props) {
  const { office: officeSlug, slug } = await params
  const pageSlug = slug.join('/')

  const { data: office } = await sanityFetch({
    query: officeBySlugQuery,
    params: { officeSlug },
    stega: false,
  })

  if (!office) return { title: 'Not Found' }

  const { data: page } = await sanityFetch({
    query: pageBySlugQuery,
    params: {
      slug: pageSlug,
      officeId: (office as any)._id,
      language: 'en',
    },
    stega: false,
  })

  return buildMetadata({
    seo: (page as any)?.seo,
    fallbackTitle: (page as any)?.title || 'Page Not Found',
    officeName: (office as any).name,
    path: `/${officeSlug}/${pageSlug}`,
  })
}

export default async function CatchAllPage({ params }: Props) {
  const { office: officeSlug, slug } = await params
  const pageSlug = slug.join('/')

  const { data: office } = await sanityFetch({
    query: officeBySlugQuery,
    params: { officeSlug },
  })

  if (!office) notFound()

  const { data: page } = await sanityFetch({
    query: pageBySlugQuery,
    params: {
      slug: pageSlug,
      officeId: (office as any)._id,
      language: 'en',
    },
  })

  if (!page) notFound()

  return <PageBuilder sections={(page as Page).sections} />
}
