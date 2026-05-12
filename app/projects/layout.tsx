import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects — Ilia Duda',
  description: 'Production systems, data analytics, and research: options trading infrastructure, AI SaaS, Yandex analytics, and more.',
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
