import { useEffect, useRef } from 'react'
import { Phone, InstagramLogo, MapPin, Clock } from '@phosphor-icons/react'

const MAPS_URL = 'https://www.google.com/maps/place/Elixir+Barber/@36.5382902,-4.6247161,17z/data=!3m2!4b1!5s0xd72e26b0f5a00ff:0xa10e00e2f092349!4m6!3m5!1s0xd72e3def0a293b5:0xdc53d4ffd38c97c8!8m2!3d36.5382902!4d-4.6221412!16s%2Fg%2F11w_rx7tj3?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D'
const MAPS_EMBED_URL = 'https://maps.google.com/maps?q=36.5382902,-4.6221412&output=embed'
const INSTAGRAM_URL = 'https://www.instagram.com/elixir_barber'
const PHONE = '674398967'
const PHONE_FORMATTED = '674 398 967'

const SCHEDULE = [
  { days: 'Lunes – Sábado', hours: '10:00 – 21:15' },
  { days: 'Domingo', hours: 'Cerrado' },
]

/* ── Info item ─────────────────────────────────────────────── */
function InfoItem({ icon, label, href, children }) {
  const content = (
    <div
      style={{
        display: 'flex',
        gap: '0.875rem',
        alignItems: 'flex-start',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          color: 'var(--gold)',
          marginTop: '2px',
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '0.25rem',
          }}
        >
          {label}
        </p>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--ink)',
            lineHeight: 1.55,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        style={{
          textDecoration: 'none',
          display: 'block',
          transition: 'opacity 200ms ease',
        }}
        aria-label={label}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        {content}
      </a>
    )
  }

  return content
}

/* ── Location Section ─────────────────────────────────────── */
export default function Location() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
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
      id="ubicacion"
      ref={sectionRef}
      style={{
        background: 'var(--beige)',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
      }}
      aria-label="Ubicación y contacto de Elixir Barber"
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
            Visítanos
          </h2>
        </div>

        {/* Two-column layout: map + info */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'start',
          }}
        >
          {/* Map */}
          <div
            className="reveal"
            style={{
              borderRadius: 'var(--r-xl)',
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(14,14,14,0.1)',
              border: '1px solid var(--beige-deep)',
              aspectRatio: '4/3',
              position: 'relative',
            }}
          >
            <iframe
              title="Ubicación de Elixir Barber en Fuengirola"
              src={MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', minHeight: '280px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact info */}
          <div
            className="reveal"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {/* Address */}
            <InfoItem
              icon={<MapPin size={22} weight="fill" />}
              label="Dirección"
              href={MAPS_URL}
            >
              <span>C. Miguel de Cervantes</span>
              <br />
              <span>29640 Fuengirola, Málaga</span>
            </InfoItem>

            {/* Phone */}
            <InfoItem
              icon={<Phone size={22} weight="fill" />}
              label="Teléfono"
              href={`tel:${PHONE}`}
            >
              {PHONE_FORMATTED}
            </InfoItem>

            {/* Instagram */}
            <InfoItem
              icon={<InstagramLogo size={22} weight="fill" />}
              label="Instagram"
              href={INSTAGRAM_URL}
            >
              @elixir_barber
            </InfoItem>

            {/* Schedule */}
            <InfoItem
              icon={<Clock size={22} weight="fill" />}
              label="Horario"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {SCHEDULE.map((s) => (
                  <div
                    key={s.days}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      maxWidth: '280px',
                    }}
                  >
                    <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{s.days}</span>
                    <span
                      className="mono"
                      style={{
                        color: s.hours === 'Cerrado' ? 'var(--ink-soft)' : 'var(--gold)',
                        fontWeight: s.hours === 'Cerrado' ? 400 : 500,
                        fontSize: '0.9rem',
                      }}
                    >
                      {s.hours}
                    </span>
                  </div>
                ))}
              </div>
            </InfoItem>

            {/* Open in Maps link */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{
                fontSize: '0.875rem',
                padding: '0.75rem 1.5rem',
                alignSelf: 'flex-start',
                display: 'inline-flex',
              }}
              aria-label="Ver Elixir Barber en Google Maps"
            >
              Ver en Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
