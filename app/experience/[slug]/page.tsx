import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { experience } from '@/lib/data'
import { ExperiencePageClient } from '@/components/experience/ExperiencePageClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return experience.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const exp = experience.find(e => e.slug === slug)
  if (!exp) return {}
  return {
    title: `${exp.company} — ${exp.role} | Ilia Duda`,
    description: exp.summary,
  }
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params
  const exp = experience.find(e => e.slug === slug)
  if (!exp) notFound()
  return <ExperiencePageClient slug={slug} />
}
