import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'About — Ilia Duda',
  description: 'Mathematics & Business student at Northeastern. Skills in Python, quantitative finance, AI engineering, and full-stack development.',
}
export default function AboutLayout({ children }: { children: React.ReactNode }) { return <>{children}</> }
