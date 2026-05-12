'use client'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

interface BackButtonProps {
  href: string
  label: string
}

export function BackButton({ href, label }: BackButtonProps) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push(href)}
      className="flex items-center gap-1 font-mono transition-colors duration-150 mb-8"
      style={{ fontSize: '12px', color: 'var(--ink-3)', letterSpacing: '0.02em' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-3)')}
    >
      <ChevronLeft size={13} />
      {label}
    </button>
  )
}
