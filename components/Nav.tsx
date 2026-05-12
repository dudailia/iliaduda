'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <nav
      style={{
        height: '56px',
        background: 'rgba(248,249,251,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="mx-auto flex items-center justify-between h-full px-5 md:px-10" style={{ maxWidth: '1100px' }}>
        <Link href="/" className="font-display text-[13px] font-bold tracking-[0.1em] uppercase" style={{ color: 'var(--text-1)' }}>
          ILIA DUDA
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="font-body text-[14px] transition-colors duration-150"
              style={{ color: isActive(l.href) ? 'var(--blue)' : 'var(--text-3)' }}
              onMouseEnter={e => { if (!isActive(l.href)) (e.currentTarget.style.color = 'var(--text-1)') }}
              onMouseLeave={e => { if (!isActive(l.href)) (e.currentTarget.style.color = 'var(--text-3)') }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="/resume.pdf"
            download
            className="font-body text-[13px] rounded-md px-3 py-1.5 transition-all duration-150"
            style={{ border: '1px solid var(--border-strong)', color: 'var(--text-2)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-2)' }}
          >
            Resume ↓
          </a>
        </div>

        <button className="md:hidden p-1.5" style={{ color: 'var(--text-2)' }} onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute left-0 right-0 top-full" style={{ background: 'rgba(248,249,251,0.98)', borderBottom: '1px solid var(--border)', zIndex: 99 }}>
          <div className="mx-auto px-5 py-2" style={{ maxWidth: '1100px' }}>
            {LINKS.map(l => (
              <Link key={l.href} href={l.href} className="block font-body text-[17px] py-3.5" style={{ color: isActive(l.href) ? 'var(--blue)' : 'var(--text-1)', borderBottom: '1px solid var(--border)' }}>
                {l.label}
              </Link>
            ))}
            <div className="py-4">
              <a href="/resume.pdf" download className="font-body text-[14px] rounded-lg px-5 py-2.5" style={{ border: '1px solid var(--border-strong)', color: 'var(--text-2)' }}>
                Resume ↓
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
