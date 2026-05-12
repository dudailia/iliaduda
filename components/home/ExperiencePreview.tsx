'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTag } from '@/components/ui/SectionTag'
import { ShutterTitle } from '@/components/ui/ShutterTitle'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { experience } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

// Show only 3 featured experiences
const FEATURED_IDS = ['glacier-capital', 'closebooks', 'bcs-bank']

export function ExperiencePreview() {
  const featured = experience.filter(e => FEATURED_IDS.includes(e.slug))

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.experience-row',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.experience-section',
            start: 'top 80%',
            once: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="experience-section py-16 md:py-24 px-5 md:px-10" style={{ background: 'var(--surface)' }}>
      <div className="mx-auto" style={{ maxWidth: '1140px' }}>

        {/* Header */}
        <AnimateIn className="mb-12 flex items-end justify-between flex-wrap gap-4">
          <div>
            <SectionTag>EXPERIENCE</SectionTag>
            <ShutterTitle className="font-display font-bold text-navy" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
              Where I&apos;ve worked.
            </ShutterTitle>
            <p className="font-body text-ink-2 mt-2" style={{ fontSize: '16px' }}>
              Finance + engineering, across two continents.
            </p>
          </div>
          <Link
            href="/experience"
            className="hidden md:block font-body text-blue hover:underline"
            style={{ fontSize: '14px' }}
          >
            See all →
          </Link>
        </AnimateIn>

        {/* Editorial rows */}
        <div>
          {featured.map((exp, i) => (
            <Link key={exp.slug} href={`/experience/${exp.slug}`} className="block">
              <div
                className="experience-row group"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr auto',
                  alignItems: 'start',
                  gap: '16px',
                  padding: '28px 0',
                  borderBottom: '1px solid var(--border)',
                  transition: 'background 0.2s ease',
                  borderRadius: '4px',
                  paddingLeft: '8px',
                  paddingRight: '8px',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-light)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Index number */}
                <span className="font-mono text-ink-3" style={{ fontSize: '12px', paddingTop: '3px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {exp.current && (
                      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#16A34A' }} />
                    )}
                    <h3 className="font-display font-bold text-navy" style={{ fontSize: '16px' }}>{exp.company}</h3>
                    <span className="font-mono text-ink-3" style={{ fontSize: '12px' }}>{exp.period}</span>
                  </div>
                  <p className="font-body italic text-blue mb-2" style={{ fontSize: '13px' }}>{exp.role}</p>
                  <p className="font-body text-ink-2 mb-3 line-clamp-1" style={{ fontSize: '14px', lineHeight: 1.6 }}>{exp.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="font-mono" style={{ fontSize: '10px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 7px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <span
                  className="font-body group-hover:underline hidden sm:block"
                  style={{ fontSize: '13px', color: 'var(--blue)', paddingTop: '3px', whiteSpace: 'nowrap' }}
                >
                  View full story →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile see all */}
        <div className="md:hidden mt-6 text-center">
          <Link href="/experience" className="font-body text-blue" style={{ fontSize: '14px' }}>
            See all experience →
          </Link>
        </div>
      </div>
    </section>
  )
}
