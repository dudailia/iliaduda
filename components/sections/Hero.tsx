'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Download, ChevronDown } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { CountUp } from '@/components/ui/CountUp'
import { TerminalWidget } from '@/components/ui/TerminalWidget'
import { personal, stats } from '@/lib/data'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const EASE = [0.21, 0.47, 0.32, 0.98] as const

function useScrambleText(text: string, startDelay = 600) {
  const [displayed, setDisplayed] = useState(() =>
    text
      .split('')
      .map(c => (c === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]))
      .join('')
  )
  const [done, setDone] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      const chars = text.split('')
      const nonSpaceCount = chars.filter(c => c !== ' ').length
      const FRAMES_PER_CHAR = 12
      const DURATION = 1200
      const totalFrames = nonSpaceCount * FRAMES_PER_CHAR
      const intervalMs = DURATION / totalFrames
      let frame = 0

      const id = setInterval(() => {
        frame++
        let nonSpacesSeen = 0
        const resolvedNonSpaces = Math.floor(frame / FRAMES_PER_CHAR)

        setDisplayed(
          chars
            .map(char => {
              if (char === ' ') return ' '
              nonSpacesSeen++
              if (nonSpacesSeen <= resolvedNonSpaces) return char
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            })
            .join('')
        )

        if (frame >= totalFrames) {
          setDisplayed(text)
          setDone(true)
          clearInterval(id)
        }
      }, intervalMs)

      return () => clearInterval(id)
    }, startDelay)

    return () => clearTimeout(startTimeout)
  }, [text, startDelay])

  return { displayed, done }
}

function fade(delayMs: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: delayMs / 1000, ease: EASE },
  }
}

export function Hero() {
  const { displayed: scrambledName } = useScrambleText('ILIA DUDA', 600)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ paddingTop: '60px' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Blue glow top-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-100px',
          right: '-100px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #DBEAFE, transparent 70%)',
          opacity: 0.6,
          filter: 'blur(80px)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center mx-auto w-full max-w-content px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 w-full items-center">

          {/* LEFT: content */}
          <div className="flex flex-col">

            {/* Availability badge */}
            <motion.div {...fade(400)}>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono"
                style={{
                  fontSize: '12px',
                  background: 'var(--blue-light)',
                  border: '1px solid var(--blue-mid)',
                  color: 'var(--blue)',
                }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--green)' }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {personal.available}
              </span>
            </motion.div>

            {/* Scramble name */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="font-display font-extrabold text-navy mt-5"
              style={{
                fontSize: 'clamp(52px, 7vw, 88px)',
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
              }}
            >
              {scrambledName}
            </motion.h1>

            {/* Role */}
            <motion.p
              {...fade(800)}
              className="font-mono mt-3"
              style={{ fontSize: '13px', color: 'var(--ink-3)', letterSpacing: '0.06em' }}
            >
              Quantitative Finance · AI Engineering · Boston, MA
            </motion.p>

            {/* Tagline */}
            <motion.p
              {...fade(1000)}
              className="font-body mt-5"
              style={{
                fontSize: 'clamp(17px, 2vw, 20px)',
                fontWeight: 300,
                color: 'var(--ink-2)',
                maxWidth: '440px',
                lineHeight: 1.55,
              }}
            >
              {personal.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div {...fade(1200)} className="flex flex-col sm:flex-row gap-3 mt-7">
              <MagneticButton>
                <a
                  href={personal.resume}
                  download
                  className="inline-flex items-center justify-center gap-2 font-body font-medium text-white rounded-[7px] transition-all duration-[180ms]"
                  style={{ background: 'var(--navy)', padding: '12px 24px', fontSize: '14px' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue-dark)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--navy)')}
                >
                  <Download size={15} />
                  View Resume
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center font-body rounded-[7px] transition-all duration-[180ms]"
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-strong)',
                    color: 'var(--ink-2)',
                    padding: '12px 24px',
                    fontSize: '14px',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--blue)'
                    el.style.color = 'var(--blue)'
                    el.style.background = 'var(--blue-light)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--border-strong)'
                    el.style.color = 'var(--ink-2)'
                    el.style.background = 'transparent'
                  }}
                >
                  Get in Touch
                </a>
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-10 pt-8"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={[
                      'flex flex-col gap-1',
                      i > 0 ? 'pl-4' : '',
                      i < stats.length - 1 ? 'pr-4 border-r border-border' : '',
                      i >= 2 ? 'mt-4 md:mt-0' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <div className="font-display font-bold text-navy" style={{ fontSize: '28px', lineHeight: 1 }}>
                      {stat.prefix}
                      <CountUp target={stat.value} startDelay={1500} duration={1200} />
                      {stat.suffix}
                    </div>
                    <p className="font-body text-ink-3" style={{ fontSize: '12px' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.6, ease: EASE }}
            className="flex flex-col items-start gap-3"
          >
            <TerminalWidget />

            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: '🐍', text: 'Options Strategy Engine' },
                { icon: '🌐', text: 'Live in Production' },
              ].map(chip => (
                <div
                  key={chip.text}
                  className="flex items-center gap-1.5 px-3 py-1.5 font-body"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: 'var(--ink-2)',
                  }}
                >
                  <span>{chip.icon}</span>
                  {chip.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
        <p
          className="font-mono uppercase"
          style={{ fontSize: '10px', color: 'var(--ink-3)', letterSpacing: '0.1em' }}
        >
          scroll
        </p>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} color="var(--ink-3)" />
        </motion.div>
      </div>
    </section>
  )
}
