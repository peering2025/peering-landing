/**
 * 피어링 SEO 자동화 스크립트 (글로벌 SEO·GEO 대응: 한국어 + 영어 동시 생성)
 * ─────────────────────────────────────────────────────────────────────────────
 * 실행: scripts/ 디렉토리에서 `node generate-seo-content.mjs`
 * 환경변수: OPENAI_API_KEY
 *
 * 동작:
 *   1. src/content/news.ts를 읽어 기존 제목·슬러그 추출 (중복 방지)
 *   2. 주제 풀에서 랜덤 힌트 5개를 선택해 OpenAI에 전달
 *   3. OpenAI가 한국어 + 영어 완전한 NewsPost JSON 동시 생성
 *   4. 글 주제 키워드로 Unsplash 이미지 자동 배정
 *   5. news.ts의 newsPosts 배열 맨 앞에 한국어 글 삽입
 *   6. news-en.ts의 newsPostsEn 객체 맨 앞에 영어 번역 삽입
 * ─────────────────────────────────────────────────────────────────────────────
 */

import OpenAI from 'openai'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

// ── 경로 설정 ──────────────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url))
const CONTENT_PATH = join(__dirname, '../src/content/news.ts')
const CONTENT_EN_PATH = join(__dirname, '../src/content/news-en.ts')

// ── OpenAI 클라이언트 ────────────────────────────────────────────────────────────
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

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
  // ── 해외 연구·논문 기반 정보성 주제 ──────────────────────────────────────────
  {
    hint: '미국·유럽 특수교육 연구: UDL(보편적 학습설계) 최신 적용 사례와 국내 시사점',
    category: '해외 연구 동향',
  },
  {
    hint: '에듀테크와 특수교육: AAC(보완대체의사소통) 앱 활용 해외 논문 리뷰',
    category: '팁 & 노하우',
  },
  {
    hint: '핀란드·싱가포르 통합교육 모델 분석 — 한국 특수학급에 적용 가능한 전략',
    category: '해외 연구 동향',
  },
  {
    hint: 'AI 보조교사 기술이 특수교육 현장에 가져오는 변화 — 해외 파일럿 사례 분석',
    category: '팁 & 노하우',
  },
  {
    hint: '자폐 스펙트럼 학생 대상 소셜스킬 훈련 디지털화 — 최신 해외 연구 동향',
    category: '해외 연구 동향',
  },
  {
    hint: '학습장애 학생을 위한 멀티미디어 교수법 효과성 메타분석 (2020~2024)',
    category: '해외 연구 동향',
  },
  {
    hint: '미국 IDEA(장애인교육법) 2024 개정 내용과 한국 특수교육법 비교',
    category: '해외 연구 동향',
  },
  {
    hint: '게이미피케이션을 활용한 특수교육 수업 설계 — 해외 성공 사례와 실천 팁',
    category: '팁 & 노하우',
  },
  {
    hint: 'VR·AR 기술을 활용한 장애학생 직업훈련 — 해외 연구 및 국내 도입 가능성',
    category: '팁 & 노하우',
  },
  {
    hint: '긍정적 행동지원(PBS) 학교 전체 적용 사례 — 미국·호주 연구 기반 실천 가이드',
    category: '해외 연구 동향',
  },

  // ── 국내 통합교육·현장 이슈 ──────────────────────────────────────────────────
  {
    hint: '2024~2025 국내 통합교육 실태조사 결과로 본 특수교사의 현실과 과제',
    category: '팁 & 노하우',
  },
  {
    hint: '원적학급 담임과의 협력 수업 성공 사례 — 실제 특수교사 인터뷰 기반',
    category: '팁 & 노하우',
  },
  {
    hint: '국내 특수학교·특수학급 에듀테크 도입 현황과 교사 인식 조사',
    category: '팁 & 노하우',
  },
  {
    hint: '2025 특수교육 연간 계획 수립 시 꼭 반영해야 할 교육부 지침 변경사항',
    category: '해외 연구 동향',
  },
  {
    hint: '중증 장애학생 방과후 프로그램 질 제고를 위한 국내 우수 사례',
    category: '팁 & 노하우',
  },
  {
    hint: '특수교사 소진(번아웃) 예방 — 국내 설문 데이터로 본 원인과 대응 전략',
    category: '팁 & 노하우',
  },
  {
    hint: '전환교육 우수 사례: 고등학교 특수학급에서 직업교육까지 연계한 학교 이야기',
    category: '팁 & 노하우',
  },
  {
    hint: '장애학생 인권 침해 예방 교육 — 특수교사가 알아야 할 법적 기준과 실천 방법',
    category: '해외 연구 동향',
  },
  {
    hint: '특수교육 지원센터 활용법 — 잘 모르고 지나치는 교사 지원 서비스 총정리',
    category: '팁 & 노하우',
  },
  {
    hint: '국내 특수교육 예산 현황과 교육청별 지원 격차 — 특수교사가 알아야 할 현실',
    category: '해외 연구 동향',
  },

]

// ── 피어링 관련 주제 풀 (시간표·업무 노하우) ────────────────────────────────────
const TOPIC_POOL_PEERING = [
  { hint: 'IEP 개별화교육계획 작성 시 시간표 연계 노하우', category: '팁 & 노하우' },
  { hint: '특수교육 협력교수 시간표 편성 시 주의사항과 성공 전략', category: '팁 & 노하우' },
  { hint: '특수교사 업무 경감을 위한 디지털 자동화 도구 비교', category: '팁 & 노하우' },
  { hint: '특수학급 신설 첫 해 시간표 구축 A to Z', category: '팁 & 노하우' },
  { hint: '특수교육 보조인력 공정 배분을 위한 기준표 만들기', category: '팁 & 노하우' },
  { hint: '원적학급 통합교육 시간표 조율 완벽 가이드', category: '팁 & 노하우' },
  { hint: '특수학급 전입·전출 시 시간표 인수인계 방법', category: '팁 & 노하우' },
  { hint: '개학 첫 주 특수학급 시간표 세팅 완벽 가이드', category: '팁 & 노하우' },
  { hint: '고등학교 특수학급 학점 기반 시수 관리 방법', category: '팁 & 노하우' },
  { hint: '특수교사와 특수교육 실무사 협업 시간표 조율 노하우', category: '팁 & 노하우' },
  { hint: '특수교육 시수 계산 오류를 줄이는 실전 방법', category: '팁 & 노하우' },
  { hint: '특수학급 현장체험학습 시 시간표 임시 조정법', category: '팁 & 노하우' },
  { hint: '개별화전환교육계획(ITP)과 시간표 연계하기', category: '팁 & 노하우' },
  { hint: '특수교사 초임 시절 흔히 저지르는 시간표 실수 5가지', category: '팁 & 노하우' },
  { hint: '특수학급 1학기·2학기 시간표 연속성 유지 방법', category: '팁 & 노하우' },
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

// ── 플래그 파싱 ─────────────────────────────────────────────────────────────────
const isDryRun = process.argv.some((a) => a === '--dry-run=true' || a === '--dry-run')
// --type=info 또는 --type=peering 으로 요일 로직 강제 오버라이드 가능
const typeArg = (process.argv.find((a) => a.startsWith('--type=')) || '').replace('--type=', '')
if (isDryRun) console.log('🔍 dry-run 모드: 파일에 쓰지 않습니다.')

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

  // 4. 요일 기반 글 타입 결정: 월·수 = 정보성, 금 = 피어링 팁
  //    (KST 기준 요일: 0=일, 1=월, 2=화, 3=수, 4=목, 5=금, 6=토)
  //    --type=info 또는 --type=peering 으로 강제 오버라이드 가능
  const dayOfWeek = now.getUTCDay() // now는 이미 KST 보정됨
  const isPeeringPost = typeArg === 'peering' ? true
    : typeArg === 'info' ? false
    : dayOfWeek === 5 // 금요일
  const postTypeLabel = isPeeringPost ? '피어링 활용 팁 & 노하우' : '정보성 (연구·사례·이슈)'

  console.log(`📅 오늘 요일: ${['일','월','화','수','목','금','토'][dayOfWeek]} → 글 타입: ${postTypeLabel}`)

  const activePool = isPeeringPost ? TOPIC_POOL_PEERING : TOPIC_POOL
  const selectedTopics = shuffle(activePool).slice(0, 4)

  // 5. OpenAI 프롬프트 구성
  const peeringPromptSection = isPeeringPost ? `
─── 글의 방향성: 피어링 활용 팁 & 노하우 ───
• 특수학급 시간표 편성, 시수 관리, 피어링 기능 활용을 중심으로 작성하세요.
• 현장에서 바로 써먹을 수 있는 구체적인 방법과 절차를 단계별로 설명하세요.
• 피어링 솔루션을 자연스럽게 중심에 두되, 광고성이 아닌 실용 가이드 형식으로 작성하세요.
• "~해야 합니다" 식의 뻔한 조언 나열 금지. 특수교사가 "이 방법 진짜 유용하다"고 느낄 실전 노하우를 담으세요.` : `
─── 글의 방향성: 정보성 콘텐츠 (연구·사례·이슈) ───
• 단순한 팁 나열이 아닌, 특수교사가 실제로 유용하다고 느낄 깊이 있는 정보성 콘텐츠를 작성하세요.
• 해외 연구·논문, 국내 통합교육 사례, 에듀테크 트렌드 등을 다룰 때는 구체적인 연구 결과, 수치, 사례를 포함하세요.
• "~해야 합니다" 식의 뻔한 조언 나열 금지. 현장 특수교사가 "이런 내용은 처음 알았다"고 느낄 만한 인사이트를 담으세요.
• 피어링 홍보는 마지막 1~2문장에만, 자연스럽게 언급하세요 (전체 글의 주제가 되어선 안 됩니다).`

  const contentRules = isPeeringPost ? `
• <h2>로 시작, <h3>로 섹션 구분, <p>/<ul>/<li>/<strong> 적극 활용
• 최소 900자 이상
• 도입부: 특수교사가 겪는 구체적 어려움 → 본문: 단계별 해결 방법 → 마무리: 피어링으로 더 쉽게 해결 가능함을 자연스럽게 언급
• 구체적인 수치, 예시 상황, 화면 흐름 설명 등을 포함하면 더욱 좋음` : `
• <h2>로 시작, <h3>로 섹션 구분, <p>/<ul>/<li>/<strong> 적극 활용
• 최소 900자 이상 (해외 연구·사례 주제는 1,200자 이상 권장)
• 해외 연구·논문 주제: 연구 배경 → 핵심 발견 → 한국 현장 적용 시사점 구조로 작성
• 국내 사례 주제: 문제 상황 → 접근 방법 → 결과 → 다른 학교 적용 포인트 구조로 작성
• 구체적인 수치·연구명·기관명이 있으면 더욱 좋음 (단, 확실한 사실만)
• 마지막 1~2문장에만 피어링을 자연스럽게 언급`

  const prompt = `당신은 특수교육 전문 저널리스트이자 피어링(Peering) 콘텐츠 에디터입니다.
피어링은 특수학급 시간표 제작과 시수 관리를 돕는 특수교사 전용 업무 솔루션입니다.
${peeringPromptSection}

─── 이미 작성된 글 제목 (반드시 피하세요) ───
${existingTitles.map((t) => `• ${t}`).join('\n')}

─── 오늘의 주제 힌트 (이 중 하나를 선택하거나, 같은 계열의 더 좋은 주제를 자유롭게 정하세요) ───
${selectedTopics.map((t) => `• [${t.category}] ${t.hint}`).join('\n')}

─── 출력 형식 ───
아래 JSON을 반드시 \`\`\`json ... \`\`\` 코드 블록으로 감싸서 응답하세요.
한국어(title/excerpt/content)와 영어(title_en/excerpt_en/content_en)를 모두 포함하세요:

{
  "slug": "lowercase-english-and-hyphens-only-max-50chars (⚠️ MUST be English a-z and hyphens ONLY — NO Korean characters)",
  "title": "한국어 제목 (45자 이내)",
  "title_en": "English title (65 chars max)",
  "date": "${dateStr}",
  "category": "${isPeeringPost ? '팁 & 노하우' : '선택한 주제의 카테고리 (반드시 다음 4개 중 하나만 사용: 팁 & 노하우 / 업데이트 / 공지사항 / 해외 연구 동향)'}",
  "excerpt": "한국어 요약 (80자 이내, 글의 핵심 인사이트가 드러나게)",
  "excerpt_en": "English summary (100 chars max)",
  "readTime": 읽는시간(4~8 사이 정수),
  "content": "깊이 있는 한국어 HTML 콘텐츠",
  "content_en": "Rich English HTML content (same structure, fully translated)"
}

─── content / content_en 작성 규칙 ───
${contentRules}
• ⚠️ 백틱(\`) 문자 절대 사용 금지 — 단어 강조는 <strong> 태그로 대체
• ⚠️ HTML 엔티티(\\&amp; 등) 사용 금지, 특수문자 직접 사용
• ✅ 본문 마지막에 반드시 아래 둘 중 하나를 포함하세요:

  [옵션 A] 핵심 인사이트 요약 박스:
  <div class="summary-box" style="background:#FFFDE0;border-left:4px solid #FFCC00;padding:1.25rem 1.5rem;border-radius:0.75rem;margin-top:2rem;">
    <strong style="font-size:1rem;">📌 특수교사를 위한 핵심 인사이트</strong>
    <ul style="margin-top:0.75rem;padding-left:1.25rem;">
      <li>인사이트 1</li>
      <li>인사이트 2</li>
      <li>인사이트 3</li>
    </ul>
  </div>

  [옵션 B] 현장 적용 체크리스트 박스:
  <div class="checklist-box" style="background:#F0FDF4;border-left:4px solid #22C55E;padding:1.25rem 1.5rem;border-radius:0.75rem;margin-top:2rem;">
    <strong style="font-size:1rem;">✅ 현장 적용 체크리스트</strong>
    <ul style="margin-top:0.75rem;padding-left:1.25rem;list-style:none;">
      <li>☐ 적용 항목 1</li>
      <li>☐ 적용 항목 2</li>
      <li>☐ 적용 항목 3</li>
    </ul>
  </div>

  content_en도 동일한 박스를 영어로 번역하여 포함하세요.`

  console.log('\n🤖 OpenAI API 호출 중...')

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
  })
  const responseText = completion.choices[0].message.content
  console.log('📄 OpenAI 응답 수신 완료')

  // 6. JSON 파싱
  const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/)
  if (!jsonMatch) {
    console.error('❌ JSON 코드 블록을 찾을 수 없습니다. OpenAI 응답:')
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
  const required = ['slug', 'title', 'date', 'category', 'excerpt', 'readTime', 'content',
                    'title_en', 'excerpt_en', 'content_en']
  for (const field of required) {
    if (post[field] === undefined || post[field] === '') {
      console.warn(`⚠️  필드 누락: ${field} (계속 진행)`)
    }
  }
  // 한국어 필수 필드만 하드 체크
  for (const field of ['slug', 'title', 'date', 'category', 'excerpt', 'readTime', 'content']) {
    if (post[field] === undefined || post[field] === '') {
      console.error(`❌ 한국어 필수 필드 누락: ${field}`)
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
  if (post.excerpt_en && post.excerpt_en.length > 100) {
    post.excerpt_en = post.excerpt_en.slice(0, 99) + '…'
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

  if (!isDryRun) {
    writeFileSync(CONTENT_PATH, newContent, 'utf-8')
  } else {
    console.log('\n[dry-run] news.ts 쓰기 건너뜀')
  }

  // 13. 영어 번역을 news-en.ts에 삽입
  if (post.title_en && post.excerpt_en && post.content_en) {
    const currentEnContent = readFileSync(CONTENT_EN_PATH, 'utf-8')
    const EN_MARKER = 'export const newsPostsEn: Record<string, NewsPostEn> = {'
    const enMarkerIndex = currentEnContent.indexOf(EN_MARKER)

    if (enMarkerIndex === -1) {
      console.warn('⚠️  news-en.ts 마커를 찾을 수 없습니다. 영문 삽입을 건너뜁니다.')
    } else {
      const enPostTs = `
  '${escapeForTs(post.slug)}': {
    title: '${escapeForTs(post.title_en)}',
    excerpt:
      '${escapeForTs(post.excerpt_en)}',
    content: \`
${escapeForTemplateLiteral(post.content_en)}
    \`.trim(),
  },`

      const enInsertAt = enMarkerIndex + EN_MARKER.length
      const newEnContent =
        currentEnContent.slice(0, enInsertAt) + enPostTs + currentEnContent.slice(enInsertAt)
      if (!isDryRun) {
        writeFileSync(CONTENT_EN_PATH, newEnContent, 'utf-8')
        console.log(`\n🌐 영문 번역 저장 완료: ${post.title_en}`)
      } else {
        console.log(`\n[dry-run] news-en.ts 쓰기 건너뜀 (${post.title_en})`)
      }
    }
  } else {
    console.warn('⚠️  영문 필드(title_en/excerpt_en/content_en) 없음 — news-en.ts 업데이트 건너뜁니다.')
  }

  // 14. 결과 출력
  console.log('\n✅ 새 글 추가 완료!')
  console.log(`   제목 (KO): ${post.title}`)
  console.log(`   제목 (EN): ${post.title_en || '(미생성)'}`)
  console.log(`   슬러그   : ${post.slug}`)
  console.log(`   날짜     : ${post.date}`)
  console.log(`   카테고리 : ${post.category}`)
  console.log(`   읽는 시간: ${post.readTime}분`)
  console.log(`   이미지   : ${post.image}`)
  console.log(`\n📍 KO URL: /news/${post.slug}`)
  console.log(`📍 EN URL: /en/news/${post.slug}`)
}

main().catch((err) => {
  // 할당량 초과 오류는 워크플로우를 실패(❌)로 표시하여 이메일 알림을 받도록 처리
  if (err?.status === 429 || err?.message?.includes('quota') || err?.message?.includes('rate limit')) {
    console.error('❌ OpenAI API 할당량이 초과되었습니다.')
    console.error('   해결 방법: https://platform.openai.com/usage → 사용량 및 한도 확인')
    console.error('   다음 예약 실행 시 자동 재시도됩니다.')
    process.exit(1) // 워크플로우를 실패로 표시 → GitHub에서 이메일 알림 발송
  }
  console.error('❌ 예상치 못한 오류:', err)
  process.exit(1)
})
