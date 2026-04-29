import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/live'
import { officeBySlugQuery } from '@/sanity/queries'
import type { Office } from '@/sanity/types'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface OfficeLayoutProps {
  children: React.ReactNode
  params: Promise<{ office: string }>
}

export default async function OfficeLayout({
  children,
  params,
}: OfficeLayoutProps) {
  const { office: officeSlug } = await params

  const { data: office } = await sanityFetch({
    query: officeBySlugQuery,
    params: { officeSlug },
  })

  if (!office) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col" data-office={officeSlug}>
      <Header office={office as Office} officeSlug={officeSlug} />
      <main className="flex-1">{children}</main>
      <Footer office={office as Office} officeSlug={officeSlug} />
    </div>
  )
}
