import type { Metadata } from 'next'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { education, skills } from '@/lib/data'
import { SkillsMatrix } from '@/components/SkillsMatrix'

export const metadata: Metadata = {
  title: 'About — Ilia Duda',
  description: 'Mathematics & Business student at Northeastern. Skills in Python, quantitative finance, AI engineering, and full-stack development.',
}

const BIO = [
  "I'm a second-year Mathematics and Business Administration student at Northeastern University, targeting roles at the intersection of quantitative finance and AI. I think carefully about markets and build the tools to act on that thinking — not as separate disciplines, but as one integrated practice.",
  "My background spans both sides of the desk. I spent the summer of 2023 writing daily market briefings at BCS Bank's investment banking division — OFZ bonds, MOEX equity flows, Bank of Russia policy. Today I'm sole engineer at Glacier Capital Systems, where I built a live options trading infrastructure stack from scratch. In July 2026 I join State Street Global Advisors as an investment management co-op.",
  "I also founded CloseBooks — an AI-powered bookkeeping automation platform built on the Anthropic Claude API, currently in active partnership conversations with CPA firms in the Boston area. I believe the next generation of finance will be built by people who can do both: understand the math and ship the code.",
]

const fadein = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } } }

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--bg)' }}>
      {/* Bio + Photo */}
      <section className="px-5 md:px-10 py-20">
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-12 items-start">
            {/* Photo */}
            <motion.div initial="hidden" whileInView="show" variants={fadein} viewport={{ once: true }}>
              <div className="relative overflow-hidden rounded-xl mx-auto md:mx-0" style={{ maxWidth: '320px', aspectRatio: '3/4', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <Image src="/headshot.jpg" alt="Ilia Duda" fill className="object-cover object-top" style={{ mixBlendMode: 'multiply' }} priority />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-[700] text-5xl" style={{ color: 'var(--border-strong)' }}>ID</span>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-xl mx-auto md:mx-0" style={{ maxWidth: '320px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                {[{ k: 'Location', v: 'Boston, MA' }, { k: 'Email', v: 'duda.i@northeastern.edu' }].map(row => (
                  <div key={row.k} className="flex justify-between py-1.5" style={{ borderBottom: '1px solid var(--border)' }}>
                    <span className="font-mono text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>{row.k}</span>
                    <span className="font-body text-[12px]" style={{ color: 'var(--text-2)' }}>{row.v}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bio */}
            <div>
              <motion.div initial="hidden" whileInView="show" variants={fadein} viewport={{ once: true }}>
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] mb-3" style={{ color: 'var(--blue)' }}>About</p>
                <h1 className="font-display font-[800] mb-8" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                  Quantitative analyst.<br />Engineer. Entrepreneur<span style={{ color: 'var(--blue)' }}>.</span>
                </h1>
              </motion.div>
              <div className="space-y-5">
                {BIO.map((p, i) => (
                  <motion.p key={i} initial="hidden" whileInView="show" variants={fadein} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="font-body" style={{ fontSize: '16px', color: 'var(--text-2)', lineHeight: 1.75 }}>{p}</motion.p>
                ))}
              </div>
              <motion.div initial="hidden" whileInView="show" variants={fadein} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                <div className="flex flex-wrap gap-4 mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                  {["Northeastern '28", "Boston, MA", "English & Russian"].map(f => (
                    <span key={f} className="font-mono text-[12px]" style={{ color: 'var(--text-3)' }}>{f}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-5 md:px-10 py-16" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <motion.div initial="hidden" whileInView="show" variants={fadein} viewport={{ once: true }} className="mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] mb-2" style={{ color: 'var(--blue)' }}>Skills</p>
            <h2 className="font-display font-[700]" style={{ fontSize: 'clamp(26px, 3vw, 36px)', color: 'var(--navy)', letterSpacing: '-0.02em' }}>What I work with.</h2>
          </motion.div>
          <SkillsMatrix />
        </div>
      </section>

      {/* Education */}
      <section className="px-5 md:px-10 py-16" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="mx-auto" style={{ maxWidth: '1100px' }}>
          <motion.div initial="hidden" whileInView="show" variants={fadein} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] mb-2" style={{ color: 'var(--blue)' }}>Education</p>
            <h2 className="font-display font-[700]" style={{ fontSize: 'clamp(26px, 3vw, 36px)', color: 'var(--navy)', letterSpacing: '-0.02em' }}>Academic background.</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Northeastern */}
            <motion.div initial="hidden" whileInView="show" variants={fadein} viewport={{ once: true }}>
              <div className="p-7 rounded-xl h-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-[700] mb-5 text-[14px]" style={{ background: 'var(--blue-bg)', color: 'var(--blue)' }}>NU</div>
                <h3 className="font-display font-[700] mb-1" style={{ fontSize: '18px', color: 'var(--navy)' }}>{education.university.name}</h3>
                <p className="font-body mb-1" style={{ fontSize: '14px', color: 'var(--text-2)' }}>{education.university.degree}</p>
                <p className="font-mono text-[11px] mb-5" style={{ color: 'var(--text-3)' }}>{education.university.period} · {education.university.location}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.06em] mb-3" style={{ color: 'var(--blue)' }}>Coursework</p>
                <div className="overflow-x-auto">
                  <div className="flex gap-1.5 pb-2" style={{ width: 'max-content' }}>
                    {education.university.courses.map(c => (
                      <span key={c} className="font-mono text-[11px] rounded px-2.5 py-1 whitespace-nowrap" style={{ color: 'var(--text-3)', background: 'var(--surface-hover)', border: '1px solid var(--border)' }}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Schools */}
            <div className="space-y-4">
              {education.schools.map((s, i) => (
                <motion.div key={s.name} initial="hidden" whileInView="show" variants={fadein} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div className="p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <h3 className="font-display font-[600] mb-1" style={{ fontSize: '16px', color: 'var(--navy)' }}>{s.name}</h3>
                    <p className="font-body text-[14px]" style={{ color: 'var(--text-2)' }}>{s.qualification}</p>
                    <p className="font-mono text-[11px] mt-1" style={{ color: 'var(--text-3)' }}>{s.period} · {s.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <motion.div initial="hidden" whileInView="show" variants={fadein} viewport={{ once: true }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] mb-4" style={{ color: 'var(--blue)' }}>Certifications</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {education.certs.map((cert, i) => (
              <motion.div key={cert.name} initial="hidden" whileInView="show" variants={fadein} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div className="p-5 rounded-xl flex items-start gap-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-[700] shrink-0" style={{ background: cert.color, color: cert.lightText ? '#fff' : '#000', fontSize: '11px' }}>
                    {cert.initials}
                  </div>
                  <div>
                    <h4 className="font-body font-[500] text-[14px] mb-0.5" style={{ color: 'var(--text-1)' }}>{cert.name}</h4>
                    <p className="font-body text-[13px]" style={{ color: 'var(--text-3)' }}>{cert.issuer} · {cert.year}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
