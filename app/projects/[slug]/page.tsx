import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { projects } from '@/lib/data'
import { BackButton } from '@/components/ui/BackButton'
import { AnimateIn } from '@/components/ui/AnimateIn'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — Ilia Duda`,
    description: project.summary,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)
  if (!project) notFound()

  const currentIndex = projects.findIndex(p => p.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <main className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Hero */}
      <div className="pt-20 pb-12 px-5 md:px-6" style={{ borderTop: `3px solid ${project.accentColor}` }}>
        <div className="mx-auto" style={{ maxWidth: '1140px' }}>
          <BackButton href="/projects" label="← All Projects" />
          <AnimateIn>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="font-mono uppercase" style={{ fontSize: '10px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 8px' }}>{project.type}</span>
              <span className="font-mono" style={{ fontSize: '11px', borderRadius: '4px', padding: '3px 8px', background: project.statusColor === 'green' ? '#F0FDF4' : 'var(--blue-light)', border: `1px solid ${project.statusColor === 'green' ? '#BBF7D0' : 'var(--blue-mid)'}`, color: project.statusColor === 'green' ? '#16A34A' : 'var(--blue)' }}>
                {project.status}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-navy mb-2" style={{ fontSize: 'clamp(28px, 5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{project.title}</h1>
            <p className="font-body italic text-ink-2 mb-4" style={{ fontSize: 'clamp(15px, 2vw, 17px)' }}>{project.subtitle}</p>
            <p className="font-body text-ink-2" style={{ fontSize: '16px', lineHeight: 1.65, maxWidth: '680px' }}>{project.description}</p>
          </AnimateIn>
        </div>
      </div>

      {/* Metrics */}
      <div className="py-8 px-5 md:px-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="mx-auto" style={{ maxWidth: '1140px' }}>
          <div className="grid grid-cols-3 gap-4">
            {project.metrics.map((m, i) => (
              <AnimateIn key={m.label} delay={i * 60}>
                <div className="p-4 md:p-5 rounded-lg text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="font-display font-bold text-navy" style={{ fontSize: 'clamp(16px, 3vw, 26px)', lineHeight: 1.2 }}>{m.value}</div>
                  <div className="font-body text-ink-3 mt-1" style={{ fontSize: '12px' }}>{m.label}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>

      {/* What I built */}
      <div className="py-16 px-5 md:px-6">
        <div className="mx-auto" style={{ maxWidth: '1140px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-12">

            {/* Left: what I built */}
            <div>
              <h2 className="font-display font-bold text-navy mb-6" style={{ fontSize: '24px' }}>What I built</h2>
              <div className="space-y-4">
                {project.whatIBuilt.map((item, i) => (
                  <AnimateIn key={i} delay={i * 70} direction="left">
                    <div className="p-5 md:p-6 rounded-xl" style={{ background: 'var(--surface)', borderLeft: `3px solid ${project.accentColor}`, border: '1px solid var(--border)', borderRadius: '0 12px 12px 0' }}>
                      <h3 className="font-display font-bold text-navy mb-2" style={{ fontSize: '16px' }}>{item.title}</h3>
                      <p className="font-body text-ink-2" style={{ fontSize: '15px', lineHeight: 1.7 }}>{item.body}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>

            {/* Right: tech stack + links */}
            <div className="space-y-5">
              <AnimateIn delay={80}>
                <div className="p-6 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <h3 className="font-display font-bold text-navy mb-4" style={{ fontSize: '15px' }}>Tech Stack</h3>
                  <div className="space-y-4">
                    {Object.entries(project.tech).map(([category, items]) => (
                      <div key={category}>
                        <p className="font-mono uppercase text-ink-3 mb-2" style={{ fontSize: '10px', letterSpacing: '0.06em' }}>{category}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {items.map((item: string) => (
                            <span key={item} className="font-mono" style={{ fontSize: '11px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '4px', padding: '3px 8px' }}>{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>

              {(project.links.live || project.links.github) && (
                <AnimateIn delay={140}>
                  <div className="p-6 rounded-xl space-y-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <h3 className="font-display font-bold text-navy mb-2" style={{ fontSize: '15px' }}>Links</h3>
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 font-body font-medium w-full rounded-lg transition-all duration-200"
                        style={{ color: 'white', background: project.accentColor, padding: '11px 20px', fontSize: '14px', borderRadius: '8px' }}
                      >
                        <ExternalLink size={14} /> Visit Live Site
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 font-body w-full rounded-lg transition-all duration-200 border border-border hover:border-blue hover:text-blue text-ink-2"
                        style={{ background: 'var(--surface-2)', padding: '11px 20px', fontSize: '14px', borderRadius: '8px' }}
                      >
                        <ExternalLink size={14} /> View on GitHub
                      </a>
                    )}
                  </div>
                </AnimateIn>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Next project */}
      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-2)' }}>
        <Link href={`/projects/${nextProject.slug}`}>
          <div
            className="mx-auto flex items-center justify-between px-5 md:px-6 py-6 group transition-colors duration-150"
            style={{ maxWidth: '1140px' }}
          >
            <span className="font-body text-ink-3" style={{ fontSize: '14px' }}>Next project</span>
            <span className="font-display font-bold text-navy group-hover:text-blue transition-colors duration-150" style={{ fontSize: '16px' }}>
              {nextProject.title} →
            </span>
          </div>
        </Link>
      </div>
    </main>
  )
}
