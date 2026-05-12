'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, ExternalLink, ArrowRight } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { personal } from '@/lib/data'

const ROWS = [
  { Icon: Mail, type: 'EMAIL', value: personal.email, href: `mailto:${personal.email}` },
  { Icon: ExternalLink, type: 'LINKEDIN', value: 'linkedin.com/in/ilia-duda', href: personal.linkedin },
  { Icon: ExternalLink, type: 'GITHUB', value: 'github.com/dudailia', href: personal.github },
]

export function ContactClient() {
  const rowsRef = useRef(null)
  const rowsInView = useInView(rowsRef, { once: true, margin: '-60px' })

  return (
    <div className="pb-24 px-5 md:px-6">
      <div className="mx-auto" style={{ maxWidth: '600px' }}>
        <AnimateIn>
          <p className="font-body text-ink-2 mb-12 text-center" style={{ fontSize: '18px', lineHeight: 1.55 }}>
            Actively seeking investment management and quantitative finance co-op roles for July–December 2026.
          </p>
        </AnimateIn>

        <div ref={rowsRef} className="space-y-3">
          {ROWS.map(({ Icon, type, value, href }, i) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 16 }}
              animate={rowsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.45, delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <a
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex items-center px-6 py-[18px] rounded-[10px] transition-all duration-[180ms] text-left"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
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
                <ArrowRight size={16} className="transition-colors duration-150" style={{ color: 'var(--ink-3)', flexShrink: 0 }} />
              </a>
            </motion.div>
          ))}
        </div>

        <AnimateIn delay={400} className="text-center mt-10">
          <p className="font-body text-ink-3" style={{ fontSize: '14px' }}>
            Currently based in Boston, MA. Open to remote roles globally.
          </p>
        </AnimateIn>
      </div>
    </div>
  )
}
