import { stegaClean } from 'next-sanity'
import type { VideoEmbed } from '@/sanity/types'

export function VideoEmbedBlock({ block }: { block: VideoEmbed }) {
  // Clean URL before using — stega would break the embed
  const cleanUrl = stegaClean(block.url)
  const embedUrl = getEmbedUrl(cleanUrl)

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        {block.heading && (
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            {block.heading}
          </h2>
        )}
        <div className="aspect-video overflow-hidden rounded-2xl bg-gray-900">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={block.heading || 'Video'}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <p>Invalid video URL</p>
            </div>
          )}
        </div>
        {block.caption && (
          <p className="mt-4 text-center text-sm text-gray-600">
            {block.caption}
          </p>
        )}
      </div>
    </section>
  )
}

function getEmbedUrl(url: string): string | null {
  if (!url) return null

  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  )
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  return null
}
