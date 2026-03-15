---
name: peering-news
description: 피어링 서비스의 SEO 최적화 뉴스를 생성하고 업로드합니다. 주제 선정부터 코드 반영까지 한 번에 수행합니다.
argument-hint: [주제 또는 키워드]
allowed-tools: Bash, Write, Read
---

# Peering News Generation Skill

이 skill은 특수교사를 위한 전문 콘텐츠를 생성하고 사이트에 즉시 반영합니다.

## 작업 순서

### 단계 1 — 주제 분석

- 인수(`$ARGUMENTS`)가 전달된 경우: 해당 주제/키워드를 중심으로 글을 기획한다.
- 인수가 없는 경우: `scripts/generate-seo-content.mjs` 파일의 `TOPIC_POOL` 배열을 Read로 읽어, 기존 `src/content/news.ts`에 없는 미개척 주제 하나를 선정한다.

선정 기준:
- 네이버에서 검색량이 있을 법한 구체적인 롱테일 키워드
- 기존 5개 글과 주제가 겹치지 않을 것
- 특수교사의 실제 업무 페인 포인트를 다룰 것

### 단계 2 — 콘텐츠 생성

`src/content/news.ts`의 `NewsPost` 타입 형식을 엄격히 준수한다.

```typescript
{
  slug: string        // 영소문자-하이픈만, 30자 이내
  title: string       // 40자 이내, SEO 키워드 포함
  date: string        // YYYY-MM-DD (오늘 날짜)
  category: '팁 & 노하우' | '업데이트' | '공지사항'
  excerpt: string     // 80자 이내 (네이버 SEO 규칙 엄수)
  readTime: number    // 3~7 사이 정수
  image: string       // IMAGE_POOL에서 주제에 맞는 Unsplash URL 선택
  content: string     // 풍성한 HTML (h2/h3/p/ul/li/strong, 최소 600자)
}
```

content 작성 규칙:
- `<h2>`로 시작, `<h3>`로 섹션 구분
- `<p>`, `<ul>`, `<li>`, `<strong>` 적극 활용
- 마지막 단락에 피어링 솔루션 자연스럽게 언급
- 전문적이고 정중한 특수교사 어조 유지
- **백틱(`) 문자 절대 사용 금지** — 강조는 `<strong>` 태그로 대체

image 선택 기준 (`scripts/generate-seo-content.mjs`의 `IMAGE_POOL` 참고):
- 배정/협업 관련 → collaboration 풀
- 시간표/계획 관련 → planning 풀
- 수업/학생 관련 → classroom 풀
- 업데이트/기술 관련 → technology 풀
- 교사/강의 관련 → teaching 풀
- 그 외 → study 풀

### 단계 3 — 코드 반영

`src/content/news.ts` 파일을 Read로 읽은 뒤,
`export const newsPosts: NewsPost[] = [` 마커 바로 뒤에
새 객체를 **첫 번째 요소**로 삽입하여 Write로 파일을 업데이트한다.

주의사항:
- 기존 글 데이터를 절대 삭제하거나 수정하지 말 것
- content 필드는 반드시 템플릿 리터럴(\`...\`)로 감싸고 `.trim()` 적용
- TypeScript 문법 오류가 없도록 따옴표·백틱 이스케이프 확인

### 단계 4 — 검증

```bash
npm run build
```

빌드 실패 시:
- 오류 메시지를 분석하여 TypeScript/HTML 문법 오류를 수정한다.
- 수정 후 재빌드하여 반드시 성공을 확인한다.

### 단계 5 — 배포

빌드 성공 후 아래 순서로 커밋·푸시한다.

```bash
git add src/content/news.ts
git commit -m "feat: SEO 콘텐츠 자동 업로드 — {글 제목}"
git push origin master
```

## 완료 보고

작업 완료 후 다음 항목을 사용자에게 보고한다:
- 제목, 슬러그, 카테고리, 날짜
- 선택한 이미지 URL
- 빌드 결과 (페이지 수)
- 배포된 URL 경로 (`/news/{slug}`)
