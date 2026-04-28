// =============================================================================
// Sanity document types for the frontend
// These mirror the schema definitions in the Studio
// =============================================================================

import type { ImageWithAlt } from './image'

// Portable Text block type (simplified for rendering)
export type PortableTextBlock = {
  _key: string
  _type: 'block'
  children: Array<{
    _key: string
    _type: 'span'
    text: string
    marks?: string[]
  }>
  style?: string
  markDefs?: Array<{
    _key: string
    _type: string
    href?: string
    reference?: { _ref: string }
  }>
  listItem?: string
  level?: number
}

// =============================================================================
// Shared object types
// =============================================================================

export interface Address {
  street: string
  suite?: string
  city: string
  province: string
  postalCode: string
  country: string
}

export interface ContactInfo {
  phone: string
  email?: string
  fax?: string
  emergencyPhone?: string
  bookingUrl?: string
}

export interface SocialLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  youtube?: string
  tiktok?: string
}

export interface DayHours {
  day: string
  isClosed: boolean
  openTime?: string
  closeTime?: string
}

export interface BusinessHours {
  schedule: DayHours[]
  timezone?: string
  holidayNote?: string
}

export interface Link {
  linkType: 'internal' | 'external'
  internalRef?: { _ref: string; _type: string }
  externalUrl?: string
  openInNewTab?: boolean
}

export interface CTA {
  label: string
  link: Link
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
}

export interface SEO {
  metaTitle?: string
  metaDescription?: string
  ogImage?: ImageWithAlt
  noIndex?: boolean
}

export interface NavSubItem {
  _key: string
  label: string
  link: Link
}

export interface NavItem {
  _key: string
  label: string
  link: Link
  children?: NavSubItem[]
}

// =============================================================================
// i18n field types (field-level on office)
// =============================================================================

export interface LocalizedString {
  _key: string
  value: string
}

export interface LocalizedText {
  _key: string
  value: string
}

export interface LocalizedPortableText {
  _key: string
  value: PortableTextBlock[]
}

// =============================================================================
// Document types
// =============================================================================

export interface Office {
  _id: string
  _type: 'office'
  name: string
  slug: { current: string }
  tagline?: LocalizedString[]
  shortDescription?: string
  logo?: ImageWithAlt
  heroImage?: ImageWithAlt
  address: Address
  contactInfo: ContactInfo
  socialLinks?: SocialLinks
  businessHours?: BusinessHours
  insuranceProviders?: InsuranceProvider[]
  mainNavigation?: NavItem[]
  footerNavigation?: NavItem[]
  seo?: SEO
  newPatientInfo?: LocalizedPortableText[]
  financingInfo?: LocalizedPortableText[]
}

export interface InsuranceProvider {
  _id: string
  _type: 'insuranceProvider'
  name: string
  logo?: ImageWithAlt
  website?: string
}

export interface Page {
  _id: string
  _type: 'page'
  title: string
  slug: { current: string }
  pageType: string
  sections: PageBuilderBlock[]
  seo?: SEO
}

export interface Service {
  _id: string
  _type: 'service'
  name: string
  slug: { current: string }
  category: string
  shortDescription?: string
  description?: PortableTextBlock[]
  icon?: ImageWithAlt
  heroImage?: ImageWithAlt
  benefits?: string[]
  seo?: SEO
}

export interface TeamMember {
  _id: string
  _type: 'teamMember'
  name: string
  slug: { current: string }
  role: string
  roleCategory: string
  shortBio?: string
  bio?: PortableTextBlock[]
  photo?: ImageWithAlt
  education?: string[]
  certifications?: string[]
  seo?: SEO
}

export interface FAQ {
  _id: string
  _type: 'faq'
  question: string
  answer: PortableTextBlock[]
  category: string
}

export interface Testimonial {
  _id: string
  _type: 'testimonial'
  patientName: string
  quote: string
  rating?: number
  source: string
  service?: Service
  date?: string
}

export interface BlogPost {
  _id: string
  _type: 'blogPost'
  title: string
  slug: { current: string }
  excerpt?: string
  featuredImage?: ImageWithAlt
  publishedAt?: string
  author?: TeamMember
}

// =============================================================================
// Page builder block types — union of all 17 blocks
// =============================================================================

export type PageBuilderBlock =
  | HeroSection
  | RichTextSection
  | ServicesGrid
  | ServicesList
  | TeamGrid
  | TeamFeatured
  | FaqSection
  | SmileGallery
  | ValueProps
  | TechnologyShowcase
  | ImageWithTextSection
  | VideoEmbed
  | CtaBlock
  | ContactBlock
  | FinancingSection
  | TestimonialsSection
  | NewPatientSection

interface BlockBase {
  _key: string
}

export interface HeroSection extends BlockBase {
  _type: 'heroSection'
  heading: string
  subheading?: string
  backgroundImage?: ImageWithAlt
  ctas?: CTA[]
  layout: 'fullWidth' | 'split' | 'centered'
}

export interface RichTextSection extends BlockBase {
  _type: 'richTextSection'
  heading?: string
  content: PortableTextBlock[]
  backgroundColor?: 'white' | 'gray' | 'primary' | 'dark'
}

export interface ServicesGrid extends BlockBase {
  _type: 'servicesGrid'
  heading?: string
  subheading?: string
  services: Array<Service>
  columns: 2 | 3 | 4
}

export interface ServicesList extends BlockBase {
  _type: 'servicesList'
  heading?: string
  services: Array<Service>
  layout: 'compact' | 'detailed'
}

export interface TeamGrid extends BlockBase {
  _type: 'teamGrid'
  heading?: string
  subheading?: string
  members: Array<TeamMember & { _key?: string }>
  columns: 2 | 3 | 4
}

export interface TeamFeatured extends BlockBase {
  _type: 'teamFeatured'
  heading?: string
  member: TeamMember
  layout: 'imageLeft' | 'imageRight'
}

export interface FaqSection extends BlockBase {
  _type: 'faqSection'
  heading?: string
  faqs: Array<FAQ>
  filterByCategory?: string
}

export interface GalleryItem {
  _key: string
  beforeImage: ImageWithAlt
  afterImage: ImageWithAlt
  caption?: string
  service?: Service
  consentObtained: boolean
}

export interface SmileGallery extends BlockBase {
  _type: 'smileGallery'
  heading?: string
  subheading?: string
  items: GalleryItem[]
}

export interface ValuePropItem {
  _key: string
  title: string
  description: string
  icon?: ImageWithAlt
}

export interface ValueProps extends BlockBase {
  _type: 'valueProps'
  heading?: string
  subheading?: string
  items: ValuePropItem[]
  layout: 'grid' | 'alternating' | 'centered'
}

export interface TechnologyItem {
  _key: string
  name: string
  description?: string
  image?: ImageWithAlt
}

export interface TechnologyShowcase extends BlockBase {
  _type: 'technologyShowcase'
  heading?: string
  subheading?: string
  technologies: TechnologyItem[]
}

export interface ImageWithTextSection extends BlockBase {
  _type: 'imageWithTextSection'
  heading?: string
  content: PortableTextBlock[]
  image: ImageWithAlt
  layout: 'imageLeft' | 'imageRight'
  backgroundColor?: 'white' | 'gray' | 'primary'
}

export interface VideoEmbed extends BlockBase {
  _type: 'videoEmbed'
  heading?: string
  url: string
  caption?: string
  aspectRatio: '16:9' | '4:3' | '1:1'
}

export interface CtaBlock extends BlockBase {
  _type: 'ctaBlock'
  heading: string
  subheading?: string
  ctas: CTA[]
  backgroundColor?: 'primary' | 'dark' | 'gradient'
}

export interface ContactBlock extends BlockBase {
  _type: 'contactBlock'
  heading?: string
  showMap?: boolean
  showForm?: boolean
  showHours?: boolean
}

export interface FinancingSection extends BlockBase {
  _type: 'financingSection'
  heading?: string
  content?: PortableTextBlock[]
  showInsuranceList?: boolean
  cta?: CTA
}

export interface TestimonialsSection extends BlockBase {
  _type: 'testimonialsSection'
  heading?: string
  subheading?: string
  testimonials: Array<Testimonial>
  layout: 'carousel' | 'grid' | 'featured'
  filterByService?: Service
}

export interface NewPatientSection extends BlockBase {
  _type: 'newPatientSection'
  heading?: string
  subheading?: string
  steps?: Array<{
    _key: string
    title: string
    description: string
    icon?: ImageWithAlt
  }>
  cta?: CTA
  showInsurance?: boolean
}
