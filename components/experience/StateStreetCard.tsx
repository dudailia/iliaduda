'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const FACTS = [
  'Created the world\'s first ETF (SPY) in 1993',
  '3rd largest asset manager globally',
  'Serving institutional clients across 50+ countries',
]

function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf: number
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target * 10) / 10)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])
  return value
}

export default function StateStreetCard() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const aum = useCountUp(4.4, 1800, isInView)

  return (
    <div ref={ref}>
      {/* AUM display */}
      <div className="text-center py-6 mb-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="font-mono text-white/30 uppercase tracking-widest mb-2" style={{ fontSize: '9px' }}>
          ASSETS UNDER MANAGEMENT
        </p>
        <div className="font-display font-extrabold text-white" style={{ fontSize: 'clamp(48px, 8vw, 72px)', lineHeight: 1, letterSpacing: '-0.04em' }}>
          ${aum.toFixed(1)}T
        </div>
        <p className="font-body text-white/40 mt-2" style={{ fontSize: '13px' }}>Under Management</p>
      </div>

      {/* Facts */}
      <div className="space-y-2 mb-5">
        {FACTS.map((fact, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.2 + i * 0.15, duration: 0.5 }}
            className="flex items-start gap-2.5 p-3 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <span className="font-mono mt-0.5 flex-shrink-0" style={{ color: '#60A5FA', fontSize: '10px' }}>→</span>
            <p className="font-body text-white/60" style={{ fontSize: '12px', lineHeight: 1.5 }}>{fact}</p>
          </motion.div>
        ))}
      </div>

      {/* Incoming badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.7, duration: 0.5 }}
        className="flex items-center justify-center gap-2 py-3 rounded-xl font-mono"
        style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', fontSize: '11px', color: '#93C5FD' }}
      >
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#3B82F6' }} />
        Joining as Investment Management Co-op, July 2026
      </motion.div>
    </div>
  )
}
