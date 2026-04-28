import Link from 'next/link'
import type { Office } from '@/sanity/types'
import { formatPhone, formatTime } from '@/lib/utils'

interface FooterProps {
  office: Office
  officeSlug: string
}

export function Footer({ office, officeSlug }: FooterProps) {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Office info */}
          <div>
            <h3 className="mb-4 text-lg font-bold">{office.name}</h3>
            {office.address && (
              <address className="mb-4 text-sm not-italic text-primary-200">
                <p>{office.address.street}</p>
                {office.address.suite && <p>{office.address.suite}</p>}
                <p>
                  {office.address.city}, {office.address.province}{' '}
                  {office.address.postalCode}
                </p>
              </address>
            )}
            {office.contactInfo && (
              <div className="space-y-1 text-sm text-primary-200">
                {office.contactInfo.phone && (
                  <p>
                    <a
                      href={`tel:${office.contactInfo.phone}`}
                      className="hover:text-white"
                    >
                      {formatPhone(office.contactInfo.phone)}
                    </a>
                  </p>
                )}
                {office.contactInfo.email && (
                  <p>
                    <a
                      href={`mailto:${office.contactInfo.email}`}
                      className="hover:text-white"
                    >
                      {office.contactInfo.email}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Hours */}
          {office.businessHours?.schedule && (
            <div>
              <h3 className="mb-4 text-lg font-bold">Office Hours</h3>
              <div className="space-y-1 text-sm text-primary-200">
                {office.businessHours.schedule.map((day) => (
                  <div key={day.day} className="flex justify-between">
                    <span className="capitalize">{day.day}</span>
                    <span>
                      {day.isClosed
                        ? 'Closed'
                        : `${formatTime(day.openTime!)} – ${formatTime(day.closeTime!)}`}
                    </span>
                  </div>
                ))}
              </div>
              {office.businessHours.holidayNote && (
                <p className="mt-3 text-xs text-primary-300">
                  {office.businessHours.holidayNote}
                </p>
              )}
            </div>
          )}

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <nav className="space-y-2 text-sm text-primary-200">
              {office.footerNavigation?.map((item) => (
                <p key={item._key}>
                  <Link
                    href={`/${officeSlug}`}
                    className="hover:text-white"
                  >
                    {item.label}
                  </Link>
                </p>
              ))}
            </nav>

            {/* Social links */}
            {office.socialLinks && (
              <div className="mt-6 flex gap-3">
                {office.socialLinks.facebook && (
                  <SocialLink href={office.socialLinks.facebook} label="Facebook" />
                )}
                {office.socialLinks.instagram && (
                  <SocialLink href={office.socialLinks.instagram} label="Instagram" />
                )}
                {office.socialLinks.twitter && (
                  <SocialLink href={office.socialLinks.twitter} label="Twitter" />
                )}
                {office.socialLinks.linkedin && (
                  <SocialLink href={office.socialLinks.linkedin} label="LinkedIn" />
                )}
                {office.socialLinks.youtube && (
                  <SocialLink href={office.socialLinks.youtube} label="YouTube" />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-primary-800 pt-8 text-center text-sm text-primary-400">
          <p>
            © {new Date().getFullYear()} {office.name}. All rights reserved.
          </p>
          <p className="mt-1">Part of the 123Dentist network</p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-800 text-primary-200 transition-colors hover:bg-primary-700 hover:text-white"
      aria-label={label}
    >
      <span className="text-xs font-bold">{label[0]}</span>
    </a>
  )
}
