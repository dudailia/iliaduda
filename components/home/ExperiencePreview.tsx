'use client'
import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SectionTag } from '@/components/ui/SectionTag'
import { ShutterTitle } from '@/components/ui/ShutterTitle'
import { experience } from '@/lib/data'

export function ExperiencePreview() {
  const featured = experience.filter(e => e.featuredOnHome)

  return (
    <section className="py-16 md:py-24 px-5 md:px-6" style={{ background: 'var(--surface)' }}>
      <div className="mx-auto" style={{ maxWidth: '1140px' }}>
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <AnimateIn>
            <SectionTag>EXPERIENCE</SectionTag>
            <ShutterTitle className="font-display font-bold text-navy" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
              Where I&apos;ve worked.
            </ShutterTitle>
            <p className="font-body text-ink-2 mt-2" style={{ fontSize: '16px' }}>
              Finance + engineering, across two continents.
            </p>
          </AnimateIn>
          <Link
            href="/experience"
            className="hidden md:block font-body transition-colors duration-150"
            style={{ fontSize: '14px', color: 'var(--blue)' }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
          >
            See all →
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {featured.map((exp, i) => (
            <AnimateIn key={exp.slug} delay={i * 80}>
              <Link href={`/experience/${exp.slug}`} className="block">
                <div
                  className="group p-6 rounded-[10px] transition-all duration-200"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `3px solid ${exp.accentColor}` }}
                  onMouseEnter={e => { e.currentTarget.style.borderTopColor = 'var(--blue-mid)'; e.currentTarget.style.borderRightColor = 'var(--blue-mid)'; e.currentTarget.style.borderBottomColor = 'var(--blue-mid)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,23,42,0.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderTopColor = 'var(--border)'; e.currentTarget.style.borderRightColor = 'var(--border)'; e.currentTarget.style.borderBottomColor = 'var(--border)'; e.currentTarget.style.boxShadow = '' }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {exp.current && (
                        <span className="w-2 h-2 rounded-full" style={{ background: '#16A34A', flexShrink: 0 }} />
                      )}
                      <h3 className="font-display font-bold text-navy" style={{ fontSize: '15px' }}>{exp.company}</h3>
                    </div>
                    <span className="font-mono text-ink-3" style={{ fontSize: '12px', flexShrink: 0 }}>{exp.period}</span>
                  </div>
                  <p className="font-body italic mb-2" style={{ fontSize: '13px', color: 'var(--blue)' }}>{exp.role}</p>
                  <p className="font-body text-ink-2 mb-3" style={{ fontSize: '14px', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{exp.summary}</p>
                  <span className="font-body group-hover:underline" style={{ fontSize: '13px', color: 'var(--blue)' }}>View details →</span>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>

        <div className="md:hidden mt-6 text-center">
          <Link href="/experience" className="font-body" style={{ fontSize: '14px', color: 'var(--blue)' }}>See all experience →</Link>
        </div>
      </div>
    </section>
  )
}
