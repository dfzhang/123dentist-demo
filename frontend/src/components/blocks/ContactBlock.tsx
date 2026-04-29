import type { ContactBlock } from '@/sanity/types'

export function ContactBlockBlock({ block }: { block: ContactBlock }) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        {block.heading && (
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
            {block.heading}
          </h2>
        )}
        {block.description && (
          <p className="mb-12 text-center text-lg text-gray-600">
            {block.description}
          </p>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact form */}
          {block.showContactForm !== false && (
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold text-gray-900">
                Send Us a Message
              </h3>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  Send Message
                </button>
              </form>
            </div>
          )}

          {/* Map / Hours placeholder */}
          <div className="space-y-6">
            {block.showMap !== false && (
              <div className="flex h-64 items-center justify-center overflow-hidden rounded-xl bg-gray-200">
                <p className="text-sm text-gray-500">
                  Map integration — configure Google Maps API key
                </p>
              </div>
            )}
            {block.showHours !== false && (
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Office Hours
                </h3>
                <p className="text-sm text-gray-600">
                  Hours are displayed from the office profile — see footer for
                  current schedule.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
