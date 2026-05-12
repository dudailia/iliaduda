'use client'
import { useState, useRef, useCallback } from 'react'
import { skillGroups } from '@/lib/data'

const TOOLTIPS: Record<string, string> = {
  'Python': '300+ hours training — pandas, NumPy, SciPy, sklearn',
  'TypeScript': 'Used in CloseBooks (Next.js 14) and Glacier dashboard',
  'SQL': '290K+ orders analyzed for Yandex Afisha capstone',
  'pandas': 'Core analysis tool for all quant research projects',
  'PyTorch': 'Neural networks and ML model training',
  'Options Pricing': 'Black-Scholes implementation for Glacier Capital',
  'Black-Scholes': 'Implemented from scratch for Glacier options engine',
  'Greeks': 'Delta, gamma, theta, vega — Glacier strategy engine',
  'Volatility Surface': 'Built end-to-end for Glacier Capital research stack',
  'Fama-French Regression': 'FINA 4335 — 33 stocks, Jan 2000–Dec 2025',
  'CAPM': 'Backtested with vectorized methods, zero look-ahead bias',
  'DCF Modeling': 'BCS Bank — Lukoil, Novatek, Tatneft equity research',
  'Equity Research': 'BCS Bank IBD — energy, metals, banking sectors',
  'LLM Pipelines': 'Anthropic Claude API for CloseBooks categorization',
  'Anthropic Claude API': 'CloseBooks transaction categorization pipeline',
  'Agentic AI': 'Anthropic certified — Claude Code in Action (Apr 2026)',
  'Next.js 15': 'Glacier dashboard + CloseBooks production app',
  'Supabase': 'PostgreSQL + Auth + Realtime — Glacier + CloseBooks',
  'Stripe': 'Three-tier billing for CloseBooks SaaS platform',
  'Yandex DataLens': '290K+ orders dashboard for Yandex Afisha capstone',
  'Sharpe Ratio': 'Correctly annualized (×√12) in FINA 4335 project',
  'Max Drawdown': 'Rolling computation on cumulative returns',
}

export function SkillsMatrix() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTagClick = useCallback((skill: string, e: React.MouseEvent) => {
    if (selectedSkill === skill) {
      setSelectedSkill(null)
      return
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (containerRect) {
      setTooltipPos({ x: rect.left - containerRect.left, y: rect.bottom - containerRect.top + 6 })
    }
    setSelectedSkill(skill)
  }, [selectedSkill])

  const clearSelection = useCallback(() => setSelectedSkill(null), [])

  return (
    <div ref={containerRef} className="relative" onClick={e => { if ((e.target as HTMLElement).closest('.skill-tag') === null) clearSelection() }}>
      {/* Counter */}
      <div className="flex items-center justify-between mb-6 h-6">
        {selectedSkill ? (
          <span className="font-mono text-blue" style={{ fontSize: '12px' }}>
            {selectedSkill} selected
          </span>
        ) : (
          <span className="font-mono text-ink-3" style={{ fontSize: '12px' }}>Click any skill to learn more.</span>
        )}
        {selectedSkill && (
          <button onClick={clearSelection} className="font-mono text-ink-3 hover:text-blue transition-colors" style={{ fontSize: '12px' }}>
            × Clear
          </button>
        )}
      </div>

      {/* Matrix rows */}
      <div className="space-y-0">
        {skillGroups.map((group, gi) => (
          <div
            key={group.label}
            className="flex flex-col sm:flex-row sm:items-start gap-3 py-4"
            style={{ borderBottom: gi < skillGroups.length - 1 ? '1px solid var(--border)' : undefined }}
          >
            <div className="flex-shrink-0" style={{ width: '160px', paddingTop: '3px' }}>
              <span className="font-mono uppercase text-blue" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                {group.label}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 flex-1">
              {group.skills.map(skill => {
                const isSelected = selectedSkill === skill
                return (
                  <button
                    key={skill}
                    className="skill-tag font-mono transition-all duration-150"
                    onClick={e => { e.stopPropagation(); handleTagClick(skill, e) }}
                    style={{
                      fontSize: '12px',
                      padding: '5px 11px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      border: `1px solid ${isSelected ? 'var(--blue-dark, #1D4ED8)' : 'var(--border)'}`,
                      background: isSelected ? 'var(--blue)' : 'var(--surface-2)',
                      color: isSelected ? '#ffffff' : 'var(--ink-2)',
                      outline: isSelected ? '2px solid var(--blue)' : 'none',
                      outlineOffset: isSelected ? '2px' : '0',
                    }}
                  >
                    {skill}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Floating tooltip */}
      {selectedSkill && TOOLTIPS[selectedSkill] && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: Math.min(tooltipPos.x, (containerRef.current?.offsetWidth ?? 800) - 280),
            top: tooltipPos.y,
            maxWidth: '260px',
          }}
        >
          <div className="rounded-lg px-3 py-2.5 shadow-lg" style={{ background: 'var(--navy)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="font-mono text-white/50 mb-0.5" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{selectedSkill}</p>
            <p className="font-body text-white" style={{ fontSize: '12px', lineHeight: 1.5 }}>{TOOLTIPS[selectedSkill]}</p>
          </div>
        </div>
      )}
    </div>
  )
}
