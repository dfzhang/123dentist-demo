import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/live'
import { teamMemberBySlugQuery, officeBySlugQuery } from '@/sanity/queries'
import type { TeamMember } from '@/sanity/types'
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

  const { data: member } = await sanityFetch({
    query: teamMemberBySlugQuery,
    params: { slug, officeId: (office as any)._id, language: 'en' },
    stega: false,
  })

  return buildMetadata({
    seo: (member as any)?.seo,
    fallbackTitle: (member as any)?.name || 'Team Member',
    fallbackDescription: (member as any)?.shortBio,
    officeName: (office as any).name,
    path: `/${officeSlug}/team/${slug}`,
  })
}

export default async function TeamMemberPage({ params }: Props) {
  const { office: officeSlug, slug } = await params

  const { data: office } = await sanityFetch({
    query: officeBySlugQuery,
    params: { officeSlug },
  })
  if (!office) notFound()

  const { data } = await sanityFetch({
    query: teamMemberBySlugQuery,
    params: { slug, officeId: (office as any)._id, language: 'en' },
  })

  const member = data as TeamMember | null
  if (!member) notFound()

  return (
    <article className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex flex-col items-start gap-12 md:flex-row">
          {/* Photo */}
          <div className="w-full md:w-1/3">
            <div className="overflow-hidden rounded-2xl bg-gray-200">
              {member.photo?.image ? (
                <img
                  src={urlFor(member.photo.image).width(400).height(500).url()}
                  alt={member.photo.alt || member.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-80 items-center justify-center text-6xl text-gray-400">
                  {member.name[0]}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-primary-600">
              {member.roleCategory}
            </p>
            <h1 className="mb-1 text-3xl font-bold text-gray-900">
              {member.name}
            </h1>
            <p className="mb-6 text-lg text-gray-600">{member.role}</p>

            {member.bio && <RichText value={member.bio} />}

            {member.credentials && member.credentials.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 text-lg font-semibold text-gray-900">
                  Credentials
                </h2>
                <ul className="space-y-1">
                  {member.credentials.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-primary-500">🎓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
