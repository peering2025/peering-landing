'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface CTASectionProps {
  locale?: 'ko' | 'en'
}

export function CTASection({ locale = 'ko' }: CTASectionProps) {
  const isKo = locale === 'ko'
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-[#FFCC00] via-[#FFD633] to-[#FFE580]">
      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-white/25 blur-3xl" />
      </div>

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 text-[#7A5E00] text-sm font-semibold mb-6 border border-white/80"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#7A5E00] animate-pulse" />
          {isKo ? '지금 바로 시작하세요' : 'Start Today'}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-[#1A1A1A] leading-tight mb-6"
        >
          {isKo ? (
            <>
              지금 바로 특수학급<br />
              시간표 고민을 끝내세요
            </>
          ) : (
            <>
              End Your Special Education<br />
              Scheduling Struggles Today
            </>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#4A3800] text-lg mb-10 max-w-xl mx-auto"
        >
          {isKo
            ? '90명의 특수교사가 먼저 선택했어요. 텀블벅 238% 달성, 검증된 솔루션을 지금 경험해 보세요.'
            : '90 special education teachers have already chosen Peering. 238% funded on Tumblbug — try the validated solution now.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#1A1A1A] text-white font-bold text-base hover:bg-[#333] transition-all hover:shadow-xl hover:-translate-y-0.5 duration-200 min-w-[200px]"
          >
            {isKo ? '무료 도입 상담 신청하기' : 'Get a Free Consultation'}
          </a>
          <a
            href="https://pf.kakao.com/_YeRHn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#1A1A1A] font-bold text-base hover:bg-gray-50 transition-all hover:shadow-xl hover:-translate-y-0.5 duration-200 min-w-[200px]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1A1A1A">
              <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.538 1.418 4.775 3.571 6.178-.157.562-.57 2.038-.653 2.358-.1.396.145.39.305.284.125-.083 1.988-1.347 2.792-1.89.638.09 1.295.138 1.985.138 5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
            </svg>
            {isKo ? '카카오톡 빠른 상담' : 'KakaoTalk Chat'}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 sm:mt-14 grid grid-cols-3 gap-3 sm:gap-6 border-t border-[#B38B00]/20 pt-8 sm:pt-10 max-w-xs sm:max-w-lg mx-auto"
        >
          {[
            { value: '90+', label: isKo ? '후원 교사' : 'Teacher Backers' },
            { value: '238%', label: isKo ? '텀블벅 달성' : 'Tumblbug Funded' },
            { value: '5분', label: isKo ? '시간표 완성' : 'To Complete' },
          ].map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="text-xl sm:text-3xl font-extrabold text-[#1A1A1A]">{stat.value}</div>
              <div className="text-[#7A5E00] text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
