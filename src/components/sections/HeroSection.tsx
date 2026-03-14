'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface HeroSectionProps {
  locale?: 'ko' | 'en'
}

export function HeroSection({ locale = 'ko' }: HeroSectionProps) {
  const isKo = locale === 'ko'

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#FFCC00] via-[#FFD633] to-[#FFFDE0]">
      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-10 -left-20 w-[350px] h-[350px] rounded-full bg-white/25 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          {/* Left: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-sm text-[#7A5E00] text-xs sm:text-sm font-semibold mb-5 border border-white/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A5E00] animate-pulse flex-shrink-0" />
              {isKo ? '특수교사를 위한 올인원 솔루션' : 'All-in-One Solution for Special Education'}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight mb-5 text-[#1A1A1A]"
            >
              {isKo ? (
                <>
                  특수교사를 위한<br />
                  모든 시간표를<br />
                  <span className="relative inline-block">
                    한 눈에!
                    <span className="absolute -bottom-1 left-0 right-0 h-3 bg-white/50 -z-10 rounded" />
                  </span>
                </>
              ) : (
                <>
                  All Timetables for<br />
                  Special Education<br />
                  <span className="relative inline-block">
                    At a Glance!
                    <span className="absolute -bottom-1 left-0 right-0 h-3 bg-white/50 -z-10 rounded" />
                  </span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#4A3800] leading-relaxed mb-7 max-w-lg"
            >
              {isKo
                ? '복잡한 특수학급 시간표, 이제 클릭만으로 5분 안에 해결하세요. 시수 조율부터 팀 공동편집, 지원인력 배정까지 한 화면에서 완성할 수 있어요.'
                : 'Solve complex special education timetables in 5 minutes with just a few clicks. Class hours, team editing, and staff scheduling — all in one screen.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#1A1A1A] text-white font-bold text-sm sm:text-base hover:bg-[#333] transition-all hover:shadow-xl hover:-translate-y-0.5 duration-200"
              >
                {isKo ? '무료 도입 상담 신청하기' : 'Get a Free Consultation'}
              </a>
              <a
                href="https://pf.kakao.com/_YeRHn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/80 text-[#1A1A1A] border border-white font-semibold text-sm sm:text-base hover:bg-white transition-all hover:-translate-y-0.5 duration-200"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#1A1A1A" className="flex-shrink-0">
                  <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.538 1.418 4.775 3.571 6.178-.157.562-.57 2.038-.653 2.358-.1.396.145.39.305.284.125-.083 1.988-1.347 2.792-1.89.638.09 1.295.138 1.985.138 5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
                </svg>
                {isKo ? '카카오톡 빠른 상담' : 'KakaoTalk Chat'}
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-4 text-[#7A5E00] text-xs sm:text-sm"
            >
              <div className="flex items-center gap-1.5">
                <span>★★★★★</span>
                <span>{isKo ? '90명 후원 달성' : '90 Backers'}</span>
              </div>
              <div className="w-px h-4 bg-[#7A5E00]/30 hidden sm:block" />
              <div>{isKo ? '텀블벅 238% 달성' : '238% Funded'}</div>
            </motion.div>
          </div>

          {/* Right: Screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative px-6 sm:px-8 lg:px-0"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Main screenshot */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/60">
                <div className="bg-white/90 px-3 py-2 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
                  <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                  <div className="flex-1 ml-2 h-4 bg-gray-100 rounded-full text-[10px] text-gray-400 flex items-center px-2 min-w-0">
                    <span className="truncate">peeringedu.com</span>
                  </div>
                </div>
                <Image
                  src="/images/학급 시간표.png"
                  alt={isKo ? '피어링 특수학급 시간표 화면' : 'Peering Special Education Timetable'}
                  width={700}
                  height={480}
                  className="w-full object-cover"
                  priority
                  unoptimized
                />
              </div>

              {/* Floating badge 1 — sm+ only */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="hidden sm:flex absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-3 py-2.5 items-center gap-2"
              >
                <div className="w-7 h-7 rounded-full bg-[#FFCC00] flex items-center justify-center text-sm flex-shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 leading-none">
                    {isKo ? '시수 자동 계산' : 'Auto Calc'}
                  </div>
                  <div className="text-xs font-bold text-gray-800 mt-0.5">
                    {isKo ? '완료!' : 'Done!'}
                  </div>
                </div>
              </motion.div>

              {/* Floating badge 2 — sm+ only */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="hidden sm:block absolute -top-4 -right-4 bg-white rounded-xl shadow-xl px-3 py-2.5"
              >
                <div className="text-[10px] text-gray-400">
                  {isKo ? '팀 편집 중' : 'Collaborating'}
                </div>
                <div className="text-xs font-extrabold text-[#1A1A1A] mt-0.5">
                  {isKo ? '3명 동시 접속' : '3 online'}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60H1440V20C1200 50 900 10 600 30C300 50 100 10 0 20V60Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
