'use client'
import { useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = new Lenis({
      lerp: prefersReduced ? 1 : 0.12,
      duration: prefersReduced ? 0 : 1.0,
      smoothWheel: true,
      syncTouch: false,
      // autoRaf: false so GSAP drives the loop
      autoRaf: false,
    })

    lenisRef.current = lenis

    // Sync ScrollTrigger with Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP ticker — single RAF source, perfect sync at any Hz
    function onTick(time: number) {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger after fonts/images settle
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 600)

    return () => {
      clearTimeout(timeout)
      gsap.ticker.remove(onTick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
