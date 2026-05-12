import { AnimateIn } from '@/components/ui/AnimateIn'
import { SectionTag } from '@/components/ui/SectionTag'

interface PageHeroProps {
  tag: string
  title: string
  subtitle?: string
  titleSize?: string
  centered?: boolean
}

export function PageHero({ tag, title, subtitle, titleSize = '56px', centered = false }: PageHeroProps) {
  return (
    <div className={`pt-24 pb-14 px-5 md:px-6 ${centered ? 'text-center' : ''}`}>
      <div className="mx-auto" style={{ maxWidth: '1140px' }}>
        <AnimateIn>
          <SectionTag>{tag}</SectionTag>
          <h1
            className="font-display font-extrabold text-navy mt-2 mb-4"
            style={{ fontSize: `clamp(32px, 5vw, ${titleSize})`, lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={`font-body text-ink-2 ${centered ? 'mx-auto' : ''}`}
              style={{ fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.6, maxWidth: '580px' }}
            >
              {subtitle}
            </p>
          )}
        </AnimateIn>
      </div>
    </div>
  )
}
