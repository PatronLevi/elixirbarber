import { useRef, useEffect } from 'react'

const BOOKING_URL = 'https://elixirbarber.pedircita.online'

/* ── Logo hero: ELIXIR ───────────────────────────────────────── */
function HeroLogo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      {/* Wordmark Container */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'clamp(350px, 60vw, 750px)',
          aspectRatio: '4 / 1',
          marginInline: 'auto',
        }}
        aria-label="ELIXIR"
      >
        <img
          src="/logo.png"
          alt="ELIXIR BARBER"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>
    </div>
  )
}

/* ── Gold Particles ──────────────────────────────────────────── */
function GoldParticles() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null

  const particles = [
    { id:0,  x:8,  y:15, r:1.1, dur:4.1, del:0.2, op:0.3  },
    { id:1,  x:18, y:62, r:0.7, dur:5.3, del:1.1, op:0.22 },
    { id:2,  x:27, y:34, r:1.4, dur:3.8, del:0.5, op:0.38 },
    { id:3,  x:42, y:8,  r:0.8, dur:6.2, del:2.0, op:0.28 },
    { id:4,  x:66, y:22, r:0.7, dur:5.0, del:1.5, op:0.2  },
    { id:5,  x:74, y:55, r:1.3, dur:3.5, del:0.3, op:0.35 },
    { id:6,  x:82, y:88, r:0.6, dur:6.8, del:2.3, op:0.18 },
    { id:7,  x:91, y:40, r:1.0, dur:4.3, del:1.8, op:0.3  },
    { id:8,  x:12, y:88, r:1.2, dur:3.9, del:2.8, op:0.3  },
    { id:9,  x:60, y:42, r:0.7, dur:5.8, del:3.1, op:0.22 },
    { id:10, x:78, y:18, r:1.1, dur:4.0, del:1.6, op:0.34 },
  ]

  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 4 }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {particles.map((p) => (
          <circle key={p.id} cx={`${p.x}%`} cy={`${p.y}%`} r={p.r} fill="var(--gold)" opacity={p.op}>
            <animate
              attributeName="opacity"
              values={`${p.op};${p.op * 0.12};${p.op}`}
              dur={`${p.dur}s`}
              begin={`${p.del}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values={`${p.y}%;${p.y - 3}%;${p.y}%`}
              dur={`${p.dur * 1.3}s`}
              begin={`${p.del}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}

/* ── Hero ─────────────────────────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    
    // Ensure muted is set programmatically
    video.muted = true

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log('Autoplay blocked. Adding listener for user interaction.', err)
        
        const startVideo = () => {
          video.muted = true
          video.play()
            .then(() => {
              cleanupListeners()
            })
            .catch((e) => console.log('Interactive play failed:', e))
        }

        const cleanupListeners = () => {
          document.removeEventListener('touchstart', startVideo)
          document.removeEventListener('click', startVideo)
          window.removeEventListener('scroll', startVideo)
        }

        document.addEventListener('touchstart', startVideo, { passive: true })
        document.addEventListener('click', startVideo, { passive: true })
        window.addEventListener('scroll', startVideo, { passive: true })

        video._autoplayCleanup = cleanupListeners
      })
    }

    return () => {
      if (video._autoplayCleanup) {
        video._autoplayCleanup()
      }
    }
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100dvh',
        background: 'var(--night)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      aria-label="Elixir Barber — portada"
    >
      {/* Video de fondo */}
      <video
        ref={videoRef}
        src="/hero-bg.mp4"
        autoPlay
        loop
        muted
        defaultMuted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Capa de oscurecimiento (Overlay) para asegurar legibilidad */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(27, 27, 27, 0.65)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Resplandor ambiental de fondo */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 65% 60% at 50% 42%, rgba(120,110,80,0.12) 0%, transparent 68%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      <GoldParticles />

      {/* Contenido principal */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '900px',
          gap: '2rem',
          paddingTop: '68px',
        }}
      >
        <HeroLogo />

        {/* Titular destacado */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            fontWeight: 400,
            lineHeight: 1.08,
            color: 'var(--white)',
            letterSpacing: '-0.015em',
            maxWidth: '780px',
            marginTop: '-1.5rem',
          }}
        >
          Más que un corte,{' '}
          <em
            style={{
              fontStyle: 'italic',
              color: 'var(--gold-soft)',
              display: 'inline-block',
              paddingBottom: '3px',
            }}
          >
            una experiencia.
          </em>
        </h1>

        {/* Botón de Reservar Cita */}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
          style={{
            fontSize: '1.0625rem',
            padding: '1.0625rem 3rem',
            letterSpacing: '0.04em',
            marginTop: '0.25rem',
          }}
          aria-label="Pedir cita en Elixir Barber"
        >
          Pedir cita
        </a>

        {/* Localización corporativa */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(120, 110, 80, 0.42)',
            marginTop: '-1.25rem',
          }}
        >
          Fuengirola &middot; Málaga
        </p>
      </div>

      {/* Indicador de scroll */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '2.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '44px',
          background: 'linear-gradient(to bottom, transparent, rgba(120, 110, 80, 0.5))',
          animation: 'scrollLine 2s ease-in-out infinite',
          zIndex: 8,
        }}
      />

      {/* Línea divisoria dorada y limpia */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--gold) 50%, transparent)',
          opacity: 0.45,
          zIndex: 6,
        }}
      />

      <style>{`
        @keyframes scrollLine {
          0%,100% { opacity:0.4; transform:translateX(-50%) scaleY(1); }
          50%      { opacity:0.8; transform:translateX(-50%) scaleY(1.12); }
        }
      `}</style>
    </section>
  )
}
