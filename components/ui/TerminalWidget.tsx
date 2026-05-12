'use client'
import { useEffect, useState, useRef, useCallback } from 'react'

interface Line {
  main: string
  value: string
  mainColor: string
  valueColor: string
}

const STEPS = [
  { type: 'line' as const, main: '$ python3 analyze_portfolio.py', value: '', mainColor: 'rgba(255,255,255,0.4)', valueColor: '' },
  { type: 'pause' as const, ms: 400 },
  { type: 'line' as const, main: 'Loading market data...', value: '', mainColor: '#60A5FA', valueColor: '' },
  { type: 'line' as const, main: '✓ 20 instruments scanned', value: '', mainColor: '#34D399', valueColor: '' },
  { type: 'line' as const, main: '✓ Volatility surface built', value: '', mainColor: '#34D399', valueColor: '' },
  { type: 'line' as const, main: '✓ Regime: Risk-On detected', value: '', mainColor: '#34D399', valueColor: '' },
  { type: 'pause' as const, ms: 300 },
  { type: 'line' as const, main: 'Portfolio Alpha (vs SPX):  ', value: '+5.3%', mainColor: 'rgba(255,255,255,0.85)', valueColor: '#34D399' },
  { type: 'line' as const, main: 'Sharpe Ratio:              ', value: '1.84', mainColor: 'rgba(255,255,255,0.85)', valueColor: 'rgba(255,255,255,0.85)' },
  { type: 'line' as const, main: 'Max Drawdown:              ', value: '-4.2%', mainColor: 'rgba(255,255,255,0.85)', valueColor: '#F87171' },
  { type: 'pause' as const, ms: 500 },
]

const CHAR_MS = 32

export function TerminalWidget() {
  const [lines, setLines] = useState<Line[]>([])
  const [cursor, setCursor] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }

  const schedule = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms)
    timersRef.current.push(id)
    return id
  }

  const runSequence = useCallback(() => {
    clearAllTimers()
    setLines([])

    let delay = 0
    let lineIndex = 0

    STEPS.forEach(step => {
      if (step.type === 'pause') {
        delay += step.ms
        return
      }

      const { main, value, mainColor, valueColor } = step
      const capturedLineIndex = lineIndex
      lineIndex++

      // Type main text char by char
      for (let i = 0; i <= main.length; i++) {
        const charDelay = delay + i * CHAR_MS
        const slice = main.slice(0, i)
        schedule(() => {
          setLines(prev => {
            const next = [...prev]
            next[capturedLineIndex] = { main: slice, value: '', mainColor, valueColor }
            return next
          })
        }, charDelay)
      }

      const mainDone = delay + main.length * CHAR_MS + 40

      // Type value text char by char (if any)
      if (value) {
        for (let i = 0; i <= value.length; i++) {
          const charDelay = mainDone + i * CHAR_MS
          const slice = value.slice(0, i)
          schedule(() => {
            setLines(prev => {
              const next = [...prev]
              if (next[capturedLineIndex]) {
                next[capturedLineIndex] = { ...next[capturedLineIndex], value: slice }
              }
              return next
            })
          }, charDelay)
        }
        delay = mainDone + value.length * CHAR_MS + 60
      } else {
        delay = mainDone + 60
      }
    })

    // Loop after 3s pause
    schedule(() => runSequence(), delay + 3000)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          runSequence()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      clearAllTimers()
    }
  }, [runSequence])

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursor(v => !v), 530)
    return () => clearInterval(id)
  }, [])

  const displaySteps = STEPS.filter(s => s.type === 'line') as typeof STEPS & { type: 'line' }[]

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl overflow-hidden"
      style={{
        background: '#0F172A',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 24px 64px rgba(15,23,42,0.18)',
        maxWidth: '460px',
      }}
    >
      {/* Title bar */}
      <div
        className="relative flex items-center justify-center h-9 px-4"
        style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="absolute left-4 flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28CA41' }} />
        </div>
        <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
          ilia@portfolio ~ %
        </span>
      </div>

      {/* Output */}
      <div className="p-5" style={{ minHeight: '240px' }}>
        <div className="font-mono leading-[1.7]" style={{ fontSize: 'clamp(10px, 1.5vw, 12px)' }}>
          {STEPS.map((step, i) => {
            if (step.type === 'pause') return <div key={i} className="h-3" />
            const lineIdx = STEPS.slice(0, i).filter(s => s.type === 'line').length
            const rendered = lines[lineIdx]
            if (!rendered) return null
            return (
              <div key={i} className="flex">
                <span style={{ color: step.mainColor }}>{rendered.main}</span>
                {rendered.value && (
                  <span style={{ color: step.valueColor }}>{rendered.value}</span>
                )}
              </div>
            )
          })}

          {/* Cursor */}
          <div className="flex items-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <span>$ </span>
            <span
              className="inline-block w-[7px] h-[14px] ml-0.5"
              style={{
                background: 'rgba(255,255,255,0.7)',
                opacity: cursor ? 1 : 0,
                transition: 'opacity 0.08s',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
