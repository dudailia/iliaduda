'use client'
import { AreaChart, Area, ResponsiveContainer, XAxis } from 'recharts'

interface Props { data: Array<{ m: string; s: number; b: number }>; accentColor: string }

export default function ProjectChart({ data, accentColor }: Props) {
  return (
    <div style={{ height: 160 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="m" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
          <Area type="monotone" dataKey="s" stroke="#60A5FA" strokeWidth={2} fill="url(#grad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
