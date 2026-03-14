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
    '복잡한 특수학급 시간표를 1분 만에 완성하세요. 시수 자동 조율, 팀 공동편집, 스마트 아카이빙까지 — 특수교사를 위한 올인원 일정 관리 솔루션.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
