import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { newsPosts } from '@/content/news'
import { categoryColors, formatDate, DEFAULT_NEWS_IMAGE } from '@/lib/news-utils'

export const metadata: Metadata = {
  title: '소식 | 피어링 — 특수교사 업무 솔루션',
  description:
    '피어링의 새로운 소식, 특수교육 시간표 작성 팁, 업데이트 내역을 확인하세요. 특수교사를 위한 유용한 정보를 전달합니다.',
  keywords: [
    '특수교육 시간표 팁',
    '특수학급 시간표 작성법',
    '피어링 업데이트',
    '특수교사 업무 노하우',
    '특수교육 시간표',
    '피어링 소식',
  ],
  alternates: { canonical: 'https://peeringedu.com/news' },
  openGraph: {
    title: '소식 | 피어링',
    description: '특수교육 시간표 작성 팁, 피어링 업데이트 소식을 확인하세요.',
    url: 'https://peeringedu.com/news',
    siteName: '피어링 (Peering)',
  },
}

export default function NewsPage() {
  const [featured, ...rest] = newsPosts

  return (
    <>
      <Navigation locale="ko" />

      <main className="min-h-screen bg-white">
        {/* ── Hero 헤더 ───────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#FFCC00] via-[#FFD633] to-[#FFFDE0] pt-28 pb-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#1A1A1A]/10 text-[#1A1A1A] text-xs font-semibold mb-4 tracking-widest uppercase">
              News
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-3">
              피어링 소식
            </h1>
            <p className="text-sm sm:text-base text-[#1A1A1A]/65 max-w-md mx-auto leading-relaxed">
              특수교사를 위한 업무 팁, 피어링 업데이트 소식을 전달합니다.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          {/* ── 대표 글 (첫 번째 글을 크게) ──────────────────────────────── */}
          {featured && (
            <Link
              href={`/news/${featured.slug}`}
              className="group block rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#FFCC00] transition-all duration-300 mb-10"
            >
              {/* 이미지 */}
              <div className="relative w-full aspect-video overflow-hidden bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.image || DEFAULT_NEWS_IMAGE}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                {/* 카테고리 뱃지 (이미지 위) */}
                <span
                  className={`absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${categoryColors[featured.category]}`}
                >
                  {featured.category}
                </span>
              </div>

              {/* 텍스트 */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                  <span>{formatDate(featured.date)}</span>
                  <span>·</span>
                  <span>읽는 시간 {featured.readTime}분</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#8B6914] transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#B38B00] group-hover:gap-2.5 transition-all">
                  자세히 읽기
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          )}

          {/* ── 나머지 글 카드 그리드 ──────────────────────────────────────── */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/news/${post.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-[#FFCC00] transition-all duration-200"
                >
                  {/* 카드 이미지 */}
                  <div className="relative w-full aspect-video overflow-hidden bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image || DEFAULT_NEWS_IMAGE}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                  </div>

                  {/* 카드 본문 */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center justify-between mb-2.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryColors[post.category]}`}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                    </div>

                    <h2 className="text-sm font-bold text-[#1A1A1A] mb-2 group-hover:text-[#8B6914] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <span className="text-xs text-gray-400">{post.readTime}분 읽기</span>
                      <span className="text-xs font-semibold text-[#B38B00] group-hover:translate-x-0.5 transition-transform">
                        읽기 →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ── 하단 CTA ─────────────────────────────────────────────────── */}
          <div className="mt-16 bg-gradient-to-r from-[#FFFDE0] to-[#FFF9C4] border border-[#FFCC00]/40 rounded-2xl p-8 sm:p-10 text-center">
            <p className="text-base font-bold text-[#1A1A1A] mb-2">
              피어링으로 특수학급 시간표를 시작해 보세요
            </p>
            <p className="text-sm text-[#1A1A1A]/60 mb-6">
              궁금한 점은 카카오톡으로 빠르게 답변해 드립니다.
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
              카카오톡으로 문의하기
            </a>
          </div>
        </section>
      </main>

      <Footer locale="ko" />
    </>
  )
}
