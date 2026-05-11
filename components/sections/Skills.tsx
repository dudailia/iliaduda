'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SectionTag } from '@/components/ui/SectionTag'
import { skillGroups } from '@/lib/data'

function SkillCard({ label, skills, cardIndex }: { label: string; skills: string[]; cardIndex: number }) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const toggle = (skill: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(skill) ? next.delete(skill) : next.add(skill)
      return next
    })
  }

  return (
    <AnimateIn delay={cardIndex * 80}>
      <div
        className="p-6 rounded-[10px] h-full transition-colors duration-200"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--blue-mid)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      >
        <p className="font-mono uppercase mb-3" style={{ fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em' }}>
          {label}
        </p>
        <div className="h-px mb-4" style={{ background: 'var(--border)' }} />
        <div ref={ref} className="flex flex-wrap gap-2">
          {skills.map((skill, j) => {
            const isSelected = selected.has(skill)
            return (
              <motion.button
                key={skill}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, delay: j * 0.025, ease: 'easeOut' }}
                onClick={() => toggle(skill)}
                onMouseEnter={e => {
                  if (!isSelected) {
                    const el = e.currentTarget
                    el.style.background = 'var(--blue-light)'
                    el.style.borderColor = 'var(--blue-mid)'
                    el.style.color = 'var(--blue)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    const el = e.currentTarget
                    el.style.background = 'var(--surface-2)'
                    el.style.borderColor = 'var(--border)'
                    el.style.color = 'var(--ink-2)'
                  }
                }}
                className="font-mono transition-all duration-150"
                style={{
                  fontSize: '11px',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  border: `1px solid ${isSelected ? 'var(--blue-dark)' : 'var(--border)'}`,
                  background: isSelected ? 'var(--blue)' : 'var(--surface-2)',
                  color: isSelected ? '#ffffff' : 'var(--ink-2)',
                }}
              >
                {skill}
              </motion.button>
            )
          })}
        </div>
      </div>
    </AnimateIn>
  )
}

export function Skills() {
  return (
    <section id="skills" className="py-16 md:py-28 px-5 md:px-6 bg-surface-2">
      <div className="mx-auto max-w-content">
        <AnimateIn className="mb-12">
          <SectionTag>04 — Skills</SectionTag>
          <h2 className="font-display font-bold text-navy" style={{ fontSize: '40px', lineHeight: 1.15 }}>
            What I work with.
          </h2>
        </AnimateIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.label} label={group.label} skills={group.skills} cardIndex={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
