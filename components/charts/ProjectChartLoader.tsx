'use client'
import dynamic from 'next/dynamic'

const ProjectChart = dynamic(() => import('./ProjectChart'), {
  ssr: false,
  loading: () => <div style={{ height: 160 }} />,
})

interface Props {
  data: Array<{ m: string; s: number; b: number }>
  accentColor: string
}

export function ProjectChartLoader({ data, accentColor }: Props) {
  return (
    <div className="rounded-xl p-5" style={{ background: 'var(--navy)' }}>
      <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
        Performance Chart
      </p>
      <ProjectChart data={data} accentColor={accentColor} />
    </div>
  )
}
