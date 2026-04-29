import { stegaClean } from 'next-sanity'
import type { TeamFeatured } from '@/sanity/types'
import { urlFor } from '@/sanity/image'
import { RichText } from '../ui/PortableText'

export function TeamFeaturedBlock({ block }: { block: TeamFeatured }) {
  const cleanLayout = stegaClean(block.layout) || 'photo-left'
  const isPhotoLeft = cleanLayout === 'photo-left'

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        {block.heading && (
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            {block.heading}
          </h2>
        )}

        {cleanLayout === 'centered' ? (
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full bg-gray-200">
              {block.member?.photo?.image ? (
                <img
                  src={urlFor(block.member.photo.image)
                    .width(384)
                    .height(384)
                    .url()}
                  alt={block.member.photo.alt || block.member.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-6xl text-gray-400">
                  {block.member?.name?.[0]}
                </div>
              )}
            </div>
            <h3 className="mb-1 text-2xl font-bold text-gray-900">
              {block.member?.name}
            </h3>
            <p className="mb-4 text-lg font-medium text-primary-600">
              {block.member?.role}
            </p>
            {block.showFullBio && block.member?.bio ? (
              <RichText value={block.member.bio} />
            ) : block.member?.shortBio ? (
              <p className="text-gray-600">{block.member.shortBio}</p>
            ) : null}
          </div>
        ) : (
          <div
            className={`flex flex-col items-center gap-12 md:flex-row ${
              isPhotoLeft ? '' : 'md:flex-row-reverse'
            }`}
          >
            {/* Photo */}
            <div className="w-full md:w-2/5">
              <div className="overflow-hidden rounded-2xl bg-gray-200">
                {block.member?.photo?.image ? (
                  <img
                    src={urlFor(block.member.photo.image)
                      .width(600)
                      .height(700)
                      .url()}
                    alt={block.member.photo.alt || block.member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-80 items-center justify-center text-6xl text-gray-400">
                    {block.member?.name?.[0]}
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="w-full md:w-3/5">
              <h3 className="mb-1 text-2xl font-bold text-gray-900">
                {block.member?.name}
              </h3>
              <p className="mb-4 text-lg font-medium text-primary-600">
                {block.member?.role}
              </p>
              {block.showFullBio && block.member?.bio ? (
                <RichText value={block.member.bio} />
              ) : block.member?.shortBio ? (
                <p className="text-gray-600">{block.member.shortBio}</p>
              ) : null}
              {block.member?.credentials && block.member.credentials.length > 0 && (
                <div className="mt-6">
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Credentials
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {block.member.credentials.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
