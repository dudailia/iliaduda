import type { Metadata } from 'next'
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { SmoothScroll } from '@/components/SmoothScroll'

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', weight: ['400','500','600','700','800'], display: 'swap' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', weight: ['300','400','500'], display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', weight: ['400','500'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Ilia Duda — Quantitative Finance & AI Engineering',
  description: 'Mathematics & Business student at Northeastern University. Building at the intersection of financial markets and machine intelligence.',
  metadataBase: new URL('https://iliaduda.com'),
  openGraph: { title: 'Ilia Duda', description: 'Quantitative Finance & AI Engineering', url: 'https://iliaduda.com', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body>
        <SmoothScroll>
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
