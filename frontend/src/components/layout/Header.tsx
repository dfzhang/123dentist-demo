import Link from 'next/link'
import type { Office, NavItem } from '@/sanity/types'
import { urlFor } from '@/sanity/image'
import { formatPhone } from '@/lib/utils'

interface HeaderProps {
  office: Office
  officeSlug: string
}

export function Header({ office, officeSlug }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-primary-800 px-4 py-2 text-sm text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            {office.contactInfo?.phone && (
              <a
                href={`tel:${office.contactInfo.phone}`}
                className="flex items-center gap-1 hover:text-primary-200"
              >
                <PhoneIcon />
                {formatPhone(office.contactInfo.phone)}
              </a>
            )}
            {office.contactInfo?.email && (
              <a
                href={`mailto:${office.contactInfo.email}`}
                className="hidden items-center gap-1 hover:text-primary-200 sm:flex"
              >
                <EmailIcon />
                {office.contactInfo.email}
              </a>
            )}
          </div>
          {office.contactInfo?.bookingUrl && (
            <a
              href={office.contactInfo.bookingUrl}
              className="rounded bg-accent-500 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-accent-600"
            >
              Book Online
            </a>
          )}
        </div>
      </div>

      {/* Main nav */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href={`/${officeSlug}`} className="flex items-center gap-3">
          {office.logo?.image && (
            <img
              src={urlFor(office.logo.image).width(160).height(48).url()}
              alt={office.logo.alt || office.name}
              className="h-12 w-auto"
            />
          )}
          {!office.logo?.image && (
            <span className="text-xl font-bold text-primary-800">
              {office.name}
            </span>
          )}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {office.mainNavigation?.map((item) => (
            <NavItemComponent
              key={item._key}
              item={item}
              officeSlug={officeSlug}
            />
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </nav>
    </header>
  )
}

function NavItemComponent({
  item,
  officeSlug,
}: {
  item: NavItem
  officeSlug: string
}) {
  const href = resolveLink(item.link, officeSlug)

  if (item.children && item.children.length > 0) {
    return (
      <div className="group relative">
        <a
          href={href}
          className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600"
        >
          {item.link?.label}
        </a>
        <div className="invisible absolute left-0 top-full z-50 min-w-48 rounded-lg border border-gray-100 bg-white py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
          {item.children.map((child) => (
            <a
              key={child._key}
              href={resolveLink(child.link, officeSlug)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
            >
              {child.link?.label}
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <a
      href={href}
      className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600"
    >
      {item.link?.label}
    </a>
  )
}

function resolveLink(
  link: { linkType: string; externalUrl?: string; internalRef?: { _ref: string } } | undefined,
  officeSlug: string
): string {
  if (!link) return '#'
  if (link.linkType === 'external' && link.externalUrl) return link.externalUrl
  // Internal links resolve relative to office
  return `/${officeSlug}`
}

// Simple SVG icons
function PhoneIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}
