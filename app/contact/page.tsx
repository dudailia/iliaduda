import type { Metadata } from 'next'
import { ContactClient } from '@/components/contact/ContactClient'

export const metadata: Metadata = {
  title: 'Contact — Ilia Duda',
  description: 'Get in touch with Ilia Duda. Open to co-op roles in investment management and quantitative finance for July 2026.',
}

export default function ContactPage() {
  return <ContactClient />
}
