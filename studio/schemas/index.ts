import type { SchemaTypeDefinition } from 'sanity'

// Object types
import {
  imageWithAlt,
  seo,
  contactInfo,
  address,
  dayHours,
  businessHours,
  socialLinks,
  link,
  cta,
  technologyItem,
  navItem,
  navSubItem,
  portableText,
  portableTextSimple,
} from './objects'

// Document types
import {
  office,
  dentalGroup,
  insuranceProvider,
  service,
  teamMember,
  faq,
  testimonial,
  blogPost,
  page,
} from './documents'

// Page builder blocks
import {
  heroSection,
  richTextSection,
  servicesGrid,
  servicesList,
  teamGrid,
  teamFeatured,
  faqSection,
  galleryItem,
  smileGallery,
  valuePropItem,
  valueProps,
  technologyShowcase,
  imageWithTextSection,
  videoEmbed,
  ctaBlock,
  contactBlock,
  financingSection,
  testimonialsSection,
  newPatientSection,
} from './blocks'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects (13)
  imageWithAlt,
  seo,
  contactInfo,
  address,
  dayHours,
  businessHours,
  socialLinks,
  link,
  cta,
  technologyItem,
  navItem,
  navSubItem,
  portableText,
  portableTextSimple,

  // Documents (9)
  office,
  dentalGroup,
  insuranceProvider,
  service,
  teamMember,
  faq,
  testimonial,
  blogPost,
  page,

  // Page builder blocks (17) + supporting inline types (2)
  heroSection,
  richTextSection,
  servicesGrid,
  servicesList,
  teamGrid,
  teamFeatured,
  faqSection,
  galleryItem,
  smileGallery,
  valuePropItem,
  valueProps,
  technologyShowcase,
  imageWithTextSection,
  videoEmbed,
  ctaBlock,
  contactBlock,
  financingSection,
  testimonialsSection,
  newPatientSection,
]
