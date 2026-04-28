import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { SanityLive } from '@/sanity/live'
import { DisableDraftMode } from '@/components/DisableDraftMode'
import './globals.css'

export const metadata: Metadata = {
  title: '123Dentist',
  description: 'Your trusted dental care provider',
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
