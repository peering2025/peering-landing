import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { newsPosts } from '@/content/news'
import { categoryColors, categoryLabelsEn, formatDate, DEFAULT_NEWS_IMAGE } from '@/lib/news-utils'

export const metadata: Metadata = {
  title: 'News | Peering — Special Education Timetable Solution',
  description:
    'Latest news, timetable tips for special education teachers, and Peering product updates.',
  keywords: [
    'special education timetable',
    'special needs classroom',
    'Peering updates',
    'special education teacher tips',
    'IEP scheduling',
  ],
  alternates: { canonical: 'https://peeringedu.com/en/news' },
  openGraph: {
    title: 'News | Peering',
    description: 'Special education timetable tips and Peering product updates.',
    url: 'https://peeringedu.com/en/news',
    siteName: 'Peering',
  },
}

export default function EnNewsPage() {
  const [featured, ...rest] = newsPosts

  return (
    <>
      <Navigation locale="en" />

      <main className="min-h-screen bg-white">
        {/* ── Hero header ─────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#FFCC00] via-[#FFD633] to-[#FFFDE0] pt-28 pb-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#1A1A1A]/10 text-[#1A1A1A] text-xs font-semibold mb-4 tracking-widest uppercase">
              News
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-3">
              Peering News
            </h1>
            <p className="text-sm sm:text-base text-[#1A1A1A]/65 max-w-md mx-auto leading-relaxed">
              Practical tips for special education teachers and the latest Peering updates.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          {/* ── Featured post ─────────────────────────────────────────────── */}
          {featured && (
            <Link
              href={`/en/news/${featured.slug}`}
              className="group block rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#FFCC00] transition-all duration-300 mb-10"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.image || DEFAULT_NEWS_IMAGE}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <span
                  className={`absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${categoryColors[featured.category]}`}
                >
                  {categoryLabelsEn[featured.category]}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                  <span>{formatDate(featured.date, 'en')}</span>
                  <span>·</span>
                  <span>{featured.readTime} min read</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#8B6914] transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#B38B00] group-hover:gap-2.5 transition-all">
                  Read more
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          )}

          {/* ── Post grid ────────────────────────────────────────────────── */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/en/news/${post.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-[#FFCC00] transition-all duration-200"
                >
                  <div className="relative w-full aspect-video overflow-hidden bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image || DEFAULT_NEWS_IMAGE}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center justify-between mb-2.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryColors[post.category]}`}
                      >
                        {categoryLabelsEn[post.category]}
                      </span>
                      <span className="text-xs text-gray-400">{formatDate(post.date, 'en')}</span>
                    </div>

                    <h2 className="text-sm font-bold text-[#1A1A1A] mb-2 group-hover:text-[#8B6914] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <span className="text-xs text-gray-400">{post.readTime} min read</span>
                      <span className="text-xs font-semibold text-[#B38B00] group-hover:translate-x-0.5 transition-transform">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ── Bottom CTA ────────────────────────────────────────────────── */}
          <div className="mt-16 bg-gradient-to-r from-[#FFFDE0] to-[#FFF9C4] border border-[#FFCC00]/40 rounded-2xl p-8 sm:p-10 text-center">
            <p className="text-base font-bold text-[#1A1A1A] mb-2">
              Start your special education timetable with Peering
            </p>
            <p className="text-sm text-[#1A1A1A]/60 mb-6">
              Get quick answers to your questions on KakaoTalk.
            </p>
            <a
              href="https://pf.kakao.com/_YeRHn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFCC00] text-[#1A1A1A] text-sm font-bold hover:bg-[#E6B800] transition-colors shadow-sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.538 1.418 4.775 3.571 6.178-.157.562-.57 2.038-.653 2.358-.1.396.145.39.305.284.125-.083 1.988-1.347 2.792-1.89.638.09 1.295.138 1.985.138 5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
              </svg>
              Contact via KakaoTalk
            </a>
          </div>
        </section>
      </main>

      <Footer locale="en" />
    </>
  )
}
