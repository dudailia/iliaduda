import type { Metadata } from 'next'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { PhotoWithFallback } from '@/components/about/PhotoWithFallback'
import { SectionTag } from '@/components/ui/SectionTag'
import { ShutterTitle } from '@/components/ui/ShutterTitle'
import { SkillsInteractive } from '@/components/about/SkillsInteractive'
import { education, personal } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About — Ilia Duda',
  description: 'Mathematics & Business student at Northeastern University. Quantitative finance, AI engineering, and entrepreneurship.',
}

const BIO = [
  "I'm a second-year Mathematics and Business Administration student at Northeastern University, targeting roles at the intersection of quantitative finance and AI. I think carefully about markets and build the tools to act on that thinking — not as separate disciplines, but as one integrated practice.",
  "My background spans both sides of the desk. I spent the summer of 2023 writing daily market briefings at BCS Bank's investment banking division — OFZ bonds, MOEX equity flows, Bank of Russia policy. Today I'm sole engineer at Glacier Capital Systems, where I built a live options trading infrastructure stack from scratch. In July 2026 I join State Street Global Advisors as an investment management co-op supporting the Chief Investment Strategist.",
  "I also founded CloseBooks — an AI-powered bookkeeping automation platform built on the Anthropic Claude API, currently in active partnership conversations with CPA firms in the Boston area. I believe the next generation of finance will be built by people who can do both: understand the math and ship the code.",
]

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--background)' }}>

      {/* Hero */}
      <div className="pt-24 pb-16 px-5 md:px-6">
        <div className="mx-auto" style={{ maxWidth: '1140px' }}>
          <AnimateIn>
            <SectionTag>ABOUT</SectionTag>
            <ShutterTitle
              className="font-display font-extrabold text-navy mt-2 mb-4"
              style={{ fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              Quantitative analyst. Engineer. Entrepreneur.
            </ShutterTitle>
          </AnimateIn>
        </div>
      </div>

      {/* Bio + Photo */}
      <div className="pb-24 px-5 md:px-6">
        <div className="mx-auto" style={{ maxWidth: '1140px' }}>
          <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-12 items-start">

            {/* Photo */}
            <AnimateIn direction="left">
              <div className="mx-auto md:mx-0" style={{ maxWidth: '280px' }}>
                <PhotoWithFallback />
                <div className="mt-4 p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="space-y-2">
                    {[
                      { key: 'Location', val: personal.location },
                      { key: 'Email', val: personal.email },
                    ].map(item => (
                      <div key={item.key} className="flex justify-between items-start gap-2">
                        <span className="font-mono text-ink-3 uppercase" style={{ fontSize: '10px', letterSpacing: '0.05em', flexShrink: 0 }}>{item.key}</span>
                        <span className="font-body text-ink-2 text-right" style={{ fontSize: '12px' }}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Bio */}
            <div className="space-y-5">
              {BIO.map((para, i) => (
                <AnimateIn key={i} delay={i * 80}>
                  <p className="font-body text-ink-2" style={{ fontSize: '16px', lineHeight: 1.7 }}>{para}</p>
                </AnimateIn>
              ))}
              <AnimateIn delay={300}>
                <div className="flex flex-wrap items-center gap-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                  {["Northeastern University '28", 'Boston, MA', 'English & Russian'].map((fact, i) => (
                    <span key={i} className="font-mono text-ink-3" style={{ fontSize: '12px' }}>{fact}</span>
                  ))}
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="py-16 md:py-24 px-5 md:px-6" style={{ background: 'var(--surface-2)' }}>
        <div className="mx-auto" style={{ maxWidth: '1140px' }}>
          <AnimateIn className="mb-10">
            <SectionTag>SKILLS</SectionTag>
            <ShutterTitle className="font-display font-bold text-navy" style={{ fontSize: 'clamp(26px, 4vw, 36px)' }}>
              What I work with.
            </ShutterTitle>
            <p className="font-body text-ink-3 mt-2" style={{ fontSize: '14px' }}>Click tags to select.</p>
          </AnimateIn>
          <SkillsInteractive />
        </div>
      </div>

      {/* Education */}
      <div className="py-16 md:py-24 px-5 md:px-6">
        <div className="mx-auto" style={{ maxWidth: '1140px' }}>
          <AnimateIn className="mb-10">
            <SectionTag>EDUCATION</SectionTag>
            <ShutterTitle className="font-display font-bold text-navy" style={{ fontSize: 'clamp(26px, 4vw, 36px)' }}>
              Academic background.
            </ShutterTitle>
          </AnimateIn>

          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6">
            {/* University */}
            <AnimateIn direction="left" delay={80}>
              <div className="p-7 rounded-xl h-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="w-12 h-12 flex items-center justify-center rounded-lg font-display font-bold mb-5" style={{ background: 'var(--blue-light)', color: 'var(--blue)', fontSize: '16px' }}>NU</div>
                <h3 className="font-display font-bold text-navy mb-1" style={{ fontSize: '20px' }}>{education.university.name}</h3>
                <p className="font-body text-ink-2 mb-1" style={{ fontSize: '15px' }}>{education.university.degree}</p>
                <p className="font-body text-ink-3 mb-1" style={{ fontSize: '13px' }}>{education.university.college}</p>
                <p className="font-mono text-ink-3 mb-6" style={{ fontSize: '12px' }}>{education.university.period} · {education.university.location}</p>
                <p className="font-mono uppercase text-blue mb-3" style={{ fontSize: '11px', letterSpacing: '0.08em' }}>Relevant Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {education.university.courses.map(c => (
                    <span key={c} className="font-mono" style={{ fontSize: '11px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 8px' }}>{c}</span>
                  ))}
                </div>
              </div>
            </AnimateIn>

            {/* Schools */}
            <div className="flex flex-col gap-5">
              {education.schools.map((school, i) => (
                <AnimateIn key={school.name} direction="right" delay={i * 80 + 100}>
                  <div className="p-6 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <h3 className="font-display font-bold text-navy mb-1" style={{ fontSize: '16px' }}>{school.name}</h3>
                    <p className="font-body text-ink-2 mb-1" style={{ fontSize: '14px' }}>{school.qualification}</p>
                    <p className="font-mono text-ink-3" style={{ fontSize: '12px' }}>{school.period} · {school.location}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="py-16 md:py-24 px-5 md:px-6" style={{ background: 'var(--surface-2)' }}>
        <div className="mx-auto" style={{ maxWidth: '1140px' }}>
          <AnimateIn className="mb-10">
            <SectionTag>CERTIFICATIONS</SectionTag>
            <ShutterTitle className="font-display font-bold text-navy" style={{ fontSize: 'clamp(26px, 4vw, 36px)' }}>
              Certifications.
            </ShutterTitle>
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
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold shrink-0"
                      style={{ background: cert.monogramColor + '15', color: cert.monogramColor, fontSize: '13px' }}
                    >
                      {cert.monogram}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-navy mb-1" style={{ fontSize: '14px', lineHeight: 1.3 }}>{cert.name}</h3>
                      <p className="font-body text-ink-3" style={{ fontSize: '13px' }}>{cert.issuer} · {cert.year}</p>
                      {cert.expires && (
                        <p className="font-mono text-ink-3 mt-0.5" style={{ fontSize: '11px' }}>Expires {cert.expires}</p>
                      )}
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
