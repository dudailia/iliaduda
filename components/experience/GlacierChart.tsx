'use client'
import { useEffect, useState } from 'react'
import {
  ComposedChart, Area, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'

const DATA = [
  { month: 'Feb', strategy: 0, spy: 0 },
  { month: 'Mar', strategy: 2.1, spy: 1.8 },
  { month: 'Apr', strategy: 3.4, spy: 2.1 },
  { month: 'May', strategy: 4.1, spy: 2.9 },
  { month: 'Jun', strategy: 5.8, spy: 3.2 },
  { month: 'Jul', strategy: 4.9, spy: 3.8 },
  { month: 'Aug', strategy: 7.2, spy: 4.1 },
  { month: 'Sep', strategy: 8.9, spy: 4.8 },
  { month: 'Oct', strategy: 10.1, spy: 5.3 },
  { month: 'Nov', strategy: 11.4, spy: 6.1 },
  { month: 'Dec', strategy: 13.2, spy: 7.2 },
  { month: 'Jan', strategy: 15.8, spy: 9.1 },
]

interface ScanRow {
  symbol: string
  score: number
  type: string
  dte: string
  active: boolean
}

const BASE_ROWS: Omit<ScanRow, 'active'>[] = [
  { symbol: 'AAPL', score: 87, type: '✓ Premium-Collect', dte: '0–7 DTE' },
  { symbol: 'SPY',  score: 72, type: '✓ Directional',    dte: '35 DTE' },
  { symbol: 'NVDA', score: 91, type: '✓ Premium-Collect', dte: '3 DTE' },
  { symbol: 'TSLA', score: 68, type: '⏸ Below threshold', dte: '—' },
]

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p className="font-mono text-white/60 mb-1" style={{ fontSize: '10px' }}>{label}</p>
      {payload.map(entry => (
        <p key={entry.name} className="font-mono" style={{ fontSize: '11px', color: entry.color }}>
          {entry.name === 'strategy' ? 'Strategy' : 'SPY'}: +{entry.value.toFixed(1)}%
        </p>
      ))}
    </div>
  )
}

export default function GlacierChart() {
  const [rows, setRows] = useState<ScanRow[]>(BASE_ROWS.map(r => ({ ...r, active: false })))
  const [flashIdx, setFlashIdx] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * rows.length)
      const delta = (Math.random() - 0.4) * 3
      setRows(prev => {
        const next = [...prev]
        next[idx] = {
          ...next[idx],
          score: Math.min(99, Math.max(50, Math.round(next[idx].score + delta))),
          active: true,
        }
        return next
      })
      setFlashIdx(idx)
      setTimeout(() => {
        setRows(prev => {
          const next = [...prev]
          if (next[idx]) next[idx] = { ...next[idx], active: false }
          return next
        })
        setFlashIdx(null)
      }, 600)
    }, 2500)
    return () => clearInterval(interval)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {/* Chart */}
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={DATA} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="month"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'var(--font-jetbrains)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <YAxis hide />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
            <Area
              type="monotone"
              dataKey="strategy"
              fill="rgba(96,165,250,0.12)"
              stroke="transparent"
            />
            <Line
              type="monotone"
              dataKey="strategy"
              stroke="#60A5FA"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: '#60A5FA' }}
            />
            <Line
              type="monotone"
              dataKey="spy"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex gap-5 mt-3 mb-5">
        <span className="flex items-center gap-1.5 font-mono" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
          <span className="w-3 h-0.5 inline-block rounded" style={{ background: '#60A5FA' }} />
          Options Strategy
        </span>
        <span className="flex items-center gap-1.5 font-mono" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
          <span className="w-3 h-0 inline-block" style={{ borderTop: '1.5px dashed rgba(255,255,255,0.3)' }} />
          SPY Benchmark
        </span>
      </div>

      {/* Scanner widget */}
      <div className="mt-2 rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="font-mono text-white/40 uppercase tracking-widest" style={{ fontSize: '9px' }}>LIVE SCANNER</span>
          <span className="flex items-center gap-1.5 font-mono" style={{ fontSize: '9px', color: '#34D399' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#34D399' }} />
            ACTIVE
          </span>
        </div>
        {/* Rows */}
        {rows.map((row, i) => {
          const isGood = row.type.startsWith('✓')
          return (
            <div
              key={row.symbol}
              className="flex items-center justify-between px-3 py-2"
              style={{
                borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : undefined,
                background: flashIdx === i ? 'rgba(96,165,250,0.08)' : 'transparent',
                transition: 'background 0.3s ease',
              }}
            >
              <span className="font-mono text-white" style={{ fontSize: '11px', width: '40px' }}>{row.symbol}</span>
              <span
                className="font-mono"
                style={{
                  fontSize: '11px',
                  color: flashIdx === i ? '#60A5FA' : 'rgba(255,255,255,0.6)',
                  transition: 'color 0.3s ease',
                  width: '72px',
                }}
              >
                {row.score}/100
              </span>
              <span className="font-mono" style={{ fontSize: '10px', color: isGood ? '#34D399' : 'rgba(255,255,255,0.3)', flex: 1 }}>
                {row.type}
              </span>
              <span className="font-mono text-white/30" style={{ fontSize: '10px' }}>{row.dte}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
