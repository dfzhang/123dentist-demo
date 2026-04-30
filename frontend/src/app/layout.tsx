import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { SanityLive } from '@/sanity/live'
import { DisableDraftMode } from '@/components/DisableDraftMode'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '123Dentist — Your Trusted Dental Care Provider',
    template: '%s',
  },
  description:
    'Find a trusted dentist near you. 123Dentist connects you with over 450 dental offices across Canada offering comprehensive dental care.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://123dentist.com'
  ),
  openGraph: {
    type: 'website',
    siteName: '123Dentist',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        {/* SanityLive goes outside draft check — no-op in production,
            subscribes to mutations in draft mode for real-time updates */}
        <SanityLive />
        {isDraftMode && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  )
}
