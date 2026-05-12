'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { BackButton } from '@/components/ui/BackButton'
import { projects } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const GlacierChart = dynamic(() => import('@/components/experience/GlacierChart'), { ssr: false, loading: () => <div style={{ height: 280 }} /> })
const CloseBooksFlow = dynamic(() => import('@/components/experience/CloseBooksFlow'), { ssr: false, loading: () => <div style={{ height: 280 }} /> })
const YandexCharts = dynamic(() => import('@/components/experience/YandexCharts'), { ssr: false, loading: () => <div style={{ height: 280 }} /> })

const CHART_MAP: Record<string, React.ComponentType> = {
  'glacier-trading-engine': GlacierChart,
  'closebooks-saas': CloseBooksFlow,
  'yandex-analytics': YandexCharts,
}

const CHART_TITLES: Record<string, string> = {
  'glacier-trading-engine': 'STRATEGY P&L VS SPY — YTD',
  'closebooks-saas': 'LLM PROCESSING PIPELINE',
  'yandex-analytics': 'ANALYTICS OVERVIEW',
}

export function ProjectPageClient({ slug }: { slug: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const project = projects.find(p => p.slug === slug)
  if (!project) return null

  const currentIndex = projects.findIndex(p => p.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]
  const ChartComponent = CHART_MAP[slug]
  const chartTitle = CHART_TITLES[slug]

  useGSAP(() => {
    gsap.fromTo('.proj-header-item', { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out' })
    gsap.fromTo('.built-card', { opacity: 0, x: -24 }, {
      opacity: 1, x: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: '.built-section', start: 'top 80%', once: true },
    })
  }, { scope: containerRef, dependencies: [slug] })

  return (
    <div ref={containerRef} style={{ background: 'var(--background)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="px-5 md:px-10 pt-8 pb-14">
        <div className="mx-auto w-full" style={{ maxWidth: '1140px' }}>
          <div className="proj-header-item flex items-center gap-3 mb-8 flex-wrap">
            <BackButton href="/projects" label="← Projects" />
            <span className="font-mono text-ink-3" style={{ fontSize: '11px' }}>Projects / {project.title}</span>
          </div>
          <div className="proj-header-item flex flex-wrap items-center gap-2 mb-4">
            <span className="font-mono uppercase" style={{ fontSize: '11px', color: project.accentColor, background: project.accentColor + '18', borderRadius: '4px', padding: '4px 10px', letterSpacing: '0.08em' }}>{project.type}</span>
            <span className="font-mono" style={{ fontSize: '11px', borderRadius: '4px', padding: '3px 8px', background: project.statusColor === 'green' ? '#F0FDF4' : 'var(--blue-light)', border: `1px solid ${project.statusColor === 'green' ? '#BBF7D0' : 'var(--blue-mid)'}`, color: project.statusColor === 'green' ? '#16A34A' : 'var(--blue)' }}>
              {project.status}
            </span>
          </div>
          <h1 className="proj-header-item font-display font-extrabold text-navy mb-2" style={{ fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            {project.title}
          </h1>
          <p className="proj-header-item font-body italic text-ink-2 mb-4" style={{ fontSize: '18px' }}>{project.subtitle}</p>
          <p className="proj-header-item font-body text-ink-2 mb-8" style={{ fontSize: '16px', lineHeight: 1.7, maxWidth: '700px' }}>{project.description}</p>
          <div className="proj-header-item flex flex-wrap gap-3">
            {project.metrics.map(m => (
              <div key={m.label} className="px-4 py-3 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="font-display font-bold text-navy" style={{ fontSize: '22px', lineHeight: 1.1 }}>{m.value}</div>
                <div className="font-body text-ink-3 mt-0.5" style={{ fontSize: '12px' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart + What I built */}
      <div className="px-5 md:px-10 py-16" style={{ background: 'var(--surface-2)' }}>
        <div className="mx-auto w-full" style={{ maxWidth: '1140px' }}>
          {/* Full-width chart if available */}
          {ChartComponent && (
            <div className="rounded-xl p-7 mb-12" style={{ background: 'var(--navy)' }}>
              <p className="font-mono text-white/40 uppercase tracking-widest mb-5" style={{ fontSize: '11px' }}>{chartTitle}</p>
              <ChartComponent />
            </div>
          )}

          {/* What I built */}
          <h2 className="font-display font-bold text-navy mb-8" style={{ fontSize: '32px', letterSpacing: '-0.02em' }}>What I built.</h2>
          <div className="built-section space-y-4">
            {project.whatIBuilt.map((item, i) => (
              <div
                key={i}
                className="built-card px-7 py-6"
                style={{ background: 'var(--surface)', borderLeft: `3px solid ${project.accentColor}`, border: '1px solid var(--border)', borderRadius: '0 12px 12px 0' }}
              >
                <div className="flex items-start gap-4 mb-3">
                  <span className="font-mono text-ink-3 flex-shrink-0" style={{ fontSize: '11px', paddingTop: '2px' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display font-bold text-navy" style={{ fontSize: '17px' }}>{item.title}</h3>
                </div>
                <p className="font-body text-ink-2 mb-4 pl-8" style={{ fontSize: '15px', lineHeight: 1.75 }}>{item.body}</p>
                {project.tech && (
                  <div className="flex flex-wrap gap-1.5 pl-8">
                    {Object.values(project.tech).flat().slice(0, 5).map(t => (
                      <span key={t} className="font-mono" style={{ fontSize: '10px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '4px', padding: '2px 6px' }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech stack */}
      <div className="px-5 md:px-10 py-12" style={{ background: 'var(--surface)' }}>
        <div className="mx-auto w-full" style={{ maxWidth: '1140px' }}>
          <h2 className="font-display font-bold text-navy mb-6" style={{ fontSize: '22px' }}>Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(project.tech).map(([cat, items]) => (
              <div key={cat}>
                <p className="font-mono uppercase text-ink-3 mb-2" style={{ fontSize: '10px', letterSpacing: '0.06em' }}>{cat}</p>
                <div className="flex flex-wrap gap-1">
                  {items.map((item: string) => (
                    <span key={item} className="font-mono" style={{ fontSize: '11px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '4px', padding: '3px 8px' }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {project.links.live && (
            <div className="mt-8">
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-body font-medium text-white rounded-lg px-5 py-3 transition-opacity hover:opacity-90" style={{ background: project.accentColor, fontSize: '14px' }}>
                Visit Live Site →
              </a>
            </div>
          )}
          {project.links.github && (
            <div className="mt-3">
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-body rounded-lg px-5 py-3 transition-all hover:border-blue hover:text-blue text-ink-2 border border-border" style={{ fontSize: '14px' }}>
                View on GitHub →
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Next project */}
      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-2)' }}>
        <Link href={`/projects/${nextProject.slug}`}>
          <div className="mx-auto flex items-center justify-between px-5 md:px-10 py-6 group" style={{ maxWidth: '1140px' }}>
            <span className="font-body text-ink-3" style={{ fontSize: '14px' }}>Next project</span>
            <span className="font-display font-bold text-navy group-hover:text-blue transition-colors duration-150" style={{ fontSize: '16px' }}>
              {nextProject.title} →
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
