'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillGroups } from '@/lib/data'

interface SkillCardProps {
  group: { label: string; skills: string[] }
  index: number
  selectedSkills: Set<string>
  onToggle: (skill: string) => void
}

function SkillCard({ group, index, selectedSkills, onToggle }: SkillCardProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div
      className="p-6 rounded-[10px] h-full transition-colors duration-200 border border-border hover:border-blue-mid"
      style={{ background: 'var(--surface)' }}
    >
      <p className="font-mono uppercase mb-3" style={{ fontSize: '11px', color: 'var(--blue)', letterSpacing: '0.08em' }}>
        {group.label}
      </p>
      <div className="h-px mb-4" style={{ background: 'var(--border)' }} />
      <div ref={ref} className="flex flex-wrap gap-2">
        {group.skills.map((skill, j) => {
          const isSelected = selectedSkills.has(skill)
          return (
            <motion.button
              key={skill}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2, delay: j * 0.02, ease: 'easeOut' }}
              onClick={() => onToggle(skill)}
              className="font-mono transition-all duration-150"
              style={{
                fontSize: '11px',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer',
                border: `1px solid ${isSelected ? 'var(--blue-dark, #1D4ED8)' : 'var(--border)'}`,
                background: isSelected ? 'var(--blue)' : 'var(--surface-2)',
                color: isSelected ? '#ffffff' : 'var(--ink-2)',
                outline: isSelected ? '2px solid var(--blue)' : 'none',
                outlineOffset: isSelected ? '2px' : '0',
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
  )
}

export function SkillsInteractive() {
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set())

  const handleToggle = useCallback((skill: string) => {
    setSelectedSkills(prev => {
      const next = new Set(prev)
      next.has(skill) ? next.delete(skill) : next.add(skill)
      return next
    })
  }, [])

  const clearAll = () => setSelectedSkills(new Set())
  const count = selectedSkills.size

  return (
    <div>
      {/* Counter bar */}
      <div className="flex items-center justify-between mb-6 h-6">
        {count > 0 ? (
          <>
            <span className="font-mono text-blue" style={{ fontSize: '12px' }}>
              {count} skill{count !== 1 ? 's' : ''} selected
            </span>
            <button
              onClick={clearAll}
              className="font-mono text-ink-3 transition-colors duration-150 hover:text-blue"
              style={{ fontSize: '12px' }}
            >
              × Clear
            </button>
          </>
        ) : (
          <span className="font-mono text-ink-3" style={{ fontSize: '12px' }}>
            Click tags to select
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {skillGroups.map((group, i) => (
          <SkillCard
            key={group.label}
            group={group}
            index={i}
            selectedSkills={selectedSkills}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  )
}
