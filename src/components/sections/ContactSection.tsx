'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ✅ Formspree 설정: .env.local에 NEXT_PUBLIC_FORMSPREE_URL을 등록하세요.
// 예: NEXT_PUBLIC_FORMSPREE_URL=https://formspree.io/f/YOUR_FORM_ID
// Formspree 가입 후 peering2025@gmail.com으로 폼을 생성하고 ID를 붙여넣으세요.
const FORMSPREE_ACTION = process.env.NEXT_PUBLIC_FORMSPREE_URL ?? ''

interface ContactSectionProps {
  locale?: 'ko' | 'en'
}

export function ContactSection({ locale = 'ko' }: ContactSectionProps) {
  const isKo = locale === 'ko'
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const [form, setForm] = useState({
    name: '',
    contact: '',
    classCount: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!FORMSPREE_ACTION) {
      // Formspree URL이 설정되지 않은 경우 콘솔에 안내
      console.warn('NEXT_PUBLIC_FORMSPREE_URL이 설정되지 않았습니다. .env.local을 확인하세요.')
      setSubmitted(true) // 개발 중에는 성공으로 처리
      return
    }

    setLoading(true)
    setError(false)

    try {
      const response = await fetch(FORMSPREE_ACTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          contact: form.contact,
          classCount: form.classCount || isKo ? '미입력' : 'Not specified',
          message: form.message,
          // Formspree 특수 필드
          _replyto: form.contact.includes('@') ? form.contact : undefined,
          _subject: `[피어링 도입 상담] ${form.name}님 (${form.classCount || '미입력'})`,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const classOptions = isKo
    ? ['1학급', '2학급', '3학급', '4학급 이상']
    : ['1 class', '2 classes', '3 classes', '4+ classes']

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#F8F8F8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-semibold text-sm uppercase tracking-widest mb-3 text-[#B38B00]"
          >
            {isKo ? '무료 도입 상담' : 'Free Consultation'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4"
          >
            {isKo ? '무료 도입 상담 및 문의' : 'Get a Free Consultation'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-gray-500 text-lg max-w-lg mx-auto"
          >
            {isKo
              ? '학교에 맞는 도입 방법을 무료로 안내해 드려요. 부담 없이 문의해 주세요.'
              : "We'll guide you through the best setup for your school — free of charge."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#FFCC00]/20 flex items-center justify-center text-3xl mb-5">
                  ✅
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {isKo ? '문의가 접수되었어요!' : 'Inquiry Received!'}
                </h3>
                <p className="text-gray-500 text-sm">
                  {isKo
                    ? '빠른 시일 내에 연락드릴게요. 급하신 경우 카카오톡을 이용해 주세요.'
                    : "We'll get back to you soon. For urgent inquiries, please use KakaoTalk."}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', contact: '', classCount: '', message: '' }) }}
                  className="mt-6 text-sm text-[#B38B00] hover:underline"
                >
                  {isKo ? '다시 문의하기' : 'Submit another inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {isKo ? '성함' : 'Name'} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder={isKo ? '홍길동 선생님' : 'Your name'}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFCC00] focus:ring-2 focus:ring-[#FFCC00]/20 outline-none transition-all text-gray-800 placeholder:text-gray-300 text-sm"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {isKo ? '연락처 또는 이메일' : 'Phone or Email'}{' '}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    required
                    placeholder={isKo ? '010-0000-0000 또는 email@example.com' : 'phone or email'}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFCC00] focus:ring-2 focus:ring-[#FFCC00]/20 outline-none transition-all text-gray-800 placeholder:text-gray-300 text-sm"
                  />
                </div>

                {/* Class count */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {isKo ? '학급 개수' : 'Number of Classes'}
                  </label>
                  <select
                    name="classCount"
                    value={form.classCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFCC00] focus:ring-2 focus:ring-[#FFCC00]/20 outline-none transition-all text-gray-800 text-sm bg-white"
                  >
                    <option value="">{isKo ? '선택해 주세요' : 'Select...'}</option>
                    {classOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {isKo ? '문의 내용' : 'Message'}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={
                      isKo
                        ? '궁금한 점이나 도입 관련 상황을 자유롭게 적어주세요.'
                        : 'Describe your situation or questions...'
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FFCC00] focus:ring-2 focus:ring-[#FFCC00]/20 outline-none transition-all text-gray-800 placeholder:text-gray-300 text-sm resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">
                    {isKo
                      ? '제출 중 오류가 발생했어요. 카카오톡으로 문의해 주세요.'
                      : 'An error occurred. Please contact us via KakaoTalk.'}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-[#FFCC00] text-[#1C1C1C] font-bold text-base hover:bg-[#E6B800] active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading
                    ? isKo ? '제출 중...' : 'Submitting...'
                    : isKo ? '제출하기' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right side: KakaoTalk + info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* KakaoTalk CTA */}
            <a
              href="https://pf.kakao.com/_YeRHn"
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-[#FEE500] rounded-2xl p-6 hover:bg-yellow-300 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-[#1C1C1C] flex items-center justify-center flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#FEE500">
                    <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.538 1.418 4.775 3.571 6.178-.157.562-.57 2.038-.653 2.358-.1.396.145.39.305.284.125-.083 1.988-1.347 2.792-1.89.638.09 1.295.138 1.985.138 5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-yellow-800 uppercase tracking-wide">
                    {isKo ? '더 빠른 상담' : 'Faster Response'}
                  </div>
                  <div className="text-base font-extrabold text-[#1C1C1C]">
                    {isKo ? '카카오톡으로 빠른 상담하기' : 'Chat on KakaoTalk'}
                  </div>
                </div>
              </div>
              <p className="text-sm text-yellow-900/70">
                {isKo
                  ? '카카오톡 채널에서 실시간으로 질문하고 빠른 답변을 받으세요.'
                  : 'Get real-time answers via KakaoTalk channel.'}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-bold text-[#1C1C1C] group-hover:gap-2 transition-all">
                {isKo ? '채널 바로가기' : 'Open Channel'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            {/* Why contact us */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <div className="text-sm font-bold text-gray-800 mb-3">
                {isKo ? '상담하면 이런 도움을 드려요' : 'What You Get'}
              </div>
              {(isKo
                ? [
                    { icon: '🎓', text: '우리 학교 학급 수에 맞는 요금제를 추천해 드려요' },
                    { icon: '⚡', text: '빠른 온보딩 가이드와 초기 설정을 도와드려요' },
                    { icon: '💬', text: '사용 중 궁금한 점은 즉시 답변해 드려요' },
                  ]
                : [
                    { icon: '🎓', text: 'Plan recommendation tailored to your school' },
                    { icon: '⚡', text: 'Quick onboarding guide and setup support' },
                    { icon: '💬', text: 'Instant answers to questions during use' },
                  ]
              ).map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="text-xl leading-none mt-0.5">{item.icon}</span>
                  <span className="leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Email contact */}
            <div className="bg-gradient-to-br from-[#FFFCE8] to-[#FFFDF5] rounded-2xl p-5 border border-[#FFCC00]/30">
              <div className="text-xs font-semibold text-[#B38B00] uppercase tracking-wide mb-2">
                {isKo ? '이메일 문의' : 'Email Us'}
              </div>
              <a
                href="mailto:peering2025@gmail.com"
                className="text-sm font-bold text-gray-800 hover:text-[#B38B00] transition-colors flex items-center gap-2"
              >
                <span className="text-lg">✉️</span>
                peering2025@gmail.com
              </a>
              <p className="text-xs text-gray-400 mt-1.5">
                {isKo ? '영업일 기준 1~2일 내 답변드려요.' : 'We reply within 1–2 business days.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
