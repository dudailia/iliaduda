'use client'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { projects } from '@/lib/data'
import { PageHero } from '@/components/ui/PageHero'
import { AnimateIn } from '@/components/ui/AnimateIn'


function ProjectCard({ project, compact = false }: { project: typeof projects[0]; compact?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <div
        className="shimmer-card group flex flex-col h-full cursor-pointer transition-all duration-200"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: compact ? '10px' : '14px',
          borderTop: `3px solid ${project.accentColor}`,
          padding: compact ? '20px' : '32px',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(15,23,42,0.08)'; e.currentTarget.style.borderTopColor = project.accentColor; e.currentTarget.style.borderRightColor = 'var(--border-strong)'; e.currentTarget.style.borderBottomColor = 'var(--border-strong)'; e.currentTarget.style.borderLeftColor = 'var(--border-strong)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderTopColor = project.accentColor; e.currentTarget.style.borderRightColor = 'var(--border)'; e.currentTarget.style.borderBottomColor = 'var(--border)'; e.currentTarget.style.borderLeftColor = 'var(--border)' }}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="font-mono uppercase" style={{ fontSize: '10px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 8px' }}>{project.type}</span>
          <span className="font-mono" style={{ fontSize: '11px', borderRadius: '4px', padding: '3px 8px', flexShrink: 0, background: project.statusColor === 'green' ? '#F0FDF4' : 'var(--blue-light)', border: `1px solid ${project.statusColor === 'green' ? '#BBF7D0' : 'var(--blue-mid)'}`, color: project.statusColor === 'green' ? '#16A34A' : 'var(--blue)' }}>
            {project.status}
          </span>
        </div>

        <h2 className="font-display font-bold text-navy mb-1" style={{ fontSize: compact ? '17px' : '22px' }}>{project.title}</h2>
        <p className="font-body text-ink-3 italic mb-3" style={{ fontSize: '13px' }}>{project.subtitle}</p>
        <p className="font-body text-ink-2 flex-1 mb-4" style={{ fontSize: '14px', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: compact ? 2 : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>

        {!compact && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.metrics.map(m => (
              <span key={m.label} className="font-mono" style={{ fontSize: '11px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '4px', padding: '3px 8px' }}>
                {m.value} {m.label}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-4">
          {Object.values(project.tech).flat().slice(0, compact ? 3 : 6).map(t => (
            <span key={t} className="font-mono" style={{ fontSize: '10px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 6px' }}>{t}</span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid var(--border)' }}>
          <span className="font-body group-hover:underline" style={{ fontSize: '13px', color: 'var(--blue)' }}>View case study →</span>
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150"
              style={{ color: 'var(--ink-3)' }}
              onClick={e => e.stopPropagation()}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function ProjectsPage() {
  const featured = projects.filter(p => p.featured)
  const others = projects.filter(p => !p.featured)

  return (
    <main className="min-h-screen" style={{ background: 'var(--background)' }}>
      <PageHero
        tag="PROJECTS"
        title="Things I've built."
        subtitle="Production systems, analytics pipelines, academic research — everything built to actually work."
      />

      <div className="pb-24 px-5 md:px-6">
        <div className="mx-auto" style={{ maxWidth: '1140px' }}>

          {/* Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featured.map((project, i) => (
              <AnimateIn key={project.slug} delay={i * 70}>
                <ProjectCard project={project} />
              </AnimateIn>
            ))}
          </div>

          {/* Others */}
          {others.length > 0 && (
            <>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                <span className="font-mono text-ink-3 uppercase" style={{ fontSize: '11px', letterSpacing: '0.06em' }}>More work</span>
                <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {others.map((project, i) => (
                  <AnimateIn key={project.slug} delay={i * 60}>
                    <ProjectCard project={project} compact />
                  </AnimateIn>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
