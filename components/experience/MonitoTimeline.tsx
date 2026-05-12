'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  { date: 'Sep 2022', title: 'Founded Monito', win: false },
  { date: 'Oct 2022', title: 'Regional Competition entry', win: false },
  { date: 'Jan 2023', title: 'Won Worcestershire & Warwickshire Regional Award 🏆', win: true },
  { date: 'Mar 2023', title: 'Won West Midlands Company of the Year 🏆', win: true },
  { date: 'May 2023', title: 'UK National Company of the Year 🏆🏆', win: true },
  { date: 'Jul 2023', title: 'Selected for European Finals 🌍', win: true },
  { date: 'Sep 2023', title: 'European Finalist 🌍', win: true },
]

export default function MonitoTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const line = lineRef.current
    if (!line) return

    // Draw the line from top to bottom
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.5,
        ease: 'power2.inOut',
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 1,
        },
      }
    )

    // Pop in each dot sequentially
    gsap.fromTo(
      '.milestone-dot',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.15,
        duration: 0.4,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    )

    // Fade in milestone text
    gsap.fromTo(
      '.milestone-text',
      { opacity: 0, x: 10 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.12,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      }
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical line */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: '10px', width: '1px', background: 'rgba(255,255,255,0.1)', top: '10px' }}
      >
        <div
          ref={lineRef}
          style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, #C8A96E, rgba(200,169,110,0.3))', transformOrigin: 'top', transform: 'scaleY(0)' }}
        />
      </div>

      {/* Milestones */}
      <div className="space-y-4">
        {MILESTONES.map((m, i) => (
          <div key={i} className="flex items-start gap-4 pl-0">
            {/* Dot */}
            <div
              className="milestone-dot flex-shrink-0 rounded-full"
              style={{
                width: m.win ? '14px' : '10px',
                height: m.win ? '14px' : '10px',
                marginTop: '3px',
                marginLeft: m.win ? '-1px' : '1px',
                background: m.win ? '#C8A96E' : 'rgba(255,255,255,0.25)',
                boxShadow: m.win ? '0 0 8px rgba(200,169,110,0.5)' : 'none',
                border: m.win ? '2px solid rgba(200,169,110,0.4)' : 'none',
                scale: 0,
                zIndex: 1,
                position: 'relative',
              }}
            />

            {/* Text */}
            <div className="milestone-text pb-1" style={{ opacity: 0 }}>
              <span className="font-mono text-white/40 block mb-0.5" style={{ fontSize: '10px' }}>{m.date}</span>
              <span
                className="font-body"
                style={{ fontSize: '13px', color: m.win ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}
              >
                {m.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Locations */}
      <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="font-mono text-white/30 uppercase tracking-widest mb-2" style={{ fontSize: '9px' }}>
          COMPETITION GEOGRAPHY
        </p>
        <div className="flex gap-4">
          {[
            { dot: '🇬🇧', label: 'Bromsgrove, UK', desc: 'Company base' },
            { dot: '🌍', label: 'European Finals', desc: 'International stage' },
          ].map(loc => (
            <div key={loc.label} className="flex items-start gap-2">
              <span style={{ fontSize: '16px' }}>{loc.dot}</span>
              <div>
                <p className="font-mono text-white/60" style={{ fontSize: '10px' }}>{loc.label}</p>
                <p className="font-mono text-white/30" style={{ fontSize: '9px' }}>{loc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
