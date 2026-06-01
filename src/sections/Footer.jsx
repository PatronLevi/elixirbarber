import { InstagramLogo, Phone } from '@phosphor-icons/react'
import { ElixirLogo } from '../components/Navbar'

const BOOKING_URL = 'https://elixirbarber.pedircita.online'
const INSTAGRAM_URL = 'https://www.instagram.com/elixir_barber'
const PHONE = '674398967'
const PHONE_FORMATTED = '674 398 967'
const LEGAL_URL = 'https://elixirbarber.pedircita.online/legal'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <>
      {/* ── Final CTA Band ─────────────────────────────────── */}
      <section
        aria-label="Reserva tu cita"
        style={{
          background: 'var(--night)',
          padding: 'clamp(5rem, 10vw, 8rem) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(216,165,17,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '2rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
              fontWeight: 400,
              color: 'var(--white)',
              lineHeight: 1.1,
              maxWidth: '640px',
            }}
          >
            ¿Listo para tu<br />
            <em style={{ color: 'var(--gold-soft)', fontStyle: 'italic' }}>experiencia?</em>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'rgba(245,239,230,0.6)',
              maxWidth: '360px',
            }}
          >
            Reserva online en segundos. Sin esperas, sin llamadas.
          </p>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{
              fontSize: '1.0625rem',
              padding: '1.125rem 3rem',
              letterSpacing: '0.04em',
            }}
            aria-label="Pedir cita en Elixir Barber — abre en pestaña nueva"
          >
            Pedir cita
          </a>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer
        style={{
          background: '#080B10',
          padding: 'clamp(2rem, 4vw, 3rem) 0',
          borderTop: '1px solid rgba(216,165,17,0.15)',
        }}
        aria-label="Pie de página Elixir Barber"
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* Top row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            {/* Logo */}
            <a
              href="#hero"
              aria-label="ELIXIR BARBER — volver al inicio"
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            >
              <ElixirLogo size="md" dark={true} />
            </a>

            {/* Social links */}
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}
              aria-label="Redes sociales y contacto"
            >
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Elixir Barber en Instagram"
                style={{
                  color: 'var(--gold)',
                  opacity: 0.8,
                  transition: 'opacity 200ms ease',
                  display: 'flex',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              >
                <InstagramLogo size={22} weight="fill" />
              </a>
              <a
                href={`tel:${PHONE}`}
                aria-label={`Llamar a Elixir Barber: ${PHONE_FORMATTED}`}
                style={{
                  color: 'var(--gold)',
                  opacity: 0.8,
                  transition: 'opacity 200ms ease',
                  display: 'flex',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              >
                <Phone size={22} weight="fill" />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div
            aria-hidden="true"
            style={{
              height: '1px',
              background: 'rgba(216,165,17,0.12)',
            }}
          />

          {/* Bottom row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'rgba(245,239,230,0.35)',
              }}
            >
              © {year} ELIXIR BARBER — Fuengirola, Málaga
            </p>

            <a
              href={LEGAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'rgba(245,239,230,0.35)',
                textDecoration: 'none',
                transition: 'color 200ms ease',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--gold-soft)'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(245,239,230,0.35)'}
              aria-label="Aviso legal de Elixir Barber"
            >
              Aviso legal
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
