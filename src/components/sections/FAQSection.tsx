'use client'

import { useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'

interface FAQSectionProps {
  locale?: 'ko' | 'en'
}

interface FAQItem {
  q: string
  a: string
}

const faqsKo: FAQItem[] = [
  {
    q: '피어링은 어떤 프로그램인가요?',
    a: '피어링은 특수교사를 위해 설계된 특수학급 시간표 프로그램이에요. 시수 자동 조율, 팀 공동편집, 지원인력 배정, 스마트 아카이빙 기능을 통해 복잡한 특수학급 일정 관리를 5분 안에 해결해 드려요.',
  },
  {
    q: '특수교육 실무사 업무 분장은 어떻게 관리하나요?',
    a: '피어링의 팀 협업 기능을 통해 특수교육 실무사 업무 분장을 시각적 시간표 형태로 관리할 수 있어요. 실시간 공동편집으로 여러 교사와 실무사가 동시에 배정표를 확인하고 수정할 수 있어요.',
  },
  {
    q: '시수 조율은 어떻게 작동하나요?',
    a: '피어링의 시수 실시간 파악 기능은 교사별 담당 시수를 자동으로 집계하고, 초과 또는 미달 상황을 즉시 시각적으로 알려줘요. 복잡한 시수 조율 계산을 엑셀 없이 간편하게 처리할 수 있어요.',
  },
  {
    q: '기존 NEIS 시간표와 연동되나요?',
    a: '네, NEIS 시간표 링크를 피어링에 공유하면 원적학급 과목 정보를 자동으로 가져와요. 일괄 입력 기능을 통해 전체 학급의 시간표를 한 번에 등록할 수 있어 매 학기 반복 작업을 크게 줄일 수 있어요.',
  },
  {
    q: '팀 공동편집은 어떻게 사용하나요?',
    a: '피어링에 동료 교사와 지원인력을 초대하면 실시간으로 시간표를 공동 편집할 수 있어요. 지원인력의 현재 배정 현황도 시간표로 확인할 수 있어 협업 효율이 크게 높아져요.',
  },
  {
    q: '요금제는 어떻게 되나요?',
    a: '피어링은 학급 수에 따라 1학급 ₩9,600부터 4학급 ₩34,800까지 유연한 월 단위 요금제를 제공해요. 학교 상황에 맞는 플랜을 도입 상담을 통해 안내해 드릴게요.',
  },
]

const faqsEn: FAQItem[] = [
  {
    q: 'What is Peering?',
    a: "Peering is a special education timetable program designed for special education teachers. With automated class hours, team co-editing, support staff assignment, and smart archiving, we help you solve complex scheduling in just 5 minutes.",
  },
  {
    q: 'How does Peering handle support staff work assignments?',
    a: "Peering's team collaboration feature lets you manage support staff assignments as visual timetables. Real-time co-editing means multiple teachers and aides can review and update assignments simultaneously.",
  },
  {
    q: 'How does class hour coordination work?',
    a: "Peering automatically tallies class hours per teacher and immediately highlights any over- or under-allocations visually. You can handle complex class hour coordination without Excel — and without errors.",
  },
  {
    q: 'Does it integrate with NEIS timetables?',
    a: "Yes! Share a NEIS timetable link with Peering and subject information is imported automatically. The bulk input feature lets you register all class timetables at once, greatly reducing repetitive setup each semester.",
  },
  {
    q: 'How does team co-editing work?',
    a: "Invite colleagues and support staff to Peering and everyone can co-edit timetables in real time. Assignment status is visible to all team members instantly, making collaboration dramatically more efficient.",
  },
  {
    q: 'What are the pricing options?',
    a: "Peering offers flexible monthly pricing based on class count: from ₩9,600 for 1 class up to ₩34,800 for 4 classes. Contact us for a consultation and we'll recommend the best plan for your school.",
  },
]

export function FAQSection({ locale = 'ko' }: FAQSectionProps) {
  const isKo = locale === 'ko'
  const faqs = isKo ? faqsKo : faqsEn
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#F8F8F8]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-semibold text-sm uppercase tracking-widest mb-3 text-[#B38B00]"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-extrabold text-gray-900"
          >
            {isKo ? '자주 묻는 질문' : 'Frequently Asked Questions'}
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-900 font-semibold text-base pr-4">{faq.q}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FFCC00]/20 flex items-center justify-center text-[#B38B00] font-bold text-lg leading-none"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-3 sm:pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-gray-400 text-sm mt-8"
        >
          {isKo ? '더 궁금한 점이 있으신가요? ' : 'Still have questions? '}
          <a
            href="https://pf.kakao.com/_YeRHn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#B38B00] font-semibold hover:underline"
          >
            {isKo ? '카카오톡으로 문의하기 →' : 'Ask us on KakaoTalk →'}
          </a>
        </motion.p>
      </div>
    </section>
  )
}
