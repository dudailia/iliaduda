'use client'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { personal } from '@/lib/data'

export function HomeCTA() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-6" style={{ background: 'var(--navy)' }}>
      <div className="mx-auto text-center" style={{ maxWidth: '1140px' }}>
        <AnimateIn>
          <h2 className="font-display font-extrabold text-white mb-5" style={{ fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Let&apos;s talk.
          </h2>
          <p className="font-body mx-auto mb-10" style={{ fontSize: '17px', maxWidth: '480px', lineHeight: 1.6, color: 'rgba(255,255,255,0.65)' }}>
            Open to investment management co-ops, quantitative finance roles, and engineering partnerships for July 2026.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton>
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center justify-center font-body font-medium rounded-[7px] transition-all duration-[180ms] w-full sm:w-auto"
                style={{ background: 'white', color: 'var(--navy)', padding: '13px 28px', fontSize: '15px' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F0F2F5')}
                onMouseLeave={e => (e.currentTarget.style.background = 'white')}
              >
                Email Me
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href={personal.resume}
                download
                className="inline-flex items-center justify-center font-body font-medium rounded-[7px] transition-all duration-[180ms] w-full sm:w-auto"
                style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '13px 28px', fontSize: '15px' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
              >
                View Resume
              </a>
            </MagneticButton>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
