'use client'
import { useEffect, useState, useRef } from 'react'

interface Step { text: string; color?: string; valueText?: string; valueColor?: string; pause?: number }

const STEPS: Step[] = [
  { text: '$ python3 analyze_portfolio.py', color: 'rgba(255,255,255,0.4)' },
  { text: '', pause: 400 },
  { text: 'Loading market data...', color: '#60A5FA' },
  { text: '✓ 20 instruments scanned', color: '#34D399' },
  { text: '✓ Volatility surface built', color: '#34D399' },
  { text: '✓ Regime: Risk-On detected', color: '#34D399' },
  { text: '', pause: 300 },
  { text: 'Portfolio Alpha (vs SPX):  ', color: 'rgba(255,255,255,0.85)', valueText: '+5.3%', valueColor: '#34D399' },
  { text: 'Sharpe Ratio:              ', color: 'rgba(255,255,255,0.85)', valueText: '1.84', valueColor: 'rgba(255,255,255,0.85)' },
  { text: 'Max Drawdown:              ', color: 'rgba(255,255,255,0.85)', valueText: '-4.2%', valueColor: '#F87171' },
  { text: '', pause: 500 },
]

const CHAR_MS = 32

export function TerminalWidget() {
  const [lines, setLines] = useState<Array<{ main: string; value: string }>>([])
  const [cursor, setCursor] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clear = () => { timersRef.current.forEach(clearTimeout); timersRef.current = [] }
  const sched = (fn: () => void, ms: number) => { const id = setTimeout(fn, ms); timersRef.current.push(id) }

  const run = () => {
    clear(); setLines([])
    let delay = 0, lineIdx = 0
    STEPS.forEach(step => {
      if (step.pause) { delay += step.pause; return }
      if (!step.text) { delay += 80; return }
      const li = lineIdx++
      const main = step.text, value = step.valueText ?? ''
      for (let i = 0; i <= main.length; i++) {
        const d = delay + i * CHAR_MS, slice = main.slice(0, i)
        sched(() => setLines(p => { const n=[...p]; n[li]={main:slice,value:''}; return n }), d)
      }
      const afterMain = delay + main.length * CHAR_MS + 40
      if (value) {
        for (let i = 0; i <= value.length; i++) {
          const d = afterMain + i * CHAR_MS, slice = value.slice(0, i)
          sched(() => setLines(p => { const n=[...p]; if(n[li]) n[li]={...n[li],value:slice}; return n }), d)
        }
        delay = afterMain + value.length * CHAR_MS + 60
      } else { delay = afterMain + 60 }
    })
    sched(() => run(), delay + 3500)
  }

  useEffect(() => {
    const el = containerRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { obs.disconnect(); run() } }, { threshold: 0.2 })
    obs.observe(el)
    return () => { obs.disconnect(); clear() }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const id = setInterval(() => setCursor(v => !v), 530)
    return () => clearInterval(id)
  }, [])

  let lineIdx = 0
  return (
    <div ref={containerRef} className="w-full rounded-xl overflow-hidden" style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(15,23,42,0.2)', maxWidth: '440px' }}>
      <div className="flex items-center h-9 px-4 relative" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex gap-1.5">
          {['#FF5F57','#FFBD2E','#28CA41'].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>ilia@portfolio ~ %</span>
      </div>
      <div className="p-5" style={{ minHeight: '220px' }}>
        <div className="font-mono leading-[1.7]" style={{ fontSize: 'clamp(10px, 1.5vw, 12px)' }}>
          {STEPS.map((step, i) => {
            if (step.pause || !step.text) return <div key={i} className="h-3" />
            const li = lineIdx++; const rendered = lines[li]
            if (!rendered) return null
            return (
              <div key={i} className="flex">
                <span style={{ color: step.color }}>{rendered.main}</span>
                {rendered.value && <span style={{ color: step.valueColor }}>{rendered.value}</span>}
              </div>
            )
          })}
          <div className="flex items-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <span>$ </span>
            <span className="inline-block w-[7px] h-[14px] ml-0.5" style={{ background: 'rgba(255,255,255,0.7)', opacity: cursor ? 1 : 0, transition: 'opacity 0.08s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
