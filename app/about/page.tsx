import type { Metadata } from 'next'
import Image from 'next/image'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SectionTag } from '@/components/ui/SectionTag'
import { SkillsMatrix } from '@/components/about/SkillsMatrix'
import { education, personal } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About — Ilia Duda',
  description: 'Mathematics & Business student at Northeastern. Skills in Python, quantitative finance, AI engineering, and full-stack development.',
}

const BIO = [
  "I'm a second-year Mathematics and Business Administration student at Northeastern University, targeting roles at the intersection of quantitative finance and AI. I think carefully about markets and build the tools to act on that thinking — not as separate disciplines, but as one integrated practice.",
  "My background spans both sides of the desk. I spent the summer of 2023 writing daily market briefings at BCS Bank's investment banking division — OFZ bonds, MOEX equity flows, Bank of Russia policy. Today I'm sole engineer at Glacier Capital Systems, where I built a live options trading infrastructure stack from scratch. In July 2026 I join State Street Global Advisors as an investment management co-op supporting the Chief Investment Strategist.",
  "I also founded CloseBooks — an AI-powered bookkeeping automation platform built on the Anthropic Claude API, currently in active partnership conversations with CPA firms in the Boston area. I believe the next generation of finance will be built by people who can do both: understand the math and ship the code.",
]

const EDU_TIMELINE = [
  { year: '2021', name: "The King's School, Canterbury", detail: 'GCSE / Secondary', location: 'Canterbury, UK', current: false },
  { year: '2022', name: 'Bromsgrove School', detail: 'A-Levels', location: 'Bromsgrove, UK', current: false },
  { year: '2024', name: 'Northeastern University', detail: 'B.S. Mathematics & Business Administration — Expected May 2028', location: 'Boston, MA', current: true },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--background)' }}>

      {/* Hero — two column */}
      <div className="px-5 md:px-10 pt-16 pb-20">
        <div className="mx-auto w-full" style={{ maxWidth: '1140px' }}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 items-start">
            {/* Left */}
            <div>
              <AnimateIn>
                <SectionTag>ABOUT</SectionTag>
                <h1 className="font-display font-extrabold text-navy mt-2 mb-8" style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  Quantitative analyst.<br />
                  Engineer. Entrepreneur<span style={{ color: 'var(--blue)' }}>.</span>
                </h1>
              </AnimateIn>
              <div className="space-y-5" style={{ maxWidth: '640px' }}>
                {BIO.map((para, i) => (
                  <AnimateIn key={i} delay={i * 80}>
                    <p className="font-body text-ink-2" style={{ fontSize: '17px', lineHeight: 1.75 }}>{para}</p>
                  </AnimateIn>
                ))}
              </div>
              <AnimateIn delay={320}>
                <div className="flex flex-wrap items-center gap-5 mt-8 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
                  {["Northeastern University '28", 'Boston, MA', 'English & Russian'].map((f, i) => (
                    <span key={i} className="font-mono text-ink-3" style={{ fontSize: '12px' }}>{f}</span>
                  ))}
                </div>
              </AnimateIn>
            </div>

            {/* Right: photo */}
            <AnimateIn direction="right">
              <div
                className="mx-auto md:mx-0 overflow-hidden"
                style={{ borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface-2)', width: '280px', aspectRatio: '1/1', position: 'relative' }}
              >
                <Image
                  src="/headshot.jpg"
                  alt="Ilia Duda"
                  width={280}
                  height={280}
                  className="object-cover object-top w-full h-full"
                  style={{ mixBlendMode: 'multiply' }}
                  priority
                  onError={() => {}}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-bold text-5xl" style={{ color: 'var(--border-strong)' }}>ID</span>
                </div>
              </div>
              <div className="mt-3 p-4 rounded-xl mx-auto" style={{ background: 'var(--surface)', border: '1px solid var(--border)', width: '280px' }}>
                <div className="space-y-2">
                  {[{ k: 'Location', v: personal.location }, { k: 'Email', v: personal.email }].map(item => (
                    <div key={item.k} className="flex justify-between">
                      <span className="font-mono text-ink-3 uppercase" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>{item.k}</span>
                      <span className="font-body text-ink-2 text-right" style={{ fontSize: '12px' }}>{item.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>

      {/* Skills matrix */}
      <div className="px-5 md:px-10 py-16 md:py-20" style={{ background: 'var(--surface-2)' }}>
        <div className="mx-auto w-full" style={{ maxWidth: '1140px' }}>
          <AnimateIn className="mb-10">
            <SectionTag>SKILLS</SectionTag>
            <h2 className="font-display font-bold text-navy mb-2" style={{ fontSize: 'clamp(26px, 4vw, 36px)', letterSpacing: '-0.02em' }}>
              What I work with.
            </h2>
          </AnimateIn>
          <SkillsMatrix />
        </div>
      </div>

      {/* Education timeline */}
      <div className="px-5 md:px-10 py-16 md:py-20">
        <div className="mx-auto w-full" style={{ maxWidth: '1140px' }}>
          <AnimateIn className="mb-12">
            <SectionTag>EDUCATION</SectionTag>
            <h2 className="font-display font-bold text-navy" style={{ fontSize: 'clamp(26px, 4vw, 36px)', letterSpacing: '-0.02em' }}>
              Academic background.
            </h2>
          </AnimateIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute hidden md:block" style={{ left: '58px', top: 0, bottom: 0, width: '1px', background: 'var(--border)' }} />

            <div className="space-y-8">
              {EDU_TIMELINE.map((item, i) => (
                <AnimateIn key={item.year} delay={i * 80} direction="left">
                  <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-8 items-start">
                    {/* Year + dot */}
                    <div className="flex items-center gap-3 md:flex-col md:items-end md:gap-2 md:pr-4">
                      <span className="font-mono font-medium text-ink-3" style={{ fontSize: '14px' }}>{item.year}</span>
                      <div
                        className="hidden md:block rounded-full"
                        style={{
                          width: item.current ? '14px' : '10px',
                          height: item.current ? '14px' : '10px',
                          background: item.current ? 'var(--blue)' : 'var(--border-strong)',
                          marginRight: '-7px',
                          boxShadow: item.current ? '0 0 10px rgba(37,99,235,0.4)' : 'none',
                        }}
                      />
                    </div>

                    {/* Content card */}
                    <div
                      className={`p-5 md:p-6 rounded-xl transition-colors duration-200 ${item.current ? 'border-blue/30' : ''}`}
                      style={{
                        background: 'var(--surface)',
                        border: `1px solid ${item.current ? 'var(--blue-mid)' : 'var(--border)'}`,
                      }}
                    >
                      <h3 className="font-display font-bold text-navy mb-1" style={{ fontSize: item.current ? '18px' : '16px' }}>{item.name}</h3>
                      <p className="font-body text-ink-2 mb-1" style={{ fontSize: '14px' }}>{item.detail}</p>
                      <p className="font-mono text-ink-3" style={{ fontSize: '12px' }}>{item.location}</p>

                      {/* Northeastern extra info */}
                      {item.current && (
                        <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                          <p className="font-mono uppercase text-blue mb-3" style={{ fontSize: '10px', letterSpacing: '0.08em' }}>Relevant Coursework</p>
                          <div className="overflow-x-auto pb-2 -mx-1">
                            <div className="flex gap-2 px-1" style={{ width: 'max-content' }}>
                              {education.university.courses.map(c => (
                                <span key={c} className="font-mono flex-shrink-0" style={{ fontSize: '11px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 8px' }}>
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="px-5 md:px-10 py-16 md:py-20" style={{ background: 'var(--surface-2)' }}>
        <div className="mx-auto w-full" style={{ maxWidth: '1140px' }}>
          <AnimateIn className="mb-10">
            <SectionTag>CERTIFICATIONS</SectionTag>
            <h2 className="font-display font-bold text-navy" style={{ fontSize: 'clamp(26px, 4vw, 36px)', letterSpacing: '-0.02em' }}>
              Certifications.
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {education.certifications.map((cert, i) => (
              <AnimateIn key={cert.name} delay={i * 70}>
                <div
                  className="p-6 rounded-[10px] transition-colors duration-200 border border-border hover:border-blue-mid"
                  style={{ background: 'var(--surface)' }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold flex-shrink-0"
                      style={{
                        background: cert.monogramColor,
                        color: ['#0A0A0A', '#006699', '#006A4E'].includes(cert.monogramColor) ? '#ffffff' : '#000000',
                        fontSize: '12px',
                      }}
                    >
                      {cert.monogram}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-navy mb-1" style={{ fontSize: '14px', lineHeight: 1.3 }}>{cert.name}</h3>
                      <p className="font-body text-ink-3" style={{ fontSize: '13px' }}>{cert.issuer} · {cert.year}</p>
                      {cert.expires && <p className="font-mono text-ink-3 mt-0.5" style={{ fontSize: '11px' }}>Expires {cert.expires}</p>}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map(s => (
                      <span key={s} className="font-mono" style={{ fontSize: '10px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '4px', padding: '2px 6px' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
