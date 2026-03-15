import { newsPosts } from '@/content/news'

const BASE_URL = 'https://peeringedu.com'

export async function GET() {
  const items = newsPosts
    .map((post) => {
      const url = `${BASE_URL}/news/${post.slug}`
      const pubDate = new Date(post.date).toUTCString()
      // content 필드의 HTML 태그 제거하여 description용 plain text 생성
      const description = post.excerpt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      const title = post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

      return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      <category>${post.category}</category>
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>피어링</title>
    <link>${BASE_URL}</link>
    <description>특수교사를 위한 일정관리 솔루션</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
