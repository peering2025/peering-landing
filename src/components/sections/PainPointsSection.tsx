'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface PainPointsSectionProps {
  locale?: 'ko' | 'en'
}

const painPointsKo = [
  {
    emoji: '😵',
    question: '원적학급 시간표 하나씩 조합,\n머리 아프지 않으셨나요?',
    sub: '학생마다 다른 원적학급 일정을 일일이 맞춰가며 시간표를 짜는 건 매번 퍼즐 맞추기예요.',
  },
  {
    emoji: '🖨️',
    question: '수정할 때마다 인쇄부터\n다시 하셨나요?',
    sub: '한 칸 바꿨을 뿐인데 처음부터 다시 출력. 종이 낭비, 시간 낭비가 반복돼요.',
  },
  {
    emoji: '🤯',
    question: '교사끼리 시수 조정을\n어떻게 할지 골치아프셨나요?',
    sub: '담임마다 시수 계산이 달라 누가 맞는지 확인하는 것부터가 일이에요.',
  },
  {
    emoji: '📚',
    question: '지원인력 배치부터 시간표까지\n할 게 산더미였나요?',
    sub: '배정표, 시간표, 개인일정까지 따로따로 관리하다 보면 어디서부터 시작해야 할지 막막하죠.',
  },
]

const painPointsEn = [
  {
    emoji: '😵',
    question: 'Tired of puzzling through\nevery student\'s home class schedule?',
    sub: 'Matching each student\'s home class timetable one by one is like solving a puzzle every single time.',
  },
  {
    emoji: '🖨️',
    question: 'Did you have to reprint\nevery time you made a change?',
    sub: 'Change one cell, print again from scratch. Paper wasted, time wasted — every time.',
  },
  {
    emoji: '🤯',
    question: 'Was class hour coordination\nbetween teachers a headache?',
    sub: 'When every teacher calculates hours differently, figuring out who\'s right becomes its own task.',
  },
  {
    emoji: '📚',
    question: 'Did you have a mountain of work\nfrom staffing to scheduling?',
    sub: 'Managing assignment sheets, timetables, and personal schedules separately leaves you overwhelmed.',
  },
]

export function PainPointsSection({ locale = 'ko' }: PainPointsSectionProps) {
  const isKo = locale === 'ko'
  const painPoints = isKo ? painPointsKo : painPointsEn
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-[#FFFCE8] to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-semibold text-sm uppercase tracking-widest mb-3 text-[#B38B00]"
          >
            {isKo ? '특수교사의 현실' : 'The Reality'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4"
          >
            {isKo ? '혹시 이런 고민 있으신가요?' : 'Do Any of These Sound Familiar?'}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {painPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group relative bg-white rounded-2xl p-7 shadow-sm border border-[#FFCC00]/30 hover:border-[#FFCC00] hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Yellow gradient accent top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFCC00] to-[#FFE566] rounded-t-2xl" />

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFCC00] to-[#FFE566] flex items-center justify-center text-2xl shadow-sm">
                  {point.emoji}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-gray-900 leading-snug mb-2 whitespace-pre-line">
                    {point.question}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{point.sub}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transition message */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-flex flex-col items-center gap-3">
            <p className="text-base font-semibold text-gray-500 max-w-lg">
              {isKo
                ? '피어링과 특수교육 시간표를 다같이 한 번에 제작하고\n모아서 한 눈에 관리해요'
                : 'With Peering, create all your special education timetables together at once — and manage them all in one view'}
            </p>
            <svg
              className="text-[#FFCC00] animate-bounce"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
