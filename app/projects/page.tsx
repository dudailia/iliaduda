'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { projects } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const MiniAreaChart = dynamic(() => import('@/components/projects/MiniAreaChart'), { ssr: false, loading: () => <div style={{ height: '100%' }} /> })
const MiniDonut = dynamic(() => import('@/components/projects/MiniDonut'), { ssr: false, loading: () => <div style={{ height: '100%' }} /> })

const MINI_CHARTS: Record<string, React.ComponentType | null> = {
  'glacier-trading-engine': MiniAreaChart,
  'closebooks-saas': null,
  'yandex-analytics': MiniDonut,
}

const MINI_BG: Record<string, string> = {
  'glacier-trading-engine': 'var(--navy)',
  'closebooks-saas': '#0F172A',
  'yandex-analytics': '#0F172A',
}

function StatusBadge({ status, color }: { status: string; color: 'green' | 'blue' }) {
  return (
    <span className="font-mono" style={{ fontSize: '11px', borderRadius: '4px', padding: '3px 8px', background: color === 'green' ? '#F0FDF4' : 'var(--blue-light)', border: `1px solid ${color === 'green' ? '#BBF7D0' : 'var(--blue-mid)'}`, color: color === 'green' ? '#16A34A' : 'var(--blue)' }}>
      {status}
    </span>
  )
}

export default function ProjectsPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const featured = projects.filter(p => p.featured)
  const others = projects.filter(p => !p.featured)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.proj-card', { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <PageHero
        tag="PROJECTS"
        title="Things I've built."
        subtitle="Production systems, analytics pipelines, academic research — built to work, not to demo."
      />

      <div ref={sectionRef} className="pb-24 px-5 md:px-10">
        <div className="mx-auto space-y-5" style={{ maxWidth: '1140px' }}>

          {/* Featured large cards */}
          {featured.map(project => {
            const MiniChart = MINI_CHARTS[project.slug] ?? null
            const miniBg = MINI_BG[project.slug] ?? '#0F172A'
            return (
              <div
                key={project.slug}
                className="proj-card rounded-2xl transition-shadow duration-200 hover:shadow-lg"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '40px 44px' }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-10 items-center">
                  {/* Left */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono uppercase" style={{ fontSize: '10px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 8px' }}>{project.type}</span>
                      <StatusBadge status={project.status} color={project.statusColor} />
                    </div>
                    <div>
                      <h2 className="font-display font-extrabold text-navy" style={{ fontSize: '28px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>{project.title}</h2>
                      <p className="font-body italic text-ink-3 mt-1" style={{ fontSize: '14px' }}>{project.subtitle}</p>
                    </div>
                    <p className="font-body text-ink-2" style={{ fontSize: '16px', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.metrics.map(m => (
                        <span key={m.label} className="font-mono" style={{ fontSize: '12px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '4px', padding: '4px 10px' }}>
                          {m.value} {m.label}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.values(project.tech).flat().slice(0, 6).map(t => (
                        <span key={t} className="font-mono" style={{ fontSize: '11px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 8px' }}>{t}</span>
                      ))}
                    </div>
                    <Link href={`/projects/${project.slug}`} className="flex items-center gap-1.5 font-body font-medium text-blue hover:underline" style={{ fontSize: '14px', width: 'fit-content' }}>
                      View full case study <ArrowRight size={14} />
                    </Link>
                  </div>

                  {/* Right mini chart */}
                  <div className="rounded-xl p-5 flex items-center justify-center" style={{ background: miniBg, height: '220px' }}>
                    {MiniChart ? <MiniChart /> : (
                      <div className="text-center">
                        <p className="font-mono text-white/30 uppercase" style={{ fontSize: '10px', letterSpacing: '0.06em' }}>CASE STUDY</p>
                        <p className="font-display font-bold text-white mt-2" style={{ fontSize: '20px' }}>{project.title.split(' — ')[0]}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Separator */}
          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="font-mono text-ink-3 uppercase" style={{ fontSize: '11px', letterSpacing: '0.06em' }}>More work</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          {/* Smaller cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {others.map(project => (
              <div
                key={project.slug}
                className="proj-card rounded-xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '28px' }}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="font-mono uppercase" style={{ fontSize: '10px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 8px' }}>{project.type}</span>
                  <StatusBadge status={project.status} color={project.statusColor} />
                </div>
                <h2 className="font-display font-bold text-navy mb-1" style={{ fontSize: '18px' }}>{project.title}</h2>
                <p className="font-body italic text-ink-3 mb-3" style={{ fontSize: '13px' }}>{project.subtitle}</p>
                <p className="font-body text-ink-2 mb-4" style={{ fontSize: '14px', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.metrics.map(m => (
                    <span key={m.label} className="font-mono" style={{ fontSize: '11px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '4px', padding: '3px 8px' }}>
                      {m.value} {m.label}
                    </span>
                  ))}
                </div>
                <Link href={`/projects/${project.slug}`} className="flex items-center gap-1 font-body text-blue hover:underline" style={{ fontSize: '13px', width: 'fit-content' }}>
                  View case study <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
