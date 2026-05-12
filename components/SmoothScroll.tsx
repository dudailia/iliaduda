'use client'
import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function GSAPSync() {
  useLenis(() => { ScrollTrigger.update() })
  return null
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => { gsap.ticker.lagSmoothing(0) }, [])
  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.4, syncTouch: false }}>
      <GSAPSync />
      {children}
    </ReactLenis>
  )
}
