import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects } from '@/lib/data'
import { ProjectDetail } from '@/components/ProjectDetail'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = projects.find(p => p.slug === slug)
  if (!p) return {}
  return { title: `${p.title} — Ilia Duda`, description: p.description }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const p = projects.find(pr => pr.slug === slug)
  if (!p) notFound()
  const idx = projects.findIndex(pr => pr.slug === slug)
  const next = projects[(idx + 1) % projects.length]
  return <ProjectDetail project={p} nextSlug={next.slug} nextTitle={next.title} />
}
