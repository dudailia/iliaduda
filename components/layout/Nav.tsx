'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          height: '60px',
          background: scrolled || mobileOpen ? 'rgba(247,248,250,0.95)' : 'transparent',
          backdropFilter: scrolled || mobileOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled || mobileOpen ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="mx-auto h-full flex items-center justify-between px-5 md:px-6" style={{ maxWidth: '1140px' }}>
          <Link
            href="/"
            className="font-display font-bold text-navy"
            style={{ fontSize: '14px', letterSpacing: '0.08em' }}
          >
            ILIA DUDA
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body transition-colors duration-150 relative"
                  style={{ fontSize: '14px', color: isActive ? 'var(--blue)' : 'var(--ink-2)' }}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px" style={{ background: 'var(--blue)' }} />
                  )}
                </Link>
              )
            })}
            <a
              href="/resume.pdf"
              download
              className="font-body transition-all duration-150"
              style={{ fontSize: '13px', color: 'var(--ink-2)', border: '1px solid var(--border-strong)', background: 'var(--surface)', padding: '7px 14px', borderRadius: '6px' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'var(--blue)'; el.style.color = 'var(--blue)'; el.style.background = 'var(--blue-light)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border-strong)'; el.style.color = 'var(--ink-2)'; el.style.background = 'var(--surface)' }}
            >
              Resume ↓
            </a>
          </div>

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

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed left-0 right-0 z-40 md:hidden"
            style={{ top: '60px', background: 'rgba(247,248,250,0.98)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', boxShadow: '0 8px 32px rgba(15,23,42,0.08)' }}
          >
            <div className="flex flex-col px-5 py-4">
              {NAV_LINKS.map(link => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-body py-4"
                    style={{ fontSize: '24px', color: isActive ? 'var(--blue)' : 'var(--ink)', borderBottom: '1px solid var(--border)' }}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <a
                href="/resume.pdf"
                download
                className="font-body mt-4 py-3 text-center rounded-md"
                style={{ fontSize: '15px', color: 'var(--blue)', border: '1px solid var(--blue-mid)', background: 'var(--blue-light)' }}
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
