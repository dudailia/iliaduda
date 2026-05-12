'use client'
import { useEffect, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'

gsap.registerPlugin(ScrollTrigger)

function LenisScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update()
  })
  return null
}

export function GSAPProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.ticker.lagSmoothing(0)
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <LenisScrollTriggerSync />
      {children}
    </>
  )
}
