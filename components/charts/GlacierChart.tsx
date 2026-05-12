'use client'
import { ComposedChart, Area, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

const DATA = [
  { m: 'Feb', s: 0, b: 0 }, { m: 'Mar', s: 2.1, b: 1.8 }, { m: 'Apr', s: 3.4, b: 2.1 },
  { m: 'May', s: 4.1, b: 2.9 }, { m: 'Jun', s: 5.8, b: 3.2 }, { m: 'Jul', s: 4.9, b: 3.8 },
  { m: 'Aug', s: 7.2, b: 4.1 }, { m: 'Sep', s: 8.9, b: 4.8 }, { m: 'Oct', s: 10.1, b: 5.3 },
  { m: 'Nov', s: 11.4, b: 6.1 }, { m: 'Dec', s: 13.2, b: 7.2 }, { m: 'Jan', s: 15.8, b: 9.1 },
]

function Tip({ active, payload, label }: { active?: boolean; payload?: Array<{name:string;value:number;color:string}>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg px-3 py-2 font-mono" style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', fontSize: '11px' }}>
      <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{label}</p>
      {payload.map(e => (
        <p key={e.name} style={{ color: e.color }}>
          {e.name === 's' ? 'Strategy' : 'SPY'}: {e.value > 0 ? '+' : ''}{e.value}%
        </p>
      ))}
    </div>
  )
}

export default function GlacierChart() {
  return (
    <div>
      <div style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={DATA} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="m" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<Tip />} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
            <Area type="monotone" dataKey="s" fill="rgba(96,165,250,0.12)" stroke="#60A5FA" strokeWidth={2.5} name="s" dot={false} />
            <Line type="monotone" dataKey="b" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} strokeDasharray="4 4" name="b" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-5 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 rounded" style={{ background: '#60A5FA' }} />
          <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Strategy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3" style={{ borderTop: '1.5px dashed rgba(255,255,255,0.25)' }} />
          <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>SPY</span>
        </div>
      </div>
    </div>
  )
}
