'use client'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

const DEVICE_DATA = [
  { name: 'Mobile', value: 79, fill: '#3B82F6' },
  { name: 'Desktop', value: 21, fill: 'rgba(255,255,255,0.15)' },
]
const CATEGORY_DATA = [
  { category: 'Concerts', revenue: 38 },
  { category: 'Theatre', revenue: 31 },
  { category: 'Sports', revenue: 14 },
  { category: 'Exhibitions', revenue: 10 },
  { category: 'Other', revenue: 7 },
]

export default function YandexCharts() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Donut */}
        <div>
          <p className="font-mono text-white/40 uppercase mb-2" style={{ fontSize: '9px', letterSpacing: '0.06em' }}>DEVICE REVENUE SPLIT</p>
          <div style={{ height: 160, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={DEVICE_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={65} startAngle={90} endAngle={-270} dataKey="value" stroke="none" isAnimationActive>
                  {DEVICE_DATA.map((d, i) => <Cell key={i} fill={d.fill} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', pointerEvents: 'none' }}>
              <div className="font-display font-bold text-white" style={{ fontSize: '28px', lineHeight: 1 }}>79%</div>
              <div className="font-mono text-white/40" style={{ fontSize: '9px' }}>MOBILE</div>
            </div>
          </div>
        </div>
        {/* Bar chart */}
        <div>
          <p className="font-mono text-white/40 uppercase mb-2" style={{ fontSize: '9px', letterSpacing: '0.06em' }}>REVENUE BY CATEGORY</p>
          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_DATA} layout="vertical" margin={{ top: 0, right: 4, left: 4, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="category" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9, fontFamily: 'var(--font-jetbrains)' }} width={64} axisLine={false} tickLine={false} />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[0, 3, 3, 0]} isAnimationActive barSize={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Findings */}
      <div className="space-y-2">
        {['Mobile users drive ~79% of revenue', 'Peaks align with autumn cultural season', 'Concerts & theatre lead by volume + value'].map(f => (
          <div key={f} className="px-3 py-2 rounded-lg font-body text-white" style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.3)', fontSize: '11px', lineHeight: 1.4 }}>
            {f}
          </div>
        ))}
      </div>
    </div>
  )
}
