import Link from 'next/link'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SectionTag } from '@/components/ui/SectionTag'
import { ShutterTitle } from '@/components/ui/ShutterTitle'
import { projects } from '@/lib/data'

export function ProjectsPreview() {
  const featured = projects.filter(p => p.featured).slice(0, 2)

  return (
    <section className="py-16 md:py-24 px-5 md:px-6" style={{ background: 'var(--surface-2)' }}>
      <div className="mx-auto" style={{ maxWidth: '1140px' }}>
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <AnimateIn>
            <SectionTag>PROJECTS</SectionTag>
            <ShutterTitle className="font-display font-bold text-navy" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
              Things I&apos;ve built.
            </ShutterTitle>
          </AnimateIn>
          <Link href="/projects" className="hidden md:block font-body transition-colors duration-150" style={{ fontSize: '14px', color: 'var(--blue)' }}>
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project, i) => (
            <AnimateIn key={project.slug} delay={i * 100}>
              <Link href={`/projects/${project.slug}`} className="block h-full">
                <div
                  className="group flex flex-col h-full p-8 cursor-pointer transition-all duration-200"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', borderTop: `3px solid ${project.accentColor}` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(15,23,42,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="font-mono uppercase" style={{ fontSize: '10px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 8px' }}>{project.type}</span>
                    <span className="font-mono" style={{ fontSize: '11px', borderRadius: '4px', padding: '3px 8px', flexShrink: 0, background: project.statusColor === 'green' ? '#F0FDF4' : 'var(--blue-light)', border: `1px solid ${project.statusColor === 'green' ? '#BBF7D0' : 'var(--blue-mid)'}`, color: project.statusColor === 'green' ? '#16A34A' : 'var(--blue)' }}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-navy mb-1" style={{ fontSize: '22px' }}>{project.title}</h3>
                  <p className="font-body text-ink-3 mb-3 italic" style={{ fontSize: '13px' }}>{project.subtitle}</p>
                  <p className="font-body text-ink-2 flex-1 mb-4" style={{ fontSize: '14px', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.metrics.map(m => (
                      <span key={m.label} className="font-mono" style={{ fontSize: '11px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '4px', padding: '3px 8px' }}>{m.value} {m.label}</span>
                    ))}
                  </div>
                  <span className="font-body group-hover:underline mt-auto" style={{ fontSize: '13px', color: 'var(--blue)' }}>View project →</span>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>

        <div className="md:hidden mt-6 text-center">
          <Link href="/projects" className="font-body" style={{ fontSize: '14px', color: 'var(--blue)' }}>See all projects →</Link>
        </div>
      </div>
    </section>
  )
}
