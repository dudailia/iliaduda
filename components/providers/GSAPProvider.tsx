'use client'
import { type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// GSAPProvider is now a thin wrapper — all GSAP/Lenis sync
// happens inside SmoothScrollProvider via the shared GSAP ticker.
// Keeping this component so layout.tsx doesn't need changes.
export function GSAPProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
