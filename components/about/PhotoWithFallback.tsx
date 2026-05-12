'use client'
import Image from 'next/image'

export function PhotoWithFallback() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface-2)', aspectRatio: '3/4' }}
    >
      <Image
        src="/headshot.jpg"
        alt="Ilia Duda — Quantitative Finance Engineer"
        fill
        loading="lazy"
        className="object-cover object-top"
        style={{ mixBlendMode: 'multiply' }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display font-bold text-6xl" style={{ color: 'var(--border-strong)' }}>ID</span>
      </div>
    </div>
  )
}
