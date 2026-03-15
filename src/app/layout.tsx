import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://peeringedu.com'),
  title: '피어링 — 특수학급 시간표 프로그램 | IEP 관리 툴',
  description:
    '특수학급 시간표를 1분 만에 완성하세요. 시수 조율, 팀 공동편집, 스마트 아카이빙까지 - 특수교사용 올인원 일정 관리 솔루션 피어링.',
  keywords: [
    '특수교육 시간표',
    '특수학급 시간표',
    '특수교사 솔루션',
    '시간표 프로그램',
    '피어링',
    'Peering',
    'IEP 관리 툴',
    '특수교육 일정 관리',
    '특수학급 운영',
  ],
}

// SoftwareApplication JSON-LD (EducationalApplication) — 루트 레이아웃에 삽입
const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '피어링 (Peering)',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  url: 'https://peeringedu.com',
  description:
    '특수학급 시간표 제작과 시수 관리를 돕는 특수교사 전용 업무 솔루션. 시수 자동 조율, 팀 공동편집, NEIS 연동, 스마트 아카이빙까지 올인원으로 제공합니다.',
  inLanguage: 'ko',
  offers: {
    '@type': 'Offer',
    price: '9600',
    priceCurrency: 'KRW',
    priceValidUntil: '2026-12-31',
  },
  publisher: {
    '@type': 'Organization',
    name: '피어링 (Peering)',
    url: 'https://peeringedu.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
