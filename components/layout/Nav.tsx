'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
]

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return active
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const active = useActiveSection(NAV_LINKS.map(l => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          height: '60px',
          background: scrolled ? 'rgba(247,248,250,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="mx-auto max-w-content px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display font-bold text-navy"
            style={{ fontSize: '14px', letterSpacing: '0.08em' }}
          >
            ILIA DUDA
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="font-body transition-colors duration-150"
                style={{
                  fontSize: '14px',
                  color: active === link.id ? 'var(--blue)' : 'var(--ink-2)',
                }}
                onMouseEnter={e => { if (active !== link.id) (e.target as HTMLElement).style.color = 'var(--blue)' }}
                onMouseLeave={e => { if (active !== link.id) (e.target as HTMLElement).style.color = 'var(--ink-2)' }}
              >
                {link.label}
              </a>
            ))}

            {/* Resume button */}
            <a
              href="/resume.pdf"
              download
              className="font-body transition-all duration-150 rounded-md"
              style={{
                fontSize: '13px',
                color: 'var(--ink-2)',
                border: '1px solid var(--border-strong)',
                background: 'var(--surface)',
                padding: '7px 14px',
                borderRadius: '6px',
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
                el.style.background = 'var(--surface)'
              }}
            >
              Resume ↓
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            style={{ color: 'var(--ink)' }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center md:hidden"
            style={{ background: 'var(--surface)', backdropFilter: 'blur(8px)' }}
          >
            <button
              className="absolute top-5 right-5 p-2"
              style={{ color: 'var(--ink-3)' }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} strokeWidth={1.5} />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  className="font-display font-semibold text-navy"
                  style={{ fontSize: '28px' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/resume.pdf"
                download
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 + 0.1 }}
                className="font-body mt-2"
                style={{
                  fontSize: '14px',
                  color: 'var(--blue)',
                  border: '1px solid var(--blue-mid)',
                  background: 'var(--blue-light)',
                  padding: '10px 24px',
                  borderRadius: '6px',
                }}
                onClick={() => setMobileOpen(false)}
              >
                Resume ↓
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
