import type { Metadata } from 'next'
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ilia Duda — Quantitative Finance & AI Engineering',
  description:
    'Mathematics & Business student at Northeastern University. Options trading infrastructure engineer at Glacier Capital. Founder of CloseBooks AI. Incoming co-op at State Street Global Advisors. Targeting investment management and quant finance roles.',
  keywords: ['Ilia Duda', 'quantitative finance', 'AI', 'Northeastern University', 'Boston', 'investment management', 'options trading'],
  metadataBase: new URL('https://iliaduda.com'),
  openGraph: {
    title: 'Ilia Duda',
    description: 'Building at the intersection of financial markets and machine intelligence.',
    url: 'https://iliaduda.com',
    type: 'website',
  },
  robots: { index: true, follow: true },
  twitter: {
    card: 'summary_large_image',
    title: 'Ilia Duda — Quantitative Finance & AI Engineering',
    description: 'Building at the intersection of financial markets and machine intelligence.',
  },
  alternates: {
    canonical: 'https://iliaduda.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body bg-background text-ink">
        <ScrollProgress />
        <Nav />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Footer />
      </body>
    </html>
  )
}
