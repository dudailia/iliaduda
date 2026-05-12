'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface BulletItemProps {
  text: string
  index: number
  accentColor: string
}

function BulletItem({ text, index, accentColor }: BulletItemProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] as const }}
      className="relative overflow-hidden"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '0 8px 8px 0',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '16px',
        paddingBottom: '16px',
      }}
    >
      {/* Animated left border */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.05, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '3px',
          height: '100%',
          background: accentColor,
          transformOrigin: 'top',
        }}
      />
      <p className="font-body text-ink-2 pl-2" style={{ fontSize: '15px', lineHeight: 1.65 }}>
        {text}
      </p>
    </motion.div>
  )
}

interface ExperienceBulletsProps {
  bullets: string[]
  accentColor: string
}

export function ExperienceBullets({ bullets, accentColor }: ExperienceBulletsProps) {
  return (
    <div className="space-y-4">
      {bullets.map((bullet, i) => (
        <BulletItem key={i} text={bullet} index={i} accentColor={accentColor} />
      ))}
    </div>
  )
}
