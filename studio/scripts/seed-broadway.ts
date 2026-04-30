/**
 * Demo content seed script for Broadway Smiles
 *
 * Creates a sample office (Broadway Smiles) with:
 * - Full office profile (address, contact, hours, nav, insurance)
 * - Home page with 11 page builder blocks
 * - About page with team + value props
 * - Services page with services grid + list + contact
 * - 3 services, 3 team members, 4 FAQs, 3 testimonials
 *
 * Usage: npx tsx scripts/seed-broadway.ts
 *
 * VALIDATION AUDIT:
 * - Every required field is set
 * - Every enum value matches schema options exactly
 * - Every link uses linkType:'internal' with internalRef OR linkType:'external' with valid URL
 * - Every i18n field has correct _type (internationalizedArray*Value)
 * - businessHours uses 'hours' array with _type:'dayHours'
 * - page.pageType is set on every page
 * - Only expected validation warnings: imageWithAlt fields without uploaded assets
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

const OFFICE_ID = 'office-broadway-smiles'
const HOME_PAGE_ID = 'page-broadway-home'
const ABOUT_PAGE_ID = 'page-broadway-about'
const SERVICES_PAGE_ID = 'page-broadway-services'

const SERVICE_IDS = {
  familyDentistry: 'service-broadway-family',
  teethWhitening: 'service-broadway-whitening',
  dentalCrowns: 'service-broadway-crowns',
}

const TEAM_IDS = {
  drPatel: 'team-broadway-patel',
  drNguyen: 'team-broadway-nguyen',
  amandaLee: 'team-broadway-lee',
}

const FAQ_IDS = [
  'faq-broadway-1',
  'faq-broadway-2',
  'faq-broadway-3',
  'faq-broadway-4',
]

const TESTIMONIAL_IDS = [
  'testimonial-broadway-1',
  'testimonial-broadway-2',
  'testimonial-broadway-3',
]

// Reuse existing insurance providers (shared corporate docs)
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

const services = [
  {
    _id: SERVICE_IDS.familyDentistry,
    _type: 'service',
    name: 'Family Dentistry',
    slug: { _type: 'slug', current: 'family-dentistry' },
    category: 'general', // valid enum: general|cosmetic|orthodontics|surgery|pediatric|periodontics|endodontics|prosthodontics|emergency|preventive
    shortDescription:
      'Comprehensive dental care for the whole family, from toddlers to grandparents. Cleanings, exams, fillings, and preventive care.',
    description: [
      textBlock('Family Dentistry at Broadway Smiles', 'h2'),
      textBlock(
        'At Broadway Smiles, we believe dental care should be a family affair. Our team is experienced in treating patients of all ages, from first dental visits for toddlers to complex restorative work for seniors.'
      ),
      textBlock(
        'We focus on preventive care and education, helping your family build healthy habits that last a lifetime. Regular checkups, professional cleanings, and early intervention are the foundation of our approach.'
      ),
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Family Dentistry — Broadway Smiles Vancouver',
      metaDescription:
        'Comprehensive family dental care at Broadway Smiles. Cleanings, exams, fillings, and preventive care for patients of all ages on the Broadway corridor.',
    },
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: SERVICE_IDS.teethWhitening,
    _type: 'service',
    name: 'Teeth Whitening',
    slug: { _type: 'slug', current: 'teeth-whitening' },
    category: 'cosmetic',
    shortDescription:
      'Professional in-office and take-home whitening treatments for a brighter, more confident smile.',
    description: [
      textBlock('Professional Teeth Whitening', 'h2'),
      textBlock(
        'Our professional whitening treatments deliver dramatic results that over-the-counter products simply cannot match. We offer both in-office Zoom whitening for immediate results and custom take-home trays for gradual brightening.'
      ),
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Professional Teeth Whitening — Broadway Smiles Vancouver',
      metaDescription:
        'Get a brighter smile with professional teeth whitening at Broadway Smiles. In-office Zoom whitening and custom take-home trays available in Vancouver.',
    },
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: SERVICE_IDS.dentalCrowns,
    _type: 'service',
    name: 'Dental Crowns & Bridges',
    slug: { _type: 'slug', current: 'dental-crowns' },
    category: 'prosthodontics', // valid enum
    shortDescription:
      'Restore damaged or missing teeth with custom-crafted crowns and bridges that blend seamlessly with your natural smile.',
    description: [
      textBlock('Dental Crowns & Bridges', 'h2'),
      textBlock(
        'When teeth are damaged, decayed, or missing, crowns and bridges offer a reliable, long-lasting solution. Our CEREC technology allows us to create same-day crowns right in our office — no temporary crowns or second visits needed.'
      ),
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Dental Crowns & Bridges — Broadway Smiles Vancouver',
      metaDescription:
        'Restore damaged or missing teeth with custom crowns and bridges at Broadway Smiles. Same-day CEREC crowns available in Vancouver.',
    },
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
]

const teamMembers = [
  {
    _id: TEAM_IDS.drPatel,
    _type: 'teamMember',
    name: 'Dr. Priya Patel',
    slug: { _type: 'slug', current: 'dr-priya-patel' },
    role: 'Lead Dentist & Owner',
    roleCategory: 'dentist', // valid enum: dentist|hygienist|assistant|manager|receptionist|specialist|other
    shortBio:
      'Dr. Patel has been serving the Broadway corridor community for over 15 years with a focus on family and cosmetic dentistry.',
    bio: [
      textBlock(
        'Dr. Priya Patel founded Broadway Smiles with a simple mission: to provide exceptional dental care in a warm, welcoming environment. After graduating from UBC Dentistry, she completed advanced training in cosmetic procedures and has been transforming smiles on Broadway ever since.'
      ),
      textBlock(
        'Outside the office, Dr. Patel volunteers with dental outreach programs in the Downtown Eastside and coaches her daughter\'s soccer team.'
      ),
    ],
    credentials: [
      'DMD, University of British Columbia',
      'Fellow, Academy of General Dentistry',
      'Certified CEREC Provider',
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Dr. Priya Patel — Lead Dentist at Broadway Smiles',
      metaDescription:
        'Meet Dr. Priya Patel, owner of Broadway Smiles. Over 15 years of experience in family and cosmetic dentistry on the Broadway corridor in Vancouver.',
    },
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: TEAM_IDS.drNguyen,
    _type: 'teamMember',
    name: 'Dr. Kevin Nguyen',
    slug: { _type: 'slug', current: 'dr-kevin-nguyen' },
    role: 'Associate Dentist',
    roleCategory: 'dentist',
    shortBio:
      'Dr. Nguyen specializes in restorative dentistry and is known for his calm, reassuring chairside manner.',
    bio: [
      textBlock(
        'Dr. Kevin Nguyen joined Broadway Smiles in 2021, bringing expertise in restorative and emergency dentistry. He is passionate about using the latest technology to deliver comfortable, efficient treatments.'
      ),
    ],
    credentials: [
      'DDS, University of Toronto',
      'Member, Canadian Dental Association',
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Dr. Kevin Nguyen — Associate Dentist at Broadway Smiles',
      metaDescription:
        'Meet Dr. Kevin Nguyen, associate dentist at Broadway Smiles. Specializing in restorative and emergency dentistry with a calm, reassuring approach.',
    },
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: TEAM_IDS.amandaLee,
    _type: 'teamMember',
    name: 'Amanda Lee',
    slug: { _type: 'slug', current: 'amanda-lee' },
    role: 'Registered Dental Hygienist',
    roleCategory: 'hygienist',
    shortBio:
      'Amanda brings 8 years of experience and a gentle touch to every cleaning. Patients love her thoroughness and warmth.',
    bio: [
      textBlock(
        'Amanda graduated from Vancouver Community College\'s dental hygiene program and has been with Broadway Smiles since 2019. She is passionate about periodontal health and takes the time to educate every patient on proper home care techniques.'
      ),
    ],
    credentials: [
      'Diploma in Dental Hygiene, Vancouver Community College',
      'Certified in Local Anesthesia',
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Amanda Lee — Dental Hygienist at Broadway Smiles',
      metaDescription:
        'Meet Amanda Lee, registered dental hygienist at Broadway Smiles. 8 years of experience providing gentle, thorough dental cleanings in Vancouver.',
    },
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
]

const faqs = [
  {
    _id: FAQ_IDS[0],
    _type: 'faq',
    question: 'Are you accepting new patients?',
    answer: [
      textBlock(
        'Absolutely! We welcome new patients of all ages. You can book your first appointment online or by calling us at (604) 872-3455. We recommend arriving 10 minutes early to complete your intake forms.'
      ),
    ],
    category: 'new-patients', // valid enum: general|insurance|procedures|new-patients|emergency|post-treatment
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: FAQ_IDS[1],
    _type: 'faq',
    question: 'What should I do in a dental emergency?',
    answer: [
      textBlock(
        'Call us immediately at (604) 872-3455. We reserve time each day for emergency appointments. If you experience severe pain, swelling, or a knocked-out tooth outside office hours, go to your nearest emergency room.'
      ),
    ],
    category: 'emergency',
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: FAQ_IDS[2],
    _type: 'faq',
    question: 'Do you offer same-day crowns?',
    answer: [
      textBlock(
        'Yes! Our CEREC technology allows us to design, mill, and place a custom ceramic crown in a single visit. No messy impressions, no temporary crowns, and no second appointment needed.'
      ),
    ],
    category: 'procedures',
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: FAQ_IDS[3],
    _type: 'faq',
    question: 'Which insurance plans do you accept?',
    answer: [
      textBlock(
        'We accept all major Canadian dental insurance plans and submit claims electronically for faster reimbursement. Our front desk team will verify your coverage before treatment so there are no surprises.'
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
    patientName: 'Sarah M.',
    quote:
      'Dr. Patel and her team are wonderful. My whole family comes here — even my 4-year-old looks forward to his dental visits! The office is modern, clean, and the staff is incredibly friendly.',
    rating: 5, // valid: 1-5
    source: 'google', // valid enum: google|facebook|yelp|ratemds|direct|other
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: TESTIMONIAL_IDS[1],
    _type: 'testimonial',
    patientName: 'James T.',
    quote:
      'I needed a crown and was dreading two appointments. Dr. Nguyen did the whole thing in one visit with their CEREC machine. Painless and the crown looks perfect. Highly recommend!',
    rating: 5,
    source: 'google',
    service: { _type: 'reference', _ref: SERVICE_IDS.dentalCrowns },
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: TESTIMONIAL_IDS[2],
    _type: 'testimonial',
    patientName: 'Linda W.',
    quote:
      'I got my teeth whitened here and the results were amazing. Three shades brighter in one session! The take-home trays they gave me help maintain the results too.',
    rating: 4,
    source: 'yelp',
    service: { _type: 'reference', _ref: SERVICE_IDS.teethWhitening },
    date: '2025-12-03',
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
]

// =============================================================================
// Office document
// =============================================================================

const office = {
  _id: OFFICE_ID,
  _type: 'office',
  name: 'Broadway Smiles',
  slug: { _type: 'slug', current: 'broadway-smiles' },
  tagline: [{ _key: 'en', _type: 'internationalizedArrayStringValue', value: 'Your Neighbourhood Dental Home' }],
  description: [
    {
      _key: 'en',
      _type: 'internationalizedArrayTextValue',
      value: 'Broadway Smiles is a family-friendly dental practice on the Broadway corridor in Vancouver. We provide comprehensive dental care in a modern, comfortable environment — from routine cleanings to same-day crowns.',
    },
  ],
  // address: street(req), suite, city(req), province(req, enum), postalCode(req, regex)
  address: {
    _type: 'address',
    street: '2578 West Broadway',
    suite: 'Unit 105',
    city: 'Vancouver',
    province: 'BC', // valid enum: AB|BC|MB|NB|NL|NS|ON|PE|QC|SK
    postalCode: 'V6K 2E8', // valid Canadian postal code format
  },
  // contactInfo: phone(req), email(regex), fax, emergencyPhone
  contactInfo: {
    _type: 'contactInfo',
    phone: '6048723455',
    email: 'info@broadwaysmiles.ca',
  },
  socialLinks: {
    _type: 'socialLinks',
    facebook: 'https://facebook.com/broadwaysmiles',
    instagram: 'https://instagram.com/broadwaysmiles',
    googleBusiness: 'https://g.page/broadwaysmiles',
  },
  // businessHours: hours(array of dayHours), holidayNote
  // dayHours: day(req, enum), isClosed(bool), openTime(TIME_SLOTS), closeTime(TIME_SLOTS)
  businessHours: {
    _type: 'businessHours',
    hours: [
      { _key: 'mon', _type: 'dayHours', day: 'monday', isClosed: false, openTime: '09:00', closeTime: '18:00' },
      { _key: 'tue', _type: 'dayHours', day: 'tuesday', isClosed: false, openTime: '09:00', closeTime: '18:00' },
      { _key: 'wed', _type: 'dayHours', day: 'wednesday', isClosed: false, openTime: '09:00', closeTime: '18:00' },
      { _key: 'thu', _type: 'dayHours', day: 'thursday', isClosed: false, openTime: '09:00', closeTime: '20:00' },
      { _key: 'fri', _type: 'dayHours', day: 'friday', isClosed: false, openTime: '09:00', closeTime: '17:00' },
      { _key: 'sat', _type: 'dayHours', day: 'saturday', isClosed: false, openTime: '09:00', closeTime: '15:00' },
      { _key: 'sun', _type: 'dayHours', day: 'sunday', isClosed: true },
    ],
    holidayNote: 'Closed on statutory holidays. Emergency line available.',
  },
  insuranceProviders: [
    { _type: 'reference', _ref: INSURANCE_IDS.sunlife, _key: 'ins1' },
    { _type: 'reference', _ref: INSURANCE_IDS.manulife, _key: 'ins2' },
  ],
  // navItem: link(link, req), children(navSubItem[])
  // link: label(str, req), linkType(str, req, 'internal'|'external'), internalRef/externalUrl
  mainNavigation: [
    {
      _key: 'nav1',
      _type: 'navItem',
      link: { _type: 'link', label: 'Home', linkType: 'internal', internalRef: { _type: 'reference', _ref: HOME_PAGE_ID } },
    },
    {
      _key: 'nav2',
      _type: 'navItem',
      link: { _type: 'link', label: 'Services', linkType: 'internal', internalRef: { _type: 'reference', _ref: SERVICES_PAGE_ID } },
      children: [
        {
          _key: 'sub1',
          _type: 'navSubItem',
          link: { _type: 'link', label: 'Family Dentistry', linkType: 'internal', internalRef: { _type: 'reference', _ref: SERVICE_IDS.familyDentistry } },
        },
        {
          _key: 'sub2',
          _type: 'navSubItem',
          link: { _type: 'link', label: 'Teeth Whitening', linkType: 'internal', internalRef: { _type: 'reference', _ref: SERVICE_IDS.teethWhitening } },
        },
        {
          _key: 'sub3',
          _type: 'navSubItem',
          link: { _type: 'link', label: 'Crowns & Bridges', linkType: 'internal', internalRef: { _type: 'reference', _ref: SERVICE_IDS.dentalCrowns } },
        },
      ],
    },
    {
      _key: 'nav3',
      _type: 'navItem',
      link: { _type: 'link', label: 'About', linkType: 'internal', internalRef: { _type: 'reference', _ref: ABOUT_PAGE_ID } },
    },
    {
      _key: 'nav4',
      _type: 'navItem',
      link: { _type: 'link', label: 'Contact', linkType: 'external', externalUrl: 'https://broadway-smiles.123dentist.com/contact' },
    },
  ],
  footerNavigation: [
    {
      _key: 'fnav1',
      _type: 'navItem',
      link: { _type: 'link', label: 'Privacy Policy', linkType: 'external', externalUrl: 'https://broadway-smiles.123dentist.com/privacy' },
    },
    {
      _key: 'fnav2',
      _type: 'navItem',
      link: { _type: 'link', label: 'Accessibility', linkType: 'external', externalUrl: 'https://broadway-smiles.123dentist.com/accessibility' },
    },
  ],
  newPatientInfo: [
    {
      _key: 'en',
      _type: 'internationalizedArrayPortableTextSimpleValue',
      value: [
        textBlock(
          'Welcome to Broadway Smiles! We look forward to meeting you. Please arrive 10 minutes early for your first visit to complete intake forms. Bring your insurance card and a list of any medications you take.'
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
          'We offer flexible payment plans through Medicard and accept all major credit cards. Ask about our interest-free financing for treatments over $300.'
        ),
      ],
    },
  ],
  seo: {
    _type: 'seo',
    metaTitle: 'Broadway Smiles — Family Dentist on Broadway, Vancouver',
    metaDescription:
      'Broadway Smiles is your neighbourhood family dentist on the Broadway corridor in Vancouver. Comprehensive dental care, teeth whitening, crowns, and more.',
    noIndex: false,
  },
}

// =============================================================================
// Pages with page builder sections
// =============================================================================

// HOME PAGE — pageType: 'home' (required enum)
const homePage = {
  _id: HOME_PAGE_ID,
  _type: 'page',
  title: 'Home',
  slug: { _type: 'slug', current: 'home' },
  pageType: 'home', // REQUIRED — valid enum: home|about|services|service-detail|team|contact|new-patients|blog|testimonials|gallery|landing|generic
  office: { _type: 'reference', _ref: OFFICE_ID },
  language: 'en',
  seo: {
    _type: 'seo',
    metaTitle: 'Broadway Smiles — Your Family Dentist in Vancouver',
    metaDescription:
      'Welcome to Broadway Smiles, your trusted family dentist on the Broadway corridor. Offering teeth whitening, crowns, family dentistry, and preventive care.',
    noIndex: false,
  },
  sections: [
    // 1. Hero — heading(req), subheading, backgroundImage, ctas, layout(full|split-right|split-left|centered)
    // NOTE: Using 'split-right' layout (vs Atlantis 'full') for visual differentiation
    {
      _key: 'hero1',
      _type: 'heroSection',
      heading: 'Your Neighbourhood Dental Home',
      subheading: 'Comprehensive family dentistry on the Broadway corridor. Modern technology, gentle care, and smiles that last.',
      layout: 'split-right',
      ctas: [
        {
          _key: 'cta1',
          _type: 'cta',
          variant: 'primary', // valid enum: primary|secondary|outline|text
          link: {
            _type: 'link',
            label: 'Book an Appointment',
            linkType: 'external',
            externalUrl: 'https://broadway-smiles.123dentist.com/book',
          },
        },
        {
          _key: 'cta2',
          _type: 'cta',
          variant: 'outline',
          link: {
            _type: 'link',
            label: 'Our Services',
            linkType: 'internal',
            internalRef: { _type: 'reference', _ref: SERVICES_PAGE_ID },
          },
        },
      ],
    },
    // 2. Value Props — heading, items[](heading req, description, icon), layout(grid|horizontal|vertical)
    // NOTE: Using 'horizontal' layout (vs Atlantis 'grid') for visual differentiation
    {
      _key: 'values1',
      _type: 'valueProps',
      heading: 'Why Families Choose Broadway Smiles',
      layout: 'horizontal',
      items: [
        {
          _key: 'vp1',
          _type: 'valuePropItem',
          heading: 'Same-Day Crowns',
          description: 'CEREC technology means no temporary crowns and no second visits. Walk in, walk out with a permanent crown.',
        },
        {
          _key: 'vp2',
          _type: 'valuePropItem',
          heading: 'All Ages Welcome',
          description: 'From first teeth to dentures, our team treats patients at every stage of life with personalized care.',
        },
        {
          _key: 'vp3',
          _type: 'valuePropItem',
          heading: 'Evening & Saturday Hours',
          description: 'Open late on Thursdays and Saturday mornings so you never have to miss work or school.',
        },
        {
          _key: 'vp4',
          _type: 'valuePropItem',
          heading: 'Direct Insurance Billing',
          description: 'We handle the paperwork. Electronic claims submitted same-day for faster reimbursement.',
        },
      ],
    },
    // 3. Services Grid — heading, description, services[](refs, req min 1), columns(2|3|4)
    {
      _key: 'sg1',
      _type: 'servicesGrid',
      heading: 'Our Services',
      description: 'Comprehensive dental care under one roof.',
      columns: 3,
      services: [
        { _type: 'reference', _ref: SERVICE_IDS.familyDentistry, _key: 'sg-s1' },
        { _type: 'reference', _ref: SERVICE_IDS.teethWhitening, _key: 'sg-s2' },
        { _type: 'reference', _ref: SERVICE_IDS.dentalCrowns, _key: 'sg-s3' },
      ],
    },
    // 4. Team Featured — heading, member(ref, req), layout(photo-left|photo-right|centered), showFullBio
    // NOTE: Using 'centered' layout (vs Atlantis 'photo-left') for visual differentiation
    {
      _key: 'tf1',
      _type: 'teamFeatured',
      heading: 'Meet Dr. Patel',
      member: { _type: 'reference', _ref: TEAM_IDS.drPatel },
      layout: 'centered',
      showFullBio: true,
    },
    // 5. Testimonials — heading, testimonials[](refs, req min 1), layout(carousel|grid|featured), showRatings
    // NOTE: Using 'featured' layout (vs Atlantis 'carousel') for visual differentiation
    {
      _key: 'test1',
      _type: 'testimonialsSection',
      heading: 'What Our Patients Say',
      layout: 'featured',
      showRatings: true,
      testimonials: [
        { _type: 'reference', _ref: TESTIMONIAL_IDS[0], _key: 'ts-t1' },
        { _type: 'reference', _ref: TESTIMONIAL_IDS[1], _key: 'ts-t2' },
        { _type: 'reference', _ref: TESTIMONIAL_IDS[2], _key: 'ts-t3' },
      ],
    },
    // 6. FAQ — heading, faqs[](refs, req min 1), layout(accordion|two-column|list)
    // NOTE: Using 'two-column' layout (vs Atlantis 'accordion') for visual differentiation
    {
      _key: 'faq1',
      _type: 'faqSection',
      heading: 'Frequently Asked Questions',
      layout: 'two-column',
      faqs: [
        { _type: 'reference', _ref: FAQ_IDS[0], _key: 'fq-f1' },
        { _type: 'reference', _ref: FAQ_IDS[1], _key: 'fq-f2' },
        { _type: 'reference', _ref: FAQ_IDS[2], _key: 'fq-f3' },
        { _type: 'reference', _ref: FAQ_IDS[3], _key: 'fq-f4' },
      ],
    },
    // 7. New Patient Section — heading, description(PT), steps[](title req, description, icon), cta, showInsurance
    {
      _key: 'np1',
      _type: 'newPatientSection',
      heading: 'New Patients Welcome',
      description: [
        textBlock('Getting started at Broadway Smiles is easy.'),
      ],
      steps: [
        {
          _key: 'step1',
          _type: 'object',
          title: 'Book Online or Call',
          description: 'Schedule your first visit online or call us at (604) 872-3455.',
        },
        {
          _key: 'step2',
          _type: 'object',
          title: 'Comprehensive Exam',
          description: 'We take the time to understand your dental history, concerns, and goals.',
        },
        {
          _key: 'step3',
          _type: 'object',
          title: 'Your Care Plan',
          description: 'We create a personalized treatment plan with clear pricing — no surprises.',
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
          externalUrl: 'https://broadway-smiles.123dentist.com/book',
        },
      },
    },
    // 8. CTA Block — heading(req), description, ctas[](req min 1 max 3), backgroundImage, layout(banner|card|inline)
    // NOTE: Using 'card' layout (vs Atlantis 'banner') for visual differentiation
    {
      _key: 'ctab1',
      _type: 'ctaBlock',
      heading: 'Ready for a Brighter Smile?',
      description: 'Book your appointment today and experience the Broadway Smiles difference.',
      layout: 'card',
      ctas: [
        {
          _key: 'ctab-c1',
          _type: 'cta',
          variant: 'primary',
          link: {
            _type: 'link',
            label: 'Book Now',
            linkType: 'external',
            externalUrl: 'https://broadway-smiles.123dentist.com/book',
          },
        },
        {
          _key: 'ctab-c2',
          _type: 'cta',
          variant: 'outline',
          link: {
            _type: 'link',
            label: 'Call (604) 872-3455',
            linkType: 'external',
            externalUrl: 'https://broadway-smiles.123dentist.com/contact',
          },
        },
      ],
    },
    // 9. Financing — heading, description(PT), financingOptions[](name req, description, logo, url), cta
    {
      _key: 'fin1',
      _type: 'financingSection',
      heading: 'Affordable Dental Care',
      description: [
        textBlock(
          'We believe cost should never be a barrier to dental health. We offer multiple payment options to fit your budget.'
        ),
      ],
      financingOptions: [
        {
          _key: 'fo1',
          _type: 'object',
          name: 'Medicard Financing',
          description: 'Interest-free payment plans for treatments over $300. Apply in-office or online.',
          url: 'https://www.medicard.com',
        },
        {
          _key: 'fo2',
          _type: 'object',
          name: 'Direct Insurance Billing',
          description: 'We submit claims electronically to all major insurance providers for faster reimbursement.',
        },
      ],
      cta: {
        _type: 'cta',
        variant: 'secondary',
        link: {
          _type: 'link',
          label: 'Learn About Payment Options',
          linkType: 'external',
          externalUrl: 'https://www.medicard.com',
        },
      },
    },
    // 10. Image With Text — heading, content(PT, req), image(req), imagePosition(left|right), ctas
    // NOTE: Extra block not on Atlantis home — shows the same schema, different page composition
    {
      _key: 'iwt1',
      _type: 'imageWithTextSection',
      heading: 'Conveniently Located on Broadway',
      imagePosition: 'right',
      content: [
        textBlock(
          'Our office is steps from the Broadway-City Hall SkyTrain station, with street parking and bike racks available. We designed our space to feel welcoming from the moment you walk in — no sterile waiting rooms here.'
        ),
      ],
      ctas: [
        {
          _key: 'iwt-c1',
          _type: 'cta',
          variant: 'primary',
          link: {
            _type: 'link',
            label: 'Get Directions',
            linkType: 'external',
            externalUrl: 'https://maps.google.com/?q=2578+West+Broadway+Vancouver',
          },
        },
      ],
    },
    // 11. Contact Block — heading, description, showMap, showHours, showContactForm, layout(side-by-side|stacked|map-focus)
    // NOTE: Using 'map-focus' layout (vs Atlantis 'side-by-side') for visual differentiation
    {
      _key: 'contact1',
      _type: 'contactBlock',
      heading: 'Visit Us on Broadway',
      description: 'Conveniently located near the Broadway-City Hall SkyTrain station with street parking available.',
      showContactForm: true,
      showMap: true,
      showHours: true,
      layout: 'map-focus',
    },
  ],
}

// ABOUT PAGE — pageType: 'about' (required enum)
const aboutPage = {
  _id: ABOUT_PAGE_ID,
  _type: 'page',
  title: 'About Us',
  slug: { _type: 'slug', current: 'about' },
  pageType: 'about',
  office: { _type: 'reference', _ref: OFFICE_ID },
  language: 'en',
  seo: {
    _type: 'seo',
    metaTitle: 'About Broadway Smiles — Our Team & Philosophy',
    metaDescription:
      'Learn about Broadway Smiles, our experienced dental team, and our commitment to family-focused dental care on the Broadway corridor in Vancouver.',
    noIndex: false,
  },
  sections: [
    // 1. Hero
    {
      _key: 'hero1',
      _type: 'heroSection',
      heading: 'About Broadway Smiles',
      subheading: 'A family dental practice built on trust, technology, and genuine care.',
      layout: 'centered',
    },
    // 2. Rich Text — heading, content(PT, req), layout(full|narrow|two-column)
    {
      _key: 'rt1',
      _type: 'richTextSection',
      heading: 'Our Story',
      layout: 'narrow',
      content: [
        textBlock(
          'Broadway Smiles was founded in 2009 by Dr. Priya Patel with a vision of creating a dental practice that feels like home. Located in the heart of the Broadway corridor, we have grown from a solo practice to a team of dedicated professionals serving hundreds of families in the neighbourhood.'
        ),
        textBlock(
          'We invested early in digital dentistry — from digital X-rays that reduce radiation by 90% to our CEREC same-day crown system. Technology is a tool, but our real strength is the relationships we build with our patients.'
        ),
      ],
    },
    // 3. Team Grid — heading, description, members[](refs, req min 1), columns(2|3|4)
    {
      _key: 'tg1',
      _type: 'teamGrid',
      heading: 'Meet the Team',
      description: 'The people behind the smiles.',
      columns: 3,
      members: [
        { _type: 'reference', _ref: TEAM_IDS.drPatel, _key: 'tg-m1' },
        { _type: 'reference', _ref: TEAM_IDS.drNguyen, _key: 'tg-m2' },
        { _type: 'reference', _ref: TEAM_IDS.amandaLee, _key: 'tg-m3' },
      ],
    },
    // 4. Technology Showcase — heading, description, technologies[](name req, description, image, icon), layout(grid|carousel|list)
    // NOTE: Using 'carousel' layout (vs Atlantis 'grid') for visual differentiation
    {
      _key: 'tech1',
      _type: 'technologyShowcase',
      heading: 'Our Technology',
      description: 'Modern tools for better outcomes.',
      layout: 'carousel',
      technologies: [
        {
          _key: 'tech-t1',
          _type: 'technologyItem',
          name: 'CEREC Same-Day Crowns',
          description: 'Design, mill, and place a custom ceramic crown in a single appointment.',
        },
        {
          _key: 'tech-t2',
          _type: 'technologyItem',
          name: 'Digital X-Rays',
          description: '90% less radiation than traditional film X-rays with instant, high-resolution images.',
        },
        {
          _key: 'tech-t3',
          _type: 'technologyItem',
          name: 'Intraoral Cameras',
          description: 'See what we see — high-definition images of your teeth displayed chairside.',
        },
      ],
    },
    // 5. Value Props
    {
      _key: 'values1',
      _type: 'valueProps',
      heading: 'What Sets Us Apart',
      layout: 'horizontal',
      items: [
        {
          _key: 'vp1',
          _type: 'valuePropItem',
          heading: 'Community Focused',
          description: 'We sponsor local events and volunteer with dental outreach programs in Vancouver.',
        },
        {
          _key: 'vp2',
          _type: 'valuePropItem',
          heading: 'Continuing Education',
          description: 'Our team completes over 100 hours of continuing education annually to stay current.',
        },
        {
          _key: 'vp3',
          _type: 'valuePropItem',
          heading: 'Eco-Conscious Practice',
          description: 'Digital records, paperless billing, and environmentally responsible waste management.',
        },
      ],
    },
  ],
}

// SERVICES PAGE — pageType: 'services' (required enum)
const servicesPage = {
  _id: SERVICES_PAGE_ID,
  _type: 'page',
  title: 'Our Services',
  slug: { _type: 'slug', current: 'services' },
  pageType: 'services',
  office: { _type: 'reference', _ref: OFFICE_ID },
  language: 'en',
  seo: {
    _type: 'seo',
    metaTitle: 'Dental Services — Broadway Smiles Vancouver',
    metaDescription:
      'Explore dental services at Broadway Smiles: family dentistry, professional teeth whitening, same-day CEREC crowns, and more on the Broadway corridor.',
    noIndex: false,
  },
  sections: [
    // 1. Hero
    {
      _key: 'hero1',
      _type: 'heroSection',
      heading: 'Dental Services for the Whole Family',
      subheading: 'From routine cleanings to same-day crowns, we have you covered.',
      layout: 'centered',
    },
    // 2. Services Grid
    {
      _key: 'sg1',
      _type: 'servicesGrid',
      heading: 'What We Offer',
      columns: 3,
      services: [
        { _type: 'reference', _ref: SERVICE_IDS.familyDentistry, _key: 'sg-s1' },
        { _type: 'reference', _ref: SERVICE_IDS.teethWhitening, _key: 'sg-s2' },
        { _type: 'reference', _ref: SERVICE_IDS.dentalCrowns, _key: 'sg-s3' },
      ],
    },
    // 3. Services List — heading, services[](refs, req min 1), showDescriptions
    {
      _key: 'sl1',
      _type: 'servicesList',
      heading: 'All Services',
      showDescriptions: true,
      services: [
        { _type: 'reference', _ref: SERVICE_IDS.familyDentistry, _key: 'sl-s1' },
        { _type: 'reference', _ref: SERVICE_IDS.teethWhitening, _key: 'sl-s2' },
        { _type: 'reference', _ref: SERVICE_IDS.dentalCrowns, _key: 'sl-s3' },
      ],
    },
    // 4. Contact Block
    {
      _key: 'contact1',
      _type: 'contactBlock',
      heading: 'Ready to Get Started?',
      showContactForm: true,
      showMap: false,
      showHours: true,
      layout: 'stacked',
    },
  ],
}

// =============================================================================
// Seed execution
// =============================================================================

async function seed() {
  console.log('🦷 Seeding Broadway Smiles demo content...\n')

  const documents = [
    // Don't re-create insurance providers — they already exist from Atlantis seed
    ...services,
    ...teamMembers,
    ...faqs,
    ...testimonials,
    office,
    homePage,
    aboutPage,
    servicesPage,
  ]

  console.log(`Creating ${documents.length} documents...`)

  const tx = client.transaction()
  for (const doc of documents) {
    tx.createOrReplace(doc)
  }

  const result = await tx.commit()
  console.log(`✅ Transaction committed: ${result.transactionId}\n`)

  console.log('Documents created:')
  console.log(`  - 1 office (Broadway Smiles)`)
  console.log(`  - 3 pages (home, about, services)`)
  console.log(`  - 3 services`)
  console.log(`  - 3 team members`)
  console.log(`  - 4 FAQs`)
  console.log(`  - 3 testimonials`)
  console.log(`  - (reuses existing insurance providers)`)
  console.log('')
  console.log('Page builder blocks used:')
  console.log('  Home: heroSection, valueProps, servicesGrid, teamFeatured,')
  console.log('         testimonialsSection, faqSection, newPatientSection,')
  console.log('         ctaBlock, financingSection, contactBlock (10)')
  console.log('  About: heroSection, richTextSection, teamGrid,')
  console.log('         technologyShowcase, valueProps (5)')
  console.log('  Services: heroSection, servicesGrid, servicesList, contactBlock (4)')
  console.log('')
  console.log(`🌐 View at: /broadway-smiles`)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
