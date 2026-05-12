import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { experience } from '@/lib/data'
import { ExperienceDetail } from '@/components/ExperienceDetail'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return experience.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const exp = experience.find(e => e.slug === slug)
  if (!exp) return {}
  return { title: `${exp.company} — Ilia Duda`, description: exp.headline }
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params
  const exp = experience.find(e => e.slug === slug)
  if (!exp) notFound()
  const idx = experience.findIndex(e => e.slug === slug)
  const next = experience[(idx + 1) % experience.length]
  return <ExperienceDetail exp={exp} nextSlug={next.slug} nextCompany={next.company} />
}
