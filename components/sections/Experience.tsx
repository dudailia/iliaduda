'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SectionTag } from '@/components/ui/SectionTag'
import { experience } from '@/lib/data'

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="experience" className="py-16 md:py-28 px-5 md:px-6 bg-surface-2">
      <div className="mx-auto max-w-content">
        <AnimateIn className="mb-14">
          <SectionTag>02 — Experience</SectionTag>
          <h2 className="font-display font-bold text-navy" style={{ fontSize: '40px', lineHeight: 1.15 }}>
            Where I&apos;ve worked.
          </h2>
        </AnimateIn>

        <div ref={containerRef} className="relative">
          {/* Timeline line — desktop only */}
          <div
            className="absolute hidden md:block"
            style={{ left: '11px', top: '8px', bottom: '8px', width: '1px', background: 'var(--border)' }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{ scaleY: lineScaleY, height: '100%', background: 'var(--blue)' }}
            />
          </div>

          <div className="space-y-6 md:pl-10">
            {experience.map((exp, i) => (
              <AnimateIn key={exp.id} delay={i * 80} direction="right">
                <div className="relative group">
                  {/* Timeline dot */}
                  <div
                    className="absolute hidden md:block rounded-full border-2"
                    style={{
                      left: '-2.375rem',
                      top: '28px',
                      width: '10px',
                      height: '10px',
                      borderColor: exp.incoming ? 'var(--blue)' : 'var(--border-strong)',
                      background: exp.incoming ? 'var(--blue)' : 'var(--surface-2)',
                      animation: exp.incoming ? 'pulse 2s infinite' : undefined,
                    }}
                  />

                  {/* Card */}
                  <div
                    className="p-4 md:p-6 rounded-[10px] transition-all duration-200"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget
                      el.style.borderColor = 'var(--blue-mid)'
                      el.style.boxShadow = '0 4px 20px rgba(37,99,235,0.06)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget
                      el.style.borderColor = 'var(--border)'
                      el.style.boxShadow = ''
                    }}
                  >
                    {/* Incoming badge */}
                    {exp.incoming && (
                      <div className="mb-3">
                        <span
                          className="font-mono"
                          style={{
                            fontSize: '10px',
                            color: 'var(--blue)',
                            background: 'var(--blue-light)',
                            border: '1px solid var(--blue-mid)',
                            borderRadius: '4px',
                            padding: '3px 8px',
                          }}
                        >
                          Incoming Jul 2026
                        </span>
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        {(!exp.incoming) && (
                          <motion.span
                            className="w-2 h-2 rounded-full"
                            style={{ background: 'var(--green)', flexShrink: 0 }}
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                        <h3 className="font-display font-bold text-navy" style={{ fontSize: '16px' }}>
                          {exp.company}
                        </h3>
                      </div>
                      <span className="font-mono text-ink-3" style={{ fontSize: '12px', flexShrink: 0 }}>
                        {exp.period}
                      </span>
                    </div>

                    {/* Role + location */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <p className="font-body italic text-blue" style={{ fontSize: '14px' }}>
                        {exp.role}
                      </p>
                      <span className="font-mono text-ink-3" style={{ fontSize: '12px' }}>
                        {exp.location}
                      </span>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-2.5 mb-5">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 font-body text-ink-2" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                          <span
                            className="shrink-0 mt-[5px] rounded-sm"
                            style={{ width: '2px', height: '8px', background: 'var(--blue)', display: 'block', minWidth: '2px' }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map(tag => (
                        <span
                          key={tag}
                          className="font-mono transition-all duration-150"
                          style={{
                            fontSize: '11px',
                            color: 'var(--ink-3)',
                            background: 'var(--surface-2)',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            padding: '3px 8px',
                            cursor: 'default',
                          }}
                          onMouseEnter={e => {
                            const el = e.currentTarget
                            el.style.background = 'var(--blue-light)'
                            el.style.borderColor = 'var(--blue-mid)'
                            el.style.color = 'var(--blue)'
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget
                            el.style.background = 'var(--surface-2)'
                            el.style.borderColor = 'var(--border)'
                            el.style.color = 'var(--ink-3)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
