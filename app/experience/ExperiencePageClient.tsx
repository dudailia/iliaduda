'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { experience } from '@/lib/data'

export function ExperiencePageClient() {
  return (
    <main style={{ background: 'var(--bg)' }}>
      {/* Page header */}
      <div className="px-5 md:px-10 pt-16 pb-10" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] mb-3" style={{ color: 'var(--blue)' }}>Experience</p>
          <h1 className="font-display font-[800] mb-4" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Where I&apos;ve worked.
          </h1>
          <p className="font-body" style={{ fontSize: '18px', color: 'var(--text-2)', maxWidth: '560px', lineHeight: 1.6 }}>
            From investment banking in Moscow to building trading infrastructure and founding an AI company in Boston.
          </p>
        </div>
      </div>

      {/* Each experience as its own section */}
      {experience.map(exp => (
        <motion.section
          key={exp.slug}
          className="py-20 px-5 md:px-10"
          style={{ borderBottom: '1px solid var(--border)' }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
        >
          <div className="mx-auto" style={{ maxWidth: '1100px' }}>

            {/* TOP ROW: status badge, index+company, role+period, type tag */}
            <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
              <div>
                {/* Status badge */}
                {exp.status === 'current' && (
                  <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-4 font-mono text-[11px]" style={{ color: '#16A34A', background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#16A34A' }} />
                    Current
                  </div>
                )}
                {exp.status === 'incoming' && (
                  <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-4 font-mono text-[11px]" style={{ color: 'var(--blue)', background: 'var(--blue-bg)', border: '1px solid var(--blue-border)' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--blue)' }} />
                    Incoming Jul 2026
                  </div>
                )}

                {/* Index + Company */}
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-mono text-[13px]" style={{ color: 'var(--text-3)' }}>{exp.index}</span>
                  <h2 className="font-display font-[800] leading-none" style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'var(--navy)', letterSpacing: '-0.03em' }}>
                    {exp.company}
                  </h2>
                </div>

                {/* Role · Period · Location */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3 ml-0 md:ml-[calc(13px+16px)]">
                  <span className="font-body italic text-[17px]" style={{ color: 'var(--blue)' }}>{exp.role}</span>
                  <span className="font-mono text-[12px]" style={{ color: 'var(--border-strong)' }}>·</span>
                  <span className="font-mono text-[12px]" style={{ color: 'var(--text-3)' }}>{exp.period}</span>
                  <span className="font-mono text-[12px]" style={{ color: 'var(--border-strong)' }}>·</span>
                  <span className="font-mono text-[12px]" style={{ color: 'var(--text-3)' }}>{exp.location}</span>
                </div>
              </div>

              {/* Type tag */}
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] rounded px-3 py-1.5 shrink-0" style={{ color: 'var(--text-3)', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                {exp.tag}
              </span>
            </div>

            {/* HEADLINE */}
            <p className="font-body font-[500] mb-8" style={{ fontSize: '20px', color: 'var(--text-1)', lineHeight: 1.5, maxWidth: '720px' }}>
              {exp.headline}
            </p>

            {/* TWO COLUMNS: bullets (left) + metrics/tags/link (right) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

              {/* Bullets */}
              <div className="space-y-4">
                {exp.bullets.map((bullet, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="shrink-0 rounded-full self-stretch opacity-60" style={{ width: '2px', background: 'var(--blue)' }} />
                    <p className="font-body text-[15px]" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>{bullet}</p>
                  </div>
                ))}
              </div>

              {/* Right sidebar */}
              <div className="space-y-4">
                {/* Metrics */}
                <div className="p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] mb-4" style={{ color: 'var(--text-3)' }}>Key Metrics</p>
                  <div className="space-y-3">
                    {exp.metrics.map((m, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="font-body text-[13px]" style={{ color: 'var(--text-3)' }}>{m.l}</span>
                        <span className="font-display font-[700] text-[22px]" style={{ color: 'var(--navy)' }}>{m.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] mb-3" style={{ color: 'var(--text-3)' }}>Skills Applied</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map(s => (
                      <span key={s} className="font-mono text-[11px] rounded px-2.5 py-1" style={{ color: 'var(--text-2)', background: 'var(--surface-hover)', border: '1px solid var(--border)' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Full case study link */}
                <Link href={`/experience/${exp.slug}`} className="flex items-center justify-between p-4 rounded-xl group transition-colors duration-150" style={{ background: 'var(--blue-bg)', border: '1px solid var(--blue-border)' }}>
                  <span className="font-body font-[500] text-[14px]" style={{ color: 'var(--blue)' }}>Full case study</span>
                  <ArrowRight size={16} style={{ color: 'var(--blue)' }} className="group-hover:translate-x-1 transition-transform duration-150" />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      ))}
    </main>
  )
}
