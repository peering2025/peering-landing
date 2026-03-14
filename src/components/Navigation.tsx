'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface NavigationProps {
  locale?: 'ko' | 'en'
}

export function Navigation({ locale = 'ko' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isKo = locale === 'ko'

  const navLinks = isKo
    ? [
        { label: '기능 소개', href: '#features' },
        { label: '요금제', href: '#pricing' },
        { label: '도입 문의', href: '#contact' },
      ]
    : [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Contact', href: '#contact' },
      ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo — always show original (hero is now light/yellow) */}
        <Link href={isKo ? '/' : '/en'} className="flex items-center">
          <Image
            src="/images/피어링 로고 2.png"
            alt="피어링 로고"
            width={100}
            height={32}
            className="h-8 w-auto object-contain"
            unoptimized
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-[#1A1A1A] transition-colors"
            >
              {link.label}
            </a>
          ))}

          <Link
            href={isKo ? '/en' : '/'}
            className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isKo ? 'EN' : 'KO'}
          </Link>

          <a
            href="https://pf.kakao.com/_YeRHn"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-bold rounded-full bg-[#FFCC00] text-[#1A1A1A] hover:bg-[#E6B800] transition-colors flex items-center gap-1.5"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.538 1.418 4.775 3.571 6.178-.157.562-.57 2.038-.653 2.358-.1.396.145.39.305.284.125-.083 1.988-1.347 2.792-1.89.638.09 1.295.138 1.985.138 5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
            </svg>
            {isKo ? '카카오톡 상담' : 'KakaoTalk'}
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="메뉴 열기"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-gray-700 hover:text-[#1A1A1A] py-2"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href={isKo ? '/en' : '/'}
              className="text-sm font-medium text-gray-400 hover:text-gray-600 py-2"
              onClick={() => setIsOpen(false)}
            >
              {isKo ? '영문 페이지 (EN)' : '한국어 페이지 (KO)'}
            </Link>
            <a
              href="https://pf.kakao.com/_YeRHn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#FFCC00] text-[#1A1A1A] text-sm font-bold"
            >
              카카오톡으로 빠른 상담하기
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
