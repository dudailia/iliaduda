export function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center">
      <p className="font-body text-ink-3" style={{ fontSize: '13px' }}>
        © 2026 Ilia Duda · Boston, MA ·{' '}
        <a
          href="mailto:duda.i@northeastern.edu"
          className="transition-colors duration-150 hover:text-blue"
          style={{ color: 'var(--ink-3)' }}
        >
          duda.i@northeastern.edu
        </a>
      </p>
    </footer>
  )
}
