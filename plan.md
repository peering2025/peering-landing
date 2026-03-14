# Peering Landing Page — 전체 설계안

## 0. 현황 분석

| 항목 | 내용 |
|---|---|
| 프레임워크 | Next.js 16.1.6, React 19, TypeScript |
| 스타일 | Tailwind CSS v4 |
| 현재 상태 | Create Next App 보일러플레이트 (빈 껍데기) |
| 보유 이미지 | `public/images/` 내 11개 스크린샷 PNG |
| 의존성 추가 필요 | `framer-motion` |

---

## 1. 파일 구조 설계

```
src/
├── app/
│   ├── layout.tsx                  ← 루트 레이아웃 (hreflang 포함)
│   ├── page.tsx                    ← 한국어 홈 (메인 SEO 타겟)
│   ├── globals.css
│   ├── sitemap.ts                  ← Next.js sitemap.ts (자동 생성)
│   ├── robots.ts                   ← robots.txt 자동 생성
│   └── en/
│       ├── layout.tsx              ← 영문 레이아웃 (lang="en")
│       └── page.tsx                ← 영문 홈
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── PainPointsSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── SocialProofSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── CTASection.tsx
│   ├── ui/
│   │   └── ScrollReveal.tsx        ← Framer Motion 스크롤 인터랙션 래퍼
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── JsonLd.tsx                  ← JSON-LD 스키마 주입 컴포넌트
├── lib/
│   ├── metadata.ts                 ← 페이지별 Metadata 팩토리
│   └── schemas.ts                  ← SoftwareApplication + FAQPage 스키마
public/
├── llms.txt                        ← AI 크롤러용 사이트 요약 파일
└── images/ (기존 유지)
```

---

## 2. i18n 전략 (hreflang)

- **한국어 URL**: `/` → `lang="ko"`, `hreflang="ko"`
- **영문 URL**: `/en` → `lang="en"`, `hreflang="en"`
- 루트 `layout.tsx`에서 두 페이지 모두 `<link rel="alternate">` 태그 삽입
- 별도 라이브러리 미사용 (middleware 불필요) — 단순 폴더 기반 라우팅

```html
<!-- 한국어 페이지에 삽입 -->
<link rel="alternate" hreflang="ko" href="https://peering.kr/" />
<link rel="alternate" hreflang="en" href="https://peering.kr/en" />
<link rel="alternate" hreflang="x-default" href="https://peering.kr/" />
```

---

## 3. SEO/GEO 메타데이터 전략

### 3-1. 핵심 키워드 배치 계획

| 등급 | 키워드 | 배치 위치 |
|---|---|---|
| [상] 전환 | 특수학급 시간표 프로그램 | `<title>`, H1, OG |
| [상] 전환 | IEP 관리 툴 | H2, description |
| [상] 전환 | 특수교육 일정 관리 솔루션 | H2, FAQ |
| [중] 전문성 | 특수교육 실무사 업무 분장 | FAQ 스키마 질문 |
| [중] 전문성 | 시수 조율 노하우 | Features 섹션 본문 |
| [중] 전문성 | 개별화교육계획 관리 | Pain Points 섹션 |
| [글로벌] | Special Education Timetable | `/en` title, H1 |
| [글로벌] | IEP Management Tool | `/en` description, H2 |

### 3-2. 메타태그 설계 (한국어)

```
title: "피어링 — 특수학급 시간표 프로그램 | IEP 관리 툴"
description: "복잡한 특수학급 시간표를 1분 만에 완성하세요. 시수 자동 조율, 팀 공동편집, 스마트 아카이빙까지 — 특수교사를 위한 올인원 일정 관리 솔루션."
OG image: 핵심 스크린샷 (학급 시간표.png)
canonical: https://peering.kr/
```

---

## 4. JSON-LD 스키마 설계

### 4-1. SoftwareApplication 스키마
```json
{
  "@type": "SoftwareApplication",
  "name": "피어링 (Peering)",
  "applicationCategory": "EducationApplication",
  "operatingSystem": "Web",
  "offers": { "price": "9600", "priceCurrency": "KRW" },
  "description": "특수학급 시간표 자동화 및 IEP 관리 솔루션",
  "aggregateRating": { "ratingValue": "4.9", "reviewCount": "90" }
}
```

### 4-2. FAQPage 스키마 (GEO 핵심 — AI 인용 최적화)
6개 Q&A 포함:
1. 피어링은 어떤 프로그램인가요?
2. 특수교육 실무사 업무 분장을 피어링으로 어떻게 관리하나요?
3. 시수 조율은 어떻게 작동하나요?
4. 기존 NEIS 시간표와 연동되나요?
5. 팀 협업 기능은 어떻게 사용하나요?
6. 요금제는 어떻게 되나요?

---

## 5. llms.txt 설계 (AI 크롤러 최적화)

```
# Peering

> 피어링은 특수교사를 위한 시간표 자동화 및 IEP 관리 솔루션입니다.

## 제품 요약
- 특수학급 시간표 프로그램
- 시수 실시간 파악 및 자동 조율
- 팀 공동편집 및 지원인력 배정
- 스마트 아카이빙 (수업계획, 개인일정)
- NEIS 시간표 연동

## 문서
- [홈페이지](https://peering.kr/)
- [영문 페이지](https://peering.kr/en)
```

---

## 6. 페이지 섹션 상세 설계 (한국어)

### Section 1 — Hero
- **H1**: "복잡한 특수학급 시간표, 피어링으로 1분 만에 해결하세요"
- **부제**: "시수 조율부터 팀 공동편집, 지원인력 배정까지 — 특수교사의 모든 스케줄을 하나로"
- **CTA 버튼**: "무료로 시작하기" + "텀블벅에서 확인하기"
- **배경**: 그라데이션 (인디고/퍼플 계열) + `학급 시간표.png` 우측 플로팅
- **애니메이션**: 텍스트 fade-in-up, 이미지 slide-in-right (Framer Motion)

### Section 2 — Pain Points (문제 제기)
- **H2**: "특수교사라면 이런 고통, 알고 계시죠?"
- 3개 카드:
  1. "매 학기 반복되는 시간표 재작성" → 엑셀로 일일이 조율하는 고통
  2. "시수 초과/미달 체크의 혼란" → 담임마다 달라지는 시수 계산 오류
  3. "지원인력 배정표가 제각각" → 공유도 안 되고 버전도 달라지는 서류
- **애니메이션**: 카드 stagger 등장 (ScrollReveal)

### Section 3 — Features (핵심 기능 4개)
스크롤 시 이미지가 왼/오른쪽에서 교차 등장하는 인터랙션

| # | 기능명 | 설명 | 사용 이미지 |
|---|---|---|---|
| 1 | 시간표 자동화 | NEIS 시간표 가져오기 → 원적학급 과목 일괄 입력 → 자동 편성 | `원적학급 과목 입력.png`, `원적학급 과목 입력-일괄시간표 입력-입력란.png` |
| 2 | 시수 실시간 파악 | 교사별 시수 현황 한눈에 비교, 초과·미달 즉시 감지 | `교사 시수 비교.png` |
| 3 | 지원인력·팀 협업 | 지원인력 배정 시간표 공동편집, 실시간 위치 확인 | `지원인력 배정 - 시간표.png`, `지원인력-시간표띄워두고보기.png` |
| 4 | 스마트 아카이빙 | 수업계획·개인일정 보관 및 시간표 PDF 출력 | `수업계획.png`, `개인일정.png`, `시간표 출력함.png` |

- **각 기능**: 좌우 교차 레이아웃 (이미지 + 텍스트)
- **애니메이션**: `useInView` 트리거 → 이미지 slide-in + 텍스트 fade-in

### Section 4 — Social Proof
- **H2**: "90명의 특수교사가 먼저 선택했습니다"
- 텀블벅 238% 달성 배지
- 숫자 카운터 애니메이션: 90명 후원 / 238% 달성 / ₩1,191,000 모금
- 후원자 testimonial 카드 2-3개 (설득형 카피)

### Section 5 — Pricing
- **H2**: "우리 학교에 맞는 플랜을 선택하세요"
- 4개 티어 카드 (1학급~4학급): ₩9,600 / ₩18,000 / ₩26,400 / ₩34,800
- 스페셜 멤버십 ₩15,000 강조 배지
- **추천 플랜** 하이라이트

### Section 6 — FAQ
- **H2**: "자주 묻는 질문"
- 6개 아코디언 Q&A (FAQPage 스키마와 1:1 대응)
- 전문 키워드 자연 삽입: 실무사 업무 분장, 시수 조율, NEIS 연동

### Section 7 — Final CTA
- **H2**: "지금 바로 특수학급 시간표 고민을 끝내세요"
- 이메일 웨이팅 입력 폼 or 텀블벅 링크 버튼
- 배경: 강한 그라데이션 + subtle 파티클/그리드

---

## 7. 영문 페이지 (/en) 섹션 설계

- **H1**: "Solve Your Special Education Timetable in 60 Seconds"
- **H2s**: IEP Management Tool / Special Education Scheduling Software / Real-time Class Hour Tracking
- 동일 이미지 재활용, 영문 카피로 교체
- SoftwareApplication 스키마 영문 버전 삽입

---

## 8. 애니메이션 전략 (Framer Motion)

```tsx
// ScrollReveal.tsx — 공통 래퍼
const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}
// useInView로 뷰포트 진입 시 트리거

// Feature 이미지: 좌측 등장
{ hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } }

// Feature 이미지: 우측 등장
{ hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } }

// stagger (Pain Points 카드)
{ transition: { staggerChildren: 0.15 } }

// 숫자 카운터 (Social Proof)
useSpring + useTransform
```

---

## 9. 실행 순서 (승인 후 진행)

1. `framer-motion` 패키지 설치
2. `public/llms.txt` 생성
3. `src/app/robots.ts` + `src/app/sitemap.ts` 생성
4. `src/lib/schemas.ts` — JSON-LD 스키마 정의
5. `src/lib/metadata.ts` — 메타데이터 팩토리
6. `src/components/ui/ScrollReveal.tsx` — 애니메이션 래퍼
7. `src/components/JsonLd.tsx` — 스키마 주입
8. 섹션 컴포넌트 7개 순차 작성
9. `src/components/Navigation.tsx` + `Footer.tsx`
10. `src/app/layout.tsx` — 루트 레이아웃 (hreflang)
11. `src/app/page.tsx` — 한국어 메인 조립
12. `src/app/en/layout.tsx` + `src/app/en/page.tsx` — 영문 페이지
13. `src/app/globals.css` — 브랜드 컬러/폰트 정의

---

## 10. 브랜드 디자인 토큰

```css
--color-primary: #4F46E5;      /* 인디고 — 신뢰/전문성 */
--color-primary-light: #818CF8;
--color-accent: #7C3AED;       /* 퍼플 — 포인트 */
--color-surface: #F8F7FF;      /* 연보라 배경 */
--color-text: #1E1B4B;         /* 딥 인디고 */
--gradient-hero: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
```

---

## 검토 포인트

- [ ] 다국어 구조: `app/page.tsx`(KO) + `app/en/page.tsx`(EN) 방식 동의?
- [ ] 이메일 수집 CTA vs 텀블벅 링크 CTA — 어느 쪽을 우선?
- [ ] 도메인이 확정됐다면 canonical/hreflang에 사용할 실제 URL 공유 필요
- [ ] Social Proof 섹션에 실제 후원자 testimonial 문구가 있다면 제공 가능?
