// Sanity environment configuration — single source of truth
// All Sanity-related config reads from here

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'NEXT_PUBLIC_SANITY_PROJECT_ID is not set'
)

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'NEXT_PUBLIC_SANITY_DATASET is not set'
)

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}
