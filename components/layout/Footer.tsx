export function Footer() {
  const TECH = [
    { name: 'Next.js 15', url: 'https://nextjs.org' },
    { name: 'Framer Motion', url: 'https://www.framer.com/motion' },
    { name: 'GSAP', url: 'https://gsap.com' },
    { name: 'Recharts', url: 'https://recharts.org' },
  ]

  return (
    <footer className="py-8 px-5 md:px-10" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="mx-auto text-center" style={{ maxWidth: '1140px' }}>
        <p className="font-body text-ink-3" style={{ fontSize: '13px' }}>
          © 2026 Ilia Duda · Boston, MA ·{' '}
          <a href="mailto:duda.i@northeastern.edu" className="transition-colors duration-150 hover:text-blue" style={{ color: 'var(--ink-3)' }}>
            duda.i@northeastern.edu
          </a>
        </p>
        <p className="font-mono text-ink-3 mt-2" style={{ fontSize: '10px' }}>
          Built with{' '}
          {TECH.map((t, i) => (
            <span key={t.name}>
              <a href={t.url} target="_blank" rel="noopener noreferrer" className="transition-colors duration-150 hover:text-blue" style={{ color: 'var(--ink-3)' }}>
                {t.name}
              </a>
              {i < TECH.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      </div>
    </footer>
  )
}
