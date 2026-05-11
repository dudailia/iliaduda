'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface ShutterTitleProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  as?: 'h1' | 'h2' | 'h3'
}

export function ShutterTitle({ children, className, style, as: Tag = 'h2' }: ShutterTitleProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
        transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
      >
        <Tag className={cn(className)} style={style}>{children}</Tag>
      </motion.div>
    </div>
  )
}
