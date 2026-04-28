import { PortableText as SanityPortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@/sanity/types'

const components = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="mb-4 mt-8 text-3xl font-bold text-gray-900">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-3 mt-6 text-2xl font-semibold text-gray-900">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mb-2 mt-4 text-xl font-semibold text-gray-900">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-6 border-l-4 border-primary-300 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-4 ml-6 list-disc space-y-1 text-gray-700">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1 text-gray-700">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-primary-600 underline hover:text-primary-800"
      >
        {children}
      </a>
    ),
  },
}

export function RichText({ value }: { value: PortableTextBlock[] }) {
  if (!value) return null
  return <SanityPortableText value={value} components={components} />
}
