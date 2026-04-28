import { stegaClean } from 'next-sanity'
import type { PageBuilderBlock } from '@/sanity/types'
import { HeroSectionBlock } from './HeroSection'
import { RichTextSectionBlock } from './RichTextSection'
import { ServicesGridBlock } from './ServicesGrid'
import { ServicesListBlock } from './ServicesList'
import { TeamGridBlock } from './TeamGrid'
import { TeamFeaturedBlock } from './TeamFeatured'
import { FaqSectionBlock } from './FaqSection'
import { SmileGalleryBlock } from './SmileGallery'
import { ValuePropsBlock } from './ValueProps'
import { TechnologyShowcaseBlock } from './TechnologyShowcase'
import { ImageWithTextSectionBlock } from './ImageWithTextSection'
import { VideoEmbedBlock } from './VideoEmbed'
import { CtaBlockBlock } from './CtaBlock'
import { ContactBlockBlock } from './ContactBlock'
import { FinancingSectionBlock } from './FinancingSection'
import { TestimonialsSectionBlock } from './TestimonialsSection'
import { NewPatientSectionBlock } from './NewPatientSection'

// Block type → component mapping
// Every block type in the schema MUST have an entry here.
// If a block renders nothing, it's a bug — not a graceful degradation.
const blockComponents: Record<string, React.ComponentType<{ block: any }>> = {
  heroSection: HeroSectionBlock,
  richTextSection: RichTextSectionBlock,
  servicesGrid: ServicesGridBlock,
  servicesList: ServicesListBlock,
  teamGrid: TeamGridBlock,
  teamFeatured: TeamFeaturedBlock,
  faqSection: FaqSectionBlock,
  smileGallery: SmileGalleryBlock,
  valueProps: ValuePropsBlock,
  technologyShowcase: TechnologyShowcaseBlock,
  imageWithTextSection: ImageWithTextSectionBlock,
  videoEmbed: VideoEmbedBlock,
  ctaBlock: CtaBlockBlock,
  contactBlock: ContactBlockBlock,
  financingSection: FinancingSectionBlock,
  testimonialsSection: TestimonialsSectionBlock,
  newPatientSection: NewPatientSectionBlock,
}

interface PageBuilderProps {
  sections: PageBuilderBlock[]
}

export function PageBuilder({ sections }: PageBuilderProps) {
  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <div>
      {sections.map((block) => {
        // ⚠️ STEGA GOTCHA: block._type contains invisible Unicode characters
        // in draft mode. Must clean before using as object key lookup.
        const cleanType = stegaClean(block._type)
        const Component = blockComponents[cleanType]

        if (!Component) {
          // Fail visibly in development — this means a schema type
          // was added without a corresponding component
          if (process.env.NODE_ENV === 'development') {
            return (
              <div
                key={block._key}
                className="border-2 border-dashed border-red-400 bg-red-50 p-8 text-center"
              >
                <p className="font-mono text-sm text-red-600">
                  Missing component for block type:{' '}
                  <strong>{cleanType}</strong>
                </p>
              </div>
            )
          }
          return null
        }

        return <Component key={block._key} block={block} />
      })}
    </div>
  )
}
