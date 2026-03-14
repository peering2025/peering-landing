import type { Metadata } from 'next'

const BASE_URL = 'https://peeringedu.com'

export const koMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: '피어링 — 특수학급 시간표 프로그램 | IEP 관리 툴',
  description:
    '복잡한 특수학급 시간표를 1분 만에 완성하세요. 시수 자동 조율, 팀 공동편집, 스마트 아카이빙까지 — 특수교사를 위한 올인원 일정 관리 솔루션.',
  keywords: [
    '특수학급 시간표 프로그램',
    'IEP 관리 툴',
    '특수교육 일정 관리 솔루션',
    '특수교육 실무사 업무 분장',
    '시수 조율',
    '개별화교육계획 관리',
    '특수학급 시간표 앱',
    '특수교육 시간표',
    '특수학급 운영',
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: BASE_URL,
    title: '피어링 — 특수학급 시간표 프로그램 | IEP 관리 툴',
    description:
      '복잡한 특수학급 시간표를 1분 만에 완성하세요. 특수교사를 위한 올인원 일정 관리 솔루션.',
    siteName: '피어링 (Peering)',
    images: [
      {
        url: '/images/학급 시간표.png',
        width: 1200,
        height: 630,
        alt: '피어링 특수학급 시간표 프로그램',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '피어링 — 특수학급 시간표 프로그램',
    description: '복잡한 특수학급 시간표를 1분 만에 완성하세요.',
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      ko: BASE_URL,
      en: `${BASE_URL}/en`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const enMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Peering — Special Education Timetable Software | IEP Management Tool',
  description:
    'Solve your special education timetable in 60 seconds. Automated scheduling, real-time class hour tracking, and team collaboration — the all-in-one IEP management solution.',
  keywords: [
    'Special Education Timetable',
    'IEP Management Tool',
    'Special Education Scheduling Software',
    'Special Education Teacher App',
    'IEP Planning Tool',
    'Timetable Automation',
    'Special Education Software',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${BASE_URL}/en`,
    title: 'Peering — Special Education Timetable Software | IEP Management Tool',
    description:
      'Solve your special education timetable in 60 seconds. The all-in-one IEP management solution for special education teachers.',
    siteName: 'Peering',
    images: [
      {
        url: '/images/학급 시간표.png',
        width: 1200,
        height: 630,
        alt: 'Peering Special Education Timetable Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peering — Special Education Timetable Software',
    description: 'Solve your special education timetable in 60 seconds.',
  },
  alternates: {
    canonical: `${BASE_URL}/en`,
    languages: {
      ko: BASE_URL,
      en: `${BASE_URL}/en`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}
