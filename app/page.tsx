'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, Cpu, Award } from 'lucide-react'
import { TerminalWidget } from '@/components/TerminalWidget'
import { experience, projects } from '@/lib/data'

// ── Text scramble hook ──────────────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
function useScramble(text: string) {
  const [out, setOut] = useState(() => text.split('').map(c => c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join(''))
  useEffect(() => {
    const total = text.length * 9
    let frame = 0
    const id = setInterval(() => {
      frame++
      const resolved = Math.floor((frame / total) * text.length)
      setOut(text.split('').map((char, i) => {
        if (char === ' ') return ' '
        if (i < resolved) return char
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join(''))
      if (frame >= total) { setOut(text); clearInterval(id) }
    }, Math.ceil(1200 / total))
    return () => clearInterval(id)
  }, [text])
  return out
}

// ── Count-up hook ───────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400, delay = 800) {
  const [val, setVal] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect() } }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!started) return
    const t = setTimeout(() => {
      let raf: number
      const start = Date.now()
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1)
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * target))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }, delay)
    return () => clearTimeout(t)
  }, [started, target, duration, delay])
  return { val, ref }
}

// ── Quick pitch data ────────────────────────────────────────────────────────
const PITCH = [
  { n: '01', Icon: TrendingUp, title: 'Finance First', text: 'Real institutional experience: OFZ market briefings at BCS Bank, DCF and equity research models, macro analysis. Not just code — actual finance thinking.' },
  { n: '02', Icon: Cpu, title: 'Ships Real Products', text: 'Sole engineer on a live options trading platform and a production AI SaaS. Not demos — production systems handling real money and real clients.' },
  { n: '03', Icon: Award, title: 'Proven Track Record', text: 'UK National Company of the Year. Perfect 65/65. 300+ hours Python + SQL. State Street co-op incoming. Every role has a measurable outcome.' },
]

// ── Stat item ────────────────────────────────────────────────────────────────
function Stat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { val, ref } = useCountUp(target, 1200, 1400)
  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-bold" style={{ fontSize: '26px', color: 'var(--navy)' }}>
        {suffix === '$' ? `$${val}T+` : suffix === 'K' ? `${val}K+` : `${val}+`}
      </div>
      <div className="font-body text-[12px] mt-1" style={{ color: 'var(--text-3)' }}>{label}</div>
    </div>
  )
}

// ── Fade-in variant ──────────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }

// ── Recent work rows ─────────────────────────────────────────────────────────
const RECENT = [
  { href: '/experience/glacier-capital', name: 'Glacier Capital Systems', role: 'Quantitative Software Engineer', type: 'Quant Finance', period: 'Jan 2026 – Present', tags: ['Python', 'Options', 'Next.js 15'] },
  { href: '/experience/closebooks', name: 'CloseBooks', role: 'Founder & Full-Stack Engineer', type: 'AI SaaS', period: '2024 – Present', tags: ['Next.js', 'Supabase', 'Claude API'] },
  { href: '/projects/yandex-analytics', name: 'Yandex Afisha Analytics', role: 'Data Analytics Capstone', type: 'Data Analytics', period: '2025', tags: ['Python', 'PostgreSQL', 'DataLens'] },
]

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const name = useScramble('ILIA DUDA')

  // Suppress unused import warnings — data is available for future use
  void experience
  void projects

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', background: 'var(--bg)' }}>
        <div className="mx-auto w-full px-5 md:px-10 py-16" style={{ maxWidth: '1100px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">

            {/* Left */}
            <div>
              {/* Badge */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-6 font-mono text-[12px]" style={{ background: 'var(--blue-bg)', border: '1px solid var(--blue-border)', color: 'var(--blue)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--green)' }} />
                Open to Co-op · July 2026
              </motion.div>

              {/* Name */}
              <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }} className="font-display font-[800] leading-none mb-4" style={{ fontSize: 'clamp(52px, 8vw, 80px)', letterSpacing: '-0.04em', color: 'var(--navy)' }}>
                {name}
              </motion.h1>

              {/* Subtitle */}
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="font-mono mb-5" style={{ fontSize: '13px', color: 'var(--text-3)', letterSpacing: '0.05em' }}>
                Quantitative Finance · AI Engineering · Boston, MA
              </motion.p>

              {/* Tagline */}
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="font-body font-[300] mb-8" style={{ fontSize: '19px', color: 'var(--text-2)', maxWidth: '420px', lineHeight: 1.65 }}>
                Building at the intersection of financial markets and machine intelligence.
              </motion.p>

              {/* Buttons */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }} className="flex flex-col sm:flex-row gap-3 mb-10">
                <a href="/resume.pdf" download className="inline-flex items-center justify-center font-body font-[500] text-[14px] rounded-lg px-5 py-2.5 text-white transition-colors duration-150" style={{ background: 'var(--navy)' }} onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue)')} onMouseLeave={e => (e.currentTarget.style.background = 'var(--navy)')}>
                  View Resume ↓
                </a>
                <Link href="/contact" className="inline-flex items-center justify-center font-body text-[14px] rounded-lg px-5 py-2.5 transition-all duration-150" style={{ border: '1px solid var(--border-strong)', color: 'var(--text-2)' }} onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)' }} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-2)' }}>
                  Contact →
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }}>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                  <div className="grid grid-cols-4 gap-4">
                    <Stat target={4} suffix="$" label="AUM (Target)" />
                    <Stat target={20} suffix="+" label="Instruments" />
                    <Stat target={3} suffix="+" label="Prod. Systems" />
                    <Stat target={290} suffix="K" label="Orders" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: terminal */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.8 }} className="flex justify-center lg:justify-end">
              <TerminalWidget />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── QUICK PITCH ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--navy)', padding: '80px 0' }}>
        <div className="mx-auto px-5 md:px-10" style={{ maxWidth: '900px' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {PITCH.map((p, i) => (
              <motion.div key={p.n} initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                <p className="font-display font-[600] mb-3" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>{p.n}</p>
                <div className="mb-3"><p.Icon size={20} style={{ color: 'rgba(255,255,255,0.7)' }} /></div>
                <h3 className="font-body font-[600] mb-2 text-white" style={{ fontSize: '17px' }}>{p.title}</h3>
                <p className="font-body text-[14px]" style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT WORK ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', padding: '96px 0' }}>
        <div className="mx-auto px-5 md:px-10" style={{ maxWidth: '1100px' }}>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display font-[700]" style={{ fontSize: '44px', color: 'var(--navy)', letterSpacing: '-0.03em' }}>Recent work.</h2>
            <Link href="/projects" className="font-body text-[14px] transition-colors duration-150" style={{ color: 'var(--blue)' }}>
              Full case studies →
            </Link>
          </div>

          <div>
            {RECENT.map((row, i) => (
              <motion.div key={row.href} initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
                <Link href={row.href}>
                  <div
                    className="group py-6 px-2 transition-all duration-150 rounded-lg cursor-pointer"
                    style={{ borderBottom: '1px solid var(--border)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-hover)'; e.currentTarget.style.paddingLeft = '16px' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '8px' }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-1.5">
                      <div>
                        <span className="font-body font-[500] text-[16px]" style={{ color: 'var(--text-1)' }}>{row.name}</span>
                        <span className="font-body text-[14px] ml-3" style={{ color: 'var(--text-3)' }}>{row.role}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[11px]" style={{ color: 'var(--text-3)' }}>{row.period}</span>
                        <span className="font-body text-[13px] transition-transform duration-150 group-hover:translate-x-0.5" style={{ color: 'var(--blue)' }}>View →</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {row.tags.map(t => (
                        <span key={t} className="font-mono text-[11px] px-2 py-0.5 rounded" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-3)' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--navy)', padding: '96px 20px', textAlign: 'center' }}>
        <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <h2 className="font-display font-[800] text-white mx-auto mb-5" style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.03em', maxWidth: '600px', lineHeight: 1.1 }}>
            Let&apos;s talk.
          </h2>
          <p className="font-body mx-auto mb-10" style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', maxWidth: '480px', lineHeight: 1.6 }}>
            I&apos;m actively seeking investment management and quantitative finance co-op roles for July 2026. Open to conversations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:duda.i@northeastern.edu" className="inline-flex items-center justify-center font-body font-[500] text-[14px] rounded-lg px-6 py-3 transition-colors duration-150" style={{ background: 'white', color: 'var(--navy)' }} onMouseEnter={e => (e.currentTarget.style.background = '#F1F3F7')} onMouseLeave={e => (e.currentTarget.style.background = 'white')}>
              Email Me
            </a>
            <a href="/resume.pdf" download className="inline-flex items-center justify-center font-body text-[14px] rounded-lg px-6 py-3 transition-all duration-150 text-white" style={{ border: '1px solid rgba(255,255,255,0.25)' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}>
              View Resume
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
