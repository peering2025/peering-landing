import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        // 네이버 검색 봇 명시적 허용
        userAgent: 'Yeti',
        allow: '/',
      },
    ],
    sitemap: 'https://peeringedu.com/sitemap.xml',
    host: 'https://peeringedu.com',
  }
}
