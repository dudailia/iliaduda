import { cn } from '@/lib/utils'

export function SectionTag({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn('font-mono text-[11px] text-blue uppercase tracking-[0.08em] mb-3', className)}>
      {children}
    </p>
  )
}
