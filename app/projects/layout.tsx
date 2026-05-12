import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects — Ilia Duda',
  description: 'Options trading engine, CloseBooks AI SaaS, Yandex Afisha analytics, quantitative finance research.',
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
