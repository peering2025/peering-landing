import type { MetadataRoute } from 'next'
import { newsPosts } from '@/content/news'

const BASE_URL = 'https://peeringedu.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const newsEntries: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: `${BASE_URL}/news/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          ko: BASE_URL,
          en: `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          ko: BASE_URL,
          en: `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...newsEntries,
  ]
}
