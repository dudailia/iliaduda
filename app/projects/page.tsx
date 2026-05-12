import type { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { projects } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Projects — Ilia Duda',
  description: 'Options trading infrastructure, CloseBooks AI SaaS, Yandex Afisha analytics, quantitative finance research.',
}

export default function ProjectsPage() {
  return (
    <main style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-5 md:px-10 pt-16 pb-10" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] mb-3" style={{ color: 'var(--blue)' }}>Projects</p>
          <h1 className="font-display font-[800] mb-4" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Things I&apos;ve built.
          </h1>
          <p className="font-body" style={{ fontSize: '18px', color: 'var(--text-2)', maxWidth: '560px', lineHeight: 1.6 }}>
            Production systems, analytics pipelines, academic research — built to work, not to demo.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="px-5 md:px-10 py-16">
        <div className="mx-auto space-y-6" style={{ maxWidth: '1100px' }}>
          {projects.map((p, i) => {
            const isFeatured = i < 3
            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="rounded-2xl transition-all duration-200 group"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderLeft: `4px solid ${p.accentColor}`,
                    padding: isFeatured ? '40px 44px' : '28px 32px',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(14,17,23,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                >
                  <div className={`grid grid-cols-1 ${isFeatured ? 'lg:grid-cols-[55%_45%]' : ''} gap-8 items-center`}>
                    {/* Content */}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.06em] rounded px-2.5 py-1" style={{ color: 'var(--text-3)', background: 'var(--surface-hover)', border: '1px solid var(--border)' }}>{p.type}</span>
                        <span className="font-mono text-[11px] rounded px-2.5 py-1" style={{
                          color: p.statusColor === 'green' ? '#16A34A' : 'var(--blue)',
                          background: p.statusColor === 'green' ? '#F0FDF4' : 'var(--blue-bg)',
                          border: `1px solid ${p.statusColor === 'green' ? '#BBF7D0' : 'var(--blue-border)'}`,
                        }}>{p.status}</span>
                      </div>

                      <h2 className="font-display font-[800] mb-1" style={{ fontSize: isFeatured ? '30px' : '22px', color: 'var(--navy)', letterSpacing: '-0.02em' }}>{p.title}</h2>
                      <p className="font-body italic mb-4 text-[14px]" style={{ color: 'var(--text-3)' }}>{p.company}</p>
                      <p className="font-body mb-5" style={{ fontSize: '16px', color: 'var(--text-2)', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.metrics.map(m => (
                          <span key={m.l} className="font-mono text-[12px] rounded px-3 py-1" style={{ color: 'var(--blue)', background: 'var(--blue-bg)', border: '1px solid var(--blue-border)' }}>
                            {m.v} {m.l}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {p.tech.slice(0, 6).map(t => (
                          <span key={t} className="font-mono text-[11px] rounded px-2 py-0.5" style={{ color: 'var(--text-3)', background: 'var(--surface-hover)', border: '1px solid var(--border)' }}>{t}</span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <Link href={`/projects/${p.slug}`} className="flex items-center gap-1.5 font-body font-[500] text-[14px] transition-colors duration-150" style={{ color: 'var(--blue)' }}>
                          View full case study <ArrowRight size={14} />
                        </Link>
                        {p.liveUrl && (
                          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-body text-[13px] transition-colors duration-150" style={{ color: 'var(--text-3)' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
                            <ExternalLink size={13} /> Live
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Visual preview (featured only) */}
                    {isFeatured && (
                      <div className="hidden lg:flex items-center justify-center rounded-xl" style={{ background: '#0F172A', height: '200px', opacity: 0.9 }}>
                        <div className="text-center">
                          <div className="font-mono text-[11px] uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>{p.type}</div>
                          <div className="font-display font-[700] text-white" style={{ fontSize: '22px', letterSpacing: '-0.02em' }}>{p.index}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
