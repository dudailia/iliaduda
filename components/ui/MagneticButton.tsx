'use client'
import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

export function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 250, damping: 22 })
  const y = useSpring(0, { stiffness: 250, damping: 22 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const rawX = (e.clientX - centerX) * 0.3
    const rawY = (e.clientY - centerY) * 0.3
    x.set(Math.max(-8, Math.min(8, rawX)))
    y.set(Math.max(-8, Math.min(8, rawY)))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  )
}
