import { stegaClean } from 'next-sanity'
import type { TestimonialsSection } from '@/sanity/types'

export function TestimonialsSectionBlock({
  block,
}: {
  block: TestimonialsSection
}) {
  const cleanLayout = stegaClean(block.layout) || 'grid'

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        {block.heading && (
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">{block.heading}</h2>
          </div>
        )}

        {cleanLayout === 'featured' ? (
          // Featured: single large testimonial
          block.testimonials?.[0] && (
            <div className="mx-auto max-w-3xl text-center">
              <TestimonialCard
                testimonial={block.testimonials[0]}
                featured
              />
            </div>
          )
        ) : (
          // Grid layout
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {block.testimonials?.map((testimonial) => (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
  featured = false,
}: {
  testimonial: TestimonialsSection['testimonials'][number]
  featured?: boolean
}) {
  return (
    <div
      className={`rounded-xl bg-white p-6 shadow-sm ${
        featured ? 'border-2 border-primary-200 p-10' : 'border border-gray-200'
      }`}
    >
      {/* Stars */}
      {testimonial?.rating && (
        <div className="mb-3 flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`h-5 w-5 ${
                i < testimonial.rating! ? 'text-yellow-400' : 'text-gray-200'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      <blockquote
        className={`mb-4 italic text-gray-700 ${featured ? 'text-xl' : 'text-sm'}`}
      >
        &ldquo;{testimonial?.quote}&rdquo;
      </blockquote>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900">
            {testimonial?.patientName}
          </p>
          {testimonial?.service && (
            <p className="text-xs text-gray-500">{testimonial.service.name}</p>
          )}
        </div>
        {testimonial?.source && (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
            {testimonial.source}
          </span>
        )}
      </div>
    </div>
  )
}
