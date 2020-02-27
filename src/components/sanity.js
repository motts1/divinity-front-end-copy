// client.js
import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: "rws2i9gu",
  dataset: "whitney",
  useCdn: true // `false` if you want to ensure fresh data
})