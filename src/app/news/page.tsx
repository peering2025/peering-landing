import type { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { newsPosts, NewsCategory } from '@/content/news'

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
  alternates: {
    canonical: 'https://peeringedu.com/news',
  },
  openGraph: {
    title: '소식 | 피어링',
    description: '특수교육 시간표 작성 팁, 피어링 업데이트 소식을 확인하세요.',
    url: 'https://peeringedu.com/news',
    siteName: '피어링 (Peering)',
  },
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

export default function NewsPage() {
  return (
    <>
      <Navigation locale="ko" />

      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-gradient-to-br from-[#FFCC00] via-[#FFD633] to-[#FFFDE0] pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#1A1A1A]/10 text-[#1A1A1A] text-xs font-semibold mb-4 tracking-wide uppercase">
              News
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
              피어링 소식
            </h1>
            <p className="text-base sm:text-lg text-[#1A1A1A]/70 max-w-xl mx-auto leading-relaxed">
              특수교사를 위한 업무 팁, 업데이트 소식, 공지사항을 전달합니다.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {newsPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="group flex flex-col bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#FFCC00] transition-all duration-200"
              >
                {/* Category & Date */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryColors[post.category]}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                </div>

                {/* Title */}
                <h2 className="text-base font-bold text-[#1A1A1A] mb-2 group-hover:text-[#B38B00] transition-colors leading-snug">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">읽는 시간 {post.readTime}분</span>
                  <span className="text-xs font-semibold text-[#B38B00] group-hover:translate-x-0.5 transition-transform">
                    읽기 →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-[#FFFDE0] border border-[#FFCC00]/40 rounded-2xl p-8 text-center">
            <p className="text-sm text-[#1A1A1A]/70 mb-4">
              피어링 사용에 궁금한 점이 있으신가요?
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
        </section>
      </main>

      <Footer locale="ko" />
    </>
  )
}
