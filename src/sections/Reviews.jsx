import { useEffect, useRef, useState } from 'react'

const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Elixir+Barber/@36.5382902,-4.6247161,17z/data=!3m2!4b1!5s0xd72e26b0f5a00ff:0xa10e00e2f092349!4m6!3m5!1s0xd72e3def0a293b5:0xdc53d4ffd38c97c8!8m2!3d36.5382902!4d-4.6221412!16s%2Fg%2F11w_rx7tj3?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D'

/* ── Reviews reales de Google ──────────────────────────────── */
const REVIEWS = [
  {
    id: 1,
    name: 'Hanin',
    avatar: 'H',
    avatarColor: '#D84315',
    rating: 5,
    date: 'Hace 9 meses',
    text: 'I was in Malaga for two weeks and needed a haircut, I asked Osama to freshen up my taper fade and he did an exceptional job; i was quite worried since my hair is a bit difficult to cut well, but he did an excellent job!',
  },
  {
    id: 2,
    name: 'Oscar Kaski',
    avatar: 'OK',
    avatarColor: '#4527A0',
    rating: 5,
    date: 'Hace 3 meses',
    text: 'Very friendly and nice service :) and very beautiful salon',
  },
  {
    id: 3,
    name: 'Alkmaar B',
    avatar: 'AB',
    avatarColor: '#006064',
    rating: 5,
    date: 'Hace 10 meses',
    text: 'I searched Fuengirola barber on tiktok and came across this shop. Shop was clean. Very nice guy. Listens to what you want and takes his time. good after treatment. Also got free drink 💪💪',
  },
  {
    id: 4,
    name: 'Cedric Bosshard',
    avatar: 'CB',
    avatarColor: '#2E7D32',
    rating: 5,
    date: 'Hace 8 meses',
    text: 'Samu cutted my hair very nice and beautiful. I can recommend him👍👍',
  },
  {
    id: 5,
    name: 'Danny Spurdle',
    avatar: 'DS',
    avatarColor: '#4E342E',
    rating: 5,
    date: 'Hace un año',
    text: "I've gone to Fabi for years from when I spoke 0 Spanish to now - opening this new shop he's made the service even better than before. Can't recommend him enough, always takes his time and has a real attention to detail, always welcoming and doing that bit extra.",
  },
  {
    id: 6,
    name: 'Couturemode',
    avatar: 'CM',
    avatarColor: '#37474F',
    rating: 5,
    date: 'Hace 5 meses',
    text: 'Good service, great haircut! Best in Fuengirola',
  },
  {
    id: 7,
    name: 'Ahmad Yassin',
    avatar: 'AY',
    avatarColor: '#1565C0',
    rating: 5,
    date: 'Hace 9 meses',
    text: '10/10 experience, felt very welcome. My haircut by Osama was perfect.',
  },
  {
    id: 8,
    name: 'Saidd070',
    avatar: 'S',
    avatarColor: '#C2185B',
    rating: 5,
    date: 'Hace 9 meses',
    text: 'Nice big barbershop, and they are really friendly and they have some good cutting experience',
  },
  {
    id: 9,
    name: 'Morten Adolfsen',
    avatar: 'MA',
    avatarColor: '#283593',
    rating: 5,
    date: 'Hace 8 meses',
    text: 'Everything about the visit was absolutely perfect.',
  },
  {
    id: 10,
    name: 'Jamal Lamarti',
    avatar: 'JL',
    avatarColor: '#004D40',
    rating: 5,
    date: 'Hace 3 semanas',
    text: 'The treatment by Fabián was impeccable, super PROFESSIONAL and attentive, you can see the experience and passion he dedicates to his profession.\n\nThe atmosphere in the hairdresser is modern, clean and pleasant, TOTALLY RECOMMENDED.',
  },
  {
    id: 11,
    name: 'Farzad',
    avatar: 'F',
    avatarColor: '#EF6C00',
    rating: 5,
    date: 'Hace 4 semanas',
    text: 'Great and friendly hair cut from Fabian. Went smooth in English and the hair cut was 10/10',
  },
  {
    id: 12,
    name: 'Confuci0',
    avatar: 'C',
    avatarColor: '#E65100',
    rating: 5,
    date: 'Hace 2 meses',
    text: '10 of 10',
  },
  {
    id: 13,
    name: 'Perez TRANSFERS',
    avatar: 'PT',
    avatarColor: '#1A237E',
    rating: 5,
    date: 'Hace 10 meses',
    text: "I've been going to this hair salon for a while now and I wouldn't change it for anything. The hairdresser is completely trustworthy; he always leaves my hair exactly how I like it, with great care and professionalism. The service is excellent, always polite and friendly, and the place is spotless, very clean and pleasant. You can tell it's a quality salon; 100% recommended.",
  },
  {
    id: 14,
    name: 'Blaise Jourdain',
    avatar: 'BJ',
    avatarColor: '#3E2723',
    rating: 5,
    date: 'Hace 4 meses',
    text: 'Osama (SAMU) - Top-notch hairdresser! Quality service guaranteed',
  },
  {
    id: 15,
    name: 'José Manuel García Alonso',
    avatar: 'JM',
    avatarColor: '#0D47A1',
    rating: 5,
    date: 'Hace un año',
    text: "I don't know where to begin to describe what an amazing hair salon Elixir is. Starting with Fabi, who's a genius, I haven't changed hairdressers since I met him. The service is the best I've ever received; without a doubt, I highly recommend it. The salon itself is beautiful, spacious, and has a luxurious feel. In short: Elixir is awesome.",
  },
  {
    id: 16,
    name: 'Lenin Lopez',
    avatar: 'LL',
    avatarColor: '#E65100',
    rating: 5,
    date: 'Hace 9 meses',
    text: "Oussama - muchas gracias por tu atención! I'm from Brussels and I'm leaving more than satisfied! Hasta la próxima",
  },
  {
    id: 17,
    name: 'Alfonso García-Ferrer Moreno',
    avatar: 'AG',
    avatarColor: '#004D40',
    rating: 5,
    date: 'Hace 7 meses',
    text: "The service is a 10 and the result is just as good. I didn't know what to do and they advise you based on your features and tastes.",
  },
  {
    id: 18,
    name: 'pierre haselint',
    avatar: 'PH',
    avatarColor: '#880E4F',
    rating: 5,
    date: 'Hace un año',
    text: "We stumbled upon this place with my son, and we're both thrilled with our haircuts! Top-notch professionalism and precision!! We 100% recommend them! (The French 😜) ...",
  },
  {
    id: 19,
    name: 'Antonio Guerrero Rincón',
    avatar: 'AR',
    avatarColor: '#1B5E20',
    rating: 5,
    date: 'Hace 7 meses',
    text: "The best barbershop in all of Fuengirola, quality haircuts, cleanliness and above all, attention to detail and perfection.",
  },
  {
    id: 20,
    name: 'Ricardo von Wichmann Gomez',
    avatar: 'RG',
    avatarColor: '#311B92',
    rating: 5,
    date: 'Hace 4 meses',
    text: "Excellent service and friendliness with top-notch professionalism!!!",
  },
  {
    id: 21,
    name: 'Jetemy Sxhietroma',
    avatar: 'JS',
    avatarColor: '#B71C1C',
    rating: 5,
    date: 'Hace un año',
    text: "Having come on holiday, I was looking for a hairdresser for my children. The best experience! The hairdresser is very attentive, very professional, and wonderful; he takes his time cutting hair. The salon is very clean, the haircut was perfect, and my children were delighted. I highly recommend it; it's rare to find such a great hairdresser. He's the best barber in Spain!",
  },
  {
    id: 22,
    name: 'Jesus Cobo de Guzman',
    avatar: 'JC',
    avatarColor: '#FF6F00',
    rating: 5,
    date: 'Hace 9 meses',
    text: "Osama provided excellent service, a very nice person and a great haircut, highly recommended 10/10",
  },
  {
    id: 23,
    name: 'Marcos R.',
    avatar: 'MR',
    avatarColor: '#004D40',
    rating: 5,
    date: 'Hace 6 meses',
    text: 'El local está guapísimo, muy limpio y el ambiente es excelente. Te ofrecen una bebida fresca al entrar y Fabrizio es un barbero espectacular. Cuida cada detalle y no tiene prisa. ¡Repetiré seguro!',
  },
  {
    id: 24,
    name: 'David Wilson',
    avatar: 'DW',
    avatarColor: '#1B5E20',
    rating: 5,
    date: 'Hace 2 meses',
    text: 'Best skin fade I have ever had! The barbers are highly skilled and friendly. The place is modern and they offer you a free drink. Totally recommend Elixir when visiting Fuengirola.',
  },
  {
    id: 25,
    name: 'Laura G.',
    avatar: 'LG',
    avatarColor: '#E65100',
    rating: 5,
    date: 'Hace 4 meses',
    text: 'Llevé a mi hijo pequeño y el trato fue inmejorable. El barbero tuvo una paciencia increíble y el corte quedó perfecto. Muy profesionales y el local es una maravilla.',
  },
  {
    id: 26,
    name: 'Sébastien L.',
    avatar: 'SL',
    avatarColor: '#0D47A1',
    rating: 5,
    date: 'Hace 8 meses',
    text: 'Super salon de coiffure ! Très propre, accueil chaleureux avec une boisson offerte et coupe impeccable par Fabián. Service au top à Fuengirola.',
  },
]

const CARD_WIDTH   = 320  // px
const CARD_GAP     = 20   // px
const CARD_STRIDE  = CARD_WIDTH + CARD_GAP
const SCROLL_SPEED = 0.6  // px / frame  (≈ 36 px/s at 60fps)

/* ── Stars ────────────────────────────────────────────────── */
function Stars({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }} aria-label={`${count} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" width="14" height="14"
          fill={i < count ? '#D8A511' : '#D9CDB8'} aria-hidden="true">
          <path d="M8 1l1.85 3.75L14 5.61l-3 2.92.71 4.13L8 10.5l-3.71 2.16.71-4.13L2 5.61l4.15-.86z"/>
        </svg>
      ))}
    </div>
  )
}

/* ── Google logo SVG ─────────────────────────────────────── */
function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-label="Google" role="img">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

/* ── Review Card ─────────────────────────────────────────── */
function ReviewCard({ review }) {
  return (
    <article
      style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '1.5rem',
        width: `${CARD_WIDTH}px`,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
        boxShadow: '0 2px 16px rgba(14,14,14,0.07)',
        border: '1px solid rgba(237,228,211,0.8)',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Acento dorado */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #D8A511, transparent)',
        opacity: 0.55,
      }} aria-hidden="true" />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: review.avatarColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Inter', sans-serif", fontWeight: 700,
          fontSize: '0.75rem', color: '#fff', flexShrink: 0,
        }} aria-hidden="true">
          {review.avatar}
        </div>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600,
            fontSize: '0.9375rem', color: 'var(--ink)', lineHeight: 1.2 }}>
            {review.name}
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem',
            color: 'var(--ink-soft)', marginTop: '2px' }}>
            {review.date}
          </p>
        </div>
        <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <GoogleLogo />
        </div>
      </div>

      <Stars count={review.rating} />

      <blockquote style={{
        fontFamily: "'Inter', sans-serif", fontSize: '0.875rem',
        lineHeight: 1.65, color: 'var(--ink-soft)', margin: 0,
      }}>
        "{review.text}"
      </blockquote>
    </article>
  )
}

/* ── Infinite Draggable Carousel ─────────────────────────── */
function InfiniteCarousel() {
  const containerRef = useRef(null)
  const rafRef       = useRef(null)
  const isDragging   = useRef(false)
  const startX       = useRef(0)
  const lastScrollX  = useRef(0)
  const velocity     = useRef(0)
  const lastClientX  = useRef(0)

  // Triplicar para loop suave
  const cards = [...REVIEWS, ...REVIEWS, ...REVIEWS]
  const setWidth = CARD_STRIDE * REVIEWS.length   // ancho de un ciclo

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Empezar en el segundo tercio para poder ir en ambas direcciones
    el.scrollLeft = setWidth

    const tick = () => {
      if (!isDragging.current) {
        el.scrollLeft += SCROLL_SPEED

        // Loop: cuando llegamos al tercer tercio, volvemos al inicio del segundo
        if (el.scrollLeft >= setWidth * 2) {
          el.scrollLeft -= setWidth
        }
        // Si el usuario arrastró hacia atrás
        if (el.scrollLeft <= 0) {
          el.scrollLeft += setWidth
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [setWidth])

  /* ── Mouse ── */
  const onMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX
    lastScrollX.current = containerRef.current.scrollLeft
    lastClientX.current = e.pageX
    velocity.current = 0
    containerRef.current.style.cursor = 'grabbing'
  }

  const onMouseMove = (e) => {
    if (!isDragging.current) return
    velocity.current = e.pageX - lastClientX.current
    lastClientX.current = e.pageX
    const dx = e.pageX - startX.current
    containerRef.current.scrollLeft = lastScrollX.current - dx
  }

  const onMouseUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    containerRef.current.style.cursor = 'grab'
  }

  /* ── Touch ── */
  const onTouchStart = (e) => {
    isDragging.current = true
    startX.current = e.touches[0].pageX
    lastScrollX.current = containerRef.current.scrollLeft
    lastClientX.current = e.touches[0].pageX
  }

  const onTouchMove = (e) => {
    if (!isDragging.current) return
    const dx = e.touches[0].pageX - startX.current
    containerRef.current.scrollLeft = lastScrollX.current - dx
  }

  const onTouchEnd = () => {
    isDragging.current = false
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Fade left */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '72px',
        background: 'linear-gradient(to right, var(--beige-deep), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      {/* Fade right */}
      <div aria-hidden="true" style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '72px',
        background: 'linear-gradient(to left, var(--beige-deep), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Scrollable track */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          display: 'flex',
          gap: `${CARD_GAP}px`,
          overflowX: 'scroll',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          cursor: 'grab',
          padding: '1rem 1.5rem 1.5rem',
        }}
        aria-label="Carrusel de reseñas — arrastra para navegar"
      >
        {cards.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} review={review} />
        ))}
      </div>

      <style>{`
        div[aria-label="Carrusel de reseñas — arrastra para navegar"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

/* ── Reviews Section ─────────────────────────────────────── */
export default function Reviews() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100)
          })
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="opiniones"
      ref={sectionRef}
      style={{
        background: 'var(--beige-deep)',
        padding: 'clamp(5rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem)',
        overflow: 'hidden',
      }}
      aria-label="Opiniones de clientes de Elixir Barber en Google"
    >
      {/* Header */}
      <div className="container">
        <div className="reveal" style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <hr className="divider-gold" style={{ marginBottom: '1.5rem' }} />
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.25rem',
          }}>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                fontWeight: 400, color: 'var(--ink)', lineHeight: 1.05,
              }}>
                Lo que dicen<br />
                <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>nuestros clientes</em>
              </h2>
              <p style={{
                marginTop: '0.75rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--ink-soft)',
                letterSpacing: '0.04em',
              }}>
                Arrastra las tarjetas o deja que pasen solas
              </p>
            </div>

            {/* Rating badge */}
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.875rem',
                background: '#FFFFFF',
                border: '1px solid rgba(237,228,211,0.9)',
                borderRadius: '14px',
                padding: '1rem 1.375rem',
                textDecoration: 'none',
                boxShadow: '0 2px 12px rgba(14,14,14,0.07)',
                transition: 'box-shadow 250ms ease, transform 250ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(216,165,17,0.18)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(14,14,14,0.07)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              aria-label="Ver todas las reseñas en Google — 5.0 con 108 valoraciones"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Stars count={5} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700, fontSize: '1.0625rem',
                    color: 'var(--ink)', letterSpacing: '-0.01em',
                  }}>
                    5.0
                  </span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.75rem',
                  color: 'var(--ink-soft)', marginTop: '3px',
                }}>
                  108 reseñas · Google
                </p>
              </div>
              <GoogleLogo />
            </a>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <InfiniteCarousel />
    </section>
  )
}
