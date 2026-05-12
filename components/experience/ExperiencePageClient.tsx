'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { BackButton } from '@/components/ui/BackButton'
import { experience } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

// Dynamic imports — one per slug, all SSR disabled
const GlacierChart = dynamic(
  () => import('@/components/experience/GlacierChart'),
  { ssr: false, loading: () => <div style={{ height: 320 }} /> }
)
const CloseBooksFlow = dynamic(
  () => import('@/components/experience/CloseBooksFlow'),
  { ssr: false, loading: () => <div style={{ height: 320 }} /> }
)
const BCSChart = dynamic(
  () => import('@/components/experience/BCSChart'),
  { ssr: false, loading: () => <div style={{ height: 320 }} /> }
)
const MonitoTimeline = dynamic(
  () => import('@/components/experience/MonitoTimeline'),
  { ssr: false, loading: () => <div style={{ height: 320 }} /> }
)
const StateStreetCard = dynamic(
  () => import('@/components/experience/StateStreetCard'),
  { ssr: false, loading: () => <div style={{ height: 320 }} /> }
)

const CHART_MAP: Record<string, React.ComponentType> = {
  'glacier-capital': GlacierChart,
  'closebooks': CloseBooksFlow,
  'bcs-bank': BCSChart,
  'monito': MonitoTimeline,
  'state-street': StateStreetCard,
}

const CHART_TITLES: Record<string, string> = {
  'glacier-capital': 'STRATEGY P&L VS SPY — YTD',
  'closebooks': 'LLM PROCESSING PIPELINE',
  'bcs-bank': 'MOEX INDEX & BRENT CRUDE — JUL–AUG 2023',
  'monito': 'COMPETITION JOURNEY',
  'state-street': 'ASSETS UNDER MANAGEMENT',
}

interface Props {
  slug: string
}

export function ExperiencePageClient({ slug }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const exp = experience.find(e => e.slug === slug)
  if (!exp) return null

  const ChartComponent = CHART_MAP[slug]
  const chartTitle = CHART_TITLES[slug]

  const currentIndex = experience.findIndex(e => e.slug === slug)
  const nextExp = experience[(currentIndex + 1) % experience.length]

  useGSAP(() => {
    // Header cascade
    gsap.fromTo(
      '.exp-header-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: 'power3.out',
      }
    )
    // Story blocks slide from left
    gsap.fromTo(
      '.story-block',
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.story-section',
          start: 'top 80%',
          once: true,
        },
      }
    )
  }, { scope: containerRef, dependencies: [slug] })

  return (
    <div ref={containerRef} style={{ background: 'var(--background)', minHeight: '100vh' }}>

      {/* Section A — Header */}
      <div className="px-5 md:px-10 pt-8 pb-14" style={{ minHeight: '520px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'var(--background)' }}>
        <div className="mx-auto w-full" style={{ maxWidth: '1140px' }}>
          {/* Back + breadcrumb */}
          <div className="exp-header-item flex items-center gap-3 mb-8">
            <BackButton href="/experience" label="← Experience" />
            <span className="font-mono text-ink-3" style={{ fontSize: '11px' }}>
              Experience / {exp.shortName}
            </span>
          </div>

          {/* Type badge */}
          <div className="exp-header-item mb-4">
            <span
              className="font-mono uppercase"
              style={{
                fontSize: '11px',
                color: exp.accentColor,
                background: exp.accentColor + '18',
                borderRadius: '4px',
                padding: '4px 10px',
                letterSpacing: '0.08em',
              }}
            >
              {exp.typeLabel}
            </span>
          </div>

          {/* Company name */}
          <h1
            className="exp-header-item font-display font-extrabold text-navy"
            style={{ fontSize: 'clamp(36px, 6vw, 64px)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '16px' }}
          >
            {exp.company}
          </h1>

          {/* Role + period */}
          <div className="exp-header-item flex flex-wrap items-center gap-4 mb-3">
            <span className="font-body italic" style={{ fontSize: '18px', color: 'var(--blue)' }}>{exp.role}</span>
            <span className="font-mono" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>{exp.period}</span>
          </div>

          {/* Location */}
          <p className="exp-header-item font-mono text-ink-3 mb-8" style={{ fontSize: '13px' }}>{exp.location}</p>

          {/* Badges */}
          <div className="exp-header-item flex flex-wrap gap-2 mb-10">
            {exp.incoming && (
              <span className="font-mono animate-pulse" style={{ fontSize: '11px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '20px', padding: '5px 12px' }}>
                ● INCOMING JUL 2026
              </span>
            )}
            {exp.current && !exp.incoming && (
              <span className="font-mono" style={{ fontSize: '11px', color: '#16A34A', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '20px', padding: '5px 12px' }}>
                ● CURRENT
              </span>
            )}
          </div>

          {/* Metrics */}
          <div className="exp-header-item flex flex-wrap gap-4">
            {exp.metrics.map(m => (
              <div
                key={m.label}
                className="px-5 py-3 rounded-xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', minWidth: '110px' }}
              >
                <div className="font-display font-bold text-navy" style={{ fontSize: '24px', lineHeight: 1.1 }}>{m.value}</div>
                <div className="font-body text-ink-3 mt-1" style={{ fontSize: '12px' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section B+C — Story + Chart */}
      <div className="px-5 md:px-10 py-16" style={{ background: 'var(--surface-2)' }}>
        <div className="mx-auto w-full" style={{ maxWidth: '1140px' }}>
          <h2 className="font-display font-bold text-navy mb-10" style={{ fontSize: 'clamp(28px, 4vw, 36px)', letterSpacing: '-0.02em' }}>
            What I did.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-12">
            {/* Story blocks */}
            <div className="story-section space-y-4">
              {exp.bullets.map((bullet, i) => {
                const words = bullet.split(' ')
                const boldPart = words.slice(0, 6).join(' ')
                const rest = words.slice(6).join(' ')
                return (
                  <div
                    key={i}
                    className="story-block px-6 py-5"
                    style={{
                      background: 'var(--surface)',
                      borderLeft: `3px solid ${exp.accentColor}`,
                      borderTop: '1px solid var(--border)',
                      borderRight: '1px solid var(--border)',
                      borderBottom: '1px solid var(--border)',
                      borderRadius: '0 10px 10px 0',
                    }}
                  >
                    <p className="font-body text-ink-2" style={{ fontSize: '15px', lineHeight: 1.7 }}>
                      <strong className="font-semibold text-navy">{boldPart}</strong>{rest ? ' ' + rest : ''}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Sticky chart */}
            <div className="lg:sticky lg:top-24 self-start">
              <div className="rounded-xl p-7" style={{ background: 'var(--navy)' }}>
                {chartTitle && (
                  <p className="font-mono text-white/40 mb-4 uppercase tracking-widest" style={{ fontSize: '11px' }}>
                    {chartTitle}
                  </p>
                )}
                {ChartComponent && <ChartComponent />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section D — About company */}
      <div className="px-5 md:px-10 py-14" style={{ background: 'var(--surface)' }}>
        <div className="mx-auto w-full" style={{ maxWidth: '1140px' }}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-8">
            <div>
              <h2 className="font-display font-bold text-navy mb-4" style={{ fontSize: '20px' }}>About {exp.shortName}</h2>
              <p className="font-body text-ink-2" style={{ fontSize: '15px', lineHeight: 1.7 }}>{exp.companyDescription}</p>
            </div>
            <div>
              <p className="font-mono uppercase text-ink-3 mb-3" style={{ fontSize: '10px', letterSpacing: '0.08em' }}>Skills & Tools</p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map(tag => (
                  <span key={tag} className="font-mono" style={{ fontSize: '11px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 8px' }}>
                    {tag}
                  </span>
                ))}
              </div>
              {exp.techStack && (
                <div className="mt-6 space-y-3">
                  {Object.entries(exp.techStack).map(([cat, items]) => (
                    <div key={cat}>
                      <p className="font-mono uppercase text-ink-3 mb-1.5" style={{ fontSize: '10px', letterSpacing: '0.06em' }}>{cat}</p>
                      <div className="flex flex-wrap gap-1">
                        {(items as string[]).map(item => (
                          <span key={item} className="font-mono" style={{ fontSize: '10px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '4px', padding: '2px 6px' }}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section E — Next experience */}
      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-2)' }}>
        <Link href={`/experience/${nextExp.slug}`}>
          <div className="mx-auto flex items-center justify-between px-5 md:px-10 py-6 group transition-colors duration-150" style={{ maxWidth: '1140px' }}>
            <span className="font-body text-ink-3" style={{ fontSize: '14px' }}>Next</span>
            <span className="font-display font-bold text-navy group-hover:text-blue transition-colors duration-150" style={{ fontSize: '16px' }}>
              {nextExp.company} →
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
