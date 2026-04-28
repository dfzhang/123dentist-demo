'use client'

import { useIsPresentationTool } from 'next-sanity/hooks'

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool()

  // Hide when inside Presentation Tool iframe — Studio handles exit
  if (isPresentationTool) return null

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-50 rounded-full bg-gray-900 px-4 py-2 text-sm text-white shadow-lg hover:bg-gray-700"
    >
      Exit Preview
    </a>
  )
}
