'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionTag } from '@/components/ui/SectionTag'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { projects } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const CARD_WIDTH = 380
const CARD_GAP = 24
const FEATURED = projects.filter(p => p.featured)

export function ProjectsPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const totalCardWidth = FEATURED.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP
    const visibleWidth = window.innerWidth

    if (totalCardWidth <= visibleWidth) return // no need to scroll if cards fit

    const travelDistance = totalCardWidth - visibleWidth + 120

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -travelDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${travelDistance + 200}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => ctx.revert()
  }, [isMobile])

  return (
    <div
      ref={sectionRef}
      className="projects-section py-16 md:py-0 px-5 md:px-0 relative overflow-hidden"
      style={{ background: 'var(--surface-2)' }}
    >
      {/* Header — only show on desktop inside the pinned section */}
      <div
        className={`${isMobile ? 'mb-8' : 'absolute top-0 left-0 right-0 z-10 py-10 px-10'}`}
        style={isMobile ? {} : { background: 'var(--surface-2)' }}
      >
        <div className="mx-auto flex items-end justify-between flex-wrap gap-4" style={{ maxWidth: '1140px' }}>
          <AnimateIn>
            <SectionTag>PROJECTS</SectionTag>
            <h2
              className="font-display font-bold text-navy"
              style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.02em' }}
            >
              Things I&apos;ve built.
            </h2>
          </AnimateIn>
          <Link href="/projects" className="hidden md:block font-body text-blue hover:underline" style={{ fontSize: '14px' }}>
            See all →
          </Link>
        </div>
      </div>

      {/* Desktop: horizontal scrolling track */}
      {!isMobile ? (
        <div
          className="flex items-center"
          style={{ height: '100vh', paddingTop: '140px', paddingBottom: '48px', paddingLeft: '40px' }}
        >
          <div
            ref={trackRef}
            className="projects-track flex gap-6 will-change-transform"
            style={{ paddingRight: '80px' }}
          >
            {FEATURED.map((project, i) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <div
                  className="project-card flex-shrink-0 flex flex-col relative overflow-hidden cursor-pointer transition-all duration-200 group"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    minHeight: '480px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    padding: '32px',
                    borderTop: `3px solid ${project.accentColor}`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(15,23,42,0.10)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = ''
                    e.currentTarget.style.boxShadow = ''
                  }}
                >
                  {/* Large bg number */}
                  <div
                    className="absolute top-4 right-5 font-display font-extrabold pointer-events-none select-none"
                    style={{ fontSize: '80px', lineHeight: 1, color: 'var(--navy)', opacity: 0.04, letterSpacing: '-0.04em' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Card content */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <span className="font-mono uppercase" style={{ fontSize: '10px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 8px' }}>
                      {project.type}
                    </span>
                    <span className="font-mono" style={{ fontSize: '11px', borderRadius: '4px', padding: '3px 8px', background: project.statusColor === 'green' ? '#F0FDF4' : 'var(--blue-light)', border: `1px solid ${project.statusColor === 'green' ? '#BBF7D0' : 'var(--blue-mid)'}`, color: project.statusColor === 'green' ? '#16A34A' : 'var(--blue)', flexShrink: 0 }}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-navy mb-1" style={{ fontSize: '22px', lineHeight: 1.2 }}>
                    {project.title}
                  </h3>
                  <p className="font-body text-ink-3 italic mb-4" style={{ fontSize: '13px' }}>{project.subtitle}</p>
                  <p className="font-body text-ink-2 mb-5 flex-1" style={{ fontSize: '14px', lineHeight: 1.65 }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.metrics.map(m => (
                      <span key={m.label} className="font-mono" style={{ fontSize: '11px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '4px', padding: '3px 8px' }}>
                        {m.value} {m.label}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {Object.values(project.tech).flat().slice(0, 5).map(t => (
                      <span key={t} className="font-mono" style={{ fontSize: '10px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 6px' }}>{t}</span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <span className="font-body group-hover:underline" style={{ fontSize: '13px', color: 'var(--blue)' }}>
                      View case study →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        /* Mobile: stacked cards */
        <div className="pb-12">
          <div className="flex flex-col gap-5">
            {FEATURED.map((project, i) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <div
                  className="group p-6 cursor-pointer transition-all duration-200"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    borderTop: `3px solid ${project.accentColor}`,
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="font-mono uppercase" style={{ fontSize: '10px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 8px' }}>
                      {project.type}
                    </span>
                    <span className="font-mono" style={{ fontSize: '11px', borderRadius: '4px', padding: '3px 8px', background: project.statusColor === 'green' ? '#F0FDF4' : 'var(--blue-light)', border: `1px solid ${project.statusColor === 'green' ? '#BBF7D0' : 'var(--blue-mid)'}`, color: project.statusColor === 'green' ? '#16A34A' : 'var(--blue)' }}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-navy mb-2" style={{ fontSize: '18px' }}>{project.title}</h3>
                  <p className="font-body text-ink-2 mb-4" style={{ fontSize: '14px', lineHeight: 1.65 }}>{project.description}</p>
                  <span className="font-body group-hover:underline" style={{ fontSize: '13px', color: 'var(--blue)' }}>
                    View case study →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/projects" className="font-body text-blue" style={{ fontSize: '14px' }}>See all projects →</Link>
          </div>
        </div>
      )}
    </div>
  )
}
