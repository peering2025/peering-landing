import type { ReactNode } from 'react'

export default function EnglishLayout({ children }: { children: ReactNode }) {
  // Note: lang="en" is ideally set here. For full per-route lang support,
  // migrate to [locale] dynamic routing with next-intl.
  return <>{children}</>
}
