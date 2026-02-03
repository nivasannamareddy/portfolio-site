import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01'

export const sanityEnabled = Boolean(projectId)

export const sanityClient = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null

export const fetchSiteData = async () => {
  if (!sanityClient) return null
  return sanityClient.fetch(`*[_type == "site"][0]`)
}
