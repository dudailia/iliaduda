import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { projects } from '@/lib/data'

const ProjectChart = dynamic(() => import('@/components/charts/ProjectChart'), { ssr: false, loading: () => <div style={{ height: 160 }} /> })

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

const fadein = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } } }

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const p = projects.find(pr => pr.slug === slug)
  if (!p) notFound()

  const idx = projects.findIndex(pr => pr.slug === slug)
  const next = projects[(idx + 1) % projects.length]

  return (
    <main style={{ background: 'var(--bg)' }}>
      {/* Hero */}
      <div className="px-5 md:px-10 pt-10 pb-14" style={{ borderTop: `3px solid ${p.accentColor}`, borderBottom: '1px solid var(--border)' }}>
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            <Link href="/projects" className="flex items-center gap-1.5 font-mono text-[12px] transition-colors duration-150" style={{ color: 'var(--text-3)' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
              <ArrowLeft size={13} /> Projects
            </Link>
            <span className="font-mono text-[11px]" style={{ color: 'var(--border-strong)' }}>/</span>
            <span className="font-mono text-[11px]" style={{ color: 'var(--text-3)' }}>{p.title}</span>
          </div>

          <motion.div initial="hidden" animate="show" variants={fadein}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.06em] rounded px-2.5 py-1" style={{ color: 'var(--text-3)', background: 'var(--surface)', border: '1px solid var(--border)' }}>{p.type}</span>
              <span className="font-mono text-[11px] rounded px-2.5 py-1" style={{ color: p.statusColor === 'green' ? '#16A34A' : 'var(--blue)', background: p.statusColor === 'green' ? '#F0FDF4' : 'var(--blue-bg)', border: `1px solid ${p.statusColor === 'green' ? '#BBF7D0' : 'var(--blue-border)'}` }}>{p.status}</span>
            </div>

            <h1 className="font-display font-[800] mb-2" style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>{p.title}</h1>
            <p className="font-body italic mb-5" style={{ fontSize: '16px', color: 'var(--text-3)' }}>{p.company}</p>
            <p className="font-body" style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: '700px' }}>{p.description}</p>
          </motion.div>
        </div>
      </div>

      {/* Metrics */}
      <div className="px-5 md:px-10 py-6" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="mx-auto flex flex-wrap gap-8" style={{ maxWidth: '1100px' }}>
          {p.metrics.map(m => (
            <div key={m.l}>
              <div className="font-display font-[700] text-[24px]" style={{ color: 'var(--navy)' }}>{m.v}</div>
              <div className="font-body text-[12px]" style={{ color: 'var(--text-3)' }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="px-5 md:px-10 py-16">
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            {/* Detail cards */}
            <div>
              <h2 className="font-display font-[700] mb-6" style={{ fontSize: '22px', color: 'var(--navy)' }}>What I built</h2>
              <div className="space-y-4">
                {p.detail.map((d, i) => (
                  <motion.div key={i} initial="hidden" whileInView="show" variants={fadein} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <div className="p-6 rounded-xl" style={{ background: 'var(--surface)', borderLeft: `3px solid ${p.accentColor}`, border: '1px solid var(--border)', borderRadius: '0 12px 12px 0' }}>
                      <div className="flex items-start gap-3 mb-2">
                        <span className="font-mono text-[11px] shrink-0 mt-0.5" style={{ color: 'var(--text-3)' }}>{String(i + 1).padStart(2, '0')}</span>
                        <h3 className="font-display font-[700]" style={{ fontSize: '16px', color: 'var(--navy)' }}>{d.title}</h3>
                      </div>
                      <p className="font-body text-[15px] ml-7" style={{ color: 'var(--text-2)', lineHeight: 1.75 }}>{d.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Chart for projects with data */}
              {p.chartData && (
                <motion.div initial="hidden" whileInView="show" variants={fadein} viewport={{ once: true }}>
                  <div className="rounded-xl p-5" style={{ background: 'var(--navy)' }}>
                    <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>PERFORMANCE CHART</p>
                    <ProjectChart data={p.chartData} accentColor={p.accentColor} />
                  </div>
                </motion.div>
              )}

              {/* Tech stack */}
              <motion.div initial="hidden" whileInView="show" variants={fadein} viewport={{ once: true }}>
                <div className="p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.06em] mb-3" style={{ color: 'var(--text-3)' }}>Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map(t => (
                      <span key={t} className="font-mono text-[11px] rounded px-2.5 py-1" style={{ color: 'var(--blue)', background: 'var(--blue-bg)', border: '1px solid var(--blue-border)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Live link */}
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl transition-all duration-150" style={{ background: 'var(--blue-bg)', border: '1px solid var(--blue-border)' }} onMouseEnter={e => (e.currentTarget.style.background = '#E0E7FF')} onMouseLeave={e => (e.currentTarget.style.background = 'var(--blue-bg)')}>
                  <span className="font-body font-[500] text-[14px]" style={{ color: 'var(--blue)' }}>Visit live site</span>
                  <ExternalLink size={15} style={{ color: 'var(--blue)' }} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Next project */}
      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <Link href={`/projects/${next.slug}`}>
          <div className="mx-auto flex items-center justify-between px-5 md:px-10 py-6 group" style={{ maxWidth: '1100px' }}>
            <span className="font-body text-[14px]" style={{ color: 'var(--text-3)' }}>Next</span>
            <span className="font-display font-[700] text-[16px] group-hover:text-[var(--blue)] transition-colors duration-150" style={{ color: 'var(--navy)' }}>
              {next.title} →
            </span>
          </div>
        </Link>
      </div>
    </main>
  )
}
