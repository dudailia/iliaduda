import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Experience — Ilia Duda',
  description: 'Investment management co-op at State Street, options trading at Glacier Capital, founding CloseBooks AI, investment banking at BCS Bank, Young Enterprise UK National Winner.',
}
export default function ExperienceLayout({ children }: { children: React.ReactNode }) { return <>{children}</> }
