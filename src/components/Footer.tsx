import Image from 'next/image'
import Link from 'next/link'

interface FooterProps {
  locale?: 'ko' | 'en'
}

export function Footer({ locale = 'ko' }: FooterProps) {
  const isKo = locale === 'ko'

  return (
    <footer className="bg-[#1C1C1C] text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Image
              src="/images/피어링 로고 2.png"
              alt="피어링 로고"
              width={100}
              height={32}
              className="h-8 w-auto object-contain brightness-0 invert mb-4"
              unoptimized
              priority
            />
            <p className="text-sm leading-relaxed text-gray-500">
              {isKo
                ? '특수교사를 위한 시간표 자동화 솔루션이에요.'
                : 'Timetable automation for special education teachers.'}
            </p>
            <a
              href="https://pf.kakao.com/_YeRHn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-lg bg-[#FFCC00] text-[#1C1C1C] text-sm font-bold hover:bg-[#E6B800] transition-colors"
            >
              {isKo ? '카카오톡 채널 문의' : 'KakaoTalk Channel'}
            </a>
          </div>

          {/* Links */}
          <div>
            <div className="text-white text-sm font-semibold mb-4">
              {isKo ? '바로가기' : 'Links'}
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={isKo ? '/#features' : '/en#features'} className="hover:text-white transition-colors">
                  {isKo ? '기능 소개' : 'Features'}
                </a>
              </li>
              <li>
                <a href={isKo ? '/#pricing' : '/en#pricing'} className="hover:text-white transition-colors">
                  {isKo ? '요금제' : 'Pricing'}
                </a>
              </li>
              <li>
                <a href={isKo ? '/#contact' : '/en#contact'} className="hover:text-white transition-colors">
                  {isKo ? '도입 문의' : 'Contact'}
                </a>
              </li>
              <li>
                <a href={isKo ? '/#faq' : '/en#faq'} className="hover:text-white transition-colors">
                  {isKo ? '자주 묻는 질문' : 'FAQ'}
                </a>
              </li>
              <li>
                <Link
                  href={isKo ? '/news' : '/en/news'}
                  className="hover:text-white transition-colors"
                >
                  {isKo ? '소식' : 'News'}
                </Link>
              </li>
              <li>
                <Link
                  href={isKo ? '/en' : '/'}
                  className="hover:text-white transition-colors"
                >
                  {isKo ? '영문 페이지' : '한국어 페이지'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-white text-sm font-semibold mb-4">
              {isKo ? '문의' : 'Contact'}
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://pf.kakao.com/_YeRHn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {isKo ? '카카오톡 채널 @피어링' : 'KakaoTalk @Peering'}
                </a>
              </li>
              <li>
                <span className="text-gray-600 text-xs">peering2025@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {isKo && (
          <p className="text-xs text-gray-600 text-center mb-6 leading-relaxed">
            피어링(Peering)은 특수학급 시간표 제작과 시수 관리를 돕는 특수교사 전용 업무 솔루션입니다.
          </p>
        )}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© 2025 피어링 (Peering). All rights reserved.</p>
          <p>
            {isKo
              ? '특수학급 시간표 프로그램 | IEP 관리 툴 | 특수교육 일정 관리 솔루션'
              : 'Special Education Timetable Software | IEP Management Tool'}
          </p>
        </div>
      </div>
    </footer>
  )
}
