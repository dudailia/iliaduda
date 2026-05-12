'use client'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'

const DATA = [
  { v: 0 }, { v: 2.1 }, { v: 3.4 }, { v: 4.1 }, { v: 5.8 },
  { v: 4.9 }, { v: 7.2 }, { v: 8.9 }, { v: 10.1 }, { v: 11.4 }, { v: 13.2 }, { v: 15.8 },
]

export default function MiniAreaChart() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={DATA} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
          <defs>
            <linearGradient id="miniGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke="#60A5FA" strokeWidth={2} fill="url(#miniGrad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
