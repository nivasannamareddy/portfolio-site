import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL

export const sanityEnabled = Boolean(projectId)

export const sanityClient = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      stega: { enabled: true, studioUrl: studioUrl || undefined },
    })
  : null

export const fetchSiteData = async () => {
  if (!sanityClient) return null
  return sanityClient.fetch(`*[_type == "site"][0]`)
}
