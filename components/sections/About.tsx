'use client'
import Image from 'next/image'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SectionTag } from '@/components/ui/SectionTag'

export function About() {
  return (
    <section id="about" className="py-24 md:py-28 px-6" style={{ background: 'var(--surface)' }}>
      <div className="mx-auto max-w-content">
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-12 md:gap-16 items-start">

          {/* Left: photo */}
          <AnimateIn direction="left">
            <div
              className="relative overflow-hidden mx-auto md:mx-0"
              style={{
                borderRadius: '12px',
                border: '1px solid var(--border)',
                background: 'var(--surface-2)',
                maxWidth: '340px',
                aspectRatio: '3/4',
              }}
            >
              <Image
                src="/headshot.jpg"
                alt="Ilia Duda — Quantitative Finance Engineer"
                fill
                className="object-cover object-top"
                loading="lazy"
                style={{ mixBlendMode: 'multiply' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              {/* Fallback monogram */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-bold text-6xl" style={{ color: 'var(--border-strong)' }}>ID</span>
              </div>
            </div>
          </AnimateIn>

          {/* Right: content */}
          <div className="flex flex-col gap-5">
            <AnimateIn>
              <SectionTag>00 — About</SectionTag>
              <h2 className="font-display font-bold text-navy mt-1" style={{ fontSize: '32px', lineHeight: 1.2 }}>
                Quantitative analyst.<br />Engineer. Entrepreneur.
              </h2>
            </AnimateIn>

            <AnimateIn delay={80}>
              <p className="font-body text-ink-2" style={{ fontSize: '16px', lineHeight: 1.7 }}>
                I&apos;m a second-year Mathematics and Business Administration student at Northeastern University. I think carefully about markets and build the tools to act on that thinking — not as separate disciplines, but as one integrated practice.
              </p>
            </AnimateIn>

            <AnimateIn delay={160}>
              <p className="font-body text-ink-2" style={{ fontSize: '16px', lineHeight: 1.7 }}>
                My background spans both sides of the desk. I spent the summer of 2023 writing daily market briefings at BCS Bank&apos;s investment banking division — OFZ bonds, MOEX equity flows, Bank of Russia policy. Today I&apos;m the sole engineer at Glacier Capital Systems, where I built a live options trading infrastructure stack from scratch: scanner, volatility surface model, real-time alert system. In July 2026 I join State Street Global Advisors as an investment management co-op supporting the Chief Investment Strategist.
              </p>
            </AnimateIn>

            <AnimateIn delay={240}>
              <p className="font-body text-ink-2" style={{ fontSize: '16px', lineHeight: 1.7 }}>
                I also founded CloseBooks — an AI-powered bookkeeping automation platform built on the Anthropic Claude API, currently in active partnership conversations with CPA firms in the Boston area. I believe the next generation of finance will be built by people who can do both: understand the math and ship the code.
              </p>
            </AnimateIn>

            <AnimateIn delay={320}>
              <div
                className="flex flex-wrap items-center gap-4 pt-4"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                {['📍 Boston, MA', "🎓 Northeastern '28", '🌍 English & Russian'].map((fact, i) => (
                  <span key={i} className="font-mono text-ink-3" style={{ fontSize: '12px' }}>
                    {fact}
                  </span>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  )
}
