/**
 * 피어링 SEO 자동화 스크립트
 * ─────────────────────────────────────────────────────────────────────────────
 * 실행: scripts/ 디렉토리에서 `node generate-seo-content.mjs`
 * 환경변수: ANTHROPIC_API_KEY
 *
 * 동작:
 *   1. src/content/news.ts를 읽어 기존 제목·슬러그 추출 (중복 방지)
 *   2. 주제 풀에서 랜덤 힌트 5개를 선택해 Claude에 전달
 *   3. Claude가 완전한 NewsPost JSON 생성
 *   4. 글 주제 키워드로 Unsplash 이미지 자동 배정
 *   5. news.ts의 newsPosts 배열 맨 앞에 새 글 삽입
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Anthropic from '@anthropic-ai/sdk'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

// ── 경로 설정 ──────────────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url))
const CONTENT_PATH = join(__dirname, '../src/content/news.ts')

// ── Anthropic 클라이언트 ────────────────────────────────────────────────────────
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ── 이미지 풀: 주제 카테고리별 큐레이션된 Unsplash 이미지 ──────────────────────
// 각 URL은 교육·수업·계획·협업 테마의 고품질 사진입니다.
const IMAGE_POOL = {
  /** 수업·교실·학생 지원 */
  classroom: [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80&auto=format&fit=crop',
  ],
  /** 시간표·계획·일정 관리 */
  planning: [
    'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80&auto=format&fit=crop',
  ],
  /** 협업·팀워크 */
  collaboration: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop',
  ],
  /** 학습·도서·연구 */
  study: [
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80&auto=format&fit=crop',
  ],
  /** 소프트웨어·업데이트·데이터 */
  technology: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80&auto=format&fit=crop',
  ],
  /** 교사·강의·발표 */
  teaching: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=800&q=80&auto=format&fit=crop',
  ],
  /** 번아웃 예방·웰니스·워크라이프 밸런스·자기관리 */
  wellness: [
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=80&auto=format&fit=crop',
  ],
}

/**
 * 글 제목·카테고리 키워드를 분석하여 가장 어울리는 Unsplash 이미지 URL 반환
 * @param {string} title - 글 제목
 * @param {string} category - 글 카테고리
 * @returns {string} Unsplash 이미지 URL
 */
function pickImage(title, category) {
  const text = `${title} ${category}`.toLowerCase()

  let pool
  if (/업데이트|출시|기능|신기능|버전/.test(text)) {
    pool = IMAGE_POOL.technology
  } else if (/협업|공동편집|팀|실무사|지원인력|배정/.test(text)) {
    pool = IMAGE_POOL.collaboration
  } else if (/시간표|일정|계획|스케줄|시수|편성/.test(text)) {
    pool = IMAGE_POOL.planning
  } else if (/수업|학급|교실|학생|장애|특수교육/.test(text)) {
    pool = IMAGE_POOL.classroom
  } else if (/번아웃|wellnes|스트레스|예방|균형|자기관리|워크라이프|힐링/.test(text)) {
    pool = IMAGE_POOL.wellness
  } else if (/교사|강의|발표|안내|공지/.test(text)) {
    pool = IMAGE_POOL.teaching
  } else {
    pool = IMAGE_POOL.study
  }

  // 풀에서 랜덤 선택
  return pool[Math.floor(Math.random() * pool.length)]
}

// ── 주제 영감 풀 ────────────────────────────────────────────────────────────────
const TOPIC_POOL = [
  '특수교육 시수 계산 오류를 줄이는 실전 방법',
  'IEP 개별화교육계획 작성 시 시간표 연계 노하우',
  '원적학급 통합교육 시간표 조율 완벽 가이드',
  '특수학급 학기말 시간표 아카이빙 체크리스트',
  '특수교육 협력교수 시간표 편성 시 주의사항',
  '장애학생 방과후 프로그램 시간표 운영 팁',
  '특수학급 전입·전출 시 시간표 인수인계 방법',
  '특수교육 관련서비스 시간표 반영 방법',
  '중학교 특수학급 시간표의 특수성과 편성 기준',
  '고등학교 특수학급 학점 기반 시수 관리 방법',
  '특수교육 보조인력 공정 배분을 위한 기준표 만들기',
  '개학 첫 주 특수학급 시간표 세팅 완벽 가이드',
  '특수교사 업무 경감을 위한 디지털 자동화 도구',
  '특수학급 현장체험학습 시 시간표 임시 조정법',
  '개별화전환교육계획(ITP)과 시간표 연계하기',
  '특수학급 신설 첫 해 시간표 구축 A to Z',
  '특수교육 대상학생 수 변동 시 시수 재조정 방법',
  '특수교사 초임 시절 흔히 저지르는 시간표 실수 5가지',
  '특수학급 학생 개인별 시간표 출력물 관리 방법',
  '특수교육 행정업무와 수업 시간표 병행 관리 전략',
  '특수학급 1학기·2학기 시간표 연속성 유지 방법',
  '특수교사와 특수교육 실무사 협업 시간표 조율 노하우',
]

// ── 유틸 ────────────────────────────────────────────────────────────────────────
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function escapeForTs(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function escapeForTemplateLiteral(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
}

// ── 메인 ────────────────────────────────────────────────────────────────────────
async function main() {
  // 1. 기존 news.ts 읽기
  const currentContent = readFileSync(CONTENT_PATH, 'utf-8')

  // 2. 기존 제목·슬러그 추출
  const existingTitles = [...currentContent.matchAll(/title:\s*'([^']+)'/g)].map((m) => m[1])
  const existingSlugs = [...currentContent.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

  console.log(`📋 기존 글 수: ${existingTitles.length}개`)
  console.log(`   기존 슬러그: ${existingSlugs.join(', ')}`)

  // 3. 오늘 날짜 (KST = UTC+9)
  const now = new Date()
  now.setTime(now.getTime() + 9 * 60 * 60 * 1000)
  const dateStr = now.toISOString().split('T')[0]

  // 4. 주제 힌트 5개 랜덤 선택
  const hints = shuffle(TOPIC_POOL).slice(0, 5)

  // 5. Claude 프롬프트 구성
  const prompt = `당신은 피어링(Peering) SEO 콘텐츠 전문 작가입니다.
피어링은 특수학급 시간표 제작과 시수 관리를 돕는 특수교사 전용 업무 솔루션입니다.

─── 이미 작성된 글 제목 (반드시 피하세요) ───
${existingTitles.map((t) => `• ${t}`).join('\n')}

─── 주제 영감 풀 (이 중 하나를 선택하거나 비슷한 신규 주제를 자유롭게 정하세요) ───
${hints.map((t) => `• ${t}`).join('\n')}

─── 출력 형식 ───
아래 JSON을 반드시 \`\`\`json ... \`\`\` 코드 블록으로 감싸서 응답하세요:

{
  "slug": "영소문자와-하이픈만-사용-30자이내",
  "title": "SEO 제목 (40자 이내, '특수교육'/'특수학급'/'피어링' 중 1개 이상 포함)",
  "date": "${dateStr}",
  "category": "팁 & 노하우",
  "excerpt": "카드 요약 (80자 이내, 검색 키워드를 자연스럽게 포함)",
  "readTime": 읽는시간(3~7 사이 정수),
  "content": "풍성한 HTML 콘텐츠"
}

─── content 작성 규칙 ───
• <h2>로 시작, <h3>로 섹션 구분, <p>/<ul>/<li>/<strong> 적극 활용
• 최소 600자 이상의 실용적인 내용
• 마지막 단락에 피어링 솔루션을 자연스럽게 언급하며 마무리
• 전문적이고 정중한 특수교사 어조
• ⚠️ 백틱(\`) 문자 절대 사용 금지 — 단어 강조는 <strong> 태그로 대체
• ⚠️ HTML 엔티티(\&amp; 등) 사용 금지, 한글 특수문자 직접 사용`

  console.log('\n🤖 Claude API 호출 중...')

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  })

  const responseText = message.content[0].text
  console.log('📄 Claude 응답 수신 완료')

  // 6. JSON 파싱
  const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/)
  if (!jsonMatch) {
    console.error('❌ JSON 코드 블록을 찾을 수 없습니다. Claude 응답:')
    console.error(responseText)
    process.exit(1)
  }

  let post
  try {
    post = JSON.parse(jsonMatch[1])
  } catch (err) {
    console.error('❌ JSON 파싱 오류:', err.message)
    console.error('원본 JSON:', jsonMatch[1])
    process.exit(1)
  }

  // 7. 필수 필드 검증
  const required = ['slug', 'title', 'date', 'category', 'excerpt', 'readTime', 'content']
  for (const field of required) {
    if (post[field] === undefined || post[field] === '') {
      console.error(`❌ 필수 필드 누락: ${field}`)
      process.exit(1)
    }
  }

  // 8. 슬러그 중복 체크
  if (existingSlugs.includes(post.slug)) {
    console.error(`❌ 중복 슬러그 감지: "${post.slug}" — 스크립트를 재실행하세요.`)
    process.exit(1)
  }

  // 9. excerpt 80자 초과 시 자동 자름
  if (post.excerpt.length > 80) {
    console.warn(`⚠️  excerpt ${post.excerpt.length}자 → 80자로 자름`)
    post.excerpt = post.excerpt.slice(0, 79) + '…'
  }

  // 10. 이미지 자동 배정 (제목·카테고리 키워드 분석)
  post.image = pickImage(post.title, post.category)
  console.log(`\n🖼️  이미지 배정: ${post.image}`)

  // 11. TypeScript 소스 코드 생성
  const postTs = `
  {
    slug: '${escapeForTs(post.slug)}',
    title: '${escapeForTs(post.title)}',
    date: '${post.date}',
    category: '${escapeForTs(post.category)}',
    excerpt:
      '${escapeForTs(post.excerpt)}',
    readTime: ${Number(post.readTime)},
    image: '${post.image}',
    content: \`
${escapeForTemplateLiteral(post.content)}
    \`.trim(),
  },`

  // 12. news.ts에 첫 번째 요소로 삽입
  const MARKER = 'export const newsPosts: NewsPost[] = ['
  const markerIndex = currentContent.indexOf(MARKER)

  if (markerIndex === -1) {
    console.error('❌ newsPosts 배열 마커를 찾을 수 없습니다. news.ts 구조를 확인하세요.')
    process.exit(1)
  }

  const insertAt = markerIndex + MARKER.length
  const newContent =
    currentContent.slice(0, insertAt) + postTs + currentContent.slice(insertAt)

  writeFileSync(CONTENT_PATH, newContent, 'utf-8')

  // 13. 결과 출력
  console.log('\n✅ 새 글 추가 완료!')
  console.log(`   제목     : ${post.title}`)
  console.log(`   슬러그   : ${post.slug}`)
  console.log(`   날짜     : ${post.date}`)
  console.log(`   카테고리 : ${post.category}`)
  console.log(`   읽는 시간: ${post.readTime}분`)
  console.log(`   이미지   : ${post.image}`)
  console.log(`\n📍 URL 경로: /news/${post.slug}`)
}

main().catch((err) => {
  // 크레딧 부족 오류는 워크플로우를 실패시키지 않고 경고만 출력
  if (err?.status === 400 && err?.error?.error?.message?.includes('credit balance')) {
    console.warn('⚠️  Anthropic API 크레딧이 부족합니다.')
    console.warn('   해결 방법: https://console.anthropic.com → Plans & Billing → 크레딧 충전')
    console.warn('   이번 실행은 건너뜁니다. 크레딧 충전 후 다시 실행해 주세요.')
    process.exit(0) // 워크플로우를 실패(❌)가 아닌 정상 종료로 처리
  }
  console.error('❌ 예상치 못한 오류:', err)
  process.exit(1)
})
