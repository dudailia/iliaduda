'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ExperienceChartLoader } from '@/components/charts/ExperienceChartLoader'
import type { Experience } from '@/lib/data'

const fadein = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } } }

interface Props { exp: Experience; nextSlug: string; nextCompany: string }

export function ExperienceDetail({ exp, nextSlug, nextCompany }: Props) {
  return (
    <main style={{ background: 'var(--bg)' }}>
      {/* Hero */}
      <div className="px-5 md:px-10 pt-10 pb-14" style={{ borderLeft: `4px solid ${exp.accentColor}`, borderBottom: '1px solid var(--border)' }}>
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            <Link href="/experience" className="flex items-center gap-1.5 font-mono text-[12px] transition-colors duration-150" style={{ color: 'var(--text-3)' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
              <ArrowLeft size={13} /> Experience
            </Link>
            <span className="font-mono text-[11px]" style={{ color: 'var(--border-strong)' }}>/</span>
            <span className="font-mono text-[11px]" style={{ color: 'var(--text-3)' }}>{exp.company}</span>
          </div>
          <motion.div initial="hidden" animate="show" variants={fadein}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] rounded px-3 py-1" style={{ color: exp.accentColor, background: exp.accentColor + '18', border: `1px solid ${exp.accentColor}30` }}>{exp.tag}</span>
              {exp.status === 'current' && <span className="font-mono text-[11px] rounded-full px-3 py-1" style={{ color: '#16A34A', background: '#F0FDF4', border: '1px solid #BBF7D0' }}><span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse" style={{ background: '#16A34A', verticalAlign: 'middle' }} />Current</span>}
              {exp.status === 'incoming' && <span className="font-mono text-[11px] rounded-full px-3 py-1 animate-pulse" style={{ color: 'var(--blue)', background: 'var(--blue-bg)', border: '1px solid var(--blue-border)' }}><span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5" style={{ background: 'var(--blue)', verticalAlign: 'middle' }} />Incoming Jul 2026</span>}
            </div>
            <h1 className="font-display font-[800] mb-3" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>{exp.company}</h1>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="font-body italic text-[18px]" style={{ color: 'var(--blue)' }}>{exp.role}</span>
              <span style={{ color: 'var(--border-strong)' }}>·</span>
              <span className="font-mono text-[13px]" style={{ color: 'var(--text-3)' }}>{exp.period}</span>
              <span style={{ color: 'var(--border-strong)' }}>·</span>
              <span className="font-mono text-[13px]" style={{ color: 'var(--text-3)' }}>{exp.location}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Metrics */}
      <div className="px-5 md:px-10 py-6" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="mx-auto flex flex-wrap gap-8" style={{ maxWidth: '1100px' }}>
          {exp.metrics.map(m => (
            <div key={m.l}><div className="font-display font-[700] text-[24px]" style={{ color: 'var(--navy)' }}>{m.v}</div><div className="font-body text-[12px]" style={{ color: 'var(--text-3)' }}>{m.l}</div></div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="px-5 md:px-10 py-16">
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <p className="font-body font-[500] mb-10" style={{ fontSize: '20px', color: 'var(--text-1)', lineHeight: 1.5, maxWidth: '720px' }}>{exp.headline}</p>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            <div>
              <h2 className="font-display font-[700] mb-6" style={{ fontSize: '22px', color: 'var(--navy)' }}>What I did</h2>
              <div className="space-y-4">
                {exp.bullets.map((b, i) => (
                  <motion.div key={i} initial="hidden" whileInView="show" variants={fadein} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <div className="flex gap-4 p-5 rounded-xl" style={{ background: 'var(--surface)', borderLeft: `3px solid ${exp.accentColor}`, border: '1px solid var(--border)', borderRadius: '0 12px 12px 0' }}>
                      <p className="font-body text-[15px]" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>{b}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <ExperienceChartLoader slug={exp.slug} />
              <motion.div initial="hidden" whileInView="show" variants={fadein} viewport={{ once: true }}>
                <div className="p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.06em] mb-3" style={{ color: 'var(--text-3)' }}>Skills Applied</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map(s => <span key={s} className="font-mono text-[11px] rounded px-2.5 py-1" style={{ color: 'var(--text-2)', background: 'var(--surface-hover)', border: '1px solid var(--border)' }}>{s}</span>)}
                  </div>
                </div>
              </motion.div>
              {exp.liveUrl && (
                <a href={exp.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl transition-all duration-150" style={{ background: 'var(--blue-bg)', border: '1px solid var(--blue-border)' }} onMouseEnter={e => (e.currentTarget.style.background = '#E0E7FF')} onMouseLeave={e => (e.currentTarget.style.background = 'var(--blue-bg)')}>
                  <span className="font-body font-[500] text-[14px]" style={{ color: 'var(--blue)' }}>Visit live site</span>
                  <ArrowRight size={16} style={{ color: 'var(--blue)' }} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Next */}
      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <Link href={`/experience/${nextSlug}`}>
          <div className="mx-auto flex items-center justify-between px-5 md:px-10 py-6 group" style={{ maxWidth: '1100px' }}>
            <span className="font-body text-[14px]" style={{ color: 'var(--text-3)' }}>Next</span>
            <span className="font-display font-[700] text-[16px] group-hover:text-[color:var(--blue)] transition-colors duration-150" style={{ color: 'var(--navy)' }}>{nextCompany} →</span>
          </div>
        </Link>
      </div>
    </main>
  )
}
