'use client'
import { useEffect, useState } from 'react'
import { ReactLenis } from 'lenis/react'
import { type ReactNode } from 'react'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
  }, [])

  return (
    <ReactLenis
      root
      options={{
        lerp: reducedMotion ? 1 : 0.08,
        duration: reducedMotion ? 0 : 1.2,
        syncTouch: false,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  )
}
