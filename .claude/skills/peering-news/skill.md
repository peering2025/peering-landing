---
name: peering-news
description: 피어링 SEO 최적화 뉴스를 생성하고 사이트에 즉시 배포합니다. 주제 선정 → 콘텐츠 생성 → 이미지 배정 → 코드 반영 → 빌드 검증 → 커밋·푸시까지 전 과정을 자동 수행합니다.
argument-hint: "[주제 또는 키워드] (생략 시 주제 풀에서 자동 선정)"
allowed-tools: Bash, Write, Read
---

# /peering-news — 피어링 SEO 콘텐츠 자동 생성·배포 스킬

## 개요

이 스킬은 특수교사를 위한 SEO 최적화 뉴스 콘텐츠를 한 번의 명령으로 생성·배포합니다.
생성된 글은 /news 리스트(Featured + Grid)와 /news/[slug] 상세 페이지에 즉시 반영됩니다.

---

## 실행 절차

### Step 1 — 주제 분석

인수($ARGUMENTS)가 있는 경우: 전달된 키워드를 중심으로 제목, 슬러그, 콘텐츠 방향을 기획한다.
인수가 없는 경우: scripts/generate-seo-content.mjs의 TOPIC_POOL을 Read로 읽어온다.
src/content/news.ts의 기존 slug/title 목록과 대조하여 미개척 주제 하나를 선정한다.

주제 선정 기준:
- 네이버에서 구체적인 검색 수요가 있는 롱테일 키워드
- 기존 글과 주제가 겹치지 않을 것
- 특수교사의 실제 업무 페인 포인트(시간표, 시수, IEP, 협업 등)

---

### Step 2 — 콘텐츠 생성

src/content/news.ts의 NewsPost 타입을 정확히 준수하여 객체를 생성한다.

  slug      영소문자-하이픈만, 30자 이내
  title     40자 이내, 특수교육/특수학급/피어링 중 1개 이상 포함
  date      YYYY-MM-DD (오늘 날짜)
  category  팁 & 노하우 | 업데이트 | 공지사항
  excerpt   80자 이내 — 네이버 SEO 규칙 엄수, 검색 키워드 자연 포함
  readTime  3~7 사이 정수
  image     아래 이미지 배정 기준 참고
  content   풍성한 HTML (최소 600자, h2/h3/p/ul/li/strong 활용)

content 작성 규칙:
- h2로 시작, h3으로 섹션 구분
- p, ul, li, strong 적극 활용
- 결론 단락에 피어링 솔루션 자연스럽게 언급
- 전문적이고 정중한 특수교사 어조 유지
- 백틱 문자 절대 사용 금지 — 강조는 strong 태그로 대체

---

### Step 3 — 이미지 배정

scripts/generate-seo-content.mjs의 IMAGE_POOL에서 키워드로 카테고리를 판단하여 URL 선택.

  업데이트·출시·기능·버전       → technology 풀
  협업·공동편집·팀·실무사·배정  → collaboration 풀
  시간표·일정·계획·시수·편성    → planning 풀
  수업·학급·교실·학생·장애      → classroom 풀
  교사·강의·안내·공지           → teaching 풀
  그 외                         → study 풀

이미지는 /news Featured 카드(전체 너비 aspect-video), Grid 카드 썸네일,
상세 페이지 히어로, Open Graph 이미지로 동일하게 활용된다.

---

### Step 4 — 코드 반영

1. src/content/news.ts를 Read 도구로 읽는다.
2. "export const newsPosts: NewsPost[] = [" 마커를 찾는다.
3. 마커 바로 뒤에 새 객체를 첫 번째 요소로 삽입한다.
4. Write 도구로 전체 파일을 저장한다.

주의: 기존 글 데이터를 절대 삭제·수정하지 말 것.
content 필드는 템플릿 리터럴로 감싸고 .trim() 적용.

---

### Step 5 — 빌드 검증

  npm run build

빌드 실패 시 오류를 수정하고 재빌드하여 반드시 성공을 확인한다.

---

### Step 6 — 배포

  git add src/content/news.ts
  git commit -m "feat: SEO 콘텐츠 자동 업로드 — {글 제목}"
  git push origin master

---

## 완료 보고

작업 완료 후 사용자에게 아래 항목을 보고한다:
- 제목 / 슬러그 / 카테고리 / 날짜
- 선택된 이미지 URL
- 빌드 결과 (생성된 정적 페이지 수)
- 배포된 URL 경로: /news/{slug}

---

## 디자인 시스템 호환성

/news 리스트:
- 첫 번째 글(Featured): 전체 너비 카드, aspect-video 히어로 이미지
- 나머지 글(Grid): 3열 카드, aspect-video 썸네일
- hover: 이미지 scale + border-[#FFCC00] 강조

/news/[slug] 상세:
- 히어로 이미지: aspect-video, 최대 520px, 하단 그라데이션
- 본문: news-prose prose prose-lg
  h2: 골드(#8B6914) + 좌측 노란 포인트 바
  h3: 골드 색상 + 하단 노란 밑줄
  본문: #333333, line-height 1.9
- 하단: 목록으로 돌아가기 outline 버튼 + 카카오톡 CTA
