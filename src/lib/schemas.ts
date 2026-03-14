const BASE_URL = 'https://peeringedu.com'

export function getSoftwareApplicationSchema(locale: 'ko' | 'en' = 'ko') {
  if (locale === 'en') {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Peering',
      applicationCategory: 'EducationApplication',
      operatingSystem: 'Web',
      url: `${BASE_URL}/en`,
      description:
        'Special education timetable automation and IEP management solution. Solve your special education scheduling in 60 seconds.',
      offers: {
        '@type': 'Offer',
        price: '9600',
        priceCurrency: 'KRW',
        priceValidUntil: '2025-12-31',
      },
      inLanguage: 'en',
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '피어링 (Peering)',
    applicationCategory: 'EducationApplication',
    operatingSystem: 'Web',
    url: BASE_URL,
    description:
      '특수교사를 위한 시간표 자동화 및 IEP 관리 솔루션. 복잡한 특수학급 시간표를 1분 만에 완성하세요.',
    offers: {
      '@type': 'Offer',
      price: '9600',
      priceCurrency: 'KRW',
      priceValidUntil: '2025-12-31',
    },
    inLanguage: 'ko',
  }
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '피어링은 어떤 프로그램인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '피어링은 특수교사를 위해 설계된 특수학급 시간표 프로그램입니다. 시수 자동 조율, 팀 공동편집, 지원인력 배정, 스마트 아카이빙 기능을 통해 복잡한 특수학급 일정 관리를 1분 만에 해결해 드립니다.',
      },
    },
    {
      '@type': 'Question',
      name: '특수교육 실무사 업무 분장은 어떻게 관리하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '피어링의 팀 협업 기능을 통해 특수교육 실무사 업무 분장을 시각적 시간표 형태로 관리할 수 있습니다. 실시간 공동편집으로 여러 교사와 실무사가 동시에 배정표를 확인하고 수정할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '시수 조율은 어떻게 작동하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '피어링의 시수 실시간 파악 기능은 교사별 담당 시수를 자동으로 집계하고, 초과 또는 미달 상황을 즉시 시각적으로 알려줍니다. 복잡한 시수 조율 계산을 엑셀 없이 간편하게 처리할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '기존 NEIS 시간표와 연동되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, NEIS 시간표 링크를 피어링에 공유하면 원적학급 과목 정보를 자동으로 가져옵니다. 일괄 입력 기능을 통해 전체 학급의 시간표를 한 번에 등록할 수 있어 매 학기 반복 작업을 크게 줄여줍니다.',
      },
    },
    {
      '@type': 'Question',
      name: '팀 공동편집은 어떻게 사용하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '피어링에 동료 교사와 지원인력을 초대하면 실시간으로 시간표를 공동 편집할 수 있습니다. 지원인력의 현재 배정 현황도 시간표로 확인할 수 있어 협업 효율이 크게 높아집니다.',
      },
    },
    {
      '@type': 'Question',
      name: '요금제는 어떻게 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '피어링은 학급 수에 따라 1학급 ₩9,600부터 4학급 ₩34,800까지 유연한 학기 단위 요금제를 제공합니다. 스페셜 멤버십(₩15,000)을 통해 신기능 우선 접근 혜택도 받으실 수 있습니다.',
      },
    },
  ],
}
