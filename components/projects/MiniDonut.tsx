'use client'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const DATA = [
  { value: 79, fill: '#3B82F6' },
  { value: 21, fill: 'rgba(255,255,255,0.1)' },
]

export default function MiniDonut() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={DATA} cx="50%" cy="50%" innerRadius="55%" outerRadius="75%" startAngle={90} endAngle={-270} dataKey="value" stroke="none">
            {DATA.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
        <div className="font-display font-bold text-white" style={{ fontSize: '22px', lineHeight: 1 }}>79%</div>
        <div className="font-mono text-white/40" style={{ fontSize: '9px', marginTop: '2px' }}>MOBILE</div>
      </div>
    </div>
  )
}
