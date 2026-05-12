'use client'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'

const DATA = [
  { date: 'Jul 3',  moex: 2780, oil: 74.2 },
  { date: 'Jul 10', moex: 2810, oil: 76.1 },
  { date: 'Jul 17', moex: 2845, oil: 75.8 },
  { date: 'Jul 24', moex: 2890, oil: 77.3 },
  { date: 'Jul 31', moex: 2920, oil: 78.1 },
  { date: 'Aug 7',  moex: 2865, oil: 76.9 },
  { date: 'Aug 14', moex: 2903, oil: 79.2 },
  { date: 'Aug 21', moex: 2941, oil: 80.5 },
  { date: 'Aug 28', moex: 2978, oil: 81.1 },
]

const SECTORS = [
  { sector: 'Energy', color: '#60A5FA', companies: ['Lukoil', 'Novatek', 'Tatneft'] },
  { sector: 'Metals', color: '#F59E0B', companies: ['Severstal', 'Mechel'] },
  { sector: 'Banking', color: '#A78BFA', companies: ['Sector Analysis'] },
]

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p className="font-mono text-white/60 mb-1" style={{ fontSize: '10px' }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} className="font-mono" style={{ fontSize: '11px', color: p.color }}>
          {p.name === 'moex' ? `MOEX: ${p.value}` : `Brent: $${p.value}`}
        </p>
      ))}
    </div>
  )
}

export default function BCSChart() {
  return (
    <div>
      {/* Chart */}
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={DATA} margin={{ top: 4, right: 24, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="date"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9, fontFamily: 'var(--font-jetbrains)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <YAxis
              yAxisId="moex"
              orientation="left"
              domain={['auto', 'auto']}
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <YAxis
              yAxisId="oil"
              orientation="right"
              domain={['auto', 'auto']}
              tick={{ fill: 'rgba(251,191,36,0.4)', fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <ReferenceLine
              yAxisId="moex"
              x="Jul 3"
              stroke="rgba(255,255,255,0.25)"
              strokeDasharray="3 3"
              label={{ value: 'Start', fill: 'rgba(255,255,255,0.3)', fontSize: 9, position: 'top' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
            <Line yAxisId="moex" type="monotone" dataKey="moex" stroke="#60A5FA" strokeWidth={2} dot={false} />
            <Line yAxisId="oil" type="monotone" dataKey="oil" stroke="#FBBF24" strokeWidth={2} dot={false} strokeDasharray="4 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex gap-5 mt-2 mb-5">
        <span className="flex items-center gap-1.5 font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}>
          <span className="w-3 h-0.5 inline-block rounded" style={{ background: '#60A5FA' }} />
          MOEX Index
        </span>
        <span className="flex items-center gap-1.5 font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}>
          <span className="w-3 h-0 inline-block" style={{ borderTop: '1.5px dashed #FBBF24' }} />
          Brent Crude
        </span>
      </div>

      {/* Coverage cards */}
      <div className="grid grid-cols-3 gap-2">
        {SECTORS.map(s => (
          <div key={s.sector} className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${s.color}30` }}>
            <p className="font-mono mb-2" style={{ fontSize: '9px', color: s.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.sector}</p>
            {s.companies.map(c => (
              <div key={c} className="flex items-center gap-1.5 mb-1">
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: s.color + '60' }} />
                <span className="font-mono text-white/40" style={{ fontSize: '9px' }}>{c}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
