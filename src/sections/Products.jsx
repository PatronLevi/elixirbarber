import { useEffect, useRef } from 'react'

const BOOKING_URL = 'https://elixirbarber.pedircita.online'

const PRODUCTS = [
  {
    id: 'de-la-villa-50-llamas',
    name: '50 Llamas - De la Villa',
    description: 'Perfume premium de autor con un aroma intenso, duradero y distinguido. Notas exclusivas creadas para marcar presencia.',
    price: '180,00 €',
    size: '100 ml',
    badge: 'Nuevo',
  },
  {
    id: 'five-styling-water',
    name: 'Styling Water - FIVE',
    description: 'Spray voluminizador que aporta textura superior, volumen instantáneo y fijación ligera para peinados con movimiento natural.',
    price: '17,90 €',
    size: 'Voluminizador',
  },
  {
    id: 'five-shine-wax',
    name: 'Shine Wax - FIVE',
    description: 'Cera fijadora con acabado de brillo moderado. Diseñada para peinados estructurados, aportando fijación fuerte y textura impecable.',
    price: '16,90 €',
    size: 'Cera Brillo',
  },
]

export default function Products() {
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
      id="productos"
      ref={sectionRef}
      style={{
        background: 'var(--beige-deep)',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
      }}
      aria-label="Productos Elixir Barber"
    >
      <div className="container">
        {/* Header */}
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
            }}
          >
            Nuestros productos
          </h2>
          <p
            style={{
              marginTop: '1rem',
              color: 'var(--ink-soft)',
              maxWidth: '480px',
              fontSize: '1rem',
            }}
          >
            Formulaciones premium para prolongar el cuidado y estilo de nuestro salón en tu ritual diario.
          </p>
        </div>

        {/* Layout: Showcase on left, Products list on right */}
        <div
          id="products-grid"
          style={{
            display: 'grid',
            alignItems: 'start',
          }}
        >
          {/* Left: Showcase Image */}
          <div
            className="reveal"
            id="product-showcase-container"
          >
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--r-xl)',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                aspectRatio: '2/3',
                background: 'var(--beige)',
                marginBottom: '1.25rem',
              }}
            >
              <img
                src="/products.png"
                alt="Colección de productos premium de barbería Elixir"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.04)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
            </div>
            <div
              style={{
                background: 'var(--beige)',
                padding: '1.25rem',
                borderRadius: 'var(--r-md)',
                border: '1px solid rgba(120, 110, 80, 0.15)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--gold-soft)', marginBottom: '0.25rem' }}>
                Edición Limitada Elixir
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', lineHeight: 1.4 }}>
                Disponibles exclusivamente para venta física en nuestro salón de Fuengirola. Resérvalos al pedir tu cita.
              </p>
            </div>
          </div>

          {/* Right: Products List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
            id="products-list-container"
          >
            {PRODUCTS.map((product) => (
              <article
                key={product.id}
                className="reveal"
                style={{
                  background: 'var(--beige)',
                  borderRadius: 'var(--r-lg)',
                  padding: '1.5rem',
                  border: '1px solid rgba(120, 110, 80, 0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 280ms ease, box-shadow 280ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'
                  e.currentTarget.style.borderColor = 'var(--gold-soft)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'rgba(120, 110, 80, 0.12)'
                }}
              >
                {/* Product Badge & Size */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', fontWeight: 500 }}>
                    {product.size}
                  </span>
                  {product.badge && (
                    <span
                      style={{
                        background: 'rgba(120, 110, 80, 0.12)',
                        color: 'var(--gold-soft)',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '100px',
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Name & Price */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'first-baseline', gap: '1rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: 500,
                      color: 'var(--ink)',
                      lineHeight: 1.15,
                    }}
                  >
                    {product.name}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      color: 'var(--gold-soft)',
                      fontSize: '1.2rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {product.price}
                  </span>
                </div>

                {/* Description */}
                <p style={{ color: 'var(--ink-soft)', fontSize: '0.875rem', lineHeight: 1.5, maxWidth: '600px' }}>
                  {product.description}
                </p>

                {/* Inline Reservation Call to Action */}
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-gold"
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    marginTop: '0.25rem',
                  }}
                  aria-label={`Reservar ${product.name} con mi cita`}
                >
                  Reservar con mi cita →
                </a>
              </article>
            ))}
          </div>
        </div>

        {/* Global responsive styles overlay */}
        <style>{`
          #products-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          #product-showcase-container {
            grid-column: span 12;
            width: 100%;
            max-width: 420px;
            margin-inline: auto;
          }
          #products-list-container {
            grid-column: span 12;
            width: 100%;
          }
          @media (min-width: 992px) {
            #products-grid {
              grid-template-columns: repeat(12, 1fr);
              gap: clamp(1.5rem, 4vw, 3rem);
            }
            #product-showcase-container {
              grid-column: span 5;
              max-width: none;
              margin-inline: 0;
            }
            #products-list-container {
              grid-column: span 7;
            }
          }
        `}</style>
      </div>
    </section>
  )
}
