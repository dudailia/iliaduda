'use client'
import Link from 'next/link'
import { experience } from '@/lib/data'
import { PageHero } from '@/components/ui/PageHero'
import { AnimateIn } from '@/components/ui/AnimateIn'


export default function ExperiencePage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--background)' }}>
      <PageHero
        tag="EXPERIENCE"
        title="Where I've worked."
        subtitle="From investment banking in Moscow to building trading infrastructure and founding an AI company in Boston."
      />

      <div className="pb-24 px-5 md:px-6">
        <div className="mx-auto space-y-5" style={{ maxWidth: '1140px' }}>
          {experience.map((exp, i) => (
            <AnimateIn key={exp.slug} delay={i * 60}>
              <Link href={`/experience/${exp.slug}`} className="block">
                <div
                  className="group p-6 md:p-8 rounded-xl cursor-pointer transition-all duration-200"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    borderLeft: `4px solid ${exp.accentColor}`,
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.borderTopColor = 'var(--blue-mid)'
                    el.style.borderRightColor = 'var(--blue-mid)'
                    el.style.borderBottomColor = 'var(--blue-mid)'
                    el.style.boxShadow = '0 4px 24px rgba(15,23,42,0.08)'
                    el.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.borderTopColor = 'var(--border)'
                    el.style.borderRightColor = 'var(--border)'
                    el.style.borderBottomColor = 'var(--border)'
                    el.style.boxShadow = ''
                    el.style.transform = ''
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-6 md:gap-8">
                    {/* LEFT */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {exp.incoming && (
                          <span className="font-mono" style={{ fontSize: '10px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '4px', padding: '2px 8px' }}>
                            Incoming Jul 2026
                          </span>
                        )}
                        {exp.current && !exp.incoming && (
                          <span className="flex items-center gap-1 font-mono" style={{ fontSize: '10px', color: '#16A34A' }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#16A34A', display: 'inline-block' }} />
                            Current
                          </span>
                        )}
                        <span className="font-mono uppercase" style={{ fontSize: '10px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 8px' }}>
                          {exp.typeLabel}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h2 className="font-display font-bold text-navy" style={{ fontSize: 'clamp(16px, 2vw, 20px)' }}>{exp.company}</h2>
                        <span className="font-mono text-ink-3" style={{ fontSize: '12px', flexShrink: 0 }}>{exp.period}</span>
                      </div>
                      <p className="font-body italic text-blue mb-3" style={{ fontSize: '14px' }}>{exp.role}</p>
                      <p className="font-body text-ink-2 mb-4" style={{ fontSize: '14px', lineHeight: 1.65 }}>{exp.summary}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.slice(0, 5).map(tag => (
                          <span key={tag} className="font-mono" style={{ fontSize: '11px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 8px' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col justify-between">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {exp.metrics.map(m => (
                          <div key={m.label} className="p-3 rounded-lg text-center" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                            <div className="font-display font-bold text-navy" style={{ fontSize: 'clamp(14px, 2vw, 18px)', lineHeight: 1.2 }}>{m.value}</div>
                            <div className="font-body text-ink-3 mt-1" style={{ fontSize: '11px' }}>{m.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end">
                        <span className="font-body group-hover:underline" style={{ fontSize: '13px', color: 'var(--blue)' }}>
                          View full details →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </main>
  )
}
