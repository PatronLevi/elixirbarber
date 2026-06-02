import { useEffect, useRef, useState } from 'react'
import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react'

export default function Barberia() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      const newState = !videoRef.current.muted
      videoRef.current.muted = newState
      setIsMuted(newState)
    }
  }

  return (
    <section
      id="barberia"
      ref={sectionRef}
      style={{
        background: 'var(--beige)',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        borderTop: '1px solid rgba(120, 110, 80, 0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Sobre el salón Elixir Barber"
    >
      {/* Background visual detail */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(120,110,80,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div className="reveal" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
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
            La Barbería<br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>nuestro espacio</em>
          </h2>
          <p
            style={{
              marginTop: '1rem',
              color: 'var(--ink-soft)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Un templo de cuidado masculino en Fuengirola
          </p>
        </div>

        {/* Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            alignItems: 'center',
          }}
          id="barberia-grid"
        >
          {/* Left Column: Text & Image */}
          <div
            className="reveal"
            style={{
              gridColumn: 'span 12',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
            className="barberia-left-col"
          >
            <p
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                lineHeight: 1.7,
                color: 'var(--ink-soft)',
                maxWidth: '540px',
                margin: 0,
              }}
            >
              Ubicado en el corazón de Fuengirola, nuestro salón combina el diseño contemporáneo industrial con el confort premium de las barberías tradicionales. Cada rincón está pensado para que disfrutes de tu ritual con total relajación, acompañando tu experiencia con un café gourmet o tu bebida preferida.
            </p>

            {/* Facade image frame */}
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--r-xl)',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                border: '1px solid rgba(120, 110, 80, 0.15)',
                aspectRatio: '3 / 4',
                background: 'var(--beige-deep)',
                maxWidth: '420px',
              }}
            >
              <img
                src="/barberia-image-1.jpeg"
                alt="Fachada del salón Elixir Barber en Fuengirola"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  display: 'block',
                  transition: 'transform 700ms ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </div>

          {/* Right Column: Tour Video */}
          <div
            className="reveal"
            style={{
              gridColumn: 'span 12',
              position: 'relative',
              borderRadius: 'var(--r-xl)',
              overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(0,0,0,0.45)',
              border: '1px solid rgba(120, 110, 80, 0.25)',
              aspectRatio: '9 / 16',
              background: 'var(--beige-deep)',
              maxWidth: '420px',
              marginInline: 'auto',
            }}
            className="barberia-right-col"
          >
            <video
              ref={videoRef}
              src="/barberia-video-1.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Ambient vignette shading for premium feel */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Custom Unmute / Mute control button */}
            <button
              onClick={toggleMute}
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                right: '1.25rem',
                background: 'rgba(27, 27, 27, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(120, 110, 80, 0.3)',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--gold-soft)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                transition: 'background-color 200ms ease, transform 200ms ease',
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(120, 110, 80, 0.85)'
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(27, 27, 27, 0.75)'
                e.currentTarget.style.color = 'var(--gold-soft)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
              aria-label={isMuted ? 'Activar sonido del video' : 'Desactivar sonido del video'}
            >
              {isMuted ? <SpeakerSlash size={18} weight="bold" /> : <SpeakerHigh size={18} weight="bold" />}
            </button>

            {/* Subtle floating branding overlay */}
            <div
              style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                background: 'rgba(27, 27, 27, 0.55)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '4px',
                padding: '0.35rem 0.65rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '0.05em',
                pointerEvents: 'none',
              }}
            >
              SALÓN TOUR
            </div>
          </div>
        </div>
      </div>

      {/* Responsive layout overrides */}
      <style>{`
        @media (min-width: 992px) {
          #barberia-grid {
            grid-template-columns: repeat(12, 1fr) !important;
          }
          .barberia-left-col {
            grid-column: span 7 !important;
          }
          .barberia-right-col {
            grid-column: span 5 !important;
            margin-inline: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
