import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { experience } from '@/lib/data'
import { BackButton } from '@/components/ui/BackButton'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { ExperienceBullets } from '@/components/experience/ExperienceBullets'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return experience.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const exp = experience.find(e => e.slug === slug)
  if (!exp) return {}
  return {
    title: `${exp.company} — ${exp.role} | Ilia Duda`,
    description: exp.summary,
  }
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { slug } = await params
  const exp = experience.find(e => e.slug === slug)
  if (!exp) notFound()

  const currentIndex = experience.findIndex(e => e.slug === slug)
  const nextExp = experience[(currentIndex + 1) % experience.length]

  return (
    <main className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Hero */}
      <div className="pt-20 pb-12 px-5 md:px-6" style={{ borderLeft: `4px solid ${exp.accentColor}` }}>
        <div className="mx-auto" style={{ maxWidth: '1140px' }}>
          <BackButton href="/experience" label="← All Experience" />
          <AnimateIn>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="font-mono uppercase" style={{ fontSize: '11px', color: exp.accentColor, background: exp.accentColor + '18', borderRadius: '4px', padding: '3px 10px', letterSpacing: '0.06em' }}>
                {exp.typeLabel}
              </span>
              {exp.incoming && (
                <span className="font-mono animate-pulse" style={{ fontSize: '10px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '4px', padding: '3px 8px' }}>
                  ● INCOMING
                </span>
              )}
              {exp.current && !exp.incoming && (
                <span className="font-mono" style={{ fontSize: '10px', color: '#16A34A', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '4px', padding: '3px 8px' }}>
                  ● CURRENT
                </span>
              )}
            </div>
            <h1 className="font-display font-extrabold text-navy mb-3" style={{ fontSize: 'clamp(28px, 5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {exp.company}
            </h1>
            <p className="font-body italic text-ink-2 mb-2" style={{ fontSize: 'clamp(16px, 2vw, 20px)' }}>{exp.role}</p>
            <p className="font-mono text-ink-3" style={{ fontSize: '13px' }}>{exp.period} · {exp.location}</p>
          </AnimateIn>
        </div>
      </div>

      {/* Metrics */}
      <div className="py-8 px-5 md:px-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="mx-auto" style={{ maxWidth: '1140px' }}>
          <div className="grid grid-cols-3 gap-4">
            {exp.metrics.map((m, i) => (
              <AnimateIn key={m.label} delay={i * 60}>
                <div className="p-4 md:p-5 rounded-lg text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="font-display font-bold text-navy" style={{ fontSize: 'clamp(18px, 3vw, 28px)', lineHeight: 1.2 }}>{m.value}</div>
                  <div className="font-body text-ink-3 mt-1" style={{ fontSize: '12px' }}>{m.label}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="py-16 px-5 md:px-6">
        <div className="mx-auto" style={{ maxWidth: '1140px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-12">

            {/* Bullets */}
            <div>
              <h2 className="font-display font-bold text-navy mb-6" style={{ fontSize: '24px' }}>What I did</h2>
              <ExperienceBullets bullets={exp.bullets} accentColor={exp.accentColor} />
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <AnimateIn delay={80}>
                <div className="p-6 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <h3 className="font-display font-bold text-navy mb-4" style={{ fontSize: '15px' }}>About this role</h3>
                  <div className="space-y-2.5">
                    {[
                      { key: 'Type', value: exp.typeLabel },
                      { key: 'Period', value: exp.period },
                      { key: 'Location', value: exp.location },
                    ].map(item => (
                      <div key={item.key} className="flex justify-between items-start gap-4">
                        <span className="font-mono text-ink-3 uppercase" style={{ fontSize: '10px', letterSpacing: '0.05em', flexShrink: 0 }}>{item.key}</span>
                        <span className="font-body text-ink-2 text-right" style={{ fontSize: '13px' }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 flex flex-wrap gap-1.5" style={{ borderTop: '1px solid var(--border)' }}>
                    {exp.tags.map(tag => (
                      <span key={tag} className="font-mono" style={{ fontSize: '10px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 6px' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </AnimateIn>

              {exp.techStack && (
                <AnimateIn delay={140}>
                  <div className="p-6 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <h3 className="font-display font-bold text-navy mb-4" style={{ fontSize: '15px' }}>Tech & Skills</h3>
                    <div className="space-y-3">
                      {Object.entries(exp.techStack).map(([category, items]) => (
                        <div key={category}>
                          <p className="font-mono uppercase text-ink-3 mb-1.5" style={{ fontSize: '10px', letterSpacing: '0.06em' }}>{category}</p>
                          <div className="flex flex-wrap gap-1">
                            {(items as string[]).map(item => (
                              <span key={item} className="font-mono" style={{ fontSize: '10px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '4px', padding: '2px 6px' }}>{item}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimateIn>
              )}

              <AnimateIn delay={200}>
                <div className="p-6 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <h3 className="font-display font-bold text-navy mb-3" style={{ fontSize: '15px' }}>Company</h3>
                  <p className="font-body text-ink-2" style={{ fontSize: '14px', lineHeight: 1.65 }}>{exp.companyDescription}</p>
                </div>
              </AnimateIn>

              {exp.liveUrl && (
                <AnimateIn delay={260}>
                  <a
                    href={exp.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center font-body font-medium w-full rounded-lg transition-all duration-200"
                    style={{ color: 'white', background: exp.accentColor, padding: '12px 20px', fontSize: '14px', borderRadius: '8px' }}
                  >
                    Visit site →
                  </a>
                </AnimateIn>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Next experience */}
      <div style={{ borderTop: '1px solid var(--border)', background: 'var(--surface-2)' }}>
        <Link href={`/experience/${nextExp.slug}`}>
          <div
            className="mx-auto flex items-center justify-between px-5 md:px-6 py-6 transition-colors duration-150 group"
            style={{ maxWidth: '1140px' }}
          >
            <span className="font-body text-ink-3" style={{ fontSize: '14px' }}>Next</span>
            <span className="font-display font-bold text-navy group-hover:text-blue transition-colors duration-150" style={{ fontSize: '16px' }}>
              {nextExp.company} →
            </span>
          </div>
        </Link>
      </div>
    </main>
  )
}
