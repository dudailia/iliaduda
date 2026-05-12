'use client'
import { TrendingUp, Cpu, Award } from 'lucide-react'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { ShutterTitle } from '@/components/ui/ShutterTitle'
import { valueProps } from '@/lib/data'

const ICONS = { TrendingUp, Cpu, Award } as const

export function ValueProp() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-6" style={{ background: 'var(--surface-2)' }}>
      <div className="mx-auto" style={{ maxWidth: '1140px' }}>
        <AnimateIn className="text-center mb-12">
          <ShutterTitle className="font-display font-bold text-navy mb-3" style={{ fontSize: 'clamp(32px, 4vw, 40px)' }}>
            Why Ilia.
          </ShutterTitle>
          <p className="font-body text-ink-2 mx-auto" style={{ fontSize: '17px', maxWidth: '560px', lineHeight: 1.6 }}>
            A rare combination: institutional finance experience, production engineering, and entrepreneurial track record.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueProps.map((prop, i) => {
            const Icon = ICONS[prop.icon as keyof typeof ICONS]
            return (
              <AnimateIn key={prop.title} delay={i * 100}>
                <div
                  className="p-7 h-full transition-all duration-200"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-mid)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = '' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    {Icon && <Icon size={24} style={{ color: 'var(--blue)' }} />}
                    <span className="font-mono text-ink-3" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-navy mb-2" style={{ fontSize: '18px' }}>{prop.title}</h3>
                  <p className="font-body text-ink-2" style={{ fontSize: '14px', lineHeight: 1.65 }}>{prop.description}</p>
                </div>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
