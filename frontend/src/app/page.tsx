import Link from 'next/link'
import { sanityFetch } from '@/sanity/live'
import { allOfficesQuery } from '@/sanity/queries'

interface OfficeListItem {
  _id: string
  name: string
  slug: { current: string }
  domain: string
}

export default async function HomePage() {
  const { data: offices } = await sanityFetch({
    query: allOfficesQuery,
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-2 text-4xl font-bold text-primary-800">
          123Dentist
        </h1>
        <p className="mb-12 text-lg text-gray-600">
          Select an office to view their website
        </p>

        {!offices || offices.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <p className="text-gray-500">
              No offices found. Create an office document in Sanity Studio to get
              started.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {(offices as OfficeListItem[]).map((office) => (
              <Link
                key={office._id}
                href={`/${office.domain}`}
                className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
              >
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600">
                  {office.name}
                </h2>
                <p className="mt-1 text-sm text-gray-500">/{office.domain}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
