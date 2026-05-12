import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experience — Ilia Duda',
  description: 'Finance and engineering experience: State Street Global Advisors, Glacier Capital Systems, CloseBooks, BCS Bank, and more.',
}

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
