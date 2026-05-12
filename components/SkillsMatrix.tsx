'use client'
import { useState } from 'react'
import { skills } from '@/lib/data'

export function SkillsMatrix() {
  const [selected, setSelected] = useState<string | null>(null)

  const toggle = (s: string) => setSelected(prev => prev === s ? null : s)

  return (
    <div>
      {skills.map((group, gi) => (
        <div
          key={group.label}
          className="flex flex-col sm:flex-row sm:items-start gap-3 py-4"
          style={{ borderBottom: gi < skills.length - 1 ? '1px solid var(--border)' : undefined }}
        >
          <div className="shrink-0" style={{ width: '160px', paddingTop: '2px' }}>
            <span className="font-mono uppercase" style={{ fontSize: '10px', color: 'var(--blue)', letterSpacing: '0.1em' }}>{group.label}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {group.items.map(item => {
              const isSelected = selected === item
              return (
                <button
                  key={item}
                  onClick={() => toggle(item)}
                  className="font-mono text-[11px] rounded px-2 py-0.5 transition-all duration-150"
                  style={{
                    border: `1px solid ${isSelected ? 'var(--blue)' : 'var(--border)'}`,
                    background: isSelected ? 'var(--blue-bg)' : 'var(--surface-hover)',
                    color: isSelected ? 'var(--blue)' : 'var(--text-2)',
                    cursor: 'pointer',
                    outline: isSelected ? '2px solid var(--blue-border)' : 'none',
                    outlineOffset: '1px',
                  }}
                >
                  {item}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
