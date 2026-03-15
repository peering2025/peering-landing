import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { newsPosts, getPostBySlug, getAllSlugs, NewsCategory } from '@/content/news'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const BASE_URL = 'https://peeringedu.com'

  return {
    title: `${post.title} | 피어링 소식`,
    description: post.excerpt,
    keywords: ['특수교육 시간표', '특수학급', '피어링', '특수교사', post.category],
    alternates: {
      canonical: `${BASE_URL}/news/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/news/${slug}`,
      siteName: '피어링 (Peering)',
      type: 'article',
      publishedTime: post.date,
    },
  }
}

const categoryColors: Record<NewsCategory, string> = {
  '업데이트': 'bg-blue-100 text-blue-700',
  '팁 & 노하우': 'bg-[#FFCC00]/20 text-[#7A5E00]',
  '공지사항': 'bg-gray-100 text-gray-600',
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-')
  return `${year}년 ${month}월 ${day}일`
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = newsPosts.filter((p) => p.slug !== slug).slice(0, 2)

  // JSON-LD for this article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: '피어링 (Peering)',
      url: 'https://peeringedu.com',
    },
    publisher: {
      '@type': 'Organization',
      name: '피어링 (Peering)',
      url: 'https://peeringedu.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://peeringedu.com/news/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navigation locale="ko" />

      <main className="min-h-screen bg-white">
        {/* Article Header */}
        <section className="bg-gradient-to-br from-[#FFCC00] via-[#FFD633] to-[#FFFDE0] pt-28 pb-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-sm text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors mb-6"
            >
              ← 소식 목록으로
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryColors[post.category]}`}
              >
                {post.category}
              </span>
              <span className="text-sm text-[#1A1A1A]/50">{formatDate(post.date)}</span>
              <span className="text-sm text-[#1A1A1A]/50">읽는 시간 {post.readTime}분</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-snug mb-4">
              {post.title}
            </h1>
            <p className="text-base text-[#1A1A1A]/70 leading-relaxed">{post.excerpt}</p>
          </div>
        </section>

        {/* Article Body */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div
            className="prose prose-gray max-w-none
              prose-headings:text-[#1A1A1A] prose-headings:font-bold
              prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:text-gray-600 prose-ul:leading-relaxed
              prose-li:mb-1
              prose-strong:text-[#1A1A1A]
              prose-a:text-[#B38B00] prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div className="mt-12 bg-[#FFFDE0] border border-[#FFCC00]/40 rounded-2xl p-8 text-center">
            <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
              피어링으로 시간표 작성을 시작해 보세요
            </p>
            <p className="text-sm text-[#1A1A1A]/60 mb-5">
              특수학급 시간표를 1분 만에 완성하는 솔루션, 지금 카카오톡으로 문의하세요.
            </p>
            <a
              href="https://pf.kakao.com/_YeRHn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFCC00] text-[#1A1A1A] text-sm font-bold hover:bg-[#E6B800] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.538 1.418 4.775 3.571 6.178-.157.562-.57 2.038-.653 2.358-.1.396.145.39.305.284.125-.083 1.988-1.347 2.792-1.89.638.09 1.295.138 1.985.138 5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
              </svg>
              카카오톡으로 문의하기
            </a>
          </div>

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-base font-bold text-[#1A1A1A] mb-5">다른 소식도 확인해 보세요</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/news/${rel.slug}`}
                    className="group flex flex-col bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#FFCC00] transition-all"
                  >
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2 w-fit ${categoryColors[rel.category]}`}
                    >
                      {rel.category}
                    </span>
                    <p className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#B38B00] transition-colors leading-snug">
                      {rel.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">{formatDate(rel.date)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer locale="ko" />
    </>
  )
}
