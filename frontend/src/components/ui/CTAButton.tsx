import type { CTA } from '@/sanity/types'
import { cn } from '@/lib/utils'

const variantStyles: Record<CTA['variant'], string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl',
  secondary:
    'bg-accent-500 text-white hover:bg-accent-600 shadow-lg hover:shadow-xl',
  outline:
    'border-2 border-white text-white hover:bg-white hover:text-primary-800',
  ghost:
    'text-white hover:bg-white/10',
}

export function CTAButton({ cta, className }: { cta: CTA; className?: string }) {
  const href =
    cta.link?.linkType === 'external'
      ? cta.link.externalUrl || '#'
      : '#'

  return (
    <a
      href={href}
      target={cta.link?.openInNewTab ? '_blank' : undefined}
      rel={cta.link?.openInNewTab ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200',
        variantStyles[cta.variant || 'primary'],
        className
      )}
    >
      {cta.label}
    </a>
  )
}
