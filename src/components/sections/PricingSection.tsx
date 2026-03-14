'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface PricingSectionProps {
  locale?: 'ko' | 'en'
}

interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  highlight?: boolean
  badge?: string
}

const tiersKo: PricingTier[] = [
  {
    name: '1학급',
    price: '₩9,600',
    period: '월',
    description: '특수학급이 하나인 학교에 최적이에요',
    features: ['학급 시간표 자동화', '시수 실시간 파악', '팀 공동편집', '스마트 아카이빙'],
  },
  {
    name: '2학급',
    price: '₩18,000',
    period: '월',
    description: '2개 학급을 운영하는 학교에 알맞아요',
    features: ['학급 시간표 자동화', '시수 실시간 파악', '팀 공동편집', '스마트 아카이빙'],
  },
  {
    name: '3학급',
    price: '₩26,400',
    period: '월',
    description: '3개 학급을 운영하는 학교에 딱 맞아요',
    features: ['학급 시간표 자동화', '시수 실시간 파악', '팀 공동편집', '스마트 아카이빙'],
    highlight: true,
    badge: '인기',
  },
  {
    name: '4학급',
    price: '₩34,800',
    period: '월',
    description: '4개 이상 학급을 운영하는 학교에 추천해요',
    features: [
      '학급 시간표 자동화',
      '시수 실시간 파악',
      '팀 공동편집',
      '스마트 아카이빙',
      '우선 지원',
    ],
  },
]

const tiersEn: PricingTier[] = [
  {
    name: '1 Class',
    price: '₩9,600',
    period: 'mo',
    description: 'Perfect for schools with one special education class',
    features: ['Timetable Automation', 'Real-time Class Hours', 'Team Collaboration', 'Smart Archiving'],
  },
  {
    name: '2 Classes',
    price: '₩18,000',
    period: 'mo',
    description: 'For schools managing 2 classes',
    features: ['Timetable Automation', 'Real-time Class Hours', 'Team Collaboration', 'Smart Archiving'],
  },
  {
    name: '3 Classes',
    price: '₩26,400',
    period: 'mo',
    description: 'For schools managing 3 classes',
    features: ['Timetable Automation', 'Real-time Class Hours', 'Team Collaboration', 'Smart Archiving'],
    highlight: true,
    badge: 'Popular',
  },
  {
    name: '4 Classes',
    price: '₩34,800',
    period: 'mo',
    description: 'For schools with 4 or more classes',
    features: [
      'Timetable Automation',
      'Real-time Class Hours',
      'Team Collaboration',
      'Smart Archiving',
      'Priority Support',
    ],
  },
]

export function PricingSection({ locale = 'ko' }: PricingSectionProps) {
  const isKo = locale === 'ko'
  const tiers = isKo ? tiersKo : tiersEn
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-semibold text-sm uppercase tracking-widest mb-3 text-[#B38B00]"
          >
            {isKo ? '요금제' : 'Pricing'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4"
          >
            {isKo ? '우리 학교에 맞는 플랜을 선택하세요' : 'Choose the Right Plan for Your School'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-gray-500 text-base"
          >
            {isKo
              ? '학급 수에 따라 유연하게 선택할 수 있어요. 월 단위 결제예요.'
              : 'Flexible plans by class count. Billed monthly.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
              className={`relative rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                tier.highlight
                  ? 'border-[#FFCC00] bg-[#1C1C1C] text-white shadow-xl'
                  : 'border-gray-100 bg-white hover:border-[#FFCC00]/40'
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full bg-[#FFCC00] text-[#1C1C1C]">
                  {tier.badge}
                </span>
              )}

              <div
                className={`text-sm font-semibold mb-1 ${
                  tier.highlight ? 'text-gray-400' : 'text-gray-400'
                }`}
              >
                {tier.name}
              </div>

              <div className="mb-4">
                <span
                  className={`text-3xl font-extrabold ${
                    tier.highlight ? 'text-[#FFCC00]' : 'text-gray-900'
                  }`}
                >
                  {tier.price}
                </span>
                <span
                  className={`text-sm ml-1 ${
                    tier.highlight ? 'text-gray-400' : 'text-gray-400'
                  }`}
                >
                  / {tier.period}
                </span>
              </div>

              <p
                className={`text-xs mb-5 ${
                  tier.highlight ? 'text-gray-400' : 'text-gray-400'
                }`}
              >
                {tier.description}
              </p>

              <ul className="space-y-2 mb-6">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-center gap-2 text-xs ${
                      tier.highlight ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                        tier.highlight
                          ? 'bg-[#FFCC00] text-[#1C1C1C]'
                          : 'bg-[#FFCC00]/20 text-[#B38B00]'
                      }`}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center text-sm font-bold py-2.5 rounded-xl transition-all ${
                  tier.highlight
                    ? 'bg-[#FFCC00] text-[#1C1C1C] hover:bg-[#E6B800]'
                    : 'bg-[#FFCC00]/10 text-[#B38B00] hover:bg-[#FFCC00]/20'
                }`}
              >
                {isKo ? '상담 신청하기' : 'Get Started'}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
