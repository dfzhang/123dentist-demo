import { groq } from 'next-sanity'

// =============================================================================
// Shared: page builder sections projection with reference dereferencing
// =============================================================================
// The `...` spread copies all inline fields but leaves references as { _ref }.
// Blocks that reference other documents need explicit dereferencing via `->`.
// One projection, used by both homePageQuery and pageBySlugQuery.

const sectionsProjection = groq`
  sections[] {
    _key,
    _type,
    ...,

    // --- Blocks with service references (flat reference arrays) ---
    _type == "servicesGrid" => {
      ...,
      "services": services[]-> { _id, name, shortDescription, slug, image, category }
    },
    _type == "servicesList" => {
      ...,
      "services": services[]-> { _id, name, shortDescription, slug, image, category }
    },

    // --- Blocks with team member references ---
    _type == "teamFeatured" => {
      ...,
      "member": member-> { _id, name, role, shortBio, bio, photo, slug, credentials }
    },
    _type == "teamGrid" => {
      ...,
      "members": members[]-> { _id, name, role, shortBio, photo, slug }
    },

    // --- Blocks with testimonial references (flat reference arrays) ---
    _type == "testimonialsSection" => {
      ...,
      "testimonials": testimonials[]-> {
        _id, patientName, quote, rating, source, date,
        "service": service-> { _id, name }
      },
      "filterService": filterByService-> { _id, name }
    },

    // --- Blocks with FAQ references (flat reference arrays) ---
    _type == "faqSection" => {
      ...,
      "faqs": faqs[]-> { _id, question, answer, category }
    }
  }
`

// =============================================================================
// Office queries
// =============================================================================

// Get all offices (for static path generation)
export const allOfficesQuery = groq`
  *[_type == "office"] {
    _id,
    name,
    slug,
    "domain": slug.current
  }
`

// Get full office data by slug
export const officeBySlugQuery = groq`
  *[_type == "office" && slug.current == $officeSlug][0] {
    _id,
    name,
    slug,
    tagline,
    shortDescription,
    logo,
    heroImage,
    address,
    contactInfo,
    socialLinks,
    businessHours,
    insuranceProviders[]-> {
      _id,
      name,
      logo
    },
    mainNavigation[] {
      _key,
      label,
      link,
      children[] {
        _key,
        label,
        link
      }
    },
    footerNavigation[] {
      _key,
      label,
      link
    },
    seo,
    newPatientInfo,
    financingInfo
  }
`

// =============================================================================
// Page queries — office-scoped + language-filtered
// =============================================================================

// Get a page by slug within an office
export const pageBySlugQuery = groq`
  *[_type == "page"
    && slug.current == $slug
    && office._ref == $officeId
    && language == $language
  ][0] {
    _id,
    _type,
    title,
    slug,
    pageType,
    ${sectionsProjection},
    seo
  }
`

// Get the home page for an office
export const homePageQuery = groq`
  *[_type == "page"
    && pageType == "home"
    && office._ref == $officeId
    && language == $language
  ][0] {
    _id,
    _type,
    title,
    slug,
    pageType,
    ${sectionsProjection},
    seo
  }
`

// Get all pages for an office (for nav/sitemap)
export const allPagesQuery = groq`
  *[_type == "page"
    && office._ref == $officeId
    && language == $language
  ] {
    _id,
    title,
    slug,
    pageType
  }
`

// =============================================================================
// Content type queries — all office-scoped + language-filtered
// =============================================================================

export const allServicesQuery = groq`
  *[_type == "service"
    && office._ref == $officeId
    && language == $language
  ] | order(name asc) {
    _id,
    name,
    slug,
    category,
    shortDescription,
    image
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service"
    && slug.current == $slug
    && office._ref == $officeId
    && language == $language
  ][0] {
    _id,
    _type,
    name,
    slug,
    category,
    shortDescription,
    description,
    image,
    seo
  }
`

export const allTeamMembersQuery = groq`
  *[_type == "teamMember"
    && office._ref == $officeId
    && language == $language
  ] | order(name asc) {
    _id,
    name,
    slug,
    role,
    roleCategory,
    shortBio,
    photo
  }
`

export const teamMemberBySlugQuery = groq`
  *[_type == "teamMember"
    && slug.current == $slug
    && office._ref == $officeId
    && language == $language
  ][0] {
    _id,
    _type,
    name,
    slug,
    role,
    roleCategory,
    shortBio,
    bio,
    photo,
    credentials,
    seo
  }
`

export const allFaqsQuery = groq`
  *[_type == "faq"
    && office._ref == $officeId
    && language == $language
  ] | order(category asc, question asc) {
    _id,
    question,
    answer,
    category
  }
`

export const allTestimonialsQuery = groq`
  *[_type == "testimonial"
    && office._ref == $officeId
    && language == $language
  ] | order(_createdAt desc) {
    _id,
    patientName,
    quote,
    rating,
    source,
    service-> {
      _id,
      name,
      slug
    },
    date
  }
`

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"
    && office._ref == $officeId
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    author-> {
      _id,
      name,
      photo
    }
  }
`

// =============================================================================
// Insurance providers (corporate — no office scoping)
// =============================================================================

export const allInsuranceProvidersQuery = groq`
  *[_type == "insuranceProvider"] | order(name asc) {
    _id,
    name,
    logo,
    website
  }
`
