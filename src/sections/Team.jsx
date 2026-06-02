import { useEffect, useRef } from 'react'

const BOOKING_URL = 'https://elixirbarber.pedircita.online'

const TEAM = [
  {
    id: 'fabian',
    name: 'Fabián',
    role: 'Barbero',
    imgSrc: '/fabian.jpg',
    objectPosition: '38% center',
  },
  {
    id: 'fabrizio',
    name: 'Fabrizio',
    role: 'Barbero',
    imgSrc: null,
  },
  {
    id: 'team',
    name: 'Sin preferencia',
    role: 'El mejor disponible',
    imgSrc: null,
  },
]

/* ── Team Card ────────────────────────────────────────────── */
function TeamCard({ member, delay = 0 }) {
  return (
    <article
      className="reveal"
      style={{
        background: 'var(--beige-deep)',
        borderRadius: 'var(--r-xl)',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 280ms ease, box-shadow 280ms ease',
        transitionDelay: `${delay}ms`,
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.4), 0 0 0 1.5px var(--gold-soft)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.25)'
      }}
      aria-label={`Barbero: ${member.name}`}
    >
      {/* Photo placeholder */}
      <div
        style={{
          aspectRatio: '3/4',
          background: 'var(--beige)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {member.imgSrc ? (
          <img
            src={member.imgSrc}
            alt={`Foto de ${member.name}, ${member.role} en Elixir Barber`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: member.objectPosition || 'center center',
            }}
          />
        ) : (
          <div
            aria-label={`Espacio para foto de ${member.name}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            {/* Silhouette SVG */}
            <svg
              viewBox="0 0 80 80"
              width="72"
              height="72"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="40" cy="30" r="18" fill="rgba(216,165,17,0.18)" />
              <ellipse cx="40" cy="72" rx="26" ry="18" fill="rgba(216,165,17,0.12)" />
              <circle cx="40" cy="30" r="14" fill="rgba(216,165,17,0.22)" />
              <ellipse cx="40" cy="68" rx="20" ry="14" fill="rgba(216,165,17,0.16)" />
            </svg>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                opacity: 0.7,
              }}
            >
              Foto próximamente
            </span>
          </div>
        )}

        {/* Gold bottom accent line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, var(--gold-soft), var(--gold), var(--gold-deep))',
          }}
        />
      </div>

      {/* Info */}
      <div
        style={{
          padding: '1.25rem 1.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.375rem',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 500,
            color: 'var(--ink)',
            lineHeight: 1.1,
          }}
        >
          {member.name}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--ink-soft)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {member.role}
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-gold"
          style={{ marginTop: '0.5rem', fontSize: '0.8125rem' }}
          aria-label={`Reservar con ${member.name}`}
        >
          Reservar con {member.id === 'team' ? 'el equipo' : member.name} →
        </a>
      </div>
    </article>
  )
}

/* ── Team Section ─────────────────────────────────────────── */
export default function Team() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="equipo"
      ref={sectionRef}
      style={{
        background: 'var(--beige-deep)',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
      }}
      aria-label="Nuestro equipo de barberos"
    >
      <div className="container">
        {/* Header */}
        <div
          className="reveal"
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          <hr className="divider-gold" style={{ marginBottom: '1.5rem' }} />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              fontWeight: 400,
              color: 'var(--ink)',
              lineHeight: 1.05,
            }}
          >
            Nuestro equipo
          </h2>
          <p
            style={{
              marginTop: '1rem',
              color: 'var(--ink-soft)',
              maxWidth: '400px',
              fontSize: '1rem',
            }}
          >
            Artesanos del estilo. Tu imagen en manos expertas.
          </p>
        </div>

        {/* Team grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 'clamp(1rem, 2.5vw, 1.75rem)',
            maxWidth: '900px',
          }}
        >
          {TEAM.map((member, i) => (
            <TeamCard key={member.id} member={member} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}
