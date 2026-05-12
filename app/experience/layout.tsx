import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experience — Ilia Duda',
  description: 'Investment banking at BCS Bank, options trading infrastructure at Glacier Capital, founding CloseBooks AI, and Young Enterprise UK National Winner.',
}

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
