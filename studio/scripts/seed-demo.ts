/**
 * Demo content seed script for 123dentist
 *
 * Creates a sample office (Atlantis Dental Yaletown) with:
 * - Full office profile (address, contact, hours, nav, insurance)
 * - Home page with 12 page builder blocks (all 17 block types covered across pages)
 * - About page with team + value props + video embed
 * - Services page with services grid + list + contact
 * - 3 services, 3 team members, 5 FAQs, 3 testimonials, 2 insurance providers
 *
 * Usage: npx tsx scripts/seed-demo.ts
 */

import { createClient } from '@sanity/client'

const projectId = 'kr0ivyaf'
const dataset = 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('Missing SANITY_API_TOKEN environment variable')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-04-01',
  useCdn: false,
})

// =============================================================================
// Document IDs — deterministic for idempotent seeding
// =============================================================================

const OFFICE_ID = 'office-atlantis-yaletown'
const HOME_PAGE_ID = 'page-atlantis-home'
const ABOUT_PAGE_ID = 'page-atlantis-about'
const SERVICES_PAGE_ID = 'page-atlantis-services'

const SERVICE_IDS = {
  cosmetic: 'service-atlantis-cosmetic',
  invisalign: 'service-atlantis-invisalign',
  implants: 'service-atlantis-implants',
}

const TEAM_IDS = {
  drKarkanis: 'team-atlantis-karkanis',
  drChen: 'team-atlantis-chen',
  sarahJones: 'team-atlantis-jones',
}

const FAQ_IDS = [
  'faq-atlantis-1',
  'faq-atlantis-2',
  'faq-atlantis-3',
  'faq-atlantis-4',
  'faq-atlantis-5',
]

const TESTIMONIAL_IDS = [
  'testimonial-atlantis-1',
  'testimonial-atlantis-2',
  'testimonial-atlantis-3',
]

const INSURANCE_IDS = {
  sunlife: 'insurance-sunlife',
  manulife: 'insurance-manulife',
}

// =============================================================================
// Helper: Portable Text block
// =============================================================================

function textBlock(text: string, style: string = 'normal'): any {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 10),
    style,
    children: [
      {
        _type: 'span',
        _key: Math.random().toString(36).slice(2, 10),
        text,
        marks: [],
      },
    ],
    markDefs: [],
  }
}

// =============================================================================
// Documents
// =============================================================================

const insuranceProviders = [
  {
    _id: INSURANCE_IDS.sunlife,
    _type: 'insuranceProvider',
    name: 'Sun Life Financial',
    website: 'https://www.sunlife.ca',
  },
  {
    _id: INSURANCE_IDS.manulife,
    _type: 'insuranceProvider',
    name: 'Manulife',
    website: 'https://www.manulife.ca',
  },
]

const services = [
  {
    _id: SERVICE_IDS.cosmetic,
    _type: 'service',
    name: 'Cosmetic Dentistry',
    slug: { _type: 'slug', current: 'cosmetic-dentistry' },
    category: 'cosmetic',
    shortDescription:
      'Transform your smile with our comprehensive cosmetic dentistry services including veneers, whitening, and smile makeovers.',
    description: [
      textBlock('Cosmetic Dentistry at Atlantis Dental', 'h2'),
      textBlock(
        'Our cosmetic dentistry services are designed to give you the smile you\'ve always wanted. From professional teeth whitening to porcelain veneers, we use the latest techniques and materials to deliver stunning, natural-looking results.'
      ),
      textBlock(
        'Every treatment plan is customized to your unique needs and goals. During your consultation, we\'ll discuss your options and create a plan that fits your lifestyle and budget.'
      ),
    ],
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: SERVICE_IDS.invisalign,
    _type: 'service',
    name: 'Invisalign',
    slug: { _type: 'slug', current: 'invisalign' },
    category: 'orthodontics',
    shortDescription:
      'Straighten your teeth discreetly with Invisalign clear aligners. We\'re a Diamond Invisalign Provider.',
    description: [
      textBlock('Invisalign Clear Aligners', 'h2'),
      textBlock(
        'As a Diamond Invisalign Provider, Atlantis Dental has the experience and expertise to deliver exceptional results with clear aligner therapy. Our team has treated hundreds of patients with Invisalign.'
      ),
    ],
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: SERVICE_IDS.implants,
    _type: 'service',
    name: 'Dental Implants',
    slug: { _type: 'slug', current: 'dental-implants' },
    category: 'restorative',
    shortDescription:
      'Replace missing teeth with permanent dental implants that look, feel, and function like natural teeth.',
    description: [
      textBlock('Dental Implants', 'h2'),
      textBlock(
        'Dental implants are the gold standard for replacing missing teeth. They provide a permanent, stable foundation for replacement teeth that look, feel, and function like your natural teeth.'
      ),
    ],
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
]

const teamMembers = [
  {
    _id: TEAM_IDS.drKarkanis,
    _type: 'teamMember',
    name: 'Dr. Tom Karkanis',
    slug: { _type: 'slug', current: 'dr-tom-karkanis' },
    role: 'Lead Dentist & Founder',
    roleCategory: 'dentist',
    shortBio:
      'Dr. Karkanis brings over 20 years of experience in cosmetic and restorative dentistry to Atlantis Dental.',
    bio: [
      textBlock(
        'Dr. Tom Karkanis founded Atlantis Dental with a vision of providing exceptional dental care in a comfortable, modern environment. With a PhD in Cellular Physiology from the University of Western Ontario, he brings a unique scientific perspective to dentistry.'
      ),
      textBlock(
        'He is passionate about continuing education and regularly attends advanced training courses to stay at the forefront of dental technology and techniques.'
      ),
    ],
    credentials: [
      'DDS, University of British Columbia',
      'PhD Cellular Physiology, University of Western Ontario',
      'Diamond Invisalign Provider',
      'Fellow, International Congress of Oral Implantologists',
    ],
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: TEAM_IDS.drChen,
    _type: 'teamMember',
    name: 'Dr. Lisa Chen',
    slug: { _type: 'slug', current: 'dr-lisa-chen' },
    role: 'Associate Dentist',
    roleCategory: 'dentist',
    shortBio:
      'Dr. Chen specializes in pediatric and family dentistry, making every patient feel at ease.',
    bio: [
      textBlock(
        'Dr. Lisa Chen joined Atlantis Dental in 2019, bringing her expertise in family and pediatric dentistry. She is known for her gentle approach and ability to make even the most anxious patients feel comfortable.'
      ),
    ],
    credentials: [
      'DMD, University of British Columbia',
      'Certified in Sedation Dentistry',
    ],
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: TEAM_IDS.sarahJones,
    _type: 'teamMember',
    name: 'Sarah Jones',
    slug: { _type: 'slug', current: 'sarah-jones' },
    role: 'Registered Dental Hygienist',
    roleCategory: 'hygienist',
    shortBio:
      'Sarah has been keeping smiles healthy for over 10 years with her thorough and gentle cleanings.',
    bio: [
      textBlock(
        'Sarah is a Registered Dental Hygienist with over a decade of experience. She is passionate about preventive care and patient education, helping patients maintain optimal oral health between visits.'
      ),
    ],
    credentials: [
      'Diploma in Dental Hygiene, Vancouver Community College',
    ],
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
]

const faqs = [
  {
    _id: FAQ_IDS[0],
    _type: 'faq',
    question: 'Do you accept new patients?',
    answer: [
      textBlock(
        'Yes! We are always welcoming new patients. You can book your first appointment online or by calling our office. We\'ll make sure to schedule extra time for your initial visit so we can get to know you and your dental health needs.'
      ),
    ],
    category: 'general',
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: FAQ_IDS[1],
    _type: 'faq',
    question: 'What insurance plans do you accept?',
    answer: [
      textBlock(
        'We accept most major dental insurance plans including Sun Life, Manulife, Great-West Life, and many more. Our team will help you understand your coverage and maximize your benefits.'
      ),
    ],
    category: 'insurance',
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: FAQ_IDS[2],
    _type: 'faq',
    question: 'How often should I visit the dentist?',
    answer: [
      textBlock(
        'We recommend visiting the dentist every 6 months for a routine checkup and cleaning. However, some patients may need more frequent visits depending on their oral health needs.'
      ),
    ],
    category: 'general',
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: FAQ_IDS[3],
    _type: 'faq',
    question: 'Do you offer sedation dentistry?',
    answer: [
      textBlock(
        'Yes, we offer several sedation options for patients who experience dental anxiety. From nitrous oxide (laughing gas) to oral sedation, we\'ll find the right option to keep you comfortable during your treatment.'
      ),
    ],
    category: 'services',
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: FAQ_IDS[4],
    _type: 'faq',
    question: 'What are your payment options?',
    answer: [
      textBlock(
        'We accept cash, credit cards, debit, and e-transfer. We also offer flexible financing through our partnership with Fairstone Financial. Ask our team about interest-free payment plans.'
      ),
    ],
    category: 'insurance',
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
]

const testimonials = [
  {
    _id: TESTIMONIAL_IDS[0],
    _type: 'testimonial',
    patientName: 'Michael R.',
    quote:
      'Dr. Karkanis and his team transformed my smile with Invisalign. The results exceeded my expectations and the process was so much easier than I thought it would be.',
    rating: 5,
    source: 'google',
    service: { _type: 'reference', _ref: SERVICE_IDS.invisalign },
    date: '2025-11-15',
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: TESTIMONIAL_IDS[1],
    _type: 'testimonial',
    patientName: 'Jennifer L.',
    quote:
      'I\'ve been coming to Atlantis Dental for 5 years and I wouldn\'t go anywhere else. The staff is incredibly friendly and professional. Dr. Chen is amazing with my kids!',
    rating: 5,
    source: 'google',
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: TESTIMONIAL_IDS[2],
    _type: 'testimonial',
    patientName: 'David K.',
    quote:
      'After years of avoiding the dentist, I finally found a practice where I feel comfortable. The sedation options made all the difference. Highly recommend!',
    rating: 4,
    source: 'yelp',
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
]

const office = {
  _id: OFFICE_ID,
  _type: 'office',
  name: 'Atlantis Dental Yaletown',
  slug: { _type: 'slug', current: 'atlantis-yaletown' },
  tagline: [{ _key: 'en', value: "Tomorrow's Dentistry — Today!" }],
  shortDescription:
    'Your trusted dental care provider in the heart of Yaletown, Vancouver. Offering comprehensive dental services in a modern, comfortable environment.',
  address: {
    _type: 'address',
    street: '1290 Homer Street',
    suite: 'Suite 200',
    city: 'Vancouver',
    province: 'BC',
    postalCode: 'V6B 2Y5',
    country: 'Canada',
  },
  contactInfo: {
    _type: 'contactInfo',
    phone: '6048990775',
    email: 'yaletown@atlantisdental.ca',
    bookingUrl: 'https://atlantisdental.ca/book',
  },
  socialLinks: {
    _type: 'socialLinks',
    facebook: 'https://facebook.com/atlantisdental',
    instagram: 'https://instagram.com/atlantisdental',
  },
  businessHours: {
    _type: 'businessHours',
    schedule: [
      { _key: 'mon', day: 'monday', isClosed: false, openTime: '08:00', closeTime: '17:00' },
      { _key: 'tue', day: 'tuesday', isClosed: false, openTime: '08:00', closeTime: '17:00' },
      { _key: 'wed', day: 'wednesday', isClosed: false, openTime: '08:00', closeTime: '17:00' },
      { _key: 'thu', day: 'thursday', isClosed: false, openTime: '08:00', closeTime: '19:00' },
      { _key: 'fri', day: 'friday', isClosed: false, openTime: '08:00', closeTime: '16:00' },
      { _key: 'sat', day: 'saturday', isClosed: false, openTime: '09:00', closeTime: '14:00' },
      { _key: 'sun', day: 'sunday', isClosed: true },
    ],
    timezone: 'America/Vancouver',
    holidayNote: 'Closed on statutory holidays',
  },
  insuranceProviders: [
    { _type: 'reference', _ref: INSURANCE_IDS.sunlife, _key: 'ins1' },
    { _type: 'reference', _ref: INSURANCE_IDS.manulife, _key: 'ins2' },
  ],
  mainNavigation: [
    {
      _key: 'nav1',
      _type: 'navItem',
      link: { _type: 'link', label: 'Home', linkType: 'external', externalUrl: '/atlantis-yaletown' },
    },
    {
      _key: 'nav2',
      _type: 'navItem',
      link: { _type: 'link', label: 'Services', linkType: 'external', externalUrl: '/atlantis-yaletown/services' },
      children: [
        {
          _key: 'sub1',
          _type: 'navSubItem',
          link: { _type: 'link', label: 'Cosmetic Dentistry', linkType: 'external', externalUrl: '/atlantis-yaletown/services/cosmetic-dentistry' },
        },
        {
          _key: 'sub2',
          _type: 'navSubItem',
          link: { _type: 'link', label: 'Invisalign', linkType: 'external', externalUrl: '/atlantis-yaletown/services/invisalign' },
        },
        {
          _key: 'sub3',
          _type: 'navSubItem',
          link: { _type: 'link', label: 'Dental Implants', linkType: 'external', externalUrl: '/atlantis-yaletown/services/dental-implants' },
        },
      ],
    },
    {
      _key: 'nav3',
      _type: 'navItem',
      link: { _type: 'link', label: 'About', linkType: 'external', externalUrl: '/atlantis-yaletown/about' },
    },
    {
      _key: 'nav4',
      _type: 'navItem',
      link: { _type: 'link', label: 'Contact', linkType: 'external', externalUrl: '/atlantis-yaletown/contact' },
    },
  ],
  footerNavigation: [
    {
      _key: 'fnav1',
      _type: 'navItem',
      link: { _type: 'link', label: 'Privacy Policy', linkType: 'external', externalUrl: '#' },
    },
    {
      _key: 'fnav2',
      _type: 'navItem',
      link: { _type: 'link', label: 'Terms of Service', linkType: 'external', externalUrl: '#' },
    },
  ],
  newPatientInfo: [
    {
      _key: 'en',
      _type: 'internationalizedArrayPortableTextSimpleValue',
      value: [
        textBlock(
          'Welcome to Atlantis Dental! We look forward to meeting you. Please arrive 15 minutes early for your first appointment to complete paperwork.'
        ),
      ],
    },
  ],
  financingInfo: [
    {
      _key: 'en',
      _type: 'internationalizedArrayPortableTextSimpleValue',
      value: [
        textBlock(
          'We offer flexible financing through Fairstone Financial. Ask about our interest-free payment plans for treatments over $500.'
        ),
      ],
    },
  ],
}

// =============================================================================
// Pages with page builder blocks
// =============================================================================

const homePage = {
  _id: HOME_PAGE_ID,
  _type: 'page',
  title: 'Home',
  slug: { _type: 'slug', current: 'home' },
  pageType: 'home',
  office: { _type: 'reference', _ref: OFFICE_ID },
  language: 'en',
  sections: [
    // 1. Hero
    {
      _key: 'hero1',
      _type: 'heroSection',
      heading: 'Welcome to Atlantis Dental Yaletown',
      subheading:
        'Your trusted dentist in downtown Vancouver. Perfecting smiles since 2005.',
      layout: 'centered',
      ctas: [
        {
          _key: 'cta1',
          _type: 'cta',
          variant: 'primary',
          link: {
            _type: 'link',
            label: 'Book an Appointment',
            linkType: 'external',
            externalUrl: 'https://atlantisdental.ca/book',
          },
        },
        {
          _key: 'cta2',
          _type: 'cta',
          variant: 'outline',
          link: {
            _type: 'link',
            label: 'Our Services',
            linkType: 'external',
            externalUrl: '/atlantis-yaletown/services',
          },
        },
      ],
    },
    // 2. Value Props
    {
      _key: 'values1',
      _type: 'valueProps',
      heading: 'Why Choose Atlantis Dental?',
      layout: 'grid',
      items: [
        {
          _key: 'vp1',
          _type: 'valuePropItem',
          heading: 'Modern Technology',
          description:
            'State-of-the-art equipment including digital X-rays, 3D scanning, and laser dentistry for precise, comfortable treatments.',
        },
        {
          _key: 'vp2',
          _type: 'valuePropItem',
          heading: 'Experienced Team',
          description:
            'Our dentists bring over 40 years of combined experience, with advanced training in cosmetic, restorative, and implant dentistry.',
        },
        {
          _key: 'vp3',
          _type: 'valuePropItem',
          heading: 'Patient Comfort',
          description:
            'From sedation options to a warm, welcoming environment, we make every visit as comfortable as possible.',
        },
      ],
    },
    // 3. Services Grid
    {
      _key: 'svcgrid1',
      _type: 'servicesGrid',
      heading: 'Our Services',
      description: 'Comprehensive dental care for the whole family',
      columns: 3,
      services: [
        { _key: 'sg1', _type: 'reference', _ref: SERVICE_IDS.cosmetic },
        { _key: 'sg2', _type: 'reference', _ref: SERVICE_IDS.invisalign },
        { _key: 'sg3', _type: 'reference', _ref: SERVICE_IDS.implants },
      ],
    },
    // 4. Team Featured
    {
      _key: 'team1',
      _type: 'teamFeatured',
      heading: 'Meet Dr. Tom Karkanis',
      member: { _type: 'reference', _ref: TEAM_IDS.drKarkanis },
      layout: 'photo-left',
      showFullBio: false,
    },
    // 5. Testimonials
    {
      _key: 'test1',
      _type: 'testimonialsSection',
      heading: 'What Our Patients Say',
      layout: 'grid',
      showRatings: true,
      testimonials: [
        { _key: 'ts1', _type: 'reference', _ref: TESTIMONIAL_IDS[0] },
        { _key: 'ts2', _type: 'reference', _ref: TESTIMONIAL_IDS[1] },
        { _key: 'ts3', _type: 'reference', _ref: TESTIMONIAL_IDS[2] },
      ],
    },
    // 6. Smile Gallery
    {
      _key: 'gallery1',
      _type: 'smileGallery',
      heading: 'Smile Transformations',
      description: 'Real results from real patients',
      items: [
        {
          _key: 'gi1',
          _type: 'galleryItem',
          procedure: 'Porcelain Veneers',
          description: 'Complete smile makeover with porcelain veneers',
          consentObtained: true,
          beforeImage: { _type: 'imageWithAlt', alt: 'Before veneers treatment' },
          afterImage: { _type: 'imageWithAlt', alt: 'After veneers treatment' },
        },
        {
          _key: 'gi2',
          _type: 'galleryItem',
          procedure: 'Invisalign',
          description: '12 month clear aligner treatment',
          consentObtained: true,
          beforeImage: { _type: 'imageWithAlt', alt: 'Before Invisalign' },
          afterImage: { _type: 'imageWithAlt', alt: 'After Invisalign' },
        },
        {
          _key: 'gi3',
          _type: 'galleryItem',
          procedure: 'Dental Implant',
          description: 'Single tooth replacement with implant',
          consentObtained: true,
          beforeImage: { _type: 'imageWithAlt', alt: 'Before implant' },
          afterImage: { _type: 'imageWithAlt', alt: 'After implant' },
        },
        {
          // consentObtained: false — frontend HIPAA filter excludes this item
          _key: 'gi4',
          _type: 'galleryItem',
          procedure: 'Teeth Whitening',
          description: 'Professional whitening — consent pending',
          consentObtained: false,
          beforeImage: { _type: 'imageWithAlt', alt: 'Before whitening' },
          afterImage: { _type: 'imageWithAlt', alt: 'After whitening' },
        },
      ],
    },
    // 7. Image with Text
    {
      _key: 'iwt1',
      _type: 'imageWithTextSection',
      heading: 'Your Comfort Is Our Priority',
      content: [
        textBlock(
          'At Atlantis Dental, we understand that visiting the dentist can be stressful. That\'s why we\'ve created a warm, welcoming environment designed to put you at ease from the moment you walk through our doors.'
        ),
        textBlock(
          'Our team takes the time to listen to your concerns, explain your treatment options, and ensure you feel confident in your care plan.'
        ),
      ],
      imagePosition: 'right',
      ctas: [
        {
          _key: 'iwtcta1',
          _type: 'cta',
          variant: 'outline',
          link: {
            _type: 'link',
            label: 'Meet Our Team',
            linkType: 'external',
            externalUrl: '/atlantis-yaletown/about',
          },
        },
      ],
    },
    // 8. FAQ
    {
      _key: 'faq1',
      _type: 'faqSection',
      heading: 'Frequently Asked Questions',
      layout: 'accordion',
      faqs: FAQ_IDS.map((id, i) => ({
        _key: `fq${i}`,
        _type: 'reference',
        _ref: id,
      })),
    },
    // 9. New Patient
    {
      _key: 'np1',
      _type: 'newPatientSection',
      heading: 'New Patients Welcome',
      description: [
        textBlock('Getting started is easy — just three simple steps'),
      ],
      steps: [
        {
          _key: 'step1',
          _type: 'object',
          title: 'Book Online',
          description:
            'Schedule your first appointment through our online booking system or give us a call.',
        },
        {
          _key: 'step2',
          _type: 'object',
          title: 'Meet Your Team',
          description:
            'We\'ll take the time to get to know you, review your dental history, and discuss your goals.',
        },
        {
          _key: 'step3',
          _type: 'object',
          title: 'Your Custom Plan',
          description:
            'We\'ll create a personalized treatment plan tailored to your needs and budget.',
        },
      ],
      showInsurance: true,
      cta: {
        _type: 'cta',
        variant: 'primary',
        link: {
          _type: 'link',
          label: 'Book Your First Visit',
          linkType: 'external',
          externalUrl: 'https://atlantisdental.ca/book',
        },
      },
    },
    // 10. CTA Block
    {
      _key: 'cta1',
      _type: 'ctaBlock',
      heading: 'Ready to Transform Your Smile?',
      description:
        'Book a consultation today and take the first step toward the smile you deserve.',
      layout: 'banner',
      ctas: [
        {
          _key: 'ctab1',
          _type: 'cta',
          variant: 'primary',
          link: {
            _type: 'link',
            label: 'Book Now',
            linkType: 'external',
            externalUrl: 'https://atlantisdental.ca/book',
          },
        },
        {
          _key: 'ctab2',
          _type: 'cta',
          variant: 'outline',
          link: {
            _type: 'link',
            label: 'Call (604) 899-0775',
            linkType: 'external',
            externalUrl: 'tel:6048990775',
          },
        },
      ],
    },
    // 11. Financing
    {
      _key: 'fin1',
      _type: 'financingSection',
      heading: 'Flexible Payment Options',
      description: [
        textBlock(
          'We believe everyone deserves a healthy, beautiful smile. That\'s why we offer flexible financing options to make dental care accessible.'
        ),
        textBlock(
          'We accept most major insurance plans and offer interest-free payment plans through Fairstone Financial for treatments over $500.'
        ),
      ],
      financingOptions: [
        {
          _key: 'fo1',
          _type: 'object',
          name: 'Fairstone Financial',
          description: 'Interest-free payment plans for treatments over $500. Apply in-office.',
          url: 'https://www.fairstone.ca',
        },
        {
          _key: 'fo2',
          _type: 'object',
          name: 'Direct Insurance Billing',
          description: 'We bill your insurance directly so you only pay the difference.',
        },
      ],
      cta: {
        _type: 'cta',
        variant: 'secondary',
        link: {
          _type: 'link',
          label: 'Learn About Financing',
          linkType: 'external',
          externalUrl: '#',
        },
      },
    },
    // 12. Contact Block
    {
      _key: 'contact1',
      _type: 'contactBlock',
      heading: 'Get in Touch',
      description: 'We\'d love to hear from you. Reach out to book an appointment or ask a question.',
      showContactForm: true,
      showMap: true,
      showHours: true,
      layout: 'side-by-side',
    },
  ],
}

const aboutPage = {
  _id: ABOUT_PAGE_ID,
  _type: 'page',
  title: 'About Us',
  slug: { _type: 'slug', current: 'about' },
  pageType: 'general',
  office: { _type: 'reference', _ref: OFFICE_ID },
  language: 'en',
  sections: [
    {
      _key: 'hero1',
      _type: 'heroSection',
      heading: 'About Atlantis Dental',
      subheading: 'Serving the Yaletown community since 2005',
      layout: 'centered',
    },
    {
      _key: 'rt1',
      _type: 'richTextSection',
      heading: 'Our Story',
      content: [
        textBlock(
          'Atlantis Dental was founded in 2005 by Dr. Tom Karkanis with a simple mission: to provide exceptional dental care in a comfortable, modern environment. What started as a small practice has grown into one of Yaletown\'s most trusted dental clinics.'
        ),
        textBlock(
          'Today, our team of experienced dentists and hygienists serves thousands of patients across Vancouver, offering everything from routine cleanings to complex cosmetic and restorative procedures.'
        ),
      ],
      layout: 'full',
    },
    // Video Embed
    {
      _key: 'video1',
      _type: 'videoEmbed',
      heading: 'Take a Tour of Our Office',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder — replace with real office tour
      caption: 'Step inside Atlantis Dental Yaletown and see our modern facilities.',
    },
    {
      _key: 'team1',
      _type: 'teamGrid',
      heading: 'Meet Our Team',
      description: 'Dedicated professionals committed to your dental health',
      columns: 3,
      members: [
        { _key: 'tm1', _type: 'reference', _ref: TEAM_IDS.drKarkanis },
        { _key: 'tm2', _type: 'reference', _ref: TEAM_IDS.drChen },
        { _key: 'tm3', _type: 'reference', _ref: TEAM_IDS.sarahJones },
      ],
    },
    {
      _key: 'tech1',
      _type: 'technologyShowcase',
      heading: 'Our Technology',
      description: 'Investing in the latest dental technology for better outcomes',
      technologies: [
        {
          _key: 't1',
          _type: 'technologyItem',
          name: 'Digital X-Rays',
          description: '90% less radiation than traditional X-rays with instant, high-resolution images.',
        },
        {
          _key: 't2',
          _type: 'technologyItem',
          name: '3D Cone Beam Scanner',
          description: 'Detailed 3D imaging for precise implant placement and treatment planning.',
        },
        {
          _key: 't3',
          _type: 'technologyItem',
          name: 'LightWalker Laser',
          description: 'Advanced laser technology for minimally invasive soft tissue procedures.',
        },
      ],
    },
    {
      _key: 'vp1',
      _type: 'valueProps',
      heading: 'What Makes Us Different',
      layout: 'vertical',
      items: [
        {
          _key: 'v1',
          _type: 'valuePropItem',
          heading: 'Personalized Care',
          description: 'Every treatment plan is customized to your unique needs, goals, and budget.',
        },
        {
          _key: 'v2',
          _type: 'valuePropItem',
          heading: 'Continuing Education',
          description: 'Our team regularly attends advanced training to stay at the forefront of dentistry.',
        },
        {
          _key: 'v3',
          _type: 'valuePropItem',
          heading: 'Community Focus',
          description: 'We\'re proud to be part of the Yaletown community and give back through local initiatives.',
        },
      ],
    },
  ],
}

const servicesPage = {
  _id: SERVICES_PAGE_ID,
  _type: 'page',
  title: 'Our Services',
  slug: { _type: 'slug', current: 'services' },
  pageType: 'general',
  office: { _type: 'reference', _ref: OFFICE_ID },
  language: 'en',
  sections: [
    {
      _key: 'hero1',
      _type: 'heroSection',
      heading: 'Our Dental Services',
      subheading: 'Comprehensive care for every smile',
      layout: 'centered',
    },
    {
      _key: 'svcgrid1',
      _type: 'servicesGrid',
      heading: 'Featured Services',
      columns: 3,
      services: [
        { _key: 'sg1', _type: 'reference', _ref: SERVICE_IDS.cosmetic },
        { _key: 'sg2', _type: 'reference', _ref: SERVICE_IDS.invisalign },
        { _key: 'sg3', _type: 'reference', _ref: SERVICE_IDS.implants },
      ],
    },
    {
      _key: 'svclist1',
      _type: 'servicesList',
      heading: 'All Services',
      showDescriptions: true,
      services: [
        { _key: 'sl1', _type: 'reference', _ref: SERVICE_IDS.cosmetic },
        { _key: 'sl2', _type: 'reference', _ref: SERVICE_IDS.invisalign },
        { _key: 'sl3', _type: 'reference', _ref: SERVICE_IDS.implants },
      ],
    },
    {
      _key: 'contact1',
      _type: 'contactBlock',
      heading: 'Ready to Get Started?',
      showContactForm: true,
      showMap: true,
      showHours: true,
    },
  ],
}

// =============================================================================
// Seed execution
// =============================================================================

async function seed() {
  console.log('🦷 Seeding 123dentist demo content...\n')

  const allDocs = [
    ...insuranceProviders,
    ...services,
    ...teamMembers,
    ...faqs,
    ...testimonials,
    office,
    homePage,
    aboutPage,
    servicesPage,
  ]

  const transaction = client.transaction()

  for (const doc of allDocs) {
    transaction.createOrReplace(doc)
  }

  console.log(`Creating ${allDocs.length} documents...`)
  const result = await transaction.commit()
  console.log(`✅ Transaction committed: ${result.transactionId}`)
  console.log('')
  console.log('Documents created:')
  console.log(`  - 1 office (Atlantis Dental Yaletown)`)
  console.log(`  - 3 pages (home, about, services)`)
  console.log(`  - 3 services`)
  console.log(`  - 3 team members`)
  console.log(`  - 5 FAQs`)
  console.log(`  - 3 testimonials`)
  console.log(`  - 2 insurance providers`)
  console.log('')
  console.log('Page builder blocks used (17/17 block types):')
  console.log('  Home: heroSection, valueProps, servicesGrid, teamFeatured,')
  console.log('         testimonialsSection, smileGallery, imageWithTextSection,')
  console.log('         faqSection, newPatientSection, ctaBlock,')
  console.log('         financingSection, contactBlock (12)')
  console.log('  About: heroSection, richTextSection, videoEmbed,')
  console.log('         teamGrid, technologyShowcase, valueProps (6)')
  console.log('  Services: heroSection, servicesGrid, servicesList, contactBlock (4)')
  console.log('')
  console.log(`🌐 View at: /atlantis-yaletown`)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
