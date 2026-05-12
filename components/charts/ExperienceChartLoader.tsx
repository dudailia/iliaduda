'use client'
import dynamic from 'next/dynamic'

const GlacierChart = dynamic(() => import('./GlacierChart'), {
  ssr: false,
  loading: () => <div style={{ height: 240 }} />,
})

const CHARTS: Record<string, React.ComponentType> = {
  'glacier-capital': GlacierChart,
}

const TITLES: Record<string, string> = {
  'glacier-capital': 'Strategy Performance vs. SPY — Simulated YTD',
}

export function ExperienceChartLoader({ slug }: { slug: string }) {
  const Chart = CHARTS[slug]
  const title = TITLES[slug]
  if (!Chart) return null
  return (
    <div className="rounded-xl p-6" style={{ background: 'var(--navy)' }}>
      {title && <p className="font-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>{title}</p>}
      <Chart />
    </div>
  )
}
