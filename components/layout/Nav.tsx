'use client'
import { useState, useEffect } from 'react'
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
          background: scrolled || mobileOpen ? 'rgba(247,248,250,0.95)' : 'transparent',
          backdropFilter: scrolled || mobileOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled || mobileOpen ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div
          className="mx-auto h-full flex items-center justify-between px-5 md:px-6"
          style={{ maxWidth: '1140px' }}
        >
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
            <a
              href="/resume.pdf"
              download
              className="font-body transition-all duration-150"
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
            className="md:hidden p-2 -mr-2"
            style={{ color: 'var(--ink)' }}
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed left-0 right-0 z-40 md:hidden"
            style={{
              top: '60px',
              background: 'rgba(247,248,250,0.98)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid var(--border)',
              boxShadow: '0 8px 32px rgba(15,23,42,0.08)',
            }}
          >
            <div className="flex flex-col px-5 py-4 gap-0">
              {NAV_LINKS.map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="font-body py-4 transition-colors duration-150"
                  style={{
                    fontSize: '24px',
                    color: active === link.id ? 'var(--blue)' : 'var(--ink)',
                    borderBottom: '1px solid var(--border)',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download
                className="font-body mt-4 py-3 text-center rounded-md transition-all duration-150"
                style={{
                  fontSize: '15px',
                  color: 'var(--blue)',
                  border: '1px solid var(--blue-mid)',
                  background: 'var(--blue-light)',
                }}
                onClick={() => setMobileOpen(false)}
              >
                Resume ↓
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
