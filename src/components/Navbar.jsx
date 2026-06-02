import { useState, useEffect } from 'react'
import { List, X } from '@phosphor-icons/react'

/* ── Logo ELIXIR (versión navbar — imagen de marca) ─────────── */
export function ElixirLogo({ size = 'md' }) {
  const heights = { sm: '18px', md: '26px', lg: '36px', xl: '60px' }
  const h = heights[size] || heights.md

  return (
    <img
      src="/logo.png"
      alt="ELIXIR BARBER"
      style={{
        height: h,
        width: 'auto',
        display: 'block',
        userSelect: 'none',
      }}
    />
  )
}


/* ── Navbar ──────────────────────────────────────────────────────────── */
const BOOKING_URL = 'https://elixirbarber.pedircita.online'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Servicios',    href: '#servicios' },
    { label: 'La Barbería',  href: '#barberia' },
    { label: 'Productos',    href: '#productos' },
    { label: 'Opiniones',    href: '#opiniones' },
    { label: 'Reels',        href: '#reels' },
    { label: 'Equipo',       href: '#equipo' },
    { label: 'Ubicación',    href: '#ubicacion' },
  ]

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          transition: 'background 300ms ease, backdrop-filter 300ms ease, box-shadow 300ms ease',
          background: scrolled
            ? 'rgba(27, 27, 27, 0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
          boxShadow: scrolled
            ? '0 1px 0 rgba(120, 110, 80, 0.18)'
            : 'none',
        }}
        aria-label="Navegación principal"
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            aria-label="ELIXIR BARBER — inicio"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <ElixirLogo size="md" />
          </a>

          {/* Desktop nav links */}
          <nav
            aria-label="Secciones de la página"
            style={{
              display: 'flex',
              gap: '2.5rem',
              alignItems: 'center',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: scrolled ? 'var(--ink)' : 'rgba(242,242,242,0.9)',
                  textDecoration: 'none',
                  transition: 'color 200ms ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
                onMouseLeave={(e) =>
                  e.target.style.color = scrolled ? 'var(--ink)' : 'rgba(242,242,242,0.9)'
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{
                fontSize: '0.8125rem',
                padding: '0.625rem 1.375rem',
              }}
              aria-label="Pedir cita en Elixir Barber"
            >
              Pedir cita
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="hamburger-btn"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: scrolled ? 'var(--ink)' : 'var(--white)',
                display: 'none',
                padding: '4px',
              }}
            >
              {menuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--night)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="mobile-drawer"
      >
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '2rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--gold)',
          }}
        >
          <X size={28} weight="bold" />
        </button>

        <ElixirLogo size="lg" />

        <nav aria-label="Menú móvil" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 500,
                color: 'var(--white)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'color 200ms ease',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--gold)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--white)'}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
          onClick={() => setMenuOpen(false)}
          style={{ fontSize: '1rem', padding: '0.875rem 2.5rem' }}
        >
          Pedir cita
        </a>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
