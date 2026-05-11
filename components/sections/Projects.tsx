'use client'
import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SectionTag } from '@/components/ui/SectionTag'
import { ShutterTitle } from '@/components/ui/ShutterTitle'
import { projects } from '@/lib/data'

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="flex flex-col h-full p-7 rounded-xl transition-all duration-[220ms] cursor-default"
      style={{
        background: 'var(--surface)',
        border: project.featured ? '1px solid transparent' : '1px solid var(--border)',
        backgroundImage: project.featured
          ? 'linear-gradient(var(--surface), var(--surface)), linear-gradient(90deg, transparent, var(--blue-mid), transparent)'
          : undefined,
        backgroundOrigin: project.featured ? 'border-box' : undefined,
        backgroundClip: project.featured ? 'padding-box, border-box' : undefined,
        borderRadius: '12px',
        transform: hovered ? 'translateY(-3px)' : undefined,
        boxShadow: hovered ? '0 8px 32px rgba(15,23,42,0.10)' : undefined,
        ...(hovered && !project.featured ? { borderColor: 'var(--border-strong)' } : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <span
          className="font-mono uppercase transition-all duration-200"
          style={{
            fontSize: '10px',
            borderRadius: '4px',
            padding: '3px 8px',
            background: hovered ? 'var(--blue-light)' : 'var(--surface-2)',
            border: `1px solid ${hovered ? 'var(--blue-mid)' : 'var(--border)'}`,
            color: hovered ? 'var(--blue)' : 'var(--ink-3)',
          }}
        >
          {project.type}
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: '11px',
            borderRadius: '4px',
            padding: '3px 8px',
            flexShrink: 0,
            background: project.statusColor === 'green' ? '#F0FDF4' : 'var(--blue-light)',
            border: `1px solid ${project.statusColor === 'green' ? '#BBF7D0' : 'var(--blue-mid)'}`,
            color: project.statusColor === 'green' ? '#16A34A' : 'var(--blue)',
          }}
        >
          {project.status}
        </span>
      </div>

      <h3
        className="font-display font-bold mb-1 transition-colors duration-200"
        style={{ fontSize: '20px', color: hovered ? 'var(--blue)' : 'var(--navy)' }}
      >
        {project.title}
      </h3>
      <p className="font-body text-ink-3 mb-3" style={{ fontSize: '13px' }}>{project.company}</p>
      <p className="font-body text-ink-2 flex-1 mb-4" style={{ fontSize: '14px', lineHeight: 1.6 }}>{project.description}</p>

      {/* Metrics */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.metrics.map(m => (
          <span key={m} className="font-mono" style={{ fontSize: '11px', color: 'var(--blue)', background: 'var(--blue-light)', border: '1px solid var(--blue-mid)', borderRadius: '4px', padding: '3px 8px' }}>{m}</span>
        ))}
      </div>

      {/* Tech */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.map(t => (
          <span key={t} className="font-mono" style={{ fontSize: '11px', color: 'var(--ink-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', padding: '3px 8px' }}>{t}</span>
        ))}
      </div>

      {/* Links */}
      {(project.links.live || project.links.github) && (
        <div className="flex gap-4 pt-3 mt-auto" style={{ borderTop: '1px solid var(--border)' }}>
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-mono transition-colors duration-150" style={{ fontSize: '12px', color: 'var(--blue)' }}>
              <ExternalLink size={12} /> Live
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-mono transition-colors duration-150" style={{ fontSize: '12px', color: 'var(--ink-3)' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}>
              <ExternalLink size={12} /> GitHub
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-28 px-5 md:px-6 bg-surface">
      <div className="mx-auto max-w-content">
        <AnimateIn className="mb-12">
          <SectionTag>03 — Projects</SectionTag>
          <ShutterTitle className="font-display font-bold text-navy mb-2" style={{ fontSize: '40px', lineHeight: 1.15 }}>
            Things I&apos;ve built.
          </ShutterTitle>
          <p className="font-body text-ink-2" style={{ fontSize: '16px' }}>
            Production systems, academic research, and everything in between.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <AnimateIn key={project.id} delay={i * 80}>
              <ProjectCard project={project} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
