import type { NewsCategory } from '@/content/news'

export const categoryColors: Record<NewsCategory, string> = {
  '업데이트': 'bg-blue-100 text-blue-700',
  '팁 & 노하우': 'bg-[#FFCC00]/20 text-[#7A5E00]',
  '공지사항': 'bg-gray-100 text-gray-600',
  '해외 연구 동향': 'bg-green-100 text-green-700',
}

export const categoryLabelsEn: Record<NewsCategory, string> = {
  '업데이트': 'Updates',
  '팁 & 노하우': 'Tips & How-To',
  '공지사항': 'Announcements',
  '해외 연구 동향': 'Global Research Trends',
}

export function formatDate(dateStr: string, locale: 'ko' | 'en' = 'ko'): string {
  const [year, month, day] = dateStr.split('-')
  if (locale === 'en') {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ]
    return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`
  }
  return `${year}년 ${month}월 ${day}일`
}

/** 이미지가 없는 글에 사용할 기본 fallback 이미지 */
export const DEFAULT_NEWS_IMAGE =
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80&auto=format&fit=crop'
