import type { Metadata } from 'next'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SectionTag } from '@/components/ui/SectionTag'
import { ShutterTitle } from '@/components/ui/ShutterTitle'
import { ContactClient } from '@/components/contact/ContactClient'

export const metadata: Metadata = {
  title: 'Contact — Ilia Duda',
  description: 'Get in touch with Ilia Duda. Available for investment management co-ops and quantitative finance roles from July 2026.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--background)' }}>
      <div className="pt-24 pb-16 px-5 md:px-6 text-center">
        <div className="mx-auto" style={{ maxWidth: '1140px' }}>
          <AnimateIn>
            <SectionTag>CONTACT</SectionTag>
            <ShutterTitle
              className="font-display font-extrabold text-navy mt-2 mb-6 mx-auto"
              style={{ fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              Let&apos;s work together.
            </ShutterTitle>
          </AnimateIn>
        </div>
      </div>
      <ContactClient />
    </main>
  )
}
