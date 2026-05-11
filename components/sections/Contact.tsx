'use client'
import { Mail, ExternalLink, ArrowRight } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SectionTag } from '@/components/ui/SectionTag'
import { personal } from '@/lib/data'

const ROWS = [
  { Icon: Mail, type: 'EMAIL', value: personal.email, href: `mailto:${personal.email}` },
  { Icon: ExternalLink, type: 'LINKEDIN', value: 'linkedin.com/in/ilia-duda', href: personal.linkedin },
  { Icon: ExternalLink, type: 'GITHUB', value: 'github.com/dudailia', href: personal.github },
]

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-28 px-5 md:px-6 bg-surface-2">
      <div className="mx-auto max-w-content text-center">
        <AnimateIn>
          <SectionTag className="justify-center text-center">06 — Contact</SectionTag>
          <h2 className="font-display font-extrabold text-navy mb-5 mx-auto" style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.1 }}>
            Let&apos;s work together.
          </h2>
          <p className="font-body text-ink-2 mx-auto mb-12" style={{ fontSize: '18px', maxWidth: '540px', lineHeight: 1.5 }}>
            Actively seeking investment management and quantitative finance co-op roles for July–December 2026.
          </p>
        </AnimateIn>

        <div className="flex flex-col gap-3 mx-auto w-full" style={{ maxWidth: 'min(600px, 100%)' }}>
          {ROWS.map(({ Icon, type, value, href }, i) => (
            <AnimateIn key={type} delay={i * 80}>
              <a
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex items-center px-6 py-[18px] rounded-[10px] transition-all duration-[180ms] text-left"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.borderColor = 'var(--blue-mid)'
                  el.style.background = 'var(--blue-light)'
                  el.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.borderColor = 'var(--border)'
                  el.style.background = 'var(--surface)'
                  el.style.transform = ''
                }}
              >
                <Icon size={20} style={{ color: 'var(--blue)', flexShrink: 0 }} />
                <span className="font-mono text-ink-3 mx-4 w-20 text-left" style={{ fontSize: '11px' }}>{type}</span>
                <span className="font-body text-navy flex-1 text-left" style={{ fontSize: '15px' }}>{value}</span>
                <ArrowRight
                  size={16}
                  className="transition-colors duration-150"
                  style={{ color: 'var(--ink-3)', flexShrink: 0 }}
                />
              </a>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
