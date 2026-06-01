import { useEffect, useRef } from 'react'

const BOOKING_URL = 'https://elixirbarber.pedircita.online'

const SERVICES = [
  {
    id: 'total-experience',
    name: 'Elixir Total Experience',
    description: 'Corte, barba ritual, limpieza facial, masaje cervical',
    price: '95,00 €',
    featured: true,
    badge: 'Experiencia completa',
  },
  {
    id: 'signature',
    name: 'Corte & Barba Signature',
    description: 'Ritual premium, lavado relajante',
    price: '33,00 €',
    featured: false,
  },
  {
    id: 'image-design',
    name: 'Elixir Image Design',
    description: 'Análisis craneal y facial, look a medida',
    price: '25,00 €',
    featured: false,
  },
  {
    id: 'corte',
    name: 'Corte',
    description: 'Personalizado con lavado',
    price: '18,00 €',
    featured: false,
  },
  {
    id: 'barba',
    name: 'Barba',
    description: 'Perfilado y cuidado de barba',
    price: '15,00 €',
    featured: false,
  },
  {
    id: 'basico',
    name: 'Corte y Barba (Básico)',
    description: 'Nuestro servicio básico con lavado',
    price: '28,00 €',
    featured: false,
  },
  {
    id: 'facial',
    name: 'Limpieza Facial',
    description: 'Limpia, hidrata y revitaliza la piel',
    price: '55,00 €',
    featured: false,
  },
  {
    id: 'color',
    name: 'Color',
    description: 'Servicio de color premium con análisis previo',
    price: 'desde 70,00 €',
    featured: false,
  },
  {
    id: 'permanente',
    name: 'Permanente',
    description: 'Profesional con productos de calidad',
    price: 'desde 45,00 €',
    featured: false,
  },
  {
    id: 'nino',
    name: 'Corte de Niño',
    description: 'Menores de 10 años',
    price: '15,00 €',
    featured: false,
  },
  {
    id: 'afeitado',
    name: 'Afeitado Tradicional',
    description: 'Con espuma, toallas calientes y frías',
    price: '20,00 €',
    featured: false,
  },
]

/* ── Service Card ─────────────────────────────────────────── */
function ServiceCard({ service, delay = 0 }) {
  if (service.featured) {
    return (
      <article
        className="reveal"
        style={{
          background: 'var(--night)',
          borderRadius: 'var(--r-lg)',
          padding: 'clamp(1.5rem, 3vw, 2rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          border: '1.5px solid var(--gold)',
          gridColumn: 'span 1',
          position: 'relative',
          overflow: 'hidden',
          transitionDelay: `${delay}ms`,
          boxShadow: '0 8px 48px rgba(216,165,17,0.18), 0 2px 16px rgba(0,0,0,0.35)',
        }}
        aria-label={`Servicio destacado: ${service.name}`}
      >
        {/* Glow behind */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(216,165,17,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Badge */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            background: 'rgba(216,165,17,0.18)',
            border: '1px solid rgba(216,165,17,0.4)',
            borderRadius: '999px',
            padding: '0.3rem 0.875rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--gold-soft)',
            width: 'fit-content',
          }}
        >
          ★ {service.badge}
        </span>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 500,
            color: 'var(--white)',
            lineHeight: 1.15,
          }}
        >
          {service.name}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'rgba(245,239,230,0.65)',
            lineHeight: 1.55,
            flex: 1,
          }}
        >
          {service.description}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 600,
              color: 'var(--gold)',
              letterSpacing: '-0.02em',
            }}
          >
            {service.price}
          </span>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ fontSize: '0.8125rem', padding: '0.625rem 1.25rem' }}
            aria-label={`Reservar ${service.name}`}
          >
            Reservar
          </a>
        </div>
      </article>
    )
  }

  return (
    <article
      className="reveal service-card"
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--r-lg)',
        padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.625rem',
        border: '1px solid rgba(237, 228, 211, 0.9)',
        cursor: 'default',
        transition: 'transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease',
        transitionDelay: `${delay}ms`,
        boxShadow: '0 2px 12px rgba(14,14,14,0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(216,165,17,0.14), 0 2px 8px rgba(14,14,14,0.08)'
        e.currentTarget.style.borderColor = 'var(--gold-soft)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(14,14,14,0.06)'
        e.currentTarget.style.borderColor = 'rgba(237, 228, 211, 0.9)'
      }}
      aria-label={`Servicio: ${service.name}`}
    >
      <h3
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
          fontWeight: 600,
          color: 'var(--ink)',
          lineHeight: 1.3,
        }}
      >
        {service.name}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8375rem',
          color: 'var(--ink-soft)',
          lineHeight: 1.55,
          flex: 1,
        }}
      >
        {service.description}
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '0.375rem',
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: '1.0625rem',
            fontWeight: 600,
            color: 'var(--gold)',
            letterSpacing: '-0.01em',
          }}
        >
          {service.price}
        </span>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-gold"
          style={{ fontSize: '0.8rem' }}
          aria-label={`Reservar ${service.name}`}
        >
          Reservar →
        </a>
      </div>
    </article>
  )
}

/* ── Services Section ─────────────────────────────────────── */
export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll('.reveal')
            reveals.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 70)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="servicios"
      ref={sectionRef}
      style={{
        background: 'var(--beige)',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
      }}
      aria-label="Servicios de Elixir Barber"
    >
      <div className="container">
        {/* Section header */}
        <div
          className="reveal"
          style={{
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          <hr className="divider-gold" style={{ marginBottom: '1.5rem' }} />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              fontWeight: 400,
              color: 'var(--ink)',
              lineHeight: 1.05,
              maxWidth: '520px',
            }}
          >
            Nuestros servicios
          </h2>
          <p
            style={{
              marginTop: '1rem',
              color: 'var(--ink-soft)',
              maxWidth: '420px',
              fontSize: '1rem',
            }}
          >
            Cada servicio es un ritual. Cada cliente, una obra.
          </p>
        </div>

        {/* Grid — bento layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(0.75rem, 2vw, 1.25rem)',
          }}
          className="services-grid"
        >
          {/* Featured card — spans 2 cols on desktop */}
          <div style={{ gridColumn: 'span 2' }}>
            <ServiceCard service={SERVICES[0]} delay={0} />
          </div>

          {/* Remaining 10 services — each 1 col */}
          {SERVICES.slice(1).map((service, i) => (
            <ServiceCard key={service.id} service={service} delay={(i + 1) * 70} />
          ))}
        </div>

        <style>{`
          @media (max-width: 900px) {
            .services-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            .services-grid > div:first-child {
              grid-column: span 2 !important;
            }
          }
          @media (max-width: 540px) {
            .services-grid {
              grid-template-columns: 1fr !important;
            }
            .services-grid > div:first-child {
              grid-column: span 1 !important;
            }
          }
        `}</style>

        {/* Bottom CTA */}
        <div
          className="reveal"
          style={{
            marginTop: 'clamp(3rem, 6vw, 5rem)',
            textAlign: 'center',
          }}
        >
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}
            aria-label="Pedir cita en Elixir Barber"
          >
            Pedir cita ahora
          </a>
        </div>
      </div>
    </section>
  )
}
