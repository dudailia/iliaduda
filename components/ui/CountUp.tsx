'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface CountUpProps {
  target: number
  duration?: number
  startDelay?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function CountUp({ target, duration = 1200, startDelay = 0, suffix = '', prefix = '', className }: CountUpProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let rafId: number
      const start = Date.now()
      const tick = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * target))
        if (progress < 1) rafId = requestAnimationFrame(tick)
      }
      rafId = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(rafId)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [target, duration, startDelay])

  return (
    <span className={cn('tabular-nums', className)}>
      {prefix}{count}{suffix}
    </span>
  )
}
