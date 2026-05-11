'use client'
import { useEffect, useState, useRef } from 'react'

interface TerminalLine {
  text: string
  color: string
  valueText?: string
  valueColor?: string
  pause?: number
}

const SEQUENCE: TerminalLine[] = [
  { text: '$ python3 analyze_portfolio.py', color: 'rgba(255,255,255,0.4)' },
  { text: '', color: '', pause: 400 },
  { text: 'Loading market data...', color: '#60A5FA' },
  { text: '✓ 20 instruments scanned', color: '#34D399' },
  { text: '✓ Volatility surface built', color: '#34D399' },
  { text: '✓ Regime: Risk-On detected', color: '#34D399' },
  { text: '', color: '', pause: 300 },
  { text: 'Portfolio Alpha (vs SPX):  ', color: 'rgba(255,255,255,0.85)', valueText: '+5.3%', valueColor: '#34D399' },
  { text: 'Sharpe Ratio:              ', color: 'rgba(255,255,255,0.85)', valueText: '1.84', valueColor: 'rgba(255,255,255,0.85)' },
  { text: 'Max Drawdown:              ', color: 'rgba(255,255,255,0.85)', valueText: '-4.2%', valueColor: '#F87171' },
  { text: '', color: '', pause: 500 },
]

const CHAR_DELAY = 35 // ms per character

export function TerminalWidget() {
  const [lines, setLines] = useState<{ text: string; color: string; valueText?: string; valueColor?: string; done: boolean }[]>([])
  const [cursorVisible, setCursorVisible] = useState(true)
  const [typing, setTyping] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const runSequence = () => {
    setLines([])
    setTyping(true)

    let totalDelay = 0

    SEQUENCE.forEach((line, lineIdx) => {
      if (line.pause) {
        totalDelay += line.pause
        return
      }

      if (line.text === '') {
        totalDelay += 100
        return
      }

      const lineStartDelay = totalDelay
      const chars = line.text.split('')

      chars.forEach((_, charIdx) => {
        const charDelay = lineStartDelay + charIdx * CHAR_DELAY
        timeoutRef.current = setTimeout(() => {
          setLines(prev => {
            const updated = [...prev]
            const existing = updated.find(l => l.text.startsWith(line.text.slice(0, charIdx + 1) === line.text.slice(0, charIdx + 1) ? line.text.slice(0, charIdx) : ''))
            // Build lines array: find or create this line entry
            const lineEntry = updated[lineIdx] || { text: '', color: line.color, valueText: line.valueText, valueColor: line.valueColor, done: false }
            lineEntry.text = line.text.slice(0, charIdx + 1)
            lineEntry.done = charIdx === chars.length - 1
            updated[lineIdx] = lineEntry
            return [...updated]
          })
        }, charDelay)
      })

      // Add value text after main text
      if (line.valueText) {
        const valueDelay = lineStartDelay + chars.length * CHAR_DELAY + 50
        line.valueText.split('').forEach((_, vIdx) => {
          const vCharDelay = valueDelay + vIdx * CHAR_DELAY
          timeoutRef.current = setTimeout(() => {
            setLines(prev => {
              const updated = [...prev]
              if (updated[lineIdx]) {
                updated[lineIdx] = {
                  ...updated[lineIdx],
                  valueText: (line.valueText || '').slice(0, vIdx + 1),
                }
              }
              return [...updated]
            })
          }, vCharDelay)
        })
        totalDelay = lineStartDelay + chars.length * CHAR_DELAY + (line.valueText.length * CHAR_DELAY) + 100
      } else {
        totalDelay = lineStartDelay + chars.length * CHAR_DELAY + 80
      }
    })

    // After sequence done, wait 3s then restart
    const restartDelay = totalDelay + 3000
    timeoutRef.current = setTimeout(() => {
      runSequence()
    }, restartDelay)
  }

  const containerRef = useRef<HTMLDivElement>(null)

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
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(id)
  }, [])

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
      {/* Header */}
      <div
        className="flex items-center h-9 px-4"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex gap-1.5 mr-auto">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28CA41' }} />
        </div>
        <span className="font-mono text-[11px] absolute left-1/2 -translate-x-1/2" style={{ color: 'rgba(255,255,255,0.3)' }}>
          ilia@portfolio ~ %
        </span>
      </div>

      {/* Content */}
      <div className="p-5" style={{ minHeight: '240px' }}>
        <div className="font-mono leading-[1.7] space-y-0" style={{ fontSize: 'clamp(10px, 1.5vw, 12px)' }}>
          {SEQUENCE.map((seqLine, i) => {
            if (seqLine.text === '' || seqLine.pause) {
              return <div key={i} className="h-3" />
            }
            const renderedLine = lines[i]
            if (!renderedLine) return null
            return (
              <div key={i} className="flex flex-wrap">
                <span style={{ color: seqLine.color }}>{renderedLine.text}</span>
                {seqLine.valueText && renderedLine.valueText && (
                  <span style={{ color: seqLine.valueColor }}>{renderedLine.valueText}</span>
                )}
              </div>
            )
          })}
          {/* Cursor line */}
          <div className="flex items-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <span>$ </span>
            <span
              className="inline-block w-[7px] h-[14px] ml-0.5"
              style={{
                background: 'rgba(255,255,255,0.7)',
                opacity: cursorVisible ? 1 : 0,
                transition: 'opacity 0.1s',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
