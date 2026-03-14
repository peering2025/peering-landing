'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Feature {
  tag: string
  badge: string
  title: string
  description: string
  benefits: string[]
  primaryImage: { src: string; alt: string }
  secondaryImage?: { src: string; alt: string }
  reverse: boolean
}

const featuresKo: Feature[] = [
  {
    tag: '기능 01',
    badge: '친절한 특수학급 시간표',
    title: '클릭만으로, 학생별 원적학급 시간을 바로 배치하세요',
    description:
      '교시마다 학생의 원적학급 시간을 하나씩 확인하며 시간표를 만들던 복잡함을 없앴어요. 피어링은 시간표 제작 단계와 가이드를 친절하게 안내해 드려요. 처음이어도 어렵지 않아요.',
    benefits: [
      '클릭만으로 교시별 원적학급 배치 완료',
      '단계별 가이드로 누구나 쉽게 시작 가능',
      '실수 없이 완성되는 직관적인 인터페이스',
    ],
    primaryImage: {
      src: '/images/학급 시간표.png',
      alt: '피어링 특수학급 시간표 화면',
    },
    secondaryImage: {
      src: '/images/원적학급 과목 입력.png',
      alt: '원적학급 과목 입력 화면',
    },
    reverse: false,
  },
  {
    tag: '기능 02',
    badge: '시간표 제작 디지털화',
    title: '링크로 제작부터 공유까지 끝! 시수도 자동으로 집계돼요',
    description:
      '교사별 시수가 자동으로 집계되고, 링크 하나로 NEIS 시간표를 가져올 수 있어요. 실시간 공동 편집으로 동료 교사와 함께 시간표를 완성하고 바로 공유할 수 있어요.',
    benefits: [
      'NEIS 시간표 링크 한 번에 가져오기',
      '교사별 시수 자동 집계 및 초과·미달 알림',
      '실시간 공동 편집으로 팀이 함께 완성',
    ],
    primaryImage: {
      src: '/images/원적학급 과목 입력-링크 송부 및 나이스 시간표.png',
      alt: 'NEIS 시간표 연동 및 링크 공유 화면',
    },
    secondaryImage: {
      src: '/images/교사 시수 비교.png',
      alt: '교사 시수 비교 화면',
    },
    reverse: true,
  },
  {
    tag: '기능 03',
    badge: '실시간 반영되는 일정',
    title: '교사, 지원인력의 일정을 한 화면에서 바로 공유하세요',
    description:
      '학교 내 교사, 특수교육 실무사, 지원인력과 일정을 손쉽게 공유할 수 있어요. 개인 일정부터 학사일정까지 피어링 하나로 한 번에 반영되니, 따로 정리할 필요가 없어요.',
    benefits: [
      '지원인력 배정 시간표 실시간 공동편집',
      '개인일정과 학사일정 통합 관리',
      '변경 사항이 모든 팀원에게 즉시 반영',
    ],
    primaryImage: {
      src: '/images/지원인력 배정 - 시간표.png',
      alt: '지원인력 배정 시간표 화면',
    },
    secondaryImage: {
      src: '/images/개인일정.png',
      alt: '개인일정 화면',
    },
    reverse: false,
  },
]

const featuresEn: Feature[] = [
  {
    tag: 'Feature 01',
    badge: 'Smart Timetable Creation',
    title: 'Place Students in the Right Slots with Just a Click',
    description:
      'No more checking each student\'s home class schedule period by period. Peering guides you through each step with clear, friendly instructions — even for first-timers.',
    benefits: [
      'Click to assign students to periods instantly',
      'Step-by-step guide makes it easy for anyone',
      'Intuitive interface — no mistakes possible',
    ],
    primaryImage: {
      src: '/images/학급 시간표.png',
      alt: 'Special Education Timetable Screen',
    },
    secondaryImage: {
      src: '/images/원적학급 과목 입력.png',
      alt: 'Home Class Subject Input Screen',
    },
    reverse: false,
  },
  {
    tag: 'Feature 02',
    badge: 'Digital Timetable Production',
    title: 'From Creation to Sharing — All via a Single Link',
    description:
      'Class hours are automatically tallied per teacher. Import your NEIS timetable with a single link. Real-time co-editing means your whole team can build and share timetables together.',
    benefits: [
      'One-click NEIS timetable import',
      'Auto-calculated class hours with over/under alerts',
      'Real-time co-editing with your full team',
    ],
    primaryImage: {
      src: '/images/원적학급 과목 입력-링크 송부 및 나이스 시간표.png',
      alt: 'NEIS Timetable Integration',
    },
    secondaryImage: {
      src: '/images/교사 시수 비교.png',
      alt: 'Teacher Class Hour Comparison',
    },
    reverse: true,
  },
  {
    tag: 'Feature 03',
    badge: 'Live Schedule Sharing',
    title: 'Share Schedules with Staff in Real Time — All in One Place',
    description:
      'Easily share schedules with teachers, aides, and support staff. Personal schedules and academic calendars are all reflected in Peering — no separate tracking needed.',
    benefits: [
      'Real-time co-editing of support staff timetables',
      'Personal and academic calendars unified',
      'All changes instantly visible to every team member',
    ],
    primaryImage: {
      src: '/images/지원인력 배정 - 시간표.png',
      alt: 'Support Staff Assignment Timetable',
    },
    secondaryImage: {
      src: '/images/개인일정.png',
      alt: 'Personal Schedule Screen',
    },
    reverse: false,
  },
]

function FeatureItem({ feature }: { feature: Feature }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {/* Image side */}
      <motion.div
        initial={{ opacity: 0, x: feature.reverse ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className={`relative ${feature.reverse ? 'lg:order-2' : 'lg:order-1'}`}
      >
        {/* Image container — extra padding on sm+ to accommodate floating badge */}
        <div className={`relative ${feature.secondaryImage ? 'pb-0 sm:pb-6 pr-0 sm:pr-6' : ''}`}>
          {/* Primary image */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <Image
              src={feature.primaryImage.src}
              alt={feature.primaryImage.alt}
              width={700}
              height={480}
              className="w-full object-cover"
              unoptimized
            />
          </div>

          {/* Secondary image — hidden on mobile, visible sm+ */}
          {feature.secondaryImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="hidden sm:block absolute bottom-0 right-0 w-2/5 rounded-xl overflow-hidden shadow-xl border-2 border-white"
            >
              <Image
                src={feature.secondaryImage.src}
                alt={feature.secondaryImage.alt}
                width={300}
                height={200}
                className="w-full object-cover"
                unoptimized
              />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, x: feature.reverse ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className={`${feature.reverse ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <div className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-3">
          {feature.tag}
        </div>
        <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 bg-[#FFCC00] text-[#1C1C1C]">
          {feature.badge}
        </span>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-snug mb-4">
          {feature.title}
        </h3>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">{feature.description}</p>

        <ul className="space-y-3">
          {feature.benefits.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="flex items-start gap-3 text-gray-700 text-sm"
            >
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#FFCC00] flex items-center justify-center text-[#1C1C1C] text-xs font-bold">
                ✓
              </span>
              {b}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

interface FeaturesSectionProps {
  locale?: 'ko' | 'en'
}

export function FeaturesSection({ locale = 'ko' }: FeaturesSectionProps) {
  const isKo = locale === 'ko'
  const features = isKo ? featuresKo : featuresEn
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="features" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div ref={ref} className="text-center mb-14 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-semibold text-sm uppercase tracking-widest mb-3 text-[#B38B00]"
          >
            {isKo ? '피어링의 핵심 기능' : 'Core Features'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4"
          >
            {isKo ? '피어링이 해결해 드리는 방법' : 'How Peering Solves It'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto"
          >
            {isKo
              ? '복잡했던 특수학급 운영이 피어링 하나로 압도적으로 편리해져요.'
              : 'Everything complex about special education scheduling becomes effortlessly simple.'}
          </motion.p>
        </div>

        {/* Feature items */}
        <div className="space-y-16 sm:space-y-24 lg:space-y-32">
          {features.map((feature) => (
            <FeatureItem key={feature.tag} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
