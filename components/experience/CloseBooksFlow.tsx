'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  { label: 'Bank Statement\nPDF / CSV', color: '#3B82F6', icon: '📄' },
  { label: 'LLM\nParser', color: '#8B5CF6', icon: '🤖' },
  { label: 'Chart of Accounts\nMapper', color: '#6366F1', icon: '🗂' },
  { label: 'Categorized\n✓', color: '#10B981', icon: '✅' },
  { label: 'Exceptions\n⚠️', color: '#F59E0B', icon: '⚠️', small: true },
]

export default function CloseBooksFlow() {
  const [animStep, setAnimStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-60px' })

  // Loop animation through steps
  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setAnimStep(prev => (prev + 1) % STEPS.length)
    }, 800)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <div ref={containerRef}>
      {/* Pipeline boxes */}
      <div className="flex items-center gap-0 mb-6" style={{ flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '4px' }}>
        {STEPS.map((step, i) => (
          <div key={i} className="flex items-center flex-shrink-0">
            {/* Box */}
            <div
              className="flex flex-col items-center justify-center text-center rounded-lg px-2 py-2.5"
              style={{
                minWidth: step.small ? '62px' : '72px',
                minHeight: step.small ? '56px' : '68px',
                background: animStep === i ? step.color + '25' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${animStep === i ? step.color : 'rgba(255,255,255,0.1)'}`,
                transition: 'all 0.4s ease',
              }}
            >
              <span style={{ fontSize: step.small ? '14px' : '16px', marginBottom: '3px' }}>{step.icon}</span>
              <span
                className="font-mono"
                style={{ fontSize: '8px', color: animStep === i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)', whiteSpace: 'pre-line', lineHeight: 1.3, textAlign: 'center' }}
              >
                {step.label}
              </span>
            </div>

            {/* Arrow between boxes */}
            {i < STEPS.length - 1 && (
              <div className="flex-shrink-0 mx-1" style={{ width: '20px' }}>
                <svg width="20" height="12" viewBox="0 0 20 12">
                  <line x1="0" y1="6" x2="14" y2="6" stroke={animStep > i ? '#60A5FA' : 'rgba(255,255,255,0.15)'} strokeWidth="1.5" style={{ transition: 'stroke 0.4s' }} />
                  <polyline points="11,2 16,6 11,10" fill="none" stroke={animStep > i ? '#60A5FA' : 'rgba(255,255,255,0.15)'} strokeWidth="1.5" style={{ transition: 'stroke 0.4s' }} />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chart of accounts mini preview */}
      <div className="rounded-lg p-3 mb-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="font-mono text-white/40 uppercase tracking-widest mb-2" style={{ fontSize: '9px' }}>CHART OF ACCOUNTS — SAMPLE MAPPING</p>
        {[
          { raw: 'AMZN WEB SERVICES', mapped: 'Software & Cloud', conf: 98 },
          { raw: 'PAYROLL 2024-03',   mapped: 'Payroll Expenses',  conf: 99 },
          { raw: 'OFFICE DEPOT #44',  mapped: 'Office Supplies',   conf: 94 },
        ].map((row, i) => (
          <div key={i} className="flex items-center justify-between py-1.5" style={{ borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : undefined }}>
            <span className="font-mono text-white/50" style={{ fontSize: '9px', flex: 1 }}>{row.raw}</span>
            <span className="font-mono" style={{ fontSize: '9px', color: '#34D399', flex: 1, textAlign: 'center' }}>→ {row.mapped}</span>
            <span className="font-mono text-white/30" style={{ fontSize: '9px', minWidth: '36px', textAlign: 'right' }}>{row.conf}%</span>
          </div>
        ))}
      </div>

      {/* Animated reduction bar */}
      <div>
        <p className="font-mono text-white/40 uppercase tracking-widest mb-3" style={{ fontSize: '9px' }}>
          MANUAL REVIEW REDUCTION
        </p>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-mono text-white/50" style={{ fontSize: '9px' }}>Before CloseBooks</span>
              <span className="font-mono text-white/50" style={{ fontSize: '9px' }}>100%</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: '6px', background: 'rgba(255,255,255,0.1)' }}>
              <div style={{ width: '100%', height: '100%', background: '#EF4444', borderRadius: '3px' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-mono text-white/50" style={{ fontSize: '9px' }}>With CloseBooks</span>
              <span className="font-mono" style={{ fontSize: '9px', color: '#34D399' }}>~12%</span>
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: '6px', background: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                initial={{ width: '0%' }}
                animate={isInView ? { width: '12%' } : { width: '0%' }}
                transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                style={{ height: '100%', background: '#34D399', borderRadius: '3px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
