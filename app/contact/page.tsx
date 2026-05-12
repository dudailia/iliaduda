'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ExternalLink, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

const ROWS = [
  { Icon: Mail, type: 'EMAIL', value: 'duda.i@northeastern.edu', href: 'mailto:duda.i@northeastern.edu', copyable: true },
  { Icon: ExternalLink, type: 'LINKEDIN', value: 'linkedin.com/in/ilia-duda', href: 'https://linkedin.com/in/ilia-duda', copyable: false },
  { Icon: ExternalLink, type: 'GITHUB', value: 'github.com/dudailia', href: 'https://github.com/dudailia', copyable: false },
]

export default function ContactPage() {
  const [toastVisible, setToastVisible] = useState(false)

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText('duda.i@northeastern.edu')
      setToastVisible(true)
      setTimeout(() => setToastVisible(false), 2000)
    } catch { window.location.href = 'mailto:duda.i@northeastern.edu' }
  }

  return (
    <main className="flex flex-col items-center justify-center px-5 py-20" style={{ minHeight: '90vh', background: 'var(--bg)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center w-full"
        style={{ maxWidth: '640px' }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] mb-4" style={{ color: 'var(--blue)' }}>Contact</p>
        <h1 className="font-display font-[800] mb-6 mx-auto" style={{ fontSize: 'clamp(36px, 6vw, 68px)', color: 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
          Let&apos;s build something.
        </h1>
        <p className="font-body mx-auto mb-12" style={{ fontSize: '18px', color: 'var(--text-2)', maxWidth: '480px', lineHeight: 1.6 }}>
          I&apos;m actively seeking investment management and quantitative finance co-op roles for July–December 2026. Open to conversations.
        </p>

        <div className="space-y-3 mx-auto" style={{ maxWidth: '560px' }}>
          {ROWS.map(({ Icon, type, value, href, copyable }, i) => (
            <motion.div key={type} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}>
              {copyable ? (
                <button
                  onClick={copyEmail}
                  className="w-full flex items-center gap-4 px-6 rounded-xl transition-all duration-150 text-left"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '18px 24px' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-border)'; e.currentTarget.style.background = 'var(--blue-bg)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)' }}
                >
                  <Icon size={20} style={{ color: 'var(--blue)', flexShrink: 0 }} />
                  <span className="font-mono text-[10px] uppercase tracking-wider w-20 text-left" style={{ color: 'var(--text-3)' }}>{type}</span>
                  <span className="font-body text-[15px] flex-1 text-left" style={{ color: 'var(--text-1)' }}>{value}</span>
                  <ArrowRight size={16} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                </button>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-6 rounded-xl transition-all duration-150"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '18px 24px' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-border)'; e.currentTarget.style.background = 'var(--blue-bg)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)' }}
                >
                  <Icon size={20} style={{ color: 'var(--blue)', flexShrink: 0 }} />
                  <span className="font-mono text-[10px] uppercase tracking-wider w-20 text-left" style={{ color: 'var(--text-3)' }}>{type}</span>
                  <span className="font-body text-[15px] flex-1 text-left" style={{ color: 'var(--text-1)' }}>{value}</span>
                  <ArrowRight size={16} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="font-body mt-10" style={{ fontSize: '14px', color: 'var(--text-3)' }}>
          Based in Boston, MA. Open to remote roles globally.
        </motion.p>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 font-mono text-[13px] text-white rounded-lg px-5 py-2.5 whitespace-nowrap"
            style={{ background: 'var(--navy)', zIndex: 9999, boxShadow: '0 8px 32px rgba(14,17,23,0.15)' }}
          >
            Email copied to clipboard ✓
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
