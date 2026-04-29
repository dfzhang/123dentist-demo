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

// Schema: layout = 'full' | 'split-right' | 'split-left' | 'centered'
export interface HeroSection extends BlockBase {
  _type: 'heroSection'
  heading: string
  subheading?: string
  backgroundImage?: ImageWithAlt
  ctas?: CTA[]
  layout: 'full' | 'split-right' | 'split-left' | 'centered'
}

// Schema: layout = 'full' | 'narrow' | 'two-column'
export interface RichTextSection extends BlockBase {
  _type: 'richTextSection'
  heading?: string
  content: PortableTextBlock[]
  layout?: 'full' | 'narrow' | 'two-column'
}

// Schema: description (not subheading), columns
export interface ServicesGrid extends BlockBase {
  _type: 'servicesGrid'
  heading?: string
  description?: string
  services: Array<Service>
  columns: 2 | 3 | 4
}

// Schema: showDescriptions boolean (not layout)
export interface ServicesList extends BlockBase {
  _type: 'servicesList'
  heading?: string
  services: Array<Service>
  showDescriptions?: boolean
}

// Schema: description (not subheading), columns
export interface TeamGrid extends BlockBase {
  _type: 'teamGrid'
  heading?: string
  description?: string
  members: Array<TeamMember>
  columns: 2 | 3 | 4
}

// Schema: layout = 'photo-left' | 'photo-right' | 'centered', showFullBio
export interface TeamFeatured extends BlockBase {
  _type: 'teamFeatured'
  heading?: string
  member: TeamMember
  layout: 'photo-left' | 'photo-right' | 'centered'
  showFullBio?: boolean
}

// Schema: layout = 'accordion' | 'two-column' | 'list'
export interface FaqSection extends BlockBase {
  _type: 'faqSection'
  heading?: string
  faqs: Array<FAQ>
  layout?: 'accordion' | 'two-column' | 'list'
}

// Schema: galleryItem has procedure + description + consentObtained (not caption/service)
export interface GalleryItem {
  _key: string
  beforeImage: ImageWithAlt
  afterImage: ImageWithAlt
  procedure?: string
  description?: string
  consentObtained: boolean
}

// Schema: description (not subheading)
export interface SmileGallery extends BlockBase {
  _type: 'smileGallery'
  heading?: string
  description?: string
  items: GalleryItem[]
}

// Schema: valuePropItem has heading (not title)
export interface ValuePropItem {
  _key: string
  heading: string
  description: string
  icon?: ImageWithAlt
}

// Schema: layout = 'grid' | 'horizontal' | 'vertical' (no subheading)
export interface ValueProps extends BlockBase {
  _type: 'valueProps'
  heading?: string
  items: ValuePropItem[]
  layout: 'grid' | 'horizontal' | 'vertical'
}

// Schema: description (not subheading)
export interface TechnologyItem {
  _key: string
  name: string
  description?: string
  image?: ImageWithAlt
  icon?: ImageWithAlt
}

// Schema: description (not subheading), layout = 'grid' | 'carousel' | 'list'
export interface TechnologyShowcase extends BlockBase {
  _type: 'technologyShowcase'
  heading?: string
  description?: string
  technologies: TechnologyItem[]
  layout?: 'grid' | 'carousel' | 'list'
}

// Schema: imagePosition = 'left' | 'right', ctas[], no backgroundColor
export interface ImageWithTextSection extends BlockBase {
  _type: 'imageWithTextSection'
  heading?: string
  content: PortableTextBlock[]
  image: ImageWithAlt
  imagePosition?: 'left' | 'right'
  ctas?: CTA[]
}

// Schema: no aspectRatio, has thumbnail
export interface VideoEmbed extends BlockBase {
  _type: 'videoEmbed'
  heading?: string
  url: string
  thumbnail?: ImageWithAlt
  caption?: string
}

// Schema: description (not subheading), layout = 'banner' | 'card' | 'inline', backgroundImage
export interface CtaBlock extends BlockBase {
  _type: 'ctaBlock'
  heading: string
  description?: string
  ctas: CTA[]
  backgroundImage?: ImageWithAlt
  layout?: 'banner' | 'card' | 'inline'
}

// Schema: description, showContactForm (not showForm), showMap, showHours, layout
export interface ContactBlock extends BlockBase {
  _type: 'contactBlock'
  heading?: string
  description?: string
  showMap?: boolean
  showHours?: boolean
  showContactForm?: boolean
  layout?: 'side-by-side' | 'stacked' | 'map-focus'
}

// Schema: description (portableText), financingOptions[], cta
export interface FinancingOption {
  _key: string
  name: string
  description?: string
  logo?: ImageWithAlt
  url?: string
}

export interface FinancingSection extends BlockBase {
  _type: 'financingSection'
  heading?: string
  description?: PortableTextBlock[]
  financingOptions?: FinancingOption[]
  cta?: CTA
}

// Schema: showRatings boolean, layout = 'carousel' | 'grid' | 'featured'
export interface TestimonialsSection extends BlockBase {
  _type: 'testimonialsSection'
  heading?: string
  testimonials: Array<Testimonial>
  filterByService?: Service
  layout: 'carousel' | 'grid' | 'featured'
  showRatings?: boolean
}

// Schema: description (portableText, not subheading), steps, cta, showInsurance
export interface NewPatientSection extends BlockBase {
  _type: 'newPatientSection'
  heading?: string
  description?: PortableTextBlock[]
  steps?: Array<{
    _key: string
    title: string
    description: string
    icon?: ImageWithAlt
  }>
  cta?: CTA
  showInsurance?: boolean
}
