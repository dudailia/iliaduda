'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { skillGroups } from '@/lib/data'

function SkillCard({ group, index }: { group: { label: string; skills: string[] }; index: number }) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const toggle = (skill: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(skill) ? next.delete(skill) : next.add(skill)
      return next
    })
  }

  return (
    <AnimateIn delay={index * 80}>
      <div
        className="p-6 rounded-[10px] h-full"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--blue-mid)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      >
        <p className="font-mono uppercase mb-3" style={{ fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em' }}>{group.label}</p>
        <div className="h-px mb-4" style={{ background: 'var(--border)' }} />
        <div ref={ref} className="flex flex-wrap gap-2">
          {group.skills.map((skill, j) => {
            const isSelected = selected.has(skill)
            return (
              <motion.button
                key={skill}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2, delay: j * 0.02, ease: 'easeOut' }}
                onClick={() => toggle(skill)}
                className="font-mono transition-colors duration-150"
                style={{
                  fontSize: '11px',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  border: `1px solid ${isSelected ? 'var(--blue-dark)' : 'var(--border)'}`,
                  background: isSelected ? 'var(--blue)' : 'var(--surface-2)',
                  color: isSelected ? '#ffffff' : 'var(--ink-2)',
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'var(--blue-light)'
                    e.currentTarget.style.borderColor = 'var(--blue-mid)'
                    e.currentTarget.style.color = 'var(--blue)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    e.currentTarget.style.background = 'var(--surface-2)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--ink-2)'
                  }
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

export function SkillsInteractive() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {skillGroups.map((group, i) => (
        <SkillCard key={group.label} group={group} index={i} />
      ))}
    </div>
  )
}
