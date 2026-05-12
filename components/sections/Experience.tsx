'use client'
import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SectionTag } from '@/components/ui/SectionTag'
import { ShutterTitle } from '@/components/ui/ShutterTitle'
import { experience } from '@/lib/data'

function ExperienceCard({ exp, index }: { exp: typeof experience[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <AnimateIn delay={index * 80} direction="right">
      <div className="relative group">
        {/* Timeline dot — desktop only */}
        <div
          className="absolute hidden md:block rounded-full border-2"
          style={{
            left: '-2.375rem', top: '28px', width: '10px', height: '10px',
            borderColor: exp.incoming ? 'var(--blue)' : 'var(--border-strong)',
            background: exp.incoming ? 'var(--blue)' : 'var(--surface-2)',
          }}
        />

        <div
          className="p-4 md:p-6 rounded-[10px] transition-all duration-200"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--blue-mid)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,99,235,0.06)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.boxShadow = ''
          }}
        >
          {/* Incoming badge */}
          {exp.incoming && (
            <div className="mb-3">
              <span className="font-mono" style={{ fontSize: '10px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '4px', padding: '3px 8px' }}>
                Incoming Jul 2026
              </span>
            </div>
          )}

          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              {!exp.incoming && (
                <motion.span
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--green)', flexShrink: 0 }}
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <h3 className="font-display font-bold text-navy" style={{ fontSize: '16px' }}>{exp.company}</h3>
            </div>
            <span className="font-mono text-ink-3" style={{ fontSize: '12px', flexShrink: 0 }}>{exp.period}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <p className="font-body italic text-blue" style={{ fontSize: '14px' }}>{exp.role}</p>
            <span className="font-mono text-ink-3" style={{ fontSize: '12px' }}>{exp.location}</span>
          </div>

          {/* Always show first bullet */}
          <ul className="space-y-2.5 mb-3">
            <li className="flex gap-3 font-body text-ink-2" style={{ fontSize: '14px', lineHeight: 1.6 }}>
              <span className="shrink-0 mt-[5px] rounded-sm" style={{ width: '2px', height: '8px', background: 'var(--blue)', display: 'block', minWidth: '2px' }} />
              {exp.bullets[0]}
            </li>
          </ul>

          {/* Additional bullets — always visible on desktop, collapsible on mobile */}
          {exp.bullets.length > 1 && (
            <>
              {/* Desktop: always show */}
              <ul className="hidden md:block space-y-2.5 mb-3">
                {exp.bullets.slice(1).map((b, j) => (
                  <li key={j} className="flex gap-3 font-body text-ink-2" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                    <span className="shrink-0 mt-[5px] rounded-sm" style={{ width: '2px', height: '8px', background: 'var(--blue)', display: 'block', minWidth: '2px' }} />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Mobile: collapsible */}
              <div className="md:hidden">
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.ul
                      key="extra-bullets"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="space-y-2.5 mb-3 overflow-hidden"
                    >
                      {exp.bullets.slice(1).map((b, j) => (
                        <li key={j} className="flex gap-3 font-body text-ink-2" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                          <span className="shrink-0 mt-[5px] rounded-sm" style={{ width: '2px', height: '8px', background: 'var(--blue)', display: 'block', minWidth: '2px' }} />
                          {b}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                {/* Mobile expand/collapse toggle */}
                <button
                  className="flex items-center gap-1.5 font-body mt-1 mb-3 transition-colors duration-150"
                  style={{ fontSize: '13px', color: 'var(--blue)' }}
                  onClick={() => setExpanded(e => !e)}
                >
                  <motion.span
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={14} />
                  </motion.span>
                  {expanded ? 'Show less' : `Show ${exp.bullets.length - 1} more`}
                </button>
              </div>
            </>
          )}

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
  )
}

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
          <ShutterTitle className="font-display font-bold text-navy" style={{ fontSize: '40px', lineHeight: 1.15 }}>
            Where I&apos;ve worked.
          </ShutterTitle>
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
              <ExperienceCard key={exp.slug} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
