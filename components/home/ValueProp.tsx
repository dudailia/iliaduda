'use client'
import { useEffect, useRef } from 'react'
import { TrendingUp, Cpu, Award } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { valueProps } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const ICONS = { TrendingUp, Cpu, Award } as const

export function ValueProp() {
  const sectionRef = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLElement | null)[]>([])

  useGSAP(
    () => {
      const el = sectionRef.current
      if (!el) return

      // Animate counter numbers
      counterRefs.current.forEach((counter, i) => {
        if (!counter) return
        const target = i + 1
        const obj = { value: 0 }
        gsap.to(obj, {
          value: target,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            if (counter) counter.textContent = String(Math.round(obj.value)).padStart(2, '0')
          },
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            once: true,
          },
        })
      })

      // Fade and slide in items with stagger
      gsap.fromTo(
        '.vp-item',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            once: true,
          },
        }
      )

      // Icon pop animation
      gsap.fromTo(
        '.vp-icon',
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.12,
          duration: 0.5,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            once: true,
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-5 md:px-10"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1a2a47 100%)' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1140px' }}>
        {/* Header */}
        <AnimateIn className="text-center mb-16">
          <h2
            className="font-display font-bold text-white mb-3"
            style={{
              fontSize: 'clamp(28px, 5vw, 44px)',
              letterSpacing: '-0.02em',
              fontWeight: 800,
            }}
          >
            Why Ilia.
          </h2>
          <p
            className="font-body mx-auto"
            style={{
              fontSize: '17px',
              maxWidth: '540px',
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.58)',
            }}
          >
            A rare combination: institutional finance experience, production engineering, and entrepreneurial track record.
          </p>
        </AnimateIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {valueProps.map((prop, i) => {
            const Icon = ICONS[prop.icon as keyof typeof ICONS]
            return (
              <div
                key={prop.title}
                className="vp-item relative"
                style={{
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '32px',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  gsap.to(el, {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    y: -4,
                    duration: 0.3,
                  })
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  gsap.to(el, {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    y: 0,
                    duration: 0.3,
                  })
                }}
              >
                {/* Large background number */}
                <div
                  className="absolute -top-4 -right-4 pointer-events-none select-none"
                  style={{
                    fontSize: '100px',
                    fontWeight: 900,
                    lineHeight: 1,
                    color: 'rgba(59, 130, 246, 0.08)',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.04em',
                  }}
                >
                  <span
                    ref={(el) => {
                      counterRefs.current[i] = el
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {Icon && (
                    <div className="vp-icon mb-5">
                      <Icon
                        size={32}
                        style={{
                          color: 'rgba(59, 130, 246, 0.9)',
                          strokeWidth: 1.5,
                        }}
                      />
                    </div>
                  )}
                  <h3
                    className="font-display font-bold text-white mb-3"
                    style={{
                      fontSize: '22px',
                      lineHeight: 1.3,
                      fontWeight: 700,
                    }}
                  >
                    {prop.title}
                  </h3>
                  <p
                    className="font-body"
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.7,
                      color: 'rgba(255, 255, 255, 0.62)',
                    }}
                  >
                    {prop.description}
                  </p>
                </div>

                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
