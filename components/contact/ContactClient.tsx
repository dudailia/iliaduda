'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ExternalLink, ArrowRight } from 'lucide-react'
import { SectionTag } from '@/components/ui/SectionTag'
import { personal } from '@/lib/data'

const ROWS = [
  { Icon: Mail, type: 'EMAIL', value: personal.email, href: `mailto:${personal.email}`, copyable: true },
  { Icon: ExternalLink, type: 'LINKEDIN', value: 'linkedin.com/in/ilia-duda', href: personal.linkedin, copyable: false },
  { Icon: ExternalLink, type: 'GITHUB', value: 'github.com/dudailia', href: personal.github, copyable: false },
]

export function ContactClient() {
  const [toastVisible, setToastVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(personal.email)
      setToastVisible(true)
      setTimeout(() => setToastVisible(false), 2500)
    } catch {
      window.location.href = `mailto:${personal.email}`
    }
  }

  return (
    <main
      className="flex flex-col items-center justify-center px-5 md:px-10 py-20 md:py-0"
      style={{ minHeight: '100vh', background: 'var(--background)' }}
    >
      {/* Top half */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12 md:mb-16"
      >
        <SectionTag>CONTACT</SectionTag>
        <h1
          className="font-display font-extrabold text-navy mt-3 mb-5 mx-auto"
          style={{ fontSize: 'clamp(36px, 6vw, 68px)', lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: '700px' }}
        >
          Let&apos;s build something.
        </h1>
        <p
          className="font-body text-ink-2 mx-auto"
          style={{ fontSize: '18px', maxWidth: '480px', lineHeight: 1.6 }}
        >
          I&apos;m actively seeking investment management and quantitative finance co-op roles for July–December 2026. Open to conversations about finance, AI, and everything in between.
        </p>
      </motion.div>

      {/* Contact rows */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full space-y-3"
        style={{ maxWidth: '560px' }}
      >
        {ROWS.map(({ Icon, type, value, href, copyable }, i) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
          >
            {copyable ? (
              <button
                onClick={handleEmailClick}
                className="group w-full flex items-center px-6 py-[18px] rounded-[10px] text-left transition-all duration-[180ms]"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-mid)'; e.currentTarget.style.background = 'var(--blue-light)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.transform = '' }}
              >
                <Icon size={20} style={{ color: 'var(--blue)', flexShrink: 0 }} />
                <span className="font-mono text-ink-3 mx-4 w-20 text-left" style={{ fontSize: '11px' }}>{type}</span>
                <span className="font-body text-navy flex-1 text-left" style={{ fontSize: '15px' }}>{value}</span>
                <ArrowRight size={16} style={{ color: 'var(--ink-3)', flexShrink: 0 }} />
              </button>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center px-6 py-[18px] rounded-[10px] transition-all duration-[180ms]"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-mid)'; e.currentTarget.style.background = 'var(--blue-light)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.transform = '' }}
              >
                <Icon size={20} style={{ color: 'var(--blue)', flexShrink: 0 }} />
                <span className="font-mono text-ink-3 mx-4 w-20 text-left" style={{ fontSize: '11px' }}>{type}</span>
                <span className="font-body text-navy flex-1 text-left" style={{ fontSize: '15px' }}>{value}</span>
                <ArrowRight size={16} style={{ color: 'var(--ink-3)', flexShrink: 0 }} />
              </a>
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="font-body text-ink-3 text-center mt-8"
        style={{ fontSize: '14px' }}
      >
        Currently based in Boston, MA. Open to remote roles globally.
      </motion.p>

      {/* Toast */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-8 left-1/2 font-mono"
            style={{
              transform: 'translateX(-50%)',
              background: 'var(--navy)',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '13px',
              zIndex: 9999,
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 32px rgba(15,23,42,0.2)',
            }}
          >
            Email copied to clipboard ✓
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
