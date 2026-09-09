import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'kr0ivyaf',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  studioHost: 'dental123',
})
