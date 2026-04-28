'use client'

import { useState } from 'react'
import type { FaqSection } from '@/sanity/types'
import { RichText } from '../ui/PortableText'

export function FaqSectionBlock({ block }: { block: FaqSection }) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-3xl px-4">
        {block.heading && (
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            {block.heading}
          </h2>
        )}
        <div className="space-y-3">
          {block.faqs?.map((faq) => (
            <FaqItem key={faq._id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqItem({ faq }: { faq: FaqSection['faqs'][number] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <span className="font-medium text-gray-900">{faq?.question}</span>
        <svg
          className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && faq?.answer && (
        <div className="border-t border-gray-100 px-6 py-4">
          <RichText value={faq.answer} />
        </div>
      )}
    </div>
  )
}
