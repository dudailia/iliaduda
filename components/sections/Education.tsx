'use client'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SectionTag } from '@/components/ui/SectionTag'
import { ShutterTitle } from '@/components/ui/ShutterTitle'
import { education } from '@/lib/data'

export function Education() {
  return (
    <section id="education" className="py-16 md:py-28 px-5 md:px-6 bg-surface">
      <div className="mx-auto max-w-content">
        <AnimateIn className="mb-12">
          <SectionTag>05 — Education</SectionTag>
          <ShutterTitle className="font-display font-bold text-navy" style={{ fontSize: '40px', lineHeight: 1.15 }}>
            Academic background.
          </ShutterTitle>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* University card */}
          <AnimateIn direction="left" delay={80}>
            <div
              className="p-7 rounded-[10px] h-full"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              {/* NU monogram */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center font-display font-bold mb-5"
                style={{ background: 'var(--blue-light)', color: 'var(--blue)', fontSize: '18px' }}
              >
                NU
              </div>

              <h3 className="font-display font-bold text-navy mb-1" style={{ fontSize: '22px' }}>{education.university.name}</h3>
              <p className="font-body text-ink-2 mb-1" style={{ fontSize: '15px' }}>{education.university.degree}</p>
              <p className="font-body text-ink-3 mb-1" style={{ fontSize: '13px' }}>{education.university.college}</p>
              <p className="font-mono text-ink-3 mb-6" style={{ fontSize: '12px' }}>{education.university.period} · {education.university.location}</p>

              <p className="font-mono uppercase mb-3" style={{ fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em' }}>Relevant Coursework</p>
              <div className="flex flex-wrap gap-2">
                {education.university.courses.map(c => (
                  <span key={c} className="font-mono" style={{ fontSize: '11px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 8px' }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            {/* Certifications */}
            <AnimateIn direction="right" delay={160}>
              <div
                className="p-6 rounded-[10px]"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <p className="font-mono uppercase mb-4" style={{ fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em' }}>Certifications</p>
                <div className="space-y-3">
                  {education.certifications.map(cert => (
                    <div key={cert.name} className="flex items-start gap-3">
                      <span style={{ color: 'var(--green)', fontSize: '14px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                      <div>
                        <p className="font-body text-ink-2" style={{ fontSize: '14px' }}>{cert.name}</p>
                        <p className="font-mono text-ink-3" style={{ fontSize: '11px', marginTop: '2px' }}>{cert.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            {/* Bromsgrove */}
            <AnimateIn direction="right" delay={240}>
              <div
                className="p-6 rounded-[10px]"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold mb-4" style={{ background: 'var(--surface-2)', color: 'var(--ink-3)', fontSize: '14px' }}>BS</div>
                <h3 className="font-display font-bold text-navy mb-1" style={{ fontSize: '17px' }}>Bromsgrove School</h3>
                <p className="font-body text-ink-2" style={{ fontSize: '14px' }}>A-Levels</p>
                <p className="font-mono text-ink-3 mt-1" style={{ fontSize: '12px' }}>2022 – 2024 · Bromsgrove, UK</p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  )
}
