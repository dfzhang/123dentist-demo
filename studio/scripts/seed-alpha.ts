/**
 * Demo content seed script for Alpha Dental Clinic (Montréal, QC)
 *
 * Based on https://www.alphadentalclinic.ca/
 * Creates a sample office (Alpha Dental Clinic) with:
 * - Full office profile (Montréal address, contact, hours, nav, insurance)
 * - Home page with 10 page builder blocks
 * - About page with team + technology
 * - Services page with services grid + list + contact
 * - 3 services, 3 team members, 4 FAQs, 3 testimonials
 *
 * NOTE: English content only for now. French translations to be added
 * via the i18n workflow to showcase the translation use case.
 *
 * Usage: npx tsx scripts/seed-alpha.ts
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

const OFFICE_ID = 'office-alpha-dental'
const HOME_PAGE_ID = 'page-alpha-home'
const ABOUT_PAGE_ID = 'page-alpha-about'
const SERVICES_PAGE_ID = 'page-alpha-services'

const SERVICE_IDS = {
  orthodontics: 'service-alpha-orthodontics',
  implants: 'service-alpha-implants',
  generalDentistry: 'service-alpha-general',
}

const TEAM_IDS = {
  drLavoie: 'team-alpha-lavoie',
  drChen: 'team-alpha-chen',
  marieBeaulieu: 'team-alpha-beaulieu',
}

const FAQ_IDS = [
  'faq-alpha-1',
  'faq-alpha-2',
  'faq-alpha-3',
  'faq-alpha-4',
]

const TESTIMONIAL_IDS = [
  'testimonial-alpha-1',
  'testimonial-alpha-2',
  'testimonial-alpha-3',
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
    _id: SERVICE_IDS.orthodontics,
    _type: 'service',
    name: 'Orthodontics & Braces',
    slug: { _type: 'slug', current: 'orthodontics' },
    category: 'orthodontics', // valid enum: general|cosmetic|orthodontics|surgery|pediatric|periodontics|endodontics|prosthodontics|emergency|preventive
    shortDescription:
      'Straighten your smile with traditional braces or clear aligners. Our orthodontic team treats children, teens, and adults.',
    description: [
      textBlock('Orthodontic Services at Alpha Dental', 'h2'),
      textBlock(
        'A beautiful, well-aligned smile does more than look great — it improves your bite, makes cleaning easier, and can prevent long-term dental problems. At Alpha Dental Clinic, our orthodontic specialists offer a full range of treatments for patients of all ages.'
      ),
      textBlock(
        'Whether you prefer traditional metal braces, ceramic braces, or Invisalign clear aligners, we create a personalized treatment plan tailored to your goals and lifestyle. We use digital scanning — no messy impressions — and 3D treatment planning so you can see your projected results before you start.'
      ),
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Orthodontics & Braces — Alpha Dental Clinic Montréal',
      metaDescription:
        'Straighten your smile with braces or Invisalign at Alpha Dental Clinic in Montréal. Orthodontic treatment for children, teens, and adults. Free consultation.',
    },
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: SERVICE_IDS.implants,
    _type: 'service',
    name: 'Dental Implants',
    slug: { _type: 'slug', current: 'dental-implants' },
    category: 'surgery',
    shortDescription:
      'Permanent tooth replacement that looks, feels, and functions like natural teeth. Single implants, bridges, and full-arch solutions.',
    description: [
      textBlock('Dental Implants', 'h2'),
      textBlock(
        'Dental implants are the gold standard for replacing missing teeth. Unlike dentures, implants are anchored directly into the jawbone, providing a stable, permanent foundation for replacement teeth that look and function just like your natural ones.'
      ),
      textBlock(
        'Our implant team handles everything in-house — from the initial consultation and 3D imaging to surgical placement and final restoration. Most patients are surprised by how comfortable the process is.'
      ),
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Dental Implants — Alpha Dental Clinic Montréal',
      metaDescription:
        'Replace missing teeth with dental implants at Alpha Dental Clinic in Montréal. Single implants, bridges, and full-arch solutions with in-house surgical team.',
    },
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: SERVICE_IDS.generalDentistry,
    _type: 'service',
    name: 'General Dentistry',
    slug: { _type: 'slug', current: 'general-dentistry' },
    category: 'general',
    shortDescription:
      'Comprehensive dental care including check-ups, cleanings, fillings, and preventive treatments for the whole family.',
    description: [
      textBlock('General Dentistry', 'h2'),
      textBlock(
        'Regular dental visits are the foundation of a healthy smile. At Alpha Dental Clinic, our general dentistry services cover everything from routine check-ups and professional cleanings to fillings, extractions, and preventive care.'
      ),
      textBlock(
        'We take the time to explain your treatment options clearly and work with you to create a care plan that fits your needs and budget. Our goal is to keep your natural teeth healthy for life.'
      ),
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'General Dentistry — Alpha Dental Clinic Montréal',
      metaDescription:
        'Comprehensive general dentistry at Alpha Dental Clinic in Montréal. Check-ups, cleanings, fillings, and preventive care for the whole family.',
    },
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
]

const teamMembers = [
  {
    _id: TEAM_IDS.drLavoie,
    _type: 'teamMember',
    name: 'Dr. Marc-André Lavoie',
    slug: { _type: 'slug', current: 'dr-marc-andre-lavoie' },
    role: 'Lead Dentist & Clinic Director',
    roleCategory: 'dentist', // valid enum: dentist|hygienist|assistant|manager|receptionist|specialist|other
    shortBio:
      'Dr. Lavoie has been practicing dentistry in Montréal for over 20 years, with a special focus on implantology and oral surgery.',
    bio: [
      textBlock(
        'Dr. Marc-André Lavoie founded Alpha Dental Clinic with the vision of providing comprehensive, multidisciplinary dental care under one roof. After graduating from Université de Montréal\'s Faculty of Dentistry, he completed advanced training in implantology at McGill University.'
      ),
      textBlock(
        'Dr. Lavoie is passionate about continuing education and regularly attends international conferences to stay at the forefront of dental technology. He is fluent in French, English, and conversational Mandarin.'
      ),
    ],
    credentials: [
      'DMD, Université de Montréal',
      'Certificate in Implantology, McGill University',
      'Fellow, International Congress of Oral Implantologists',
      'Member, Ordre des dentistes du Québec',
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Dr. Marc-André Lavoie — Lead Dentist at Alpha Dental Montréal',
      metaDescription:
        'Meet Dr. Marc-André Lavoie, founder of Alpha Dental Clinic in Montréal. Over 20 years of experience in implantology and oral surgery. Trilingual: FR/EN/ZH.',
    },
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: TEAM_IDS.drChen,
    _type: 'teamMember',
    name: 'Dr. Wei Chen',
    slug: { _type: 'slug', current: 'dr-wei-chen' },
    role: 'Orthodontist',
    roleCategory: 'specialist',
    shortBio:
      'Dr. Chen is a certified orthodontist specializing in Invisalign and lingual braces for teens and adults.',
    bio: [
      textBlock(
        'Dr. Wei Chen joined Alpha Dental Clinic in 2020, bringing specialized expertise in orthodontics. She completed her orthodontic residency at the University of Toronto and is a certified Invisalign Diamond Provider — a distinction earned by fewer than 1% of Invisalign practitioners.'
      ),
      textBlock(
        'Dr. Chen treats patients in English, French, and Mandarin, reflecting the diverse community Alpha Dental serves.'
      ),
    ],
    credentials: [
      'DDS, University of Toronto',
      'MSc Orthodontics, University of Toronto',
      'Invisalign Diamond Provider',
      'Member, Canadian Association of Orthodontists',
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Dr. Wei Chen — Orthodontist at Alpha Dental Montréal',
      metaDescription:
        'Meet Dr. Wei Chen, certified orthodontist at Alpha Dental Clinic in Montréal. Invisalign Diamond Provider specializing in clear aligners and lingual braces.',
    },
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: TEAM_IDS.marieBeaulieu,
    _type: 'teamMember',
    name: 'Marie-Claire Beaulieu',
    slug: { _type: 'slug', current: 'marie-claire-beaulieu' },
    role: 'Dental Hygienist',
    roleCategory: 'hygienist',
    shortBio:
      'Marie-Claire brings 12 years of experience and a gentle, thorough approach to every cleaning and periodontal assessment.',
    bio: [
      textBlock(
        'Marie-Claire graduated from Collège Édouard-Montpetit\'s dental hygiene program and has been with Alpha Dental since 2016. She is passionate about periodontal health and patient education, taking the time to ensure every patient understands their oral health status and home care routine.'
      ),
    ],
    credentials: [
      'Diploma in Dental Hygiene, Collège Édouard-Montpetit',
      'Certified in Local Anesthesia',
      'Member, Ordre des hygiénistes dentaires du Québec',
    ],
    seo: {
      _type: 'seo',
      metaTitle: 'Marie-Claire Beaulieu — Dental Hygienist at Alpha Dental',
      metaDescription:
        'Meet Marie-Claire Beaulieu, dental hygienist at Alpha Dental Clinic in Montréal. 12 years of experience in periodontal care and patient education.',
    },
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
        'Yes! We welcome new patients of all ages. You can book your first appointment online or by calling us at (514) 934-0404. We recommend arriving 15 minutes early to complete your intake forms. We are conveniently located near the Côte-des-Neiges metro station.'
      ),
    ],
    category: 'new-patients', // valid enum: general|insurance|procedures|new-patients|emergency|post-treatment
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: FAQ_IDS[1],
    _type: 'faq',
    question: 'What languages do you serve patients in?',
    answer: [
      textBlock(
        'Our team provides care in French, English, and Mandarin Chinese. We want every patient to feel comfortable communicating in their preferred language. Our front desk staff can assist you in all three languages when booking appointments or discussing treatment plans.'
      ),
    ],
    category: 'general',
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: FAQ_IDS[2],
    _type: 'faq',
    question: 'Do you offer emergency dental services?',
    answer: [
      textBlock(
        'Yes, we offer emergency dental care every day of the week. If you are experiencing severe pain, swelling, or a dental injury, call us immediately at (514) 934-0404. We reserve time each day for urgent cases and will do our best to see you the same day.'
      ),
    ],
    category: 'emergency',
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: FAQ_IDS[3],
    _type: 'faq',
    question: 'How much do braces cost?',
    answer: [
      textBlock(
        'The cost of orthodontic treatment varies depending on the complexity of your case and the type of braces you choose. Traditional metal braces, ceramic braces, and Invisalign each have different price points. We offer free orthodontic consultations and flexible payment plans to make treatment accessible. Our fees follow the Québec Dental Surgeons Association fee guide.'
      ),
    ],
    category: 'procedures',
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
]

const testimonials = [
  {
    _id: TESTIMONIAL_IDS[0],
    _type: 'testimonial',
    patientName: 'Sophie L.',
    quote:
      'I was nervous about getting implants but Dr. Lavoie made the whole process so comfortable. The results are incredible — you cannot tell which tooth is the implant. The whole team is professional and kind.',
    rating: 5, // valid: 1-5
    source: 'google', // valid enum: google|facebook|yelp|ratemds|direct|other
    service: { _type: 'reference', _ref: SERVICE_IDS.implants },
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: TESTIMONIAL_IDS[1],
    _type: 'testimonial',
    patientName: 'David M.',
    quote:
      'My daughter just finished her Invisalign treatment with Dr. Chen and her smile is beautiful. The fact that the whole team speaks French made my daughter feel right at home. Highly recommend for orthodontics!',
    rating: 5,
    source: 'google',
    service: { _type: 'reference', _ref: SERVICE_IDS.orthodontics },
    office: { _type: 'reference', _ref: OFFICE_ID },
    language: 'en',
  },
  {
    _id: TESTIMONIAL_IDS[2],
    _type: 'testimonial',
    patientName: 'Mei W.',
    quote:
      'I appreciate that I can communicate in Mandarin here. Marie-Claire is the best hygienist I have ever had — thorough, gentle, and she really takes the time to explain everything. Open on weekends too, which is so convenient.',
    rating: 5,
    source: 'facebook',
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
  name: 'Alpha Dental Clinic',
  slug: { _type: 'slug', current: 'alpha-dental' },
  tagline: [{ _key: 'en', _type: 'internationalizedArrayStringValue', value: 'Comprehensive Dental Care for Your Whole Family' }],
  description: [
    {
      _key: 'en',
      _type: 'internationalizedArrayTextValue',
      value: 'Alpha Dental Clinic is a multidisciplinary dental practice in downtown Montréal offering comprehensive care in French, English, and Mandarin. From general dentistry and orthodontics to dental implants and emergency care, our team provides personalized treatment in a modern, welcoming environment.',
    },
  ],
  // address: street(req), suite, city(req), province(req, enum), postalCode(req, regex)
  address: {
    _type: 'address',
    street: '3550 Chemin de la Côte-des-Neiges',
    suite: '#350',
    city: 'Montréal',
    province: 'QC', // valid enum: AB|BC|MB|NB|NL|NS|ON|PE|QC|SK
    postalCode: 'H3H 1V4', // valid Canadian postal code format
  },
  // contactInfo: phone(req), email(regex), fax, emergencyPhone
  contactInfo: {
    _type: 'contactInfo',
    phone: '5149340404',
    email: 'info@alphadentalclinic.ca',
    emergencyPhone: '5149340404',
  },
  socialLinks: {
    _type: 'socialLinks',
    facebook: 'https://facebook.com/alphadentalclinic',
    instagram: 'https://instagram.com/alphadentalclinic',
    googleBusiness: 'https://g.page/alphadentalclinic',
  },
  // businessHours: hours(array of dayHours), holidayNote
  // dayHours: day(req, enum), isClosed(bool), openTime(TIME_SLOTS), closeTime(TIME_SLOTS)
  // Alpha Dental: Mon-Fri 8:30-18:30, Sat-Sun 9:00-17:00
  businessHours: {
    _type: 'businessHours',
    hours: [
      { _key: 'mon', _type: 'dayHours', day: 'monday', isClosed: false, openTime: '08:30', closeTime: '18:30' },
      { _key: 'tue', _type: 'dayHours', day: 'tuesday', isClosed: false, openTime: '08:30', closeTime: '18:30' },
      { _key: 'wed', _type: 'dayHours', day: 'wednesday', isClosed: false, openTime: '08:30', closeTime: '18:30' },
      { _key: 'thu', _type: 'dayHours', day: 'thursday', isClosed: false, openTime: '08:30', closeTime: '18:30' },
      { _key: 'fri', _type: 'dayHours', day: 'friday', isClosed: false, openTime: '08:30', closeTime: '18:30' },
      { _key: 'sat', _type: 'dayHours', day: 'saturday', isClosed: false, openTime: '09:00', closeTime: '17:00' },
      { _key: 'sun', _type: 'dayHours', day: 'sunday', isClosed: false, openTime: '09:00', closeTime: '17:00' },
    ],
    holidayNote: 'Open 7 days a week. Reduced hours on statutory holidays. Emergency line always available.',
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
          link: { _type: 'link', label: 'Orthodontics & Braces', linkType: 'internal', internalRef: { _type: 'reference', _ref: SERVICE_IDS.orthodontics } },
        },
        {
          _key: 'sub2',
          _type: 'navSubItem',
          link: { _type: 'link', label: 'Dental Implants', linkType: 'internal', internalRef: { _type: 'reference', _ref: SERVICE_IDS.implants } },
        },
        {
          _key: 'sub3',
          _type: 'navSubItem',
          link: { _type: 'link', label: 'General Dentistry', linkType: 'internal', internalRef: { _type: 'reference', _ref: SERVICE_IDS.generalDentistry } },
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
      link: { _type: 'link', label: 'Contact', linkType: 'external', externalUrl: 'https://alpha-dental.123dentist.com/contact' },
    },
  ],
  footerNavigation: [
    {
      _key: 'fnav1',
      _type: 'navItem',
      link: { _type: 'link', label: 'Privacy Policy', linkType: 'external', externalUrl: 'https://alpha-dental.123dentist.com/privacy' },
    },
    {
      _key: 'fnav2',
      _type: 'navItem',
      link: { _type: 'link', label: 'Accessibility', linkType: 'external', externalUrl: 'https://alpha-dental.123dentist.com/accessibility' },
    },
  ],
  newPatientInfo: [
    {
      _key: 'en',
      _type: 'internationalizedArrayPortableTextSimpleValue',
      value: [
        textBlock(
          'Welcome to Alpha Dental Clinic! We look forward to meeting you. Please arrive 15 minutes early for your first visit to complete intake forms. Bring your insurance card, a list of medications, and any recent dental X-rays if available. We are located near the Côte-des-Neiges metro station.'
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
          'Our fees follow the Québec Dental Surgeons Association fee guide. We accept all major insurance plans including student plans, and submit claims electronically. We also offer flexible payment plans for orthodontic treatment and major procedures.'
        ),
      ],
    },
  ],
  seo: {
    _type: 'seo',
    metaTitle: 'Alpha Dental Clinic — Dentist in Côte-des-Neiges, Montréal',
    metaDescription:
      'Alpha Dental Clinic is your trusted dental care provider in Côte-des-Neiges, Montréal. Orthodontics, implants, general dentistry. Open 7 days. Trilingual: FR/EN/ZH.',
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
    metaTitle: 'Alpha Dental Clinic — Dentist in Montréal, QC',
    metaDescription:
      'Welcome to Alpha Dental Clinic in Côte-des-Neiges, Montréal. Orthodontics, dental implants, and general dentistry. Open 7 days a week. Trilingual team.',
    noIndex: false,
  },
  sections: [
    // 1. Hero — heading(req), subheading, backgroundImage, ctas, layout(full|split-right|split-left|centered)
    // NOTE: Using 'split-left' layout (vs Atlantis 'full', Broadway 'split-right')
    {
      _key: 'hero1',
      _type: 'heroSection',
      heading: 'Comprehensive Dental Care for Your Whole Family',
      subheading: 'Multidisciplinary dentistry in the heart of Montréal. Orthodontics, implants, and general care — all under one roof. Service in French, English, and Mandarin.',
      layout: 'split-left',
      ctas: [
        {
          _key: 'cta1',
          _type: 'cta',
          variant: 'primary', // valid enum: primary|secondary|outline|text
          link: {
            _type: 'link',
            label: 'Book an Appointment',
            linkType: 'external',
            externalUrl: 'https://alpha-dental.123dentist.com/book',
          },
        },
        {
          _key: 'cta2',
          _type: 'cta',
          variant: 'outline',
          link: {
            _type: 'link',
            label: 'Emergency Care',
            linkType: 'external',
            externalUrl: 'https://alpha-dental.123dentist.com/emergency',
          },
        },
      ],
    },
    // 2. Value Props — heading, items[](heading req, description, icon), layout(grid|horizontal|vertical)
    // NOTE: Using 'vertical' layout (vs Atlantis 'grid', Broadway 'horizontal')
    {
      _key: 'values1',
      _type: 'valueProps',
      heading: 'Why Patients Choose Alpha Dental',
      layout: 'vertical',
      items: [
        {
          _key: 'vp1',
          _type: 'valuePropItem',
          heading: 'Multilingual Care',
          description: 'Our team serves patients in French, English, and Mandarin — communicate in the language you are most comfortable with.',
        },
        {
          _key: 'vp2',
          _type: 'valuePropItem',
          heading: 'Open 7 Days a Week',
          description: 'Extended hours Monday through Friday, plus full weekend availability. Emergency care available every day.',
        },
        {
          _key: 'vp3',
          _type: 'valuePropItem',
          heading: 'All Specialties In-House',
          description: 'General dentistry, orthodontics, implants, periodontics, and emergency care — no referrals needed.',
        },
        {
          _key: 'vp4',
          _type: 'valuePropItem',
          heading: 'Affordable Fees',
          description: 'Prices equal to or lower than the Québec Dental Surgeons Association fee guide. We accept all major insurance plans.',
        },
      ],
    },
    // 3. Services Grid — heading, description, services[](refs, req min 1), columns(2|3|4)
    {
      _key: 'sg1',
      _type: 'servicesGrid',
      heading: 'Our Services',
      description: 'A full range of dental services for every member of your family.',
      columns: 3,
      services: [
        { _type: 'reference', _ref: SERVICE_IDS.orthodontics, _key: 'sg-s1' },
        { _type: 'reference', _ref: SERVICE_IDS.implants, _key: 'sg-s2' },
        { _type: 'reference', _ref: SERVICE_IDS.generalDentistry, _key: 'sg-s3' },
      ],
    },
    // 4. Image With Text — heading, content(PT, req), image(req), imagePosition(left|right), ctas
    // NOTE: Using imageWithText on home (vs Atlantis doesn't have it, Broadway has it at bottom)
    {
      _key: 'iwt1',
      _type: 'imageWithTextSection',
      heading: 'A Modern Clinic in the Heart of Montréal',
      imagePosition: 'left',
      content: [
        textBlock(
          'Located at 3550 Chemin de la Côte-des-Neiges, our clinic is easily accessible by metro (Côte-des-Neiges station), bus, and car. We have designed our space with patient comfort in mind — from the welcoming reception area to our state-of-the-art treatment rooms.'
        ),
        textBlock(
          'With two locations — downtown Montréal and Brossard — we serve patients across the Greater Montréal area.'
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
            externalUrl: 'https://maps.google.com/?q=3550+Chemin+de+la+Cote-des-Neiges+Montreal',
          },
        },
      ],
    },
    // 5. Team Featured — heading, member(ref, req), layout(photo-left|photo-right|centered), showFullBio
    // NOTE: Using 'photo-right' layout (vs Atlantis 'photo-left', Broadway 'centered')
    {
      _key: 'tf1',
      _type: 'teamFeatured',
      heading: 'Meet Dr. Lavoie',
      member: { _type: 'reference', _ref: TEAM_IDS.drLavoie },
      layout: 'photo-right',
      showFullBio: false,
    },
    // 6. Testimonials — heading, testimonials[](refs, req min 1), layout(carousel|grid|featured), showRatings
    // NOTE: Using 'grid' layout (vs Atlantis 'carousel', Broadway 'featured')
    {
      _key: 'test1',
      _type: 'testimonialsSection',
      heading: 'What Our Patients Say',
      layout: 'grid',
      showRatings: true,
      testimonials: [
        { _type: 'reference', _ref: TESTIMONIAL_IDS[0], _key: 'ts-t1' },
        { _type: 'reference', _ref: TESTIMONIAL_IDS[1], _key: 'ts-t2' },
        { _type: 'reference', _ref: TESTIMONIAL_IDS[2], _key: 'ts-t3' },
      ],
    },
    // 7. FAQ — heading, faqs[](refs, req min 1), layout(accordion|two-column|list)
    // NOTE: Using 'list' layout (vs Atlantis 'accordion', Broadway 'two-column')
    {
      _key: 'faq1',
      _type: 'faqSection',
      heading: 'Frequently Asked Questions',
      layout: 'list',
      faqs: [
        { _type: 'reference', _ref: FAQ_IDS[0], _key: 'fq-f1' },
        { _type: 'reference', _ref: FAQ_IDS[1], _key: 'fq-f2' },
        { _type: 'reference', _ref: FAQ_IDS[2], _key: 'fq-f3' },
        { _type: 'reference', _ref: FAQ_IDS[3], _key: 'fq-f4' },
      ],
    },
    // 8. New Patient Section — heading, description(PT), steps[](title req, description, icon), cta, showInsurance
    {
      _key: 'np1',
      _type: 'newPatientSection',
      heading: 'New Patients Welcome',
      description: [
        textBlock('Getting started at Alpha Dental is simple. We accept walk-ins for emergencies and same-day appointments when available.'),
      ],
      steps: [
        {
          _key: 'step1',
          _type: 'object',
          title: 'Book Your Visit',
          description: 'Call us at (514) 934-0404 or book online. We are open 7 days a week.',
        },
        {
          _key: 'step2',
          _type: 'object',
          title: 'Complete Examination',
          description: 'Digital X-rays, comprehensive oral exam, and a discussion of your dental history and goals.',
        },
        {
          _key: 'step3',
          _type: 'object',
          title: 'Personalized Treatment Plan',
          description: 'We present your options with clear pricing following the Québec fee guide — no surprises.',
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
          externalUrl: 'https://alpha-dental.123dentist.com/book',
        },
      },
    },
    // 9. CTA Block — heading(req), description, ctas[](req min 1 max 3), backgroundImage, layout(banner|card|inline)
    // NOTE: Using 'inline' layout (vs Atlantis 'banner', Broadway 'card')
    {
      _key: 'ctab1',
      _type: 'ctaBlock',
      heading: 'Need Emergency Dental Care?',
      description: 'We offer same-day emergency appointments 7 days a week. Do not wait — call us now.',
      layout: 'inline',
      ctas: [
        {
          _key: 'ctab-c1',
          _type: 'cta',
          variant: 'primary',
          link: {
            _type: 'link',
            label: 'Call (514) 934-0404',
            linkType: 'external',
            externalUrl: 'https://alpha-dental.123dentist.com/contact',
          },
        },
        {
          _key: 'ctab-c2',
          _type: 'cta',
          variant: 'outline',
          link: {
            _type: 'link',
            label: 'Book Online',
            linkType: 'external',
            externalUrl: 'https://alpha-dental.123dentist.com/book',
          },
        },
      ],
    },
    // 10. Contact Block — heading, description, showMap, showHours, showContactForm, layout(side-by-side|stacked|map-focus)
    // NOTE: Using 'stacked' layout (vs Atlantis 'side-by-side', Broadway 'map-focus')
    {
      _key: 'contact1',
      _type: 'contactBlock',
      heading: 'Visit Our Montréal Clinic',
      description: 'Conveniently located near the Côte-des-Neiges metro station. Free street parking available on evenings and weekends.',
      showContactForm: true,
      showMap: true,
      showHours: true,
      layout: 'stacked',
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
    metaTitle: 'About Alpha Dental Clinic — Our Team & Mission',
    metaDescription:
      'Learn about Alpha Dental Clinic in Montréal, our multilingual dental team, and our commitment to comprehensive dental care in Côte-des-Neiges since 2008.',
    noIndex: false,
  },
  sections: [
    // 1. Hero
    {
      _key: 'hero1',
      _type: 'heroSection',
      heading: 'About Alpha Dental Clinic',
      subheading: 'Multidisciplinary dental care in Montréal since 2005. Serving our community in French, English, and Mandarin.',
      layout: 'centered',
    },
    // 2. Rich Text — heading, content(PT, req), layout(full|narrow|two-column)
    // NOTE: Using 'two-column' layout (vs Atlantis 'full', Broadway 'narrow')
    {
      _key: 'rt1',
      _type: 'richTextSection',
      heading: 'Our Story',
      layout: 'two-column',
      content: [
        textBlock(
          'Alpha Dental Clinic was founded in 2005 by Dr. Marc-André Lavoie with a simple mission: to provide comprehensive, affordable dental care to the diverse communities of Montréal. What started as a small general practice on Côte-des-Neiges has grown into a multidisciplinary clinic with specialists in orthodontics, implantology, periodontics, and more.'
        ),
        textBlock(
          'Today, our team of dentists, specialists, and hygienists serves thousands of patients across two locations — downtown Montréal and Brossard. We are proud to offer care in French, English, and Mandarin, reflecting the rich diversity of our city.'
        ),
        textBlock(
          'We believe that everyone deserves access to quality dental care. That is why we follow the Québec Dental Surgeons Association fee guide, accept all major insurance plans including student plans, and offer flexible payment options for major treatments.'
        ),
      ],
    },
    // 3. Team Grid — heading, description, members[](refs, req min 1), columns(2|3|4)
    {
      _key: 'tg1',
      _type: 'teamGrid',
      heading: 'Meet Our Team',
      description: 'A multidisciplinary team dedicated to your oral health.',
      columns: 3,
      members: [
        { _type: 'reference', _ref: TEAM_IDS.drLavoie, _key: 'tg-m1' },
        { _type: 'reference', _ref: TEAM_IDS.drChen, _key: 'tg-m2' },
        { _type: 'reference', _ref: TEAM_IDS.marieBeaulieu, _key: 'tg-m3' },
      ],
    },
    // 4. Technology Showcase — heading, description, technologies[](name req, description, image, icon), layout(grid|carousel|list)
    // NOTE: Using 'list' layout (vs Atlantis 'grid', Broadway 'carousel')
    {
      _key: 'tech1',
      _type: 'technologyShowcase',
      heading: 'Our Technology',
      description: 'Investing in modern technology for better patient outcomes.',
      layout: 'list',
      technologies: [
        {
          _key: 'tech-t1',
          _type: 'technologyItem',
          name: '3D Cone Beam CT Scanner',
          description: 'Detailed 3D imaging for precise implant planning, orthodontic assessment, and complex case diagnosis.',
        },
        {
          _key: 'tech-t2',
          _type: 'technologyItem',
          name: 'Digital Intraoral Scanner',
          description: 'No more messy impressions. Digital scans for crowns, bridges, Invisalign, and orthodontic planning.',
        },
        {
          _key: 'tech-t3',
          _type: 'technologyItem',
          name: 'Laser Dentistry',
          description: 'Soft tissue laser for minimally invasive periodontal treatment, faster healing, and reduced discomfort.',
        },
      ],
    },
    // 5. Value Props
    {
      _key: 'values1',
      _type: 'valueProps',
      heading: 'What Sets Us Apart',
      layout: 'grid',
      items: [
        {
          _key: 'vp1',
          _type: 'valuePropItem',
          heading: 'Trilingual Team',
          description: 'Care in French, English, and Mandarin — every patient communicates in their preferred language.',
        },
        {
          _key: 'vp2',
          _type: 'valuePropItem',
          heading: 'Two Convenient Locations',
          description: 'Downtown Montréal (Côte-des-Neiges) and Brossard (South Shore) — serving the Greater Montréal area.',
        },
        {
          _key: 'vp3',
          _type: 'valuePropItem',
          heading: 'Fee Guide Pricing',
          description: 'Our fees follow the Québec Dental Surgeons Association guide — transparent, fair pricing.',
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
    metaTitle: 'Dental Services — Alpha Dental Clinic Montréal',
    metaDescription:
      'Explore dental services at Alpha Dental Clinic: orthodontics, dental implants, general dentistry, and more. Open 7 days in Côte-des-Neiges, Montréal.',
    noIndex: false,
  },
  sections: [
    // 1. Hero
    {
      _key: 'hero1',
      _type: 'heroSection',
      heading: 'Dental Services for Every Need',
      subheading: 'From routine check-ups to complex implant surgery — all specialties under one roof.',
      layout: 'centered',
    },
    // 2. Services Grid
    {
      _key: 'sg1',
      _type: 'servicesGrid',
      heading: 'What We Offer',
      columns: 3,
      services: [
        { _type: 'reference', _ref: SERVICE_IDS.orthodontics, _key: 'sg-s1' },
        { _type: 'reference', _ref: SERVICE_IDS.implants, _key: 'sg-s2' },
        { _type: 'reference', _ref: SERVICE_IDS.generalDentistry, _key: 'sg-s3' },
      ],
    },
    // 3. Services List — heading, services[](refs, req min 1), showDescriptions
    {
      _key: 'sl1',
      _type: 'servicesList',
      heading: 'All Services',
      showDescriptions: true,
      services: [
        { _type: 'reference', _ref: SERVICE_IDS.orthodontics, _key: 'sl-s1' },
        { _type: 'reference', _ref: SERVICE_IDS.implants, _key: 'sl-s2' },
        { _type: 'reference', _ref: SERVICE_IDS.generalDentistry, _key: 'sl-s3' },
      ],
    },
    // 4. CTA Block
    {
      _key: 'ctab1',
      _type: 'ctaBlock',
      heading: 'Free Orthodontic Consultation',
      description: 'Wondering if braces or Invisalign are right for you? Book a free consultation with Dr. Chen.',
      layout: 'banner',
      ctas: [
        {
          _key: 'ctab-c1',
          _type: 'cta',
          variant: 'primary',
          link: {
            _type: 'link',
            label: 'Book Free Consultation',
            linkType: 'external',
            externalUrl: 'https://alpha-dental.123dentist.com/book',
          },
        },
      ],
    },
    // 5. Contact Block
    {
      _key: 'contact1',
      _type: 'contactBlock',
      heading: 'Ready to Get Started?',
      description: 'Open 7 days a week. Walk-ins welcome for emergencies.',
      showContactForm: true,
      showMap: false,
      showHours: true,
      layout: 'side-by-side',
    },
  ],
}

// =============================================================================
// Seed execution
// =============================================================================

async function seed() {
  console.log('🦷 Seeding Alpha Dental Clinic demo content...\n')

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
  console.log(`  - 1 office (Alpha Dental Clinic, Montréal QC)`)
  console.log(`  - 3 pages (home, about, services)`)
  console.log(`  - 3 services (orthodontics, implants, general)`)
  console.log(`  - 3 team members`)
  console.log(`  - 4 FAQs`)
  console.log(`  - 3 testimonials`)
  console.log(`  - (reuses existing insurance providers)`)
  console.log('')
  console.log('Page builder blocks used:')
  console.log('  Home: heroSection, valueProps, servicesGrid, imageWithTextSection,')
  console.log('         teamFeatured, testimonialsSection, faqSection,')
  console.log('         newPatientSection, ctaBlock, contactBlock (10)')
  console.log('  About: heroSection, richTextSection, teamGrid,')
  console.log('         technologyShowcase, valueProps (5)')
  console.log('  Services: heroSection, servicesGrid, servicesList,')
  console.log('            ctaBlock, contactBlock (5)')
  console.log('')
  console.log('Layout choices (all different from Atlantis + Broadway):')
  console.log('  Hero: split-left | Value Props: vertical | Testimonials: grid')
  console.log('  FAQ: list | CTA: inline | Contact: stacked')
  console.log('  Team Featured: photo-right | Rich Text: two-column')
  console.log('  Tech Showcase: list')
  console.log('')
  console.log(`🌐 View at: /alpha-dental`)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
