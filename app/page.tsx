import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { ValueProp } from '@/components/home/ValueProp'
import { ExperiencePreview } from '@/components/home/ExperiencePreview'
import { ProjectsPreview } from '@/components/home/ProjectsPreview'
import { HomeCTA } from '@/components/home/HomeCTA'

export const metadata: Metadata = {
  title: 'Ilia Duda — Quantitative Finance & AI Engineering',
  description: 'Mathematics & Business student at Northeastern University. Building at the intersection of financial markets and machine intelligence.',
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ValueProp />
      <ExperiencePreview />
      <ProjectsPreview />
      <HomeCTA />
    </main>
  )
}
