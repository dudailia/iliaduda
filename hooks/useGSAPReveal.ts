'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealOptions {
  y?: number
  delay?: number
  stagger?: number
  selector?: string
  duration?: number
}

export function useGSAPReveal(options?: RevealOptions) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = options?.selector
      ? Array.from(el.querySelectorAll(options.selector))
      : [el]

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: options?.y ?? 24 },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.7,
          delay: options?.delay ?? 0,
          stagger: options?.stagger ?? 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}
