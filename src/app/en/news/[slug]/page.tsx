import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { newsPosts, getPostBySlug, getAllSlugs } from '@/content/news'
import { newsPostsEn } from '@/content/news-en'
import { categoryColors, categoryLabelsEn, formatDate, DEFAULT_NEWS_IMAGE } from '@/lib/news-utils'

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

  const enData = newsPostsEn[slug]
  const BASE_URL = 'https://peeringedu.com'
  const ogImage = post.image || DEFAULT_NEWS_IMAGE
  const title = enData?.title || post.title
  const description = enData?.excerpt || post.excerpt

  return {
    title: `${title} | Peering News`,
    description,
    keywords: ['special education timetable', 'special needs classroom', 'Peering', categoryLabelsEn[post.category]],
    alternates: { canonical: `${BASE_URL}/en/news/${slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/en/news/${slug}`,
      siteName: 'Peering',
      type: 'article',
      publishedTime: post.date,
      images: [{ url: ogImage, width: 800, alt: title }],
    },
  }
}

export default async function EnNewsDetailPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const enData = newsPostsEn[slug]
  const displayTitle = enData?.title || post.title
  const displayExcerpt = enData?.excerpt || post.excerpt
  const displayContent = enData?.content || post.content

  const related = newsPosts.filter((p) => p.slug !== slug).slice(0, 2)
  const heroImage = post.image || DEFAULT_NEWS_IMAGE

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: displayTitle,
    description: displayExcerpt,
    image: heroImage,
    datePublished: post.date,
    inLanguage: 'en',
    author: {
      '@type': 'Organization',
      name: 'Peering',
      url: 'https://peeringedu.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Peering',
      url: 'https://peeringedu.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://peeringedu.com/en/news/${slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navigation locale="en" />

      <main className="min-h-screen bg-white">
        {/* ── Hero image ──────────────────────────────────────────────────── */}
        <div className="relative w-full aspect-video max-h-[520px] overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

          <div className="absolute top-20 left-0 right-0 max-w-3xl mx-auto px-4 sm:px-6">
            <Link
              href="/en/news"
              className="inline-flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium transition-colors backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full"
            >
              ← News
            </Link>
          </div>

          <div className="absolute bottom-5 left-0 right-0 max-w-3xl mx-auto px-4 sm:px-6">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category]}`}
            >
              {categoryLabelsEn[post.category]}
            </span>
          </div>
        </div>

        {/* ── Article container ───────────────────────────────────────────── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mt-8 mb-5 text-sm text-gray-400">
            <span>{formatDate(post.date, 'en')}</span>
            <span className="text-gray-200">|</span>
            <span>{post.readTime} min read</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] leading-tight mb-4">
            {displayTitle}
          </h1>

          <p className="text-base text-gray-500 leading-relaxed border-l-4 border-[#FFCC00] pl-4 mb-10 italic">
            {displayExcerpt}
          </p>

          <div
            className="news-prose prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: displayContent }}
          />

          {/* ── Bottom actions ──────────────────────────────────────────────── */}
          <div className="mt-14 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-8">
            <Link
              href="/en/news"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#FFCC00] text-[#8B6914] text-sm font-bold hover:bg-[#FFCC00] hover:text-[#1A1A1A] transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 8H3M7 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to News
            </Link>
            <a
              href="https://pf.kakao.com/_YeRHn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFCC00] text-[#1A1A1A] text-sm font-bold hover:bg-[#E6B800] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.538 1.418 4.775 3.571 6.178-.157.562-.57 2.038-.653 2.358-.1.396.145.39.305.284.125-.083 1.988-1.347 2.792-1.89.638.09 1.295.138 1.985.138 5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
              </svg>
              Contact via KakaoTalk
            </a>
          </div>
        </article>

        {/* ── CTA banner ──────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-14">
          <div className="bg-gradient-to-r from-[#FFFDE0] to-[#FFF9C4] border border-[#FFCC00]/40 rounded-2xl p-8 text-center">
            <p className="text-base font-bold text-[#1A1A1A] mb-1">
              Start building timetables with Peering
            </p>
            <p className="text-sm text-[#1A1A1A]/60 mb-5">
              Complete special education timetables in under a minute.
            </p>
            <a
              href="https://pf.kakao.com/_YeRHn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFCC00] text-[#1A1A1A] text-sm font-bold hover:bg-[#E6B800] transition-colors shadow-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.538 1.418 4.775 3.571 6.178-.157.562-.57 2.038-.653 2.358-.1.396.145.39.305.284.125-.083 1.988-1.347 2.792-1.89.638.09 1.295.138 1.985.138 5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
              </svg>
              Quick consultation on KakaoTalk
            </a>
          </div>
        </div>

        {/* ── Related posts ─────────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
            <h2 className="text-base font-bold text-[#1A1A1A] mb-5">
              More articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((rel) => {
                const relEn = newsPostsEn[rel.slug]
                return (
                  <Link
                    key={rel.slug}
                    href={`/en/news/${rel.slug}`}
                    className="group flex overflow-hidden rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#FFCC00] transition-all"
                  >
                    <div className="relative w-24 shrink-0 overflow-hidden bg-gray-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rel.image || DEFAULT_NEWS_IMAGE}
                        alt={relEn?.title || rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-1.5 w-fit ${categoryColors[rel.category]}`}
                      >
                        {categoryLabelsEn[rel.category]}
                      </span>
                      <p className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#8B6914] transition-colors leading-snug line-clamp-2">
                        {relEn?.title || rel.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(rel.date, 'en')}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </main>

      <Footer locale="en" />
    </>
  )
}
